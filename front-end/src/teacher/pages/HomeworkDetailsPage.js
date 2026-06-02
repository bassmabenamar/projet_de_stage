import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, Calendar, Users, FileText, Clock, Download, 
  Eye, Send, Loader2, CheckCircle, AlertCircle, Edit3 
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import API from '../../services/api';

const HomeworkDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [homework, setHomework] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [loadingSubmissions, setLoadingSubmissions] = useState(false);
  const [publishing, setPublishing] = useState(false);

  useEffect(() => {
    fetchHomeworkDetails();
    fetchSubmissions();
  }, [id]);

  const fetchHomeworkDetails = async () => {
    try {
      setLoading(true);
      const response = await API.get(`/teacher/homeworks/${id}`);
      setHomework(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching homework details:', err);
      setError('Impossible de charger les détails du devoir');
    } finally {
      setLoading(false);
    }
  };

  const fetchSubmissions = async () => {
    try {
      setLoadingSubmissions(true);
      const response = await API.get(`/teacher/homeworks/${id}/submissions`);
      setSubmissions(response.data || []);
    } catch (err) {
      console.error('Error fetching submissions:', err);
    } finally {
      setLoadingSubmissions(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Non définie';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'published':
        return <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-black uppercase tracking-wider">Publié</span>;
      case 'draft':
        return <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-xs font-black uppercase tracking-wider">Brouillon</span>;
      default:
        return <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-black uppercase tracking-wider">{status}</span>;
    }
  };

  const getSubmissionStatusBadge = (status) => {
    switch(status) {
      case 'submitted':
        return <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold">Soumis</span>;
      case 'graded':
        return <span className="px-2 py-1 bg-green-50 text-green-600 rounded-lg text-xs font-bold">Noté</span>;
      case 'late':
        return <span className="px-2 py-1 bg-red-50 text-red-600 rounded-lg text-xs font-bold">En retard</span>;
      default:
        return <span className="px-2 py-1 bg-gray-50 text-gray-500 rounded-lg text-xs font-bold">Non soumis</span>;
    }
  };

  const handleDownloadAttachment = () => {
    if (homework?.file_path) {
      window.open(homework.file_path, '_blank');
    }
  };

  const handlePublish = async () => {
  try {
    setPublishing(true);

    await API.post(`/teacher/homeworks/${id}`, {
      title: homework.title,
      description: homework.description,
      class_id: homework.class_id,
      due_date: homework.due_date,
      status: 'published',
      _method: 'PUT'
    });

    fetchHomeworkDetails();

  } catch (err) {
    console.error('Erreur publication:', err);
  } finally {
    setPublishing(false);
  }
};

  const handleGradeSubmission = async (submissionId, grade, feedback) => {
    try {
      await API.post(`/teacher/submissions/${submissionId}/grade`, {
        grade: grade,
        feedback: feedback
      });
      fetchSubmissions();
    } catch (err) {
      console.error('Error grading submission:', err);
    }
  };

  // Calcul du taux de rendu (soumis + notés)
  const handedInCount = submissions.filter(s => s.status === 'submitted' || s.status === 'graded').length;
  const totalStudents = submissions.length || 1;
  const submissionRate = Math.round((handedInCount / totalStudents) * 100);

  if (loading) {
    return (
      <div className="flex min-h-screen bg-[#F8FAFC]">
        <Sidebar />
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          <Navbar />
          <main className="flex-1 flex justify-center items-center h-full">
            <Loader2 size={48} className="animate-spin text-[#002366]" />
          </main>
        </div>
      </div>
    );
  }

  if (error || !homework) {
    return (
      <div className="flex min-h-screen bg-[#F8FAFC]">
        <Sidebar />
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          <Navbar />
          <main className="flex-1 overflow-y-auto p-10">
            <div className="text-center py-20 max-w-md mx-auto">
              <AlertCircle size={64} className="mx-auto text-red-400 mb-4" />
              <h3 className="text-xl font-black text-[#002366] tracking-tight mb-2">Devoir introuvable</h3>
              <p className="text-slate-400 mb-6 font-medium">{error || "Le devoir sélectionné n'existe pas ou a été déplacé."}</p>
              <button
                onClick={() => navigate('/homework')}
                className="w-full px-6 py-3 bg-[#002366] text-white rounded-xl font-bold text-sm hover:bg-blue-800 transition-colors"
              >
                Retour à la liste des devoirs
              </button>
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
          <div className="max-w-6xl mx-auto">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => navigate('/homework')}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <ArrowLeft size={24} className="text-[#002366]" />
                </button>
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-1">
                    <h1 className="text-3xl font-[1000] text-[#002366] tracking-tighter">
                      {homework.title}
                    </h1>
                    {getStatusBadge(homework.status)}
                  </div>
                  <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">
                    Détails & Rendu du Devoir
                  </p>
                </div>
              </div>

              {homework.status === 'draft' && (
                <button
                  onClick={handlePublish}
                  disabled={publishing}
                  className="px-6 py-3.5 bg-green-600 text-white rounded-xl font-black text-xs uppercase tracking-wider hover:bg-green-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {publishing ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <>
                      <Send size={18} />
                      Publier maintenant
                    </>
                  )}
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Colonne Principale (Gauche) */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Description Card */}
                <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100/60">
                  <h2 className="text-lg font-black text-[#002366] uppercase tracking-wider mb-4 flex items-center gap-2">
                    <FileText size={18} className="text-slate-400" />
                    Instructions / Description
                  </h2>
                  <p className="text-slate-600 leading-relaxed whitespace-pre-wrap font-medium">
                    {homework.description || 'Aucune consigne spécifique renseignée.'}
                  </p>
                </div>

                {/* Attachments Card */}
                {homework.file_path && (
                  <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100/60">
                    <h2 className="text-lg font-black text-[#002366] uppercase tracking-wider mb-4 flex items-center gap-2">
                      <Download size={18} className="text-slate-400" />
                      Fichiers joints
                    </h2>
                    <button
                      onClick={handleDownloadAttachment}
                      className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-100 rounded-xl hover:bg-slate-100 transition-colors w-full"
                    >
                      <div className="p-3 bg-white border border-slate-200 rounded-xl text-[#002366]">
                        <FileText size={24} />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-bold text-slate-700">Ressource_Devoir.pdf</p>
                        <p className="text-xs text-slate-400 font-semibold">Cliquez pour consulter ou télécharger le fichier joint</p>
                      </div>
                      <Download size={20} className="text-slate-400 mr-2" />
                    </button>
                  </div>
                )}

                {/* Submissions Card */}
                <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100/60">
                  <h2 className="text-lg font-black text-[#002366] uppercase tracking-wider mb-6 flex items-center gap-2">
                    <Users size={18} className="text-slate-400" />
                    Copies et suivis des étudiants
                  </h2>
                  
                  {loadingSubmissions ? (
                    <div className="flex justify-center py-12">
                      <Loader2 size={32} className="animate-spin text-[#002366]" />
                    </div>
                  ) : submissions.length === 0 ? (
                    <div className="text-center py-12 border-2 border-dashed border-slate-100 rounded-2xl">
                      <Users size={40} className="mx-auto text-slate-300 mb-2" />
                      <p className="text-slate-400 font-bold text-sm">Aucun étudiant n'est rattaché à ce devoir.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {submissions.map((submission) => (
                        <div key={submission.id} className="border border-slate-100 rounded-2xl p-5 hover:shadow-md transition-all bg-white">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-[#002366] rounded-full flex items-center justify-center text-white font-black text-sm">
                                {submission.student_name?.charAt(0).toUpperCase() || 'E'}
                              </div>
                              <div>
                                <h3 className="font-bold text-slate-800 text-base">{submission.student_name}</h3>
                                <p className="text-xs text-slate-400 font-semibold">{submission.student_email}</p>
                              </div>
                            </div>
                            <div className="self-start sm:self-center">
                              {getSubmissionStatusBadge(submission.status)}
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-3 my-3 border-y border-slate-50 text-sm">
                            <div>
                              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Date de dépôt</p>
                              <p className="font-semibold text-slate-600">
                                {submission.submitted_at ? formatDate(submission.submitted_at) : '—'}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Note attribuée</p>
                              {submission.grade !== null && submission.grade !== undefined ? (
                                <p className="font-black text-green-600 text-base">{submission.grade} / 20</p>
                              ) : (
                                <p className="font-medium text-slate-400 italic">Non noté</p>
                              )}
                            </div>
                          </div>
                          
                          {submission.file_path && (
                            <button
                              onClick={() => window.open(submission.file_path, '_blank')}
                              className="text-xs text-[#002366] font-black uppercase tracking-wider bg-slate-50 hover:bg-slate-100 px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 mb-3 mt-1"
                            >
                              <Eye size={14} />
                              Consulter la copie
                            </button>
                          )}
                          
                          {submission.feedback && (
                            <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                              <p className="text-xs font-black text-[#002366] uppercase tracking-wider mb-1">Appréciation de l'enseignant</p>
                              <p className="text-sm text-slate-600 font-medium">{submission.feedback}</p>
                            </div>
                          )}
                          
                          {/* Formulaire de notation direct */}
                          {submission.status === 'submitted' && (
                            <div className="mt-4 pt-4 border-t border-slate-100">
                              <GradeForm 
                                submission={submission}
                                onGrade={handleGradeSubmission}
                              />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Barre Latérale (Droite) */}
              <div className="space-y-6">
                
                {/* Information Card */}
                <div className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-100/60 sticky top-6 space-y-6">
                  <div>
                    <h3 className="font-black text-xs uppercase tracking-wider text-[#002366] mb-4 flex items-center gap-2">
                      <Calendar size={16} />
                      Informations générales
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Classe ciblée</p>
                        <p className="font-bold text-slate-800 flex items-center gap-1.5 text-sm">
                          <Users size={14} className="text-slate-400" />
                          {homework.class_name || 'Non spécifiée'}
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Échéance finale</p>
                        <p className="font-bold text-slate-800 flex items-center gap-1.5 text-sm">
                          <Clock size={14} className="text-slate-400" />
                          {formatDate(homework.due_date)}
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Date de création</p>
                        <p className="font-bold text-slate-700 text-sm">{formatDate(homework.created_at)}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Statistiques d'avancement */}
                  <div className="pt-4 border-t border-slate-100">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Rendus globaux</p>
                    <div className="flex justify-between items-center text-sm font-black text-[#002366] mb-2">
                      <span>Taux d'accomplissement</span>
                      <span>{handedInCount} / {submissions.length} ({submissionRate}%)</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                      <div 
                        className="bg-green-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${submissionRate}%` }}
                      />
                    </div>
                  </div>
                  
                  {/* Bouton d'édition */}
                  <div className="pt-2">
                    <button
                      onClick={() => navigate(`/homework/edit/${id}`)}
                      className="w-full px-4 py-3 bg-slate-100 text-slate-700 rounded-xl font-black text-xs uppercase tracking-wider hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
                    >
                      <Edit3 size={16} />
                      Modifier les consignes
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

// Sub-Component: Formulaire de notation épuré
const GradeForm = ({ submission, onGrade }) => {
  const [grade, setGrade] = useState('');
  const [feedback, setFeedback] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!grade) return;
    
    setSubmitting(true);
    await onGrade(submission.id, grade, feedback);
    setSubmitting(false);
    setGrade('');
    setFeedback('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-50/60 border border-slate-100 rounded-xl p-4 space-y-3">
      <p className="text-xs font-black text-[#002366] uppercase tracking-wider mb-1">Évaluer le travail rendu</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="sm:col-span-1">
          <input
            type="number"
            step="0.5"
            min="0"
            max="20"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            required
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:border-[#002366] focus:outline-none focus:ring-2 focus:ring-[#002366]/20 bg-white"
            placeholder="Note /20"
          />
        </div>
        <div className="sm:col-span-2">
          <input
            type="text"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:border-[#002366] focus:outline-none focus:ring-2 focus:ring-[#002366]/20 bg-white"
            placeholder="Feedback / Remarques (Optionnel)"
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="w-full px-4 py-2.5 bg-[#002366] text-white rounded-xl text-xs font-black uppercase tracking-wider hover:bg-blue-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-1.5"
      >
        {submitting ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle size={14} />}
        Enregistrer la note
      </button>
    </form>
  );
};

export default HomeworkDetailsPage;