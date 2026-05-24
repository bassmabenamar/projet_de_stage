import { Plus, Edit, Trash2,Search, Eye, Users, UserCheck, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";

export default function ListeClasses() {
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

  async function DeleteClasse(id) {
      const confirmation = window.confirm("Voulez-vous vraiment supprimer cet classe ?");
      if (!confirmation) {return;}
      try {
        await axios.delete(`http://127.0.0.1:8000/api/classes/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setClasses((prev) => prev.filter((classe) => classe.id !== id));
      } catch (error) {
        console.log(error);
      }
    }

    console.log(classes);
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
          <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-semibold m-0 mb-2 text-gray-800">Liste des classes</h1>
              <p className="text-gray-500 m-0">Gérez les classes de votre école.</p>
            </div>
            <button onClick={() => navigate("/AjouterClasse")} className="px-4 py-2 bg-[#E55B2D] text-white rounded-lg font-medium flex items-center gap-2 hover:bg-[#c44d24] transition-colors shadow-sm whitespace-nowrap">
              <Plus size={18} />
              Ajouter une classe
            </button>
          </div>

          <div className="relative mb-5">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Rechercher un classe..."className="w-full md:w-96 bg-slate-50 border border-gray-200 rounded-xl py-3 pl-12 pr-4 text-sm focus:bg-white focus:ring-2 focus:ring-[#E55B2D] focus:border-transparent transition-all outline-none"/>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <div className="min-w-[1000px]">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600 whitespace-nowrap">N°</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600 whitespace-nowrap">Nom</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600 whitespace-nowrap">Capacite</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600 whitespace-nowrap">Niveau</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600 whitespace-nowrap">Filière</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600 whitespace-nowrap">Salle</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600 whitespace-nowrap">Année scolaire</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600 whitespace-nowrap">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {classesActuels .map((classe, index) => (
                      <tr key={classe.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">{indexPremierClasse + index + 1}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm font-medium text-gray-800">{classe.nom_classe}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-600">{classe.capacite}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                           {classe.niveau_scolaire   ?.nom_niveau}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                           {classe.filiere?.nom_filiere}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-1">
                            <MapPin size={14} className="text-gray-400" />
                            <span className="text-sm font-medium text-gray-700">{classe.salle?.nom_salle}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-600">{classe?.annee_scolaire}</span>
                        </td>
                        {/* <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-1">
                            <Users size={14} className="text-gray-400" />
                            <span className="text-sm font-medium text-gray-700">{classe.nbEtudiants}</span>
                          </div>
                        </td> */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <button onClick={() => navigate(`/DetailsClasse/${classe.id}`)} className="p-1.5 text-blue-500 hover:text-blue-700 transition-colors" title="Détails">
                              <Eye size={18} />
                            </button>
                            <button onClick={() => navigate(`/ModifierClasse/${classe.id}`)} className="p-1.5 text-[#2F5D9F] hover:text-[#1e3d6b] transition-colors" title="Modifier">
                              <Edit size={18} />
                            </button>
                            <button onClick={() => DeleteClasse(classe.id)} className="p-1.5 text-red-500 hover:text-red-700 transition-colors" title="Supprimer">
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
            
            {classes.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                Aucune classe trouvée
              </div>
            )}

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
    </div>
  );
}