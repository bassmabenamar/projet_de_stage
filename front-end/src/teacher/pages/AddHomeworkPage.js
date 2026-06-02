import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Upload, X, Loader2, AlertCircle } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import API from '../../services/api';

const AddHomeworkPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [niveaux, setNiveaux] = useState([]);
  const [filieres, setFilieres] = useState([]);
  const [classes, setClasses] = useState([]);

  const [selectedNiveau, setSelectedNiveau] = useState('');
  const [selectedFiliere, setSelectedFiliere] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    class_id: '',
    due_date: '',
    status: 'draft'
  });

  useEffect(() => {
    fetchNiveaux();
  }, []);

  const fetchNiveaux = async () => {
    try {
      const response = await API.get('/teacher/niveaux');
      const data = response.data.data || response.data || [];
      setNiveaux(data);
    } catch (err) {
      console.error(err);
      setError("Impossible de charger les niveaux scolaires");
    }
  };

  useEffect(() => {
    if (!selectedNiveau) {
      setFilieres([]);
      setClasses([]);
      return;
    }

    const niveau = niveaux.find(n => n.id === parseInt(selectedNiveau));

    if (niveau && niveau.filieres && niveau.filieres.length > 0) {
      setFilieres(niveau.filieres);
      setClasses([]);
    } else {
      setFilieres([]);
      fetchClasses(selectedNiveau, null);
    }

    setSelectedFiliere('');
    setFormData(prev => ({ ...prev, class_id: '' }));
  }, [selectedNiveau, niveaux]);

  useEffect(() => {
    if (selectedFiliere) {
      fetchClasses(selectedNiveau, selectedFiliere);
    } else if (selectedNiveau && filieres.length > 0) {
      setClasses([]);
    }
    setFormData(prev => ({ ...prev, class_id: '' }));
  }, [selectedFiliere]);

  const fetchClasses = async (niveauId, filiereId = null) => {
    try {
      let url = `/teacher/classes?niveau_id=${niveauId}`;
      if (filiereId) {
        url += `&filiere_id=${filiereId}`;
      }
      const response = await API.get(url);
      const data = response.data.data || response.data || [];
      setClasses(data);
    } catch (err) {
      console.error(err);
      setError("Impossible de charger les classes");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (statusType) => {
    if (!formData.title || !formData.class_id || !formData.due_date) {
      setError("Veuillez remplir tous les champs obligatoires (Titre, Classe, Date Limite).");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const submitData = new FormData();
      submitData.append('title', formData.title);
      submitData.append('description', formData.description);
      submitData.append('class_id', formData.class_id);
      submitData.append('due_date', formData.due_date);
      submitData.append('status', statusType);

      if (file) {
        submitData.append('attachment', file);
      }

      await API.post('/teacher/homeworks', submitData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      navigate('/homework');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Erreur lors de la création du devoir");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-10">
          <div className="max-w-4xl mx-auto">
            
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
              <button
                onClick={() => navigate('/homework')}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <ArrowLeft size={24} className="text-[#002366]" />
              </button>
              <div>
                <h1 className="text-3xl font-[1000] text-[#002366] tracking-tighter">Créer un Devoir</h1>
                <p className="text-slate-400 font-bold text-sm uppercase tracking-widest mt-1">
                  Nouvelle assignation
                </p>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-2xl text-sm font-semibold flex items-center gap-2">
                <AlertCircle size={18} />
                {error}
              </div>
            )}

            {/* Form */}
            <div className="bg-white rounded-[40px] p-8 shadow-sm">
              <div className="space-y-6">
                
                {/* Title */}
                <div>
                  <label className="block text-[#002366] font-black text-xs uppercase tracking-wider mb-2">
                    Titre du Devoir *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#002366] focus:outline-none focus:ring-2 focus:ring-[#002366]/20 transition-all"
                    placeholder="Ex: Exercices de Mathématiques"
                  />
                </div>

                {/* Niveau Scolaire */}
                <div>
                  <label className="block text-[#002366] font-black text-xs uppercase tracking-wider mb-2">
                    Niveau Scolaire *
                  </label>
                  <select
                    value={selectedNiveau}
                    onChange={(e) => setSelectedNiveau(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#002366] focus:outline-none focus:ring-2 focus:ring-[#002366]/20 transition-all"
                  >
                    <option value="">Sélectionner un niveau</option>
                    {niveaux.map((niv) => (
                      <option key={niv.id} value={niv.id}>
                        {niv.nom || niv.name || niv.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Filière (Conditionnel) */}
                {filieres.length > 0 && (
                  <div>
                    <label className="block text-[#002366] font-black text-xs uppercase tracking-wider mb-2">
                      Filière *
                    </label>
                    <select
                      value={selectedFiliere}
                      onChange={(e) => setSelectedFiliere(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#002366] focus:outline-none focus:ring-2 focus:ring-[#002366]/20 transition-all"
                    >
                      <option value="">Sélectionner une filière</option>
                      {filieres.map((fil) => (
                        <option key={fil.id} value={fil.id}>
                          {fil.nom || fil.name || fil.label}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Classe */}
                <div>
                  <label className="block text-[#002366] font-black text-xs uppercase tracking-wider mb-2">
                    Classe *
                  </label>
                  <select
                    name="class_id"
                    value={formData.class_id}
                    onChange={handleInputChange}
                    required
                    disabled={!selectedNiveau || (filieres.length > 0 && !selectedFiliere)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#002366] focus:outline-none focus:ring-2 focus:ring-[#002366]/20 transition-all disabled:bg-slate-50 disabled:text-slate-400"
                  >
                    <option value="">
                      {!selectedNiveau 
                        ? "Sélectionnez d'abord un niveau" 
                        : filieres.length > 0 && !selectedFiliere 
                        ? "Sélectionnez d'abord une filière" 
                        : "Sélectionner une classe"}
                    </option>
                    {classes.map((cls) => (
                      <option key={cls.id} value={cls.id}>
                        {cls.nom || cls.name || cls.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Due Date */}
                <div>
                  <label className="block text-[#002366] font-black text-xs uppercase tracking-wider mb-2">
                    Date Limite *
                  </label>
                  <input
                    type="datetime-local"
                    name="due_date"
                    value={formData.due_date}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#002366] focus:outline-none focus:ring-2 focus:ring-[#002366]/20 transition-all"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-[#002366] font-black text-xs uppercase tracking-wider mb-2">
                    Instructions / Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="6"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#002366] focus:outline-none focus:ring-2 focus:ring-[#002366]/20 transition-all resize-none"
                    placeholder="Décrivez le devoir, les instructions, les attentes..."
                  />
                </div>

                {/* File Upload Zone */}
                <div>
                  <label className="block text-[#002366] font-black text-xs uppercase tracking-wider mb-2">
                    Fichier Joint (Optionnel)
                  </label>
                  <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:border-[#002366] transition-colors">
                    {file ? (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-slate-100 rounded-lg">
                            <Upload size={20} className="text-slate-500" />
                          </div>
                          <div className="text-left">
                            <p className="text-sm font-semibold text-slate-700">{file.name}</p>
                            <p className="text-xs text-slate-400">Nouveau fichier sélectionné</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setFile(null)}
                          className="p-1 hover:bg-red-50 rounded-full transition-colors"
                        >
                          <X size={20} className="text-red-500" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <Upload size={32} className="mx-auto text-slate-400 mb-2" />
                        <p className="text-sm text-slate-500 mb-2">
                          Cliquez ou glissez-déposez un fichier
                        </p>
                        <p className="text-xs text-slate-400 mb-3">
                          PDF, DOC, JPG, PNG (Max 10MB)
                        </p>
                        <input
                          type="file"
                          onChange={handleFileChange}
                          className="hidden"
                          id="file-upload"
                        />
                        <label
                          htmlFor="file-upload"
                          className="inline-block px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-semibold cursor-pointer hover:bg-slate-200 transition-colors"
                        >
                          Parcourir
                        </label>
                      </>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => handleSubmit('draft')}
                    disabled={loading}
                    className="flex-1 bg-slate-100 text-slate-600 py-4 rounded-xl font-black text-sm uppercase tracking-wider hover:bg-slate-200 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <Loader2 size={20} className="animate-spin" />
                    ) : (
                      <>
                        <Save size={20} />
                        Sauvegarder comme Brouillon
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSubmit('published')}
                    disabled={loading}
                    className="flex-1 bg-[#002366] text-white py-4 rounded-xl font-black text-sm uppercase tracking-wider hover:bg-blue-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <Loader2 size={20} className="animate-spin" />
                    ) : (
                      <>
                        <Save size={20} />
                        Créer & Publier
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate('/homework')}
                    className="px-8 py-4 rounded-xl border-2 border-slate-200 text-slate-600 font-black text-sm uppercase tracking-wider hover:bg-slate-50 transition-colors"
                  >
                    Annuler
                  </button>
                </div>

              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default AddHomeworkPage;