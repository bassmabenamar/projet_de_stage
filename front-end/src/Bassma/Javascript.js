import React, { useState } from 'react';
import Sidebar from './Sidebar'; 
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Download, CheckCircle2, Circle, Clock, ChevronRight, Code2 } from 'lucide-react';

const LessonItem = ({ title, duration, completed = false, onToggle }) => (
  <motion.div 
    layout
    onClick={onToggle}
    whileHover={{ scale: 1.01, x: 5 }}
    whileTap={{ scale: 0.98 }}
    className={`
    group flex items-center p-6 mb-4 rounded-[28px] border transition-all duration-500 cursor-pointer
    ${completed 
      ? 'bg-gray-50/50 border-transparent opacity-70' 
      : 'bg-white border-gray-100 shadow-[0_4px_25px_rgba(0,0,0,0.02)] hover:border-orange-200 hover:shadow-[0_15px_35px_rgba(255,122,0,0.06)]'}
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
            <CheckCircle2 className="w-6 h-6 text-green-600" strokeWidth={3} />
          </motion.div>
        ) : (
          <motion.div 
            key="pending"
            initial={{ scale: 0, rotate: 180 }}
            animate={{ scale: 1, rotate: 0 }}
            className="bg-gray-50 p-2.5 rounded-2xl border border-gray-100 group-hover:bg-orange-50 group-hover:border-orange-200 transition-colors"
          >
            <Circle className="w-6 h-6 text-gray-300 group-hover:text-orange-500" strokeWidth={2} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    
    <div className="flex-1 relative overflow-hidden">
      <h4 className={`font-black text-[18px] tracking-tight transition-colors duration-500 ${completed ? 'text-gray-400' : 'text-[#1A1F2B]'}`}>
        {title}
        {completed && (
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            className="absolute left-0 top-[55%] h-[2px] bg-gray-300/80 rounded-full"
          />
        )}
      </h4>
      <div className="flex items-center text-[12px] text-gray-400 font-bold mt-1.5 uppercase tracking-widest">
        <Clock className="w-4 h-4 mr-2 opacity-60" />
        {duration}
      </div>
    </div>

    <motion.div 
      animate={{ opacity: completed ? 0 : 1, x: completed ? 15 : 0 }}
      className="bg-orange-50 p-2 rounded-xl"
    >
      <ChevronRight className="w-5 h-5 text-orange-500" />
    </motion.div>
  </motion.div>
);

const JavaScriptCourse = () => {
  const [lessons, setLessons] = useState([
    { id: 1, title: "Introduction to JavaScript", duration: "15 min", completed: false },
    { id: 2, title: "Variables and Data Types", duration: "20 min", completed: false },
    { id: 3, title: "Functions and Scope", duration: "25 min", completed: false },
    { id: 4, title: "Arrays and Objects", duration: "30 min", completed: false },
    { id: 5, title: "DOM Manipulation", duration: "35 min", completed: false },
  ]);

  const toggleLesson = (id) => {
    setLessons(lessons.map(l => l.id === id ? { ...l, completed: !l.completed } : l));
  };

  const progress = Math.round((lessons.filter(l => l.completed).length / lessons.length) * 100);

  return (
    <div className="flex min-h-screen bg-[#F9FAFB] selection:bg-orange-100">
      <Sidebar activePage="JavaScript Course" /> 
      
      <motion.main 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 p-16 max-w-6xl mx-auto"
      >
        {/* Header Section */}
        <header className="mb-14">
          <div className="flex items-center gap-2 mb-4 text-orange-500 font-black text-xs uppercase tracking-[0.3em]">
            <Code2 className="w-4 h-4" />
            <span>Logic Specialization</span>
          </div>
          <h1 className="text-[52px] font-[1000] text-[#0F172A] tracking-[-0.04em] leading-tight mb-4">
            JavaScript <span className="text-orange-500">Basics</span>
          </h1>
          <p className="text-[#64748B] text-xl font-medium tracking-tight">Add interactivity and logic to your web pages.</p>
        </header>

        {/* Progress Card */}
        <motion.div 
          layout
          className="bg-white p-10 rounded-[40px] border border-white shadow-[0_20px_50px_rgba(0,0,0,0.02)] mb-10 relative overflow-hidden"
        >
          <div className="relative z-10 flex justify-between items-center mb-6">
            <span className="font-black text-[#1E293B] text-lg tracking-tight uppercase">Course Progress</span>
            <span className="text-orange-500 font-[1000] text-3xl italic">{progress}%</span>
          </div>
          <div className="h-3.5 w-full bg-[#FFF5ED] rounded-full overflow-hidden p-[2px]">
            <motion.div 
              layout
              className="h-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-full shadow-[0_4px_12px_rgba(255,122,0,0.3)]" 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ type: "spring", stiffness: 40, damping: 12 }}
            />
          </div>
        </motion.div>

        {/* Official Guide Card */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white p-8 rounded-[35px] border border-gray-100 flex items-center justify-between mb-16 shadow-sm transition-all hover:shadow-xl"
        >
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-[#FFF5ED] rounded-[24px] flex items-center justify-center border border-orange-100">
              <FileText className="w-8 h-8 text-[#FF7A00]" strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="text-[22px] font-[900] text-[#1A1F2B] tracking-tight">JavaScript Official Guide</h3>
              <p className="text-gray-400 font-bold text-sm uppercase tracking-wide">Official course material</p>
            </div>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center bg-[#FF7A00] text-white px-10 py-4 rounded-[22px] font-black text-sm shadow-[0_15px_30px_rgba(255,122,0,0.25)] hover:bg-[#F57600] transition-all group"
          >
            <Download className="mr-3 w-5 h-5 group-hover:-translate-y-1 transition-transform" />
            DOWNLOAD PDF
          </motion.button>
        </motion.div>

        {/* Curriculum List */}
        <div className="space-y-4">
          <h2 className="text-[26px] font-[1000] text-[#0F172A] mb-8 tracking-tight">Course Lessons</h2>
          
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

export default JavaScriptCourse;