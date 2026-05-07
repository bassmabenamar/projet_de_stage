import React from 'react';
import { motion } from 'framer-motion';
import { 
  Printer, Download, Play, Clock, 
  Users, MapPin, ChevronLeft, ChevronRight 
} from 'lucide-react';

import Navbar from './Navbar';

const Timetable = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { type: "spring", stiffness: 120, damping: 20 } 
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans text-[#1E293B]">
      <main className="flex-1 flex flex-col min-w-0">
        <Navbar />

        <div className="flex-1 overflow-y-auto p-4 md:p-10">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-[1600px] mx-auto"
          >
            {/* Header section */}
            <motion.div variants={cardVariants} className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6">
              <div>
                <h1 className="text-3xl md:text-[40px] font-black text-[#002366] leading-none mb-3">Weekly Schedule</h1>
                <p className="text-slate-400 font-bold text-xs md:text-sm uppercase tracking-widest">Semester 2 • Week 14 • Spring 2024</p>
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                <motion.button 
                  whileHover={{ scale: 1.05, backgroundColor: "#FFF7ED", color: "#EA580C", borderColor: "#FED7AA" }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-slate-500 shadow-sm transition-all uppercase"
                >
                  <Printer className="w-4 h-4" /> Print
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05, backgroundColor: "#1E3A8A" }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-3 bg-[#002366] text-white rounded-xl text-[10px] font-black shadow-lg transition-all uppercase tracking-widest"
                >
                  <Download className="w-4 h-4" /> Export PDF
                </motion.button>
              </div>
            </motion.div>

            {/* Timetable Body - Responsive Wrap */}
            <motion.div variants={cardVariants} className="bg-white rounded-[30px] md:rounded-[50px] p-6 md:p-12 border border-slate-50 shadow-2xl shadow-slate-200/40 mb-10 overflow-x-auto">
              <div className="min-w-[800px]"> {/* Keeps layout stable on mobile scroll */}
                {/* Days Header */}
                <div className="grid grid-cols-6 border-b border-slate-50 pb-8 mb-8">
                  <div className="flex items-center justify-center text-slate-200"><Clock className="w-6 h-6"/></div>
                  {['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'].map((day, idx) => (
                    <div key={idx} className="text-center">
                      <p className="text-[9px] font-black text-slate-300 tracking-[0.2em] mb-2">{day}</p>
                      <p className="text-sm font-black text-[#002366]">MAY {13 + idx}</p>
                    </div>
                  ))}
                </div>

                {/* Grid with Time Slots */}
                <div className="relative grid grid-cols-6 gap-8 min-h-[900px]">
                  {/* Vertical Time Labels */}
                  <div className="space-y-[100px] pt-2 text-center text-[11px] font-black text-slate-300">
                    {['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'].map(time => <div key={time}>{time}</div>)}
                  </div>

                  {/* Columns */}
                  <div className="relative">
                    <ScheduleBlock title="Advanced Physics" teacher="Dr. Michael Chen" room="Lab 402" color="border-l-[#002366] bg-blue-50/40 text-[#002366]" duration="h-[240px]" />
                    <ScheduleBlock title="Calculus BC" teacher="Prof. Sarah Miller" room="Room 12-B" color="border-l-orange-400 bg-orange-50/40 text-orange-700" duration="h-[120px]" top="top-[260px]" />
                  </div>

                  <div className="relative">
                    <ScheduleBlock title="Literature" teacher="Ms. Jane Doe" room="Room 201" color="border-l-purple-400 bg-purple-50/40 text-purple-700" duration="h-[120px]" />
                    <ScheduleBlock title="Chemistry" teacher="Dr. Robert Fox" room="Science Lab 2" color="border-l-emerald-400 bg-emerald-50/40 text-emerald-700" duration="h-[240px]" top="top-[550px]" />
                  </div>

                  <div className="relative">
                    <ScheduleBlock title="Computer Science" teacher="Mr. Alan Turing" room="IT Wing B" color="border-l-slate-400 bg-slate-50/60 text-slate-600" duration="h-[240px]" />
                    <ScheduleBlock title="Advanced Physics" teacher="Dr. Michael Chen" room="Lecture Hall 1" color="border-l-[#002366] bg-blue-50/40 text-[#002366]" duration="h-[120px]" top="top-[680px]" />
                  </div>

                  <div className="relative">
                    <ScheduleBlock title="Calculus BC" teacher="Prof. Sarah Miller" room="Room 12-B" color="border-l-orange-400 bg-orange-50/40 text-orange-700" duration="h-[120px]" top="top-[130px]" />
                    <ScheduleBlock title="World History" teacher="Dr. Emma Watson" room="Room 105" color="border-l-indigo-400 bg-indigo-50/40 text-indigo-700" duration="h-[240px]" top="top-[450px]" />
                  </div>

                  <div className="relative">
                    <ScheduleBlock title="Art History" teacher="Ms. Clara Oswald" room="Studio 1" color="border-l-rose-400 bg-rose-50/40 text-rose-700" duration="h-[120px]" />
                    <ScheduleBlock title="Physical Education" teacher="Coach Carter" room="Main Gymnasium" color="border-l-cyan-400 bg-cyan-50/40 text-cyan-700" duration="h-[240px]" top="top-[750px]" />
                  </div>

                  {/* Lunch Break line */}
                  <div className="absolute top-[410px] left-[16%] right-0 flex items-center gap-6 px-10 pointer-events-none">
                    <div className="h-[1px] flex-1 bg-slate-100" />
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.5em]">Lunch Break</span>
                    <div className="h-[1px] flex-1 bg-slate-100" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Bottom Insight Row */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-10">
              <motion.div variants={cardVariants} whileHover={{ scale: 1.02 }} className="md:col-span-12 lg:col-span-3 bg-[#002366] rounded-[30px] md:rounded-[40px] p-8 text-white shadow-xl flex items-center justify-between group cursor-pointer">
                <div>
                  <p className="text-[9px] font-black opacity-40 uppercase tracking-widest mb-4">Now Playing</p>
                  <h4 className="text-xl font-black mb-1 group-hover:text-orange-400 transition-colors">Calculus BC</h4>
                  <p className="text-xs font-bold opacity-60">Room 12-B • 15m left</p>
                </div>
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-white/5 group-hover:bg-orange-500 transition-all">
                  <Play className="w-5 h-5" fill="currentColor" />
                </div>
              </motion.div>

              <motion.div variants={cardVariants} className="md:col-span-12 lg:col-span-4 bg-white rounded-[30px] md:rounded-[40px] p-8 border border-slate-100 flex items-center justify-between group shadow-sm">
                <div>
                  <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-4">Weekly Load</p>
                  <h4 className="text-4xl font-black text-[#002366]">32 <span className="text-[10px] text-slate-300 ml-1">HRS/WK</span></h4>
                </div>
                <div className="text-right flex flex-col items-end">
                  <span className="text-[9px] font-black text-emerald-500 uppercase bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100">Optimal</span>
                  <div className="mt-5 w-24 h-2 bg-slate-50 rounded-full overflow-hidden">
                    <motion.div initial={{width:0}} animate={{width: '72%'}} className="h-full bg-[#002366] group-hover:bg-orange-500 transition-all" />
                  </div>
                </div>
              </motion.div>

              <motion.div variants={cardVariants} className="md:col-span-12 lg:col-span-5 bg-white rounded-[30px] md:rounded-[40px] p-8 border border-slate-100 flex items-center gap-6 group shadow-sm">
                <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500 group-hover:bg-[#002366] group-hover:text-white transition-all">
                  <Users className="w-7 h-7" />
                </div>
                <div className="flex-1">
                  <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">Consultation</p>
                  <h4 className="text-lg font-black text-[#002366]">2 Appointments Pending</h4>
                  <button className="text-[10px] font-black text-orange-500 uppercase mt-1 hover:translate-x-1 transition-transform">View Schedule →</button>
                </div>
              </motion.div>
            </div>

            {/* Legend */}
            <motion.div variants={cardVariants} className="bg-white/40 backdrop-blur-sm border border-slate-100 rounded-[24px] p-6 flex flex-wrap gap-6 justify-center">
                <LegendItem color="bg-[#002366]" label="Science" />
                <LegendItem color="bg-orange-400" label="Math" />
                <LegendItem color="bg-purple-400" label="Languages" />
                <LegendItem color="bg-indigo-400" label="Social" />
                <LegendItem color="bg-rose-400" label="Arts" />
                <LegendItem color="bg-cyan-400" label="Gym" />
            </motion.div>

          </motion.div>
        </div>
      </main>
    </div>
  );
};

const ScheduleBlock = ({ title, teacher, room, color, duration, top = "top-0" }) => (
  <motion.div 
    whileHover={{ scale: 1.03, zIndex: 10, backgroundColor: "#FFF7ED" }}
    className={`absolute left-0 right-0 ${top} ${duration} ${color} border-l-[5px] rounded-[18px] p-4 shadow-sm cursor-pointer transition-all flex flex-col group border-transparent overflow-hidden`}
  >
    <h5 className="text-[13px] font-black mb-auto leading-tight line-clamp-2 group-hover:text-orange-600 transition-colors">
      {title}
    </h5>
    <div className="space-y-1.5 pt-2">
      <div className="flex items-center gap-2 text-[9px] font-bold opacity-60">
        <Users className="w-3 h-3" /> {teacher}
      </div>
      <div className="flex items-center gap-2 text-[9px] font-bold opacity-60">
        <MapPin className="w-3 h-3" /> {room}
      </div>
    </div>
  </motion.div>
);

const LegendItem = ({ color, label }) => (
  <div className="flex items-center gap-2 group cursor-default">
    <div className={`w-2.5 h-2.5 rounded-full ${color}`} />
    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{label}</span>
  </div>
);

export default Timetable;