import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PlayCircle, CheckCircle2, Lock, 
  Clock, BarChart, Bookmark, 
  Download, ExternalLink, ChevronRight, 
  Play, FileText, Code2, Sparkles
} from 'lucide-react';

// Import dial Sidebar dialk
import Sidebar from './Sidebar';

const CoursDetails = () => {
  const programme = [
    { id: "01", title: "Pourquoi le HTML5 ?", time: "12:00", type: "Vidéo", status: "active" },
    { id: "02", title: "Configuration de l'environnement", time: "08:45", type: "Lecture", status: "completed" },
    { id: "03", title: "Les balises de structure", time: "15:30", type: "Vidéo", status: "locked" },
    { id: "04", title: "Texte et typographie", time: "10:15", type: "Quiz", status: "locked" },
    { id: "05", title: "Images et accessibilité", time: "18:00", type: "Vidéo", status: "locked" },
    { id: "06", title: "Listes et Liens", time: "12:20", type: "Lab", status: "locked" },
  ];

  // Extra Premium Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.08, delayChildren: 0.2 } 
    }
  };

  const fadeInUp = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { type: "spring", stiffness: 100, damping: 15 } 
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar />

      <motion.main 
        initial="hidden" 
        animate="visible" 
        variants={containerVariants}
        className="flex-1 ml-72 p-10 flex gap-10"
      >
        {/* --- LEFT COLUMN: CONTENT --- */}
        <div className="flex-[2.5] space-y-10">
          {/* Breadcrumbs with Hover Effect */}
          <motion.nav variants={fadeInUp} className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[2px]">
            <span className="hover:text-[#F48120] cursor-pointer transition-colors">Cours</span> 
            <ChevronRight size={12} strokeWidth={3} /> 
            <span className="hover:text-[#F48120] cursor-pointer transition-colors">Développement Web</span> 
            <ChevronRight size={12} strokeWidth={3} /> 
            <span className="text-[#F48120] flex items-center gap-1"><Sparkles size={12}/> HTML5 Fundamentals</span>
          </motion.nav>

          {/* Hero Video Section with Parallax Hover */}
          <motion.div 
            variants={fadeInUp}
            whileHover={{ scale: 1.01 }}
            className="relative rounded-[40px] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] group cursor-pointer"
          >
            <motion.img 
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 1.2 }}
              src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070" 
              className="w-full h-[480px] object-cover brightness-[0.75]" 
              alt="Course Hero" 
            />
            <div className="absolute inset-0 p-12 flex flex-col justify-end bg-gradient-to-t from-[#002366]/90 via-transparent to-transparent">
              <motion.span 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-[#F48120] text-white text-[9px] font-black px-5 py-2 rounded-full self-start mb-5 uppercase tracking-widest"
              >
                Module 1
              </motion.span>
              <h1 className="text-6xl font-black text-white tracking-tighter leading-[0.9]">
                Introduction <br/> au HTML5
              </h1>
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
               <motion.div whileHover={{ scale: 1.2 }} className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                 <Play size={32} fill="white" className="text-white ml-1" />
               </motion.div>
            </div>
          </motion.div>

          {/* Premium Info Bar */}
          <motion.div variants={fadeInUp} className="flex items-center gap-12 text-slate-400 text-[10px] font-black uppercase tracking-widest border-b border-slate-100 pb-10">
             <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-100 to-orange-50 flex items-center justify-center text-[#F48120]">JD</div>
               <span className="text-[#002366]">Jean-Damien • Expert Web</span>
             </div>
             <div className="flex items-center gap-2"><Clock size={18} className="text-orange-400"/> 4h 30min</div>
             <div className="flex items-center gap-2"><BarChart size={18} className="text-orange-400"/> Débutant</div>
          </motion.div>

          {/* Description & Learning Path */}
          <motion.div variants={fadeInUp} className="space-y-8">
            <p className="text-slate-500 font-medium leading-relaxed text-xl max-w-3xl">
              Maîtrisez l'ossature du web. Ce module vous guide de la <span className="text-[#002366] font-black underline decoration-orange-300">sémantique pure</span> jusqu'à l'intégration multimédia avancée.
            </p>

            <div className="bg-white border-2 border-slate-50 p-10 rounded-[40px] shadow-sm space-y-6 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-2 h-full bg-[#F48120]" />
               <h4 className="font-black text-[#002366] text-xs uppercase tracking-widest">Objectifs d'apprentissage</h4>
               <div className="grid grid-cols-2 gap-4">
                 {['Structure sémantique HTML5', 'Balises de contenu SEO', 'Accessibilité Web (A11Y)', 'Formulaires avancés'].map((text, i) => (
                   <motion.div 
                     key={i} 
                     whileHover={{ x: 10 }}
                     className="flex items-center gap-4 text-slate-600 font-bold text-sm"
                   >
                     <div className="bg-orange-50 p-1 rounded-full"><CheckCircle2 size={16} className="text-[#F48120]" /></div>
                     {text}
                   </motion.div>
                 ))}
               </div>
            </div>
          </motion.div>

          {/* Action Buttons with Scale & Shadow */}
          <motion.div variants={fadeInUp} className="flex gap-6 pt-4">
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -10px rgba(244, 129, 32, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#F48120] text-white px-12 py-5 rounded-[24px] font-black flex items-center gap-4 shadow-xl shadow-orange-100 transition-all"
            >
              Commencer le cours <Play size={18} fill="white" />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: "#002366", color: "#fff" }}
              whileTap={{ scale: 0.95 }}
              className="border-[3px] border-[#002366] text-[#002366] px-12 py-5 rounded-[24px] font-black flex items-center gap-4 transition-all"
            >
              <Bookmark size={20} /> Sauvegarder
            </motion.button>
          </motion.div>

          {/* Enhanced Resource Cards */}
          <div className="grid grid-cols-2 gap-8 pt-12">
            <ResourceCard icon={<FileText size={24} />} title="Guide PDF" color="text-blue-500" bg="bg-blue-50" link="Download" />
            <ResourceCard icon={<Code2 size={24} />} title="CodeLabs" color="text-purple-500" bg="bg-purple-50" link="Open Lab" isExternal />
          </div>
        </div>

        {/* --- RIGHT COLUMN: PROGRESS --- */}
        <div className="w-[400px] space-y-8">
          <motion.div 
            variants={fadeInUp}
            whileHover={{ y: -5 }}
            className="bg-white p-10 rounded-[40px] border border-slate-50 shadow-sm"
          >
            <div className="flex justify-between items-end mb-6">
              <div>
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Progression</p>
                <h3 className="text-3xl font-black text-[#002366]">35<span className="text-orange-500">%</span></h3>
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase">7/20 Leçons</p>
            </div>
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }} 
                animate={{ width: '35%' }} 
                transition={{ duration: 1.5, ease: "circOut" }} 
                className="h-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-full" 
              />
            </div>
          </motion.div>

          {/* Curriculum with Layout Animation */}
          <motion.div variants={fadeInUp} className="bg-white rounded-[40px] border border-slate-50 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between">
              <h3 className="font-black text-[#002366] text-xs uppercase tracking-[2px]">Programme</h3>
              <Sparkles size={16} className="text-orange-300" />
            </div>
            <div className="p-2">
              {programme.map((item, idx) => (
                <motion.div 
                  key={item.id} 
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 + (idx * 0.1) }}
                  whileHover={{ x: 10, scale: 1.02 }}
                  className={`p-5 rounded-[28px] flex items-center gap-5 transition-all cursor-pointer mb-1 ${
                    item.status === 'active' ? 'bg-orange-500 text-white shadow-lg shadow-orange-100' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-xs ${
                    item.status === 'active' ? 'bg-white/20' : 
                    item.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-slate-50 text-slate-300'
                  }`}>
                    {item.status === 'completed' ? <CheckCircle2 size={18} /> : item.id}
                  </div>
                  <div className="flex-1">
                    <h4 className={`text-[13px] font-black ${item.status === 'locked' ? 'text-slate-300' : ''}`}>{item.title}</h4>
                    <p className={`text-[9px] font-bold uppercase tracking-tighter ${item.status === 'active' ? 'text-white/80' : 'text-slate-400'}`}>
                      {item.time} • {item.type}
                    </p>
                  </div>
                  {item.status === 'locked' && <Lock size={14} className="text-slate-200" />}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.main>
    </div>
  );
};

// --- Extra Premium Resource Card ---
const ResourceCard = ({ icon, title, color, bg, link, isExternal }) => (
  <motion.div 
    whileHover={{ 
      y: -10, 
      scale: 1.05,
      boxShadow: "0 40px 80px -20px rgba(0,0,0,0.08)" 
    }} 
    className="bg-white p-8 rounded-[40px] border border-slate-50 shadow-sm flex flex-col items-center text-center space-y-4 group cursor-pointer transition-all"
  >
    <div className={`${bg} ${color} w-16 h-16 rounded-[24px] flex items-center justify-center transition-transform group-hover:rotate-12`}>
      {icon}
    </div>
    <h4 className="font-black text-[#002366] text-lg">{title}</h4>
    <button className="text-[#F48120] font-black text-[10px] uppercase tracking-widest flex items-center gap-2 group-hover:underline">
      {link} {isExternal ? <ExternalLink size={12}/> : <Download size={12}/>}
    </button>
  </motion.div>
);

export default CoursDetails;