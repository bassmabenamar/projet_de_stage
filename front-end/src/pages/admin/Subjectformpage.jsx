// pages/admin/SubjectFormPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import api from '../../api';

const COLOR_PALETTE = [
  '#2F5D9F', '#4A7CC2', '#E55B2D', '#16A34A', '#0D9488',
  '#A16207', '#7C3AED', '#0F766E', '#DC2626', '#475569',
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

export default function SubjectFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const isEdit = !!id && id !== 'nouveau';
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    id: null,
    nom: '',
    code: '',
    enseignant: '',
    heures: 3,
    couleur: '#2F5D9F',
    description: '',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (isEdit) {
      const subject = location.state?.subject || window.subjectsData?.subjects?.find(s => s.id == id);
      if (subject) {
        setForm({
          id: subject.id,
          nom: subject.nom || '',
          code: subject.code || '',
          enseignant: subject.enseignant || '',
          heures: subject.heures || 3,
          couleur: subject.couleur || '#2F5D9F',
          description: subject.description || '',
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
    if (!form.nom?.trim()) e.nom = "Le nom de la matière est obligatoire.";
    if (!form.code?.trim()) e.code = "Le code de la matière est obligatoire.";
    if (!form.enseignant?.trim()) e.enseignant = "Le nom de l'enseignant est obligatoire.";
    if (form.heures < 1 || form.heures > 40) e.heures = "Les heures doivent être entre 1 et 40.";
    return e;
  };

  const handleSubmit = async () => {
    setTouched({ nom: true, code: true, enseignant: true, heures: true });
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

    const subjectData = {
      nom: form.nom,
      code: form.code.toUpperCase(),
      enseignant: form.enseignant,
      heures: parseInt(form.heures),
      couleur: form.couleur,
      description: form.description || null,
    };

    // Ajouter l'ID seulement si c'est une modification
    if (isEdit && form.id) {
      subjectData.id = form.id;
    }

    console.log('Sending data:', subjectData); // Debug

    try {
      if (window.subjectsData && window.subjectsData.saveSubject) {
        const result = await window.subjectsData.saveSubject(subjectData);
        if (result.success) {
          navigate('/matieres');
        } else {
          alert(result.error || 'Erreur lors de la sauvegarde');
        }
      } else {
        console.warn('window.subjectsData.saveSubject non disponible');
        navigate('/matieres');
      }
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
      alert('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/matieres')}
          className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 transition-colors"
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div>
          <h1 className="text-xl font-bold" style={{ color: '#1e3a5f' }}>
            {isEdit ? 'Modifier la matière' : 'Nouvelle matière'}
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            {isEdit ? `Modification de "${form.nom}"` : 'Remplissez les informations de la matière'}
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
              <Field label="Nom de la matière" required error={touched.nom && errors.nom}>
                <div data-error={!!(touched.nom && errors.nom)}>
                  <input
                    className={inputCls(touched.nom && errors.nom)}
                    value={form.nom}
                    onChange={e => setField('nom', e.target.value)}
                    onBlur={() => touch('nom')}
                    placeholder="Ex: Mathématiques"
                  />
                </div>
              </Field>

              <Field label="Code" required error={touched.code && errors.code}>
                <div data-error={!!(touched.code && errors.code)}>
                  <input
                    className={inputCls(touched.code && errors.code)}
                    value={form.code}
                    onChange={e => setField('code', e.target.value.toUpperCase())}
                    onBlur={() => touch('code')}
                    placeholder="MATH"
                    maxLength={6}
                  />
                </div>
              </Field>

              <Field label="Enseignant" required error={touched.enseignant && errors.enseignant}>
                <div data-error={!!(touched.enseignant && errors.enseignant)}>
                  <input
                    className={inputCls(touched.enseignant && errors.enseignant)}
                    value={form.enseignant}
                    onChange={e => setField('enseignant', e.target.value)}
                    onBlur={() => touch('enseignant')}
                    placeholder="Ex: John Doe"
                  />
                </div>
              </Field>

              <Field label="Heures par semaine" error={touched.heures && errors.heures}>
                <div data-error={!!(touched.heures && errors.heures)}>
                  <input
                    type="number"
                    min="1"
                    max="40"
                    className={inputCls(touched.heures && errors.heures)}
                    value={form.heures}
                    onChange={e => setField('heures', parseInt(e.target.value) || 1)}
                    onBlur={() => touch('heures')}
                  />
                </div>
              </Field>

              <Field label="Description">
                <div className="col-span-1 sm:col-span-2">
                  <textarea
                    className={inputCls(false)}
                    rows={3}
                    value={form.description}
                    onChange={e => setField('description', e.target.value)}
                    placeholder="Description de la matière (optionnelle)..."
                    style={{ resize: 'vertical' }}
                  />
                </div>
              </Field>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h2 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 rounded-full inline-block" style={{ background: '#E55B2D' }} />
              Couleur
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl border-2 border-slate-200 shadow-sm" style={{ backgroundColor: form.couleur }} />
                <div className="flex-1">
                  <p className="text-xs text-slate-500">Couleur sélectionnée</p>
                  <p className="text-sm font-mono">{form.couleur}</p>
                </div>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {COLOR_PALETTE.map(c => (
                  <button
                    key={c}
                    onClick={() => setField('couleur', c)}
                    className={`w-10 h-10 rounded-lg transition-all hover:scale-110 ${
                      form.couleur === c ? 'ring-2 ring-offset-2 ring-orange-500' : ''
                    }`}
                    style={{ backgroundColor: c }}
                    type="button"
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Preview */}
          <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h2 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 rounded-full inline-block" style={{ background: '#E55B2D' }} />
              Aperçu
            </h2>
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg" style={{ backgroundColor: form.couleur }} />
                <div>
                  <p className="font-semibold text-sm" style={{ color: '#1e3a5f' }}>{form.nom || 'Nom'}</p>
                  <p className="text-xs text-slate-400">{form.code || 'CODE'}</p>
                </div>
              </div>
              <span className="text-xs font-semibold" style={{ color: '#E55B2D' }}>{form.heures}h/sem</span>
            </div>
            {form.enseignant && (
              <div className="mt-3 pt-3 border-t border-slate-100">
                <p className="text-xs text-slate-500">Enseignant</p>
                <p className="text-sm font-medium text-slate-700">{form.enseignant}</p>
              </div>
            )}
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
                  {isEdit ? 'Enregistrer les modifications' : 'Créer la matière'}
                </>
              )}
            </button>
            <button
              onClick={() => navigate('/matieres')}
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