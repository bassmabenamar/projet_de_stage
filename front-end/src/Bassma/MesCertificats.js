import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, Award, BookOpen, TrendingUp, 
  CheckCircle2, Lock, Download, Share2, 
  Star, Info, LayoutGrid, Sparkles, ChevronRight
} from 'lucide-react';

import Sidebar from './Sidebar';

const MesCertifications = () => {
  const certs = [
    { id: 1, title: "Certificat HTML", status: "Obtenu", desc: "Maîtrise complète de la structure sémantique et des formulaires avancés.", type: "HTML", color: "text-orange-500", border: "border-[#8B4513]", active: true },
    { id: 2, title: "Certificat CSS", status: "Disponible", desc: "Validez vos compétences en Flexbox, Grid et animations modernes.", type: "CSS", color: "text-blue-500", border: "border-slate-200", active: false },
    { id: 3, title: "Certificat JS", status: "Verrouillé", desc: "Complétez les modules JavaScript Essentials pour débloquer l'accès.", type: "JS", color: "text-yellow-500", border: "border-slate-100", locked: true, progress: 12 },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1, delayChildren: 0.2 } 
    }
  };

  const fadeInUp = {
    hidden: { y: 40, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { type: "spring", stiffness: 80, damping: 15 } 
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans">
      <Sidebar />

      <motion.main 
        initial="hidden" animate="visible" variants={containerVariants}
        className="flex-1 ml-72 p-10 space-y-12"
      >
        {/* --- NAVBAR TOP --- */}
        <div className="flex justify-between items-center px-4">
           <div className="text-[#F48120] font-black text-xl tracking-tight uppercase">CodeBook Academy</div>
           <div className="flex items-center gap-8 text-[11px] font-black text-slate-400 uppercase tracking-widest">
             <span className="hover:text-[#F48120] cursor-pointer transition-all">Home</span>
             <span className="text-[#F48120] border-b-2 border-[#F48120] pb-1 cursor-pointer">Certifications</span>
             <span className="hover:text-[#F48120] cursor-pointer transition-all">Community</span>
             <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 overflow-hidden">
                <img src="https://i.pravatar.cc/100?u=amal" alt="profile" />
             </div>
           </div>
        </div>

        {/* --- HERO SECTION --- */}
        <motion.div variants={fadeInUp} className="relative bg-[#E2E8F0] rounded-[48px] p-16 overflow-hidden shadow-sm">
           <div className="relative z-10 max-w-2xl">
             <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="bg-white/40 w-14 h-14 rounded-[20px] flex items-center justify-center mb-8 backdrop-blur-md border border-white/20">
               <Trophy size={28} className="text-white" />
             </motion.div>
             <h1 className="text-5xl font-black text-white mb-4 tracking-tighter leading-tight">Mes Certifications</h1>
             <p className="text-white/90 font-medium text-lg leading-relaxed">Validez vos compétences et obtenez vos certificats officiels.</p>
           </div>
           
           {/* Floating Badge Premium */}
           <motion.div 
             whileHover={{ scale: 1.05, y: -10, rotate: -2 }}
             className="absolute right-16 top-1/2 -translate-y-1/2 bg-gradient-to-br from-[#FBB03B] to-[#F48120] p-10 rounded-[40px] shadow-[0_20px_50px_rgba(244,129,32,0.3)] text-center min-w-[280px]"
           >
             <p className="text-[10px] font-black uppercase tracking-[3px] mb-3 text-white/70">Badge Actuel</p>
             <h2 className="text-3xl font-black text-white italic tracking-tight flex items-center justify-center gap-2">
               Expert Frontend <Sparkles size={20} />
             </h2>
           </motion.div>
        </motion.div>

        {/* --- STATS ROW --- */}
        <div className="grid grid-cols-3 gap-8">
          <StatCard icon={<Award className="text-orange-500" />} label="Total certificats" value="01" />
          <StatCard icon={<BookOpen className="text-blue-500" />} label="Cours complétés" value="14" />
          <StatCard icon={<TrendingUp className="text-green-500" />} label="Progression globale" value="38%" />
        </div>

        {/* --- CONTENT GRID --- */}
        <div className="grid grid-cols-12 gap-10 pt-4">
          
          {/* Left: Progression */}
          <motion.div variants={fadeInUp} className="col-span-4 bg-white rounded-[48px] p-10 border border-slate-50 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.03)] space-y-10">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-50 rounded-2xl text-orange-500"><LayoutGrid size={22} strokeWidth={2.5}/></div>
              <h3 className="text-2xl font-black text-[#002366] tracking-tight">Aperçu de la progression</h3>
            </div>
            
            <div className="space-y-8">
              <ProgressBar label="HTML Fundamentals" value={95} color="bg-orange-500" />
              <ProgressBar label="Advanced CSS" value={45} color="bg-blue-500" />
              <ProgressBar label="JavaScript Essentials" value={12} color="bg-yellow-500" />
              <ProgressBar label="Bootstrap 5" value={0} color="bg-purple-500" />
            </div>

            <div className="bg-slate-50 p-8 rounded-[32px] flex gap-5 border border-slate-100">
              <Info className="text-slate-400 shrink-0 mt-1" size={24} />
              <p className="text-[12px] text-slate-500 font-bold leading-relaxed">
                Atteignez <span className="text-[#002366] font-black">80% de complétion</span> sur un cours pour débloquer votre examen de certification.
              </p>
            </div>
          </motion.div>

          {/* Right: Grid Certifications */}
          <div className="col-span-8 space-y-10">
             <div className="flex items-center gap-4">
               <h3 className="text-2xl font-black text-[#002366] tracking-tight flex items-center gap-3">
                 <LayoutGrid className="text-orange-500" /> Grille des Certifications
               </h3>
             </div>
             
             <div className="grid grid-cols-2 gap-8">
               {certs.map((cert) => (
                 <motion.div 
                    key={cert.id}
                    whileHover={{ y: -15, scale: 1.02, boxShadow: "0 30px 60px -12px rgba(0,0,0,0.08)" }}
                    className={`bg-white p-10 rounded-[48px] border-2 ${cert.active ? 'border-[#8B4513]' : 'border-slate-50'} relative transition-all group cursor-pointer shadow-sm`}
                 >
                    {cert.active && (
                      <div className="absolute top-6 right-6 bg-[#8B4513] text-white p-2 rounded-full shadow-lg">
                        <Star size={14} fill="currentColor"/>
                      </div>
                    )}
                    <div className="flex items-center gap-5 mb-8">
                      <span className={`text-[11px] font-black p-3 rounded-2xl bg-slate-50 ${cert.color} group-hover:rotate-6 transition-transform`}>{cert.type}</span>
                      <div>
                        <h4 className="font-black text-xl text-[#002366] tracking-tight">{cert.title}</h4>
                        <p className={`text-[11px] font-black uppercase flex items-center gap-2 ${cert.locked ? 'text-slate-300' : 'text-green-500'}`}>
                          {cert.locked ? <Lock size={12}/> : <CheckCircle2 size={12}/>} {cert.status}
                        </p>
                      </div>
                    </div>
                    <p className="text-[13px] text-slate-400 font-medium leading-relaxed mb-10">{cert.desc}</p>
                    
                    <motion.button 
                      whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                      className={`w-full py-5 rounded-[24px] font-black text-xs uppercase tracking-widest transition-all ${
                        cert.active ? 'bg-[#8B4513] text-white shadow-lg shadow-orange-100' : 
                        cert.locked ? 'bg-slate-50 text-slate-300' : 'border-2 border-[#8B4513] text-[#8B4513] hover:bg-[#8B4513] hover:text-white'
                      }`}
                    >
                      {cert.locked ? `Débloquer (${cert.progress}%)` : cert.active ? "Voir le certificat" : "Obtenir mon certificat"}
                    </motion.button>
                 </motion.div>
               ))}
               
               <div className="bg-slate-50/40 rounded-[48px] border-4 border-dashed border-slate-100 flex flex-col items-center justify-center p-10 text-center group transition-all">
                  <div className="flex gap-2 mb-6">
                    {[1,2,3].map(i => <motion.div key={i} animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, delay: i*0.2 }} className="w-2 h-2 bg-slate-200 rounded-full" />)}
                  </div>
                  <p className="text-[12px] font-black text-slate-300 uppercase tracking-[2px] leading-relaxed">Bientôt disponible :<br/><span className="text-[#002366]">React & Node.js</span></p>
               </div>
             </div>
          </div>
        </div>

        {/* --- OBTAINED CERTIFICATE PREVIEW --- */}
        <motion.section variants={fadeInUp} className="space-y-10 pt-10">
           <h3 className="text-2xl font-black text-[#002366] tracking-tight flex items-center gap-3 italic underline decoration-[#F48120] decoration-4 underline-offset-8">
             <Award className="text-[#F48120]" /> Certificats obtenus
           </h3>
           
           <div className="bg-white rounded-[56px] overflow-hidden border border-slate-50 shadow-2xl shadow-slate-100 flex flex-col lg:flex-row items-stretch p-12 gap-16">
              <motion.div 
                whileHover={{ scale: 1.02, rotate: 1 }}
                className="flex-[1.2] bg-[#1A2332] p-12 rounded-[40px] shadow-2xl relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-all pointer-events-none" />
                <img src="https://i.imgur.com/8QjZz4Z.png" alt="Certificate HTML Specialist" className="w-full rounded-sm shadow-[0_40px_80px_rgba(0,0,0,0.5)] border border-white/5" />
              </motion.div>
              
              <div className="flex-1 flex flex-col justify-center space-y-12">
                 <div>
                   <p className="text-[12px] font-black text-[#F48120] uppercase tracking-[4px] mb-4">Réussite validée</p>
                   <h2 className="text-5xl font-black text-[#002366] tracking-tighter leading-tight">Certification HTML Specialist</h2>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-y-10 gap-x-8">
                    <InfoBox label="Détenteur" value="Amal Ettaliqi" />
                    <InfoBox label="Date d'émission" value="14 Juin 2026" />
                    <InfoBox label="Identifiant" value="CBA-2026-889412" />
                    <InfoBox label="Score Final" value="98/100" />
                 </div>
                 
                 <div className="flex gap-6 pt-6">
                    <motion.button 
                      whileHover={{ scale: 1.05, backgroundColor: "#6D3610", boxShadow: "0 20px 40px rgba(139, 69, 19, 0.3)" }}
                      className="flex-[1.5] bg-[#8B4513] text-white py-6 rounded-[28px] font-black text-xs uppercase tracking-widest flex items-center justify-center gap-4 transition-all"
                    >
                      <Download size={18}/> Télécharger PDF
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.05, border: "3px solid #8B4513" }}
                      className="flex-1 border-3 border-slate-100 text-slate-400 py-6 rounded-[28px] font-black text-xs uppercase tracking-widest flex items-center justify-center gap-4 transition-all"
                    >
                      <Share2 size={18}/> Partager
                    </motion.button>
                 </div>
              </div>
           </div>
        </motion.section>

      </motion.main>
    </div>
  );
};

// --- Sub-Components dial Premium UI ---
const StatCard = ({ icon, label, value }) => (
  <motion.div whileHover={{ y: -12, scale: 1.03 }} className="bg-white p-10 rounded-[40px] border border-slate-50 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.03)] flex items-center gap-8 group">
    <div className="bg-slate-50 p-6 rounded-[24px] group-hover:bg-orange-50 transition-colors">
      {React.cloneElement(icon, { size: 28, strokeWidth: 2.5 })}
    </div>
    <div>
      <p className="text-[11px] font-black text-slate-300 uppercase tracking-widest mb-2">{label}</p>
      <p className="text-4xl font-black text-[#002366] tracking-tighter">{value}</p>
    </div>
  </motion.div>
);

const ProgressBar = ({ label, value, color }) => (
  <div className="space-y-3">
    <div className="flex justify-between items-center text-[12px] font-black uppercase tracking-tight">
      <span className="text-[#002366]">{label}</span>
      <span className="text-orange-500">{value}%</span>
    </div>
    <div className="w-full h-2.5 bg-slate-50 rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }} animate={{ width: `${value}%` }} 
        transition={{ duration: 1.8, ease: "circOut" }} 
        className={`h-full ${color} rounded-full`} 
      />
    </div>
  </div>
);

const InfoBox = ({ label, value }) => (
  <div className="border-l-3 border-slate-100 pl-6">
    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-2">{label}</p>
    <p className="text-lg font-black text-[#002366] tracking-tight">{value}</p>
  </div>
);

export default MesCertifications;