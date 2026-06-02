import React, { useState } from 'react';
import Sidebar from './Sidebar'; 
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Download, CheckCircle2, Circle, Clock, ChevronRight, Palette } from 'lucide-react';

const LessonItem = ({ title, duration, completed = false, onToggle }) => (
  <motion.div 
    layout
    onClick={onToggle}
    whileHover={{ scale: 1.01, x: 5 }}
    whileTap={{ scale: 0.98 }}
    className={`
    group flex items-center p-5 mb-4 rounded-[22px] border transition-all duration-500 cursor-pointer
    ${completed 
      ? 'bg-gray-50/50 border-transparent opacity-70' 
      : 'bg-white border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:border-orange-200 hover:shadow-[0_15px_35px_rgba(255,122,0,0.06)]'}
  `}>
    <div className="mr-5 relative">
      <AnimatePresence mode="wait">
        {completed ? (
          <motion.div 
            key="done"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            className="bg-green-100 p-2.5 rounded-2xl border border-green-200"
          >
            <CheckCircle2 className="w-6 h-6 text-green-600" strokeWidth={2.5} />
          </motion.div>
        ) : (
          <motion.div 
            key="pending"
            initial={{ scale: 0, rotate: 180 }}
            animate={{ scale: 1, rotate: 0 }}
            className="bg-gray-50 p-2.5 rounded-2xl group-hover:bg-orange-50 transition-colors border border-gray-100 group-hover:border-orange-100"
          >
            <Circle className="w-6 h-6 text-gray-300 group-hover:text-orange-400" strokeWidth={2} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    
    <div className="flex-1 relative overflow-hidden">
      <h4 className={`font-bold text-lg transition-colors duration-500 ${completed ? 'text-gray-400' : 'text-[#1A1F2B]'}`}>
        {title}
        {completed && (
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            className="absolute left-0 top-[55%] h-[2px] bg-gray-300/60"
          />
        )}
      </h4>
      <div className="flex items-center text-[13px] text-gray-400 font-semibold mt-1.5 uppercase tracking-wider">
        <Clock className="w-4 h-4 mr-2 opacity-70" />
        {duration}
      </div>
    </div>

    <motion.div 
      animate={{ opacity: completed ? 0 : 1, x: completed ? 10 : 0 }}
      className="bg-orange-50 p-2 rounded-xl"
    >
      <ChevronRight className="w-5 h-5 text-orange-500" />
    </motion.div>
  </motion.div>
);

const CssCourse = () => {
  const [lessons, setLessons] = useState([
    { id: 1, title: "Introduction to CSS", duration: "15 min", completed: false },
    { id: 2, title: "Selectors and Specificity", duration: "20 min", completed: false },
    { id: 3, title: "The Box Model", duration: "25 min", completed: false },
    { id: 4, title: "Flexbox Layout", duration: "30 min", completed: false },
    { id: 5, title: "CSS Grid Fundamentals", duration: "35 min", completed: false },
  ]);

  const toggleLesson = (id) => {
    setLessons(lessons.map(l => l.id === id ? { ...l, completed: !l.completed } : l));
  };

  const progress = Math.round((lessons.filter(l => l.completed).length / lessons.length) * 100);

  return (
    <div className="flex min-h-screen bg-[#F8F9FB] selection:bg-orange-100">
      <Sidebar activePage="CSS Course" /> 
      
      <motion.main 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 p-12 max-w-5xl mx-auto"
      >
        {/* Header Section */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-3">
             <div className="bg-orange-500/10 p-2 rounded-lg">
                <Palette className="w-5 h-5 text-orange-600" />
             </div>
             <span className="text-orange-600 font-black text-xs uppercase tracking-[0.3em]">Design Module</span>
          </div>
          <h1 className="text-[42px] font-[1000] text-[#0F172A] tracking-tighter leading-none mb-3">
            CSS3 Styling
          </h1>
          <p className="text-[#64748B] text-lg font-medium tracking-tight">Learn how to make the web beautiful with CSS.</p>
        </header>

        {/* Progress Card */}
        <motion.div 
          layout
          className="bg-white p-9 rounded-[35px] border border-white shadow-[0_10px_40px_rgba(0,0,0,0.02)] mb-10 relative overflow-hidden"
        >
          <div className="relative z-10 flex justify-between items-center mb-6">
            <span className="font-black text-[#1E293B] text-lg uppercase tracking-tight">Course Progress</span>
            <div className="flex items-baseline gap-1">
                <span className="text-orange-500 font-[1000] text-3xl">{progress}</span>
                <span className="text-orange-400 font-bold text-sm">%</span>
            </div>
          </div>
          <div className="h-3 w-full bg-[#FFF5ED] rounded-full overflow-hidden p-[2px]">
            <motion.div 
              layout
              className="h-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-full shadow-[0_0_15px_rgba(255,122,0,0.3)]" 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ type: "spring", stiffness: 50, damping: 15 }}
            />
          </div>
        </motion.div>

        {/* Official Guide Card */}
        <motion.div 
          whileHover={{ y: -4 }}
          className="bg-white p-7 rounded-[30px] border border-gray-100 flex items-center justify-between mb-12 shadow-sm transition-all hover:shadow-xl hover:border-orange-100"
        >
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-[#FFF5ED] rounded-[22px] flex items-center justify-center border border-orange-100/50 shadow-inner">
              <FileText className="w-8 h-8 text-[#FF7A00]" />
            </div>
            <div>
              <h3 className="text-xl font-black text-[#1A1F2B] tracking-tight">CSS3 Official Guide</h3>
              <p className="text-gray-400 font-semibold text-sm">Downloadable course material</p>
            </div>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center bg-[#FF7A00] text-white px-8 py-4 rounded-[20px] font-black text-[14px] hover:bg-[#F57600] transition-all shadow-[0_10px_25px_rgba(255,122,0,0.25)] active:shadow-inner group"
          >
            <Download className="mr-3 w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
            DOWNLOAD PDF
          </motion.button>
        </motion.div>

        {/* Lessons List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-[900] text-[#0F172A] mb-8 tracking-tight flex items-center gap-3">
            Course Lessons
            <span className="h-[2px] flex-1 bg-gray-100 rounded-full" />
          </h2>
          
          <motion.div layout className="grid gap-1">
            {lessons.map(lesson => (
              <LessonItem 
                key={lesson.id}
                title={lesson.title}
                duration={lesson.duration}
                completed={lesson.completed}
                onToggle={() => toggleLesson(lesson.id)}
              />
            ))}
          </motion.div>
        </div>
      </motion.main>
    </div>
  );
};

export default CssCourse;