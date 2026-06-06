import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Printer, Download, Play, Clock, 
  Users, MapPin, ChevronLeft, ChevronRight, Share2
} from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import Navbar from './Navbar';
import api from './api';

// ── Mapping jours français → anglais ────────────────────────────────────────
const JOUR_MAP = {
  'Lundi':    'Monday',
  'Mardi':    'Tuesday',
  'Mercredi': 'Wednesday',
  'Jeudi':    'Thursday',
  'Vendredi': 'Friday',
  'Samedi':   'Saturday',
};

// ── Couleurs auto (cycle) ───────────────────────────────────────────────────
const COLORS = [
  'border-l-[#002366] bg-blue-50/40 text-[#002366]',
  'border-l-orange-400 bg-orange-50/40 text-orange-700',
  'border-l-purple-400 bg-purple-50/40 text-purple-700',
  'border-l-emerald-400 bg-emerald-50/40 text-emerald-700',
  'border-l-indigo-400 bg-indigo-50/40 text-indigo-700',
  'border-l-rose-400 bg-rose-50/40 text-rose-700',
  'border-l-cyan-400 bg-cyan-50/40 text-cyan-700',
];

// ── Time slots ───────────────────────────────────────────────────────────────
const TIME_SLOTS = [
  '08:00', '09:00', '10:00', '11:00', '12:00', 
  '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
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
  const index = TIME_SLOTS.findIndex(slot => slot === heureDebut);
  return index !== -1 ? index : null;
};

const getSessionDuration = (heureDebut, heureFin) => {
  if (!heureDebut || !heureFin) return 1;
  const startIdx = TIME_SLOTS.findIndex(slot => slot === heureDebut);
  const endIdx = TIME_SLOTS.findIndex(slot => slot === heureFin);
  if (startIdx === -1 || endIdx === -1) return 1;
  return Math.max(1, endIdx - startIdx);
};

const Timetable = () => {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const timetableRef = useRef(null);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await api.get('/student/timetable');
        console.log("Data jaya mn Laravel:", response.data);

        let raw = [];
        if (Array.isArray(response.data)) {
          raw = response.data;
        } else if (response.data?.data && Array.isArray(response.data.data)) {
          raw = response.data.data;
        } else if (response.data?.all && Array.isArray(response.data.all)) {
          raw = response.data.all;
        }

        const normalized = raw.map((item, idx) => ({
          ...item,
          day: item.jour || item.day,
          subject: item.cours || item.matiere?.nom || item.subject || 'Cours',
          teacher: item.professeur_nom || item.enseignant?.nom_complet || item.teacher || 'Professeur',
          room: item.salle_nom || item.salle?.nom || item.room || 'Salle',
          heure_debut: item.heure_debut || '08:00',
          heure_fin: item.heure_fin || '10:00',
          color_index: idx % COLORS.length,
        }));

        setSchedule(normalized);
        setLoading(false);
      } catch (error) {
        console.error("Erreur timetable:", error);
        setLoading(false);
      }
    };

    fetchSchedule();
  }, []);

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

  // ─── Impression ───────────────────────────────────────────────────────────
  const handlePrint = () => {
    const printContent = document.getElementById('timetable-print');
    if (!printContent) return;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Emploi du Temps - Amity School</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: 'Inter', sans-serif; padding: 20px; background: white; color: #1E293B; }
            table { width: 100%; border-collapse: collapse; font-size: 9px; }
            th, td { border: 1px solid #CBD5E1; padding: 6px 4px; text-align: center; vertical-align: middle; }
            th { background: #002366; color: white; font-weight: 900; font-size: 8px; }
            .day-cell { background: #F8FAFC; font-weight: 900; font-size: 9px; color: #002366; width: 70px; }
            .row-label { background: #F1F5F9; font-size: 8px; color: #64748B; font-weight: 700; width: 55px; }
            .session-cell { background: #EFF6FF; color: #1E3A8A; font-weight: 700; }
            .header-row { background: #002366; }
            .print-title { text-align:center; font-size:16px; font-weight:900; color:#002366; margin-bottom:16px; }
          </style>
        </head>
        <body>
          <div class="print-title">Emploi du Temps — Amity School</div>
          ${printContent.outerHTML}
          <p style="text-align:center;font-size:8px;color:#94A3B8;margin-top:16px;">Généré le ${new Date().toLocaleDateString('fr-FR')}</p>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  // ─── Export PDF ─────────────────────────────────────────────────────────
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
      pdf.save(`Emploi_du_Temps_${new Date().toLocaleDateString('fr-FR')}.pdf`);
    } catch (error) {
      console.error('Erreur PDF:', error);
      alert('Erreur lors de la génération du PDF');
    } finally {
      setExporting(false);
    }
  };

  // ─── Partage ─────────────────────────────────────────────────────────────
  const handleShare = async () => {
    const shareData = {
      title: 'Emploi du Temps - Amity School',
      text: 'Voici mon emploi du temps hebdomadaire',
      url: window.location.href,
    };
    
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Partage annulé ou erreur:', err);
      }
    } else {
      const element = document.getElementById('timetable-export');
      if (element) {
        const canvas = await html2canvas(element, { scale: 1 });
        canvas.toBlob(async (blob) => {
          try {
            await navigator.clipboard.write([
              new ClipboardItem({ [blob.type]: blob })
            ]);
            alert('📋 Emploi du temps copié dans le presse-papier (image)');
          } catch (err) {
            alert('Partage non disponible sur ce navigateur');
          }
        });
      }
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

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center font-black text-[#002366] bg-[#F8FAFC]">
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ repeat: Infinity, duration: 1 }}
          className="w-12 h-12 border-4 border-[#002366] border-t-transparent rounded-full"
        />
      </div>
    );
  }

  const grid = buildGrid();

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans text-[#1E293B]">
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
                <h1 className="text-3xl md:text-[40px] font-black text-[#002366] leading-none mb-3">Emploi du Temps</h1>
                <p className="text-slate-400 font-bold text-xs md:text-sm uppercase tracking-widest">Semestre 2 • Semaine 14 • Printemps 2024</p>
              </div>
              <div className="flex gap-3 w-full md:w-auto flex-wrap">
                <motion.button 
                  whileHover={{ scale: 1.05, backgroundColor: "#FFF7ED", color: "#EA580C", borderColor: "#FED7AA" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePrint}
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-slate-500 shadow-sm transition-all uppercase"
                >
                  <Printer className="w-4 h-4" /> Imprimer
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05, backgroundColor: "#1E3A8A" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleExportPDF}
                  disabled={exporting}
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-3 bg-[#002366] text-white rounded-xl text-[10px] font-black shadow-lg transition-all uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {exporting ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Download className="w-4 h-4" />
                  )}
                  {exporting ? 'Génération...' : 'Exporter PDF'}
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05, backgroundColor: "#F1F5F9" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleShare}
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-slate-500 shadow-sm transition-all uppercase"
                >
                  <Share2 className="w-4 h-4" /> Partager
                </motion.button>
              </div>
            </motion.div>

            {/* ── Timetable Body ── */}
            <div id="timetable-export" ref={timetableRef}>
              <motion.div variants={cardVariants} className="bg-white rounded-[30px] md:rounded-[40px] p-6 md:p-10 border border-slate-100 shadow-2xl shadow-slate-200/40 mb-10 overflow-x-auto">
                <table id="timetable-print" className="w-full min-w-[900px] border-collapse text-[11px] font-sans">
                  <thead>
                    <tr>
                      <th colSpan={2} className="border border-slate-300 bg-[#002366] text-white text-[10px] font-black px-2 py-2 text-center">
                        Jour / Heure
                      </th>
                      {TIME_SLOTS.map((slot, idx) => (
                        <th key={idx} className="border border-slate-300 bg-[#002366] text-white text-[9px] font-black px-1 py-2 text-center whitespace-nowrap">
                          {slot}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {DAY_ORDER.map((day, dayIdx) => {
                      const daySlots = grid[day];
                      const rowLabels = ['Module', 'Formateur', 'Salle'];
                      return rowLabels.map((label, rowIdx) => (
                        <tr key={`${day}-${rowIdx}`}>
                          {rowIdx === 0 && (
                            <td rowSpan={3} className="border border-slate-300 bg-[#EFF6FF] text-[#002366] font-black text-[11px] text-center px-2 py-1 whitespace-nowrap">
                              {DAY_LABELS_FR[day]}
                            </td>
                          )}
                          <td className="border border-slate-300 bg-[#F8FAFC] text-slate-500 font-bold text-[9px] px-2 py-1 whitespace-nowrap">
                            {label}
                          </td>
                          {daySlots.map((cell, slotIdx) => {
                            if (cell === 'merged') return null;
                            const session = cell ? cell.session : null;
                            const colSpan = cell ? cell.colSpan : 1;
                            const cellValue = session
                              ? rowIdx === 0
                                ? session.subject
                                : rowIdx === 1
                                ? session.teacher
                                : session.room
                              : '';
                            const colorIdx = session ? session.color_index : 0;
                            const colorClass = COLORS[colorIdx % COLORS.length] || COLORS[0];
                            const parts = colorClass.split(' ');
                            const bgColor = parts[1] || '';
                            const textColor = parts[2] || '';
                            return (
                              <td key={slotIdx} colSpan={colSpan} className={`border border-slate-200 px-2 py-1 text-center text-[9px] font-semibold ${session ? bgColor : ''} ${session ? textColor : 'text-slate-300'}`}>
                                {cellValue}
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

            {/* ── Bottom Insight Row ── */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-10 no-print">
              <motion.div variants={cardVariants} whileHover={{ scale: 1.02 }} className="md:col-span-12 lg:col-span-3 bg-[#002366] rounded-[30px] md:rounded-[40px] p-8 text-white shadow-xl flex items-center justify-between group cursor-pointer">
                <div>
                  <p className="text-[9px] font-black opacity-40 uppercase tracking-widest mb-4">En cours</p>
                  <h4 className="text-xl font-black mb-1 group-hover:text-orange-400 transition-colors">Calcul Différentiel</h4>
                  <p className="text-xs font-bold opacity-60">Salle 12-B • 15 min restantes</p>
                </div>
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-white/5 group-hover:bg-orange-500 transition-all">
                  <Play className="w-5 h-5" fill="currentColor" />
                </div>
              </motion.div>

              <motion.div variants={cardVariants} className="md:col-span-12 lg:col-span-4 bg-white rounded-[30px] md:rounded-[40px] p-8 border border-slate-100 flex items-center justify-between group shadow-sm">
                <div>
                  <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-4">Charge Hebdomadaire</p>
                  <h4 className="text-4xl font-black text-[#002366]">32 <span className="text-[10px] text-slate-300 ml-1">H/SEM</span></h4>
                </div>
                <div className="text-right flex flex-col items-end">
                  <span className="text-[9px] font-black text-emerald-500 uppercase bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100">Optimal</span>
                  <div className="mt-5 w-24 h-2 bg-slate-50 rounded-full overflow-hidden">
                    <motion.div initial={{width:0}} animate={{width: '72%'}} className="h-full bg-[#002366] group-hover:bg-orange-500 transition-all" />
                  </div>
                </div>
              </motion.div>

              <motion.div variants={cardVariants} className="md:col-span-12 lg:col-span-5 bg-white rounded-[30px] md:rounded-[40px] p-8 border border-slate-100 flex items-center gap-6 group shadow-sm">
                <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500 group-hover:bg-[#002366] group-hover:text-white transition-all">
                  <Users className="w-7 h-7" />
                </div>
                <div className="flex-1">
                  <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">Consultation</p>
                  <h4 className="text-lg font-black text-[#002366]">2 Rendez-vous en attente</h4>
                  <button className="text-[10px] font-black text-orange-500 uppercase mt-1 hover:translate-x-1 transition-transform">Voir le planning →</button>
                </div>
              </motion.div>
            </div>

            {/* ── Legend ── */}
            <motion.div variants={cardVariants} className="bg-white/40 backdrop-blur-sm border border-slate-100 rounded-[24px] p-6 flex flex-wrap gap-6 justify-center no-print">
              <div className="flex items-center gap-2 group cursor-default">
                <div className="w-2.5 h-2.5 rounded-full bg-[#002366]" />
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Sciences</span>
              </div>
              <div className="flex items-center gap-2 group cursor-default">
                <div className="w-2.5 h-2.5 rounded-full bg-orange-400" />
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Maths</span>
              </div>
              <div className="flex items-center gap-2 group cursor-default">
                <div className="w-2.5 h-2.5 rounded-full bg-purple-400" />
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Langues</span>
              </div>
              <div className="flex items-center gap-2 group cursor-default">
                <div className="w-2.5 h-2.5 rounded-full bg-indigo-400" />
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Social</span>
              </div>
              <div className="flex items-center gap-2 group cursor-default">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Arts</span>
              </div>
              <div className="flex items-center gap-2 group cursor-default">
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Sport</span>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Timetable;