import React from 'react';
import Sidebar from './Sidebar'; 
import { motion } from 'framer-motion';
import { Play, Code, Terminal, Brain, ArrowRight } from 'lucide-react';

const TpCard = ({ title, description, difficulty, category }) => {
  const difficultyColors = {
    Easy: "bg-green-50 text-green-600 border-green-100",
    Medium: "bg-yellow-50 text-yellow-600 border-yellow-100",
    Hard: "bg-red-50 text-red-600 border-red-100"
  };

  return (
    <motion.div 
      whileHover={{ y: -8, shadow: "0 20px 40px rgba(0,0,0,0.04)" }}
      className="bg-white rounded-[32px] border border-gray-100 overflow-hidden flex flex-col h-full transition-all duration-300 group"
    >
      <div className="p-8 flex-1">
        <div className="flex justify-between items-start mb-6">
          <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center group-hover:bg-orange-500 transition-colors duration-300">
            <Terminal className="w-6 h-6 text-orange-500 group-hover:text-white" />
          </div>
          <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${difficultyColors[difficulty]}`}>
            {difficulty}
          </span>
        </div>

        <h3 className="text-xl font-[1000] text-[#1A1F2B] mb-3 tracking-tight group-hover:text-orange-600 transition-colors">
          {title}
        </h3>
        
        <p className="text-gray-400 text-sm font-medium leading-relaxed line-clamp-3">
          {description}
        </p>
      </div>

      <div className="px-8 pb-8">
        <motion.button 
          whileTap={{ scale: 0.96 }}
          className="w-full flex items-center justify-center bg-gray-50 text-[#1A1F2B] py-4 rounded-[20px] font-black text-xs tracking-widest hover:bg-orange-500 hover:text-white transition-all shadow-sm group/btn"
        >
          <Play className="mr-2 w-4 h-4 fill-current transition-transform group-hover/btn:scale-110" />
          START EXERCISE
          <ArrowRight className="ml-2 w-4 h-4 opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all" />
        </motion.button>
      </div>
    </motion.div>
  );
};

const Tps = () => {
  const exercises = [
    { 
      id: 1, 
      title: "Hello World in HTML", 
      description: "Create a simple HTML page that says 'Hello World' inside an h1 tag.", 
      difficulty: "Easy", 
      category: "HTML" 
    },
    { 
      id: 2, 
      title: "Styling a Button", 
      description: "Create a button with the text 'Click Me'. Give it a blue background, white text, and rounded corners.", 
      difficulty: "Easy", 
      category: "CSS" 
    },
    { 
      id: 3, 
      title: "Flexbox Layout", 
      description: "Use Flexbox to center the inner div horizontally and vertically within the container. The container should be 200px tall.", 
      difficulty: "Medium", 
      category: "CSS" 
    },
    { 
      id: 4, 
      title: "Counter App", 
      description: "Create a simple counter. When the button is clicked, the number should increase by 1.", 
      difficulty: "Medium", 
      category: "JavaScript" 
    }
  ];

  return (
    <div className="flex min-h-screen bg-[#FDFDFD] selection:bg-orange-100">
      <Sidebar activePage="TP Exercises" /> 
      
      <motion.main 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex-1 p-16 max-w-7xl mx-auto"
      >
        {/* Header Section */}
        <header className="mb-16">
          <div className="flex items-center gap-3 mb-4 text-orange-500 font-black text-xs uppercase tracking-[0.4em]">
            <Brain className="w-5 h-5" />
            <span>Hands-on Learning</span>
          </div>
          <h1 className="text-[56px] font-[1000] text-[#0F172A] tracking-[-0.05em] leading-[0.9] mb-6">
            Practical <span className="text-orange-500">Exercises</span>
          </h1>
          <p className="text-[#64748B] text-xl font-medium max-w-2xl leading-snug">
            Apply what you've learned with hands-on coding tasks designed to build your skills.
          </p>
        </header>

        {/* Filter Tabs (Subtle Premium Touch) */}
        <div className="flex gap-4 mb-12">
            {['All', 'HTML', 'CSS', 'JS'].map((tab, i) => (
                <button key={tab} className={`px-6 py-2.5 rounded-full text-[11px] font-[900] uppercase tracking-widest transition-all ${i === 0 ? 'bg-[#1A1F2B] text-white shadow-lg shadow-gray-200' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}>
                    {tab}
                </button>
            ))}
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-10">
          {exercises.map((tp) => (
            <TpCard 
              key={tp.id}
              title={tp.title}
              description={tp.description}
              difficulty={tp.difficulty}
              category={tp.category}
            />
          ))}
        </div>
      </motion.main>
    </div>
  );
};

export default Tps;