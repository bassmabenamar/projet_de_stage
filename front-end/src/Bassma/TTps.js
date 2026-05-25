import React from 'react';
import { motion } from 'framer-motion';
import { 
  Code2, Terminal, Layers, 
  Braces, Users, ChevronRight, 
  Play, Sparkles 
} from 'lucide-react';

// Import dial Sidebar lli m-stylé
import Sidebar from './Sidebar';

const GestionTps = () => {
  const tpList = [
    {
      id: "01",
      level: "DÉBUTANT",
      title: "TP 01: JS Loops & Logic",
      desc: "Maîtrisez les structures itératives et la logique conditionnelle fondamentale en JavaScript moderne (ES6+).",
      students: "+1.2k complétés",
      icon: <ChevronRight size={18} className="text-slate-300" />,
      color: "border-orange-100"
    },
    {
      id: "02",
      level: "INTERMÉDIAIRE",
      title: "TP 02: Fetch API & Async",
      desc: "Apprenez à consommer des API REST, gérer les promesses et le traitement asynchrone avec async/await.",
      students: "+850 complétés",
      icon: <Sparkles size={18} className="text-slate-300" />,
      color: "border-blue-100"
    },
    {
      id: "03",
      level: "AVANCÉ",
      title: "TP 03: Architecture React",
      desc: "Mise en place d'une architecture robuste avec Context API et Custom Hooks pour des apps scalables.",
      students: "+420 complétés",
      icon: <Layers size={18} className="text-slate-300" />,
      color: "border-purple-100"
    },
    {
      id: "04",
      level: "DÉBUTANT",
      title: "TP 04: JSON & Objets",
      desc: "Manipulation des structures de données complexes et conversion JSON pour le stockage local.",
      students: "Nouveau TP disponible",
      icon: <Braces size={18} className="text-slate-300" />,
      color: "border-orange-100"
    }
  ];

  const categories = ["Tous les TP", "JavaScript", "React.js", "Python", "Base de données"];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 80 } }
  };

  return (
    <div className="flex min-h-screen bg-[#FDFDFF]">
      <Sidebar />

      <motion.main 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="flex-1 ml-72 p-12"
      >
        {/* --- Top Header (Codebook Academy Style) --- */}
        <div className="flex justify-between items-center mb-16">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-6 bg-[#F48120] rounded-full"></div>
            <span className="text-[#F48120] font-black text-xl tracking-tighter uppercase">Codebook Academy</span>
          </div>
          <motion.img 
            whileHover={{ scale: 1.1, rotate: 5 }}
            src="https://i.pravatar.cc/100?u=amal" 
            className="w-10 h-10 rounded-full border-2 border-slate-100 shadow-sm cursor-pointer"
          />
        </div>

        {/* --- Hero Section --- */}
        <motion.div variants={cardVariants} className="mb-12">
          <p className="text-[11px] font-black text-slate-300 uppercase tracking-[3px] mb-3">Parcours d'apprentissage</p>
          <h1 className="text-4xl font-black text-[#002366] mb-4 tracking-tight">Exercices Pratiques (TP)</h1>
          <p className="text-slate-400 font-medium max-w-2xl leading-relaxed">
            Relevez des défis techniques pour valider vos compétences et gagner de l'expérience concrète.
          </p>
        </motion.div>

        {/* --- Filter Tabs --- */}
        <motion.div variants={cardVariants} className="flex gap-4 mb-16">
          {categories.map((cat, i) => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-8 py-3 rounded-2xl text-xs font-black transition-all ${
                i === 0 
                ? 'bg-[#F48120] text-white shadow-lg shadow-orange-100' 
                : 'bg-white border border-slate-100 text-slate-400 hover:border-orange-200 hover:text-orange-500'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* --- TP Grid --- */}
        <div className="grid grid-cols-3 gap-8">
          {tpList.map((tp) => (
            <motion.div
              key={tp.id}
              variants={cardVariants}
              whileHover={{ 
                y: -12, 
                scale: 1.02,
                boxShadow: "0 30px 60px -12px rgba(0,0,0,0.05)"
              }}
              className="bg-white rounded-[40px] p-8 border border-slate-50 shadow-sm flex flex-col justify-between group transition-all"
            >
              <div>
                <div className="flex justify-between items-start mb-10">
                  <span className={`text-[9px] font-black px-4 py-1.5 rounded-full border ${tp.color} text-orange-400 tracking-widest`}>
                    {tp.level}
                  </span>
                  <div className="p-2 group-hover:rotate-12 transition-transform">
                    {tp.icon}
                  </div>
                </div>

                <h3 className="text-xl font-black text-[#002366] mb-4 group-hover:text-[#F48120] transition-colors">
                  {tp.title}
                </h3>
                <p className="text-sm text-slate-400 font-medium leading-relaxed mb-10">
                  {tp.desc}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-8">
                  <div className="flex -space-x-2">
                    <img src="https://i.pravatar.cc/40?img=1" className="w-6 h-6 rounded-full border-2 border-white" alt="user" />
                    <img src="https://i.pravatar.cc/40?img=2" className="w-6 h-6 rounded-full border-2 border-white" alt="user" />
                  </div>
                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-tighter">
                    {tp.students}
                  </span>
                </div>

                <motion.button
                  whileHover={{ backgroundColor: "#E67710" }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-[#F48120] text-white py-5 rounded-[24px] font-black text-xs flex items-center justify-center gap-3 shadow-md"
                >
                  Commencer le TP
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.main>
    </div>
  );
};

export default GestionTps;