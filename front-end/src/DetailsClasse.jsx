import { ArrowLeft, Users, UserCheck, BookOpen, Calendar, GraduationCap, MapPin, Info, School, AlertCircle } from "lucide-react";
import { useNavigate,useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function DetailsClasse() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("etudiants");

  const [classe, setClasse] = useState(null);
  const [etudiants, setEtudiants] = useState([]);
  const [formateurs, setFormateurs] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    async function getOne() {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/classes/${id}`,{
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setClasse(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getOne();
  }, [id]);

  useEffect(() => {
    async function getEtudiants() {
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/api/classes/${id}/etudiants`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setEtudiants(res.data);

      } catch (error) {
        console.log(error);
      }
    }

    getEtudiants();
  }, [id]);

  useEffect(() => {
    async function getFormateurs() {
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/api/classes/${id}/formateurs`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setFormateurs(res.data);

      } catch (error) {
        console.log(error);
      }
    }

    getFormateurs();
  }, [id]);

  if (!classe) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    );
  }

  const handleRetour = () => {
    navigate("/ListeClasses");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col overflow-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <button onClick={handleRetour} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <div>
              <h1 className="text-3xl font-semibold m-0 mb-2 text-gray-800">Détails de la classe</h1>
              <p className="text-gray-500 m-0">Consultez les informations de la classe.</p>
            </div>
          </div>

          {/* Infos classe */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm mb-6">
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700">
                        <School size={14} className="inline mr-1" />
                        Nom de la classe
                      </label>
                      <p className="text-gray-800 font-medium">{classe?.nom_classe}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700">
                        <Users size={14} className="inline mr-1" />
                        Capacité
                      </label>
                      <p className="text-gray-800 font-medium">{classe?.capacite} étudiants</p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    <BookOpen size={14} className="inline mr-1" />
                    Niveau
                  </label>
                  <p className="text-gray-800 font-medium">{classe.niveauScolaire?.nom_niveau}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    <GraduationCap size={14} className="inline mr-1" />
                    Filière
                  </label>
                  <p className="text-gray-800 font-medium">{classe.filiere?.nom_filiere}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    <Calendar size={14} className="inline mr-1" />
                    Année scolaire
                  </label>
                  <p className="text-gray-800 font-medium">{classe?.annee_scolaire}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    <MapPin size={14} className="inline mr-1" />
                    Salle principale
                  </label>
                  <p className="text-gray-800 font-medium">{classe.salle?.nom_salle}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    <Calendar size={14} className="inline mr-1" />
                    Date de création
                  </label>
                  <p className="text-gray-800 font-medium">{new Date(classe.created_at).toLocaleString()}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    <Calendar size={14} className="inline mr-1" />
                    Dernière modification
                  </label>
                  <p className="text-gray-800 font-medium">{new Date(classe.updated_at).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm text-center">
              <Users size={24} className="mx-auto mb-2 text-[#2F5D9F]" />
              <p className="text-2xl font-bold text-gray-800">{etudiants.length}</p>
              <p className="text-xs text-gray-500">Étudiants</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm text-center">
              <UserCheck size={24} className="mx-auto mb-2 text-[#2F5D9F]" />
              <p className="text-2xl font-bold text-gray-800">{formateurs.length}</p>
              <p className="text-xs text-gray-500">Formateurs</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm text-center">
              <School size={24} className="mx-auto mb-2 text-[#2F5D9F]" />
              <p className="text-2xl font-bold text-gray-800">1</p>
              <p className="text-xs text-gray-500">Salle principale</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <div className="border-b border-gray-200">
              <div className="flex gap-2 px-6 overflow-x-auto">
                <button onClick={() => setActiveTab("etudiants")}
                  className={`px-4 py-3 text-sm font-medium transition-colors relative whitespace-nowrap ${
                    activeTab === "etudiants" 
                      ? "text-[#E55B2D] border-b-2 border-[#E55B2D]" 
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  <Users size={16} className="inline mr-2" />
                  Étudiants ({etudiants.length})
                </button>
                <button
                  onClick={() => setActiveTab("formateurs")}
                  className={`px-4 py-3 text-sm font-medium transition-colors relative whitespace-nowrap ${
                    activeTab === "formateurs" 
                      ? "text-[#E55B2D] border-b-2 border-[#E55B2D]" 
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  <UserCheck size={16} className="inline mr-2" />
                  Formateurs ({formateurs.length})
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Tab Étudiants */}
              {activeTab === "etudiants" && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Liste des étudiants</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">N°</th>
                          <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Nom</th>
                          <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Email</th>
                          <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Téléphone</th>
                          <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Date d'inscription</th>
                          <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Statut</th>
                        </tr>
                      </thead>
                      <tbody>
                        {etudiants.map((etudiant, index) => (
                          <tr key={etudiant.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-3 text-sm text-gray-700">{index + 1}</td>
                            <td className="px-4 py-3 text-sm font-medium text-gray-800">{etudiant.nom} {etudiant.prenom}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{etudiant.email}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{etudiant.phone}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{etudiant.date_inscription}</td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                etudiant.status === "actif" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                              }`}>
                                {etudiant.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Tab Formateurs */}
              {activeTab === "formateurs" && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Liste des formateurs</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">N°</th>
                          <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Nom</th>
                          <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Email</th>
                          <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Spécialité</th>
                          <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Statut</th>
                        </tr>
                      </thead>
                      <tbody>
                        {formateurs.map((formateur, index) => (
                          <tr key={formateur.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-3 text-sm text-gray-700">{index + 1}</td>
                            <td className="px-4 py-3 text-sm font-medium text-gray-800">{formateur.name}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{formateur.email}</td>
                            <td className="px-4 py-3">
                              <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                                {formateur.specialite}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                formateur.status === "Actif" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                              }`}>
                                {formateur.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}