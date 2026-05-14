import React from "react";
import { ArrowLeft, User, Mail, Lock, Phone, MapPin, BookOpen, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ModifierEtudiant() {
  const navigate = useNavigate();
  // Données statiques pour l'étudiant (simulation)
  const etudiant = {
    id: 1,
    firstName: "Sarah",
    lastName: "Martin",
    email: "sarah.martin@amity.com",
    phone: "+212 6XX XXX XXX",
    address: "Casablanca, Maroc",
    class: "2ème Année",
    status: "Actif"
  };

  const handleRetour = () => {
    navigate("/ListeEtudiants")
    console.log("Retour à la liste");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Étudiant modifié:", etudiant);
    alert("Étudiant modifié avec succès (simulation)");
  };

  const handleAnnuler = () => {
    console.log("Annuler");
    alert("Annuler (simulation)");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col overflow-auto">
        <div className="p-6">
          {/* Header avec bouton retour */}
          <div className="flex items-center gap-4 mb-6">
            <button 
              onClick={handleRetour}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <div>
              <h1 className="text-3xl font-semibold m-0 mb-2 text-gray-800">Modifier l'étudiant</h1>
              <p className="text-gray-500 m-0">Modifiez les informations de l'étudiant.</p>
            </div>
          </div>

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Prénom */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    <User size={14} className="inline mr-1" />
                    Prénom <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    defaultValue={etudiant.firstName}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all"
                    placeholder="Entrez le prénom"
                  />
                </div>

                {/* Nom */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    <User size={14} className="inline mr-1" />
                    Nom <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    defaultValue={etudiant.lastName}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all"
                    placeholder="Entrez le nom"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    <Mail size={14} className="inline mr-1" />
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    defaultValue={etudiant.email}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all"
                    placeholder="exemple@amity.com"
                  />
                </div>

                {/* Téléphone */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    <Phone size={14} className="inline mr-1" />
                    Téléphone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    defaultValue={etudiant.phone}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all"
                    placeholder="+212 6XX XXX XXX"
                  />
                </div>

                {/* Mot de passe (optionnel) */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    <Lock size={14} className="inline mr-1" />
                    Nouveau mot de passe
                  </label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all"
                    placeholder="Laisser vide pour garder l'actuel"
                  />
                </div>

                {/* Confirmer mot de passe */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    <Lock size={14} className="inline mr-1" />
                    Confirmer mot de passe
                  </label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all"
                    placeholder="Confirmez le nouveau mot de passe"
                  />
                </div>

                {/* Adresse */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    <MapPin size={14} className="inline mr-1" />
                    Adresse
                  </label>
                  <input
                    type="text"
                    defaultValue={etudiant.address}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all"
                    placeholder="Adresse de l'étudiant"
                  />
                </div>

                {/* Classe */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    <BookOpen size={14} className="inline mr-1" />
                    Classe <span className="text-red-500">*</span>
                  </label>
                  <select 
                    defaultValue={etudiant.class}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all bg-white"
                  >
                    <option value="1ère Année">1ère Année</option>
                    <option value="2ème Année">2ème Année</option>
                    <option value="3ème Année">3ème Année</option>
                    <option value="Master 1">Master 1</option>
                    <option value="Master 2">Master 2</option>
                  </select>
                </div>

                {/* Statut */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    <AlertCircle size={14} className="inline mr-1" />
                    Statut
                  </label>
                  <select 
                    defaultValue={etudiant.status}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all bg-white"
                  >
                    <option value="Actif">Actif</option>
                    <option value="Inactif">Inactif</option>
                  </select>
                </div>
              </div>

              {/* Boutons */}
              <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleAnnuler}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#2F5D9F] text-white rounded-lg font-medium flex items-center gap-2 hover:bg-[#1e3d6b] transition-colors shadow-sm"
                >
                  Modifier l'étudiant
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}