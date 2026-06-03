import { ArrowLeft, Plus, Edit, Calendar, Clock, MapPin, User, BookOpen, X, Trash2, Save, AlertTriangle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function EmploiClasse() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingSeance, setEditingSeance] = useState(null); // null = add, object = edit
  const [seanceToDelete, setSeanceToDelete] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  const [classe, setClasse] = useState(null);
  const [matiere_id, setMatiereId] = useState("");
  const [classe_id, setClasseId] = useState("");
  const [salle_id, setSalleId] = useState("");
  const [formateur_id, setFormateurId] = useState("");
  const [heure_debut, setHeureDebut] = useState("");
  const [heure_fin, setHeureFin] = useState("");
  const [jour, setJour] = useState("");

  const [matieres, setMatieres] = useState([]);
  const [formateurs, setFormateurs] = useState([]);
  const [salles, setSalles] = useState([]);
  const [emploi, setEmploi] = useState([]);

  const jours = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];
  const heures = ["08:00 - 10:00", "10:00 - 12:00", "14:00 - 16:00"];
  const joursList = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];

  const token = () => localStorage.getItem("token");
  const authHeaders = () => ({ Authorization: `Bearer ${token()}` });

  // ─── Fetch classe ───────────────────────────────────────────────
  useEffect(() => {
    async function getOne() {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/classes/${id}`, {
          headers: authHeaders(),
        });
        setClasse(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getOne();
  }, [id]);

  // ─── Fetch salles ────────────────────────────────────────────────
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/salles", { headers: authHeaders() })
      .then((r) => setSalles(r.data))
      .catch((e) => console.log("Error fetching salles:", e));
  }, []);

  // ─── Fetch formateurs ────────────────────────────────────────────
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/formateurs", { headers: authHeaders() })
      .then((r) => setFormateurs(r.data))
      .catch((e) => console.log("Error fetching formateurs:", e));
  }, []);

  // ─── Fetch matieres ──────────────────────────────────────────────
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/matieres", { headers: authHeaders() })
      .then((r) => setMatieres(r.data))
      .catch((e) => console.log("Error fetching matieres:", e));
  }, []);

  // ─── Sync classe_id ──────────────────────────────────────────────
  useEffect(() => {
    setClasseId(id);
  }, [id]);

  // ─── Fetch emplois ───────────────────────────────────────────────
  useEffect(() => {
    async function fetchEmploi() {
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/api/emplois/classe/${id}`, // fixed: removed extra }
          { headers: authHeaders() }
        );
        setEmploi(res.data);
      } catch (err) {
        console.log("Error fetching emplois:", err);
      }
    }
    fetchEmploi();
  }, [id]);

  // ─── Refetch emplois (après add/edit) ───────────────────────────
  async function refetchEmploi() {
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/api/emplois/classe/${id}`,
        { headers: authHeaders() }
      );
      setEmploi(res.data);
    } catch (err) {
      console.log("Error refetching emplois:", err);
    }
  }

  // ─── Helpers ─────────────────────────────────────────────────────
  const normalizeTime = (t) => t?.slice(0, 5);

  const getSeance = (jour, heureRange) => {
    const [h1, h2] = heureRange.split(" - ");
    return emploi.find(
      (s) =>
        s.jour?.toLowerCase() === jour.toLowerCase() &&
        normalizeTime(s.heure_debut) === h1 &&
        normalizeTime(s.heure_fin) === h2
    );
  };

  // ─── Reset form ──────────────────────────────────────────────────
  const resetForm = () => {
    setMatiereId("");
    setClasseId(id);
    setSalleId("");
    setFormateurId("");
    setHeureDebut("");
    setHeureFin("");
    setJour("");
    setErrors({});
    setEditingSeance(null);
  };

  // ─── Open modal (add) ────────────────────────────────────────────
  const openAddModal = (jourPreselect = "", heurePreselect = "") => {
    resetForm();
    if (jourPreselect) setJour(jourPreselect);
    if (heurePreselect) {
      const [debut, fin] = heurePreselect.split(" - ");
      setHeureDebut(debut);
      setHeureFin(fin);
    }
    setIsModalOpen(true);
  };

  // ─── Open modal (edit) ───────────────────────────────────────────
  const openEditModal = (seance) => {
    setEditingSeance(seance);
    setMatiereId(seance.matiere_id ?? "");
    setClasseId(seance.classe_id ?? id);
    setSalleId(seance.salle_id ?? "");
    setFormateurId(seance.user_id ?? seance.formateur_id ?? "");
    setHeureDebut(normalizeTime(seance.heure_debut) ?? "");
    setHeureFin(normalizeTime(seance.heure_fin) ?? "");
    setJour(seance.jour ?? "");
    setErrors({});
    setIsModalOpen(true);
  };

  // ─── Validation ──────────────────────────────────────────────────
  const validate = () => {
    const e = {};
    if (!matiere_id) e.matiere_id = "Matière obligatoire";
    if (!formateur_id) e.formateur_id = "Formateur obligatoire";
    if (!salle_id) e.salle_id = "Salle obligatoire";
    if (!heure_debut) e.heure_debut = "Heure début obligatoire";
    if (!heure_fin) e.heure_fin = "Heure fin obligatoire";
    if (heure_debut && heure_fin && heure_debut >= heure_fin)
      e.heure_fin = "Heure fin doit être après heure début";
    if (!jour) e.jour = "Jour obligatoire";
    return e;
  };

  // ─── Ajouter ─────────────────────────────────────────────────────
  async function AjouterSeance(e) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("classe_id", classe_id);
    formData.append("salle_id", salle_id);
    formData.append("matiere_id", matiere_id);
    formData.append("user_id", formateur_id);
    formData.append("jour", jour);
    formData.append("heure_debut", heure_debut);
    formData.append("heure_fin", heure_fin);
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/emplois", formData, {
        headers: { ...authHeaders(), "Content-Type": "multipart/form-data" },
      });
      await refetchEmploi();
      setIsModalOpen(false);
      resetForm();
    } catch (error) {
      console.log("ERROR BACKEND:", error.response?.data);
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  // ─── Modifier ─────────────────────────────────────────────────────
  async function ModifierSeance(e) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await axios.put(
        `http://127.0.0.1:8000/api/emplois/${editingSeance.id}`,
        {
          classe_id,
          salle_id,
          matiere_id,
          user_id: formateur_id,
          jour,
          heure_debut,
          heure_fin,
        },
        { headers: authHeaders() }
      );
      await refetchEmploi();
      setIsModalOpen(false);
      resetForm();
    } catch (error) {
      console.log("ERROR BACKEND:", error.response?.data);
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  // ─── Supprimer ───────────────────────────────────────────────────
  const confirmDelete = (seance) => {
    setSeanceToDelete(seance);
    setIsDeleteModalOpen(true);
  };

  async function SupprimerSeance() {
    if (!seanceToDelete) return;
    setIsDeleting(true);
    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/emplois/${seanceToDelete.id}`,
        { headers: authHeaders() }
      );
      setEmploi((prev) => prev.filter((s) => s.id !== seanceToDelete.id));
      setIsDeleteModalOpen(false);
      setSeanceToDelete(null);
    } catch (error) {
      console.log("ERROR DELETE:", error.response?.data);
    } finally {
      setIsDeleting(false);
    }
  }

  const Annuler = () => {
    setIsModalOpen(false);
    resetForm();
  };

  // ─── Field error helper ──────────────────────────────────────────
  const FieldError = ({ name }) =>
    errors[name] ? (
      <p className="text-red-500 text-xs mt-1">{errors[name]}</p>
    ) : null;

  const inputCls = (name) =>
    `w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent bg-white text-sm transition-colors ${
      errors[name]
        ? "border-red-400 focus:ring-red-300"
        : "border-gray-200 focus:ring-[#E55B2D]"
    }`;

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col overflow-auto">
        <div className="p-6">
          {/* ── Header ── */}
          <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/ClasseSelector")}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft size={20} className="text-gray-600" />
              </button>
              <div>
                <h1 className="text-3xl font-semibold mb-2 text-gray-800">
                  Emploi du temps
                </h1>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-gradient-to-br from-[#2F5D9F] to-[#E55B2D] text-white rounded-lg text-sm font-medium">
                    {classe?.nom_classe}
                  </span>
                  <span className="text-sm text-gray-500">
                    Année {classe?.annee_scolaire}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => openAddModal()}
              className="px-4 py-2 bg-[#E55B2D] text-white rounded-lg font-medium flex items-center gap-2 hover:bg-[#c44d24] transition-colors shadow-sm"
            >
              <Plus size={18} />
              Ajouter une séance
            </button>
          </div>

          {/* ── Tableau ── */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600 whitespace-nowrap">
                      Horaire
                    </th>
                    {jours.map((j) => (
                      <th
                        key={j}
                        className="text-left px-6 py-4 text-sm font-semibold text-gray-600 whitespace-nowrap"
                      >
                        {j}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {heures.map((heure, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-gray-700 bg-gray-50 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Clock size={14} className="text-[#E55B2D]" />
                          {heure}
                        </div>
                      </td>
                      {jours.map((j) => {
                        const seance = getSeance(j, heure);
                        const isEmpty = !seance;

                        return (
                          <td key={j} className="px-4 py-3 align-top">
                            {!isEmpty ? (
                              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-3 border border-blue-100">
                                <div className="flex items-start justify-between mb-2">
                                  <div className="flex items-center gap-2">
                                    <BookOpen size={14} className="text-[#2F5D9F]" />
                                    <span className="font-semibold text-gray-800 text-sm">
                                      {seance.matiere?.nom_matiere || "Cours"}
                                    </span>
                                  </div>
                                  {/* Edit & Delete buttons */}
                                  <div className="flex items-center gap-1">
                                    <button
                                      onClick={() => openEditModal(seance)}
                                      className="text-gray-400 hover:text-[#2F5D9F] transition-colors p-1 rounded"
                                      title="Modifier"
                                    >
                                      <Edit size={12} />
                                    </button>
                                    <button
                                      onClick={() => confirmDelete(seance)}
                                      className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded"
                                      title="Supprimer"
                                    >
                                      <Trash2 size={12} />
                                    </button>
                                  </div>
                                </div>
                                <div className="space-y-1 mt-2">
                                  {(seance.formateur || seance.user) && (
                                    <div className="flex items-center gap-2">
                                      <User size={12} className="text-gray-400" />
                                      <span className="text-xs text-gray-600">
                                        {seance.formateur ||
                                          (seance.user
                                            ? `${seance.user.nom} ${seance.user.prenom}`
                                            : "")}
                                      </span>
                                    </div>
                                  )}
                                  {seance.salle?.nom_salle && (
                                    <div className="flex items-center gap-2">
                                      <MapPin size={12} className="text-gray-400" />
                                      <span className="text-xs text-gray-500">
                                        {seance.salle.nom_salle}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ) : (
                              <button
                                onClick={() => openAddModal(j, heure)}
                                className="w-full py-4 px-2 rounded-lg border-2 border-dashed border-gray-300 hover:border-[#E55B2D] hover:bg-orange-50 transition-all duration-200 flex flex-col items-center gap-1 group"
                              >
                                <Plus size={18} className="text-gray-400 group-hover:text-[#E55B2D]" />
                                <span className="text-xs text-gray-400 group-hover:text-[#E55B2D]">
                                  Ajouter
                                </span>
                              </button>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════ MODAL ADD / EDIT ══════════ */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
            {/* Header */}
            <div className="relative bg-gradient-to-r from-[#2F5D9F] to-[#E55B2D] px-6 py-4">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold text-white">
                    {editingSeance ? "Modifier la séance" : "Ajouter une séance"}
                  </h2>
                  <p className="text-white/80 text-sm mt-0.5">
                    {editingSeance
                      ? "Modifiez les informations de la séance"
                      : "Remplissez les informations de la séance"}
                  </p>
                </div>
                <button
                  onClick={Annuler}
                  className="text-white/80 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Form */}
            <div className="p-6">
              <div className="grid grid-cols-1 gap-4">
                {/* Matière */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-2">
                    <BookOpen size={14} className="text-[#E55B2D]" />
                    Matière
                  </label>
                  <select
                    value={matiere_id}
                    onChange={(e) => setMatiereId(e.target.value)}
                    className={inputCls("matiere_id")}
                  >
                    <option value="">Sélectionner un module</option>
                    {matieres.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.nom_matiere}
                      </option>
                    ))}
                  </select>
                  <FieldError name="matiere_id" />
                </div>

                {/* Formateur & Salle */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-2">
                      <User size={14} className="text-[#E55B2D]" />
                      Formateur
                    </label>
                    <select
                      value={formateur_id}
                      onChange={(e) => setFormateurId(e.target.value)}
                      className={inputCls("formateur_id")}
                    >
                      <option value="">Sélectionner</option>
                      {formateurs.map((f) => (
                        <option key={f.id} value={f.id}>
                          {f.nom} {f.prenom}
                        </option>
                      ))}
                    </select>
                    <FieldError name="formateur_id" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-2">
                      <MapPin size={14} className="text-[#E55B2D]" />
                      Salle
                    </label>
                    <select
                      value={salle_id}
                      onChange={(e) => setSalleId(e.target.value)}
                      className={inputCls("salle_id")}
                    >
                      <option value="">Sélectionner</option>
                      {salles.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.nom_salle}
                        </option>
                      ))}
                    </select>
                    <FieldError name="salle_id" />
                  </div>
                </div>

                {/* Heure début & Heure fin */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-2">
                      <Clock size={14} className="text-[#E55B2D]" />
                      Heure début
                    </label>
                    <input
                      type="time"
                      value={heure_debut}
                      onChange={(e) => setHeureDebut(e.target.value)}
                      className={inputCls("heure_debut")}
                    />
                    <FieldError name="heure_debut" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-2">
                      <Clock size={14} className="text-[#E55B2D]" />
                      Heure fin
                    </label>
                    <input
                      type="time"
                      value={heure_fin}
                      onChange={(e) => setHeureFin(e.target.value)}
                      className={inputCls("heure_fin")}
                    />
                    <FieldError name="heure_fin" />
                  </div>
                </div>

                {/* Jour */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-2">
                    <Calendar size={14} className="text-[#E55B2D]" />
                    Jour
                  </label>
                  <select
                    value={jour}
                    onChange={(e) => setJour(e.target.value)}
                    className={inputCls("jour")}
                  >
                    <option value="">Sélectionner un jour</option>
                    {joursList.map((j, i) => (
                      <option key={i}>{j}</option>
                    ))}
                  </select>
                  <FieldError name="jour" />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50/80 border-t border-gray-100 flex gap-3">
              <button
                onClick={Annuler}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium text-sm hover:bg-gray-100 transition-all duration-200"
              >
                Annuler
              </button>
              <button onClick={editingSeance ? ModifierSeance : AjouterSeance} disabled={isSubmitting} className="flex-1 px-4 py-2 bg-gradient-to-r from-[#2F5D9F] to-[#E55B2D] text-white rounded-lg font-medium text-sm hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
                <Save size={14} />
                {isSubmitting
                  ? "Enregistrement..."
                  : editingSeance
                  ? "Modifier"
                  : "Enregistrer"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════ MODAL CONFIRM DELETE ══════════ */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
            <div className="p-6 flex flex-col items-center text-center gap-4">
              <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle size={28} className="text-red-500" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-1">
                  Supprimer la séance ?
                </h3>
                <p className="text-sm text-gray-500">
                  {seanceToDelete?.matiere?.nom_matiere && (
                    <>
                      <span className="font-medium text-gray-700">
                        {seanceToDelete.matiere.nom_matiere}
                      </span>{" "}
                      —{" "}
                    </>
                  )}
                  {seanceToDelete?.jour},{" "}
                  {normalizeTime(seanceToDelete?.heure_debut)} -{" "}
                  {normalizeTime(seanceToDelete?.heure_fin)}
                  <br />
                  Cette action est irréversible.
                </p>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex gap-3">
              <button onClick={() => {setIsDeleteModalOpen(false); setSeanceToDelete(null);}} className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium text-sm hover:bg-gray-100 transition-all">
                Annuler
              </button>
              <button onClick={SupprimerSeance} disabled={isDeleting} className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
                <Trash2 size={14} />
                {isDeleting ? "Suppression..." : "Supprimer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}