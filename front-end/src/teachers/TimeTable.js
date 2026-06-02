import React from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, Calendar, Clock, MapPin, Users, 
  ChevronLeft, ChevronRight, FileText, 
  CheckCircle2, Printer, ExternalLink, RefreshCw 
} from 'lucide-react';

import Sidebar from './Sidebar';
import Navbar from './Navbar';

const TimeTable = () => {
  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans text-[#1E293B]">
      <Sidebar />

      <main className="flex-1 flex flex-col relative overflow-hidden">
        <Navbar />

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {/* --- TOP BAR: Stats & Controls --- */}
          <div className="flex flex-col xl:flex-row gap-6 mb-8 items-stretch">
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="flex-1 bg-white rounded-[32px] p-8 shadow-sm border border-slate-100 flex items-center justify-between"
            >
              <div className="flex gap-12">
                <StatItem label="Week of" value="October 23 - 27" />
                <StatItem label="Teaching Hours" value="24 / 40" />
                <StatItem label="Current Room" value="Lab 402" />
              </div>
              <div className="flex items-center gap-3 bg-slate-50 p-2 rounded-2xl">
                <button className="p-2 hover:bg-white rounded-xl transition-all shadow-sm"><ChevronLeft size={18}/></button>
                <span className="px-4 font-black text-xs uppercase tracking-widest text-[#002366]">Today</span>
                <button className="p-2 hover:bg-white rounded-xl transition-all shadow-sm"><ChevronRight size={18}/></button>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="w-full xl:w-72 bg-[#002366] rounded-[32px] p-6 text-white relative overflow-hidden shadow-xl shadow-blue-900/20"
            >
              <div className="relative z-10">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-1">Next Lesson in</p>
                <h2 className="text-4xl font-black mb-4 tracking-tighter">14m</h2>
                <div className="flex items-center gap-2 opacity-80 text-xs font-bold">
                  <MapPin size={14} /> B-Block, Room 102
                </div>
              </div>
              <Clock className="absolute -bottom-4 -right-4 w-32 h-32 opacity-10 rotate-12" />
            </motion.div>
          </div>

          {/* --- MAIN TIMETABLE GRID --- */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden mb-8"
          >
            {/* Header: Days */}
            <div className="grid grid-cols-6 border-b border-slate-50 bg-slate-50/30">
              <div className="p-6 border-r border-slate-50"></div>
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, i) => (
                <div key={day} className="p-6 text-center border-r border-slate-50 last:border-0">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{day}</p>
                  <span className={`text-xl font-black ${i === 1 ? 'text-[#002366]' : 'text-slate-400'}`}>{23 + i}</span>
                  {i === 1 && <div className="w-8 h-1 bg-[#002366] mx-auto mt-2 rounded-full" />}
                </div>
              ))}
            </div>

            {/* Grid Body */}
            <div className="relative">
              {/* Time Slots & Rows */}
              {['08:00', '09:30', '11:00', '12:30', '14:00'].map((time, idx) => (
                <div key={time} className="grid grid-cols-6 border-b border-slate-50 last:border-0 group">
                  <div className="p-8 border-r border-slate-50 flex items-start justify-center">
                    <span className="text-xs font-black text-slate-300 group-hover:text-[#002366] transition-colors">{time}</span>
                  </div>
                  
                  {/* Grid Cells (Dynamic Mapping) */}
                  <div className="p-3 border-r border-slate-50 relative min-h-[140px]">
                    {idx === 0 && <LectureCard title="Advanced Physics" code="PHY-101" room="302" type="blue" />}
                    {idx === 2 && <LectureCard title="Calculus III" code="MAT-204" room="405" type="orange" />}
                  </div>
                  
                  <div className="p-3 border-r border-slate-50 relative bg-slate-50/10">
                    {idx === 1 && <LectureCard title="Organic Chemistry Lab" code="CHE-402" room="402" type="active" students="28" />}
                    {idx === 4 && <LectureCard title="Faculty Seminar" code="GEN-100" room="Auditorium" type="purple" />}
                  </div>

                  <div className="p-3 border-r border-slate-50 relative">
                    {idx === 0 && <LectureCard title="Calculus III" code="MAT-204" room="405" type="orange" />}
                    {idx === 1 && <LectureCard title="Advanced Physics" code="PHY-101" room="302" type="blue" />}
                    {idx === 4 && <LectureCard title="Chemistry Lab" code="CHE-402" room="402" type="blue" />}
                  </div>

                  <div className="p-3 border-r border-slate-50 relative">
                    {idx === 1 && <LectureCard title="Office Hours" code="FREE" room="B-12" type="green" />}
                    {idx === 2 && <LectureCard title="Advanced Physics" code="PHY-101" room="302" type="blue" />}
                  </div>

                  <div className="p-3 relative">
                    {idx === 0 && <LectureCard title="Staff Briefing" code="MEET" room="Main Hall" type="dark" />}
                    {idx === 2 && <LectureCard title="Calculus III" code="MAT-204" room="405" type="orange" />}
                    {idx === 4 && <LectureCard title="Mentorship" code="FREE" room="B-12" type="green" />}
                  </div>
                </div>
              ))}
              
              {/* Lunch Break Overlay */}
              <div className="absolute top-[42%] w-full flex items-center justify-center pointer-events-none">
                <div className="bg-white/80 backdrop-blur-md border border-slate-100 px-8 py-2 rounded-full shadow-sm flex items-center gap-3">
                  <div className="w-1 h-1 bg-slate-300 rounded-full" />
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Lunch Break</span>
                  <div className="w-1 h-1 bg-slate-300 rounded-full" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* --- BOTTOM SECTION: Materials & Checks --- */}
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-5 bg-white rounded-[32px] p-8 shadow-sm border border-slate-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-black text-[#002366]">Class Materials</h3>
                <button className="text-[10px] font-black text-blue-600 uppercase">View Library</button>
              </div>
              <div className="space-y-4">
                <MaterialItem title="Thermodynamics_v2.pdf" subtitle="Shared with Advanced Physics" type="pdf" />
                <MaterialItem title="Organic_Compounds_Lab.pptx" subtitle="Upcoming for Lab 402" type="ppt" />
              </div>
            </div>

            <div className="col-span-12 lg:col-span-7 bg-white rounded-[32px] p-8 shadow-sm border border-slate-100 relative overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-black text-[#002366]">Weekly Conflict Check</h3>
                <span className="bg-emerald-50 text-emerald-600 text-[9px] font-black px-3 py-1 rounded-full uppercase">All Clear</span>
              </div>
              <div className="flex gap-8 items-center">
                <div className="flex-1">
                  <p className="text-slate-500 text-sm font-medium leading-relaxed mb-6">
                    You have 100% room availability and no overlapping lecture blocks for the current semester schedule.
                  </p>
                  <div className="flex gap-4">
                    <button className="text-xs font-black text-blue-600 flex items-center gap-2 hover:underline">
                      Request Change <ChevronRight size={14} />
                    </button>
                    <button className="text-xs font-black text-slate-400 flex items-center gap-2 hover:text-[#002366] transition-colors">
                      Sync Google Calendar <ExternalLink size={14} />
                    </button>
                  </div>
                </div>
                <div className="w-48 h-32 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center p-4">
                  <CheckCircle2 className="text-emerald-500 mb-2" size={24} />
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest text-center">Verified 2h ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Action Button */}
        <motion.button 
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          className="absolute bottom-10 right-10 w-16 h-16 bg-orange-500 text-white rounded-full shadow-2xl shadow-orange-500/40 flex items-center justify-center z-50"
        >
          <Plus size={32} />
        </motion.button>
      </main>
    </div>
  );
};

/* --- SUB-COMPONENTS --- */

const StatItem = ({ label, value }) => (
  <div>
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
    <p className="text-[15px] font-black text-[#002366]">{value}</p>
  </div>
);

const LectureCard = ({ title, code, room, type, students }) => {
  const styles = {
    blue: "bg-blue-50/80 text-blue-700 border-blue-100 hover:bg-blue-100",
    orange: "bg-orange-50/80 text-orange-700 border-orange-100 hover:bg-orange-100",
    green: "bg-emerald-50/80 text-emerald-700 border-emerald-100 hover:bg-emerald-100",
    purple: "bg-purple-50/80 text-purple-700 border-purple-100 hover:bg-purple-100",
    dark: "bg-slate-800 text-white border-slate-700 hover:bg-slate-900",
    active: "bg-white border-orange-500 shadow-xl shadow-orange-500/10 scale-[1.02] ring-2 ring-orange-500/20"
  };

  return (
    <motion.div 
      whileHover={{ y: -5, scale: type === 'active' ? 1.05 : 1.02 }}
      className={`p-4 rounded-2xl border h-full transition-all cursor-pointer relative overflow-hidden ${styles[type]}`}
    >
      {type === 'active' && (
        <div className="absolute top-0 left-0 bg-orange-500 text-white text-[8px] font-black px-2 py-0.5 rounded-br-lg uppercase">Current</div>
      )}
      <div className="flex justify-between items-start mb-2">
        <span className={`text-[10px] font-black uppercase tracking-widest ${type === 'dark' ? 'text-white/60' : 'text-slate-400'}`}>{code}</span>
        {type === 'active' && <RefreshCw size={12} className="text-orange-500 animate-spin-slow" />}
      </div>
      <h4 className="text-[13px] font-black leading-tight mb-3">{title}</h4>
      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center gap-1.5 opacity-70 text-[10px] font-bold">
          <MapPin size={10} /> Room {room}
        </div>
        {students && (
          <div className="flex items-center gap-1.5 opacity-70 text-[10px] font-bold">
            <Users size={10} /> {students}
          </div>
        )}
      </div>
    </motion.div>
  );
};

const MaterialItem = ({ title, subtitle, type }) => (
  <motion.div 
    whileHover={{ x: 10, backgroundColor: '#F8FAFC' }}
    className="flex items-center gap-4 p-4 rounded-2xl border border-transparent hover:border-slate-100 transition-all cursor-pointer"
  >
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${type === 'pdf' ? 'bg-red-50 text-red-500' : 'bg-orange-50 text-orange-500'}`}>
      <FileText size={20} />
    </div>
    <div className="flex-1">
      <h5 className="text-sm font-black text-[#002366]">{title}</h5>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{subtitle}</p>
    </div>
    <ChevronRight size={16} className="text-slate-300" />
  </motion.div>
);

export default TimeTable;