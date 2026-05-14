// pages/admin/SubjectFormPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

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
  const isEdit = !!id;

  const [form, setForm] = useState({
    id: '',
    name: '',
    code: '',
    teacher: '',
    hours: 3,
    color: '#2F5D9F',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (isEdit) {
      const subject = location.state?.subject || window.subjectsData?.subjects.find(s => s.id === id);
      if (subject) {
        setForm(subject);
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
    if (!form.name.trim()) e.name = "Le nom de la matière est obligatoire.";
    if (!form.code.trim()) e.code = "Le code de la matière est obligatoire.";
    if (!form.teacher.trim()) e.teacher = "Le nom de l'enseignant est obligatoire.";
    if (form.hours < 1 || form.hours > 40) e.hours = "Les heures doivent être entre 1 et 40.";
    return e;
  };

  const handleSubmit = () => {
    setTouched({ name: true, code: true, teacher: true, hours: true });
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }

    const subjectData = {
      ...form,
      id: isEdit ? form.id : Date.now().toString(),
      code: form.code.toUpperCase(),
    };

    if (window.subjectsData) {
      window.subjectsData.saveSubject(subjectData);
    }

    navigate('/subjects');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/subjects')}
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
            {isEdit ? `Modification de "${form.name}"` : 'Remplissez les informations de la matière'}
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
              <Field label="Nom de la matière" required error={touched.name && errors.name}>
                <input
                  className={inputCls(touched.name && errors.name)}
                  value={form.name}
                  onChange={e => set('name', e.target.value)}
                  onBlur={() => touch('name')}
                  placeholder="Ex: Mathématiques"
                />
              </Field>

              <Field label="Code" required error={touched.code && errors.code}>
                <input
                  className={inputCls(touched.code && errors.code)}
                  value={form.code}
                  onChange={e => set('code', e.target.value.toUpperCase())}
                  onBlur={() => touch('code')}
                  placeholder="MATH"
                  maxLength={6}
                />
              </Field>

              <Field label="Enseignant" required error={touched.teacher && errors.teacher}>
                <input
                  className={inputCls(touched.teacher && errors.teacher)}
                  value={form.teacher}
                  onChange={e => set('teacher', e.target.value)}
                  onBlur={() => touch('teacher')}
                  placeholder="Ex: John Doe"
                />
              </Field>

              <Field label="Heures par semaine" error={touched.hours && errors.hours}>
                <input
                  type="number"
                  min="1"
                  max="40"
                  className={inputCls(touched.hours && errors.hours)}
                  value={form.hours}
                  onChange={e => set('hours', parseInt(e.target.value) || 1)}
                  onBlur={() => touch('hours')}
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
              Couleur
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl border-2 border-slate-200 shadow-sm" style={{ backgroundColor: form.color }} />
                <div className="flex-1">
                  <p className="text-xs text-slate-500">Couleur sélectionnée</p>
                  <p className="text-sm font-mono">{form.color}</p>
                </div>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {COLOR_PALETTE.map(c => (
                  <button
                    key={c}
                    onClick={() => set('color', c)}
                    className={`w-10 h-10 rounded-lg transition-all hover:scale-110 ${
                      form.color === c ? 'ring-2 ring-offset-2 ring-orange-500' : ''
                    }`}
                    style={{ backgroundColor: c }}
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
                <div className="w-10 h-10 rounded-lg" style={{ backgroundColor: form.color }} />
                <div>
                  <p className="font-semibold text-sm" style={{ color: '#1e3a5f' }}>{form.name || 'Nom'}</p>
                  <p className="text-xs text-slate-400">{form.code || 'CODE'}</p>
                </div>
              </div>
              <span className="text-xs font-semibold" style={{ color: '#E55B2D' }}>{form.hours}h/sem</span>
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
              {isEdit ? 'Enregistrer les modifications' : 'Créer la matière'}
            </button>
            <button
              onClick={() => navigate('/subjects')}
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