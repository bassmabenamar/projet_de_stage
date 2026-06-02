import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, FileText, CheckCircle, XCircle, Clock as ClockIcon } from 'lucide-react';
import Navbar from './Navbar';
import api from './api';

const MyLeaveRequests = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  const fetchLeaveRequests = async () => {
    try {
      const response = await api.get('/student/my-leave-requests');
      setLeaveRequests(response.data?.data || []);
      setLoading(false);
    } catch (error) {
      console.error('Erreur:', error);
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'en_attente':
        return { icon: <ClockIcon size={14} />, text: 'En attente', color: 'bg-yellow-50 text-yellow-600' };
      case 'approuve':
        return { icon: <CheckCircle size={14} />, text: 'Approuvé', color: 'bg-green-50 text-green-600' };
      case 'refuse':
        return { icon: <XCircle size={14} />, text: 'Refusé', color: 'bg-red-50 text-red-600' };
      default:
        return { icon: <ClockIcon size={14} />, text: 'En attente', color: 'bg-gray-50 text-gray-600' };
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC]">
        <div className="w-12 h-12 border-4 border-[#002366] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <main className="flex-1 overflow-y-auto">
        <Navbar />
        
        <div className="p-6 md:p-10 max-w-6xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={cardVariants} className="mb-8">
              <h1 className="text-3xl md:text-[42px] font-black text-[#002366] tracking-tight">
                Mes Demandes de Congé
              </h1>
              <p className="text-slate-400 font-bold mt-2">
                Suivez l'état de vos demandes de congé
              </p>
            </motion.div>

            {leaveRequests.length === 0 ? (
              <motion.div variants={cardVariants} className="bg-white rounded-3xl p-12 text-center border border-slate-100">
                <Calendar size={64} className="mx-auto text-slate-200 mb-4" />
                <h3 className="text-xl font-black text-[#002366] mb-2">Aucune demande</h3>
                <p className="text-slate-400">Vous n'avez pas encore fait de demande de congé.</p>
              </motion.div>
            ) : (
              <div className="space-y-4">
                {leaveRequests.map((request, index) => {
                  const status = getStatusBadge(request.status);
                  return (
                    <motion.div
                      key={request.id || index}
                      variants={cardVariants}
                      whileHover={{ y: -5 }}
                      className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-black text-[#002366]">
                              {request.leave_type === 'maladie' ? '🏥 Congé Maladie' :
                               request.leave_type === 'personnel' ? '👤 Congé Personnel' :
                               request.leave_type === 'familial' ? '👨‍👩‍👧 Congé Familial' :
                               '⚠️ Congé Urgent'}
                            </h3>
                            <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-1 ${status.color}`}>
                              {status.icon}
                              {status.text}
                            </span>
                          </div>
                          <p className="text-slate-600 text-sm mb-3">{request.reason}</p>
                          <div className="flex flex-wrap gap-4 text-xs text-slate-400">
                            <span className="flex items-center gap-1">
                              <Calendar size={12} />
                              Date: {new Date(request.date).toLocaleDateString('fr-FR')}
                            </span>
                            {request.file && (
                              <a 
                                href={`http://127.0.0.1:8000/storage/${request.file}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                              >
                                <FileText size={12} />
                                Voir le justificatif
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default MyLeaveRequests;