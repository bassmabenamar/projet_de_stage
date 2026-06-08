import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Megaphone, Plus, Beaker, MessageCircle, Eye, 
  FileText, Send, Paperclip, TrendingUp, 
  MoreVertical, CheckCircle2, Bell, Users, Layout
} from 'lucide-react';



const Announcements = () => {
  // Ultra-Premium Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.15, delayChildren: 0.3 } 
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0, scale: 0.95 },
    visible: { 
      y: 0, 
      opacity: 1, 
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 } 
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
            className="max-w-[1600px] mx-auto"
          >
            {/* Header with Float Effect */}
            <motion.div variants={itemVariants} className="mb-12 flex justify-between items-end">
              <div>
                <h1 className="text-[36px] font-black text-[#002366] tracking-tight mb-2">Announcements</h1>
                <p className="text-slate-400 font-medium text-lg">Manage and broadcast critical information to your classrooms.</p>
              </div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-slate-100 shadow-sm text-[11px] font-black text-[#002366] uppercase tracking-widest cursor-pointer"
              >
                <Layout size={16} /> Customize View
              </motion.div>
            </motion.div>

            <div className="grid grid-cols-12 gap-10">
              
              {/* Left: Create New Announcement (Glassmorphism Touch) */}
              <motion.div variants={itemVariants} className="col-span-12 lg:col-span-4">
                <div className="bg-white rounded-[45px] p-10 border border-slate-100 shadow-2xl shadow-blue-900/5 sticky top-5 overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl opacity-50 group-hover:bg-blue-100 transition-colors" />
                  
                  <div className="flex items-center gap-5 mb-10 relative">
                    <motion.div 
                      whileHover={{ rotate: 180, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      className="w-14 h-14 rounded-2xl bg-[#002366] flex items-center justify-center text-white shadow-xl shadow-blue-900/20"
                    >
                      <Plus size={28} />
                    </motion.div>
                    <h2 className="text-2xl font-black text-[#002366] tracking-tight">New Announcement</h2>
                  </div>

                  <div className="space-y-8 relative">
                    <InputField label="Subject Title" placeholder="e.g. Mid-term Schedule Update" />
                    
                    <div className="space-y-4">
                      <label className="text-[11px] font-black text-slate-300 uppercase tracking-[0.2em] block">Target Classes</label>
                      <div className="grid grid-cols-2 gap-4">
                        {['Physics 101-A', 'Physics 101-B', 'Quantum Mech.', 'Lab Session II'].map((cls) => (
                          <ClassTag key={cls} label={cls} />
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="text-[11px] font-black text-slate-300 uppercase tracking-[0.2em] block">Announcement Content</label>
                      <textarea 
                        rows="6"
                        placeholder="Write your message here..."
                        className="w-full bg-slate-50 border-2 border-transparent rounded-[30px] p-6 text-sm font-medium text-slate-600 focus:bg-white focus:border-blue-100 outline-none transition-all resize-none shadow-inner"
                      />
                    </div>

                    <div className="flex gap-4 pt-4">
                      <motion.button 
                        whileHover={{ y: -5, backgroundColor: '#f1f5f9' }}
                        className="flex-1 flex items-center justify-center gap-2 py-5 border-2 border-slate-100 rounded-[22px] text-[12px] font-black text-slate-400 uppercase tracking-widest transition-colors"
                      >
                        <Paperclip size={18} /> Add Material
                      </motion.button>
                      <motion.button 
                        whileHover={{ y: -5, scale: 1.02, boxShadow: "0 20px 40px -10px rgba(0,35,102,0.3)" }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-[2] flex items-center justify-center gap-3 py-5 bg-[#002366] text-white rounded-[22px] text-[12px] font-black uppercase tracking-widest"
                      >
                        <Send size={18} /> Broadcast Message
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right: Feed */}
              <div className="col-span-12 lg:col-span-8 space-y-8">
                <motion.div variants={itemVariants} className="flex justify-between items-center px-4">
                   <h2 className="text-2xl font-black text-[#002366] flex items-center gap-4">
                     Recent Broadcasts 
                     <span className="flex h-3 w-3 relative">
                       <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                       <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-600"></span>
                     </span>
                   </h2>
                   <div className="flex gap-3">
                     <FilterButton icon={<Users size={18} />} />
                     <FilterButton icon={<MoreVertical size={18} />} />
                   </div>
                </motion.div>

                <div className="space-y-8">
                  <AnnouncementCard 
                    icon={<Beaker size={28}/>}
                    tag="Physics 101-A"
                    room="Lab Session II"
                    time="2 hours ago"
                    title="Lab Equipment Guidelines for Thursday"
                    content="All students are reminded to bring their safety goggles and lab coats for the upcoming practical session. Please review the safety protocol attached below..."
                    views="142" replies="12" files="2"
                    color="emerald"
                  />
                  <AnnouncementCard 
                    icon={<Megaphone size={28}/>}
                    tag="Physics 101-B"
                    room="Wednesday at 4:15 PM"
                    time="Yesterday"
                    title="Mid-term Revision Session (Optional)"
                    content="I will be hosting a Q&A session this Friday in Auditorium C to address any questions regarding the Electromagnetism module."
                    views="89" replies="5"
                    color="blue"
                  />
                  <AnnouncementCard 
                    icon={<CheckCircle2 size={28}/>}
                    tag="Quantum Mech."
                    room="Oct 24, 2023"
                    time="3 days ago"
                    title="Grade Uploads Complete"
                    content="Grades for the second assignment have been uploaded to the portal. Please check your individual profiles."
                    views="210" replies="0"
                    color="purple"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Analytics (Animated Bars & Circles) */}
            <div className="grid grid-cols-12 gap-10 mt-16 mb-12">
               <AnalyticsCircleCard rate="84" label="Engagement Rate" />
               <AnalyticsBarChart />
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

/* --- PREMIUM SUB-COMPONENTS --- */

const InputField = ({ label, placeholder }) => (
  <div className="space-y-4">
    <label className="text-[11px] font-black text-slate-300 uppercase tracking-[0.2em] block">{label}</label>
    <motion.input 
      whileFocus={{ scale: 1.01 }}
      type="text" 
      placeholder={placeholder} 
      className="w-full bg-slate-50 border-2 border-transparent rounded-[22px] p-5 text-sm font-bold text-[#002366] focus:bg-white focus:border-blue-100 outline-none transition-all shadow-inner"
    />
  </div>
);

const ClassTag = ({ label }) => (
  <label className="flex items-center gap-3 cursor-pointer group p-4 bg-slate-50 rounded-[20px] hover:bg-blue-50 transition-colors">
    <div className="relative flex items-center justify-center">
      <input type="checkbox" className="sr-only peer" />
      <div className="w-6 h-6 rounded-lg border-2 border-slate-200 peer-checked:border-blue-600 peer-checked:bg-blue-600 transition-all flex items-center justify-center">
        <motion.div initial={false} animate={{ scale: 1 }} className="text-white">
          <CheckCircle2 size={14} className="opacity-0 peer-checked:opacity-100" />
        </motion.div>
      </div>
    </div>
    <span className="text-[12px] font-bold text-slate-500 group-hover:text-[#002366] transition-colors">{label}</span>
  </label>
);

const AnnouncementCard = ({ icon, tag, room, time, title, content, views, replies, files, color }) => {
  const themes = {
    emerald: "text-emerald-600 bg-emerald-50 border-emerald-100 shadow-emerald-900/5",
    blue: "text-blue-600 bg-blue-50 border-blue-100 shadow-blue-900/5",
    purple: "text-purple-600 bg-purple-50 border-purple-100 shadow-purple-900/5"
  };

  return (
    <motion.div 
      whileHover={{ scale: 1.02, x: 15 }}
      className="bg-white rounded-[45px] p-10 border border-slate-50 shadow-sm hover:shadow-2xl hover:shadow-blue-900/10 transition-all group relative overflow-hidden"
    >
      <div className="flex gap-10">
        <motion.div 
          whileHover={{ rotateY: 180, scale: 1.1 }}
          className={`w-20 h-20 rounded-[30px] flex items-center justify-center shrink-0 border shadow-xl ${themes[color]}`}
        >
          {icon}
        </motion.div>

        <div className="flex-1">
          <div className="flex justify-between items-start mb-5">
            <div className="flex items-center gap-4">
              <span className={`text-[10px] font-black uppercase tracking-[0.15em] px-5 py-2 rounded-full border shadow-sm ${themes[color]}`}>
                {tag}
              </span>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{room}</span>
            </div>
            <span className="text-[12px] font-black text-slate-300 uppercase tracking-widest">{time}</span>
          </div>

          <h3 className="text-2xl font-black text-[#002366] mb-4 group-hover:text-blue-600 transition-colors tracking-tight">{title}</h3>
          <p className="text-[15px] text-slate-400 font-medium leading-relaxed mb-10 max-w-3xl">{content}</p>

          <div className="flex items-center gap-12 pt-8 border-t border-slate-50">
             <Stat icon={<Eye size={18}/>} value={views} label="Views" />
             <Stat icon={<MessageCircle size={18}/>} value={replies} label="Replies" />
             {files && <Stat icon={<FileText size={18}/>} value={files} label="Files" />}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Stat = ({ icon, value, label }) => (
  <div className="flex items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-widest group/stat cursor-pointer hover:text-blue-600 transition-colors">
    <span className="p-2 rounded-lg bg-slate-50 group-hover/stat:bg-blue-50 transition-colors">{icon}</span>
    {value} {label}
  </div>
);

const AnalyticsCircleCard = ({ rate, label }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="col-span-12 lg:col-span-4 bg-[#002366] rounded-[50px] p-10 text-white shadow-2xl shadow-blue-900/30 relative overflow-hidden group"
  >
    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-150 transition-transform duration-700">
      <Bell size={120} />
    </div>
    <h3 className="text-[12px] font-black uppercase tracking-[0.3em] opacity-60 mb-8">{label}</h3>
    <div className="flex items-center gap-10 relative z-10">
      <div className="relative w-36 h-36">
        <svg className="w-full h-full transform -rotate-90">
          <circle cx="72" cy="72" r="64" stroke="rgba(255,255,255,0.1)" strokeWidth="14" fill="transparent" />
          <motion.circle 
            initial={{ strokeDasharray: "0 402" }}
            animate={{ strokeDasharray: "338 402" }}
            transition={{ duration: 2.5, ease: "circOut", delay: 0.5 }}
            cx="72" cy="72" r="64" stroke="white" strokeWidth="14" fill="transparent" strokeLinecap="round" 
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl font-black">{rate}%</span>
        </div>
      </div>
      <div>
        <div className="flex items-center gap-2 text-emerald-400 font-black text-xl mb-1">
          <TrendingUp size={20}/> +2.4%
        </div>
        <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">vs last month</p>
      </div>
    </div>
  </motion.div>
);

const AnalyticsBarChart = () => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="col-span-12 lg:col-span-8 bg-white rounded-[50px] p-10 border border-slate-100 shadow-xl shadow-blue-900/5"
  >
    <div className="flex justify-between items-center mb-12">
      <h3 className="text-[12px] font-black text-slate-400 uppercase tracking-[0.3em]">Announcement Reach</h3>
      <div className="flex gap-6">
        <LegendItem color="bg-[#002366]" label="Read" />
        <LegendItem color="bg-orange-400" label="Unread" />
      </div>
    </div>
    <div className="flex justify-between items-end h-48 px-6">
      {['Physics 101-A', 'Physics 101-B', 'Quantum Mech.', 'Lab Session II', 'General'].map((l, i) => (
        <Bar key={l} label={l} read={30 + i * 15} unread={20 + i * 5} delay={i * 0.1} />
      ))}
    </div>
  </motion.div>
);

const Bar = ({ label, read, unread, delay }) => (
  <div className="flex flex-col items-center gap-5">
    <div className="flex flex-col-reverse w-14 h-40 bg-slate-50 rounded-full overflow-hidden shadow-inner">
       <motion.div initial={{ height: 0 }} animate={{ height: `${read}%` }} transition={{ duration: 1.5, delay, ease: "circOut" }} className="bg-[#002366] w-full" />
       <motion.div initial={{ height: 0 }} animate={{ height: `${unread}%` }} transition={{ duration: 1.5, delay: delay + 0.2, ease: "circOut" }} className="bg-orange-400 w-full opacity-60" />
    </div>
    <span className="text-[9px] font-black text-slate-400 uppercase text-center w-20 leading-tight tracking-tighter">{label}</span>
  </div>
);

const FilterButton = ({ icon }) => (
  <motion.button 
    whileHover={{ scale: 1.1, backgroundColor: '#f1f5f9' }}
    whileTap={{ scale: 0.9 }}
    className="p-4 bg-white rounded-2xl border border-slate-100 text-slate-400 shadow-sm transition-colors"
  >
    {icon}
  </motion.button>
);

const LegendItem = ({ color, label }) => (
  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
    <div className={`w-2.5 h-2.5 rounded-full ${color}`} /> {label}
  </div>
);

export default Announcements;