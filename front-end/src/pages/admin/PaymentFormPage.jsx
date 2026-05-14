// pages/admin/PaiementFormPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const typesPaiement = ['Scolarité', 'Transport', 'Cantine', 'Activité', 'Matériel', 'Autre'];
const methodesPaiement = ['Espèces', 'Virement', 'Chèque', 'Carte bancaire'];
const statutsPaiement = [
  { value: 'paye', label: 'Payé', bg: '#dcfce7', color: '#16a34a' },
  { value: 'partiel', label: 'Partiel', bg: '#dbeafe', color: '#2563eb' },
  { value: 'en_attente', label: 'En attente', bg: '#fef9c3', color: '#ca8a04' },
  { value: 'retard', label: 'En retard', bg: '#fee2e2', color: '#dc2626' },
];

const AVATAR_COLORS = ['#4f46e5','#0891b2','#16a34a','#E55B2D','#7c3aed','#0f766e','#dc2626','#a16207'];
function getAvatarColor(name) { let h = 0; for (let c of name) h += c.charCodeAt(0); return AVATAR_COLORS[h % AVATAR_COLORS.length]; }
function getInitials(name) { return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2); }

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
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const isEdit = !!id;

  const [form, setForm] = useState({
    id:           '',
    etudiant:     '',
    classe:       '',
    type:         'Scolarité',
    montant:      '',
    montantPaye:  '',
    datePaiement: '',
    dateEcheance: '',
    methode:      'Espèces',
    statut:       'en_attente',
    reference:    `REF-${Date.now()}`,
    notes:        '',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (isEdit) {
      // Get payment from location state or from global storage
      const payment = location.state?.paiement || window.paiementsData?.paiements.find(p => p.id === id);
      if (payment) {
        setForm(payment);
      }
    }
  }, [isEdit, id, location]);

  const set = (key, val) => {
    setForm(f => ({ ...f, [key]: val }));
    if (errors[key]) setErrors(e => ({ ...e, [key]: '' }));
  };

  const touch = (key) => setTouched(t => ({ ...t, [key]: true }));

  const validate = () => {
    const e = {};
    if (!form.etudiant.trim()) e.etudiant = "Le nom de l'étudiant est obligatoire.";
    if (!form.montant || form.montant <= 0) e.montant = "Le montant total doit être supérieur à 0 DH.";
    if (form.montantPaye && form.montantPaye > form.montant) 
      e.montantPaye = "Le montant payé ne peut pas dépasser le montant total.";
    if (form.datePaiement && form.dateEcheance && new Date(form.datePaiement) > new Date(form.dateEcheance))
      e.datePaiement = "La date de paiement ne peut pas être après la date d'échéance.";
    if (form.montantPaye > 0 && !form.datePaiement)
      e.datePaiement = "La date de paiement est requise lorsqu'un montant est payé.";
    return e;
  };

  const handleSubmit = () => {
    setTouched({ etudiant: true, montant: true, montantPaye: true, datePaiement: true });
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      setTimeout(() => {
        const el = document.querySelector('[data-error="true"]');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 50);
      return;
    }
    
    const paymentData = {
      ...form,
      id: isEdit ? form.id : Date.now().toString(),
      montant: Number(form.montant),
      montantPaye: Number(form.montantPaye || 0),
    };

    // Save to global storage
    if (window.paiementsData) {
      window.paiementsData.savePaiement(paymentData);
    }
    
    navigate('/paiements');
  };

  const missingCount = [!form.etudiant.trim(), !form.montant].filter(Boolean).length;
  const pourcentage = form.montant > 0 ? Math.round((form.montantPaye / form.montant) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/paiements')}
          className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 transition-colors"
          aria-label="Retour"
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div>
          <h1 className="text-xl font-bold" style={{ color: '#1e3a5f' }}>
            {isEdit ? 'Modifier le paiement' : 'Nouveau paiement'}
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            {isEdit
              ? `Modification du paiement de "${form.etudiant || 'l étudiant'}"`
              : 'Remplissez les informations du paiement'}
          </p>
        </div>
      </div>

      {/* Rest of the form remains the same as before */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - 2/3 width */}
        <div className="lg:col-span-2 space-y-5">
          {/* Student Information */}
          <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h2 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 rounded-full inline-block" style={{ background: '#E55B2D' }} />
              Informations étudiant
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Nom complet" required error={touched.etudiant && errors.etudiant}>
                <div data-error={!!(touched.etudiant && errors.etudiant)}>
                  <input
                    className={inputCls(touched.etudiant && errors.etudiant)}
                    value={form.etudiant}
                    onChange={e => set('etudiant', e.target.value)}
                    onBlur={() => touch('etudiant')}
                    placeholder="Ex: Sarah Martin"
                  />
                </div>
              </Field>
              <Field label="Classe">
                <input
                  className={inputCls(false)}
                  value={form.classe}
                  onChange={e => set('classe', e.target.value)}
                  placeholder="Ex: 2ème Année"
                />
              </Field>
            </div>
          </section>

          {/* Payment Details */}
          <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h2 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 rounded-full inline-block" style={{ background: '#E55B2D' }} />
              Détails du paiement
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Type de paiement" required>
                <select
                  className={inputCls(false)}
                  value={form.type}
                  onChange={e => set('type', e.target.value)}
                >
                  {typesPaiement.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </Field>
              <Field label="Méthode de paiement">
                <select
                  className={inputCls(false)}
                  value={form.methode}
                  onChange={e => set('methode', e.target.value)}
                >
                  {methodesPaiement.map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </Field>
              <Field label="Montant total (DH)" required error={touched.montant && errors.montant}>
                <div data-error={!!(touched.montant && errors.montant)}>
                  <input
                    className={inputCls(touched.montant && errors.montant)}
                    type="number"
                    step="0.01"
                    min="0"
                    value={form.montant}
                    onChange={e => set('montant', e.target.value)}
                    onBlur={() => touch('montant')}
                    placeholder="0.00"
                  />
                </div>
              </Field>
              <Field label="Montant payé (DH)" error={touched.montantPaye && errors.montantPaye}>
                <div data-error={!!(touched.montantPaye && errors.montantPaye)}>
                  <input
                    className={inputCls(touched.montantPaye && errors.montantPaye)}
                    type="number"
                    step="0.01"
                    min="0"
                    value={form.montantPaye}
                    onChange={e => set('montantPaye', e.target.value)}
                    onBlur={() => touch('montantPaye')}
                    placeholder="0.00"
                  />
                </div>
              </Field>
              <Field label="Date d'échéance">
                <input
                  className={inputCls(false)}
                  type="date"
                  value={form.dateEcheance}
                  onChange={e => set('dateEcheance', e.target.value)}
                />
              </Field>
              <Field label="Date de paiement" error={touched.datePaiement && errors.datePaiement}>
                <div data-error={!!(touched.datePaiement && errors.datePaiement)}>
                  <input
                    className={inputCls(touched.datePaiement && errors.datePaiement)}
                    type="date"
                    value={form.datePaiement}
                    onChange={e => set('datePaiement', e.target.value)}
                    onBlur={() => touch('datePaiement')}
                  />
                </div>
              </Field>
            </div>
          </section>

          {/* Notes */}
          <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h2 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 rounded-full inline-block" style={{ background: '#E55B2D' }} />
              Notes supplémentaires
            </h2>
            <textarea
              className={inputCls(false)}
              rows={4}
              value={form.notes}
              onChange={e => set('notes', e.target.value)}
              placeholder="Ajoutez des notes, remarques ou informations supplémentaires concernant ce paiement..."
              style={{ resize: 'vertical' }}
            />
          </section>
        </div>

        {/* Right column - 1/3 width */}
        <div className="space-y-5">
          {/* Status & Reference */}
          <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h2 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 rounded-full inline-block" style={{ background: '#E55B2D' }} />
              Statut & référence
            </h2>
            <div className="space-y-4">
              <Field label="Statut">
                <select
                  className={inputCls(false)}
                  value={form.statut}
                  onChange={e => set('statut', e.target.value)}
                >
                  {statutsPaiement.map(s => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </Field>
              <Field label="Référence">
                <input
                  className={`${inputCls(false)} bg-slate-50`}
                  value={form.reference}
                  readOnly={!isEdit}
                />
                <p className="text-xs text-slate-400 mt-1.5">Référence unique du paiement</p>
              </Field>
            </div>
          </section>

          {/* Progress */}
          {form.montant > 0 && (
            <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <h2 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-4 rounded-full inline-block" style={{ background: '#E55B2D' }} />
                Progression
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between text-xs">
                  <span style={{ color: '#475569' }}>Montant payé</span>
                  <span className="font-semibold" style={{ color: '#E55B2D' }}>{pourcentage}%</span>
                </div>
                <div className="bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{ 
                      width: `${pourcentage}%`,
                      background: pourcentage === 100 ? '#16a34a' : '#E55B2D'
                    }}
                  />
                </div>
                <div className="text-xs text-slate-600 space-y-1">
                  <p className="flex justify-between">
                    <span>Payé:</span>
                    <span className="font-semibold" style={{ color: '#16a34a' }}>{Number(form.montantPaye).toLocaleString()} DH</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Restant:</span>
                    <span className="font-semibold" style={{ color: form.montant - form.montantPaye > 0 ? '#dc2626' : '#16a34a' }}>
                      {(form.montant - form.montantPaye).toLocaleString()} DH
                    </span>
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* Preview */}
          <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h2 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 rounded-full inline-block" style={{ background: '#E55B2D' }} />
              Aperçu
            </h2>
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                style={{ background: form.etudiant ? getAvatarColor(form.etudiant) : '#94a3b8' }}
              >
                {form.etudiant ? getInitials(form.etudiant) : '?'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate" style={{ color: form.etudiant ? '#1e3a5f' : '#cbd5e1' }}>
                  {form.etudiant || "Nom de l'étudiant"}
                </p>
                {form.classe && <p className="text-xs text-slate-400">{form.classe}</p>}
                {form.montant > 0 && (
                  <p className="text-xs font-semibold mt-1" style={{ color: '#E55B2D' }}>
                    {Number(form.montant).toLocaleString()} DH
                  </p>
                )}
              </div>
              {form.statut && (
                <span 
                  className="text-xs font-semibold px-2 py-1 rounded-full"
                  style={(() => {
                    const s = statutsPaiement.find(s => s.value === form.statut);
                    return { background: s?.bg || '#f1f5f9', color: s?.color || '#475569' };
                  })()}
                >
                  {statutsPaiement.find(s => s.value === form.statut)?.label || form.statut}
                </span>
              )}
            </div>
          </section>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <button
              onClick={handleSubmit}
              className="w-full py-3 text-sm font-bold text-white rounded-xl flex items-center justify-center gap-2 transition-opacity hover:opacity-90"
              style={{ background: '#E55B2D' }}
            >
              <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              {isEdit ? 'Enregistrer les modifications' : 'Créer le paiement'}
            </button>
            {missingCount > 0 && Object.keys(errors).length > 0 && (
              <p className="text-xs text-center text-red-400">
                {missingCount} champ{missingCount > 1 ? 's' : ''} obligatoire{missingCount > 1 ? 's' : ''} manquant{missingCount > 1 ? 's' : ''}.
              </p>
            )}
            <button
              onClick={() => navigate('/paiements')}
              className="w-full py-3 text-sm font-semibold text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors"
            >
              Annuler
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}