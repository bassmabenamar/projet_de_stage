import React from 'react';
import Sidebar from './Sidebar'; 
import { motion } from 'framer-motion';
import { Play, HelpCircle, CheckSquare, Clock, BarChart3 } from 'lucide-react';

const QuizCard = ({ title, questionsCount, timeLimit, difficulty }) => (
  <motion.div 
    whileHover={{ y: -10, shadow: "0 25px 50px -12px rgba(255, 122, 0, 0.15)" }}
    transition={{ type: "spring", stiffness: 300 }}
    className="bg-white p-8 rounded-[35px] border border-gray-100 flex flex-col h-full shadow-[0_4px_20px_rgba(0,0,0,0.02)] group"
  >
    <div className="flex justify-between items-start mb-6">
      <div className="bg-orange-50 p-3 rounded-2xl border border-orange-100 group-hover:bg-orange-500 group-hover:border-orange-500 transition-colors duration-300">
        <HelpCircle className="w-6 h-6 text-orange-500 group-hover:text-white transition-colors" />
      </div>
      <span className="bg-gray-50 px-3 py-1 rounded-full text-[10px] font-black text-gray-400 uppercase tracking-widest border border-gray-100">
        {difficulty}
      </span>
    </div>

    <h3 className="text-2xl font-[1000] text-[#1A1F2B] mb-3 tracking-tight leading-tight group-hover:text-orange-600 transition-colors">
      {title}
    </h3>
    
    <div className="flex flex-wrap gap-4 mb-8 mt-auto">
      <div className="flex items-center text-gray-400 text-sm font-bold">
        <CheckSquare className="w-4 h-4 mr-1.5 text-orange-400" />
        {questionsCount} Questions
      </div>
      <div className="flex items-center text-gray-400 text-sm font-bold">
        <Clock className="w-4 h-4 mr-1.5 text-orange-400" />
        {timeLimit} min
      </div>
    </div>

    <motion.button 
      whileTap={{ scale: 0.95 }}
      className="w-full flex items-center justify-center bg-[#FF7A00] text-white py-4 rounded-[22px] font-black text-sm shadow-[0_10px_20px_rgba(255,122,0,0.2)] hover:bg-[#F57600] transition-all group/btn"
    >
      <Play className="mr-2.5 w-4 h-4 fill-current group-hover/btn:translate-x-1 transition-transform" />
      START QUIZ
    </motion.button>
  </motion.div>
);

const Qcm = () => {
  const quizzes = [
    { id: 1, title: "HTML & CSS Basics", questionsCount: 5, timeLimit: 10, difficulty: "Beginner" },
    { id: 2, title: "JavaScript Fundamentals", questionsCount: 5, timeLimit: 15, difficulty: "Intermediate" },
    { id: 3, title: "Bootstrap Framework", questionsCount: 10, timeLimit: 12, difficulty: "Beginner" },
    { id: 4, title: "Advanced React Logic", questionsCount: 8, timeLimit: 20, difficulty: "Advanced" },
  ];

  return (
    <div className="flex min-h-screen bg-[#F9FAFB] selection:bg-orange-100">
      <Sidebar activePage="QCM" /> 
      
      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 p-16 max-w-7xl mx-auto"
      >
        {/* Header Section */}
        <header className="mb-14">
          <div className="flex items-center gap-2 mb-4 text-orange-500 font-black text-xs uppercase tracking-[0.3em]">
            <BarChart3 className="w-4 h-4" />
            <span>Knowledge Assessment</span>
          </div>
          <h1 className="text-[52px] font-[1000] text-[#0F172A] tracking-[-0.04em] leading-tight mb-4">
            QCM <span className="text-orange-500">Quizzes</span>
          </h1>
          <p className="text-[#64748B] text-xl font-medium tracking-tight">Test your knowledge with multiple choice questions.</p>
        </header>

        {/* Stats Grid (Optional Premium Touch) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-[30px] border border-gray-100 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500 font-black">4</div>
                <div>
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Available Quizzes</p>
                    <p className="text-lg font-bold text-[#1A1F2B]">Ready to start</p>
                </div>
            </div>
            {/* Add more stats if needed */}
        </div>

        {/* Quizzes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {quizzes.map((quiz) => (
            <QuizCard 
              key={quiz.id}
              title={quiz.title}
              questionsCount={quiz.questionsCount}
              timeLimit={quiz.timeLimit}
              difficulty={quiz.difficulty}
            />
          ))}
        </div>
      </motion.main>
    </div>
  );
};

export default Qcm;