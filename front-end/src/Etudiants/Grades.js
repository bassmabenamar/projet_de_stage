import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import { 
  TrendingUp, Calendar, Filter, Plus, 
  BookOpen, Beaker, Landmark, Languages, 
  Atom, FileText, Table
} from 'lucide-react';

import Navbar from './Navbar';
import api from './api';

const Grades = () => {
  const [activeSemester, setActiveSemester] = useState(1);
  const [subjects, setSubjects] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [exportingExcel, setExportingExcel] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/student/grades');
        setSubjects(response.data.subjects);
        setAssessments(response.data.assessments);
        setLoading(false);
      } catch (error) {
        console.error("Erreur Fetching Grades:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // PDF PRO AVEC STYLE (MZYAN)
  const handleDownloadCleanPDF = async () => {
    setExporting(true);
    
    const printContent = document.createElement('div');
    printContent.style.padding = '30px';
    printContent.style.backgroundColor = '#ffffff';
    printContent.style.fontFamily = "'Segoe UI', 'Arial', sans-serif";
    printContent.style.width = '800px';
    printContent.style.margin = '0 auto';
    
    printContent.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        * { font-family: 'Inter', 'Segoe UI', Arial, sans-serif; }
      </style>
      
      <div style="text-align: center; margin-bottom: 35px; border-bottom: 3px solid #FF7A00; padding-bottom: 25px;">
        <div style="background: linear-gradient(135deg, #002366 0%, #001a4d 100%); color: white; padding: 20px; border-radius: 16px; margin-bottom: 20px;">
          <h1 style="margin: 0; font-size: 28px; font-weight: 800; letter-spacing: -0.5px;">🏫 Amity School</h1>
          <p style="margin: 8px 0 0 0; opacity: 0.9; font-size: 14px;">Excellence Académique</p>
        </div>
        <h2 style="color: #FF7A00; margin: 15px 0 10px 0; font-size: 24px; font-weight: 700;">Bulletin de Notes</h2>
        <p style="color: #555; margin: 5px 0; font-size: 14px; font-weight: 500;">Semestre ${activeSemester} • Année académique 2024/2025</p>
        <p style="color: #888; font-size: 11px; margin-top: 10px;">📅 Généré le ${new Date().toLocaleDateString('fr-FR')}</p>
      </div>
      
      <div style="margin-bottom: 35px;">
        <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 16px; padding: 20px; border-left: 5px solid #FF7A00;">
          <h3 style="color: #002366; margin: 0 0 15px 0; font-size: 16px; font-weight: 700;">📊 Récapitulatif</h3>
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px;">
            <div style="background: white; padding: 12px; border-radius: 12px; text-align: center;">
              <div style="font-size: 11px; color: #888; text-transform: uppercase; font-weight: 600;">Moyenne (GPA)</div>
              <div style="font-size: 28px; font-weight: 800; color: #002366;">3.82</div>
              <div style="font-size: 12px; color: #FF7A00;">/ 4.0</div>
            </div>
            <div style="background: white; padding: 12px; border-radius: 12px; text-align: center;">
              <div style="font-size: 11px; color: #888; text-transform: uppercase; font-weight: 600;">Crédits obtenus</div>
              <div style="font-size: 28px; font-weight: 800; color: #002366;">18.0</div>
            </div>
            <div style="background: white; padding: 12px; border-radius: 12px; text-align: center;">
              <div style="font-size: 11px; color: #888; text-transform: uppercase; font-weight: 600;">Présence</div>
              <div style="font-size: 28px; font-weight: 800; color: #4CAF50;">98.2%</div>
            </div>
            <div style="background: white; padding: 12px; border-radius: 12px; text-align: center;">
              <div style="font-size: 11px; color: #888; text-transform: uppercase; font-weight: 600;">Matières</div>
              <div style="font-size: 28px; font-weight: 800; color: #002366;">${subjects.length}</div>
            </div>
          </div>
        </div>
      </div>
      
      <div style="margin-bottom: 35px;">
        <h3 style="color: #002366; margin: 0 0 15px 0; font-size: 16px; font-weight: 700;">📚 Performance par matière</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
          <thead>
            <tr style="background: linear-gradient(135deg, #002366 0%, #001a4d 100%); color: white;">
              <th style="padding: 14px 12px; text-align: left;">Matière</th>
              <th style="padding: 14px 12px; text-align: left;">Professeur</th>
              <th style="padding: 14px 12px; text-align: center;">Note</th>
              <th style="padding: 14px 12px; text-align: center;">Mi-parcours</th>
              <th style="padding: 14px 12px; text-align: center;">Final</th>
              <th style="padding: 14px 12px; text-align: center;">Crédits</th>
              <th style="padding: 14px 12px; text-align: center;">Progression</th>
             </tr>
          </thead>
          <tbody>
            ${subjects.map((sub, idx) => `
              <tr style="border-bottom: 1px solid #e5e7eb; background-color: ${idx % 2 === 0 ? '#ffffff' : '#f9fafb'};">
                <td style="padding: 12px; font-weight: 700; color: #002366;">${sub.name}</td>
                <td style="padding: 12px; color: #555;">${sub.prof}</td>
                <td style="padding: 12px; text-align: center; font-weight: 800; color: #FF7A00; font-size: 16px;">${sub.grade}</td>
                <td style="padding: 12px; text-align: center;">${sub.midterm}</td>
                <td style="padding: 12px; text-align: center;">${sub.final}</td>
                <td style="padding: 12px; text-align: center; font-weight: 600;">${sub.credits}</td>
                <td style="padding: 12px; text-align: center;">
                  <div style="background-color: #e5e7eb; border-radius: 20px; overflow: hidden; width: 100px; margin: 0 auto;">
                    <div style="background: linear-gradient(90deg, #002366, #FF7A00); width: ${sub.progress}%; padding: 4px 0; color: white; font-size: 10px; font-weight: 600;">${sub.progress}%</div>
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
      
      <div style="margin-bottom: 35px;">
        <h3 style="color: #002366; margin: 0 0 15px 0; font-size: 16px; font-weight: 700;">📝 Évaluations récentes</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
          <thead>
            <tr style="background: linear-gradient(135deg, #002366 0%, #001a4d 100%); color: white;">
              <th style="padding: 14px 12px; text-align: left;">Date</th>
              <th style="padding: 14px 12px; text-align: left;">Matière</th>
              <th style="padding: 14px 12px; text-align: left;">Évaluation</th>
              <th style="padding: 14px 12px; text-align: center;">Score</th>
              <th style="padding: 14px 12px; text-align: center;">Statut</th>
             </tr>
          </thead>
          <tbody>
            ${assessments.map((ass, idx) => `
              <tr style="border-bottom: 1px solid #e5e7eb; background-color: ${idx % 2 === 0 ? '#ffffff' : '#f9fafb'};">
                <td style="padding: 12px; color: #666;">${ass.date}</td>
                <td style="padding: 12px; font-weight: 600; color: #002366;">${ass.subject}</td>
                <td style="padding: 12px; color: #555;">${ass.type}</td>
                <td style="padding: 12px; text-align: center; font-weight: 800; color: #FF7A00;">${ass.score}</td>
                <td style="padding: 12px; text-align: center;">
                  <span style="display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 700; ${ass.statusColor === 'emerald' ? 'background-color: #d1fae5; color: #065f46;' : 'background-color: #dbeafe; color: #1e40af;'}">
                    ${ass.status}
                  </span>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
      
      <div style="margin-top: 40px; text-align: center; border-top: 2px solid #e5e7eb; padding-top: 20px;">
        <p style="font-size: 10px; color: #aaa; margin: 0;">Amity School - Document officiel</p>
      </div>
    `;
    
    document.body.appendChild(printContent);
    
    try {
      const canvas = await html2canvas(printContent, {
        scale: 2.5,
        backgroundColor: '#ffffff',
        logging: false,
        useCORS: true,
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;
      
      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pdf.internal.pageSize.height;
      
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pdf.internal.pageSize.height;
      }
      
      pdf.save(`Bulletin_Notes_${new Date().toLocaleDateString('fr-FR')}.pdf`);
    } catch (error) {
      console.error('Erreur PDF:', error);
      alert('Erreur lors de la génération du PDF');
    } finally {
      document.body.removeChild(printContent);
      setExporting(false);
    }
  };

  // EXCEL
  const handleDownloadGradesTable = () => {
    setExportingExcel(true);
    try {
      const gradesData = subjects.map(sub => ({
        "📚 Matière": sub.name,
        "👨‍🏫 Professeur": sub.prof,
        "📊 Note": sub.grade,
        "📝 Mi-parcours": sub.midterm,
        "🏁 Examen Final": sub.final,
        "🎓 Crédits": sub.credits,
        "📈 Progression": `${sub.progress}%`
      }));

      const ws = XLSX.utils.json_to_sheet(gradesData);
      
      ws['!cols'] = [
        { wch: 25 }, { wch: 20 }, { wch: 12 }, 
        { wch: 15 }, { wch: 15 }, { wch: 10 }, { wch: 15 }
      ];
      
      XLSX.utils.sheet_add_aoa(ws, [
        [`BULLETIN DE NOTES - Semestre ${activeSemester}`],
        [`Généré le : ${new Date().toLocaleDateString('fr-FR')}`],
        [`Moyenne (GPA): 3.82/4.0 | Crédits: 18.0 | Présence: 98.2%`],
        []
      ], { origin: "A1" });

      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Notes par matière");
      XLSX.writeFile(wb, `Notes_Semestre${activeSemester}_${new Date().toISOString().slice(0,10)}.xlsx`);
    } catch (error) {
      console.error('Erreur Excel:', error);
      alert('Erreur lors de la génération du fichier Excel');
    } finally {
      setExportingExcel(false);
    }
  };

  const getIcon = (name) => {
    const n = name.toLowerCase();
    if (n.includes('math')) return { icon: <BookOpen />, color: 'blue' };
    if (n.includes('scien')) return { icon: <Beaker />, color: 'orange' };
    if (n.includes('hist')) return { icon: <Landmark />, color: 'purple' };
    if (n.includes('phys')) return { icon: <Atom />, color: 'purple' };
    return { icon: <Languages />, color: 'blue' };
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  if (loading) return <div className="flex min-h-screen items-center justify-center font-black text-[#002366]">Chargement...</div>;

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans text-[#1E293B]">
      <main className="flex-1 flex flex-col relative overflow-hidden">
        <Navbar />

        <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-[1400px] mx-auto"
          >
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
              <motion.div variants={cardVariants}>
                <h1 className="text-3xl md:text-[36px] font-black text-[#002366] tracking-tight mb-2">Performance Académique</h1>
                <p className="text-slate-400 font-medium max-w-xl text-sm md:text-base">
                  Consultez et téléchargez vos rapports de notes complets pour l'année académique en cours.
                </p>
              </motion.div>
              
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDownloadCleanPDF}
                  disabled={exporting}
                  className="w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-3 bg-[#FF7A00] text-white rounded-2xl font-bold shadow-lg shadow-orange-200 transition-all disabled:opacity-50"
                >
                  {exporting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <FileText size={18} />
                  )}
                  {exporting ? 'Génération...' : 'Télécharger PDF'}
                </motion.button>

                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDownloadGradesTable}
                  disabled={exportingExcel}
                  className="w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-3 bg-green-600 text-white rounded-2xl font-bold shadow-lg shadow-green-200 transition-all disabled:opacity-50"
                >
                  {exportingExcel ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Table size={18} />
                  )}
                  {exportingExcel ? 'Génération...' : 'Télécharger Excel'}
                </motion.button>
              </div>
            </div>

            {/* GPA & Semester Stats Row */}
            <div className="grid grid-cols-12 gap-6 md:gap-8 mb-12">
              <GPAStatsCard gpa="3.82" percentile="Top 5%" />
              
              <div className="col-span-12 lg:col-span-8 bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm relative">
                <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-4">
                  <div className="flex bg-slate-100 p-1.5 rounded-2xl gap-2 relative w-full sm:w-auto">
                    <SemesterTab active={activeSemester === 1} onClick={() => setActiveSemester(1)} label="Semestre 1" />
                    <SemesterTab active={activeSemester === 2} onClick={() => setActiveSemester(2)} label="Semestre 2" />
                  </div>
                  <div className="flex items-center gap-2 text-slate-400 font-bold text-[10px] uppercase tracking-widest bg-slate-50 px-4 py-2 rounded-xl">
                    <Calendar size={14} className="text-[#002366]" /> Automne 2023 - Printemps 2024
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                  <MiniStat label="Matières suivies" value={subjects.length.toString().padStart(2, '0')} />
                  <MiniStat label="Crédits obtenus" value="18.0" />
                  <MiniStat label="Taux de présence" value="98.2%" highlight />
                </div>
              </div>
            </div>

            {/* Subject Performance Grid */}
            <div className="mb-12">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-black text-[#002366]">Performance par matière</h2>
                <button className="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-[#002366] transition-all shadow-sm">
                  <Filter size={20} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {subjects.map((sub) => {
                  const meta = getIcon(sub.name);
                  return (
                    <SubjectCard 
                      key={sub.id}
                      icon={meta.icon} 
                      name={sub.name} 
                      prof={sub.prof} 
                      grade={sub.grade} 
                      progress={sub.progress} 
                      midterm={sub.midterm} 
                      final={sub.final} 
                      credits={sub.credits} 
                      color={meta.color} 
                    />
                  );
                })}
                
                <motion.div 
                  whileHover={{ y: -10, borderColor: '#002366' }}
                  className="border-2 border-dashed border-slate-200 rounded-[32px] flex flex-col items-center justify-center p-10 group cursor-pointer transition-all min-h-[300px]"
                >
                  <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-blue-50 group-hover:text-[#002366] transition-all mb-4">
                    <Plus size={32} />
                  </div>
                  <h4 className="font-black text-[#002366] mb-2">Ajouter une option</h4>
                  <p className="text-[11px] text-slate-400 text-center font-medium mb-6">Explorez et inscrivez-vous aux cours du Semestre 2</p>
                  <span className="text-xs font-black text-[#002366] uppercase tracking-widest border-b-2 border-[#002366] pb-1">Parcourir le catalogue</span>
                </motion.div>
              </div>
            </div>

            {/* Recent Assessment Results Table */}
            <div className="bg-white rounded-[32px] p-6 md:p-10 border border-slate-100 shadow-sm overflow-hidden">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-xl font-black text-[#002366]">Résultats récents</h2>
                <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">Voir tout</button>
              </div>

              <div className="overflow-x-auto w-full no-scrollbar">
                <table className="w-full min-w-[600px]">
                  <thead>
                    <tr className="text-left text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] border-b border-slate-50">
                      <th className="pb-6">Date</th>
                      <th className="pb-6">Matière</th>
                      <th className="pb-6">Évaluation</th>
                      <th className="pb-6">Score</th>
                      <th className="pb-6 text-right">Statut</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm font-bold text-[#1E293B]">
                    {assessments.map((item, idx) => (
                      <AssessmentRow 
                        key={idx}
                        date={item.date} 
                        subject={item.subject} 
                        type={item.type} 
                        score={item.score} 
                        status={item.status} 
                        statusColor={item.statusColor} 
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

// COMPOSANTS (NFS L9DAM)
const GPAStatsCard = ({ gpa, percentile }) => (
  <motion.div whileHover={{ y: -5 }} className="col-span-12 lg:col-span-4 bg-white rounded-[32px] p-8 md:p-10 border border-slate-100 shadow-sm relative overflow-hidden group">
    <div className="flex justify-between items-start mb-10">
      <h3 className="text-lg font-black text-[#002366]">Moyenne Actuelle (GPA)</h3>
      <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity }} className="text-orange-500">
        <TrendingUp size={24} />
      </motion.div>
    </div>
    <div className="flex items-baseline gap-2 mb-8">
      <span className="text-[54px] md:text-[64px] font-black text-[#002366] leading-none">{gpa}</span>
      <span className="text-slate-300 font-bold text-xl">/ 4.0</span>
    </div>
    <div className="space-y-3">
      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
        <span className="text-slate-400">Rang centile</span>
        <span className="text-[#002366]">{percentile}</span>
      </div>
      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
        <motion.div initial={{ width: 0 }} animate={{ width: '95%' }} transition={{ duration: 1.5, ease: "easeOut" }} className="h-full bg-gradient-to-r from-blue-600 to-blue-900 rounded-full" />
      </div>
    </div>
  </motion.div>
);

const SemesterTab = ({ active, onClick, label }) => (
  <button onClick={onClick} className="relative flex-1 sm:flex-none px-8 py-2 rounded-xl text-[11px] font-black z-10 transition-all overflow-hidden">
    {active && (
      <motion.div layoutId="active-sem-bg" className="absolute inset-0 bg-white shadow-md rounded-xl -z-10" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />
    )}
    <span className={active ? 'text-[#002366]' : 'text-slate-400 hover:text-slate-500'}>{label}</span>
  </button>
);

const SubjectCard = ({ icon, name, prof, grade, progress, midterm, final, credits, color }) => {
  const accent = color === 'blue' ? 'text-blue-600 bg-blue-50' : color === 'orange' ? 'text-orange-500 bg-orange-50' : 'text-purple-600 bg-purple-50';
  const bar = color === 'blue' ? 'bg-blue-900' : color === 'orange' ? 'bg-orange-500' : 'bg-purple-600';
  return (
    <motion.div whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,35,102,0.05)" }} className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm group h-full">
      <div className="flex justify-between items-start mb-8">
        <div className="flex gap-4">
          <motion.div whileHover={{ rotateY: 180 }} className={`w-12 h-12 rounded-2xl flex items-center justify-center ${accent} shadow-inner`}>
            {icon}
          </motion.div>
          <div>
            <h4 className="text-sm font-black text-[#002366]">{name}</h4>
            <p className="text-[10px] text-slate-400 font-bold italic">{prof}</p>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-lg text-[10px] font-black ${accent}`}>{grade}</div>
      </div>
      <div className="mb-8">
        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-2">
          <span className="text-slate-300">Progression</span>
          <span className="text-[#002366]">{progress}%</span>
        </div>
        <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
          <motion.div initial={{ width: 0 }} whileInView={{ width: `${progress}%` }} transition={{ duration: 1 }} className={`h-full ${bar} rounded-full`} />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 text-center pt-4 border-t border-slate-50">
        <ScoreBox label="Mi-parcours" value={midterm} />
        <ScoreBox label="Final" value={final} />
        <ScoreBox label="Crédits" value={credits} />
      </div>
    </motion.div>
  );
};

const ScoreBox = ({ label, value }) => (
  <div>
    <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest mb-1">{label}</p>
    <p className="text-xs md:text-sm font-black text-[#002366]">{value}</p>
  </div>
);

const MiniStat = ({ label, value, highlight }) => (
  <div className="text-center sm:text-left">
    <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-2">{label}</p>
    <p className={`text-2xl font-black ${highlight ? 'text-orange-500' : 'text-[#002366]'}`}>{value}</p>
  </div>
);

const AssessmentRow = ({ date, subject, type, score, status, statusColor }) => (
  <motion.tr initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors group">
    <td className="py-6 text-slate-400 text-xs">{date}</td>
    <td className="py-6 text-blue-900 font-black">{subject}</td>
    <td className="py-6 text-slate-500 text-xs">{type}</td>
    <td className="py-6 text-[#002366] font-black">{score}</td>
    <td className="py-6 text-right">
      <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${statusColor === 'emerald' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
        {status}
      </span>
    </td>
  </motion.tr>
);

export default Grades;