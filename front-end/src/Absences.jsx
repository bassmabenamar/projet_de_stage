import { Search, Calendar, User, FileText, CheckCircle, XCircle, Filter } from "lucide-react";


export default function Absences() {
  // Données statiques des absences
  const absences = [
    { id: 1, nom: "Sarah Martin", initials: "SM", date: "10/06/2024", status: "nonJustifie", motif: "Absence sans justificatif", justificatif: null },
    { id: 2, nom: "Karim Benali", initials: "KB", date: "10/06/2024", status: "justifie", motif: "Rendez-vous médical", justificatif: "Certificat médical" },
    { id: 3, nom: "Leila Ouazzani", initials: "LO", date: "11/06/2024", status: "justifie", motif: "Urgence familiale", justificatif: "Lettre parent" },
    { id: 4, nom: "Mohamed Tazi", initials: "MT", date: "11/06/2024", status: "nonJustifie", motif: "Retard important", justificatif: null },
    { id: 5, nom: "Fatima Zahra", initials: "FZ", date: "12/06/2024", status: "justifie", motif: "Maladie", justificatif: "Arrêt maladie" },
    { id: 6, nom: "Youssef El Amrani", initials: "YE", date: "12/06/2024", status: "nonJustifie", motif: "Absence non justifiée", justificatif: null },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col overflow-auto">
        <div className="p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-semibold text-gray-800">Gestion des absences</h1>
              <p className="text-gray-500">Consultez et gérez les absences des étudiants.</p>
            </div>
          </div>

          {/* Filtres */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <Filter size={18} className="text-[#2F5D9F]" />
              <h3 className="font-medium text-gray-800">Filtres</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Rechercher par nom..." className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/20 transition-all" />
              </div>
              <div className="relative">
                <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="date" className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/20 transition-all" />
              </div>
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <select className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/20 transition-all bg-white">
                  <option value="">Tous les statuts</option>
                  <option value="justifie">Justifié</option>
                  <option value="nonJustifie">Non justifié</option>
                </select>
              </div>
              <div>
                <button className="w-full px-4 py-2 border border-gray-300 bg-[#E55B2D] rounded-lg text-sm text-white hover:bg-[#c44d24] transition-colors">
                  Réinitialiser
                </button>
              </div>
            </div>
          </div>

          {/* Tableau des absences avec map */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <div className="min-w-[800px]">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600 whitespace-nowrap">N°</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600 whitespace-nowrap">Étudiant</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600 whitespace-nowrap">Date</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600 whitespace-nowrap">Statut</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600 whitespace-nowrap">Motif</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600 whitespace-nowrap">Justificatif</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600 whitespace-nowrap">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {absences.map((absence, index) => (
                      <tr key={absence.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">{index + 1}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2F5D9F] to-[#E55B2D] flex items-center justify-center text-white text-xs font-medium">
                              {absence.initials}
                            </div>
                            <span className="text-sm font-medium text-gray-800">{absence.nom}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">{absence.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {absence.status === "justifie" ? (
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 flex items-center gap-1 w-fit">
                              <CheckCircle size={12} className="text-green-500" />
                              Justifié
                            </span>
                          ) : (
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 flex items-center gap-1 w-fit">
                              <XCircle size={12} className="text-red-500" />
                              Non justifié
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{absence.motif}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {absence.justificatif ? absence.justificatif : <span className="text-gray-400">—</span>}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            {absence.status === "justifie" ? (
                              <button className="p-1.5 text-red-500 hover:text-red-700 transition-colors" title="Non justifier">
                                <XCircle size={16} />
                              </button>
                            ) : (
                              <button className="p-1.5 text-[#2F5D9F] hover:text-[#1e3d6b] transition-colors" title="Justifier">
                                <CheckCircle size={16} />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Footer avec pagination */}
            <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center flex-wrap gap-4">
              <p className="text-sm text-gray-500 whitespace-nowrap">Total: {absences.length} absences</p>
              <div className="flex gap-2 flex-wrap">
                <button className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50 transition-colors whitespace-nowrap">
                  Précédent
                </button>
                <button className="px-3 py-1 bg-[#2F5D9F] text-white rounded text-sm hover:bg-[#1e3d6b] transition-colors whitespace-nowrap">
                  1
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50 transition-colors whitespace-nowrap">
                  2
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50 transition-colors whitespace-nowrap">
                  Suivant
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}