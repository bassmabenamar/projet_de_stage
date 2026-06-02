import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, CheckCircle2, Clock, Calendar, 
  ChevronDown, Send, LayoutGrid, Loader2,
  Check, X, AlertCircle, Layers
} from 'lucide-react';

import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import API from '../../services/api';

const AttendancePage = () => {
  // Academic Structure States
  const [niveaux, setNiveaux] = useState([]);
  const [selectedNiveau, setSelectedNiveau] = useState(null);
  const [filieres, setFilieres] = useState([]);
  const [selectedFiliere, setSelectedFiliere] = useState(null);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  
  // Data States
  const [students, setStudents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [attendanceStats, setAttendanceStats] = useState({
    total: 0,
    present: 0,
    absent: 0,
    late: 0
  });
  const [weeklyData, setWeeklyData] = useState([]);

  // 1. Fetch academic levels (Niveaux) on mount
  useEffect(() => {
    fetchNiveaux();
  }, []);

  // 2. Triggered when Academic Level (Niveau) changes
  useEffect(() => {
    if (!selectedNiveau) {
      setFilieres([]);
      setSelectedFiliere(null);
      setClasses([]);
      setSelectedClass(null);
      return;
    }

    const currentNiveau = niveaux.find(n => n.id === selectedNiveau);
    
    // Check if level has filieres
    if (currentNiveau && currentNiveau.filieres && currentNiveau.filieres.length > 0) {
      const listFilieres = currentNiveau.filieres;
      setFilieres(listFilieres);
      setSelectedFiliere(listFilieres[0].id); // Select 1st filiere by default
      setClasses([]); 
      setSelectedClass(null);
    } else {
      // Level has no filieres -> clear filieres and fetch classes directly from level
      setFilieres([]);
      setSelectedFiliere(null);
      fetchClassesDirectlyFromNiveau(selectedNiveau);
    }
  }, [selectedNiveau, niveaux]);

  // 3. Triggered when Filière changes (only if the niveau possesses filieres)
  useEffect(() => {
    if (!selectedFiliere) return;
    fetchClassesFromFiliere(selectedFiliere);
  }, [selectedFiliere]);

  // 4. Fetch students when class or date changes
  useEffect(() => {
    if (selectedClass) {
      fetchStudents();
      fetchAttendanceSummary();
    } else {
      setStudents([]);
    }
  }, [selectedClass, selectedDate]);

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

  const fetchClassesFromFiliere = async (filiereId) => {
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

  const fetchClassesDirectlyFromNiveau = async (niveauId) => {
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

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await API.get(`/teacher/attendance/class/${selectedClass}/date/${selectedDate}`);
      setStudents(response.data.students || []);
      setAttendanceStats({
        total: response.data.stats?.total || 0,
        present: response.data.stats?.present || 0,
        absent: response.data.stats?.absent || 0,
        late: response.data.stats?.late || 0
      });
    } catch (err) {
      console.error('Error fetching students:', err);
      setError('Impossible de charger les étudiants');
    } finally {
      setLoading(false);
    }
  };

  const fetchAttendanceSummary = async () => {
    try {
      const response = await API.get(`/teacher/attendance/summary/${selectedClass}`);
      setWeeklyData(response.data.weekly_data || []);
    } catch (err) {
      console.error('Error fetching summary:', err);
    }
  };

  const updateAttendanceStatus = async (studentId, status) => {
    try {
      await API.post('/teacher/attendance/update', {
        student_id: studentId,
        class_id: selectedClass,
        date: selectedDate,
        status: status,
      });

      setStudents(prev => prev.map(student =>
        student.id === studentId
          ? { ...student, attendance_status: status, status: status }
          : student
      ));

      setSuccess('Présence mise à jour avec succès');
      setTimeout(() => setSuccess(null), 3000);
      fetchStudents(); // Refresh statistics live
    } catch (err) {
      console.error('Error updating attendance:', err);
      setError('Impossible de mettre à jour la présence');
      setTimeout(() => setError(null), 3000);
    }
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
                  Gestion des Présences
                </p>
              </div>
              <h1 className="text-4xl font-[1000] text-[#002366] tracking-tighter">
                Feuille d'Émargement
              </h1>
            </motion.div>
          </header>

          {/* Alerts */}
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

          {/* DYNAMIC SELECTORS */}
          <div className={`grid gap-6 mb-8 ${filieres.length > 0 ? 'grid-cols-4' : 'grid-cols-3'}`}>
            
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

            {/* Conditional Filière Selector */}
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

            {/* Date Picker */}
            <div>
              <label className="block text-[11px] font-[1000] text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1">
                Date d'appel
              </label>
              <div className="relative">
                <input 
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-6 py-4 bg-white border-2 border-slate-100 focus:border-[#002366] rounded-[24px] outline-none transition-all text-[#002366] font-bold cursor-pointer"
                />
              </div>
            </div>
          </div>

          {selectedClass && (
            <>
              {/* STATISTICS CARDS */}
              <div className="grid grid-cols-4 gap-6 mb-8">
                <AnalyticCard label="Total Étudiants" value={attendanceStats.total.toString()} icon={<Users size={20} className="text-blue-600"/>} subValue="Inscrits" />
                <AnalyticCard label="Présents" value={attendanceStats.present.toString()} icon={<CheckCircle2 size={20} className="text-emerald-500"/>} subValue="En classe" />
                <AnalyticCard label="Absents" value={attendanceStats.absent.toString()} icon={<X size={20} className="text-red-500" />} subValue="Non justifiés" />
                <AnalyticCard label="Retards" value={attendanceStats.late.toString()} icon={<Clock size={20} className="text-amber-500"/>} subValue="Signalés" />
              </div>

              {/* STUDENTS ATTENDANCE LIST */}
              <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
                <div className="px-8 py-6 border-b border-slate-50 flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-[1000] text-[#002366]">Registre de présence</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                      {classes.find(c => c.id === selectedClass)?.nom} — {new Date(selectedDate).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  </div>
                </div>

                {loading ? (
                  <div className="flex justify-center py-20">
                    <Loader2 size={40} className="animate-spin text-[#002366]" />
                  </div>
                ) : (students ?? []).length === 0 ? (
                  <div className="text-center py-20">
                    <p className="text-slate-400">Aucun étudiant trouvé pour cette configuration</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-slate-50/50">
                          <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">N°</th>
                          <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Étudiant</th>
                          <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Statut Actuel</th>
                          <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Actions d'Émargement</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {students.map((student, idx) => {
                          const currentStatus = student.attendance_status || student.status;
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
                              <td className="px-6 py-4 text-center">
                                <span className={`inline-flex items-center justify-center px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider ${
                                  currentStatus === 'present' ? 'bg-emerald-50 text-emerald-600' :
                                  currentStatus === 'absent' ? 'bg-red-50 text-red-600' :
                                  currentStatus === 'late' ? 'bg-amber-50 text-amber-600' : 'bg-slate-100 text-slate-400'
                                }`}>
                                  {currentStatus === 'present' ? 'Présent' :
                                   currentStatus === 'absent' ? 'Absent' :
                                   currentStatus === 'late' ? 'En Retard' : 'Non Saisi'}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center justify-center gap-2">
                                  <button
                                    onClick={() => updateAttendanceStatus(student.id, 'present')}
                                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                                      currentStatus === 'present' 
                                      ? 'bg-emerald-500 text-white' 
                                      : 'bg-slate-50 text-slate-600 hover:bg-emerald-50 hover:text-emerald-600'
                                    }`}
                                  >
                                    <Check size={14} /> Présent
                                  </button>
                                  <button
                                    onClick={() => updateAttendanceStatus(student.id, 'absent')}
                                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                                      currentStatus === 'absent' 
                                      ? 'bg-red-500 text-white' 
                                      : 'bg-slate-50 text-slate-600 hover:bg-red-50 hover:text-red-600'
                                    }`}
                                  >
                                    <X size={14} /> Absent
                                  </button>
                                  <button
                                    onClick={() => updateAttendanceStatus(student.id, 'late')}
                                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                                      currentStatus === 'late' 
                                      ? 'bg-amber-500 text-white' 
                                      : 'bg-slate-50 text-slate-600 hover:bg-amber-50 hover:text-amber-600'
                                    }`}
                                  >
                                    <Clock size={14} /> Retard
                                  </button>
                                </div>
                              </td>
                            </motion.tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
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

export default AttendancePage;