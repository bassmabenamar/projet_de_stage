import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, RotateCcw, CloudCheck, FileCode, 
  Terminal, Monitor, ChevronRight, Settings,
  Maximize2, Share2, Sparkles, Code2
} from 'lucide-react';
import Sidebar from './Sidebar';

const CodeLab2= () => {
  const [activeTab, setActiveTab] = useState('html');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const editorVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar activePage="CodeLab" />

      <motion.main 
        initial="hidden" animate="visible" variants={containerVariants}
        className="flex-1 ml-72 p-6 flex flex-col h-screen"
      >
        {/* --- Top Navbar --- */}
        <div className="bg-white border border-slate-100 rounded-3xl p-3 mb-6 flex justify-between items-center shadow-sm">
          <div className="flex gap-2">
            <TabButton label="Projet_Alpha.html" active={activeTab === 'html'} onClick={() => setActiveTab('html')} />
            <TabButton label="style.css" active={activeTab === 'css'} onClick={() => setActiveTab('css')} />
            <TabButton label="script.js" active={activeTab === 'js'} onClick={() => setActiveTab('js')} />
          </div>

          <div className="flex items-center gap-6 pr-4">
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2 text-[10px] font-black text-slate-300 uppercase tracking-widest">
              <CloudCheck size={16} className="text-green-500" /> Sauvegardé
            </motion.div>
            <div className="h-6 w-px bg-slate-100" />
            <div className="flex gap-3">
              <motion.button whileHover={{ scale: 1.1, rotate: -10 }} className="p-2 text-slate-400 hover:text-[#002366]"><RotateCcw size={20} /></motion.button>
              <motion.button whileHover={{ scale: 1.05 }} className="bg-[#B35600] text-white px-6 py-2 rounded-xl font-black text-xs flex items-center gap-2 shadow-lg shadow-orange-100">
                <Play size={14} fill="currentColor" /> Exécuter
              </motion.button>
            </div>
          </div>
        </div>

        {/* --- Main Workspace --- */}
        <div className="flex-1 grid grid-cols-12 gap-6 overflow-hidden pb-4">
          
          {/* 1. Editor Panel m3a Scrollbar f l-jinb */}
          <motion.div 
            variants={editorVariants}
            className="col-span-7 bg-[#1E293B] rounded-[40px] border border-slate-800 shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="px-8 py-5 flex justify-between items-center border-b border-slate-800/50">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                  <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                </div>
                <span className="ml-4 text-[10px] font-black text-slate-500 uppercase tracking-[2px] flex items-center gap-2">
                  <Terminal size={14} /> Éditeur de Code
                </span>
              </div>
              <motion.button whileHover={{ rotate: 90 }} className="text-slate-500 hover:text-white">
                <Settings size={16} />
              </motion.button>
            </div>

            {/* Custom Scrollbar Area */}
            <div className="flex-1 p-8 font-mono text-sm leading-relaxed overflow-y-auto 
                            scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent 
                            hover:scrollbar-thumb-orange-500/50 transition-all">
              <CodeLine num="1" text="<!DOCTYPE html>" color="text-slate-500" />
              <CodeLine num="2" text="<html>" color="text-blue-400" />
              <CodeLine num="3" text="<head>" color="text-blue-400" />
              <CodeLine num="4" text="  <style>" color="text-blue-400" indent />
              <CodeLine num="5" text="    body { background: #f0f4f8 }" color="text-orange-300" indent2 />
              <CodeLine num="6" text="    h1 { color: #ff6b6b }" color="text-orange-300" indent2 />
              <CodeLine num="7" text="  </style>" color="text-blue-400" indent />
              <CodeLine num="8" text="</head>" color="text-blue-400" />
              <CodeLine num="9" text="<body>" color="text-blue-400" />
              <CodeLine num="10" text="  <h1>Bienvenue sur CodeLab !</h1>" color="text-white" indent />
              <CodeLine num="11" text="  <p>Commencez à coder ici...</p>" color="text-slate-400" indent />
              <CodeLine num="12" text="  <p>Ajoutez plus de lignes pour tester le scroll...</p>" color="text-slate-500" indent />
              <CodeLine num="13" text="  <p>Ligne 13</p>" color="text-slate-500" indent />
              <CodeLine num="14" text="  <p>Ligne 14</p>" color="text-slate-500" indent />
              <CodeLine num="15" text="  <p>Ligne 15</p>" color="text-slate-500" indent />
              <CodeLine num="16" text="</body>" color="text-blue-400" />
              <CodeLine num="17" text="</html>" color="text-blue-400" />
              <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1 }} className="w-2 h-5 bg-orange-500 inline-block align-middle ml-1" />
            </div>
          </motion.div>

          {/* 2. Live Preview Panel */}
          <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="col-span-5 flex flex-col gap-6">
            <div className="flex-1 bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
              <div className="px-8 py-5 border-b border-slate-50 flex justify-between items-center bg-white/80 backdrop-blur-md">
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-[2px] flex items-center gap-2"><Monitor size={14} /> Prévisualisation</span>
              </div>
              <div className="flex-1 p-10 flex flex-col items-center justify-center text-center space-y-6">
                <h1 className="text-4xl font-black text-[#B35600]">Bienvenue sur CodeLab !</h1>
                <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=400" alt="Coding preview" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </motion.main>

      {/* Global CSS for Premium Scrollbar */}
      <style jsx global>{`
        .scrollbar-thin::-webkit-scrollbar { width: 6px; }
        .scrollbar-track-transparent::-webkit-scrollbar-track { background: transparent; }
        .scrollbar-thumb-slate-700::-webkit-scrollbar-thumb { 
          background: #334155; 
          border-radius: 10px;
        }
        .scrollbar-thumb-orange-500\/50::-webkit-scrollbar-thumb:hover { 
          background: #B35600; 
        }
      `}</style>
    </div>
  );
};

const TabButton = ({ label, active, onClick }) => (
  <button onClick={onClick} className={`px-6 py-2.5 rounded-2xl text-[11px] font-black transition-all border ${active ? 'bg-orange-50 text-[#B35600] border-orange-100 shadow-sm' : 'bg-white text-slate-400 border-transparent hover:bg-slate-50'}`}>{label}</button>
);

const CodeLine = ({ num, text, color, indent, indent2 }) => (
  <div className="flex gap-6 py-0.5 group">
    <span className="w-8 text-slate-700 text-right select-none group-hover:text-slate-500">{num}</span>
    <span className={`${color} font-medium ${indent ? 'ml-6' : ''} ${indent2 ? 'ml-12' : ''}`}>{text}</span>
  </div>
);

export default CodeLab2;