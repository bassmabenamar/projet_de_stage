import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calculator, UploadCloud, Search, ChevronDown, 
  Download, AlertCircle, Check, MoreHorizontal,
  TrendingUp, Users, BarChart3, ArrowUpRight
} from 'lucide-react';

import Sidebar from './Sidebar';
import Navbar from './Navbar';

const GradesPage = () => {
  const [students, setStudents] = useState([
    { id: '#202401', name: 'Alumni Anderson', type: 'Regular Student', quiz: 14, assignment: 22, midterm: 54, average: '90.0%', status: 'A', initial: 'AA', color: 'blue' },
    { id: '#202405', name: 'Bella Miller', type: 'Scholarship', quiz: 12, assignment: 20, midterm: 48, average: '80.0%', status: 'B', initial: 'BM', color: 'indigo' },
    { id: '#202412', name: 'Charlie Davis', type: 'Regular Student', quiz: null, assignment: 18, midterm: 40, average: 'Pending', status: 'N/A', initial: 'CD', color: 'slate' },
    { id: '#202418', name: 'Emily Fisher', type: 'Exchange Program', quiz: 10, assignment: 15, midterm: 32, average: '57.0%', status: 'F', initial: 'EF', color: 'red' },
  ]);

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Navbar />
        
        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {/* Breadcrumbs & Title */}
          <header className="mb-8 flex justify-between items-start">
            <motion.div 
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: 1, x: 0 }}
            >
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-2">My Classes > Grade 10-A Mathematics > <span className="text-[#002366]">Grades Management</span></p>
              <h1 className="text-3xl font-[1000] text-[#002366] tracking-tighter">Grades Management</h1>
              <p className="text-slate-400 font-bold text-[13px] mt-1">Mid-term Examination Assessment • Term 2, 2024</p>
            </motion.div>
            <div className="flex gap-3">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 rounded-2xl text-[11px] font-black text-slate-600 uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm"
              >
                <Calculator size={16} className="text-blue-600 group-hover:rotate-[360deg] transition-transform duration-500" /> Average Calculator
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center gap-2 px-6 py-3 bg-[#9C4A00] text-white rounded-2xl font-black text-[12px] shadow-xl shadow-orange-900/20 transition-all uppercase tracking-wider"
              >
                <UploadCloud size={16} className="group-hover:-translate-y-1 transition-transform" /> Publish Grades
              </motion.button>
            </div>
          </header>

          {/* Top Analytics Cards */}
          <div className="grid grid-cols-12 gap-6 mb-8">
            <AnalyticCard colSpan="col-span-3" label="Class Average" value="78.4%" trend="+2.1%" subValue="TARGET: 75.0%" />
            <AnalyticCard colSpan="col-span-3" label="Pass Rate" value="92.0%" trend="No change" subValue="23 OF 25 STUDENTS" />
            
            <motion.div 
              whileHover={{ y: -5 }}
              className="col-span-6 bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex flex-col justify-between transition-all"
            >
              <div className="flex justify-between items-center mb-4">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Grade Distribution</p>
                <button className="group text-[10px] font-black text-blue-600 uppercase tracking-widest flex items-center gap-1 hover:underline">
                  View Analytics <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
              <div className="flex items-end justify-around h-16 px-4">
                {[
                  { l: 'A', h: '60%', delay: 0.1 },
                  { l: 'B', h: '85%', delay: 0.2 },
                  { l: 'C', h: '40%', delay: 0.3 },
                  { l: 'D', h: '20%', delay: 0.4 },
                  { l: 'F', h: '10%', delay: 0.5 },
                ].map((bar, i) => (
                  <div key={i} className="flex flex-col items-center gap-2 w-full">
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: bar.h }}
                      transition={{ duration: 0.8, delay: bar.delay }}
                      className={`w-8 rounded-t-md transition-all hover:opacity-80 ${bar.l === 'F' ? 'bg-red-400' : 'bg-[#002366]'}`}
                      style={{ backgroundColor: bar.l === 'F' ? '' : `rgba(0, 35, 102, ${1 - i * 0.15})` }}
                    />
                    <span className="text-[9px] font-black text-slate-400">{bar.l}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Main Table Section */}
          <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-50 flex justify-between items-center bg-white">
              <div className="flex gap-4">
                <FilterButton label="All Students" />
                <FilterButton label="Sort by Name" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                <span className="text-[11px] font-bold text-slate-400 italic">Auto-saving changes...</span>
              </div>
            </div>

            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Student Name</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">ID</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Quiz 1 (15%)</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Assignment (25%)</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Midterm (60%)</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Final Average</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {students.map((s, idx) => (
                  <motion.tr 
                    key={idx} 
                    whileHover={{ backgroundColor: '#F8FAFC', x: 5 }}
                    className="group transition-colors cursor-default"
                  >
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <motion.div 
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                          className={`w-9 h-9 rounded-xl bg-${s.color}-50 text-${s.color}-600 flex items-center justify-center text-[10px] font-black border border-${s.color}-100`}
                        >
                          {s.initial}
                        </motion.div>
                        <div>
                          <p className="text-sm font-[1000] text-[#002366]">{s.name}</p>
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">{s.type}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-xs font-bold text-slate-500">{s.id}</td>
                    <td className="px-8 py-5">
                      {s.quiz ? (
                        <span className="text-sm font-black text-slate-700">{s.quiz}</span>
                      ) : (
                        <motion.div 
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className="w-12 h-8 bg-yellow-50 border border-yellow-100 rounded-lg flex items-center justify-center text-yellow-600 font-bold text-xs"
                        >
                          --
                        </motion.div>
                      )}
                    </td>
                    <td className="px-8 py-5 text-sm font-black text-slate-700">{s.assignment}</td>
                    <td className="px-8 py-5 text-sm font-black text-slate-700">{s.midterm}</td>
                    <td className="px-8 py-5 font-black">
                      <span className={`${s.average === '57.0%' ? 'text-red-500' : s.average === 'Pending' ? 'text-slate-300' : 'text-[#002366]'}`}>
                        {s.average}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-center">
                      <motion.span 
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-[10px] font-black shadow-sm ${
                          s.status === 'A' ? 'bg-emerald-50 text-emerald-500' : 
                          s.status === 'B' ? 'bg-blue-50 text-blue-500' : 
                          s.status === 'F' ? 'bg-red-50 text-red-500' : 'bg-slate-50 text-slate-400'
                        }`}
                      >
                        {s.status}
                      </motion.span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>

            {/* Pagination Footer */}
            <div className="px-8 py-5 bg-slate-50/30 border-t border-slate-50 flex justify-between items-center text-[11px] font-bold text-slate-400">
              <p>Showing 1 to 4 of 25 students</p>
              <div className="flex gap-2">
                {[1, 2, 3].map(n => (
                  <motion.button 
                    key={n} 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${n === 1 ? 'bg-[#002366] text-white shadow-lg' : 'bg-white border border-slate-100 hover:bg-slate-50'}`}
                  >
                    {n}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Summary Bar */}
          <div className="mt-8 grid grid-cols-12 gap-6 items-center">
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="col-span-8 bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex items-center gap-12 transition-all"
            >
              <div>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Graded</p>
                <p className="text-xl font-[1000] text-[#002366]">24/25</p>
              </div>
              <div className="h-8 w-px bg-slate-100"></div>
              <div>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Averages Calculated</p>
                <p className="text-xl font-[1000] text-[#002366]">24</p>
              </div>
              <motion.div 
                animate={{ x: [-2, 2, -2] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="flex-1 flex items-center justify-center gap-3 py-3 px-6 bg-orange-50 border border-orange-100 rounded-2xl text-orange-600 font-black text-[11px] uppercase tracking-wider shadow-sm"
              >
                <AlertCircle size={16} /> 1 Student Missing Quiz 1
              </motion.div>
            </motion.div>
            <div className="col-span-4 flex justify-end">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center gap-2 px-8 py-4 bg-white border border-slate-200 rounded-2xl text-xs font-[1000] text-[#002366] hover:bg-slate-50 transition-all shadow-sm uppercase tracking-widest"
              >
                <Download size={18} className="group-hover:translate-y-0.5 transition-transform" /> Export CSV
              </motion.button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

// --- Sub Components ---
const AnalyticCard = ({ label, value, trend, subValue, colSpan }) => (
  <motion.div 
    whileHover={{ y: -5, scale: 1.02 }}
    className={`${colSpan} bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm transition-all`}
  >
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">{label}</p>
    <div className="flex items-baseline gap-3 mb-1">
      <h3 className="text-3xl font-[1000] text-[#002366]">{value}</h3>
      <motion.span 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`text-[11px] font-black ${trend.includes('+') ? 'text-emerald-500' : 'text-slate-300'}`}
      >
        {trend === 'No change' ? '' : '↗'} {trend}
      </motion.span>
    </div>
    <p className="text-[9px] font-black text-slate-300 uppercase tracking-tighter">{subValue}</p>
  </motion.div>
);

const FilterButton = ({ label }) => (
  <motion.button 
    whileHover={{ backgroundColor: '#F1F5F9' }}
    className="group flex items-center gap-6 px-5 py-2.5 bg-white border border-slate-100 rounded-xl text-[11px] font-[1000] text-[#002366] hover:border-blue-200 transition-all"
  >
    {label} <ChevronDown size={14} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
  </motion.button>
);

export default GradesPage;