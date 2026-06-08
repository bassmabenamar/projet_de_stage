import React from "react";
import { ArrowLeft, User, Mail,MapPin,Users, Phone, Briefcase,School,Coins, GraduationCap, Calendar, Info, CheckCircle, XCircle } from "lucide-react";
import { useNavigate,useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function DetailsFormateur() {
  const navigate = useNavigate();

  const [formateur, setFormateur] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function getOne() {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/formateurs/${id}`,{
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setFormateur(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getOne();
  }, [id]);

    if (!formateur) return <div>Loading...</div>;

  const handleRetour = () => {
    navigate("/admin/formateurs")
  };

  const getInitials = () => {
    const nom = formateur?.nom || "";
    const prenom = formateur?.prenom || "";

    return `${prenom?.[0] || ""}${nom?.[0] || ""}`.toUpperCase();
  };

  async function DeleteFormateur(id) {

    const confirmation = window.confirm("Voulez-vous vraiment supprimer cet formateur ?");
    if (!confirmation) {return;}
    try {
      await axios.delete(`http://127.0.0.1:8000/api/formateurs/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      navigate("/admin/formateurs");

      }catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col overflow-auto">
        <div className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <button onClick={handleRetour} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <div>
              <h1 className="text-3xl font-semibold m-0 mb-2 text-gray-800">Détails du formateur</h1>
              <p className="text-gray-500 m-0">Consultez toutes les informations du formateur.</p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#2F5D9F] to-[#E55B2D] flex items-center justify-center text-white text-2xl font-bold">
                {getInitials()}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{formateur.nom} {formateur.prenom}</h2>
                <div className="flex items-center gap-3 mt-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${formateur.status === "actif" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {formateur.status}
                  </span>
                  <span className="text-sm text-gray-500">ID: {formateur.id}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <User size={20} className="text-[#2F5D9F]" />
                  Informations personnelles
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <User size={16} className="text-gray-400 mt-0.5" />
                    <div><p className="text-xs text-gray-500">Nom complet</p><p className="text-sm font-medium text-gray-800">{formateur.nom} {formateur.prenom}</p></div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail size={16} className="text-gray-400 mt-0.5" />
                    <div><p className="text-xs text-gray-500">Email</p><p className="text-sm font-medium text-gray-800">{formateur.email}</p></div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone size={16} className="text-gray-400 mt-0.5" />
                    <div><p className="text-xs text-gray-500">Téléphone</p><p className="text-sm font-medium text-gray-800">{formateur.phone}</p></div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin size={16} className="text-gray-400 mt-0.5" />
                    <div><p className="text-xs text-gray-500">Adresse</p><p className="text-sm font-medium text-gray-800">{formateur.adresse}</p></div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users size={16} className="text-gray-400 mt-0.5" />
                    <div><p className="text-xs text-gray-500">Genre</p><p className="text-sm font-medium text-gray-800">{formateur.genre}</p></div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <GraduationCap size={20} className="text-[#2F5D9F]" />
                  Informations professionnelles
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Briefcase size={16} className="text-gray-400 mt-0.5" />
                    <div><p className="text-xs text-gray-500">Spécialité</p><p className="text-sm font-medium text-gray-800">{formateur.specialite}</p></div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Coins size={16} className="text-gray-400 mt-0.5" />
                    <div><p className="text-xs text-gray-500">Salaire</p><p className="text-sm font-medium text-gray-800">{formateur.salaire}</p></div>
                  </div>
                  <div className="flex items-start gap-3">
                    <School size={16} className="text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500">Classe</p>

                      <div className="text-sm font-medium text-gray-800 flex flex-wrap gap-2">
                        {formateur.classes_formateur &&
                        formateur.classes_formateur.length > 0 ? (
                          formateur.classes_formateur.map((classe) => (
                            <span key={classe.id} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md">
                              {classe.nom_classe}
                            </span>
                          ))
                        ) : (
                          <span>Aucune classe</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    {formateur.status === "actif" ? <CheckCircle size={16} className="text-green-500 mt-0.5" /> : <XCircle size={16} className="text-red-500 mt-0.5" />}
                    <div><p className="text-xs text-gray-500">Statut</p><p className={`text-sm font-medium ${formateur.status === "actif" ? "text-green-700" : "text-red-700"}`}>{formateur.status}</p></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Calendar size={20} className="text-[#2F5D9F]" />
                  Dates importantes
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Calendar size={16} className="text-gray-400 mt-0.5" />
                    <div><p className="text-xs text-gray-500">Date d'embauche</p><p className="text-sm font-medium text-gray-800">{formateur.date_embauche}</p></div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar size={16} className="text-gray-400 mt-0.5" />
                    <div><p className="text-xs text-gray-500">Dernière modification</p><p className="text-sm font-medium text-gray-800">{new Date(formateur.updated_at).toLocaleString()}</p></div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Actions</h3>
                <div className="flex gap-3">
                  <button onClick={() => navigate(`/ModifierFormateur/${formateur.id}`)}className="flex-1 px-4 py-2 bg-[#2F5D9F] text-white rounded-lg font-medium hover:bg-[#1e3d6b] transition-colors">Modifier</button>
                  <button onClick={() => DeleteFormateur(formateur.id)} className="flex-1 px-4 py-2 border border-red-500 text-red-500 rounded-lg font-medium hover:bg-red-50 transition-colors">Supprimer</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}