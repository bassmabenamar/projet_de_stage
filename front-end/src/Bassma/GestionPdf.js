import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Search, FileText, Eye, 
  Edit2, Trash2, ChevronLeft, ChevronRight, 
  TrendingUp, Sparkles, Menu
} from 'lucide-react';

import Sidebar from './Sidebar';

const GestionPdf = () => {
  const tableData = [
    { id: 1, title: "Introduction à la Sémantique HTML5", author: "Par Jean-Marc Dupont", cat: "HTML", date: "12 Oct 2023", size: "2.4 MB" },
    { id: 2, title: "Maîtriser Flexbox et Grid Layout", author: "Par Sophie Martin", cat: "CSS", date: "15 Oct 2023", size: "5.1 MB" },
    { id: 3, title: "ES6+ : Le JavaScript Moderne", author: "Par Marc Lavoine", cat: "JS", date: "20 Oct 2023", size: "3.8 MB" },
  ];

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans text-slate-800">
      <Sidebar />

      <main className="flex-1 ml-72 p-10">
        {/* --- TOP HEADER --- */}
        <header className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-4">
            <Menu className="text-slate-400 cursor-pointer hover:text-slate-900 transition-colors" size={20} />
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-tight">Plateforme Admin</h2>
          </div>
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-3 cursor-pointer">
            <img src="https://i.pravatar.cc/100?u=amal" className="w-9 h-9 rounded-full border-2 border-white shadow-sm" alt="Admin" />
            <ChevronRight size={14} className="text-slate-400 rotate-90" />
          </motion.div>
        </header>

        {/* --- TITLE & BUTTON --- */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-4xl font-black text-[#002366] mb-2 tracking-tight">Gestionnaire de PDF</h1>
            <p className="text-slate-400 font-medium">Gérez et organisez vos supports de cours numériques.</p>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05, shadow: "0 10px 25px -5px rgba(244, 129, 32, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#F48120] text-white px-8 py-4 rounded-2xl font-black text-sm flex items-center gap-3 transition-all"
          >
            <Plus size={20} strokeWidth={3} />
            Nouveau PDF
          </motion.button>
        </div>

        {/* --- STATS & SEARCH FILTERS --- */}
        <div className="grid grid-cols-12 gap-6 mb-8">
          {/* Total Resources Card */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="col-span-3 bg-white p-8 rounded-[32px] border border-slate-50 shadow-sm"
          >
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-[2px] mb-4">Total Ressources</p>
            <h3 className="text-5xl font-black text-[#002366] mb-4">124</h3>
            <div className="flex items-center gap-2 text-green-500 font-bold text-xs">
              <TrendingUp size={14} />
              <span>+12% ce mois</span>
            </div>
          </motion.div>

          {/* Search & Filters */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="col-span-9 bg-white p-8 rounded-[32px] border border-slate-50 shadow-sm flex flex-col justify-center"
          >
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
              <input 
                type="text" 
                placeholder="Rechercher par titre ou mot-clé..." 
                className="w-full bg-slate-50/50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-sm font-medium focus:ring-2 focus:ring-orange-100 outline-none transition-all"
              />
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[11px] font-black text-slate-300 uppercase tracking-widest mr-2">Filtres:</span>
              <FilterTab label="Tous" active />
              <FilterTab label="HTML" />
              <FilterTab label="CSS" />
              <FilterTab label="JavaScript" />
            </div>
          </motion.div>
        </div>

        {/* --- PDF TABLE --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[32px] border border-slate-50 shadow-sm overflow-hidden mb-10"
        >
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-50">
                <th className="p-6 text-[10px] font-black text-slate-300 uppercase tracking-widest">Titre de la ressource</th>
                <th className="p-6 text-[10px] font-black text-slate-300 uppercase tracking-widest">Catégorie</th>
                <th className="p-6 text-[10px] font-black text-slate-300 uppercase tracking-widest">Date d'ajout</th>
                <th className="p-6 text-[10px] font-black text-slate-300 uppercase tracking-widest">Taille</th>
                <th className="p-6 text-[10px] font-black text-slate-300 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {tableData.map((item) => (
                <motion.tr 
                  key={item.id}
                  whileHover={{ backgroundColor: "rgba(248, 250, 252, 0.8)" }}
                  className="group transition-colors"
                >
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-orange-500 border border-orange-100/50 shadow-sm">
                        <FileText size={22} />
                      </div>
                      <div>
                        <p className="text-sm font-black text-[#002366]">{item.title}</p>
                        <p className="text-[11px] text-slate-400 font-medium">{item.author}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <span className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-tighter border ${getCatStyle(item.cat)}`}>
                      {item.cat}
                    </span>
                  </td>
                  <td className="p-6 text-sm font-bold text-slate-500">{item.date}</td>
                  <td className="p-6 text-sm font-bold text-slate-500">{item.size}</td>
                  <td className="p-6 text-right">
                    <div className="flex justify-end gap-2">
                      <ActionButton icon={<Eye size={18}/>} color="hover:text-blue-500" />
                      <ActionButton icon={<Edit2 size={18}/>} color="hover:text-green-500" />
                      <ActionButton icon={<Trash2 size={18}/>} color="hover:text-red-500" />
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          
          {/* Pagination */}
          <div className="p-6 flex justify-between items-center bg-slate-50/30">
            <span className="text-[11px] font-black text-slate-400">Affichage de 1 à 3 sur 124 ressources</span>
            <div className="flex items-center gap-2">
              <PageBtn icon={<ChevronLeft size={16}/>} />
              <PageBtn label="1" active />
              <PageBtn label="2" />
              <PageBtn label="3" />
              <PageBtn icon={<ChevronRight size={16}/>} />
            </div>
          </div>
        </motion.div>

        {/* --- BOTTOM CARDS (Analyses Avancées) --- */}
        <div className="grid grid-cols-12 gap-8">
          <motion.div 
            whileHover={{ y: -5 }}
            className="col-span-7 relative h-[300px] rounded-[40px] overflow-hidden group shadow-2xl"
          >
            <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070" className="w-full h-full object-cover brightness-50 group-hover:scale-110 transition-transform duration-700" alt="Learning" />
            <div className="absolute inset-0 p-10 flex flex-col justify-end">
              <h3 className="text-2xl font-black text-white mb-2">Optimisation de l'Apprentissage</h3>
              <p className="text-white/80 text-sm font-medium leading-relaxed max-w-md">Nos supports PDF sont optimisés pour une lecture fluide sur tous les supports numériques des étudiants.</p>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="col-span-5 bg-gradient-to-br from-[#F48120] to-[#E86B00] rounded-[40px] p-10 text-white flex flex-col justify-between shadow-xl shadow-orange-100"
          >
            <Sparkles size={40} className="mb-4 opacity-50" />
            <div>
              <h3 className="text-3xl font-black mb-4">Analyses Avancées</h3>
              <p className="text-orange-50/80 text-sm font-medium leading-relaxed mb-8">Découvrez quels supports sont les plus consultés par vos élèves pour adapter votre programme pédagogique en temps réel.</p>
              <motion.button 
                whileHover={{ x: 5 }}
                className="bg-white text-[#F48120] px-8 py-3 rounded-xl font-black text-sm self-start shadow-lg"
              >
                Voir les statistiques
              </motion.button>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

// --- HELPER COMPONENTS ---

const FilterTab = ({ label, active = false }) => (
  <motion.button 
    whileTap={{ scale: 0.95 }}
    className={`px-6 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${
      active ? 'bg-orange-50 text-orange-600 shadow-sm border border-orange-100' : 'text-slate-400 hover:text-slate-600'
    }`}
  >
    {label}
  </motion.button>
);

const ActionButton = ({ icon, color }) => (
  <motion.button 
    whileHover={{ scale: 1.2 }}
    whileTap={{ scale: 0.9 }}
    className={`p-2 text-slate-300 transition-colors ${color}`}
  >
    {icon}
  </motion.button>
);

const PageBtn = ({ label, icon, active = false }) => (
  <button className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black transition-all ${
    active ? 'bg-[#F48120] text-white shadow-lg shadow-orange-100' : 'text-slate-400 hover:bg-white'
  }`}>
    {label || icon}
  </button>
);

const getCatStyle = (cat) => {
  switch(cat) {
    case 'HTML': return 'bg-blue-50 text-blue-600 border-blue-100';
    case 'CSS': return 'bg-purple-50 text-purple-600 border-purple-100';
    case 'JS': return 'bg-yellow-50 text-yellow-600 border-yellow-100';
    default: return 'bg-slate-50 text-slate-600 border-slate-100';
  }
};

export default GestionPdf;