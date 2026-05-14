// pages/admin/Matiers.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const COLOR_PALETTE = [
  '#2F5D9F', '#4A7CC2', '#E55B2D', '#16A34A', '#0D9488',
  '#A16207', '#7C3AED', '#0F766E', '#DC2626', '#475569',
];

export default function AdminSubjects() {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([
    { id: '1', name: 'Mathematics', code: 'MATH', teacher: 'John Doe',   hours: 4, color: '#2F5D9F' },
    { id: '2', name: 'Physics',     code: 'PHY',  teacher: 'Jane Smith', hours: 3, color: '#E55B2D' },
    { id: '3', name: 'Chemistry',   code: 'CHEM', teacher: 'Dr. Brown',   hours: 4, color: '#16A34A' },
    { id: '4', name: 'Biology',     code: 'BIO',  teacher: 'Sarah Lee',   hours: 3, color: '#0D9488' },
    { id: '5', name: 'History',     code: 'HIST', teacher: 'Mike Wilson', hours: 2, color: '#A16207' },
  ]);

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [search, setSearch] = useState('');

  // Save subjects to global storage for other components
  const saveSubject = (data) => {
    if (data.id) {
      setSubjects(prev => prev.map(s => s.id === data.id ? data : s));
    } else {
      setSubjects(prev => [...prev, { ...data, id: Date.now().toString() }]);
    }
  };

  // Make subjects available globally
  if (typeof window !== 'undefined') {
    window.subjectsData = { subjects, saveSubject };
  }

  const totalHours = subjects.reduce((s, x) => s + x.hours, 0);
  const filtered = subjects.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.code.toLowerCase().includes(search.toLowerCase()) ||
    s.teacher.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = () => {
    setSubjects(prev => prev.filter(s => s.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: '#1e3a5f' }}>Matières</h1>
          <p className="text-sm text-slate-400 mt-0.5">
            {subjects.length} matière{subjects.length !== 1 ? 's' : ''} · {totalHours}h total par semaine
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-72">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="search"
              placeholder="Rechercher une matière..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            />
          </div>
          <button
            onClick={() => navigate('/subjects/nouveau')}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white rounded-xl whitespace-nowrap transition-opacity hover:opacity-90"
            style={{ background: '#E55B2D' }}
          >
            <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            Ajouter une matière
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100" style={{ background: '#f8fafc' }}>
                <th className="w-12 px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Couleur</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Matière</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Code</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Enseignant</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">H/semaine</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-sm text-slate-400">
                    Aucune matière trouvée.
                  </td>
                </tr>
              ) : filtered.map(subject => (
                <tr key={subject.id} className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors">
                  <td className="px-4 py-3">
                    <div className="w-6 h-6 rounded-lg border border-slate-200 shadow-sm" style={{ backgroundColor: subject.color }} />
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => navigate(`/subjects/${subject.id}`, { state: { subject } })}
                      className="font-semibold hover:text-orange-600 transition-colors"
                      style={{ color: '#1e3a5f' }}
                    >
                      {subject.name}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-bold tracking-wide"
                      style={{ backgroundColor: subject.color + '1A', color: subject.color }}
                    >
                      {subject.code}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-500 text-sm">{subject.teacher}</td>
                  <td className="px-4 py-3 text-right">
                    <span className="inline-flex items-center justify-end gap-1.5 text-sm font-semibold" style={{ color: '#1e3a5f' }}>
                      <svg className="w-3.5 h-3.5" fill="none" stroke="#E55B2D" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {subject.hours}h
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                     
                      <button
                        onClick={() => navigate(`/subjects/modifier/${subject.id}`, { state: { subject } })}
                        className="p-1.5 rounded-lg hover:bg-orange-50 transition-colors"
                        style={{ color: '#E55B2D' }}
                        title="Modifier"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => setDeleteTarget(subject)}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors"
                        title="Supprimer"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Color Palette reference */}
      <div className="p-4 border border-slate-100 rounded-2xl bg-white">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Palette de couleurs</p>
        <div className="flex flex-wrap gap-2">
          {COLOR_PALETTE.map(c => (
            <div key={c} className="w-8 h-8 rounded-lg border-2 border-white shadow-sm" style={{ backgroundColor: c }} />
          ))}
        </div>
      </div>

      {/* Delete confirmation */}
      {deleteTarget && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.45)' }}
          onClick={() => setDeleteTarget(null)}
        >
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-11 h-11 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                <svg width="18" height="18" fill="none" stroke="#dc2626" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <h2 className="text-base font-bold" style={{ color: '#1e3a5f' }}>Supprimer cette matière ?</h2>
            </div>
            <p className="text-sm text-slate-500 mb-6 leading-relaxed">
              Êtes-vous sûr de vouloir supprimer{' '}
              <strong style={{ color: '#1e3a5f' }}>"{deleteTarget.name}"</strong> ?{' '}
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