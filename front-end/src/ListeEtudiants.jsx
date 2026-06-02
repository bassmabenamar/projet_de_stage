import { Plus, Edit, Trash2, Eye,Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";

export default function ListeEtudiants() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const etudiantsParPage = 5;

  const [etudiants,setEtudiants] = useState([]);
  useEffect(()=>{
    async function getEtudiants(){
      try {
      const donneEtudiants = await axios.get("http://127.0.0.1:8000/api/etudiants",{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            setEtudiants(donneEtudiants.data)
          }
           catch (error) {
            console.log(error);
          }
        }getEtudiants(); 
  },[])

  async function DeleteEtudiant(id) {

    const confirmation = window.confirm("Voulez-vous vraiment supprimer cet étudiant ?");
    if (!confirmation) {return;}
    try {
      await axios.delete(`http://127.0.0.1:8000/api/etudiants/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setEtudiants((prev) => prev.filter((etudiant) => etudiant.id !== id));
    } catch (error) {
      console.log(error);
    }
  }

  const filteredEtudiants = etudiants.filter((e) =>
    `${e.nom ?? ""} ${e.prenom ?? ""}`
      .toLowerCase()
      .includes(search.toLowerCase().trim())
  );

  const indexDernierEtudiant = currentPage * etudiantsParPage;
  const indexPremierEtudiant = indexDernierEtudiant - etudiantsParPage;
  const totalPages = Math.ceil(filteredEtudiants.length / etudiantsParPage);
  const etudiantsActuels = filteredEtudiants.slice(indexPremierEtudiant,indexDernierEtudiant);

  const handleAjouter = () => {
    navigate("/AjouterEtudiant")
  };

  // const handleModifier = (id) => {
  //   navigate("/ModifierEtudiant")
  //   console.log("Modifier étudiant", id);
  // };

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col overflow-auto">
        <div className="p-6">
          {/* Header avec button Ajouter */}
          <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-semibold m-0 mb-2 text-gray-800">Liste des étudiants</h1>
              <p className="text-gray-500 m-0">Gérez les étudiants inscrits dans votre école.</p>
            </div>
            <button onClick={handleAjouter} className="px-4 py-2 bg-[#E55B2D] text-white rounded-lg font-medium flex items-center gap-2 hover:bg-[#c44d24] transition-colors shadow-sm whitespace-nowrap" >
              <Plus size={18} />
              Ajouter un étudiant
            </button>
          </div>

          <div className="relative mb-5">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Rechercher un étudiant..."className="w-full md:w-96 bg-slate-50 border border-gray-200 rounded-xl py-3 pl-12 pr-4 text-sm focus:bg-white focus:ring-2 focus:ring-[#E55B2D] focus:border-transparent transition-all outline-none"/>
          </div>
          
          {/* Tableau des étudiants */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <div className="min-w-[800px]">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600 whitespace-nowrap">N°</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600 whitespace-nowrap">Nom complet</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600 whitespace-nowrap">Email</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600 whitespace-nowrap">Téléphone</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600 whitespace-nowrap">Classe</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600 whitespace-nowrap">Statut</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600 whitespace-nowrap">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {etudiantsActuels.map((etudiant, index) => (
                      <tr key={etudiant.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">{indexPremierEtudiant + index + 1}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2F5D9F] to-[#E55B2D] flex items-center justify-center text-white text-xs font-medium">
                              {etudiant.nom?.charAt(0)}{etudiant.nom?.split(' ')[1]?.charAt(0) || ''}
                            </div>
                            <span className="text-sm font-medium text-gray-800">{etudiant.nom} {etudiant.prenom}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">{etudiant.email}</td>
                        <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">{etudiant.phone}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700 whitespace-nowrap">
                            {etudiant.classe?.nom_classe}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                            etudiant.status === "actif" 
                              ? "bg-green-100 text-green-700" 
                              : "bg-red-100 text-red-700"
                          }`}>
                            {etudiant.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <button onClick={() => navigate(`/DetailsEtudiant/${etudiant.id}`)} className="p-1.5 text-blue-500 hover:text-blue-700 transition-colors" title="Détails">
                              <Eye size={18} />
                            </button>
                            <button onClick={() => navigate(`/ModifierEtudiant/${etudiant.id}`)} className="p-1.5 text-[#2F5D9F] hover:text-[#1e3d6b] transition-colors" title="Modifier">
                              <Edit size={18} />
                            </button>
                            <button onClick={() => DeleteEtudiant(etudiant.id)} className="p-1.5 text-red-500 hover:text-red-700 transition-colors" title="Supprimer">
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
            
            {/* Footer avec pagination */}
            <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center flex-wrap gap-4">
              <p className="text-sm text-gray-500 whitespace-nowrap">
                Total: {etudiants.length} étudiants
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
    </div>
  );
}