import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, CheckCircle, AlertCircle, Upload, 
  FileText, ExternalLink, ChevronRight, MoreVertical,
  Filter, Clock, ArrowRight, Users
} from 'lucide-react';

import Navbar from './Navbar';

const Homework = () => {
  const springConfig = { type: "spring", stiffness: 200, damping: 20, mass: 1 };
  
  const containerVars = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.08, delayChildren: 0.1 } 
    }
  };

  const cardTransition = {
    hidden: { y: 30, opacity: 0, scale: 0.98 },
    visible: { y: 0, opacity: 1, scale: 1, transition: springConfig }
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans text-[#1E293B] antialiased selection:bg-orange-100">

      <main className="flex-1 overflow-y-auto pb-20">
        <Navbar />

        <motion.div 
          variants={containerVars}
          initial="hidden"
          animate="visible"
          className="p-6 md:p-10 max-w-[1550px] mx-auto"
        >
          {/* Header Section */}
          <motion.div variants={cardTransition} className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div className="space-y-2">
              <motion.h2 
                initial={{ x: -20 }}
                animate={{ x: 0 }}
                className="text-[36px] md:text-[42px] font-black text-[#002366] tracking-tight leading-none"
              >
                Homework
              </motion.h2>
              <p className="text-slate-400 font-bold text-base md:text-lg">Manage your academic tasks and track your progress.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-6 w-full md:w-auto">
              <div className="flex items-center gap-4 bg-white/40 p-2 rounded-[24px] backdrop-blur-sm border border-white/50 w-full sm:w-auto">
                <div className="flex bg-white shadow-inner p-1.5 rounded-[20px] border border-slate-100 w-full">
                  {['All Tasks', 'Pending', 'Submitted'].map((tab, i) => (
                    <motion.button 
                      key={tab}
                      whileHover={{ backgroundColor: "rgba(0,35,102,0.05)" }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex-1 px-4 md:px-8 py-3 rounded-[16px] text-[10px] md:text-[11px] font-black uppercase tracking-widest transition-all ${i === 0 ? 'bg-[#002366] text-white shadow-xl shadow-blue-900/20' : 'text-slate-400 hover:text-[#002366]'}`}
                    >
                      {tab}
                    </motion.button>
                  ))}
                </div>
              </div>

              <motion.button 
                whileHover={{ scale: 1.05, backgroundColor: '#fff' }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 bg-white/60 border border-slate-100 rounded-[22px] text-[11px] font-black text-slate-500 hover:text-[#002366] transition-all shadow-sm uppercase tracking-widest"
              >
                <Filter size={14} /> Sort by Deadline
              </motion.button>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <StatCard icon={<BookOpen size={28}/>} label="Pending Assignments" value="04" sub="THIS WEEK" color="text-blue-600" bg="bg-blue-50" />
            <StatCard icon={<CheckCircle size={28}/>} label="Tasks Submitted" value="12" sub="COMPLETED" color="text-green-600" bg="bg-green-50" />
            <StatCard icon={<AlertCircle size={28}/>} label="Deadline Today" value="01" sub="URGENT" color="text-orange-600" bg="bg-orange-50" />
          </div>

          {/* Assignments Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <HomeworkCard 
              status="Pending"
              dueText="Due Today"
              title="Advanced Thermodynamics"
              professor="Dr. Sarah Mitchell"
              deadline="Oct 24, 2023 • 11:59 PM"
              progress={90}
              isUrgent
            />
            <HomeworkCard 
              status="Pending"
              dueText="3 Days left"
              title="Modern Literary Analysis"
              professor="Prof. Robert Sterling"
              deadline="Oct 27, 2023"
              progress={45}
            />
            <HomeworkCard 
              status="Submitted"
              title="Vector Calculus II"
              professor="Dr. Amanda Wei"
              file="calculus_final_v2.pdf"
              submittedOn="Oct 20, 4:12 PM"
              isSubmitted
            />
            <HomeworkCard 
              status="Pending"
              dueText="5 Days left"
              title="Cellular Biology Lab Report"
              professor="Prof. James Hudson"
              deadline="Oct 29, 2023"
              progress={10}
            />
            
            <HomeworkCard 
              status="Submitted"
              title="Global Economic Trends"
              professor="Dr. Elena Kostas"
              grade="A+"
              score="95/100"
              isSubmitted
              isGraded
            />

            {/* Upcoming Placeholder */}
            <motion.div 
              variants={cardTransition}
              className="bg-white/30 border-4 border-dashed border-slate-100 rounded-[55px] flex flex-col items-center justify-center p-12 text-center group min-h-[400px]"
            >
              <motion.div 
                whileHover={{ rotateY: 180 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-xl shadow-slate-200/50 mb-6 cursor-pointer"
              >
                <Clock className="text-slate-300 group-hover:text-orange-500 transition-colors" size={32} />
              </motion.div>
              <h4 className="text-2xl font-black text-[#002366] mb-2">Upcoming Assignments</h4>
              <p className="text-slate-400 font-bold text-sm max-w-[250px]">No more tasks scheduled for the next 7 days.</p>
            </motion.div>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-12 gap-10 mt-12">
            <motion.div 
              variants={cardTransition}
              whileHover={{ y: -10, scale: 1.01 }}
              className="col-span-12 lg:col-span-8 bg-[#002366] rounded-[50px] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl shadow-blue-900/30 group"
            >
              <div className="relative z-10">
                <h3 className="text-3xl md:text-4xl font-black mb-6 tracking-tight">Academic Policy Reminder</h3>
                <p className="text-blue-200/60 font-bold text-base md:text-lg max-w-2xl mb-10 leading-relaxed">
                  Remember that all assignments must be submitted through the portal by the specified deadline.
                  Late submissions are subject to a 10% penalty per day.
                </p>
                <motion.button 
                  whileHover={{ gap: "25px" }}
                  className="flex items-center gap-4 px-10 py-5 bg-white/10 hover:bg-white/20 rounded-[22px] font-black text-xs uppercase tracking-[0.3em] transition-all border border-white/10 backdrop-blur-md"
                >
                  Read Policy Handbook <ArrowRight size={20} />
                </motion.button>
              </div>
              <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-blue-400/20 rounded-full blur-[100px] group-hover:bg-blue-400/30 transition-all duration-1000" />
            </motion.div>

            <motion.div 
              variants={cardTransition}
              whileHover={{ y: -10 }}
              className="col-span-12 lg:col-span-4 bg-white border border-slate-100 rounded-[50px] p-10 shadow-xl shadow-slate-200/50 flex flex-col justify-between min-h-[350px]"
            >
              <div className="flex items-start justify-between">
                <div className="w-24 h-24 bg-[#0F172A] rounded-[30px] flex items-center justify-center shadow-2xl rotate-3">
                  <div className="text-white text-center">
                    <div className="font-black text-lg leading-tight">Amity</div>
                    <div className="text-[6px] uppercase tracking-[0.4em] opacity-40">Support</div>
                  </div>
                </div>
                <div className="bg-orange-50 p-3 rounded-2xl text-orange-500"><Clock size={24}/></div>
              </div>
              <div>
                <h4 className="font-black text-2xl text-[#002366] mb-3">Need Help?</h4>
                <p className="text-slate-400 font-bold text-sm mb-8">Access our digital library or schedule a tutor.</p>
                <div className="space-y-3">
                  {['Digital Library', 'Video Tutorials'].map(btn => (
                    <motion.button key={btn} whileHover={{ x: 10 }} className="w-full py-4 px-6 bg-slate-50 hover:bg-[#002366] hover:text-white rounded-2xl text-[10px] font-black uppercase tracking-widest text-left flex justify-between items-center group transition-all">
                      {btn} <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

const StatCard = ({ icon, label, value, sub, color, bg }) => (
  <motion.div 
    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
    whileHover={{ y: -12, scale: 1.02 }}
    className="bg-white p-8 md:p-10 rounded-[45px] border border-slate-50 shadow-xl shadow-slate-200/30 flex items-center justify-between group cursor-pointer overflow-hidden relative"
  >
    <div className="relative z-10 flex items-center gap-6 md:gap-8">
      <motion.div 
        whileHover={{ rotateY: 180 }}
        transition={{ type: "spring", stiffness: 200 }}
        className={`w-16 h-16 md:w-20 md:h-20 ${bg} ${color} rounded-[28px] flex items-center justify-center shadow-inner`}
      >
        {icon}
      </motion.div>
      <div>
        <p className={`text-[9px] md:text-[10px] font-black uppercase tracking-[0.25em] mb-2 ${color}`}>{sub}</p>
        <h5 className="text-slate-400 font-black text-sm md:text-base">{label}</h5>
      </div>
    </div>
    <div className="text-4xl md:text-6xl font-black text-[#002366] tracking-tighter relative z-10 group-hover:text-orange-600 transition-colors">{value}</div>
    <div className={`absolute inset-0 ${bg} opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
  </motion.div>
);

const HomeworkCard = ({ status, dueText, title, professor, deadline, progress, isUrgent, isSubmitted, isGraded, file, submittedOn, grade, score }) => (
  <motion.div 
    variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
    whileHover={{ y: -15, scale: 1.01 }}
    className="bg-white rounded-[55px] p-8 md:p-12 border border-slate-50 shadow-xl shadow-blue-900/5 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500 relative group overflow-hidden"
  >
    <div className="flex justify-between items-center mb-10">
      <div className="flex items-center gap-4">
        <motion.span whileHover={{ scale: 1.1 }} className={`px-4 md:px-6 py-2.5 rounded-[18px] text-[9px] md:text-[10px] font-black uppercase tracking-[0.15em] shadow-sm ${isSubmitted ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-orange-50 text-orange-600 border border-orange-100'}`}>
          ● {status}
        </motion.span>
        {dueText && <span className="text-slate-300 font-black text-[10px] uppercase tracking-widest">{dueText}</span>}
      </div>
      <motion.button whileHover={{ rotate: 90 }} className="p-3 hover:bg-slate-50 rounded-2xl text-slate-300 transition-all"><MoreVertical size={20}/></motion.button>
    </div>

    <h3 className="text-2xl md:text-3xl font-black text-[#002366] mb-4 group-hover:text-orange-600 transition-colors leading-tight">{title}</h3>
    <div className="flex items-center gap-3 text-slate-400 font-bold text-sm md:text-base mb-10">
       <div className="w-10 h-10 bg-slate-50 rounded-2xl flex items-center justify-center text-blue-900"><Users size={18}/></div>
       {professor}
    </div>

    {isSubmitted ? (
      <div className="space-y-8">
        {file && (
          <motion.div whileHover={{ x: 10 }} className="bg-slate-50/50 p-6 rounded-[30px] flex items-center justify-between group/file hover:bg-blue-50 transition-all cursor-pointer border-2 border-transparent hover:border-blue-100">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm"><FileText size={28} /></div>
              <div>
                <p className="font-black text-[#002366] text-sm md:text-base">{file}</p>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Submitted {submittedOn}</p>
              </div>
            </div>
            <ExternalLink size={20} className="text-slate-300 group-hover/file:text-blue-600 transition-colors" />
          </motion.div>
        )}
        
        {isGraded && (
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-green-50/50 p-6 md:p-8 rounded-[35px] border-2 border-green-100/50 flex items-center justify-between shadow-inner">
            <div className="flex items-center gap-4 md:gap-6">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-2xl shadow-md flex items-center justify-center text-green-600 font-black text-xl md:text-2xl">★</div>
              <div>
                <p className="font-black text-[#002366] text-base md:text-lg">Grade: <span className="text-green-600">{grade}</span></p>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1">Feedback available</p>
              </div>
            </div>
            <div className="text-3xl md:text-5xl font-black text-green-600 tracking-tighter">{score}</div>
          </motion.div>
        )}

        <div className="flex justify-between items-center pt-8 border-t border-slate-50">
           <button className="text-[10px] font-black text-slate-300 hover:text-[#002366] uppercase tracking-[0.25em] transition-all">History</button>
           <motion.button whileHover={{ gap: "15px" }} className="text-[10px] font-black text-[#002366] hover:text-orange-600 uppercase tracking-[0.25em] transition-all flex items-center gap-3">View More <ChevronRight size={18}/></motion.button>
        </div>
      </div>
    ) : (
      <div className="space-y-10">
        <div>
          <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] mb-4">
            <span className="text-slate-300">Deadline</span>
            <span className={isUrgent ? 'text-orange-600 font-black' : 'text-blue-900'}>{deadline}</span>
          </div>
          <div className="h-4 bg-slate-100 rounded-full overflow-hidden p-1">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: `${progress}%` }}
              transition={{ duration: 1.5, ease: "circOut" }}
              className={`h-full rounded-full shadow-sm ${isUrgent ? 'bg-gradient-to-r from-orange-400 to-orange-600' : 'bg-gradient-to-r from-blue-700 to-blue-900'}`}
            />
          </div>
        </div>
        
        <motion.button 
          whileHover={{ scale: 1.02, y: -5 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full py-5 md:py-6 rounded-[28px] flex items-center justify-center gap-4 text-[10px] md:text-xs font-black uppercase tracking-[0.3em] shadow-2xl transition-all ${isUrgent ? 'bg-orange-600 text-white shadow-orange-600/30 hover:bg-[#002366]' : 'bg-[#002366] text-white shadow-blue-900/30 hover:bg-orange-600'}`}
        >
          <Upload size={20} strokeWidth={3} /> Upload Assignment
        </motion.button>
      </div>
    )}
  </motion.div>
);

export default Homework;