import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, UploadCloud, Info, ChevronDown } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const AddHomeworkPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-10">
          
          {/* Back Button */}
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-400 font-bold text-sm mb-6 hover:text-[#002366] transition-colors"
          >
            <ArrowLeft size={18} /> Retour à la liste
          </button>

          <div className="max-w-[900px] bg-white rounded-[48px] shadow-sm border border-white overflow-hidden">
            <div className="px-12 pt-12 pb-8">
              <h2 className="text-[32px] font-[1000] text-[#002366] tracking-tighter leading-none">
                Créer un Nouveau Devoir
              </h2>
              <p className="text-slate-400 font-bold text-sm mt-3">
                Remplissez les informations pour attribuer un devoir aux étudiants.
              </p>
            </div>

            <div className="px-12 pb-10 space-y-8">
              {/* Titre */}
              <div className="group">
                <label className="block text-[11px] font-[1000] text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1">Titre du Devoir</label>
                <input type="text" placeholder="Ex: Série d'exercices en mécanique quantique" className="w-full px-7 py-5 bg-slate-50 border-2 border-transparent focus:border-[#002366] focus:bg-white rounded-[24px] outline-none transition-all text-[#002366] font-bold shadow-inner" />
              </div>

              {/* Grid Selects */}
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <label className="block text-[11px] font-[1000] text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1">Sélectionner une Classe</label>
                  <div className="relative">
                    <select className="w-full appearance-none px-7 py-5 bg-slate-50 border-2 border-transparent focus:border-[#002366] focus:bg-white rounded-[24px] outline-none transition-all text-[#002366] font-bold cursor-pointer shadow-inner">
                      <option>Choisir une classe...</option>
                      <option>Physique Avancée</option>
                    </select>
                    <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={20} />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-[1000] text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1">Date Limite</label>
                  <input type="datetime-local" className="w-full px-7 py-5 bg-slate-50 border-2 border-transparent focus:border-[#002366] focus:bg-white rounded-[24px] outline-none transition-all text-slate-400 font-bold shadow-inner" />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-[11px] font-[1000] text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1">Instructions</label>
                <textarea rows={4} className="w-full px-7 py-5 bg-slate-50 border-2 border-transparent focus:border-[#002366] focus:bg-white rounded-[24px] outline-none transition-all text-[#002366] font-bold resize-none shadow-inner" />
              </div>

              {/* Upload & Info Alert */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="border-2 border-dashed border-slate-100 rounded-[32px] p-8 flex flex-col items-center justify-center bg-slate-50/50 hover:bg-white hover:border-blue-300 transition-all cursor-pointer">
                  <UploadCloud className="text-slate-300 mb-2" size={24} />
                  <p className="text-xs font-[1000] text-[#002366]">Joindre des fichiers</p>
                </div>
                <div className="flex gap-4 p-6 bg-orange-50/60 border border-orange-100 rounded-[28px] items-center">
                  <Info className="text-orange-500 shrink-0" size={20} />
                  <p className="text-[10px] font-bold text-orange-900/60 leading-tight">Notification immédiate via l'application Amity dès publication.</p>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="px-12 py-8 bg-slate-50/50 border-t border-slate-100 flex items-center justify-end gap-6">
              <button className="text-[11px] font-[1000] text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-[0.2em]">
                Sauvegarder Brouillon
              </button>
              <button className="px-10 py-4 bg-[#002366] text-white rounded-[22px] text-xs font-[1000] uppercase tracking-widest shadow-xl shadow-blue-900/10 hover:scale-105 transition-all">
                Publier Maintenant
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddHomeworkPage;