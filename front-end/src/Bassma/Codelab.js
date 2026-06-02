import React, { useState } from 'react';
import Sidebar from './Sidebar'; 
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Monitor, Code2, Terminal, Eye } from 'lucide-react';

const Codelab = () => {
  const [activeTab, setActiveTab] = useState('HTML');
  const [code, setCode] = useState({
    HTML: `<div class="container">\n  <h1>Hello CodeBook</h1>\n  <p>Start typing to see magic happen!</p>\n  <button id="btn">Click Me</button>\n</div>`,
    CSS: `body {\n  font-family: sans-serif;\n  display: flex;\n  justify-content: center;\n  text-align: center;\n}\n.container {\n  margin-top: 50px;\n}\nh1 {\n  color: #FF7A00;\n}`,
    JS: `document.getElementById('btn').onclick = () => {\n  alert('Magic!');\n};`
  });

  return (
    <div className="flex min-h-screen bg-[#F8F9FB] selection:bg-orange-100">
      <Sidebar activePage="Code Lab" /> 
      
      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex-1 p-12 max-w-[1600px] mx-auto w-full"
      >
        {/* Header Section */}
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-3 text-orange-500 font-black text-xs uppercase tracking-[0.3em]">
            <Terminal className="w-4 h-4" />
            <span>Interactive Playground</span>
          </div>
          <h1 className="text-4xl font-[1000] text-[#0F172A] tracking-tighter mb-2">Code Lab</h1>
          <p className="text-[#64748B] font-medium">Experiment with HTML, CSS, and JS in real-time.</p>
        </header>

        {/* IDE Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[70vh]">
          
          {/* Left: Editor Side */}
          <div className="bg-[#0F172A] rounded-[32px] overflow-hidden shadow-2xl flex flex-col border border-gray-800">
            {/* Editor Toolbar */}
            <div className="bg-[#1E293B] p-4 flex justify-between items-center border-b border-gray-800">
              <div className="flex bg-[#0F172A] p-1 rounded-2xl gap-1">
                {['HTML', 'CSS', 'JS'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-2 rounded-xl text-xs font-black tracking-widest transition-all ${
                      activeTab === tab ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                <button className="p-2.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all">
                  <RotateCcw className="w-5 h-5" />
                </button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-orange-500 text-white px-6 py-2.5 rounded-xl font-black text-xs tracking-widest flex items-center gap-2 shadow-lg shadow-orange-500/20"
                >
                  <Play className="w-4 h-4 fill-current" />
                  RUN
                </motion.button>
              </div>
            </div>

            {/* Editor Input Area */}
            <div className="flex-1 p-6 relative font-mono">
              <div className="absolute left-0 top-0 bottom-0 w-12 bg-[#1E293B]/30 flex flex-col items-center pt-6 text-gray-600 text-xs leading-[1.6rem] select-none">
                {Array.from({ length: 15 }).map((_, i) => <span key={i}>{i + 1}</span>)}
              </div>
              <textarea
                value={code[activeTab]}
                onChange={(e) => setCode({...code, [activeTab]: e.target.value})}
                className="w-full h-full bg-transparent border-none outline-none text-blue-300 resize-none pl-10 text-[15px] leading-relaxed caret-orange-500"
                spellCheck="false"
              />
            </div>
          </div>

          {/* Right: Preview Side */}
          <div className="bg-white rounded-[32px] overflow-hidden shadow-xl border border-gray-100 flex flex-col">
             {/* Preview Toolbar */}
             <div className="bg-gray-50/50 p-4 border-b border-gray-100 flex items-center justify-between px-6">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex items-center gap-2 text-gray-400 font-bold text-[11px] uppercase tracking-widest">
                    <Eye className="w-4 h-4" />
                    Live Preview
                </div>
                <div className="w-12" /> {/* Spacer */}
             </div>

             {/* Live Output */}
             <div className="flex-1 p-8 bg-white flex items-center justify-center relative">
                <div className="text-center">
                    <h1 className="text-[48px] font-black text-orange-500 mb-2 tracking-tighter">Hello CodeBook</h1>
                    <p className="text-gray-400 font-medium text-lg">Start typing to see magic happen!</p>
                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        className="mt-6 bg-blue-500 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-blue-500/20"
                    >
                        Click Me
                    </motion.button>
                </div>
                
                {/* Subtle Grid Background */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                     style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
             </div>
          </div>

        </div>
      </motion.main>
    </div>
  );
};

export default Codelab;