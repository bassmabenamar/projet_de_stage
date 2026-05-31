import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import api from '../../api';

const statutsPaiement = [
  { value: 'paye',       label: 'Payé',       bg: '#dcfce7', color: '#16a34a', icon: '✅' },
  { value: 'partiel',    label: 'Partiel',    bg: '#dbeafe', color: '#2563eb', icon: '⚠️' },
  { value: 'en_attente', label: 'En attente', bg: '#fef9c3', color: '#ca8a04', icon: '⏳' },
  { value: 'retard',     label: 'En retard',  bg: '#fee2e2', color: '#dc2626', icon: '🔴' },
];

const AVATAR_COLORS = ['#4f46e5','#0891b2','#16a34a','#E55B2D','#7c3aed','#0f766e','#dc2626','#a16207'];
function getAvatarColor(name) { let h = 0; for (let c of name) h += c.charCodeAt(0); return AVATAR_COLORS[h % AVATAR_COLORS.length]; }
function getInitials(name)    { return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2); }
function getStatut(val)       { return statutsPaiement.find(s => s.value === val) || { label: val, bg: '#f1f5f9', color: '#475569', icon: '📋' }; }
function formatDate(date)     { return date ? new Date(date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Non définie'; }

export default function PaiementDetailsPage() {
  const navigate  = useNavigate();
  const { id }    = useParams();
  const location  = useLocation();
  const [paiement, setPaiement] = useState(location.state?.paiement || null);
  const [loading,  setLoading]  = useState(!paiement);

  useEffect(() => {
    if (!paiement) {
      api.get(`/paiements/${id}`)
        .then(res => setPaiement(res.data))
        .catch(() => navigate('/paiements'))
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) return (
    <div className="flex items-center justify-center py-32">
      <div className="w-8 h-8 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin" />
    </div>
  );

  if (!paiement) return null;

  const statut       = getStatut(paiement.statut);
  const pourcentage  = paiement.montant > 0 ? Math.round((paiement.montantPaye / paiement.montant) * 100) : 0;
  const resteAPayer  = paiement.montant - paiement.montantPaye;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/paiements')}
            className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 transition-colors">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h1 className="text-xl font-bold" style={{ color: '#1e3a5f' }}>Détails du paiement</h1>
            <p className="text-xs text-slate-400 mt-0.5">Référence: {paiement.reference}</p>
          </div>
        </div>
        <button onClick={() => navigate(`/paiements/modifier/${paiement.id}`, { state: { paiement } })}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all hover:scale-105"
          style={{ background: '#fff7ed', color: '#E55B2D' }}>
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Modifier
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left */}
        <div className="lg:col-span-2 space-y-5">

          {/* Student Card */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100" style={{ background: 'linear-gradient(135deg, #fff7ed 0%, #ffffff 100%)' }}>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl shrink-0 shadow-md"
                  style={{ background: getAvatarColor(paiement.etudiant) }}>
                  {getInitials(paiement.etudiant)}
                </div>
                <div>
                  <h2 className="text-xl font-bold" style={{ color: '#1e3a5f' }}>{paiement.etudiant}</h2>
                  <p className="text-sm text-slate-500 mt-0.5">{paiement.classe || 'Classe non spécifiée'}</p>
                </div>
              </div>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { icon: '🎓', label: 'Type', value: paiement.type },
                { icon: '💳', label: 'Méthode', value: paiement.methode },
                { icon: '📅', label: "Date d'échéance", value: formatDate(paiement.dateEcheance) },
                { icon: '💰', label: 'Date de paiement', value: formatDate(paiement.datePaiement) },
              ].map(({ icon, label, value }) => (
                <div key={label} className="flex items-start gap-3 py-3 border-b border-slate-100 last:border-0">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: '#fff7ed' }}>
                    <span className="text-sm">{icon}</span>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider">{label}</p>
                    <p className="text-sm font-semibold text-slate-700 mt-0.5">{value || '—'}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Détails financiers */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h3 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 rounded-full inline-block" style={{ background: '#E55B2D' }} />
              Détails financiers
            </h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="p-4 rounded-xl" style={{ background: '#f8fafc' }}>
                <p className="text-xs text-slate-400 mb-1">Montant total</p>
                <p className="text-2xl font-bold" style={{ color: '#1e3a5f' }}>{Number(paiement.montant).toLocaleString()} <span className="text-sm">DH</span></p>
              </div>
              <div className="p-4 rounded-xl" style={{ background: '#f8fafc' }}>
                <p className="text-xs text-slate-400 mb-1">Montant payé</p>
                <p className="text-2xl font-bold" style={{ color: '#16a34a' }}>{Number(paiement.montantPaye).toLocaleString()} <span className="text-sm">DH</span></p>
              </div>
            </div>
            <div className="mb-4">
              <div className="flex justify-between text-xs mb-2">
                <span className="text-slate-500">Progression</span>
                <span className="font-semibold" style={{ color: '#E55B2D' }}>{pourcentage}%</span>
              </div>
              <div className="bg-slate-100 rounded-full h-2 overflow-hidden">
                <div className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${pourcentage}%`, background: pourcentage === 100 ? '#16a34a' : '#E55B2D' }} />
              </div>
            </div>
            {resteAPayer > 0 && (
              <div className="p-4 rounded-xl mb-4" style={{ background: '#fef2f2' }}>
                <p className="text-xs text-red-600 mb-1">Reste à payer</p>
                <p className="text-xl font-bold text-red-600">{resteAPayer.toLocaleString()} <span className="text-sm">DH</span></p>
              </div>
            )}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-500">Statut actuel</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold"
                style={{ background: statut.bg, color: statut.color }}>
                {statut.icon} {statut.label}
              </span>
            </div>
          </div>

          {/* Notes */}
          {paiement.notes && (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <h3 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                <span className="w-1.5 h-4 rounded-full inline-block" style={{ background: '#E55B2D' }} />
                Notes
              </h3>
              <div className="p-4 rounded-xl" style={{ background: '#f8fafc' }}>
                <p className="text-sm text-slate-600 leading-relaxed">{paiement.notes}</p>
              </div>
            </div>
          )}
        </div>

        {/* Right */}
        <div className="space-y-5">
          {/* Chronologie */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h3 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 rounded-full inline-block" style={{ background: '#E55B2D' }} />
              Chronologie
            </h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-green-600">Paiement enregistré</p>
                  <p className="text-xs text-slate-400 mt-1">{formatDate(paiement.datePaiement)}</p>
                </div>
              </div>
              {paiement.dateEcheance && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                    <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-orange-600">Date d'échéance</p>
                    <p className="text-xs text-slate-400 mt-1">{formatDate(paiement.dateEcheance)}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Actions rapides */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h3 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 rounded-full inline-block" style={{ background: '#E55B2D' }} />
              Actions rapides
            </h3>
            <div className="space-y-2">
              <button onClick={() => window.print()}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Imprimer le reçu
              </button>
              <button onClick={() => navigator.clipboard.writeText(paiement.reference)}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                Copier la référence
              </button>
            </div>
          </div>

          {/* Info */}
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl border border-orange-100 p-5">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                <span className="text-lg">ℹ️</span>
              </div>
              <div>
                <p className="text-xs font-semibold text-orange-800 mb-1">Information</p>
                <p className="text-xs text-orange-700 leading-relaxed">
                  Référence: {paiement.reference} · Statut: "{statut.label}"
                  {resteAPayer > 0 && ` · Reste: ${resteAPayer.toLocaleString()} DH`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}