// pages/admin/RemarqueDetailsPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

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
function getInitials(name) { return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2); }
function getPriorite(val) { return priorites.find(p => p.value === val) || { label: val, bg: '#f1f5f9', color: '#475569' }; }
function getStatut(val) { return statutsRemarque.find(s => s.value === val) || { label: val, bg: '#f1f5f9', color: '#475569' }; }

export default function RemarqueDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const [remarque, setRemarque] = useState(null);

  useEffect(() => {
    const rem = location.state?.remarque || window.remarquesData?.remarques.find(r => r.id === id);
    if (rem) {
      setRemarque(rem);
    } else {
      navigate('/remarques');
    }
  }, [id, location, navigate]);

  if (!remarque) return null;

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
              <div className="flex items-center gap-3 mb-4">
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