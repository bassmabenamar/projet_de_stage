// pages/admin/RemarqueFormPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import api from '../../api';

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
  const isEdit = !!id && id !== 'nouveau';
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    id: null,
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
      const remarque = location.state?.remarque || window.remarquesData?.remarques?.find(r => r.id == id);
      if (remarque) {
        setForm({
          id: remarque.id,
          etudiant: remarque.etudiant || '',
          classe: remarque.classe || '',
          enseignant: remarque.enseignant || '',
          type: remarque.type || 'Comportement',
          priorite: remarque.priorite || 'normale',
          date: remarque.date ? remarque.date.split('T')[0] : new Date().toISOString().slice(0, 10),
          description: remarque.description || '',
          statut: remarque.statut || 'ouverte',
          suivi: remarque.suivi || '',
        });
      }
    }
  }, [isEdit, id, location]);

  const setField = (key, val) => {
    setForm(f => ({ ...f, [key]: val }));
    if (errors[key]) setErrors(e => ({ ...e, [key]: '' }));
  };

  const touch = (key) => setTouched(t => ({ ...t, [key]: true }));

  const validate = () => {
    const e = {};
    if (!form.etudiant?.trim()) e.etudiant = "Le nom de l'étudiant est obligatoire.";
    if (!form.description?.trim()) e.description = "La description est obligatoire.";
    if (!form.type) e.type = "Le type de remarque est obligatoire.";
    if (form.classe && form.classe.length > 255) e.classe = "La classe ne peut pas dépasser 255 caractères.";
    if (form.enseignant && form.enseignant.length > 255) e.enseignant = "Le nom de l'enseignant ne peut pas dépasser 255 caractères.";
    return e;
  };

  const handleSubmit = async () => {
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

    setSaving(true);

    const remarqueData = {
      etudiant: form.etudiant,
      classe: form.classe || null,
      enseignant: form.enseignant || null,
      type: form.type,
      priorite: form.priorite,
      date: form.date,
      description: form.description,
      statut: form.statut,
      suivi: form.suivi || null,
    };

    // Ajouter l'ID seulement si c'est une modification
    if (isEdit && form.id) {
      remarqueData.id = form.id;
    }

    console.log('Sending data:', remarqueData); // Debug

    try {
      if (window.remarquesData && window.remarquesData.saveRemarque) {
        const result = await window.remarquesData.saveRemarque(remarqueData);
        if (result.success) {
          navigate('/remarques');
        } else {
          alert(result.error || 'Erreur lors de la sauvegarde');
        }
      } else {
        console.warn('window.remarquesData.saveRemarque non disponible');
        navigate('/remarques');
      }
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
      alert('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setSaving(false);
    }
  };

  const missingCount = [!form.etudiant?.trim(), !form.description?.trim()].filter(Boolean).length;

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
                    onChange={e => setField('etudiant', e.target.value)}
                    onBlur={() => touch('etudiant')}
                    placeholder="Nom complet de l'étudiant"
                  />
                </div>
              </Field>

              <Field label="Classe">
                <div data-error={!!(touched.classe && errors.classe)}>
                  <input
                    className={inputCls(touched.classe && errors.classe)}
                    value={form.classe}
                    onChange={e => setField('classe', e.target.value)}
                    onBlur={() => touch('classe')}
                    placeholder="Ex: 2ème Année"
                  />
                </div>
              </Field>

              <Field label="Enseignant">
                <div data-error={!!(touched.enseignant && errors.enseignant)}>
                  <input
                    className={inputCls(touched.enseignant && errors.enseignant)}
                    value={form.enseignant}
                    onChange={e => setField('enseignant', e.target.value)}
                    onBlur={() => touch('enseignant')}
                    placeholder="Nom de l'enseignant"
                  />
                </div>
              </Field>

              <Field label="Date">
                <input
                  className={inputCls(false)}
                  type="date"
                  value={form.date}
                  onChange={e => setField('date', e.target.value)}
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
                    onChange={e => setField('description', e.target.value)}
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
                  onChange={e => setField('suivi', e.target.value)}
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
              <Field label="Type de remarque" required error={touched.type && errors.type}>
                <div data-error={!!(touched.type && errors.type)}>
                  <select
                    className={inputCls(touched.type && errors.type)}
                    value={form.type}
                    onChange={e => setField('type', e.target.value)}
                    onBlur={() => touch('type')}
                  >
                    {typesRemarque.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </Field>

              <Field label="Priorité">
                <select
                  className={inputCls(false)}
                  value={form.priorite}
                  onChange={e => setField('priorite', e.target.value)}
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
                  onChange={e => setField('statut', e.target.value)}
                >
                  {statutsRemarque.map(s => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </Field>
            </div>
          </section>

          {/* Preview Card */}
          <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h2 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 rounded-full inline-block" style={{ background: '#E55B2D' }} />
              Aperçu
            </h2>
            <div className="rounded-xl p-3" style={{ background: '#f8fafc', border: '1px solid #f1f5f9' }}>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: '#E55B2D' }}>
                  {form.etudiant ? form.etudiant.charAt(0).toUpperCase() : '?'}
                </div>
                <div>
                  <p className="font-semibold text-sm" style={{ color: '#1e3a5f' }}>{form.etudiant || "Nom de l'étudiant"}</p>
                  <p className="text-xs text-slate-400">{form.classe || "Classe"} · {form.enseignant || "Enseignant"}</p>
                </div>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mt-2">{form.description || "Description de la remarque..."}</p>
              <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-200">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={priorites.find(p => p.value === form.priorite)?.bg ? { background: priorites.find(p => p.value === form.priorite).bg, color: priorites.find(p => p.value === form.priorite).color } : { background: '#f1f5f9', color: '#475569' }}>
                  {priorites.find(p => p.value === form.priorite)?.label || 'Normale'}
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={statutsRemarque.find(s => s.value === form.statut)?.bg ? { background: statutsRemarque.find(s => s.value === form.statut).bg, color: statutsRemarque.find(s => s.value === form.statut).color } : { background: '#f1f5f9', color: '#475569' }}>
                  {statutsRemarque.find(s => s.value === form.statut)?.label || 'Ouverte'}
                </span>
              </div>
            </div>
          </section>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <button
              onClick={handleSubmit}
              disabled={saving}
              className="w-full py-3 text-sm font-bold text-white rounded-xl flex items-center justify-center gap-2 transition-opacity hover:opacity-90 disabled:opacity-50"
              style={{ background: '#E55B2D' }}
            >
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  {isEdit ? 'Enregistrement...' : 'Création...'}
                </>
              ) : (
                <>
                  <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  {isEdit ? 'Enregistrer les modifications' : 'Créer la remarque'}
                </>
              )}
            </button>

            {missingCount > 0 && Object.keys(errors).length > 0 && (
              <p className="text-xs text-center text-red-400">
                {missingCount} champ{missingCount > 1 ? 's' : ''} obligatoire{missingCount > 1 ? 's' : ''} manquant{missingCount > 1 ? 's' : ''}.
              </p>
            )}

            <button
              onClick={() => navigate('/remarques')}
              disabled={saving}
              className="w-full py-3 text-sm font-semibold text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors disabled:opacity-50"
            >
              Annuler
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}