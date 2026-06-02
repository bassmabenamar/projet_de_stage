import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, BookOpen, Clock, FileText, Plus, 
  MoreVertical, Filter, CheckSquare, Loader2,
  Calendar, Bell, ClipboardList, TrendingUp,
  Award, AlertCircle, MessageSquare, Download,
  Eye, CheckCircle, XCircle, BarChart3,
  PieChart, Activity, Target, Star, ChevronRight,
  Sparkles, ArrowUpRight, GraduationCap, ArrowDownRight
} from 'lucide-react';

import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import API from '../../services/api';

const TeacherDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    teacherName: '',
    performance: {
      averageGrade: 0,
      attendanceRate: 0,
      homeworkCompletion: 0,
      studentSatisfaction: 0
    },
    upcomingEvents: [],
    recentSubmissions: [],
    topPerformers: [],
    pendingReviews: [],
    classStats: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  useEffect(() => {
    fetchDashboard();
  }, [selectedPeriod]);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const response = await API.get(`/teacher/dashboard`);
      setDashboardData(response.data);
      setError(null);
    } catch (error) {
      console.error('Dashboard error:', error);
      setError('Impossible de charger le tableau de bord en direct. Affichage des données locales.');
      
      // Fallback data matching premium schema
      setDashboardData({
        teacherName: 'Mme. Martin',
        performance: {
          averageGrade: 14.8,
          attendanceRate: 94,
          homeworkCompletion: 87,
          studentSatisfaction: 4.6
        },
        upcomingEvents: [
          { id: 1, title: "Réunion des professeurs", date: "2026-06-03", time: "14:00", type: "meeting" },
          { id: 2, title: "Remise des bulletins", date: "2026-06-05", time: "09:00", type: "deadline" },
          { id: 3, title: "Sortie pédagogique au musée", date: "2026-06-08", time: "08:30", type: "event" }
        ],
        recentSubmissions: [
          { id: 1, student: "Emma Laurent", assignment: "Devoir Algèbre Linéaire", submittedAt: "2026-06-02T13:10:00", status: "pending", grade: null, priority: "high" },
          { id: 2, student: "Lucas Bernard", assignment: "Projet Mécanique Quantique", submittedAt: "2026-06-01T15:45:00", status: "graded", grade: 16, priority: "normal" },
          { id: 3, student: "Chloé Dubois", assignment: "Dissertation Littéraire", submittedAt: "2026-06-01T09:20:00", status: "pending", grade: null, priority: "high" }
        ],
        topPerformers: [
          { id: 1, name: "Emma Laurent", average: 18.5, trend: "+2%", class: "Mathématiques 10A" },
          { id: 2, name: "Thomas Petit", average: 17.8, trend: "+1.5%", class: "Physique 11B" },
          { id: 3, name: "Sarah Cohen", average: 17.2, trend: "+3%", class: "Chimie 10C" }
        ],
        pendingReviews: [
          { id: 1, count: 12, type: "Devoirs", urgent: true },
          { id: 2, count: 5, type: "Projets", urgent: false },
          { id: 3, count: 8, type: "Quiz", urgent: true }
        ],
        classStats: [
          { name: "10A", average: 15.2, attendance: 92, completion: 88 },
          { name: "10B", average: 14.8, attendance: 96, completion: 91 },
          { name: "11A", average: 16.1, attendance: 94, completion: 85 },
          { name: "11B", average: 14.2, attendance: 89, completion: 82 }
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  // Memoized deep analytical insights
  const insights = React.useMemo(() => {
    if (!dashboardData.classStats.length) return null;
    const sortedByAvg = [...dashboardData.classStats].sort((a, b) => b.average - a.average);
    const sortedByAtt = [...dashboardData.classStats].sort((a, b) => a.attendance - b.attendance);
    const totalUrgentReviews = dashboardData.pendingReviews
      .filter(r => r.urgent)
      .reduce((acc, curr) => acc + curr.count, 0);

    return {
      bestClass: sortedByAvg[0]?.name || 'N/A',
      lowestAttendanceClass: sortedByAtt[0]?.name || 'N/A',
      mostActiveStudent: dashboardData.topPerformers[0]?.name || 'N/A',
      urgentTasksCount: totalUrgentReviews
    };
  }, [dashboardData]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.04 } }
  };

  const itemVariants = {
    hidden: { y: 16, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 110, damping: 14 } }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-[#F8FAFC]">
        <Sidebar />
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          <Navbar />
          <main className="flex-1 flex justify-center items-center bg-slate-50">
            <div className="flex flex-col items-center gap-3">
              <Loader2 size={40} className="animate-spin text-[#2F5D9F]" />
              <p className="text-xs font-semibold tracking-wider uppercase text-slate-400">Amity Systems Loading...</p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F6F8FA] antialiased text-[#0F172A]">
      <Sidebar />
      <main className="flex-1 flex flex-col relative overflow-hidden h-screen">
        <Navbar />
        
        {/* Dynamic Abstract Background Accents */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b from-[#2f5d9f10] to-transparent rounded-full blur-[120px] pointer-events-none z-0" />
        <div className="absolute bottom-10 left-1/3 w-[350px] h-[350px] bg-gradient-to-tr from-[#e55b2d08] to-transparent rounded-full blur-[80px] pointer-events-none z-0" />

        <div className="flex-1 overflow-y-auto p-6 lg:p-10 z-10 custom-scrollbar">
          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mb-6 p-4 bg-amber-50/80 backdrop-blur-md border border-amber-200 text-amber-800 rounded-2xl text-xs font-medium flex items-center gap-2"
              >
                <AlertCircle size={16} className="text-amber-600 shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-[1440px] mx-auto space-y-8"
          >
            {/* SECTION 1: Premium Hero Area */}
            <motion.div variants={itemVariants} className="relative bg-white border border-slate-200/60 rounded-[24px] p-6 lg:p-8 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.05)] overflow-hidden">
              <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-slate-50 to-transparent hidden md:block" />
              <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2F5D9F] to-[#1a4480] flex items-center justify-center text-white text-xl font-bold shadow-md shadow-blue-900/10">
                      {dashboardData.teacherName ? dashboardData.teacherName.split('. ').pop().charAt(0) : 'M'}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-4 border-white rounded-full flex items-center justify-center" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-widest text-[#2F5D9F] bg-blue-50 px-2 py-0.5 rounded-md">Amity Faculty</span>
                      <span className="text-xs text-slate-400 font-medium">Tuesday, June 2, 2026</span>
                    </div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight mt-1">
                      Welcome back, {dashboardData.teacherName || "Professeur"}
                    </h1>
                    <p className="text-sm text-slate-500 mt-0.5 max-w-xl">
                      Your classes are currently performing optimal tracks. You have <span className="text-[#E55B2D] font-semibold">{insights?.urgentTasksCount || 0} urgent feedback loops</span> requiring your attention today.
                    </p>
                  </div>
                </div>

                {/* Micro Analytics Shortcuts */}
                <div className="flex items-center gap-4 bg-slate-50/80 border border-slate-100 rounded-2xl p-3 self-start md:self-auto backdrop-blur-sm">
                  <div className="text-left pr-4 border-r border-slate-200">
                    <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">Top Stream</span>
                    <span className="text-sm font-bold text-slate-800">Class {insights?.bestClass}</span>
                  </div>
                  <div className="text-left">
                    <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">Operational Status</span>
                    <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1 mt-0.5">
                      <Sparkles size={12} /> Sync Complete
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Sub-Header Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">Workspace Telemetry</h2>
                <p className="text-xs text-slate-500">Real-time parameters derived across administrative segments.</p>
              </div>
              
              {/* Segmented Period Controller */}
              <div className="bg-white border border-slate-200 p-1 rounded-xl flex shadow-sm">
                {['week', 'month', 'semester'].map((period) => (
                  <button
                    key={period}
                    onClick={() => setSelectedPeriod(period)}
                    className={`px-4 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all uppercase ${
                      selectedPeriod === period
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    {period === 'week' ? 'This Week' : period === 'month' ? 'This Month' : 'Semester'}
                  </button>
                ))}
              </div>
            </div>

            {/* SECTION 2: Premium Metric Grid with Mock Sparklines */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <MetricCard 
                icon={<Target size={18} className="text-[#2F5D9F]" />}
                label="Average Grade Ledger"
                value={`${dashboardData.performance.averageGrade || 0}/20`}
                change="+0.5 pts"
                trend="up"
                sparklineColor="#2F5D9F"
                points={[14.1, 14.3, 14.2, 14.6, 14.5, dashboardData.performance.averageGrade || 14.8]}
              />
              <MetricCard 
                icon={<Users size={18} className="text-emerald-600" />}
                label="Aggregated Attendance"
                value={`${dashboardData.performance.attendanceRate || 0}%`}
                change="+2.1%"
                trend="up"
                sparklineColor="#10B981"
                points={[91, 92, 90, 93, 95, dashboardData.performance.attendanceRate || 94]}
              />
              <MetricCard 
                icon={<ClipboardList size={18} className="text-purple-600" />}
                label="Task Completion Rate"
                value={`${dashboardData.performance.homeworkCompletion || 0}%`}
                change="+5.4%"
                trend="up"
                sparklineColor="#8B5CF6"
                points={[80, 82, 85, 83, 86, dashboardData.performance.homeworkCompletion || 87]}
              />
              <MetricCard 
                icon={<Star size={18} className="text-[#E55B2D]" />}
                label="Student Sentiment"
                value={`${dashboardData.performance.studentSatisfaction || 0}/5`}
                change="-0.1 pts"
                trend="down"
                sparklineColor="#E55B2D"
                points={[4.7, 4.7, 4.6, 4.5, 4.6, dashboardData.performance.studentSatisfaction || 4.6]}
              />
            </motion.div>

            {/* Primary Content Grid */}
            <div className="grid grid-cols-12 gap-6 lg:gap-8 items-start">
              
              {/* Left Column - 7/12 Width */}
              <div className="col-span-12 lg:col-span-7 space-y-6 lg:space-y-8">
                
                {/* SECTION 3: Class Performance */}
                <motion.div variants={itemVariants} className="bg-white rounded-[24px] border border-slate-200/70 p-6 shadow-sm">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">Academic Stream Matrix</h3>
                      <p className="text-xs text-slate-400">Granular comparative breakdown of active cohorts.</p>
                    </div>
                    <button className="text-xs font-semibold text-[#2F5D9F] hover:underline flex items-center gap-0.5">
                      Export Parameters <ArrowUpRight size={14} />
                    </button>
                  </div>
                  
                  <div className="space-y-5">
                    {dashboardData.classStats.map((cls, idx) => (
                      <ClassAnalyticsRow key={idx} {...cls} />
                    ))}
                  </div>
                </motion.div>

                {/* SECTION 4: Submissions Hub */}
                <motion.div variants={itemVariants} className="bg-white rounded-[24px] border border-slate-200/70 p-6 shadow-sm">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">Integrated Evaluation Pipeline</h3>
                      <p className="text-xs text-slate-400">Incoming student artifacts cross-referenced with validation urgency.</p>
                    </div>
                    <span className="text-[11px] font-bold tracking-wide uppercase px-2 py-1 bg-slate-100 rounded-md text-slate-500">
                      {dashboardData.recentSubmissions.length} Active Feeds
                    </span>
                  </div>

                  <div className="space-y-3">
                    {dashboardData.recentSubmissions.map((submission) => (
                      <IntegratedActivityCard key={submission.id} {...submission} />
                    ))}
                  </div>
                </motion.div>

                {/* SECTION 8: Brand New Advanced Insight Architecture */}
                <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-5 shadow-sm relative overflow-hidden">
                    <div className="absolute right-[-10px] bottom-[-10px] opacity-10 text-white">
                      <GraduationCap size={120} />
                    </div>
                    <span className="text-[9px] uppercase tracking-widest text-slate-400 font-bold block mb-1">Cohort Distribution Apex</span>
                    <h4 className="text-lg font-bold text-white tracking-tight">Class {insights?.bestClass} Leading</h4>
                    <p className="text-xs text-slate-300 mt-2 line-clamp-2">
                      Maintains an optimal baseline efficiency with an average index scoring of 15.2/20.
                    </p>
                    <div className="mt-4 flex items-center gap-1.5 text-[11px] font-medium text-emerald-400">
                      <CheckCircle size={12} /> Target profile achieved
                    </div>
                  </div>

                  <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <span className="text-[9px] uppercase tracking-widest text-slate-400 font-bold block">Anomaly Registry</span>
                        <span className="w-2 h-2 rounded-full bg-[#E55B2D] animate-ping" />
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 mt-1">Attendance Friction in {insights?.lowestAttendanceClass}</h4>
                      <p className="text-xs text-slate-500 mt-1">
                        Attendance indexes dipped to {dashboardData.classStats.find(c => c.name === insights?.lowestAttendanceClass)?.attendance || 89}% this cycle.
                      </p>
                    </div>
                    <button className="mt-4 w-full text-center py-1.5 border border-slate-200 hover:border-slate-300 rounded-xl text-xs font-semibold text-slate-700 transition-colors">
                      Initialize Intervention Packet
                    </button>
                  </div>
                </motion.div>

              </div>

              {/* Right Column - 5/12 Width */}
              <div className="col-span-12 lg:col-span-5 space-y-6 lg:space-y-8">
                
                {/* SECTION 7: Quick Command Actions */}
                <motion.div variants={itemVariants} className="bg-white rounded-[24px] border border-slate-200/70 p-6 shadow-sm">
                  <h3 className="text-sm font-bold text-slate-900 mb-4">Command Terminal</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <ActionButton icon={<FileText size={16} />} label="Create Homework" color="blue" />
                    <ActionButton icon={<Users size={16} />} label="Take Attendance" color="emerald" />
                    <ActionButton icon={<BarChart3 size={16} />} label="Manage Grades" color="purple" />
                    <ActionButton icon={<MessageSquare size={16} />} label="Announcement" color="orange" />
                  </div>
                </motion.div>

                {/* SECTION 5: Agenda Dispatch Timeline */}
                <motion.div variants={itemVariants} className="bg-white rounded-[24px] border border-slate-200/70 p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-slate-400" />
                      <h3 className="text-sm font-bold text-slate-900">Agenda Dispatch</h3>
                    </div>
                    <span className="text-[10px] font-bold text-[#2F5D9F] hover:underline cursor-pointer">View Schedule</span>
                  </div>

                  <div className="relative border-l border-slate-100 ml-3 space-y-5 py-1">
                    {dashboardData.upcomingEvents.map((event) => (
                      <TimelineItem key={event.id} {...event} />
                    ))}
                  </div>
                </motion.div>

                {/* SECTION 6: Leaderboard Frontrunners */}
                <motion.div variants={itemVariants} className="bg-white rounded-[24px] border border-slate-200/70 p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-5">
                    <Award size={16} className="text-amber-500" />
                    <h3 className="text-sm font-bold text-slate-900">Academic Frontrunners</h3>
                  </div>

                  <div className="space-y-3">
                    {dashboardData.topPerformers.map((student, rank) => (
                      <LeaderboardRow key={student.id} rank={rank + 1} {...student} />
                    ))}
                  </div>
                </motion.div>

              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

/* ==========================================
    SUB-COMPONENTS (REDESIGNED FOR 2026 SAAS)
   ========================================== */

const MetricCard = ({ icon, label, value, change, trend, sparklineColor, points }) => {
  const isUp = trend === "up";
  
  return (
    <motion.div 
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className="bg-white rounded-[20px] p-5 border border-slate-200/80 shadow-[0_2px_4px_rgba(0,0,0,0.02)] flex flex-col justify-between h-40"
    >
      <div className="flex justify-between items-start">
        <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
          {icon}
        </div>
        <div className={`flex items-center gap-0.5 text-[10px] font-bold px-2 py-0.5 rounded-full ${
          isUp ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
        }`}>
          {isUp ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
          {change}
        </div>
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <span className="block text-[11px] font-medium text-slate-400 tracking-wide">{label}</span>
          <h3 className="text-2xl font-bold text-slate-900 tracking-tight mt-0.5">{value}</h3>
        </div>
        
        {/* Micro Vector Sparkline Chart Mapping */}
        <div className="w-16 h-8 overflow-visible mb-1">
          <svg viewBox="0 0 60 30" className="w-full h-full overflow-visible">
            <polyline
              fill="none"
              stroke={sparklineColor}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={points.map((p, i) => `${(i * 12)}, ${30 - ((p - Math.min(...points)) / (Math.max(...points) - Math.min(...points) || 1) * 20 + 5)}`).join(' ')}
            />
          </svg>
        </div>
      </div>
    </motion.div>
  );
};

const ClassAnalyticsRow = ({ name, average, attendance, completion }) => {
  const normalizedGradePercent = (average / 20) * 100;

  return (
    <div className="p-4 rounded-xl border border-slate-100 hover:bg-slate-50/70 transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
            {name}
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-800">Cohort Group {name}</h4>
            <p className="text-[10px] text-slate-400">Core Evaluation Indexes</p>
          </div>
        </div>
        <div className="text-left sm:text-right">
          <span className="text-xs font-bold text-slate-900">{average} <span className="text-[10px] font-normal text-slate-400">/ 20 Mean</span></span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
        <div>
          <div className="flex justify-between text-[9px] text-slate-400 font-semibold mb-1">
            <span>GRADE SCORING</span>
            <span className="text-slate-700">{normalizedGradePercent.toFixed(0)}%</span>
          </div>
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: `${normalizedGradePercent}%` }} className="h-full bg-[#2F5D9F] rounded-full" />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-[9px] text-slate-400 font-semibold mb-1">
            <span>ATTENDANCE</span>
            <span className="text-slate-700">{attendance}%</span>
          </div>
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: `${attendance}%` }} className="h-full bg-emerald-500 rounded-full" />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-[9px] text-slate-400 font-semibold mb-1">
            <span>TASK DISPATCHED</span>
            <span className="text-slate-700">{completion}%</span>
          </div>
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: `${completion}%` }} className="h-full bg-purple-500 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

const IntegratedActivityCard = ({ student, assignment, submittedAt, status, grade, priority }) => {
  const isGraded = status === 'graded';
  const timeLabel = new Date(submittedAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3.5 rounded-xl border border-slate-100 hover:border-slate-200 bg-white transition-all gap-4">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#2F5D9F] to-slate-400 text-white font-bold text-xs flex items-center justify-center shadow-inner">
          {student.charAt(0)}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-800">{student}</span>
            {priority === 'high' && !isGraded && (
              <span className="text-[8px] font-bold bg-rose-50 text-rose-600 border border-rose-100 px-1.5 py-0.5 rounded-md uppercase tracking-wider">Urgent Review</span>
            )}
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">{assignment} • <span className="text-slate-300">{timeLabel}</span></p>
        </div>
      </div>

      <div className="self-end sm:self-auto">
        {isGraded ? (
          <div className="flex items-center gap-2 bg-emerald-50/60 border border-emerald-100 px-3 py-1 rounded-xl">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-xs font-bold text-emerald-800">{grade}/20</span>
          </div>
        ) : (
          <button className="flex items-center gap-1 bg-slate-900 hover:bg-slate-800 text-white px-3 py-1 rounded-xl text-xs font-semibold transition-colors shadow-sm">
            Grade File
          </button>
        )}
      </div>
    </div>
  );
};

const TimelineItem = ({ title, date, time, type }) => {
  const isMeeting = type === "meeting";
  const isDeadline = type === "deadline";
  
  let markerColor = "bg-[#2F5D9F]";
  let labelStyle = "bg-blue-50 text-[#2F5D9F] border-blue-100";
  if (isDeadline) {
    markerColor = "bg-[#E55B2D]";
    labelStyle = "bg-orange-50 text-[#E55B2D] border-orange-100";
  } else if (type === "event") {
    markerColor = "bg-purple-600";
    labelStyle = "bg-purple-50 text-purple-700 border-purple-100";
  }

  const isToday = date === "2026-06-03";

  return (
    <div className="relative pl-6 group">
      <div className={`absolute left-[-4.5px] top-1.5 w-2 h-2 rounded-full ring-4 ring-white ${markerColor} transition-transform group-hover:scale-125 z-10`} />
      
      <div className="flex items-start justify-between gap-4 p-1">
        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-xs font-bold text-slate-800 group-hover:text-[#2F5D9F] transition-colors">{title}</h4>
            {isToday && (
              <span className="text-[8px] font-black tracking-wider uppercase bg-slate-900 text-white px-1.5 py-0.5 rounded">TODAY</span>
            )}
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">{time} • {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
        </div>

        <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${labelStyle}`}>
          {type}
        </span>
      </div>
    </div>
  );
};

const LeaderboardRow = ({ rank, name, average, trend, class: className }) => {
  const rankColors = [
    "bg-amber-500/10 text-amber-600 border-amber-200",
    "bg-slate-400/10 text-slate-700 border-slate-200",
    "bg-amber-700/10 text-amber-800 border-amber-700/20"
  ];

  return (
    <div className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:bg-slate-50/50 transition-colors">
      <div className="flex items-center gap-3">
        <div className={`w-5 h-5 text-[10px] font-bold border rounded-md flex items-center justify-center ${rankColors[rank - 1] || 'bg-slate-50 text-slate-400'}`}>
          {rank}
        </div>
        <div>
          <h4 className="text-xs font-bold text-slate-800">{name}</h4>
          <p className="text-[10px] text-slate-400">{className}</p>
        </div>
      </div>
      <div className="text-right">
        <span className="text-xs font-bold text-slate-900 block">{average}/20</span>
        <span className="text-[9px] font-medium text-emerald-600">{trend} index</span>
      </div>
    </div>
  );
};

const ActionButton = ({ icon, label, color }) => {
  const scheme = {
    blue: "hover:bg-blue-50/80 hover:text-[#2F5D9F] hover:border-blue-200 text-slate-700",
    emerald: "hover:bg-emerald-50/80 hover:text-emerald-700 hover:border-emerald-200 text-slate-700",
    purple: "hover:bg-purple-50/80 hover:text-purple-700 hover:border-purple-200 text-slate-700",
    orange: "hover:bg-orange-50/80 hover:text-[#E55B2D] hover:border-orange-200 text-slate-700"
  };

  return (
    <motion.button 
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      className={`flex flex-col items-start gap-3 p-4 bg-white border border-slate-200 rounded-2xl transition-all text-left shadow-[0_1px_2px_rgba(0,0,0,0.01)] group w-full ${scheme[color]}`}
    >
      <div className="p-2 bg-slate-50 rounded-xl group-hover:bg-white border border-slate-100 transition-colors">
        {icon}
      </div>
      <span className="text-xs font-bold tracking-tight">{label}</span>
    </motion.button>
  );
};

export default TeacherDashboard;