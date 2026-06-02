import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Printer, Download, Play, Clock, 
  Users, MapPin, ChevronLeft, ChevronRight, Share2,
  BookOpen, Calendar, Bell, Filter, Search, GraduationCap,
  X
} from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import API from '../../services/api';

// ── Mapping days french → english ────────────────────────────────────────
const JOUR_MAP = {
  'Lundi':    'Monday',
  'Mardi':    'Tuesday',
  'Mercredi': 'Wednesday',
  'Jeudi':    'Thursday',
  'Vendredi': 'Friday',
  'Samedi':   'Saturday',
};

// ── Time slots ───────────────────────────────────────────────────────────────
const TIME_SLOTS = [
  '08H30','09H30','10H30','11H30','12H30','13H30','14H30','15H30','16H30','17H30','18H30'
];

const DAY_ORDER = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const DAY_LABELS_FR = {
  Monday: 'LUNDI',
  Tuesday: 'MARDI',
  Wednesday: 'MERCREDI',
  Thursday: 'JEUDI',
  Friday: 'VENDREDI',
  Saturday: 'SAMEDI',
};

// ── Find which time slot a session belongs to ────────────────────────────────
const getSessionSlot = (heureDebut) => {
  if (!heureDebut) return null;
  const [h, m] = heureDebut.split(':').map(Number);
  const totalMin = h * 60 + m;
  const slotMinutes = TIME_SLOTS.map(t => {
    const [sh, sm] = t.replace('H',':').split(':').map(Number);
    return sh * 60 + sm;
  });
  for (let i = 0; i < slotMinutes.length - 1; i++) {
    if (totalMin >= slotMinutes[i] && totalMin < slotMinutes[i + 1]) return i;
  }
  return null;
};

const getSessionDuration = (heureDebut, heureFin) => {
  if (!heureDebut || !heureFin) return 1;
  const [h1, m1] = heureDebut.split(':').map(Number);
  const [h2, m2] = heureFin.split(':').map(Number);
  const mins = (h2 * 60 + m2) - (h1 * 60 + m1);
  return Math.max(1, Math.round(mins / 60));
};

const EmploiDuTemps = () => {
  const [schedule, setSchedule] = useState([]);
  const [allSchedule, setAllSchedule] = useState([]);
  const [filieres, setFilieres] = useState([]);
  const [matieres, setMatieres] = useState([]);
  const [selectedFiliere, setSelectedFiliere] = useState('');
  const [selectedMatiere, setSelectedMatiere] = useState('');
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const timetableRef = useRef(null);
  const [teacherInfo, setTeacherInfo] = useState({
    name: '',
    subject: '',
    department: ''
  });

  useEffect(() => {
    fetchTeacherInfo();
    fetchFilieres();
    fetchAllSchedule();
  }, []);

  useEffect(() => {
    if (selectedFiliere) {
      fetchMatieres();
    }
  }, [selectedFiliere]);

  // ✅ IMPORTANT: Filter logic - only filter when BOTH are selected
  useEffect(() => {
    if (selectedFiliere && selectedMatiere) {
      filterSchedule();
    } else {
      // ✅ Show full timetable when no filter or only filiere selected
      setSchedule(allSchedule);
    }
  }, [selectedFiliere, selectedMatiere, allSchedule]);

  const fetchTeacherInfo = async () => {
    try {
      const response = await API.get('/teacher/info');
      setTeacherInfo(response.data);
    } catch (error) {
      console.error("Erreur chargement infos enseignant:", error);
      setTeacherInfo({
        name: 'Prof. Martin',
        subject: 'Physique Avancée',
        department: 'Sciences'
      });
    }
  };

  const fetchFilieres = async () => {
    try {
      const response = await API.get('/filieres');
      setFilieres(response.data.data || response.data || []);
    } catch (error) {
      console.error("Erreur chargement filières:", error);
      setFilieres([
        { id: 1, nom: 'Sciences Mathématiques' },
        { id: 2, nom: 'Sciences Physiques' },
        { id: 3, nom: 'Sciences Economiques' },
        { id: 4, nom: 'Lettres' }
      ]);
    }
  };

  const fetchMatieres = async () => {
    try {
      const response = await API.get(`/filieres/${selectedFiliere}/matieres`);
      setMatieres(response.data);
    } catch (error) {
      console.error("Erreur chargement matières:", error);
      setMatieres([
        { id: 1, nom: 'Mathématiques' },
        { id: 2, nom: 'Physique' },
        { id: 3, nom: 'Chimie' }
      ]);
    }
  };

  const fetchAllSchedule = async () => {
    try {
      setLoading(true);
      const weekStart = getWeekStart(currentWeek);
      const response = await API.get(`/teacher/timetable/all?week=${weekStart}`);
      
      let raw = [];
      if (Array.isArray(response.data)) {
        raw = response.data;
      } else if (typeof response.data === 'object' && response.data !== null) {
        raw = Object.values(response.data).flat();
      }

      const normalized = raw.map((item, idx) => ({
        ...item,
        id: idx,
        day: JOUR_MAP[item.jour] || item.day || item.jour,
        subject: item.cours || item.subject,
        teacher: item.professeur_nom || item.teacher,
        room: item.salle_nom || item.room,
        class_name: item.classe_nom || item.class_name,
        filiere_id: item.filiere_id,
        matiere_id: item.matiere_id
      }));

      setAllSchedule(normalized);
      setSchedule(normalized); // ✅ Initially show full timetable
      setLoading(false);
    } catch (error) {
      console.error("Erreur timetable:", error);
      // Fallback data for all courses (teacher's complete schedule)
      const fallbackSchedule = [
        { id: 1, day: 'Monday', subject: 'Mathématiques', teacher: 'Prof. Martin', room: 'Salle 101', class_name: '10A', heure_debut: '08H30', heure_fin: '10H30', filiere_id: 1, matiere_id: 1 },
        { id: 2, day: 'Monday', subject: 'Physique', teacher: 'Prof. Martin', room: 'Labo 302', class_name: '10B', heure_debut: '10H30', heure_fin: '12H30', filiere_id: 2, matiere_id: 2 },
        { id: 3, day: 'Tuesday', subject: 'Chimie', teacher: 'Prof. Martin', room: 'Labo 101', class_name: '11A', heure_debut: '08H30', heure_fin: '10H30', filiere_id: 2, matiere_id: 3 },
        { id: 4, day: 'Wednesday', subject: 'Mathématiques', teacher: 'Prof. Martin', room: 'Salle 101', class_name: '10B', heure_debut: '10H30', heure_fin: '12H30', filiere_id: 1, matiere_id: 1 },
        { id: 5, day: 'Thursday', subject: 'Physique', teacher: 'Prof. Martin', room: 'Labo 302', class_name: '11A', heure_debut: '13H30', heure_fin: '15H30', filiere_id: 2, matiere_id: 2 },
        { id: 6, day: 'Friday', subject: 'Mathématiques', teacher: 'Prof. Martin', room: 'Salle 101', class_name: '11B', heure_debut: '09H30', heure_fin: '11H30', filiere_id: 1, matiere_id: 1 }
      ];
      setAllSchedule(fallbackSchedule);
      setSchedule(fallbackSchedule);
      setLoading(false);
    }
  };

  const filterSchedule = () => {
    // ✅ Only filter when both filiere and matiere are selected
    const filtered = allSchedule.filter(item => 
      item.filiere_id == selectedFiliere && 
      item.matiere_id == selectedMatiere
    );
    setSchedule(filtered);
  };

  const clearFilters = () => {
    setSelectedFiliere('');
    setSelectedMatiere('');
    setMatieres([]);
    setSchedule(allSchedule); // ✅ Back to full timetable
  };

  const getWeekStart = (date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff)).toISOString().split('T')[0];
  };

  const changeWeek = (direction) => {
    const newDate = new Date(currentWeek);
    newDate.setDate(currentWeek.getDate() + (direction * 7));
    setCurrentWeek(newDate);
    fetchAllSchedule();
  };

  // ── Build grid: for each day × slot, find session ──────────────────────────
  const buildGrid = () => {
    const grid = {};
    DAY_ORDER.forEach(day => {
      grid[day] = Array(TIME_SLOTS.length - 1).fill(null);
    });

    schedule.forEach((session) => {
      const day = session.day;
      if (!grid[day]) return;
      const slotIdx = getSessionSlot(session.heure_debut);
      if (slotIdx === null) return;
      const span = getSessionDuration(session.heure_debut, session.heure_fin);
      grid[day][slotIdx] = { session, colSpan: span };
      for (let i = 1; i < span && slotIdx + i < grid[day].length; i++) {
        grid[day][slotIdx + i] = 'merged';
      }
    });

    return grid;
  };

  // ─── Print function ───────────────────────────────────────────────
  const handlePrint = () => {
    const printContent = document.getElementById('timetable-print');
    if (!printContent) return;
    
    const matiereNom = matieres.find(m => m.id == selectedMatiere)?.nom || '';
    const filiereNom = filieres.find(f => f.id == selectedFiliere)?.nom || '';
    const title = selectedMatiere ? `${matiereNom} - ${filiereNom}` : 'Emploi du Temps Complet';
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Emploi du Temps - ${title} - Amity School</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: 'Inter', sans-serif; padding: 20px; background: white; color: #1E293B; }
            table { width: 100%; border-collapse: collapse; font-size: 9px; }
            th, td { border: 1px solid #CBD5E1; padding: 6px 4px; text-align: center; vertical-align: middle; }
            th { background: #002366; color: white; font-weight: 900; font-size: 8px; }
            .print-title { text-align:center; font-size:16px; font-weight:900; color:#002366; margin-bottom:16px; }
            .print-subtitle { text-align:center; font-size:12px; color:#64748B; margin-bottom:24px; }
          </style>
        </head>
        <body>
          <div class="print-title">Emploi du Temps Enseignant</div>
          <div class="print-subtitle">${title} • ${teacherInfo.name}</div>
          ${printContent.outerHTML}
          <p style="text-align:center;font-size:8px;color:#94A3B8;margin-top:16px;">Généré le ${new Date().toLocaleDateString('fr-FR')}</p>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  // ─── Export PDF function ───────────────────────────────────────────────
  const handleExportPDF = async () => {
    const element = document.getElementById('timetable-export');
    if (!element) return;
    
    setExporting(true);
    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
        useCORS: true
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });
      
      const imgWidth = 280;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
      const fileName = selectedMatiere ? 
        `Emploi_du_Temps_${matieres.find(m => m.id == selectedMatiere)?.nom}_${new Date().toLocaleDateString('fr-FR')}` :
        `Emploi_du_Temps_Complet_${new Date().toLocaleDateString('fr-FR')}`;
      pdf.save(`${fileName}.pdf`);
    } catch (error) {
      console.error('Erreur PDF:', error);
      alert('Erreur lors de la génération du PDF');
    } finally {
      setExporting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { type: "spring", stiffness: 120, damping: 20 } 
    }
  };

  const weekStart = getWeekStart(currentWeek);
  const weekEnd = new Date(currentWeek);
  weekEnd.setDate(weekEnd.getDate() + 6);
  const weekRange = `${new Date(weekStart).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })} - ${weekEnd.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}`;

  const matiereNom = matieres.find(m => m.id == selectedMatiere)?.nom || '';
  const filiereNom = filieres.find(f => f.id == selectedFiliere)?.nom || '';

  if (loading) {
    return (
      <div className="flex min-h-screen bg-[#F8FAFC]">
        <Sidebar />
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          <Navbar />
          <main className="flex-1 overflow-y-auto p-10">
            <div className="flex justify-center items-center h-96">
              <div className="w-12 h-12 border-4 border-[#002366] border-t-transparent rounded-full animate-spin" />
            </div>
          </main>
        </div>
      </div>
    );
  }

  const grid = buildGrid();
  const totalHours = schedule.reduce((total, session) => {
    return total + getSessionDuration(session.heure_debut, session.heure_fin);
  }, 0);

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans text-[#1E293B]">
      <Sidebar />

      <main className="flex-1 flex flex-col min-w-0">
        <Navbar />

        <div className="flex-1 overflow-y-auto p-4 md:p-10">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-[1600px] mx-auto"
          >
            {/* ── Header ── */}
            <motion.div variants={cardVariants} className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Calendar size={18} className="text-blue-600" />
                  <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">
                    Emploi du Temps Enseignant
                  </p>
                </div>
                <h1 className="text-3xl md:text-4xl font-black text-[#002366] leading-none mb-2">
                  {selectedMatiere ? matiereNom : 'Mon Emploi du Temps'}
                </h1>
                {selectedMatiere ? (
                  <p className="text-slate-500 text-sm font-medium">
                    {filiereNom} • {teacherInfo.name}
                  </p>
                ) : (
                  <p className="text-slate-500 text-sm font-medium">
                    {teacherInfo.name} • {teacherInfo.department}
                  </p>
                )}
                <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">
                  Semaine du {weekRange}
                </p>
              </div>

              <div className="flex gap-3 w-full md:w-auto flex-wrap">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePrint}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-slate-500 shadow-sm transition-all"
                >
                  <Printer size={16} /> Imprimer
                </motion.button>

                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleExportPDF}
                  disabled={exporting}
                  className="flex items-center gap-2 px-5 py-2 bg-[#002366] text-white rounded-xl text-[10px] font-black shadow-lg transition-all disabled:opacity-50"
                >
                  {exporting ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Download size={16} />
                  )}
                  {exporting ? 'Génération...' : 'Exporter PDF'}
                </motion.button>
              </div>
            </motion.div>

            {/* ── Filière et Matière Selectors ── */}
            <motion.div variants={cardVariants} className="bg-white rounded-2xl p-6 mb-8 border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-black text-[#002366]">Filtrer par matière (optionnel)</h3>
                {selectedMatiere && (
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-1 text-xs font-bold text-red-500 hover:text-red-600 transition-colors"
                  >
                    <X size={14} /> Voir tout l'emploi du temps
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[11px] font-[1000] text-slate-400 uppercase tracking-[0.2em] mb-2 ml-1">
                    Filière
                  </label>
                  <div className="relative">
                    <select
                      value={selectedFiliere}
                      onChange={(e) => {
                        setSelectedFiliere(e.target.value);
                        setSelectedMatiere('');
                      }}
                      className="w-full appearance-none px-5 py-3 bg-slate-50 border-2 border-slate-100 focus:border-[#002366] rounded-xl outline-none transition-all text-[#002366] font-bold cursor-pointer"
                    >
                      <option value="">Toutes les filières</option>
                      {filieres.map(f => (
                        <option key={f.id} value={f.id}>{f.nom}</option>
                      ))}
                    </select>
                    <GraduationCap size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-[1000] text-slate-400 uppercase tracking-[0.2em] mb-2 ml-1">
                    Matière
                  </label>
                  <div className="relative">
                    <select
                      value={selectedMatiere}
                      onChange={(e) => setSelectedMatiere(e.target.value)}
                      disabled={!selectedFiliere}
                      className="w-full appearance-none px-5 py-3 bg-slate-50 border-2 border-slate-100 focus:border-[#002366] rounded-xl outline-none transition-all text-[#002366] font-bold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <option value="">Sélectionner une matière</option>
                      {matieres.map(m => (
                        <option key={m.id} value={m.id}>{m.nom}</option>
                      ))}
                    </select>
                    <BookOpen size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Week Navigation */}
            <motion.div variants={cardVariants} className="flex justify-end mb-6">
              <div className="flex items-center gap-2 bg-white rounded-xl border border-slate-200 p-1">
                <button
                  onClick={() => changeWeek(-1)}
                  className="p-2 hover:bg-slate-50 rounded-lg transition-colors"
                >
                  <ChevronLeft size={18} />
                </button>
                <span className="text-[10px] font-black text-[#002366] px-2">Semaine précédente</span>
                <button
                  onClick={() => changeWeek(1)}
                  className="p-2 hover:bg-slate-50 rounded-lg transition-colors"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </motion.div>

            {/* ── Timetable Body ── */}
            {schedule.length === 0 ? (
              <motion.div variants={cardVariants} className="bg-white rounded-[40px] p-12 text-center border border-slate-100">
                <Clock size={48} className="mx-auto text-slate-300 mb-4" />
                <h3 className="text-xl font-black text-[#002366] mb-2">Aucun cours trouvé</h3>
                <p className="text-slate-400">
                  {selectedMatiere 
                    ? `Aucun cours programmé pour ${matiereNom} cette semaine`
                    : 'Aucun cours programmé cette semaine'}
                </p>
              </motion.div>
            ) : (
              <div id="timetable-export" ref={timetableRef}>
                <motion.div variants={cardVariants} className="bg-white rounded-[30px] md:rounded-[40px] p-6 md:p-8 border border-slate-100 shadow-2xl shadow-slate-200/40 mb-8 overflow-x-auto">
                  <table id="timetable-print" className="w-full min-w-[1000px] border-collapse">
                    <thead>
                      <tr>
                        <th colSpan={2} className="border border-slate-300 bg-[#002366] text-white text-[10px] font-black px-2 py-3 text-center rounded-tl-xl">
                          Jour / Heure
                        </th>
                        {TIME_SLOTS.map((slot, idx) => (
                          <th key={idx} className="border border-slate-300 bg-[#002366] text-white text-[9px] font-black px-2 py-3 text-center whitespace-nowrap">
                            {slot}
                          </th>
                        ))}
                        </tr>
                    </thead>
                      

                    <tbody>
                      {DAY_ORDER.map((day) => {
                        const daySlots = grid[day];
                        const rowLabels = ['Module', 'Classe', 'Salle'];

                        return rowLabels.map((label, rowIdx) => (
                          <tr key={`${day}-${rowIdx}`}>
                            {rowIdx === 0 && (
                              <td rowSpan={3} className="border border-slate-300 bg-[#EFF6FF] text-[#002366] font-black text-[11px] text-center px-3 py-2 whitespace-nowrap">
                                {DAY_LABELS_FR[day]}
                              </td>
                            )}

                            <td className="border border-slate-300 bg-[#F8FAFC] text-slate-500 font-bold text-[9px] px-3 py-2 whitespace-nowrap">
                              {label}
                            </td>

                            {daySlots.map((cell, slotIdx) => {
                              if (cell === 'merged') return null;

                              const session = cell ? cell.session : null;
                              const colSpan = cell ? cell.colSpan : 1;

                              let cellValue = '';
                              if (session) {
                                if (rowIdx === 0) cellValue = session.subject;
                                else if (rowIdx === 1) cellValue = session.class_name;
                                else cellValue = session.room;
                              }

                              const bgColor = session ? 'bg-blue-50' : '';
                              const textColor = session ? 'text-[#002366]' : 'text-slate-300';
                              const fontWeight = session && rowIdx === 0 ? 'font-black' : 'font-semibold';

                              return (
                                <td key={slotIdx} colSpan={colSpan} className={`border border-slate-200 px-2 py-2 text-center text-[9px] ${fontWeight} ${bgColor} ${textColor} transition-colors`}>
                                  {cellValue || '—'}
                                </td>
                              );
                            })}
                          </tr>
                        ));
                      })}
                    </tbody>
                  </table>
                </motion.div>
              </div>
            )}

            {/* ── Stats Cards ── */}
            {schedule.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <motion.div variants={cardVariants} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                      <BookOpen size={22} className="text-[#002366]" />
                    </div>
                    <span className="text-2xl font-black text-[#002366]">{schedule.length}</span>
                  </div>
                  <h4 className="font-black text-[#002366] mb-1">Cours cette semaine</h4>
                  <p className="text-xs text-slate-400">Total des sessions planifiées</p>
                </motion.div>

                <motion.div variants={cardVariants} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center">
                      <Clock size={22} className="text-emerald-500" />
                    </div>
                    <span className="text-2xl font-black text-[#002366]">{totalHours}h</span>
                  </div>
                  <h4 className="font-black text-[#002366] mb-1">Charge horaire</h4>
                  <p className="text-xs text-slate-400">Heures d'enseignement par semaine</p>
                </motion.div>
              </div>
            )}

            {/* Info Card */}
            {schedule.length > 0 && (
              <motion.div variants={cardVariants} className="bg-gradient-to-r from-[#002366] to-[#1a4480] rounded-2xl p-6 mb-8 text-white">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <p className="text-[10px] font-black opacity-60 uppercase tracking-widest mb-2">
                      {selectedMatiere ? 'Matière enseignée' : 'Résumé'}
                    </p>
                    <h3 className="text-2xl font-black">
                      {selectedMatiere ? matiereNom : `Total: ${new Set(schedule.map(s => s.subject)).size} matières`}
                    </h3>
                    {selectedMatiere && (
                      <p className="text-sm opacity-80 mt-1">{filiereNom}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-[10px] font-black opacity-60 uppercase tracking-widest mb-1">Classes</p>
                      <p className="text-lg font-black">{new Set(schedule.map(s => s.class_name)).size}</p>
                    </div>
                    <div className="w-px h-10 bg-white/20"></div>
                    <div className="text-right">
                      <p className="text-[10px] font-black opacity-60 uppercase tracking-widest mb-1">Enseignant</p>
                      <p className="text-lg font-black">{teacherInfo.name?.split(' ')[0]}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default EmploiDuTemps;