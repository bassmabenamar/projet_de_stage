import React, { useState, useEffect } from 'react';
import api from '../../api';

const categoriesCharge = ['Loyer', 'Salaire', 'Fournitures', 'Électricité', 'Internet', 'Autre'];

const AVATAR_COLORS = ['#4f46e5','#0891b2','#16a34a','#E55B2D','#7c3aed','#0f766e'];
function getAvatarColor(name) { let h = 0; for (let c of (name||'')) h += c.charCodeAt(0); return AVATAR_COLORS[h % AVATAR_COLORS.length]; }

export default function AdminCaisse() {
  const [ops, setOps]         = useState([]);
  const [stats, setStats]     = useState({ solde: 0, total_entrees: 0, total_charges: 0 });
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType]   = useState('');
  const [filterMois, setFilterMois]   = useState('');
  const [modal, setModal]     = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const [form, setForm] = useState({
    type: 'charge',
    description: '',
    montant: '',
    categorie: 'Loyer',
    date_operation: new Date().toISOString().split('T')[0],
  });

  // ====== Fetch ======
  const fetchCaisse = async () => {
    try {
      setLoading(true);
      const params = {};
      if (filterType) params.type = filterType;
      if (filterMois) params.mois = filterMois;
      const res = await api.get('/caisse', { params });
      setOps(res.data.operations);
      setStats({
        solde:          res.data.solde,
        total_entrees:  res.data.total_entrees,
        total_charges:  res.data.total_charges,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCaisse(); }, [filterType, filterMois]);

  // ====== Ajouter opération ======
  const handleSubmit = async () => {
    if (!form.description || !form.montant || !form.date_operation) return;
    try {
      await api.post('/caisse', {
        type:           form.type,
        description:    form.description,
        montant:        Number(form.montant),
        categorie:      form.type === 'charge' ? form.categorie : null,
        date_operation: form.date_operation,
      });
      setModal(false);
      setForm({ type: 'charge', description: '', montant: '', categorie: 'Loyer', date_operation: new Date().toISOString().split('T')[0] });
      fetchCaisse();
    } catch (err) {
      console.error(err);
    }
  };

  // ====== Supprimer ======
  const handleDelete = async () => {
    try {
      await api.delete(`/caisse/${deleteTarget.id}`);
      setDeleteTarget(null);
      fetchCaisse();
    } catch (err) {
      alert(err.response?.data?.message || 'Erreur lors de la suppression');
    }
  };

  const fmt = (n) => Number(n).toLocaleString('fr-MA') + ' DH';
  const pct = stats.total_entrees > 0 ? Math.round((stats.solde / stats.total_entrees) * 100) : 0;

  const today = new Date();
  const defaultMois = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0');

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: '#1e3a5f' }}>La Caisse</h1>
          <p className="text-sm text-slate-400 mt-0.5">
            {ops.length} opération{ops.length !== 1 ? 's' : ''} · Solde{' '}
            <span style={{ color: stats.solde >= 0 ? '#16a34a' : '#dc2626', fontWeight: 600 }}>
              {fmt(stats.solde)}
            </span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => { setForm(f => ({ ...f, type: 'entree' })); setModal(true); }}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-white rounded-xl transition-opacity hover:opacity-90"
            style={{ background: '#16a34a' }}
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            Entrée
          </button>
          <button
            onClick={() => { setForm(f => ({ ...f, type: 'charge' })); setModal(true); }}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-white rounded-xl transition-opacity hover:opacity-90"
            style={{ background: '#dc2626' }}
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 12H4" />
            </svg>
            Charge
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Solde actuel</p>
          <p className="text-3xl font-bold" style={{ color: stats.solde >= 0 ? '#1e3a5f' : '#dc2626' }}>
            {fmt(stats.solde)}
          </p>
          <div className="mt-2 bg-slate-100 rounded-full h-2">
            <div className="h-2 rounded-full transition-all"
              style={{ width: `${Math.max(0, Math.min(100, pct))}%`, background: stats.solde >= 0 ? '#16a34a' : '#dc2626' }} />
          </div>
          <p className="text-xs text-slate-400 mt-1">{pct}% des entrées restant</p>
        </div>
        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Total entrées</p>
          <p className="text-3xl font-bold" style={{ color: '#16a34a' }}>{fmt(stats.total_entrees)}</p>
          <p className="text-xs text-slate-400 mt-3">
            {ops.filter(o => o.type === 'entree').length} entrée(s)
          </p>
        </div>
        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Total charges</p>
          <p className="text-3xl font-bold" style={{ color: '#dc2626' }}>{fmt(stats.total_charges)}</p>
          <p className="text-xs text-slate-400 mt-3">
            {ops.filter(o => o.type === 'charge').length} charge(s)
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Type:</span>
        {[{ val: '', label: 'Tous' }, { val: 'entree', label: 'Entrées' }, { val: 'charge', label: 'Charges' }].map(f => (
          <button key={f.val}
            onClick={() => setFilterType(f.val)}
            className="px-3 py-1 rounded-full text-xs font-semibold transition-all"
            style={filterType === f.val
              ? { background: '#1e3a5f', color: 'white' }
              : { background: '#f1f5f9', color: '#475569' }}>
            {f.label}
          </button>
        ))}
        <input type="month" defaultValue={defaultMois}
          className="ml-auto px-3 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-600 outline-none focus:border-orange-400"
          onChange={e => setFilterMois(e.target.value)} />
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100" style={{ background: '#f8fafc' }}>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Description</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Source</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Montant</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {ops.map(op => (
                  <tr key={op.id} className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors">
                    <td className="px-4 py-3 text-xs text-slate-500">
                      {new Date(op.date_operation).toLocaleDateString('fr-MA')}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                          style={{ background: op.type === 'entree' ? '#16a34a' : '#dc2626' }}>
                          {op.type === 'entree' ? '↑' : '↓'}
                        </div>
                        <div>
                          <p className="font-semibold text-sm" style={{ color: '#1e3a5f' }}>{op.description}</p>
                          {op.categorie && <p className="text-xs text-slate-400">{op.categorie}</p>}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-md"
                        style={op.source === 'paiement'
                          ? { background: '#dbeafe', color: '#2563eb' }
                          : { background: '#f1f5f9', color: '#475569' }}>
                        {op.source === 'paiement' ? 'Paiement auto' : 'Manuel'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-bold text-sm"
                        style={{ color: op.type === 'entree' ? '#16a34a' : '#dc2626' }}>
                        {op.type === 'entree' ? '+' : '-'}{fmt(op.montant)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      {op.source !== 'paiement' && (
                        <button onClick={() => setDeleteTarget(op)}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors">
                          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!loading && ops.length === 0 && (
          <div className="text-center py-16">
            <svg className="w-14 h-14 mx-auto text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="font-bold text-base mb-1" style={{ color: '#1e3a5f' }}>Aucune opération</h3>
            <p className="text-sm text-slate-400">Les paiements s'ajoutent automatiquement ici.</p>
          </div>
        )}
      </div>

      {/* Modal Ajout */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.45)' }}
          onClick={() => setModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-7" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: form.type === 'charge' ? '#fee2e2' : '#dcfce7' }}>
                <svg width="16" height="16" fill="none" stroke={form.type === 'charge' ? '#dc2626' : '#16a34a'} viewBox="0 0 24 24">
                  {form.type === 'charge'
                    ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />}
                </svg>
              </div>
              <h2 className="text-base font-bold" style={{ color: '#1e3a5f' }}>
                {form.type === 'charge' ? 'Nouvelle charge' : 'Nouvelle entrée'}
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Type</label>
                <div className="flex gap-2">
                  {['entree', 'charge'].map(t => (
                    <button key={t}
                      onClick={() => setForm(f => ({ ...f, type: t }))}
                      className="flex-1 py-2 rounded-xl text-sm font-semibold transition-all border"
                      style={form.type === t
                        ? { background: t === 'entree' ? '#16a34a' : '#dc2626', color: 'white', borderColor: 'transparent' }
                        : { background: '#f8fafc', color: '#475569', borderColor: '#e2e8f0' }}>
                      {t === 'entree' ? '↑ Entrée' : '↓ Charge'}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Description</label>
                <input className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                  value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  placeholder="ex: Loyer local, Achat fournitures..." />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Montant (DH)</label>
                  <input type="number" min="0"
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                    value={form.montant}
                    onChange={e => setForm(f => ({ ...f, montant: e.target.value }))}
                    placeholder="0.00" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Date</label>
                  <input type="date"
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                    value={form.date_operation}
                    onChange={e => setForm(f => ({ ...f, date_operation: e.target.value }))} />
                </div>
              </div>
              {form.type === 'charge' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Catégorie</label>
                  <select className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-orange-400"
                    value={form.categorie}
                    onChange={e => setForm(f => ({ ...f, categorie: e.target.value }))}>
                    {categoriesCharge.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setModal(false)}
                className="px-5 py-2 text-sm font-semibold text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200">
                Annuler
              </button>
              <button onClick={handleSubmit}
                className="px-5 py-2 text-sm font-semibold text-white rounded-xl hover:opacity-90"
                style={{ background: form.type === 'charge' ? '#dc2626' : '#16a34a' }}>
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Suppression */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.45)' }}
          onClick={() => setDeleteTarget(null)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-7" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-11 h-11 rounded-full bg-red-100 flex items-center justify-center">
                <svg width="18" height="18" fill="none" stroke="#dc2626" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <h2 className="text-base font-bold" style={{ color: '#1e3a5f' }}>Supprimer cette opération ?</h2>
            </div>
            <p className="text-sm text-slate-500 mb-6">
              Voulez-vous supprimer <strong style={{ color: '#1e3a5f' }}>"{deleteTarget.description}"</strong> ?
              Cette action est irréversible.
            </p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setDeleteTarget(null)}
                className="px-5 py-2 text-sm font-semibold text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200">
                Annuler
              </button>
              <button onClick={handleDelete}
                className="px-5 py-2 text-sm font-semibold text-white bg-red-600 rounded-xl hover:bg-red-700">
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}