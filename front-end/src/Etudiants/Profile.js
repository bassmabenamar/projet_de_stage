import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, Mail, Phone, BookOpen, Shield, 
  Edit3, Share2, Award, ChevronRight, Check, Plus
} from 'lucide-react';
import Navbar from './Navbar';

const springTransition = { type: "spring", stiffness: 300, damping: 20 };

const containerVars = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.08, delayChildren: 0.2 } 
  }
};

const itemVars = {
  hidden: { y: 20, opacity: 0, scale: 0.98 },
  visible: { 
    y: 0, 
    opacity: 1, 
    scale: 1,
    transition: springTransition
  }
};

const Profile = () => {
  const [isUpdating, setIsUpdating] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans text-[#1E293B]">
      <main className="flex-1 overflow-y-auto min-w-0">
        <Navbar />

        <motion.div 
          variants={containerVars}
          initial="hidden"
          animate="visible"
          className="p-4 md:p-8 max-w-[1400px] mx-auto"
        >
          {/* Breadcrumbs - Hidden on mobile for cleaner look */}
          <motion.div variants={itemVars} className="hidden sm:flex items-center gap-2 mb-8 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
              HOME <ChevronRight size={14} className="opacity-40" /> <span className="text-blue-600">STUDENT PROFILE</span>
          </motion.div>

          <div className="grid grid-cols-12 gap-6 md:gap-8">
            
            {/* LEFT COLUMN: Main ID Card */}
            <div className="col-span-12 lg:col-span-4 space-y-6 md:space-y-8">
              <motion.div 
                variants={itemVars}
                whileHover={{ y: -8 }}
                className="bg-white rounded-[28px] md:rounded-[32px] p-6 md:p-8 shadow-sm border border-slate-100 text-center relative overflow-hidden group transition-all hover:shadow-xl hover:shadow-slate-200/50"
              >
                <div className="mb-6 relative inline-block">
                  <motion.div 
                    animate={{ rotate: 360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-3 md:-inset-4 border-2 border-dashed border-blue-100 rounded-[35px] md:rounded-[40px] opacity-40" 
                  />
                  <img src="https://i.pravatar.cc/200?u=julian" className="w-28 h-28 md:w-36 md:h-36 rounded-[28px] md:rounded-[32px] object-cover border-4 md:border-8 border-[#F8FAFC] shadow-xl relative z-10" alt="Julian" />
                </div>
                
                <h3 className="text-xl md:text-2xl font-black text-[#002366] mb-1">Julian Amity</h3>
                <p className="text-slate-400 font-bold text-xs mb-6 md:mb-8 uppercase tracking-widest">Grade 11-B • Science Stream</p>
                
                <div className="flex gap-3 mb-6 md:mb-8">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 bg-[#002366] text-white py-3.5 rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-widest shadow-lg shadow-blue-900/20"
                  >
                    <Edit3 size={14} className="inline mr-2" /> Edit Profile
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.1 }} className="p-3.5 bg-slate-50 rounded-2xl text-slate-400 transition-colors hover:text-blue-600">
                    <Share2 size={18} />
                  </motion.button>
                </div>

                <div className="grid grid-cols-2 gap-4 py-4 md:py-6 border-t border-slate-50">
                  <Stat label="Attendance" value="98.4%" />
                  <Stat label="GPA" value="3.92" border />
                </div>
              </motion.div>

              <motion.div variants={itemVars} whileHover={{ y: -5 }} className="bg-white rounded-[28px] md:rounded-[32px] p-6 md:p-8 shadow-sm border border-slate-100">
                <h4 className="font-black text-[10px] text-[#002366] uppercase tracking-[0.3em] mb-6 md:mb-8 opacity-40">Quick Contacts</h4>
                <div className="space-y-5 md:space-y-6">
                  <ContactItem icon={<Mail className="w-4 h-4 md:w-5 md:h-5"/>} label="PERSONAL EMAIL" value="julian.a@amityschool.edu" />
                  <ContactItem icon={<Phone className="w-4 h-4 md:w-5 md:h-5"/>} label="MOBILE NUMBER" value="+1 (555) 012-3456" />
                </div>
              </motion.div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="col-span-12 lg:col-span-8 space-y-6 md:space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <InfoCard title="Personal Info" icon={<User className="w-4 h-4 md:w-5 md:h-5"/>}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 md:gap-y-6 gap-x-4">
                    <DataPoint label="DATE OF BIRTH" value="May 14, 2007" />
                    <DataPoint label="GENDER" value="Male" />
                    <DataPoint label="BLOOD GROUP" value="O Positive (O+)" />
                    <DataPoint label="RESIDENTIAL ADDRESS" value="742 Evergreen Terrace, Springfield, IL, USA" full />
                  </div>
                </InfoCard>

                <InfoCard title="Academic Details" icon={<BookOpen className="w-4 h-4 md:w-5 md:h-5"/>}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 md:gap-y-6 gap-x-4">
                    <DataPoint label="ADMISSION YEAR" value="2021" />
                    <DataPoint label="ENROLLMENT ID" value="AM-2021-88291" />
                    <DataPoint label="CURRENT GRADE" value="Grade 11" />
                    <DataPoint label="SECTION" value="B (Science)" />
                    <div className="col-span-1 sm:col-span-2">
                        <p className="text-[10px] font-black text-slate-300 uppercase mb-2">HOUSE COLOR</p>
                        <div className="flex items-center gap-3 bg-slate-50 p-2 rounded-xl w-fit pr-4">
                          <div className="w-3 h-3 rounded-full bg-blue-900 shadow-lg" />
                          <span className="text-[12px] md:text-sm font-black text-[#002366]">Blue House (Victory)</span>
                        </div>
                    </div>
                  </div>
                </InfoCard>
              </div>

              {/* Parent Contact Info */}
              <motion.div variants={itemVars} whileHover={{ y: -5 }} className="bg-white rounded-[28px] md:rounded-[32px] p-6 md:p-8 shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-6 md:mb-8">
                  <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600 shadow-inner"><Award className="w-5 h-5"/></div>
                  <h4 className="font-black text-lg md:text-xl text-[#002366]">Guardian Contact</h4>
                </div>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6">
                  <GuardianBox name="Robert Amity" role="FATHER • PRIMARY" phone="+1 (555) 098-7654" email="r.amity@corp.com" img="https://i.pravatar.cc/150?u=robert" />
                  <GuardianBox name="Sarah Amity" role="MOTHER • SECONDARY" phone="+1 (555) 098-7655" email="sarah.a@arch.com" img="https://i.pravatar.cc/150?u=sarah" />
                </div>
              </motion.div>

              {/* SECURITY */}
              <motion.div variants={itemVars} whileHover={{ y: -5 }} className="bg-white rounded-[28px] md:rounded-[32px] p-6 md:p-10 shadow-sm border border-slate-100 relative overflow-hidden group transition-all hover:shadow-xl hover:shadow-slate-200/50">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-full blur-3xl opacity-50 transition-all group-hover:scale-150" />
                <div className="flex items-center gap-3 mb-1 text-orange-600">
                  <Shield className="w-5 h-5 md:w-6 md:h-6"/>
                  <h4 className="font-black text-lg md:text-xl text-[#002366]">Security Settings</h4>
                </div>
                <p className="text-[10px] text-slate-400 font-bold mb-8 md:mb-10 sm:ml-9 uppercase tracking-widest">Update credentials to maintain protection.</p>
                
                <div className="space-y-5 md:space-y-6 max-w-2xl relative z-10">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-300 uppercase tracking-widest ml-1">Current Password</label>
                    <input type="password" placeholder="••••••••" className="w-full bg-slate-50 border border-transparent rounded-2xl py-3.5 md:py-4 px-6 outline-none focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all font-medium text-sm" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-300 uppercase tracking-widest ml-1">New Password</label>
                      <input type="password" placeholder="••••••••" className="w-full bg-slate-50 border border-transparent rounded-2xl py-3.5 md:py-4 px-6 outline-none focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all font-medium text-sm" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-300 uppercase tracking-widest ml-1">Confirm Password</label>
                      <input type="password" placeholder="••••••••" className="w-full bg-slate-50 border border-transparent rounded-2xl py-3.5 md:py-4 px-6 outline-none focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all font-medium text-sm" />
                    </div>
                  </div>
                  
                  <motion.button 
                    onClick={() => {setIsUpdating(true); setTimeout(()=>setIsUpdating(false), 2000)}}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full sm:w-auto px-10 md:px-12 py-4 rounded-[20px] font-black text-[10px] md:text-xs uppercase tracking-widest shadow-xl transition-all ${isUpdating ? 'bg-green-500 shadow-green-100' : 'bg-orange-500 shadow-orange-100'} text-white`}
                  >
                    {isUpdating ? <span className="flex items-center justify-center gap-2 font-black tracking-widest"><Check size={16}/> Success!</span> : "Update Password"}
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Floating Action Button */}
      <motion.button 
        whileHover={{ scale: 1.15, rotate: 90, shadow: "0px 10px 30px rgba(0, 35, 102, 0.4)" }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 w-14 h-14 md:w-16 md:h-16 bg-[#002366] text-white rounded-full flex items-center justify-center shadow-2xl z-50 transition-shadow"
      >
        <Plus className="w-6 h-6 md:w-7 md:h-7" strokeWidth={3} />
      </motion.button>
    </div>
  );
};

// --- Helpers ---

const InfoCard = ({ title, icon, children }) => (
  <motion.div variants={itemVars} whileHover={{ y: -8 }} className="bg-white p-6 md:p-8 rounded-[28px] md:rounded-[32px] border border-slate-100 shadow-sm h-full group transition-all hover:shadow-xl hover:shadow-slate-200/50">
    <div className="flex items-center gap-3 mb-6 md:mb-8">
      <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }} className="p-2 bg-slate-50 rounded-xl text-slate-400 group-hover:text-blue-600 transition-colors shadow-inner">
        {icon}
      </motion.div>
      <h4 className="font-black text-base md:text-lg text-[#002366]">{title}</h4>
    </div>
    {children}
  </motion.div>
);

const DataPoint = ({ label, value, full }) => (
  <div className={full ? "col-span-1 sm:col-span-2" : "col-span-1"}>
    <p className="text-[9px] md:text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">{label}</p>
    <p className="text-[12px] md:text-sm font-black text-[#002366] leading-relaxed">{value}</p>
  </div>
);

const ContactItem = ({ icon, label, value }) => (
  <motion.div whileHover={{ x: 5 }} className="flex items-center gap-4 group cursor-pointer">
    <div className={`p-2.5 md:p-3 bg-slate-50 rounded-xl text-slate-400 group-hover:text-blue-600 transition-all`}>{icon}</div>
    <div className="min-w-0">
      <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-0.5">{label}</p>
      <p className="text-[12px] md:text-[13px] font-black text-[#002366] group-hover:text-blue-600 transition-colors truncate">{value}</p>
    </div>
  </motion.div>
);

const GuardianBox = ({ name, role, phone, email, img }) => (
  <motion.div 
    whileHover={{ x: 5, backgroundColor: "#F8FAFC" }}
    className="p-4 md:p-6 rounded-[22px] md:rounded-[24px] border border-slate-100 bg-white flex items-center gap-4 md:gap-5 transition-all shadow-sm cursor-pointer hover:border-blue-100"
  >
    <img src={img} className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl object-cover border-2 border-white shadow-md" alt={name} />
    <div className="flex-1 min-w-0 text-left">
      <h5 className="text-[13px] md:text-sm font-black text-[#002366] truncate">{name}</h5>
      <p className="text-[8px] md:text-[9px] font-bold text-blue-500 mb-2 md:mb-3 tracking-tighter uppercase">{role}</p>
      <div className="space-y-1">
        <p className="text-[10px] md:text-[11px] font-bold text-slate-400 flex items-center gap-2"><Phone className="w-3 h-3"/> {phone}</p>
        <p className="text-[10px] md:text-[11px] font-bold text-slate-400 flex items-center gap-2 truncate"><Mail className="w-3 h-3"/> {email}</p>
      </div>
    </div>
  </motion.div>
);

const Stat = ({ label, value, border }) => (
  <div className={border ? "border-l border-slate-50 pl-4" : ""}>
    <p className="text-[9px] md:text-[10px] font-black text-slate-300 uppercase mb-1 tracking-widest">{label}</p>
    <p className="text-base md:text-lg font-black text-[#002366]">{value}</p>
  </div>
);

export default Profile;