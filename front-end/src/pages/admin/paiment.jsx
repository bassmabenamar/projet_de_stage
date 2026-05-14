// pages/admin/paiment.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AVATAR_COLORS = ['#4f46e5','#0891b2','#16a34a','#E55B2D','#7c3aed','#0f766e','#dc2626','#a16207'];
const statutsPaiement = [
  { value: 'paye', label: 'Payé', bg: '#dcfce7', color: '#16a34a' },
  { value: 'partiel', label: 'Partiel', bg: '#dbeafe', color: '#2563eb' },
  { value: 'en_attente', label: 'En attente', bg: '#fef9c3', color: '#ca8a04' },
  { value: 'retard', label: 'En retard', bg: '#fee2e2', color: '#dc2626' },
];

function getAvatarColor(name) { let h = 0; for (let c of name) h += c.charCodeAt(0); return AVATAR_COLORS[h % AVATAR_COLORS.length]; }
function getInitials(name) { return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2); }
function getStatut(val) { return statutsPaiement.find(s => s.value === val) || { label: val, bg: '#f1f5f9', color: '#475569' }; }

export default function AdminPaiements() {
  const navigate = useNavigate();
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatut, setFilterStatut] = useState('');

  const [paiements, setPaiements] = useState([
    { id: '1', etudiant: 'Sarah Martin',    classe: '2ème Année', type: 'Scolarité',  montant: 5000, montantPaye: 5000, datePaiement: '2024-09-01', dateEcheance: '2024-09-15', methode: 'Virement',      statut: 'paye',       reference: 'REF-2024-001', notes: 'Paiement effectué à temps' },
    { id: '2', etudiant: 'Karim Benali',    classe: '1ère Année', type: 'Scolarité',  montant: 5000, montantPaye: 2500, datePaiement: '2024-09-05', dateEcheance: '2024-09-15', methode: 'Espèces',       statut: 'partiel',    reference: 'REF-2024-002', notes: 'Solde restant: 2500 DH' },
    { id: '3', etudiant: 'Leila Ouazzani',  classe: '3ème Année', type: 'Transport',  montant: 1200, montantPaye: 0,    datePaiement: '',           dateEcheance: '2024-09-10', methode: 'Espèces',       statut: 'retard',     reference: 'REF-2024-003', notes: 'Rappel envoyé le 12/09' },
    { id: '4', etudiant: 'Mohamed Tazi',    classe: '2ème Année', type: 'Cantine',    montant: 800,  montantPaye: 800,  datePaiement: '2024-09-02', dateEcheance: '2024-09-05', methode: 'Espèces',       statut: 'paye',       reference: 'REF-2024-004', notes: '' },
    { id: '5', etudiant: 'Fatima Zahrae',   classe: '1ère Année', type: 'Activité',   montant: 500,  montantPaye: 0,    datePaiement: '',           dateEcheance: '2024-09-20', methode: 'Carte bancaire', statut: 'en_attente', reference: 'REF-2024-005', notes: 'En attente du paiement' },
    { id: '6', etudiant: 'Youssef Amrani',  classe: '3ème Année', type: 'Scolarité',  montant: 5000, montantPaye: 5000, datePaiement: '2024-09-03', dateEcheance: '2024-09-15', methode: 'Chèque',        statut: 'paye',       reference: 'REF-2024-006', notes: '' },
  ]);

  const filtered = paiements.filter(p =>
    (p.etudiant.toLowerCase().includes(searchTerm.toLowerCase()) ||
     p.classe.toLowerCase().includes(searchTerm.toLowerCase()) ||
     p.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
     p.reference.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (!filterStatut || p.statut === filterStatut)
  );

  const totalCollecte = paiements.reduce((s, p) => s + p.montantPaye, 0);
  const totalAttendu = paiements.reduce((s, p) => s + p.montant, 0);
  const totalRetard = paiements.filter(p => p.statut === 'retard').reduce((s, p) => s + (p.montant - p.montantPaye), 0);

  const handleDelete = () => {
    setPaiements(prev => prev.filter(p => p.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  // Save paiements to localStorage or context for other components to access
  const savePaiement = (data) => {
    if (data.id) {
      // Edit existing
      setPaiements(prev => prev.map(p => p.id === data.id ? data : p));
    } else {
      // Add new
      setPaiements(prev => [...prev, { ...data, id: Date.now().toString() }]);
    }
  };

  // Make paiements available globally (you might want to use Context API)
  if (typeof window !== 'undefined') {
    window.paiementsData = { paiements, savePaiement };
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: '#1e3a5f' }}>Paiements</h1>
          <p className="text-sm text-slate-400 mt-0.5">
            {paiements.length} paiement{paiements.length !== 1 ? 's' : ''} · {totalCollecte.toLocaleString()} DH collectés
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-72">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="search"
              placeholder="Rechercher un paiement..."
              className="pl-9 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={() => navigate('/paiements/nouveau')}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white rounded-xl whitespace-nowrap transition-opacity hover:opacity-90"
            style={{ background: '#E55B2D' }}
          >
            <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            Ajouter un paiement
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Total collecté</p>
          <p className="text-3xl font-bold" style={{ color: '#16a34a' }}>{totalCollecte.toLocaleString()} <span className="text-lg">DH</span></p>
          <div className="mt-2 bg-slate-100 rounded-full h-2">
            <div className="h-2 rounded-full transition-all" style={{ width: `${Math.round((totalCollecte / totalAttendu) * 100)}%`, background: '#16a34a' }} />
          </div>
          <p className="text-xs text-slate-400 mt-1">{Math.round((totalCollecte / totalAttendu) * 100)}% du total attendu</p>
        </div>
        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Total attendu</p>
          <p className="text-3xl font-bold" style={{ color: '#1e3a5f' }}>{totalAttendu.toLocaleString()} <span className="text-lg">DH</span></p>
          <p className="text-xs text-slate-400 mt-3">{paiements.length} paiements au total</p>
        </div>
        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">En retard</p>
          <p className="text-3xl font-bold" style={{ color: '#dc2626' }}>{totalRetard.toLocaleString()} <span className="text-lg">DH</span></p>
          <p className="text-xs text-slate-400 mt-3">{paiements.filter(p => p.statut === 'retard').length} paiement(s) en retard</p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Statut:</span>
        <button
          onClick={() => setFilterStatut('')}
          className="px-3 py-1 rounded-full text-xs font-semibold transition-all hover:scale-105"
          style={!filterStatut ? { background: '#1e3a5f', color: 'white' } : { background: '#f1f5f9', color: '#475569' }}
        >
          Tous
        </button>
        {statutsPaiement.map(s => (
          <button
            key={s.value}
            onClick={() => setFilterStatut(s.value === filterStatut ? '' : s.value)}
            className="px-3 py-1 rounded-full text-xs font-semibold transition-all hover:scale-105"
            style={filterStatut === s.value ? { background: s.color, color: 'white' } : { background: s.bg, color: s.color }}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100" style={{ background: '#f8fafc' }}>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Étudiant</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Type</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Montant</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Méthode</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Échéance</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Statut</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
            </thead>
            <tbody>
              {filtered.map(p => {
                const statut = getStatut(p.statut);
                const pct = p.montant > 0 ? Math.round((p.montantPaye / p.montant) * 100) : 0;
                return (
                  <tr key={p.id} className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                          style={{ background: getAvatarColor(p.etudiant) }}>{getInitials(p.etudiant)}</div>
                        <div>
                          <p className="font-semibold text-sm" style={{ color: '#1e3a5f' }}>{p.etudiant}</p>
                          <p className="text-xs text-slate-400">{p.classe}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-bold px-2 py-0.5 rounded-md" style={{ background: '#fff7ed', color: '#E55B2D' }}>{p.type}</span>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-bold text-sm" style={{ color: '#1e3a5f' }}>{p.montantPaye.toLocaleString()} / {p.montant.toLocaleString()} DH</p>
                      <div className="mt-1 bg-slate-100 rounded-full h-1.5 w-24">
                        <div className="h-1.5 rounded-full transition-all" style={{ width: `${pct}%`, background: pct === 100 ? '#16a34a' : pct > 0 ? '#2563eb' : '#dc2626' }} />
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-500">{p.methode}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 text-xs text-slate-500">
                        <svg width="12" height="12" fill="none" stroke="#E55B2D" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {p.dateEcheance || 'Non définie'}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: statut.bg, color: statut.color }}>
                        {statut.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => navigate(`/paiements/${p.id}`)}
                          className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors"
                          title="Voir les détails"
                        >
                          <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => navigate(`/paiements/modifier/${p.id}`, { state: { paiement: p } })}
                          className="p-1.5 rounded-lg hover:bg-orange-50 transition-colors"
                          style={{ color: '#E55B2D' }}
                          title="Modifier"
                        >
                          <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => setDeleteTarget(p)}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors"
                          title="Supprimer"
                        >
                          <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-100">
          <svg className="w-14 h-14 mx-auto text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="font-bold text-base mb-1" style={{ color: '#1e3a5f' }}>Aucun paiement trouvé</h3>
          <p className="text-sm text-slate-400">
            {searchTerm || filterStatut ? "Essayez d'ajuster vos filtres." : 'Ajoutez un paiement pour commencer.'}
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
              <h2 className="text-base font-bold" style={{ color: '#1e3a5f' }}>Supprimer ce paiement ?</h2>
            </div>
            <p className="text-sm text-slate-500 mb-6 leading-relaxed">
              Êtes-vous sûr de vouloir supprimer le paiement de{' '}
              <strong style={{ color: '#1e3a5f' }}>"{deleteTarget.etudiant}"</strong> ?{' '}
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