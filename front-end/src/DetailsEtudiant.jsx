import React from "react";
import { ArrowLeft, User, Mail, GraduationCap, Bus, Phone, School, MapPin, BookOpen, Calendar, Info, CheckCircle, XCircle } from "lucide-react";
import { useNavigate,useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function DetailsEtudiant() {
  const navigate = useNavigate();
  
  const [etudiants, setEtudiants] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    async function getOne() {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/etudiants/${id}`,{
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setEtudiants(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getOne();
  }, [id]);

    if (!etudiants) return <div>Loading...</div>;

  const handleRetour = () => {
    navigate("/ListeEtudiants")
  };

  const getInitials = () => {
    return `${etudiants.nom?.split(' ')[0]?.[0] || ''}${etudiants.nom?.split(' ')[1]?.[0] || ''}`.toUpperCase();
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col overflow-auto">
        <div className="p-6">
          {/* Header avec bouton retour */}
          <div className="flex items-center gap-4 mb-6">
            <button onClick={handleRetour} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <div>
              <h1 className="text-3xl font-semibold m-0 mb-2 text-gray-800">Détails de l'étudiant</h1>
              <p className="text-gray-500 m-0">Consultez toutes les informations de l'étudiant.</p>
            </div>
          </div>

          {/* Profile Header */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#2F5D9F] to-[#E55B2D] flex items-center justify-center text-white text-2xl font-bold">
                {getInitials()}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{etudiants.nom} {etudiants.prenom}</h2>
                <div className="flex items-center gap-3 mt-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    etudiants.status === "actif" 
                      ? "bg-green-100 text-green-700" 
                      : "bg-red-100 text-red-700"
                  }`}>
                    {etudiants.status === "actif" ? "actif" : "inactif"}
                  </span>
                  <span className="text-sm text-gray-500">ID: {etudiants.id}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Informations détaillées */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Colonne gauche */}
            <div className="space-y-6">
              {/* Informations personnelles */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <User size={20} className="text-[#2F5D9F]" />
                  Informations personnelles
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <User size={16} className="text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500">Nom complet</p>
                      <p className="text-sm font-medium text-gray-800">{etudiants.nom} {etudiants.prenom}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail size={16} className="text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="text-sm font-medium text-gray-800">{etudiants.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone size={16} className="text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500">Téléphone</p>
                      <p className="text-sm font-medium text-gray-800">{etudiants.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin size={16} className="text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500">Adresse</p>
                      <p className="text-sm font-medium text-gray-800">{etudiants.adresse}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <User size={16} className="text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500">Genre</p>
                      <p className="text-sm font-medium text-gray-800">{etudiants.genre}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar size={16} className="text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500">Date Naissance</p>
                      <p className="text-sm font-medium text-gray-800">{etudiants.date_naissance}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Informations académiques */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <BookOpen size={20} className="text-[#2F5D9F]" />
                  Informations académiques
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <School size={16} className="text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500">Classe</p>
                      <p className="text-sm font-medium text-gray-800">{etudiants.classe?.nom_classe}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <GraduationCap size={16} className="text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500">Filiere</p>
                      <p className="text-sm font-medium text-gray-800">{etudiants.filiere?.nom_filiere}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <BookOpen size={16} className="text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500">Niveau Scolaire</p>
                      <p className="text-sm font-medium text-gray-800">{etudiants.niveau_scolaire?.nom_niveau}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Bus size={16} className="text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500">Transport</p>
                      <p className="text-sm font-medium text-gray-800">{etudiants.transport?.nom_transport}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    {etudiants.status === "actif" ? (
                      <CheckCircle size={16} className="text-green-500 mt-0.5" />
                    ) : (
                      <XCircle size={16} className="text-red-500 mt-0.5" />
                    )}
                    <div>
                      <p className="text-xs text-gray-500">Statut</p>
                      <p className={`text-sm font-medium ${etudiants.status === "actif" ? "text-green-700" : "text-red-700"}`}>
                        {etudiants.status}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Colonne droite */}
            <div className="space-y-6">
              {/* Dates importantes */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Calendar size={20} className="text-[#2F5D9F]" />
                  Dates importantes
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Calendar size={16} className="text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500">Date d'inscription</p>
                      <p className="text-sm font-medium text-gray-800">{etudiants.date_inscription}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar size={16} className="text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500">Dernière modification</p>
                      <p className="text-sm font-medium text-gray-800">{new Date(etudiants.updated_at).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Boutons d'action */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Actions</h3>
                <div className="flex gap-3">
                  <button onClick={()=>navigate("/ModifierEtudiants")} className="flex-1 px-4 py-2 bg-[#2F5D9F] text-white rounded-lg font-medium hover:bg-[#1e3d6b] transition-colors">
                    Modifier
                  </button>
                  <button onClick={()=>navigate("/ListeEtudiants")} className="flex-1 px-4 py-2 border border-red-500 text-red-500 rounded-lg font-medium hover:bg-red-50 transition-colors">
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}