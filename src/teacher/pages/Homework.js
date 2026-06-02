import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, MoreVertical, Calendar, Users, FileText } from 'lucide-react';
import Sidebar from '../components/Sidebar'; 
import Navbar from '../components/Navbar';

const HomeworkPage = () => {
  const navigate = useNavigate();

  // Mock data for display
  const assignments = [
    { id: 1, title: "Mécanique Quantique", class: "Physique Avancée", date: "15 Mai, 2026", status: "Publié" },
    { id: 2, title: "Algèbre Linéaire", class: "Mathématiques II", date: "20 Mai, 2026", status: "Brouillon" },
  ];

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-10">
          
          <div className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-3xl font-[1000] text-[#002366] tracking-tighter">Gestion des Devoirs</h1>
              <p className="text-slate-400 font-bold text-sm uppercase tracking-widest mt-1">Système Scolaire Amity</p>
            </div>
            <button 
              onClick={() => navigate('/homework/add')}
              className="bg-[#002366] text-white px-8 py-4 rounded-[22px] font-black text-sm shadow-2xl shadow-blue-900/20 hover:scale-105 transition-all flex items-center gap-3"
            >
              <Plus size={20} /> Créer un Nouveau Devoir
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {assignments.map((hw) => (
              <div key={hw.id} className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
                <div className="flex justify-between items-start mb-6">
                  <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${hw.status === 'Publié' ? 'bg-green-50 text-green-600' : 'bg-slate-100 text-slate-400'}`}>
                    {hw.status}
                  </div>
                  <button className="text-slate-300 hover:text-blue-600"><MoreVertical size={20}/></button>
                </div>
                
                <h3 className="text-xl font-[1000] text-[#002366] mb-4 group-hover:text-blue-600 transition-colors">{hw.title}</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-slate-400 font-bold text-sm">
                    <Users size={16} /> {hw.class}
                  </div>
                  <div className="flex items-center gap-3 text-slate-400 font-bold text-sm">
                    <Calendar size={16} /> Limite: {hw.date}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-50 flex justify-between items-center">
                  <button className="text-[#002366] font-black text-xs uppercase tracking-widest flex items-center gap-2">
                    <FileText size={14}/> Voir Détails
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomeworkPage;