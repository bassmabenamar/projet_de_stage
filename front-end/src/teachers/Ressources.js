import React from 'react';
import { motion } from 'framer-motion';
import { 
  Folder, MoreVertical, FileText, Video, Link, 
  HardDrive, Plus, Upload, FolderPlus, Grid, 
  List, MoreHorizontal, FileIcon, Eye, Download, Trash2
} from 'lucide-react';

import Sidebar from './Sidebar';
import Navbar from './Navbar';

const ResourcesPage = () => {
  // Variants dial l-animations bach y-tl3o cards staggered
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar />

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Navbar />

        <main className="flex-1 overflow-y-auto p-10 custom-scrollbar">
          {/* --- HEADER SECTION --- */}
          <header className="flex justify-between items-end mb-10">
            <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
              <h1 className="text-3xl font-[1000] text-[#002366] tracking-tighter">Resources</h1>
              <p className="text-slate-400 font-bold text-sm mt-1">Manage course materials, lecture notes, and media.</p>
            </motion.div>
            
            <div className="flex gap-4">
              <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-black text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
                <FolderPlus size={18} /> New Folder
              </button>
              <button className="flex items-center gap-2 px-8 py-4 bg-[#002366] text-white rounded-[22px] font-black text-sm shadow-xl shadow-blue-900/20 hover:scale-105 transition-all">
                <Upload size={18} /> Upload Files
              </button>
            </div>
          </header>

          {/* --- TOP STATS CARDS --- */}
          <motion.div 
            variants={container} initial="hidden" animate="show"
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
          >
            <StatCard icon={<HardDrive size={22}/>} label="Storage Used" value="12.4 GB" sub="50GB Total" color="blue" />
            <StatCard icon={<FileText size={22}/>} label="PDF Documents" value="142" sub="Files" color="orange" />
            <StatCard icon={<Video size={22}/>} label="Video Content" value="28" sub="Videos" color="green" />
            <StatCard icon={<Link size={22}/>} label="Shared Links" value="15" sub="Active" color="purple" />
          </motion.div>

          {/* --- CLASS FOLDERS SECTION --- */}
          <section className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-[1000] text-[#002366]">Class Folders</h2>
              <button className="text-blue-600 text-xs font-black uppercase tracking-widest hover:underline transition-all">View All</button>
            </div>
            
            <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <FolderCard name="Advanced Physics (AP-101)" files="24" date="2 days ago" students={3} />
              <FolderCard name="Classical Literature (ENG-204)" files="18" date="1 week ago" students={2} />
              <FolderCard name="Modern History (HIST-302)" files="35" date="3 weeks ago" students={4} />
              <FolderCard name="Archive 2023" files="1.2 GB" date="Dec 15" isPrivate />
            </motion.div>
          </section>

          {/* --- RECENT UPLOADS TABLE --- */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-[1000] text-[#002366]">Recent Uploads</h2>
              <div className="flex bg-slate-100 p-1 rounded-xl">
                <button className="p-2 bg-white rounded-lg shadow-sm text-[#002366]"><List size={16}/></button>
                <button className="p-2 text-slate-400"><Grid size={16}/></button>
              </div>
            </div>

            <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50/50 border-b border-slate-100">
                  <tr>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">File Name</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Class</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Size</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Last Modified</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  <FileRow name="Lecture_Notes_Quantum_Mechanics.pdf" classTag="AP-101" size="4.2 MB" time="2 hours ago" color="blue" />
                  <FileRow name="Lab_Demonstration_Week_4.mp4" classTag="AP-101" size="128 MB" time="Yesterday" color="green" />
                  <FileRow name="Reading_List_Semester_2.docx" classTag="ENG-204" size="842 KB" time="Jan 12" color="orange" />
                </tbody>
              </table>
            </div>
          </section>
        </main>
        
        {/* Floating Action Button */}
        <motion.button 
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-10 right-10 w-16 h-16 bg-orange-600 text-white rounded-full flex items-center justify-center shadow-2xl shadow-orange-600/40 z-50"
        >
          <Plus size={32} />
        </motion.button>
      </div>
    </div>
  );
};

// --- SUB-COMPONENTS WITH PREMIUM ANIMATIONS ---

const StatCard = ({ icon, label, value, sub, color }) => (
  <motion.div 
    variants={{ hidden: { opacity: 0, scale: 0.9 }, show: { opacity: 1, scale: 1 } }}
    whileHover={{ y: -5, boxShadow: "0 20px 40px -10px rgba(0,0,0,0.05)" }}
    className="bg-white p-6 rounded-[32px] border border-slate-100 flex items-center gap-5 transition-all cursor-pointer group"
  >
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:rotate-[360deg] ${
      color === 'blue' ? 'bg-blue-50 text-blue-600' : 
      color === 'orange' ? 'bg-orange-50 text-orange-600' : 
      color === 'green' ? 'bg-emerald-50 text-emerald-600' : 'bg-purple-50 text-purple-600'
    }`}>
      {icon}
    </div>
    <div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
      <h3 className="text-xl font-black text-[#002366] mt-1">{value} <span className="text-slate-300 font-bold text-xs">/ {sub}</span></h3>
    </div>
  </motion.div>
);

const FolderCard = ({ name, files, date, isPrivate, students }) => (
  <motion.div 
    variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
    whileHover={{ y: -8 }}
    className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm relative group cursor-pointer"
  >
    <div className="flex justify-between items-start mb-10">
      <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-600/20 group-hover:scale-110 transition-transform duration-500">
        <Folder size={24} fill="white" />
      </div>
      <button className="text-slate-300 hover:text-slate-600"><MoreVertical size={20}/></button>
    </div>
    <h4 className="text-[15px] font-black text-[#002366] leading-tight mb-2 pr-4">{name}</h4>
    <div className="flex items-center justify-between mt-6">
       <p className="text-[11px] font-bold text-slate-400 tracking-tight">{files} files • {date}</p>
       <div className="flex -space-x-2">
          {[...Array(students)].map((_, i) => (
            <img key={i} src={`https://i.pravatar.cc/150?u=${i+name}`} className="w-6 h-6 rounded-lg border-2 border-white" alt="user" />
          ))}
          {isPrivate && <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest mt-1 italic">PRIVATE</div>}
       </div>
    </div>
  </motion.div>
);

const FileRow = ({ name, classTag, size, time, color }) => (
  <motion.tr 
    whileHover={{ backgroundColor: "#F8FAFC" }}
    className="group transition-colors cursor-pointer"
  >
    <td className="px-8 py-5">
      <div className="flex items-center gap-4">
        <div className={`p-2 rounded-xl bg-${color}-50 text-${color}-600`}>
          {name.endsWith('pdf') ? <FileText size={18}/> : <Video size={18}/>}
        </div>
        <div>
          <p className="text-sm font-black text-[#002366] group-hover:text-blue-600 transition-colors">{name}</p>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Added by you</p>
        </div>
      </div>
    </td>
    <td className="px-8 py-5 text-center">
      <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
        color === 'blue' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'
      }`}>
        {classTag}
      </span>
    </td>
    <td className="px-8 py-5 text-sm font-bold text-slate-600">{size}</td>
    <td className="px-8 py-5 text-sm font-bold text-slate-400">{time}</td>
    <td className="px-8 py-5 text-right">
      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
        <button className="p-2 hover:bg-white rounded-lg text-slate-400 hover:text-blue-600 shadow-sm transition-all"><Eye size={16}/></button>
        <button className="p-2 hover:bg-white rounded-lg text-slate-400 hover:text-emerald-600 shadow-sm transition-all"><Download size={16}/></button>
        <button className="p-2 hover:bg-white rounded-lg text-slate-400 hover:text-red-600 shadow-sm transition-all"><Trash2 size={16}/></button>
      </div>
    </td>
  </motion.tr>
);

export default ResourcesPage;