import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CloudUpload, Info, ChevronDown, Plus } from 'lucide-react';

import Sidebar from './Sidebar'; 
import Navbar from './Navbar';

const HomeworkPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* 1. Sidebar dyalk */}
      <Sidebar />

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* 2. Navbar dyalk */}
        <Navbar />

        {/* 3. Main Content Area */}
        <main className="flex-1 overflow-y-auto p-10 relative">
          
          {/* Header dial l-page asliya */}
          <div className={`transition-all duration-500 ${isModalOpen ? 'blur-md' : ''}`}>
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-[1000] text-[#002366] tracking-tighter">Homework Management</h1>
                <p className="text-slate-400 font-bold text-sm uppercase tracking-widest mt-1">Amity School System</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-[#002366] text-white px-8 py-4 rounded-[22px] font-black text-sm shadow-2xl shadow-blue-900/20 hover:scale-105 transition-all flex items-center gap-3"
              >
                <Plus size={20} /> Create New Assignment
              </button>
            </div>

            {/* Empty State or Table Placeholder */}
            <div className="w-full h-96 border-2 border-dashed border-slate-200 rounded-[40px] flex items-center justify-center">
               <p className="text-slate-300 font-bold italic text-lg">Select 'Create Homework' to start...</p>
            </div>
          </div>

          {/* --- OVER-PREMIUM MODAL (Based on Amity.pdf (7)_4.jpg) --- */}
          <AnimatePresence>
            {isModalOpen && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                {/* Backdrop Blur */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsModalOpen(false)}
                  className="absolute inset-0 bg-[#001433]/40 backdrop-blur-md"
                />

                {/* Modal Container */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 30 }}
                  className="relative w-full max-w-[720px] bg-white rounded-[48px] shadow-[0_40px_100px_-20px_rgba(0,35,102,0.2)] border border-white overflow-hidden"
                >
                  {/* Modal Header */}
                  <div className="px-12 pt-12 pb-8 flex justify-between items-start">
                    <div>
                      <h2 className="text-[28px] font-[1000] text-[#002366] tracking-tighter leading-none">Create New Homework</h2>
                      <p className="text-slate-400 font-bold text-sm mt-2">Fill in the details to assign work to your students.</p>
                    </div>
                    <button 
                      onClick={() => setIsModalOpen(false)}
                      className="p-3 bg-slate-50 text-slate-300 hover:text-red-500 rounded-2xl transition-all"
                    >
                      <X size={22} />
                    </button>
                  </div>

                  {/* Form Content - Scrollable */}
                  <div className="px-12 pb-10 space-y-8 max-h-[65vh] overflow-y-auto custom-scrollbar">
                    
                    {/* Input: Title */}
                    <div className="group">
                      <label className="block text-[11px] font-[1000] text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1">Homework Title</label>
                      <input 
                        type="text" 
                        placeholder="e.g., Quantum Mechanics Problem Set 1"
                        className="w-full px-7 py-5 bg-slate-50 border-2 border-transparent focus:border-[#002366] focus:bg-white rounded-[24px] outline-none transition-all text-[#002366] font-bold placeholder:text-slate-300 shadow-inner"
                      />
                    </div>

                    {/* Grid: Class & Deadline */}
                    <div className="grid grid-cols-2 gap-8">
                      <div>
                        <label className="block text-[11px] font-[1000] text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1">Select Class</label>
                        <div className="relative">
                          <select className="w-full appearance-none px-7 py-5 bg-slate-50 border-2 border-transparent focus:border-[#002366] focus:bg-white rounded-[24px] outline-none transition-all text-[#002366] font-bold cursor-pointer shadow-inner">
                            <option>Select a class...</option>
                            <option>Advanced Physics</option>
                            <option>Mathematics II</option>
                          </select>
                          <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={20} />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[11px] font-[1000] text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1">Deadline</label>
                        <input 
                          type="datetime-local"
                          className="w-full px-7 py-5 bg-slate-50 border-2 border-transparent focus:border-[#002366] focus:bg-white rounded-[24px] outline-none transition-all text-slate-400 font-bold shadow-inner"
                        />
                      </div>
                    </div>

                    {/* Textarea: Description */}
                    <div>
                      <label className="block text-[11px] font-[1000] text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1">Description & Instructions</label>
                      <textarea 
                        rows={4}
                        placeholder="Detail the requirements, references, and expected output..."
                        className="w-full px-7 py-5 bg-slate-50 border-2 border-transparent focus:border-[#002366] focus:bg-white rounded-[24px] outline-none transition-all text-[#002366] font-bold resize-none placeholder:text-slate-300 shadow-inner"
                      />
                    </div>

                    {/* Upload Area */}
                    <div>
                      <label className="block text-[11px] font-[1000] text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1">Attachments (Optional)</label>
                      <div className="border-2 border-dashed border-slate-100 rounded-[32px] p-10 flex flex-col items-center justify-center bg-slate-50/50 hover:bg-white hover:border-blue-300 transition-all cursor-pointer group">
                        <div className="w-16 h-16 bg-white rounded-[20px] shadow-sm border border-slate-50 flex items-center justify-center text-slate-400 mb-4 group-hover:scale-110 transition-transform">
                          <CloudUpload size={32} />
                        </div>
                        <p className="text-sm font-[1000] text-[#002366]">Click to upload or drag and drop</p>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">PDF, DOCX, ZIP up to 10MB</p>
                      </div>
                    </div>

                    {/* Alert */}
                    <div className="flex gap-4 p-6 bg-orange-50/60 border border-orange-100 rounded-[28px]">
                      <Info className="text-orange-500 shrink-0" size={22} />
                      <p className="text-xs font-bold text-orange-900/60 leading-relaxed">
                        Students will be notified immediately via the **Amity School App** upon publishing this assignment.
                      </p>
                    </div>
                  </div>

                  {/* Modal Footer */}
                  <div className="px-12 py-8 bg-slate-50/50 border-t border-slate-100 flex items-center justify-center gap-10">
                    <button className="text-[11px] font-[1000] text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-[0.2em]">
                      Save as Draft
                    </button>
                    <button className="px-12 py-4 bg-white border border-slate-200 text-slate-200 rounded-[22px] text-xs font-[1000] uppercase tracking-widest shadow-sm cursor-not-allowed">
                      Publish Assignment
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default HomeworkPage;