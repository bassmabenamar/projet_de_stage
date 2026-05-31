// pages/admin/remarque.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';

const typesRemarque = ['Comportement', 'Académique', 'Assiduité', 'Tenue', 'Retard', 'Violence', 'Félicitation', 'Autre'];
const priorites = [
  { value: 'faible',  label: 'Faible',  bg: '#f0fdf4', color: '#16a34a' },
  { value: 'normale', label: 'Normale', bg: '#eff6ff', color: '#2563eb' },
  { value: 'haute',   label: 'Haute',   bg: '#fff7ed', color: '#ea580c' },
  { value: 'urgente', label: 'Urgente', bg: '#fef2f2', color: '#dc2626' },
];
const statutsRemarque = [
  { value: 'ouverte',  label: 'Ouverte',  bg: '#fef9c3', color: '#ca8a04' },
  { value: 'en_cours', label: 'En cours', bg: '#dbeafe', color: '#2563eb' },
  { value: 'resolue',  label: 'Résolue',  bg: '#dcfce7', color: '#16a34a' },
  { value: 'archivee', label: 'Archivée', bg: '#f1f5f9', color: '#475569' },
];

function getPriorite(val) { return priorites.find(p => p.value === val) || { label: val, bg: '#f1f5f9', color: '#475569' }; }
function getStatut(val)   { return statutsRemarque.find(s => s.value === val) || { label: val, bg: '#f1f5f9', color: '#475569' }; }

const TYPE_ICONS = {
  'Comportement': 'M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  'Académique':   'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
  'Félicitation': 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
  'Assiduité':    'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
  'default':      'M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z',
};

const TYPE_COLORS = {
  'Comportement': { bg: '#fef2f2', color: '#dc2626' },
  'Académique':   { bg: '#eff6ff', color: '#2563eb' },
  'Assiduité':    { bg: '#fef9c3', color: '#ca8a04' },
  'Tenue':        { bg: '#fdf4ff', color: '#9333ea' },
  'Retard':       { bg: '#fff7ed', color: '#ea580c' },
  'Violence':     { bg: '#fef2f2', color: '#9f1239' },
  'Félicitation': { bg: '#f0fdf4', color: '#16a34a' },
  'Autre':        { bg: '#f1f5f9', color: '#475569' },
};

const AVATAR_COLORS = ['#4f46e5','#0891b2','#16a34a','#E55B2D','#7c3aed','#0f766e','#dc2626','#a16207'];
function getAvatarColor(name) { let h = 0; for (let c of name) h += c.charCodeAt(0); return AVATAR_COLORS[h % AVATAR_COLORS.length]; }
function getInitials(name)    { return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2); }

export default function AdminRemarques() {
  const navigate = useNavigate();
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatut, setFilterStatut] = useState('');
  const [filterType, setFilterType] = useState('');
  const [remarques, setRemarques] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Charger les remarques depuis l'API
  useEffect(() => {
    fetchRemarques();
  }, []);

  const fetchRemarques = async () => {
    try {
      setLoading(true);
      const response = await api.get('/remarques');
      console.log('API Response:', response.data);
      
      let remarquesData = [];
      if (response.data.data) {
        remarquesData = response.data.data;
      } else if (Array.isArray(response.data)) {
        remarquesData = response.data;
      } else if (response.data.remarques) {
        remarquesData = response.data.remarques;
      } else {
        remarquesData = [];
      }
      
      setRemarques(remarquesData);
      setError(null);
    } catch (err) {
      console.error('Erreur lors du chargement des remarques:', err);
      setError('Impossible de charger les remarques. Veuillez réessayer plus tard.');
      setRemarques([]);
    } finally {
      setLoading(false);
    }
  };

  const saveRemarque = async (data) => {
    try {
      let response;
      
      if (data.id && !data.id.toString().startsWith('1')) {
        console.log('Updating remark with ID:', data.id);
        response = await api.put(`/remarques/${data.id}`, data);
        setRemarques(prev => prev.map(r => 
          r.id === (response.data.remarque?.id || response.data.id) 
            ? (response.data.remarque || response.data) 
            : r
        ));
      } else {
        console.log('Creating new remark');
        const { id, ...newData } = data;
        response = await api.post('/remarques', newData);
        setRemarques(prev => [...prev, response.data.remarque || response.data]);
      }
      
      return { success: true, data: response.data };
    } catch (err) {
      console.error('Erreur lors de la sauvegarde:', err);
      let errorMessage = 'Erreur lors de la sauvegarde';
      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      }
      if (err.response?.data?.errors) {
        errorMessage = Object.values(err.response.data.errors).flat().join(', ');
      }
      return { success: false, error: errorMessage };
    }
  };

  const deleteRemarque = async (id) => {
    try {
      await api.delete(`/remarques/${id}`);
      setRemarques(prev => prev.filter(r => r.id !== id));
      return { success: true };
    } catch (err) {
      console.error('Erreur lors de la suppression:', err);
      return { success: false, error: err.response?.data?.message || 'Erreur lors de la suppression' };
    }
  };

  // Rendre les fonctions disponibles globalement
  if (typeof window !== 'undefined') {
    window.remarquesData = { 
      remarques, 
      saveRemarque: async (data) => {
        const result = await saveRemarque(data);
        if (result.success) {
          await fetchRemarques();
        }
        return result;
      },
      deleteRemarque
    };
  }

  const filtered = Array.isArray(remarques) ? remarques.filter(r =>
    (r.etudiant?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     r.classe?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     r.enseignant?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     r.type?.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (!filterStatut || r.statut === filterStatut) &&
    (!filterType   || r.type   === filterType)
  ) : [];

  const stats = {
    total:    Array.isArray(remarques) ? remarques.length : 0,
    ouvertes: Array.isArray(remarques) ? remarques.filter(r => r.statut === 'ouverte').length : 0,
    enCours:  Array.isArray(remarques) ? remarques.filter(r => r.statut === 'en_cours').length : 0,
    resolues: Array.isArray(remarques) ? remarques.filter(r => r.statut === 'resolue').length : 0,
  };

  const handleDelete = async () => {
    const result = await deleteRemarque(deleteTarget.id);
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
          <p className="mt-4 text-slate-600">Chargement des remarques...</p>
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
        <button onClick={fetchRemarques} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
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
          <h1 className="text-2xl font-bold" style={{ color: '#1e3a5f' }}>Remarques</h1>
          <p className="text-sm text-slate-400 mt-0.5">{remarques.length} remarque{remarques.length !== 1 ? 's' : ''} enregistrées</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="search" 
              placeholder="Rechercher..." 
              value={searchTerm} 
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-9 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100" 
            />
          </div>
          <button 
            onClick={() => navigate('/remarques/nouveau')}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white rounded-xl whitespace-nowrap transition-opacity hover:opacity-90"
            style={{ background: '#E55B2D' }}
          >
            <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            Ajouter une remarque
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total',     value: stats.total,    fg: '#1e3a5f', bg: '#f1f5f9', icon: 'M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z' },
          { label: 'Ouvertes',  value: stats.ouvertes, fg: '#ca8a04', bg: '#fef9c3', icon: 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
          { label: 'En cours',  value: stats.enCours,  fg: '#2563eb', bg: '#dbeafe', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
          { label: 'Résolues',  value: stats.resolues, fg: '#16a34a', bg: '#dcfce7', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
        ].map(s => (
          <div key={s.label} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">{s.label}</p>
                <p className="text-3xl font-bold" style={{ color: s.fg }}>{s.value}</p>
              </div>
              <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0" style={{ background: s.bg }}>
                <svg width="18" height="18" fill="none" stroke={s.fg} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={s.icon} /></svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Statut:</span>
          <button onClick={() => setFilterStatut('')} className="px-3 py-1 rounded-full text-xs font-semibold transition-all hover:scale-105" style={!filterStatut ? { background: '#1e3a5f', color: 'white' } : { background: '#f1f5f9', color: '#475569' }}>Tous</button>
          {statutsRemarque.map(s => (
            <button key={s.value} onClick={() => setFilterStatut(s.value === filterStatut ? '' : s.value)} className="px-3 py-1 rounded-full text-xs font-semibold transition-all hover:scale-105" style={filterStatut === s.value ? { background: s.color, color: 'white' } : { background: s.bg, color: s.color }}>{s.label}</button>
          ))}
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Type:</span>
          {['Tous', 'Comportement', 'Académique', 'Félicitation', 'Assiduité', 'Retard', 'Tenue', 'Violence', 'Autre'].map(t => {
            if (t === 'Tous') {
              return (<button key={t} onClick={() => setFilterType('')} className="px-3 py-1 rounded-full text-xs font-semibold transition-all hover:scale-105" style={!filterType ? { background: '#1e3a5f', color: 'white' } : { background: '#f1f5f9', color: '#475569' }}>{t}</button>);
            }
            const tc = TYPE_COLORS[t] || { bg: '#f1f5f9', color: '#475569' };
            return (<button key={t} onClick={() => setFilterType(t === filterType ? '' : t)} className="px-3 py-1 rounded-full text-xs font-semibold transition-all hover:scale-105" style={filterType === t ? { background: tc.color, color: 'white' } : { background: tc.bg, color: tc.color }}>{t}</button>);
          })}
        </div>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.length === 0 ? (
          <div className="col-span-3 text-center py-16 bg-white rounded-2xl border border-slate-100">
            <svg className="w-14 h-14 mx-auto text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
            <h3 className="font-bold text-base mb-1" style={{ color: '#1e3a5f' }}>Aucune remarque trouvée</h3>
            <p className="text-sm text-slate-400">{searchTerm || filterStatut || filterType ? "Essayez d'ajuster vos filtres." : 'Ajoutez une remarque pour commencer.'}</p>
          </div>
        ) : filtered.map(r => {
          const statut = getStatut(r.statut);
          const prio = getPriorite(r.priorite);
          const typeClr = TYPE_COLORS[r.type] || { bg: '#f1f5f9', color: '#475569' };
          const icon = TYPE_ICONS[r.type] || TYPE_ICONS['default'];
          return (
            <div key={r.id} className="bg-white border border-slate-100 rounded-2xl shadow-sm p-4 hover:shadow-md transition-all hover:scale-105">
              <div className="flex items-start justify-between mb-3">
                <button onClick={() => navigate(`/remarques/${r.id}`, { state: { remarque: r } })} className="flex items-center gap-3 flex-1 text-left hover:opacity-80 transition-opacity">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0" style={{ background: getAvatarColor(r.etudiant) }}>{getInitials(r.etudiant)}</div>
                  <div><p className="font-bold text-sm" style={{ color: '#1e3a5f' }}>{r.etudiant}</p><p className="text-xs text-slate-400">{r.classe} · {r.enseignant}</p></div>
                </button>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full shrink-0" style={{ background: prio.bg, color: prio.color }}>{prio.label}</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: typeClr.bg }}><svg width="12" height="12" fill="none" stroke={typeClr.color} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon}/></svg></div>
                <span className="text-xs font-bold" style={{ color: typeClr.color }}>{r.type}</span>
                <span className="ml-auto text-xs text-slate-400 flex items-center gap-1"><svg width="11" height="11" fill="none" stroke="#E55B2D" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>{r.date}</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed mb-3 line-clamp-2">{r.description}</p>
              {r.suivi && (<div className="rounded-lg p-2 mb-3 text-xs text-slate-500" style={{ background: '#f8fafc', border: '1px solid #f1f5f9' }}><span className="font-semibold" style={{ color: '#1e3a5f' }}>Suivi: </span>{r.suivi}</div>)}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: statut.bg, color: statut.color }}>{statut.label}</span>
                <div className="flex gap-1">
                  <button onClick={() => navigate(`/remarques/${r.id}`, { state: { remarque: r } })} className="p-1.5 rounded-lg hover:bg-cyan-50 text-cyan-600 transition-colors" title="Voir"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg></button>
                  <button onClick={() => navigate(`/remarques/modifier/${r.id}`, { state: { remarque: r } })} className="p-1.5 rounded-lg hover:bg-orange-50 transition-colors" style={{ color: '#E55B2D' }} title="Modifier"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg></button>
                  <button onClick={() => setDeleteTarget(r)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors" title="Supprimer"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Delete confirmation */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.45)' }} onClick={() => setDeleteTarget(null)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-7" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-11 h-11 rounded-full bg-red-100 flex items-center justify-center shrink-0"><svg width="18" height="18" fill="none" stroke="#dc2626" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></div>
              <h2 className="text-base font-bold" style={{ color: '#1e3a5f' }}>Supprimer cette remarque ?</h2>
            </div>
            <p className="text-sm text-slate-500 mb-6 leading-relaxed">Êtes-vous sûr de vouloir supprimer la remarque de <strong style={{ color: '#1e3a5f' }}>"{deleteTarget.etudiant}"</strong> ? Cette action est irréversible.</p>
            <div className="flex justify-end gap-3"><button onClick={() => setDeleteTarget(null)} className="px-5 py-2 text-sm font-semibold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200">Annuler</button><button onClick={handleDelete} className="px-5 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700">Supprimer</button></div>
          </div>
        </div>
      )}
    </div>
  );
}