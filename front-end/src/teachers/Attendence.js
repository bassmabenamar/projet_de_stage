import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, CheckCircle2, Clock, Calendar, 
  ChevronDown, Send, UserPlus, FileText, 
  Mail, BarChart4, MessageSquare, AlertCircle,
  Check, X, LayoutGrid
} from 'lucide-react';

// Imports dyalk (tأكد f l-file dyalk belli l-path s7i7)
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const AttendancePage = () => {
  const students = [
    { id: 'AMS-2024-0412', name: 'Alexander Bennett', type: 'Regular Student', initial: 'AB', status: 'PRES', last5: [1,1,1,1,1] },
    { id: 'AMS-2024-0489', name: 'Chloe Richardson', type: 'Athlete Scholarship', initial: 'CR', status: 'ABS', remark: 'NEEDS FOLLOW-UP', last5: [1,1,1,1,1] },
    { id: 'AMS-2024-0523', name: 'Dev Patel', type: 'Honor Roll', initial: 'DP', status: 'LATE', remark: 'Arrived 15m late (Bus)', last5: [1,1,1,1,1] },
  ];

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Navbar />
        
        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {/* --- HEADER SECTION --- */}
          <header className="mb-10 flex justify-between items-end">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Dashboard > <span className="text-[#002366]">Attendance</span></p>
              <h1 className="text-3xl font-[1000] text-[#002366] tracking-tighter">Attendance Management</h1>
              <p className="text-slate-400 font-bold text-sm mt-1">Manage daily student attendance for your assigned classes.</p>
            </motion.div>

            <div className="flex gap-4 items-center">
              <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-400 uppercase ml-1">Select Class</p>
                <div className="bg-white border border-slate-100 px-4 py-2.5 rounded-xl flex items-center gap-8 text-sm font-bold text-[#002366] shadow-sm hover:border-blue-200 cursor-pointer transition-all">
                  Grade 10 - Mathematics A <ChevronDown size={16} className="text-slate-300" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-400 uppercase ml-1">Date</p>
                <div className="bg-white border border-slate-100 px-4 py-2.5 rounded-xl flex items-center gap-4 text-sm font-bold text-[#002366] shadow-sm">
                  <Calendar size={16} className="text-blue-500" /> 05/20/2024
                </div>
              </div>
              <motion.button 
                whileHover={{ scale: 1.05, backgroundColor: '#E85D04', y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="mt-5 bg-[#F48120] text-white px-8 py-3 rounded-2xl font-black text-sm shadow-xl shadow-orange-500/20 flex items-center gap-2 transition-all uppercase tracking-widest"
              >
                <Send size={18} /> Submit Attendance
              </motion.button>
            </div>
          </header>

          {/* --- STAT CARDS --- */}
          <div className="grid grid-cols-12 gap-6 mb-10">
            <StatCard icon={<Users />} label="Total Students" value="32" color="blue" />
            <StatCard icon={<CheckCircle2 />} label="Present Today" value="28" color="emerald" />
            <StatCard icon={<Clock />} label="Late/Absent" value="4" color="orange" />
            
            <motion.div whileHover={{ y: -5 }} className="col-span-6 bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm transition-all hover:shadow-xl hover:shadow-slate-200/50">
              <div className="flex justify-between items-center mb-6">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Attendance Summary (Last 7 Days)</p>
              </div>
              <div className="flex items-end justify-between h-20 gap-2 px-2">
                {[40, 60, 70, 65, 50, 80, 100].map((h, i) => (
                  <motion.div 
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ delay: i * 0.1, duration: 1, ease: "circOut" }}
                    className={`w-full rounded-t-lg transition-all hover:opacity-80 cursor-pointer ${i === 4 ? 'bg-orange-300' : i > 4 ? 'bg-[#002366]' : 'bg-slate-100'}`}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-3 px-1">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
                  <span key={d} className="text-[9px] font-black text-slate-300 uppercase">{d}</span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* --- TABLE --- */}
          <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden mb-10 transition-all hover:shadow-2xl hover:shadow-slate-200/30">
            <div className="px-8 py-6 border-b border-slate-50 flex justify-between items-center bg-white">
              <h2 className="text-xl font-[1000] text-[#002366]">Student Roster</h2>
              <div className="flex gap-6">
                <button className="flex items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-widest hover:text-blue-600 transition-colors">
                  <LayoutGrid size={14} /> Mark All Present
                </button>
                <button className="flex items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-widest hover:text-blue-600 transition-colors">
                  <BarChart4 size={14} /> Sort By Name
                </button>
              </div>
            </div>

            <table className="w-full text-left">
              <thead className="bg-slate-50/50">
                <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">
                  <th className="px-8 py-5">Student Name</th>
                  <th className="px-8 py-5">Student ID</th>
                  <th className="px-8 py-5">Status</th>
                  <th className="px-8 py-5">Last 5 Days</th>
                  <th className="px-8 py-5">Remarks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {students.map((student, idx) => (
                  <motion.tr 
                    key={idx}
                    whileHover={{ backgroundColor: '#F8FAFC', x: 4 }}
                    className="group"
                  >
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <motion.div whileHover={{ rotate: 360, scale: 1.1 }} transition={{ duration: 0.6 }} className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 font-black text-xs border border-blue-100 shadow-sm">
                          {student.initial}
                        </motion.div>
                        <div>
                          <p className="text-sm font-[1000] text-[#002366] group-hover:text-blue-600 transition-colors">{student.name}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{student.type}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">{student.id}</td>
                    <td className="px-8 py-5">
                      <div className="flex gap-2">
                        <StatusBtn type="PRES" active={student.status === 'PRES'} color="emerald" icon={<Check size={14}/>}/>
                        <StatusBtn type="ABS" active={student.status === 'ABS'} color="red" icon={<X size={14}/>}/>
                        <StatusBtn type="LATE" active={student.status === 'LATE'} color="orange" icon={<Clock size={14}/>}/>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex gap-1.5">
                        {student.last5.map((_, i) => (
                          <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i*0.1 }} className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-sm" />
                        ))}
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      {student.remark ? (
                        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider ${student.remark.includes('FOLLOW-UP') ? 'bg-red-50 text-red-500 border border-red-100 shadow-sm' : 'bg-slate-50 text-slate-500'}`}>
                          {student.remark.includes('FOLLOW-UP') && <AlertCircle size={12} className="animate-pulse" />}
                          {student.remark}
                        </div>
                      ) : (
                        <MessageSquare size={16} className="text-slate-200 group-hover:text-blue-400 cursor-pointer transition-all hover:scale-125" />
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-7">
               <h2 className="text-xl font-[1000] text-[#002366] mb-6">Class Notifications</h2>
               <div className="space-y-4">
                 <NotifCard icon={<BarChart4/>} title="Upcoming Math Quiz" desc="Remember to bring calculators for tomorrow's algebraic equations quiz." />
                 <NotifCard icon={<AlertCircle/>} title="Homework Submissions" desc="Portal will close at 11:59 PM tonight for the Week 12 assignment." />
               </div>
            </div>
            <div className="col-span-5">
               <h2 className="text-xl font-[1000] text-[#002366] mb-6">Quick Actions</h2>
               <div className="grid grid-cols-2 gap-4">
                 <ActionBtn icon={<Mail/>} label="Email Parents" color="indigo" />
                 <ActionBtn icon={<FileText/>} label="Export Report" color="emerald" />
                 <ActionBtn icon={<UserPlus/>} label="Add Student" color="blue" />
                 <ActionBtn icon={<BarChart4/>} label="Full Analytics" color="orange" />
               </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

// --- HELPER COMPONENTS (Hattohom f nfs l-file) ---

const StatCard = ({ icon, label, value, color }) => (
  <motion.div 
    whileHover={{ y: -10, scale: 1.02 }}
    className="col-span-2 bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex flex-col items-center text-center transition-all hover:shadow-xl"
  >
    <div className={`w-14 h-14 rounded-2xl mb-4 flex items-center justify-center bg-${color}-50 text-${color}-500 shadow-inner group transition-all`}>
      {React.cloneElement(icon, { size: 28, className: "group-hover:rotate-12 transition-transform" })}
    </div>
    <p className="text-[10px] font-[1000] text-slate-300 uppercase tracking-widest mb-1">{label}</p>
    <h3 className="text-3xl font-[1000] text-[#002366]">{value}</h3>
  </motion.div>
);

const StatusBtn = ({ type, active, color, icon }) => (
  <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    className={`flex flex-col items-center gap-1 p-2 rounded-xl border-2 transition-all ${
      active 
      ? `bg-${color}-50 border-${color}-400 text-${color}-600 shadow-md shadow-${color}-500/10` 
      : 'bg-white border-slate-100 text-slate-300 grayscale hover:grayscale-0'
    }`}
  >
    {icon}
    <span className="text-[8px] font-black tracking-tighter uppercase">{type}</span>
  </motion.button>
);

const NotifCard = ({ icon, title, desc }) => (
  <motion.div whileHover={{ x: 10 }} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex gap-5 group cursor-default hover:border-blue-100 transition-all">
    <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500 group-hover:rotate-[360deg] transition-all duration-1000">
      {icon}
    </div>
    <div>
      <h4 className="text-sm font-[1000] text-[#002366] mb-1 group-hover:text-blue-600 transition-colors">{title}</h4>
      <p className="text-xs font-bold text-slate-400 leading-relaxed">{desc}</p>
    </div>
  </motion.div>
);

const ActionBtn = ({ icon, label, color }) => (
  <motion.button
    whileHover={{ y: -5, backgroundColor: '#FFF' }}
    whileTap={{ scale: 0.95 }}
    className="bg-white/50 border border-slate-100 p-6 rounded-[32px] flex flex-col items-center justify-center gap-3 group transition-all hover:shadow-xl hover:shadow-blue-900/5 hover:border-blue-100"
  >
    <div className={`text-slate-300 group-hover:text-${color}-500 group-hover:scale-125 transition-all duration-300`}>
      {React.cloneElement(icon, { size: 24 })}
    </div>
    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-[#002366]">{label}</span>
  </motion.button>
);

export default AttendancePage;