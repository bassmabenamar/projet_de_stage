import React from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, Star, BookOpen, UserCheck, Calendar, 
  MessageSquare, Bell, LogOut, Settings, User, GraduationCap
} from 'lucide-react';

/**
 * SidebarLink: Component sghir l-koll rabet (link) f l-menu
 */
const SidebarLink = ({ icon, label, active, color = "text-slate-500", onClick }) => (
  <motion.div 
    whileHover={{ x: 5 }}
    onClick={onClick}
    className={`flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-all group ${
      active 
        ? 'bg-[#F1F5F9] text-[#002366] shadow-sm' 
        : color + ' hover:bg-slate-50 hover:text-[#002366]'
    }`}
  >
    <span className={`${active ? 'text-[#002366]' : 'text-slate-400 group-hover:text-[#002366] transition-colors'}`}>
      {icon}
    </span>
    <span className={`text-[13px] ${active ? 'font-black' : 'font-bold'} tracking-tight`}>
      {label}
    </span>
    {active && (
      <motion.div 
        layoutId="activeIndicator"
        className="ml-auto w-1 h-5 bg-[#002366] rounded-full" 
      />
    )}
  </motion.div>
);

const Sidebar = ({ activePage = "Dashboard" }) => {
  return (
    <aside className="w-[260px] bg-white border-r border-slate-100 flex flex-col sticky top-0 h-screen z-40">
      
      {/* Logo Section */}
      <div className="p-8 mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-[#002366] p-2.5 rounded-xl text-white shadow-lg shadow-blue-900/20">
            <GraduationCap size={22} strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-[16px] font-black text-[#002366] leading-none uppercase tracking-tighter">
              EduElite
            </h1>
            <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.1em] mt-1">
              Management
            </p>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
        <p className="px-4 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-4 mt-2">Main Menu</p>
        
        <SidebarLink 
          icon={<LayoutDashboard size={18}/>} 
          label="Dashboard" 
          active={activePage === "Dashboard"} 
        />
        <SidebarLink 
          icon={<Star size={18}/>} 
          label="Grades" 
          active={activePage === "Grades"} 
        />
        <SidebarLink 
          icon={<BookOpen size={18}/>} 
          label="Homework" 
          active={activePage === "Homework"} 
        />
        <SidebarLink 
          icon={<UserCheck size={18}/>} 
          label="Attendance" 
          active={activePage === "Attendance"} 
        />
        <SidebarLink 
          icon={<Calendar size={18}/>} 
          label="Timetable" 
          active={activePage === "Timetable"} 
        />
        <SidebarLink 
          icon={<Star size={18}/>} 
          label="Activities" 
          active={activePage === "Activities"} 
        />
        <SidebarLink 
          icon={<MessageSquare size={18}/>} 
          label="Messages" 
          active={activePage === "Messages"} 
        />
        <SidebarLink 
          icon={<Bell size={18}/>} 
          label="Notifications" 
          active={activePage === "Notifications"} 
        />
      </nav>

      {/* Bottom Section (Account & Settings) */}
      <div className="p-4 border-t border-slate-50 space-y-1 bg-slate-50/30">
        <SidebarLink 
          icon={<User size={18}/>} 
          label="Profile" 
          active={activePage === "Profile"} 
        />
        <SidebarLink 
          icon={<Settings size={18}/>} 
          label="Settings" 
          active={activePage === "Settings"} 
        />
        <SidebarLink 
          icon={<LogOut size={18}/>} 
          label="Logout" 
          color="text-red-500" 
        />
      </div>

    </aside>
  );
};

export default Sidebar;