import React, { useState } from 'react';

const emptyForm = {
  id: '', titre: '', matiere: '', classe: '', enseignant: '',
  datePublication: '', dateLimite: '', type: 'Exercice',
  description: '', fichier: null, fichierNom: '', statut: 'actif',
};

const typesDevoir = ['Exercice', 'TP', 'Exposé', 'Projet', 'Contrôle', 'Dissertation', 'Lecture'];
const statutsDevoir = [
  { value: 'actif',   label: 'Actif',   bg: '#dcfce7', color: '#16a34a' },
  { value: 'expire',  label: 'Expiré',  bg: '#fee2e2', color: '#dc2626' },
  { value: 'brouillon', label: 'Brouillon', bg: '#f1f5f9', color: '#475569' },
];

function getStatut(val) {
  return statutsDevoir.find(s => s.value === val) || { label: val, bg: '#f1f5f9', color: '#475569' };
}

export default function AdminDevoirs() {
  const [isAddOpen,    setIsAddOpen]    = useState(false);
  const [isEditOpen,   setIsEditOpen]   = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedDevoir, setSelectedDevoir] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMatiere, setFilterMatiere] = useState('');
  const [form, setForm] = useState(emptyForm);

  const [devoirs, setDevoirs] = useState([
    { id: '1', titre: 'Équations du second degré', matiere: 'Mathématiques', classe: '2ème Année', enseignant: 'M. Hassan', datePublication: '2024-05-01', dateLimite: '2024-05-15', type: 'Exercice',   description: 'Résoudre les exercices 1 à 10 du chapitre 5.',         fichierNom: 'exercice_eq2.pdf', statut: 'actif'     },
    { id: '2', titre: 'Rapport sur Newton',        matiere: 'Physique',       classe: '3ème Année', enseignant: 'Mme. Sara',  datePublication: '2024-05-03', dateLimite: '2024-05-20', type: 'Exposé',    description: 'Rédiger un exposé sur les lois de Newton.',            fichierNom: '',                statut: 'actif'     },
    { id: '3', titre: 'La Révolution Française',   matiere: 'Histoire',       classe: '1ère Année', enseignant: 'M. Karim',   datePublication: '2024-04-10', dateLimite: '2024-04-30', type: 'Dissertation', description: 'Analyser les causes de la Révolution Française.',    fichierNom: 'sujet_hist.pdf',  statut: 'expire'    },
    { id: '4', titre: 'TP Réactions chimiques',    matiere: 'Chimie',         classe: '2ème Année', enseignant: 'Mme. Leila', datePublication: '2024-05-05', dateLimite: '2024-05-25', type: 'TP',        description: 'Réaliser le compte-rendu du TP sur les acides/bases.', fichierNom: 'tp_chimie.pdf',   statut: 'actif'    },
    { id: '5', titre: 'Projet site web',           matiere: 'Informatique',   classe: '3ème Année', enseignant: 'M. Yassir',  datePublication: '2024-05-01', dateLimite: '2024-06-01', type: 'Projet',    description: 'Créer un site web responsive en HTML/CSS/JS.',         fichierNom: '',                statut: 'brouillon' },
  ]);

  const openAddModal  = () => { setForm(emptyForm); setIsAddOpen(true); };
  const openEditModal = (d)  => { setForm({ ...d }); setIsEditOpen(true); };

  const handleAdd = () => {
    setDevoirs([...devoirs, { ...form, id: Date.now().toString() }]);
    setIsAddOpen(false);
  };
  const handleEdit = () => {
    setDevoirs(devoirs.map(d => d.id === form.id ? { ...form } : d));
    setIsEditOpen(false);
  };
  const handleDelete = () => {
    setDevoirs(devoirs.filter(d => d.id !== selectedDevoir.id));
    setIsDeleteOpen(false); setSelectedDevoir(null);
  };

  const matieres = [...new Set(devoirs.map(d => d.matiere))];
  const filtered = devoirs.filter(d =>
    (d.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
     d.matiere.toLowerCase().includes(searchTerm.toLowerCase()) ||
     d.classe.toLowerCase().includes(searchTerm.toLowerCase()) ||
     d.enseignant.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (!filterMatiere || d.matiere === filterMatiere)
  );

  const stats = {
    total:      devoirs.length,
    actifs:     devoirs.filter(d => d.statut === 'actif').length,
    expires:    devoirs.filter(d => d.statut === 'expire').length,
    brouillons: devoirs.filter(d => d.statut === 'brouillon').length,
  };

  const inputCls = 'w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100';

  const TYPE_COLORS = {
    'Exercice': { bg: '#eff6ff', color: '#2563eb' },
    'TP':       { bg: '#f0fdf4', color: '#16a34a' },
    'Exposé':   { bg: '#fdf4ff', color: '#9333ea' },
    'Projet':   { bg: '#fff7ed', color: '#ea580c' },
    'Contrôle': { bg: '#fef2f2', color: '#dc2626' },
    'Dissertation': { bg: '#fefce8', color: '#ca8a04' },
    'Lecture':  { bg: '#f0fdfa', color: '#0d9488' },
  };

  const FormModal = ({ title, onSave, onClose }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.45)' }} onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="p-7">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold" style={{ color: '#1e3a5f' }}>{title}</h2>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 text-lg">×</button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Titre du devoir *</label>
              <input className={inputCls} value={form.titre} onChange={e => setForm({ ...form, titre: e.target.value })} placeholder="Ex: Équations du second degré" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Matière *</label>
              <input className={inputCls} value={form.matiere} onChange={e => setForm({ ...form, matiere: e.target.value })} placeholder="Ex: Mathématiques" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Classe *</label>
              <input className={inputCls} value={form.classe} onChange={e => setForm({ ...form, classe: e.target.value })} placeholder="Ex: 2ème Année" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Enseignant</label>
              <input className={inputCls} value={form.enseignant} onChange={e => setForm({ ...form, enseignant: e.target.value })} placeholder="Ex: M. Hassan" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Type</label>
              <select className={inputCls} value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                {typesDevoir.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Date de publication</label>
              <input className={inputCls} type="date" value={form.datePublication} onChange={e => setForm({ ...form, datePublication: e.target.value })} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Date limite *</label>
              <input className={inputCls} type="date" value={form.dateLimite} onChange={e => setForm({ ...form, dateLimite: e.target.value })} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Statut</label>
              <select className={inputCls} value={form.statut} onChange={e => setForm({ ...form, statut: e.target.value })}>
                {statutsDevoir.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Description / Consignes</label>
            <textarea className={inputCls} rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Décrivez les consignes du devoir..." style={{ resize: 'vertical' }} />
          </div>

          <div className="mt-4">
            <label className="block text-xs font-semibold text-slate-600 mb-2">Fichier joint</label>
            <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 border border-dashed border-slate-300 rounded-lg text-sm text-slate-500 bg-slate-50 hover:bg-slate-100">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
              {form.fichierNom || 'Joindre un fichier'}
              <input type="file" className="hidden" onChange={e => setForm({ ...form, fichierNom: e.target.files[0]?.name || '' })} />
            </label>
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: '#1e3a5f' }}>Devoirs</h1>
          <p className="text-sm text-slate-400 mt-0.5">{devoirs.length} devoir{devoirs.length !== 1 ? 's' : ''} au total</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input type="search" placeholder="Rechercher un devoir..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
              className="pl-9 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100" />
          </div>
          <button onClick={openAddModal} className="inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white rounded-lg whitespace-nowrap" style={{ background: '#E55B2D' }}>
            <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
            Ajouter un devoir
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total',      value: stats.total,      fg: '#1e3a5f', bg: '#f1f5f9', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
          { label: 'Actifs',     value: stats.actifs,     fg: '#16a34a', bg: '#dcfce7', icon: 'M5 13l4 4L19 7' },
          { label: 'Expirés',    value: stats.expires,    fg: '#dc2626', bg: '#fee2e2', icon: 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
          { label: 'Brouillons', value: stats.brouillons, fg: '#475569', bg: '#f1f5f9', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' },
        ].map(s => (
          <div key={s.label} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">{s.label}</p>
              <p className="text-3xl font-bold" style={{ color: s.fg }}>{s.value}</p>
            </div>
            <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0" style={{ background: s.bg }}>
              <svg width="18" height="18" fill="none" stroke={s.fg} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={s.icon} /></svg>
            </div>
          </div>
        ))}
      </div>

      {/* Filter bar */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Filtrer:</span>
        <button onClick={() => setFilterMatiere('')}
          className="px-3 py-1 rounded-full text-xs font-semibold transition-colors"
          style={!filterMatiere ? { background: '#1e3a5f', color: 'white' } : { background: '#f1f5f9', color: '#475569' }}>
          Toutes
        </button>
        {matieres.map(m => (
          <button key={m} onClick={() => setFilterMatiere(m === filterMatiere ? '' : m)}
            className="px-3 py-1 rounded-full text-xs font-semibold transition-colors"
            style={filterMatiere === m ? { background: '#E55B2D', color: 'white' } : { background: '#f1f5f9', color: '#475569' }}>
            {m}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100" style={{ background: '#f8fafc' }}>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Devoir</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Matière / Classe</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Enseignant</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Date limite</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Statut</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={6} className="px-4 py-10 text-center text-sm text-slate-400">Aucun devoir trouvé.</td></tr>
              ) : filtered.map(devoir => {
                const statut  = getStatut(devoir.statut);
                const typeClr = TYPE_COLORS[devoir.type] || { bg: '#f1f5f9', color: '#475569' };
                return (
                  <tr key={devoir.id} className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ background: typeClr.bg }}>
                          <svg width="14" height="14" fill="none" stroke={typeClr.color} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
                        </div>
                        <div>
                          <p className="font-semibold text-sm" style={{ color: '#1e3a5f' }}>{devoir.titre}</p>
                          <span className="text-xs font-bold px-2 py-0.5 rounded-md" style={{ background: typeClr.bg, color: typeClr.color }}>{devoir.type}</span>
                          {devoir.fichierNom && (
                            <span className="ml-1 text-xs text-slate-400 flex items-center gap-1 inline-flex">
                              <svg width="10" height="10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"/></svg>
                              {devoir.fichierNom}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm font-medium text-slate-700">{devoir.matiere}</p>
                      <p className="text-xs text-slate-400">{devoir.classe}</p>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-500">{devoir.enseignant}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5 text-sm text-slate-600">
                        <svg width="13" height="13" fill="none" stroke="#E55B2D" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                        {devoir.dateLimite}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: statut.bg, color: statut.color }}>{statut.label}</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => openEditModal(devoir)} className="p-1.5 rounded-lg hover:bg-orange-50 transition-colors" style={{ color: '#E55B2D' }} title="Modifier">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                        </button>
                        <button onClick={() => { setSelectedDevoir(devoir); setIsDeleteOpen(true); }} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors" title="Supprimer">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {isAddOpen  && <FormModal title="Ajouter un devoir"   onSave={handleAdd}  onClose={() => setIsAddOpen(false)}  />}
      {isEditOpen && <FormModal title="Modifier le devoir"  onSave={handleEdit} onClose={() => setIsEditOpen(false)} />}

      {isDeleteOpen && selectedDevoir && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.45)' }} onClick={() => setIsDeleteOpen(false)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-11 h-11 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                <svg width="18" height="18" fill="none" stroke="#dc2626" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              </div>
              <h2 className="text-base font-bold" style={{ color: '#1e3a5f' }}>Supprimer ce devoir ?</h2>
            </div>
            <p className="text-sm text-slate-500 mb-6 leading-relaxed">
              Êtes-vous sûr de vouloir supprimer <strong style={{ color: '#1e3a5f' }}>"{selectedDevoir.titre}"</strong> ? Cette action est irréversible.
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