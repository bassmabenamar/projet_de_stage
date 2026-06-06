import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, CheckCircle, AlertCircle, Upload, 
  FileText, ExternalLink, ChevronRight, MoreVertical,
  Filter, Clock, ArrowRight, Users, Download, Eye
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import Navbar from './Navbar';
import api from './api';

const Homework = () => {
  const navigate = useNavigate();
  
  const [homeworks, setHomeworks] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Toutes les tâches');
  const [sortBy, setSortBy] = useState('date');
  const [downloadingId, setDownloadingId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Charger les devoirs
        const homeworksRes = await api.get('/student/homeworks');
        const homeworksData = homeworksRes.data?.data || [];
        setHomeworks(homeworksData);
        
        // Charger les soumissions
        const submissionsRes = await api.get('/student/homework/submissions');
        const submissionsData = submissionsRes.data?.data || [];
        setSubmissions(submissionsData);
        
        setLoading(false);
      } catch (error) {
        console.error("Erreur fetching:", error);
        setHomeworks([]);
        setSubmissions([]);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getFilteredHomeworks = () => {
    // Ajouter le status basé sur les soumissions
    let filtered = homeworks.map(hw => {
      const submitted = submissions.some(s => s.devoir_id === hw.id);
      return { ...hw, status: submitted ? 'submitted' : 'pending' };
    });
    
    if (activeTab === 'En attente') {
      filtered = filtered.filter(hw => hw.status !== 'submitted');
    } else if (activeTab === 'Soumis') {
      filtered = filtered.filter(hw => hw.status === 'submitted');
    }
    
    if (sortBy === 'date') {
      filtered.sort((a, b) => {
        const dateA = new Date(a.DateDev || a.date_limite || a.created_at);
        const dateB = new Date(b.DateDev || b.date_limite || b.created_at);
        return dateA - dateB;
      });
    } else if (sortBy === 'progress') {
      filtered.sort((a, b) => {
        const progressA = a.status === 'submitted' ? 100 : 10;
        const progressB = b.status === 'submitted' ? 100 : 10;
        return progressB - progressA;
      });
    }
    
    return filtered;
  };

  const filteredHomeworks = getFilteredHomeworks();
  const pendingCount = homeworks.filter(hw => {
    const submitted = submissions.some(s => s.devoir_id === hw.id);
    return !submitted;
  }).length;
  const submittedCount = submissions.length;
  const urgentCount = homeworks.filter(hw => {
    const deadline = new Date(hw.DateDev || hw.date_limite || hw.created_at);
    const today = new Date();
    const diffDays = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
    return diffDays <= 2 && diffDays >= 0;
  }).length;

  const formatDate = (dateString) => {
    if (!dateString) return 'Date non définie';
    try {
      return new Date(dateString).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
    } catch (error) {
      return 'Date invalide';
    }
  };

  // Téléchargement PDF direct depuis storage
  const downloadHomeworkPDF = async (homework) => {
    setDownloadingId(homework.id);
    try {
      const filePath = homework.file_path || homework.pdf_path;
      
      if (!filePath) {
        alert('Aucun PDF disponible pour ce devoir.');
        setDownloadingId(null);
        return;
      }
      
      let fileUrl = `http://127.0.0.1:8000/storage/${filePath}`;
      console.log('Téléchargement PDF:', fileUrl);
      window.open(fileUrl, '_blank');
      
    } catch (error) {
      console.error('Erreur téléchargement:', error);
      alert('Erreur lors du téléchargement du PDF');
    } finally {
      setDownloadingId(null);
    }
  };

  const springConfig = { type: "spring", stiffness: 200, damping: 20, mass: 1 };
  
  const containerVars = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.08, delayChildren: 0.1 } 
    }
  };

  const cardTransition = {
    hidden: { y: 30, opacity: 0, scale: 0.98 },
    visible: { y: 0, opacity: 1, scale: 1, transition: springConfig }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC]">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="text-[#002366]">
          <Clock size={48} />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans text-[#1E293B] antialiased selection:bg-orange-100">
      <main className="flex-1 overflow-y-auto pb-20">
        <Navbar />

        <motion.div 
          variants={containerVars}
          initial="hidden"
          animate="visible"
          className="p-6 md:p-10 max-w-[1550px] mx-auto"
        >
          {/* Header Section */}
          <motion.div variants={cardTransition} className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div className="space-y-2">
              <motion.h2 
                initial={{ x: -20 }}
                animate={{ x: 0 }}
                className="text-[36px] md:text-[42px] font-black text-[#002366] tracking-tight leading-none"
              >
                Devoirs
              </motion.h2>
              <p className="text-slate-400 font-bold text-base md:text-lg">Gérez vos tâches académiques et suivez votre progression.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-6 w-full md:w-auto">
              <motion.button 
                whileHover={{ scale: 1.05, backgroundColor: '#f1f5f9' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/my-submissions')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 bg-transparent border border-[#002366] rounded-[22px] text-[11px] font-black text-[#002366] hover:bg-[#002366] hover:text-white transition-all shadow-sm uppercase tracking-widest"
              >
                <FileText size={14} /> Mes Soumissions
              </motion.button>
              
              <div className="flex items-center gap-4 bg-white/40 p-2 rounded-[24px] backdrop-blur-sm border border-white/50 w-full sm:w-auto">
                <div className="flex bg-white shadow-inner p-1.5 rounded-[20px] border border-slate-100 w-full">
                  {['Toutes les tâches', 'En attente', 'Soumis'].map((tab) => (
                    <motion.button 
                      key={tab}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 px-4 md:px-8 py-3 rounded-[16px] text-[10px] md:text-[11px] font-black uppercase tracking-widest transition-all ${
                        activeTab === tab 
                          ? 'bg-[#002366] text-white shadow-xl shadow-blue-900/20' 
                          : 'bg-transparent text-[#002366] hover:bg-[#002366] hover:text-white'
                      }`}
                    >
                      {tab}
                    </motion.button>
                  ))}
                </div>
              </div>

              <motion.button 
                whileTap={{ scale: 0.95 }}
                onClick={() => setSortBy(sortBy === 'date' ? 'progress' : 'date')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 bg-transparent border border-[#002366] rounded-[22px] text-[11px] font-black text-[#002366] hover:bg-[#002366] hover:text-white transition-all shadow-sm uppercase tracking-widest"
              >
                <Filter size={14} /> {sortBy === 'date' ? 'Trier par échéance' : 'Trier par progression'}
              </motion.button>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <StatCard 
              icon={<BookOpen size={28}/>} 
              label="Devoirs en attente" 
              value={pendingCount.toString().padStart(2, '0')} 
              sub="CETTE SEMAINE" 
              color="text-blue-600" 
              bg="bg-blue-50" 
              onClick={() => setActiveTab('En attente')}
            />
            <StatCard 
              icon={<CheckCircle size={28}/>} 
              label="Tâches soumises" 
              value={submittedCount.toString().padStart(2, '0')} 
              sub="TERMINÉ" 
              color="text-green-600" 
              bg="bg-green-50" 
              onClick={() => setActiveTab('Soumis')}
            />
            <StatCard 
              icon={<AlertCircle size={28}/>} 
              label="Échéance aujourd'hui" 
              value={urgentCount.toString().padStart(2, '0')} 
              sub="URGENT" 
              color="text-orange-600" 
              bg="bg-orange-50" 
              onClick={() => setSortBy('date')}
            />
          </div>

          {/* Assignments Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {filteredHomeworks.map((hw, index) => {
              const deadlineDate = new Date(hw.DateDev || hw.date_limite || hw.created_at);
              const today = new Date();
              const isUrgent = (deadlineDate - today) / (1000 * 60 * 60 * 24) <= 2;
              const isSubmitted = hw.status === 'submitted';
              
              return (
                <HomeworkCard 
                  key={hw.id || index}
                  id={hw.id}
                  status={isSubmitted ? 'Soumis' : 'En attente'}
                  dueText={isUrgent ? 'URGENT' : ''}
                  title={hw.titre || hw.title || 'Sans titre'}
                  professor={hw.matiere ? hw.matiere.nom : (hw.professeur_nom || 'Professeur')}
                  deadline={formatDate(hw.DateDev || hw.date_limite || hw.created_at)}
                  progress={isSubmitted ? 100 : 30}
                  isUrgent={isUrgent}
                  isSubmitted={isSubmitted}
                  navigate={navigate}
                  onDownloadPDF={() => downloadHomeworkPDF(hw)}
                  isDownloading={downloadingId === hw.id}
                  hasFile={!!(hw.file_path || hw.pdf_path)}
                />
              );
            })}

            {filteredHomeworks.length === 0 && (
              <motion.div 
                variants={cardTransition}
                className="col-span-full bg-white/30 border-4 border-dashed border-slate-100 rounded-[55px] flex flex-col items-center justify-center p-12 text-center group min-h-[400px]"
              >
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-xl mb-6">
                  <Clock className="text-slate-300" size={32} />
                </div>
                <h4 className="text-2xl font-black text-[#002366] mb-2">Aucun devoir</h4>
                <p className="text-slate-400 font-bold text-sm">
                  {activeTab === 'Toutes les tâches' ? 'Aucun devoir trouvé.' : 
                   activeTab === 'En attente' ? 'Aucun devoir en attente.' : 
                   'Aucun devoir soumis.'}
                </p>
              </motion.div>
            )}
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-12 gap-10 mt-12">
            <motion.div 
              variants={cardTransition}
              whileHover={{ y: -10, scale: 1.01 }}
              className="col-span-12 lg:col-span-8 bg-[#002366] rounded-[50px] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl shadow-blue-900/30 group"
            >
              <div className="relative z-10">
                <h3 className="text-3xl md:text-4xl font-black mb-6 tracking-tight">Rappel du règlement académique</h3>
                <p className="text-blue-200/60 font-bold text-base md:text-lg max-w-2xl mb-10 leading-relaxed">
                  N'oubliez pas que tous les devoirs doivent être soumis via le portail avant la date limite spécifiée. 
                </p>
                <motion.button 
                  whileHover={{ gap: "25px" }}
                  onClick={() => navigate('/guide')}
                  className="flex items-center gap-4 px-10 py-5 bg-white/10 hover:bg-white/20 rounded-[22px] font-black text-xs uppercase tracking-[0.3em] transition-all border border-white/10 backdrop-blur-md"
                >
                  Lire le guide du règlement <ArrowRight size={20} />
                </motion.button>
              </div>
              <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-blue-400/20 rounded-full blur-[100px]" />
            </motion.div>

            <motion.div 
              variants={cardTransition}
              whileHover={{ y: -10 }}
              className="col-span-12 lg:col-span-4 bg-white border border-slate-100 rounded-[50px] p-10 shadow-xl flex flex-col justify-between min-h-[350px]"
            >
              <div className="flex items-start justify-between">
                <div className="w-24 h-24 bg-[#0F172A] rounded-[30px] flex items-center justify-center shadow-2xl rotate-3">
                  <div className="text-white text-center">
                    <div className="font-black text-lg">Amity</div>
                    <div className="text-[6px] uppercase tracking-[0.4em] opacity-40">Support</div>
                  </div>
                </div>
                <div className="bg-orange-50 p-3 rounded-2xl text-orange-500"><Clock size={24}/></div>
              </div>
              <div>
                <h4 className="font-black text-2xl text-[#002366] mb-3">Besoin d'aide ?</h4>
                <div className="space-y-3">
                  <motion.button 
                    whileHover={{ x: 10 }} 
                    onClick={() => navigate('/library')}
                    className="w-full py-4 px-6 bg-slate-50 hover:bg-[#002366] hover:text-white rounded-2xl text-[10px] font-black uppercase tracking-widest text-left flex justify-between items-center group transition-all"
                  >
                    Bibliothèque Numérique <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.button>
                  <motion.button 
                    whileHover={{ x: 10 }} 
                    onClick={() => navigate('/tutorials')}
                    className="w-full py-4 px-6 bg-slate-50 hover:bg-[#002366] hover:text-white rounded-2xl text-[10px] font-black uppercase tracking-widest text-left flex justify-between items-center group transition-all"
                  >
                    Tutoriels Vidéo <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

const StatCard = ({ icon, label, value, sub, color, bg, onClick }) => (
  <motion.div 
    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
    whileHover={{ y: -12, scale: 1.02 }}
    onClick={onClick}
    className="bg-white p-8 md:p-10 rounded-[45px] border border-slate-50 shadow-xl flex items-center justify-between group cursor-pointer overflow-hidden relative"
  >
    <div className="relative z-10 flex items-center gap-6">
      <motion.div whileHover={{ rotateY: 180 }} className={`w-16 h-16 md:w-20 md:h-20 ${bg} ${color} rounded-[28px] flex items-center justify-center shadow-inner`}>
        {icon}
      </motion.div>
      <div>
        <p className={`text-[9px] font-black uppercase tracking-[0.25em] mb-2 ${color}`}>{sub}</p>
        <h5 className="text-slate-400 font-black text-sm">{label}</h5>
      </div>
    </div>
    <div className="text-4xl md:text-6xl font-black text-[#002366] tracking-tighter relative z-10 group-hover:text-orange-600 transition-colors">{value}</div>
    <div className={`absolute inset-0 ${bg} opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
  </motion.div>
);

const HomeworkCard = ({ id, status, dueText, title, professor, deadline, progress, isUrgent, isSubmitted, navigate, onDownloadPDF, isDownloading, hasFile }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <motion.div 
      variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
      whileHover={{ y: -15, scale: 1.01 }}
      className="bg-white rounded-[55px] p-8 md:p-12 border border-slate-50 shadow-xl transition-all duration-500 relative group overflow-hidden"
    >
      <div className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-4">
          <motion.span whileHover={{ scale: 1.1 }} className={`px-4 md:px-6 py-2.5 rounded-[18px] text-[9px] md:text-[10px] font-black uppercase tracking-[0.15em] shadow-sm ${isSubmitted ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-orange-50 text-orange-600 border border-orange-100'}`}>
            ● {status}
          </motion.span>
          {dueText && <span className="text-red-500 font-black text-[10px] uppercase tracking-widest">{dueText}</span>}
        </div>
        
        <div className="relative">
          <motion.button 
            whileHover={{ rotate: 90 }} 
            onClick={() => setShowMenu(!showMenu)}
            className="p-3 hover:bg-slate-50 rounded-2xl text-slate-300"
          >
            <MoreVertical size={20}/>
          </motion.button>
          
          {showMenu && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowMenu(false)} />
              <div className="absolute right-0 mt-2 w-56 z-50 bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden">
                <button
                  onClick={() => {
                    setShowMenu(false);
                    navigate(`/homework/${id}/details`);
                  }}
                  className="w-full px-4 py-3 text-left text-sm font-medium text-slate-600 hover:bg-slate-50 flex items-center gap-2 transition-colors"
                >
                  <Eye size={16} />
                  Voir détails & PDF
                </button>
                {hasFile && (
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      onDownloadPDF();
                    }}
                    disabled={isDownloading}
                    className="w-full px-4 py-3 text-left text-sm font-medium text-slate-600 hover:bg-slate-50 flex items-center gap-2 transition-colors disabled:opacity-50"
                  >
                    {isDownloading ? (
                      <div className="w-4 h-4 border-2 border-slate-600 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Download size={16} />
                    )}
                    <span>{isDownloading ? 'Chargement...' : 'Télécharger PDF'}</span>
                  </button>
                )}
                {!isSubmitted && (
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      navigate(`/homework/${id}/upload`);
                    }}
                    className="w-full px-4 py-3 text-left text-sm font-medium text-orange-600 hover:bg-orange-50 flex items-center gap-2 transition-colors"
                  >
                    <Upload size={16} />
                    Téléverser mon devoir
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      <h3 className="text-2xl md:text-3xl font-black text-[#002366] mb-4 group-hover:text-orange-600 transition-colors leading-tight">{title}</h3>
      <div className="flex items-center gap-3 text-slate-400 font-bold text-sm md:text-base mb-10">
        <div className="w-10 h-10 bg-slate-50 rounded-2xl flex items-center justify-center text-blue-900"><Users size={18}/></div>
        {professor}
      </div>

      <div className="space-y-10">
        <div>
          <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] mb-4">
            <span className="text-slate-300">📅 Date limite</span>
            <span className={isUrgent ? 'text-orange-600 font-black' : 'text-blue-900'}>{deadline}</span>
          </div>
          <div className="h-4 bg-slate-100 rounded-full overflow-hidden p-1">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`h-full rounded-full ${isUrgent ? 'bg-gradient-to-r from-orange-400 to-orange-600' : 'bg-gradient-to-r from-blue-700 to-blue-900'}`}
            />
          </div>
          <div className="flex justify-between mt-2 text-[9px] font-bold text-slate-400">
            <span>Progression</span>
            <span>{progress}%</span>
          </div>
        </div>
        
        <motion.button 
          whileHover={{ scale: 1.02, y: -5 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate(`/homework/${id}/upload`)}
          className={`w-full py-5 md:py-6 rounded-[28px] flex items-center justify-center gap-4 text-[10px] md:text-xs font-black uppercase tracking-[0.3em] shadow-2xl transition-all ${isUrgent ? 'bg-orange-600 text-white hover:bg-[#002366]' : 'bg-[#002366] text-white hover:bg-orange-600'}`}
        >
          <Upload size={20} strokeWidth={3} /> 
          {isSubmitted ? 'Voir ma soumission' : 'Téléverser le devoir'}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Homework;