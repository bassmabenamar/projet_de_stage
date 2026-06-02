import React from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, Search, HelpCircle, BarChart2, 
  Edit3, Trash2, ChevronLeft, ChevronRight, 
  Clock, FileText, Database, Code2, Sparkles, PlusCircle
} from 'lucide-react';

// Import dial Sidebar lli khdam biha
import Sidebar from './Sidebar';

const GestionQcm = () => {
  const stats = [
    { label: "Total Quiz", value: "24" },
    { label: "Questions Actives", value: "342" },
    { label: "Taux de Réussite Moyen", value: "72%", isPercent: true },
    { label: "Drafts", value: "5" },
  ];

  const drafts = [
    { title: "Introduction à Docker", desc: "Conteneurisation et gestion des images de base.", qs: 12, time: "2h" },
    { title: "Algorithmes de Tri", desc: "Complexité O(n log n) et implémentations QuickSort.", qs: 8, time: "hier" },
  ];

  const publishedQuiz = [
    { id: 1, title: "ES6 et Javascript Moderne", status: "ACTIF", desc: "Promesses, Async/Await et Déstructuration avancée.", qs: 25, resp: "1,240", success: "84%", icon: <Code2 size={20}/>, color: "text-orange-500 bg-orange-50" },
    { id: 2, title: "SQL Intermédiaire", status: "ACTIF", desc: "Jointures complexes, sous-requêtes et optimisation.", qs: 15, resp: "856", success: "65%", icon: <Database size={20}/>, color: "text-blue-500 bg-blue-50" },
    { id: 3, title: "Bases de Python 3.10", status: "MAINTENANCE", desc: "Structures de données, list comprehensions et décorateurs.", qs: 30, resp: "2,310", success: "78%", icon: <FileText size={20}/>, color: "text-purple-500 bg-purple-50" },
  ];

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar />

      <main className="flex-1 ml-72 p-10">
        {/* --- Header & Nouveau Quiz --- */}
        <div className="flex justify-between items-start mb-10">
          <div>
            <h1 className="text-3xl font-black text-[#002366] mb-2">Gestionnaire de QCM</h1>
            <p className="text-slate-400 font-medium">Créez, modifiez et analysez vos évaluations interactives.</p>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#F48120] text-white px-8 py-3 rounded-2xl font-black text-sm shadow-lg shadow-orange-100 flex items-center gap-2"
          >
            <Plus size={18} strokeWidth={3} />
            Nouveau Quiz
          </motion.button>
        </div>

        {/* --- Stats Grid --- */}
        <div className="grid grid-cols-4 gap-6 mb-12">
          {stats.map((s, i) => (
            <motion.div 
              key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-[24px] border border-slate-50 shadow-sm"
            >
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-3">{s.label}</p>
              <h3 className={`text-3xl font-black ${s.isPercent ? 'text-blue-500' : 'text-[#002366]'}`}>{s.value}</h3>
            </motion.div>
          ))}
        </div>

        {/* --- Brouillons en cours --- */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <HelpCircle size={18} className="text-slate-400" />
            <h2 className="text-lg font-black text-[#002366]">Brouillons en cours</h2>
          </div>
          
          <div className="grid grid-cols-3 gap-6">
            {drafts.map((draft, i) => (
              <motion.div 
                key={i} whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-[24px] border border-dashed border-slate-200 relative group"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-slate-100 text-slate-500 text-[9px] font-black px-2 py-1 rounded-md uppercase">Draft</span>
                  <span className="text-[10px] text-slate-300 font-medium italic">Modifié il y a {draft.time}</span>
                </div>
                <h4 className="font-black text-[#002366] mb-2">{draft.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed mb-6">{draft.desc}</p>
                <div className="flex justify-between items-center border-t border-slate-50 pt-4">
                   <span className="text-[10px] font-black text-slate-300 uppercase flex items-center gap-2">
                     <FileText size={12} /> {draft.qs} questions
                   </span>
                   <div className="flex gap-2">
                      <ActionButton icon={<Edit3 size={14}/>} color="text-orange-500 bg-orange-50" />
                      <ActionButton icon={<Trash2 size={14}/>} color="text-red-500 bg-red-50" />
                   </div>
                </div>
              </motion.div>
            ))}
            
            {/* Create New Draft Button */}
            <motion.div 
              whileHover={{ backgroundColor: "#FDFDFF" }}
              className="border-2 border-dashed border-slate-100 rounded-[24px] flex flex-col items-center justify-center gap-3 cursor-pointer group"
            >
              <PlusCircle className="text-slate-200 group-hover:text-orange-400 transition-colors" size={32} />
              <span className="text-[11px] font-black text-slate-300 uppercase tracking-widest">Créer un nouveau brouillon</span>
            </motion.div>
          </div>
        </section>

        {/* --- Quiz Publiés --- */}
        <section className="mb-10">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <div className="bg-orange-500 w-5 h-5 rounded-md flex items-center justify-center">
                 <CheckIcon className="text-white w-3 h-3" />
              </div>
              <h2 className="text-lg font-black text-[#002366]">Quiz Publiés</h2>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
              <input type="text" placeholder="Rechercher un quiz..." className="bg-white border border-slate-100 rounded-xl py-2 pl-10 pr-4 text-xs font-medium outline-none focus:ring-2 focus:ring-orange-100 w-64 transition-all" />
            </div>
          </div>

          <div className="space-y-4">
            {publishedQuiz.map((q) => (
              <motion.div 
                key={q.id} whileHover={{ scale: 1.01 }}
                className="bg-white p-5 rounded-[24px] shadow-sm border border-slate-50 flex items-center justify-between"
              >
                <div className="flex items-center gap-5 flex-1">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${q.color}`}>
                    {q.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="font-black text-[#002366]">{q.title}</h4>
                      <span className={`text-[8px] font-black px-2 py-0.5 rounded ${q.status === 'ACTIF' ? 'bg-green-50 text-green-500' : 'bg-slate-100 text-slate-400'}`}>
                        {q.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">{q.desc}</p>
                  </div>
                </div>

                <div className="flex items-center gap-12 text-center">
                  <StatMini label="Questions" value={q.qs} />
                  <StatMini label="Réponses" value={q.resp} />
                  <StatMini label="Succès" value={q.success} color="text-green-500" />
                  
                  <div className="flex items-center gap-3 ml-4">
                    <ActionButton icon={<BarChart2 size={16}/>} color="text-slate-400 hover:text-[#002366]" />
                    <ActionButton icon={<Edit3 size={16}/>} color="text-slate-400 hover:text-orange-500" />
                    <ActionButton icon={<Trash2 size={16}/>} color="text-slate-400 hover:text-red-500" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- Pagination --- */}
        <div className="flex justify-center items-center gap-3 mb-12">
           <ChevronLeft className="text-slate-300 cursor-pointer" size={20} />
           <PageNum num={1} active />
           <PageNum num={2} />
           <PageNum num={3} />
           <ChevronRight className="text-slate-300 cursor-pointer" size={20} />
        </div>

        {/* --- Bottom AI Promo Card --- */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="relative rounded-[40px] overflow-hidden bg-[#002366] p-12 text-white flex items-center justify-between"
        >
          <div className="relative z-10 max-w-xl">
            <h3 className="text-3xl font-black mb-4 leading-tight">Besoin d'aide pour générer vos questions ?</h3>
            <p className="text-slate-300 mb-8 text-sm leading-relaxed">Gagnez du temps en utilisant notre IA pour générer des questions pertinentes basées sur vos cours en un clic.</p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              className="bg-white text-[#002366] px-8 py-4 rounded-2xl font-black text-sm"
            >
              Essayer l'IA Générative
            </motion.button>
          </div>
          <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-orange-500/20 to-transparent"></div>
          <Sparkles className="absolute right-20 top-1/2 -translate-y-1/2 text-orange-500 opacity-20" size={180} />
        </motion.div>
      </main>
    </div>
  );
};

// --- Helpers ---
const ActionButton = ({ icon, color }) => (
  <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className={`p-2 rounded-lg transition-colors ${color}`}>
    {icon}
  </motion.button>
);

const StatMini = ({ label, value, color = "text-[#002366]" }) => (
  <div className="w-16">
    <p className="text-[9px] font-black text-slate-300 uppercase tracking-tighter mb-1">{label}</p>
    <p className={`text-sm font-black ${color}`}>{value}</p>
  </div>
);

const PageNum = ({ num, active = false }) => (
  <button className={`w-9 h-9 rounded-xl font-black text-sm transition-all ${active ? 'bg-[#F48120] text-white shadow-lg shadow-orange-100' : 'text-slate-400 hover:bg-white'}`}>
    {num}
  </button>
);

const CheckIcon = (props) => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
  </svg>
);

export default GestionQcm;