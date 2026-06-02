import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CloudUpload, Download, FileSpreadsheet, Trash2, 
  AlertTriangle, CheckCircle2, AlertCircle, Pencil, 
  ChevronRight, Info, ShieldCheck, History, X 
} from 'lucide-react';

// Import dial l-components dyalk
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const ImportGrades = () => {
  const [isDragging, setIsDragging] = useState(false);

  const previewData = [
    { id: '#AMT-2204', name: 'Alice Thompson', score: '88/100', status: 'SUCCESS', type: 'success' },
    { id: '#AMT-2219', name: 'Benjamin Chen', score: '102/100', status: 'OUT OF RANGE', type: 'warning' },
    { id: '#AMT-2251', name: 'Chloe Rodriguez', score: '94/100', status: 'SUCCESS', type: 'success' },
    { id: '#AMT-2302', name: 'David Miller', score: '--', status: 'MISSING DATA', type: 'error' },
    { id: '#AMT-2311', name: 'Eva Green', score: '76/100', status: 'SUCCESS', type: 'success' },
  ];

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar />

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Navbar />

        <main className="flex-1 overflow-y-auto p-10 custom-scrollbar">
          {/* --- HEADER --- */}
          <header className="flex justify-between items-start mb-10">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-3xl font-[1000] text-[#002366] tracking-tighter">Import Grades</h1>
              <p className="text-slate-400 font-bold text-sm mt-1">Upload and validate student performance data for Semester 2.</p>
            </motion.div>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-slate-100 rounded-2xl text-xs font-black text-[#002366] hover:bg-slate-50 transition-all shadow-sm"
            >
              <Download size={18} /> Download Template
            </motion.button>
          </header>

          <div className="grid grid-cols-12 gap-8">
            
            {/* --- LEFT COLUMN: UPLOAD & SETTINGS --- */}
            <div className="col-span-4 space-y-8">
              
              {/* Upload Card */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm"
              >
                <h3 className="text-xs font-[1000] text-slate-400 uppercase tracking-widest mb-6">Upload Source</h3>
                
                <div 
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  className={`border-2 border-dashed rounded-[32px] p-10 flex flex-col items-center justify-center transition-all duration-300 ${
                    isDragging ? 'border-blue-500 bg-blue-50/50 scale-[0.98]' : 'border-slate-100 bg-slate-50/30'
                  }`}
                >
                  <motion.div 
                    animate={isDragging ? { y: [-5, 5, -5] } : {}}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-lg mb-4"
                  >
                    <CloudUpload size={28} />
                  </motion.div>
                  <p className="text-sm font-black text-[#002366]">Click or drag files here</p>
                  <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-tighter">Supports .xlsx, .csv, .pdf</p>
                </div>

                {/* Selected File Mock */}
                <div className="mt-6 p-4 bg-blue-50/50 rounded-2xl border border-blue-100 flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#002366] text-white rounded-xl flex items-center justify-center">
                      <FileSpreadsheet size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-black text-[#002366]">Final_Exams_S2.xlsx</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">2.4 MB • 42 Students</p>
                    </div>
                  </div>
                  <button className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
              </motion.div>

              {/* Settings Card */}
              <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
                <h3 className="text-xs font-[1000] text-slate-400 uppercase tracking-widest mb-6">Import Settings</h3>
                <div className="space-y-6">
                  <SelectBox label="Target Class" value="Grade 10 - Mathematics (Section B)" />
                  <SelectBox label="Assessment Phase" value="Semester 2 - Final Exams" />
                </div>
              </div>
            </div>

            {/* --- RIGHT COLUMN: DATA PREVIEW --- */}
            <div className="col-span-8">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden flex flex-col h-full"
              >
                <div className="px-8 py-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
                  <h3 className="text-sm font-[1000] text-[#002366] uppercase tracking-wider">Data Validation Preview</h3>
                  <div className="flex gap-4">
                    <span className="flex items-center gap-1.5 text-[10px] font-black text-emerald-500 uppercase tracking-widest">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> 38 Valid
                    </span>
                    <span className="flex items-center gap-1.5 text-[10px] font-black text-orange-500 uppercase tracking-widest">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500" /> 4 Warnings
                    </span>
                  </div>
                </div>

                <div className="flex-1">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-slate-50">
                        <th className="px-8 py-5 text-[10px] font-[1000] text-slate-400 uppercase tracking-widest">Student ID</th>
                        <th className="px-8 py-5 text-[10px] font-[1000] text-slate-400 uppercase tracking-widest">Name</th>
                        <th className="px-8 py-5 text-[10px] font-[1000] text-slate-400 uppercase tracking-widest">Score</th>
                        <th className="px-8 py-5 text-[10px] font-[1000] text-slate-400 uppercase tracking-widest">Status</th>
                        <th className="px-8 py-5 text-[10px] font-[1000] text-slate-400 uppercase tracking-widest text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {previewData.map((row, i) => (
                        <motion.tr 
                          key={i} 
                          whileHover={{ backgroundColor: '#F8FAFC' }}
                          className="group transition-colors"
                        >
                          <td className="px-8 py-5 font-black text-[#002366] text-sm">{row.id}</td>
                          <td className="px-8 py-5 font-bold text-slate-600 text-sm">{row.name}</td>
                          <td className="px-8 py-5 font-black text-[#002366] text-sm">{row.score}</td>
                          <td className="px-8 py-5">
                            <span className={`text-[9px] font-[1000] tracking-widest uppercase px-3 py-1 rounded-lg ${
                              row.type === 'success' ? 'bg-emerald-50 text-emerald-600' :
                              row.type === 'warning' ? 'bg-orange-50 text-orange-600' : 'bg-red-50 text-red-600'
                            }`}>
                              {row.status}
                            </span>
                          </td>
                          <td className="px-8 py-5 text-right">
                             <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                                {row.type !== 'success' ? (
                                  <AlertTriangle size={16} className="text-orange-400" />
                                ) : (
                                  <Pencil size={16} className="text-slate-300 hover:text-blue-600 cursor-pointer" />
                                )}
                             </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="p-8 border-t border-slate-50 bg-slate-50/30 flex justify-between items-center">
                  <p className="text-xs font-bold text-slate-400">Showing 5 of 42 entries. Resolve <span className="text-orange-500 font-black">4 warnings</span> to proceed.</p>
                  <div className="flex gap-4">
                    <button className="px-8 py-4 bg-slate-100 text-slate-500 rounded-2xl font-black text-sm hover:bg-slate-200 transition-all">Cancel</button>
                    <button className="px-10 py-4 bg-[#002366] text-white rounded-2xl font-black text-sm shadow-xl shadow-blue-900/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 group">
                      Confirm Import <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* --- FOOTER INFO CARDS --- */}
          <div className="grid grid-cols-3 gap-8 mt-10">
            <FooterCard icon={<Info size={18}/>} title="Formatting Rule" desc="Ensure Student IDs match the system database precisely to avoid duplicate records." />
            <FooterCard icon={<ShieldCheck size={18}/>} title="Data Security" desc="All uploaded data is encrypted. Grades will not be published until you manually release them." />
            <FooterCard icon={<History size={18}/>} title="Recent Imports" desc="Mid-term results imported 3 days ago." link="View History" />
          </div>
        </main>
      </div>
    </div>
  );
};

// --- HELPER COMPONENTS ---

const SelectBox = ({ label, value }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</label>
    <div className="relative group cursor-pointer">
      <div className="w-full bg-slate-50 px-6 py-4 rounded-2xl font-bold text-sm text-[#002366] border-2 border-transparent group-hover:border-slate-200 transition-all flex justify-between items-center">
        {value}
        <ChevronRight size={16} className="rotate-90 text-slate-300" />
      </div>
    </div>
  </div>
);

const FooterCard = ({ icon, title, desc, link }) => (
  <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex gap-5 group cursor-default">
    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-[#002366] group-hover:text-white group-hover:rotate-[360deg] transition-all duration-700">
      {icon}
    </div>
    <div>
      <h4 className="text-[13px] font-[1000] text-[#002366] mb-1">{title}</h4>
      <p className="text-xs font-bold text-slate-400 leading-relaxed">{desc}</p>
      {link && <button className="text-blue-600 text-[10px] font-black uppercase tracking-widest mt-3 hover:underline">{link}</button>}
    </div>
  </div>
);

export default ImportGrades;