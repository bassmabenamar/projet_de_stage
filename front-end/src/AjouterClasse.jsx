import React, { useState } from "react";
import { ArrowLeft, BookOpen, GraduationCap, Calendar, AlertCircle, MapPin, Plus, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AjouterClasse() {
  const navigate = useNavigate();
  const [salles, setSalles] = useState([""]);

  const handleAjouterSalle = () => {
    setSalles([...salles, ""]);
  };

  const handleSupprimerSalle = (index) => {
    const nouvellesSalles = salles.filter((_, i) => i !== index);
    setSalles(nouvellesSalles);
  };

  const handleSalleChange = (index, value) => {
    const nouvellesSalles = [...salles];
    nouvellesSalles[index] = value;
    setSalles(nouvellesSalles);
  };

  const handleRetour = () => {
    navigate("/ListeClasses")
    console.log("Retour à la liste");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Classe ajoutée avec salles principales et supplémentaires");
    alert("Classe ajoutée avec succès (simulation)");
  };

  const handleAnnuler = () => {
    console.log("Annuler");
    alert("Annuler (simulation)");
  };

  // Liste des salles disponibles
  const sallesDisponibles = [
    "A101", "A102", "A103", "A104",
    "B101", "B102", "B103", "B104",
    "C101", "C102", "C103", "C104",
    "Lab Info 1", "Lab Info 2", "Lab Info 3",
    "Lab Data", "Lab IA", "Lab Sécurité",
    "Salle TP 1", "Salle TP 2", "Amphi A", "Amphi B"
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col overflow-auto">
        <div className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <button onClick={handleRetour} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <div>
              <h1 className="text-3xl font-semibold m-0 mb-2 text-gray-800">Ajouter une classe</h1>
              <p className="text-gray-500 m-0">Remplissez les informations pour ajouter une nouvelle classe.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    <BookOpen size={14} className="inline mr-1" />
                    Nom de la classe <span className="text-red-500">*</span>
                  </label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all" placeholder="Ex: 2ème Année Génie Logiciel" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    <GraduationCap size={14} className="inline mr-1" />
                    Niveau <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all bg-white">
                    <option value="">Sélectionner un niveau</option>
                    <option value="1ère Année">1ère Année</option>
                    <option value="2ème Année">2ème Année</option>
                    <option value="3ème Année">3ème Année</option>
                    <option value="Master 1">Master 1</option>
                    <option value="Master 2">Master 2</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    <BookOpen size={14} className="inline mr-1" />
                    Filière <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all bg-white">
                    <option value="">Sélectionner une filière</option>
                    <option value="Génie Logiciel">Génie Logiciel</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Cybersécurité">Cybersécurité</option>
                    <option value="Intelligence Artificielle">Intelligence Artificielle</option>
                    <option value="Marketing Digital">Marketing Digital</option>
                    <option value="DevOps">DevOps</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    <Calendar size={14} className="inline mr-1" />
                    Année scolaire <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all bg-white">
                    <option value="2024-2025">2024-2025</option>
                    <option value="2023-2024">2023-2024</option>
                    <option value="2022-2023">2022-2023</option>
                  </select>
                </div>

                {/* Salle principale - SELECT */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    <MapPin size={14} className="inline mr-1" />
                    Salle principale <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all bg-white">
                    <option value="">Sélectionner une salle</option>
                    <optgroup label="Salles standard">
                      <option value="A101">A101</option>
                      <option value="A102">A102</option>
                      <option value="A103">A103</option>
                      <option value="A104">A104</option>
                      <option value="B101">B101</option>
                      <option value="B102">B102</option>
                      <option value="B103">B103</option>
                      <option value="B104">B104</option>
                      <option value="C101">C101</option>
                      <option value="C102">C102</option>
                      <option value="C103">C103</option>
                      <option value="C104">C104</option>
                    </optgroup>
                    <optgroup label="Laboratoires">
                      <option value="Lab Info 1">Lab Info 1</option>
                      <option value="Lab Info 2">Lab Info 2</option>
                      <option value="Lab Info 3">Lab Info 3</option>
                      <option value="Lab Data">Lab Data</option>
                      <option value="Lab IA">Lab IA</option>
                      <option value="Lab Sécurité">Lab Sécurité</option>
                    </optgroup>
                    <optgroup label="Salles spécialisées">
                      <option value="Salle TP 1">Salle TP 1</option>
                      <option value="Salle TP 2">Salle TP 2</option>
                      <option value="Amphi A">Amphi A</option>
                      <option value="Amphi B">Amphi B</option>
                    </optgroup>
                  </select>
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

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2 text-gray-700">Description</label>
                  <textarea rows="3" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all" placeholder="Description de la classe..." />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
                <button type="button" onClick={handleAnnuler} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                  Annuler
                </button>
                <button type="submit" className="px-4 py-2 bg-[#E55B2D] text-white rounded-lg font-medium flex items-center gap-2 hover:bg-[#c44d24] transition-colors shadow-sm">
                  Ajouter la classe
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}