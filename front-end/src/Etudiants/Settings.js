import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Sun, Moon, Globe, Bell, Shield, 
  Mail, MessageSquare, Smartphone, Camera,
  ExternalLink, Trash2, HelpCircle, Save, Check, RotateCw, ChevronRight
} from 'lucide-react';

import Navbar from './Navbar';

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [emailAlerts, setEmailAlerts] = useState(true);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1 } 
    }
  };

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
            {/* Header Section */}
            <div className="mb-8 md:mb-10 text-center md:text-left">
              <h1 className="text-2xl md:text-[32px] font-black text-[#002366] leading-none mb-3">Settings</h1>
              <p className="text-sm text-slate-400 font-medium">Manage your account preferences, notifications, and security settings.</p>
            </div>

            <div className="grid grid-cols-12 gap-6 md:gap-10">
              
              {/* Left Column: Main Sections */}
              <div className="col-span-12 lg:col-span-8 space-y-6 md:space-y-8">
                
                {/* 1. Appearance Section */}
                <SettingsSection icon={<Sun className="w-5 h-5" />} title="Appearance">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between py-5 border-b border-slate-50 gap-4">
                    <div>
                      <h4 className="text-sm font-black text-[#002366]">Dark Mode</h4>
                      <p className="text-xs text-slate-400 font-medium">Adjust the interface to reduce eye strain.</p>
                    </div>
                    <div className="flex bg-slate-100 p-1.5 rounded-2xl gap-2 relative w-fit">
                      <ThemeToggle active={!darkMode} onClick={() => setDarkMode(false)} icon={<Sun className="w-3.5 h-3.5"/>} label="Light" />
                      <ThemeToggle active={darkMode} onClick={() => setDarkMode(true)} icon={<Moon className="w-3.5 h-3.5"/>} label="Dark" />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between py-5 gap-4">
                    <div>
                      <h4 className="text-sm font-black text-[#002366]">Interface Language</h4>
                      <p className="text-xs text-slate-400 font-medium">Select your preferred language.</p>
                    </div>
                    <select className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold text-[#002366] outline-none cursor-pointer w-full sm:w-auto">
                      <option>English (US)</option>
                      <option>French (FR)</option>
                      <option>Arabic (MA)</option>
                    </select>
                  </div>
                </SettingsSection>

                {/* 2. Notification Preferences Section */}
                <SettingsSection icon={<Bell className="w-5 h-5" />} title="Notification Preferences">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-8">
                    <NotificationBox 
                      icon={<Mail />} 
                      label="Email Alerts" 
                      desc="Updates in inbox." 
                      active={emailAlerts} 
                      onClick={() => setEmailAlerts(!emailAlerts)} 
                    />
                    <NotificationBox 
                      icon={<RotateCw />} 
                      label="Push" 
                      desc="Mobile alerts." 
                      active={true} 
                    />
                    <NotificationBox 
                      icon={<MessageSquare />} 
                      label="SMS" 
                      desc="Critical text." 
                      active={false} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                     <ToggleItem label="Assignment Deadlines" status="ALWAYS ON" permanent />
                     <ToggleItem label="Grade Releases" defaultChecked={true} />
                     <ToggleItem label="School Newsletter" defaultChecked={false} />
                  </div>
                </SettingsSection>

                {/* 3. Privacy & Security Section */}
                <SettingsSection icon={<Shield className="w-5 h-5" />} title="Privacy & Security">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between py-5 border-b border-slate-50 gap-6">
                    <div className="sm:max-w-[60%]">
                      <h4 className="text-sm font-black text-[#002366]">Two-Factor Authentication</h4>
                      <p className="text-xs text-slate-400 font-medium leading-relaxed">Add an extra layer of security to your student account.</p>
                    </div>
                    <motion.button 
                      whileHover={{ scale: 1.05, backgroundColor: '#001a4d' }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full sm:w-auto px-8 py-4 bg-[#002366] text-white text-[11px] font-black rounded-xl shadow-lg uppercase tracking-widest"
                    >
                      Enable 2FA
                    </motion.button>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between py-5 gap-4">
                    <div>
                      <h4 className="text-sm font-black text-[#002366]">Profile Visibility</h4>
                      <p className="text-xs text-slate-400 font-medium">Manage who can see your achievements.</p>
                    </div>
                    <select className="bg-slate-50 border-0 rounded-xl px-4 py-3 text-xs font-bold text-[#002366] outline-none w-full sm:w-auto">
                      <option>Public (Campus)</option>
                      <option>Private</option>
                    </select>
                  </div>
                </SettingsSection>

                {/* Bottom Actions */}
                <div className="flex flex-col sm:flex-row justify-end items-center gap-4 sm:gap-8 pt-6">
                    <button className="text-xs font-bold text-slate-500 hover:text-slate-700 transition-colors">Cancel Changes</button>
                    <motion.button 
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full sm:w-auto px-12 py-4 bg-[#002366] text-white text-xs font-bold rounded-xl shadow-xl shadow-blue-900/20"
                    >
                      Save All Settings
                    </motion.button>
                </div>
              </div>

              {/* Right Column: Widgets */}
              <div className="col-span-12 lg:col-span-4 space-y-6 md:space-y-8">
                {/* Profile Widget */}
                <div className="bg-white rounded-[28px] md:rounded-[32px] p-8 border border-slate-100 shadow-sm text-center">
                  <div className="w-24 h-24 md:w-28 md:h-28 mx-auto mb-6 relative">
                    <div className="w-full h-full rounded-full bg-blue-900 overflow-hidden border-4 border-white shadow-xl flex items-center justify-center">
                       <User className="w-12 h-12 md:w-16 md:h-16 text-white/20" />
                    </div>
                    <motion.button 
                      whileHover={{ scale: 1.1 }}
                      className="absolute bottom-0 right-0 w-8 h-8 md:w-9 md:h-9 bg-orange-500 text-white rounded-full flex items-center justify-center border-4 border-white shadow-lg"
                    >
                      <Camera className="w-3 h-3 md:w-3.5 md:h-3.5" />
                    </motion.button>
                  </div>
                  <h3 className="text-xl font-black text-[#002366] mb-1">Alex Johnson</h3>
                  <p className="text-xs font-bold text-slate-400 mb-8 tracking-tight">Grade 11 • Science Stream</p>
                  <motion.button 
                    whileHover={{ scale: 1.02, backgroundColor: '#f8fafc' }}
                    className="w-full py-4 border-2 border-slate-100 rounded-2xl text-[11px] font-black text-slate-500 uppercase tracking-widest transition-all"
                  >
                    Edit Basic Info
                  </motion.button>
                </div>

                {/* Need Help Card */}
                <div className="bg-[#1E3A8A] rounded-[28px] md:rounded-[32px] p-8 text-white shadow-xl shadow-blue-900/20 relative overflow-hidden text-center md:text-left">
                   <h3 className="text-xl font-black mb-4">Need Help?</h3>
                   <p className="text-blue-100/70 text-sm leading-relaxed font-medium mb-8">
                     Our support team is available 24/7 for portal-related issues.
                   </p>
                   <motion.button 
                     whileHover={{ scale: 1.05, backgroundColor: '#f97316' }}
                     className="w-full py-4 bg-orange-500 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-lg"
                   >
                     <MessageSquare className="w-4 h-4" /> Contact Support
                   </motion.button>
                </div>

                {/* Quick Links Widget */}
                <div className="bg-white rounded-[28px] md:rounded-[32px] p-8 border border-slate-100 shadow-sm">
                  <h4 className="text-xs font-black text-[#002366] mb-8">Quick Links</h4>
                  <div className="space-y-5">
                    <QuickLink label="Privacy Policy" />
                    <QuickLink label="Terms of Service" />
                    <QuickLink label="Academic Calendar" />
                    <QuickLink label="Delete Account" danger />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          <footer className="mt-16 md:mt-20 py-10 border-t border-slate-100 text-center">
            <p className="text-[9px] md:text-[10px] font-bold text-slate-400 tracking-wider">© 2024 EDUElite MANAGEMENT SYSTEM. ALL RIGHTS RESERVED.</p>
          </footer>
        </div>
      </main>
    </div>
  );
};

/* --- PREMIUM SUB-COMPONENTS --- */

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

export default Settings;