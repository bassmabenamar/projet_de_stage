import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, CheckCircle, Clock, BarChart3, 
  Download, Send, Eye, FileText, 
  X, Check
} from 'lucide-react';

import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const SubmissionsPage = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Données des étudiants
  const students = [
    { id: 'MTH-2024-01', name: 'Alex Bennett', date: '22 Oct 2023', status: '2 jours avant', file: 'algebra_hw_final.pdf', grade: 'EN ATTENTE', initial: 'AB', color: 'blue' },
    { id: 'MTH-2024-02', name: 'Chloe Miller', date: '23 Oct 2023', status: '1 jour avant', file: 'homework_chloe.pdf', grade: '92/100', initial: 'CM', color: 'orange', img: 'https://i.pravatar.cc/150?u=chloe' },
    { id: 'MTH-2024-03', name: 'Daniel Cooper', date: '24 Oct 2023', status: 'À temps', file: 'Cooper_Unit3.pdf', grade: 'EN ATTENTE', initial: 'DC', color: 'purple' },
  ];

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar />

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Navbar />

        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          
          {/* Header */}
          <div className="mb-8 flex justify-between items-end">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">
                Mathématiques {'>'} Algèbre Avancée {'>'} Soumissions
              </p>

              <h1 className="text-3xl font-[1000] text-[#002366] tracking-tighter">
                Soumissions des devoirs
              </h1>

              <p className="text-slate-400 font-bold text-sm mt-1">
                Devoir : Équations Linéaires & Suites Géométriques (Date limite : 24 Oct)
              </p>
            </motion.div>
            
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-black text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
                <Download size={16} /> Exporter Tout
              </button>

              <button className="flex items-center gap-2 px-6 py-3 bg-[#002366] text-white rounded-2xl font-black text-sm shadow-xl shadow-blue-900/20 hover:scale-105 transition-all">
                <Send size={16} /> Envoyer un rappel
              </button>
            </div>
          </div>

          {/* Statistiques */}
          <div className="grid grid-cols-4 gap-6 mb-10">
            <StatBox label="Total Étudiants" value="32" sub="Classe 12-A" icon={<Users size={20}/>} />

            <StatBox 
              label="Soumis" 
              value="28" 
              sub="88% Complété" 
              icon={<CheckCircle size={20}/>} 
            />

            <StatBox 
              label="Notes en attente" 
              value="12" 
              sub="Action requise" 
              icon={<Clock size={20}/>} 
              color="orange" 
            />

            <StatBox 
              label="Moyenne Générale" 
              value="84.5%" 
              sub="+2.4%" 
              icon={<BarChart3 size={20}/>} 
            />
          </div>

          {/* Tableau + panneau */}
          <div className="flex gap-8 items-start">
            
            {/* Tableau */}
            <motion.div 
              layout
              className={`bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden transition-all duration-500 ${
                selectedStudent ? 'w-3/5' : 'w-full'
              }`}
            >
              <table className="w-full text-left">
                <thead className="bg-slate-50/50 border-b border-slate-100">
                  <tr>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Étudiant
                    </th>

                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Date de soumission
                    </th>

                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Fichier
                    </th>

                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">
                      Note
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-50">
                  {students.map((student) => (
                    <motion.tr 
                      key={student.id}
                      whileHover={{ backgroundColor: "#F8FAFC" }}
                      onClick={() => setSelectedStudent(student)}
                      className={`cursor-pointer transition-colors ${
                        selectedStudent?.id === student.id ? 'bg-blue-50/50' : ''
                      }`}
                    >
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          {student.img ? (
                            <img 
                              src={student.img}
                              className="w-10 h-10 rounded-xl object-cover border-2 border-white shadow-sm"
                              alt=""
                            />
                          ) : (
                            <div className={`w-10 h-10 rounded-xl bg-${student.color}-50 text-${student.color}-600 flex items-center justify-center font-black text-xs`}>
                              {student.initial}
                            </div>
                          )}

                          <div>
                            <p className="text-sm font-[1000] text-[#002366]">
                              {student.name}
                            </p>

                            <p className="text-[10px] font-bold text-slate-400 tracking-tighter uppercase">
                              ID : #{student.id}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-8 py-6">
                        <p className="text-sm font-bold text-slate-600">
                          {student.date}
                        </p>

                        <p className={`text-[10px] font-black uppercase tracking-tight ${
                          student.status.includes('avant')
                            ? 'text-emerald-500'
                            : 'text-slate-400'
                        }`}>
                          {student.status}
                        </p>
                      </td>

                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2 text-slate-400">
                          <FileText size={16} className="text-orange-400" />

                          <span className="text-xs font-bold truncate max-w-[120px]">
                            {student.file}
                          </span>
                        </div>
                      </td>

                      <td className="px-8 py-6 text-right">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest ${
                          student.grade === 'EN ATTENTE'
                            ? 'bg-orange-50 text-orange-600'
                            : 'bg-emerald-50 text-emerald-600'
                        }`}>
                          {student.grade}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>

            {/* Panneau d’évaluation */}
            <AnimatePresence>
              {selectedStudent && (
                <motion.div 
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  className="w-2/5 bg-white rounded-[40px] border border-slate-100 shadow-2xl p-8 sticky top-0"
                >
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      <h2 className="text-xl font-[1000] text-[#002366]">
                        Évaluation
                      </h2>

                      <p className="text-xs font-bold text-slate-400 mt-1">
                        {selectedStudent.name} • {selectedStudent.file}
                      </p>
                    </div>

                    <button 
                      onClick={() => setSelectedStudent(null)}
                      className="p-2 hover:bg-slate-100 rounded-xl transition-all"
                    >
                      <X size={20} className="text-slate-300" />
                    </button>
                  </div>

                  {/* Visionneuse */}
                  <div className="w-full aspect-[3/4] bg-slate-900 rounded-[32px] relative overflow-hidden group cursor-pointer mb-8">
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white/40 group-hover:text-white transition-all">
                      <Eye size={48} className="mb-4 group-hover:scale-110 transition-transform" />

                      <p className="text-xs font-black uppercase tracking-widest">
                        Cliquer pour ouvrir
                      </p>

                      <p className="text-[10px] font-bold opacity-50 mt-2">
                        ANALYSE DU DOCUMENT ACTIVE
                      </p>
                    </div>

                    <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                      <div className="flex justify-between items-center">
                        <div className="flex gap-2">
                          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />

                          <span className="text-[10px] font-black text-white uppercase tracking-widest">
                            Page 1 sur 4
                          </span>
                        </div>

                        <Download size={16} className="text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Formulaire */}
                  <div className="space-y-6">

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          Note
                        </label>

                        <div className="relative">
                          <input 
                            type="number"
                            placeholder="0"
                            className="w-full px-6 py-4 bg-slate-50 rounded-2xl font-[1000] text-[#002366] outline-none border-2 border-transparent focus:border-[#002366] transition-all"
                          />

                          <span className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 font-bold">
                            / 100
                          </span>
                        </div>
                      </div>

                      <div className="flex items-end pb-1 gap-2">
                        <button className="flex-1 py-4 bg-slate-50 rounded-2xl text-[10px] font-black text-slate-400 hover:text-[#002366] transition-all">
                          Excellent travail !
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Commentaire du professeur
                      </label>

                      <textarea 
                        rows={3}
                        placeholder="Écrire un commentaire constructif..."
                        className="w-full px-6 py-4 bg-slate-50 rounded-2xl font-bold text-sm text-[#002366] outline-none border-2 border-transparent focus:border-[#002366] transition-all resize-none shadow-inner"
                      />
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-blue-50/50 rounded-2xl">
                      <input 
                        type="checkbox"
                        className="w-4 h-4 rounded border-slate-300 text-[#002366] focus:ring-0"
                      />

                      <span className="text-xs font-bold text-[#002366]/70 tracking-tight">
                        Notifier l’étudiant par email et portail
                      </span>
                    </div>

                    <button className="w-full py-5 bg-[#002366] text-white rounded-3xl font-[1000] text-sm uppercase tracking-widest shadow-2xl shadow-blue-900/40 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3">
                      <Check size={20} /> Publier la note
                    </button>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
};

// StatBox
const StatBox = ({ label, value, sub, icon, color = 'blue' }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white p-6 rounded-[32px] border border-slate-100 flex items-center justify-between shadow-sm group cursor-pointer"
  >
    <div>
      <p className="text-[10px] font-[1000] text-slate-400 uppercase tracking-[0.2em] mb-1">
        {label}
      </p>

      <h3 className="text-2xl font-[1000] text-[#002366] leading-none mb-2">
        {value}
      </h3>

      <p className="text-[10px] font-black text-slate-300 uppercase tracking-tighter">
        {sub}
      </p>
    </div>

    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110 ${
      color === 'orange'
        ? 'bg-orange-50 text-orange-600 shadow-orange-100'
        : 'bg-blue-50 text-blue-600 shadow-blue-100'
    } shadow-lg`}>
      {icon}
    </div>
  </motion.div>
);

export default SubmissionsPage;