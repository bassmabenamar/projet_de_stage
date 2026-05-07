import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, UserCheck, BookOpen, ChevronRight, Filter, Plus 
} from 'lucide-react';

import Navbar from './Navbar'; 

const Dashboard = () => {

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

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans text-[#1E293B]">
    
      <main className="flex-1 overflow-y-auto overflow-x-hidden">
        {/* Navbar component */}
        <Navbar />

        <motion.div 
          variants={containerVars}
          initial="hidden"
          animate="visible"
          className="p-4 md:p-8 max-w-[1400px] mx-auto"
        >
          {/* Welcome Section */} 
          <motion.section variants={itemVars} className="mb-8 md:mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <motion.h2 
                initial={{ x: -20 }} animate={{ x: 0 }}
                className="text-3xl md:text-[42px] font-black text-[#002366] tracking-tight leading-tight"
              >
                Welcome back, Alex!
              </motion.h2>
              <p className="text-slate-400 font-bold text-sm md:text-base mt-1">Amity School — High School Junior • Semester 2</p>
            </div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 bg-white px-4 py-2 md:px-5 md:py-2.5 rounded-2xl border border-slate-100 shadow-sm"
            >
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-[10px] md:text-xs font-black text-slate-500 uppercase tracking-widest">3 New Notifications</span>
            </motion.div>
          </motion.section>

          {/* Grid System - Responsive */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
            
            {/* Left Side */}
            <div className="col-span-1 lg:col-span-8 space-y-6 md:space-y-8">
              
              {/* Stat Cards Row - Stack on mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                <StatCard 
                  label="AVG GRADE" value="A-" icon={<TrendingUp size={20}/>} 
                  sub={<span className="text-green-500">+2.4% <span className="text-slate-300 font-medium">term</span></span>} 
                />
                <StatCard 
                  label="ATTENDANCE" value="94%" icon={<UserCheck size={20}/>} 
                  progress={94} 
                />
                <StatCard 
                  label="PENDING" value="5" icon={<BookOpen size={20}/>} 
                  sub={<span className="text-orange-500">2 Due Today</span>} 
                />
              </div>

              {/* Upcoming Classes */}
              <motion.div variants={itemVars} className="bg-white rounded-[24px] md:rounded-[32px] border border-slate-100 p-5 md:p-8 shadow-sm">
                <div className="flex justify-between items-center mb-6 md:mb-8">
                  <h3 className="font-black text-lg md:text-xl text-[#002366]">Upcoming Classes Today</h3>
                  <button className="text-slate-400 text-[10px] md:text-xs font-black uppercase tracking-widest hover:text-blue-600 transition-all">Full Timetable</button>
                </div>
                <div className="space-y-2">
                  <ClassRow time="09:00" ampm="AM" title="Advanced Mathematics" info="Room 304 • Prof. Richards" status="IN PROGRESS" />
                  <ClassRow time="11:15" ampm="AM" title="Modern History" info="Lecture Hall B • Dr. Thompson" showArrow />
                  <ClassRow time="01:45" ampm="PM" title="Physics Lab" info="Science Wing • Lab Assistant Lee" showArrow />
                </div>
              </motion.div>

              {/* Homework Table - Scrollable on mobile */}
              <motion.div variants={itemVars} className="bg-white rounded-[24px] md:rounded-[32px] border border-slate-100 p-5 md:p-8 shadow-sm overflow-hidden">
                <div className="flex justify-between items-center mb-6 md:mb-8">
                  <h3 className="font-black text-lg md:text-xl text-[#002366]">Homework Deadlines</h3>
                  <motion.button whileHover={{ scale: 1.05 }} className="flex items-center gap-2 text-slate-400 text-[10px] md:text-xs font-black border border-slate-100 px-3 py-1.5 md:px-4 md:py-2 rounded-xl">
                    <Filter size={14} /> Filter
                  </motion.button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[500px]">
                    <thead className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] border-b border-slate-50">
                      <tr>
                        <th className="pb-4 text-left">Subject</th>
                        <th className="pb-4 text-left">Assignment</th>
                        <th className="pb-4 text-left">Due Date</th>
                        <th className="pb-4 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      <TableRow subject="Literature" task="The Great Gatsby Essay" date="Today, 5PM" dateColor="text-red-500" status="PRIORITY" statusColor="bg-red-50 text-red-500" />
                      <TableRow subject="Chemistry" task="Periodic Table Lab Report" date="Oct 12, 2023" status="PENDING" statusColor="bg-orange-50 text-orange-500" />
                      <TableRow subject="IT Fundamentals" task="Python Loops Exercise" date="Oct 14, 2023" status="ASSIGNED" statusColor="bg-blue-50 text-blue-500" />
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </div>

            {/* Right Side */}
            <div className="col-span-1 lg:col-span-4 space-y-6 md:space-y-8">
              <motion.div 
                variants={itemVars}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-[#002366] rounded-[24px] md:rounded-[32px] p-6 md:p-8 text-white relative overflow-hidden shadow-2xl shadow-blue-900/30"
              >
                <div className="flex justify-between items-start relative z-10">
                  <div>
                    <p className="text-[9px] md:text-[10px] font-black opacity-60 tracking-[0.2em] mb-2 uppercase">System Alerts</p>
                    <h3 className="text-3xl md:text-4xl font-black mb-6">3 New</h3>
                    <motion.button whileTap={{ scale: 0.95 }} className="bg-white/10 backdrop-blur-md border border-white/20 px-6 py-2 md:px-8 md:py-3 rounded-2xl text-[10px] md:text-[11px] font-black uppercase tracking-widest hover:bg-white hover:text-[#002366] transition-all">
                      View All
                    </motion.button>
                  </div>
                  <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="p-3 bg-white/10 rounded-2xl">
                    <BookOpen size={24} className="opacity-80" />
                  </motion.div>
                </div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full" />
              </motion.div>

              <motion.div variants={itemVars} className="bg-white rounded-[24px] md:rounded-[32px] border border-slate-100 p-6 md:p-8 shadow-sm">
                <h4 className="font-black text-sm md:text-base text-[#002366] mb-1">Grade Trend</h4>
                <div className="flex items-end justify-between h-24 md:h-28 gap-2 md:gap-4 mt-6 md:mt-8 mb-4 md:mb-8">
                  {[35, 55, 45, 100].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-3 md:gap-4">
                      <div className="w-full bg-slate-50 rounded-lg relative h-full overflow-hidden">
                        <motion.div 
                          initial={{ height: 0 }} animate={{ height: `${h}%` }}
                          transition={{ duration: 1.2, ease: "easeOut", delay: i * 0.1 }}
                          className={`absolute bottom-0 w-full rounded-lg ${i === 3 ? 'bg-blue-600 shadow-lg shadow-blue-200' : 'bg-slate-100'}`} 
                        />
                      </div>
                      <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{['Aug', 'Sep', 'Oct', 'Nov'][i]}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={itemVars} className="bg-white rounded-[24px] md:rounded-[32px] border border-slate-100 p-6 md:p-8 shadow-sm">
                <h4 className="font-black text-lg md:text-xl text-[#002366] mb-6 md:mb-8">Announcements</h4>
                <div className="space-y-1">
                  <AnnouncementItem title="Science Fair Registration" date="OCT 10" category="ADMIN" color="bg-blue-600" desc="Register your teams by Friday." />
                  <AnnouncementItem title="Basketball Postponed" date="OCT 08" category="SPORTS" color="bg-slate-200" desc="Court under maintenance." />
                </div>
              </motion.div>

              <motion.div 
                variants={itemVars}
                whileHover={{ scale: 1.03, y: -5 }}
                className="bg-gradient-to-br from-[#FFEDD5] to-[#FED7AA] rounded-[24px] md:rounded-[32px] p-6 md:p-8 text-center shadow-lg shadow-orange-100 cursor-pointer"
              >
                <h4 className="font-black text-xl md:text-2xl text-[#7C2D12] mb-3">Study Library</h4>
                <p className="text-xs md:text-sm text-[#9A3412] font-bold opacity-80 mb-6 md:mb-8">Access 5,000+ digital books and recordings.</p>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-[#7C2D12] text-white w-full md:w-auto md:px-10 py-3 md:py-3.5 rounded-2xl text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em]">
                  Browse Now
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </main>

      {/* FAB - Responsive size */}
      <motion.button 
        whileHover={{ scale: 1.15, rotate: 90, shadow: "0px 10px 30px rgba(0, 35, 102, 0.4)" }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 w-14 h-14 md:w-16 md:h-16 bg-[#002366] text-white rounded-full flex items-center justify-center shadow-2xl z-50 transition-shadow"
      >
        <Plus size={28} strokeWidth={3} />
      </motion.button>
    </div>
  );
};

// --- Sub-Components ---

const StatCard = ({ label, value, sub, icon, progress }) => (
  <motion.div 
    variants={{hidden: {opacity:0, scale:0.95}, visible: {opacity:1, scale:1}}}
    whileHover={{ y: -8, transition: { duration: 0.2 } }}
    className="bg-white p-6 md:p-8 rounded-[24px] md:rounded-[32px] border border-slate-100 shadow-sm relative group cursor-pointer transition-all hover:shadow-xl hover:shadow-slate-200/50"
  >
    <div className="flex justify-between items-start mb-4 md:mb-6">
      <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }} className="p-2.5 md:p-3 bg-slate-50 rounded-2xl text-slate-400 group-hover:text-blue-600">
        {icon}
      </motion.div>
      <span className="text-[9px] md:text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">{label}</span>
    </div>
    <div className="flex items-end gap-2 md:gap-3">
      <h3 className="text-3xl md:text-4xl font-black text-[#002366]">{value}</h3>
      {sub && <div className="text-[10px] md:text-[11px] font-black mb-1">{sub}</div>}
    </div>
    {progress && (
      <div className="w-full h-1.5 md:h-2 bg-slate-50 rounded-full mt-4 md:mt-6 overflow-hidden">
        <motion.div initial={{width:0}} animate={{width:`${progress}%`}} transition={{duration:1.5, ease:"easeOut"}} className="h-full bg-green-500 rounded-full" />
      </div>
    )}
  </motion.div>
);

const ClassRow = ({ time, ampm, title, info, status, showArrow }) => (
  <motion.div 
    whileHover={{ x: 10, backgroundColor: "rgba(248, 250, 252, 1)" }}
    className="flex items-center gap-4 md:gap-10 p-4 md:p-6 rounded-[20px] md:rounded-[24px] transition-all group cursor-pointer border border-transparent hover:border-slate-100"
  >
    <div className="text-center min-w-[60px] md:min-w-[70px]">
      <p className="text-lg md:text-xl font-black text-[#002366] leading-none">{time}</p>
      <p className="text-[9px] md:text-[10px] font-black text-slate-300 uppercase mt-1 tracking-widest">{ampm}</p>
    </div>
    <div className="flex-1">
      <h4 className="text-sm md:text-base font-black text-[#002366] mb-1">{title}</h4>
      <p className="text-[11px] md:text-[13px] font-bold text-slate-400 line-clamp-1">{info}</p>
    </div>
    {status ? (
      <span className="hidden sm:inline-block bg-green-50 text-green-600 text-[9px] md:text-[10px] font-black px-3 py-1.5 md:px-4 md:py-2 rounded-xl uppercase">{status}</span>
    ) : showArrow && (
      <ChevronRight className="text-slate-200 group-hover:text-blue-600 transition-all" size={20} />
    )}
  </motion.div>
);

const TableRow = ({ subject, task, date, dateColor, status, statusColor }) => (
  <motion.tr whileHover={{ backgroundColor: "rgba(248, 250, 252, 0.5)" }} className="group transition-colors">
    <td className="py-4 md:py-6 font-bold text-[#002366] text-xs md:text-[15px] px-2">{subject}</td>
    <td className="py-4 md:py-6 text-slate-400 font-medium text-xs md:text-sm">{task}</td>
    <td className={`py-4 md:py-6 font-black text-xs md:text-sm ${dateColor || 'text-slate-800'}`}>{date}</td>
    <td className="py-4 md:py-6 text-right">
      <motion.span whileHover={{ scale: 1.1 }} className={`px-3 py-1 md:px-4 md:py-1.5 rounded-lg text-[8px] md:text-[10px] font-black tracking-widest inline-block ${statusColor}`}>
        {status}
      </motion.span>
    </td>
  </motion.tr>
);

const AnnouncementItem = ({ title, date, category, color, desc }) => (
  <motion.div whileHover={{ x: 5 }} className="flex gap-4 relative group cursor-pointer pb-6">
    <div className="flex flex-col items-center">
      <div className={`w-3 h-3 rounded-full z-10 mt-1.5 border-2 border-white shadow-sm ${color}`} />
      <div className="absolute top-4 left-[5.5px] w-[1px] h-full bg-slate-100 group-last:hidden" />
    </div>
    <div className="flex-1">
      <p className="text-[8px] md:text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">{date} • {category}</p>
      <h5 className="text-xs md:text-[13px] font-black text-[#002366] group-hover:text-blue-600 transition-colors leading-snug">{title}</h5>
      <p className="text-[10px] md:text-[11px] text-slate-400 font-medium mt-1 line-clamp-1">{desc}</p>
    </div>
  </motion.div>
);

export default Dashboard;