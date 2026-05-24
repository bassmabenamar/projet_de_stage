import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import {
  TrendingUp, UserCheck, BookOpen, ChevronRight, Filter, Plus,
  Megaphone, Wallet, GraduationCap
} from 'lucide-react';

import Navbar from './Navbar';
import api from './api';

const Dashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/student/dashboard');
        const dashboardData = response.data?.data || response.data;
        console.log("Dashboard data:", dashboardData);
        setData(dashboardData);
        setLoading(false);
      } catch (error) {
        console.error("Erreur Fetch Dashboard:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Calcul du pourcentage de présence
  const presencePercentage = data?.stats?.presence_total && data?.stats?.absences
    ? Math.round((data.stats.presence_total / (data.stats.presence_total + data.stats.absences)) * 100)
    : 0;

  // Mapping dyal icons/alwan 3la hsab l-type li f MySQL
  const getTypeConfig = (type) => {
    switch (type) {
      case 'Annonces': return { icon: <Megaphone size={14} />, color: 'bg-blue-600', label: 'ANNONCE', route: '/notifications' };
      case 'Devoirs': return { icon: <BookOpen size={14} />, color: 'bg-indigo-600', label: 'DEVOIR', route: '/homework' };
      case 'Examens': return { icon: <GraduationCap size={14} />, color: 'bg-red-600', label: 'EXAMEN', route: '/grades' };
      case 'Paiements': return { icon: <Wallet size={14} />, color: 'bg-orange-600', label: 'PAIEMENT', route: '/payment' };
      case 'Activités': return { icon: <Megaphone size={14} />, color: 'bg-purple-600', label: 'ACTIVITÉ', route: '/activities' };
      case 'Absences': return { icon: <UserCheck size={14} />, color: 'bg-orange-500', label: 'ABSENCE', route: '/attendance' };
      default: return { icon: <Megaphone size={14} />, color: 'bg-blue-600', label: 'INFO', route: '/notifications' };
    }
  };

  const springTransition = { type: "spring", stiffness: 300, damping: 20 };
  const containerVars = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.2 } }
  };
  const itemVars = {
    hidden: { y: 20, opacity: 0, scale: 0.98 },
    visible: { y: 0, opacity: 1, scale: 1, transition: springTransition }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center font-black text-[#002366] bg-[#F8FAFC]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="w-12 h-12 border-4 border-[#002366] border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans text-[#1E293B]">
      <main className="flex-1 overflow-y-auto overflow-x-hidden">
        <Navbar />

        <motion.div
          variants={containerVars}
          initial="hidden"
          animate="visible"
          className="p-4 md:p-8 max-w-[1400px] mx-auto"
        >
          {/* Welcome Section */}
          <motion.section variants={itemVars} className="mb-8 md:mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <motion.h2
                initial={{ x: -20 }} animate={{ x: 0 }}
                className="text-3xl md:text-[42px] font-black text-[#002366] tracking-tight leading-tight"
              >
                Bon retour, {data?.user?.prenom || 'Étudiant'} !
              </motion.h2>
              <p className="text-slate-400 font-bold text-sm md:text-base mt-1">
                Amity School — {data?.classe || 'Classe'} • Semestre 2
              </p>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 bg-white px-4 py-2 md:px-5 md:py-2.5 rounded-2xl border border-slate-100 shadow-sm cursor-pointer"
              onClick={() => navigate('/notifications')}
            >
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-[10px] md:text-xs font-black text-slate-500 uppercase tracking-widest">
                {data?.annonces?.length || 0} Nouvelles Annonces
              </span>
            </motion.div>
          </motion.section>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
            <div className="col-span-1 lg:col-span-8 space-y-6 md:space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                <StatCard
                  label="MOYENNE"
                  value={data?.stats?.moyenne ? parseFloat(data.stats.moyenne).toFixed(2) : '0.00'}
                  suffix="/20"
                  icon={<TrendingUp size={20} />}
                  sub={<span className="text-green-500">Actuelle</span>}
                  onClick={() => navigate('/grades')}
                />
                <StatCard
                  label="PRÉSENCE"
                  value={`${presencePercentage}%`}
                  icon={<UserCheck size={20} />}
                  progress={presencePercentage}
                  sub={<span className="text-blue-500">Présent</span>}
                  onClick={() => navigate('/attendance')}
                />
                <StatCard
                  label="ABSENCES"
                  value={data?.stats?.absences || 0}
                  icon={<BookOpen size={20} />}
                  sub={<span className="text-orange-500">Total</span>}
                  onClick={() => navigate('/attendance')}
                />
              </div>

              {/* Upcoming Classes */}
              <motion.div variants={itemVars} className="bg-white rounded-[24px] md:rounded-[32px] border border-slate-100 p-5 md:p-8 shadow-sm">
                <div className="flex justify-between items-center mb-6 md:mb-8">
                  <h3 className="font-black text-lg md:text-xl text-[#002366]">Cours à venir aujourd'hui</h3>
                  <button
                    onClick={() => navigate('/timetable')}
                    className="text-slate-400 text-[10px] md:text-xs font-black uppercase tracking-widest hover:text-blue-600 transition-all"
                  >
                    Emploi du temps complet
                  </button>
                </div>
                <div className="space-y-2">
                  <ClassRow
                    time="09:00" ampm="AM"
                    title="Mathématiques Avancées"
                    info="Salle 304 • Prof. Richards"
                    status="EN COURS"
                    onClick={() => navigate('/timetable')}
                  />
                  <ClassRow
                    time="11:15" ampm="AM"
                    title="Histoire Moderne"
                    info="Amphi B • Dr. Thompson"
                    showArrow
                    onClick={() => navigate('/timetable')}
                  />
                </div>
              </motion.div>

              {/* Homework Table */}
              <motion.div variants={itemVars} className="bg-white rounded-[24px] md:rounded-[32px] border border-slate-100 p-5 md:p-8 shadow-sm overflow-hidden">
                <div className="flex justify-between items-center mb-6 md:mb-8">
                  <h3 className="font-black text-lg md:text-xl text-[#002366]">Échéances des devoirs</h3>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => navigate('/homework')}
                    className="flex items-center gap-2 text-slate-400 text-[10px] md:text-xs font-black border border-slate-100 px-3 py-1.5 md:px-4 md:py-2 rounded-xl"
                  >
                    <Filter size={14} /> Voir tout
                  </motion.button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[500px]">
                    <thead className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] border-b border-slate-50">
                      <tr>
                        <th className="pb-4 text-left">Matière</th>
                        <th className="pb-4 text-left">Devoir</th>
                        <th className="pb-4 text-left">Date limite</th>
                        <th className="pb-4 text-right">Statut</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {data?.homeworks && data.homeworks.length > 0 ? (
                        data.homeworks.slice(0, 3).map((hw, idx) => (
                          <TableRow
                            key={idx}
                            subject={hw.matiere?.nom || 'Matière'}
                            task={hw.titre || hw.title || 'Devoir'}
                            date={hw.DateDev ? new Date(hw.DateDev).toLocaleDateString('fr-FR') : 'Date non définie'}
                            status="À RENDRE"
                            statusColor="bg-orange-50 text-orange-600"
                            onClick={() => navigate('/homework')}
                          />
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="text-center py-8 text-slate-400">
                            Aucun devoir pour le moment
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </div>

            {/* Right Side */}
            <div className="col-span-1 lg:col-span-4 space-y-6 md:space-y-8">
              <motion.div
                variants={itemVars}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-[#002366] rounded-[24px] md:rounded-[32px] p-6 md:p-8 text-white relative overflow-hidden shadow-2xl shadow-blue-900/30 cursor-pointer"
                onClick={() => navigate('/notifications')}
              >
                <div className="flex justify-between items-start relative z-10">
                  <div>
                    <p className="text-[9px] md:text-[10px] font-black opacity-60 tracking-[0.2em] mb-2 uppercase">Alertes Système</p>
                    <h3 className="text-3xl md:text-4xl font-black mb-6">{data?.annonces?.length || 0} Annonces</h3>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      className="bg-white/10 backdrop-blur-md border border-white/20 px-6 py-2 md:px-8 md:py-3 rounded-2xl text-[10px] md:text-[11px] font-black uppercase tracking-widest hover:bg-white hover:text-[#002366] transition-all"
                    >
                      Voir tout
                    </motion.button>
                  </div>
                  <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="p-3 bg-white/10 rounded-2xl">
                    <BookOpen size={24} className="opacity-80" />
                  </motion.div>
                </div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full" />
              </motion.div>

              {/* Annonces - Differentiées par Type avec redirection */}
              <motion.div variants={itemVars} className="bg-white rounded-[24px] md:rounded-[32px] border border-slate-100 p-6 md:p-8 shadow-sm">
                <h4 className="font-black text-lg md:text-xl text-[#002366] mb-6 md:mb-8">Activités & Annonces</h4>
                <div className="space-y-1">
                  {data?.annonces && data.annonces.length > 0 ? (
                    data.annonces.map((ann, i) => {
                      const config = getTypeConfig(ann.type);
                      let route = '/notifications';
                      if (ann.type === 'Devoirs') route = '/homework';
                      else if (ann.type === 'Examens') route = '/grades';
                      else if (ann.type === 'Paiements') route = '/payment';
                      else if (ann.type === 'Activités') route = '/activities';
                      else if (ann.type === 'Absences') route = '/attendance';
                      return (
                        <AnnouncementItem
                          key={i}
                          title={ann.titre || ann.title}
                          date={new Date(ann.dateCreation || ann.date || ann.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })}
                          category={config.label}
                          color={config.color}
                          desc={ann.contenu || ann.description || ann.message}
                          onClick={() => navigate(route)}
                        />
                      );
                    })
                  ) : (
                    <div className="text-center py-8 text-slate-400">
                      Aucune annonce pour le moment
                    </div>
                  )}
                </div>
              </motion.div>

              {/* ✅ Bouton Découvrir - redirige vers /library */}
              <motion.div
                variants={itemVars}
                whileHover={{ scale: 1.03, y: -5 }}
                className="bg-gradient-to-br from-[#FFEDD5] to-[#FED7AA] rounded-[24px] md:rounded-[32px] p-6 md:p-8 text-center shadow-lg shadow-orange-100 cursor-pointer"
                onClick={() => navigate('/activities')}
              >
                <h4 className="font-black text-xl md:text-2xl text-[#7C2D12] mb-3">Bibliothèque</h4>
                <p className="text-xs md:text-sm text-[#9A3412] font-bold opacity-80 mb-6 md:mb-8">Accédez aux ressources Amity School.</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#7C2D12] text-white w-full md:w-auto md:px-10 py-3 md:py-3.5 rounded-2xl text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em]"
                  onClick={() => navigate('/library')}
                >
                  Découvrir
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </main>

      <motion.button
        whileHover={{ scale: 1.15, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 w-14 h-14 md:w-16 md:h-16 bg-[#002366] text-white rounded-full flex items-center justify-center shadow-2xl z-50 transition-shadow"
        onClick={() => navigate('/activities')}
      >
        <Plus size={28} strokeWidth={3} />
      </motion.button>
    </div>
  );
};

// --- Sub-Components avec onClick ---
const StatCard = ({ label, value, suffix, sub, icon, progress, onClick }) => (
  <motion.div
    variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } }}
    whileHover={{ y: -8, transition: { duration: 0.2 } }}
    onClick={onClick}
    className="bg-white p-6 md:p-8 rounded-[24px] md:rounded-[32px] border border-slate-100 shadow-sm relative group cursor-pointer transition-all hover:shadow-xl hover:shadow-slate-200/50"
  >
    <div className="flex justify-between items-start mb-4 md:mb-6">
      <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }} className="p-2.5 md:p-3 bg-slate-50 rounded-2xl text-slate-400 group-hover:text-blue-600">
        {icon}
      </motion.div>
      <span className="text-[9px] md:text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">{label}</span>
    </div>
    <div className="flex items-end gap-2 md:gap-3">
      <h3 className="text-3xl md:text-4xl font-black text-[#002366]">{value}{suffix}</h3>
      {sub && <div className="text-[10px] md:text-[11px] font-black mb-1">{sub}</div>}
    </div>
    {progress !== undefined && (
      <div className="w-full h-1.5 md:h-2 bg-slate-50 rounded-full mt-4 md:mt-6 overflow-hidden">
        <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 1.5, ease: "easeOut" }} className="h-full bg-green-500 rounded-full" />
      </div>
    )}
  </motion.div>
);

const ClassRow = ({ time, ampm, title, info, status, showArrow, onClick }) => (
  <motion.div
    whileHover={{ x: 10, backgroundColor: "rgba(248, 250, 252, 1)" }}
    onClick={onClick}
    className="flex items-center gap-4 md:gap-10 p-4 md:p-6 rounded-[20px] md:rounded-[24px] transition-all group cursor-pointer border border-transparent hover:border-slate-100"
  >
    <div className="text-center min-w-[60px] md:min-w-[70px]">
      <p className="text-lg md:text-xl font-black text-[#002366] leading-none">{time}</p>
      <p className="text-[9px] md:text-[10px] font-black text-slate-300 uppercase mt-1 tracking-widest">{ampm}</p>
    </div>
    <div className="flex-1">
      <h4 className="text-sm md:text-base font-black text-[#002366] mb-1">{title}</h4>
      <p className="text-[11px] md:text-[13px] font-bold text-slate-400 line-clamp-1">{info}</p>
    </div>
    {status ? (
      <span className="hidden sm:inline-block bg-green-50 text-green-600 text-[9px] md:text-[10px] font-black px-3 py-1.5 md:px-4 md:py-2 rounded-xl uppercase">{status}</span>
    ) : showArrow && (
      <ChevronRight className="text-slate-200 group-hover:text-blue-600 transition-all" size={20} />
    )}
  </motion.div>
);

const TableRow = ({ subject, task, date, dateColor, status, statusColor, onClick }) => (
  <motion.tr whileHover={{ backgroundColor: "rgba(248, 250, 252, 0.5)" }} onClick={onClick} className="group transition-colors cursor-pointer">
    <td className="py-4 md:py-6 font-bold text-[#002366] text-xs md:text-[15px] px-2">{subject}</td>
    <td className="py-4 md:py-6 text-slate-400 font-medium text-xs md:text-sm">{task}</td>
    <td className={`py-4 md:py-6 font-black text-xs md:text-sm ${dateColor || 'text-slate-800'}`}>{date}</td>
    <td className="py-4 md:py-6 text-right">
      <motion.span whileHover={{ scale: 1.1 }} className={`px-3 py-1 md:px-4 md:py-1.5 rounded-lg text-[8px] md:text-[10px] font-black tracking-widest inline-block ${statusColor}`}>
        {status}
      </motion.span>
    </td>
  </motion.tr>
);

const AnnouncementItem = ({ title, date, category, color, desc, onClick }) => (
  <motion.div whileHover={{ x: 5 }} onClick={onClick} className="flex gap-4 relative group cursor-pointer pb-6">
    <div className="flex flex-col items-center">
      <div className={`w-3 h-3 rounded-full z-10 mt-1.5 border-2 border-white shadow-sm ${color}`} />
      <div className="absolute top-4 left-[5.5px] w-[1px] h-full bg-slate-100 group-last:hidden" />
    </div>
    <div className="flex-1">
      <p className="text-[8px] md:text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">{date} • {category}</p>
      <h5 className="text-xs md:text-[13px] font-black text-[#002366] group-hover:text-blue-600 transition-colors leading-snug">{title}</h5>
      <p className="text-[10px] md:text-[11px] text-slate-400 font-medium mt-1 line-clamp-1">{desc}</p>
    </div>
  </motion.div>
);

export default Dashboard;