import React, { useState } from "react";
import { ArrowLeft, MapPin, Users, Plus, X } from "lucide-react";

export default function AjouterSalle() {
  const handleRetour = () => {
    console.log("Retour à la liste");
    alert("Retour à la liste (simulation)");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Salle ajoutée");
    alert("Salle ajoutée avec succès (simulation)");
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
              <h1 className="text-3xl font-semibold m-0 mb-2 text-gray-800">Ajouter une salle</h1>
              <p className="text-gray-500 m-0">Remplissez les informations pour ajouter une nouvelle salle.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    <MapPin size={14} className="inline mr-1" />
                    Nom de la salle <span className="text-red-500">*</span>
                  </label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all" placeholder="Ex: A101, Lab Info 1" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Type de salle <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all bg-white">
                    <option value="">Sélectionner un type</option>
                    <option value="Salle standard">Salle standard</option>
                    <option value="Laboratoire">Laboratoire</option>
                    <option value="Amphithéâtre">Amphithéâtre</option>
                    <option value="Salle TP">Salle TP</option>
                    <option value="Salle de réunion">Salle de réunion</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    <Users size={14} className="inline mr-1" />
                    Capacité <span className="text-red-500">*</span>
                  </label>
                  <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all" placeholder="Nombre de places" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Bâtiment <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all bg-white">
                    <option value="">Sélectionner un bâtiment</option>
                    <option value="Bâtiment A">Bâtiment A</option>
                    <option value="Bâtiment B">Bâtiment B</option>
                    <option value="Bâtiment C">Bâtiment C</option>
                    <option value="Bâtiment D">Bâtiment D</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Étage</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all bg-white">
                    <option value="Rez-de-chaussée">Rez-de-chaussée</option>
                    <option value="1er étage">1er étage</option>
                    <option value="2ème étage">2ème étage</option>
                    <option value="3ème étage">3ème étage</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Statut</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all bg-white">
                    <option value="Disponible">Disponible</option>
                    <option value="Occupée">Occupée</option>
                    <option value="En maintenance">En maintenance</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2 text-gray-700">Description</label>
                  <textarea 
                    rows="3" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all" 
                    placeholder="Description de la salle..."
                  />
                </div>
              </div>

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
                  className="px-4 py-2 bg-[#E55B2D] text-white rounded-lg font-medium flex items-center gap-2 hover:bg-[#c44d24] transition-colors shadow-sm"
                >
                  Ajouter la salle
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}