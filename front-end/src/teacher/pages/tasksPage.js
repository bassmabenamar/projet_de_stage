import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Filter, Search, Calendar, Clock, 
  CheckCircle, Circle, Trash2, Edit2, 
  Loader2, AlertCircle, ChevronDown, 
  Star, Flag, Bell, X, Save, ListTodo,
  CheckSquare, Square, FolderOpen,
  BookOpen, Users
} from 'lucide-react';

import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import API from '../../services/api';

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [newTask, setNewTask] = useState({
    titre: '',
    description: '',
    priorite: 'moyenne',
    date_limite: '',
    heure_limite: '',
    categorie: 'enseignement',
    statut: 'en_attente',
    rappel: false,
    temps_rappel: null
  });
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    overdue: 0
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await API.get('/teacher/tasks');
      setTasks(response.data);
      calculateStats(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError('Impossible de charger les tâches');
      
      // Fallback data
      const fallbackTasks = [
        {
          id: 1,
          titre: "Corriger les devoirs de Mathématiques",
          description: "Devoir sur les équations différentielles - Classe 10A",
          priorite: "haute",
          statut: "en_attente",
          date_limite: "2024-03-20",
          heure_limite: "18:00",
          categorie: "correction",
          created_at: "2024-03-15T10:00:00"
        },
        {
          id: 2,
          titre: "Préparer le cours de Physique",
          description: "Chapitre sur la mécanique quantique",
          priorite: "moyenne",
          statut: "en_cours",
          date_limite: "2024-03-21",
          heure_limite: "14:00",
          categorie: "preparation",
          created_at: "2024-03-16T09:30:00"
        },
        {
          id: 3,
          titre: "Réunion des professeurs",
          description: "Salle de conférence A",
          priorite: "haute",
          statut: "en_attente",
          date_limite: "2024-03-18",
          heure_limite: "15:00",
          categorie: "reunion",
          created_at: "2024-03-10T14:00:00"
        },
        {
          id: 4,
          titre: "Mettre à jour les notes",
          description: "Saisir les notes du dernier examen",
          priorite: "basse",
          statut: "terminee",
          date_limite: "2024-03-17",
          heure_limite: "12:00",
          categorie: "correction",
          created_at: "2024-03-12T11:00:00"
        }
      ];
      setTasks(fallbackTasks);
      calculateStats(fallbackTasks);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (tasksList) => {
    const now = new Date();
    const stats = {
      total: tasksList.length,
      completed: tasksList.filter(t => t.statut === 'terminee').length,
      pending: tasksList.filter(t => t.statut !== 'terminee').length,
      overdue: tasksList.filter(t => {
        if (t.statut === 'terminee') return false;
        if (!t.date_limite) return false;
        const dueDate = new Date(`${t.date_limite} ${t.heure_limite || '23:59'}`);
        return dueDate < now;
      }).length
    };
    setStats(stats);
  };

  const addTask = async () => {
    if (!newTask.titre) {
      setError('Le titre est requis');
      return;
    }

    try {
      const response = await API.post('/teacher/tasks', newTask);
      setTasks([response.data, ...tasks]);
      calculateStats([response.data, ...tasks]);
      setShowAddModal(false);
      setNewTask({
        titre: '',
        description: '',
        priorite: 'moyenne',
        date_limite: '',
        heure_limite: '',
        categorie: 'enseignement',
        statut: 'en_attente',
        rappel: false,
        temps_rappel: null
      });
      setSuccess('Tâche ajoutée avec succès');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error('Error adding task:', err);
      setError('Impossible d\'ajouter la tâche');
      setTimeout(() => setError(null), 3000);
    }
  };

  const updateTask = async () => {
    if (!selectedTask || !selectedTask.titre) return;

    try {
      const response = await API.put(`/teacher/tasks/${selectedTask.id}`, selectedTask);
      const updatedTasks = tasks.map(t => t.id === selectedTask.id ? response.data : t);
      setTasks(updatedTasks);
      calculateStats(updatedTasks);
      setShowEditModal(false);
      setSelectedTask(null);
      setSuccess('Tâche mise à jour avec succès');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error('Error updating task:', err);
      setError('Impossible de mettre à jour la tâche');
      setTimeout(() => setError(null), 3000);
    }
  };

  const toggleTaskStatus = async (task) => {
    let newStatut;
    if (task.statut === 'en_attente') newStatut = 'en_cours';
    else if (task.statut === 'en_cours') newStatut = 'terminee';
    else newStatut = 'en_attente';

    try {
      const response = await API.put(`/teacher/tasks/${task.id}`, {
        ...task,
        statut: newStatut
      });
      const updatedTasks = tasks.map(t => t.id === task.id ? response.data : t);
      setTasks(updatedTasks);
      calculateStats(updatedTasks);
    } catch (err) {
      console.error('Error toggling task status:', err);
      setError('Impossible de modifier le statut');
      setTimeout(() => setError(null), 3000);
    }
  };

  const deleteTask = async (taskId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
      try {
        await API.delete(`/teacher/tasks/${taskId}`);
        const newTasks = tasks.filter(t => t.id !== taskId);
        setTasks(newTasks);
        calculateStats(newTasks);
        setSuccess('Tâche supprimée avec succès');
        setTimeout(() => setSuccess(null), 3000);
      } catch (err) {
        console.error('Error deleting task:', err);
        setError('Impossible de supprimer la tâche');
        setTimeout(() => setError(null), 3000);
      }
    }
  };

  const getFilteredTasks = () => {
    let filtered = tasks;
    
    if (filter === 'pending') {
      filtered = filtered.filter(t => t.statut === 'en_attente' || t.statut === 'en_cours');
    } else if (filter === 'completed') {
      filtered = filtered.filter(t => t.statut === 'terminee');
    } else if (filter === 'overdue') {
      const now = new Date();
      filtered = filtered.filter(t => {
        if (t.statut === 'terminee') return false;
        if (!t.date_limite) return false;
        const due = new Date(`${t.date_limite} ${t.heure_limite || '23:59'}`);
        return due < now;
      });
    }
    
    if (searchTerm) {
      filtered = filtered.filter(t => 
        t.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered.sort((a, b) => {
      const dateA = new Date(`${a.date_limite} ${a.heure_limite || '00:00'}`);
      const dateB = new Date(`${b.date_limite} ${b.heure_limite || '00:00'}`);
      return dateA - dateB;
    });
  };

  const getPriorityColor = (priorite) => {
    switch(priorite) {
      case 'haute': return 'bg-red-100 text-red-700 border-red-200';
      case 'moyenne': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'basse': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPriorityLabel = (priorite) => {
    switch(priorite) {
      case 'haute': return 'Haute';
      case 'moyenne': return 'Moyenne';
      case 'basse': return 'Basse';
      default: return priorite;
    }
  };

  const getCategoryIcon = (categorie) => {
    switch(categorie) {
      case 'correction': return <Star size={14} />;
      case 'preparation': return <BookOpen size={14} />;
      case 'reunion': return <Users size={14} />;
      default: return <ListTodo size={14} />;
    }
  };

  const getCategoryLabel = (categorie) => {
    switch(categorie) {
      case 'correction': return 'Correction';
      case 'preparation': return 'Préparation';
      case 'reunion': return 'Réunion';
      case 'enseignement': return 'Enseignement';
      default: return categorie;
    }
  };

  const getStatusLabel = (statut) => {
    switch(statut) {
      case 'en_attente': return 'En attente';
      case 'en_cours': return 'En cours';
      case 'terminee': return 'Terminée';
      default: return statut;
    }
  };

  const formatDate = (date, time) => {
    if (!date) return 'Pas de date';
    const dateObj = new Date(date);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (dateObj.toDateString() === today.toDateString()) {
      return `Aujourd'hui à ${time || '23:59'}`;
    } else if (dateObj.toDateString() === tomorrow.toDateString()) {
      return `Demain à ${time || '23:59'}`;
    } else {
      return `${dateObj.toLocaleDateString('fr-FR')} à ${time || '23:59'}`;
    }
  };

  const isOverdue = (task) => {
    if (task.statut === 'terminee') return false;
    if (!task.date_limite) return false;
    const dueDate = new Date(`${task.date_limite} ${task.heure_limite || '23:59'}`);
    return dueDate < new Date();
  };

  const filteredTasks = getFilteredTasks();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  if (loading && tasks.length === 0) {
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
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans text-[#1E293B]">
      <Sidebar />
      <main className="flex-1 flex flex-col relative overflow-hidden">
        <Navbar />
        
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {/* Success/Error Messages */}
          <AnimatePresence>
            {(success || error) && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`fixed top-20 right-8 z-50 p-4 rounded-2xl text-sm font-semibold shadow-lg ${
                  success ? 'bg-emerald-50 border border-emerald-200 text-emerald-700' : 'bg-red-50 border border-red-200 text-red-700'
                }`}
              >
                {success || error}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="max-w-[1400px] mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h2 className="text-[12px] font-black text-blue-600 uppercase tracking-[0.2em] mb-2">
                Gestion des Tâches
              </h2>
              <h1 className="text-3xl font-black text-[#002366] mb-2">
                Mes Tâches
              </h1>
              <p className="text-slate-500">
                Gérez votre liste de tâches et restez organisé
              </p>
            </motion.div>

            {/* Stats Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
            >
              <StatCard 
                icon={<ListTodo size={24} />}
                label="Total"
                value={stats.total}
                color="blue"
              />
              <StatCard 
                icon={<Circle size={24} />}
                label="En cours"
                value={stats.pending}
                color="orange"
              />
              <StatCard 
                icon={<CheckCircle size={24} />}
                label="Terminées"
                value={stats.completed}
                color="green"
              />
              <StatCard 
                icon={<AlertCircle size={24} />}
                label="En retard"
                value={stats.overdue}
                color="red"
              />
            </motion.div>

            {/* Filters & Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-4 mb-8 shadow-sm border border-slate-100"
            >
              <div className="flex flex-wrap gap-4 items-center justify-between">
                <div className="flex gap-2">
                  {['all', 'pending', 'completed', 'overdue'].map((f) => (
                    <button
                      key={f}
                      onClick={() => setFilter(f)}
                      className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                        filter === f
                          ? 'bg-[#002366] text-white shadow-md'
                          : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                      }`}
                    >
                      {f === 'all' ? 'Toutes' : f === 'pending' ? 'En cours' : f === 'completed' ? 'Terminées' : 'En retard'}
                    </button>
                  ))}
                </div>

                <div className="flex gap-3">
                  <div className="relative">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Rechercher..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#002366] w-64"
                    />
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center gap-2 px-5 py-2 bg-[#002366] text-white rounded-xl font-bold text-sm shadow-lg"
                  >
                    <Plus size={18} />
                    Nouvelle tâche
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Tasks List */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-3"
            >
              {filteredTasks.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl">
                  <FolderOpen size={64} className="mx-auto text-slate-300 mb-4" />
                  <h3 className="text-xl font-bold text-[#002366] mb-2">Aucune tâche</h3>
                  <p className="text-slate-400">Commencez par créer votre première tâche</p>
                </div>
              ) : (
                filteredTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onToggle={() => toggleTaskStatus(task)}
                    onEdit={() => {
                      setSelectedTask(task);
                      setShowEditModal(true);
                    }}
                    onDelete={() => deleteTask(task.id)}
                    isOverdue={isOverdue(task)}
                    formatDate={formatDate}
                    getPriorityColor={getPriorityColor}
                    getPriorityLabel={getPriorityLabel}
                    getCategoryIcon={getCategoryIcon}
                    getCategoryLabel={getCategoryLabel}
                    getStatusLabel={getStatusLabel}
                  />
                ))
              )}
            </motion.div>
          </div>
        </div>
      </main>

      {/* Add Task Modal */}
      <AnimatePresence>
        {showAddModal && (
          <TaskModal
            title="Nouvelle Tâche"
            task={newTask}
            setTask={setNewTask}
            onSave={addTask}
            onClose={() => setShowAddModal(false)}
          />
        )}
      </AnimatePresence>

      {/* Edit Task Modal */}
      <AnimatePresence>
        {showEditModal && selectedTask && (
          <TaskModal
            title="Modifier la Tâche"
            task={selectedTask}
            setTask={setSelectedTask}
            onSave={updateTask}
            onClose={() => {
              setShowEditModal(false);
              setSelectedTask(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

/* Components */

const StatCard = ({ icon, label, value, color }) => {
  const colors = {
    blue: "bg-blue-50 text-blue-600",
    orange: "bg-orange-50 text-orange-600",
    green: "bg-green-50 text-green-600",
    red: "bg-red-50 text-red-600"
  };

  return (
    <motion.div 
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm"
    >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colors[color]} mb-3`}>
        {icon}
      </div>
      <p className="text-2xl font-black text-[#002366]">{value}</p>
      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{label}</p>
    </motion.div>
  );
};

const TaskCard = ({ 
  task, onToggle, onEdit, onDelete, isOverdue, 
  formatDate, getPriorityColor, getPriorityLabel,
  getCategoryIcon, getCategoryLabel, getStatusLabel 
}) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, x: -20 },
      visible: { opacity: 1, x: 0 }
    }}
    whileHover={{ scale: 1.01 }}
    className={`bg-white rounded-2xl p-5 border transition-all shadow-sm hover:shadow-md ${
      task.statut === 'terminee' ? 'border-green-100 bg-green-50/30' : 
      isOverdue ? 'border-red-100 bg-red-50/30' : 'border-slate-100'
    }`}
  >
    <div className="flex items-start gap-4">
      {/* Checkbox */}
      <button onClick={onToggle} className="mt-1">
        {task.statut === 'terminee' ? (
          <CheckCircle size={22} className="text-green-500" />
        ) : (
          <Circle size={22} className="text-slate-300 hover:text-blue-400 transition-colors" />
        )}
      </button>

      {/* Content */}
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2 flex-wrap">
          <h3 className={`text-base font-black ${
            task.statut === 'terminee' ? 'text-slate-400 line-through' : 'text-[#002366]'
          }`}>
            {task.titre}
          </h3>
          
          <span className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider border ${getPriorityColor(task.priorite)}`}>
            {getPriorityLabel(task.priorite)}
          </span>
          
          <span className="flex items-center gap-1 px-2 py-1 rounded-lg text-[9px] font-black bg-slate-100 text-slate-600">
            {getCategoryIcon(task.categorie)}
            {getCategoryLabel(task.categorie)}
          </span>

          <span className="flex items-center gap-1 px-2 py-1 rounded-lg text-[9px] font-black bg-slate-100 text-slate-600">
            {getStatusLabel(task.statut)}
          </span>
          
          {isOverdue && task.statut !== 'terminee' && (
            <span className="flex items-center gap-1 px-2 py-1 rounded-lg text-[9px] font-black bg-red-100 text-red-600">
              <AlertCircle size={12} />
              En retard
            </span>
          )}
        </div>
        
        {task.description && (
          <p className="text-sm text-slate-500 mb-3">{task.description}</p>
        )}
        
        <div className="flex items-center gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            {formatDate(task.date_limite, task.heure_limite)}
          </div>
          <div className="flex items-center gap-1">
            <Clock size={14} />
            Créée le {new Date(task.created_at).toLocaleDateString('fr-FR')}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={onEdit}
          className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <Edit2 size={18} className="text-slate-400 hover:text-blue-600" />
        </button>
        <button
          onClick={onDelete}
          className="p-2 rounded-lg hover:bg-red-50 transition-colors"
        >
          <Trash2 size={18} className="text-slate-400 hover:text-red-600" />
        </button>
      </div>
    </div>
  </motion.div>
);

const TaskModal = ({ title, task, setTask, onSave, onClose }) => {
  const handleChange = (field, value) => {
    setTask(prev => ({ ...prev, [field]: value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-black text-[#002366]">{title}</h3>
          <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-black text-slate-500 uppercase mb-1">Titre *</label>
            <input
              type="text"
              value={task.titre}
              onChange={(e) => handleChange('titre', e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002366]"
              placeholder="Ex: Corriger les devoirs"
            />
          </div>

          <div>
            <label className="block text-xs font-black text-slate-500 uppercase mb-1">Description</label>
            <textarea
              value={task.description}
              onChange={(e) => handleChange('description', e.target.value)}
              rows="3"
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002366] resize-none"
              placeholder="Description détaillée..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black text-slate-500 uppercase mb-1">Priorité</label>
              <select
                value={task.priorite}
                onChange={(e) => handleChange('priorite', e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002366]"
              >
                <option value="basse">Basse</option>
                <option value="moyenne">Moyenne</option>
                <option value="haute">Haute</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-black text-slate-500 uppercase mb-1">Catégorie</label>
              <select
                value={task.categorie}
                onChange={(e) => handleChange('categorie', e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002366]"
              >
                <option value="enseignement">Enseignement</option>
                <option value="correction">Correction</option>
                <option value="preparation">Préparation</option>
                <option value="reunion">Réunion</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black text-slate-500 uppercase mb-1">Date limite</label>
              <input
                type="date"
                value={task.date_limite}
                onChange={(e) => handleChange('date_limite', e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002366]"
              />
            </div>

            <div>
              <label className="block text-xs font-black text-slate-500 uppercase mb-1">Heure limite</label>
              <input
                type="time"
                value={task.heure_limite}
                onChange={(e) => handleChange('heure_limite', e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002366]"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={task.rappel}
                onChange={(e) => handleChange('rappel', e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-[#002366] focus:ring-[#002366]"
              />
              <span className="text-xs font-bold text-slate-600">Activer le rappel</span>
            </label>

            {task.rappel && (
              <select
                value={task.temps_rappel || ''}
                onChange={(e) => handleChange('temps_rappel', parseInt(e.target.value))}
                className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#002366]"
              >
                <option value="">Au moment de l'échéance</option>
                <option value="15">15 minutes avant</option>
                <option value="30">30 minutes avant</option>
                <option value="60">1 heure avant</option>
                <option value="1440">1 jour avant</option>
              </select>
            )}
          </div>
        </div>

        <div className="flex gap-3 mt-8">
          <button
            onClick={onSave}
            className="flex-1 bg-[#002366] text-white py-3 rounded-xl font-bold hover:bg-blue-800 transition-colors flex items-center justify-center gap-2"
          >
            <Save size={18} />
            Enregistrer
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-slate-100 text-slate-600 py-3 rounded-xl font-bold hover:bg-slate-200 transition-colors"
          >
            Annuler
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TasksPage;