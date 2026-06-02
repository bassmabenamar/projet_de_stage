import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Upload, X, Loader2, Trash2, AlertCircle } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import API from '../../services/api';

const EditHomeworkPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  
  // États pour les listes de données
  const [niveaux, setNiveaux] = useState([]);
  const [filieres, setFilieres] = useState([]);
  const [classes, setClasses] = useState([]);

  // États pour les sélections
  const [selectedNiveau, setSelectedNiveau] = useState('');
  const [selectedFiliere, setSelectedFiliere] = useState('');

  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    classe_id: '',
    date_limite: '',
    status: 'draft'
  });
  const [file, setFile] = useState(null);
  const [existingFile, setExistingFile] = useState(null);
  const [error, setError] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  // Étape 1 : Charger les niveaux scolaires et les détails du devoir au montage
  useEffect(() => {
    const initializeData = async () => {
      setFetching(true);
      // On attend d'abord d'avoir la liste globale des niveaux
      const fetchedNiveaux = await fetchNiveaux();
      if (fetchedNiveaux) {
        await fetchHomeworkDetails(fetchedNiveaux);
      }
      setFetching(false);
    };

    initializeData();
  }, [id]);

  // Étape 2 : Gestion dynamique lors des changements manuels de Niveau
  useEffect(() => {
    // Éviter de vider pendant le chargement initial (fetching)
    if (fetching) return; 

    if (selectedNiveau) {
      const niveauEnCours = niveaux.find(n => n.id === parseInt(selectedNiveau));
      if (niveauEnCours && niveauEnCours.filieres && niveauEnCours.filieres.length > 0) {
        setFilieres(niveauEnCours.filieres);
        setClasses([]);
      } else {
        setFilieres([]);
        fetchClasses(selectedNiveau, null);
      }
    } else {
      setFilieres([]);
      setClasses([]);
    }
    setSelectedFiliere('');
    if(!fetching){
    setFormData(prev => ({ ...prev, classe_id: '' }));
    }
  }, [selectedNiveau, niveaux, fetching]);

  // Étape 3 : Gestion dynamique lors des changements manuels de Filière
  useEffect(() => {
    if (fetching) return;

    if (selectedFiliere) {
      fetchClasses(selectedNiveau, selectedFiliere);
    } else if (selectedNiveau && filieres.length > 0) {
      setClasses([]);
    }
    setFormData(prev => ({ ...prev, classe_id: '' }));
  }, [selectedFiliere, fetching]);


  const fetchNiveaux = async () => {
  try {
    const response = await API.get('/teacher/niveaux');

    console.log("RAW RESPONSE:", response.data);

    const data =
      response.data?.niveaux ??
      response.data?.data ??
      response.data ??
      [];

    const safeData = Array.isArray(data) ? data : [];

    console.log("NIVEAUX FINAL:", safeData);

    setNiveaux(safeData);

    return safeData;
  } catch (err) {
    console.error('Erreur niveaux:', err);
    setError('Impossible de charger les niveaux scolaires');
    return [];
  }
};
  const fetchHomeworkDetails = async (currentNiveaux) => {
    try {
      const response = await API.get(`/teacher/homeworks/${id}`);
      const homework = response.data;
      
     setFormData({
  titre: homework.title || '',
  description: homework.description || '',
  classe_id: homework.class_id || '',
  date_limite: homework.due_date
  ? new Date(homework.due_date).toISOString().slice(0, 16)
  : '',
  status: homework.status || 'draft'
});
      
      if (homework.file_path) {
        setExistingFile({
          name: homework.file_name || 'Fichier joint',
          path: homework.file_path
        });
      }

      // Configuration et pré-remplissage des sélections (Niveau / Filière / Classes correspondantes)
      if (homework.classe) {
        const niveauId = homework.classe.niveau_id;
        const filiereId = homework.classe.filiere_id || null;

        setSelectedNiveau(niveauId.toString());
        
        const niveauEnCours = currentNiveaux.find(n => n.id === parseInt(niveauId));
        if (niveauEnCours && niveauEnCours.filieres && niveauEnCours.filieres.length > 0) {
          setFilieres(niveauEnCours.filieres);
          if (filiereId) {
            setSelectedFiliere(filiereId.toString());
          }
        }

        // Charger directement les classes associées pour éviter que le select soit vide
        await fetchClasses(niveauId, filiereId);
      }
      
      setError(null);
    } catch (err) {
      console.error('Error fetching homework:', err);
      setError('Impossible de charger les détails du devoir');
    }
  };

  const fetchClasses = async (niveauId, filiereId) => {
    try {
      let url = `/teacher/classes?niveau_id=${niveauId}`;
      if (filiereId) {
        url += `&filiere_id=${filiereId}`;
      }
      const response = await API.get(url);
      const data = Array.isArray(response.data) ? response.data : response.data.classes || [];
      setClasses(data);
    } catch (err) {
      console.error('Error fetching classes:', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      setExistingFile(null);
    }
  };

  const handleRemoveExistingFile = () => {
    setExistingFile(null);
  };

  const handleSubmit = async (statusType) => {
 if (
  !formData.titre?.trim() ||
  !formData.classe_id ||
  !formData.date_limite
) {
  setError("Veuillez remplir tous les champs obligatoires (Titre, Classe, Date limite).");
  return;
}
  setLoading(true);
  setError(null);

  try {
    const submitData = new FormData();

    submitData.append('title', formData.titre); // backend expects "title"
    submitData.append('description', formData.description);
    submitData.append('class_id', formData.classe_id);
    submitData.append('due_date', formData.date_limite);
    submitData.append('status', statusType);
    submitData.append('_method', 'PUT');

    if (file) {
      submitData.append('attachment', file);
    }

    if (!existingFile && !file) {
      submitData.append('remove_file', 'true');
    }

    await API.post(`/teacher/homeworks/${id}`, submitData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    navigate('/homework');
  } catch (err) {
    setError(err.response?.data?.message || 'Impossible de modifier le devoir');
  } finally {
    setLoading(false);
  }
};

  const handleDelete = async () => {
    if (!deleteConfirm) {
      setDeleteConfirm(true);
      return;
    }
    
    try {
      setLoading(true);
      await API.delete(`/teacher/homeworks/${id}`);
      navigate('/homework');
    } catch (err) {
      console.error('Error deleting homework:', err);
      setError('Impossible de supprimer le devoir');
      setLoading(false);
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirm(false);
  };

  if (fetching) {
    return (
      <div className="flex min-h-screen bg-[#F8FAFC]">
        <Sidebar />
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          <Navbar />
          <main className="flex-1 overflow-y-auto p-10">
            <div className="flex justify-center items-center h-96">
              <Loader2 size={48} className="animate-spin text-[#002366]" />
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-10">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => navigate('/homework')}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <ArrowLeft size={24} className="text-[#002366]" />
                </button>
                <div>
                  <h1 className="text-3xl font-[1000] text-[#002366] tracking-tighter">Modifier le Devoir</h1>
                  <p className="text-slate-400 font-bold text-sm uppercase tracking-widest mt-1">
                    Édition du devoir
                  </p>
                </div>
              </div>
              
              {/* Delete Button */}
              {!deleteConfirm ? (
                <button
                  onClick={handleDelete}
                  disabled={loading}
                  className="px-6 py-3 bg-red-500 text-white rounded-xl font-bold text-sm hover:bg-red-600 transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  <Trash2 size={18} />
                  Supprimer
                </button>
              ) : (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-red-600 font-semibold">Confirmer la suppression ?</span>
                  <button
                    onClick={handleDelete}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-bold hover:bg-red-700 transition-colors"
                  >
                    Oui
                  </button>
                  <button
                    onClick={handleCancelDelete}
                    className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg text-sm font-bold hover:bg-slate-300 transition-colors"
                  >
                    Non
                  </button>
                </div>
              )}
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-2xl text-sm font-semibold flex items-center gap-2">
                <AlertCircle size={18} />
                {error}
              </div>
            )}

            {/* Form */}
            <div className="bg-white rounded-[40px] p-8 shadow-sm">
              <div className="space-y-6">
                {/* titre */}
                <div>
                  <label className="block text-[#002366] font-black text-xs uppercase tracking-wider mb-2">
                    Titre du Devoir *
                  </label>
                  <input
                    type="text"
                    name="titre"
                    value={formData.titre}
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
                    {niveaux.map(niv => (
                      <option key={niv.id} value={niv.id}>
                        {niv.name || niv.nom || niv.label || niv.titre}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Filière (Affichage Conditionnel) */}
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
                      {filieres.map(fil => (
                        <option key={fil.id} value={fil.id}>
                          {fil.name || fil.label || fil.titre}
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
                    name="classe_id"
                    value={formData.classe_id}
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
                    {classes.map(cls => (
                      <option key={cls.id} value={cls.id}>
                        {cls.name || cls.label || cls.titre}
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
                    name="date_limite"
                    value={formData.date_limite}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#002366] focus:outline-none focus:ring-2 focus:ring-[#002366]/20 transition-all"
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="block text-[#002366] font-black text-xs uppercase tracking-wider mb-2">
                    Statut
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#002366] focus:outline-none focus:ring-2 focus:ring-[#002366]/20 transition-all"
                  >
                    <option value="draft">Brouillon</option>
                    <option value="published">Publié</option>
                  </select>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-[#002366] font-black text-xs uppercase tracking-wider mb-2">
                    Instructions
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

                {/* File Upload */}
                <div>
                  <label className="block text-[#002366] font-black text-xs uppercase tracking-wider mb-2">
                    Fichier Joint (Optionnel)
                  </label>
                  <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:border-[#002366] transition-colors">
                    {(existingFile || file) ? (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-slate-100 rounded-lg">
                            <Upload size={20} className="text-slate-500" />
                          </div>
                          <div className="text-left">
                            <p className="text-sm font-semibold text-slate-700">
                              {file ? file.name : existingFile?.name}
                            </p>
                            <p className="text-xs text-slate-400">
                              {file ? 'Nouveau fichier' : 'Fichier actuel'}
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setFile(null);
                            handleRemoveExistingFile();
                          }}
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
                  {existingFile && !file && (
                    <p className="text-xs text-slate-400 mt-2">
                      * Laissez vide pour conserver le fichier actuel
                    </p>
                  )}
                </div>

                {/* Buttons */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => handleSubmit('draft')}
                    disabled={loading}
                    className="flex-1 bg-slate-100 text-slate-600 py-4 rounded-xl font-black text-sm uppercase tracking-wider hover:bg-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
                    className="flex-1 bg-[#002366] text-white py-4 rounded-xl font-black text-sm uppercase tracking-wider hover:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <Loader2 size={20} className="animate-spin" />
                    ) : (
                      <>
                        <Save size={20} />
                        Mettre à jour & Publier
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

export default EditHomeworkPage;