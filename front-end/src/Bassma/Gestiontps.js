import React from 'react';
import { motion } from 'framer-motion';
import { 
  Search, Plus, Filter, Edit2, 
  Trash2, ChevronLeft, ChevronRight, 
  MoreHorizontal, Download, FileText, 
  CheckCircle2, Users, BarChart3, Terminal
} from 'lucide-react';

import Sidebar from './Sidebar';

const Gestiontps = () => {
  const tpData = [
    { id: "#TP-2024-001", title: "Calculatrice JavaScript Interactive", category: "JAVASCRIPT", difficulty: "Intermédiaire", color: "blue", students: "42" },
    { id: "#TP-2024-042", title: "Landing Page Moderne HTML/CSS", category: "CSS", difficulty: "Débutant", color: "green", students: "856" },
    { id: "#TP-2024-108", title: "Algorithmique Avancée avec Node.js", category: "NODE.JS", difficulty: "Avancé", color: "red", students: "124" },
    { id: "#TP-2024-056", title: "Gestion d'état avec React Context", category: "REACT", difficulty: "Intermédiaire", color: "blue", students: "392" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1, delayChildren: 0.2 } 
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar activePage="Gestion des TP" />

      <motion.main 
        initial="hidden" animate="visible" variants={containerVariants}
        className="flex-1 ml-72 p-10 space-y-8"
      >
        {/* --- Top Header --- */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-2xl font-black text-[#002366] flex items-center gap-3">
            <span className="w-1.5 h-6 bg-[#F48120] rounded-full"></span>
            Gestion des Travaux Pratiques (TP)
          </h1>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white rounded-xl shadow-sm cursor-pointer hover:bg-slate-50 transition-all border border-slate-100">
              <div className="relative">
                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></div>
                <Search size={20} className="text-slate-400" />
              </div>
            </div>
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0 10px 20px -5px rgba(244, 129, 32, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#F48120] text-white px-8 py-3.5 rounded-2xl font-black flex items-center gap-3 shadow-lg shadow-orange-100"
            >
              <Plus size={20} /> Ajouter un TP
            </motion.button>
          </div>
        </div>

        {/* --- Stats Cards --- */}
        <div className="grid grid-cols-3 gap-8">
          <StatCard icon={<Terminal className="text-orange-500" />} label="Total TP" value="142" bg="bg-orange-50" />
          <StatCard icon={<BarChart3 className="text-blue-500" />} label="Difficulté Moyenne" value="Intermédiaire" bg="bg-blue-50" />
          <StatCard icon={<Users className="text-green-500" />} label="Étudiants Actifs" value="1,284" bg="bg-green-50" />
        </div>

        {/* --- Main Table Section --- */}
        <motion.div variants={itemVariants} className="bg-white rounded-[40px] border border-slate-50 shadow-sm overflow-hidden">
          {/* Table Filters */}
          <div className="p-8 border-b border-slate-50 flex items-center justify-between">
            <div className="relative w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <input 
                type="text" 
                placeholder="Rechercher un TP (titre, ID...)" 
                className="w-full pl-12 pr-4 py-3 bg-slate-50/50 rounded-2xl text-sm font-medium border border-transparent focus:border-orange-200 outline-none transition-all"
              />
            </div>
            <div className="flex gap-4">
              <FilterButton label="Toutes les Catégories" />
              <FilterButton label="Toutes les Difficultés" />
            </div>
          </div>

          {/* Table Body */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-[10px] font-black text-slate-300 uppercase tracking-widest border-b border-slate-50">
                  <th className="px-8 py-6">Titre / ID</th>
                  <th className="px-8 py-6">Catégorie</th>
                  <th className="px-8 py-6">Difficulté</th>
                  <th className="px-8 py-6">Complété par</th>
                  <th className="px-8 py-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tpData.map((tp, idx) => (
                  <motion.tr 
                    key={idx}
                    whileHover={{ backgroundColor: "rgba(248, 250, 252, 0.5)" }}
                    className="group border-b border-slate-50 transition-all cursor-pointer"
                  >
                    <td className="px-8 py-6">
                      <h4 className="text-sm font-black text-[#002366] mb-1 group-hover:text-[#F48120] transition-colors">{tp.title}</h4>
                      <p className="text-[10px] font-bold text-slate-300 tracking-wider uppercase">{tp.id}</p>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`text-[9px] font-black px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-100 text-slate-400`}>
                        {tp.category}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${tp.color === 'blue' ? 'bg-blue-500' : tp.color === 'green' ? 'bg-green-500' : 'bg-red-500'}`} />
                        <span className="text-[11px] font-bold text-[#002366]">{tp.difficulty}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="flex -space-x-2">
                          <img src="https://i.pravatar.cc/30?img=1" className="w-6 h-6 rounded-full border-2 border-white shadow-sm" alt="u1" />
                          <img src="https://i.pravatar.cc/30?img=2" className="w-6 h-6 rounded-full border-2 border-white shadow-sm" alt="u2" />
                        </div>
                        <span className="text-[11px] font-bold text-slate-400">{tp.students === "42" ? "+42" : `${tp.students} étudiants`}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right space-x-2">
                      <button className="p-2 text-slate-300 hover:text-blue-500 transition-colors"><Edit2 size={16}/></button>
                      <button className="p-2 text-slate-300 hover:text-red-500 transition-colors"><Trash2 size={16}/></button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-8 border-t border-slate-50 flex items-center justify-between">
            <p className="text-[11px] font-bold text-slate-300 uppercase tracking-widest">Affichage de 1-4 sur 142 TP</p>
            <div className="flex items-center gap-1">
              <PaginationItem icon={<ChevronLeft size={16} />} disabled />
              <PaginationItem label="1" active />
              <PaginationItem label="2" />
              <PaginationItem label="3" />
              <PaginationItem icon={<ChevronRight size={16} />} />
            </div>
          </div>
        </motion.div>

        {/* --- Bottom Row: Chart & Guide --- */}
        <div className="grid grid-cols-12 gap-8">
          {/* Chart Section */}
          <motion.div variants={itemVariants} className="col-span-7 bg-white rounded-[40px] p-8 border border-slate-50 shadow-sm">
            <h3 className="font-black text-[#002366] mb-8 text-sm uppercase tracking-widest">Progression des TP (30 derniers jours)</h3>
            <div className="flex items-end justify-between h-48 px-4">
              {[60, 40, 80, 50, 95, 30, 100, 70].map((h, i) => (
                <motion.div 
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: 0.5 + (i * 0.1), duration: 1 }}
                  className={`w-12 rounded-t-xl ${h === 100 ? 'bg-[#F48120]' : 'bg-orange-100'}`}
                />
              ))}
            </div>
            <div className="flex justify-between mt-6 px-4 text-[10px] font-black text-slate-300 uppercase">
              <span>SEM 1</span><span>SEM 2</span><span>SEM 3</span><span>SEM 4</span>
            </div>
          </motion.div>

          {/* Guide Section */}
          <motion.div variants={itemVariants} className="col-span-5 bg-white rounded-[40px] p-8 border border-slate-50 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="font-black text-[#002366] mb-4 text-sm uppercase tracking-widest">Guide de Création</h3>
              <p className="text-xs text-slate-400 font-medium leading-relaxed mb-6">Optimisez vos exercices en suivant les standards de l'académie pour un meilleur engagement.</p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-[11px] font-black text-slate-600"><CheckCircle2 size={16} className="text-green-500" /> Énoncé clair et concis (max 500 mots)</li>
                <li className="flex items-center gap-3 text-[11px] font-black text-slate-600"><CheckCircle2 size={16} className="text-green-500" /> Fichiers de démarrage inclus</li>
                <li className="flex items-center gap-3 text-[11px] font-black text-slate-600"><CheckCircle2 size={16} className="text-green-500" /> Correction automatique configurée</li>
              </ul>
            </div>
            <motion.button 
              whileHover={{ backgroundColor: "#F8FAFC", border: "1px solid #002366" }}
              className="w-full py-4 border border-slate-100 rounded-2xl font-black text-[#002366] text-xs transition-all"
            >
              Consulter la documentation
            </motion.button>
          </motion.div>
        </div>
      </motion.main>
    </div>
  );
};

// --- Helper Components ---
const StatCard = ({ icon, label, value, bg }) => (
  <motion.div whileHover={{ y: -8, scale: 1.02 }} className="bg-white p-8 rounded-[32px] border border-slate-50 shadow-sm flex items-center gap-6">
    <div className={`${bg} p-4 rounded-2xl`}>{icon}</div>
    <div>
      <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">{label}</p>
      <p className="text-2xl font-black text-[#002366]">{value}</p>
    </div>
  </motion.div>
);

const FilterButton = ({ label }) => (
  <button className="px-6 py-3 bg-slate-50/50 border border-slate-100 rounded-2xl text-[11px] font-black text-slate-400 hover:text-orange-500 hover:border-orange-100 transition-all flex items-center gap-2">
    {label} <ChevronRight size={14} className="rotate-90 opacity-40" />
  </button>
);

const PaginationItem = ({ label, icon, active, disabled }) => (
  <button className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black transition-all ${
    active ? 'bg-[#F48120] text-white shadow-lg shadow-orange-100' : 
    disabled ? 'opacity-20 cursor-not-allowed' : 'text-slate-300 hover:bg-slate-50 hover:text-[#002366]'
  }`}>
    {label || icon}
  </button>
);

export default Gestiontps;