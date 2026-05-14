// pages/admin/RemarqueFormPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const typesRemarque = ['Comportement', 'Académique', 'Assiduité', 'Tenue', 'Retard', 'Violence', 'Félicitation', 'Autre'];
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

export default function RemarqueFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const isEdit = !!id;

  const [form, setForm] = useState({
    id: '',
    etudiant: '',
    classe: '',
    enseignant: '',
    type: 'Comportement',
    priorite: 'normale',
    date: new Date().toISOString().slice(0, 10),
    description: '',
    statut: 'ouverte',
    suivi: '',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (isEdit) {
      const remarque = location.state?.remarque || window.remarquesData?.remarques.find(r => r.id === id);
      if (remarque) {
        setForm(remarque);
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
    if (!form.description.trim()) e.description = "La description est obligatoire.";
    if (!form.type) e.type = "Le type de remarque est obligatoire.";
    return e;
  };

  const handleSubmit = () => {
    setTouched({ etudiant: true, description: true, type: true });
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      setTimeout(() => {
        const el = document.querySelector('[data-error="true"]');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 50);
      return;
    }

    const remarqueData = {
      ...form,
      id: isEdit ? form.id : Date.now().toString(),
    };

    if (window.remarquesData) {
      window.remarquesData.saveRemarque(remarqueData);
    }

    navigate('/remarques');
  };

  const missingCount = [!form.etudiant.trim(), !form.description.trim()].filter(Boolean).length;

  return (
    <div className="space-y-6">
      {/* Header */}
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
            {isEdit ? 'Modifier la remarque' : 'Nouvelle remarque'}
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            {isEdit ? `Modification de la remarque` : 'Remplissez les informations de la remarque'}
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-5">
          <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h2 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 rounded-full inline-block" style={{ background: '#E55B2D' }} />
              Informations générales
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Étudiant" required error={touched.etudiant && errors.etudiant}>
                <div data-error={!!(touched.etudiant && errors.etudiant)}>
                  <input
                    className={inputCls(touched.etudiant && errors.etudiant)}
                    value={form.etudiant}
                    onChange={e => set('etudiant', e.target.value)}
                    onBlur={() => touch('etudiant')}
                    placeholder="Nom complet de l'étudiant"
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

              <Field label="Enseignant">
                <input
                  className={inputCls(false)}
                  value={form.enseignant}
                  onChange={e => set('enseignant', e.target.value)}
                  placeholder="Nom de l'enseignant"
                />
              </Field>

              <Field label="Date">
                <input
                  className={inputCls(false)}
                  type="date"
                  value={form.date}
                  onChange={e => set('date', e.target.value)}
                />
              </Field>
            </div>
          </section>

          <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h2 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 rounded-full inline-block" style={{ background: '#E55B2D' }} />
              Détails de la remarque
            </h2>
            <div className="space-y-4">
              <Field label="Description" required error={touched.description && errors.description}>
                <div data-error={!!(touched.description && errors.description)}>
                  <textarea
                    className={inputCls(touched.description && errors.description)}
                    rows={4}
                    value={form.description}
                    onChange={e => set('description', e.target.value)}
                    onBlur={() => touch('description')}
                    placeholder="Décrivez la remarque en détail..."
                    style={{ resize: 'vertical' }}
                  />
                </div>
              </Field>

              <Field label="Suivi / Actions prises">
                <textarea
                  className={inputCls(false)}
                  rows={3}
                  value={form.suivi}
                  onChange={e => set('suivi', e.target.value)}
                  placeholder="Actions prises ou à prendre..."
                  style={{ resize: 'vertical' }}
                />
              </Field>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h2 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 rounded-full inline-block" style={{ background: '#E55B2D' }} />
              Paramètres
            </h2>
            <div className="space-y-4">
              <Field label="Type de remarque" required>
                <select
                  className={inputCls(false)}
                  value={form.type}
                  onChange={e => set('type', e.target.value)}
                >
                  {typesRemarque.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </Field>

              <Field label="Priorité">
                <select
                  className={inputCls(false)}
                  value={form.priorite}
                  onChange={e => set('priorite', e.target.value)}
                >
                  {priorites.map(p => (
                    <option key={p.value} value={p.value}>{p.label}</option>
                  ))}
                </select>
              </Field>

              <Field label="Statut">
                <select
                  className={inputCls(false)}
                  value={form.statut}
                  onChange={e => set('statut', e.target.value)}
                >
                  {statutsRemarque.map(s => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </Field>
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
              {isEdit ? 'Enregistrer les modifications' : 'Créer la remarque'}
            </button>

            {missingCount > 0 && Object.keys(errors).length > 0 && (
              <p className="text-xs text-center text-red-400">
                {missingCount} champ{missingCount > 1 ? 's' : ''} obligatoire{missingCount > 1 ? 's' : ''} manquant{missingCount > 1 ? 's' : ''}.
              </p>
            )}

            <button
              onClick={() => navigate('/remarques')}
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