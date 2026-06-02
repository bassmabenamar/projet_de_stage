import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UploadCloud, ChevronDown, FileSpreadsheet, AlertCircle, 
  ArrowUpRight, Layers, Loader2, Save, Edit2, X, Plus, 
  Trash2, BookOpen, Users, Calendar, Award
} from 'lucide-react';
import * as XLSX from 'xlsx';

import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import API from '../../services/api';

const GradesPage = () => {
  const fileInputRef = useRef(null);
  
  // States pour la structure scolaire
  const [niveaux, setNiveaux] = useState([]);
  const [selectedNiveau, setSelectedNiveau] = useState(null);
  const [filieres, setFilieres] = useState([]);
  const [selectedFiliere, setSelectedFiliere] = useState(null);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  
  // States pour les données
  const [students, setStudents] = useState([]);
  const [notes, setNotes] = useState([]);
  const [noteTypes, setNoteTypes] = useState(['Quiz', 'Devoir', 'Examen']);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [editingCell, setEditingCell] = useState({ studentId: null, noteType: null });
  const [editValue, setEditValue] = useState('');

  // 1. Charger les niveaux scolaires au montage
  useEffect(() => {
    fetchNiveaux();
  }, []);

  // 2. Déclenché au changement de Niveau Scolaire
  useEffect(() => {
    if (!selectedNiveau) {
      setFilieres([]);
      setSelectedFiliere(null);
      setClasses([]);
      setSelectedClass(null);
      return;
    }

    const niveauActuel = niveaux.find(n => n.id === selectedNiveau);
    
    // Vérification si le niveau a des filières (tableau existant et non vide)
    if (niveauActuel && niveauActuel.filieres && niveauActuel.filieres.length > 0) {
      const listFilieres = niveauActuel.filieres;
      setFilieres(listFilieres);
      setSelectedFiliere(listFilieres[0].id); // Sélectionne la 1ère filière par défaut
      setClasses([]); 
      setSelectedClass(null);
    } else {
      // Le niveau n'a pas de filières -> On vide les filières et charge directement ses classes
      setFilieres([]);
      setSelectedFiliere(null);
      fetchClassesDirectementDepuisNiveau(selectedNiveau);
    }
  }, [selectedNiveau, niveaux]);

  // 3. Déclenché au changement de Filière (uniquement si le niveau en possède)
  useEffect(() => {
    if (!selectedFiliere) return;
    fetchClassesDepuisFiliere(selectedFiliere);
  }, [selectedFiliere]);

  // 4. Charger les étudiants et les notes quand la classe change
  useEffect(() => {
    if (selectedClass) {
      fetchStudentsAndNotes();
    } else {
      setStudents([]);
      setNotes([]);
    }
  }, [selectedClass]);

  const fetchNiveaux = async () => {
    try {
      setLoading(true);
      const response = await API.get('/teacher/niveaux');
      const list = response.data.data || response.data || [];
      setNiveaux(list);

      if (list.length > 0) {
        setSelectedNiveau(list[0].id);
      }
    } catch (err) {
      console.error('Error fetching niveaux:', err);
      setError('Impossible de charger les niveaux scolaires');
    } finally {
      setLoading(false);
    }
  };

  const fetchClassesDepuisFiliere = async (filiereId) => {
    try {
      const response = await API.get(`/teacher/filieres/${filiereId}/classes`);
      const data = response.data.data || response.data || [];
      setClasses(data);

      if (data.length > 0) {
        setSelectedClass(data[0].id);
      } else {
        setSelectedClass(null);
      }
    } catch (err) {
      console.error(err);
      setError("Impossible de charger les classes de cette filière");
    }
  };

  const fetchClassesDirectementDepuisNiveau = async (niveauId) => {
    try {
      const response = await API.get(`/teacher/niveaux/${niveauId}/classes`);
      const data = response.data.data || response.data || [];
      setClasses(data);

      if (data.length > 0) {
        setSelectedClass(data[0].id);
      } else {
        setSelectedClass(null);
      }
    } catch (err) {
      console.error(err);
      setError("Impossible de charger les classes de ce niveau");
    }
  };

  const fetchStudentsAndNotes = async () => {
    try {
      setLoading(true);
      const response = await API.get(`/teacher/grades/${selectedClass}`);
      setStudents(response.data.students || []);
      setNotes(response.data.notes || []);
      setNoteTypes(response.data.note_types || ['Quiz', 'Devoir', 'Examen']);
      setError(null);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Impossible de charger les données');
    } finally {
      setLoading(false);
    }
  };

  const updateGrade = async (studentId, noteType, value) => {
    try {
      await API.post('/teacher/grades/update', {
        student_id: studentId,
        class_id: selectedClass,
        note_type: noteType,
        value: value
      });
      
      setNotes(prev => {
        const existing = prev.find(n => n.student_id === studentId && n.note_type === noteType);
        if (existing) {
          return prev.map(n => 
            n.student_id === studentId && n.note_type === noteType 
              ? { ...n, value: parseFloat(value) || null }
              : n
          );
        } else {
          return [...prev, { student_id: studentId, note_type: noteType, value: parseFloat(value) || null }];
        }
      });
      
      setSuccess('Note mise à jour avec succès');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error('Error updating grade:', err);
      setError('Impossible de mettre à jour la note');
      setTimeout(() => setError(null), 3000);
    }
  };

  const removeNoteType = async (noteType) => {
    if (window.confirm(`Supprimer le type de note "${noteType}" ?`)) {
      try {
        await API.delete(`/teacher/grades/note-type/${selectedClass}/${noteType}`);
        setNoteTypes(noteTypes.filter(nt => nt !== noteType));
        setNotes(notes.filter(n => n.note_type !== noteType));
        setSuccess('Type de note supprimé avec succès');
        setTimeout(() => setSuccess(null), 3000);
      } catch (err) {
        console.error('Error removing note type:', err);
        setError('Impossible de supprimer le type de note');
        setTimeout(() => setError(null), 3000);
      }
    }
  };

  const handleCellEdit = (studentId, noteType, currentValue) => {
    setEditingCell({ studentId, noteType });
    setEditValue(currentValue || '');
  };

  const handleCellSave = async () => {
    const { studentId, noteType } = editingCell;
    await updateGrade(studentId, noteType, editValue);
    setEditingCell({ studentId: null, noteType: null });
    setEditValue('');
  };

  const handleCellCancel = () => {
    setEditingCell({ studentId: null, noteType: null });
    setEditValue('');
  };

  const calculateStudentAverage = (studentId) => {
    const studentNotes = notes.filter(n => n.student_id === studentId);
    if (studentNotes.length === 0) return 'N/A';
    const total = studentNotes.reduce((sum, n) => sum + (parseFloat(n.value) || 0), 0);
    const average = total / studentNotes.length;
    return `${average.toFixed(1)}/20`;
  };

  const getClassAverage = () => {
    const averages = students.map(s => {
      const avg = calculateStudentAverage(s.id);
      return avg !== 'N/A' ? parseFloat(avg) : null;
    }).filter(avg => avg !== null);
    
    if (averages.length === 0) return 'N/A';
    const sum = averages.reduce((a, b) => a + b, 0);
    return `${(sum / averages.length).toFixed(1)}/20`;
  };

  const handleExcelImport = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (evt) => {
      try {
        const data = new Uint8Array(evt.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(sheet);
        
        const gradesData = jsonData.map(row => ({
          student_id: row['ID'] || row['Student ID'],
          note_type: row['Type de Note'] || row['Note Type'],
          value: row['Note'] || row['Grade']
        }));
        
        setSubmitting(true);
        const response = await API.post(`/teacher/grades/import/${selectedClass}`, {
          grades: gradesData
        });
        
        setSuccess(`${response.data.imported} notes importées avec succès`);
        fetchStudentsAndNotes();
        setTimeout(() => setSuccess(null), 3000);
      } catch (err) {
        console.error('Error importing Excel:', err);
        setError('Erreur lors de l\'import du fichier Excel');
        setTimeout(() => setError(null), 3000);
      } finally {
        setSubmitting(false);
        fileInputRef.current.value = '';
      }
    };
    reader.readAsArrayBuffer(file);
  };

  if (loading && (niveaux ?? []).length === 0) {
    return (
      <div className="flex min-h-screen bg-[#F8FAFC]">
        <Sidebar />
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          <Navbar />
          <main className="flex-1 overflow-y-auto p-10">
            <div className="flex justify-center items-center h-96">
              <Loader2 size={48} className="animate-spin text-[#002366]" />
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">

          {/* HEADER */}
          <header className="mb-8">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="flex items-center gap-2 mb-2">
                <Layers size={14} className="text-blue-600" />
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">
                  Gestion des Notes
                </p>
              </div>
              <h1 className="text-4xl font-[1000] text-[#002366] tracking-tighter">
                Carnet de Notes
              </h1>
              <p className="text-slate-400 font-bold text-[13px] mt-1 italic">
                Saisie manuelle ou import de fichiers Excel (.xlsx)
              </p>
            </motion.div>
          </header>

          {/* Messages */}
          <AnimatePresence>
            {success && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-2xl text-sm font-semibold"
              >
                {success}
              </motion.div>
            )}
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-sm font-semibold"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* SELECTORS DYNAMIQUES */}
          <div className={`grid gap-6 mb-8 ${filieres.length > 0 ? 'grid-cols-3' : 'grid-cols-2'}`}>
            
            {/* Niveau Scolaire Selector */}
            <div>
              <label className="block text-[11px] font-[1000] text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1">
                Niveau Scolaire
              </label>
              <div className="relative">
                <select
                  value={selectedNiveau || ''}
                  onChange={(e) => setSelectedNiveau(parseInt(e.target.value))}
                  className="w-full appearance-none px-6 py-4 bg-white border-2 border-slate-100 focus:border-[#002366] rounded-[24px] outline-none transition-all text-[#002366] font-bold cursor-pointer"
                >
                  <option value="">Sélectionner un niveau</option>
                  {niveaux.map(n => (
                    <option key={n.id} value={n.id}>{n.nom}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={20} />
              </div>
            </div>

            {/* Conditionnel : Filière Selector (Affiché uniquement s'il y a des filières pour le niveau actuel) */}
            {filieres.length > 0 && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                <label className="block text-[11px] font-[1000] text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1">
                  Filière
                </label>
                <div className="relative">
                  <select
                    value={selectedFiliere || ''}
                    onChange={(e) => setSelectedFiliere(parseInt(e.target.value))}
                    className="w-full appearance-none px-6 py-4 bg-white border-2 border-slate-100 focus:border-[#002366] rounded-[24px] outline-none transition-all text-[#002366] font-bold cursor-pointer"
                  >
                    <option value="">Sélectionner une filière</option>
                    {filieres.map(f => (
                      <option key={f.id} value={f.id}>{f.nom}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={20} />
                </div>
              </motion.div>
            )}

            {/* Class Selector */}
            <div>
              <label className="block text-[11px] font-[1000] text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1">
                Classe
              </label>
              <div className="relative">
                <select
                  value={selectedClass || ''}
                  onChange={(e) => setSelectedClass(parseInt(e.target.value))}
                  disabled={!selectedNiveau}
                  className="w-full appearance-none px-6 py-4 bg-white border-2 border-slate-100 focus:border-[#002366] rounded-[24px] outline-none transition-all text-[#002366] font-bold cursor-pointer disabled:opacity-50"
                >
                  <option value="">Sélectionner une classe</option>
                  {classes.map(c => (
                    <option key={c.id} value={c.id}>{c.nom}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={20} />
              </div>
            </div>
          </div>

          {selectedClass && (
            <>
              {/* STATISTICS CARDS */}
              <div className="grid grid-cols-4 gap-6 mb-8">
                <AnalyticCard label="Étudiants" value={(students ?? []).length.toString()} icon={<Users size={20} />} subValue="Inscrits" />
                <AnalyticCard label="Types de Notes" value={(noteTypes || []).length.toString()} icon={<Award size={20} />} subValue="Différents" />
                <AnalyticCard label="Moyenne Classe" value={getClassAverage()} icon={<BookOpen size={20} />} subValue="Générale" />
                <AnalyticCard label="Taux Réussite" value="--" icon={<Calendar size={20} />} subValue="En cours" />
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex justify-end gap-3 mb-6">
                <input type="file" ref={fileInputRef} onChange={handleExcelImport} accept=".xlsx, .xls" className="hidden" />
                <motion.button 
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  onClick={() => fileInputRef.current.click()} disabled={submitting}
                  className="group flex items-center gap-3 px-6 py-3 bg-white border-2 border-dashed border-slate-200 rounded-[22px] text-[12px] font-black text-[#002366] uppercase tracking-widest hover:border-emerald-400 hover:bg-emerald-50/30 transition-all"
                >
                  <FileSpreadsheet size={18} className="text-emerald-500" />
                  Importer Excel
                </motion.button>
              </div>
              
              {/* GRADES TABLE */}
              <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
                <div className="px-8 py-6 border-b border-slate-50 flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-[1000] text-[#002366]">Notes des Étudiants</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                      {classes.find(c => c.id === selectedClass)?.nom}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                    <span className="text-[11px] font-bold text-slate-400 italic">Cloud synchronisé...</span>
                  </div>
                </div>

                {loading ? (
                  <div className="flex justify-center py-20">
                    <Loader2 size={40} className="animate-spin text-[#002366]" />
                  </div>
                ) : (students ?? []).length === 0 ? (
                  <div className="text-center py-20">
                    <p className="text-slate-400">Aucun étudiant dans cette classe</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-slate-50/50">
                          <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">N°</th>
                          <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Nom Complet</th>
                          <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date Naissance</th>
                          {noteTypes.map((type, idx) => (
                            <th key={idx} className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">
                              <div className="flex items-center justify-center gap-2">
                                {type}
                                <button onClick={() => removeNoteType(type)} className="opacity-0 group-hover:opacity-100 hover:text-red-500 transition-colors">
                                  <Trash2 size={12} />
                                </button>
                              </div>
                            </th>
                          ))}
                          <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Moyenne</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {students.map((student, idx) => {
                          const studentNotes = notes.filter(n => n.student_id === student.id);
                          const average = calculateStudentAverage(student.id);
                          
                          return (
                            <motion.tr key={student.id} whileHover={{ backgroundColor: '#F8FAFC' }} className="group transition-colors">
                              <td className="px-6 py-4 text-sm font-bold text-slate-500">{idx + 1}</td>
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#2F5D9F] to-[#E55B2D] text-white flex items-center justify-center text-[10px] font-black">
                                    {student.user?.name?.charAt(0) || 'E'}
                                  </div>
                                  <div>
                                    <p className="text-sm font-[1000] text-[#002366]">{student.user?.name}</p>
                                    <p className="text-[9px] font-bold text-slate-400 uppercase">{student.student_id}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 text-sm text-slate-600">
                                {student.birth_date ? new Date(student.birth_date).toLocaleDateString('fr-FR') : 'N/A'}
                              </td>
                              
                              {noteTypes.map((noteType, noteIdx) => {
                                const note = studentNotes.find(n => n.note_type === noteType);
                                const isEditing = editingCell.studentId === student.id && editingCell.noteType === noteType;
                                const value = note?.value;
                                
                                return (
                                  <td key={noteIdx} className="px-6 py-4 text-center">
                                    {isEditing ? (
                                      <div className="flex items-center justify-center gap-2">
                                        <input
                                          type="number" step="0.5" min="0" max="20" value={editValue} autoFocus
                                          onChange={(e) => setEditValue(e.target.value)}
                                          className="w-16 px-2 py-1 text-center border border-[#002366] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366]/20"
                                        />
                                        <button onClick={handleCellSave} className="p-1 text-green-600 hover:bg-green-50 rounded">
                                          <Save size={14} />
                                        </button>
                                        <button onClick={handleCellCancel} className="p-1 text-red-600 hover:bg-red-50 rounded">
                                          <X size={14} />
                                        </button>
                                      </div>
                                    ) : (
                                      <div className="flex items-center justify-center gap-2">
                                        <span className={`font-black text-lg ${value && value >= 10 ? 'text-green-600' : value ? 'text-red-500' : 'text-slate-400'}`}>
                                          {value || '--'}
                                        </span>
                                        <button
                                          onClick={() => handleCellEdit(student.id, noteType, value)}
                                          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-slate-100 rounded"
                                        >
                                          <Edit2 size={12} className="text-slate-400" />
                                        </button>
                                      </div>
                                    )}
                                  </td>
                                );
                              })}
                              
                              <td className="px-6 py-4 text-center">
                                <span className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-black ${
                                  average !== 'N/A' && parseFloat(average) >= 10 ? 'bg-emerald-50 text-emerald-600' : average !== 'N/A' ? 'bg-red-50 text-red-600' : 'bg-slate-50 text-slate-400'
                                }`}>
                                  {average}
                                </span>
                              </td>
                            </motion.tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* BOTTOM SUMMARY */}
              <div className="mt-8 flex justify-between items-center">
                <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex items-center gap-8">
                  <div className="flex gap-6 items-center px-2">
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Moyenne Globale</p>
                      <p className="text-xl font-[1000] text-[#002366]">{getClassAverage()}</p>
                    </div>
                    <div className="h-8 w-px bg-slate-100"></div>
                    <AlertCircle size={18} className="text-orange-400" />
                    <p className="text-[11px] font-bold text-slate-500 max-w-[200px]">
                      {notes.length} notes enregistrées
                    </p>
                  </div>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  className="px-8 py-4 bg-white border border-slate-200 rounded-[22px] text-xs font-[1000] text-slate-400 uppercase tracking-[0.2em] hover:text-[#002366]"
                >
                  Archiver le Semestre
                </motion.button>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

/* REUSABLE SUB COMPONENTS */
const AnalyticCard = ({ label, value, icon, subValue }) => (
  <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm transition-all">
    <div className="flex items-center justify-between mb-3">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
      <div className="p-2 bg-slate-50 rounded-xl">{icon}</div>
    </div>
    <h3 className="text-3xl font-[1000] text-[#002366] mb-1">{value}</h3>
    <p className="text-[9px] font-black text-slate-300 uppercase tracking-tighter">{subValue}</p>
  </motion.div>
);

export default GradesPage;