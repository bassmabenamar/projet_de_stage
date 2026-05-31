import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { MessageSquare, Plus, Send, Users, UserCheck, Search, X } from "lucide-react";
import api from "../../api";

const SERVER_URL = "http://localhost:3001";

const ROLES = {
  admin:     { label: "Admin",     color: "text-purple-600 bg-purple-50" },
  formateur: { label: "Formateur", color: "text-blue-500 bg-blue-50"    },
  etudiant:  { label: "Étudiant",  color: "text-blue-500 bg-blue-50"    },
};

function initials(name = "") {
  return name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
}

function formatTime(ts) {
  if (!ts) return "";
  const d   = new Date(ts);
  const now = new Date();
  if (d.toDateString() === now.toDateString())
    return d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
  return d.toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
}

// ─── Modal nouvelle conversation ─────────────────────────
function NewConvModal({ users, myId, onSelect, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-xl w-72 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <p className="text-sm font-semibold text-gray-700">Nouvelle conversation</p>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-lg leading-none">
            &times;
          </button>
        </div>
        <div className="max-h-60 overflow-y-auto">
          {users.filter((u) => u.id !== myId).map((u) => (
            <button
              key={u.id}
              onClick={() => { onSelect(u.id); onClose(); }}
              className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-50 transition-colors"
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#2F5D9F] to-[#E55B2D] flex items-center justify-center text-white text-xs font-medium">
                {initials(u.name)}
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-gray-800">{u.name}</p>
                <span className={`text-[10px] px-1.5 py-0.5 rounded ${ROLES[u.role]?.color}`}>
                  {ROLES[u.role]?.label}
                </span>
              </div>
              <span className={`ml-auto w-2 h-2 rounded-full ${u.online ? "bg-green-400" : "bg-gray-300"}`} />
            </button>
          ))}
          {users.filter((u) => u.id !== myId).length === 0 && (
            <p className="text-center text-gray-400 text-sm py-8">Aucun utilisateur disponible</p>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Composant principal ──────────────────────────────────
export default function Messages() {
  const [currentUser,    setCurrentUser]    = useState(null);
  const [onlineUsers,    setOnlineUsers]    = useState([]);
  const [conversations,  setConversations]  = useState([]);
  const [activeConvId,   setActiveConvId]   = useState(null);
  const [messages,       setMessages]       = useState([]);
  const [text,           setText]           = useState("");
  const [filter,         setFilter]         = useState("all");
  const [search,         setSearch]         = useState("");
  const [showNewConv,    setShowNewConv]     = useState(false);
  const [typing,         setTyping]         = useState(false);
  const [allUsers,       setAllUsers]       = useState([]);

  // FIX: socket في ref — لا يوجد stale closure أبداً
  const socketRef       = useRef(null);
  const messagesEnd     = useRef(null);
  const typingTimer     = useRef(null);
  const activeConvIdRef = useRef(null);
  const currentUserRef  = useRef(null);

  // جلب جميع المستخدمين من API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/users");
        setAllUsers(res.data.users || res.data);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };
    fetchUsers();
  }, []);

  // الاتصال بالـ socket
  useEffect(() => {
    const connect = async () => {
      try {
        const res  = await api.get("/user");
        const user = res.data.user || res.data;

        const name   = user.name || `${user.prenom || ""} ${user.nom || ""}`.trim();
        const role   = user.role;
        const userId = user.id;

        const s = io(SERVER_URL, {
          transports: ["websocket", "polling"],
          reconnection: true,
          reconnectionAttempts: 5,
          reconnectionDelay: 1000,
        });

        // FIX: حفظ في ref مباشرة
        socketRef.current = s;

        s.on("connect", () => {
          console.log("✅ Socket connected:", s.id);
          setCurrentUser({ id: userId, name, role });
          currentUserRef.current = { id: userId, name, role };
          const token = localStorage.getItem("token");
          s.emit("register", { userId, name, role, token });
        });

        s.on("connect_error", (err) => {
          console.error("❌ Socket connection error:", err.message);
        });

        s.on("registered", ({ conversations: c }) => {
          console.log("✅ Registered, conversations:", c?.length);
          setConversations(c || []);
        });

        s.on("user_status_change", ({ userId: uid, online, userData }) => {
          setOnlineUsers((prev) => {
            const updated = [...prev];
            const idx     = updated.findIndex((u) => u.id === uid);
            if (idx !== -1) {
              updated[idx] = { ...updated[idx], online };
            } else if (online && userData) {
              updated.push({ ...userData, online });
            }
            return updated;
          });
        });

        s.on("conversations_updated", (payload) => {
          setConversations(payload.conversations || payload);
        });

        s.on("conversation_opened", ({ conversation, conversations: c }) => {
          setConversations(c || []);
          setActiveConvId(conversation.id);
          activeConvIdRef.current = conversation.id;
          setMessages(conversation.messages || []);
          // FIX: استخدم s مباشرة + conversationId (وليس convId)
          s.emit("mark_read", { conversationId: conversation.id });
        });

        // FIX: السيرفر يرسل `message` وليس `msg`
        s.on("new_message", ({ message: msg, conversationId }) => {
          if (conversationId === activeConvIdRef.current) {
            setMessages((prev) => {
              if (prev.find((m) => m.id === msg.id)) return prev;
              return [...prev, msg];
            });
            // FIX: conversationId وليس convId
            s.emit("mark_read", { conversationId });
          }

          setConversations((prev) =>
            prev.map((conv) =>
              conv.id === conversationId
                ? { ...conv, lastMsg: { text: msg.text, timestamp: msg.created_at } }
                : conv
            )
          );
        });

        s.on("typing", ({ userId: uid, isTyping }) => {
          if (uid !== currentUserRef.current?.id) setTyping(isTyping);
        });

        s.on("error", ({ message: errMsg }) => {
          console.error("Socket error:", errMsg);
        });
      } catch (err) {
        console.error("Failed to connect:", err);
      }
    };

    connect();

    // FIX: cleanup يستخدم ref
    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  useEffect(() => { messagesEnd.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, typing]);
  useEffect(() => { activeConvIdRef.current = activeConvId; }, [activeConvId]);
  useEffect(() => { currentUserRef.current  = currentUser;  }, [currentUser]);

  // ── إرسال رسالة ──────────────────────────────────────
  const sendMessage = () => {
    if (!text.trim() || !activeConvId || !socketRef.current) return;
    const token = localStorage.getItem("token");
    socketRef.current.emit("send_message", { conversationId: activeConvId, text, token });
    setText("");
    socketRef.current.emit("typing", { conversationId: activeConvId, isTyping: false });
  };

  const handleTextChange = (val) => {
    setText(val);
    if (!activeConvId || !socketRef.current) return;
    socketRef.current.emit("typing", { conversationId: activeConvId, isTyping: val.length > 0 });
    clearTimeout(typingTimer.current);
    typingTimer.current = setTimeout(() => {
      socketRef.current?.emit("typing", { conversationId: activeConvId, isTyping: false });
    }, 1500);
  };

  const openConversation = (targetUserId) => {
    const token = localStorage.getItem("token");
    socketRef.current?.emit("open_conversation", { targetUserId, token });
  };

  // دمج قائمة المستخدمين مع حالة الاتصال
  const mergedUsers = allUsers.map((u) => {
    const live = onlineUsers.find((o) => o.id === u.id);
    return { ...u, online: live?.online || false };
  });

  // فلترة المحادثات
  const filteredConvs = conversations
    .filter((c) => filter === "all" || c.others?.some((o) => o.role === filter))
    .filter((c) => {
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return c.others?.some(
        (o) => o.name?.toLowerCase().includes(q) || ROLES[o.role]?.label?.toLowerCase().includes(q)
      );
    });

  const activeConv  = conversations.find((c) => c.id === activeConvId);
  const activeOther = activeConv?.others?.[0];

  return (
    <>
      {showNewConv && (
        <NewConvModal
          users={mergedUsers}
          myId={currentUser?.id}
          onSelect={openConversation}
          onClose={() => setShowNewConv(false)}
        />
      )}

      <div className="flex h-full bg-gray-50">
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="p-6 flex-1 flex flex-col pb-2 min-h-0">

            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-3xl font-semibold text-gray-800">Messages</h1>
                <p className="text-gray-500">Discutez avec l'équipe et les étudiants.</p>
              </div>
              {currentUser && (
                <div className="flex items-center gap-2 text-xs text-gray-500 bg-white border border-gray-200 rounded-lg px-3 py-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-400" />
                  <span className="font-medium text-gray-700">{currentUser.name}</span>
                  <span className={`px-1.5 py-0.5 rounded ${ROLES[currentUser.role]?.color}`}>
                    {ROLES[currentUser.role]?.label}
                  </span>
                </div>
              )}
            </div>

            {/* Filters */}
            <div className="flex gap-3 mb-4">
              {[
                { key: "all",       label: "Tous",       Icon: Users     },
                { key: "etudiant",  label: "Étudiants",  Icon: Users     },
                { key: "formateur", label: "Formateurs", Icon: UserCheck },
                { key: "admin",     label: "Admins",     Icon: UserCheck },
              ].map(({ key, label, Icon }) => (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all ${
                    filter === key
                      ? "bg-[#2F5D9F] text-white shadow-sm"
                      : "bg-white border border-gray-300 text-gray-700 hover:border-gray-400"
                  }`}
                >
                  <Icon size={16} />
                  {label}
                </button>
              ))}
            </div>

            {/* Chat container */}
            <div className="flex bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm flex-1 min-h-0">

              {/* Sidebar */}
              <div className="flex w-80 flex-col border-r border-gray-200">
                <div className="flex items-center justify-between gap-2 border-b border-gray-200 p-3">
                  <h2 className="text-sm font-medium text-gray-700">
                    Conversations{" "}
                    <span className="ml-1 text-xs text-gray-400">({filteredConvs.length})</span>
                  </h2>
                  <button
                    onClick={() => setShowNewConv(true)}
                    className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Plus className="h-4 w-4 text-[#2F5D9F]" />
                  </button>
                </div>

                {/* Search */}
                <div className="px-3 py-2 border-b border-gray-100">
                  <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5">
                    <Search size={13} className="text-gray-400 flex-shrink-0" />
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Rechercher..."
                      className="flex-1 bg-transparent text-xs outline-none text-gray-700 placeholder-gray-400"
                    />
                    {search && (
                      <button onClick={() => setSearch("")} className="text-gray-400 hover:text-gray-600">
                        <X size={12} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Liste conversations */}
                <div className="flex-1 overflow-y-auto">
                  {filteredConvs.length === 0 && (
                    <p className="text-center text-gray-400 text-xs py-6">
                      {search ? `Aucun résultat pour "${search}"` : "Aucune conversation"}
                    </p>
                  )}
                  {filteredConvs.map((conv) => {
                    const other    = conv.others?.[0];
                    if (!other) return null;
                    const liveUser = mergedUsers.find((u) => u.id === other.id);
                    const isActive = conv.id === activeConvId;
                    return (
                      <div
                        key={conv.id}
                        onClick={() => openConversation(other.id)}
                        className={`flex w-full items-center gap-3 border-b border-gray-100 px-3 py-3 hover:bg-gray-50 transition-colors cursor-pointer ${
                          isActive ? "bg-orange-50" : ""
                        }`}
                      >
                        <div className="relative">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2F5D9F] to-[#E55B2D] flex items-center justify-center text-white text-sm font-medium">
                            {initials(other.name)}
                          </div>
                          <span
                            className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${
                              liveUser?.online ? "bg-green-400" : "bg-gray-300"
                            }`}
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <p className="truncate text-sm font-medium text-gray-800">{other.name}</p>
                            <span className="text-xs text-gray-400">
                              {formatTime(conv.lastMsg?.timestamp)}
                            </span>
                          </div>
                          <div className="flex items-center justify-between gap-2">
                            <p className="truncate text-xs text-gray-500">
                              {conv.lastMsg?.text || "Démarrez la conversation"}
                            </p>
                            {conv.unread > 0 && (
                              <span className="bg-[#E55B2D] text-white text-[10px] font-medium rounded-full h-5 min-w-5 px-1.5 flex items-center justify-center">
                                {conv.unread}
                              </span>
                            )}
                          </div>
                          <div className="mt-1">
                            <span className={`text-[10px] px-1.5 py-0.5 rounded ${ROLES[other.role]?.color}`}>
                              {ROLES[other.role]?.label}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Zone chat */}
              <div className="flex flex-1 flex-col min-w-0">
                {activeOther ? (
                  <>
                    {/* En-tête chat */}
                    <div className="flex items-center gap-3 border-b border-gray-200 p-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2F5D9F] to-[#E55B2D] flex items-center justify-center text-white text-sm font-medium">
                        {initials(activeOther.name)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{activeOther.name}</p>
                        <p className="text-xs text-gray-500">{ROLES[activeOther.role]?.label}</p>
                      </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
                      {messages.map((msg) => {
                        const isMine =
                          msg.senderId  === currentUserRef.current?.id ||
                          msg.sender_id === currentUserRef.current?.id;
                        return (
                          <div key={msg.id} className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
                            <div
                              className={`max-w-[70%] rounded-2xl px-4 py-2 text-sm ${
                                isMine ? "bg-[#2F5D9F] text-white" : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              <p>{msg.text}</p>
                              <p className={`mt-1 text-[10px] ${isMine ? "text-white/70" : "text-gray-400"}`}>
                                {formatTime(msg.created_at || msg.timestamp)}
                              </p>
                            </div>
                          </div>
                        );
                      })}

                      {/* Typing indicator */}
                      {typing && (
                        <div className="flex justify-start">
                          <div className="bg-gray-100 rounded-2xl px-4 py-2 flex gap-1 items-center">
                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.15s" }} />
                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.3s" }} />
                          </div>
                        </div>
                      )}
                      <div ref={messagesEnd} />
                    </div>

                    {/* Input */}
                    <div className="flex items-center gap-2 border-t border-gray-200 p-3">
                      <input
                        type="text"
                        value={text}
                        onChange={(e) => handleTextChange(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                        placeholder="Écrire un message..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/10 transition-all"
                      />
                      <button
                        onClick={sendMessage}
                        className="p-2 bg-[#E55B2D] text-white rounded-lg hover:bg-[#c44d24] transition-colors"
                      >
                        <Send className="h-4 w-4" />
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-1 items-center justify-center text-center">
                    <div>
                      <MessageSquare size={28} className="text-gray-200 mx-auto mb-2" />
                      <p className="text-sm text-gray-400">Sélectionnez une conversation</p>
                      <button
                        onClick={() => setShowNewConv(true)}
                        className="text-xs text-[#2F5D9F] mt-1 hover:underline flex items-center gap-1 mx-auto"
                      >
                        <Plus size={12} /> Nouvelle conversation
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}