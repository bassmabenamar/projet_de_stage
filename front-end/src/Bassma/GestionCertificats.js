import React from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, Eye, Download, History, Plus, 
  Search, CheckCircle2, Clock, XCircle, 
  Sparkles, FileText, ChevronLeft, ChevronRight,
  Info, ShieldCheck, RotateCw
} from 'lucide-react';

// Import dial Sidebar dialk (style EduSaaS)
import Sidebar from './Sidebar';

const GestionCertificats = () => {
  const tableData = [
    { id: "JD", name: "Jean-Baptiste Durand", email: "jb.durand@example.com", path: "Frontend React", progress: 92, status: "Validé", color: "green" },
    { id: "SM", name: "Sarah Martin", email: "sarah.m@gmail.com", path: "Fullstack JS", progress: 78, status: "En attente", color: "orange" },
    { id: "ML", name: "Marc Lefebvre", email: "m.lefe@entreprise.fr", path: "Backend Node", progress: 45, status: "Inéligible", color: "slate" },
  ];

  // Variants dial l-premium animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const fadeInUp = {
    hidden: { y: 25, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 120, damping: 14 } }
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar activePage="Certifications" />

      <motion.main 
        initial="hidden" animate="visible" variants={containerVariants}
        className="flex-1 ml-72 p-10 space-y-8"
      >
        {/* --- Header Section --- */}
        <div className="flex justify-between items-start">
          <motion.div variants={fadeInUp}>
            <h1 className="text-3xl font-black text-[#002366] tracking-tight mb-2">Gestion des Certifications</h1>
            <p className="text-slate-400 text-sm font-medium">Configurez les règles d'obtention et gérez les diplômes des étudiants.</p>
          </motion.div>
          <div className="flex gap-4">
            <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: "#f8fafc" }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-100 rounded-2xl text-xs font-black text-slate-500 shadow-sm transition-all"
            >
              <motion.div whileHover={{ rotate: -180 }} transition={{ duration: 0.5 }}>
                <History size={16} />
              </motion.div>
              Logs d'audit
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(179, 86, 0, 0.25)" }} 
              whileTap={{ scale: 0.95 }}
              className="bg-[#B35600] text-white px-8 py-3 rounded-2xl font-black text-xs shadow-lg shadow-orange-100/50"
            >
              Nouvelle Règle
            </motion.button>
          </div>
        </div>

        {/* --- Stats Row --- */}
        <div className="grid grid-cols-5 gap-6">
          <StatMini label="Total Créées" value="1,284" sub="+12% ce mois" subColor="text-green-500" />
          <StatMini label="Délivrées" value="842" sub="65% taux de succès" subColor="text-orange-500" />
          <StatProgress label="HTML" value={320} color="bg-orange-400" />
          <StatProgress label="CSS" value={245} color="bg-blue-600" />
          <StatProgress label="JS" value={277} color="bg-orange-500" />
        </div>

        {/* --- Middle Section: Rules & Preview --- */}
        <div className="grid grid-cols-12 gap-8">
          {/* Rules Configuration */}
          <motion.div 
            variants={fadeInUp} 
            whileHover={{ y: -5, shadow: "0 25px 50px -12px rgba(0, 0, 0, 0.08)" }}
            className="col-span-4 bg-white rounded-[40px] p-8 border border-slate-50 shadow-sm space-y-8 transition-shadow"
          >
            <div className="flex items-center gap-3 group">
              <motion.div 
                whileHover={{ rotate: 180 }} 
                transition={{ type: "spring", stiffness: 200 }}
                className="p-2 bg-orange-50 rounded-xl text-[#B35600]"
              >
                <Settings size={20} />
              </motion.div>
              <h3 className="font-black text-[#002366]">Configuration des Règles</h3>
            </div>
            
            <div className="space-y-4">
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Progrès minimum requis (%)</p>
              <RuleInput label="HTML" value="80" />
              <RuleInput label="CSS" value="80" />
              <RuleInput label="Bootstrap" value="85" />
              <RuleInput label="JS Core" value="75" />
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-[#B35600] text-white rounded-2xl font-black text-xs shadow-md"
            >
              Enregistrer les modifications
            </motion.button>

            <div className="bg-blue-50/50 p-6 rounded-3xl flex gap-4 border border-blue-100/50">
              <Info className="text-blue-500 shrink-0" size={20} />
              <div>
                <h4 className="text-[11px] font-black text-blue-800 mb-1">Logique de déblocage</h4>
                <p className="text-[10px] text-blue-600 font-bold leading-relaxed">
                  Les certificats sont automatiquement générés dès qu'un étudiant atteint le seuil de progression défini.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Certificate Preview */}
          <motion.div 
            variants={fadeInUp} 
            whileHover={{ scale: 1.01 }}
            className="col-span-8 bg-white rounded-[40px] p-8 border border-slate-50 shadow-sm flex flex-col items-center"
          >
            <div className="w-full flex items-center gap-3 mb-8">
              <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.7 }} className="p-2 bg-orange-50 rounded-xl text-[#B35600]">
                <Eye size={20} />
              </motion.div>
              <h3 className="font-black text-[#002366]">Aperçu du Certificat</h3>
            </div>

            {/* Visual Cert (M-cloné men l-image) with 3D Effect */}
            <motion.div 
              whileHover={{ perspective: 1000, rotateX: 2, rotateY: -2 }}
              className="relative w-[500px] aspect-[4/3] bg-white shadow-[0_30px_60px_rgba(0,0,0,0.06)] border-8 border-slate-50 p-10 flex flex-col items-center justify-between text-center mb-8 transition-transform"
            >
               <div className="space-y-2">
                 <h2 className="text-[#B35600] font-black text-xl tracking-[4px] uppercase">Codebook Academy</h2>
                 <p className="text-[8px] font-bold text-slate-300 uppercase tracking-widest">Certificat d'excellence</p>
               </div>
               
               <div className="space-y-4">
                 <p className="text-[10px] text-slate-400">Ceci certifie que</p>
                 <h1 className="text-4xl font-black text-[#002366] leading-tight">Jean-Baptiste<br/>Durand</h1>
                 <p className="text-[10px] text-slate-400 max-w-[300px] mx-auto font-medium">a complété avec succès le parcours intensif de Développement frontend Avancé (JS/React)</p>
               </div>

               <div className="w-full flex justify-between items-end px-4">
                  <div className="text-left">
                    <p className="text-[7px] font-black text-slate-300 uppercase">Date d'émission</p>
                    <p className="text-[9px] font-black text-[#002366]">24 Octobre 2023</p>
                  </div>
                  <motion.div 
                    animate={{ scale: [1, 1.1, 1] }} 
                    transition={{ repeat: Infinity, duration: 3 }}
                    className="w-12 h-12 rounded-full border-2 border-orange-100 flex items-center justify-center text-orange-500"
                  >
                    <ShieldCheck size={24} fill="currentColor" className="text-white fill-orange-500" />
                  </motion.div>
                  <div className="text-right">
                    <p className="text-[7px] font-black text-slate-300 uppercase">Signature</p>
                    <p className="text-[9px] font-black text-[#002366]">Le Directeur Pédagogique</p>
                  </div>
               </div>
            </motion.div>

            <div className="flex gap-4">
              <motion.button 
                whileHover={{ scale: 1.05, y: -2 }}
                className="px-8 py-4 bg-white border-2 border-slate-100 rounded-2xl font-black text-xs text-slate-500 flex items-center gap-3 shadow-sm"
              >
                <Download size={18} /> Télécharger PDF
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05, y: -2 }}
                className="px-8 py-4 bg-[#B35600] text-white rounded-2xl font-black text-xs flex items-center gap-3 shadow-lg shadow-orange-100"
              >
                <Sparkles size={18} /> Générer certificat
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* --- Bottom Table Section --- */}
        <motion.div variants={fadeInUp} className="bg-white rounded-[40px] border border-slate-50 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex justify-between items-center">
            <h3 className="text-xl font-black text-[#002366]">Étudiants & Éligibilité</h3>
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#B35600] transition-colors" size={16} />
              <input type="text" placeholder="Rechercher un étudiant..." className="pl-12 pr-6 py-3 bg-slate-50/50 rounded-2xl text-xs font-bold w-64 outline-none focus:ring-2 ring-orange-100 transition-all border border-transparent focus:border-orange-100" />
            </div>
          </div>

          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black text-slate-300 uppercase tracking-widest border-b border-slate-50">
                <th className="px-10 py-6">Étudiant</th>
                <th className="px-10 py-6">Parcours</th>
                <th className="px-10 py-6">Progression</th>
                <th className="px-10 py-6">Status</th>
                <th className="px-10 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, i) => (
                <motion.tr 
                  key={i} 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="border-b border-slate-50 group hover:bg-slate-50/80 transition-all"
                >
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-4">
                      <motion.div 
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                        className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 font-black text-xs cursor-pointer"
                      >
                        {row.id}
                      </motion.div>
                      <div>
                        <p className="text-sm font-black text-[#002366] group-hover:text-[#B35600] transition-colors">{row.name}</p>
                        <p className="text-[10px] font-bold text-slate-300">{row.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-6 text-xs font-bold text-slate-500">{row.path}</td>
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-black text-[#002366] w-8">{row.progress}%</span>
                      <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }} 
                          animate={{ width: `${row.progress}%` }} 
                          transition={{ duration: 1, ease: "easeOut" }}
                          className={`h-full ${row.color === 'green' ? 'bg-green-500' : row.color === 'orange' ? 'bg-orange-500' : 'bg-slate-300'}`} 
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black ${
                      row.color === 'green' ? 'text-green-600 bg-green-50' : 
                      row.color === 'orange' ? 'text-orange-600 bg-orange-50' : 'text-slate-500 bg-slate-50'
                    }`}>
                      <motion.div 
                        animate={{ opacity: [1, 0.5, 1] }} 
                        transition={{ repeat: Infinity, duration: 2 }}
                        className={`w-1.5 h-1.5 rounded-full ${row.color === 'green' ? 'bg-green-500' : row.color === 'orange' ? 'bg-orange-500' : 'bg-slate-400'}`} 
                      />
                      {row.status}
                    </div>
                  </td>
                  <td className="px-10 py-6 text-right space-x-3">
                    <motion.button whileHover={{ scale: 1.2, color: "#002366" }} className="text-slate-300 transition-colors"><Eye size={18}/></motion.button>
                    <motion.button whileHover={{ scale: 1.2, color: "#ef4444" }} className="text-slate-300 transition-colors"><XCircle size={18}/></motion.button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          
          <div className="p-8 flex justify-between items-center text-slate-300 font-bold text-[11px] uppercase tracking-widest">
            <span>Affichage de 1 à 3 sur 124 étudiants</span>
            <div className="flex gap-2">
              <motion.button whileHover={{ x: -3 }} className="px-4 py-2 border border-slate-100 rounded-xl hover:bg-slate-50 transition-all flex items-center gap-1"><ChevronLeft size={14}/> Précédent</motion.button>
              <button className="px-4 py-2 bg-orange-50 text-orange-600 rounded-xl font-black">1</button>
              <button className="px-4 py-2 border border-slate-100 rounded-xl hover:bg-slate-50 transition-all">2</button>
              <motion.button whileHover={{ x: 3 }} className="px-4 py-2 border border-slate-100 rounded-xl hover:bg-slate-50 transition-all flex items-center gap-1">Suivant <ChevronRight size={14}/></motion.button>
            </div>
          </div>
        </motion.div>
      </motion.main>
    </div>
  );
};

// --- Helper Components with Extra Scale & Hover ---
const StatMini = ({ label, value, sub, subColor }) => (
  <motion.div 
    whileHover={{ y: -8, scale: 1.02, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.05)" }}
    className="bg-white p-6 rounded-[32px] border border-slate-50 shadow-sm transition-all cursor-default"
  >
    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">{label}</p>
    <p className="text-2xl font-black text-[#002366] mb-1">{value}</p>
    <p className={`text-[10px] font-black ${subColor}`}>{sub}</p>
  </motion.div>
);

const StatProgress = ({ label, value, color }) => (
  <motion.div 
    whileHover={{ y: -8, scale: 1.02 }}
    className="bg-white p-6 rounded-[32px] border border-slate-50 shadow-sm space-y-3 cursor-default"
  >
    <div className="flex justify-between items-center font-black">
      <span className="text-[10px] text-slate-300 uppercase">{label}</span>
      <span className="text-sm text-[#002366]">{value}</span>
    </div>
    <div className="w-full h-1 bg-slate-50 rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }} 
        animate={{ width: '60%' }} 
        transition={{ duration: 1.2, ease: "anticipate" }}
        className={`h-full ${color}`} 
      />
    </div>
  </motion.div>
);

const RuleInput = ({ label, value }) => (
  <motion.div whileHover={{ x: 5 }} className="flex items-center justify-between group">
    <span className="text-xs font-bold text-slate-500 group-hover:text-[#B35600] transition-colors">{label}</span>
    <motion.input 
      whileFocus={{ scale: 1.05, borderColor: "#B35600" }}
      type="text" 
      defaultValue={value} 
      className="w-24 px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs font-black text-[#002366] text-right outline-none transition-all focus:ring-2 ring-orange-50" 
    />
  </motion.div>
);

export default GestionCertificats;