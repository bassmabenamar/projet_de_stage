import { useNavigate } from "react-router-dom";
import { Edit, Trash2, Plus, BookOpen, Hash,Search, FileText } from "lucide-react";
import { useState,useEffect } from "react";
import axios from "axios";

export default function ListeFiliere() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const filieresParPage = 5;

  const [filieres,setFilieres] = useState([]);
  useEffect(()=>{
    async function getFilieres(){
      try {
      const donneFilieres = await axios.get("http://127.0.0.1:8000/api/filieres",{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            setFilieres(donneFilieres.data)
          }
           catch (error) {
            console.log(error);
          }
        }getFilieres(); 
  },[])

  const handleAjouter = () => {
    navigate("/AjouterFiliere");
  };

  async function DeleteFiliere(id) {

    const confirmation = window.confirm("Voulez-vous vraiment supprimer cet filiere ?");
    if (!confirmation) {return;}
    try {
      await axios.delete(`http://127.0.0.1:8000/api/filieres/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setFilieres((prev) => prev.filter((filiere) => filiere.id !== id));
    } catch (error) {
      console.log(error);
    }
  }

  const filteredFilieres = filieres.filter((s) =>
    s.nom_filiere?.toLowerCase().includes(search.toLowerCase())
  );

  const indexDernierFiliere = currentPage * filieresParPage;
  const indexPremierFiliere = indexDernierFiliere - filieresParPage;
  const filieresActuels = filieres.slice(indexPremierFiliere,indexDernierFiliere);
  const totalPages = Math.ceil(filieres.length / filieresParPage);

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

      <div className="relative mb-5">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Rechercher un étudiant..."className="w-full md:w-96 bg-slate-50 border border-gray-200 rounded-xl py-3 pl-12 pr-4 text-sm focus:bg-white focus:ring-2 focus:ring-[#E55B2D] focus:border-transparent transition-all outline-none"/>
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
              {filieresActuels.map((filiere) => (
                <tr key={filiere.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 text-sm">
                    <span className="px-2 py-1 bg-gray-100 rounded text-xs font-mono">{filiere.code}</span>
                  </td>
                  <td className="py-3 px-4 text-sm font-medium text-gray-800">{filiere.nom_filiere}</td>
                  <td className="py-3 px-4 text-sm text-gray-500">{filiere.description}</td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex justify-center gap-2">
                      <button onClick={() => navigate(`/ModifierFiliere/${filiere.id}`)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" >
                        <Edit size={18} />
                      </button>
                      <button onClick={() => DeleteFiliere(filiere.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
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

        {/* Footer avec pagination */}
            <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center flex-wrap gap-4">
              <p className="text-sm text-gray-500 whitespace-nowrap">
                Total: {filieres.length} filières
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
  );
}