import React from "react";
import { ArrowLeft, User,Users,MapPin, Mail,Coins, Calendar, School, Lock, Phone, Briefcase, GraduationCap, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";

export default function AjouterFormateur() {
  const navigate = useNavigate();

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
  const [classe_id,setClasseId] = useState([])
  
  const [classes, setClasses] = useState([]);

  useEffect(() => {

   axios.get("http://127.0.0.1:8000/api/classes", {
      headers: {
         Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }).then((response) => {setClasses(response.data);})
    .catch((error) => {console.log(error);});
  }, []);

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
  
async function FormateurAjouter(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("prenom", prenom);
    formData.append("nom", nom);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("adresse", adresse);
    formData.append("genre", genre);
    formData.append("specialite", specialite);
    formData.append("salaire", salaire);
    formData.append("status", status);
    classe_id.forEach(id => {
      formData.append("classe_id[]", id);
    });
    formData.append("date_embauche", date_embauche);
    
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/formateurs",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      navigate("/admin/Formateurs");
    } catch (error) {
      console.log("ERROR BACKEND:", error.response.data);
    }
  }

  function Anuler(){
      setPrenom("");
      setNom("");
      setEmail("");
      setPhone("");
      setPassword("");
      setAdresse("");
      setGenre("");
      setStatus("");
      setSpecialite("");
      setSalaire("");
      setClasseId([]);
      setDateEmbauche("");
    }

  const handleRetour = () => {
    navigate("/admin/Formateurs")
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
              <h1 className="text-3xl font-semibold m-0 mb-2 text-gray-800">Ajouter un formateur</h1>
              <p className="text-gray-500 m-0">Remplissez les informations pour ajouter un nouveau formateur.</p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    <User size={14} className="inline mr-1" />
                    Prénom <span className="text-red-500">*</span>
                  </label>
                  <input type="text" value={prenom} onChange={onchangePrenom} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all" placeholder="Entrez le prénom" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    <User size={14} className="inline mr-1" />
                    Nom <span className="text-red-500">*</span>
                  </label>
                  <input type="text" value={nom} onChange={onchangeNom} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all" placeholder="Entrez le nom" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    <Mail size={14} className="inline mr-1" />
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input type="email" value={email} onChange={onchangeEmail} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all" placeholder="exemple@amity.com" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    <Phone size={14} className="inline mr-1" />
                    Téléphone <span className="text-red-500">*</span>
                  </label>
                  <input type="tel" value={phone} onChange={onchangePhone} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all" placeholder="+212 6XX XXX XXX" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    <Lock size={14} className="inline mr-1" />
                    Mot de passe <span className="text-red-500">*</span>
                  </label>
                  <input type="password" value={password} onChange={onchangePassword} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all" placeholder="Minimum 8 caractères" />
                </div>

                {/* Adresse */}
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
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    <Briefcase size={14} className="inline mr-1" />
                    Spécialité <span className="text-red-500">*</span>
                  </label>
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
                    {classes.map((classe) => (
                      <option key={classe.id} value={classe.id}>
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
                <button onClick={FormateurAjouter} className="px-4 py-2 bg-[#E55B2D] text-white rounded-lg font-medium flex items-center gap-2 hover:bg-[#c44d24] transition-colors shadow-sm">
                  Ajouter le formateur
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}