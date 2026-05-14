// pages/admin/transport.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const typesVehicule = ['Bus', 'Minibus', 'Voiture', 'Van', 'Camionnette'];

const statutsDisponibilite = [
  { value: 'disponible',     label: 'Disponible',      bg: '#dcfce7', color: '#16a34a' },
  { value: 'en_route',       label: 'En route',         bg: '#dbeafe', color: '#2563eb' },
  { value: 'en_maintenance', label: 'En maintenance',   bg: '#fef9c3', color: '#ca8a04' },
  { value: 'hors_service',   label: 'Hors service',     bg: '#fee2e2', color: '#dc2626' },
];

function getStatut(val) {
  return statutsDisponibilite.find(s => s.value === val) || { label: val, bg: '#f1f5f9', color: '#475569' };
}

export default function AdminTransports() {
  const navigate = useNavigate();
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [transports, setTransports] = useState([
    { id: '1', nom: 'Bus Scolaire A',     code: 'BSA-001', type: 'Bus',      immatriculation: '123-ABC-45', capacite: 50, chauffeur: { nom: 'Ahmed Benali',     telephone: '0612345678', permis: 'B, D', email: 'ahmed.benali@example.com'   }, responsable: { nom: 'Karim Fadili',  telephone: '0687654321', email: 'karim.fadili@example.com'  }, statut: 'disponible',     image: '', description: 'Bus grande capacité pour trajets scolaires'     },
    { id: '2', nom: 'Minibus VIP',        code: 'MBV-002', type: 'Minibus', immatriculation: '456-DEF-78', capacite: 16, chauffeur: { nom: 'Said El Mansouri', telephone: '0678912345', permis: 'B, D', email: 'said.mansouri@example.com'   }, responsable: { nom: 'Nadia Tazi',   telephone: '0698765432', email: 'nadia.tazi@example.com'    }, statut: 'en_route',       image: '', description: 'Minibus climatisé pour petits groupes'          },
    { id: '3', nom: 'Voiture de Service', code: 'VDS-003', type: 'Voiture', immatriculation: '789-GHI-12', capacite: 4,  chauffeur: { nom: 'Mohamed Larbi',    telephone: '0612349876', permis: 'B',    email: 'mohamed.larbi@example.com'   }, responsable: { nom: 'Hassan Amrani', telephone: '0678912345', email: 'hassan.amrani@example.com' }, statut: 'en_maintenance', image: '', description: 'Voiture pour déplacements administratifs'       },
  ]);

  // Save transport to global storage
  const saveTransport = (data) => {
    if (data.id) {
      setTransports(prev => prev.map(t => t.id === data.id ? data : t));
    } else {
      setTransports(prev => [...prev, { ...data, id: Date.now().toString() }]);
    }
  };

  // Make transports available globally
  if (typeof window !== 'undefined') {
    window.transportsData = { transports, saveTransport };
  }

  const filtered = transports.filter(t =>
    t.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.immatriculation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.chauffeur.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.responsable.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total:          transports.length,
    disponible:     transports.filter(t => t.statut === 'disponible').length,
    enRoute:        transports.filter(t => t.statut === 'en_route').length,
    capaciteTotale: transports.reduce((a, t) => a + t.capacite, 0),
  };

  const handleDelete = () => {
    setTransports(prev => prev.filter(t => t.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: '#1e3a5f' }}>Transports</h1>
          <p className="text-sm text-slate-400 mt-0.5">
            {transports.length} véhicule{transports.length !== 1 ? 's' : ''} · {stats.capaciteTotale} places au total
          </p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-72">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="search" 
              placeholder="Rechercher un véhicule..." 
              value={searchTerm} 
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-9 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100" 
            />
          </div>
          <button 
            onClick={() => navigate('/transports/nouveau')}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white rounded-xl whitespace-nowrap transition-opacity hover:opacity-90"
            style={{ background: '#E55B2D' }}
          >
            <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            Ajouter un véhicule
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total véhicules', value: stats.total,          fg: '#1e3a5f', bg: '#f1f5f9', icon: 'M8 12h8m-8 4h8M5 4h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z' },
          { label: 'Disponibles',     value: stats.disponible,     fg: '#16a34a', bg: '#dcfce7', icon: 'M5 13l4 4L19 7' },
          { label: 'En route',        value: stats.enRoute,        fg: '#2563eb', bg: '#dbeafe', icon: 'M9 5l7 7-7 7' },
          { label: 'Places totales',  value: stats.capaciteTotale, fg: '#1e3a5f', bg: '#f1f5f9', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
        ].map(s => (
          <div key={s.label} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">{s.label}</p>
                <p className="text-3xl font-bold" style={{ color: s.fg }}>{s.value}</p>
              </div>
              <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0" style={{ background: s.bg }}>
                <svg width="18" height="18" fill="none" stroke={s.fg} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={s.icon} /></svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(transport => {
          const statut = getStatut(transport.statut);
          return (
            <div key={transport.id} className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-all hover:scale-105">
              {/* Image / placeholder */}
              <div 
                className="relative h-44 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center overflow-hidden cursor-pointer"
                onClick={() => navigate(`/transports/${transport.id}`, { state: { transport } })}
              >
                {transport.image
                  ? <img src={transport.image} alt={transport.nom} className="w-full h-full object-cover" />
                  : (
                    <svg className="w-16 h-16 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h8m-8 4h8M5 4h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z" />
                    </svg>
                  )
                }
                <span className="absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: statut.bg, color: statut.color }}>
                  {statut.label}
                </span>
              </div>

              <div className="p-4">
                {/* Title */}
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <button
                      onClick={() => navigate(`/transports/${transport.id}`, { state: { transport } })}
                      className="font-bold text-base hover:text-orange-600 transition-colors text-left"
                      style={{ color: '#1e3a5f' }}
                    >
                      {transport.nom}
                    </button>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-bold px-2 py-0.5 rounded-md" style={{ background: '#fff7ed', color: '#E55B2D' }}>{transport.code}</span>
                      <span className="text-xs text-slate-400">{transport.immatriculation}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0 ml-3">
                    <p className="text-xs text-slate-400">Capacité</p>
                    <p className="font-bold text-sm" style={{ color: '#1e3a5f' }}>{transport.capacite} pers.</p>
                  </div>
                </div>

                <p className="text-xs text-slate-500 mb-3 leading-relaxed line-clamp-2">{transport.description}</p>

                {/* Chauffeur block */}
                <div className="rounded-xl p-3 mb-2" style={{ background: '#f8fafc', border: '1px solid #f1f5f9' }}>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <svg width="13" height="13" fill="none" stroke="#E55B2D" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                    <span className="text-xs font-bold" style={{ color: '#1e3a5f' }}>Chauffeur</span>
                  </div>
                  <p className="text-xs font-semibold text-slate-700">{transport.chauffeur.nom}</p>
                  <p className="text-xs text-slate-400">Tél: {transport.chauffeur.telephone} · Permis: {transport.chauffeur.permis}</p>
                </div>

                {/* Responsable block */}
                <div className="rounded-xl p-3 mb-3" style={{ background: '#f8fafc', border: '1px solid #f1f5f9' }}>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <svg width="13" height="13" fill="none" stroke="#E55B2D" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
                    <span className="text-xs font-bold" style={{ color: '#1e3a5f' }}>Responsable</span>
                  </div>
                  <p className="text-xs font-semibold text-slate-700">{transport.responsable.nom}</p>
                  <p className="text-xs text-slate-400">Tél: {transport.responsable.telephone}</p>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-1 pt-3 border-t border-slate-100">
                  <button 
                    onClick={() => navigate(`/transports/${transport.id}`, { state: { transport } })} 
                    className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors" 
                    title="Voir détails"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                  <button 
                    onClick={() => navigate(`/transports/modifier/${transport.id}`, { state: { transport } })} 
                    className="p-1.5 rounded-lg hover:bg-orange-50 transition-colors" 
                    style={{ color: '#E55B2D' }} 
                    title="Modifier"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button 
                    onClick={() => setDeleteTarget(transport)} 
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

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-100">
          <svg className="w-14 h-14 mx-auto text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h8m-8 4h8M5 4h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z" />
          </svg>
          <h3 className="font-bold text-base mb-1" style={{ color: '#1e3a5f' }}>Aucun véhicule trouvé</h3>
          <p className="text-sm text-slate-400">
            {searchTerm ? "Essayez d'ajuster votre recherche." : 'Ajoutez un véhicule pour commencer.'}
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
              <h2 className="text-base font-bold" style={{ color: '#1e3a5f' }}>Supprimer ce véhicule ?</h2>
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