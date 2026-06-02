import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, MoreVertical, Calendar, Users, FileText, Loader2 } from 'lucide-react';
import Sidebar from '../components/Sidebar'; 
import Navbar from '../components/Navbar';
import API from '../../services/api'; // Adjust path as needed

const HomeworkPage = () => {
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch homework from backend
  useEffect(() => {
    fetchHomework();
  }, []);

  const fetchHomework = async () => {
    try {
      setLoading(true);
      const response = await API.get('/teacher/homeworks');
      setAssignments(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching homework:', err);
      setError('Impossible de charger les devoirs');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteHomework = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce devoir ?')) {
      try {
        await API.delete(`/teacher/homeworks/${id}`);
        // Refresh the list after deletion
        fetchHomework();
      } catch (err) {
        console.error('Error deleting homework:', err);
        setError('Impossible de supprimer le devoir');
      }
    }
  };

  const getStatusBadgeStyle = (status) => {
    if (status === 'published' || status === 'Publié') {
      return 'bg-green-50 text-green-600';
    }
    return 'bg-slate-100 text-slate-400';
  };

  const getStatusText = (status) => {
    if (status === 'published') return 'Publié';
    if (status === 'draft') return 'Brouillon';
    return status;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Non définie';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-[#F8FAFC]">
        <Sidebar />
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          <Navbar />
          <main className="flex-1 overflow-y-auto p-10">
            <div className="flex justify-center items-center h-96">
              <Loader2 size={48} className="animate-spin text-[#002366]" />
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-10">
          
          <div className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-3xl font-[1000] text-[#002366] tracking-tighter">Gestion des Devoirs</h1>
              <p className="text-slate-400 font-bold text-sm uppercase tracking-widest mt-1">Système Scolaire Amity</p>
            </div>
            <button 
              onClick={() => navigate('/homework/add')}
              className="bg-[#002366] text-white px-8 py-4 rounded-[22px] font-black text-sm shadow-2xl shadow-blue-900/20 hover:scale-105 transition-all flex items-center gap-3"
            >
              <Plus size={20} /> Créer un Nouveau Devoir
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-2xl text-sm font-semibold">
              {error}
            </div>
          )}

          {assignments.length === 0 && !error ? (
            <div className="bg-white p-12 rounded-[40px] text-center">
              <FileText size={64} className="mx-auto text-slate-300 mb-4" />
              <h3 className="text-xl font-bold text-[#002366] mb-2">Aucun devoir</h3>
              <p className="text-slate-400">Commencez par créer votre premier devoir</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {assignments.map((hw) => (
                <div key={hw.id} className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
                  <div className="flex justify-between items-start mb-6">
                    <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${getStatusBadgeStyle(hw.status)}`}>
                      {getStatusText(hw.status)}
                    </div>
                    <div className="relative">
                      <button 
                        onClick={() => handleDeleteHomework(hw.id)}
                        className="text-slate-300 hover:text-red-600 transition-colors"
                      >
                        <MoreVertical size={20}/>
                      </button>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-[1000] text-[#002366] mb-4 group-hover:text-blue-600 transition-colors">
                    {hw.title}
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-slate-400 font-bold text-sm">
                      <Users size={16} /> {hw.class_name || hw.class || 'Non assigné'}
                    </div>
                    <div className="flex items-center gap-3 text-slate-400 font-bold text-sm">
                      <Calendar size={16} /> Limite: {formatDate(hw.due_date)}
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-50 flex justify-between items-center">
                    <button 
                      onClick={() => navigate(`/homework/${hw.id}`)}
                      className="text-[#002366] font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:text-blue-600 transition-colors"
                    >
                      <FileText size={14}/> Voir Détails
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default HomeworkPage;