import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Eye, ThumbsUp, Clock, User, 
  Play, AlertCircle, Loader, BookOpen
} from 'lucide-react';
import api from './api';

const TutorialDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tutorial, setTutorial] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTutorial();
  }, [id]);

  const fetchTutorial = async () => {
    try {
      setLoading(true);
      setError(null);

      // Increment view
      await api.post(`/student/tutorials/${id}/view`).catch(() => {});

      // Get tutorial data
      const response = await api.get(`/student/tutorials/${id}`);
      setTutorial(response.data?.data);

    } catch (err) {
      console.error('Erreur:', err);
      setError('Tutoriel introuvable.');
    } finally {
      setLoading(false);
    }
  };

  const isYoutube = (url) => url && (url.includes('youtube.com') || url.includes('youtu.be'));

  const getEmbedUrl = (url) => {
    if (!url) return null;
    if (url.includes('/embed/')) return url;
    const match = url.match(/(?:v=|youtu\.be\/)([^&?\s]+)/);
    if (match) return `https://www.youtube.com/embed/${match[1]}`;
    return url;
  };

  const getLevelStyle = (level) => {
    switch(level) {
      case 'beginner':     return { bg: 'bg-green-50',  text: 'text-green-600',  label: 'Débutant' };
      case 'intermediate': return { bg: 'bg-orange-50', text: 'text-orange-600', label: 'Intermédiaire' };
      case 'advanced':     return { bg: 'bg-purple-50', text: 'text-purple-600', label: 'Avancé' };
      default:             return { bg: 'bg-gray-50',   text: 'text-gray-600',   label: level };
    }
  };

  // ─── Loading ─────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F8FAFC]">
        <Loader className="w-12 h-12 animate-spin text-[#002366]" />
      </div>
    );
  }

  // ─── Error ───────────────────────────────────────────────────
  if (error || !tutorial) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F8FAFC]">
        <div className="text-center max-w-md mx-auto p-8 bg-white rounded-2xl shadow-sm">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-[#002366] mb-2">Erreur</h2>
          <p className="text-gray-500 mb-6">{error || 'Tutoriel non trouvé'}</p>
          <button
            onClick={() => navigate('/tutorials')}
            className="px-6 py-2 bg-[#002366] text-white rounded-xl font-bold hover:bg-[#001a4f] transition"
          >
            Retour aux tutoriels
          </button>
        </div>
      </div>
    );
  }

  const levelStyle = getLevelStyle(tutorial.level);

  // ─── Main ────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#F8FAFC]">

      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-20 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/tutorials')}
            className="flex items-center gap-2 text-gray-500 hover:text-[#002366] transition font-semibold"
          >
            <ArrowLeft className="w-5 h-5" />
            Retour
          </button>
          <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full ${levelStyle.bg} ${levelStyle.text}`}>
            {levelStyle.label}
          </span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">

        {/* Video Player */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black rounded-2xl shadow-sm overflow-hidden"
        >
          {tutorial.video_url ? (
            isYoutube(tutorial.video_url) ? (
              // ── YouTube iframe ──────────────────────────────
              <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                <iframe
                  src={getEmbedUrl(tutorial.video_url)}
                  className="absolute inset-0 w-full h-full"
                  title={tutorial.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              // ── Local / Laravel video tag ───────────────────
              <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                <video
                  className="absolute inset-0 w-full h-full"
                  controls
                  src={tutorial.video_url}
                >
                  Votre navigateur ne supporte pas la vidéo.
                </video>
              </div>
            )
          ) : (
            // ── No video ────────────────────────────────────
            <div className="h-72 bg-gradient-to-br from-[#002366] to-blue-800 flex flex-col items-center justify-center gap-4">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                <Play size={36} className="text-white ml-1" fill="white" />
              </div>
              <p className="text-white/70 text-sm font-bold">Vidéo non disponible</p>
            </div>
          )}
        </motion.div>

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-sm p-6"
        >
          <h1 className="text-2xl md:text-3xl font-black text-[#002366] mb-3 leading-tight">
            {tutorial.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-400 font-semibold mb-4">
            <span className="flex items-center gap-1.5">
              <User size={14} />
              {tutorial.instructor}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              {tutorial.duration}
            </span>
            <span className="flex items-center gap-1.5">
              <Eye size={14} />
              {tutorial.views || 0} vues
            </span>
            <span className="flex items-center gap-1.5">
              <ThumbsUp size={14} />
              {tutorial.likes || 0} likes
            </span>
          </div>

          {/* Description */}
          {tutorial.description && (
            <div className="border-t pt-4">
              <h3 className="font-black text-[#002366] mb-2 flex items-center gap-2">
                <BookOpen size={16} />
                Description
              </h3>
              <p className="text-gray-500 leading-relaxed text-sm">
                {tutorial.description}
              </p>
            </div>
          )}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-3 gap-4"
        >
          {[
            { label: 'Durée',  value: tutorial.duration,   icon: <Clock size={18} /> },
            { label: 'Vues',   value: tutorial.views || 0, icon: <Eye size={18} /> },
            { label: 'Likes',  value: tutorial.likes || 0, icon: <ThumbsUp size={18} /> },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl p-4 text-center shadow-sm border border-slate-100">
              <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-2 text-[#002366]">
                {stat.icon}
              </div>
              <p className="text-xl font-black text-[#002366]">{stat.value}</p>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>

      </div>
    </div>
  );
};

export default TutorialDetails;
