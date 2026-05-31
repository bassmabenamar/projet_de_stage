import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import api from '../../api';

const typesPaiement    = ['Scolarité', 'Transport', 'Cantine', 'Activité', 'Matériel', 'Autre'];
const methodesPaiement = ['Espèces', 'Virement', 'Chèque', 'Carte bancaire'];
const statutsPaiement  = [
  { value: 'paye',       label: 'Payé',       bg: '#dcfce7', color: '#16a34a' },
  { value: 'partiel',    label: 'Partiel',    bg: '#dbeafe', color: '#2563eb' },
  { value: 'en_attente', label: 'En attente', bg: '#fef9c3', color: '#ca8a04' },
  { value: 'retard',     label: 'En retard',  bg: '#fee2e2', color: '#dc2626' },
];

const AVATAR_COLORS = ['#4f46e5','#0891b2','#16a34a','#E55B2D','#7c3aed','#0f766e','#dc2626','#a16207'];
function getAvatarColor(name) { let h = 0; for (let c of name) h += c.charCodeAt(0); return AVATAR_COLORS[h % AVATAR_COLORS.length]; }
function getInitials(name)    { return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2); }

const inputCls = (error) =>
  `w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition-all bg-white ${
    error
      ? 'border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-100'
      : 'border-slate-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100'
  }`;

function Field({ label, required, error, children }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-600 mb-1.5">
        {label}{required && <span className="text-orange-500 ml-0.5">*</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
          <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

export default function PaiementFormPage() {
  const navigate  = useNavigate();
  const { id }    = useParams();
  const location  = useLocation();
  const isEdit    = !!id;

  const [etudiants, setEtudiants] = useState([]);
  const [loading,   setLoading]   = useState(false);
  const [errors,    setErrors]    = useState({});
  const [touched,   setTouched]   = useState({});

  const [form, setForm] = useState({
    user_id:        '',
    type:           'Scolarité',
    montant:        '',
    montant_paye:   '',
    statut:         'en_attente',
    methode:        'Espèces',
    date_paiement:  '',
    date_echeance:  '',
    notes:          '',
    // display only
    etudiant:       '',
    reference:      '',
  });

  // ====== Fetch Etudiants ======
  useEffect(() => {
    const fetchEtudiants = async () => {
      try {
        const res = await api.get('/users', { params: { role: 'etudiant' } });
        setEtudiants(res.data.users || res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchEtudiants();
  }, []);

  // ====== Fetch Paiement si Edit ======
  useEffect(() => {
    if (isEdit) {
      const fromState = location.state?.paiement;
      if (fromState) {
        setForm({
          user_id:       fromState.user_id       || '',
          type:          fromState.type          || 'Scolarité',
          montant:       fromState.montant       || '',
          montant_paye:  fromState.montantPaye   || '',
          statut:        fromState.statut        || 'en_attente',
          methode:       fromState.methode       || 'Espèces',
          date_paiement: fromState.datePaiement  || '',
          date_echeance: fromState.dateEcheance  || '',
          notes:         fromState.notes         || '',
          etudiant:      fromState.etudiant      || '',
          reference:     fromState.reference     || '',
        });
      } else {
        // Fetch من الـ API
        api.get(`/paiements/${id}`).then(res => {
          const p = res.data;
          setForm({
            user_id:       p.user_id       || '',
            type:          p.type          || 'Scolarité',
            montant:       p.montant       || '',
            montant_paye:  p.montantPaye   || '',
            statut:        p.statut        || 'en_attente',
            methode:       p.methode       || 'Espèces',
            date_paiement: p.datePaiement  || '',
            date_echeance: p.dateEcheance  || '',
            notes:         p.notes         || '',
            etudiant:      p.etudiant      || '',
            reference:     p.reference     || '',
          });
        }).catch(() => navigate('/paiements'));
      }
    }
  }, [isEdit, id, location]);

  const set   = (key, val) => { setForm(f => ({ ...f, [key]: val })); if (errors[key]) setErrors(e => ({ ...e, [key]: '' })); };
  const touch = (key)      => setTouched(t => ({ ...t, [key]: true }));

  const validate = () => {
    const e = {};
    if (!form.user_id)                                         e.user_id      = "Sélectionnez un étudiant.";
    if (!form.montant || form.montant <= 0)                    e.montant      = "Le montant doit être supérieur à 0 DH.";
    if (form.montant_paye && Number(form.montant_paye) > Number(form.montant))
                                                               e.montant_paye = "Le montant payé ne peut pas dépasser le total.";
    if (form.montant_paye > 0 && !form.date_paiement)         e.date_paiement = "La date de paiement est requise.";
    return e;
  };

  const handleSubmit = async () => {
    setTouched({ user_id: true, montant: true, montant_paye: true, date_paiement: true });
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }

    setLoading(true);
    try {
      const payload = {
        user_id:       form.user_id,
        type:          form.type,
        montant:       Number(form.montant),
        montant_paye:  Number(form.montant_paye || 0),
        statut:        form.statut,
        methode:       form.methode,
        date_paiement: form.date_paiement || null,
        date_echeance: form.date_echeance || null,
        notes:         form.notes,
      };

      if (isEdit) {
        await api.put(`/paiements/${id}`, payload);
      } else {
        await api.post('/paiements', payload);
      }
      navigate('/paiements');
    } catch (err) {
      console.error(err);
      if (err.response?.data?.errors) setErrors(err.response.data.errors);
    } finally {
      setLoading(false);
    }
  };

  const pourcentage    = form.montant > 0 ? Math.round((form.montant_paye / form.montant) * 100) : 0;
  const selectedEtudiant = etudiants.find(e => e.id === Number(form.user_id));
  const displayName    = selectedEtudiant ? `${selectedEtudiant.prenom} ${selectedEtudiant.nom}` : (form.etudiant || '');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={() => navigate('/paiements')}
          className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 transition-colors">
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div>
          <h1 className="text-xl font-bold" style={{ color: '#1e3a5f' }}>
            {isEdit ? 'Modifier le paiement' : 'Nouveau paiement'}
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            {isEdit ? `Modification du paiement de "${displayName}"` : 'Remplissez les informations du paiement'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left */}
        <div className="lg:col-span-2 space-y-5">

          {/* Etudiant */}
          <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h2 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 rounded-full inline-block" style={{ background: '#E55B2D' }} />
              Informations étudiant
            </h2>
            <Field label="Étudiant" required error={touched.user_id && errors.user_id}>
              <select className={inputCls(touched.user_id && errors.user_id)}
                value={form.user_id}
                onChange={e => set('user_id', e.target.value)}
                onBlur={() => touch('user_id')}>
                <option value="">-- Sélectionner un étudiant --</option>
                {etudiants.map(e => (
                  <option key={e.id} value={e.id}>{e.prenom} {e.nom}</option>
                ))}
              </select>
            </Field>
          </section>

          {/* Détails */}
          <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h2 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 rounded-full inline-block" style={{ background: '#E55B2D' }} />
              Détails du paiement
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Type de paiement" required>
                <select className={inputCls(false)} value={form.type} onChange={e => set('type', e.target.value)}>
                  {typesPaiement.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </Field>
              <Field label="Méthode de paiement">
                <select className={inputCls(false)} value={form.methode} onChange={e => set('methode', e.target.value)}>
                  {methodesPaiement.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </Field>
              <Field label="Montant total (DH)" required error={touched.montant && errors.montant}>
                <input className={inputCls(touched.montant && errors.montant)}
                  type="number" min="0" step="0.01"
                  value={form.montant}
                  onChange={e => set('montant', e.target.value)}
                  onBlur={() => touch('montant')}
                  placeholder="0.00" />
              </Field>
              <Field label="Montant payé (DH)" error={touched.montant_paye && errors.montant_paye}>
                <input className={inputCls(touched.montant_paye && errors.montant_paye)}
                  type="number" min="0" step="0.01"
                  value={form.montant_paye}
                  onChange={e => set('montant_paye', e.target.value)}
                  onBlur={() => touch('montant_paye')}
                  placeholder="0.00" />
              </Field>
              <Field label="Date d'échéance">
                <input className={inputCls(false)} type="date"
                  value={form.date_echeance} onChange={e => set('date_echeance', e.target.value)} />
              </Field>
              <Field label="Date de paiement" error={touched.date_paiement && errors.date_paiement}>
                <input className={inputCls(touched.date_paiement && errors.date_paiement)} type="date"
                  value={form.date_paiement}
                  onChange={e => set('date_paiement', e.target.value)}
                  onBlur={() => touch('date_paiement')} />
              </Field>
            </div>
          </section>

          {/* Notes */}
          <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h2 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 rounded-full inline-block" style={{ background: '#E55B2D' }} />
              Notes
            </h2>
            <textarea className={inputCls(false)} rows={4}
              value={form.notes} onChange={e => set('notes', e.target.value)}
              placeholder="Notes supplémentaires..." style={{ resize: 'vertical' }} />
          </section>
        </div>

        {/* Right */}
        <div className="space-y-5">

          {/* Statut */}
          <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h2 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 rounded-full inline-block" style={{ background: '#E55B2D' }} />
              Statut & référence
            </h2>
            <div className="space-y-4">
              <Field label="Statut">
                <select className={inputCls(false)} value={form.statut} onChange={e => set('statut', e.target.value)}>
                  {statutsPaiement.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
              </Field>
              {isEdit && form.reference && (
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Référence</label>
                  <input className={`${inputCls(false)} bg-slate-50`} value={form.reference} readOnly />
                </div>
              )}
            </div>
          </section>

          {/* Progression */}
          {form.montant > 0 && (
            <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <h2 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-4 rounded-full inline-block" style={{ background: '#E55B2D' }} />
                Progression
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Montant payé</span>
                  <span className="font-semibold" style={{ color: '#E55B2D' }}>{pourcentage}%</span>
                </div>
                <div className="bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${pourcentage}%`, background: pourcentage === 100 ? '#16a34a' : '#E55B2D' }} />
                </div>
                <div className="text-xs text-slate-600 space-y-1">
                  <p className="flex justify-between">
                    <span>Payé:</span>
                    <span className="font-semibold" style={{ color: '#16a34a' }}>{Number(form.montant_paye || 0).toLocaleString()} DH</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Restant:</span>
                    <span className="font-semibold" style={{ color: form.montant - form.montant_paye > 0 ? '#dc2626' : '#16a34a' }}>
                      {(Number(form.montant) - Number(form.montant_paye || 0)).toLocaleString()} DH
                    </span>
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* Aperçu */}
          <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h2 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 rounded-full inline-block" style={{ background: '#E55B2D' }} />
              Aperçu
            </h2>
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                style={{ background: displayName ? getAvatarColor(displayName) : '#94a3b8' }}>
                {displayName ? getInitials(displayName) : '?'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate" style={{ color: displayName ? '#1e3a5f' : '#cbd5e1' }}>
                  {displayName || "Nom de l'étudiant"}
                </p>
                {form.montant > 0 && (
                  <p className="text-xs font-semibold mt-1" style={{ color: '#E55B2D' }}>
                    {Number(form.montant).toLocaleString()} DH
                  </p>
                )}
              </div>
              {form.statut && (() => {
                const s = statutsPaiement.find(s => s.value === form.statut);
                return (
                  <span className="text-xs font-semibold px-2 py-1 rounded-full"
                    style={{ background: s?.bg, color: s?.color }}>
                    {s?.label}
                  </span>
                );
              })()}
            </div>
          </section>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <button onClick={handleSubmit} disabled={loading}
              className="w-full py-3 text-sm font-bold text-white rounded-xl flex items-center justify-center gap-2 transition-opacity hover:opacity-90 disabled:opacity-60"
              style={{ background: '#E55B2D' }}>
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  {isEdit ? 'Enregistrer les modifications' : 'Créer le paiement'}
                </>
              )}
            </button>
            <button onClick={() => navigate('/paiements')}
              className="w-full py-3 text-sm font-semibold text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors">
              Annuler
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}