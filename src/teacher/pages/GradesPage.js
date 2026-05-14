import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calculator, UploadCloud, ChevronDown, 
  FileSpreadsheet, AlertCircle, ArrowUpRight,
  BookOpen, Layers
} from 'lucide-react';

import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const GradesPage = () => {
  const fileInputRef = useRef(null);
  const [activeClass, setActiveClass] = useState("Mathématiques 10-A");
  
  // Example class list
  const classes = ["Mathématiques 10-A", "Physique 12-B", "Algèbre 10-C", "Géométrie 11-A"];

  const [students] = useState([
    { id: '#202401', name: 'Alumni Anderson', type: 'Étudiant Régulier', quiz: 14, assignment: 22, midterm: 54, average: '90.0%', status: 'A', initial: 'AA', color: 'blue' },
    { id: '#202405', name: 'Bella Miller', type: 'Boursier', quiz: 12, assignment: 20, midterm: 48, average: '80.0%', status: 'B', initial: 'BM', color: 'indigo' },
    { id: '#202412', name: 'Charlie Davis', type: 'Étudiant Régulier', quiz: null, assignment: 18, midterm: 40, average: 'En attente', status: 'N/A', initial: 'CD', color: 'slate' },
    { id: '#202418', name: 'Emily Fisher', type: 'Programme d’échange', quiz: 10, assignment: 15, midterm: 32, average: '57.0%', status: 'F', initial: 'EF', color: 'red' },
  ]);

  const handleExcelClick = () => {
    fileInputRef.current.click();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Fichier sélectionné:", file.name);
      // Here you would typically use a library like 'xlsx' to parse the data
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar />

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Navbar />
        
        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">

          {/* CLASS SELECTOR TABS */}
          <div className="flex gap-2 mb-8 bg-slate-100/50 p-1.5 rounded-[24px] w-fit border border-slate-200/50">
            {classes.map((cls) => (
              <button
                key={cls}
                onClick={() => setActiveClass(cls)}
                className={`px-6 py-2.5 rounded-[18px] text-[11px] font-black uppercase tracking-wider transition-all ${
                  activeClass === cls 
                  ? 'bg-white text-[#002366] shadow-sm ring-1 ring-slate-200' 
                  : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {cls}
              </button>
            ))}
          </div>

          {/* HEADER */}
          <header className="mb-8 flex justify-between items-start">
            <motion.div 
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Layers size={14} className="text-blue-600" />
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">
                   Gestion des Notes <span className="text-[#002366] ml-1">/ {activeClass}</span>
                </p>
              </div>

              <h1 className="text-4xl font-[1000] text-[#002366] tracking-tighter">
                Carnet de Notes
              </h1>

              <p className="text-slate-400 font-bold text-[13px] mt-1 italic">
                Saisie manuelle ou import de fichiers Excel (.xlsx)
              </p>
            </motion.div>

            <div className="flex gap-3">
              {/* HIDDEN INPUT */}
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileUpload} 
                accept=".xlsx, .xls" 
                className="hidden" 
              />

              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleExcelClick}
                className="group flex items-center gap-3 px-7 py-4 bg-white border-2 border-dashed border-slate-200 rounded-[22px] text-[12px] font-black text-[#002366] uppercase tracking-widest hover:border-emerald-400 hover:bg-emerald-50/30 transition-all shadow-sm"
              >
                <FileSpreadsheet size={18} className="text-emerald-500 group-hover:scale-110 transition-transform" />
                Importer Notes Excel
              </motion.button>

              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center gap-3 px-8 py-4 bg-[#002366] text-white rounded-[22px] font-black text-[12px] shadow-2xl shadow-blue-900/30 transition-all uppercase tracking-wider"
              >
                <UploadCloud size={18} className="group-hover:-translate-y-1 transition-transform" />
                Publier les Notes
              </motion.button>
            </div>
          </header>

          {/* ANALYTICS (Same as before) */}
          <div className="grid grid-cols-12 gap-6 mb-8">
            <AnalyticCard 
              colSpan="col-span-3"
              label="Moyenne de Classe"
              value="78.4%"
              trend="+2.1%"
              subValue={`SUR ${activeClass.toUpperCase()}`}
            />

            <AnalyticCard 
              colSpan="col-span-3"
              label="Taux de Réussite"
              value="92.0%"
              trend="Stable"
              subValue="23 SUR 25 ÉTUDIANTS"
            />

            <motion.div 
              whileHover={{ y: -5 }}
              className="col-span-6 bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex flex-col justify-between transition-all"
            >
              <div className="flex justify-between items-center mb-4">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Répartition Statistique</p>
                <button className="group text-[10px] font-black text-blue-600 uppercase tracking-widest flex items-center gap-1">
                  Analytique <ArrowUpRight size={12} />
                </button>
              </div>
              <div className="flex items-end justify-around h-16 px-4">
                {[ { l: 'A', h: '60%' }, { l: 'B', h: '85%' }, { l: 'C', h: '40%' }, { l: 'D', h: '20%' }, { l: 'F', h: '10%' }].map((bar, i) => (
                  <div key={i} className="flex flex-col items-center gap-2 w-full">
                    <motion.div 
                      initial={{ height: 0 }} 
                      animate={{ height: bar.h }} 
                      className={`w-8 rounded-t-md ${bar.l === 'F' ? 'bg-red-400' : 'bg-[#002366]'}`}
                      style={{ opacity: 1 - i * 0.15 }}
                    />
                    <span className="text-[9px] font-black text-slate-400">{bar.l}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* TABLE SECTION */}
          <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-50 flex justify-between items-center">
              <div className="flex gap-4">
                <FilterButton label="Tous les Étudiants" />
                <FilterButton label="Trier par Performance" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                <span className="text-[11px] font-bold text-slate-400 italic">Cloud synchronisé...</span>
              </div>
            </div>

            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Nom Étudiant</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">ID</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Quiz 1</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Devoir</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Examen</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Moyenne Finale</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {students.map((s, idx) => (
                  <motion.tr key={idx} whileHover={{ backgroundColor: '#F8FAFC' }} className="group transition-colors">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl bg-${s.color}-50 text-${s.color}-600 flex items-center justify-center text-[10px] font-black border border-${s.color}-100`}>
                          {s.initial}
                        </div>
                        <div>
                          <p className="text-sm font-[1000] text-[#002366]">{s.name}</p>
                          <p className="text-[9px] font-bold text-slate-400 uppercase">{s.type}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-xs font-bold text-slate-500">{s.id}</td>
                    <td className="px-8 py-5 text-center font-black text-slate-700">{s.quiz || '--'}</td>
                    <td className="px-8 py-5 text-center font-black text-slate-700">{s.assignment}</td>
                    <td className="px-8 py-5 text-center font-black text-slate-700">{s.midterm}</td>
                    <td className={`px-8 py-5 font-black ${s.average === '57.0%' ? 'text-red-500' : 'text-[#002366]'}`}>
                      {s.average}
                    </td>
                    <td className="px-8 py-5 text-center">
                      <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-[10px] font-black ${
                        s.status === 'A' ? 'bg-emerald-50 text-emerald-500' : 
                        s.status === 'B' ? 'bg-blue-50 text-blue-500' : 
                        s.status === 'F' ? 'bg-red-50 text-red-500' : 'bg-slate-50 text-slate-400'
                      }`}>
                        {s.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* BOTTOM SUMMARY */}
          <div className="mt-8 flex justify-between items-center">
            <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex items-center gap-8">
              <div className="flex gap-6 items-center px-2">
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Moyenne Globale</p>
                  <p className="text-xl font-[1000] text-[#002366]">15.4/20</p>
                </div>
                <div className="h-8 w-px bg-slate-100"></div>
                <AlertCircle size={18} className="text-orange-400" />
                <p className="text-[11px] font-bold text-slate-500 max-w-[200px]">
                  Un étudiant n'a pas encore de note pour l'examen de mi-session.
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
        </main>
      </div>
    </div>
  );
};

/* REUSABLE SUB COMPONENTS */

const AnalyticCard = ({ label, value, trend, subValue, colSpan }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className={`${colSpan} bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm transition-all`}
  >
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">{label}</p>
    <div className="flex items-baseline gap-3 mb-1">
      <h3 className="text-3xl font-[1000] text-[#002366]">{value}</h3>
      <span className={`text-[11px] font-black ${trend.includes('+') ? 'text-emerald-500' : 'text-slate-300'}`}>
        {trend}
      </span>
    </div>
    <p className="text-[9px] font-black text-slate-300 uppercase tracking-tighter">{subValue}</p>
  </motion.div>
);

const FilterButton = ({ label }) => (
  <button className="group flex items-center gap-4 px-5 py-2.5 bg-white border border-slate-100 rounded-xl text-[11px] font-[1000] text-[#002366] hover:bg-slate-50 transition-all">
    {label}
    <ChevronDown size={14} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
  </button>
);

export default GradesPage;