import React from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, FileText, BookOpen, Layers, Users, 
  Bell, Menu, MoreHorizontal, Plus, 
  UserPlus, ShieldAlert, CheckCircle2, Filter, Zap, TrendingUp, Star
} from 'lucide-react';
import Sidebar from './Sidebar';

const Dashboard = () => {
  const stats = [
    { label: "ÉTUDIANTS TOTAL", value: "12,842", growth: "+12%", icon: <Users size={20}/>, color: "blue" },
    { label: "COURS PDF", value: "156", growth: "+5", icon: <FileText size={20}/>, color: "orange" },
    { label: "QUIZ QCM", value: "3,401", growth: "+214", icon: <BookOpen size={20}/>, color: "purple" },
    { label: "SESSIONS ACTIVES", value: "842", growth: "Live", icon: <Zap size={20}/>, color: "green" },
  ];

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans text-slate-700 overflow-x-hidden">
      
      {/* --- SIDEBAR --- */}
      <aside className="w-72 bg-white border-r border-slate-100 flex flex-col fixed h-full z-50">
       <Sidebar/>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 ml-72 p-10">
        
        {/* Header */}
        <header className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-4 text-slate-400">
            <motion.div whileHover={{ rotate: 90 }} className="cursor-pointer">
               <Menu size={20} />
            </motion.div>
            <span className="text-sm font-bold text-slate-900">Plateforme Admin</span>
          </div>
          <div className="flex items-center gap-6">
            <motion.div whileHover={{ scale: 1.2 }} className="relative cursor-pointer text-slate-400 hover:text-orange-500 transition-colors">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#F8FAFC]"></span>
            </motion.div>
            <img src="https://i.pravatar.cc/100?u=admin" className="w-9 h-9 rounded-full border-2 border-white shadow-md" alt="profile" />
          </div>
        </header>

        {/* Title */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-10">
          <h1 className="text-3xl font-black text-slate-900 mb-2">Vue d'ensemble</h1>
          <p className="text-slate-400 text-sm font-medium">Bienvenue sur votre tableau de bord. Voici l'activité de votre plateforme aujourd'hui.</p>
        </motion.div>

        {/* Stats Grid avec Scale w Animation */}
        <div className="grid grid-cols-4 gap-6 mb-10">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white p-7 rounded-[32px] border border-slate-50 shadow-sm relative group cursor-pointer transition-shadow hover:shadow-xl hover:shadow-slate-200/50"
            >
              <div className="flex justify-between items-start mb-8">
                <div className={`p-3 rounded-2xl ${
                  stat.color === 'blue' ? 'bg-blue-50 text-blue-500' :
                  stat.color === 'orange' ? 'bg-orange-50 text-orange-500' :
                  stat.color === 'purple' ? 'bg-purple-50 text-purple-500' :
                  'bg-green-50 text-green-500'
                }`}>
                  {stat.icon}
                </div>
                <span className="text-[11px] font-black text-green-500 flex items-center gap-1">
                  <TrendingUp size={10}/> {stat.growth}
                </span>
              </div>
              <h2 className="text-4xl font-black text-slate-900 mb-1">{stat.value}</h2>
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Main Sections: Chart & Activities */}
        <div className="grid grid-cols-12 gap-8 mb-10">
          
          {/* Chart Section: Realistic Animation */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="col-span-8 bg-white p-8 rounded-[48px] border border-slate-50 shadow-sm"
          >
            <div className="flex justify-between items-center mb-12">
              <div>
                <h3 className="text-xl font-black text-slate-900">Croissance des Inscriptions</h3>
                <p className="text-xs text-slate-400 font-medium">Évolution sur les 30 derniers jours</p>
              </div>
              <div className="bg-slate-50 p-1 rounded-2xl flex gap-1">
                <button className="px-5 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Semaine</button>
                <button className="px-5 py-2 text-[10px] font-bold bg-[#F48120] text-white rounded-xl shadow-lg shadow-orange-500/20 uppercase tracking-widest">Mois</button>
              </div>
            </div>
            
            <div className="flex items-end justify-between h-64 px-4 gap-2">
              {[40, 60, 45, 75, 55, 95, 100, 80, 50, 40, 60].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-4 group cursor-pointer">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ duration: 1, delay: i * 0.05 }}
                    whileHover={{ scaleX: 1.1, filter: "brightness(1.1)" }}
                    className={`w-full rounded-2xl relative ${
                      i === 6 ? 'bg-gradient-to-t from-orange-600 to-orange-400 shadow-xl shadow-orange-100' : 
                      i === 7 ? 'bg-orange-200' : 'bg-slate-50 group-hover:bg-slate-100'
                    }`}
                  >
                    {i === 6 && (
                      <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] px-2 py-1 rounded font-bold"
                      >
                        PEAK
                      </motion.div>
                    )}
                  </motion.div>
                  {(i % 2 === 0) && <span className="text-[10px] font-bold text-slate-300">{i+1 < 10 ? `0${i+1}` : i+1} Oct</span>}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Activities: Photocopie Look */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="col-span-4 bg-white p-8 rounded-[48px] border border-slate-50 shadow-sm"
          >
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-xl font-black text-slate-900">Activités</h3>
              <button className="text-[10px] font-bold text-orange-500 uppercase tracking-widest hover:underline">Voir tout</button>
            </div>
            <div className="space-y-8">
              <ActivityItem icon={<UserPlus size={16}/>} title="Nouvel étudiant inscrit" desc="Marc Lefebvre a rejoint le cours Python." time="IL Y A 2 MIN" color="blue" />
              <ActivityItem icon={<BookOpen size={16}/>} title="Nouveau quiz publié" desc="Algorithmie Avancée est en ligne." time="IL Y A 15 MIN" color="orange" />
              <ActivityItem icon={<CheckCircle2 size={16}/>} title="Validation de session" desc="Sophie Durand a complété le TP Docker." time="IL Y A 1H" color="green" />
              <ActivityItem icon={<ShieldAlert size={16}/>} title="Alerte système" desc="Pic de charge détecté sur le serveur." time="IL Y A 2H" color="purple" />
            </div>
          </motion.div>
        </div>

        {/* Top Formations Table: Premium & Scaled */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-[48px] border border-slate-50 shadow-sm overflow-hidden"
        >
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-black text-slate-900">Top Formations</h3>
            <button className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest border border-slate-100 px-4 py-2 rounded-xl hover:bg-slate-50 transition-colors">
              <Filter size={14}/> Filtrer par popularité
            </button>
          </div>
          <table className="w-full">
            <thead className="text-left text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] border-b border-slate-50">
              <tr>
                <th className="pb-4 px-2">Formation</th>
                <th className="pb-4">Étudiants</th>
                <th className="pb-4">Note Moyenne</th>
                <th className="pb-4">Taux de complétion</th>
                <th className="pb-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              <CourseRow name="Fullstack Javascript" sub="Expertise Web" students="3,120" rating="4.9" progress={82} logo="JS" color="bg-blue-600" />
              <CourseRow name="Python pour Data Science" sub="Analyse de données" students="2,845" rating="4.7" progress={65} logo="Py" color="bg-slate-900" />
            </tbody>
          </table>
        </motion.div>

        {/* FAB: Floating Add Button */}
        <motion.button 
          whileHover={{ scale: 1.15, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-10 right-10 w-16 h-16 bg-orange-500 text-white rounded-[24px] shadow-2xl shadow-orange-500/40 flex items-center justify-center z-[100]"
        >
          <Plus size={32} />
        </motion.button>
      </main>
    </div>
  );
};

// --- Sub-components avec Animations ---
const NavItem = ({ icon, label, active = false }) => (
  <motion.div 
    whileHover={{ x: 5, backgroundColor: "rgba(244, 129, 32, 0.05)" }}
    className={`flex items-center gap-4 px-5 py-4 rounded-2xl cursor-pointer transition-all group ${
      active ? 'bg-orange-50 text-orange-600 shadow-sm' : 'text-slate-400 hover:text-slate-900'
    }`}
  >
    <span className={`${active ? 'text-orange-600' : 'group-hover:text-orange-500'} transition-colors`}>{icon}</span>
    <span className="text-sm font-bold">{label}</span>
    {active && <motion.div layoutId="active" className="ml-auto w-1.5 h-1.5 bg-orange-500 rounded-full" />}
  </motion.div>
);

const ActivityItem = ({ icon, title, desc, time, color }) => (
  <motion.div whileHover={{ x: 5 }} className="flex gap-4 group cursor-pointer">
    <div className={`w-11 h-11 shrink-0 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${
      color === 'blue' ? 'bg-blue-50 text-blue-500' : 
      color === 'orange' ? 'bg-orange-50 text-orange-500' : 
      color === 'green' ? 'bg-green-50 text-green-500' : 
      'bg-purple-50 text-purple-500'
    }`}>
      {icon}
    </div>
    <div className="flex-1">
      <h4 className="text-sm font-bold text-slate-900 group-hover:text-orange-500 transition-colors leading-tight mb-0.5">{title}</h4>
      <p className="text-xs text-slate-400 font-medium mb-1 line-clamp-1">{desc}</p>
      <span className="text-[9px] font-black text-slate-300 tracking-wider uppercase">{time}</span>
    </div>
  </motion.div>
);

const CourseRow = ({ name, sub, students, rating, progress, logo, color }) => (
  <motion.tr whileHover={{ backgroundColor: "rgba(248, 250, 252, 0.8)" }} className="group cursor-default transition-colors">
    <td className="py-6 px-2 flex items-center gap-4 text-left">
      <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center text-white font-black text-xs shadow-sm group-hover:scale-110 transition-transform`}>{logo}</div>
      <div>
        <p className="text-sm font-bold text-slate-900 leading-tight mb-0.5">{name}</p>
        <p className="text-xs text-slate-400 font-medium">{sub}</p>
      </div>
    </td>
    <td className="text-sm font-bold text-slate-900">{students}</td>
    <td className="text-sm font-bold text-slate-900">
      <div className="flex items-center gap-1">
        <Star size={14} className="text-orange-400 fill-orange-400" /> {rating}
      </div>
    </td>
    <td>
      <div className="flex items-center gap-4">
        <div className="w-28 h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 1.5 }} className="h-full bg-orange-500" />
        </div>
        <span className="text-[10px] font-black text-slate-400">{progress}%</span>
      </div>
    </td>
    <td className="text-right">
      <motion.div whileHover={{ rotate: 90 }} className="inline-block cursor-pointer p-2 hover:bg-white rounded-lg transition-colors">
        <MoreHorizontal size={20} className="text-slate-300 hover:text-slate-900" />
      </motion.div>
    </td>
  </motion.tr>
);

export default Dashboard;