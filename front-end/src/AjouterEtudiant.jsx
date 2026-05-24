import React from "react";
import { ArrowLeft, User, Mail, Lock, Phone, MapPin, BookOpen,School, AlertCircle,Calendar,Users, Bus, GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";

export default function AjouterEtudiant() {
  const navigate = useNavigate();
  const [prenom,setPrenom] = useState("");
  const [nom,setNom] = useState("");
  const [email,setEmail] = useState("")
  const [phone,setPhone] = useState("")
  const [password,setPassword] = useState("")
  const [adresse,setAdresse] = useState("")
  const [genre,setGenre] = useState("")
  const [status,setStatus] = useState("")
  const [date_naissance,setDateNaissance] = useState("")
  const [date_inscription,setDateInscription] = useState("")
  const [classe_id,setClasseId] = useState("")
  const [filiere_id,setFiliereId] = useState("")
  const [niveau_scolaire_id,setNiveauScolaireId] = useState("")
  const [transport_id,setTransportId] = useState("")
  const [message, setMessage] = useState("")


  const [classes, setClasses] = useState([]);
  const [transports,setTransports] = useState([]);
  const [niveauscolaires,setNiveauscolaires] = useState([]);
  const [filieres,setFilieres] = useState([]);

  useEffect(() => {

   axios.get("http://127.0.0.1:8000/api/classes", {
      headers: {
         Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }).then((response) => {setClasses(response.data);})
    .catch((error) => {console.log(error);});
  }, []);

  useEffect(() => {

   axios.get("http://127.0.0.1:8000/api/transports", {
      headers: {
         Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }).then((response) => {setTransports(response.data);})
    .catch((error) => {console.log(error);});
  }, []);

  useEffect(() => {

   axios.get("http://127.0.0.1:8000/api/niveauscolaires", {
      headers: {
         Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }).then((response) => {setNiveauscolaires(response.data);})
    .catch((error) => {console.log(error);});
  }, []);

  useEffect(() => {

   axios.get("http://127.0.0.1:8000/api/filieres", {
      headers: {
         Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }).then((response) => {setFilieres(response.data);})
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
  function onchangeDateNaissance(e){
        setDateNaissance(e.target.value)
  }
  function onchangeDateInscription(e){
        setDateInscription(e.target.value)
  }
  function onchangeClasseId(e){
        setClasseId(e.target.value)
  }
  function onchangeFiliereId(e){
    setFiliereId(e.target.value)
  }
  function onchangeNiveauScolaireId(e){
    setNiveauScolaireId(e.target.value)
  }
  function onchangeTransportId(e){
    setTransportId(e.target.value)
  }


  async function AjouterEtudiant(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("prenom", prenom);
    formData.append("nom", nom);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("adresse", adresse);
    formData.append("genre", genre);
    formData.append("date_naissance", date_naissance);
    formData.append("date_inscription", date_inscription);
    formData.append("classe_id", classe_id);
    formData.append("filiere_id", filiere_id);
    formData.append("niveau_scolaire_id", niveau_scolaire_id);
    formData.append("transport_id", transport_id);
    formData.append("status", status);

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/etudiants",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      navigate("/ListeEtudiants");
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
      setDateNaissance("");
      setDateInscription("");
      setClasseId("");
      setNiveauScolaireId("");
      setTransportId("");
      setFiliereId("");
    }



  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col overflow-auto">
        <div className="p-6">
          {/* Header avec bouton retour */}
          <div className="flex items-center gap-4 mb-6">
            <button onClick={()=>navigate("/ListeEtudiants")} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <div>
              <h1 className="text-3xl font-semibold m-0 mb-2 text-gray-800">Ajouter un étudiant</h1>
              <p className="text-gray-500 m-0">Remplissez les informations pour ajouter un nouvel étudiant.</p>
            </div>
          </div>

          {/* Formulaire */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Prénom */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    <User size={14} className="inline mr-1" />
                    Prénom <span className="text-red-500">*</span>
                  </label>
                  <input type="text" value={prenom} onChange={onchangePrenom} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all" placeholder="Entrez le prénom" />
                </div>

                {/* Nom */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    <User size={14} className="inline mr-1" />
                    Nom <span className="text-red-500">*</span>
                  </label>
                  <input type="text" value={nom} onChange={onchangeNom} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all" placeholder="Entrez le nom" />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    <Mail size={14} className="inline mr-1" />
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input type="email" value={email} onChange={onchangeEmail} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all" placeholder="exemple@amity.com" />
                </div>

                {/* Téléphone */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    <Phone size={14} className="inline mr-1" />
                    Téléphone <span className="text-red-500">*</span>
                  </label>
                  <input type="tel" value={phone} onChange={onchangePhone} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all" placeholder="+212 6XX XXX XXX" />
                </div>

                {/* Mot de passe */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    <Lock size={14} className="inline mr-1" />
                    Mot de passe <span className="text-red-500">*</span>
                  </label>
                  <input type="password" value={password} onChange={onchangePassword} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all" placeholder="Minimum 6 caractères" />
                </div>

                {/* Date de naissance */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    <Calendar size={14} className="inline mr-1" />
                    Date de naissance <span className="text-red-500">*</span>
                  </label>
                  <input type="date" value={date_naissance} onChange={onchangeDateNaissance} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all" placeholder="Confirmez le mot de passe" />
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

                {/* Niveau scolaire */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    <BookOpen  size={14} className="inline mr-1" />
                    Niveau scolaire <span className="text-red-500">*</span>
                  </label>
                  <select value={niveau_scolaire_id} onChange={onchangeNiveauScolaireId} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all bg-white">
                    <option value="">Sélectionner une niveau scolaire</option>
                    {niveauscolaires.map((niveauscolaires) => (
                      <option key={niveauscolaires.id} value={niveauscolaires.id}>
                        {niveauscolaires.nom_niveau}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Classe */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    <School  size={14} className="inline mr-1" />
                    Classe <span className="text-red-500">*</span>
                  </label>
                  <select value={classe_id} onChange={onchangeClasseId} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all bg-white">
                    <option value="">Sélectionner une classe</option>
                    {classes.map((classe) => (
                      <option key={classe.id} value={classe.id}>
                        {classe.nom_classe}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Filière */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    <GraduationCap size={14} className="inline mr-1" />
                    Filière <span className="text-red-500">*</span>
                  </label>
                  <select value={filiere_id} onChange={onchangeFiliereId} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/20 transition-all bg-white">
                    <option value="">Sélectionner une filière</option>
                    {filieres.map((filiere) => (
                      <option key={filiere.id} value={filiere.id}>
                        {filiere.nom_filiere}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Transport */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    <Bus size={14} className="inline mr-1" />
                    Transport <span className="text-red-500">*</span>
                  </label>
                  <select value={transport_id} onChange={onchangeTransportId} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/20 transition-all bg-white">
                    <option value="">Sélectionner un transport</option>
                    {transports.map((transport) => (
                      <option key={transport.id} value={transport.id}>
                        {transport.nom_transport}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date d'inscription */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    <Calendar size={14} className="inline mr-1" />
                    Date d'inscription <span className="text-red-500">*</span>
                  </label>
                  <input type="date" value={date_inscription} onChange={onchangeDateInscription} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all text-gray-700" />
                </div>

                {/* Statut */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    <AlertCircle size={14} className="inline mr-1" />
                    Statut
                  </label>
                  <select value={status} onChange={onchangeStatus} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all bg-white">
                    <option value="actif">Actif</option>
                    <option value="inactif">Inactif</option>
                  </select>
                </div>
              </div>

              {/* Boutons */}
              <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
                <button onClick={Anuler} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                  Annuler
                </button>
                <button onClick={AjouterEtudiant} type="submit" className="px-4 py-2 bg-[#E55B2D] text-white rounded-lg font-medium flex items-center gap-2 hover:bg-[#c44d24] transition-colors shadow-sm">
                  Ajouter l'étudiant
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}