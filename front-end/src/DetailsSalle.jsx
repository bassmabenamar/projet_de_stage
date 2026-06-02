import {ArrowLeft, MapPin, Users, Calendar, Edit, Trash2,CheckCircle, XCircle, AlertCircle, Clock, Plus} from "lucide-react";
import { useNavigate,useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function DetailsSalle() {
  const [activeTab, setActiveTab] = useState("informations");

  const navigate = useNavigate();

  const [salle, setSalles] = useState(null);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getOne() {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/salles/${id}`,{
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setLoading(false);
        setSalles(res.data);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    getOne();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (!salle) {
  return (
    <div className="flex justify-center items-center h-screen">
      Salle introuvable
    </div>
  );
}

  const horaires = [
      { jour: "Lundi", horaire: "08:30 - 15:00" },
      { jour: "Mardi", horaire: "08:30 - 15:00" },
      { jour: "Mercredi", horaire: "08:30 - 15:00" },
      { jour: "Jeudi", horaire: "08:30 - 15:00" },
      { jour: "Vendredi", horaire: "08:30 - 13:00" },
    ]

  const handleRetour = () => {
    navigate("/ListeSalles")
  };

  async function DeleteSalle(id) {
  try {
    await axios.delete(`http://127.0.0.1:8000/api/salles/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    navigate("/ListeSalles");
  } catch (error) {
    console.log(error);
  }
}

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
              <h1 className="text-3xl font-semibold m-0 mb-2 text-gray-800">Détails de la salle</h1>
              <p className="text-gray-500 m-0">Consultez les informations de la salle, équipements et réservations.</p>
            </div>
          </div>

          {/* Infos salle */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#2F5D9F] to-[#E55B2D] flex items-center justify-center text-white text-2xl font-bold">
                  <MapPin size={28} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{salle.nom_salle}</h2>
                  <div className="flex items-center gap-3 mt-2 flex-wrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      salle.type_salle === "Laboratoire" ? "bg-purple-100 text-purple-700" :
                      salle.type_salle === "Amphithéâtre" ? "bg-orange-100 text-orange-700" :
                      salle.type_salle === "Salle TP" ? "bg-cyan-100 text-cyan-700" :
                      "bg-blue-100 text-blue-700"
                    }`}>
                      {salle.type_salle}
                    </span>
                    <span className="text-sm text-gray-500">Capacité: {salle.capacite} personnes</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
                      salle.statut === "Disponible" ? "bg-green-100 text-green-700" :
                      salle.statut === "Occupée" ? "bg-red-100 text-red-700" :
                      "bg-yellow-100 text-yellow-700"
                    }`}>
                      {salle.statut === "Disponible" && <CheckCircle size={14} className="text-green-500" />}
                      {salle.statut === "Occupée" && <XCircle size={14} className="text-red-500" />}
                      {salle.statut === "En maintenance" && <AlertCircle size={14} className="text-yellow-500" />}
                      {salle.statut}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button  onClick={() => navigate(`/ModifierSalle/${salle.id}`)} className="px-4 py-2 bg-[#2F5D9F] text-white rounded-lg font-medium flex items-center gap-2 hover:bg-[#1e3d6b] transition-colors">
                  <Edit size={16} />
                  Modifier
                </button>
                <button onClick={() => DeleteSalle(salle.id)} className="px-4 py-2 border border-red-500 text-red-500 rounded-lg font-medium flex items-center gap-2 hover:bg-red-50 transition-colors">
                  <Trash2 size={16} />
                  Supprimer
                </button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <div className="border-b border-gray-200">
              <div className="flex gap-2 px-6 overflow-x-auto">
                <button onClick={() => setActiveTab("informations")}
                  className={`px-4 py-3 text-sm font-medium transition-colors relative whitespace-nowrap ${
                    activeTab === "informations" 
                      ? "text-[#E55B2D] border-b-2 border-[#E55B2D]" 
                      : "text-gray-600 hover:text-gray-800"
                  }`}>
                  <MapPin size={16} className="inline mr-2" />
                  Informations
                </button>
                <button
                  onClick={() => setActiveTab("classes")}
                  className={`px-4 py-3 text-sm font-medium transition-colors relative whitespace-nowrap ${
                    activeTab === "classes" 
                      ? "text-[#E55B2D] border-b-2 border-[#E55B2D]" 
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  <Calendar size={16} className="inline mr-2" />
                  Classes  (1)
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Tab Informations */}
              {activeTab === "informations" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-md font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <MapPin size={18} className="text-[#2F5D9F]" />
                        Informations générales
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <p className="text-xs text-gray-500">Nom de la salle</p>
                          <p className="text-sm font-medium text-gray-800">{salle.nom_salle}</p>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <p className="text-xs text-gray-500">Type</p>
                          <p className="text-sm font-medium text-gray-800">{salle.type_salle}</p>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <p className="text-xs text-gray-500">Capacité</p>
                          <p className="text-sm font-medium text-gray-800">{salle.capacite} personnes</p>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <p className="text-xs text-gray-500">Étage</p>
                          <p className="text-sm font-medium text-gray-800">{salle.etage}</p>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <p className="text-xs text-gray-500">Statut</p>
                          <p className={`text-sm font-medium flex items-center gap-1 ${
                            salle.statut === "Disponible" ? "text-green-700" :
                            salle.statut === "Occupée" ? "text-red-700" : "text-yellow-700"
                          }`}>
                            {salle.statut === "Disponible" && <CheckCircle size={14} className="text-green-500" />}
                            {salle.statut === "Occupée" && <XCircle size={14} className="text-red-500" />}
                            {salle.statut === "En maintenance" && <AlertCircle size={14} className="text-yellow-500" />}
                            {salle.statut}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-md font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <Calendar size={18} className="text-[#2F5D9F]" />
                        Dates
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <p className="text-xs text-gray-500">Date de création</p>
                          <p className="text-sm font-medium text-gray-800">{new Date(salle.created_at).toLocaleString()}</p>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <p className="text-xs text-gray-500">Dernière modification</p>
                          <p className="text-sm font-medium text-gray-800">{new Date(salle.updated_at).toLocaleString()}</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-md font-semibold text-gray-800 mb-2 flex items-center gap-2">
                        <MapPin size={18} className="text-[#2F5D9F]" />
                        Description
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-lg">{salle.description}</p>
                    </div>
                        
                    <div>
                      <h3 className="text-md font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <Clock size={18} className="text-[#2F5D9F]" />
                        Horaires d'ouverture
                      </h3>
                      <div className="space-y-2 bg-gray-50 rounded-lg p-3">
                        {horaires.map((h, index) => (
                          <div key={index} className="flex justify-between items-center py-1">
                            <span className="text-sm font-medium text-gray-700">{h.jour}</span>
                            <span className="text-sm text-gray-500">{h.horaire}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab classes */}
              {activeTab === "classes" && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-md font-semibold text-gray-800">Classes de la salle</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">N°</th>
                          <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Nom Classe</th>
                          <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Capacite</th>
                          <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Filière</th>
                        </tr>
                      </thead>
                      <tbody>
                        {salle.classe && (
                          <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-3 text-sm text-gray-700">1</td>
                            <td className="px-4 py-3 text-sm font-medium text-gray-800">
                              {salle.classe.nom_classe}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600">
                              {salle.classe.capacite}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600">
                              {salle.classe.filiere?.nom_filiere}
                            </td>
                          </tr>
                        )}
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