import React from "react";
import { ArrowLeft, BookOpen, Hash, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ModifierFiliere() {
  const navigate = useNavigate()
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={()=> navigate("/ListeFiliere")} className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <div>
          <h1 className="text-3xl font-semibold m-0 mb-2 text-gray-800">Modifier la filière</h1>
          <p className="text-gray-500 m-0">Modifiez les informations de la filière.</p>
        </div>
      </div>

      <form className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div className="p-6">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                <Hash size={14} className="inline mr-1" />
                Code de la filière <span className="text-red-500">*</span>
              </label>
              <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all" placeholder="Ex: DW" defaultValue="DW" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                <BookOpen size={14} className="inline mr-1" />
                Nom de la filière <span className="text-red-500">*</span>
              </label>
              <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all" placeholder="Ex: Développement Web" defaultValue="Développement Web" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                <FileText size={14} className="inline mr-1" />
                Description
              </label>
              <textarea rows="4" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all resize-none" placeholder="Description de la filière..."
                defaultValue="Formation complète en développement web moderne"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#E55B2D] text-white rounded-lg font-medium flex items-center gap-2 hover:bg-[#c44d24] transition-colors shadow-sm"
            >
              Modifier la filière
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}