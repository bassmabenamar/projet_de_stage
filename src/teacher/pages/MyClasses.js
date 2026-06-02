import React from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, Filter, Users, Clock, MapPin, 
  ChevronRight, GraduationCap, 
  ClipboardList, Trophy, LayoutGrid
} from 'lucide-react';

import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const MyClasses = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans text-[#1E293B]">
      <Sidebar />

      <main className="flex-1 flex flex-col relative overflow-hidden">
        <Navbar />

        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-[1400px] mx-auto"
          >
            {/* HEADER */}
            <div className="flex justify-between items-end mb-10">
              <motion.div
                variants={{
                  hidden: { x: -20, opacity: 0 },
                  visible: { x: 0, opacity: 1 }
                }}
              >
                <h2 className="text-[12px] font-black text-blue-600 uppercase tracking-[0.2em] mb-2">
                  Mes Classes
                </h2>

                <h1 className="text-[28px] font-black text-[#002366] leading-none mb-2">
                  Gérez votre emploi du temps académique et les activités de vos classes.
                </h1>
              </motion.div>

              <div className="flex gap-4">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 text-slate-500 rounded-xl font-bold text-xs shadow-sm hover:border-blue-200 transition-all"
                >
                  <Filter size={16} />
                  Filtrer
                </motion.button>

                <motion.button 
                  whileHover={{ scale: 1.05, backgroundColor: '#001a4d' }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-6 py-3 bg-[#002366] text-white rounded-xl font-bold text-xs shadow-lg shadow-blue-900/20"
                >
                  <Plus size={18} />
                  Créer une classe
                </motion.button>
              </div>
            </div>

            {/* GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              
              <ClassCard 
                title="Physique AP C : Mécanique"
                subject="Sciences et Ingénierie"
                students="24"
                schedule="Lun, Mer, Ven • 09:00 - 10:30"
                room="Laboratoire 3, Aile Scientifique"
                image="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=400"
                active
              />

              <ClassCard 
                title="Calcul Avancé II"
                subject="Mathématiques"
                students="18"
                schedule="Mar, Jeu • 11:00 - 12:30"
                room="Amphithéâtre A"
                image="https://images.unsplash.com/photo-1509228468518-180dd48a5791?auto=format&fit=crop&q=80&w=400"
                active
              />

              <ClassCard 
                title="Mécanique Quantique III"
                subject="Sciences et Ingénierie"
                students="12"
                schedule="Lun, Ven • 14:00 - 15:30"
                room="Salle d’Observation"
                image="https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&q=80&w=400"
                active
              />

              <ClassCard 
                title="Thermodynamique Statistique"
                subject="Sciences et Ingénierie"
                students="30"
                schedule="Mar, Jeu • 08:30 - 10:00"
                room="Auditorium Principal"
                image="https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=400"
                active
              />

              <ClassCard 
                title="Théorie Électromagnétique"
                subject="Ingénierie"
                students="22"
                schedule="Mer, Ven • 11:30 - 13:00"
                room="Salle B - Ingénierie"
                image="https://images.unsplash.com/photo-1633167606207-d840b5070fc2?auto=format&fit=crop&q=80&w=400"
                active
              />

              {/* ADD CARD */}
              <motion.div 
                whileHover={{ y: -8, borderColor: '#002366', backgroundColor: '#fff' }}
                className="border-2 border-dashed border-slate-200 rounded-[32px] flex flex-col items-center justify-center p-12 group cursor-pointer transition-all min-h-[400px]"
              >
                <div className="w-14 h-14 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-blue-50 group-hover:text-[#002366] transition-all mb-4">
                  <Plus size={28} />
                </div>

                <h4 className="font-black text-[#002366] mb-2">
                  Ajouter une classe
                </h4>

                <p className="text-[11px] text-slate-400 text-center font-medium leading-relaxed max-w-[180px]">
                  Créez une nouvelle salle de classe numérique pour le semestre actuel.
                </p>
              </motion.div>
            </div>

            {/* STATS */}
            <motion.div 
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: { y: 0, opacity: 1 }
              }}
              className="bg-white rounded-[24px] p-8 border border-slate-50 shadow-sm flex flex-wrap justify-between items-center"
            >
              <GlobalStat 
                icon={<LayoutGrid />} 
                label="Total des classes" 
                value="12" 
                color="blue" 
              />

              <GlobalStat 
                icon={<GraduationCap />} 
                label="Total des étudiants" 
                value="284" 
                color="emerald" 
              />

              <GlobalStat 
                icon={<ClipboardList />} 
                label="Tâches en attente" 
                value="8" 
                color="orange" 
              />

              <GlobalStat 
                icon={<Trophy />} 
                label="Classement scolaire" 
                value="#4" 
                color="purple" 
              />
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

/* --- COMPONENTS --- */

const ClassCard = ({ title, subject, students, schedule, room, image, active }) => (
  <motion.div 
    variants={{
      hidden: { y: 20, opacity: 0 },
      visible: { y: 0, opacity: 1 }
    }}
    whileHover={{ y: -10, boxShadow: "0 30px 60px rgba(0,35,102,0.08)" }}
    className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden group"
  >
    {/* IMAGE */}
    <div className="h-44 relative overflow-hidden">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

      {active && (
        <span className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest border border-white/30">
          Active
        </span>
      )}
    </div>

    <div className="p-8">
      <h3 className="text-lg font-black text-[#002366] mb-1 line-clamp-1 group-hover:text-blue-600 transition-colors">
        {title}
      </h3>

      <p className="text-[11px] font-bold text-slate-400 mb-6 uppercase tracking-widest">
        Matière : {subject}
      </p>

      <div className="space-y-4 mb-8">
        <IconDetail
          icon={<Users size={16} />}
          text={`${students} étudiants inscrits`}
        />

        <IconDetail
          icon={<Clock size={16} />}
          text={schedule}
        />

        <IconDetail
          icon={<MapPin size={16} />}
          text={room}
        />
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-slate-50">
        <div className="flex -space-x-2">
          {[1, 2, 3].map(i => (
            <div
              key={i}
              className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden shadow-sm"
            >
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i+title}`}
                alt="user"
              />
            </div>
          ))}

          <div className="w-8 h-8 rounded-full border-2 border-white bg-blue-50 flex items-center justify-center text-[10px] font-black text-blue-600 shadow-sm">
            +21
          </div>
        </div>

        <motion.button 
          whileHover={{ x: 5 }}
          className="flex items-center gap-2 text-xs font-black text-[#002366] uppercase tracking-widest bg-blue-50 px-4 py-2 rounded-xl"
        >
          Ouvrir
          <ChevronRight size={14} strokeWidth={3} />
        </motion.button>
      </div>
    </div>
  </motion.div>
);

const IconDetail = ({ icon, text }) => (
  <div className="flex items-center gap-3 group/item">
    <div className="text-slate-300 group-hover/item:text-blue-500 transition-colors">
      {icon}
    </div>

    <span className="text-xs font-bold text-slate-500 leading-tight">
      {text}
    </span>
  </div>
);

const GlobalStat = ({ icon, label, value, color }) => {
  const colorMap = {
    blue: "text-blue-600 bg-blue-50",
    emerald: "text-emerald-600 bg-emerald-50",
    orange: "text-orange-600 bg-orange-50",
    purple: "text-purple-600 bg-purple-50"
  };

  return (
    <div className="flex items-center gap-4 px-6 border-r last:border-0 border-slate-100">
      <motion.div 
        whileHover={{ rotateY: 180 }}
        className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorMap[color]} shadow-inner transition-transform duration-500`}
      >
        {React.cloneElement(icon, { size: 22 })}
      </motion.div>

      <div>
        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">
          {label}
        </p>

        <p className="text-xl font-black text-[#002366]">
          {value}
        </p>
      </div>
    </div>
  );
};

export default MyClasses;