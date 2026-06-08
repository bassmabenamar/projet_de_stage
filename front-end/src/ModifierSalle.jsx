import React from "react";
import { ArrowLeft, MapPin, Users } from "lucide-react";
import { useNavigate,useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";

export default function ModifierSalle() {
  const navigate = useNavigate()
  const { id } = useParams();

  const [nom_salle,setNomSalle] = useState("");
  const [type_salle,setTypeSalle] = useState("");
  const [capacite,setCapacite] = useState("");
  const [etage,setEtage] = useState("");
  const [statut,setStatut] = useState("Disponible");
  const [description,setDescription] = useState("");
  const [originalData, setOriginalData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getOne() {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/salles/${id}`,{
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        
        setNomSalle(res.data?.nom_salle);
        setTypeSalle(res.data?.type_salle);
        setCapacite(res.data?.capacite);
        setEtage(res.data?.etage);
        setStatut(res.data?.statut);
        setDescription(res.data?.description);
        setLoading(false);
        setOriginalData(res.data);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    getOne();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  function onchangeNomSalle(e){
    setNomSalle(e.target.value)
  }
  function onchangeTypeSalle(e){
    setTypeSalle(e.target.value)
  }
  function onchangeCapacite(e){
    setCapacite(Number(e.target.value))
  }
  function onchangeEtage(e){
    setEtage(e.target.value)
  }
  function onchangeStatut(e){
    setStatut(e.target.value)
  }
  function onchangeDescription(e){
    setDescription(e.target.value)
  }

  async function SalleModifier(e) {
    e.preventDefault();

    const data = {
      nom_salle,
      type_salle,
      capacite,
      etage,
      statut,
      description,
    };

    try {
      const res = await axios.put(`http://127.0.0.1:8000/api/salles/${id}`,data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      navigate("/admin/Salles");
    } catch (error) {
      console.log(error.response?.data?.errors);
    }
  }

  function Anuler(){
    if (!originalData) return;

    setNomSalle(originalData.nom_salle);
    setTypeSalle(originalData.type_salle);
    setCapacite(originalData.capacite);
    setEtage(originalData.etage);
    setStatut(originalData.statut);
    setDescription(originalData.description);
  }

  const handleRetour = () => {
    navigate("/admin/Salles")
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
              <h1 className="text-3xl font-semibold m-0 mb-2 text-gray-800">Modifier la salle</h1>
              <p className="text-gray-500 m-0">Modifiez les informations de la salle.</p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    <MapPin size={14} className="inline mr-1" />
                    Nom de la salle <span className="text-red-500">*</span>
                  </label>
                  <input type="text" value={nom_salle} onChange={onchangeNomSalle} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all" placeholder="Ex: A101, Lab Info 1" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Type de salle <span className="text-red-500">*</span>
                  </label>
                  <select value={type_salle} onChange={onchangeTypeSalle} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all bg-white">
                    <option value="Salle standard">Salle standard</option>
                    <option value="Laboratoire">Laboratoire</option>
                    <option value="Amphithéâtre">Amphithéâtre</option>
                    <option value="Salle TP">Salle TP</option>
                    <option value="Salle de réunion">Salle de réunion</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    <Users size={14} className="inline mr-1" />
                    Capacité <span className="text-red-500">*</span>
                  </label>
                  <input type="number" value={capacite} onChange={onchangeCapacite} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all" placeholder="Nombre de places" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Étage</label>
                  <select value={etage} onChange={onchangeEtage} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all bg-white">
                    <option value="Rez-de-chaussée">Rez-de-chaussée</option>
                    <option value="1er étage">1er étage</option>
                    <option value="2ème étage">2ème étage</option>
                    <option value="3ème étage">3ème étage</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Statut</label>
                  <select value={statut} onChange={onchangeStatut} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all bg-white">
                    <option value="Disponible">Disponible</option>
                    <option value="Occupée">Occupée</option>
                    <option value="En maintenance">En maintenance</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2 text-gray-700">Description</label>
                  <textarea value={description} onChange={onchangeDescription} rows="3" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all" placeholder="Description de la salle..."/>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
                <button type="button" onClick={Anuler} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                  Annuler
                </button>
                <button onClick={SalleModifier} className="px-4 py-2 bg-[#2F5D9F] text-white rounded-lg font-medium flex items-center gap-2 hover:bg-[#1e3d6b] transition-colors shadow-sm">
                  Modifier la salle
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}