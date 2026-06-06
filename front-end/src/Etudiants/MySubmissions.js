import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, CheckCircle, Clock, XCircle, 
  Download, ChevronRight, Calendar,
  Loader2, Trash2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import api from './api';

const MySubmissions = () => {
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [downloadingId, setDownloadingId] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    valide: 0,
    en_attente: 0,
    refuse: 0
  });

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const response = await api.get('/student/homework/submissions');
      console.log('Soumissions:', response.data);
      
      const data = response.data?.data || [];
      setSubmissions(data);
      
      setStats({
        total: data.length,
        valide: data.filter(s => s.statut === 'valide').length,
        en_attente: data.filter(s => s.statut === 'en_attente').length,
        refuse: data.filter(s => s.statut === 'refuse').length
      });
      
      setLoading(false);
    } catch (error) {
      console.error('Erreur:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette soumission ?')) {
      return;
    }
    
    setDeletingId(id);
    try {
      await api.delete(`/student/homework/submission/${id}`);
      await fetchSubmissions();
    } catch (error) {
      console.error('Erreur suppression:', error);
      alert('Erreur lors de la suppression');
    } finally {
      setDeletingId(null);
    }
  };

  const handleDownload = (id) => {
    const token = localStorage.getItem('token');
    const url = `http://127.0.0.1:8000/api/student/homework/download/${id}?token=${token}`;
    window.open(url, '_blank');
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'valide':
        return { icon: <CheckCircle size={14} />, text: 'Validé', color: 'bg-green-50 text-green-600 border-green-100' };
      case 'en_attente':
        return { icon: <Clock size={14} />, text: 'En attente', color: 'bg-yellow-50 text-yellow-600 border-yellow-100' };
      case 'refuse':
        return { icon: <XCircle size={14} />, text: 'Refusé', color: 'bg-red-50 text-red-600 border-red-100' };
      default:
        return { icon: <Clock size={14} />, text: 'En attente', color: 'bg-gray-50 text-gray-600 border-gray-100' };
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Date inconnue';
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC]">
        <Loader2 size={48} className="text-[#002366] animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <main className="flex-1 overflow-y-auto">
        <Navbar />

        <div className="p-6 md:p-10 max-w-[1400px] mx-auto">
          
          {/* Header */}
          <motion.div variants={cardVariants} className="mb-10">
            <h1 className="text-3xl md:text-[42px] font-black text-[#002366] tracking-tight">
              Mes Soumissions
            </h1>
            <p className="text-slate-400 font-bold mt-2">
              Consultez l'état de vos devoirs envoyés
            </p>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
            <StatCard 
              label="Total des soumissions" 
              value={stats.total} 
              icon={<FileText size={20} />}
              color="bg-[#002366] text-white"
            />
            <StatCard 
              label="Validés" 
              value={stats.valide} 
              icon={<CheckCircle size={20} />}
              color="bg-green-50 text-green-600"
            />
            <StatCard 
              label="En attente" 
              value={stats.en_attente} 
              icon={<Clock size={20} />}
              color="bg-yellow-50 text-yellow-600"
            />
            <StatCard 
              label="Refusés" 
              value={stats.refuse} 
              icon={<XCircle size={20} />}
              color="bg-red-50 text-red-600"
            />
          </div>

          {/* Submissions List */}
          <motion.div variants={containerVariants} className="space-y-4">
            {submissions.length === 0 ? (
              <div className="bg-white rounded-[32px] p-12 text-center border border-slate-100">
                <FileText size={64} className="text-slate-200 mx-auto mb-4" />
                <h3 className="text-xl font-black text-[#002366] mb-2">Aucune soumission</h3>
                <p className="text-slate-400 mb-6">Vous n'avez pas encore envoyé de devoir.</p>
                <button
                  onClick={() => navigate('/homework')}
                  className="px-6 py-3 bg-[#002366] text-white rounded-xl font-black text-sm"
                >
                  Voir les devoirs
                </button>
              </div>
            ) : (
              submissions.map((sub, index) => {
                const status = getStatusBadge(sub.statut);
                return (
                  <SubmissionCard
                    key={sub.id || index}
                    id={sub.id}
                    title={sub.devoir?.titre || sub.title || 'Devoir'}
                    subject={sub.devoir?.matiere?.nom || 'Matière'}
                    submittedAt={formatDate(sub.created_at)}
                    deadline={sub.devoir?.DateDev ? formatDate(sub.devoir.DateDev) : 'Non définie'}
                    status={status}
                    onDownload={() => handleDownload(sub.id)}
                    onDelete={() => handleDelete(sub.id)}
                    isDeleting={deletingId === sub.id}
                  />
                );
              })
            )}
          </motion.div>

          {/* Back Button */}
          <div className="mt-8">
            <button
              onClick={() => navigate('/homework')}
              className="flex items-center gap-2 text-slate-400 hover:text-[#002366] transition-colors"
            >
              <ChevronRight size={20} className="rotate-180" />
              Retour aux devoirs
            </button>
          </div>

        </div>
      </main>
    </div>
  );
};

const StatCard = ({ label, value, icon, color }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className={`rounded-2xl p-6 text-center ${color}`}
  >
    <div className="flex items-center justify-center gap-2 mb-2">
      {icon}
      <span className="text-2xl font-black">{value}</span>
    </div>
    <p className="text-[10px] font-black uppercase tracking-widest opacity-70">
      {label}
    </p>
  </motion.div>
);

const SubmissionCard = ({ id, title, subject, submittedAt, deadline, status, onDownload, onDelete, isDeleting }) => (
  <motion.div
    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
    whileHover={{ y: -5, scale: 1.01 }}
    className="bg-white rounded-[28px] p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all"
  >
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2 flex-wrap">
          <h3 className="text-lg font-black text-[#002366]">{title}</h3>
          <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-1 ${status.color}`}>
            {status.icon}
            {status.text}
          </span>
        </div>
        <p className="text-sm text-slate-500 mb-1">{subject}</p>
        <div className="flex flex-wrap gap-4 text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <Calendar size={12} />
            Soumis le: {submittedAt}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={12} />
            Date limite: {deadline}
          </span>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <button
          onClick={onDownload}
          className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 hover:bg-[#002366] hover:text-white rounded-xl transition-all text-[10px] font-black uppercase tracking-widest"
        >
          <Download size={14} />
          Télécharger
        </button>
        
        {status.text !== 'Validé' && (
          <button
            onClick={onDelete}
            disabled={isDeleting}
            className="flex items-center gap-2 px-4 py-2.5 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-xl transition-all text-[10px] font-black uppercase tracking-widest disabled:opacity-50"
          >
            {isDeleting ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Trash2 size={14} />
            )}
            Supprimer
          </button>
        )}
      </div>
    </div>
  </motion.div>
);

export default MySubmissions;