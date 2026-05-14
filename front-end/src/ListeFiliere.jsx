import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Edit, Trash2, Plus, BookOpen, Hash, FileText } from "lucide-react";

export default function ListeFiliere() {
  const navigate = useNavigate();
  const [filieres, setFilieres] = useState([
    { id: 1, code: "DW", nom: "Développement Web", description: "Formation complète en développement web moderne" },
    { id: 2, code: "DS", nom: "Data Science", description: "Analyse de données, machine learning et IA" },
    { id: 3, code: "CS", nom: "Cybersécurité", description: "Sécurité des systèmes et réseaux informatiques" },
  ]);

  const handleAjouter = () => {
    navigate("/AjouterFiliere");
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-semibold mb-2 text-gray-800">Gestion des filières</h1>
          <p className="text-gray-500">Gérez les filières de formation</p>
        </div>
        <button onClick={handleAjouter} className="px-4 py-2 bg-[#E55B2D] text-white rounded-lg font-medium flex items-center gap-2 hover:bg-[#c44d24] transition-colors shadow-sm" >
          <Plus size={18} />
          Nouvelle filière
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                  <Hash size={14} className="inline mr-1" />
                  Code
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                  <BookOpen size={14} className="inline mr-1" />
                  Nom de la filière
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                  <FileText size={14} className="inline mr-1" />
                  Description
                </th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filieres.map((filiere) => (
                <tr key={filiere.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 text-sm">
                    <span className="px-2 py-1 bg-gray-100 rounded text-xs font-mono">{filiere.code}</span>
                  </td>
                  <td className="py-3 px-4 text-sm font-medium text-gray-800">{filiere.nom}</td>
                  <td className="py-3 px-4 text-sm text-gray-500">{filiere.description}</td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex justify-center gap-2">
                      <button onClick={() => navigate("/ModifierFiliere")} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" >
                        <Edit size={18} />
                      </button>
                      <button onClick={() => navigate("/ListeFiliere")} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filieres.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            Aucune filière trouvée
          </div>
        )}
      </div>
    </div>
  );
}