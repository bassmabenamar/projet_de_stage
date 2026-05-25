import React from 'react';
import { motion } from 'framer-motion';
import { KeyRound, ArrowRight, GraduationCap, HelpCircle } from 'lucide-react';

const Login = () => {
  // Animation Variants dial l-vibe Premium
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-4 font-sans">
      
      {/* Logo Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-8 left-12"
      >
        <h1 className="text-[#E65100] font-black text-2xl tracking-tighter uppercase">
          CodeBook Academy
        </h1>
      </motion.div>

      {/* Main Login Card */}
      <motion.div 
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-[480px] bg-white rounded-[32px] overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-100"
      >
        {/* Header Header m-clony men l-image */}
        <div className="relative h-48 bg-[#1A365D] flex flex-col items-center justify-center overflow-hidden">
          {/* Overlay Background Effect */}
          <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1A365D]/90" />
          
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 10 }}
            className="relative z-10 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 mb-4"
          >
            <GraduationCap className="text-white" size={32} />
          </motion.div>
          <h2 className="relative z-10 text-white text-2xl font-black tracking-tight">Connexion Étudiant</h2>
        </div>

        {/* Form Content */}
        <div className="p-10 space-y-8">
          <div className="text-center space-y-2">
            <p className="text-slate-400 text-sm font-medium leading-relaxed">
              Veuillez saisir votre code d'accès unique pour accéder à votre espace de formation.
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-[11px] font-black text-[#002366] uppercase tracking-[2px] ml-1">
                Code d'accès unique
              </label>
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#E65100] transition-colors">
                  <KeyRound size={18} />
                </div>
                <input 
                  type="text" 
                  placeholder="Ex: CB-XXXX-XXXX"
                  className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-[#002366] outline-none transition-all focus:ring-4 ring-orange-50 focus:border-[#E65100]/30 focus:bg-white"
                />
              </div>
            </div>

            <div className="flex items-center justify-between px-1">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative w-5 h-5">
                  <input type="checkbox" className="peer absolute opacity-0" />
                  <div className="w-5 h-5 bg-slate-100 rounded-md border border-slate-200 peer-checked:bg-[#E65100] peer-checked:border-[#E65100] transition-all" />
                  <svg className="absolute inset-0 m-auto w-3 h-3 text-white scale-0 peer-checked:scale-100 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-xs font-bold text-slate-400 group-hover:text-slate-600 transition-colors">Se souvenir de moi</span>
              </label>
              <motion.button 
                whileHover={{ x: 3 }}
                className="text-xs font-black text-[#E65100] hover:underline"
              >
                Code oublié ?
              </motion.button>
            </div>

            <motion.button 
              whileHover={{ scale: 1.02, boxShadow: "0 15px 30px rgba(230, 81, 0, 0.2)" }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-[#FF6D00] text-white rounded-2xl font-black text-sm flex items-center justify-center gap-3 shadow-lg shadow-orange-100 transition-all"
            >
              Se connecter <ArrowRight size={18} />
            </motion.button>
          </div>

          <div className="pt-4 flex flex-col items-center gap-4">
            <button className="flex items-center gap-2 text-[11px] font-bold text-slate-400 hover:text-[#1A365D] transition-colors">
              <HelpCircle size={14} /> Difficultés de connexion ? <span className="text-[#1A365D] font-black underline ml-1">Besoin d'aide ?</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Footer Footer */}
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-8 text-[11px] font-bold text-slate-400 tracking-wider"
      >
        Accès réservé aux étudiants de CodeBook Academy.
      </motion.p>
    </div>
  );
};

export default Login;