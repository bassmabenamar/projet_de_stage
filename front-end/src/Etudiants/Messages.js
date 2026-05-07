import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Edit3, Send, Plus, Smile, Video, Phone, 
  MoreHorizontal, FileText, Image as ImageIcon, ArrowLeft 
} from 'lucide-react';
import Navbar from './Navbar'; 

const springTransition = { type: "spring", stiffness: 300, damping: 24 };

const containerVars = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.1, delayChildren: 0.2 } 
  }
};

const itemVars = {
  hidden: { y: 20, opacity: 0, scale: 0.98 },
  visible: { 
    y: 0, 
    opacity: 1, 
    scale: 1,
    transition: springTransition
  }
};

const Messages = () => {
  const [activeChat, setActiveChat] = useState(0);
  const [showChatArea, setShowChatArea] = useState(false);

  const handleSelectChat = (id) => {
    setActiveChat(id);
    setShowChatArea(true);
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans text-[#1E293B] overflow-hidden">
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        
        <Navbar />

        <motion.div 
          variants={containerVars}
          initial="hidden"
          animate="visible"
          className="flex-1 flex gap-6 p-4 md:p-8 overflow-hidden max-w-[1600px] mx-auto w-full relative"
        >
          {/* 1. CHATS LIST */}
          <motion.div 
            variants={itemVars} 
            className={`${showChatArea ? 'hidden lg:flex' : 'flex'} w-full lg:w-[380px] flex-col gap-6 h-full transition-all`}
          >
            <div className="flex justify-between items-center px-2">
              <h2 className="text-2xl md:text-3xl font-black text-[#002366] tracking-tight">Messages</h2>
              <motion.button 
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 bg-white border border-slate-100 rounded-2xl shadow-sm text-blue-600"
              >
                <Edit3 size={20} />
              </motion.button>
            </div>

            <div className="flex gap-2 p-1.5 bg-slate-100/50 rounded-2xl">
              {['All Chats', 'Teachers', 'Groups'].map((tab, i) => (
                <button key={tab} className={`flex-1 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${i === 0 ? 'bg-white text-[#002366] shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
              <ChatPreview 
                active={activeChat === 0}
                onClick={() => handleSelectChat(0)}
                name="Dr. Sarah Miller" 
                msg="I've reviewed your thesis proposal..." 
                time="10:42 AM" 
                avatar="https://i.pravatar.cc/150?u=sarah"
                online
                unread={1}
              />
              <ChatPreview 
                active={activeChat === 1}
                onClick={() => handleSelectChat(1)}
                name="Prof. Marcus Thompson" 
                msg="The physics lab results are uploaded." 
                time="Yesterday" 
                avatar="https://i.pravatar.cc/150?u=marcus"
              />
            </div>
          </motion.div>

          {/* 2. CHAT AREA */}
          <motion.div 
            variants={itemVars} 
            className={`${showChatArea ? 'flex' : 'hidden lg:flex'} flex-1 bg-white border border-slate-100 rounded-[30px] md:rounded-[40px] shadow-[0px_40px_80px_-20px_rgba(0,0,0,0.03)] flex flex-col overflow-hidden relative`}
          >
            <header className="p-4 md:p-6 border-b border-slate-50 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-10">
              <div className="flex items-center gap-3 md:gap-4">
                {/* Back button for mobile */}
                <button onClick={() => setShowChatArea(false)} className="lg:hidden p-2 -ml-2 text-slate-400 hover:text-blue-600">
                  <ArrowLeft size={24} />
                </button>
                <div className="relative">
                  <img src="https://i.pravatar.cc/150?u=sarah" className="w-10 h-10 md:w-12 md:h-12 rounded-2xl object-cover shadow-sm" alt="" />
                  <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 border-4 border-white rounded-full" />
                </div>
                <div>
                  <h4 className="font-black text-sm md:text-base text-[#002366] leading-none">Dr. Sarah Miller</h4>
                  <p className="text-[10px] md:text-[11px] font-bold text-green-500 uppercase mt-1.5 tracking-widest">Active Now</p>
                </div>
              </div>
              <div className="flex items-center gap-1 md:gap-2">
                <HeaderAction icon={<Video className="w-5 h-5" />} />
                <HeaderAction icon={<Phone className="w-5 h-5" />} />
                <HeaderAction icon={<MoreHorizontal className="w-5 h-5" />} className="hidden sm:flex" />
              </div>
            </header>

            <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 md:space-y-8 bg-[#FDFEFF]/50 custom-scrollbar">
              <div className="flex justify-center"><span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] bg-slate-50 px-4 py-2 rounded-full">Today</span></div>
              <MessageBubble text="Hello Alex! I've had a chance to look over your research proposal for the Honors Project." time="10:38 AM" sender="other" />
              <MessageBubble text="Thank you, Dr. Miller! I was actually worried about the data collection part. Do you suggest a smaller sample size?" time="10:40 AM" sender="me" isRead />
            </div>

            <footer className="p-4 md:p-6 bg-white border-t border-slate-50">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="flex-1 bg-slate-50 rounded-[24px] md:rounded-[28px] p-2 flex items-center gap-1 group transition-all focus-within:ring-4 focus-within:ring-blue-500/5 focus-within:bg-white focus-within:border-slate-200 border border-transparent min-w-0">
                  <motion.button whileHover={{ scale: 1.1 }} className="p-2 text-slate-400 hover:text-blue-600 flex-shrink-0">
                    <Plus size={22}/>
                  </motion.button>
                  <input 
                    type="text" 
                    placeholder="Type a message..." 
                    className="flex-1 bg-transparent border-none outline-none py-2 md:py-3 px-2 text-xs md:text-sm font-medium min-w-0" 
                  />
                  <motion.button whileHover={{ scale: 1.1 }} className="hidden sm:block p-2 text-slate-400 hover:text-blue-600 flex-shrink-0">
                    <Smile size={22}/>
                  </motion.button>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#002366] text-white w-[48px] h-[48px] md:w-[54px] md:h-[54px] rounded-[18px] md:rounded-[20px] shadow-lg shadow-blue-900/20 flex-shrink-0 flex items-center justify-center transition-all"
                >
                  <Send strokeWidth={2.5} className="w-5 h-5" />
                </motion.button>
              </div>
              <p className="hidden md:block text-[9px] text-center text-slate-300 font-black uppercase tracking-[0.2em] mt-4">Press Shift + Enter for new line • Communications are logged</p>
            </footer>
          </motion.div>

          {/* 3. INFO SIDEBAR - Hidden on mobile/tablette */}
          <motion.div variants={itemVars} className="hidden xl:flex w-[320px] flex-col gap-6 h-full">
            <div className="bg-white border border-slate-100 rounded-[32px] p-8 text-center shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-full blur-3xl opacity-50 group-hover:scale-150 transition-all" />
              <motion.img 
                whileHover={{ scale: 1.05, rotate: 2 }}
                src="https://i.pravatar.cc/150?u=sarah" 
                className="w-24 h-24 rounded-[32px] mx-auto mb-4 border-4 border-white shadow-xl relative z-10"
              />
              <h4 className="font-black text-xl text-[#002366]">Dr. Sarah Miller</h4>
              <p className="text-xs font-bold text-slate-400 mt-1">Head of Physics</p>
              <div className="flex justify-center gap-2 mt-6">
                <span className="px-3 py-1.5 bg-blue-50 text-blue-600 text-[9px] font-black uppercase tracking-widest rounded-lg">Professor</span>
                <span className="px-3 py-1.5 bg-orange-50 text-orange-600 text-[9px] font-black uppercase tracking-widest rounded-lg">Honors Mentor</span>
              </div>
            </div>

            <div className="bg-white border border-slate-100 rounded-[32px] p-6 shadow-sm overflow-y-auto custom-scrollbar">
              <div className="flex items-center justify-between mb-6">
                <h5 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Shared Files</h5>
                <span className="text-[10px] font-black text-blue-600 cursor-pointer">See all</span>
              </div>
              <div className="space-y-4">
                <FileItem name="Syllabus_2024.pdf" date="Oct 12" icon={<FileText size={18} className="text-red-500" />} />
                <FileItem name="Lab_Setup_Diagram.jpg" date="Sep 28" icon={<ImageIcon size={18} className="text-blue-500" />} />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

// --- Components ---

const ChatPreview = ({ name, msg, time, avatar, online, unread, active, onClick }) => (
  <motion.div 
    onClick={onClick}
    whileHover={{ x: 8, backgroundColor: "white" }}
    className={`p-4 md:p-5 rounded-[24px] md:rounded-[28px] cursor-pointer flex gap-3 md:gap-4 transition-all relative ${active ? 'bg-white shadow-xl shadow-slate-200/40 border border-slate-50' : 'border border-transparent'}`}
  >
    <div className="relative flex-shrink-0">
      <img src={avatar} className="w-12 h-12 md:w-14 md:h-14 rounded-2xl object-cover shadow-sm" alt="" />
      {online && <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 border-4 border-white rounded-full" />}
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex justify-between items-start mb-1">
        <h5 className={`text-sm font-black transition-colors truncate ${active ? 'text-blue-600' : 'text-[#002366]'}`}>{name}</h5>
        <span className="text-[9px] md:text-[10px] font-bold text-slate-300 whitespace-nowrap ml-2">{time}</span>
      </div>
      <p className="text-xs text-slate-400 font-medium truncate leading-relaxed">{msg}</p>
    </div>
    {unread && (
      <div className="absolute right-4 bottom-4 md:right-5 md:bottom-5 w-5 h-5 bg-blue-600 text-white text-[9px] font-black flex items-center justify-center rounded-lg shadow-lg">
        {unread}
      </div>
    )}
  </motion.div>
);

const MessageBubble = ({ text, time, sender, isRead }) => (
  <motion.div 
    initial={{ opacity: 0, x: sender === 'me' ? 20 : -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={springTransition}
    className={`flex flex-col ${sender === 'me' ? 'items-end' : 'items-start'}`}
  >
    <div className={`max-w-[85%] md:max-w-[75%] p-4 md:p-5 rounded-[22px] md:rounded-[28px] text-[13px] md:text-[14px] leading-relaxed font-medium shadow-sm ${
      sender === 'me' 
        ? 'bg-[#002366] text-white rounded-tr-none shadow-blue-900/10' 
        : 'bg-white text-[#1E293B] rounded-tl-none border border-slate-100'
    }`}>
      {text}
    </div>
    <div className="mt-2 flex items-center gap-2 px-1">
      <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">{time}</span>
      {sender === 'me' && isRead && <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest">Read</span>}
    </div>
  </motion.div>
);

const FileItem = ({ name, date, icon }) => (
  <motion.div whileHover={{ x: 5 }} className="flex items-center gap-3 group cursor-pointer">
    <div className="p-3 bg-slate-50 rounded-xl group-hover:bg-white group-hover:shadow-sm transition-all">{icon}</div>
    <div className="flex-1 min-w-0">
      <h6 className="text-[11px] md:text-[12px] font-black text-[#002366] truncate">{name}</h6>
      <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">{date}</p>
    </div>
  </motion.div>
);

const HeaderAction = ({ icon, className }) => (
  <motion.button 
    whileHover={{ scale: 1.1, backgroundColor: "#F8FAFC" }}
    whileTap={{ scale: 0.9 }}
    className={`p-2.5 md:p-3 text-slate-400 hover:text-blue-600 rounded-xl transition-all border border-transparent hover:border-slate-100 ${className}`}
  >
    {icon}
  </motion.button>
);

export default Messages;