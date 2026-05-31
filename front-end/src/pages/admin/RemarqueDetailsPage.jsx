// pages/admin/RemarqueDetailsPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import api from '../../api';

const priorites = [
  { value: 'faible', label: 'Faible', bg: '#f0fdf4', color: '#16a34a' },
  { value: 'normale', label: 'Normale', bg: '#eff6ff', color: '#2563eb' },
  { value: 'haute', label: 'Haute', bg: '#fff7ed', color: '#ea580c' },
  { value: 'urgente', label: 'Urgente', bg: '#fef2f2', color: '#dc2626' },
];
const statutsRemarque = [
  { value: 'ouverte', label: 'Ouverte', bg: '#fef9c3', color: '#ca8a04' },
  { value: 'en_cours', label: 'En cours', bg: '#dbeafe', color: '#2563eb' },
  { value: 'resolue', label: 'Résolue', bg: '#dcfce7', color: '#16a34a' },
  { value: 'archivee', label: 'Archivée', bg: '#f1f5f9', color: '#475569' },
];

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
function getInitials(name) { return name ? name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) : '?'; }
function getPriorite(val) { return priorites.find(p => p.value === val) || { label: val, bg: '#f1f5f9', color: '#475569' }; }
function getStatut(val) { return statutsRemarque.find(s => s.value === val) || { label: val, bg: '#f1f5f9', color: '#475569' }; }

export default function RemarqueDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const [remarque, setRemarque] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRemarque();
  }, [id]);

  const fetchRemarque = async () => {
    try {
      setLoading(true);
      
      // Essayer d'abord de récupérer depuis le state de la navigation
      const stateRemarque = location.state?.remarque;
      if (stateRemarque && stateRemarque.id == id) {
        setRemarque(stateRemarque);
        setLoading(false);
        return;
      }
      
      // Sinon, récupérer depuis l'API
      const response = await api.get(`/remarques/${id}`);
      console.log('API Response:', response.data);
      
      let remarqueData = response.data.remarque || response.data;
      setRemarque(remarqueData);
      setError(null);
    } catch (err) {
      console.error('Erreur lors du chargement de la remarque:', err);
      if (err.response?.status === 404) {
        setError('Remarque non trouvée');
      } else {
        setError('Impossible de charger les détails de la remarque');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatut = async (newStatut) => {
    if (!remarque) return;
    
    try {
      const updatedRemarque = { ...remarque, statut: newStatut };
      const response = await api.put(`/remarques/${remarque.id}`, updatedRemarque);
      
      const updatedData = response.data.remarque || response.data;
      setRemarque(updatedData);
      
      // Mettre à jour dans le store global si disponible
      if (window.remarquesData && window.remarquesData.updateRemarque) {
        window.remarquesData.updateRemarque(updatedData);
      }
      
      alert('Statut mis à jour avec succès');
    } catch (err) {
      console.error('Erreur lors de la mise à jour du statut:', err);
      alert('Erreur lors de la mise à jour du statut');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette remarque ?')) return;
    
    try {
      await api.delete(`/remarques/${remarque.id}`);
      
      // Supprimer du store global
      if (window.remarquesData && window.remarquesData.deleteRemarque) {
        window.remarquesData.deleteRemarque(remarque.id);
      }
      
      navigate('/remarques');
    } catch (err) {
      console.error('Erreur lors de la suppression:', err);
      alert('Erreur lors de la suppression de la remarque');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-slate-600">Chargement des détails...</p>
        </div>
      </div>
    );
  }

  if (error || !remarque) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
        <svg className="w-12 h-12 mx-auto text-red-500 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-red-600 mb-4">{error || 'Remarque non trouvée'}</p>
        <button
          onClick={() => navigate('/remarques')}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Retour à la liste
        </button>
      </div>
    );
  }

  const statut = getStatut(remarque.statut);
  const prio = getPriorite(remarque.priorite);
  const typeClr = TYPE_COLORS[remarque.type] || { bg: '#f1f5f9', color: '#475569' };

  const InfoRow = ({ icon, label, value }) => (
    <div className="flex items-start gap-3 py-3 border-b border-slate-100 last:border-0">
      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: '#fff7ed' }}>
        <span className="text-sm">{icon}</span>
      </div>
      <div className="flex-1">
        <p className="text-xs text-slate-400 uppercase tracking-wider">{label}</p>
        <p className="text-sm font-semibold mt-0.5 text-slate-700">{value || '—'}</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/remarques')}
            className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 transition-colors"
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h1 className="text-xl font-bold" style={{ color: '#1e3a5f' }}>
              Détails de la remarque
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              {remarque.type} · {remarque.date}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/remarques/modifier/${remarque.id}`, { state: { remarque } })}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all hover:scale-105"
            style={{ background: '#fff7ed', color: '#E55B2D' }}
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Modifier
          </button>
          <button
            onClick={handleDelete}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all hover:scale-105 bg-red-50 text-red-600 hover:bg-red-100"
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Supprimer
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100" style={{ background: 'linear-gradient(135deg, #fff7ed 0%, #ffffff 100%)' }}>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md"
                  style={{ background: getAvatarColor(remarque.etudiant) }}>
                  {getInitials(remarque.etudiant)}
                </div>
                <div>
                  <h2 className="text-xl font-bold" style={{ color: '#1e3a5f' }}>{remarque.etudiant}</h2>
                  <p className="text-sm text-slate-500 mt-0.5">{remarque.classe || 'Classe non spécifiée'}</p>
                  <p className="text-xs text-slate-400 mt-0.5">Enseignant: {remarque.enseignant || 'Non spécifié'}</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <span className="text-xs font-bold px-2.5 py-1 rounded-md" style={{ background: typeClr.bg, color: typeClr.color }}>
                  {remarque.type}
                </span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: prio.bg, color: prio.color }}>
                  {prio.label}
                </span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: statut.bg, color: statut.color }}>
                  {statut.label}
                </span>
              </div>
              <InfoRow icon="📝" label="Description" value={remarque.description} />
              {remarque.suivi && <InfoRow icon="✅" label="Suivi / Actions" value={remarque.suivi} />}
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h3 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 rounded-full inline-block" style={{ background: '#E55B2D' }} />
              Informations
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-slate-50 rounded-xl">
                <p className="text-xs text-slate-400">Date de création</p>
                <p className="text-sm font-semibold mt-0.5" style={{ color: '#1e3a5f' }}>{remarque.date}</p>
              </div>
            </div>
          </div>

          {/* Changer le statut */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h3 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 rounded-full inline-block" style={{ background: '#E55B2D' }} />
              Changer le statut
            </h3>
            <div className="space-y-2">
              {statutsRemarque.map(s => (
                <button
                  key={s.value}
                  onClick={() => handleUpdateStatut(s.value)}
                  disabled={remarque.statut === s.value}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                    remarque.statut === s.value
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:scale-105'
                  }`}
                  style={{ background: s.bg, color: s.color }}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl border border-orange-100 p-5">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                <span className="text-lg">ℹ️</span>
              </div>
              <div>
                <p className="text-xs font-semibold text-orange-800 mb-1">Information</p>
                <p className="text-xs text-orange-700 leading-relaxed">
                  Cette remarque de type "{remarque.type}" est actuellement {statut.label.toLowerCase()}.
                  {remarque.suivi ? ' Un suivi a été effectué.' : ' Aucune action de suivi n\'a encore été enregistrée.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}