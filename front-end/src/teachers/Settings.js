import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Palette, Globe, Bell, ShieldCheck, Database, 
  Download, Lock, Eye, Check, ChevronDown 
} from 'lucide-react';



const Settings = () => {
  const [theme, setTheme] = useState('light');

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
      

      <main className="flex-1 flex flex-col relative overflow-hidden">
       

        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-[1200px] mx-auto"
          >
            {/* Header Section */}
            <motion.div variants={containerVariants} className="mb-10">
              <h1 className="text-[28px] font-black text-[#002366] mb-2">Settings</h1>
              <p className="text-slate-400 font-medium">Manage your account preferences, notifications, and platform appearance.</p>
            </motion.div>

            <div className="grid grid-cols-12 gap-8 mb-8">
              {/* Appearance Card */}
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
                    <h3 className="font-black text-[#002366]">Appearance</h3>
                    <p className="text-xs text-slate-400 font-medium">Customize how Amity School looks on your device.</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <ThemeOption 
                    mode="light" 
                    active={theme === 'light'} 
                    onClick={() => setTheme('light')} 
                  />
                  <ThemeOption 
                    mode="dark" 
                    active={theme === 'dark'} 
                    onClick={() => setTheme('dark')} 
                  />
                </div>
              </motion.div>

              {/* Language Card */}
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
                  <h3 className="font-black text-[#002366]">Language</h3>
                </div>
                
                <p className="text-xs text-slate-400 font-medium mb-6 leading-relaxed">
                  Select your preferred language for the interface and communications.
                </p>

                <div className="relative mb-8">
                  <motion.button 
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-[#002366] transition-colors hover:border-blue-200"
                  >
                    English (United States)
                    <ChevronDown size={18} className="text-slate-400" />
                  </motion.button>
                  <p className="text-[10px] text-slate-300 font-bold mt-3 uppercase tracking-wider px-1">Changes will be applied across all devices.</p>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.03, backgroundColor: '#001a4d' }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-4 bg-[#002366] text-white rounded-xl font-black text-xs shadow-lg shadow-blue-900/20 uppercase tracking-[0.1em]"
                >
                  Save Preferences
                </motion.button>
              </motion.div>
            </div>

            {/* Notifications Section */}
            <motion.div variants={containerVariants} className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm mb-8">
              <div className="flex justify-between items-start mb-10">
                <div className="flex items-center gap-4">
                  <motion.div 
                    whileHover={{ scale: 1.2, rotate: [0, -10, 10, -10, 0] }}
                    className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 cursor-pointer"
                  >
                    <Bell size={20} />
                  </motion.div>
                  <div>
                    <h3 className="font-black text-[#002366]">Notifications</h3>
                    <p className="text-xs text-slate-400 font-medium">Decide how and when you want to be reached.</p>
                  </div>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.05, color: '#2563eb' }}
                  className="text-[11px] font-black text-[#002366] uppercase tracking-widest border-b-2 border-slate-100 transition-all pb-1"
                >
                  Reset to default
                </motion.button>
              </div>

              <div className="space-y-10">
                <NotificationRow title="Student Submissions" desc="Get notified when a student submits their homework or assignment for your review." email push toggle />
                <NotificationRow title="Class Announcements" desc="Receive alerts for school-wide announcements and emergency updates." email toggle />
                <NotificationRow title="Direct Messages" desc="Notifications for private messages from other faculty members or parents." email push />
              </div>
            </motion.div>

            {/* Security & Data Section */}
            <div className="grid grid-cols-12 gap-8">
              <motion.div 
                variants={containerVariants} 
                className="col-span-12 lg:col-span-7 bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm relative overflow-hidden group"
              >
                <div className="relative z-10">
                  <h3 className="font-black text-[#002366] mb-4">Security</h3>
                  <p className="text-sm text-slate-400 font-medium mb-8 max-w-[340px] leading-relaxed">
                    Keep your teacher account secure by enabling two-factor authentication and reviewing active sessions.
                  </p>
                  <div className="flex gap-4">
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-8 py-3 bg-[#002366] text-white rounded-xl font-black text-xs shadow-lg">Setup 2FA</motion.button>
                    <motion.button whileHover={{ scale: 1.05, backgroundColor: '#f8fafc' }} whileTap={{ scale: 0.95 }} className="px-8 py-3 bg-white border border-slate-100 text-[#002366] rounded-xl font-black text-xs transition-all">View Sessions</motion.button>
                  </div>
                </div>
                <motion.div 
                  initial={{ opacity: 0.1, scale: 1 }}
                  whileHover={{ opacity: 0.3, scale: 1.1, rotate: 5 }}
                  className="absolute -right-4 -bottom-4 text-slate-100 pointer-events-none"
                >
                  <ShieldCheck size={200} />
                </motion.div>
              </motion.div>

              <motion.div 
                variants={containerVariants} 
                className="col-span-12 lg:col-span-5 bg-[#002366] rounded-[32px] p-8 text-white relative overflow-hidden"
              >
                <h3 className="font-black text-lg mb-4">Data Management</h3>
                <p className="text-blue-200/70 text-xs font-medium mb-10 leading-relaxed">
                  Download a full archive of your class materials, grades, and communication history for offline backup.
                </p>
                <div className="flex items-center justify-between relative z-10">
                  <motion.button 
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.2)' }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-3 px-6 py-3 bg-blue-500/20 backdrop-blur-md border border-white/10 rounded-xl text-xs font-black"
                  >
                    <Download size={16} /> Request Export
                  </motion.button>
                  <button className="text-xs font-bold text-blue-200 hover:text-white transition-colors">Learn more</button>
                </div>
                <Database size={120} className="absolute -right-8 -top-8 text-white/5" />
              </motion.div>
            </div>

            {/* Footer Credits */}
            <div className="mt-16 flex justify-between items-center text-[10px] font-bold text-slate-300 uppercase tracking-widest pb-10 px-2">
              <p>© 2024 Amity School Systems. All rights reserved.</p>
              <div className="flex gap-8">
                <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-blue-600 transition-colors">Support Center</a>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

/* --- SUB-COMPONENTS --- */

const ThemeOption = ({ mode, active, onClick }) => (
  <motion.div 
    className="cursor-pointer" 
    onClick={onClick}
    whileHover={{ y: -5 }}
  >
    <div className={`relative h-32 rounded-2xl border-2 transition-all mb-3 overflow-hidden ${active ? 'border-blue-600 shadow-md shadow-blue-100' : 'border-slate-100 group-hover:border-slate-200'}`}>
      <div className={`absolute inset-0 p-4 ${mode === 'light' ? 'bg-slate-50' : 'bg-[#0F172A]'}`}>
        <div className={`w-full h-full rounded-lg border shadow-sm ${mode === 'light' ? 'bg-white border-slate-100' : 'bg-[#1E293B] border-slate-800'}`}>
          <div className="p-2 space-y-2">
            <div className={`h-1.5 w-1/2 rounded-full ${mode === 'light' ? 'bg-slate-100' : 'bg-slate-700'}`} />
            <div className={`h-1 w-3/4 rounded-full ${mode === 'light' ? 'bg-slate-50' : 'bg-slate-800'}`} />
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
    <p className={`text-xs font-black text-center ${active ? 'text-[#002366]' : 'text-slate-400'}`}>
      {mode === 'light' ? 'Light Mode' : 'Dark Mode'}
    </p>
  </motion.div>
);

const NotificationRow = ({ title, desc, email, push, toggle }) => (
  <div className="flex items-center justify-between group/row">
    <div className="max-w-xl">
      <h4 className="text-sm font-black text-[#002366] mb-1 group-hover/row:text-blue-600 transition-colors">{title}</h4>
      <p className="text-[11px] text-slate-400 font-medium leading-relaxed">{desc}</p>
    </div>
    <div className="flex items-center gap-10">
      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2 cursor-pointer group/cb">
          <motion.div 
            whileTap={{ scale: 0.8 }}
            className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${email ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-200'}`}
          >
            {email && <Check size={10} strokeWidth={4} />}
          </motion.div>
          <span className="text-[10px] font-black text-slate-400 group-hover/cb:text-[#002366]">Email</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer group/cb">
          <motion.div 
            whileTap={{ scale: 0.8 }}
            className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${push ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-200'}`}
          >
            {push && <Check size={10} strokeWidth={4} />}
          </motion.div>
          <span className="text-[10px] font-black text-slate-400 group-hover/cb:text-[#002366]">Push</span>
        </label>
      </div>
      <div 
        className={`w-11 h-6 rounded-full relative p-1 cursor-pointer transition-colors ${toggle ? 'bg-blue-600' : 'bg-slate-100'}`}
      >
        <motion.div 
          animate={{ x: toggle ? 20 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="w-4 h-4 bg-white rounded-full shadow-sm"
        />
      </div>
    </div>
  </div>
);

export default Settings;