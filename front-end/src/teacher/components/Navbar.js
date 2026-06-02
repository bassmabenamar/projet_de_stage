import React from 'react';
import { motion } from 'framer-motion';
import { Search, Bell, HelpCircle } from 'lucide-react';

const springTransition = { type: "spring", stiffness: 300, damping: 24 };

const Navbar = () => {
  return (
    <motion.header 
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={springTransition}
      className="bg-white/80 backdrop-blur-md border-b border-slate-100 p-6 flex justify-between items-center z-30"
    >
      {/* Search Bar - Amity Style */}
      <div className="relative w-[450px]">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
        <input 
          type="text" 
          placeholder="Search conversations..." 
          className="w-full bg-slate-50 border border-transparent rounded-xl py-3 pl-12 pr-4 text-sm focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all outline-none"
        />
      </div>
      
      {/* Right Actions */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4 text-slate-400">
          <motion.div whileHover={{ scale: 1.2, rotate: 15 }} className="cursor-pointer relative">
            <Bell size={22} />
            <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
          </motion.div>
          <motion.div whileHover={{ scale: 1.2, rotate: -15 }} className="cursor-pointer">
            <HelpCircle size={22} />
          </motion.div>
        </div>

        {/* User Profile Info */}
        <div className="flex items-center gap-3 border-l pl-6">
          <div className="text-right">
            <p className="text-sm font-black text-[#002366]">Alex Johnson</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
              Student ID: AM-2021
            </p>
          </div>
          <motion.img 
            whileHover={{ scale: 1.1, rotate: 5 }}
            src="https://i.pravatar.cc/150?u=alex" 
            className="w-10 h-10 rounded-xl border-2 border-white shadow-sm cursor-pointer" 
            alt="profile" 
          />
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;