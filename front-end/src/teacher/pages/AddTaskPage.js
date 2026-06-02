import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Save, Calendar, Clock, 
  Flag, Tag, FileText, AlertCircle,
  CheckCircle, X, Loader2, ListTodo,
  BookOpen, Users, Star, Coffee,
  Bell, Eye
} from 'lucide-react';

import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import API from '../../services/api';

const AddTaskPage = () => {
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    priorite: 'moyenne',
    categorie: 'enseignement',
    date_limite: '',
    heure_limite: '',
    rappel: false,
    temps_rappel: null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.titre.trim()) {
      setError('Le titre de la tâche est requis');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const payload = {
  titre: formData.titre,
  description: formData.description,
  priorite: formData.priorite,
  categorie: formData.categorie,
  statut: "en_attente",
  date_limite: formData.date_limite,
  heure_limite: formData.heure_limite,
  rappel: formData.rappel,
  temps_rappel: formData.temps_rappel,
};

      const response = await API.post('/teacher/tasks', payload);

      setSuccess('Tâche créée avec succès !');

      setTimeout(() => {
        window.location.href = '/tasks';
      }, 2000);

    } catch (err) {
      console.error('Error creating task:', err);
      setError(err.response?.data?.message || 'Impossible de créer la tâche');
    } finally {
      setLoading(false);
    }
  };

  const getPriorityIcon = (priorite) => {
    switch(priorite) {
      case 'haute': return <Flag size={18} className="text-red-500" />;
      case 'moyenne': return <Flag size={18} className="text-orange-500" />;
      case 'basse': return <Flag size={18} className="text-green-500" />;
      default: return <Flag size={18} />;
    }
  };

  const getCategoryIcon = (categorie) => {
    switch(categorie) {
      case 'correction': return <Star size={18} />;
      case 'preparation': return <BookOpen size={18} />;
      case 'reunion': return <Users size={18} />;
      case 'enseignement': return <ListTodo size={18} />;
      default: return <Tag size={18} />;
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

  const getCategoryLabel = (categorie) => {
    switch(categorie) {
      case 'correction': return 'Correction';
      case 'preparation': return 'Préparation';
      case 'reunion': return 'Réunion';
      case 'enseignement': return 'Enseignement';
      default: return categorie;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans text-[#1E293B]">
      <Sidebar />
      
      <main className="flex-1 flex flex-col relative overflow-hidden">
        <Navbar />
        
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-8"
            >
              <button 
                onClick={() => window.location.href = '/tasks'}
                className="flex items-center gap-2 text-slate-400 font-bold text-sm mb-4 hover:text-[#002366] transition-colors"
              >
                <ArrowLeft size={18} /> Retour aux tâches
              </button>
              
              <h1 className="text-3xl font-[1000] text-[#002366] tracking-tighter">
                Créer une Nouvelle Tâche
              </h1>
              <p className="text-slate-400 font-bold text-sm mt-1">
                Organisez votre travail et suivez vos progrès
              </p>
            </motion.div>

            {/* Success Message */}
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-2xl text-sm font-semibold flex items-center gap-2"
              >
                <CheckCircle size={18} />
                {success}
              </motion.div>
            )}

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-sm font-semibold flex items-center gap-2"
              >
                <AlertCircle size={18} />
                {error}
              </motion.div>
            )}

            {/* Form */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleSubmit}
              className="bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden"
            >
              <div className="p-8 space-y-8">
                {/* Title */}
                <div>
                  <label className="block text-[11px] font-[1000] text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1">
                    Titre de la tâche *
                  </label>
                  <input
                    type="text"
                    value={formData.titre}
                    onChange={(e) => handleChange('titre', e.target.value)}
                    placeholder="Ex: Corriger les devoirs de Mathématiques"
                    className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-[#002366] focus:bg-white rounded-2xl outline-none transition-all text-[#002366] font-bold text-lg"
                    autoFocus
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-[11px] font-[1000] text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    rows="5"
                    placeholder="Décrivez la tâche en détail..."
                    className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-[#002366] focus:bg-white rounded-2xl outline-none transition-all text-[#002366] font-medium resize-none"
                  />
                </div>

                {/* Priority & Category Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Priority */}
                  <div>
                    <label className="block text-[11px] font-[1000] text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1">
                      Priorité
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {['haute', 'moyenne', 'basse'].map((priorite) => (
                        <button
                          key={priorite}
                          type="button"
                          onClick={() => handleChange('priorite', priorite)}
                          className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-black text-sm transition-all ${
                            formData.priorite === priorite
                              ? priorite === 'haute'
                                ? 'bg-red-500 text-white shadow-lg shadow-red-500/30'
                                : priorite === 'moyenne'
                                ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                                : 'bg-green-500 text-white shadow-lg shadow-green-500/30'
                              : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                          }`}
                        >
                          {getPriorityIcon(priorite)}
                          {getPriorityLabel(priorite)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-[11px] font-[1000] text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1">
                      Catégorie
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { value: 'enseignement', label: 'Enseignement', icon: <ListTodo size={16} /> },
                        { value: 'correction', label: 'Correction', icon: <Star size={16} /> },
                        { value: 'preparation', label: 'Préparation', icon: <BookOpen size={16} /> },
                        { value: 'reunion', label: 'Réunion', icon: <Users size={16} /> }
                      ].map((cat) => (
                        <button
                          key={cat.value}
                          type="button"
                          onClick={() => handleChange('categorie', cat.value)}
                          className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                            formData.categorie === cat.value
                              ? 'bg-[#002366] text-white shadow-lg shadow-blue-900/30'
                              : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                          }`}
                        >
                          {cat.icon}
                          {cat.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Due Date & Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[11px] font-[1000] text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1">
                      Date limite
                    </label>
                    <div className="relative">
                      <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="date"
                        value={formData.date_limite}
                        onChange={(e) => handleChange('date_limite', e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-[#002366] focus:bg-white rounded-2xl outline-none transition-all text-[#002366] font-bold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-[1000] text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1">
                      Heure limite
                    </label>
                    <div className="relative">
                      <Clock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="time"
                        value={formData.heure_limite}
                        onChange={(e) => handleChange('heure_limite', e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-[#002366] focus:bg-white rounded-2xl outline-none transition-all text-[#002366] font-bold"
                      />
                    </div>
                  </div>
                </div>

                {/* Reminder Section */}
                <div className="bg-slate-50 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                        <Bell size={18} className="text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-black text-[#002366]">Rappel</h3>
                        <p className="text-[10px] text-slate-400">Recevez une notification</p>
                      </div>
                    </div>
                    
                    <button
                      type="button"
                      onClick={() => handleChange('rappel', !formData.rappel)}
                      className={`w-12 h-6 rounded-full transition-all ${
                        formData.rappel ? 'bg-[#002366]' : 'bg-slate-300'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transform transition-all ${
                        formData.rappel ? 'translate-x-6' : 'translate-x-0.5'
                      } mt-0.5`} />
                    </button>
                  </div>

                  {formData.rappel && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-4"
                    >
                      <label className="block text-[11px] font-[1000] text-slate-400 uppercase tracking-[0.2em] mb-2 ml-1">
                        Rappeler avant
                      </label>
                      <select
                        value={formData.temps_rappel || ''}
                        onChange={(e) => handleChange('temps_rappel', parseInt(e.target.value))}
                        className="w-full px-4 py-3 bg-white border-2 border-slate-200 focus:border-[#002366] rounded-xl outline-none transition-all text-[#002366] font-bold"
                      >
                        <option value="">Au moment de l'échéance</option>
                        <option value="15">15 minutes avant</option>
                        <option value="30">30 minutes avant</option>
                        <option value="60">1 heure avant</option>
                        <option value="1440">1 jour avant</option>
                      </select>
                    </motion.div>
                  )}
                </div>

                {/* Info Box */}
                <div className="bg-blue-50/50 rounded-2xl p-4 flex items-start gap-3">
                  <Coffee size={18} className="text-blue-500 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-blue-800">Astuce</p>
                    <p className="text-[11px] text-blue-600/80">
                      Organisez vos tâches par priorité pour mieux gérer votre temps. 
                      Les tâches à haute priorité apparaîtront en premier dans votre liste.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="px-8 py-6 bg-slate-50/50 border-t border-slate-100 flex items-center justify-end gap-4">
                <button
                  type="button"
                  onClick={() => window.location.href = '/tasks'}
                  className="px-6 py-3 rounded-xl border-2 border-slate-200 text-slate-600 font-black text-sm uppercase tracking-wider hover:bg-slate-100 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 bg-[#002366] text-white rounded-xl font-black text-sm uppercase tracking-wider shadow-lg shadow-blue-900/20 hover:bg-blue-800 transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Création...
                    </>
                  ) : (
                    <>
                      <Save size={18} />
                      Créer la tâche
                    </>
                  )}
                </button>
              </div>
            </motion.form>

            {/* Preview Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-8"
            >
              <h3 className="text-sm font-black text-[#002366] mb-4 flex items-center gap-2">
                <Eye size={16} />
                Aperçu de la tâche
              </h3>
              
              <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <div className="w-5 h-5 rounded-full border-2 border-slate-300" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h4 className="text-base font-black text-[#002366]">
                        {formData.titre || 'Titre de la tâche'}
                      </h4>
                      
                      {formData.priorite && (
                        <span className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider ${
                          formData.priorite === 'haute' ? 'bg-red-100 text-red-700' :
                          formData.priorite === 'moyenne' ? 'bg-orange-100 text-orange-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {getPriorityLabel(formData.priorite)}
                        </span>
                      )}
                      
                      {formData.categorie && (
                        <span className="flex items-center gap-1 px-2 py-1 rounded-lg text-[9px] font-black bg-slate-100 text-slate-600">
                          {getCategoryIcon(formData.categorie)}
                          {getCategoryLabel(formData.categorie)}
                        </span>
                      )}
                    </div>
                    
                    {formData.description && (
                      <p className="text-sm text-slate-500 mb-3">{formData.description}</p>
                    )}
                    
                    <div className="flex items-center gap-4 text-xs text-slate-400">
                      {formData.date_limite && (
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          {formData.date_limite}
                          {formData.heure_limite && ` à ${formData.heure_limite}`}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddTaskPage;