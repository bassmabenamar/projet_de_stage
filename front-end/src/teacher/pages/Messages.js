import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, Edit3, Video, Phone, MoreHorizontal, 
  Paperclip, Smile, Send, FileText, Image as ImageIcon, 
  Calendar, Mail, BellOff, ChevronRight, CheckCheck 
} from 'lucide-react';

import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const Messages = () => {
  const [activeTab, setActiveTab] = useState('Tous');

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans text-[#1E293B]">
      <Sidebar />

      <main className="flex-1 flex flex-col relative overflow-hidden">
        <Navbar />

        <div className="flex-1 flex overflow-hidden">
          {/* --- SIDEBAR DES DISCUSSIONS --- */}
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="w-[400px] bg-white border-r border-slate-100 flex flex-col shadow-sm z-10 shrink-0"
          >
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-[28px] font-black text-[#002366] tracking-tight">
                  Messages
                </h1>

                <motion.button 
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  className="p-3 bg-orange-50 text-orange-600 rounded-2xl shadow-sm"
                >
                  <Edit3 size={20} />
                </motion.button>
              </div>

              {/* Onglets */}
              <div className="flex p-1 bg-slate-50 rounded-2xl mb-8">
                {['Tous', 'Parents', 'Administration'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-3 text-[11px] font-black uppercase tracking-widest rounded-xl transition-all ${
                      activeTab === tab
                        ? 'bg-white text-[#002366] shadow-sm'
                        : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Recherche */}
              <div className="relative mb-6">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
                  size={18}
                />

                <input
                  type="text"
                  placeholder="Rechercher une conversation..."
                  className="w-full bg-slate-50 border-0 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar px-4 space-y-2 pb-8">
              <ChatPreview
                active
                name="M. David Harrison"
                msg="Bien sûr, j’enverrai l’autorisation demain matin."
                time="10:42"
                tag="Parent"
                status="online"
                img="https://i.pravatar.cc/150?u=david"
              />

              <ChatPreview
                name="Directrice Elena Vance"
                msg="Veuillez consulter les nouvelles directives pédagogiques..."
                time="Hier"
                tag="Administration"
                img="https://i.pravatar.cc/150?u=elena"
              />

              <ChatPreview
                name="Mme Martha Kent"
                msg="Merci d’avoir aidé Clark avec son projet."
                time="Mardi"
                tag="Parent"
                img="https://i.pravatar.cc/150?u=martha"
              />
            </div>
          </motion.div>

          {/* --- FENÊTRE PRINCIPALE --- */}
          <div className="flex-1 flex flex-col bg-[#FDFDFF] relative overflow-hidden min-w-[500px]">
            
            {/* Header */}
            <header className="h-24 bg-white/80 backdrop-blur-md border-b border-slate-100 px-8 flex items-center justify-between sticky top-0 z-20">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src="https://i.pravatar.cc/150?u=david"
                    className="w-12 h-12 rounded-full border-2 border-white shadow-md"
                    alt=""
                  />

                  <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full" />
                </div>

                <div>
                  <h2 className="font-black text-[#002366]">
                    M. David Harrison
                  </h2>

                  <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">
                    ● En ligne
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <HeaderIcon icon={<Video size={20} />} />
                <HeaderIcon icon={<Phone size={20} />} />
                <HeaderIcon icon={<MoreHorizontal size={20} />} />
              </div>
            </header>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar relative">
              <div className="flex justify-center mb-10">
                <span className="bg-slate-100 px-6 py-2 rounded-full text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                  Aujourd’hui
                </span>
              </div>

              <MessageBubble
                sender="other"
                time="10:15"
                text="Bonjour Professeur Jenkins, je voulais avoir des nouvelles des progrès de Leo en algèbre avancée."
              />

              <MessageBubble
                sender="me"
                time="10:28"
                isRead
                text="Bonjour M. Harrison ! Leo participe très bien en classe."
              />

              <MessageBubble
                sender="me"
                time="10:40"
                isRead
                text="J’ai joint le formulaire d’autorisation ici pour vous."
                file={{ name: "Autorisation.pdf", size: "1.2 MB" }}
              />
            </div>

            {/* Zone d’écriture */}
            <div className="p-8 bg-white/50 backdrop-blur-xl border-t border-slate-50">
              <motion.div
                whileFocus={{ scale: 1.005 }}
                className="max-w-[95%] mx-auto bg-white rounded-[32px] p-2 flex items-center gap-2 shadow-xl shadow-blue-900/5 border border-slate-100"
              >
                <button className="p-4 text-slate-300 hover:text-blue-600 transition-colors shrink-0">
                  <Paperclip size={22} />
                </button>

                <input
                  type="text"
                  placeholder="Écrivez votre message..."
                  className="flex-1 min-w-0 text-sm font-medium border-0 focus:ring-0 outline-none p-2"
                />

                <div className="flex items-center gap-2 shrink-0 pr-2">
                  <button className="p-2 text-slate-300 hover:text-orange-500 transition-colors">
                    <Smile size={22} />
                  </button>

                  <motion.button
                    whileHover={{ scale: 1.05, backgroundColor: '#001a4d' }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 bg-[#002366] text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-900/20"
                  >
                    <Send size={20} />
                  </motion.button>
                </div>
              </motion.div>

              <div className="flex justify-center mt-4">
                <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                  Appuyez sur Shift + Entrée pour une nouvelle ligne
                </p>
              </div>
            </div>
          </div>

          {/* --- SIDEBAR PROFIL --- */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="w-[360px] bg-white border-l border-slate-100 p-10 overflow-y-auto hidden xl:block shrink-0"
          >
            <div className="text-center mb-10">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative inline-block mb-6"
              >
                <img
                  src="https://i.pravatar.cc/150?u=david"
                  className="w-32 h-32 rounded-[40px] shadow-2xl border-4 border-white"
                  alt=""
                />

                <div className="absolute -bottom-2 -right-2 bg-emerald-500 w-8 h-8 rounded-2xl border-4 border-white" />
              </motion.div>

              <h3 className="text-2xl font-black text-[#002366] tracking-tight mb-1">
                David Harrison
              </h3>

              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
                Parent de Leo Harrison (10-B)
              </p>
            </div>

            <div className="space-y-10">
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h4 className="text-[11px] font-black text-slate-300 uppercase tracking-[0.2em]">
                    Fichiers partagés
                  </h4>

                  <button className="text-[10px] font-black text-blue-600 uppercase">
                    Voir tout
                  </button>
                </div>

                <div className="space-y-4">
                  <FileItem
                    name="Rapport_Maths_Q1.pdf"
                    date="28 Sep 2023"
                    type="pdf"
                  />

                  <FileItem
                    name="Projet_Sciences.jpg"
                    date="02 Oct 2023"
                    type="img"
                  />
                </div>
              </div>

              <div className="bg-orange-50/50 rounded-[32px] p-6 border border-orange-100">
                <h4 className="text-[11px] font-black text-orange-600 uppercase tracking-[0.2em] mb-4">
                  Réunion à venir
                </h4>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-orange-500 shadow-sm">
                    <Calendar size={20} />
                  </div>

                  <div>
                    <h5 className="text-[13px] font-black text-[#002366]">
                      Réunion Parents-Professeurs
                    </h5>

                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                      24 Oct 2023 à 16:30
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-6">
                <ActionButton icon={<Mail size={20} />} label="Email" />
                <ActionButton icon={<BellOff size={20} />} label="Muet" />
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

/* --- COMPOSANTS --- */

const ChatPreview = ({ name, msg, time, tag, active, status, img }) => (
  <motion.div
    whileHover={{ x: 5, backgroundColor: active ? '' : '#F8FAFC' }}
    className={`p-4 rounded-[32px] flex gap-4 cursor-pointer transition-all ${
      active ? 'bg-blue-50/60 ring-1 ring-blue-100' : ''
    }`}
  >
    <div className="relative shrink-0">
      <img
        src={img}
        className="w-14 h-14 rounded-2xl object-cover shadow-sm"
        alt=""
      />

      {status === 'online' && (
        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" />
      )}
    </div>

    <div className="flex-1 min-w-0">
      <div className="flex justify-between items-start mb-1">
        <h4 className="font-black text-[15px] text-[#002366] truncate">
          {name}
        </h4>

        <span className="text-[10px] font-bold text-slate-400 uppercase">
          {time}
        </span>
      </div>

      <p className={`text-[12px] font-medium truncate mb-2 ${
        active ? 'text-blue-700' : 'text-slate-400'
      }`}>
        {msg}
      </p>

      <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
        tag === 'Parent'
          ? 'bg-blue-100 text-blue-600'
          : 'bg-purple-100 text-purple-600'
      }`}>
        {tag}
      </span>
    </div>
  </motion.div>
);

const MessageBubble = ({ sender, text, time, file, isRead }) => (
  <motion.div
    initial={{ opacity: 0, y: 20, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    className={`flex flex-col ${
      sender === 'me' ? 'items-end' : 'items-start'
    }`}
  >
    <div
      className={`max-w-[70%] p-6 rounded-[32px] shadow-sm relative group transition-all hover:shadow-md ${
        sender === 'me'
          ? 'bg-[#002366] text-white rounded-br-none'
          : 'bg-white border border-slate-100 text-slate-600 rounded-bl-none'
      }`}
    >
      <p className="text-[15px] font-medium leading-relaxed">{text}</p>

      {file && (
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="mt-4 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 flex items-center justify-between gap-4 cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <FileText size={20} />
            </div>

            <div>
              <p className="text-[12px] font-black truncate w-40">
                {file.name}
              </p>

              <p className="text-[10px] opacity-60 font-bold uppercase tracking-widest">
                {file.size}
              </p>
            </div>
          </div>

          <ChevronRight size={18} />
        </motion.div>
      )}
    </div>

    <div className="flex items-center gap-2 mt-2 px-1">
      <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
        {time}
      </span>

      {isRead && <CheckCheck size={14} className="text-blue-500" />}
    </div>
  </motion.div>
);

const FileItem = ({ name, date, type }) => (
  <motion.div
    whileHover={{ x: 5, backgroundColor: '#F8FAFC' }}
    className="p-4 rounded-2xl flex items-center justify-between group cursor-pointer border border-transparent hover:border-slate-100 transition-all"
  >
    <div className="flex items-center gap-4">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
        type === 'pdf'
          ? 'bg-red-50 text-red-500'
          : 'bg-blue-50 text-blue-500'
      }`}>
        {type === 'pdf' ? <FileText size={18} /> : <ImageIcon size={18} />}
      </div>

      <div>
        <h5 className="text-[12px] font-black text-[#002366]">{name}</h5>

        <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mt-1">
          {date}
        </p>
      </div>
    </div>

    <motion.button
      whileHover={{ scale: 1.1 }}
      className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-300"
    >
      <MoreHorizontal size={18} />
    </motion.button>
  </motion.div>
);

const HeaderIcon = ({ icon }) => (
  <motion.button
    whileHover={{ scale: 1.1, backgroundColor: '#f8fafc', rotate: 5 }}
    whileTap={{ scale: 0.9 }}
    className="p-3 rounded-2xl text-slate-400 hover:text-[#002366] transition-colors"
  >
    {icon}
  </motion.button>
);

const ActionButton = ({ icon, label }) => (
  <motion.button
    whileHover={{ y: -5, backgroundColor: '#f8fafc' }}
    className="flex flex-col items-center gap-2 p-6 rounded-[32px] border border-slate-100 text-slate-400 hover:text-[#002366] transition-all"
  >
    {icon}

    <span className="text-[10px] font-black uppercase tracking-widest">
      {label}
    </span>
  </motion.button>
);

export default Messages;