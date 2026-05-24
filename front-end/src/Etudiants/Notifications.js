import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, Megaphone, Wallet, BookOpen, GraduationCap, 
  CheckCheck, X, Clock, Trash2,
  ChevronLeft, ChevronRight, History, RefreshCw,
  Sparkles, TrendingUp, CalendarDays
} from 'lucide-react';
import api from './api';
import Navbar from './Navbar';

const Notifications = () => {
  const [activeCategory, setActiveCategory] = useState('Toutes les notifications');
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch data men l-API
  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await api.get('/student/notifications');
      const notificationsData = response.data?.data || [];
      setNotifications(notificationsData);
    } catch (error) {
      console.error("Erreur lors du chargement:", error);
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // Marquer une notification comme lue
  const markAsRead = async (id) => {
    try {
      await api.post(`/student/notifications/${id}/read`);
      setNotifications(notifications.map(notif => 
        notif.id === id ? { ...notif, dateLu: 'Oui' } : notif
      ));
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  // Supprimer une notification
  const deleteNotification = async (id) => {
    try {
      await api.delete(`/student/notifications/${id}`);
      setNotifications(notifications.filter(notif => notif.id !== id));
    } catch (error) {
      console.error("Erreur suppression:", error);
    }
  };

  // Tout marquer comme lu
  const markAllAsRead = async () => {
    try {
      await api.post('/student/notifications/read-all');
      setNotifications(notifications.map(notif => ({ ...notif, dateLu: 'Oui' })));
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  // Ajouter une notification (simulation push)
  const addNotification = async () => {
    const types = ['Annonces', 'Devoirs', 'Examens', 'Paiements'];
    const randomType = types[Math.floor(Math.random() * types.length)];
    const titles = {
      'Annonces': '📢 Nouvelle annonce scolaire',
      'Devoirs': '📝 Nouveau devoir à rendre',
      'Examens': '📅 Rappel examen',
      'Paiements': '💰 Rappel de paiement'
    };
    
    const newNotif = {
      type: randomType,
      titre: titles[randomType],
      contenu: `Ceci est une nouvelle ${randomType.toLowerCase()} ajoutée récemment. Veuillez prendre connaissance des détails dans votre espace personnel.`,
      dateCreation: new Date().toISOString(),
      dateLu: 'Non'
    };
    
    try {
      const response = await api.post('/student/notifications', newNotif);
      setNotifications([response.data.data, ...notifications]);
    } catch (error) {
      console.error("Erreur ajout:", error);
    }
  };

  // Filtrer notifications selon la catégorie active
  const filteredNotifications = notifications.filter(
    (n) => activeCategory === 'Toutes les notifications' || n.type === activeCategory
  );

  // Pagination
  const totalPages = Math.ceil(filteredNotifications.length / itemsPerPage);
  const paginatedNotifications = filteredNotifications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const unreadCount = notifications.filter((n) => n.dateLu === 'Non').length;

  const configByType = {
    'Annonces': { icon: <Megaphone />, color: 'blue', label: 'ANNONCE SCOLAIRE', gradient: 'from-blue-500 to-blue-700' },
    'Devoirs': { icon: <BookOpen />, color: 'emerald', label: 'DEVOIR À RENDRE', gradient: 'from-emerald-500 to-emerald-700' },
    'Examens': { icon: <GraduationCap />, color: 'purple', label: 'RAPPEL D\'EXAMEN', gradient: 'from-purple-500 to-purple-700' },
    'Paiements': { icon: <Wallet />, color: 'orange', label: 'RAPPEL DE PAIEMENT', gradient: 'from-orange-500 to-orange-700' }
  };

  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600 border-blue-200 shadow-blue-100',
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-200 shadow-emerald-100',
    purple: 'bg-purple-50 text-purple-600 border-purple-200 shadow-purple-100',
    orange: 'bg-orange-50 text-orange-600 border-orange-200 shadow-orange-100'
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { y: 0, x: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  // Reset page quand on change de catégorie
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 font-sans">
      <main className="flex-1 flex flex-col min-w-0">
        <Navbar />

        <div className="flex-1 overflow-y-auto p-5 md:p-8 lg:p-10">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-[1400px] mx-auto"
          >

            {/* Header avec statistiques */}
            <div className="flex flex-col lg:flex-row justify-between items-start gap-6 mb-8 lg:mb-12">
              <div>
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 mb-3"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-[#002366] to-[#0044aa] rounded-2xl flex items-center justify-center shadow-lg">
                    <Bell size={20} className="text-white" />
                  </div>
                  <h1 className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-[#002366] to-[#0044aa] bg-clip-text text-transparent tracking-tight">
                    Notifications
                  </h1>
                </motion.div>
                <p className="text-slate-500 font-medium text-sm lg:text-base ml-1">
                  Vous avez{" "}
                  <span className="bg-gradient-to-r from-[#FF7A00] to-[#ff9a3c] bg-clip-text text-transparent font-black text-lg">
                    {unreadCount} alertes non lues
                  </span>
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <motion.button 
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={markAllAsRead}
                  className="flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-[#002366] to-[#003399] text-white rounded-xl text-xs font-black shadow-xl shadow-blue-900/20 transition-all hover:shadow-2xl"
                >
                  <CheckCheck size={16} /> TOUT MARQUER COMME LU
                </motion.button>

                <motion.button 
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={addNotification}
                  className="flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl text-xs font-black shadow-xl shadow-orange-500/20 transition-all hover:shadow-2xl"
                >
                  <RefreshCw size={16} /> SIMULER NOTIFICATION
                </motion.button>
              </div>
            </div>

            {/* Statistiques rapides */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10"
            >
              <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-2">
                  <Megaphone size={18} className="text-blue-500" />
                  <span className="text-2xl font-black text-[#002366]">{notifications.filter(n => n.type === 'Annonces').length}</span>
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Annonces</p>
              </div>
              <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-2">
                  <BookOpen size={18} className="text-emerald-500" />
                  <span className="text-2xl font-black text-[#002366]">{notifications.filter(n => n.type === 'Devoirs').length}</span>
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Devoirs</p>
              </div>
              <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-2">
                  <GraduationCap size={18} className="text-purple-500" />
                  <span className="text-2xl font-black text-[#002366]">{notifications.filter(n => n.type === 'Examens').length}</span>
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Examens</p>
              </div>
              <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-2">
                  <Wallet size={18} className="text-orange-500" />
                  <span className="text-2xl font-black text-[#002366]">{notifications.filter(n => n.type === 'Paiements').length}</span>
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Paiements</p>
              </div>
            </motion.div>

            <div className="grid grid-cols-12 gap-6 lg:gap-8">

              {/* Left Column - Catégories (Filtrage) */}
              <div className="col-span-12 lg:col-span-3 space-y-6">
                <motion.div 
                  variants={itemVariants} 
                  className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xl hover:shadow-2xl transition-all"
                >
                  <div className="flex items-center gap-2 mb-5 px-2">
                    <div className="w-1 h-6 bg-gradient-to-b from-[#002366] to-[#FF7A00] rounded-full" />
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Catégories</p>
                  </div>
                  <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0">
                    <CategoryItem
                      icon={<Bell size={18}/>}
                      label="Toutes"
                      count={notifications.length}
                      active={activeCategory === 'Toutes les notifications'}
                      onClick={() => handleCategoryChange('Toutes les notifications')}
                    />
                    <CategoryItem
                      icon={<Megaphone size={18}/>}
                      label="Annonces"
                      count={notifications.filter(n => n.type === 'Annonces').length}
                      active={activeCategory === 'Annonces'}
                      onClick={() => handleCategoryChange('Annonces')}
                    />
                    <CategoryItem
                      icon={<BookOpen size={18}/>}
                      label="Devoirs"
                      count={notifications.filter(n => n.type === 'Devoirs').length}
                      active={activeCategory === 'Devoirs'}
                      onClick={() => handleCategoryChange('Devoirs')}
                    />
                    <CategoryItem
                      icon={<Wallet size={18}/>}
                      label="Paiements"
                      count={notifications.filter(n => n.type === 'Paiements').length}
                      active={activeCategory === 'Paiements'}
                      onClick={() => handleCategoryChange('Paiements')}
                    />
                    <CategoryItem
                      icon={<GraduationCap size={18}/>}
                      label="Examens"
                      count={notifications.filter(n => n.type === 'Examens').length}
                      active={activeCategory === 'Examens'}
                      onClick={() => handleCategoryChange('Examens')}
                    />
                  </div>
                </motion.div>

                <motion.div 
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="bg-gradient-to-br from-[#002366] to-[#001a4d] rounded-2xl p-6 text-white relative overflow-hidden shadow-2xl"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12" />
                  <div className="relative z-10">
                    <Sparkles size={24} className="text-orange-400 mb-4" />
                    <h3 className="text-xl font-black mb-3">Restez Connecté</h3>
                    <p className="text-blue-100/80 text-sm leading-relaxed font-medium">
                      Activez vos notifications pour ne rien rater des actualités importantes.
                    </p>
                    <div className="mt-6 flex items-center gap-2 text-xs text-blue-200/60">
                      <TrendingUp size={14} />
                      <span>Mis à jour en temps réel</span>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Right Column - Notifications */}
              <div className="col-span-12 lg:col-span-9 space-y-4">
                {loading ? (
                  <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl">
                    <div className="w-12 h-12 border-4 border-[#002366] border-t-[#FF7A00] rounded-full animate-spin mb-4" />
                    <p className="text-slate-400 font-black text-sm uppercase tracking-wider">Chargement...</p>
                  </div>
                ) : paginatedNotifications.length === 0 ? (
                  <div className="text-center py-20 bg-white rounded-2xl border border-slate-100 shadow-sm">
                    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Bell size={40} className="text-slate-300" />
                    </div>
                    <p className="text-slate-400 font-black text-lg">Aucune notification</p>
                    <p className="text-slate-300 text-sm mt-1">dans la catégorie "{activeCategory}"</p>
                  </div>
                ) : (
                  <AnimatePresence mode="popLayout">
                    {paginatedNotifications.map((notif, idx) => {
                      const style = configByType[notif.type] || configByType['Annonces'];
                      return (
                        <NotificationCard 
                          key={notif.id}
                          id={notif.id}
                          type={style.label}
                          title={notif.titre}
                          desc={notif.contenu}
                          time={new Date(notif.dateCreation).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}
                          icon={style.icon}
                          color={style.color}
                          gradient={style.gradient}
                          colorClass={colorClasses[style.color]}
                          isNew={notif.dateLu === 'Non'}
                          onMarkAsRead={markAsRead}
                          onDelete={deleteNotification}
                          index={idx}
                        />
                      );
                    })}
                  </AnimatePresence>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center gap-2 pt-6">
                    <PaginationBtn 
                      icon={<ChevronLeft size={16}/>} 
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                    />
                    {[...Array(totalPages)].map((_, i) => (
                      <PaginationBtn 
                        key={i}
                        label={String(i + 1).padStart(2, '0')}
                        active={currentPage === i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                      />
                    ))}
                    <PaginationBtn 
                      icon={<ChevronRight size={16}/>} 
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                    />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

/* --- Notification Card Style Pro --- */
const NotificationCard = ({ id, type, title, desc, time, icon, color, gradient, colorClass, isNew, onMarkAsRead, onDelete, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const getTimeIcon = () => {
    const now = new Date();
    const notifDate = new Date(time);
    const diffDays = Math.floor((now - notifDate) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return "Aujourd'hui";
    if (diffDays === 1) return "Hier";
    return time;
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`bg-white rounded-2xl p-5 border transition-all duration-300 ${
        isNew ? 'border-l-4 border-l-[#FF7A00] shadow-lg' : 'border-slate-100 shadow-sm hover:shadow-xl'
      }`}
    >
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Icon */}
        <motion.div 
          whileHover={{ rotateY: 180, scale: 1.05 }}
          className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 shadow-md ${colorClass} mx-auto sm:mx-0`}
        >
          {React.cloneElement(icon, { size: 24 })}
        </motion.div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-[9px] font-black px-2 py-1 rounded-full uppercase tracking-wider ${
                color === 'blue' ? 'bg-blue-100 text-blue-700' :
                color === 'emerald' ? 'bg-emerald-100 text-emerald-700' :
                color === 'purple' ? 'bg-purple-100 text-purple-700' :
                'bg-orange-100 text-orange-700'
              }`}>
                {type}
              </span>
              {isNew && (
                <span className="text-[9px] font-black px-2 py-1 rounded-full bg-red-100 text-red-600 uppercase tracking-wider">
                  Nouveau
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-slate-400 text-[10px] font-medium">
              <Clock size={12} />
              <span>{getTimeIcon()}</span>
            </div>
          </div>

          <h3 className="text-base font-black text-[#002366] mb-2 leading-relaxed">
            {title}
          </h3>
          <p className="text-slate-500 text-xs leading-relaxed mb-4 max-w-2xl">
            {desc}
          </p>

          <div className="flex gap-3">
            {isNew && (
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onMarkAsRead(id)}
                className={`px-4 py-2 bg-gradient-to-r ${gradient} text-white rounded-lg text-[10px] font-black shadow-md transition-all`}
              >
                ✓ MARQUER COMME LU
              </motion.button>
            )}
          </div>
        </div>

        {/* Delete button */}
        <motion.button 
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          onClick={() => onDelete(id)} 
          className="absolute top-3 right-3 text-slate-300 hover:text-red-500 transition-colors"
        >
          <Trash2 size={16} />
        </motion.button>
      </div>
    </motion.div>
  );
};

const CategoryItem = ({ icon, label, count, active, onClick }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ x: 5, backgroundColor: '#f8fafc' }}
    className={`flex items-center justify-between p-3 rounded-xl transition-all w-full ${
      active ? 'bg-gradient-to-r from-blue-50 to-transparent text-[#002366] border-r-2 border-[#FF7A00]' : 'text-slate-400 hover:bg-slate-50'
    }`}
  >
    <div className="flex items-center gap-3">
      <span className={active ? 'text-[#FF7A00]' : 'text-slate-300'}>{icon}</span>
      <span className="text-xs font-bold uppercase tracking-wider whitespace-nowrap">{label}</span>
    </div>
    {count !== undefined && (
      <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${
        active ? 'bg-[#FF7A00] text-white' : 'bg-slate-100 text-slate-400'
      }`}>
        {count}
      </span>
    )}
  </motion.button>
);

const PaginationBtn = ({ label, icon, active, onClick, disabled }) => (
  <motion.button
    whileHover={{ y: -2, scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    disabled={disabled}
    className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black transition-all ${
      active
        ? 'bg-gradient-to-r from-[#002366] to-[#0044aa] text-white shadow-lg'
        : disabled
        ? 'bg-slate-100 text-slate-300 cursor-not-allowed'
        : 'bg-white text-slate-500 border border-slate-200 hover:border-[#002366] hover:text-[#002366]'
    }`}
  >
    {label || icon}
  </motion.button>
);

export default Notifications;