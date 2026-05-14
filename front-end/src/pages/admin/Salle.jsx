import React, { useState } from 'react';

const typesSalle = [
  'Salle de classe', 'Laboratoire', 'Amphithéâtre', 'Salle informatique',
  'Salle de sport', 'Bibliothèque', 'Salle de réunion', 'Atelier', 'Auditorium',
];

const statutsDisponibilite = [
  { value: 'disponible',  label: 'Disponible',     bg: '#dcfce7', color: '#16a34a' },
  { value: 'occupe',      label: 'Occupée',         bg: '#fee2e2', color: '#dc2626' },
  { value: 'maintenance', label: 'En maintenance',  bg: '#fef9c3', color: '#ca8a04' },
];

function getStatut(val) {
  return statutsDisponibilite.find(s => s.value === val) || { label: val, bg: '#f1f5f9', color: '#475569' };
}

// Icon helper for type
const TYPE_ICONS = {
  'Laboratoire': (
    <svg width="14" height="14" fill="none" stroke="#E55B2D" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2zm3 8h2v2H8zm4 0h2v2h-2zm4 0h2v2h-2z"/></svg>
  ),
};

export default function AdminSalles() {
  const [isAddOpen,    setIsAddOpen]    = useState(false);
  const [isEditOpen,   setIsEditOpen]   = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedSalle, setSelectedSalle] = useState(null);
  const [searchTerm,   setSearchTerm]  = useState('');

  const emptyForm = {
    id: '', nom: '', code: '', capacite: '', type: '', equipements: '',
    etage: '', batiment: '', disponibilite: 'disponible',
    image: null, imagePreview: '', responsable: '', description: '',
  };
  const [form, setForm] = useState(emptyForm);

  const [salles, setSalles] = useState([
    { id: '1', nom: 'Salle A101',   code: 'A101',    capacite: 30,  type: 'Salle de classe',   equipements: 'Tableau interactif, Vidéoprojecteur, Climatisation', etage: '1', batiment: 'Bâtiment A',       disponibilite: 'disponible',  image: '', responsable: 'M. Martin',  description: 'Grande salle avec vue sur le jardin' },
    { id: '2', nom: 'Labo Chimie',  code: 'LAB-CHM', capacite: 20,  type: 'Laboratoire',        equipements: 'Paillasses, Hotte, Équipements de sécurité',        etage: '2', batiment: 'Bâtiment B',       disponibilite: 'occupe',      image: '', responsable: 'Mme. Dubois', description: 'Laboratoire de chimie entièrement équipé' },
    { id: '3', nom: 'Amphi A',      code: 'AMP-A',   capacite: 200, type: 'Amphithéâtre',       equipements: 'Sonorisation, Vidéoprojecteur, Tableau numérique',   etage: '0', batiment: 'Bâtiment Central', disponibilite: 'disponible',  image: '', responsable: 'M. Bernard', description: 'Grand amphithéâtre pour conférences' },
    { id: '4', nom: 'Salle Info 1', code: 'INF-01',  capacite: 25,  type: 'Salle informatique', equipements: '25 PC, Imprimante 3D, Scanner',                      etage: '1', batiment: 'Bâtiment C',       disponibilite: 'maintenance', image: '', responsable: 'M. Tech',    description: 'Salle informatique avec PC récents' },
  ]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setForm({ ...form, image: file, imagePreview: URL.createObjectURL(file) });
  };

  const openAddModal  = () => { setForm(emptyForm); setIsAddOpen(true); };
  const openEditModal = (s) => { setForm({ ...s, image: null, imagePreview: s.image }); setIsEditOpen(true); };

  const handleAdd = () => {
    setSalles([...salles, { ...form, id: Date.now().toString(), code: form.code.toUpperCase(), capacite: parseInt(form.capacite), image: form.imagePreview || '' }]);
    setIsAddOpen(false);
  };

  const handleEdit = () => {
    setSalles(salles.map(s => s.id === form.id
      ? { ...s, ...form, code: form.code.toUpperCase(), capacite: parseInt(form.capacite), image: form.imagePreview || s.image }
      : s
    ));
    setIsEditOpen(false);
  };

  const handleDelete = () => {
    setSalles(salles.filter(s => s.id !== selectedSalle.id));
    setIsDeleteOpen(false); setSelectedSalle(null);
  };

  const filtered = salles.filter(s =>
    s.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.batiment.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /* ── shared styles ── */
  const inputCls = 'w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100';

  /* ── Form Modal ── */
  const FormModal = ({ title, onSave, onClose }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.45)' }} onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="p-7">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold" style={{ color: '#1e3a5f' }}>{title}</h2>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 text-lg">×</button>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Nom de la salle *</label>
                <input className={inputCls} value={form.nom} onChange={e => setForm({ ...form, nom: e.target.value })} placeholder="Ex: Salle A101" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Code *</label>
                <input className={inputCls} value={form.code} onChange={e => setForm({ ...form, code: e.target.value.toUpperCase() })} placeholder="A101" maxLength={10} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Capacité (personnes) *</label>
                <input className={inputCls} type="number" min="1" value={form.capacite} onChange={e => setForm({ ...form, capacite: e.target.value })} placeholder="30" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Type de salle *</label>
                <select className={inputCls} value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                  <option value="">Sélectionner un type</option>
                  {typesSalle.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Bâtiment *</label>
                <input className={inputCls} value={form.batiment} onChange={e => setForm({ ...form, batiment: e.target.value })} placeholder="Ex: Bâtiment A" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Étage</label>
                <input className={inputCls} value={form.etage} onChange={e => setForm({ ...form, etage: e.target.value })} placeholder="Ex: 1, RDC, -1" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Responsable</label>
                <input className={inputCls} value={form.responsable} onChange={e => setForm({ ...form, responsable: e.target.value })} placeholder="Ex: M. Martin" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Disponibilité</label>
                <select className={inputCls} value={form.disponibilite} onChange={e => setForm({ ...form, disponibilite: e.target.value })}>
                  {statutsDisponibilite.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Équipements</label>
              <textarea className={inputCls} rows={2} value={form.equipements} onChange={e => setForm({ ...form, equipements: e.target.value })} placeholder="Listez les équipements disponibles..." style={{ resize: 'vertical' }} />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Description</label>
              <textarea className={inputCls} rows={2} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Description de la salle..." style={{ resize: 'vertical' }} />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-2">Image de la salle</label>
              <div className="flex items-center gap-4">
                {form.imagePreview && <img src={form.imagePreview} alt="Aperçu" className="w-16 h-16 rounded-xl object-cover border border-slate-200" />}
                <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 border border-dashed border-slate-300 rounded-lg text-sm text-slate-500 bg-slate-50 hover:bg-slate-100">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  Télécharger une image
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6 pt-5 border-t border-slate-100">
            <button onClick={onClose} className="px-5 py-2 text-sm font-semibold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200">Annuler</button>
            <button onClick={onSave} className="px-5 py-2 text-sm font-semibold text-white rounded-lg" style={{ background: '#E55B2D' }}>
              {title.includes('Ajouter') ? 'Ajouter' : 'Enregistrer'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: '#1e3a5f' }}>Salles</h1>
          <p className="text-sm text-slate-400 mt-0.5">{salles.length} salle{salles.length !== 1 ? 's' : ''} au total</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-72">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input type="search" placeholder="Rechercher une salle..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
              className="pl-9 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100" />
          </div>
          <button onClick={openAddModal} className="inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white rounded-lg whitespace-nowrap" style={{ background: '#E55B2D' }}>
            <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
            Ajouter une salle
          </button>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Disponibles',    val: 'disponible',  icon: 'M5 13l4 4L19 7',                                                                                     bg: '#dcfce7', fg: '#16a34a' },
          { label: 'Occupées',       val: 'occupe',      icon: 'M6 18L18 6M6 6l12 12',                                                                               bg: '#fee2e2', fg: '#dc2626' },
          { label: 'En maintenance', val: 'maintenance', icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z', bg: '#fef9c3', fg: '#ca8a04' },
        ].map(stat => (
          <div key={stat.val} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">{stat.label}</p>
              <p className="text-3xl font-bold" style={{ color: stat.fg }}>
                {salles.filter(s => s.disponibilite === stat.val).length}
              </p>
            </div>
            <div className="w-11 h-11 rounded-full flex items-center justify-center" style={{ background: stat.bg }}>
              <svg width="18" height="18" fill="none" stroke={stat.fg} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} /></svg>
            </div>
          </div>
        ))}
      </div>

      {/* ── Cards ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(salle => {
          const statut = getStatut(salle.disponibilite);
          return (
            <div key={salle.id} className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              {/* Image / placeholder */}
              <div className="relative h-44 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center overflow-hidden">
                {salle.image
                  ? <img src={salle.image} alt={salle.nom} className="w-full h-full object-cover" />
                  : (
                    <svg className="w-16 h-16 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  )
                }
                {/* Status badge overlay */}
                <span className="absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: statut.bg, color: statut.color }}>
                  {statut.label}
                </span>
              </div>

              <div className="p-4">
                {/* Title row */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-base" style={{ color: '#1e3a5f' }}>{salle.nom}</h3>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-md mt-1 inline-block" style={{ background: '#fff7ed', color: '#E55B2D' }}>
                      {salle.code}
                    </span>
                  </div>
                  <div className="text-right shrink-0 ml-3">
                    <p className="text-xs text-slate-400">Capacité</p>
                    <p className="font-bold text-sm" style={{ color: '#1e3a5f' }}>{salle.capacite} pers.</p>
                  </div>
                </div>

                <p className="text-xs text-slate-500 mb-3 leading-relaxed line-clamp-2">{salle.description}</p>

                {/* Info rows */}
                <div className="space-y-1.5 text-xs text-slate-500 mb-3">
                  <div className="flex items-center gap-2">
                    <svg width="13" height="13" fill="none" stroke="#E55B2D" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
                    {salle.type}
                  </div>
                  <div className="flex items-center gap-2">
                    <svg width="13" height="13" fill="none" stroke="#E55B2D" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
                    {salle.batiment}, Étage {salle.etage}
                  </div>
                  {salle.equipements && (
                    <div className="flex items-start gap-2">
                      <svg width="13" height="13" fill="none" stroke="#E55B2D" viewBox="0 0 24 24" className="mt-0.5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2zm3 8h2v2H8zm4 0h2v2h-2zm4 0h2v2h-2z"/></svg>
                      <span className="line-clamp-1">{salle.equipements}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <svg width="13" height="13" fill="none" stroke="#E55B2D" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                    {salle.responsable}
                  </div>
                </div>

                {/* Footer actions */}
                <div className="flex items-center justify-end gap-1 pt-3 border-t border-slate-100">
                  <button onClick={() => openEditModal(salle)} className="p-1.5 rounded-lg hover:bg-orange-50 transition-colors" style={{ color: '#E55B2D' }} title="Modifier">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                  </button>
                  <button onClick={() => { setSelectedSalle(salle); setIsDeleteOpen(true); }} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors" title="Supprimer">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-100">
          <svg className="w-14 h-14 mx-auto text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <h3 className="font-bold text-base mb-1" style={{ color: '#1e3a5f' }}>Aucune salle trouvée</h3>
          <p className="text-sm text-slate-400">{searchTerm ? "Essayez d'ajuster votre recherche." : 'Ajoutez une salle pour commencer.'}</p>
        </div>
      )}

      {/* Modals */}
      {isAddOpen  && <FormModal title="Ajouter une salle"  onSave={handleAdd}  onClose={() => setIsAddOpen(false)}  />}
      {isEditOpen && <FormModal title="Modifier la salle"  onSave={handleEdit} onClose={() => setIsEditOpen(false)} />}

      {/* Delete confirmation */}
      {isDeleteOpen && selectedSalle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.45)' }} onClick={() => setIsDeleteOpen(false)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-11 h-11 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                <svg width="18" height="18" fill="none" stroke="#dc2626" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <h2 className="text-base font-bold" style={{ color: '#1e3a5f' }}>Supprimer cette salle ?</h2>
            </div>
            <p className="text-sm text-slate-500 mb-6 leading-relaxed">
              Êtes-vous sûr de vouloir supprimer <strong style={{ color: '#1e3a5f' }}>"{selectedSalle.nom}"</strong> ? Cette action est irréversible.
            </p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setIsDeleteOpen(false)} className="px-5 py-2 text-sm font-semibold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200">Annuler</button>
              <button onClick={handleDelete} className="px-5 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700">Supprimer</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}