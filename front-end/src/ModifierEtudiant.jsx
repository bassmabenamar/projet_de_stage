import React from "react";
import { ArrowLeft, User, Mail, Lock, Phone, MapPin, BookOpen, AlertCircle, Calendar, Users, School, GraduationCap, Bus} from "lucide-react";
import { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate,useParams } from "react-router-dom";

export default function ModifierEtudiant() {
  const navigate = useNavigate();

  const [etudiant, setEtudiant] = useState(null);
  const { id } = useParams();

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

  const [classes, setClasses] = useState([]);
  const [transports,setTransports] = useState([]);
  const [niveauscolaires,setNiveauscolaires] = useState([]);
  const [filieres,setFilieres] = useState([]);

  useEffect(() => {
    async function getOne() {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/etudiants/${id}`,{
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setEtudiant(res.data);
        setPrenom(res.data?.prenom);
        setNom(res.data?.nom);
        setEmail(res.data?.email);
        setPhone(res.data?.phone);
        setPassword(res.data?.password);
        setAdresse(res.data?.adresse);
        setGenre(res.data?.genre);
        setStatus(res.data?.status);
        setDateNaissance(res.data?.date_naissance);
        setDateInscription(res.data?.date_inscription);
        setClasseId(res.data?.classe_id);
        setNiveauScolaireId(res.data?.niveau_scolaire_id);
        setFiliereId(res.data?.filiere_id);
        setTransportId(res.data?.transport_id);
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

  if (!etudiant) return <div>Loading...</div>;

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

  const handleRetour = () => {
    navigate("/ListeEtudiants")
  };

  async function UpdateEtudiant(e) {
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
    formData.append("date_naissance", date_naissance);
    formData.append("date_inscription", date_inscription);
    formData.append("classe_id", classe_id);
    formData.append("filiere_id", filiere_id);
    formData.append("niveau_scolaire_id", niveau_scolaire_id);
    formData.append("transport_id", transport_id);
    formData.append("status", status);
    formData.append("_method", "PUT");

    try {
      const res = await axios.post(
        `http://127.0.0.1:8000/api/etudiants/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      navigate("/ListeEtudiants")
    } catch (error) {
      console.log("ERROR BACKEND:", error.response.data);
    }
  }

  function Anuler(){
      setPrenom(etudiant?.prenom);
      setNom(etudiant?.nom);
      setEmail(etudiant?.email);
      setPhone(etudiant?.phone);
      setPassword(etudiant?.password);
      setAdresse(etudiant?.adresse);
      setGenre(etudiant?.genre);
      setStatus(etudiant?.status);
      setDateNaissance(etudiant?.date_naissance);
      setDateInscription(etudiant?.date_inscription);
      setClasseId(etudiant?.classe_id);
      setNiveauScolaireId(etudiant?.niveau_scolaire_id);
      setFiliereId(etudiant?.filiere_id);
      setTransportId(etudiant?.transport_id);
    }

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col overflow-auto">
        <div className="p-6">
          {/* Header avec bouton retour */}
          <div className="flex items-center gap-4 mb-6">
            <button onClick={handleRetour} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <div>
              <h1 className="text-3xl font-semibold m-0 mb-2 text-gray-800">Modifier l'étudiant</h1>
              <p className="text-gray-500 m-0">Modifiez les informations de l'étudiant.</p>
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
                  <input type="text" value={prenom} onChange={onchangePrenom} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all" placeholder="Entrez le prénom" required/>
                </div>

                {/* Nom */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    <User size={14} className="inline mr-1" />
                    Nom <span className="text-red-500">*</span>
                  </label>
                  <input type="text" value={nom} onChange={onchangeNom} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all" placeholder="Entrez le nom" required/>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    <Mail size={14} className="inline mr-1" />
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input type="email" value={email} onChange={onchangeEmail} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all" placeholder="exemple@amity.com" required/>
                </div>

                {/* Téléphone */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    <Phone size={14} className="inline mr-1" />
                    Téléphone <span className="text-red-500">*</span>
                  </label>
                  <input type="tel" value={phone} onChange={onchangePhone} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all" placeholder="+212 6XX XXX XXX" required/>
                </div>

                {/* Mot de passe (optionnel) */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    <Lock size={14} className="inline mr-1" />
                    Nouveau mot de passe
                  </label>
                  <input type="password" value={password} onChange={onchangePassword} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all" placeholder="Laisser vide pour garder l'actuel" />
                </div>

                {/* Date de naissance */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    <Calendar size={14} className="inline mr-1" />
                    Date de naissance <span className="text-red-500">*</span>
                  </label>
                  <input type="date" value={date_naissance} onChange={onchangeDateNaissance} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all" required/>
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
                  <select value={genre} onChange={onchangeGenre} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all bg-white" required>
                    <option value="">Sélectionner le genre</option>
                    <option value="Homme">Homme</option>
                    <option value="Femme">Femme</option>
                  </select>
                </div>

                {/* Niveau scolaire */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    <BookOpen size={14} className="inline mr-1" />
                    Niveau scolaire <span className="text-red-500">*</span>
                  </label>
                  <select value={niveau_scolaire_id} onChange={onchangeNiveauScolaireId} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all bg-white" required>
                    <option value="">Sélectionner un niveau scolaire</option>
                    {niveauscolaires.map((niveau) => (
                      <option key={niveau.id} value={niveau.id}>
                        {niveau.nom_niveau}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Classe */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    <School size={14} className="inline mr-1" />
                    Classe <span className="text-red-500">*</span>
                  </label>
                  <select value={classe_id} onChange={onchangeClasseId} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all bg-white" required>
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
                  <select value={filiere_id} onChange={onchangeFiliereId} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all bg-white" required>
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
                  <select value={transport_id} onChange={onchangeTransportId} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all bg-white" required>
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
                  <input type="date" value={date_inscription} onChange={onchangeDateInscription} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all text-gray-700" required/>
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
                <button type="button" onClick={Anuler} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                  Annuler
                </button>
                <button type="submit" onClick={UpdateEtudiant} className="px-4 py-2 bg-[#E55B2D] text-white rounded-lg font-medium flex items-center gap-2 hover:bg-[#c44d24] transition-colors shadow-sm">
                  Modifier l'étudiant
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}