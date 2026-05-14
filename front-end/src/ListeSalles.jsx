import React, { useState } from "react";
import { Plus, Edit, Trash2, Eye, MapPin, Users, Wifi, Power, Wind, Tv } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ListeSalles() {
  const navigate = useNavigate();
  const [salles] = useState([
    { 
      id: 1, 
      name: "A101", 
      type: "Salle standard",
      capacite: 30,
      equipements: ["Tableau", "Vidéoprojecteur", "Climatisation"],
      status: "Disponible",
      batiment: "Bâtiment A",
      etage: "1er étage"
    },
    { 
      id: 2, 
      name: "Lab Info 1", 
      type: "Laboratoire",
      capacite: 20,
      equipements: ["Ordinateurs", "Vidéoprojecteur", "Climatisation", "Tableau blanc"],
      status: "Disponible",
      batiment: "Bâtiment B",
      etage: "Rez-de-chaussée"
    },
    { 
      id: 3, 
      name: "Amphi A", 
      type: "Amphithéâtre",
      capacite: 150,
      equipements: ["Écran géant", "Sonorisation", "Climatisation", "Micros"],
      status: "Occupée",
      batiment: "Bâtiment C",
      etage: "1er étage"
    },
    { 
      id: 4, 
      name: "Salle TP 1", 
      type: "Salle TP",
      capacite: 25,
      equipements: ["Matériel TP", "Tableau", "Vidéoprojecteur"],
      status: "Disponible",
      batiment: "Bâtiment B",
      etage: "2ème étage"
    },
    { 
      id: 5, 
      name: "Lab Data", 
      type: "Laboratoire",
      capacite: 18,
      equipements: ["Serveurs", "Ordinateurs", "Climatisation", "Tableau interactif"],
      status: "En maintenance",
      batiment: "Bâtiment B",
      etage: "1er étage"
    },
  ]);

  const handleAjouter = () => {
    navigate("/AjouterSalle")
    console.log("Ajouter salle");
  };

  const handleModifier = (id) => {
    navigate("/ModifierSalle")
    console.log("Modifier salle", id);
  };

  const handleSupprimer = (id) => {
    console.log("Supprimer salle", id);
    alert(`Supprimer salle ${id} (simulation)`);
  };

  const handleDetails = (id) => {
    navigate("/DetailsClasse")
    console.log("Détails salle", id);
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case "Disponible":
        return "bg-green-100 text-green-700";
      case "Occupée":
        return "bg-red-100 text-red-700";
      case "En maintenance":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getTypeBadge = (type) => {
    switch(type) {
      case "Salle standard":
        return "bg-blue-100 text-blue-700";
      case "Laboratoire":
        return "bg-purple-100 text-purple-700";
      case "Amphithéâtre":
        return "bg-orange-100 text-orange-700";
      case "Salle TP":
        return "bg-cyan-100 text-cyan-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col overflow-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-semibold m-0 mb-2 text-gray-800">Liste des salles</h1>
              <p className="text-gray-500 m-0">Gérez les salles de votre école.</p>
            </div>
            <button 
              onClick={handleAjouter}
              className="px-4 py-2 bg-[#E55B2D] text-white rounded-lg font-medium flex items-center gap-2 hover:bg-[#c44d24] transition-colors shadow-sm whitespace-nowrap"
            >
              <Plus size={18} />
              Ajouter une salle
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
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600 whitespace-nowrap">Type</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600 whitespace-nowrap">Capacité</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600 whitespace-nowrap">Bâtiment</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600 whitespace-nowrap">Étage</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600 whitespace-nowrap">Statut</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600 whitespace-nowrap">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {salles.map((salle, index) => (
                      <tr key={salle.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">{index + 1}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2F5D9F] to-[#E55B2D] flex items-center justify-center text-white text-xs font-medium">
                              <MapPin size={14} />
                            </div>
                            <span className="text-sm font-medium text-gray-800">{salle.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getTypeBadge(salle.type)}`}>
                            {salle.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-1">
                            <Users size={14} className="text-gray-400" />
                            <span className="text-sm text-gray-700">{salle.capacite}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-600">{salle.batiment}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-600">{salle.etage}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getStatusBadge(salle.status)}`}>
                            {salle.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => handleDetails(salle.id)}
                              className="p-1.5 text-blue-500 hover:text-blue-700 transition-colors"
                              title="Détails"
                            >
                              <Eye size={18} />
                            </button>
                            <button 
                              onClick={() => handleModifier(salle.id)}
                              className="p-1.5 text-[#2F5D9F] hover:text-[#1e3d6b] transition-colors"
                              title="Modifier"
                            >
                              <Edit size={18} />
                            </button>
                            <button 
                              onClick={() => handleSupprimer(salle.id)}
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
              <p className="text-sm text-gray-500 whitespace-nowrap">Total: {salles.length} salles</p>
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