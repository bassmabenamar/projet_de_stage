import React, { useState } from 'react';
import Sidebar from './Sidebar'; 
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Download, CheckCircle2, Circle, Clock, ChevronRight, Play } from 'lucide-react';

const LessonItem = ({ title, duration, completed = false, onToggle }) => (
  <motion.div 
    layout
    onClick={onToggle}
    className={`
    group flex items-center p-5 mb-4 rounded-2xl border transition-all duration-300 cursor-pointer
    ${completed 
      ? 'bg-gray-50/50 border-gray-100 opacity-70' 
      : 'bg-white border-gray-100 hover:border-orange-200 hover:shadow-[0_10px_25px_rgba(0,0,0,0.04)] hover:-translate-y-0.5'}
  `}>
    <div className="mr-4">
      <AnimatePresence mode="wait">
        {completed ? (
          <motion.div 
            key="done"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            className="bg-green-100 p-2 rounded-full"
          >
            <CheckCircle2 className="w-6 h-6 text-green-500" />
          </motion.div>
        ) : (
          <motion.div 
            key="pending"
            initial={{ scale: 0, rotate: 180 }}
            animate={{ scale: 1, rotate: 0 }}
            className="bg-gray-50 p-2 rounded-full group-hover:bg-orange-50 transition-colors"
          >
            <Circle className="w-6 h-6 text-gray-300 group-hover:text-orange-400" />
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
            className="absolute left-0 top-1/2 h-[2px] bg-gray-300"
          />
        )}
      </h4>
      <div className="flex items-center text-sm text-gray-400 font-medium mt-1">
        <Clock className="w-4 h-4 mr-1.5" />
        {duration}
      </div>
    </div>

    <div className="opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 transition-transform duration-300">
      <ChevronRight className="w-6 h-6 text-orange-500" />
    </div>
  </motion.div>
);

const HtmlCourse = () => {
  const [lessons, setLessons] = useState([
    { id: 1, title: "Introduction to HTML", duration: "12 min", completed: true },
    { id: 2, title: "HTML Tags & Elements", duration: "18 min", completed: true },
    { id: 3, title: "Forms and Inputs", duration: "20 min", completed: false },
    { id: 4, title: "Semantic HTML", duration: "25 min", completed: false },
    { id: 5, title: "Tables and Lists", duration: "15 min", completed: false },
  ]);

  const toggleLesson = (id) => {
    setLessons(lessons.map(l => l.id === id ? { ...l, completed: !l.completed } : l));
  };

  const progress = Math.round((lessons.filter(l => l.completed).length / lessons.length) * 100);

  return (
    <div className="flex min-h-screen bg-[#FDFDFD]">
      <Sidebar activePage="HTML Course" /> 
      
      <main className="flex-1 p-12 max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-black text-[#1A1F2B] mb-3 tracking-tight">HTML5 Foundations</h1>
          <p className="text-gray-500 text-lg font-medium">Master the building blocks of the web.</p>
        </div>

        {/* Progress Card */}
        <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] mb-8">
          <div className="flex justify-between items-end mb-4">
            <span className="font-bold text-[#1A1F2B]">Course Progress</span>
            <span className="text-orange-500 font-black text-xl">{progress}%</span>
          </div>
          <div className="h-3 w-full bg-orange-50 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-[#FF7A00] rounded-full shadow-[0_0_15px_rgba(255,122,0,0.3)]" 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1 }}
            />
          </div>
        </div>

        {/* Official Guide Card */}
        <div className="bg-white p-6 rounded-[28px] border border-gray-100 flex items-center justify-between mb-12 hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mr-5 border border-orange-100">
              <FileText className="w-7 h-7 text-[#FF7A00]" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#1A1F2B]">HTML5 Official Guide</h3>
              <p className="text-gray-400 font-medium">Official course material</p>
            </div>
          </div>
          <button className="flex items-center bg-[#FF7A00] text-white px-8 py-4 rounded-2xl font-bold hover:bg-[#E66E00] transition-all shadow-[0_8px_20px_rgba(255,122,0,0.2)] active:scale-95 group">
            <Download className="mr-2.5 w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
            Download PDF
          </button>
        </div>

        {/* Lessons List */}
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-[#1A1F2B] mb-8">Course Lessons</h2>
          
          <motion.div layout>
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
      </main>
    </div>
  );
};

export default HtmlCourse;