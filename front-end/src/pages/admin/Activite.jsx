// pages/admin/Activite.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';

const AVATAR_COLORS = ['#4f46e5','#0891b2','#16a34a','#E55B2D','#7c3aed','#0f766e','#dc2626','#a16207'];
function getAvatarColor(name) { let h = 0; for (let c of name) h += c.charCodeAt(0); return AVATAR_COLORS[h % AVATAR_COLORS.length]; }
function getInitials(name) { return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2); }

export default function AdminActivities() {
  const navigate = useNavigate();
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activites, setActivites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Charger les activités depuis l'API
  useEffect(() => {
    fetchActivites();
  }, []);

  const fetchActivites = async () => {
    try {
      setLoading(true);
      const response = await api.get('/activites');
      console.log('API Response:', response.data);
      
      // Gérer différents formats de réponse
      let activitesData = [];
      if (response.data.data) {
        activitesData = response.data.data;
      } else if (Array.isArray(response.data)) {
        activitesData = response.data;
      } else if (response.data.activites) {
        activitesData = response.data.activites;
      } else {
        activitesData = [];
      }
      
      setActivites(activitesData);
      setError(null);
    } catch (err) {
      console.error('Erreur lors du chargement des activités:', err);
      setError('Impossible de charger les activités. Veuillez réessayer plus tard.');
      setActivites([]);
    } finally {
      setLoading(false);
    }
  };

  const saveActivity = async (data) => {
    try {
      let response;
      
      // Vérifier si c'est une mise à jour ou une création
      if (data.id && !data.id.toString().startsWith('1')) {
        // Mise à jour
        console.log('Updating activity with ID:', data.id);
        response = await api.put(`/activites/${data.id}`, data);
        
        setActivites(prev => prev.map(a => 
          a.id === (response.data.activity?.id || response.data.id) 
            ? (response.data.activity || response.data) 
            : a
        ));
      } else {
        // Création - ne pas envoyer d'ID
        console.log('Creating new activity');
        const { id, ...newData } = data;
        response = await api.post('/activites', newData);
        
        setActivites(prev => [...prev, response.data.activity || response.data]);
      }
      
      return { success: true, data: response.data };
    } catch (err) {
      console.error('Erreur lors de la sauvegarde:', err);
      console.error('Erreur détaillée:', err.response?.data);
      
      let errorMessage = 'Erreur lors de la sauvegarde';
      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      }
      if (err.response?.data?.errors) {
        errorMessage = Object.values(err.response.data.errors).flat().join(', ');
      }
      
      return { 
        success: false, 
        error: errorMessage
      };
    }
  };

  const deleteActivity = async (id) => {
    try {
      await api.delete(`/activites/${id}`);
      setActivites(prev => prev.filter(a => a.id !== id));
      return { success: true };
    } catch (err) {
      console.error('Erreur lors de la suppression:', err);
      return { 
        success: false, 
        error: err.response?.data?.message || 'Erreur lors de la suppression' 
      };
    }
  };

  // Rendre les fonctions disponibles globalement pour ActivityFormPage
  if (typeof window !== 'undefined') {
    window.activitiesData = { 
      activites, 
      saveActivity: async (data) => {
        const result = await saveActivity(data);
        if (result.success) {
          await fetchActivites(); // Recharger après sauvegarde
        }
        return result;
      },
      deleteActivity
    };
  }

  const filtered = Array.isArray(activites) ? activites.filter(a =>
    a.nom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.lieu?.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  const totalH = Array.isArray(activites) ? activites.reduce((s, a) => s + (parseInt(a.heures_hebdomadaires) || 0), 0) : 0;

  const handleDelete = async () => {
    const result = await deleteActivity(deleteTarget.id);
    if (result.success) {
      setDeleteTarget(null);
    } else {
      alert(result.error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-slate-600">Chargement des activités...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
        <svg className="w-12 h-12 mx-auto text-red-500 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={fetchActivites}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: '#1e3a5f' }}>Activités</h1>
          <p className="text-sm text-slate-400 mt-0.5">
            {activites.length} activité{activites.length !== 1 ? 's' : ''} · {totalH}h total par semaine
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-72">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="search"
              placeholder="Rechercher une activité..."
              className="pl-9 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={() => navigate('/activites/nouveau')}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white rounded-xl whitespace-nowrap transition-opacity hover:opacity-90"
            style={{ background: '#E55B2D' }}
          >
            <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            Ajouter une activité
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(a => (
          <div key={a.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            {a.image ? (
              <img src={a.image} alt={a.nom} className="w-full h-40 object-cover" />
            ) : (
              <div className="w-full h-40 flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#e0e7ef,#c8d3e0)' }}>
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-xl"
                  style={{ background: getAvatarColor(a.nom) }}
                >
                  {getInitials(a.nom)}
                </div>
              </div>
            )}

            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <button
                  onClick={() => navigate(`/activites/${a.id}`, { state: { activity: a } })}
                  className="font-bold text-base leading-tight hover:text-orange-600 transition-colors text-left"
                  style={{ color: '#1e3a5f' }}
                >
                  {a.nom}
                </button>
                <span className="text-xs font-bold px-2 py-0.5 rounded-md ml-2 shrink-0" style={{ background: '#fff7ed', color: '#E55B2D' }}>
                  {a.code}
                </span>
              </div>

              <div className="mb-3">
                <span
                  className="text-xs font-semibold px-3 py-1 rounded-full"
                  style={a.statut === 'Actif' ? { background: '#dcfce7', color: '#16a34a' } : { background: '#fee2e2', color: '#dc2626' }}
                >
                  {a.statut || 'Actif'}
                </span>
              </div>

              <p className="text-xs text-slate-500 mb-3 leading-relaxed line-clamp-2">{a.description}</p>

              <div className="space-y-1.5 mb-3 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <svg width="13" height="13" fill="none" stroke="#E55B2D" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  {a.date_debut} → {a.date_fin}
                </div>
                <div className="flex items-center gap-2">
                  <svg width="13" height="13" fill="none" stroke="#E55B2D" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  {a.lieu}
                </div>
                <div className="flex items-center gap-2">
                  <svg width="13" height="13" fill="none" stroke="#E55B2D" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  {a.responsable}
                </div>
                <div className="flex items-center gap-2">
                  {a.prix ? (
                    <>
                      <svg width="13" height="13" fill="none" stroke="#E55B2D" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      <span className="font-semibold" style={{ color: '#1e3a5f' }}>{a.prix} DH</span>
                    </>
                  ) : (
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full" style={{ background: '#e0f2fe', color: '#0284c7' }}>Gratuit</span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <svg width="13" height="13" fill="none" stroke="#E55B2D" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span className="font-bold" style={{ color: '#1e3a5f' }}>{a.heures_hebdomadaires}h</span>/semaine
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => navigate(`/activites/modifier/${a.id}`, { state: { activity: a } })}
                    className="p-1.5 rounded-lg hover:bg-orange-50 transition-colors"
                    style={{ color: '#E55B2D' }}
                    title="Modifier"
                  >
                    <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                  </button>
                  <button
                    onClick={() => setDeleteTarget(a)}
                    className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors"
                    title="Supprimer"
                  >
                    <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && !loading && (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-100">
          <svg className="w-14 h-14 mx-auto text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <h3 className="font-bold text-base mb-1" style={{ color: '#1e3a5f' }}>Aucune activité trouvée</h3>
          <p className="text-sm text-slate-400">
            {searchTerm ? "Essayez d'ajuster votre recherche." : 'Ajoutez une activité pour commencer.'}
          </p>
        </div>
      )}

      {/* Delete confirmation */}
      {deleteTarget && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.45)' }}
          onClick={() => setDeleteTarget(null)}
        >
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-7" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-11 h-11 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                <svg width="18" height="18" fill="none" stroke="#dc2626" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <h2 className="text-base font-bold" style={{ color: '#1e3a5f' }}>Supprimer cette activité ?</h2>
            </div>
            <p className="text-sm text-slate-500 mb-6 leading-relaxed">
              Êtes-vous sûr de vouloir supprimer{' '}
              <strong style={{ color: '#1e3a5f' }}>"{deleteTarget.nom}"</strong> ?{' '}
              Cette action est irréversible.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-5 py-2 text-sm font-semibold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200"
              >
                Annuler
              </button>
              <button
                onClick={handleDelete}
                className="px-5 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}