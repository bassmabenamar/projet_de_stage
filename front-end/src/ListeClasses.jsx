import React, { useState } from "react";
import { Plus, Edit, Trash2, Eye, Users, UserCheck, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ListeClasses() {
  const navigate = useNavigate();
  const [classes] = useState([
    { 
      id: 1, 
      name: "2ème Année Génie Logiciel", 
      niveau: "2ème Année", 
      filiere: "Génie Logiciel",
      nbEtudiants: 24,
      nbFormateurs: 4,
      status: "Actif",
      anneeScolaire: "2024-2025",
      salle: "A101",
      salles: ["A101", "Lab Info 1", "Salle TP"]
    },
    { 
      id: 2, 
      name: "1ère Année Data Science", 
      niveau: "1ère Année", 
      filiere: "Data Science",
      nbEtudiants: 18,
      nbFormateurs: 3,
      status: "Actif",
      anneeScolaire: "2024-2025",
      salle: "B202",
      salles: ["B202", "Lab Data", "Salle TP"]
    },
    { 
      id: 3, 
      name: "3ème Année Cybersécurité", 
      niveau: "3ème Année", 
      filiere: "Cybersécurité",
      nbEtudiants: 15,
      nbFormateurs: 4,
      status: "Inactif",
      anneeScolaire: "2023-2024",
      salle: "C303",
      salles: ["C303", "Lab Securité", "Salle TP"]
    },
    { 
      id: 4, 
      name: "Master 1 IA", 
      niveau: "Master 1", 
      filiere: "Intelligence Artificielle",
      nbEtudiants: 12,
      nbFormateurs: 3,
      status: "Actif",
      anneeScolaire: "2024-2025",
      salle: "D404",
      salles: ["D404", "Lab IA", "Salle TP"]
    },
  ]);

  const handleAjouter = () => {
    navigate("/AjouterClasse")
    console.log("Ajouter classe");
  };

  const handleModifier = (id) => {
    navigate("/ModifierClasse")
    console.log("Modifier classe", id);
  };

  const handleSupprimer = (id) => {
    console.log("Supprimer classe", id);
    alert(`Supprimer classe ${id} (simulation)`);
  };

  const handleDetails = (id) => {
    navigate("/DetailsClasse")
    console.log("Détails classe", id);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col overflow-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-semibold m-0 mb-2 text-gray-800">Liste des classes</h1>
              <p className="text-gray-500 m-0">Gérez les classes de votre école.</p>
            </div>
            <button 
              onClick={handleAjouter}
              className="px-4 py-2 bg-[#E55B2D] text-white rounded-lg font-medium flex items-center gap-2 hover:bg-[#c44d24] transition-colors shadow-sm whitespace-nowrap"
            >
              <Plus size={18} />
              Ajouter une classe
            </button>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <div className="min-w-[1000px]">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600 whitespace-nowrap">N°</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600 whitespace-nowrap">Nom</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600 whitespace-nowrap">Niveau</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600 whitespace-nowrap">Filière</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600 whitespace-nowrap">Salle</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600 whitespace-nowrap">Année scolaire</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600 whitespace-nowrap">Étudiants</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600 whitespace-nowrap">Formateurs</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600 whitespace-nowrap">Statut</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600 whitespace-nowrap">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {classes.map((classe, index) => (
                      <tr key={classe.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">{index + 1}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2F5D9F] to-[#E55B2D] flex items-center justify-center text-white text-xs font-medium">
                              {classe.name.charAt(0)}
                            </div>
                            <span className="text-sm font-medium text-gray-800">{classe.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-600">{classe.niveau}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                            {classe.filiere}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-1">
                            <MapPin size={14} className="text-gray-400" />
                            <span className="text-sm font-medium text-gray-700">{classe.salle}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-600">{classe.anneeScolaire}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-1">
                            <Users size={14} className="text-gray-400" />
                            <span className="text-sm font-medium text-gray-700">{classe.nbEtudiants}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-1">
                            <UserCheck size={14} className="text-gray-400" />
                            <span className="text-sm font-medium text-gray-700">{classe.nbFormateurs}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                            classe.status === "Actif" 
                              ? "bg-green-100 text-green-700" 
                              : "bg-red-100 text-red-700"
                          }`}>
                            {classe.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => handleDetails(classe.id)}
                              className="p-1.5 text-blue-500 hover:text-blue-700 transition-colors"
                              title="Détails"
                            >
                              <Eye size={18} />
                            </button>
                            <button 
                              onClick={() => handleModifier(classe.id)}
                              className="p-1.5 text-[#2F5D9F] hover:text-[#1e3d6b] transition-colors"
                              title="Modifier"
                            >
                              <Edit size={18} />
                            </button>
                            <button 
                              onClick={() => handleSupprimer(classe.id)}
                              className="p-1.5 text-red-500 hover:text-red-700 transition-colors"
                              title="Supprimer"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center flex-wrap gap-4">
              <p className="text-sm text-gray-500 whitespace-nowrap">Total: {classes.length} classes</p>
              <div className="flex gap-2 flex-wrap">
                <button className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50 transition-colors whitespace-nowrap">
                  Précédent
                </button>
                <button className="px-3 py-1 bg-[#2F5D9F] text-white rounded text-sm hover:bg-[#1e3d6b] transition-colors whitespace-nowrap">
                  1
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50 transition-colors whitespace-nowrap">
                  2
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50 transition-colors whitespace-nowrap">
                  3
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50 transition-colors whitespace-nowrap">
                  Suivant
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}