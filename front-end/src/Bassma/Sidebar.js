import React from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  FileText, 
  BookOpen, 
  Layers, 
  Users, 
  Zap 
} from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="w-72 bg-white border-r border-slate-100 flex flex-col fixed h-full z-50 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
      {/* --- LOGO SECTION --- */}
      <div className="p-8">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="flex items-center gap-2 mb-12 cursor-pointer"
        >
          <span className="text-[#F48120] font-black text-2xl tracking-tighter">EduSaaS</span>
        </motion.div>

        {/* --- NAVIGATION --- */}
        <nav className="space-y-1">
          <NavItem icon={<LayoutDashboard size={18}/>} label="Tableau de bord" active />
          <NavItem icon={<FileText size={18}/>} label="Gestion des PDF" />
          <NavItem icon={<BookOpen size={18}/>} label="Gestion des QCM" />
          <NavItem icon={<Layers size={18}/>} label="Gestion des TP" />
          <NavItem icon={<Users size={18}/>} label="Utilisateurs" />
        </nav>
      </div>

      {/* --- USER PROFILE (BOTTOM) --- */}
      <div className="mt-auto p-6 border-t border-slate-50 bg-slate-50/30">
        <motion.div 
          whileHover={{ x: 5 }}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-xs shadow-sm border-2 border-white overflow-hidden">
              {/* Img alternative ila bghiti t-loader sora dialk */}
              {/* <img src="URL_PHOTO" className="w-full h-full object-cover" alt="Amal" /> */}
              AD
            </div>
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900 group-hover:text-orange-500 transition-colors">Amal Ettaliqi</p>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-tight">Digital Full Stack Dev</p>
          </div>
        </motion.div>
      </div>
    </aside>
  );
};

// --- SUB-COMPONENT: NavItem ---
const NavItem = ({ icon, label, active = false }) => {
  return (
    <motion.div 
      whileHover={{ x: 8, backgroundColor: "rgba(244, 129, 32, 0.04)" }}
      whileTap={{ scale: 0.98 }}
      className={`flex items-center gap-4 px-5 py-4 rounded-2xl cursor-pointer transition-all duration-300 group relative ${
        active ? 'bg-orange-50 text-orange-600 shadow-sm' : 'text-slate-400 hover:text-slate-900'
      }`}
    >
      {/* Icon Animation */}
      <motion.span 
        whileHover={{ rotate: 12, scale: 1.1 }}
        className={`${active ? 'text-orange-600' : 'group-hover:text-orange-500'} transition-colors`}
      >
        {icon}
      </motion.span>

      {/* Label */}
      <span className="text-sm font-bold tracking-tight">
        {label}
      </span>

      {/* Active Indicator (Dot) */}
      {active && (
        <motion.div 
          layoutId="sidebar-active"
          className="ml-auto w-1.5 h-1.5 bg-orange-500 rounded-full shadow-[0_0_8px_rgba(244,129,32,0.6)]" 
        />
      )}
    </motion.div>
  );
};

export default Sidebar;