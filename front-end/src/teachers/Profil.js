import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, Phone, ShieldCheck, Key, LogOut, 
  ChevronRight, Calendar, Users, MapPin, 
  Eye, EyeOff, Edit2, BadgeCheck, BookOpen, 
  TrendingUp, Clock
} from 'lucide-react';



const Profil = () => {
  const [showPassword, setShowPassword] = useState(false);

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const staggerContainer = {
    visible: { transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="flex min-h-screen bg-[#F1F5F9] font-sans text-[#1E293B]">
    

      <main className="flex-1 flex flex-col relative overflow-hidden">
       

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {/* --- HEADER SECTION --- */}
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={fadeInUp}
            className="mb-8"
          >
            <h1 className="text-[28px] font-black text-[#002366] tracking-tight">Teacher Profile</h1>
            <p className="text-slate-500 font-medium">Manage your academic identity and account security.</p>
          </motion.div>

          <motion.div 
            variants={staggerContainer} 
            initial="hidden" 
            animate="visible" 
            className="grid grid-cols-12 gap-6"
          >
            
            {/* --- 1. MAIN IDENTITY CARD --- */}
            <motion.div 
              variants={fadeInUp}
              whileHover={{ y: -5 }}
              className="col-span-12 lg:col-span-8 bg-white rounded-[32px] p-8 shadow-xl shadow-blue-900/5 border border-white flex flex-col md:flex-row gap-8 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-bl-[100px] -z-0" />
              
              {/* Profile Image & Status */}
              <div className="relative shrink-0 z-10">
                <motion.div 
                   whileHover={{ scale: 1.05 }}
                   className="relative"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&h=300&auto=format&fit=crop" 
                    className="w-40 h-40 rounded-[40px] object-cover shadow-2xl border-4 border-white"
                    alt="Dr. Elena Rodriguez"
                  />
                  <motion.button 
                    whileHover={{ rotate: 90, scale: 1.1 }}
                    className="absolute -bottom-2 -right-2 w-10 h-10 bg-[#002366] text-white rounded-full flex items-center justify-center shadow-lg border-4 border-white"
                  >
                    <Edit2 size={16} />
                  </motion.button>
                </motion.div>
              </div>

              {/* Bio Details */}
              <div className="flex-1 z-10">
                <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                  <div>
                    <h2 className="text-3xl font-black text-[#002366] tracking-tight mb-1">Dr. Elena Rodriguez</h2>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Senior Faculty •</span>
                      <span className="text-[11px] font-black text-blue-600 uppercase tracking-widest">Mathematics Department</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="bg-emerald-50 text-emerald-600 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest border border-emerald-100">
                      Active Status
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-lg">ID: T-2024-99</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <div className="flex items-center gap-4 group cursor-pointer">
                    <motion.div whileHover={{ rotate: 15 }} className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center transition-colors group-hover:bg-blue-600 group-hover:text-white">
                      <Mail size={20} />
                    </motion.div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-0.5">Institutional</p>
                      <p className="text-sm font-bold text-[#002366]">e.rodriguez@amity.edu</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 group cursor-pointer">
                    <motion.div whileHover={{ rotate: -15 }} className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center transition-colors group-hover:bg-orange-600 group-hover:text-white">
                      <Phone size={20} />
                    </motion.div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-0.5">Contact Ext.</p>
                      <p className="text-sm font-bold text-[#002366]">+1 (555) 012-4492</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* --- 2. SUBJECTS LIST --- */}
            <motion.div 
              variants={fadeInUp}
              className="col-span-12 lg:col-span-4 bg-white rounded-[32px] p-8 shadow-xl shadow-blue-900/5 border border-white"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="font-black text-[#002366] tracking-tight">Subjects</h3>
                <button className="text-[11px] font-black text-blue-600 uppercase hover:underline">Manage</button>
              </div>
              <div className="space-y-4">
                <SubjectItem icon={<TrendingUp size={18}/>} title="Advanced Calculus" code="AP-12" color="blue" />
                <SubjectItem icon={<BookOpen size={18}/>} title="Statistics II" code="UG-01" color="purple" />
                <SubjectItem icon={<MapPin size={18}/>} title="Euclidean Geometry" code="HS-10" color="orange" />
              </div>
            </motion.div>

            {/* --- 3. SCHEDULE SUMMARY --- */}
            <motion.div 
              variants={fadeInUp}
              className="col-span-12 lg:col-span-7 bg-white rounded-[32px] p-8 shadow-xl shadow-blue-900/5 border border-white"
            >
              <div className="flex justify-between items-center mb-10">
                <h3 className="font-black text-[#002366] tracking-tight flex items-center gap-2">
                  Schedule Summary
                </h3>
                <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-widest">
                  <Calendar size={14} /> Today, Oct 24
                </div>
              </div>

              <div className="space-y-8 relative before:absolute before:left-[111px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-50">
                <ScheduleRow 
                  time="09:00 AM" 
                  duration="60 mins" 
                  title="Room 302: Calculus AP" 
                  desc="Attendance Required • 24 Students" 
                  color="bg-blue-600"
                />
                <ScheduleRow 
                  time="11:30 AM" 
                  duration="90 mins" 
                  title="Faculty Meeting" 
                  desc="Main Conference Hall • Strategic Planning" 
                  color="bg-orange-500"
                />
                <ScheduleRow 
                  time="02:00 PM" 
                  duration="45 mins" 
                  title="Office Hours" 
                  desc="Virtual Session • Individual Mentoring" 
                  color="bg-slate-300"
                />
              </div>
            </motion.div>

            {/* --- 4. SECURITY & PRIVACY --- */}
            <motion.div 
              variants={fadeInUp}
              className="col-span-12 lg:col-span-5 bg-white rounded-[32px] p-8 shadow-xl shadow-blue-900/5 border border-white"
            >
              <h3 className="font-black text-[#002366] tracking-tight mb-8">Security & Privacy</h3>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Current Password</label>
                  <div className="relative">
                    <input 
                      type={showPassword ? "text" : "password"} 
                      defaultValue="password123"
                      className="w-full bg-slate-50 border-0 rounded-2xl py-4 px-4 text-sm font-bold focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                    />
                    <button 
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-blue-600"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">New Password</label>
                  <input 
                    type="password" 
                    placeholder="Enter new password"
                    className="w-full bg-slate-50 border-0 rounded-2xl py-4 px-4 text-sm font-bold focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-6 bg-blue-50/30 rounded-[24px] border border-blue-50 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm border border-blue-100">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <h4 className="text-[13px] font-black text-[#002366]">Two-Factor Authentication</h4>
                    <p className="text-[10px] font-bold text-slate-400 mt-0.5">Recommended for higher security</p>
                  </div>
                </div>
                <div className="relative inline-flex items-center cursor-pointer group">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#002366]"></div>
                </div>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02, backgroundColor: '#001a4d' }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#002366] text-white py-4 rounded-2xl font-black text-sm shadow-xl shadow-blue-900/20 flex items-center justify-center gap-2"
              >
                <Key size={18} /> Update Credentials
              </motion.button>
            </motion.div>

            {/* --- 5. SESSIONS BAR --- */}
            <motion.div 
              variants={fadeInUp}
              className="col-span-12 bg-[#001433] rounded-[24px] p-4 flex items-center justify-between shadow-2xl"
            >
              <div className="flex items-center gap-4 ml-4">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white/60">
                  <BadgeCheck size={20} />
                </div>
                <div>
                  <h4 className="text-white text-[13px] font-bold">Active Login Sessions</h4>
                  <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Currently signed in from 2 devices in San Jose, CA</p>
                </div>
              </div>
              <motion.button 
                whileHover={{ opacity: 0.8 }}
                className="bg-white/5 hover:bg-white/10 text-white/80 border border-white/10 px-6 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest flex items-center gap-2 transition-all"
              >
                <LogOut size={14} /> Sign out of all other devices
              </motion.button>
            </motion.div>

          </motion.div>
        </div>
      </main>
    </div>
  );
};

/* --- SUB-COMPONENTS --- */

const SubjectItem = ({ icon, title, code, color }) => {
  const colors = {
    blue: "bg-blue-50 text-blue-600 ring-blue-100",
    purple: "bg-purple-50 text-purple-600 ring-purple-100",
    orange: "bg-orange-50 text-orange-600 ring-orange-100"
  };

  return (
    <motion.div 
      whileHover={{ scale: 1.02, x: 5 }}
      className="flex items-center justify-between p-4 bg-[#F8FAFC] rounded-2xl border border-transparent hover:border-slate-100 transition-all cursor-pointer"
    >
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ring-1 ${colors[color]}`}>
          {icon}
        </div>
        <h4 className="text-[14px] font-bold text-[#002366]">{title}</h4>
      </div>
      <span className="text-[10px] font-black text-slate-400 bg-white px-3 py-1 rounded-lg border border-slate-100 uppercase tracking-widest">{code}</span>
    </motion.div>
  );
};

const ScheduleRow = ({ time, duration, title, desc, color }) => (
  <motion.div 
    whileHover={{ x: 10 }}
    className="flex items-start gap-12 group transition-all"
  >
    <div className="w-20 pt-1">
      <p className="text-[13px] font-black text-[#002366]">{time}</p>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{duration}</p>
    </div>
    <div className="flex items-start gap-6 flex-1">
      <div className={`w-3 h-3 rounded-full mt-2 ring-4 ring-white shadow-sm ${color}`} />
      <div>
        <h4 className="text-[15px] font-black text-[#002366] group-hover:text-blue-600 transition-colors">{title}</h4>
        <p className="text-sm text-slate-500 font-medium">{desc}</p>
      </div>
    </div>
  </motion.div>
);

export default Profil;