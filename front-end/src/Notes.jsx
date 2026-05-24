import { Search, User, BookOpen, Filter } from "lucide-react";
import { useState,useEffect } from "react";

export default function Notes() {
  const [search, setSearch] = useState("");
  const [matiere, setMatiere] = useState("");
  const [type, setType] = useState("")

  const [currentPage, setCurrentPage] = useState(1);
  const notesParPage = 20;
  // Données statiques des notes
  const notes = [
    { id: 1, nom: "Sarah Martin", initials: "SM", classe: "2ème Année GL", niveau: "2ème Année", matiere: "Mathématiques", note: 15, maxNote: 20, date: "2024-06-10", type: "Devoir" },
    { id: 2, nom: "Karim Benali", initials: "KB", classe: "2ème Année GL", niveau: "2ème Année", matiere: "Mathématiques", note: 12, maxNote: 20, date: "2024-06-10", type: "Devoir" },
    { id: 3, nom: "Leila Ouazzani", initials: "LO", classe: "1ère Année DS", niveau: "1ère Année", matiere: "Programmation Web", note: 18, maxNote: 20, date: "2024-06-11", type: "Examen" },
    { id: 4, nom: "Mohamed Tazi", initials: "MT", classe: "1ère Année DS", niveau: "1ère Année", matiere: "Programmation Web", note: 8, maxNote: 20, date: "2024-06-11", type: "Examen" },
    { id: 5, nom: "Fatima Zahra", initials: "FZ", classe: "3ème Année Cyber", niveau: "3ème Année", matiere: "Base de données", note: 16, maxNote: 20, date: "2024-06-12", type: "Devoir" },
    { id: 6, nom: "Youssef El Amrani", initials: "YE", classe: "3ème Année Cyber", niveau: "3ème Année", matiere: "Base de données", note: 14, maxNote: 20, date: "2024-06-12", type: "Devoir" },
    { id: 7, nom: "Sarah Martin", initials: "SM", classe: "2ème Année GL", niveau: "2ème Année", matiere: "Algorithmique", note: 17, maxNote: 20, date: "2024-06-13", type: "Examen" },
    { id: 8, nom: "Karim Benali", initials: "KB", classe: "2ème Année GL", niveau: "2ème Année", matiere: "Algorithmique", note: 11, maxNote: 20, date: "2024-06-13", type: "Examen" },
  ];

  const filteredNotes = notes.filter((n) => {
    const matchSearch =
      `${n.nom} ${n.initials}`
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchMatiere = matiere ? n.matiere === matiere : true;
    const matchType = type ? n.type === type : true;

    return matchSearch && matchMatiere && matchType;
  });

  const indexDernierNote = currentPage * notesParPage;
  const indexPremierNote = indexDernierNote - notesParPage;
  const totalPages = Math.ceil(filteredNotes.length / notesParPage);
  const notesActuels = filteredNotes.slice(indexPremierNote,indexDernierNote);

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col overflow-auto">
        <div className="p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-semibold text-gray-800">Gestion des notes</h1>
              <p className="text-gray-500">Consultez et gérez les notes des étudiants.</p>
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
                <input type="text" placeholder="Rechercher par nom..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#E55B2D] focus:ring-2 focus:ring-[#E55B2D]/80 transition-all" />
              </div>
              <div className="relative">
                <BookOpen size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <select value={matiere} onChange={(e) => setMatiere(e.target.value)} className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#E55B2D] focus:ring-2 focus:ring-[#E55B2D]/80 transition-all bg-white">
                  <option value="">Toutes les matières</option>
                  <option value="Mathématiques">Mathématiques</option>
                  <option value="Programmation Web">Programmation Web</option>
                  <option value="Base de données">Base de données</option>
                  <option value="Algorithmique">Algorithmique</option>
                </select>
              </div>
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <select  value={type} onChange={(e) => setType(e.target.value)} className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#E55B2D] focus:ring-2 focus:ring-[#E55B2D]/80 transition-all bg-white">
                  <option value="">Tous les types</option>
                  <option value="Devoir">Devoir</option>
                  <option value="Examen">Examen</option>
                </select>
              </div>
              <div>
                <button onClick={() => {setSearch("");setMatiere("");setType("");}} className="w-full px-4 py-2 border border-gray-300 bg-[#E55B2D] rounded-lg text-sm text-white hover:bg-[#c44d24] transition-colors">
                  Réinitialiser
                </button>
              </div>
            </div>
          </div>

          {/* Tableau des notes */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <div className="min-w-[1000px]">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600 whitespace-nowrap">N°</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600 whitespace-nowrap">Étudiant</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600 whitespace-nowrap">Classe</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600 whitespace-nowrap">Niveau</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600 whitespace-nowrap">Matière</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600 whitespace-nowrap">Type</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600 whitespace-nowrap">Note</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600 whitespace-nowrap">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {notesActuels.map((note, index) => (
                      <tr key={note.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">{index + 1}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2F5D9F] to-[#E55B2D] flex items-center justify-center text-white text-xs font-medium">
                              {note.initials}
                            </div>
                            <span className="text-sm font-medium text-gray-800">{note.nom}</span>
                          </div>
                         </td>
                        <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">{note.classe}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                            {note.niveau}
                          </span>
                         </td>
                        <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">{note.matiere}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 rounded-full text-xs font-medium">
                            {note.type}
                          </span>
                         </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 rounded-full text-xs font-medium">
                            {note.note}/{note.maxNote}
                          </span>
                         </td>
                        <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                          {new Date(note.date).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" })}
                         </td>
                       </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Footer avec pagination */}
            <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center flex-wrap gap-4">
              <p className="text-sm text-gray-500 whitespace-nowrap">
                Total: {notes.length} notes
              </p>
              <div className="flex gap-2 flex-wrap">
                <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-600 disabled:opacity-50">
                  Précédent
                </button>
                {[...Array(totalPages)].map((_, index) => (
                  <button key={index} onClick={() => setCurrentPage(index + 1)}
                    className={`px-3 py-1 rounded text-sm ${
                      currentPage === index + 1
                        ? "bg-[#2F5D9F] text-white"
                        : "border border-gray-300 text-gray-600"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
                <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-600 disabled:opacity-50">
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