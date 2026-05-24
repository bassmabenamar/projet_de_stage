import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { 
  Calendar, MapPin, Users, ArrowRight, 
  Plus, Rocket, Globe, Search, Bell, RefreshCw, MoreVertical,
  CheckCircle, Loader2, XCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import api from './api';

const Activities = () => {
  const navigate = useNavigate();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [registeredActivities, setRegisteredActivities] = useState([]);
  const [activeTab, setActiveTab] = useState('À venir');
  const [registeringId, setRegisteringId] = useState(null);

  useEffect(() => {
    fetchActivites();
    fetchMyRegistrations();
  }, []);

  const fetchActivites = async () => {
    try {
      const response = await api.get('/student/activites');
      const activitesData = response.data?.data || [];
      console.log('Activités chargées:', activitesData);
      setActivities(activitesData);
      setLoading(false);
    } catch (error) {
      console.error("Erreur lors du chargement des activités:", error);
      setActivities([]);
      setLoading(false);
    }
  };

  const fetchMyRegistrations = async () => {
    try {
      const response = await api.get('/student/activity-registrations');
      setRegisteredActivities(response.data?.data || []);
    } catch (error) {
      console.error("Erreur chargement inscriptions:", error);
    }
  };

  const handleRegister = async (activityId) => {
    setRegisteringId(activityId);
    try {
      await api.post('/student/activity-register', { activity_id: activityId });
      await fetchMyRegistrations();
      alert('Inscription réussie !');
    } catch (error) {
      console.error('Erreur inscription:', error);
      alert(error.response?.data?.message || 'Erreur lors de l\'inscription');
    } finally {
      setRegisteringId(null);
    }
  };

  const isRegistered = (activityId) => {
    return registeredActivities.some(reg => reg.activity_id === activityId);
  };

  const getFilteredActivities = () => {
    let filtered = [...activities];
    if (activeTab === 'Mes Inscriptions') {
      filtered = filtered.filter(act => isRegistered(act.id));
    } else if (activeTab === 'Événements Passés') {
      filtered = filtered.filter(act => new Date(act.date) < new Date());
    } else {
      filtered = filtered.filter(act => new Date(act.date) >= new Date());
    }
    return filtered;
  };

  const filteredActivities = getFilteredActivities();
  const featured = filteredActivities.length > 0 ? filteredActivities[0] : null;
  const otherActivities = filteredActivities.slice(1);

  const premiumSpring = { type: "spring", stiffness: 100, damping: 18, mass: 1 };

  const containerVars = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.12, delayChildren: 0.2 } 
    }
  };

  const itemVars = {
    hidden: { y: 25, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: premiumSpring }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC]">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="text-[#002366]">
          <RefreshCw size={40} />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full bg-[#F8FAFC] font-sans text-[#1E293B] antialiased">
      <main className="flex-1 w-full overflow-x-hidden overflow-y-auto pb-20">
        <Navbar />

        <motion.div 
          variants={containerVars}
          initial="hidden"
          animate="visible"
          className="p-4 md:p-10 max-w-[1550px] mx-auto"
        >
          {/* Header Section */}
          <motion.div variants={itemVars} className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
            <div>
              <h2 className="text-3xl md:text-[40px] font-black text-[#002366] tracking-tight leading-none">Activités & Événements</h2>
              <p className="text-slate-400 font-bold text-base md:text-lg mt-3">Explorez et rejoignez la vie dynamique d'Amity School.</p>
            </div>
            
            <div className="flex bg-white/80 backdrop-blur-md p-1.5 rounded-[20px] border border-slate-100 shadow-sm overflow-x-auto max-w-full no-scrollbar">
              {['À venir', 'Mes Inscriptions', 'Événements Passés'].map((tab) => (
                <motion.button 
                  key={tab}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab(tab)}
                  className={`whitespace-nowrap px-6 md:px-8 py-3 rounded-[16px] text-[11px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-[#002366] text-white shadow-lg shadow-blue-900/20' : 'text-slate-400 hover:text-[#002366]'}`}
                >
                  {tab}
                </motion.button>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10">
            
            {/* HERO FEATURED CARD */}
            {featured && (
              <motion.div 
                variants={itemVars}
                className="col-span-1 lg:col-span-8 relative group cursor-pointer overflow-hidden rounded-[35px] md:rounded-[45px] h-[400px] md:h-[500px] shadow-2xl shadow-blue-900/5"
              >
                <motion.div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.5s] group-hover:scale-110"
                  style={{ backgroundImage: `url(${featured?.image || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop'})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#002366] via-transparent to-transparent opacity-90" />
                
                <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 right-8 text-white">
                  <span className="bg-orange-500 text-[9px] md:text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest mb-6 inline-block shadow-lg shadow-orange-500/40">
                    {isRegistered(featured.id) ? '✓ Inscrit' : 'Événement Vedette'}
                  </span>
                  <h3 className="text-2xl md:text-6xl font-black mb-4 md:mb-6 leading-tight tracking-tight">
                    {featured?.titre || "Festival Sportif"} <br className="hidden md:block"/> {featured?.date ? new Date(featured.date).getFullYear() : '2024'}
                  </h3>
                  <div className="flex flex-wrap gap-4 md:gap-8 items-center font-bold text-xs md:text-sm text-slate-100">
                    <div className="flex items-center gap-3"><Calendar size={20} className="text-orange-400"/> {featured?.date ? new Date(featured.date).toLocaleDateString('fr-FR') : "Date à venir"}</div>
                    <div className="flex items-center gap-3"><MapPin size={20} className="text-orange-400"/> {featured?.lieu || "Amity School"}</div>
                    <div className="flex items-center gap-3"><Users size={20} className="text-orange-400"/> {featured?.places_restantes || 50} places</div>
                  </div>
                  {!isRegistered(featured.id) && new Date(featured.date) >= new Date() && (
                    <motion.button 
                      whileHover={{ scale: 1.05, gap: '20px' }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleRegister(featured.id)}
                      disabled={registeringId === featured.id}
                      className="mt-8 md:mt-10 bg-orange-600 text-white px-8 md:px-10 py-4 md:py-5 rounded-[18px] md:rounded-[22px] font-black uppercase text-xs tracking-[0.25em] flex items-center gap-3 shadow-xl shadow-orange-600/30 transition-all disabled:opacity-50"
                    >
                      {registeringId === featured.id ? <Loader2 size={18} className="animate-spin" /> : <ArrowRight size={18} />}
                      {registeringId === featured.id ? 'Inscription...' : "S'inscrire Maintenant"}
                    </motion.button>
                  )}
                  {isRegistered(featured.id) && (
                    <div className="mt-8 inline-flex items-center gap-2 bg-green-500/20 backdrop-blur-sm px-6 py-3 rounded-full">
                      <CheckCircle size={18} className="text-green-400" />
                      <span className="text-sm font-bold">Vous êtes inscrit à cet événement</span>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* SIDEBAR (Dates Limites) */}
            <div className="col-span-1 lg:col-span-4 space-y-8">
              <motion.div variants={itemVars} className="bg-white rounded-[35px] md:rounded-[40px] p-8 md:p-10 border border-slate-50 shadow-sm relative overflow-hidden group hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-500">
                <h4 className="font-black text-xl md:text-2xl text-[#002366] mb-8 md:mb-10 tracking-tight">Dates Limites Proches</h4>
                <div className="space-y-6 md:space-y-8">
                  {activities.filter(a => new Date(a.date) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)).slice(0, 2).map(act => (
                    <DeadlineItem 
                      key={act.id}
                      icon={act.type === 'Sports' ? <Rocket className="text-orange-500"/> : <Globe className="text-blue-500"/>}
                      title={act.titre}
                      sub={`Ferme dans ${Math.ceil((new Date(act.date) - new Date()) / (1000 * 60 * 60 * 24))} jours`}
                      color="border-orange-500"
                      onClick={() => navigate(`/activities/${act.id}`)}
                    />
                  ))}
                </div>

                <div className="mt-10 md:mt-12 pt-8 md:pt-10 border-t border-slate-50 flex justify-between">
                  <StatBox label="Clubs Actifs" value={activities.filter(a => a.type === 'Club').length.toString()} />
                  <div className="w-px h-12 bg-slate-100 self-center" />
                  <StatBox label="Membres Inscrits" value={registeredActivities.length.toString()} />
                </div>
              </motion.div>

              {/* Bouton Mes Inscriptions */}
              <motion.button
                variants={itemVars}
                whileHover={{ scale: 1.02 }}
                onClick={() => setActiveTab('Mes Inscriptions')}
                className="w-full bg-[#002366] text-white rounded-[35px] p-8 text-center"
              >
                <CheckCircle size={32} className="mx-auto mb-3 opacity-80" />
                <span className="font-black text-lg">Voir mes inscriptions</span>
                <p className="text-blue-200 text-sm mt-2">{registeredActivities.length} activité(s) inscrite(s)</p>
              </motion.button>
            </div>

            {/* ALL ACTIVITIES GRID */}
            <div className="col-span-1 lg:col-span-12 mt-8 md:mt-12">
              <motion.div variants={itemVars} className="flex justify-between items-center mb-8 md:mb-10">
                <h3 className="text-2xl md:text-3xl font-black text-[#002366] tracking-tight">
                  {activeTab === 'Mes Inscriptions' ? 'Mes Inscriptions' : 'Toutes les Activités'}
                </h3>
                <div className="flex gap-4">
                  <button onClick={fetchActivites} className="p-3 md:p-4 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-[#002366] transition-all shadow-sm">
                    <RefreshCw size={20} />
                  </button>
                </div>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                {otherActivities.map((act) => (
                  <ActivityCard 
                    key={act.id}
                    id={act.id}
                    img={act.image || "https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=500"}
                    tag={act.type || "Général"}
                    title={act.titre}
                    desc={act.description}
                    tagColor={act.type === 'Sports' ? "bg-green-100 text-green-700" : "bg-purple-100 text-purple-700"}
                    isRegistered={isRegistered(act.id)}
                    placesRestantes={act.places_restantes}
                    date={act.date}
                    onRegister={() => handleRegister(act.id)}
                    isRegistering={registeringId === act.id}
                    onClick={() => navigate(`/activities/${act.id}`)}
                  />
                ))}
              </div>

              {otherActivities.length === 0 && (
                <div className="text-center py-20 bg-white rounded-[40px]">
                  <Calendar size={64} className="mx-auto text-slate-200 mb-4" />
                  <p className="text-slate-400 font-bold">Aucune activité trouvée</p>
                </div>
              )}
            </div>

            {/* THE WEEK AHEAD SECTION */}
            <motion.div 
              variants={itemVars}
              className="col-span-1 lg:col-span-12 mt-6 md:mt-10 bg-[#002366] rounded-[35px] md:rounded-[50px] p-8 md:p-12 text-white flex flex-col xl:flex-row items-center justify-between shadow-2xl shadow-blue-900/30 relative overflow-hidden group gap-10"
            >
              <div className="relative z-10 text-center xl:text-left">
                <h3 className="text-3xl md:text-4xl font-black mb-4 tracking-tight">La Semaine Prochaine</h3>
                <p className="text-blue-200/60 font-bold max-w-sm mb-8 md:mb-10 mx-auto xl:mx-0">Synchronisez votre calendrier du portail avec votre appareil personnel.</p>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-[#002366] px-8 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest flex items-center gap-3 shadow-xl transition-all mx-auto xl:mx-0"
                >
                  <RefreshCw size={16} /> Sync. Calendrier
                </motion.button>
              </div>

              <div className="flex flex-wrap justify-center gap-4 relative z-10">
                <TimelineCard day="LUNDI" title="Prépa Débat" sub="15:30" />
                <TimelineCard day="MARDI" title="Coding 101" sub="16:00" />
                <TimelineCard day="MERCREDI" title="Gala d'Art" sub="18:00" active />
              </div>
              
              <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] -mr-40 -mt-40 group-hover:bg-blue-500/20 transition-all duration-700" />
            </motion.div>
          </div>
        </motion.div>

        <motion.button 
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setActiveTab('À venir')}
          className="fixed bottom-6 right-6 md:bottom-12 md:right-12 w-16 h-16 md:w-20 md:h-20 bg-orange-600 text-white rounded-full flex items-center justify-center shadow-2xl z-50 border-4 border-white"
        >
          <Plus className="w-8 h-8 md:w-10 md:h-10" strokeWidth={3} />
        </motion.button>
      </main>
    </div>
  );
};

// --- Sous-composants ---

const DeadlineItem = ({ icon, title, sub, color, onClick }) => (
  <motion.div 
    whileHover={{ x: 10, backgroundColor: '#F8FAFC' }}
    onClick={onClick}
    className={`flex items-center gap-4 md:gap-6 p-4 rounded-3xl cursor-pointer border-l-[6px] ${color} transition-all duration-300`}
  >
    <div className="w-12 h-12 md:w-14 md:h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-800 shadow-sm shrink-0">{icon}</div>
    <div className="min-w-0">
      <h5 className="font-black text-[#002366] text-sm md:text-lg leading-tight truncate">{title}</h5>
      <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mt-1">{sub}</p>
    </div>
  </motion.div>
);

const StatBox = ({ label, value }) => (
  <div className="text-center">
    <h5 className="text-3xl md:text-4xl font-black text-[#002366] tracking-tighter">{value}</h5>
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{label}</p>
  </div>
);

const ActivityCard = ({ id, img, tag, title, desc, tagColor, isRegistered, placesRestantes, date, onRegister, isRegistering, onClick }) => (
  <motion.div 
    whileHover={{ y: -15 }}
    className="bg-white rounded-[35px] md:rounded-[45px] overflow-hidden border border-slate-50 shadow-sm hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500 group flex flex-col h-full"
  >
    <div className="relative h-48 md:h-64 overflow-hidden shrink-0 cursor-pointer" onClick={onClick}>
      <motion.img 
        src={img} 
        whileHover={{ scale: 1.15 }}
        transition={{ duration: 0.8 }}
        className="w-full h-full object-cover"
      />
      <span className={`absolute top-6 left-6 md:top-8 md:left-8 px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg ${tagColor}`}>
        {tag}
      </span>
      {isRegistered && (
        <span className="absolute top-6 right-6 md:top-8 md:right-8 px-3 py-1.5 rounded-xl bg-green-500 text-white text-[9px] font-black uppercase tracking-widest shadow-lg flex items-center gap-1">
          <CheckCircle size={12} /> Inscrit
        </span>
      )}
    </div>
    <div className="p-6 md:p-10 flex flex-col flex-1">
      <h4 className="text-xl md:text-2xl font-black text-[#002366] leading-tight mb-4 group-hover:text-orange-600 transition-colors cursor-pointer" onClick={onClick}>{title}</h4>
      <p className="text-slate-400 font-bold text-xs md:text-sm leading-relaxed mb-8 line-clamp-2">{desc}</p>
      
      <div className="flex items-center gap-4 text-[10px] text-slate-400 mb-6">
        <span className="flex items-center gap-1"><Calendar size={12} /> {date ? new Date(date).toLocaleDateString('fr-FR') : 'Date à venir'}</span>
        <span className="flex items-center gap-1"><Users size={12} /> {placesRestantes || 0} places</span>
      </div>
      
      <div className="mt-auto flex justify-between items-center pt-6 md:pt-8 border-t border-slate-50">
        <div className="flex items-center gap-2">
          <div className="flex -space-x-3">
            {[1,2].map(i => <img key={i} className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 md:border-4 border-white shadow-sm" src={`https://i.pravatar.cc/100?u=${i+title}`} alt="utilisateur"/>)}
          </div>
          <span className="text-[11px] font-black text-slate-400">+{Math.floor(Math.random() * 50) + 20}</span>
        </div>

        {!isRegistered && new Date(date) >= new Date() ? (
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onRegister}
            disabled={isRegistering}
            className="bg-[#002366] text-white px-6 md:px-8 py-2 md:py-3 rounded-xl text-[11px] font-black uppercase tracking-widest shadow-lg hover:bg-orange-600 transition-all duration-300 disabled:opacity-50"
          >
            {isRegistering ? <Loader2 size={14} className="animate-spin" /> : "S'inscrire"}
          </motion.button>
        ) : isRegistered ? (
          <span className="text-green-600 font-black text-[11px] uppercase tracking-widest flex items-center gap-1">
            <CheckCircle size={14} /> Inscrit
          </span>
        ) : (
          <button onClick={onClick} className="text-[#002366] font-black text-[11px] uppercase tracking-widest hover:text-orange-600 transition-colors">
            Détails
          </button>
        )}
      </div>
    </div>
  </motion.div>
);

const TimelineCard = ({ day, title, sub, active }) => (
  <motion.div 
    whileHover={{ y: -5, scale: 1.02 }}
    className={`p-5 md:p-6 rounded-[24px] md:rounded-[28px] min-w-[140px] md:min-w-[180px] border transition-all cursor-pointer ${active ? 'bg-orange-600 border-transparent shadow-xl shadow-orange-600/30' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
  >
    <p className={`text-[9px] md:text-[10px] font-black tracking-widest mb-3 md:mb-4 ${active ? 'text-white/70' : 'text-slate-400'}`}>{day}</p>
    <h5 className="font-black text-sm md:text-base mb-1 tracking-tight">{title}</h5>
    <p className={`text-[10px] md:text-[11px] font-bold ${active ? 'text-white/80' : 'text-slate-400'}`}>{sub}</p>
  </motion.div>
);

export default Activities;