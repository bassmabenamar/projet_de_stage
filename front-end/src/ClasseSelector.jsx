import React from 'react';
import { GraduationCap, Users, ChevronRight, Search, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";

export default function ClasseSelector(){
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const classesParPage = 5;

  const [classes,setClasses] = useState([]);
    useEffect(()=>{
      async function getClasses(){
        try {
        const donneClasses = await axios.get("http://127.0.0.1:8000/api/classes",{
                  headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`
                  }
              });
              setClasses(donneClasses.data)
            }
             catch (error) {
              console.log(error);
            }
          }getClasses(); 
    },[])

    const filteredClasses = classes.filter((c) =>
      c.nom_classe?.toLowerCase().includes(search.toLowerCase())
    );

    const indexDernierClasse = currentPage * classesParPage;
    const indexPremierClasse = indexDernierClasse - classesParPage;
    const classesActuels = filteredClasses.slice(indexPremierClasse,indexDernierClasse);
    const totalPages = Math.ceil(filteredClasses.length / classesParPage);
    

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col overflow-auto">
        <div className="p-6">
          {/* Header - nafs style dial ListeEtudiants */}
          <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-semibold mb-2 text-gray-800">Sélectionner une classe</h1>
              <p className="text-gray-500">Choisissez une classe pour gérer son emploi du temps</p>
            </div>
            <button onClick={() => navigate("/AjouterClasse")} className="px-4 py-2 bg-[#E55B2D] text-white rounded-lg font-medium flex items-center gap-2 hover:bg-[#c44d24] transition-colors shadow-sm">
              <Plus size={18} />
              Nouvelle classe
            </button>
          </div>

          {/* Search Bar - nafs style */}
          <div className="relative mb-5">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Rechercher une classe..." className="w-full md:w-96 bg-slate-50 border border-gray-200 rounded-xl py-3 pl-12 pr-4 text-sm focus:bg-white focus:ring-2 focus:ring-[#E55B2D] focus:border-transparent transition-all outline-none"/>
          </div>

          {/* Cards Grid - design b7al table mais grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classesActuels.map((classe) => (
              <div key={classe.id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2F5D9F] to-[#E55B2D] flex items-center justify-center">
                    <GraduationCap size={20} className="text-white" />
                  </div>
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                    {classe.annee_scolaire}
                  </span>
                </div>
                
                <h2 className="text-xl font-bold text-gray-800 mb-1">{classe.nom_classe}</h2>
                <p className="text-sm text-gray-500 mb-2">{classe.niveau_scolaire?.nom_niveau}</p>
                <p className="text-xs text-gray-400 mb-4">{classe.filiere?.nom_filiere}</p>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <Users size={14} className="text-gray-400" />
                    <span className="text-sm text-gray-600">{classe.capacite} étudiants</span>
                  </div>
                  <button onClick={() => navigate(`/EmploiClasse/${classe.id}`)} className="px-4 py-2 bg-[#2F5D9F] text-white rounded-lg text-sm font-medium hover:bg-[#1e3d6b] transition-colors flex items-center gap-2">
                    Gérer l'emploi
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {classes.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                Aucune classe trouvée
              </div>
            )}
          <br />
            {/* Footer avec pagination */}
            <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center flex-wrap gap-4">
              <p className="text-sm text-gray-500 whitespace-nowrap">
                Total: {classes.length} Classes
              </p>
              <div className="flex gap-2 flex-wrap">
                <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-600 disabled:opacity-50">
                  Précédent
                </button>
                {[...Array(totalPages)].map((_, index) => (
                  <button key={index} onClick={() => setCurrentPage(index + 1)}
                    className={`px-3 py-1 rounded text-sm ${
                      currentPage === index + 1
                        ? "bg-[#2F5D9F] text-white"
                        : "border border-gray-300 text-gray-600"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
                <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-600 disabled:opacity-50">
                  Suivant
                </button>
              </div>
            </div>

        </div>
      </div>
    </div>
  );
};
