import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Eye, ThumbsUp, Clock, User, 
  Play, AlertCircle, Loader, BookOpen, Youtube
} from 'lucide-react';

const TutorialDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [tutorial, setTutorial] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`http://127.0.0.1:8000/api/student/tutorials/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const tutorialData = data.data || data;
        setTutorial(tutorialData);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const getYoutubeEmbedUrl = (url) => {
    if (!url) return "";
    if (url.includes("watch?v=")) {
      return url.replace("watch?v=", "embed/") + "?autoplay=1";
    }
    if (url.includes("youtu.be/")) {
      const videoId = url.split("youtu.be/")[1];
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }
    return url;
  };

  const getLevelStyle = (level) => {
    switch(level?.toLowerCase()) {
      case 'beginner':     return { bg: 'bg-emerald-50', text: 'text-emerald-600', label: 'Débutant' };
      case 'intermediate': return { bg: 'bg-amber-50', text: 'text-amber-600', label: 'Intermédiaire' };
      case 'advanced':     return { bg: 'bg-rose-50', text: 'text-rose-600', label: 'Avancé' };
      default:             return { bg: 'bg-gray-50', text: 'text-gray-600', label: level || 'Débutant' };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0B1121] to-[#1A2333] flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin text-blue-400 mx-auto mb-4" />
          <p className="text-gray-400 font-medium">Chargement du tutoriel...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0B1121] to-[#1A2333] flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 max-w-md text-center">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Erreur</h2>
          <p className="text-gray-300 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold transition"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  if (!tutorial) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0B1121] to-[#1A2333] flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-4">Aucun tutoriel trouvé</h2>
          <button
            onClick={() => navigate('/tutorials')}
            className="px-6 py-2 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition"
          >
            Retour aux tutoriels
          </button>
        </div>
      </div>
    );
  }

  const levelStyle = getLevelStyle(tutorial.level);
  const isYoutube = tutorial.video_url && (tutorial.video_url.includes("youtube") || tutorial.video_url.includes("youtu.be"));

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B1121] to-[#1A2333]">
      
      {/* Header */}
      <div className="bg-white/5 backdrop-blur-md border-b border-white/10 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/tutorials')}
            className="flex items-center gap-2 text-gray-300 hover:text-white transition font-semibold"
          >
            <ArrowLeft className="w-5 h-5" />
            Retour aux tutoriels
          </button>
          <div className={`px-3 py-1.5 rounded-full text-xs font-bold ${levelStyle.bg} ${levelStyle.text}`}>
            {levelStyle.label}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        
        {/* Titre */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
            {tutorial.title}
          </h1>
          
          {/* Métadonnées */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-400">
            <span className="flex items-center gap-1.5">
              <User size={14} />
              {tutorial.instructor || "Instructeur"}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              {tutorial.duration}
            </span>
            <span className="flex items-center gap-1.5">
              <Eye size={14} />
              {typeof tutorial.views === 'number' ? tutorial.views.toLocaleString() : tutorial.views || 0} vues
            </span>
            <span className="flex items-center gap-1.5">
              <ThumbsUp size={14} />
              {typeof tutorial.likes === 'number' ? tutorial.likes.toLocaleString() : tutorial.likes || 0} likes
            </span>
          </div>
        </motion.div>

        {/* Vidéo */}
        {tutorial.video_url ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl overflow-hidden shadow-2xl mb-8"
          >
            {!showVideo ? (
              <div 
                className="relative cursor-pointer group"
                onClick={() => setShowVideo(true)}
              >
                {tutorial.thumbnail ? (
                  <img 
                    src={tutorial.thumbnail} 
                    alt={tutorial.title}
                    className="w-full aspect-video object-cover"
                  />
                ) : (
                  <div className="w-full aspect-video bg-gradient-to-br from-blue-600 to-purple-800 flex flex-col items-center justify-center">
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition">
                      <Play size={40} className="text-white ml-1" fill="white" />
                    </div>
                    <p className="text-white/70 font-medium">Cliquez pour regarder</p>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition" />
              </div>
            ) : (
              isYoutube ? (
                <iframe
                  src={getYoutubeEmbedUrl(tutorial.video_url)}
                  className="w-full aspect-video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={tutorial.title}
                />
              ) : (
                <video
                  controls
                  autoPlay
                  className="w-full"
                  src={tutorial.video_url}
                />
              )
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 rounded-2xl p-12 text-center mb-8 border border-white/10"
          >
            <Play size={48} className="text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400">Vidéo non disponible</p>
          </motion.div>
        )}

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            { label: 'Durée', value: tutorial.duration, icon: Clock },
            { label: 'Vues', value: tutorial.views?.toLocaleString() || 0, icon: Eye },
            { label: 'Likes', value: tutorial.likes?.toLocaleString() || 0, icon: ThumbsUp },
            { label: 'Instructeur', value: tutorial.instructor?.split(' ')[0] || 'N/A', icon: User },
          ].map((stat, i) => (
            <div key={i} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10">
              <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <stat.icon size={18} className="text-blue-400" />
              </div>
              <p className="text-xl font-bold text-white">{stat.value}</p>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Description */}
        {tutorial.description && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
          >
            <h3 className="font-bold text-white mb-3 flex items-center gap-2">
              <BookOpen size={18} className="text-blue-400" />
              Description
            </h3>
            <p className="text-gray-300 leading-relaxed">
              {tutorial.description}
            </p>
          </motion.div>
        )}

      </div>
    </div>
  );
};

export default TutorialDetails;