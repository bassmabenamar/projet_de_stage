import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, Megaphone, Wallet, BookOpen, GraduationCap, 
  CheckCheck, Search, MoreVertical, X, Clock, MapPin,
  ChevronLeft, ChevronRight, History
} from 'lucide-react';

import Navbar from './Navbar';

const Notifications = () => {
  const [activeCategory, setActiveCategory] = useState('All Notifications');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { y: 0, x: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans text-[#1E293B]">
      <main className="flex-1 flex flex-col min-w-0">
        <Navbar />

        <div className="flex-1 overflow-y-auto p-5 md:p-10">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-[1400px] mx-auto"
          >
            {/* Header Area - Responsive Layout */}
            <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8 md:mb-10">
              <div>
                <motion.h1 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-3xl md:text-[42px] font-black text-[#002366] tracking-tight mb-2"
                >
                  Notifications
                </motion.h1>
                <p className="text-slate-400 font-medium text-sm md:text-base">
                  You have <span className="text-[#002366] font-black">4 unread alerts</span> that require your attention today.
                </p>
              </div>
              
              <motion.button 
                whileHover={{ scale: 1.05, backgroundColor: "#001a4d" }}
                whileTap={{ scale: 0.95 }}
                className="w-full md:w-auto flex items-center justify-center gap-2 px-8 py-3.5 bg-[#002366] text-white rounded-2xl text-xs font-black shadow-xl shadow-blue-900/20 transition-all"
              >
                <CheckCheck size={18} /> Mark all as read
              </motion.button>
            </div>

            <div className="grid grid-cols-12 gap-6 md:gap-10">
              {/* Left Column: Categories (Horizontal scroll on mobile) */}
              <div className="col-span-12 lg:col-span-3 space-y-6 md:space-y-8">
                <motion.div variants={itemVariants} className="bg-white rounded-[30px] md:rounded-[35px] p-4 md:p-6 border border-slate-100 shadow-sm overflow-hidden">
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-4 md:mb-6 px-4">Categories</p>
                  <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 custom-scrollbar">
                    <CategoryItem icon={<Bell size={18}/>} label="All Notifications" count={12} active={activeCategory === 'All Notifications'} onClick={setActiveCategory} />
                    <CategoryItem icon={<Megaphone size={18}/>} label="Announcements" count={2} active={activeCategory === 'Announcements'} onClick={setActiveCategory} />
                    <CategoryItem icon={<BookOpen size={18}/>} label="Homework" count={5} active={activeCategory === 'Homework'} onClick={setActiveCategory} />
                    <CategoryItem icon={<Wallet size={18}/>} label="Payments" count={1} active={activeCategory === 'Payments'} onClick={setActiveCategory} />
                    <CategoryItem icon={<GraduationCap size={18}/>} label="Exams" count={4} active={activeCategory === 'Exams'} onClick={setActiveCategory} />
                  </div>
                </motion.div>

                {/* Stay Focused Card - Hidden on very small screens to save space if needed, or kept responsive */}
                <motion.div 
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                  className="bg-[#003399] rounded-[30px] md:rounded-[35px] p-8 text-white relative overflow-hidden shadow-2xl shadow-blue-900/30"
                >
                  <div className="relative z-10">
                    <h3 className="text-xl md:text-2xl font-black mb-4">Stay Focused</h3>
                    <p className="text-blue-100/70 text-xs md:text-sm leading-relaxed font-medium">
                      Upcoming Physics Final in 4 days. Keep up the great work!
                    </p>
                  </div>
                  <GraduationCap className="absolute -bottom-6 -right-6 text-white/10 w-32 h-32 md:w-40 md:h-40 -rotate-12" />
                </motion.div>
              </div>

              {/* Right Column: Notifications List */}
              <div className="col-span-12 lg:col-span-9 space-y-4 md:space-y-6">
                <AnimatePresence mode="popLayout">
                  <NotificationCard 
                    type="SCHOOL ANNOUNCEMENT"
                    title="Annual Sports Day Registration Open"
                    desc="Registration for the 45th Annual Sports Meet is now live. Students must register by Friday."
                    time="2 hours ago"
                    icon={<Megaphone />}
                    color="blue"
                    isNew
                  />
                  <NotificationCard 
                    type="PAYMENT REMINDER"
                    title="Library Fine: Overdue Books"
                    desc="Your library account shows a pending balance of $12.50. Please settle to avoid portal lockout."
                    time="5 hours ago"
                    icon={<Wallet />}
                    color="orange"
                    action="Pay Now"
                    isNew
                  />
                  <NotificationCard 
                    type="EXAM REMINDER"
                    title="Chemistry Mid-Term Schedule"
                    desc="Held in Hall C on Thursday at 9:00 AM. Bring your scientific calculator and student ID card."
                    time="1 day ago"
                    icon={<GraduationCap />}
                    color="blue"
                    footer={<span className="flex items-center gap-2"><MapPin size={14}/> Main Campus - Hall C</span>}
                  />
                </AnimatePresence>

                {/* Pagination - Centered on Mobile */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-6">
                  <div className="flex gap-2">
                    <PaginationBtn icon={<ChevronLeft size={18}/>} />
                    <PaginationBtn label="1" active />
                    <PaginationBtn label="2" />
                    <PaginationBtn label="3" />
                    <PaginationBtn icon={<ChevronRight size={18}/>} />
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.1, rotate: -10 }}
                    className="w-14 h-14 bg-orange-600 text-white rounded-full flex items-center justify-center shadow-xl shadow-orange-900/20"
                  >
                    <History size={24} />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

/* --- Notification Card with your Original Flipping Icon --- */
const NotificationCard = ({ type, title, desc, time, icon, color, isNew, action, footer }) => {
  const colors = {
    blue: "bg-blue-50 text-blue-600 border-blue-100 shadow-blue-100/50",
    orange: "bg-orange-50 text-orange-600 border-orange-100 shadow-orange-100/50",
    slate: "bg-slate-50 text-slate-500 border-slate-100 shadow-slate-100/50"
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.01 }}
      className="bg-white rounded-[30px] md:rounded-[35px] p-5 md:p-8 border border-slate-50 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all flex flex-col sm:flex-row gap-5 md:gap-8 group relative"
    >
      {/* Premium Flipping Icon - Kept Exactly As You Had It */}
      <motion.div 
        whileHover={{ rotateY: 180 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${colors[color]} border mx-auto sm:mx-0`}
      >
        {React.cloneElement(icon, { size: 28 })}
      </motion.div>

      <div className="flex-1 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start mb-2 gap-2">
          <p className={`text-[10px] font-black uppercase tracking-[0.2em] ${color === 'slate' ? 'text-slate-400' : 'text-'+color+'-600'}`}>{type}</p>
          <div className="flex items-center gap-3 text-slate-300 font-bold text-[11px]">
             <span className="flex items-center gap-1.5"><Clock size={14}/> {time}</span>
             {isNew && <div className={`w-2 h-2 rounded-full ${color === 'orange' ? 'bg-orange-600' : 'bg-blue-600'}`} />}
          </div>
        </div>
        
        <h3 className="text-lg md:text-xl font-black text-[#002366] mb-3 group-hover:text-blue-600 transition-colors">{title}</h3>
        <p className="text-slate-400 text-xs md:text-sm leading-relaxed mb-6 max-w-2xl font-medium">{desc}</p>
        
        {action && (
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto px-8 py-2.5 bg-orange-700 text-white rounded-xl text-xs font-black shadow-lg shadow-orange-900/20"
          >
            {action}
          </motion.button>
        )}

        {footer && (
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{footer}</div>
        )}
      </div>

      <div className="absolute top-4 right-4 md:top-8 md:right-8 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="text-slate-300 hover:text-slate-600 p-1"><X size={20}/></button>
      </div>
    </motion.div>
  );
};

const CategoryItem = ({ icon, label, count, active, onClick }) => (
  <motion.button
    onClick={() => onClick(label)}
    whileHover={{ x: 5 }}
    className={`flex-shrink-0 flex items-center justify-between p-3 md:p-4 rounded-2xl transition-all ${active ? 'bg-blue-50 text-[#002366]' : 'text-slate-400 hover:bg-slate-50'}`}
  >
    <div className="flex items-center gap-3">
      <span className={active ? 'text-blue-600' : 'text-slate-300'}>{icon}</span>
      <span className="text-[10px] md:text-xs font-black uppercase tracking-wider whitespace-nowrap">{label}</span>
    </div>
    {count && (
      <span className={`hidden lg:inline-block ml-4 text-[10px] font-black px-2 py-1 rounded-lg ${active ? 'bg-[#002366] text-white' : 'bg-slate-100 text-slate-400'}`}>
        {count}
      </span>
    )}
  </motion.button>
);

const PaginationBtn = ({ label, icon, active }) => (
  <motion.button
    whileHover={{ y: -2 }}
    className={`w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center text-xs font-black transition-all ${active ? 'bg-[#002366] text-white shadow-lg shadow-blue-900/20' : 'bg-white text-slate-400 border border-slate-100'}`}
  >
    {label || icon}
  </motion.button>
);

export default Notifications;