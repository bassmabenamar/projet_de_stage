import React from "react";
import { ArrowLeft, User, Mail, Lock, Phone, Briefcase, GraduationCap, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ModifierFormateur() {
  const navigate = useNavigate();
  const formateur = {
    id: 1,
    firstName: "Karim",
    lastName: "Benali",
    email: "karim.benali@amity.com",
    phone: "+212 6XX XXX XXX",
    specialite: "Développement Web",
    experience: "8 ans",
    status: "Actif"
  };

  const handleRetour = () => {
    navigate("/ListeFormateurs")
    console.log("Retour à la liste");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formateur modifié");
    alert("Formateur modifié avec succès (simulation)");
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
            <button onClick={handleRetour} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <div>
              <h1 className="text-3xl font-semibold m-0 mb-2 text-gray-800">Modifier le formateur</h1>
              <p className="text-gray-500 m-0">Modifiez les informations du formateur.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Prénom <span className="text-red-500">*</span></label>
                  <input type="text" defaultValue={formateur.firstName} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Nom <span className="text-red-500">*</span></label>
                  <input type="text" defaultValue={formateur.lastName} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Email <span className="text-red-500">*</span></label>
                  <input type="email" defaultValue={formateur.email} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Téléphone <span className="text-red-500">*</span></label>
                  <input type="tel" defaultValue={formateur.phone} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Nouveau mot de passe</label>
                  <input type="password" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all" placeholder="Laisser vide pour garder l'actuel" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Confirmer mot de passe</label>
                  <input type="password" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all" placeholder="Confirmez le nouveau mot de passe" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Spécialité <span className="text-red-500">*</span></label>
                  <select defaultValue={formateur.specialite} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all bg-white">
                    <option value="Développement Web">Développement Web</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Cybersécurité">Cybersécurité</option>
                    <option value="Intelligence Artificielle">Intelligence Artificielle</option>
                    <option value="Marketing Digital">Marketing Digital</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Années d'expérience <span className="text-red-500">*</span></label>
                  <input type="text" defaultValue={formateur.experience} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Statut</label>
                  <select defaultValue={formateur.status} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all bg-white">
                    <option value="Actif">Actif</option>
                    <option value="Inactif">Inactif</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
                <button type="button" onClick={handleAnnuler} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                  Annuler
                </button>
                <button type="submit" className="px-4 py-2 bg-[#2F5D9F] text-white rounded-lg font-medium flex items-center gap-2 hover:bg-[#1e3d6b] transition-colors shadow-sm">
                  Modifier le formateur
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}