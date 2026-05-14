import React from "react";
import { ArrowLeft, User, Mail,Coins , Lock, Phone, Briefcase, GraduationCap, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AjouterFormateur() {
  const navigate = useNavigate();

  const handleRetour = () => {
    navigate("/ListeFormateurs")
    console.log("Retour à la liste");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formateur ajouté");
    alert("Formateur ajouté avec succès (simulation)");
  };

  const handleAnnuler = () => {
    console.log("Annuler");
    alert("Annuler (simulation)");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col overflow-auto">
        <div className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <button 
              onClick={handleRetour}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <div>
              <h1 className="text-3xl font-semibold m-0 mb-2 text-gray-800">Ajouter un formateur</h1>
              <p className="text-gray-500 m-0">Remplissez les informations pour ajouter un nouveau formateur.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    <User size={14} className="inline mr-1" />
                    Prénom <span className="text-red-500">*</span>
                  </label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all" placeholder="Entrez le prénom" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    <User size={14} className="inline mr-1" />
                    Nom <span className="text-red-500">*</span>
                  </label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all" placeholder="Entrez le nom" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    <Mail size={14} className="inline mr-1" />
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all" placeholder="exemple@amity.com" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    <Phone size={14} className="inline mr-1" />
                    Téléphone <span className="text-red-500">*</span>
                  </label>
                  <input type="tel" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all" placeholder="+212 6XX XXX XXX" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    <Lock size={14} className="inline mr-1" />
                    Mot de passe <span className="text-red-500">*</span>
                  </label>
                  <input type="password" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all" placeholder="Minimum 6 caractères" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    <Lock size={14} className="inline mr-1" />
                    Confirmer mot de passe <span className="text-red-500">*</span>
                  </label>
                  <input type="password" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all" placeholder="Confirmez le mot de passe" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    <Briefcase size={14} className="inline mr-1" />
                    Spécialité <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all bg-white">
                    <option value="">Sélectionner une spécialité</option>
                    <option value="Développement Web">Développement Web</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Cybersécurité">Cybersécurité</option>
                    <option value="Intelligence Artificielle">Intelligence Artificielle</option>
                    <option value="Marketing Digital">Marketing Digital</option>
                    <option value="DevOps">DevOps</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    <Coins size={14} className="inline mr-1" />
                    Salaire <span className="text-red-500">*</span>
                  </label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all" placeholder="Ex: 15000 MAD" />
                </div>

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

              <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
                <button type="button" onClick={handleAnnuler} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                  Annuler
                </button>
                <button type="submit" className="px-4 py-2 bg-[#E55B2D] text-white rounded-lg font-medium flex items-center gap-2 hover:bg-[#c44d24] transition-colors shadow-sm">
                  Ajouter le formateur
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}