import React from 'react';
import { motion } from 'framer-motion';
import { 
  Folder, MoreVertical, FileText, Video, Link, 
  HardDrive, Plus, Upload, FolderPlus, Grid, 
  List, Eye, Download, Trash2
} from 'lucide-react';

import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const PageRessources = () => {

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar />

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Navbar />

        <main className="flex-1 overflow-y-auto p-10 custom-scrollbar">
          
          {/* HEADER */}
          <header className="flex justify-between items-end mb-10">
            <motion.div 
              initial={{ x: -20, opacity: 0 }} 
              animate={{ x: 0, opacity: 1 }}
            >
              <h1 className="text-3xl font-[1000] text-[#002366] tracking-tighter">
                Ressources
              </h1>

              <p className="text-slate-400 font-bold text-sm mt-1">
                Gérez les supports de cours, les documents et les contenus multimédias.
              </p>
            </motion.div>
            
            <div className="flex gap-4">
              <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-black text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
                <FolderPlus size={18} /> Nouveau dossier
              </button>

              <button className="flex items-center gap-2 px-8 py-4 bg-[#002366] text-white rounded-[22px] font-black text-sm shadow-xl shadow-blue-900/20 hover:scale-105 transition-all">
                <Upload size={18} /> Télécharger des fichiers
              </button>
            </div>
          </header>

          {/* STATISTIQUES */}
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
          >
            <StatCard 
              icon={<HardDrive size={22}/>} 
              label="Stockage utilisé" 
              value="12.4 GB" 
              sub="50GB Total" 
              color="blue" 
            />

            <StatCard 
              icon={<FileText size={22}/>} 
              label="Documents PDF" 
              value="142" 
              sub="Fichiers" 
              color="orange" 
            />

            <StatCard 
              icon={<Video size={22}/>} 
              label="Contenus vidéo" 
              value="28" 
              sub="Vidéos" 
              color="green" 
            />

            <StatCard 
              icon={<Link size={22}/>} 
              label="Liens partagés" 
              value="15" 
              sub="Actifs" 
              color="purple" 
            />
          </motion.div>

          {/* DOSSIERS */}
          <section className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-[1000] text-[#002366]">
                Dossiers des classes
              </h2>

              <button className="text-blue-600 text-xs font-black uppercase tracking-widest hover:underline transition-all">
                Voir tout
              </button>
            </div>
            
            <motion.div 
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-4 gap-6"
            >
              <FolderCard 
                name="Physique avancée (AP-101)" 
                files="24" 
                date="il y a 2 jours" 
                students={3} 
              />

              <FolderCard 
                name="Littérature classique (ENG-204)" 
                files="18" 
                date="il y a 1 semaine" 
                students={2} 
              />

              <FolderCard 
                name="Histoire moderne (HIST-302)" 
                files="35" 
                date="il y a 3 semaines" 
                students={4} 
              />

              <FolderCard 
                name="Archives 2023" 
                files="1.2 GB" 
                date="15 Décembre" 
                isPrivate 
              />
            </motion.div>
          </section>

          {/* TABLEAU */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-[1000] text-[#002366]">
                Téléchargements récents
              </h2>

              <div className="flex bg-slate-100 p-1 rounded-xl">
                <button className="p-2 bg-white rounded-lg shadow-sm text-[#002366]">
                  <List size={16}/>
                </button>

                <button className="p-2 text-slate-400">
                  <Grid size={16}/>
                </button>
              </div>
            </div>

            <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
              <table className="w-full text-left border-collapse">
                
                <thead className="bg-slate-50/50 border-b border-slate-100">
                  <tr>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Nom du fichier
                    </th>

                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">
                      Classe
                    </th>

                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Taille
                    </th>

                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Dernière modification
                    </th>

                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-50">
                  <FileRow 
                    name="Notes_Cours_Mecanique_Quantique.pdf" 
                    classTag="AP-101" 
                    size="4.2 MB" 
                    time="il y a 2 heures" 
                    color="blue" 
                  />

                  <FileRow 
                    name="Demonstration_Laboratoire_Semaine_4.mp4" 
                    classTag="AP-101" 
                    size="128 MB" 
                    time="Hier" 
                    color="green" 
                  />

                  <FileRow 
                    name="Liste_Lectures_Semestre_2.docx" 
                    classTag="ENG-204" 
                    size="842 KB" 
                    time="12 Janvier" 
                    color="orange" 
                  />
                </tbody>

              </table>
            </div>
          </section>
        </main>

        {/* BOUTON FLOTTANT */}
        <motion.button 
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-10 right-10 w-16 h-16 bg-orange-600 text-white rounded-full flex items-center justify-center shadow-2xl shadow-orange-600/40 z-50"
        >
          <Plus size={32} />
        </motion.button>
      </div>
    </div>
  );
};

/* --- COMPOSANTS --- */

const StatCard = ({ icon, label, value, sub, color }) => (
  <motion.div 
    variants={{ hidden: { opacity: 0, scale: 0.9 }, show: { opacity: 1, scale: 1 } }}
    whileHover={{ y: -5 }}
    className="bg-white p-6 rounded-[32px] border border-slate-100 flex items-center gap-5 transition-all cursor-pointer group"
  >
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
      color === 'blue' ? 'bg-blue-50 text-blue-600' : 
      color === 'orange' ? 'bg-orange-50 text-orange-600' : 
      color === 'green' ? 'bg-emerald-50 text-emerald-600' : 
      'bg-purple-50 text-purple-600'
    }`}>
      {icon}
    </div>

    <div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
        {label}
      </p>

      <h3 className="text-xl font-black text-[#002366] mt-1">
        {value} 
        <span className="text-slate-300 font-bold text-xs"> / {sub}</span>
      </h3>
    </div>
  </motion.div>
);

const FolderCard = ({ name, files, date, isPrivate, students }) => (
  <motion.div 
    whileHover={{ y: -8 }}
    className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm relative group cursor-pointer"
  >
    <div className="flex justify-between items-start mb-10">
      <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white">
        <Folder size={24} fill="white" />
      </div>

      <button className="text-slate-300 hover:text-slate-600">
        <MoreVertical size={20}/>
      </button>
    </div>

    <h4 className="text-[15px] font-black text-[#002366] leading-tight mb-2 pr-4">
      {name}
    </h4>

    <div className="flex items-center justify-between mt-6">
      <p className="text-[11px] font-bold text-slate-400 tracking-tight">
        {files} fichiers • {date}
      </p>

      <div className="flex -space-x-2">
        {[...Array(students)].map((_, i) => (
          <img 
            key={i}
            src={`https://i.pravatar.cc/150?u=${i+name}`}
            className="w-6 h-6 rounded-lg border-2 border-white"
            alt="user"
          />
        ))}

        {isPrivate && (
          <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest mt-1 italic">
            PRIVÉ
          </div>
        )}
      </div>
    </div>
  </motion.div>
);

const FileRow = ({ name, classTag, size, time, color }) => (
  <motion.tr 
    whileHover={{ backgroundColor: "#F8FAFC" }}
    className="group transition-colors cursor-pointer"
  >
    <td className="px-8 py-5">
      <div className="flex items-center gap-4">

        <div className={`p-2 rounded-xl ${
          color === 'blue'
            ? 'bg-blue-50 text-blue-600'
            : color === 'green'
            ? 'bg-emerald-50 text-emerald-600'
            : 'bg-orange-50 text-orange-600'
        }`}>
          {name.endsWith('pdf') ? <FileText size={18}/> : <Video size={18}/>}
        </div>

        <div>
          <p className="text-sm font-black text-[#002366]">
            {name}
          </p>

          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Ajouté par vous
          </p>
        </div>
      </div>
    </td>

    <td className="px-8 py-5 text-center">
      <span className="px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest bg-blue-50 text-blue-600">
        {classTag}
      </span>
    </td>

    <td className="px-8 py-5 text-sm font-bold text-slate-600">
      {size}
    </td>

    <td className="px-8 py-5 text-sm font-bold text-slate-400">
      {time}
    </td>

    <td className="px-8 py-5 text-right">
      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
        <button className="p-2 hover:bg-white rounded-lg text-slate-400 hover:text-blue-600">
          <Eye size={16}/>
        </button>

        <button className="p-2 hover:bg-white rounded-lg text-slate-400 hover:text-emerald-600">
          <Download size={16}/>
        </button>

        <button className="p-2 hover:bg-white rounded-lg text-slate-400 hover:text-red-600">
          <Trash2 size={16}/>
        </button>
      </div>
    </td>
  </motion.tr>
);

export default PageRessources;