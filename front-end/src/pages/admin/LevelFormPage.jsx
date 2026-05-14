// pages/admin/LevelFormPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const cycles = [
  { value: 'primaire', label: 'Primaire (1AP - 6AP)', color: '#4f46e5', bg: '#e0e7ff' },
  { value: 'college', label: 'Collège (1AC - 3AC)', color: '#E55B2D', bg: '#fff7ed' },
  { value: 'lycee', label: 'Lycée (TC - 2BAC)', color: '#16a34a', bg: '#dcfce7' },
];

const statuts = [
  { value: 'Actif', label: 'Actif', bg: '#dcfce7', color: '#16a34a' },
  { value: 'Inactif', label: 'Inactif', bg: '#fee2e2', color: '#dc2626' },
];

// Predefined levels based on cycle selection
const getNiveauxParCycle = (cycle) => {
  switch(cycle) {
    case 'primaire':
      return [
        { nom: '1ère Année Primaire', code: '1AP', abreviation: '1AP', ordre: 1 },
        { nom: '2ème Année Primaire', code: '2AP', abreviation: '2AP', ordre: 2 },
        { nom: '3ème Année Primaire', code: '3AP', abreviation: '3AP', ordre: 3 },
        { nom: '4ème Année Primaire', code: '4AP', abreviation: '4AP', ordre: 4 },
        { nom: '5ème Année Primaire', code: '5AP', abreviation: '5AP', ordre: 5 },
        { nom: '6ème Année Primaire', code: '6AP', abreviation: '6AP', ordre: 6 },
      ];
    case 'college':
      return [
        { nom: '7ème Année (Collège)', code: '1AC', abreviation: '1AC', ordre: 7 },
        { nom: '8ème Année (Collège)', code: '2AC', abreviation: '2AC', ordre: 8 },
        { nom: '9ème Année (Collège)', code: '3AC', abreviation: '3AC', ordre: 9 },
      ];
    case 'lycee':
      return [
        { nom: 'Tronc Commun', code: 'TC', abreviation: 'TC', ordre: 10 },
        { nom: '1ère Année Baccalauréat', code: '1BAC', abreviation: '1BAC', ordre: 11 },
        { nom: '2ème Année Baccalauréat', code: '2BAC', abreviation: '2BAC', ordre: 12 },
      ];
    default:
      return [];
  }
};

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

// Available subjects (you can fetch from API)
const availableSubjects = [
  { id: 1, name: 'Arabe', code: 'AR' },
  { id: 2, name: 'Français', code: 'FR' },
  { id: 3, name: 'Anglais', code: 'ENG' },
  { id: 4, name: 'Mathématiques', code: 'MATH' },
  { id: 5, name: 'Sciences de la Vie et de la Terre', code: 'SVT' },
  { id: 6, name: 'Physique et Chimie', code: 'PC' },
  { id: 7, name: 'Histoire et Géographie', code: 'HG' },
  { id: 8, name: 'Éducation Islamique', code: 'EI' },
  { id: 9, name: 'Philosophie', code: 'PHI' },
  { id: 10, name: 'Informatique', code: 'INFO' },
];

export default function LevelFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const isEdit = !!id;

  const [form, setForm] = useState({
    id: '',
    nom: '',
    code: '',
    abreviation: '',
    cycle: 'primaire',
    ordre: 1,
    description: '',
    statut: 'Actif',
    matieres: [],
    frais_scolarite: '',
    frais_transport: '',
    frais_cantine: '',
    capacite_max: '',
    nombre_etudiants: 0,
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (isEdit) {
      const level = location.state?.level || window.levelsData?.niveaux.find(l => l.id === id);
      if (level) {
        setForm({
          ...level,
          matieres: level.matieres || [],
        });
      }
    }
  }, [isEdit, id, location]);

  // Auto-fill form based on selected cycle (for new entries)
  useEffect(() => {
    if (!isEdit && form.cycle && !form.nom) {
      const niveauxList = getNiveauxParCycle(form.cycle);
      // Don't auto-fill, let user select from dropdown or enter manually
    }
  }, [form.cycle, isEdit]);

  const setField = (key, val) => {
    setForm(f => ({ ...f, [key]: val }));
    if (errors[key]) setErrors(e => ({ ...e, [key]: '' }));
  };

  const touch = (key) => setTouched(t => ({ ...t, [key]: true }));

  const validate = () => {
    const e = {};
    if (!form.nom.trim()) e.nom = "Le nom du niveau est obligatoire.";
    if (!form.code.trim()) e.code = "Le code est obligatoire.";
    if (!form.abreviation.trim()) e.abreviation = "L'abréviation est obligatoire.";
    if (!form.cycle) e.cycle = "Le cycle est obligatoire.";
    if (form.frais_scolarite && form.frais_scolarite < 0) e.frais_scolarite = "Le montant ne peut pas être négatif.";
    if (form.frais_transport && form.frais_transport < 0) e.frais_transport = "Le montant ne peut pas être négatif.";
    if (form.frais_cantine && form.frais_cantine < 0) e.frais_cantine = "Le montant ne peut pas être négatif.";
    if (form.capacite_max && form.capacite_max < 0) e.capacite_max = "La capacité doit être positive.";
    if (form.nombre_etudiants > form.capacite_max && form.capacite_max) 
      e.nombre_etudiants = "Le nombre d'étudiants ne peut pas dépasser la capacité maximale.";
    return e;
  };

  const handleSubmit = () => {
    setTouched({ nom: true, code: true, abreviation: true, cycle: true });
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      setTimeout(() => {
        const el = document.querySelector('[data-error="true"]');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 50);
      return;
    }

    const levelData = {
      ...form,
      id: isEdit ? form.id : Date.now().toString(),
      code: form.code.toUpperCase(),
      frais_scolarite: parseFloat(form.frais_scolarite) || 0,
      frais_transport: parseFloat(form.frais_transport) || 0,
      frais_cantine: parseFloat(form.frais_cantine) || 0,
      capacite_max: form.capacite_max ? parseInt(form.capacite_max) : null,
      nombre_etudiants: parseInt(form.nombre_etudiants) || 0,
    };

    if (window.levelsData) {
      window.levelsData.saveLevel(levelData);
    }

    navigate('/niveaux');
  };

  const handleSubjectToggle = (subjectId) => {
    const currentSubjects = form.matieres;
    if (currentSubjects.includes(subjectId)) {
      setField('matieres', currentSubjects.filter(id => id !== subjectId));
    } else {
      setField('matieres', [...currentSubjects, subjectId]);
    }
  };

  const handleCycleChange = (cycleValue) => {
    setField('cycle', cycleValue);
    // Pre-fill with default level data for the selected cycle (optional)
    const niveauxList = getNiveauxParCycle(cycleValue);
    if (niveauxList.length > 0 && !form.nom && !isEdit) {
      // Optionally auto-fill the first level
      // setField('nom', niveauxList[0].nom);
      // setField('code', niveauxList[0].code);
      // setField('abreviation', niveauxList[0].abreviation);
      // setField('ordre', niveauxList[0].ordre);
    }
  };

  const totalFrais = (parseFloat(form.frais_scolarite) || 0) + 
                     (parseFloat(form.frais_transport) || 0) + 
                     (parseFloat(form.frais_cantine) || 0);

  const remainingPlaces = form.capacite_max ? 
    (parseInt(form.capacite_max) - (parseInt(form.nombre_etudiants) || 0)) : null;

  const cycleInfo = cycles.find(c => c.value === form.cycle);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/niveaux')}
          className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 transition-colors"
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div>
          <h1 className="text-xl font-bold" style={{ color: '#1e3a5f' }}>
            {isEdit ? 'Modifier le niveau' : 'Nouveau niveau scolaire'}
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            {isEdit ? `Modification de "${form.nom}"` : 'Ajouter un niveau dans le système éducatif marocain'}
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form - 2/3 width */}
        <div className="lg:col-span-2 space-y-5">
          {/* Basic Information */}
          <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h2 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 rounded-full inline-block" style={{ background: '#E55B2D' }} />
              Informations générales
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Cycle scolaire" required error={touched.cycle && errors.cycle}>
                <div data-error={!!(touched.cycle && errors.cycle)}>
                  <select
                    className={inputCls(touched.cycle && errors.cycle)}
                    value={form.cycle}
                    onChange={e => handleCycleChange(e.target.value)}
                    onBlur={() => touch('cycle')}
                  >
                    {cycles.map(c => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                  </select>
                </div>
              </Field>

              <Field label="Nom du niveau" required error={touched.nom && errors.nom}>
                <div data-error={!!(touched.nom && errors.nom)}>
                  <input
                    className={inputCls(touched.nom && errors.nom)}
                    value={form.nom}
                    onChange={e => setField('nom', e.target.value)}
                    onBlur={() => touch('nom')}
                    placeholder="Ex: 1ère Année Primaire"
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
                    placeholder="1AP"
                    maxLength={10}
                  />
                </div>
              </Field>

              <Field label="Abréviation" required error={touched.abreviation && errors.abreviation}>
                <div data-error={!!(touched.abreviation && errors.abreviation)}>
                  <input
                    className={inputCls(touched.abreviation && errors.abreviation)}
                    value={form.abreviation}
                    onChange={e => setField('abreviation', e.target.value.toUpperCase())}
                    onBlur={() => touch('abreviation')}
                    placeholder="1AP"
                    maxLength={5}
                  />
                </div>
              </Field>

              <Field label="Ordre d'affichage">
                <input
                  className={inputCls(false)}
                  type="number"
                  min="0"
                  value={form.ordre}
                  onChange={e => setField('ordre', parseInt(e.target.value) || 0)}
                  placeholder="1"
                />
              </Field>

              <Field label="Statut">
                <select
                  className={inputCls(false)}
                  value={form.statut}
                  onChange={e => setField('statut', e.target.value)}
                >
                  {statuts.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
              </Field>

              <div className="col-span-2">
                <Field label="Description">
                  <textarea
                    className={inputCls(false)}
                    rows={3}
                    value={form.description}
                    onChange={e => setField('description', e.target.value)}
                    placeholder="Description du niveau scolaire..."
                    style={{ resize: 'vertical' }}
                  />
                </Field>
              </div>
            </div>
          </section>

          {/* Matières */}
          <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h2 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 rounded-full inline-block" style={{ background: '#E55B2D' }} />
              Matières enseignées
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {availableSubjects.map(subject => (
                <label key={subject.id} className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.matieres.includes(subject.id)}
                    onChange={() => handleSubjectToggle(subject.id)}
                    className="w-4 h-4 rounded border-slate-300 text-orange-500 focus:ring-orange-500"
                  />
                  <span className="text-sm text-slate-700">
                    {subject.name} <span className="text-xs text-slate-400">({subject.code})</span>
                  </span>
                </label>
              ))}
            </div>
            {form.matieres.length > 0 && (
              <div className="mt-3 pt-3 border-t border-slate-100">
                <p className="text-xs text-slate-500">
                  {form.matieres.length} matière(s) sélectionnée(s)
                </p>
              </div>
            )}
          </section>
        </div>

        {/* Sidebar - 1/3 width */}
        <div className="space-y-5">
          {/* Frais Scolaires */}
          <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h2 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 rounded-full inline-block" style={{ background: '#E55B2D' }} />
              Frais scolaires (annuels)
            </h2>
            <div className="space-y-4">
              <Field label="Frais de scolarité (DH)" error={touched.frais_scolarite && errors.frais_scolarite}>
                <input
                  className={inputCls(touched.frais_scolarite && errors.frais_scolarite)}
                  type="number"
                  min="0"
                  step="100"
                  value={form.frais_scolarite}
                  onChange={e => setField('frais_scolarite', e.target.value)}
                  onBlur={() => touch('frais_scolarite')}
                  placeholder="0.00"
                />
              </Field>

              <Field label="Frais de transport (DH)" error={touched.frais_transport && errors.frais_transport}>
                <input
                  className={inputCls(touched.frais_transport && errors.frais_transport)}
                  type="number"
                  min="0"
                  step="50"
                  value={form.frais_transport}
                  onChange={e => setField('frais_transport', e.target.value)}
                  onBlur={() => touch('frais_transport')}
                  placeholder="0.00"
                />
              </Field>

              <Field label="Frais de cantine (DH)" error={touched.frais_cantine && errors.frais_cantine}>
                <input
                  className={inputCls(touched.frais_cantine && errors.frais_cantine)}
                  type="number"
                  min="0"
                  step="50"
                  value={form.frais_cantine}
                  onChange={e => setField('frais_cantine', e.target.value)}
                  onBlur={() => touch('frais_cantine')}
                  placeholder="0.00"
                />
              </Field>

              <div className="pt-3 border-t border-slate-100">
                <div className="flex justify-between text-sm">
                  <span className="font-semibold text-slate-600">Total frais annuels:</span>
                  <span className="font-bold" style={{ color: '#E55B2D' }}>{totalFrais.toLocaleString()} DH</span>
                </div>
              </div>
            </div>
          </section>

          {/* Capacité */}
          <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h2 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 rounded-full inline-block" style={{ background: '#E55B2D' }} />
              Capacité d'accueil
            </h2>
            <div className="space-y-4">
              <Field label="Capacité maximale" error={touched.capacite_max && errors.capacite_max}>
                <input
                  className={inputCls(touched.capacite_max && errors.capacite_max)}
                  type="number"
                  min="0"
                  value={form.capacite_max}
                  onChange={e => setField('capacite_max', e.target.value)}
                  onBlur={() => touch('capacite_max')}
                  placeholder="Illimitée"
                />
              </Field>

              <Field label="Nombre d'étudiants actuels" error={touched.nombre_etudiants && errors.nombre_etudiants}>
                <input
                  className={inputCls(touched.nombre_etudiants && errors.nombre_etudiants)}
                  type="number"
                  min="0"
                  value={form.nombre_etudiants}
                  onChange={e => setField('nombre_etudiants', e.target.value)}
                  onBlur={() => touch('nombre_etudiants')}
                  placeholder="0"
                />
              </Field>

              {remainingPlaces !== null && (
                <div className={`p-3 rounded-lg ${remainingPlaces > 0 ? 'bg-green-50' : 'bg-red-50'}`}>
                  <p className="text-xs text-center">
                    {remainingPlaces > 0 ? (
                      <span className="text-green-600">✅ {remainingPlaces} places restantes</span>
                    ) : remainingPlaces === 0 ? (
                      <span className="text-orange-600">⚠️ Niveau complet</span>
                    ) : (
                      <span className="text-red-600">⚠️ Capacité dépassée de {Math.abs(remainingPlaces)} places</span>
                    )}
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Preview Card */}
          <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h2 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 rounded-full inline-block" style={{ background: '#E55B2D' }} />
              Aperçu
            </h2>
            <div className="rounded-xl overflow-hidden border border-slate-100">
              <div className="p-4" style={{ background: `linear-gradient(135deg, ${cycleInfo?.color || '#E55B2D'} 0%, ${cycleInfo?.color || '#E55B2D'}dd 100%)` }}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg text-white">
                      {form.nom || 'Nom du niveau'}
                    </h3>
                    <p className="text-xs text-white text-opacity-90 mt-1">
                      {form.abreviation || 'CODE'} · {form.code || 'Code'}
                    </p>
                  </div>
                  <span 
                    className="text-xs font-semibold px-2 py-1 rounded-full"
                    style={form.statut === 'Actif' 
                      ? { background: '#dcfce7', color: '#16a34a' }
                      : { background: '#fee2e2', color: '#dc2626' }}
                  >
                    {form.statut}
                  </span>
                </div>
                <div className="mt-3 text-white text-opacity-90 text-xs">
                  <p>{cycleInfo?.label || 'Cycle non sélectionné'}</p>
                </div>
              </div>
              <div className="p-4 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Total frais:</span>
                  <span className="font-semibold" style={{ color: '#E55B2D' }}>{totalFrais.toLocaleString()} DH</span>
                </div>
                {form.capacite_max && (
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Capacité:</span>
                    <span className="font-semibold">{form.capacite_max} élèves</span>
                  </div>
                )}
                {form.matieres.length > 0 && (
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Matières:</span>
                    <span className="font-semibold">{form.matieres.length}</span>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Quick Links - Common Levels */}
          {!isEdit && (
            <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <h2 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                <span className="w-1.5 h-4 rounded-full inline-block" style={{ background: '#E55B2D' }} />
                Niveaux courants
              </h2>
              <div className="space-y-1">
                {getNiveauxParCycle(form.cycle).map(level => (
                  <button
                    key={level.code}
                    type="button"
                    onClick={() => {
                      setField('nom', level.nom);
                      setField('code', level.code);
                      setField('abreviation', level.abreviation);
                      setField('ordre', level.ordre);
                    }}
                    className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-orange-50 transition-colors"
                    style={{ color: '#1e3a5f' }}
                  >
                    {level.nom} ({level.code})
                  </button>
                ))}
              </div>
              <p className="text-xs text-slate-400 mt-3 text-center">
                Cliquez sur un niveau pour pré-remplir le formulaire
              </p>
            </section>
          )}

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
              {isEdit ? 'Enregistrer les modifications' : 'Créer le niveau'}
            </button>
            <button
              onClick={() => navigate('/niveaux')}
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