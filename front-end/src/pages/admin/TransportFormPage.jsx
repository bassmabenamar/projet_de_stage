// TransportFormPage.jsx - Version corrigée

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const typesVehicule = ['Bus', 'Minibus', 'Voiture', 'Van', 'Camionnette'];

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
  const isEdit = !!id && id !== 'nouveau';

  const [form, setForm] = useState({
    id: null,
    nom_transport: '',
    code: '',
    type: '',
    immatriculation: '',
    capacite: '',
    chauffeur_nom: '',
    chauffeur_telephone: '',
    chauffeur_permis: '',
    responsable_nom: '',
    responsable_telephone: '',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEdit) {
      // Récupérer le transport depuis le state ou depuis window
      const transport = location.state?.transport || 
                       window.transportsData?.transports?.find(t => t.id == id);
      
      if (transport) {
        setForm({
          id: transport.id,
          nom_transport: transport.nom_transport || '',
          code: transport.code || '',
          type: transport.type || '',
          immatriculation: transport.immatriculation || '',
          capacite: transport.capacite || '',
          chauffeur_nom: transport.chauffeur_nom || '',
          chauffeur_telephone: transport.chauffeur_telephone || '',
          chauffeur_permis: transport.chauffeur_permis || '',
          responsable_nom: transport.responsable_nom || '',
          responsable_telephone: transport.responsable_telephone || '',
        });
      } else if (id && id !== 'nouveau') {
        // Si pas trouvé, rediriger
        console.error('Transport non trouvé');
        navigate('/transports');
      }
    }
  }, [isEdit, id, location, navigate]);

  const setField = (key, val) => {
    setForm(f => ({ ...f, [key]: val }));
    if (errors[key]) setErrors(e => ({ ...e, [key]: '' }));
  };

  const touch = (key) => setTouched(t => ({ ...t, [key]: true }));

  const validate = () => {
    const e = {};
    if (!form.nom_transport.trim()) e.nom_transport = "Le nom du transport est obligatoire.";
    if (!form.code.trim()) e.code = "Le code est obligatoire.";
    if (!form.type) e.type = "Le type de véhicule est obligatoire.";
    if (!form.immatriculation.trim()) e.immatriculation = "L'immatriculation est obligatoire.";
    if (!form.capacite || form.capacite < 1) e.capacite = "La capacité doit être supérieure à 0.";
    if (!form.chauffeur_nom.trim()) e.chauffeur_nom = "Le nom du chauffeur est obligatoire.";
    if (!form.chauffeur_telephone.trim()) e.chauffeur_telephone = "Le téléphone du chauffeur est obligatoire.";
    if (!form.responsable_nom.trim()) e.responsable_nom = "Le nom du responsable est obligatoire.";
    if (!form.responsable_telephone.trim()) e.responsable_telephone = "Le téléphone du responsable est obligatoire.";
    return e;
  };

  const handleSubmit = async () => {
    // Valider tous les champs
    const fieldsToTouch = {
      nom_transport: true, 
      code: true, 
      type: true, 
      immatriculation: true, 
      capacite: true,
      chauffeur_nom: true,
      chauffeur_telephone: true,
      responsable_nom: true,
      responsable_telephone: true
    };
    setTouched(fieldsToTouch);
    
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      setTimeout(() => {
        const errorElement = document.querySelector('[data-error="true"]');
        if (errorElement) errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 50);
      return;
    }

    setSaving(true);

    // Préparer les données pour l'API
    const transportData = {
      nom_transport: form.nom_transport,
      code: form.code.toUpperCase(),
      type: form.type,
      immatriculation: form.immatriculation.toUpperCase(),
      capacite: parseInt(form.capacite),
      chauffeur_nom: form.chauffeur_nom,
      chauffeur_telephone: form.chauffeur_telephone,
      chauffeur_permis: form.chauffeur_permis || null,
      responsable_nom: form.responsable_nom,
      responsable_telephone: form.responsable_telephone,
    };

    // Ajouter l'ID seulement si c'est une modification
    if (isEdit && form.id) {
      transportData.id = form.id;
    }

    try {
      if (window.transportsData && window.transportsData.saveTransport) {
        const result = await window.transportsData.saveTransport(transportData);
        if (result.success) {
          navigate('/transports');
        } else {
          alert(result.error || 'Erreur lors de la sauvegarde');
        }
      } else {
        // Fallback: naviguer directement (sans sauvegarde réelle)
        console.warn('window.transportsData.saveTransport non disponible');
        navigate('/transports');
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
          onClick={() => navigate('/transports')}
          className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 transition-colors"
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div>
          <h1 className="text-xl font-bold" style={{ color: '#1e3a5f' }}>
            {isEdit ? 'Modifier le transport' : 'Nouveau transport'}
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            {isEdit ? `Modification de "${form.nom_transport}"` : 'Remplissez les informations du transport'}
          </p>
        </div>
      </div>

      {/* Form - Reste identique au code précédent */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          {/* Transport Info */}
          <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h2 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 rounded-full inline-block" style={{ background: '#E55B2D' }} />
              Informations du transport
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Nom du transport" required error={touched.nom_transport && errors.nom_transport}>
                <div data-error={!!(touched.nom_transport && errors.nom_transport)}>
                  <input
                    className={inputCls(touched.nom_transport && errors.nom_transport)}
                    value={form.nom_transport}
                    onChange={e => setField('nom_transport', e.target.value)}
                    onBlur={() => touch('nom_transport')}
                    placeholder="Ex: Transport Scolaire A"
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
                    placeholder="TRANS-001"
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
            </div>
          </section>

          {/* Chauffeur Section */}
          <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <SectionHeader 
              icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>} 
              label="Chauffeur" 
            />
            <div className="grid grid-cols-1 gap-4">
              <Field label="Nom du chauffeur" required error={touched.chauffeur_nom && errors.chauffeur_nom}>
                <div data-error={!!(touched.chauffeur_nom && errors.chauffeur_nom)}>
                  <input
                    className={inputCls(touched.chauffeur_nom && errors.chauffeur_nom)}
                    value={form.chauffeur_nom}
                    onChange={e => setField('chauffeur_nom', e.target.value)}
                    onBlur={() => touch('chauffeur_nom')}
                    placeholder="Ahmed Benali"
                  />
                </div>
              </Field>

              <Field label="Téléphone du chauffeur" required error={touched.chauffeur_telephone && errors.chauffeur_telephone}>
                <div data-error={!!(touched.chauffeur_telephone && errors.chauffeur_telephone)}>
                  <input
                    className={inputCls(touched.chauffeur_telephone && errors.chauffeur_telephone)}
                    type="tel"
                    value={form.chauffeur_telephone}
                    onChange={e => setField('chauffeur_telephone', e.target.value)}
                    onBlur={() => touch('chauffeur_telephone')}
                    placeholder="0612345678"
                  />
                </div>
              </Field>

              <Field label="Numéro de permis">
                <input
                  className={inputCls(false)}
                  value={form.chauffeur_permis}
                  onChange={e => setField('chauffeur_permis', e.target.value)}
                  placeholder="B, D, C"
                />
              </Field>
            </div>
          </section>

          {/* Responsable Section */}
          <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <SectionHeader 
              icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>} 
              label="Responsable" 
            />
            <div className="grid grid-cols-1 gap-4">
              <Field label="Nom du responsable" required error={touched.responsable_nom && errors.responsable_nom}>
                <div data-error={!!(touched.responsable_nom && errors.responsable_nom)}>
                  <input
                    className={inputCls(touched.responsable_nom && errors.responsable_nom)}
                    value={form.responsable_nom}
                    onChange={e => setField('responsable_nom', e.target.value)}
                    onBlur={() => touch('responsable_nom')}
                    placeholder="Karim Fadili"
                  />
                </div>
              </Field>

              <Field label="Téléphone du responsable" required error={touched.responsable_telephone && errors.responsable_telephone}>
                <div data-error={!!(touched.responsable_telephone && errors.responsable_telephone)}>
                  <input
                    className={inputCls(touched.responsable_telephone && errors.responsable_telephone)}
                    type="tel"
                    value={form.responsable_telephone}
                    onChange={e => setField('responsable_telephone', e.target.value)}
                    onBlur={() => touch('responsable_telephone')}
                    placeholder="0687654321"
                  />
                </div>
              </Field>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
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
                  {isEdit ? 'Enregistrer les modifications' : 'Créer le transport'}
                </>
              )}
            </button>
            <button
              onClick={() => navigate('/transports')}
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