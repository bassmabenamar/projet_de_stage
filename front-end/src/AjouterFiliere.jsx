import React from "react";
import { ArrowLeft, BookOpen, Hash, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function AjouterFiliere() {
  const navigate = useNavigate()

  const [code,setCode] = useState("");
  const [nom_filiere,setNomFiliere] = useState("");
  const [description,setDescription] = useState("")

  function onchangeCode(e){
        setCode(e.target.value)
  }
  function onchangeNomFiliere(e){
        setNomFiliere(e.target.value)
  }
  function onchangeDescription(e){
    setDescription(e.target.value)
  }

  async function FiliereAjouter(e) {
    e.preventDefault();

    const data = {
      code,
      nom_filiere,
      description,
    };

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/filieres",data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      navigate("/ListeFiliere");
    } catch (error) {
      console.log(error.response?.data?.errors);
    }
  }

  function Anuler(){
    setCode("");
    setNomFiliere("");
    setDescription("");
  }


  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={()=> navigate("/ListeFiliere")} className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <div>
          <h1 className="text-3xl font-semibold m-0 mb-2 text-gray-800">Ajouter une filière</h1>
          <p className="text-gray-500 m-0">Remplissez les informations pour ajouter une nouvelle filière.</p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div className="p-6">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                <Hash size={14} className="inline mr-1" />
                Code de la filière <span className="text-red-500">*</span>
              </label>
              <input type="text" value={code} onChange={onchangeCode} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all" placeholder="Ex: DW" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                <BookOpen size={14} className="inline mr-1" />
                Nom de la filière <span className="text-red-500">*</span>
              </label>
              <input type="text" value={nom_filiere} onChange={onchangeNomFiliere} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all" placeholder="Ex: Développement Web" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                <FileText size={14} className="inline mr-1" />
                Description
              </label>
              <textarea rows="4" value={description} onChange={onchangeDescription} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all resize-none" placeholder="Description de la filière..." />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
            <button type="button" onClick={Anuler} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors" >
              Annuler
            </button>
            <button onClick={FiliereAjouter} className="px-4 py-2 bg-[#E55B2D] text-white rounded-lg font-medium flex items-center gap-2 hover:bg-[#c44d24] transition-colors shadow-sm">
              Ajouter la filière
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}