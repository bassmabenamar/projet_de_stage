// pages/admin/transport.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';

export default function AdminTransports() {
  const navigate = useNavigate();
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [transports, setTransports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Charger les transports depuis l'API
  useEffect(() => {
    fetchTransports();
  }, []);

  const fetchTransports = async () => {
    try {
      setLoading(true);
      const response = await api.get('/transports');
      console.log('API Response:', response.data); // Debug: voir la structure de la réponse
      
      // Gérer les deux formats possibles (paginé ou non)
      let transportsData = [];
      if (response.data.data) {
        // Si c'est paginé (avec Laravel pagination)
        transportsData = response.data.data;
      } else if (Array.isArray(response.data)) {
        // Si c'est un tableau direct
        transportsData = response.data;
      } else if (response.data.transports) {
        // Si c'est un objet avec propriété transports
        transportsData = response.data.transports;
      } else {
        transportsData = [];
      }
      
      setTransports(transportsData);
      setError(null);
    } catch (err) {
      console.error('Erreur lors du chargement des transports:', err);
      setError('Impossible de charger les transports. Veuillez réessayer plus tard.');
      setTransports([]); // Initialiser à un tableau vide en cas d'erreur
    } finally {
      setLoading(false);
    }
  };

  const saveTransport = async (data) => {
    try {
      if (data.id) {
        // Mettre à jour
        const response = await api.put(`/transports/${data.id}`, data);
        setTransports(prev => prev.map(t => t.id === response.data.transport?.id || t.id === response.data.id ? (response.data.transport || response.data) : t));
        return { success: true, data: response.data };
      } else {
        // Créer nouveau
        const response = await api.post('/transports', data);
        setTransports(prev => [...prev, response.data.transport || response.data]);
        return { success: true, data: response.data };
      }
    } catch (err) {
      console.error('Erreur lors de la sauvegarde:', err);
      return { 
        success: false, 
        error: err.response?.data?.message || 'Erreur lors de la sauvegarde' 
      };
    }
  };

  const deleteTransport = async (id) => {
    try {
      await api.delete(`/transports/${id}`);
      setTransports(prev => prev.filter(t => t.id !== id));
      return { success: true };
    } catch (err) {
      console.error('Erreur lors de la suppression:', err);
      return { 
        success: false, 
        error: err.response?.data?.message || 'Erreur lors de la suppression' 
      };
    }
  };

  // Rendre les fonctions disponibles globalement pour TransportFormPage
  if (typeof window !== 'undefined') {
    window.transportsData = { 
      transports, 
      saveTransport: async (data) => {
        const result = await saveTransport(data);
        if (result.success) {
          await fetchTransports(); // Recharger après sauvegarde
        }
        return result;
      },
      deleteTransport
    };
  }

  // Vérifier que transports est un tableau avant d'utiliser filter
  const filtered = Array.isArray(transports) ? transports.filter(t =>
    t.nom_transport?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.immatriculation?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.chauffeur_nom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.responsable_nom?.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  const stats = {
    total: Array.isArray(transports) ? transports.length : 0,
    capaciteTotale: Array.isArray(transports) ? transports.reduce((a, t) => a + (parseInt(t.capacite) || 0), 0) : 0,
  };

  const handleDelete = async () => {
    const result = await deleteTransport(deleteTarget.id);
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
          <p className="mt-4 text-slate-600">Chargement des transports...</p>
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
          onClick={fetchTransports}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header - same as before */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: '#1e3a5f' }}>Transports</h1>
          <p className="text-sm text-slate-400 mt-0.5">
            {stats.total} véhicule{stats.total !== 1 ? 's' : ''} · {stats.capaciteTotale} places au total
          </p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-72">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="search" 
              placeholder="Rechercher un véhicule..." 
              value={searchTerm} 
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-9 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100" 
            />
          </div>
          <button 
            onClick={() => navigate('/transports/nouveau')}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white rounded-xl whitespace-nowrap transition-opacity hover:opacity-90"
            style={{ background: '#E55B2D' }}
          >
            <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            Ajouter un véhicule
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Total véhicules</p>
              <p className="text-3xl font-bold" style={{ color: '#1e3a5f' }}>{stats.total}</p>
            </div>
            <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0" style={{ background: '#f1f5f9' }}>
              <svg width="18" height="18" fill="none" stroke="#1e3a5f" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h8m-8 4h8M5 4h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Places totales</p>
              <p className="text-3xl font-bold" style={{ color: '#1e3a5f' }}>{stats.capaciteTotale}</p>
            </div>
            <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0" style={{ background: '#dcfce7' }}>
              <svg width="18" height="18" fill="none" stroke="#16a34a" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(transport => (
          <div key={transport.id} className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-all hover:scale-105">
            {/* Rest of the card remains the same */}
            <div 
              className="relative h-32 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center overflow-hidden cursor-pointer"
              onClick={() => navigate(`/transports/${transport.id}`, { state: { transport } })}
            >
              <svg className="w-16 h-16 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h8m-8 4h8M5 4h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z" />
              </svg>
            </div>

            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <button
                    onClick={() => navigate(`/transports/${transport.id}`, { state: { transport } })}
                    className="font-bold text-base hover:text-orange-600 transition-colors text-left"
                    style={{ color: '#1e3a5f' }}
                  >
                    {transport.nom_transport}
                  </button>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-md" style={{ background: '#fff7ed', color: '#E55B2D' }}>
                      {transport.code}
                    </span>
                    <span className="text-xs text-slate-400">{transport.immatriculation}</span>
                  </div>
                </div>
                <div className="text-right shrink-0 ml-3">
                  <p className="text-xs text-slate-400">Capacité</p>
                  <p className="font-bold text-sm" style={{ color: '#1e3a5f' }}>{transport.capacite} pers.</p>
                </div>
              </div>

              <div className="rounded-xl p-3 mb-2" style={{ background: '#f8fafc', border: '1px solid #f1f5f9' }}>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <svg width="13" height="13" fill="none" stroke="#E55B2D" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                  <span className="text-xs font-bold" style={{ color: '#1e3a5f' }}>Chauffeur</span>
                </div>
                <p className="text-xs font-semibold text-slate-700">{transport.chauffeur_nom}</p>
                <p className="text-xs text-slate-400">
                  Tél: {transport.chauffeur_telephone} 
                  {transport.chauffeur_permis && ` · Permis: ${transport.chauffeur_permis}`}
                </p>
              </div>

              <div className="rounded-xl p-3 mb-3" style={{ background: '#f8fafc', border: '1px solid #f1f5f9' }}>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <svg width="13" height="13" fill="none" stroke="#E55B2D" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
                  </svg>
                  <span className="text-xs font-bold" style={{ color: '#1e3a5f' }}>Responsable</span>
                </div>
                <p className="text-xs font-semibold text-slate-700">{transport.responsable_nom}</p>
                <p className="text-xs text-slate-400">Tél: {transport.responsable_telephone}</p>
              </div>

              <div className="flex items-center justify-end gap-1 pt-3 border-t border-slate-100">
                <button 
                  onClick={() => navigate(`/transports/${transport.id}`, { state: { transport } })} 
                  className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors" 
                  title="Voir détails"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
                <button 
                  onClick={() => navigate(`/transports/modifier/${transport.id}`, { state: { transport } })} 
                  className="p-1.5 rounded-lg hover:bg-orange-50 transition-colors" 
                  style={{ color: '#E55B2D' }} 
                  title="Modifier"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button 
                  onClick={() => setDeleteTarget(transport)} 
                  className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors" 
                  title="Supprimer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-100">
          <svg className="w-14 h-14 mx-auto text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h8m-8 4h8M5 4h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z" />
          </svg>
          <h3 className="font-bold text-base mb-1" style={{ color: '#1e3a5f' }}>Aucun véhicule trouvé</h3>
          <p className="text-sm text-slate-400">
            {searchTerm ? "Essayez d'ajuster votre recherche." : 'Ajoutez un véhicule pour commencer.'}
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
              <h2 className="text-base font-bold" style={{ color: '#1e3a5f' }}>Supprimer ce véhicule ?</h2>
            </div>
            <p className="text-sm text-slate-500 mb-6 leading-relaxed">
              Êtes-vous sûr de vouloir supprimer{' '}
              <strong style={{ color: '#1e3a5f' }}>"{deleteTarget.nom_transport}"</strong> ?{' '}
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