import React from "react";
import { ArrowLeft, User, Mail, Phone, MapPin, BookOpen, Calendar, Info, CheckCircle, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function DetailsEtudiant() {
  const navigate = useNavigate();
  // Données statiques pour l'étudiant
  const etudiant = {
    id: 1,
    name: "Sarah Martin",
    email: "sarah.martin@amity.com",
    phone: "+212 6XX XXX XXX",
    address: "Casablanca, Maroc",
    class: "2ème Année",
    status: "Actif",
    bio: "Étudiante passionnée par le développement web et les nouvelles technologies. Toujours motivée et participative en classe.",
    createdAt: "2024-01-15",
    updatedAt: "2024-03-20",
    photoUrl: null
  };

  const handleRetour = () => {
    navigate("/ListeEtudiants")
    console.log("Retour à la liste");
  };

  const getInitials = () => {
    return `${etudiant.name.split(' ')[0]?.[0] || ''}${etudiant.name.split(' ')[1]?.[0] || ''}`.toUpperCase();
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
                <h2 className="text-2xl font-bold text-gray-800">{etudiant.name}</h2>
                <div className="flex items-center gap-3 mt-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    etudiant.status === "Actif" 
                      ? "bg-green-100 text-green-700" 
                      : "bg-red-100 text-red-700"
                  }`}>
                    {etudiant.status === "Actif" ? "Actif" : "Inactif"}
                  </span>
                  <span className="text-sm text-gray-500">ID: {etudiant.id}</span>
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
                      <p className="text-sm font-medium text-gray-800">{etudiant.name}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail size={16} className="text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="text-sm font-medium text-gray-800">{etudiant.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone size={16} className="text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500">Téléphone</p>
                      <p className="text-sm font-medium text-gray-800">{etudiant.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin size={16} className="text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500">Adresse</p>
                      <p className="text-sm font-medium text-gray-800">{etudiant.address}</p>
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
                    <BookOpen size={16} className="text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500">Classe</p>
                      <p className="text-sm font-medium text-gray-800">{etudiant.class}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    {etudiant.status === "Actif" ? (
                      <CheckCircle size={16} className="text-green-500 mt-0.5" />
                    ) : (
                      <XCircle size={16} className="text-red-500 mt-0.5" />
                    )}
                    <div>
                      <p className="text-xs text-gray-500">Statut</p>
                      <p className={`text-sm font-medium ${etudiant.status === "Actif" ? "text-green-700" : "text-red-700"}`}>
                        {etudiant.status}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Colonne droite */}
            <div className="space-y-6">
              {/* Biographie */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Info size={20} className="text-[#2F5D9F]" />
                  Biographie
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">{etudiant.bio}</p>
              </div>

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
                      <p className="text-sm font-medium text-gray-800">{etudiant.createdAt}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar size={16} className="text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500">Dernière modification</p>
                      <p className="text-sm font-medium text-gray-800">{etudiant.updatedAt}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Boutons d'action */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Actions</h3>
                <div className="flex gap-3">
                  <button onClick={()=>navigate("/ModifierEtudiant")} className="flex-1 px-4 py-2 bg-[#2F5D9F] text-white rounded-lg font-medium hover:bg-[#1e3d6b] transition-colors">
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