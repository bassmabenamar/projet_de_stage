import React from "react";
import { ArrowLeft, User, Mail, Lock, Phone, Briefcase, GraduationCap, AlertCircle,MapPin,Users,School,Coins,Calendar } from "lucide-react";
import { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate,useParams } from "react-router-dom";

export default function ModifierFormateur() {
  const navigate = useNavigate();

  const [formateur, setFormateur] = useState(null);
  const { id } = useParams();

  const [prenom,setPrenom] = useState("");
  const [nom,setNom] = useState("");
  const [email,setEmail] = useState("")
  const [phone,setPhone] = useState("")
  const [password,setPassword] = useState("")
  const [adresse,setAdresse] = useState("")
  const [genre,setGenre] = useState("")
  const [status,setStatus] = useState("actif");
  const [specialite,setSpecialite] = useState("");
  const [salaire,setSalaire] = useState("")
  const [date_embauche,setDateEmbauche] = useState("")
  const [classe_id,setClasseId] = useState([]);
  
  const [classes, setClasses] = useState([]);

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
        setPrenom(res.data?.prenom);
        setNom(res.data?.nom);
        setEmail(res.data?.email);
        setPhone(res.data?.phone);
        setAdresse(res.data?.adresse);
        setGenre(res.data?.genre);
        setStatus(res.data?.status);
        setSpecialite(res.data?.specialite);
        setSalaire(res.data?.salaire);
        setClasseId(res.data?.classesFormateur
          ? res.data.classesFormateur.map(classe => classe.id.toString())
          : []
        );
        setDateEmbauche(res.data?.date_embauche);
      } catch (error) {
        console.log(error);
      }
    }
    getOne();
  }, [id]);

  useEffect(() => {
     axios.get("http://127.0.0.1:8000/api/classes", {
        headers: {
           Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }).then((response) => {setClasses(response.data);})
      .catch((error) => {console.log(error);});
    }, []);

  const handleRetour = () => {
    navigate("/admin/formateurs")
  };

  if (!formateur) return <div>Loading...</div>;

  function onchangePrenom(e){
        setPrenom(e.target.value)
  }
  function onchangeNom(e){
        setNom(e.target.value)
  }
  function onchangeEmail(e){
    setEmail(e.target.value)
  }
  function onchangePhone(e){
        setPhone(e.target.value)
  }
  function onchangePassword(e){
    setPassword(e.target.value)
  }
  function onchangeAdresse(e){
        setAdresse(e.target.value)
  }
  function onchangeStatus(e){
        setStatus(e.target.value)
  }
  function onchangeGenre(e){
        setGenre(e.target.value)
  }
  function onchangeSpecialite(e){
        setSpecialite(e.target.value)
  }
  function onchangeDateEmbauche(e){
        setDateEmbauche(e.target.value)
  }
  function onchangeSalaire(e){
        setSalaire(e.target.value)
  }
  function onchangeClasseId(e){
        const values = Array.from(e.target.selectedOptions).map(opt => opt.value);
        setClasseId(values);
  }

  async function FormateurUpdate(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("prenom", prenom);
    formData.append("nom", nom);
    formData.append("email", email);
    formData.append("phone", phone);
    if (password) {
      formData.append("password", password);
    }
    formData.append("adresse", adresse);
    formData.append("genre", genre);
    formData.append("specialite", specialite);
    formData.append("salaire", salaire);
    formData.append("status", status);
    classe_id.forEach(id => {
      formData.append("classe_id[]", id);
    });
    formData.append("date_embauche", date_embauche);
    formData.append("_method", "PUT");

    try {
      const res = await axios.post(
        `http://127.0.0.1:8000/api/formateurs/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      navigate("/admin/formateurs");
    } catch (error) {
      console.log("ERROR BACKEND:", error.response.data);
    }
  }

  function Anuler(){
      setPrenom(formateur?.prenom);
      setNom(formateur?.nom);
      setEmail(formateur?.email);
      setPhone(formateur?.phone);
      setPassword("");
      setAdresse(formateur?.adresse);
      setGenre(formateur?.genre);
      setStatus(formateur?.status);
      setSpecialite(formateur?.specialite);
      setSalaire(formateur?.salaire);
      setClasseId(formateur?.classesFormateur
        ? formateur.classesFormateur.map(classe => classe.id.toString())
        : []
      );
      setDateEmbauche(formateur?.date_embauche);
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
              <h1 className="text-3xl font-semibold m-0 mb-2 text-gray-800">Modifier le formateur</h1>
              <p className="text-gray-500 m-0">Modifiez les informations du formateur.</p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Prénom <span className="text-red-500">*</span></label>
                  <input type="text" value={prenom} onChange={onchangePrenom} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Nom <span className="text-red-500">*</span></label>
                  <input type="text" value={nom} onChange={onchangeNom} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Email <span className="text-red-500">*</span></label>
                  <input type="email" value={email} onChange={onchangeEmail} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Téléphone <span className="text-red-500">*</span></label>
                  <input type="tel" value={phone} onChange={onchangePhone} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Nouveau mot de passe</label>
                  <input type="password" value={password} onChange={onchangePassword} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all" placeholder="Laisser vide pour garder l'actuel" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    <MapPin size={14} className="inline mr-1" />
                    Adresse
                  </label>
                  <input type="text" value={adresse} onChange={onchangeAdresse} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all" placeholder="Adresse de l'étudiant" />
                </div>                

                {/* Genre */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    <Users size={14} className="inline mr-1" />
                    Genre <span className="text-red-500">*</span>
                  </label>
                  <select value={genre} onChange={onchangeGenre} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all bg-white">
                    <option value="">Sélectionner le genre</option>
                    <option value="Homme">Homme</option>
                    <option value="Femme">Femme</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Spécialité <span className="text-red-500">*</span></label>
                  <select value={specialite} onChange={onchangeSpecialite} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all bg-white">
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
                    <School  size={14} className="inline mr-1" />
                    Classe <span className="text-red-500">*</span>
                  </label>
                  <select multiple value={classe_id} onChange={onchangeClasseId} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all bg-white">
                    <option value="">Sélectionner une classe</option>
                    {classes.map((classe) => (
                      <option key={classe.id} value={classe.id.toString()}>
                        {classe.nom_classe}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    <Coins size={14} className="inline mr-1" />
                    Salaire <span className="text-red-500">*</span>
                  </label>
                  <input type="number" value={salaire} onChange={onchangeSalaire} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all" placeholder="Ex: 15000 MAD" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    <Calendar size={14} className="inline mr-1" />
                    Date embauche <span className="text-red-500">*</span>
                  </label>
                  <input type="date" value={date_embauche} onChange={onchangeDateEmbauche} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all text-gray-700" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    <AlertCircle size={14} className="inline mr-1" />
                    Statut <span className="text-red-500">*</span>
                  </label>
                  <select value={status} onChange={onchangeStatus} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all bg-white">
                    <option value="actif">Actif</option>
                    <option value="inactif">Inactif</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
                <button type="button" onClick={Anuler} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                  Annuler
                </button>
                <button onClick={FormateurUpdate} className="px-4 py-2 bg-[#2F5D9F] text-white rounded-lg font-medium flex items-center gap-2 hover:bg-[#1e3d6b] transition-colors shadow-sm">
                  Modifier le formateur
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}