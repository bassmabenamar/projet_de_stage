// pages/admin/TransportFormPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const typesVehicule = ['Bus', 'Minibus', 'Voiture', 'Van', 'Camionnette'];
const statutsDisponibilite = [
  { value: 'disponible', label: 'Disponible', bg: '#dcfce7', color: '#16a34a' },
  { value: 'en_route', label: 'En route', bg: '#dbeafe', color: '#2563eb' },
  { value: 'en_maintenance', label: 'En maintenance', bg: '#fef9c3', color: '#ca8a04' },
  { value: 'hors_service', label: 'Hors service', bg: '#fee2e2', color: '#dc2626' },
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

const SectionHeader = ({ icon, label }) => (
  <div className="flex items-center gap-2 mb-3 pt-4 border-t border-slate-100">
    <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: '#fff7ed' }}>
      <svg width="14" height="14" fill="none" stroke="#E55B2D" viewBox="0 0 24 24">{icon}</svg>
    </div>
    <span className="text-sm font-bold" style={{ color: '#1e3a5f' }}>{label}</span>
  </div>
);

export default function TransportFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const isEdit = !!id;

  const [form, setForm] = useState({
    id: '', nom: '', code: '', type: '', immatriculation: '', capacite: '',
    chauffeur:   { nom: '', telephone: '', permis: '', email: '' },
    responsable: { nom: '', telephone: '', email: '' },
    statut: 'disponible', image: null, imagePreview: '', description: '',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (isEdit) {
      const transport = location.state?.transport || window.transportsData?.transports.find(t => t.id === id);
      if (transport) {
        setForm({
          ...transport,
          imagePreview: transport.image || '',
          chauffeur: { ...transport.chauffeur },
          responsable: { ...transport.responsable },
        });
      }
    }
  }, [isEdit, id, location]);

  const setField = (key, val) => {
    setForm(f => ({ ...f, [key]: val }));
    if (errors[key]) setErrors(e => ({ ...e, [key]: '' }));
  };

  const setChauffeur = (key, val) => {
    setForm(f => ({ ...f, chauffeur: { ...f.chauffeur, [key]: val } }));
  };

  const setResponsable = (key, val) => {
    setForm(f => ({ ...f, responsable: { ...f.responsable, [key]: val } }));
  };

  const touch = (key) => setTouched(t => ({ ...t, [key]: true }));

  const validate = () => {
    const e = {};
    if (!form.nom.trim()) e.nom = "Le nom du véhicule est obligatoire.";
    if (!form.code.trim()) e.code = "Le code est obligatoire.";
    if (!form.type) e.type = "Le type de véhicule est obligatoire.";
    if (!form.immatriculation.trim()) e.immatriculation = "L'immatriculation est obligatoire.";
    if (!form.capacite || form.capacite < 1) e.capacite = "La capacité doit être supérieure à 0.";
    if (!form.chauffeur.nom.trim()) e.chauffeur_nom = "Le nom du chauffeur est obligatoire.";
    if (!form.chauffeur.telephone.trim()) e.chauffeur_telephone = "Le téléphone du chauffeur est obligatoire.";
    if (!form.responsable.nom.trim()) e.responsable_nom = "Le nom du responsable est obligatoire.";
    return e;
  };

  const handleSubmit = () => {
    setTouched({ nom: true, code: true, type: true, immatriculation: true, capacite: true });
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      setTimeout(() => {
        const el = document.querySelector('[data-error="true"]');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 50);
      return;
    }

    const transportData = {
      ...form,
      id: isEdit ? form.id : Date.now().toString(),
      code: form.code.toUpperCase(),
      immatriculation: form.immatriculation.toUpperCase(),
      capacite: parseInt(form.capacite),
      image: form.imagePreview || '',
      chauffeur: { ...form.chauffeur },
      responsable: { ...form.responsable },
    };

    if (window.transportsData) {
      window.transportsData.saveTransport(transportData);
    }

    navigate('/transports');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setForm(f => ({ ...f, image: file, imagePreview: URL.createObjectURL(file) }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/transports')}
          className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 transition-colors"
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div>
          <h1 className="text-xl font-bold" style={{ color: '#1e3a5f' }}>
            {isEdit ? 'Modifier le véhicule' : 'Nouveau véhicule'}
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            {isEdit ? `Modification de "${form.nom}"` : 'Remplissez les informations du véhicule'}
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-5">
          {/* Vehicle Info */}
          <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h2 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 rounded-full inline-block" style={{ background: '#E55B2D' }} />
              Informations du véhicule
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Nom du véhicule" required error={touched.nom && errors.nom}>
                <div data-error={!!(touched.nom && errors.nom)}>
                  <input
                    className={inputCls(touched.nom && errors.nom)}
                    value={form.nom}
                    onChange={e => setField('nom', e.target.value)}
                    onBlur={() => touch('nom')}
                    placeholder="Ex: Bus Scolaire A"
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
                    placeholder="BSA-001"
                  />
                </div>
              </Field>

              <Field label="Type" required error={touched.type && errors.type}>
                <div data-error={!!(touched.type && errors.type)}>
                  <select
                    className={inputCls(touched.type && errors.type)}
                    value={form.type}
                    onChange={e => setField('type', e.target.value)}
                    onBlur={() => touch('type')}
                  >
                    <option value="">Sélectionner un type</option>
                    {typesVehicule.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </Field>

              <Field label="Immatriculation" required error={touched.immatriculation && errors.immatriculation}>
                <div data-error={!!(touched.immatriculation && errors.immatriculation)}>
                  <input
                    className={inputCls(touched.immatriculation && errors.immatriculation)}
                    value={form.immatriculation}
                    onChange={e => setField('immatriculation', e.target.value.toUpperCase())}
                    onBlur={() => touch('immatriculation')}
                    placeholder="123-ABC-45"
                  />
                </div>
              </Field>

              <Field label="Capacité (personnes)" required error={touched.capacite && errors.capacite}>
                <div data-error={!!(touched.capacite && errors.capacite)}>
                  <input
                    className={inputCls(touched.capacite && errors.capacite)}
                    type="number"
                    min="1"
                    value={form.capacite}
                    onChange={e => setField('capacite', e.target.value)}
                    onBlur={() => touch('capacite')}
                    placeholder="30"
                  />
                </div>
              </Field>

              <Field label="Statut">
                <select
                  className={inputCls(false)}
                  value={form.statut}
                  onChange={e => setField('statut', e.target.value)}
                >
                  {statutsDisponibilite.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
              </Field>
            </div>
          </section>

          {/* Chauffeur */}
          <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <SectionHeader 
              icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>} 
              label="Chauffeur" 
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Nom complet" required>
                <input
                  className={inputCls(false)}
                  value={form.chauffeur.nom}
                  onChange={e => setChauffeur('nom', e.target.value)}
                  placeholder="Ahmed Benali"
                />
              </Field>
              <Field label="Téléphone" required>
                <input
                  className={inputCls(false)}
                  type="tel"
                  value={form.chauffeur.telephone}
                  onChange={e => setChauffeur('telephone', e.target.value)}
                  placeholder="0612345678"
                />
              </Field>
              <Field label="Permis">
                <input
                  className={inputCls(false)}
                  value={form.chauffeur.permis}
                  onChange={e => setChauffeur('permis', e.target.value)}
                  placeholder="B, D"
                />
              </Field>
              <Field label="Email">
                <input
                  className={inputCls(false)}
                  type="email"
                  value={form.chauffeur.email}
                  onChange={e => setChauffeur('email', e.target.value)}
                  placeholder="ahmed@example.com"
                />
              </Field>
            </div>
          </section>

          {/* Responsable */}
          <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <SectionHeader 
              icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>} 
              label="Responsable" 
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Nom complet" required>
                <input
                  className={inputCls(false)}
                  value={form.responsable.nom}
                  onChange={e => setResponsable('nom', e.target.value)}
                  placeholder="Karim Fadili"
                />
              </Field>
              <Field label="Téléphone" required>
                <input
                  className={inputCls(false)}
                  type="tel"
                  value={form.responsable.telephone}
                  onChange={e => setResponsable('telephone', e.target.value)}
                  placeholder="0687654321"
                />
              </Field>
              <div className="col-span-2">
                <Field label="Email">
                  <input
                    className={inputCls(false)}
                    type="email"
                    value={form.responsable.email}
                    onChange={e => setResponsable('email', e.target.value)}
                    placeholder="karim@example.com"
                  />
                </Field>
              </div>
            </div>
          </section>

          {/* Description */}
          <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h2 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 rounded-full inline-block" style={{ background: '#E55B2D' }} />
              Description
            </h2>
            <textarea
              className={inputCls(false)}
              rows={3}
              value={form.description}
              onChange={e => setField('description', e.target.value)}
              placeholder="Description du véhicule..."
              style={{ resize: 'vertical' }}
            />
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Image */}
          <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h2 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 rounded-full inline-block" style={{ background: '#E55B2D' }} />
              Image du véhicule
            </h2>
            <div className="space-y-3">
              {form.imagePreview && (
                <img src={form.imagePreview} alt="Aperçu" className="w-full h-32 rounded-xl object-cover border border-slate-200" />
              )}
              <label className="cursor-pointer inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 border border-dashed border-slate-300 rounded-xl text-sm text-slate-600 bg-slate-50 hover:bg-slate-100 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {form.imagePreview ? 'Changer l\'image' : 'Télécharger une image'}
                <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              </label>
              <p className="text-xs text-slate-400 text-center">PNG, JPG, GIF · max 5 MB</p>
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
              {isEdit ? 'Enregistrer les modifications' : 'Créer le véhicule'}
            </button>
            <button
              onClick={() => navigate('/transports')}
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