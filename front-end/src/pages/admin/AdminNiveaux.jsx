// pages/admin/AdminNiveaux.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap } from "lucide-react";

const statuts = [
  { value: 'Actif', label: 'Actif', bg: '#dcfce7', color: '#16a34a' },
  { value: 'Inactif', label: 'Inactif', bg: '#fee2e2', color: '#dc2626' },
];

const cycles = [
  { value: 'primaire', label: 'Primaire', color: '#4f46e5', bg: '#e0e7ff' },
  { value: 'college', label: 'Collège', color: '#E55B2D', bg: '#fff7ed' },
  { value: 'lycee', label: 'Lycée', color: '#16a34a', bg: '#dcfce7' },
];

// Moroccan education system levels
const niveauxData = {
  primaire: [
    { nom: '1ère Année Primaire', code: '1AP', abreviation: '1AP', ordre: 1 },
    { nom: '2ème Année Primaire', code: '2AP', abreviation: '2AP', ordre: 2 },
    { nom: '3ème Année Primaire', code: '3AP', abreviation: '3AP', ordre: 3 },
    { nom: '4ème Année Primaire', code: '4AP', abreviation: '4AP', ordre: 4 },
    { nom: '5ème Année Primaire', code: '5AP', abreviation: '5AP', ordre: 5 },
    { nom: '6ème Année Primaire', code: '6AP', abreviation: '6AP', ordre: 6 },
  ],
  college: [
    { nom: '7ème Année (Collège)', code: '1AC', abreviation: '1AC', ordre: 7 },
    { nom: '8ème Année (Collège)', code: '2AC', abreviation: '2AC', ordre: 8 },
    { nom: '9ème Année (Collège)', code: '3AC', abreviation: '3AC', ordre: 9 },
  ],
  lycee: [
    { nom: 'Tronc Commun', code: 'TC', abreviation: 'TC', ordre: 10 },
    { nom: '1ère Année Baccalauréat', code: '1BAC', abreviation: '1BAC', ordre: 11 },
    { nom: '2ème Année Baccalauréat', code: '2BAC', abreviation: '2BAC', ordre: 12 },
  ],
};

export default function AdminNiveaux() {
  const navigate = useNavigate();
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatut, setFilterStatut] = useState('');
  const [filterCycle, setFilterCycle] = useState('');

  const [niveaux, setNiveaux] = useState([
    // Primaire
    { id: '1', nom: '1ère Année Primaire', code: '1AP', abreviation: '1AP', cycle: 'primaire', ordre: 1, description: 'Première année du cycle primaire', statut: 'Actif', matieres: [1, 2, 3, 4, 5], frais_scolarite: 3000, frais_transport: 800, frais_cantine: 600, capacite_max: 120, nombre_etudiants: 95 },
    { id: '2', nom: '2ème Année Primaire', code: '2AP', abreviation: '2AP', cycle: 'primaire', ordre: 2, description: 'Deuxième année du cycle primaire', statut: 'Actif', matieres: [1, 2, 3, 4, 5], frais_scolarite: 3000, frais_transport: 800, frais_cantine: 600, capacite_max: 120, nombre_etudiants: 102 },
    { id: '3', nom: '3ème Année Primaire', code: '3AP', abreviation: '3AP', cycle: 'primaire', ordre: 3, description: 'Troisième année du cycle primaire', statut: 'Actif', matieres: [1, 2, 3, 4, 5], frais_scolarite: 3000, frais_transport: 800, frais_cantine: 600, capacite_max: 120, nombre_etudiants: 88 },
    { id: '4', nom: '4ème Année Primaire', code: '4AP', abreviation: '4AP', cycle: 'primaire', ordre: 4, description: 'Quatrième année du cycle primaire', statut: 'Actif', matieres: [1, 2, 3, 4, 5, 6], frais_scolarite: 3200, frais_transport: 800, frais_cantine: 600, capacite_max: 110, nombre_etudiants: 76 },
    { id: '5', nom: '5ème Année Primaire', code: '5AP', abreviation: '5AP', cycle: 'primaire', ordre: 5, description: 'Cinquième année du cycle primaire', statut: 'Actif', matieres: [1, 2, 3, 4, 5, 6], frais_scolarite: 3200, frais_transport: 800, frais_cantine: 600, capacite_max: 110, nombre_etudiants: 82 },
    { id: '6', nom: '6ème Année Primaire', code: '6AP', abreviation: '6AP', cycle: 'primaire', ordre: 6, description: 'Sixième année du cycle primaire - Préparation pour le collège', statut: 'Actif', matieres: [1, 2, 3, 4, 5, 6, 7], frais_scolarite: 3500, frais_transport: 800, frais_cantine: 600, capacite_max: 110, nombre_etudiants: 78 },
    
    // Collège
    { id: '7', nom: '7ème Année (Collège)', code: '1AC', abreviation: '1AC', cycle: 'college', ordre: 7, description: 'Première année du cycle collégial', statut: 'Actif', matieres: [1, 2, 3, 4, 5, 6, 7, 8], frais_scolarite: 4500, frais_transport: 1000, frais_cantine: 800, capacite_max: 100, nombre_etudiants: 85 },
    { id: '8', nom: '8ème Année (Collège)', code: '2AC', abreviation: '2AC', cycle: 'college', ordre: 8, description: 'Deuxième année du cycle collégial', statut: 'Actif', matieres: [1, 2, 3, 4, 5, 6, 7, 8], frais_scolarite: 4500, frais_transport: 1000, frais_cantine: 800, capacite_max: 100, nombre_etudiants: 92 },
    { id: '9', nom: '9ème Année (Collège)', code: '3AC', abreviation: '3AC', cycle: 'college', ordre: 9, description: 'Troisième année du cycle collégial - Année de certification', statut: 'Actif', matieres: [1, 2, 3, 4, 5, 6, 7, 8], frais_scolarite: 4800, frais_transport: 1000, frais_cantine: 800, capacite_max: 100, nombre_etudiants: 88 },
    
    // Lycée
    { id: '10', nom: 'Tronc Commun', code: 'TC', abreviation: 'TC', cycle: 'lycee', ordre: 10, description: 'Année du tronc commun au lycée', statut: 'Actif', matieres: [1, 2, 3, 4, 5, 6, 7, 8, 9], frais_scolarite: 5500, frais_transport: 1200, frais_cantine: 1000, capacite_max: 90, nombre_etudiants: 75 },
    { id: '11', nom: '1ère Année Baccalauréat', code: '1BAC', abreviation: '1BAC', cycle: 'lycee', ordre: 11, description: 'Première année du baccalauréat', statut: 'Actif', matieres: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], frais_scolarite: 6000, frais_transport: 1200, frais_cantine: 1000, capacite_max: 90, nombre_etudiants: 67 },
    { id: '12', nom: '2ème Année Baccalauréat', code: '2BAC', abreviation: '2BAC', cycle: 'lycee', ordre: 12, description: 'Deuxième année du baccalauréat - Année de l\'examen national', statut: 'Actif', matieres: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], frais_scolarite: 6500, frais_transport: 1200, frais_cantine: 1000, capacite_max: 85, nombre_etudiants: 58 },
  ]);

  // Save levels to global storage
  const saveLevel = (data) => {
    if (data.id) {
      setNiveaux(prev => prev.map(l => l.id === data.id ? data : l));
    } else {
      setNiveaux(prev => [...prev, { ...data, id: Date.now().toString() }]);
    }
  };

  // Make levels available globally
  if (typeof window !== 'undefined') {
    window.levelsData = { niveaux, saveLevel };
  }

  const filtered = niveaux.filter(l =>
    (l.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
     l.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
     l.abreviation.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (!filterStatut || l.statut === filterStatut) &&
    (!filterCycle || l.cycle === filterCycle)
  );

  const stats = {
    total: niveaux.length,
    actifs: niveaux.filter(l => l.statut === 'Actif').length,
    inactifs: niveaux.filter(l => l.statut === 'Inactif').length,
    primaire: niveaux.filter(l => l.cycle === 'primaire').length,
    college: niveaux.filter(l => l.cycle === 'college').length,
    lycee: niveaux.filter(l => l.cycle === 'lycee').length,
    totalEtudiants: niveaux.reduce((sum, l) => sum + l.nombre_etudiants, 0),
    capaciteTotale: niveaux.reduce((sum, l) => sum + (l.capacite_max || 0), 0),
  };

  const handleDelete = () => {
    setNiveaux(prev => prev.filter(l => l.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  const getCycleInfo = (cycle) => {
    return cycles.find(c => c.value === cycle) || cycles[0];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: '#1e3a5f' }}>Niveaux Scolaires</h1>
          <p className="text-sm text-slate-400 mt-0.5">
            {stats.total} niveaux · {stats.totalEtudiants} étudiants inscrits
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-72">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="search"
              placeholder="Rechercher un niveau..."
              className="pl-9 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={() => navigate('/niveaux/nouveau')}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white rounded-xl whitespace-nowrap transition-opacity hover:opacity-90"
            style={{ background: '#E55B2D' }}
          >
            <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            Ajouter un niveau
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Total niveaux</p>
              <p className="text-2xl font-bold" style={{ color: '#1e3a5f' }}>{stats.total}</p>
            </div>
            <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0" style={{ background: '#f1f5f9' }}>
              <GraduationCap className="w-5 h-5" style={{ color: '#1e3a5f' }} />
            </div>
          </div>
        </div>
        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Primaire</p>
              <p className="text-2xl font-bold" style={{ color: '#4f46e5' }}>{stats.primaire}</p>
            </div>
            <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0" style={{ background: '#e0e7ff' }}>
              <span className="text-lg">📚</span>
            </div>
          </div>
        </div>
        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Collège</p>
              <p className="text-2xl font-bold" style={{ color: '#E55B2D' }}>{stats.college}</p>
            </div>
            <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0" style={{ background: '#fff7ed' }}>
              <span className="text-lg">🏫</span>
            </div>
          </div>
        </div>
        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Lycée</p>
              <p className="text-2xl font-bold" style={{ color: '#16a34a' }}>{stats.lycee}</p>
            </div>
            <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0" style={{ background: '#dcfce7' }}>
              <span className="text-lg">🎓</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Cycle:</span>
          <button
            onClick={() => setFilterCycle('')}
            className="px-3 py-1 rounded-full text-xs font-semibold transition-all hover:scale-105"
            style={!filterCycle ? { background: '#1e3a5f', color: 'white' } : { background: '#f1f5f9', color: '#475569' }}
          >
            Tous
          </button>
          {cycles.map(c => (
            <button
              key={c.value}
              onClick={() => setFilterCycle(c.value === filterCycle ? '' : c.value)}
              className="px-3 py-1 rounded-full text-xs font-semibold transition-all hover:scale-105"
              style={filterCycle === c.value ? { background: c.color, color: 'white' } : { background: c.bg, color: c.color }}
            >
              {c.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Statut:</span>
          <button
            onClick={() => setFilterStatut('')}
            className="px-3 py-1 rounded-full text-xs font-semibold transition-all hover:scale-105"
            style={!filterStatut ? { background: '#1e3a5f', color: 'white' } : { background: '#f1f5f9', color: '#475569' }}
          >
            Tous
          </button>
          {statuts.map(s => (
            <button
              key={s.value}
              onClick={() => setFilterStatut(s.value === filterStatut ? '' : s.value)}
              className="px-3 py-1 rounded-full text-xs font-semibold transition-all hover:scale-105"
              style={filterStatut === s.value ? { background: s.color, color: 'white' } : { background: s.bg, color: s.color }}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grouped by Cycle */}
      {['primaire', 'college', 'lycee'].map(cycle => {
        const cycleNiveaux = filtered.filter(n => n.cycle === cycle);
        if (cycleNiveaux.length === 0) return null;
        const cycleInfo = getCycleInfo(cycle);
        
        return (
          <div key={cycle} className="space-y-4">
            <h2 className="text-lg font-bold flex items-center gap-2" style={{ color: cycleInfo.color }}>
              <div className="w-1 h-6 rounded-full" style={{ background: cycleInfo.color }}></div>
              {cycleInfo.label}
              <span className="text-sm font-normal text-slate-400">({cycleNiveaux.length} niveaux)</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {cycleNiveaux.map((niveau) => {
                const totalFrais = (niveau.frais_scolarite || 0) + (niveau.frais_transport || 0) + (niveau.frais_cantine || 0);
                const occupation = niveau.capacite_max ? Math.round((niveau.nombre_etudiants / niveau.capacite_max) * 100) : 0;
                const statut = statuts.find(s => s.value === niveau.statut);
                
                return (
                  <div key={niveau.id} className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-all hover:scale-105">
                    <div className="relative p-4" style={{ background: `linear-gradient(135deg, ${cycleInfo.color} 0%, ${cycleInfo.color}dd 100%)` }}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-lg text-white">{niveau.nom}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-white bg-opacity-20 text-white">
                              {niveau.code}
                            </span>
                            <span className="text-xs text-white text-opacity-90">{niveau.abreviation}</span>
                          </div>
                        </div>
                        <span 
                          className="text-xs font-semibold px-2.5 py-1 rounded-full"
                          style={{ background: statut?.bg || '#f1f5f9', color: statut?.color || '#475569' }}
                        >
                          {niveau.statut}
                        </span>
                      </div>
                    </div>

                    <div className="p-4">
                      <p className="text-xs text-slate-500 mb-3 leading-relaxed line-clamp-2">
                        {niveau.description || 'Aucune description'}
                      </p>

                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div className="rounded-lg p-2" style={{ background: '#f8fafc' }}>
                          <p className="text-xs text-slate-400">Étudiants</p>
                          <p className="font-bold text-sm" style={{ color: '#1e3a5f' }}>{niveau.nombre_etudiants}</p>
                          {niveau.capacite_max && (
                            <div className="mt-1 bg-slate-200 rounded-full h-1">
                              <div className="h-1 rounded-full" style={{ width: `${occupation}%`, background: occupation > 90 ? '#dc2626' : occupation > 70 ? '#E55B2D' : '#16a34a' }} />
                            </div>
                          )}
                        </div>
                        <div className="rounded-lg p-2" style={{ background: '#f8fafc' }}>
                          <p className="text-xs text-slate-400">Frais annuels</p>
                          <p className="font-bold text-sm" style={{ color: '#E55B2D' }}>{totalFrais.toLocaleString()} DH</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-1 pt-3 border-t border-slate-100">
                        <button
                          onClick={() => navigate(`/niveaux/${niveau.id}`, { state: { level: niveau } })}
                          className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors"
                          title="Voir détails"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => navigate(`/niveaux/modifier/${niveau.id}`, { state: { level: niveau } })}
                          className="p-1.5 rounded-lg hover:bg-orange-50 transition-colors"
                          style={{ color: '#E55B2D' }}
                          title="Modifier"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => setDeleteTarget(niveau)}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors"
                          title="Supprimer"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-100">
          <svg className="w-14 h-14 mx-auto text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <h3 className="font-bold text-base mb-1" style={{ color: '#1e3a5f' }}>Aucun niveau trouvé</h3>
          <p className="text-sm text-slate-400">
            {searchTerm || filterStatut || filterCycle ? "Essayez d'ajuster vos filtres." : 'Ajoutez un niveau pour commencer.'}
          </p>
        </div>
      )}

      {/* Delete confirmation */}
      {deleteTarget && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.45)' }}
          onClick={() => setDeleteTarget(null)}
        >
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-7" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-11 h-11 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                <svg width="18" height="18" fill="none" stroke="#dc2626" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <h2 className="text-base font-bold" style={{ color: '#1e3a5f' }}>Supprimer ce niveau ?</h2>
            </div>
            <p className="text-sm text-slate-500 mb-6 leading-relaxed">
              Êtes-vous sûr de vouloir supprimer{' '}
              <strong style={{ color: '#1e3a5f' }}>"{deleteTarget.nom}"</strong> ?{' '}
              Cette action est irréversible.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-5 py-2 text-sm font-semibold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200"
              >
                Annuler
              </button>
              <button
                onClick={handleDelete}
                className="px-5 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

