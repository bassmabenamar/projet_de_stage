import React, { useState } from "react";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ListeFormateurs() {
  const navigate = useNavigate();

  const [formateurs] = useState([
    { id: 1, name: "Dr. Karim Benali", email: "karim.benali@amity.com", phone: "+212 6XX XXX XXX", status: "Actif", specialite: "Développement Web" },
    { id: 2, name: "Mme. Leila Ouazzani", email: "leila.ouazzani@amity.com", phone: "+212 6XX XXX XXX", status: "Actif", specialite: "Data Science" },
    { id: 3, name: "M. Mohamed Tazi", email: "mohamed.tazi@amity.com", phone: "+212 6XX XXX XXX", status: "Inactif", specialite: "Cybersécurité" },
    { id: 4, name: "Mme. Fatima Zahra", email: "fatima.zahra@amity.com", phone: "+212 6XX XXX XXX", status: "Actif", specialite: "Marketing Digital" },
    { id: 5, name: "Dr. Youssef El Amrani", email: "youssef.elamrani@amity.com", phone: "+212 6XX XXX XXX", status: "Actif", specialite: "Intelligence Artificielle" },
  ]);

  const handleAjouter = () => {
    navigate("/AjouterFormateur")
    console.log("Ajouter formateur");
  };

  const handleModifier = (id) => {
    navigate("/ModifierFormateur")
    console.log("Modifier formateur", id);
  };

  const handleSupprimer = (id) => {
    console.log("Supprimer formateur", id);
    alert(`Supprimer formateur ${id} (simulation)`);
  };

  const handleDetails = (id) => {
    navigate("/DetailsFormateur")
    console.log("Détails formateur", id);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col overflow-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-semibold m-0 mb-2 text-gray-800">Liste des formateurs</h1>
              <p className="text-gray-500 m-0">Gérez les formateurs de votre école.</p>
            </div>
            <button 
              onClick={handleAjouter}
              className="px-4 py-2 bg-[#E55B2D] text-white rounded-lg font-medium flex items-center gap-2 hover:bg-[#c44d24] transition-colors shadow-sm whitespace-nowrap"
            >
              <Plus size={18} />
              Ajouter un formateur
            </button>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            {/* Scroll horizontal */}
            <div className="overflow-x-auto">
              <div className="min-w-[800px]">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600 whitespace-nowrap">N°</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600 whitespace-nowrap">Nom complet</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600 whitespace-nowrap">Email</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600 whitespace-nowrap">Téléphone</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600 whitespace-nowrap">Spécialité</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600 whitespace-nowrap">Statut</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600 whitespace-nowrap">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formateurs.map((formateur, index) => (
                      <tr key={formateur.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">{index + 1}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2F5D9F] to-[#E55B2D] flex items-center justify-center text-white text-xs font-medium">
                              {formateur.name.charAt(0)}{formateur.name.split(' ')[1]?.charAt(0) || formateur.name.split(' ')[2]?.charAt(0) || ''}
                            </div>
                            <span className="text-sm font-medium text-gray-800">{formateur.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">{formateur.email}</td>
                        <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">{formateur.phone}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 whitespace-nowrap">
                            {formateur.specialite}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                            formateur.status === "Actif" 
                              ? "bg-green-100 text-green-700" 
                              : "bg-red-100 text-red-700"
                          }`}>
                            {formateur.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => handleDetails(formateur.id)}
                              className="p-1.5 text-blue-500 hover:text-blue-700 transition-colors"
                              title="Détails"
                            >
                              <Eye size={18} />
                            </button>
                            <button 
                              onClick={() => handleModifier(formateur.id)}
                              className="p-1.5 text-[#2F5D9F] hover:text-[#1e3d6b] transition-colors"
                              title="Modifier"
                            >
                              <Edit size={18} />
                            </button>
                            <button 
                              onClick={() => handleSupprimer(formateur.id)}
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
              <p className="text-sm text-gray-500 whitespace-nowrap">Total: {formateurs.length} formateurs</p>
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