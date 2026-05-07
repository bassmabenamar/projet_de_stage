import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, Download, Calendar, Filter, Plus, 
  BookOpen, Beaker, Landmark, Languages, 
  Atom, FileText, CheckCircle2, Clock
} from 'lucide-react';

import Navbar from './Navbar';

const Grades = () => {
  const [activeSemester, setActiveSemester] = useState(1);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans text-[#1E293B]">
      <main className="flex-1 flex flex-col relative overflow-hidden">
        <Navbar />

        <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-[1400px] mx-auto"
          >
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
              <motion.div variants={cardVariants}>
                <h1 className="text-3xl md:text-[36px] font-black text-[#002366] tracking-tight mb-2">Academic Performance</h1>
                <p className="text-slate-400 font-medium max-w-xl text-sm md:text-base">
                  View and download your comprehensive grade reports for the current academic year.
                </p>
              </motion.div>
              
              <motion.button 
                whileHover={{ scale: 1.05, backgroundColor: '#f97316' }}
                whileTap={{ scale: 0.95 }}
                className="w-full md:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-[#FF7A00] text-white rounded-2xl font-bold shadow-lg shadow-orange-200 transition-all"
              >
                <FileText size={20} /> Download Report Card PDF
              </motion.button>
            </div>

            {/* GPA & Semester Stats Row */}
            <div className="grid grid-cols-12 gap-6 md:gap-8 mb-12">
              <GPAStatsCard gpa="3.82" percentile="Top 5%" />
              
              <div className="col-span-12 lg:col-span-8 bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm relative">
                <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-4">
                  <div className="flex bg-slate-100 p-1.5 rounded-2xl gap-2 relative w-full sm:w-auto">
                    <SemesterTab active={activeSemester === 1} onClick={() => setActiveSemester(1)} label="Semester 1" />
                    <SemesterTab active={activeSemester === 2} onClick={() => setActiveSemester(2)} label="Semester 2" />
                  </div>
                  <div className="flex items-center gap-2 text-slate-400 font-bold text-[10px] uppercase tracking-widest bg-slate-50 px-4 py-2 rounded-xl">
                    <Calendar size={14} className="text-[#002366]" /> Fall 2023 - Spring 2024
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                  <MiniStat label="Subjects Taken" value="05" />
                  <MiniStat label="Credits Earned" value="18.0" />
                  <MiniStat label="Attendance Rate" value="98.2%" highlight />
                </div>
              </div>
            </div>

            {/* Subject Performance Grid */}
            <div className="mb-12">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-black text-[#002366]">Subject Performance</h2>
                <button className="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-[#002366] transition-all shadow-sm">
                  <Filter size={20} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <SubjectCard icon={<BookOpen />} name="Mathematics" prof="Dr. Sarah Miller" grade="A" progress={92} midterm={94} final={89} credits="4.0" color="blue" />
                <SubjectCard icon={<Beaker />} name="Science" prof="Prof. James Wilson" grade="A-" progress={88} midterm={85} final={91} credits="3.5" color="orange" />
                <SubjectCard icon={<Landmark />} name="History" prof="Ms. Emily Thompson" grade="B+" progress={79} midterm={82} final={76} credits="3.0" color="purple" />
                <SubjectCard icon={<Languages />} name="English" prof="Dr. Robert Brown" grade="A" progress={96} midterm={98} final={94} credits="3.5" color="blue" />
                <SubjectCard icon={<Atom />} name="Physics" prof="Prof. Alan Turing" grade="A-" progress={85} midterm={82} final={88} credits="4.0" color="purple" />
                
                {/* Add Elective Card */}
                <motion.div 
                  whileHover={{ y: -10, borderColor: '#002366' }}
                  className="border-2 border-dashed border-slate-200 rounded-[32px] flex flex-col items-center justify-center p-10 group cursor-pointer transition-all min-h-[300px]"
                >
                  <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-blue-50 group-hover:text-[#002366] transition-all mb-4">
                    <Plus size={32} />
                  </div>
                  <h4 className="font-black text-[#002366] mb-2">Add Elective</h4>
                  <p className="text-[11px] text-slate-400 text-center font-medium mb-6">Explore and register for Semester 2 courses</p>
                  <span className="text-xs font-black text-[#002366] uppercase tracking-widest border-b-2 border-[#002366] pb-1">Browse Catalog</span>
                </motion.div>
              </div>
            </div>

            {/* Recent Assessment Results Table */}
            <div className="bg-white rounded-[32px] p-6 md:p-10 border border-slate-100 shadow-sm overflow-hidden">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-xl font-black text-[#002366]">Recent Results</h2>
                <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">View All</button>
              </div>

              <div className="overflow-x-auto w-full no-scrollbar">
                <table className="w-full min-w-[600px]">
                  <thead>
                    <tr className="text-left text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] border-b border-slate-50">
                      <th className="pb-6">Date</th>
                      <th className="pb-6">Subject</th>
                      <th className="pb-6">Assessment</th>
                      <th className="pb-6">Score</th>
                      <th className="pb-6 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm font-bold text-[#1E293B]">
                    <AssessmentRow date="Oct 24, 2023" subject="Mathematics" type="Midterm Exam" score="94/100" status="Passed" statusColor="emerald" />
                    <AssessmentRow date="Oct 20, 2023" subject="Physics" type="Lab Report" score="18/20" status="Passed" statusColor="emerald" />
                    <AssessmentRow date="Oct 18, 2023" subject="History" type="Essay" score="76/100" status="Reviewed" statusColor="blue" />
                    <AssessmentRow date="Oct 15, 2023" subject="Science" type="Biology Quiz" score="10/10" status="Excellent" statusColor="emerald" />
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

/* --- PREMIUM COMPONENTS --- */

const GPAStatsCard = ({ gpa, percentile }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="col-span-12 lg:col-span-4 bg-white rounded-[32px] p-8 md:p-10 border border-slate-100 shadow-sm relative overflow-hidden group"
  >
    <div className="flex justify-between items-start mb-10">
      <h3 className="text-lg font-black text-[#002366]">Current GPA</h3>
      <motion.div 
        animate={{ y: [0, -5, 0] }} 
        transition={{ duration: 2, repeat: Infinity }}
        className="text-orange-500"
      >
        <TrendingUp size={24} />
      </motion.div>
    </div>
    <div className="flex items-baseline gap-2 mb-8">
      <span className="text-[54px] md:text-[64px] font-black text-[#002366] leading-none">{gpa}</span>
      <span className="text-slate-300 font-bold text-xl">/ 4.0</span>
    </div>
    <div className="space-y-3">
      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
        <span className="text-slate-400">Percentile Rank</span>
        <span className="text-[#002366]">{percentile}</span>
      </div>
      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: '95%' }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-blue-600 to-blue-900 rounded-full"
        />
      </div>
    </div>
  </motion.div>
);

const SemesterTab = ({ active, onClick, label }) => (
  <button 
    onClick={onClick}
    className="relative flex-1 sm:flex-none px-8 py-2 rounded-xl text-[11px] font-black z-10 transition-all overflow-hidden"
  >
    {active && (
      <motion.div 
        layoutId="active-sem-bg"
        className="absolute inset-0 bg-white shadow-md rounded-xl -z-10"
        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
      />
    )}
    <span className={active ? 'text-[#002366]' : 'text-slate-400 hover:text-slate-500'}>{label}</span>
  </button>
);

const SubjectCard = ({ icon, name, prof, grade, progress, midterm, final, credits, color }) => {
  const accent = color === 'blue' ? 'text-blue-600 bg-blue-50' : color === 'orange' ? 'text-orange-500 bg-orange-50' : 'text-purple-600 bg-purple-50';
  const bar = color === 'blue' ? 'bg-blue-900' : color === 'orange' ? 'bg-orange-500' : 'bg-purple-600';

  return (
    <motion.div 
      whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,35,102,0.05)" }}
      className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm group h-full"
    >
      <div className="flex justify-between items-start mb-8">
        <div className="flex gap-4">
          <motion.div 
            whileHover={{ rotateY: 180 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center ${accent} shadow-inner cursor-pointer`}
          >
            {React.cloneElement(icon, { size: 20 })}
          </motion.div>
          <div>
            <h4 className="text-sm font-black text-[#002366]">{name}</h4>
            <p className="text-[10px] text-slate-400 font-bold italic">{prof}</p>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-lg text-[10px] font-black ${accent}`}>
          {grade}
        </div>
      </div>

      <div className="mb-8">
        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-2">
          <span className="text-slate-300">Progress</span>
          <span className="text-[#002366]">{progress}%</span>
        </div>
        <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: `${progress}%` }}
            transition={{ duration: 1 }}
            className={`h-full ${bar} rounded-full`}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center pt-4 border-t border-slate-50">
        <ScoreBox label="Midterm" value={midterm} />
        <ScoreBox label="Finals" value={final} />
        <ScoreBox label="Credits" value={credits} />
      </div>
    </motion.div>
  );
};

const ScoreBox = ({ label, value }) => (
  <div>
    <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest mb-1">{label}</p>
    <p className="text-xs md:text-sm font-black text-[#002366]">{value}</p>
  </div>
);

const MiniStat = ({ label, value, highlight }) => (
  <div className="text-center sm:text-left">
    <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-2">{label}</p>
    <p className={`text-2xl font-black ${highlight ? 'text-orange-500' : 'text-[#002366]'}`}>{value}</p>
  </div>
);

const AssessmentRow = ({ date, subject, type, score, status, statusColor }) => (
  <motion.tr 
    initial={{ opacity: 0, x: -10 }}
    whileInView={{ opacity: 1, x: 0 }}
    className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors group"
  >
    <td className="py-6 text-slate-400 text-xs">{date}</td>
    <td className="py-6 text-blue-900 font-black">{subject}</td>
    <td className="py-6 text-slate-500 text-xs">{type}</td>
    <td className="py-6 text-[#002366] font-black">{score}</td>
    <td className="py-6 text-right">
      <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
        statusColor === 'emerald' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'
      }`}>
        {status}
      </span>
    </td>
  </motion.tr>
);

export default Grades;