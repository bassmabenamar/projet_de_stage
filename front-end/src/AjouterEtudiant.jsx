import React from "react";
import { ArrowLeft, User, Mail, Lock, Phone, MapPin, BookOpen,School, AlertCircle,Calendar,Users, Bus, GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AjouterEtudiant() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col overflow-auto">
        <div className="p-6">
          {/* Header avec bouton retour */}
          <div className="flex items-center gap-4 mb-6">
            <button onClick={()=>navigate("/ListeEtudiants")} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <div>
              <h1 className="text-3xl font-semibold m-0 mb-2 text-gray-800">Ajouter un étudiant</h1>
              <p className="text-gray-500 m-0">Remplissez les informations pour ajouter un nouvel étudiant.</p>
            </div>
          </div>

          {/* Formulaire */}
          <form className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Prénom */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    <User size={14} className="inline mr-1" />
                    Prénom <span className="text-red-500">*</span>
                  </label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all" placeholder="Entrez le prénom" />
                </div>

                {/* Nom */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    <User size={14} className="inline mr-1" />
                    Nom <span className="text-red-500">*</span>
                  </label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all" placeholder="Entrez le nom" />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    <Mail size={14} className="inline mr-1" />
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all" placeholder="exemple@amity.com" />
                </div>

                {/* Téléphone */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    <Phone size={14} className="inline mr-1" />
                    Téléphone <span className="text-red-500">*</span>
                  </label>
                  <input type="tel" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all" placeholder="+212 6XX XXX XXX" />
                </div>

                {/* Mot de passe */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    <Lock size={14} className="inline mr-1" />
                    Mot de passe <span className="text-red-500">*</span>
                  </label>
                  <input type="password" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all" placeholder="Minimum 6 caractères" />
                </div>

                {/* Confirmer mot de passe */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    <Calendar size={14} className="inline mr-1" />
                    Date de naissance <span className="text-red-500">*</span>
                  </label>
                  <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all" placeholder="Confirmez le mot de passe" />
                </div>

                {/* Adresse */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    <MapPin size={14} className="inline mr-1" />
                    Adresse
                  </label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all" placeholder="Adresse de l'étudiant" />
                </div>

                {/* Genre */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    <Users size={14} className="inline mr-1" />
                    Genre <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all bg-white">
                    <option value="">Sélectionner le genre</option>
                    <option value="Homme">Homme</option>
                    <option value="Femme">Femme</option>
                  </select>
                </div>

                {/* Niveau scolaire */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    <BookOpen  size={14} className="inline mr-1" />
                    Niveau scolaire <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all bg-white">
                    <option value="">Sélectionner une niveau scolaire</option>
                    <option value="1ère Année">Primaire</option>
                    <option value="2ème Année">Collège</option>
                    <option value="3ème Année">Lycée</option>
                  </select>
                </div>

                {/* Classe */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    <School  size={14} className="inline mr-1" />
                    Classe <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all bg-white">
                    <option value="">Sélectionner une classe</option>
                    <option value="1ère Année">1ère Année</option>
                    <option value="2ème Année">2ème Année</option>
                    <option value="3ème Année">3ème Année</option>
                  </select>
                </div>

                {/* Filière */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    <GraduationCap size={14} className="inline mr-1" />
                    Filière <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/20 transition-all bg-white">
                    <option value="">Sélectionner une filière</option>
                    <option value="science_math">Sciences Mathématiques</option>
                    <option value="science_pc">Sciences Physiques</option>
                    <option value="science_svt">Sciences de la Vie et de la Terre</option>
                    <option value="economie">Économie et Gestion</option>
                    <option value="informatique">Informatique</option>
                  </select>
                </div>

                {/* Transport */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    <Bus size={14} className="inline mr-1" />
                    Transport <span className="text-red-500">*</span>
                  </label>

                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/20 transition-all bg-white">
                    <option value="">Sélectionner un transport</option>

                    <option value="avec_transport">Avec transport</option>
                    <option value="sans_transport">Sans transport</option>
                  </select>
                </div>

                {/* Date d'inscription */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    <Calendar size={14} className="inline mr-1" />
                    Date d'inscription <span className="text-red-500">*</span>
                  </label>
                  <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all text-gray-700" />
                </div>

                {/* Statut */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    <AlertCircle size={14} className="inline mr-1" />
                    Statut
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all bg-white">
                    <option value="Actif">Actif</option>
                    <option value="Inactif">Inactif</option>
                  </select>
                </div>
              </div>

              {/* Boutons */}
              <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
                <button type="button" className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                  Annuler
                </button>
                <button type="submit" className="px-4 py-2 bg-[#E55B2D] text-white rounded-lg font-medium flex items-center gap-2 hover:bg-[#c44d24] transition-colors shadow-sm">
                  Ajouter l'étudiant
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}