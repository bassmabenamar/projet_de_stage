import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { 
  Download, ChevronLeft, ChevronRight, AlertTriangle, 
  Info, MoreVertical, TrendingUp, CheckCircle2, XCircle, Clock, RefreshCw,
  Filter, Calendar, FileText, User, Check, X, AlertCircle, Eye,
  Upload, File, Loader2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import Navbar from './Navbar';
import api from './api';

// ✅ Fonction de normalisation des statuts
const normalizeStatus = (status) => {
  const statusLower = (status || '').toLowerCase().trim();
  
  if (statusLower === 'présent' || statusLower === 'present' || statusLower === 'presente' || statusLower === 'present') {
    return 'Présent';
  }
  if (statusLower === 'absent' || statusLower === 'absence' || statusLower === 'abscence' || statusLower === 'abs') {
    return 'Absent';
  }
  if (statusLower === 'retard' || statusLower === 'late' || statusLower === 'en retard' || statusLower === 'ret') {
    return 'Retard';
  }
  return 'Présent'; // Valeur par défaut
};

const Attendance = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  // --- State Management ---
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState('Octobre 2024');
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState('Tous');
  const [selectedDate, setSelectedDate] = useState(null);
  const [showJustifyModal, setShowJustifyModal] = useState(false);
  const [justifyReason, setJustifyReason] = useState('');
  const [justifyingId, setJustifyingId] = useState(null);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [leaveData, setLeaveData] = useState({
    startDate: '',
    endDate: '',
    reason: '',
    type: 'maladie'
  });
  const [leaveFile, setLeaveFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingMedical, setUploadingMedical] = useState(false);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await api.get('/student/attendance');
        const attendanceArray = (response.data?.data || []).map(item => ({
          ...item,
          statut: normalizeStatus(item.statut) // ✅ Normalisation des statuts
        }));
        console.log('Données de présence chargées:', attendanceArray);
        setAttendanceData(attendanceArray);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors du chargement de présence:", error);
        setAttendanceData([]);
        setLoading(false);
      }
    };
    fetchAttendance();
  }, []);

  // ✅ Calcul des stats dynamiques avec normalisation
  const stats = {
    present: attendanceData.filter(a => a.statut === 'Présent').length,
    absent: attendanceData.filter(a => a.statut === 'Absent').length,
    retard: attendanceData.filter(a => a.statut === 'Retard').length,
    total: attendanceData.length
  };

  const attendancePercentage = stats.total > 0 
    ? Math.round((stats.present / stats.total) * 100) 
    : 0;

  // ✅ Filtrer les données correctement
  const filteredData = attendanceData.filter(item => {
    if (filterStatus === 'Tous') return true;
    return item.statut === filterStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Demander un justificatif pour absence/retard
  const requestJustification = async (id) => {
    if (!justifyReason.trim()) {
      alert('Veuillez entrer une raison');
      return;
    }
    
    setSubmitting(true);
    try {
      await api.post(`/student/attendance/${id}/justify`, { reason: justifyReason });
      alert('Demande de justificatif envoyée avec succès');
      setShowJustifyModal(false);
      setJustifyReason('');
      setJustifyingId(null);
      const response = await api.get('/student/attendance');
      const attendanceArray = (response.data?.data || []).map(item => ({
        ...item,
        statut: normalizeStatus(item.statut)
      }));
      setAttendanceData(attendanceArray);
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de l\'envoi du justificatif');
    } finally {
      setSubmitting(false);
    }
  };

  // Demander un congé
  const requestLeave = async () => {
    if (!leaveData.startDate || !leaveData.endDate || !leaveData.reason) {
      alert('Veuillez remplir tous les champs');
      return;
    }
    
    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('start_date', leaveData.startDate);
      formData.append('end_date', leaveData.endDate);
      formData.append('reason', leaveData.reason);
      formData.append('type', leaveData.type);
      if (leaveFile) {
        formData.append('file', leaveFile);
      }
      
      await api.post('/student/leave-request', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Demande de congé envoyée avec succès');
      setShowLeaveModal(false);
      setLeaveData({ startDate: '', endDate: '', reason: '', type: 'maladie' });
      setLeaveFile(null);
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de l\'envoi de la demande');
    } finally {
      setSubmitting(false);
    }
  };

  // Télécharger justificatif médical
  const uploadMedicalCertificate = async () => {
    if (!fileInputRef.current?.files[0]) {
      alert('Veuillez sélectionner un fichier');
      return;
    }
    
    setUploadingMedical(true);
    try {
      const absenceRecord = attendanceData.find(a => a.statut !== 'Présent');
      
      if (!absenceRecord) {
        alert('Aucune absence trouvée à justifier');
        setUploadingMedical(false);
        return;
      }
      
      const formData = new FormData();
      formData.append('file', fileInputRef.current.files[0]);
      formData.append('presence_id', absenceRecord.id);
      
      await api.post('/student/upload-medical-certificate', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      alert('Justificatif médical téléchargé avec succès');
      const attendanceResponse = await api.get('/student/attendance');
      const attendanceArray = (attendanceResponse.data?.data || []).map(item => ({
        ...item,
        statut: normalizeStatus(item.statut)
      }));
      setAttendanceData(attendanceArray);
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur: ' + (error.response?.data?.message || error.message));
    } finally {
      setUploadingMedical(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // Exporter les données
  const exportAttendance = () => {
    const csvContent = [
      ['Date', 'Heure entrée', 'Heure sortie', 'Statut', 'Remarque'],
      ...attendanceData.map(item => [
        new Date(item.date).toLocaleDateString('fr-FR'),
        item.heure_entree || '08:00',
        item.heure_sortie || '16:00',
        item.statut,
        item.remarque || ''
      ])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `presence_${new Date().toLocaleDateString()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Voir le registre complet
  const viewFullRegistry = () => {
    setFilterStatus('Tous');
    setCurrentPage(1);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0, scale: 0.98 },
    visible: { 
      y: 0, 
      opacity: 1, 
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 18 } 
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC]">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
          <RefreshCw size={40} className="text-[#002366]" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full bg-[#F8FAFC] font-sans text-[#1E293B] antialiased">
      <main className="flex-1 w-full flex flex-col overflow-x-hidden">
        <Navbar />

        <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-[1500px] mx-auto w-full"
          >
            {/* Header Section */}
            <motion.div variants={cardVariants} className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
              <div className="space-y-1">
                <h1 className="text-3xl md:text-[36px] font-black text-[#002366] tracking-tight">Registre de Présence</h1>
                <p className="text-slate-400 font-bold text-base md:text-lg">Votre assiduité académique pour le semestre actuel.</p>
              </div>
              <div className="flex flex-wrap gap-4 w-full md:w-auto">
                <motion.button 
                  whileHover={{ scale: 1.05, backgroundColor: "#FFF7ED", color: "#EA580C", borderColor: "#FED7AA" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={exportAttendance}
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3.5 bg-white border border-slate-200 rounded-[18px] text-[11px] font-black text-slate-500 shadow-sm uppercase tracking-widest transition-all"
                >
                  <Download size={16} /> Exporter
                </motion.button>
                
                <motion.button 
                  whileHover={{ scale: 1.05, backgroundColor: "#1E40AF" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/my-leave-requests')}
                  className="flex-1 md:flex-none px-8 py-3.5 bg-[#002366] text-white rounded-[18px] text-[11px] font-black shadow-lg uppercase tracking-[0.2em] transition-all"
                >
                  <Calendar size={16} className="inline mr-2" /> Mes Congés
                </motion.button>
                
                <motion.button 
                  whileHover={{ scale: 1.05, backgroundColor: "#1E40AF" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowLeaveModal(true)}
                  className="flex-1 md:flex-none px-8 py-3.5 bg-[#002366] text-white rounded-[18px] text-[11px] font-black shadow-lg uppercase tracking-[0.2em] transition-all"
                >
                  Nouveau Congé
                </motion.button>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10">
              {/* Circular Chart */}
              <motion.div variants={cardVariants} className="md:col-span-12 lg:col-span-3 bg-white rounded-[35px] md:rounded-[45px] p-8 md:p-10 border border-slate-50 shadow-xl shadow-slate-200/30 flex flex-col items-center justify-center text-center group transition-all hover:border-orange-100">
                <div className="relative w-32 h-32 md:w-40 md:h-40 mb-6 md:mb-8">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="50%" cy="50%" r="45%" stroke="#F1F5F9" strokeWidth="10" fill="transparent" />
                    <motion.circle 
                      cx="50%" cy="50%" r="45%" stroke="#002366" strokeWidth="10" fill="transparent" 
                      strokeDasharray="283"
                      initial={{ strokeDashoffset: 283 }}
                      animate={{ strokeDashoffset: 283 * (1 - attendancePercentage / 100) }}
                      transition={{ duration: 2, ease: "circOut" }}
                      className="group-hover:stroke-orange-500 transition-colors duration-500"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl md:text-4xl font-black text-[#002366] group-hover:text-orange-600">{attendancePercentage}%</span>
                  </div>
                </div>
                <h3 className="font-black text-[#002366] text-lg md:text-xl mb-1">{attendancePercentage > 90 ? 'Excellent !' : attendancePercentage > 70 ? 'Bon travail' : 'À améliorer'}</h3>
                <p className="text-slate-400 text-xs md:text-sm font-bold">Assiduité globale.</p>
              </motion.div>

              {/* Stat Cards Grid */}
              <div className="md:col-span-12 lg:col-span-9 flex flex-col gap-8">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
                  <StatCard icon={<CheckCircle2 className="text-green-500"/>} val={stats.present} label="Présent" variants={cardVariants} onClick={() => setFilterStatus('Présent')} />
                  <StatCard icon={<XCircle className="text-rose-500"/>} val={stats.absent} label="Absent" variants={cardVariants} onClick={() => setFilterStatus('Absent')} />
                  <StatCard icon={<Clock className="text-amber-500"/>} val={stats.retard} label="Retard" variants={cardVariants} onClick={() => setFilterStatus('Retard')} />
                </div>
                
                {/* Trend Bar Chart */}
                <motion.div variants={cardVariants} className="bg-white rounded-[35px] md:rounded-[40px] p-6 md:p-8 border border-slate-50 shadow-xl shadow-slate-200/30 flex flex-col md:flex-row items-center justify-between group hover:border-orange-100 transition-all gap-8">
                  <div className="w-full">
                    <h4 className="text-[10px] md:text-[11px] font-black text-slate-300 uppercase tracking-[0.25em] mb-6 text-center md:text-left">Tendance Récente</h4>
                    <div className="flex items-end justify-center md:justify-start gap-3 md:gap-4 h-20">
                      {[40, 70, 55, 85, 65, 100].map((h, i) => (
                        <motion.div 
                          key={i} 
                          initial={{ height: 0 }} 
                          animate={{ height: `${h}%` }} 
                          transition={{ delay: 0.5 + (i*0.1), type: "spring" }}
                          className={`w-8 md:w-14 rounded-xl transition-all duration-500 ${i === 5 ? 'bg-[#002366] group-hover:bg-orange-500' : 'bg-slate-100 group-hover:bg-orange-50'}`} 
                        />
                      ))}
                    </div>
                  </div>
                  <div className="text-center md:text-right shrink-0">
                    <div className="flex items-center justify-center md:justify-end gap-2 text-green-500 font-black text-lg mb-1">
                      <TrendingUp size={20} /> +2.4%
                    </div>
                    <p className="text-slate-300 text-[9px] font-black uppercase tracking-widest">vs mois dernier</p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Middle Section: Calendar & Alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
              <motion.div variants={cardVariants} className="col-span-1 lg:col-span-8 bg-white rounded-[35px] md:rounded-[50px] p-6 md:p-12 border border-slate-50 shadow-xl shadow-slate-200/30 overflow-x-auto">
                <div className="flex justify-between items-center mb-8 md:mb-10 min-w-[300px]">
                  <h3 className="text-xl md:text-2xl font-black text-[#002366]">{currentMonth}</h3>
                  <div className="flex gap-2">
                    <button className="p-2 md:p-2.5 hover:bg-orange-50 hover:text-orange-600 rounded-xl transition-all"><ChevronLeft size={22}/></button>
                    <button className="p-2 md:p-2.5 hover:bg-orange-50 hover:text-orange-600 rounded-xl transition-all"><ChevronRight size={22}/></button>
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-y-4 md:gap-y-8 text-center min-w-[350px]">
                  {['LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM', 'DIM'].map(d => (
                    <div key={d} className="text-[9px] md:text-[10px] font-black text-slate-300 tracking-[0.2em]">{d}</div>
                  ))}
                  {Array.from({length: 31}).map((_, i) => {
                    const day = i + 1;
                    const attendance = attendanceData.find(a => new Date(a.date).getDate() === day);
                    let statusColor = '';
                    if (attendance?.statut === 'Présent') statusColor = 'bg-green-50 text-green-600 border-green-200';
                    else if (attendance?.statut === 'Absent') statusColor = 'bg-rose-50 text-rose-600 border-rose-200';
                    else if (attendance?.statut === 'Retard') statusColor = 'bg-amber-50 text-amber-600 border-amber-200';
                    
                    return (
                      <motion.div 
                        key={i} 
                        whileHover={{ scale: 1.1, backgroundColor: "#FFF7ED", color: "#EA580C" }}
                        onClick={() => setSelectedDate(day)}
                        className={`aspect-square flex items-center justify-center rounded-xl md:rounded-[20px] cursor-pointer font-black text-xs md:text-sm transition-all border-2 border-transparent ${statusColor || (day === 13 ? 'bg-blue-50 text-[#002366] border-blue-100' : 'text-slate-400')}`}
                      >
                        {day}
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              <div className="col-span-1 lg:col-span-4 flex flex-col gap-8">
                <motion.div variants={cardVariants} className="bg-white rounded-[35px] md:rounded-[45px] p-8 md:p-10 border border-slate-50 shadow-xl shadow-slate-200/30">
                  <h4 className="text-[10px] md:text-[11px] font-black text-slate-300 uppercase tracking-[0.25em] mb-6 md:mb-8">Alertes</h4>
                  <div className="space-y-4 md:space-y-6">
                    {attendanceData.some(a => a.statut === 'Retard') && (
                      <AlertBox 
                        color="bg-amber-50" 
                        icon={<AlertTriangle className="text-amber-600" size={18}/>} 
                        title="Arrivée Tardive" 
                        sub="Justifiez votre retard" 
                        action="Justifier"
                        onAction={() => { setShowJustifyModal(true); setJustifyingId(attendanceData.find(a => a.statut === 'Retard')?.id); }}
                      />
                    )}
                    {attendanceData.some(a => a.statut === 'Absent') && (
                      <AlertBox 
                        color="bg-rose-50" 
                        icon={<FileText className="text-rose-600" size={18}/>} 
                        title="Justificatif d'absence" 
                        sub="Téléchargez votre justificatif médical"
                        action="Télécharger"
                        onAction={() => fileInputRef.current?.click()}
                      />
                    )}
                    <input 
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept=".pdf,.jpg,.png"
                      onChange={uploadMedicalCertificate}
                    />
                  </div>
                </motion.div>

                <motion.div variants={cardVariants} className="bg-[#002366] rounded-[35px] md:rounded-[45px] p-8 md:p-10 text-white shadow-2xl shadow-blue-900/40 relative overflow-hidden group cursor-pointer" onClick={() => navigate('/attendance/stats')}>
                  <div className="relative z-10 flex justify-between gap-4">
                    <div>
                      <div className="text-3xl md:text-4xl font-black mb-1 group-hover:text-orange-400 transition-colors">100%</div>
                      <div className="text-[9px] font-black opacity-60 uppercase tracking-widest">Physique</div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl md:text-4xl font-black mb-1 group-hover:text-orange-400 transition-colors">88%</div>
                      <div className="text-[9px] font-black opacity-60 uppercase tracking-widest">Mathématiques</div>
                    </div>
                  </div>
                  <div className="absolute -right-10 -bottom-10 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:bg-orange-500/20 transition-all duration-700" />
                </motion.div>
              </div>
            </div>

            {/* Bottom Table Section */}
            <motion.div variants={cardVariants} className="bg-white rounded-[35px] md:rounded-[50px] border border-slate-50 shadow-xl shadow-slate-200/30 overflow-hidden mb-10">
              <div className="p-6 md:p-10 flex flex-col sm:flex-row justify-between items-center border-b border-slate-50 gap-4">
                <h3 className="text-xl md:text-2xl font-black text-[#002366]">Historique</h3>
                <div className="flex gap-3">
                  <select 
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="text-[10px] font-black text-slate-400 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100 cursor-pointer"
                  >
                    <option value="Tous">📋 Tous</option>
                    <option value="Présent">✅ Présent</option>
                    <option value="Absent">❌ Absent</option>
                    <option value="Retard">⏰ Retard</option>
                  </select>
                  <motion.button 
                    whileHover={{ x: 5 }} 
                    onClick={viewFullRegistry}
                    className="text-[10px] font-black text-slate-400 bg-slate-50 px-5 py-2.5 rounded-2xl hover:text-orange-600 uppercase tracking-widest"
                  >
                    Registre Complet
                  </motion.button>
                </div>
              </div>
              
              <div className="overflow-x-auto w-full no-scrollbar">
                <table className="w-full text-left border-separate border-spacing-y-2 min-w-[600px]">
                  <thead className="bg-slate-50/30 text-[9px] md:text-[10px] font-black text-slate-300 uppercase tracking-[0.25em]">
                    <tr>
                      <th className="px-6 md:px-10 py-6">Date</th>
                      <th className="py-6 text-center">Entrée / Sortie</th>
                      <th className="py-6">Statut</th>
                      <th className="py-6">Remarque</th>
                      <th className="px-6 md:px-10 py-6 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm md:text-base font-bold text-slate-600">
                    {paginatedData.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="text-center py-12 text-slate-400">
                          Aucune donnée de présence disponible
                        </td>
                      </tr>
                    ) : (
                      paginatedData.map((row, idx) => (
                        <motion.tr 
                          key={row.id || idx} 
                          whileHover={{ backgroundColor: "#FFF7ED", x: 5 }} 
                          className="group transition-all cursor-pointer border-l-4 border-transparent hover:border-orange-500"
                        >
                          <td className="px-6 md:px-10 py-6 text-[#002366] font-black text-xs md:text-sm">
                            {new Date(row.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}
                          </td>
                          <td className="py-6 text-slate-400 text-center text-xs">
                            {row.heure_entree || '08:00'} - {row.heure_sortie || '16:00'}
                          </td>
                          <td className="py-6">
                            <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest ${
                              row.statut === 'Présent' ? 'bg-green-50 text-green-600' : 
                              row.statut === 'Retard' ? 'bg-amber-50 text-amber-600' : 'bg-rose-50 text-rose-600'
                            }`}>
                              {row.statut === 'Présent' ? '✓ Présent' : row.statut === 'Retard' ? '⏰ Retard' : '✗ Absent'}
                            </span>
                          </td>
                          <td className="py-6 text-slate-400 text-xs truncate max-w-[100px]">{row.remarque || '---'}</td>
                          <td className="px-6 md:px-10 py-6 text-right">
                            {row.statut !== 'Présent' && (
                              <button 
                                onClick={() => { setShowJustifyModal(true); setJustifyingId(row.id); }}
                                className="text-orange-500 hover:text-orange-700 text-[9px] font-black uppercase tracking-widest"
                              >
                                Justifier
                              </button>
                            )}
                            <MoreVertical size={20} className="inline ml-2 text-slate-200 group-hover:text-orange-500 transition-colors"/>
                          </td>
                        </motion.tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 py-6">
                  <button 
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="w-8 h-8 rounded-lg bg-slate-100 text-slate-500 disabled:opacity-50"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button 
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-8 h-8 rounded-lg text-xs font-black ${currentPage === i + 1 ? 'bg-[#002366] text-white' : 'bg-slate-100 text-slate-400'}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button 
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="w-8 h-8 rounded-lg bg-slate-100 text-slate-500 disabled:opacity-50"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </main>

      {/* Modal Justificatif */}
      {showJustifyModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl max-w-md w-full p-8"
          >
            <h3 className="text-2xl font-black text-[#002366] mb-4">Justifier une absence</h3>
            <textarea
              value={justifyReason}
              onChange={(e) => setJustifyReason(e.target.value)}
              placeholder="Veuillez expliquer la raison de votre absence..."
              className="w-full p-4 border border-slate-200 rounded-2xl min-h-[150px] focus:outline-none focus:border-orange-500 mb-6"
            />
            <div className="flex gap-3">
              <button 
                onClick={() => setShowJustifyModal(false)}
                className="flex-1 py-3 bg-slate-100 text-slate-500 rounded-xl font-black"
              >
                Annuler
              </button>
              <button 
                onClick={() => requestJustification(justifyingId)}
                disabled={submitting}
                className="flex-1 py-3 bg-[#002366] text-white rounded-xl font-black disabled:opacity-50"
              >
                {submitting ? <Loader2 size={16} className="animate-spin mx-auto" /> : 'Envoyer'}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Modal Demande de Congé */}
      {showLeaveModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl max-w-md w-full p-8"
          >
            <h3 className="text-2xl font-black text-[#002366] mb-4">Demande de Congé</h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">
                  Date de début
                </label>
                <input 
                  type="date"
                  value={leaveData.startDate}
                  onChange={(e) => setLeaveData({...leaveData, startDate: e.target.value})}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:border-orange-500"
                />
              </div>
              
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">
                  Date de fin
                </label>
                <input 
                  type="date"
                  value={leaveData.endDate}
                  onChange={(e) => setLeaveData({...leaveData, endDate: e.target.value})}
                  min={leaveData.startDate || new Date().toISOString().split('T')[0]}
                  className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:border-orange-500"
                />
              </div>
              
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">
                  Type de congé
                </label>
                <select 
                  value={leaveData.type}
                  onChange={(e) => setLeaveData({...leaveData, type: e.target.value})}
                  className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:border-orange-500"
                >
                  <option value="maladie">Maladie</option>
                  <option value="personnel">Personnel</option>
                  <option value="familial">Familial</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
              
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">
                  Raison
                </label>
                <textarea 
                  value={leaveData.reason}
                  onChange={(e) => setLeaveData({...leaveData, reason: e.target.value})}
                  placeholder="Expliquez la raison de votre demande..."
                  className="w-full p-3 border border-slate-200 rounded-xl min-h-[100px] focus:outline-none focus:border-orange-500"
                />
              </div>
              
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">
                  Justificatif (PDF, JPG, PNG)
                </label>
                <input 
                  type="file"
                  onChange={(e) => setLeaveFile(e.target.files[0])}
                  accept=".pdf,.jpg,.png"
                  className="w-full p-2 border border-slate-200 rounded-xl"
                />
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button 
                onClick={() => setShowLeaveModal(false)}
                className="flex-1 py-3 bg-slate-100 text-slate-500 rounded-xl font-black"
              >
                Annuler
              </button>
              <button 
                onClick={requestLeave}
                disabled={submitting}
                className="flex-1 py-3 bg-[#002366] text-white rounded-xl font-black disabled:opacity-50"
              >
                {submitting ? <Loader2 size={16} className="animate-spin mx-auto" /> : 'Envoyer la demande'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

// Helper Components 
const StatCard = ({ icon, val, label, variants, onClick }) => (
  <motion.div 
    variants={variants}
    whileHover={{ y: -10, scale: 1.02, borderColor: "#FED7AA" }}
    onClick={onClick}
    className="bg-white p-6 md:p-10 rounded-[35px] border border-slate-50 shadow-xl shadow-slate-200/30 flex items-center gap-6 md:gap-8 group transition-all h-full cursor-pointer"
  >
    <motion.div 
      whileHover={{ rotate: 360, scale: 1.1 }}
      className="p-4 md:p-5 rounded-[20px] md:rounded-[25px] bg-slate-50 group-hover:bg-orange-50 transition-colors shrink-0"
    >
      {icon}
    </motion.div>
    <div className="min-w-0">
      <div className="text-2xl md:text-3xl font-black text-[#002366] group-hover:text-orange-600 transition-colors leading-none mb-2">{val}</div>
      <div className="text-[10px] md:text-[11px] font-black text-slate-300 uppercase tracking-widest truncate">{label}</div>
    </div>
  </motion.div>
);

const AlertBox = ({ color, icon, title, sub, action, onAction }) => (
  <motion.div 
    whileHover={{ scale: 1.03, x: 5 }}
    className={`${color} p-5 md:p-6 rounded-[25px] md:rounded-[30px] flex gap-4 transition-all border border-transparent hover:border-orange-200`}
  >
    <div className="mt-1 shrink-0">{icon}</div>
    <div className="min-w-0">
      <h5 className="text-xs md:text-sm font-black text-[#002366] mb-1 truncate">{title}</h5>
      <p className="text-[10px] font-bold text-slate-500/80 leading-tight mb-2">{sub}</p>
      {action && (
        <button 
          onClick={onAction}
          className="text-[9px] font-black text-[#002366] underline hover:text-orange-600 uppercase tracking-widest"
        >
          {action}
        </button>
      )}
    </div>
  </motion.div>
);

export default Attendance;