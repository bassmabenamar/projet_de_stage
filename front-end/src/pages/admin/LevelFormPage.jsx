// pages/admin/LevelFormPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import api from '../../api';

const cycles = [
  { value: 'primaire', label: 'Primaire (1AP - 6AP)', color: '#4f46e5', bg: '#e0e7ff' },
  { value: 'college',  label: 'Collège (1AC - 3AC)',  color: '#E55B2D', bg: '#fff7ed' },
  { value: 'lycee',    label: 'Lycée (TC - 2BAC)',    color: '#16a34a', bg: '#dcfce7' },
];

const statuts = [
  { value: 'Actif',   label: 'Actif',   bg: '#dcfce7', color: '#16a34a' },
  { value: 'Inactif', label: 'Inactif', bg: '#fee2e2', color: '#dc2626' },
];

const getNiveauxParCycle = (cycle) => {
  switch (cycle) {
    case 'primaire': return [
      { nom: '1ère Année Primaire', code: '1AP', abreviation: '1AP', ordre: 1 },
      { nom: '2ème Année Primaire', code: '2AP', abreviation: '2AP', ordre: 2 },
      { nom: '3ème Année Primaire', code: '3AP', abreviation: '3AP', ordre: 3 },
      { nom: '4ème Année Primaire', code: '4AP', abreviation: '4AP', ordre: 4 },
      { nom: '5ème Année Primaire', code: '5AP', abreviation: '5AP', ordre: 5 },
      { nom: '6ème Année Primaire', code: '6AP', abreviation: '6AP', ordre: 6 },
    ];
    case 'college': return [
      { nom: '7ème Année (Collège)', code: '1AC', abreviation: '1AC', ordre: 7 },
      { nom: '8ème Année (Collège)', code: '2AC', abreviation: '2AC', ordre: 8 },
      { nom: '9ème Année (Collège)', code: '3AC', abreviation: '3AC', ordre: 9 },
    ];
    case 'lycee': return [
      { nom: 'Tronc Commun',             code: 'TC',   abreviation: 'TC',   ordre: 10 },
      { nom: '1ère Année Baccalauréat',  code: '1BAC', abreviation: '1BAC', ordre: 11 },
      { nom: '2ème Année Baccalauréat',  code: '2BAC', abreviation: '2BAC', ordre: 12 },
    ];
    default: return [];
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

const availableSubjects = [
  { id: 1,  name: 'Arabe',                       code: 'AR'   },
  { id: 2,  name: 'Français',                    code: 'FR'   },
  { id: 3,  name: 'Anglais',                     code: 'ENG'  },
  { id: 4,  name: 'Mathématiques',               code: 'MATH' },
  { id: 5,  name: 'Sciences de la Vie et de la Terre', code: 'SVT' },
  { id: 6,  name: 'Physique et Chimie',          code: 'PC'   },
  { id: 7,  name: 'Histoire et Géographie',      code: 'HG'   },
  { id: 8,  name: 'Éducation Islamique',         code: 'EI'   },
  { id: 9,  name: 'Philosophie',                 code: 'PHI'  },
  { id: 10, name: 'Informatique',                code: 'INFO' },
];

export default function LevelFormPage() {
  const navigate  = useNavigate();
  const { id }    = useParams();
  const location  = useLocation();
  const isEdit    = !!id;

  const [loading, setLoading]   = useState(false);
  const [fetching, setFetching] = useState(isEdit);
  const [errors, setErrors]     = useState({});
  const [touched, setTouched]   = useState({});

  const [form, setFormState] = useState({
    nom_niveau:       '',
    code:             '',
    abreviation:      '',
    cycle:            'primaire',
    ordre:            1,
    description:      '',
    statut:           'Actif',
    frais_scolarite:  '',
    frais_transport:  '',
    frais_cantine:    '',
    capacite:         '',
    nombre_etudiants: 0,
  });

  // ====== Fetch si Edit ======
  useEffect(() => {
    if (!isEdit) return;

    const fromState = location.state?.level;
    if (fromState) {
      setFormState({
        nom_niveau:       fromState.nom        || '',
        code:             fromState.code        || '',
        abreviation:      fromState.abreviation || '',
        cycle:            fromState.cycle       || 'primaire',
        ordre:            fromState.ordre       || 1,
        description:      fromState.description || '',
        statut:           fromState.statut      || 'Actif',
        frais_scolarite:  fromState.frais_scolarite  ?? '',
        frais_transport:  fromState.frais_transport  ?? '',
        frais_cantine:    fromState.frais_cantine    ?? '',
        capacite:         fromState.capacite_max     ?? '',
        nombre_etudiants: fromState.nombre_etudiants ?? 0,
      });
      setFetching(false);
    } else {
      api.get(`/niveaux/${id}`)
        .then(res => {
          const n = res.data;
          setFormState({
            nom_niveau:       n.nom             || '',
            code:             n.code            || '',
            abreviation:      n.abreviation     || '',
            cycle:            n.cycle           || 'primaire',
            ordre:            n.ordre           || 1,
            description:      n.description     || '',
            statut:           n.statut          || 'Actif',
            frais_scolarite:  n.frais_scolarite  ?? '',
            frais_transport:  n.frais_transport  ?? '',
            frais_cantine:    n.frais_cantine    ?? '',
            capacite:         n.capacite_max     ?? '',
            nombre_etudiants: n.nombre_etudiants ?? 0,
          });
        })
        .catch(() => navigate('/niveaux'))
        .finally(() => setFetching(false));
    }
  }, [isEdit, id]);

  const setField = (key, val) => {
    setFormState(f => ({ ...f, [key]: val }));
    if (errors[key]) setErrors(e => ({ ...e, [key]: '' }));
  };
  const touch = (key) => setTouched(t => ({ ...t, [key]: true }));

  const validate = () => {
    const e = {};
    if (!form.nom_niveau.trim())   e.nom_niveau  = "Le nom du niveau est obligatoire.";
    if (!form.code.trim())         e.code        = "Le code est obligatoire.";
    if (!form.abreviation.trim())  e.abreviation = "L'abréviation est obligatoire.";
    if (!form.cycle)               e.cycle       = "Le cycle est obligatoire.";
    if (form.frais_scolarite !== '' && form.frais_scolarite < 0) e.frais_scolarite = "Montant invalide.";
    if (form.frais_transport !== '' && form.frais_transport < 0) e.frais_transport = "Montant invalide.";
    if (form.frais_cantine   !== '' && form.frais_cantine   < 0) e.frais_cantine   = "Montant invalide.";
    if (form.capacite !== '' && form.capacite < 0) e.capacite = "Capacité invalide.";
    return e;
  };

  const handleSubmit = async () => {
    setTouched({ nom_niveau: true, code: true, abreviation: true, cycle: true });
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }

    setLoading(true);
    try {
      const payload = {
        nom_niveau:       form.nom_niveau,
        code:             form.code.toUpperCase(),
        abreviation:      form.abreviation.toUpperCase(),
        cycle:            form.cycle,
        ordre:            parseInt(form.ordre) || 1,
        description:      form.description || null,
        statut:           form.statut,
        frais_scolarite:  parseFloat(form.frais_scolarite) || 0,
        frais_transport:  parseFloat(form.frais_transport) || 0,
        frais_cantine:    parseFloat(form.frais_cantine)   || 0,
        capacite:         form.capacite !== '' ? parseInt(form.capacite) : null,
      };

      if (isEdit) {
        await api.put(`/niveaux/${id}`, payload);
      } else {
        await api.post('/niveaux', payload);
      }

      navigate('/niveaux');
    } catch (err) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else if (err.response?.data?.message) {
        setErrors({ general: err.response.data.message });
      }
    } finally {
      setLoading(false);
    }
  };

  const totalFrais = (parseFloat(form.frais_scolarite) || 0)
                   + (parseFloat(form.frais_transport)  || 0)
                   + (parseFloat(form.frais_cantine)    || 0);

  const remainingPlaces = form.capacite !== ''
    ? parseInt(form.capacite) - (parseInt(form.nombre_etudiants) || 0)
    : null;

  const cycleInfo = cycles.find(c => c.value === form.cycle);

  if (fetching) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="w-8 h-8 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={() => navigate('/niveaux')}
          className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 transition-colors">
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div>
          <h1 className="text-xl font-bold" style={{ color: '#1e3a5f' }}>
            {isEdit ? 'Modifier le niveau' : 'Nouveau niveau scolaire'}
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            {isEdit ? `Modification de "${form.nom_niveau}"` : 'Ajouter un niveau dans le système éducatif marocain'}
          </p>
        </div>
      </div>

      {/* General error */}
      {errors.general && (
        <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600">
          {errors.general}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left — 2/3 */}
        <div className="lg:col-span-2 space-y-5">

          {/* Informations générales */}
          <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h2 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 rounded-full inline-block" style={{ background: '#E55B2D' }} />
              Informations générales
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Cycle scolaire" required error={touched.cycle && errors.cycle}>
                <select className={inputCls(touched.cycle && errors.cycle)}
                  value={form.cycle}
                  onChange={e => setField('cycle', e.target.value)}
                  onBlur={() => touch('cycle')}>
                  {cycles.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </Field>

              <Field label="Nom du niveau" required error={touched.nom_niveau && errors.nom_niveau}>
                <input className={inputCls(touched.nom_niveau && errors.nom_niveau)}
                  value={form.nom_niveau}
                  onChange={e => setField('nom_niveau', e.target.value)}
                  onBlur={() => touch('nom_niveau')}
                  placeholder="Ex: 1ère Année Primaire" />
              </Field>

              <Field label="Code" required error={touched.code && errors.code}>
                <input className={inputCls(touched.code && errors.code)}
                  value={form.code}
                  onChange={e => setField('code', e.target.value.toUpperCase())}
                  onBlur={() => touch('code')}
                  placeholder="1AP" maxLength={10} />
              </Field>

              <Field label="Abréviation" required error={touched.abreviation && errors.abreviation}>
                <input className={inputCls(touched.abreviation && errors.abreviation)}
                  value={form.abreviation}
                  onChange={e => setField('abreviation', e.target.value.toUpperCase())}
                  onBlur={() => touch('abreviation')}
                  placeholder="1AP" maxLength={5} />
              </Field>

              <Field label="Ordre d'affichage">
                <input className={inputCls(false)} type="number" min="1"
                  value={form.ordre}
                  onChange={e => setField('ordre', e.target.value)}
                  placeholder="1" />
              </Field>

              <Field label="Statut">
                <select className={inputCls(false)} value={form.statut}
                  onChange={e => setField('statut', e.target.value)}>
                  {statuts.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
              </Field>

              <div className="col-span-2">
                <Field label="Description">
                  <textarea className={inputCls(false)} rows={3}
                    value={form.description}
                    onChange={e => setField('description', e.target.value)}
                    placeholder="Description du niveau scolaire..."
                    style={{ resize: 'vertical' }} />
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
                  <input type="checkbox"
                    className="w-4 h-4 rounded border-slate-300 text-orange-500 focus:ring-orange-500"
                    readOnly />
                  <span className="text-sm text-slate-700">
                    {subject.name} <span className="text-xs text-slate-400">({subject.code})</span>
                  </span>
                </label>
              ))}
            </div>
            <p className="text-xs text-slate-400 mt-3">Les matières seront gérées séparément via le module Matières.</p>
          </section>
        </div>

        {/* Right — 1/3 */}
        <div className="space-y-5">

          {/* Frais */}
          <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h2 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 rounded-full inline-block" style={{ background: '#E55B2D' }} />
              Frais scolaires (annuels)
            </h2>
            <div className="space-y-4">
              <Field label="Frais de scolarité (DH)" error={touched.frais_scolarite && errors.frais_scolarite}>
                <input className={inputCls(touched.frais_scolarite && errors.frais_scolarite)}
                  type="number" min="0" step="100"
                  value={form.frais_scolarite}
                  onChange={e => setField('frais_scolarite', e.target.value)}
                  onBlur={() => touch('frais_scolarite')}
                  placeholder="0.00" />
              </Field>
              <Field label="Frais de transport (DH)" error={touched.frais_transport && errors.frais_transport}>
                <input className={inputCls(touched.frais_transport && errors.frais_transport)}
                  type="number" min="0" step="50"
                  value={form.frais_transport}
                  onChange={e => setField('frais_transport', e.target.value)}
                  onBlur={() => touch('frais_transport')}
                  placeholder="0.00" />
              </Field>
              <Field label="Frais de cantine (DH)" error={touched.frais_cantine && errors.frais_cantine}>
                <input className={inputCls(touched.frais_cantine && errors.frais_cantine)}
                  type="number" min="0" step="50"
                  value={form.frais_cantine}
                  onChange={e => setField('frais_cantine', e.target.value)}
                  onBlur={() => touch('frais_cantine')}
                  placeholder="0.00" />
              </Field>
              <div className="pt-3 border-t border-slate-100 flex justify-between text-sm">
                <span className="font-semibold text-slate-600">Total annuel:</span>
                <span className="font-bold" style={{ color: '#E55B2D' }}>{totalFrais.toLocaleString()} DH</span>
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
              <Field label="Capacité maximale" error={touched.capacite && errors.capacite}>
                <input className={inputCls(touched.capacite && errors.capacite)}
                  type="number" min="0"
                  value={form.capacite}
                  onChange={e => setField('capacite', e.target.value)}
                  onBlur={() => touch('capacite')}
                  placeholder="Illimitée" />
              </Field>
              {remainingPlaces !== null && (
                <div className={`p-3 rounded-lg ${remainingPlaces > 0 ? 'bg-green-50' : remainingPlaces === 0 ? 'bg-orange-50' : 'bg-red-50'}`}>
                  <p className="text-xs text-center">
                    {remainingPlaces > 0
                      ? <span className="text-green-600">✅ {remainingPlaces} places restantes</span>
                      : remainingPlaces === 0
                      ? <span className="text-orange-600">⚠️ Niveau complet</span>
                      : <span className="text-red-600">⚠️ Capacité dépassée de {Math.abs(remainingPlaces)} places</span>
                    }
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Aperçu */}
          <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h2 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 rounded-full inline-block" style={{ background: '#E55B2D' }} />
              Aperçu
            </h2>
            <div className="rounded-xl overflow-hidden border border-slate-100">
              <div className="p-4" style={{ background: `linear-gradient(135deg, ${cycleInfo?.color || '#E55B2D'} 0%, ${cycleInfo?.color || '#E55B2D'}dd 100%)` }}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg text-white">{form.nom_niveau || 'Nom du niveau'}</h3>
                    <p className="text-xs text-white opacity-90 mt-1">{form.abreviation || 'CODE'} · {form.code || 'Code'}</p>
                  </div>
                  <span className="text-xs font-semibold px-2 py-1 rounded-full"
                    style={form.statut === 'Actif' ? { background: '#dcfce7', color: '#16a34a' } : { background: '#fee2e2', color: '#dc2626' }}>
                    {form.statut}
                  </span>
                </div>
                <p className="mt-2 text-xs text-white opacity-80">{cycleInfo?.label}</p>
              </div>
              <div className="p-4 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Total frais:</span>
                  <span className="font-semibold" style={{ color: '#E55B2D' }}>{totalFrais.toLocaleString()} DH</span>
                </div>
                {form.capacite !== '' && (
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Capacité:</span>
                    <span className="font-semibold">{form.capacite} élèves</span>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Niveaux courants */}
          {!isEdit && (
            <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <h2 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                <span className="w-1.5 h-4 rounded-full inline-block" style={{ background: '#E55B2D' }} />
                Niveaux courants
              </h2>
              <div className="space-y-1">
                {getNiveauxParCycle(form.cycle).map(level => (
                  <button key={level.code} type="button"
                    onClick={() => {
                      setField('nom_niveau',  level.nom);
                      setField('code',        level.code);
                      setField('abreviation', level.abreviation);
                      setField('ordre',       level.ordre);
                    }}
                    className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-orange-50 transition-colors"
                    style={{ color: '#1e3a5f' }}>
                    {level.nom} ({level.code})
                  </button>
                ))}
              </div>
              <p className="text-xs text-slate-400 mt-3 text-center">Cliquez pour pré-remplir le formulaire</p>
            </section>
          )}

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <button onClick={handleSubmit} disabled={loading}
              className="w-full py-3 text-sm font-bold text-white rounded-xl flex items-center justify-center gap-2 transition-opacity hover:opacity-90 disabled:opacity-60"
              style={{ background: '#E55B2D' }}>
              {loading
                ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                : <>
                    <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {isEdit ? 'Enregistrer les modifications' : 'Créer le niveau'}
                  </>
              }
            </button>
            <button onClick={() => navigate('/niveaux')}
              className="w-full py-3 text-sm font-semibold text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors">
              Annuler
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}