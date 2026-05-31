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

// userSockets: userId -> { socketIds: Set, userData: {}, token: string, online: bool }
const userSockets = new Map();
const socketToUser = new Map();

const LARAVEL_API = "http://localhost:8000/api";

// ─── Helper: استدعاء Laravel API ─────────────────────────
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

// FIX: كل مستخدم يستخدم توكنه الخاص
async function getConversationsForUser(userId) {
  const info = userSockets.get(userId);
  if (!info?.token) return [];
  const res = await callApi("/conversations", "GET", null, info.token);
  return res?.conversations || [];
}

// ─── Socket.io ────────────────────────────────────────────
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
        userSockets.set(userId, {
          socketIds: new Set(),
          userData: user,
          token,
          online: true,
        });
      } else {
        const info = userSockets.get(userId);
        info.token  = token;   // تحديث التوكن
        info.online = true;
      }

      const info = userSockets.get(userId);
      info.socketIds.add(socket.id);

      socket.join(`user:${userId}`);
      socket.join(`role:${user.role}`);

      const conversations = await getConversationsForUser(userId);

      socket.emit("registered", { user, conversations });

      // إخبار الجميع أن هذا المستخدم أصبح online
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

      const result = await callApi(
        "/conversations", "POST",
        { target_user_id: targetUserId },
        token
      );

      if (!result?.conversation) return;

      const conv = result.conversation;

      // FIX: انضم لغرفة المحادثة حتى يشتغل الـ typing
      socket.join(`conv:${conv.id}`);

      const messagesResult = await callApi(
        `/conversations/${conv.id}/messages`, "GET", null, token
      );

      socket.emit("conversation_opened", {
        conversation: {
          id:       conv.id,
          messages: messagesResult?.messages || [],
        },
        conversations: await getConversationsForUser(userId),
      });

      // أضف المستخدم الآخر للغرفة إذا كان online
      const targetInfo = userSockets.get(targetUserId);
      if (targetInfo?.socketIds.size > 0) {
        targetInfo.socketIds.forEach((sid) => {
          const targetSocket = io.sockets.sockets.get(sid);
          if (targetSocket) {
            targetSocket.join(`conv:${conv.id}`); // FIX: typing يشتغل
          }
        });

        // تحديث قائمة محادثات المستقبِل بتوكنه الخاص
        const targetConvs = await getConversationsForUser(targetUserId);
        targetInfo.socketIds.forEach((sid) => {
          io.to(sid).emit("conversations_updated", { conversations: targetConvs });
        });
      }

      console.log(`💬 Conversation ${conv.id} opened between ${userId} & ${targetUserId}`);
    } catch (err) {
      console.error("❌ open_conversation error:", err);
    }
  });

  // ── send_message ──────────────────────────────────────
  socket.on("send_message", async ({ conversationId, text, token }) => {
    try {
      const userId = socketToUser.get(socket.id);
      if (!userId) return;

      const result = await callApi(
        "/messages", "POST",
        { conversation_id: conversationId, text },
        token
      );

      if (!result?.message) return;

      const message = result.message;

      // جلب المشاركين في المحادثة
      const convResult = await callApi(
        `/conversations/${conversationId}`, "GET", null, token
      );

      if (convResult?.conversation) {
        for (const participant of convResult.conversation.participants) {
          const pInfo = userSockets.get(participant.id);
          if (!pInfo?.socketIds.size) continue;

          // FIX: إرسال بـ `message` وليس `msg`
          pInfo.socketIds.forEach((sid) => {
            io.to(sid).emit("new_message", { message, conversationId });
          });

          // تحديث قائمة المحادثات بتوكن كل مستخدم
          const updatedConvs = await getConversationsForUser(participant.id);
          pInfo.socketIds.forEach((sid) => {
            io.to(sid).emit("conversations_updated", { conversations: updatedConvs });
          });
        }
      }

      console.log(`📨 Message sent in conv ${conversationId} by user ${userId}`);
    } catch (err) {
      console.error("❌ send_message error:", err);
    }
  });

  // ── mark_read ─────────────────────────────────────────
  // FIX: استخدم conversationId (وليس convId) في الطرفين
  socket.on("mark_read", async ({ conversationId }) => {
    try {
      const userId = socketToUser.get(socket.id);
      if (!userId) return;

      const info = userSockets.get(userId);
      if (!info?.token) return;

      await callApi(
        `/conversations/${conversationId}/mark-read`,
        "POST", null, info.token
      );

      const conversations = await getConversationsForUser(userId);
      socket.emit("conversations_updated", { conversations });
    } catch (err) {
      console.error("❌ mark_read error:", err);
    }
  });

  // ── typing ────────────────────────────────────────────
  // FIX: يشتغل لأن المستخدمين ينضمون لغرف conv: عند فتح المحادثة
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
        console.log(`🔴 User ${userId} is now offline`);
      }
    }
    socketToUser.delete(socket.id);
    console.log("🔌 Socket disconnected:", socket.id);
  });
});

const PORT = 3001;
server.listen(PORT, () => console.log(`✅ Socket.io server running on port ${PORT}`));