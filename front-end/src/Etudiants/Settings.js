import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, Sun, Moon, Globe, Bell, Shield, 
  Mail, MessageSquare, Smartphone, Camera,
  ExternalLink, Trash2, HelpCircle, Save, Check, RotateCw, ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import Navbar from './Navbar';
import api from './api';

const Settings = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  // Fetch user profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/student/profile');
        const profileData = response.data?.data || response.data;
        console.log('Profil chargé:', profileData);
        setUserData(profileData);
        setLoading(false);
      } catch (error) {
        console.error("Erreur chargement profil:", error);
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1 } 
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC]">
        <div className="text-2xl font-black text-[#002366] animate-pulse">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans text-[#1E293B]">
      <main className="flex-1 flex flex-col relative overflow-hidden min-w-0">
        <Navbar />

        <div className="flex-1 overflow-y-auto p-4 md:p-10">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-[1400px] mx-auto"
          >
            {/* Section En-tête */}
            <div className="mb-8 md:mb-10 text-center md:text-left">
              <h1 className="text-2xl md:text-[32px] font-black text-[#002366] leading-none mb-3">Paramètres</h1>
              <p className="text-sm text-slate-400 font-medium">Gérez vos préférences de compte, vos notifications et vos paramètres de sécurité.</p>
            </div>

            {/* Message de confirmation */}
            {saved && (
              <div className="fixed top-24 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-bounce">
                <Check size={18} /> Paramètres enregistrés !
              </div>
            )}

            <div className="grid grid-cols-12 gap-6 md:gap-10">
              
              {/* Colonne Gauche: Sections Principales */}
              <div className="col-span-12 lg:col-span-8 space-y-6 md:space-y-8">
                
                {/* 1. Section Apparence */}
                <SettingsSection icon={<Sun className="w-5 h-5" />} title="Apparence">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between py-5 border-b border-slate-100 gap-4">
                    <div>
                      <h4 className="text-sm font-black text-[#002366]">Mode Sombre</h4>
                      <p className="text-xs text-slate-400 font-medium">Ajustez l'interface pour réduire la fatigue oculaire.</p>
                    </div>
                    <div className="flex bg-slate-100 p-1.5 rounded-2xl gap-2 relative w-fit">
                      <ThemeToggle active={!darkMode} onClick={() => setDarkMode(false)} icon={<Sun className="w-3.5 h-3.5"/>} label="Clair" />
                      <ThemeToggle active={darkMode} onClick={() => setDarkMode(true)} icon={<Moon className="w-3.5 h-3.5"/>} label="Sombre" />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between py-5 gap-4">
                    <div>
                      <h4 className="text-sm font-black text-[#002366]">Langue de l'interface</h4>
                      <p className="text-xs text-slate-400 font-medium">Sélectionnez votre langue préférée.</p>
                    </div>
                    <select className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold text-[#002366] outline-none cursor-pointer w-full sm:w-auto">
                      <option>Français (FR)</option>
                      <option>Anglais (US)</option>
                      <option>Arabe (MA)</option>
                    </select>
                  </div>
                </SettingsSection>

                {/* 2. Préférences de Notification */}
                <SettingsSection icon={<Bell className="w-5 h-5" />} title="Préférences de Notification">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-8">
                    <NotificationBox 
                      icon={<Mail />} 
                      label="Alertes E-mail" 
                      desc="Mises à jour par mail." 
                      active={emailAlerts} 
                      onClick={() => setEmailAlerts(!emailAlerts)} 
                    />
                    <NotificationBox 
                      icon={<RotateCw />} 
                      label="Push" 
                      desc="Alertes mobiles." 
                      active={true} 
                    />
                    <NotificationBox 
                      icon={<MessageSquare />} 
                      label="SMS" 
                      desc="Textos critiques." 
                      active={false} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                     <ToggleItem label="Date limite des devoirs" status="TOUJOURS ACTIVÉ" permanent />
                     <ToggleItem label="Publication des notes" defaultChecked={true} />
                     <ToggleItem label="Newsletter de l'école" defaultChecked={false} />
                  </div>
                </SettingsSection>

                {/* 3. Confidentialité & Sécurité */}
                <SettingsSection icon={<Shield className="w-5 h-5" />} title="Confidentialité & Sécurité">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between py-5 border-b border-slate-100 gap-6">
                    <div className="sm:max-w-[60%]">
                      <h4 className="text-sm font-black text-[#002366]">Authentification à deux facteurs</h4>
                      <p className="text-xs text-slate-400 font-medium leading-relaxed">Ajoutez une couche de sécurité supplémentaire à votre compte étudiant.</p>
                    </div>
                    <motion.button 
                      whileHover={{ scale: 1.05, backgroundColor: '#001a4d' }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full sm:w-auto px-8 py-4 bg-[#002366] text-white text-[11px] font-black rounded-xl shadow-lg uppercase tracking-widest"
                    >
                      Activer la 2FA
                    </motion.button>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between py-5 gap-4">
                    <div>
                      <h4 className="text-sm font-black text-[#002366]">Visibilité du profil</h4>
                      <p className="text-xs text-slate-400 font-medium">Gérez qui peut voir vos réussites académiques.</p>
                    </div>
                    <select className="bg-slate-50 border-0 rounded-xl px-4 py-3 text-xs font-bold text-[#002366] outline-none w-full sm:w-auto">
                      <option>Public (Campus)</option>
                      <option>Privé</option>
                    </select>
                  </div>
                </SettingsSection>

                {/* Actions du bas */}
                <div className="flex flex-col sm:flex-row justify-end items-center gap-4 sm:gap-8 pt-6">
                    <button 
                      onClick={() => {
                        setEmailAlerts(true);
                        setDarkMode(false);
                      }}
                      className="text-xs font-bold text-slate-500 hover:text-slate-700 transition-colors"
                    >
                      Annuler les modifications
                    </button>
                    <motion.button 
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSave}
                      className="w-full sm:w-auto px-12 py-4 bg-[#002366] text-white text-xs font-bold rounded-xl shadow-xl shadow-blue-900/20"
                    >
                      Enregistrer tous les paramètres
                    </motion.button>
                </div>
              </div>

              {/* Colonne Droite: Widgets */}
              <div className="col-span-12 lg:col-span-4 space-y-6 md:space-y-8">
                {/* Widget Profil */}
                <div className="bg-white rounded-[28px] md:rounded-[32px] p-8 border border-slate-100 shadow-sm text-center">
                  <div className="w-24 h-24 md:w-28 md:h-28 mx-auto mb-6 relative">
                    <div className="w-full h-full rounded-full bg-blue-900 overflow-hidden border-4 border-white shadow-xl flex items-center justify-center">
                        {userData?.user?.photo ? (
                          <img src={userData.user.photo} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                          <User className="w-12 h-12 md:w-16 md:h-16 text-white/20" />
                        )}
                    </div>
                    <motion.button 
                      whileHover={{ scale: 1.1 }}
                      className="absolute bottom-0 right-0 w-8 h-8 md:w-9 md:h-9 bg-orange-500 text-white rounded-full flex items-center justify-center border-4 border-white shadow-lg"
                    >
                      <Camera className="w-3 h-3 md:w-3.5 md:h-3.5" />
                    </motion.button>
                  </div>
                  <h3 className="text-xl font-black text-[#002366] mb-1">
                    {userData?.user?.prenom} {userData?.user?.nom}
                  </h3>
                  <p className="text-xs font-bold text-slate-400 mb-8 tracking-tight">
                    {userData?.classe?.nom || 'Classe non assignée'}
                  </p>
                  <motion.button 
                    whileHover={{ scale: 1.02, backgroundColor: '#f8fafc' }}
                    className="w-full py-4 border-2 border-slate-100 rounded-2xl text-[11px] font-black text-slate-500 uppercase tracking-widest transition-all"
                  >
                    Modifier les infos de base
                  </motion.button>
                </div>

                {/* Widget Infos Contact */}
                <div className="bg-white rounded-[28px] md:rounded-[32px] p-8 border border-slate-100 shadow-sm">
                  <h4 className="text-xs font-black text-[#002366] mb-6">Informations de Contact</h4>
                  <div className="space-y-4">
                    <InfoRow icon={<Mail size={16} />} label="Email" value={userData?.user?.email || 'Non défini'} />
                    <InfoRow icon={<Smartphone size={16} />} label="Téléphone" value={userData?.user?.phone || 'Non défini'} />
                    <InfoRow icon={<Globe size={16} />} label="Adresse" value={userData?.user?.adresse || 'Non définie'} />
                  </div>
                </div>

                {/* Card Besoin d'aide */}
                <div className="bg-[#1E3A8A] rounded-[28px] md:rounded-[32px] p-8 text-white shadow-xl shadow-blue-900/20 relative overflow-hidden text-center md:text-left">
                    <h3 className="text-xl font-black mb-4">Besoin d'aide ?</h3>
                    <p className="text-blue-100/70 text-sm leading-relaxed font-medium mb-8">
                      Notre équipe support est disponible 24/7 pour tout problème lié au portail.
                    </p>
                    <motion.button 
                       whileHover={{ scale: 1.05, backgroundColor: '#f97316' }}
                       className="w-full py-4 bg-orange-500 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-lg"
                    >
                      <MessageSquare className="w-4 h-4" /> Contacter le Support
                    </motion.button>
                </div>

                {/* Widget Liens Rapides */}
                <div className="bg-white rounded-[28px] md:rounded-[32px] p-8 border border-slate-100 shadow-sm">
                  <h4 className="text-xs font-black text-[#002366] mb-8">Liens Rapides</h4>
                  <div className="space-y-5">
                    <QuickLink label="Politique de Confidentialité" />
                    <QuickLink label="Conditions d'Utilisation" />
                    <QuickLink label="Calendrier Académique" />
                    <QuickLink label="Supprimer le Compte" danger />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          <footer className="mt-16 md:mt-20 py-10 border-t border-slate-100 text-center">
            <p className="text-[9px] md:text-[10px] font-bold text-slate-400 tracking-wider">© 2024 SYSTÈME DE GESTION EDUELITE. TOUS DROITS RÉSERVÉS.</p>
          </footer>
        </div>
      </main>
    </div>
  );
};

// --- SOUS-COMPOSANTS ---

const SettingsSection = ({ icon, title, children }) => (
  <motion.div 
    variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
    className="bg-white rounded-[24px] border border-slate-100 shadow-sm overflow-hidden"
  >
    <div className="px-6 md:px-8 py-5 bg-[#F8FAFC] border-b border-slate-100 flex items-center gap-3">
        <span className="text-blue-900">{icon}</span>
        <h3 className="text-[10px] md:text-xs font-black text-[#002366] uppercase tracking-widest">{title}</h3>
    </div>
    <div className="px-6 md:px-8 py-4 md:py-6">{children}</div>
  </motion.div>
);

const ThemeToggle = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className="relative px-4 sm:px-6 py-2 rounded-xl text-[10px] font-black z-10 flex items-center gap-2 transition-all min-w-[80px] justify-center"
  >
    {active && (
      <motion.div 
        layoutId="active-bg"
        className="absolute inset-0 bg-white rounded-xl shadow-sm -z-10"
        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
      />
    )}
    <span className={active ? 'text-[#002366]' : 'text-slate-400'}>{icon}</span>
    <span className={active ? 'text-[#002366]' : 'text-slate-400'}>{label}</span>
  </button>
);

const NotificationBox = ({ icon, label, desc, active, onClick }) => (
  <motion.div 
    onClick={onClick}
    whileHover={{ y: -5, scale: 1.02 }}
    className={`p-5 md:p-6 rounded-[24px] border-2 cursor-pointer relative transition-all text-center sm:text-left ${
      active ? 'border-blue-900 bg-blue-50/20 shadow-lg shadow-blue-900/5' : 'border-slate-100 hover:border-slate-200 bg-white'
    }`}
  >
    <div className={`mb-4 flex justify-center sm:justify-start ${active ? 'text-blue-900' : 'text-slate-400'}`}>
      {React.cloneElement(icon, { className: "w-6 h-6" })}
    </div>
    <p className={`text-[12px] font-black mb-1 ${active ? 'text-[#002366]' : 'text-slate-500'}`}>{label}</p>
    <p className="text-[10px] text-slate-400 font-medium leading-tight">{desc}</p>
    
    <div className={`absolute top-4 right-4 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${active ? 'bg-blue-900 border-blue-900' : 'border-slate-200'}`}>
      {active && <Check className="w-3 h-3 text-white" strokeWidth={4} />}
    </div>
  </motion.div>
);

const ToggleItem = ({ label, status, defaultChecked, permanent }) => (
  <div className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0 group">
    <span className="text-xs md:text-sm font-bold text-slate-600 group-hover:text-blue-900 transition-colors">{label}</span>
    {permanent ? (
      <span className="text-[9px] md:text-[10px] font-black text-emerald-500 tracking-widest">{status}</span>
    ) : (
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" className="sr-only peer" defaultChecked={defaultChecked} />
        <div className="w-10 h-5 md:w-12 md:h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 md:after:h-5 md:after:w-5 after:transition-all peer-checked:bg-[#002366]"></div>
      </label>
    )}
  </div>
);

const QuickLink = ({ label, danger }) => (
  <motion.div 
    whileHover={{ x: 5 }}
    className="flex items-center justify-between group cursor-pointer"
  >
    <span className={`text-[11px] md:text-[12px] font-bold ${danger ? 'text-rose-500' : 'text-slate-500 group-hover:text-[#002366]'}`}>{label}</span>
    {danger ? <Trash2 className="w-3.5 h-3.5 text-rose-300" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-300" />}
  </motion.div>
);

const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-start gap-3 py-2 border-b border-slate-50 last:border-0">
    <div className="text-slate-400 mt-0.5">{icon}</div>
    <div className="flex-1">
      <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{label}</p>
      <p className="text-sm font-bold text-[#002366] break-all">{value}</p>
    </div>
  </div>
);

export default Settings;