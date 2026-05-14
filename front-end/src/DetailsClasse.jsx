import React, { useState } from "react";
import { ArrowLeft, Users, UserCheck, BookOpen, Calendar, GraduationCap, MapPin, Info, ChevronRight, Plus, Trash2, Eye, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function DetailsClasse() {
    const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState("etudiants");
  const [showAjoutEtudiant, setShowAjoutEtudiant] = useState(false);
  const [showAjoutFormateur, setShowAjoutFormateur] = useState(false);

  const classe = {
    id: 1,
    name: "2ème Année Génie Logiciel",
    niveau: "2ème Année",
    filiere: "Génie Logiciel",
    anneeScolaire: "2024-2025",
    status: "Actif",
    salle: "A101",
    salles: ["Lab Info 1", "Salle TP"],
    description: "Classe spécialisée dans le développement logiciel, les méthodes agiles et les technologies modernes. Les étudiants apprennent Java, Python, React, et les frameworks modernes.",
    createdAt: "2024-01-15",
    updatedAt: "2024-03-20",
    chefClasse: "Sarah Martin",
    delegue: "Karim Benali"
  };

  const [etudiants] = useState([
    { id: 1, name: "Sarah Martin", email: "sarah@amity.com", phone: "+212 6XX XXX XXX", status: "Actif", dateInscription: "2024-01-15" },
    { id: 2, name: "Karim Benali", email: "karim@amity.com", phone: "+212 6XX XXX XXX", status: "Actif", dateInscription: "2024-01-15" },
    { id: 3, name: "Mohamed Tazi", email: "mohamed@amity.com", phone: "+212 6XX XXX XXX", status: "Actif", dateInscription: "2024-01-16" },
    { id: 4, name: "Fatima Zahra", email: "fatima@amity.com", phone: "+212 6XX XXX XXX", status: "Inactif", dateInscription: "2024-01-20" },
    { id: 5, name: "Youssef El Amrani", email: "youssef@amity.com", phone: "+212 6XX XXX XXX", status: "Actif", dateInscription: "2024-02-01" },
  ]);

  const [formateurs] = useState([
    { id: 1, name: "Dr. Karim Benali", specialite: "Développement Web", email: "karim.benali@amity.com", status: "Actif" },
    { id: 2, name: "Mme. Leila Ouazzani", specialite: "Data Science", email: "leila.ouazzani@amity.com", status: "Actif" },
    { id: 3, name: "M. Mohamed Tazi", specialite: "Cybersécurité", email: "mohamed.tazi@amity.com", status: "Actif" },
  ]);

  const handleRetour = () => {
    navigate("/ListeClasses")
    console.log("Retour à la liste");
  };

  const handleAjouterEtudiant = () => {
    setShowAjoutEtudiant(false);
    alert("Étudiant ajouté à la classe (simulation)");
  };

  const handleAjouterFormateur = () => {
    setShowAjoutFormateur(false);
    alert("Formateur ajouté à la classe (simulation)");
  };

  const handleRetirerEtudiant = (id) => {
    alert(`Retirer l'étudiant ${id} de la classe (simulation)`);
  };

  const handleRetirerFormateur = (id) => {
    alert(`Retirer le formateur ${id} de la classe (simulation)`);
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
              <p className="text-gray-500 m-0">Consultez les informations de la classe, les étudiants et les formateurs.</p>
            </div>
          </div>

          {/* Infos classe */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#2F5D9F] to-[#E55B2D] flex items-center justify-center text-white text-2xl font-bold">
                  {classe.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{classe.name}</h2>
                  <div className="flex items-center gap-3 mt-2 flex-wrap">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                      {classe.filiere}
                    </span>
                    <span className="text-sm text-gray-500">{classe.niveau}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      classe.status === "Actif" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}>
                      {classe.status}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="text-center">
                  <div className="flex items-center gap-1 text-gray-600">
                    <Users size={18} />
                    <span className="text-2xl font-bold text-gray-800">{etudiants.length}</span>
                  </div>
                  <p className="text-xs text-gray-500">Étudiants</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center gap-1 text-gray-600">
                    <UserCheck size={18} />
                    <span className="text-2xl font-bold text-gray-800">{formateurs.length}</span>
                  </div>
                  <p className="text-xs text-gray-500">Formateurs</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <div className="border-b border-gray-200">
              <div className="flex gap-2 px-6 overflow-x-auto">
                <button
                  onClick={() => setActiveTab("etudiants")}
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
                <button
                  onClick={() => setActiveTab("informations")}
                  className={`px-4 py-3 text-sm font-medium transition-colors relative whitespace-nowrap ${
                    activeTab === "informations" 
                      ? "text-[#E55B2D] border-b-2 border-[#E55B2D]" 
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  <Info size={16} className="inline mr-2" />
                  Informations
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Tab Étudiants */}
              {activeTab === "etudiants" && (
                <div>
                  <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
                    <h3 className="text-lg font-semibold text-gray-800">Liste des étudiants</h3>
                    <button 
                      onClick={() => setShowAjoutEtudiant(!showAjoutEtudiant)}
                      className="px-3 py-1.5 bg-[#E55B2D] text-white rounded-lg text-sm font-medium flex items-center gap-1 hover:bg-[#c44d24] transition-colors"
                    >
                      <Plus size={14} />
                      Ajouter étudiant
                    </button>
                  </div>

                  {showAjoutEtudiant && (
                    <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-medium text-gray-800">Ajouter un étudiant</h4>
                        <button onClick={() => setShowAjoutEtudiant(false)} className="text-gray-400 hover:text-gray-600">
                          <X size={18} />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <input type="text" placeholder="Nom de l'étudiant" className="px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                        <input type="email" placeholder="Email" className="px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                        <button onClick={handleAjouterEtudiant} className="px-3 py-2 bg-[#15BE6A] text-white rounded-lg text-sm font-medium hover:bg-[#0e9e55] transition-colors">
                          Ajouter
                        </button>
                      </div>
                    </div>
                  )}

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
                          <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {etudiants.map((etudiant, index) => (
                          <tr key={etudiant.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-3 text-sm text-gray-700">{index + 1}</td>
                            <td className="px-4 py-3 text-sm font-medium text-gray-800">{etudiant.name}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{etudiant.email}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{etudiant.phone}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{etudiant.dateInscription}</td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                etudiant.status === "Actif" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                              }`}>
                                {etudiant.status}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <button className="p-1 text-blue-500 hover:text-blue-700" title="Voir détails">
                                  <Eye size={16} />
                                </button>
                                <button onClick={() => handleRetirerEtudiant(etudiant.id)} className="p-1 text-red-500 hover:text-red-700" title="Retirer">
                                  <Trash2 size={16} />
                                </button>
                              </div>
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
                  <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
                    <h3 className="text-lg font-semibold text-gray-800">Liste des formateurs</h3>
                    <button 
                      onClick={() => setShowAjoutFormateur(!showAjoutFormateur)}
                      className="px-3 py-1.5 bg-[#E55B2D] text-white rounded-lg text-sm font-medium flex items-center gap-1 hover:bg-[#c44d24] transition-colors"
                    >
                      <Plus size={14} />
                      Ajouter formateur
                    </button>
                  </div>

                  {showAjoutFormateur && (
                    <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-medium text-gray-800">Ajouter un formateur</h4>
                        <button onClick={() => setShowAjoutFormateur(false)} className="text-gray-400 hover:text-gray-600">
                          <X size={18} />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <input type="text" placeholder="Nom du formateur" className="px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                        <input type="text" placeholder="Spécialité" className="px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                        <button onClick={handleAjouterFormateur} className="px-3 py-2 bg-[#15BE6A] text-white rounded-lg text-sm font-medium hover:bg-[#0e9e55] transition-colors">
                          Ajouter
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">N°</th>
                          <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Nom</th>
                          <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Email</th>
                          <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Spécialité</th>
                          <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Statut</th>
                          <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Actions</th>
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
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <button className="p-1 text-blue-500 hover:text-blue-700" title="Voir détails">
                                  <Eye size={16} />
                                </button>
                                <button onClick={() => handleRetirerFormateur(formateur.id)} className="p-1 text-red-500 hover:text-red-700" title="Retirer" >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Tab Informations */}
              {activeTab === "informations" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-md font-semibold text-gray-800 mb-3 flex items-center gap-2">
                          <GraduationCap size={18} className="text-[#2F5D9F]" />
                          Informations générales
                        </h3>
                        <div className="space-y-3">
                          <div><p className="text-xs text-gray-500">Nom de la classe</p><p className="text-sm font-medium text-gray-800">{classe.name}</p></div>
                          <div><p className="text-xs text-gray-500">Niveau</p><p className="text-sm font-medium text-gray-800">{classe.niveau}</p></div>
                          <div><p className="text-xs text-gray-500">Filière</p><p className="text-sm font-medium text-gray-800">{classe.filiere}</p></div>
                          <div><p className="text-xs text-gray-500">Année scolaire</p><p className="text-sm font-medium text-gray-800">{classe.anneeScolaire}</p></div>
                          <div><p className="text-xs text-gray-500">Statut</p><p className={`text-sm font-medium ${classe.status === "Actif" ? "text-green-700" : "text-red-700"}`}>{classe.status}</p></div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-md font-semibold text-gray-800 mb-3 flex items-center gap-2">
                          <MapPin size={18} className="text-[#2F5D9F]" />
                          Salles
                        </h3>
                        <div className="space-y-3">
                          <div>
                            <p className="text-xs text-gray-500">Salle principale</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="px-2 py-1 rounded-lg text-sm font-medium bg-orange-100 text-orange-700">{classe.salle}</span>
                            </div>
                          </div>
                          {classe.salles.length > 0 && (
                            <div>
                              <p className="text-xs text-gray-500">Salles supplémentaires</p>
                              <div className="flex flex-wrap gap-2 mt-1">
                                {classe.salles.map((salle, index) => (
                                  <span key={index} className="px-2 py-1 rounded-lg text-xs font-medium bg-gray-100 text-gray-700">{salle}</span>
                                ))}
                              </div>
                            </div>
                          )}
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
                          <div><p className="text-xs text-gray-500">Date de création</p><p className="text-sm font-medium text-gray-800">{classe.createdAt}</p></div>
                          <div><p className="text-xs text-gray-500">Dernière modification</p><p className="text-sm font-medium text-gray-800">{classe.updatedAt}</p></div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-md font-semibold text-gray-800 mb-3 flex items-center gap-2">
                          <Users size={18} className="text-[#2F5D9F]" />
                          Représentants
                        </h3>
                        <div className="space-y-3">
                          <div><p className="text-xs text-gray-500">Chef de classe</p><p className="text-sm font-medium text-gray-800">{classe.chefClasse}</p></div>
                          <div><p className="text-xs text-gray-500">Délégué</p><p className="text-sm font-medium text-gray-800">{classe.delegue}</p></div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-md font-semibold text-gray-800 mb-2 flex items-center gap-2">
                          <Info size={18} className="text-[#2F5D9F]" />
                          Description
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">{classe.description}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="text-md font-semibold text-gray-800 mb-3">Statistiques</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-gray-50 rounded-lg p-3 text-center">
                        <p className="text-2xl font-bold text-[#2F5D9F]">{etudiants.length}</p>
                        <p className="text-xs text-gray-500">Étudiants</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3 text-center">
                        <p className="text-2xl font-bold text-[#2F5D9F]">{formateurs.length}</p>
                        <p className="text-xs text-gray-500">Formateurs</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3 text-center">
                        <p className="text-2xl font-bold text-[#2F5D9F]">{classe.salles.length + 1}</p>
                        <p className="text-xs text-gray-500">Salles</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3 text-center">
                        <p className="text-2xl font-bold text-[#2F5D9F]">12</p>
                        <p className="text-xs text-gray-500">Matières</p>
                      </div>
                    </div>
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