import React from 'react';
import { motion } from 'framer-motion';
import { 
  UserPlus, Search, MoreHorizontal, 
  ChevronLeft, ChevronRight, TrendingUp, 
  Zap, GraduationCap, Ban, Filter, 
  Download, BarChart3, ShieldCheck
} from 'lucide-react';

// Import dial Sidebar
import Sidebar from './Sidebar';

const GestionUtilisateurs = () => {
  const students = [
    { id: 1, name: "Amine Laroui", email: "amine.l@student.edu", code: "EDU-7742-X", device: "MAC-88:99:AA:BB", progress: 78, status: "Actif", initials: "AL", color: "bg-blue-50 text-blue-600" },
    { id: 2, name: "Sarah Mansouri", email: "s.mansouri@edu.fr", code: "EDU-3312-Z", device: "WIN-CC:44:EE:11", progress: 42, status: "Actif", initials: "SM", color: "bg-orange-50 text-orange-600" },
    { id: 3, name: "Karim Bekhti", email: "k.bekhti@gmail.com", code: "REVOQUÉ", device: "---", progress: 12, status: "Bloqué", initials: "KB", color: "bg-slate-100 text-slate-400" },
    { id: 4, name: "Julie Tissier", email: "j.tissier@ecole.com", code: "EDU-0098-Y", device: "IOS-FF:11:33:AA", progress: 95, status: "Actif", initials: "UT", color: "bg-blue-50 text-blue-600" },
  ];

  const engagementData = [20, 35, 45, 70, 95, 80, 60, 40];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar />

      <motion.main 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="flex-1 ml-72 p-10"
      >
        {/* --- Header Section --- */}
        <div className="flex justify-between items-start mb-10">
          <motion.div variants={itemVariants}>
            <h1 className="text-3xl font-black text-[#002366] mb-2 tracking-tight">Gestionnaire d'Utilisateurs</h1>
            <p className="text-slate-400 font-medium text-sm">Gérez les accès et administrez les comptes étudiants.</p>
          </motion.div>
          <motion.button 
            variants={itemVariants}
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(244, 129, 32, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#F48120] text-white px-6 py-3 rounded-2xl font-black text-sm flex items-center gap-3"
          >
            <UserPlus size={18} strokeWidth={3} />
            Ajouter un étudiant
          </motion.button>
        </div>

        {/* --- Stats Summary Grid --- */}
        <div className="grid grid-cols-4 gap-6 mb-10">
          <StatCard variants={itemVariants} icon={<TrendingUp size={18}/>} label="Total Étudiants" value="1,284" trend="+12%" />
          <StatCard variants={itemVariants} icon={<Zap size={18}/>} label="Actifs aujourd'hui" value="942" iconColor="text-blue-500" />
          <StatCard variants={itemVariants} icon={<GraduationCap size={18}/>} label="Taux de complétion" value="86%" iconColor="text-purple-500" />
          <StatCard variants={itemVariants} icon={<Ban size={18}/>} label="Comptes bloqués" value="12" iconColor="text-red-500" />
        </div>

        {/* --- Students Table Section --- */}
        <motion.section 
          variants={itemVariants}
          className="bg-white rounded-[32px] border border-slate-50 shadow-sm overflow-hidden mb-10"
        >
          <div className="p-8 flex justify-between items-center">
            <h2 className="text-xl font-black text-[#002366]">Liste des étudiants</h2>
            <div className="flex items-center gap-4">
               <IconButton icon={<Filter size={16}/>} />
               <IconButton icon={<Download size={16}/>} />
            </div>
          </div>

          <table className="w-full">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-4 text-[10px] font-black text-slate-300 uppercase text-left">Étudiant</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-300 uppercase text-left">Progression</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-300 uppercase text-left">Statut</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-300 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {students.map((student) => (
                <motion.tr 
                  key={student.id} 
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.015, 
                    backgroundColor: "#ffffff",
                    boxShadow: "0 10px 30px -10px rgba(0,0,0,0.04)",
                    zIndex: 10
                  }}
                  className="transition-all cursor-pointer relative z-0"
                >
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <motion.div whileHover={{ rotate: 10, scale: 1.1 }} className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs ${student.color}`}>
                        {student.initials}
                      </motion.div>
                      <div>
                        <p className="text-sm font-black text-[#002366]">{student.name}</p>
                        <p className="text-[11px] text-slate-400 font-medium">{student.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[10px] font-black text-orange-500">{student.progress}%</span>
                      <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${student.progress}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="h-full bg-orange-500 rounded-full" 
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                       <div className={`w-1.5 h-1.5 rounded-full ${student.status === 'Actif' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                       <span className={`text-[10px] font-black uppercase tracking-widest ${student.status === 'Actif' ? 'text-green-600' : 'text-red-600'}`}>
                         {student.status}
                       </span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <motion.button whileHover={{ scale: 1.2, color: "#F48120" }} className="text-slate-300 transition-colors"><MoreHorizontal size={20}/></motion.button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.section>

        {/* --- Bottom Row --- */}
        <div className="grid grid-cols-12 gap-8">
          <motion.div variants={itemVariants} className="col-span-8 bg-white rounded-[40px] p-10 border border-slate-50 shadow-sm">
            <div className="flex items-center gap-3 mb-10">
               <BarChart3 className="text-orange-500" size={20} />
               <h3 className="text-xl font-black text-[#002366]">Tendances d'Engagement</h3>
            </div>
            <div className="flex items-end justify-between h-48 px-4 mb-8">
              {engagementData.map((h, i) => (
                <motion.div 
                  key={i} 
                  initial={{ height: 0 }} 
                  animate={{ height: `${h}%` }}
                  transition={{ delay: 0.5 + (i * 0.1), duration: 1 }}
                  whileHover={{ scaleY: 1.1, backgroundColor: "#F48120", transition: { duration: 0.2 } }}
                  className={`w-12 rounded-t-xl bg-orange-100 cursor-pointer origin-bottom`}
                />
              ))}
            </div>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -8, scale: 1.02 }}
            className="col-span-4 bg-[#1E293B] rounded-[40px] p-10 text-white relative overflow-hidden flex flex-col justify-between shadow-xl"
          >
             <div className="relative z-10">
               <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 3 }} className="bg-orange-500/20 w-10 h-10 rounded-xl flex items-center justify-center mb-6">
                 <ShieldCheck className="text-orange-500" size={20} />
               </motion.div>
               <h3 className="text-2xl font-black mb-4 tracking-tight">Support Premium</h3>
               <p className="text-slate-400 text-sm font-medium">Besoin d'aide via API ?</p>
             </div>
             <motion.button 
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               className="bg-white text-[#1E293B] w-full py-4 rounded-2xl font-black text-sm relative z-10 mt-10"
             >
               Contacter l'expert
             </motion.button>
             <div className="absolute -right-10 -top-10 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl"></div>
          </motion.div>
        </div>
      </motion.main>
    </div>
  );
};

const StatCard = ({ variants, icon, label, value, trend, iconColor = "text-orange-500" }) => (
  <motion.div variants={variants} whileHover={{ y: -8, scale: 1.03 }} className="bg-white p-8 rounded-[32px] border border-slate-50 shadow-sm cursor-default">
    <div className="flex items-center justify-between mb-4">
      <div className={`${iconColor} bg-slate-50 p-2 rounded-xl`}>{icon}</div>
      {trend && <span className="text-green-500 font-black text-[10px]">{trend}</span>}
    </div>
    <p className="text-4xl font-black text-[#002366] mb-1">{value}</p>
    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{label}</p>
  </motion.div>
);

const IconButton = ({ icon }) => (
  <motion.button whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }} className="p-2 text-slate-400 hover:text-orange-500 transition-colors">
    {icon}
  </motion.button>
);

export default GestionUtilisateurs;