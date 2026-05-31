const express = require("express");
const http    = require("http");
const { Server } = require("socket.io");
const cors    = require("cors");
const axios   = require("axios");

const app = express();
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"], credentials: true },
});

const userSockets = new Map(); // userId -> { socketIds: Set, userData, token, online }
const socketToUser = new Map(); // socketId -> userId

const LARAVEL_API = "http://localhost:8000/api";

async function callApi(endpoint, method = "GET", data = null, token = null) {
  try {
    const res = await axios({
      method,
      url: `${LARAVEL_API}${endpoint}`,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      data,
    });
    return res.data;
  } catch (err) {
    console.error(`❌ API Error [${method} ${endpoint}]:`, err.response?.data || err.message);
    return null;
  }
}

async function getConversationsForUser(userId) {
  const info = userSockets.get(userId);
  if (!info?.token) return [];
  const res = await callApi("/conversations", "GET", null, info.token);
  return res?.conversations || [];
}

io.on("connection", (socket) => {
  console.log("🔌 Socket connected:", socket.id);

  // ── register ──────────────────────────────────────────
  socket.on("register", async ({ userId, token }) => {
    try {
      const userData = await callApi("/user", "GET", null, token);
      if (!userData?.user) {
        socket.emit("error", { message: "Authentication failed" });
        socket.disconnect();
        return;
      }

      const user = userData.user;
      socketToUser.set(socket.id, userId);

      if (!userSockets.has(userId)) {
        userSockets.set(userId, { socketIds: new Set(), userData: user, token, online: true });
      } else {
        const info = userSockets.get(userId);
        info.token  = token;
        info.online = true;
      }

      userSockets.get(userId).socketIds.add(socket.id);
      socket.join(`user:${userId}`);
      socket.join(`role:${user.role}`);

      const conversations = await getConversationsForUser(userId);
      socket.emit("registered", { user, conversations });
      io.emit("user_status_change", { userId, online: true, userData: user });

      console.log(`✅ Registered: ${user.name} (${user.role}) — convs: ${conversations.length}`);
    } catch (err) {
      console.error("❌ register error:", err);
      socket.emit("error", { message: "Registration failed" });
    }
  });

  // ── open_conversation ─────────────────────────────────
  socket.on("open_conversation", async ({ targetUserId, token }) => {
    try {
      const userId = socketToUser.get(socket.id);
      if (!userId) return;

      // 1. Create or get conversation — now returns others + participants with prenom/nom
      const result = await callApi("/conversations", "POST", { target_user_id: targetUserId }, token);
      if (!result?.conversation) {
        console.error("❌ No conversation returned from API");
        return;
      }

      const conv = result.conversation;
      console.log("📦 conv from API:", JSON.stringify(conv).slice(0, 200));

      // 2. Join room
      socket.join(`conv:${conv.id}`);

      // 3. Fetch messages
      const messagesResult = await callApi(`/conversations/${conv.id}/messages`, "GET", null, token);

      // 4. Fetch full conversations list
      const updatedConversations = await getConversationsForUser(userId);

      // 5. Build fullConv — prefer from list, fallback to what API returned directly
      let fullConv = updatedConversations.find((c) => c.id === conv.id);

      if (!fullConv) {
        // API already returns others with prenom/nom — use it directly
        fullConv = {
          id:      conv.id,
          others:  conv.others  || [],
          lastMsg: conv.lastMsg || null,
          unread:  0,
        };
        updatedConversations.unshift(fullConv);
      }

      // 6. Emit to client
      socket.emit("conversation_opened", {
        conversation: {
          ...fullConv,
          id:       conv.id,
          messages: messagesResult?.messages || [],
        },
        conversations: updatedConversations,
      });

      // 7. Add target to room and update their list
      const targetInfo = userSockets.get(Number(targetUserId));
      if (targetInfo?.socketIds.size > 0) {
        targetInfo.socketIds.forEach((sid) => {
          io.sockets.sockets.get(sid)?.join(`conv:${conv.id}`);
        });
        const targetConvs = await getConversationsForUser(Number(targetUserId));
        targetInfo.socketIds.forEach((sid) => {
          io.to(sid).emit("conversations_updated", { conversations: targetConvs });
        });
      }

      console.log(`💬 Conv ${conv.id} opened between ${userId} & ${targetUserId}`);
    } catch (err) {
      console.error("❌ open_conversation error:", err);
    }
  });

  // ── send_message ──────────────────────────────────────
  socket.on("send_message", async ({ conversationId, text, token }) => {
    try {
      const userId = socketToUser.get(socket.id);
      if (!userId) return;

      const result = await callApi("/messages", "POST", { conversation_id: conversationId, text }, token);
      if (!result?.message) return;

      const message    = result.message;
      const convResult = await callApi(`/conversations/${conversationId}`, "GET", null, token);

      if (convResult?.conversation) {
        for (const participant of convResult.conversation.participants) {
          const pInfo = userSockets.get(participant.id);
          if (!pInfo?.socketIds.size) continue;

          pInfo.socketIds.forEach((sid) => {
            io.to(sid).emit("new_message", { message, conversationId });
          });

          const updatedConvs = await getConversationsForUser(participant.id);
          pInfo.socketIds.forEach((sid) => {
            io.to(sid).emit("conversations_updated", { conversations: updatedConvs });
          });
        }
      }

      console.log(`📨 Message in conv ${conversationId} by user ${userId}`);
    } catch (err) {
      console.error("❌ send_message error:", err);
    }
  });

  // ── mark_read ─────────────────────────────────────────
  socket.on("mark_read", async ({ conversationId }) => {
    try {
      const userId = socketToUser.get(socket.id);
      if (!userId) return;
      const info = userSockets.get(userId);
      if (!info?.token) return;

      await callApi(`/conversations/${conversationId}/mark-read`, "POST", null, info.token);
      const conversations = await getConversationsForUser(userId);
      socket.emit("conversations_updated", { conversations });
    } catch (err) {
      console.error("❌ mark_read error:", err);
    }
  });

  // ── typing ────────────────────────────────────────────
  socket.on("typing", ({ conversationId, isTyping }) => {
    const userId = socketToUser.get(socket.id);
    if (!userId) return;
    socket.to(`conv:${conversationId}`).emit("typing", { userId, isTyping });
  });

  // ── disconnect ────────────────────────────────────────
  socket.on("disconnect", () => {
    const userId = socketToUser.get(socket.id);
    if (userId && userSockets.has(userId)) {
      const info = userSockets.get(userId);
      info.socketIds.delete(socket.id);
      if (info.socketIds.size === 0) {
        info.online = false;
        io.emit("user_status_change", { userId, online: false });
        console.log(`🔴 User ${userId} offline`);
      }
    }
    socketToUser.delete(socket.id);
    console.log("🔌 Socket disconnected:", socket.id);
  });
});

const PORT = 3001;
server.listen(PORT, () => console.log(`✅ Socket.io server on port ${PORT}`));