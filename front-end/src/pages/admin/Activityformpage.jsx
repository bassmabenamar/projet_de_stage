// pages/admin/ActivityFormPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

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

const AVATAR_COLORS = ['#4f46e5','#0891b2','#16a34a','#E55B2D','#7c3aed','#0f766e','#dc2626','#a16207'];
function getAvatarColor(name) { let h = 0; for (let c of name) h += c.charCodeAt(0); return AVATAR_COLORS[h % AVATAR_COLORS.length]; }
function getInitials(name) { return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2); }

export default function ActivityFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const isEdit = !!id;

  const [form, setForm] = useState({
    id: '',
    nom: '',
    code: '',
    dateDebut: '',
    dateFin: '',
    prix: '',
    lieu: '',
    description: '',
    responsable: '',
    heuresHebdomadaires: 2,
    statut: 'Actif',
    image: null,
    imagePreview: '',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (isEdit) {
      const activity = location.state?.activity || window.activitiesData?.activites.find(a => a.id === id);
      if (activity) {
        setForm({
          ...activity,
          imagePreview: activity.image || '',
        });
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
    if (!form.nom.trim()) e.nom = 'Le nom est obligatoire.';
    if (!form.code.trim()) e.code = 'Le code est obligatoire.';
    if (!form.lieu.trim()) e.lieu = 'Le lieu est obligatoire.';
    if (form.dateDebut && form.dateFin && form.dateFin < form.dateDebut)
      e.dateFin = 'La date de fin doit être après la date de début.';
    if (form.prix !== '' && Number(form.prix) < 0)
      e.prix = 'Le prix ne peut pas être négatif.';
    if (form.heuresHebdomadaires < 1 || form.heuresHebdomadaires > 40)
      e.heuresHebdomadaires = 'Entre 1 et 40 heures.';
    return e;
  };

  const handleSubmit = () => {
    setTouched({ nom: true, code: true, lieu: true });
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      setTimeout(() => {
        const el = document.querySelector('[data-error="true"]');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 50);
      return;
    }

    const activityData = {
      ...form,
      id: isEdit ? form.id : Date.now().toString(),
      code: form.code.toUpperCase(),
      image: form.imagePreview || '',
    };

    if (window.activitiesData) {
      window.activitiesData.saveActivity(activityData);
    }

    navigate('/activites');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setForm(f => ({ ...f, image: file, imagePreview: URL.createObjectURL(file) }));
  };

  const missingCount = [!form.nom.trim(), !form.code.trim(), !form.lieu.trim()].filter(Boolean).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/activites')}
          className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 transition-colors"
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div>
          <h1 className="text-xl font-bold" style={{ color: '#1e3a5f' }}>
            {isEdit ? "Modifier l'activité" : 'Nouvelle activité'}
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            {isEdit ? `Modification de "${form.nom}"` : 'Remplissez les informations de la nouvelle activité'}
          </p>
        </div>
      </div>

      {/* Rest of your form remains the same */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - 2/3 width */}
        <div className="lg:col-span-2 space-y-5">
          {/* Informations générales */}
          <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h2 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 rounded-full inline-block" style={{ background: '#E55B2D' }} />
              Informations générales
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Nom de l'activité" required error={touched.nom && errors.nom}>
                <div data-error={!!(touched.nom && errors.nom)}>
                  <input
                    className={inputCls(touched.nom && errors.nom)}
                    value={form.nom}
                    onChange={e => set('nom', e.target.value)}
                    onBlur={() => touch('nom')}
                    placeholder="Ex: Camp de Basketball"
                  />
                </div>
              </Field>

              <Field label="Code" required error={touched.code && errors.code}>
                <div data-error={!!(touched.code && errors.code)}>
                  <input
                    className={inputCls(touched.code && errors.code)}
                    value={form.code}
                    onChange={e => set('code', e.target.value.toUpperCase())}
                    onBlur={() => touch('code')}
                    placeholder="BSK"
                    maxLength={6}
                  />
                </div>
              </Field>

              <Field label="Date de début">
                <input
                  className={inputCls(false)}
                  type="date"
                  value={form.dateDebut}
                  onChange={e => set('dateDebut', e.target.value)}
                />
              </Field>

              <Field label="Date de fin" error={touched.dateFin && errors.dateFin}>
                <div data-error={!!(touched.dateFin && errors.dateFin)}>
                  <input
                    className={inputCls(touched.dateFin && errors.dateFin)}
                    type="date"
                    value={form.dateFin}
                    onChange={e => set('dateFin', e.target.value)}
                    onBlur={() => touch('dateFin')}
                  />
                </div>
              </Field>

              <Field label="Lieu" required error={touched.lieu && errors.lieu}>
                <div data-error={!!(touched.lieu && errors.lieu)}>
                  <input
                    className={inputCls(touched.lieu && errors.lieu)}
                    value={form.lieu}
                    onChange={e => set('lieu', e.target.value)}
                    onBlur={() => touch('lieu')}
                    placeholder="Ex: Gymnase A"
                  />
                </div>
              </Field>

              <Field label="Responsable">
                <input
                  className={inputCls(false)}
                  value={form.responsable}
                  onChange={e => set('responsable', e.target.value)}
                  placeholder="Ex: Coach Mike"
                />
              </Field>
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
              rows={5}
              value={form.description}
              onChange={e => set('description', e.target.value)}
              placeholder="Décrivez l'activité, les objectifs, le public cible..."
              style={{ resize: 'vertical' }}
            />
          </section>

          {/* Image */}
          <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h2 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 rounded-full inline-block" style={{ background: '#E55B2D' }} />
              Image de l'activité
            </h2>
            <div className="flex items-start gap-5">
              {form.imagePreview ? (
                <div className="relative shrink-0">
                  <img src={form.imagePreview} alt="Aperçu" className="w-28 h-28 rounded-xl object-cover border border-slate-200" />
                  <button
                    onClick={() => setForm(f => ({ ...f, image: null, imagePreview: '' }))}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs shadow"
                  >×</button>
                </div>
              ) : (
                <div className="w-28 h-28 rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center bg-slate-50 shrink-0">
                  <svg className="w-7 h-7 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-xs text-slate-400 mt-1.5">Aperçu</span>
                </div>
              )}
              <div>
                <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-600 bg-white hover:bg-slate-50 transition-colors font-medium">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  Choisir une image
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                </label>
                <p className="text-xs text-slate-400 mt-2">PNG, JPG, GIF · max 5 MB</p>
              </div>
            </div>
          </section>
        </div>

        {/* Right column - 1/3 width */}
        <div className="space-y-5">
          {/* Paramètres */}
          <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h2 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 rounded-full inline-block" style={{ background: '#E55B2D' }} />
              Paramètres
            </h2>
            <div className="space-y-4">
              <Field label="Statut">
                <select className={inputCls(false)} value={form.statut} onChange={e => set('statut', e.target.value)}>
                  <option>Actif</option>
                  <option>Inactif</option>
                </select>
              </Field>

              <Field label="Prix (DH)" error={touched.prix && errors.prix}>
                <div data-error={!!(touched.prix && errors.prix)}>
                  <input
                    className={inputCls(touched.prix && errors.prix)}
                    type="number"
                    min="0"
                    value={form.prix}
                    onChange={e => set('prix', e.target.value)}
                    onBlur={() => touch('prix')}
                    placeholder="0 = Gratuit"
                  />
                </div>
              </Field>

              <Field label="Heures / semaine" error={touched.heuresHebdomadaires && errors.heuresHebdomadaires}>
                <div data-error={!!(touched.heuresHebdomadaires && errors.heuresHebdomadaires)} className="flex items-center gap-3">
                  <input
                    className={inputCls(touched.heuresHebdomadaires && errors.heuresHebdomadaires)}
                    type="number"
                    min="1"
                    max="40"
                    value={form.heuresHebdomadaires}
                    onChange={e => set('heuresHebdomadaires', parseInt(e.target.value) || 1)}
                    onBlur={() => touch('heuresHebdomadaires')}
                  />
                  <span className="text-sm text-slate-400 whitespace-nowrap">h / sem</span>
                </div>
              </Field>
            </div>
          </section>

          {/* Live preview */}
          <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h2 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 rounded-full inline-block" style={{ background: '#E55B2D' }} />
              Aperçu carte
            </h2>
            <div className="rounded-xl overflow-hidden border border-slate-100">
              {form.imagePreview ? (
                <img src={form.imagePreview} alt="" className="w-full h-24 object-cover" />
              ) : (
                <div className="w-full h-24 flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#e0e7ef,#c8d3e0)' }}>
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                    style={{ background: form.nom ? getAvatarColor(form.nom) : '#94a3b8' }}
                  >
                    {form.nom ? getInitials(form.nom) : '?'}
                  </div>
                </div>
              )}
              <div className="p-3">
                <div className="flex justify-between items-start">
                  <p className="font-bold text-sm truncate" style={{ color: form.nom ? '#1e3a5f' : '#cbd5e1' }}>
                    {form.nom || "Nom de l'activité"}
                  </p>
                  {form.code && (
                    <span className="text-xs font-bold px-1.5 py-0.5 rounded ml-1 shrink-0" style={{ background: '#fff7ed', color: '#E55B2D' }}>
                      {form.code}
                    </span>
                  )}
                </div>
                <div className="mt-1.5">
                  <span
                    className="text-xs font-semibold px-2 py-0.5 rounded-full"
                    style={form.statut === 'Actif' ? { background: '#dcfce7', color: '#16a34a' } : { background: '#fee2e2', color: '#dc2626' }}
                  >
                    {form.statut}
                  </span>
                </div>
                {form.lieu && <p className="text-xs text-slate-400 mt-1.5">📍 {form.lieu}</p>}
                {form.prix
                  ? <p className="text-xs font-semibold mt-1" style={{ color: '#1e3a5f' }}>{form.prix} DH</p>
                  : <span className="text-xs font-semibold px-2 py-0.5 rounded-full mt-1 inline-block" style={{ background: '#e0f2fe', color: '#0284c7' }}>Gratuit</span>
                }
              </div>
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
              {isEdit ? 'Enregistrer les modifications' : "Créer l'activité"}
            </button>

            {missingCount > 0 && Object.keys(errors).length > 0 && (
              <p className="text-xs text-center text-red-400">
                {missingCount} champ{missingCount > 1 ? 's' : ''} obligatoire{missingCount > 1 ? 's' : ''} manquant{missingCount > 1 ? 's' : ''}.
              </p>
            )}

            <button
              onClick={() => navigate('/activites')}
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