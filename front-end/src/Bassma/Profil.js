import React from 'react';
import { motion } from 'framer-motion';
import { 
  User, Shield, Zap, Code2, 
  Bug, Rocket, LogOut, BarChart3, 
  Award, Edit3, ChevronRight 
} from 'lucide-react';

import Sidebar from './Sidebar'; 

const Profil = () => {
  return (
    <div className="flex min-h-screen bg-[#FDFDFF] font-sans text-slate-800">
      
      {/* Sidebar dyalk m-importya */}
      <Sidebar />

      {/* Main Content Area: M-centrer nichan b7al l-maquette */}
      <main className="flex-1 ml-72 flex flex-col items-center py-12 px-6 overflow-y-auto">
        
        {/* Top Navbar Style (Amity 22.9) */}
        <div className="w-full max-w-2xl flex justify-between items-center mb-12 px-4">
           <span className="text-[#F48120] font-black text-xl tracking-tighter uppercase">Codebook Academy</span>
           <motion.img 
             whileHover={{ scale: 1.1 }}
             src="https://i.pravatar.cc/100?u=alex" 
             className="w-10 h-10 rounded-full border-2 border-slate-100 cursor-pointer"
           />
        </div>

        {/* --- HEADER PROFILE (Alex Rivera) --- */}
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="relative mb-6">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ rotate: 5, scale: 1.05 }}
              className="w-32 h-32 rounded-full p-1 border-4 border-orange-500 shadow-xl shadow-orange-100 overflow-hidden bg-white"
            >
              <img 
                src="https://i.pravatar.cc/300?u=alex" 
                className="w-full h-full rounded-full object-cover" 
                alt="Alex Rivera" 
              />
            </motion.div>
            <motion.button 
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="absolute bottom-1 right-1 bg-[#F48120] text-white p-2 rounded-full border-4 border-white shadow-lg"
            >
              <Edit3 size={14} />
            </motion.button>
          </div>
          <h1 className="text-3xl font-black text-[#002366] mb-1">Alex Rivera</h1>
          <p className="text-slate-400 font-medium text-sm">alex.rivera@codebook.edu</p>
        </div>

        {/* --- CARD 1: INFORMATIONS DU PROFIL --- */}
        <motion.section 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="w-full max-w-xl bg-white rounded-[32px] p-8 shadow-[0_10px_40px_rgba(0,0,0,0.02)] border border-slate-50 mb-6"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-orange-50 p-2 rounded-xl text-orange-500">
              <User size={20} />
            </div>
            <h3 className="font-black text-lg text-[#002366]">Informations du Profil</h3>
          </div>

          <div className="space-y-6">
            <InfoRow label="Code d'accès" value="CB - 992 - KLR" isBadge />
            <InfoRow label="ID Appareil" value="MAC: 00-1A-2B-3C-4D-5E" />
            <InfoRow label="Statut" value="SESSION ACTIVE" isStatus />
          </div>
        </motion.section>

        {/* --- CARD 2: PROGRESSION --- */}
        <motion.section 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="w-full max-w-xl bg-white rounded-[32px] p-8 shadow-[0_10px_40px_rgba(0,0,0,0.02)] border border-slate-50 mb-6"
        >
          <div className="flex items-center gap-3 mb-10">
            <div className="bg-orange-50 p-2 rounded-xl text-orange-500">
              <BarChart3 size={20} />
            </div>
            <h3 className="font-black text-lg text-[#002366]">Progression</h3>
          </div>

          <div className="space-y-8 mb-10">
            <ProgressTrack label="Maîtrise de JavaScript" percent={78} />
            <ProgressTrack label="Architecture Backend" percent={45} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50/50 p-6 rounded-[24px] text-center border border-slate-100">
              <p className="text-3xl font-black text-[#002366] mb-1">12</p>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-tight">Cours complétés</p>
            </div>
            <div className="bg-slate-50/50 p-6 rounded-[24px] text-center border border-slate-100">
              <p className="text-3xl font-black text-[#002366] mb-1">482</p>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-tight">XP Accumulés</p>
            </div>
          </div>
        </motion.section>

        {/* --- SECTION: BADGES --- */}
        <div className="w-full max-w-xl mb-10">
          <div className="flex justify-between items-center mb-6 px-2">
            <div className="flex items-center gap-3">
               <Award className="text-orange-500" size={22} />
               <h3 className="font-black text-lg text-[#002366]">Badges Obtenus</h3>
            </div>
            <button className="text-[11px] font-black text-orange-500 uppercase tracking-widest hover:underline">Voir tout</button>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <BadgeItem icon={<Code2 size={24}/>} label="Génie du Code" color="bg-orange-50 text-orange-500" />
            <BadgeItem icon={<Zap size={24}/>} label="Apprenti Rapide" color="bg-blue-50 text-blue-500" />
            <BadgeItem icon={<Bug size={24}/>} label="Chasseur de Bugs" color="bg-green-50 text-green-500" />
            <BadgeItem icon={<Rocket size={24}/>} label="Visionnaire" color="bg-purple-50 text-purple-500" />
          </div>
        </div>

        {/* --- DECONNEXION BUTTON --- */}
        <motion.button 
          whileHover={{ scale: 1.02, backgroundColor: "#FFF5F5", borderColor: "#FED7D7" }}
          whileTap={{ scale: 0.98 }}
          className="w-full max-w-xl bg-white border-2 border-slate-100 py-5 rounded-[24px] flex items-center justify-center gap-3 text-red-600 font-black text-sm transition-all mb-20"
        >
          <LogOut size={18} />
          Déconnexion de la session
        </motion.button>
      </main>
    </div>
  );
};

// --- HELPER COMPONENTS ---

const InfoRow = ({ label, value, isBadge = false, isStatus = false }) => (
  <div className="flex justify-between items-center group cursor-default">
    <span className="text-[11px] font-black text-slate-300 uppercase tracking-widest">{label}</span>
    {isBadge ? (
      <span className="bg-[#F1F5F9] px-4 py-2 rounded-xl text-[11px] font-black text-[#002366] border border-slate-100 tracking-wider">
        {value}
      </span>
    ) : isStatus ? (
      <div className="flex items-center gap-2 bg-orange-50 px-4 py-2 rounded-full">
        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse"></div>
        <span className="text-[10px] font-black text-orange-600 tracking-tighter uppercase">{value}</span>
      </div>
    ) : (
      <span className="text-sm font-bold text-slate-600 tracking-tight group-hover:text-orange-500 transition-colors">{value}</span>
    )}
  </div>
);

const ProgressTrack = ({ label, percent }) => (
  <div>
    <div className="flex justify-between items-center mb-3 px-1">
      <span className="text-sm font-bold text-[#002366]">{label}</span>
      <span className="text-sm font-black text-orange-500">{percent}%</span>
    </div>
    <div className="w-full h-2.5 bg-slate-50 rounded-full overflow-hidden border border-slate-100">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${percent}%` }}
        transition={{ duration: 1.5, ease: "circOut" }}
        className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full"
      />
    </div>
  </div>
);

const BadgeItem = ({ icon, label, color }) => (
  <motion.div 
    whileHover={{ y: -8, scale: 1.05 }}
    className="flex flex-col items-center text-center cursor-pointer group"
  >
    <div className={`w-16 h-16 rounded-[24px] ${color} flex items-center justify-center mb-3 shadow-sm border border-white transition-all group-hover:shadow-lg`}>
      {icon}
    </div>
    <span className="text-[10px] font-black text-[#002366] leading-tight px-1 group-hover:text-orange-500 transition-colors">{label}</span>
  </motion.div>
);

export default Profil;