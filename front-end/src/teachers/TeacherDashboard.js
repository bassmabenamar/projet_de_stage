import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, BookOpen, Clock, FileText, Plus, 
  MoreVertical, Filter, Bell, Calendar, 
  MessageSquare, ChevronRight, CheckSquare
} from 'lucide-react';

import Sidebar from './Sidebar';
import Navbar from './Navbar';

const TeacherDashboard = () => {
  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.08 } 
    }
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
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-[1400px] mx-auto"
          >
            {/* 1. Welcome & Actions Section */}
            <motion.div variants={itemVariants} className="flex justify-between items-center mb-10">
              <div>
                <h1 className="text-[28px] font-black text-[#002366] mb-1">Welcome back, Sarah!</h1>
                <p className="text-slate-400 font-medium">You have 4 lessons today and 12 assignments to review.</p>
              </div>
              <div className="flex gap-4">
                <motion.button 
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-6 py-3 bg-[#002366] text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-900/20"
                >
                  <Plus size={18} /> Create Lesson
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-6 py-3 bg-[#B85C00] text-white rounded-xl font-bold text-sm shadow-lg shadow-orange-900/20"
                >
                  Post Announcement
                </motion.button>
              </div>
            </motion.div>

            {/* 2. Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              <StatCard icon={<BookOpen />} label="Total Classes" value="08" trend="+2 this week" color="blue" />
              <StatCard icon={<Users />} label="Students" value="142" trend="154 Total" color="orange" />
              <StatCard icon={<FileText />} label="Homework Pending" value="12" trend="Due Today" color="rose" />
              <StatCard icon={<Clock />} label="Today's Lessons" value="04" trend="Next: 10:30 AM" color="emerald" />
            </div>

            <div className="grid grid-cols-12 gap-8">
              {/* 3. Today's Schedule (Left Column) */}
              <motion.div variants={itemVariants} className="col-span-12 lg:col-span-8 space-y-8">
                <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm">
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-xl font-black text-[#002366]">Today's Schedule</h2>
                    <button className="text-xs font-black text-blue-600 uppercase tracking-widest hover:underline">View Full Timetable</button>
                  </div>
                  <div className="space-y-4">
                    <ScheduleItem time="09:00 AM" title="Advanced Chemistry - Grade 11A" location="Laboratory Block 4 • Lab 12" active />
                    <ScheduleItem time="10:30 AM" title="Organic Basics - Grade 10C" location="Main Building • Room 204" comingSoon />
                    <ScheduleItem time="01:15 PM" title="Faculty Sync Meeting" location="Conference Room A" />
                    <ScheduleItem time="02:30 PM" title="General Science - Grade 9B" location="Main Building • Room 102" />
                  </div>
                </div>

                {/* 4. Recent Class Activity Table */}
                <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm">
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-xl font-black text-[#002366]">Recent Class Activity</h2>
                    <button className="p-2 bg-slate-50 rounded-lg text-slate-400 hover:text-[#002366] transition-all">
                      <Filter size={18} />
                    </button>
                  </div>
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-[10px] font-black text-slate-300 uppercase tracking-widest border-b border-slate-50">
                        <th className="pb-4">Class Name</th>
                        <th className="pb-4">Activity Type</th>
                        <th className="pb-4">Status</th>
                        <th className="pb-4">Participation</th>
                        <th className="pb-4">Date</th>
                        <th className="pb-4"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <ActivityRow name="Chemistry 11A" id="C1" type="Lab Submission" status="NEEDS GRADING" date="Oct 24, 2023" progress={85} />
                      <ActivityRow name="Gen Science 9B" id="S2" type="Attendance Log" status="COMPLETED" date="Oct 24, 2023" progress={100} />
                      <ActivityRow name="Organic 10C" id="O1" type="Quiz: Carbon Bonds" status="IN PROGRESS" date="Oct 23, 2023" progress={40} />
                    </tbody>
                  </table>
                </div>
              </motion.div>

              {/* 5. Right Sidebar (Announcements & Tasks) */}
              <motion.div variants={itemVariants} className="col-span-12 lg:col-span-4 space-y-8">
                {/* Announcements Widget */}
                <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm">
                  <h2 className="text-lg font-black text-[#002366] mb-6">Announcements</h2>
                  <div className="space-y-6">
                    <AnnouncementItem category="ADMINISTRATION" text="Annual Sports Meet scheduled for next Friday." time="Posted 2 hours ago" />
                    <AnnouncementItem category="IT DEPARTMENT" text="Canvas portal maintenance this Sunday, 2 AM - 6 AM." time="Posted Yesterday" />
                  </div>
                </div>

                {/* Pending Tasks Widget */}
                <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm relative overflow-hidden">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-black text-[#002366]">Pending Tasks</h2>
                    <span className="bg-[#002366] text-white w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold">5</span>
                  </div>
                  <div className="space-y-4 mb-6">
                    <TaskItem label="Grade Unit 4 Lab Reports" />
                    <TaskItem label="Prepare Mock Exam for 11A" />
                    <TaskItem label="Upload Semester Plan" />
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.02, backgroundColor: '#f8fafc' }}
                    className="w-full py-3 border-2 border-dashed border-slate-100 rounded-xl text-[11px] font-black text-slate-400 uppercase tracking-widest transition-all"
                  >
                    + Add New Task
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

/* --- COMPONENTS --- */

const StatCard = ({ icon, label, value, trend, color }) => {
  const colors = {
    blue: "bg-blue-50 text-blue-600",
    orange: "bg-orange-50 text-orange-600",
    rose: "bg-rose-50 text-rose-600",
    emerald: "bg-emerald-50 text-emerald-600"
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white rounded-[24px] p-6 border border-slate-100 shadow-sm group cursor-pointer transition-all"
    >
      <div className="flex justify-between items-start mb-4">
        <motion.div 
          whileHover={{ rotateY: 180 }}
          className={`w-12 h-12 rounded-2xl flex items-center justify-center ${colors[color]} shadow-inner`}
        >
          {React.cloneElement(icon, { size: 22 })}
        </motion.div>
        <span className={`text-[9px] font-black px-2 py-1 rounded-md ${colors[color].replace('bg-', 'bg-opacity-50 bg-')}`}>
          {trend}
        </span>
      </div>
      <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">{label}</p>
      <h3 className="text-2xl font-black text-[#002366]">{value}</h3>
    </motion.div>
  );
};

const ScheduleItem = ({ time, title, location, active, comingSoon }) => (
  <motion.div 
    whileHover={{ x: 5 }}
    className={`p-5 rounded-2xl border flex items-center justify-between group transition-all ${active ? 'bg-blue-50/40 border-blue-100' : 'bg-white border-slate-50 hover:border-slate-200'}`}
  >
    <div className="flex items-center gap-6">
      <div className="text-center">
        <p className="text-sm font-black text-[#002366] leading-none">{time.split(' ')[0]}</p>
        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">{time.split(' ')[1]}</p>
      </div>
      <div className="w-[2px] h-10 bg-slate-100 group-hover:bg-blue-200 transition-colors" />
      <div>
        <h4 className="text-sm font-black text-[#002366] mb-1">{title}</h4>
        <p className="text-xs text-slate-400 font-medium">{location}</p>
      </div>
    </div>
    {comingSoon && (
      <span className="text-[8px] font-black bg-orange-50 text-orange-500 px-3 py-1 rounded-full uppercase tracking-widest">Coming Up</span>
    )}
    {active && (
      <div className="flex -space-x-2">
        {[1, 2, 3].map(i => (
          <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-200" />
        ))}
        <div className="w-6 h-6 rounded-full border-2 border-white bg-[#002366] flex items-center justify-center text-[8px] font-bold text-white">+24</div>
      </div>
    )}
  </motion.div>
);

const ActivityRow = ({ name, id, type, status, date, progress }) => {
  const statusStyles = {
    "NEEDS GRADING": "bg-orange-50 text-orange-500",
    "COMPLETED": "bg-emerald-50 text-emerald-500",
    "IN PROGRESS": "bg-blue-50 text-blue-500"
  };

  return (
    <tr className="border-b border-slate-50 group hover:bg-slate-50/50 transition-colors">
      <td className="py-5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-[10px] font-black text-blue-600">{id}</div>
          <span className="text-xs font-black text-[#002366]">{name}</span>
        </div>
      </td>
      <td className="py-5 text-xs text-slate-500 font-medium">{type}</td>
      <td className="py-5">
        <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${statusStyles[status]}`}>
          {status}
        </span>
      </td>
      <td className="py-5">
        <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }} 
            whileInView={{ width: `${progress}%` }} 
            className={`h-full rounded-full ${status === 'COMPLETED' ? 'bg-emerald-500' : 'bg-blue-900'}`}
          />
        </div>
      </td>
      <td className="py-5 text-[10px] text-slate-400 font-bold">{date}</td>
      <td className="py-5 text-right"><MoreVertical size={16} className="text-slate-300 cursor-pointer" /></td>
    </tr>
  );
};

const AnnouncementItem = ({ category, text, time }) => (
  <div className="group cursor-pointer">
    <p className={`text-[9px] font-black uppercase tracking-[0.2em] mb-2 ${category.includes('ADMIN') ? 'text-orange-500' : 'text-blue-600'}`}>{category}</p>
    <p className="text-xs font-bold text-[#002366] leading-relaxed mb-1 group-hover:text-blue-600 transition-colors">{text}</p>
    <p className="text-[10px] text-slate-300 font-medium">{time}</p>
  </div>
);

const TaskItem = ({ label }) => (
  <div className="flex items-center gap-3 group cursor-pointer">
    <div className="w-5 h-5 rounded-md border-2 border-slate-100 flex items-center justify-center group-hover:border-blue-200 transition-all">
      <CheckSquare size={12} className="text-white group-hover:text-slate-100" />
    </div>
    <span className="text-xs font-bold text-slate-600 group-hover:text-[#002366] transition-colors">{label}</span>
  </div>
);

export default TeacherDashboard;