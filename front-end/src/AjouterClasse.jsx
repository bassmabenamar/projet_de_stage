import React from "react";
import { ArrowLeft, BookOpen, GraduationCap, Calendar, AlertCircle, MapPin, Users,School } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";

export default function AjouterClasse() {
  const navigate = useNavigate();
  const [nom_classe,setNomClasse] = useState("");
  const [capacite,setCapacite] = useState("");
  const [annee_scolaire,setAnneeScolaire] = useState("");
  const [niveau_scolaire_id,setNiveauScolaireId] = useState("");
  const [filiere_id,setFiliereId] = useState("");
  const [salle_id,setSalleId] = useState("");

  const [niveauScolaires,setniveauScolaires] = useState([]);
  const [filieres,setFilieres] = useState([]);
  const [salles,setSalles] = useState([]);

  useEffect(() => {
  
     axios.get("http://127.0.0.1:8000/api/salles", {
        headers: {
           Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }).then((response) => {setSalles(response.data);})
      .catch((error) => {console.log(error);});
    }, []);

  useEffect(() => {
  
     axios.get("http://127.0.0.1:8000/api/niveauscolaires", {
        headers: {
           Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }).then((response) => {setniveauScolaires(response.data);})
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


  function onchangeNomClasse(e){
        setNomClasse(e.target.value)
  }
  function onchangeCapacite(e){
        setCapacite(Number(e.target.value))
  }
  function onchangeAnneeScolaire(e){
        setAnneeScolaire(e.target.value)
  }
  function onchangeNiveauScolaireId(e){
    setNiveauScolaireId(e.target.value)
  }
  function onchangeFiliereId(e){
        setFiliereId(e.target.value)
  }
  function onchangeSalleId(e){
        setSalleId(e.target.value)
  }

  const handleRetour = () => {
    navigate("/ListeClasses");
  };


  async function ClasseAjouter(e) {
    e.preventDefault();

    const data = {
      nom_classe,
      capacite,
      annee_scolaire,
      niveau_scolaire_id,
      filiere_id,
      salle_id,
    };

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/classes",data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      navigate("/ListeClasses");
    } catch (error) {
      console.log(error.response?.data?.errors);
    }
  }
  

  function Anuler(){
    setNomClasse("");
    setCapacite("");
    setAnneeScolaire("");
    setNiveauScolaireId("");
    setFiliereId("");
    setSalleId("");
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
              <h1 className="text-3xl font-semibold m-0 mb-2 text-gray-800">Ajouter une classe</h1>
              <p className="text-gray-500 m-0">Remplissez les informations pour ajouter une nouvelle classe.</p>
            </div>
          </div>

          <div 
          className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700">
                        <School  size={14} className="inline mr-1" />
                        Nom de la classe <span className="text-red-500">*</span>
                      </label>
                      <input type="text" value={nom_classe} onChange={onchangeNomClasse} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all" placeholder="Ex: 2ème Année Génie Logiciel" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700">
                        <Users size={14} className="inline mr-1" />
                        Capacité <span className="text-red-500">*</span>
                      </label>
                      <input type="number" value={capacite} onChange={onchangeCapacite} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all" placeholder="Ex: 30" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    <BookOpen size={14} className="inline mr-1" />
                    Niveau <span className="text-red-500">*</span>
                  </label>
                  <select value={niveau_scolaire_id} onChange={onchangeNiveauScolaireId} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all bg-white">
                    <option value="">Sélectionner une niveau scolaire</option>
                    {niveauScolaires.map((niveauscolaire) => (
                      <option key={niveauscolaire.id} value={niveauscolaire.id}>
                        {niveauscolaire.nom_niveau}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    <GraduationCap size={14} className="inline mr-1" />
                    Filière <span className="text-red-500">*</span>
                  </label>
                  <select value={filiere_id} onChange={onchangeFiliereId} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all bg-white">
                    <option value="">Sélectionner une filière</option>
                    {filieres.map((filiere) => (
                      <option key={filiere.id} value={filiere.id}>
                        {filiere.nom_filiere}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    <Calendar size={14} className="inline mr-1" />
                    Année scolaire <span className="text-red-500">*</span>
                  </label>
                  <select value={annee_scolaire} onChange={onchangeAnneeScolaire} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all bg-white">
                  <option value="" disabled>Sélectionner une année scolaire</option>
                    <option value="2026-2027">2026-2027</option>
                    <option value="2027-2028">2027-2028</option>
                    <option value="2028-2029">2028-2029</option>
                    <option value="2029-2030">2029-2030</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    <MapPin size={14} className="inline mr-1" />
                    Salle principale <span className="text-red-500">*</span>
                  </label>
                  <select value={salle_id} onChange={onchangeSalleId} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all bg-white">
                    <option value="">Sélectionner une salle</option>
                    <option value="">Sélectionner une filière</option>
                    {salles.map((salle) => (
                      <option key={salle.id} value={salle.id}>
                        {salle.nom_salle}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
                <button type="button" onClick={Anuler} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                  Annuler
                </button>
                <button onClick={ClasseAjouter} className="px-4 py-2 bg-[#E55B2D] text-white rounded-lg font-medium flex items-center gap-2 hover:bg-[#c44d24] transition-colors shadow-sm">
                  Ajouter la classe
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}