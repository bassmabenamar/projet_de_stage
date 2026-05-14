import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Palette, Globe, Bell, ShieldCheck, Database, 
  Download, Check, ChevronDown 
} from 'lucide-react';

import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const Parametres = () => {
  const [theme, setTheme] = useState('clair');

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { staggerChildren: 0.1, duration: 0.6 }
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans text-[#1E293B]">
      <Sidebar />

      <main className="flex-1 flex flex-col relative overflow-hidden">
        <Navbar />

        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-[1200px] mx-auto"
          >
            {/* HEADER */}
            <motion.div variants={containerVariants} className="mb-10">
              <h1 className="text-[28px] font-black text-[#002366] mb-2">
                Paramètres
              </h1>
              <p className="text-slate-400 font-medium">
                Gérez vos préférences de compte, notifications et apparence de la plateforme.
              </p>
            </motion.div>

            <div className="grid grid-cols-12 gap-8 mb-8">
              
              {/* APPARENCE */}
              <motion.div 
                variants={containerVariants} 
                className="col-span-12 lg:col-span-8 bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm"
              >
                <div className="flex items-center gap-4 mb-8">
                  <motion.div 
                    whileHover={{ rotateY: 180 }}
                    transition={{ duration: 0.5 }}
                    className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 cursor-pointer"
                  >
                    <Palette size={20} />
                  </motion.div>

                  <div>
                    <h3 className="font-black text-[#002366]">
                      Apparence
                    </h3>
                    <p className="text-xs text-slate-400 font-medium">
                      Personnalisez l’apparence de la plateforme sur votre appareil.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <ThemeOption 
                    mode="clair" 
                    active={theme === 'clair'} 
                    onClick={() => setTheme('clair')} 
                  />

                  <ThemeOption 
                    mode="sombre" 
                    active={theme === 'sombre'} 
                    onClick={() => setTheme('sombre')} 
                  />
                </div>
              </motion.div>

              {/* LANGUE */}
              <motion.div 
                variants={containerVariants} 
                className="col-span-12 lg:col-span-4 bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm"
              >
                <div className="flex items-center gap-4 mb-8">
                  <motion.div 
                    whileHover={{ rotate: 90 }}
                    className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600 cursor-pointer"
                  >
                    <Globe size={20} />
                  </motion.div>

                  <h3 className="font-black text-[#002366]">
                    Langue
                  </h3>
                </div>
                
                <p className="text-xs text-slate-400 font-medium mb-6 leading-relaxed">
                  Choisissez votre langue préférée pour l’interface et les communications.
                </p>

                <div className="relative mb-8">
                  <motion.button 
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-[#002366]"
                  >
                    Français (Maroc)
                    <ChevronDown size={18} className="text-slate-400" />
                  </motion.button>

                  <p className="text-[10px] text-slate-300 font-bold mt-3 uppercase tracking-wider px-1">
                    Les modifications seront appliquées sur tous vos appareils.
                  </p>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.03, backgroundColor: '#001a4d' }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-4 bg-[#002366] text-white rounded-xl font-black text-xs shadow-lg uppercase tracking-[0.1em]"
                >
                  Enregistrer les préférences
                </motion.button>
              </motion.div>
            </div>

            {/* NOTIFICATIONS */}
            <motion.div 
              variants={containerVariants} 
              className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm mb-8"
            >
              <div className="flex justify-between items-start mb-10">
                <div className="flex items-center gap-4">
                  <motion.div 
                    whileHover={{ scale: 1.2, rotate: [0, -10, 10, -10, 0] }}
                    className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600"
                  >
                    <Bell size={20} />
                  </motion.div>

                  <div>
                    <h3 className="font-black text-[#002366]">
                      Notifications
                    </h3>

                    <p className="text-xs text-slate-400 font-medium">
                      Choisissez comment et quand vous souhaitez être informé.
                    </p>
                  </div>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.05, color: '#2563eb' }}
                  className="text-[11px] font-black text-[#002366] uppercase tracking-widest border-b-2 border-slate-100 pb-1"
                >
                  Réinitialiser
                </motion.button>
              </div>

              <div className="space-y-10">
                <NotificationRow 
                  title="Devoirs des étudiants" 
                  desc="Recevez une notification lorsqu’un étudiant remet un devoir ou un travail." 
                  email 
                  push 
                  toggle 
                />

                <NotificationRow 
                  title="Annonces scolaires" 
                  desc="Recevez les annonces importantes et mises à jour de l’établissement." 
                  email 
                  toggle 
                />

                <NotificationRow 
                  title="Messages privés" 
                  desc="Notifications pour les messages envoyés par d'autres enseignants ou parents." 
                  email 
                  push 
                />
              </div>
            </motion.div>

            {/* SÉCURITÉ */}
            <div className="grid grid-cols-12 gap-8">
              
              <motion.div 
                variants={containerVariants} 
                className="col-span-12 lg:col-span-7 bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm relative overflow-hidden"
              >
                <div className="relative z-10">
                  <h3 className="font-black text-[#002366] mb-4">
                    Sécurité
                  </h3>

                  <p className="text-sm text-slate-400 font-medium mb-8 max-w-[340px] leading-relaxed">
                    Protégez votre compte enseignant en activant l’authentification à deux facteurs et en vérifiant vos sessions actives.
                  </p>

                  <div className="flex gap-4">
                    <motion.button 
                      whileHover={{ scale: 1.05 }} 
                      whileTap={{ scale: 0.95 }} 
                      className="px-8 py-3 bg-[#002366] text-white rounded-xl font-black text-xs shadow-lg"
                    >
                      Configurer le 2FA
                    </motion.button>

                    <motion.button 
                      whileHover={{ scale: 1.05 }} 
                      whileTap={{ scale: 0.95 }} 
                      className="px-8 py-3 bg-white border border-slate-100 text-[#002366] rounded-xl font-black text-xs"
                    >
                      Voir les sessions
                    </motion.button>
                  </div>
                </div>

                <motion.div 
                  initial={{ opacity: 0.1, scale: 1 }}
                  whileHover={{ opacity: 0.3, scale: 1.1, rotate: 5 }}
                  className="absolute -right-4 -bottom-4 text-slate-100"
                >
                  <ShieldCheck size={200} />
                </motion.div>
              </motion.div>

              {/* GESTION DES DONNÉES */}
              <motion.div 
                variants={containerVariants} 
                className="col-span-12 lg:col-span-5 bg-[#002366] rounded-[32px] p-8 text-white relative overflow-hidden"
              >
                <h3 className="font-black text-lg mb-4">
                  Gestion des données
                </h3>

                <p className="text-blue-200/70 text-xs font-medium mb-10 leading-relaxed">
                  Téléchargez une archive complète de vos cours, notes et historiques de communication.
                </p>

                <div className="flex items-center justify-between relative z-10">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-3 px-6 py-3 bg-blue-500/20 backdrop-blur-md border border-white/10 rounded-xl text-xs font-black"
                  >
                    <Download size={16} />
                    Exporter
                  </motion.button>

                  <button className="text-xs font-bold text-blue-200 hover:text-white">
                    En savoir plus
                  </button>
                </div>

                <Database size={120} className="absolute -right-8 -top-8 text-white/5" />
              </motion.div>
            </div>

            {/* FOOTER */}
            <div className="mt-16 flex justify-between items-center text-[10px] font-bold text-slate-300 uppercase tracking-widest pb-10 px-2">
              <p>© 2026 Plateforme Éducative. Tous droits réservés.</p>

              <div className="flex gap-8">
                <a href="#" className="hover:text-blue-600 transition-colors">
                  Politique de confidentialité
                </a>

                <a href="#" className="hover:text-blue-600 transition-colors">
                  Conditions d’utilisation
                </a>

                <a href="#" className="hover:text-blue-600 transition-colors">
                  Centre d’assistance
                </a>
              </div>
            </div>

          </motion.div>
        </div>
      </main>
    </div>
  );
};

/* --- COMPONENTS --- */

const ThemeOption = ({ mode, active, onClick }) => (
  <motion.div 
    className="cursor-pointer"
    onClick={onClick}
    whileHover={{ y: -5 }}
  >
    <div className={`relative h-32 rounded-2xl border-2 transition-all mb-3 overflow-hidden ${
      active 
        ? 'border-blue-600 shadow-md shadow-blue-100' 
        : 'border-slate-100'
    }`}>
      
      <div className={`absolute inset-0 p-4 ${
        mode === 'clair' ? 'bg-slate-50' : 'bg-[#0F172A]'
      }`}>
        
        <div className={`w-full h-full rounded-lg border shadow-sm ${
          mode === 'clair'
            ? 'bg-white border-slate-100'
            : 'bg-[#1E293B] border-slate-800'
        }`}>
          <div className="p-2 space-y-2">
            <div className={`h-1.5 w-1/2 rounded-full ${
              mode === 'clair' ? 'bg-slate-100' : 'bg-slate-700'
            }`} />

            <div className={`h-1 w-3/4 rounded-full ${
              mode === 'clair' ? 'bg-slate-50' : 'bg-slate-800'
            }`} />
          </div>
        </div>
      </div>

      {active && (
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute bottom-3 right-3 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg"
        >
          <Check size={12} strokeWidth={4} />
        </motion.div>
      )}
    </div>

    <p className={`text-xs font-black text-center ${
      active ? 'text-[#002366]' : 'text-slate-400'
    }`}>
      {mode === 'clair' ? 'Mode Clair' : 'Mode Sombre'}
    </p>
  </motion.div>
);

const NotificationRow = ({ title, desc, email, push, toggle }) => (
  <div className="flex items-center justify-between">
    <div className="max-w-xl">
      <h4 className="text-sm font-black text-[#002366] mb-1">
        {title}
      </h4>

      <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
        {desc}
      </p>
    </div>

    <div className="flex items-center gap-10">
      <div className="flex items-center gap-6">

        <label className="flex items-center gap-2 cursor-pointer">
          <div className={`w-4 h-4 rounded border flex items-center justify-center ${
            email
              ? 'bg-blue-600 border-blue-600 text-white'
              : 'border-slate-200'
          }`}>
            {email && <Check size={10} strokeWidth={4} />}
          </div>

          <span className="text-[10px] font-black text-slate-400">
            Email
          </span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <div className={`w-4 h-4 rounded border flex items-center justify-center ${
            push
              ? 'bg-blue-600 border-blue-600 text-white'
              : 'border-slate-200'
          }`}>
            {push && <Check size={10} strokeWidth={4} />}
          </div>

          <span className="text-[10px] font-black text-slate-400">
            Push
          </span>
        </label>
      </div>

      <div className={`w-11 h-6 rounded-full relative p-1 ${
        toggle ? 'bg-blue-600' : 'bg-slate-100'
      }`}>
        <motion.div 
          animate={{ x: toggle ? 20 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="w-4 h-4 bg-white rounded-full shadow-sm"
        />
      </div>
    </div>
  </div>
);

export default Parametres;