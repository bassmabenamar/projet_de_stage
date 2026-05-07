import React from 'react';
import { motion } from 'framer-motion';
import { 
  Download, ChevronLeft, ChevronRight, AlertTriangle, 
  Info, MoreVertical, TrendingUp, CheckCircle2, XCircle, Clock 
} from 'lucide-react';

import Navbar from './Navbar';

const Attendance= () => {
  // Transitions Premium (Silk Smooth)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0, scale: 0.98 },
    visible: { 
      y: 0, 
      opacity: 1, 
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 18 } 
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-[#F8FAFC] font-sans text-[#1E293B] antialiased">

      <main className="flex-1 w-full flex flex-col overflow-x-hidden">
        <Navbar />

        {/* Padding m9add bach may-kounch mziyr f mobile */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-[1500px] mx-auto w-full"
          >
            {/* Header Section */}
            <motion.div variants={cardVariants} className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
              <div className="space-y-1">
                <h1 className="text-3xl md:text-[36px] font-black text-[#002366] tracking-tight">Attendance Record</h1>
                <p className="text-slate-400 font-bold text-base md:text-lg">Your academic presence for the current semester.</p>
              </div>
              <div className="flex flex-wrap gap-4 w-full md:w-auto">
                <motion.button 
                  whileHover={{ scale: 1.05, backgroundColor: "#FFF7ED", color: "#EA580C", borderColor: "#FED7AA" }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3.5 bg-white border border-slate-200 rounded-[18px] text-[11px] font-black text-slate-500 shadow-sm uppercase tracking-widest transition-all"
                >
                  <Download size={16} /> Export
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05, backgroundColor: "#1E40AF" }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 md:flex-none px-8 py-3.5 bg-[#002366] text-white rounded-[18px] text-[11px] font-black shadow-lg uppercase tracking-[0.2em] transition-all"
                >
                  Leave
                </motion.button>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10">
              {/* Circular Chart */}
              <motion.div variants={cardVariants} className="md:col-span-12 lg:col-span-3 bg-white rounded-[35px] md:rounded-[45px] p-8 md:p-10 border border-slate-50 shadow-xl shadow-slate-200/30 flex flex-col items-center justify-center text-center group transition-all hover:border-orange-100">
                <div className="relative w-32 h-32 md:w-40 md:h-40 mb-6 md:mb-8">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="50%" cy="50%" r="45%" stroke="#F1F5F9" strokeWidth="10" fill="transparent" />
                    <motion.circle 
                      cx="50%" cy="50%" r="45%" stroke="#002366" strokeWidth="10" fill="transparent" 
                      strokeDasharray="283"
                      initial={{ strokeDashoffset: 283 }}
                      animate={{ strokeDashoffset: 283 * (1 - 0.94) }}
                      transition={{ duration: 2, ease: "circOut" }}
                      className="group-hover:stroke-orange-500 transition-colors duration-500"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl md:text-4xl font-black text-[#002366] group-hover:text-orange-600">94%</span>
                  </div>
                </div>
                <h3 className="font-black text-[#002366] text-lg md:text-xl mb-1">Excellent!</h3>
                <p className="text-slate-400 text-xs md:text-sm font-bold">4% above average.</p>
              </motion.div>

              {/* Stat Cards Grid */}
              <div className="md:col-span-12 lg:col-span-9 flex flex-col gap-8">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
                  <StatCard icon={<CheckCircle2 className="text-green-500"/>} val="156" label="Present" variants={cardVariants} />
                  <StatCard icon={<XCircle className="text-rose-500"/>} val="04" label="Absent" variants={cardVariants} />
                  <StatCard icon={<Clock className="text-amber-500"/>} val="06" label="Late" variants={cardVariants} />
                </div>
                
                {/* Trend Bar Chart */}
                <motion.div variants={cardVariants} className="bg-white rounded-[35px] md:rounded-[40px] p-6 md:p-8 border border-slate-50 shadow-xl shadow-slate-200/30 flex flex-col md:flex-row items-center justify-between group hover:border-orange-100 transition-all gap-8">
                  <div className="w-full">
                    <h4 className="text-[10px] md:text-[11px] font-black text-slate-300 uppercase tracking-[0.25em] mb-6 text-center md:text-left">Recent Trend</h4>
                    <div className="flex items-end justify-center md:justify-start gap-3 md:gap-4 h-20">
                      {[40, 70, 55, 85, 65, 100].map((h, i) => (
                        <motion.div 
                          key={i} 
                          initial={{ height: 0 }} 
                          animate={{ height: `${h}%` }} 
                          transition={{ delay: 0.5 + (i*0.1), type: "spring" }}
                          className={`w-8 md:w-14 rounded-xl transition-all duration-500 ${i === 5 ? 'bg-[#002366] group-hover:bg-orange-500' : 'bg-slate-100 group-hover:bg-orange-50'}`} 
                        />
                      ))}
                    </div>
                  </div>
                  <div className="text-center md:text-right shrink-0">
                    <div className="flex items-center justify-center md:justify-end gap-2 text-green-500 font-black text-lg mb-1">
                      <TrendingUp size={20} /> +2.4%
                    </div>
                    <p className="text-slate-300 text-[9px] font-black uppercase tracking-widest">vs last month</p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Middle Section: Calendar & Alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
              <motion.div variants={cardVariants} className="col-span-1 lg:col-span-8 bg-white rounded-[35px] md:rounded-[50px] p-6 md:p-12 border border-slate-50 shadow-xl shadow-slate-200/30 overflow-x-auto">
                <div className="flex justify-between items-center mb-8 md:mb-10 min-w-[300px]">
                  <h3 className="text-xl md:text-2xl font-black text-[#002366]">October 2024</h3>
                  <div className="flex gap-2">
                    <button className="p-2 md:p-2.5 hover:bg-orange-50 hover:text-orange-600 rounded-xl transition-all"><ChevronLeft size={22}/></button>
                    <button className="p-2 md:p-2.5 hover:bg-orange-50 hover:text-orange-600 rounded-xl transition-all"><ChevronRight size={22}/></button>
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-y-4 md:gap-y-8 text-center min-w-[350px]">
                  {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(d => (
                    <div key={d} className="text-[9px] md:text-[10px] font-black text-slate-300 tracking-[0.2em]">{d}</div>
                  ))}
                  {Array.from({length: 31}).map((_, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ scale: 1.1, backgroundColor: "#FFF7ED", color: "#EA580C" }}
                      className={`aspect-square flex items-center justify-center rounded-xl md:rounded-[20px] cursor-pointer font-black text-xs md:text-sm transition-all border-2 border-transparent ${i+1 === 13 ? 'bg-blue-50 text-[#002366] border-blue-100' : 'text-slate-400'}`}
                    >
                      {i + 1}
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <div className="col-span-1 lg:col-span-4 flex flex-col gap-8">
                <motion.div variants={cardVariants} className="bg-white rounded-[35px] md:rounded-[45px] p-8 md:p-10 border border-slate-50 shadow-xl shadow-slate-200/30">
                  <h4 className="text-[10px] md:text-[11px] font-black text-slate-300 uppercase tracking-[0.25em] mb-6 md:mb-8">Alerts</h4>
                  <div className="space-y-4 md:space-y-6">
                    <AlertBox color="bg-amber-50" icon={<AlertTriangle className="text-amber-600" size={18}/>} title="Late Arrival" sub="Oct 11 - 08:45 AM" />
                    <AlertBox color="bg-blue-50" icon={<Info className="text-blue-600" size={18}/>} title="Medical Proof" sub="Pending for Oct 5" action="Upload" />
                  </div>
                </motion.div>

                <motion.div variants={cardVariants} className="bg-[#002366] rounded-[35px] md:rounded-[45px] p-8 md:p-10 text-white shadow-2xl shadow-blue-900/40 relative overflow-hidden group">
                  <div className="relative z-10 flex justify-between gap-4">
                    <div>
                      <div className="text-3xl md:text-4xl font-black mb-1 group-hover:text-orange-400 transition-colors">100%</div>
                      <div className="text-[9px] font-black opacity-60 uppercase tracking-widest">Physics</div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl md:text-4xl font-black mb-1 group-hover:text-orange-400 transition-colors">88%</div>
                      <div className="text-[9px] font-black opacity-60 uppercase tracking-widest">Calculus</div>
                    </div>
                  </div>
                  <div className="absolute -right-10 -bottom-10 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:bg-orange-500/20 transition-all duration-700" />
                </motion.div>
              </div>
            </div>

            {/* Bottom Table Section - Responsive Table Container */}
            <motion.div variants={cardVariants} className="bg-white rounded-[35px] md:rounded-[50px] border border-slate-50 shadow-xl shadow-slate-200/30 overflow-hidden mb-10">
              <div className="p-6 md:p-10 flex flex-col sm:flex-row justify-between items-center border-b border-slate-50 gap-4">
                <h3 className="text-xl md:text-2xl font-black text-[#002366]">History</h3>
                <motion.button whileHover={{ x: 5 }} className="text-[10px] font-black text-slate-400 bg-slate-50 px-5 py-2.5 rounded-2xl hover:text-orange-600 uppercase tracking-widest">Full Record</motion.button>
              </div>
              
              <div className="overflow-x-auto w-full no-scrollbar">
                <table className="w-full text-left border-separate border-spacing-y-2 min-w-[600px]">
                  <thead className="bg-slate-50/30 text-[9px] md:text-[10px] font-black text-slate-300 uppercase tracking-[0.25em]">
                    <tr>
                      <th className="px-6 md:px-10 py-6">Date</th>
                      <th className="py-6 text-center">In / Out</th>
                      <th className="py-6">Status</th>
                      <th className="py-6">Remark</th>
                      <th className="px-6 md:px-10 py-6 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm md:text-base font-bold text-slate-600">
                    {[
                      { d: 'Oct 12, 2024', in: '08:15', out: '03:30', s: 'Present', r: 'Regular Day', sc: 'bg-green-50 text-green-600' },
                      { d: 'Oct 11, 2024', in: '08:45', out: '03:30', s: 'Late', r: 'Traffic', sc: 'bg-amber-50 text-amber-600' },
                      { d: 'Oct 05, 2024', in: '—', out: '—', s: 'Absent', r: 'No proof', sc: 'bg-rose-50 text-rose-600' }
                    ].map((row, idx) => (
                      <motion.tr 
                        key={idx} 
                        whileHover={{ backgroundColor: "#FFF7ED", x: 5 }} 
                        className="group transition-all cursor-pointer border-l-4 border-transparent hover:border-orange-500"
                      >
                        <td className="px-6 md:px-10 py-6 text-[#002366] font-black text-xs md:text-sm">{row.d}</td>
                        <td className="py-6 text-slate-400 text-center text-xs">{row.in} - {row.out}</td>
                        <td className="py-6">
                          <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest ${row.sc}`}>{row.s}</span>
                        </td>
                        <td className="py-6 text-slate-400 text-xs truncate max-w-[100px]">{row.r}</td>
                        <td className="px-6 md:px-10 py-6 text-right"><MoreVertical size={20} className="inline text-slate-200 group-hover:text-orange-500 transition-colors"/></td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

// Helper Components m9addin
const StatCard = ({ icon, val, label, variants }) => (
  <motion.div 
    variants={variants}
    whileHover={{ y: -10, scale: 1.02, borderColor: "#FED7AA" }}
    className="bg-white p-6 md:p-10 rounded-[35px] border border-slate-50 shadow-xl shadow-slate-200/30 flex items-center gap-6 md:gap-8 group transition-all h-full"
  >
    <motion.div 
      whileHover={{ rotate: 360, scale: 1.1 }}
      className="p-4 md:p-5 rounded-[20px] md:rounded-[25px] bg-slate-50 group-hover:bg-orange-50 transition-colors shrink-0"
    >
      {icon}
    </motion.div>
    <div className="min-w-0">
      <div className="text-2xl md:text-3xl font-black text-[#002366] group-hover:text-orange-600 transition-colors leading-none mb-2">{val}</div>
      <div className="text-[10px] md:text-[11px] font-black text-slate-300 uppercase tracking-widest truncate">{label}</div>
    </div>
  </motion.div>
);

const AlertBox = ({ color, icon, title, sub, action }) => (
  <motion.div 
    whileHover={{ scale: 1.03, x: 5 }}
    className={`${color} p-5 md:p-6 rounded-[25px] md:rounded-[30px] flex gap-4 transition-all border border-transparent hover:border-orange-200`}
  >
    <div className="mt-1 shrink-0">{icon}</div>
    <div className="min-w-0">
      <h5 className="text-xs md:text-sm font-black text-[#002366] mb-1 truncate">{title}</h5>
      <p className="text-[10px] font-bold text-slate-500/80 leading-tight mb-2">{sub}</p>
      {action && <button className="text-[9px] font-black text-[#002366] underline hover:text-orange-600 uppercase tracking-widest">{action}</button>}
    </div>
  </motion.div>
);

export default Attendance;