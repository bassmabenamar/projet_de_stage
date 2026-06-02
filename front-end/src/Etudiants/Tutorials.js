import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, Clock, User, Eye, ThumbsUp, 
  Search, Filter, BookOpen, ChevronRight,
  Award, TrendingUp, Video, Headphones, Calendar
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import api from './api';

const Tutorials = () => {
  const navigate = useNavigate();
  const [tutorials, setTutorials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeLevel, setActiveLevel] = useState('all');

  useEffect(() => {
    fetchTutorials();
  }, []);

  const fetchTutorials = async () => {
    try {
      const response = await api.get('/student/tutorials');
      setTutorials(response.data?.data || []);
      setLoading(false);
    } catch (error) {
      console.error("Erreur chargement tutoriels:", error);
      setLoading(false);
    }
  };

  const handleView = async (id) => {
    try {
      await api.post(`/student/tutorials/${id}/view`);
      fetchTutorials();
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  const filteredTutorials = tutorials.filter(tuto => {
    const matchesSearch = tuto.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tuto.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = activeLevel === 'all' || tuto.level === activeLevel;
    return matchesSearch && matchesLevel;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.2 } }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  const totalViews = tutorials.reduce((sum, tuto) => sum + (tuto.views || 0), 0);
  const totalHours = tutorials.reduce((sum, tuto) => {
    const hours = parseInt(tuto.duration) || 0;
    return sum + hours;
  }, 0);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC]">
        <div className="text-2xl font-black text-[#002366] animate-pulse">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans text-[#1E293B]">
      <main className="flex-1 overflow-y-auto pb-20">
        <Navbar />

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="p-6 md:p-10 max-w-[1400px] mx-auto"
        >
          {/* Header */}
          <motion.div variants={cardVariants} className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
            <div>
              <h1 className="text-3xl md:text-[42px] font-black text-[#002366] tracking-tight leading-none mb-3">
                Tutoriels Vidéo
              </h1>
              <p className="text-slate-400 font-bold text-base">
                Apprenez à votre rythme avec nos experts
              </p>
            </div>
            <div className="flex gap-3">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(`/tutorials/${tutorial.id}/details`)}
                className="flex items-center gap-2 px-6 py-3 bg-[#002366] text-white rounded-xl text-[10px] font-black shadow-lg uppercase tracking-widest"
              >
                <Play size={14} /> Continuer
              </motion.button>
            </div>
          </motion.div>

          {/* Search */}
          <motion.div variants={cardVariants} className="mb-8">
            <div className="relative max-w-2xl">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
              <input 
                type="text"
                placeholder="Rechercher un tutoriel..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-6 py-5 bg-white border border-slate-100 rounded-[28px] text-sm font-bold text-[#002366] placeholder:text-slate-300 outline-none focus:ring-2 focus:ring-blue-100 shadow-sm"
              />
            </div>
          </motion.div>

          {/* Level Filters */}
          <motion.div variants={cardVariants} className="flex flex-wrap gap-3 mb-10">
            {[
              { id: 'all', label: 'Tous niveaux' },
              { id: 'beginner', label: 'Débutant' },
              { id: 'intermediate', label: 'Intermédiaire' },
              { id: 'advanced', label: 'Avancé' },
            ].map(level => (
              <motion.button
                key={level.id}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveLevel(level.id)}
                className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeLevel === level.id
                    ? 'bg-[#002366] text-white shadow-lg'
                    : 'bg-white text-slate-400 hover:text-[#002366] border border-slate-100'
                }`}
              >
                {level.label}
              </motion.button>
            ))}
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
            <StatBoxTuto label="Tutoriels" value={tutorials.length.toString()} icon={<Video size={20} />} />
            <StatBoxTuto label="Heures de contenu" value={totalHours.toString()} icon={<Clock size={20} />} />
            <StatBoxTuto label="Vues totales" value={totalViews > 1000 ? `${(totalViews/1000).toFixed(1)}K` : totalViews.toString()} icon={<Eye size={20} />} />
            <StatBoxTuto label="Certificats" value="8" icon={<Award size={20} />} />
          </div>

          {/* Tutorials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTutorials.map((tuto) => (
              <TutorialCard 
                key={tuto.id} 
                tutorial={tuto} 
                navigate={navigate}
                onView={() => handleView(tuto.id)}
              />
            ))}
          </div>

          {filteredTutorials.length === 0 && (
            <div className="text-center py-20">
              <Video size={64} className="mx-auto text-slate-200 mb-4" />
              <p className="text-slate-400 font-bold">Aucun tutoriel trouvé</p>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
};

const StatBoxTuto = ({ label, value, icon }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white rounded-[24px] p-6 border border-slate-100 shadow-sm text-center"
  >
    <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-3 text-orange-500">
      {icon}
    </div>
    <p className="text-2xl font-black text-[#002366]">{value}</p>
    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">{label}</p>
  </motion.div>
);

const TutorialCard = ({ tutorial, navigate, onView }) => (
  <motion.div 
    whileHover={{ y: -10, scale: 1.02 }}
    className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden group cursor-pointer"
    onClick={() => {
      onView();
      navigate(`/tutorials/${tutorial.id}`);
    }}
  >
    <div className="relative h-48 bg-gradient-to-br from-[#002366] to-blue-800 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all" />
      <motion.div 
        whileHover={{ scale: 1.1 }}
        className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center"
      >
        <Play size={32} className="text-white ml-1" fill="white" />
      </motion.div>
      <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-lg text-[9px] font-black text-white">
        {tutorial.duration}
      </div>
    </div>
    
    <div className="p-6">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-full ${
            tutorial.level === 'beginner' ? 'bg-green-50 text-green-600' :
            tutorial.level === 'intermediate' ? 'bg-orange-50 text-orange-600' :
            'bg-purple-50 text-purple-600'
          }`}>
            {tutorial.level === 'beginner' ? 'Débutant' : tutorial.level === 'intermediate' ? 'Intermédiaire' : 'Avancé'}
          </span>
        </div>
        <div className="flex items-center gap-1 text-slate-400">
          <Eye size={12} />
          <span className="text-[9px] font-bold">{tutorial.views || 0}</span>
        </div>
      </div>
      
      <h3 className="text-lg font-black text-[#002366] mb-2 group-hover:text-orange-500 transition-colors line-clamp-2">
        {tutorial.title}
      </h3>
      
      <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold mb-4">
        <User size={12} />
        {tutorial.instructor}
      </div>
      
      <div className="flex items-center justify-between pt-4 border-t border-slate-50">
        <div className="flex items-center gap-1 text-slate-400">
          <ThumbsUp size={12} />
          <span className="text-[9px] font-bold">{tutorial.likes || 0}</span>
        </div>
        <motion.button 
          whileHover={{ x: 5 }}
          className="text-[9px] font-black text-[#002366] uppercase tracking-widest flex items-center gap-1"
        >
          Regarder <ChevronRight size={12} />
        </motion.button>
      </div>
    </div>
  </motion.div>
);

export default Tutorials;