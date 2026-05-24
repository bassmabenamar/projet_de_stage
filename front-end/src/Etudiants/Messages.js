import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Plus, Send, Search, Users, UserCheck, Menu, X, MoreVertical, Edit2, Trash2, Check, XCircle } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import api from './api';

export default function Messages() {
  const navigate = useNavigate();
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [editingMessage, setEditingMessage] = useState(null);
  const [editText, setEditText] = useState('');
  const [deletingId, setDeletingId] = useState(null);
  const messagesEndRef = useRef(null);
  const wsRef = useRef(null);

  // Scroll automatique vers le dernier message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Charger les conversations
  useEffect(() => {
    fetchConversations();
    
    const token = localStorage.getItem('token');
    if (token) {
      wsRef.current = new WebSocket(`ws://127.0.0.1:6001?token=${token}`);
      
      wsRef.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'new_message' && data.conversation_id === selectedConversation?.id) {
          setMessages(prev => [...prev, data.message]);
        } else if (data.type === 'message_updated' && data.conversation_id === selectedConversation?.id) {
          setMessages(prev => prev.map(m => m.id === data.message.id ? data.message : m));
        } else if (data.type === 'message_deleted' && data.conversation_id === selectedConversation?.id) {
          setMessages(prev => prev.filter(m => m.id !== data.message_id));
        } else if (data.type === 'new_conversation') {
          fetchConversations();
        }
      };
    }
    
    return () => {
      if (wsRef.current) wsRef.current.close();
    };
  }, []);

  // Charger les messages quand une conversation est sélectionnée
  useEffect(() => {
    if (selectedConversation) {
      fetchMessages(selectedConversation.id);
    }
  }, [selectedConversation]);

  const fetchConversations = async () => {
    try {
      const response = await api.get('/student/conversations');
      setConversations(response.data?.data || []);
      if (response.data?.data?.length > 0 && !selectedConversation) {
        setSelectedConversation(response.data.data[0]);
      }
      setLoading(false);
    } catch (error) {
      console.error("Erreur chargement conversations:", error);
      setConversations([
        { id: 1, name: 'Sarah Martin', role: 'Étudiant', avatar: 'SM', lastMessage: 'Merci pour votre aide !', time: '14:30', unread: 2, online: true },
        { id: 2, name: 'Leila Ouazzani', role: 'Étudiant', avatar: 'LO', lastMessage: 'Je n\'ai pas reçu le lien', time: '09:20', unread: 1, online: false },
        { id: 3, name: 'Fatima Zahra', role: 'Étudiant', avatar: 'FZ', lastMessage: 'Quand est le prochain examen ?', time: 'Hier', unread: 3, online: true },
        { id: 4, name: 'Prof. Ahmed', role: 'Formateur', avatar: 'PA', lastMessage: 'Les résultats sont disponibles', time: 'Hier', unread: 0, online: true },
      ]);
      setLoading(false);
    }
  };

  const fetchMessages = async (conversationId) => {
    try {
      const response = await api.get(`/student/conversations/${conversationId}/messages`);
      setMessages(response.data?.data || []);
    } catch (error) {
      console.error("Erreur chargement messages:", error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return;
    
    setSending(true);
    const messageText = newMessage;
    setNewMessage('');
    
    const tempMessage = {
      id: Date.now(),
      text: messageText,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
      temp: true
    };
    setMessages(prev => [...prev, tempMessage]);
    
    try {
      const response = await api.post(`/student/conversations/${selectedConversation.id}/messages`, {
        message: messageText
      });
      setMessages(prev => prev.map(m => 
        m.temp && m.text === messageText ? { ...response.data?.data, isMe: true } : m
      ));
    } catch (error) {
      console.error("Erreur envoi message:", error);
      alert("Erreur lors de l'envoi du message");
      setMessages(prev => prev.filter(m => !m.temp));
      setNewMessage(messageText);
    } finally {
      setSending(false);
    }
  };

  // ✅ Modifier un message
  const handleEditMessage = async () => {
    if (!editText.trim() || !editingMessage) return;
    
    try {
      const response = await api.put(`/student/messages/${editingMessage.id}`, {
        message: editText
      });
      setMessages(prev => prev.map(m => 
        m.id === editingMessage.id ? { ...m, text: editText } : m
      ));
      setEditingMessage(null);
      setEditText('');
    } catch (error) {
      console.error("Erreur modification:", error);
      alert("Erreur lors de la modification");
    }
  };

  // ✅ Supprimer un message
  const handleDeleteMessage = async (id) => {
    if (!window.confirm("Supprimer ce message ?")) return;
    
    setDeletingId(id);
    try {
      await api.delete(`/student/messages/${id}`);
      setMessages(prev => prev.filter(m => m.id !== id));
    } catch (error) {
      console.error("Erreur suppression:", error);
      alert("Erreur lors de la suppression");
    } finally {
      setDeletingId(null);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const filteredConversations = conversations.filter(conv => {
    if (filter === 'all') return true;
    if (filter === 'student') return conv.role === 'Étudiant';
    if (filter === 'teacher') return conv.role === 'Formateur';
    return true;
  });

  const formatTime = (time) => {
    if (time === 'Hier') return time;
    if (time.includes(':')) return time;
    return new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC]">
        <div className="text-2xl font-black text-[#002366] animate-pulse">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans">
      <main className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        
        <div className="flex-1 overflow-hidden p-4 md:p-6">
          <div className="h-full flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <div>
                <h1 className="text-xl md:text-2xl font-black text-[#002366]">Messages</h1>
                <p className="text-xs text-gray-400">Discutez avec l'équipe et les étudiants</p>
              </div>
              <button 
                onClick={() => navigate('/messages/new')}
                className="p-2 bg-[#E55B2D] text-white rounded-xl hover:bg-orange-600 transition-colors"
              >
                <Plus size={20} />
              </button>
            </div>
            
            {/* Filters */}
            <div className="flex gap-2 p-3 border-b border-gray-100 overflow-x-auto">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 whitespace-nowrap transition-all ${
                  filter === 'all' 
                    ? 'bg-[#2F5D9F] text-white shadow-sm' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Users size={16} />
                Tous
                <span className="text-xs ml-1 opacity-70">{conversations.length}</span>
              </button>
              <button
                onClick={() => setFilter('student')}
                className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 whitespace-nowrap transition-all ${
                  filter === 'student' 
                    ? 'bg-[#2F5D9F] text-white shadow-sm' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Users size={16} />
                Étudiants
                <span className="text-xs ml-1 opacity-70">{conversations.filter(c => c.role === 'Étudiant').length}</span>
              </button>
              <button
                onClick={() => setFilter('teacher')}
                className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 whitespace-nowrap transition-all ${
                  filter === 'teacher' 
                    ? 'bg-[#2F5D9F] text-white shadow-sm' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <UserCheck size={16} />
                Formateurs
                <span className="text-xs ml-1 opacity-70">{conversations.filter(c => c.role === 'Formateur').length}</span>
              </button>
            </div>
            
            {/* Chat Container */}
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden min-h-[400px]">
              
              {/* Sidebar */}
              <div className={`${
                sidebarOpen ? 'absolute inset-0 z-50 bg-white md:relative md:bg-transparent' : 'hidden md:block'
              } md:w-80 w-full flex-shrink-0 border-r border-gray-100 flex flex-col overflow-hidden`}>
                <div className="flex items-center justify-between p-3 border-b border-gray-100 md:hidden">
                  <h3 className="font-bold text-[#002366]">Conversations</h3>
                  <button onClick={() => setSidebarOpen(false)} className="p-2">
                    <X size={20} />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto">
                  {filteredConversations.map((conv) => (
                    <div
                      key={conv.id}
                      onClick={() => {
                        setSelectedConversation(conv);
                        setSidebarOpen(false);
                      }}
                      className={`flex items-center gap-3 p-3 cursor-pointer transition-all hover:bg-gray-50 ${
                        selectedConversation?.id === conv.id ? 'bg-orange-50 border-l-4 border-[#E55B2D]' : 'border-l-4 border-transparent'
                      }`}
                    >
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2F5D9F] to-[#E55B2D] flex items-center justify-center text-white text-sm font-medium">
                          {conv.avatar || conv.name.charAt(0) + conv.name.split(' ')[1]?.charAt(0) || conv.name.charAt(1)}
                        </div>
                        {conv.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="truncate text-sm font-medium text-gray-800">{conv.name}</p>
                          <span className="text-[10px] text-gray-400 flex-shrink-0">{formatTime(conv.time)}</span>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                          <p className="truncate text-xs text-gray-500">{conv.lastMessage}</p>
                          {conv.unread > 0 && (
                            <span className="bg-[#E55B2D] text-white text-[10px] font-medium rounded-full h-5 min-w-5 px-1.5 flex items-center justify-center flex-shrink-0">
                              {conv.unread}
                            </span>
                          )}
                        </div>
                        <div className="mt-1">
                          <span className="text-[10px] text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded">
                            {conv.role}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Chat Area */}
              <div className="flex-1 flex flex-col overflow-hidden">
                {selectedConversation ? (
                  <>
                    {/* Chat Header */}
                    <div className="flex items-center gap-3 p-3 border-b border-gray-100 bg-white">
                      <button 
                        onClick={() => setSidebarOpen(true)} 
                        className="md:hidden p-2 -ml-2 text-gray-500"
                      >
                        <Menu size={20} />
                      </button>
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2F5D9F] to-[#E55B2D] flex items-center justify-center text-white text-sm font-medium">
                          {selectedConversation.avatar || selectedConversation.name.charAt(0) + (selectedConversation.name.split(' ')[1]?.charAt(0) || '')}
                        </div>
                        {selectedConversation.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">{selectedConversation.name}</p>
                        <p className="text-xs text-gray-400">
                          {selectedConversation.role} {selectedConversation.online && '• En ligne'}
                        </p>
                      </div>
                    </div>
                    
                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50/30">
                      {messages.map((msg, idx) => (
                        <div
                          key={msg.id || idx}
                          className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'} group`}
                        >
                          <div className={`max-w-[85%] md:max-w-[70%] rounded-2xl px-4 py-2 relative ${
                            msg.isMe 
                              ? 'bg-[#2F5D9F] text-white' 
                              : 'bg-white text-gray-800 border border-gray-100 shadow-sm'
                          }`}>
                            {editingMessage?.id === msg.id ? (
                              // Mode édition
                              <div className="flex flex-col gap-2">
                                <input
                                  type="text"
                                  value={editText}
                                  onChange={(e) => setEditText(e.target.value)}
                                  className="bg-white text-gray-800 px-3 py-2 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#E55B2D]"
                                  autoFocus
                                />
                                <div className="flex gap-2 justify-end">
                                  <button
                                    onClick={() => setEditingMessage(null)}
                                    className="p-1 text-gray-500 hover:text-gray-700"
                                  >
                                    <XCircle size={16} />
                                  </button>
                                  <button
                                    onClick={handleEditMessage}
                                    className="p-1 text-green-500 hover:text-green-700"
                                  >
                                    <Check size={16} />
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <>
                                <p className="text-sm break-words">{msg.text}</p>
                                <p className={`text-[10px] mt-1 ${msg.isMe ? 'text-white/70' : 'text-gray-400'}`}>
                                  {msg.time}
                                  {msg.isMe && <span className="ml-2">✓✓</span>}
                                </p>
                              </>
                            )}
                          </div>
                          {/* Boutons d'action (seulement pour mes messages) */}
                          {msg.isMe && !editingMessage && (
                            <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 ml-2">
                              <button
                                onClick={() => {
                                  setEditingMessage(msg);
                                  setEditText(msg.text);
                                }}
                                className="p-1 text-gray-400 hover:text-blue-500"
                              >
                                <Edit2 size={14} />
                              </button>
                              <button
                                onClick={() => handleDeleteMessage(msg.id)}
                                disabled={deletingId === msg.id}
                                className="p-1 text-gray-400 hover:text-red-500"
                              >
                                {deletingId === msg.id ? (
                                  <div className="w-3 h-3 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                                ) : (
                                  <Trash2 size={14} />
                                )}
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                    
                    {/* Input Area */}
                    <div className="flex items-center gap-2 p-3 border-t border-gray-100 bg-white">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Écrire un message..."
                        className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#E55B2D] focus:ring-2 focus:ring-[#E55B2D]/20 transition-all"
                        disabled={sending}
                      />
                      <button
                        onClick={sendMessage}
                        disabled={!newMessage.trim() || sending}
                        className="p-2.5 bg-[#E55B2D] text-white rounded-xl hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {sending ? (
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Send className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                      <MessageSquare size={48} className="mx-auto text-gray-300 mb-3" />
                      <p className="text-gray-400">Sélectionnez une conversation</p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Overlay pour mobile */}
              {sidebarOpen && (
                <div 
                  className="fixed inset-0 bg-black/50 z-40 md:hidden"
                  onClick={() => setSidebarOpen(false)}
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}