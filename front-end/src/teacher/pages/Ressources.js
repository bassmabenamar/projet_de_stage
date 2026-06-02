
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Folder, MoreVertical, FileText, Video, Link, 
  HardDrive, Plus, Upload, FolderPlus, Grid, 
  List, Eye, Download, Trash2, Loader2,
  Search, X, ChevronRight, Home, Filter, Lock, Globe
} from 'lucide-react';

import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import API from '../../services/api';

const PageRessources = () => {
  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);
  const [currentFolder, setCurrentFolder] = useState(null);
  const [folderPath, setFolderPath] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileType, setFileType] = useState('pdf');
  const [fileTitle, setFileTitle] = useState('');
  const [fileLink, setFileLink] = useState('');
  const [stats, setStats] = useState({
    totalSize: '0 GB',
    totalFiles: 0,
    totalVideos: 0,
    totalLinks: 0
  });

  const [niveauxScolaires, setNiveauxScolaires] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  
  const [filieres, setFilieres] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedFiliere, setSelectedFiliere] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
 // filters
const [filterFiliere, setFilterFiliere] = useState('');
const [filterClass, setFilterClass] = useState('');
const [filterNiveau, setFilterNiveau] = useState('');

// create folder modal
const [folderFiliere, setFolderFiliere] = useState('');
const [folderClass, setFolderClass] = useState('');

// upload modal
const [uploadFiliere, setUploadFiliere] = useState('');
const [uploadClass, setUploadClass] = useState('');
  // Initial load hooks
  
  // Trigger re-fetch on dependency transitions
  useEffect(() => {
    if (currentFolder) {
      fetchFiles(currentFolder.id);
    } else {
      fetchRootFiles();
    }
  }, [currentFolder, filterFiliere, filterClass, filterNiveau]);
useEffect(() => {
  const loadFilieres = async () => {
    try {
      let url = '/filieres';

      if (filterNiveau) {
        url = `/niveaux-scolaires/${filterNiveau}/filieres`;
      }

      const response = await API.get(url);
      setFilieres(response.data.data || response.data || []);
    } catch (err) {
      console.error(err);
      setFilieres([]);
    }
  };

  loadFilieres();
}, [filterNiveau]);

useEffect(() => {
  const loadClasses = async () => {
    try {
      if (!selectedFiliere) {
        setClasses([]);
        return;
      }

      let url = `/filieres/${selectedFiliere}/classes`;

      if (filterNiveau) {
        url += `?niveau_id=${filterNiveau}`;
      }

      const response = await API.get(url);
      setClasses(response.data.data || response.data || []);
    } catch (err) {
      console.error(err);
      setClasses([]);
    }
  };

  loadClasses();
}, [selectedFiliere, filterNiveau]);

  useEffect(() => {
    if (selectedFiliere) {
      fetchClasses();
    } else {
      setClasses([]);
      setSelectedClass('');
    }
  }, [selectedFiliere]);

  const fetchNiveaux = async () => {
    try {
      const response = await API.get('/niveaux-scolaires'); 
      setNiveauxScolaires(response.data.data || response.data || []);
    } catch (err) {
      console.error("Error fetching niveaux scolaires:", err);
      setNiveauxScolaires([]);
    }
  };

  const fetchFilieres = async () => {
    try {
      const response = await API.get('/filieres');
      setFilieres(response.data.data || response.data || []);
    } catch (err) {
      console.error('Error fetching filieres:', err);
      setFilieres([]);
    }
  };

  const fetchClasses = async () => {
    try {
      const response = await API.get(`/filieres/${selectedFiliere}/classes`);
      setClasses(response.data.data || response.data || []);
    } catch (err) {
      console.error('Error fetching classes:', err);
      setClasses([]);
    }
  };

  const fetchFolders = async () => {
    try {
      const response = await API.get('/teacher/folders');
      setFolders(response.data.data || response.data || []);
    } catch (err) {
      console.error('Error fetching folders:', err);
      setFolders([]);
    }
  };

  const fetchStats = async () => {
  try {
    const response = await API.get('/teacher/stats');
    setStats(response.data.data || response.data || {
      totalSize: '0 GB',
      totalFiles: 0,
      totalVideos: 0,
      totalLinks: 0
    });
  } catch (err) {
    console.error('Error fetching stats:', err);
  }
};

useEffect(() => {
  fetchFolders();
  fetchStats();
  fetchFilieres();
  fetchNiveaux();
}, []);

  const fetchFiles = async (folderId) => {
    try {
      setLoading(true);
      const response = await API.get(`/teacher/folders/${folderId}/files`);
      setFiles(response.data.data || response.data || []);
    } catch (err) {
      console.error('Error fetching files:', err);
      setFiles([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchRootFiles = async () => {
    try {
      setLoading(true);
      let params = [];
      if (filterFiliere) params.push(`filiere_id=${filterFiliere}`);
      if (filterClass) params.push(`classe_id=${filterClass}`);
      if (filterNiveau) params.push(`niveau_id=${filterNiveau}`);
      
      let url = '/teacher/files/root';
      if (params.length > 0) {
        url += `?${params.join('&')}`;
      }
      
      const response = await API.get(url);
      setFiles(response.data.data || response.data || []);
    } catch (err) {
      console.error('Error fetching root files:', err);
      setFiles([]);
    } finally {
      setLoading(false);
    }
  };

  const createFolder = async () => {
    if (!newFolderName.trim()) {
      setError('Le nom du dossier est requis');
      return;
    }
    if (!selectedFiliere || !selectedClass) {
      setError('Veuillez sélectionner une filière et une classe');
      return;
    }

    try {
      const response = await API.post('/teacher/folders', {
        nom: newFolderName,
        parent_id: currentFolder?.id || null,
        filiere_id: selectedFiliere,
        classe_id: selectedClass
      });
      setFolders([response.data, ...folders]);
      setShowCreateFolder(false);
      setNewFolderName('');
      setSuccess('Dossier créé avec succès');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error('Error creating folder:', err);
      setError('Impossible de créer le dossier');
      setTimeout(() => setError(null), 3000);
    }
  };

  const uploadFile = async () => {
    if (!selectedFile && !fileLink) {
      setError('Veuillez sélectionner un fichier ou entrer un lien');
      return;
    }
    if (!selectedFiliere || !selectedClass) {
      setError('Veuillez sélectionner une filière et une classe');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('titre', fileTitle);
      formData.append('type', fileType);
      formData.append('filiere_id', selectedFiliere);
      formData.append('classe_id', selectedClass);
      
      if (selectedFile) formData.append('fichier', selectedFile);
      if (fileLink) formData.append('lien', fileLink);
      if (currentFolder) formData.append('dossier_id', currentFolder.id);

      await API.post('/teacher/files', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setShowUploadModal(false);
      setSelectedFile(null);
      setFileTitle('');
      setFileLink('');
      setSelectedFiliere('');
      setSelectedClass('');
      setClasses([]);
      
      if (currentFolder) {
        fetchFiles(currentFolder.id);
      } else {
        fetchRootFiles();
      }
      fetchStats();
      setSuccess('Fichier ajouté avec succès');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error('Error uploading file:', err);
      setError('Impossible d\'ajouter le fichier');
      setTimeout(() => setError(null), 3000);
    }
  };

  const deleteFile = async (fileId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce fichier ?')) {
      try {
        await API.delete(`/teacher/files/${fileId}`);
        setFiles(files.filter(f => f.id !== fileId));
        fetchStats();
        setSuccess('Fichier supprimé avec succès');
        setTimeout(() => setSuccess(null), 3000);
      } catch (err) {
        console.error('Error deleting file:', err);
        setError('Impossible de supprimer le fichier');
        setTimeout(() => setError(null), 3000);
      }
    }
  };

  const deleteFolder = async (folderId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce dossier et tout son contenu ?')) {
      try {
        await API.delete(`/teacher/folders/${folderId}`);
        setFolders(folders.filter(f => f.id !== folderId));
        setSuccess('Dossier supprimé avec succès');
        setTimeout(() => setSuccess(null), 3000);
      } catch (err) {
        console.error('Error deleting folder:', err);
        setError('Impossible de supprimer le dossier');
        setTimeout(() => setError(null), 3000);
      }
    }
  };

  const openFolder = (folder) => {
    setCurrentFolder(folder);
    setFolderPath([...folderPath, folder]);
  };

  const navigateToFolder = (index) => {
    const newPath = folderPath.slice(0, index + 1);
    setFolderPath(newPath);
    setCurrentFolder(newPath[newPath.length - 1] || null);
  };

  const resetFilters = () => {
    setFilterFiliere('');
    setFilterClass('');
    setFilterNiveau('');
  };

  const formatDate = (date) => {
    if (!date) return 'Date inconnue';
    const diff = Math.floor((new Date() - new Date(date)) / (1000 * 60 * 60));
    if (diff < 1) return 'À l\'instant';
    if (diff < 24) return `Il y a ${diff} heures`;
    if (diff < 168) return `Il y a ${Math.floor(diff / 24)} jours`;
    return new Date(date).toLocaleDateString('fr-FR');
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  if (loading && folders.length === 0 && files.length === 0) {
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

        <main className="flex-1 overflow-y-auto p-10 custom-scrollbar">
          
          {/* Success/Error Messages */}
          {(success || error) && (
            <div className={`fixed top-20 right-8 z-50 p-4 rounded-2xl text-sm font-semibold shadow-lg ${
              success ? 'bg-emerald-50 border border-emerald-200 text-emerald-700' : 'bg-red-50 border border-red-200 text-red-700'
            }`}>
              {success || error}
            </div>
          )}

          {/* Navigation Fil d'Ariane */}
          <div className="flex items-center gap-2 mb-6 text-sm">
            <button
              onClick={() => {
                setCurrentFolder(null);
                setFolderPath([]);
              }}
              className="flex items-center gap-1 text-slate-400 hover:text-[#002366] transition-colors"
            >
              <Home size={16} />
              <span className="font-medium">Mes ressources</span>
            </button>
            {folderPath.map((folder, index) => (
              <React.Fragment key={folder.id}>
                <ChevronRight size={14} className="text-slate-300" />
                <button
                  onClick={() => navigateToFolder(index)}
                  className="text-slate-400 hover:text-[#002366] transition-colors font-medium"
                >
                  {folder.nom}
                </button>
              </React.Fragment>
            ))}
          </div>

          {/* Filter Section for Root */}
          {!currentFolder && (
            <div className="bg-white rounded-2xl p-6 mb-8 border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-black text-[#002366] flex items-center gap-2">
                  <Filter size={18} />
                  Filtrer par niveau, filière et classe
                </h3>
                {(filterFiliere || filterClass || filterNiveau) && (
                  <button
                    onClick={resetFilters}
                    className="text-xs text-red-500 hover:text-red-600 font-bold"
                  >
                    Effacer les filtres
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Niveau Scolaire Dropdown */}
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">Niveau Scolaire</label>
                  <select
                    value={filterNiveau}
                    onChange={(e) => setFilterNiveau(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002366]"
                  >
                    <option value="">Tous les niveaux</option>
                    {niveauxScolaires.map(n => (
                      <option key={n.id} value={n.id}>{n.nom}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">Filière</label>
                  <select
                    value={filterFiliere}
                    onChange={(e) => setFilterFiliere(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002366]"
                  >
                    <option value="">Toutes les filières</option>
                    {filieres.map(f => (
                      <option key={f.id} value={f.id}>{f.nom}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">Classe</label>
                  <select
                    value={filterClass}
                    onChange={(e) => setFilterClass(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002366]"
                  >
                    <option value="">Toutes les classes</option>
                    {classes.map(c => (
                      <option key={c.id} value={c.id}>{c.nom}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
          
          {/* HEADER */}
          <header className="flex justify-between items-end mb-10">
            <motion.div 
              initial={{ x: -20, opacity: 0 }} 
              animate={{ x: 0, opacity: 1 }}
            >
              <h1 className="text-3xl font-[1000] text-[#002366] tracking-tighter">
                {currentFolder ? currentFolder.nom : 'Mes Ressources'}
              </h1>
              <p className="text-slate-400 font-bold text-sm mt-1">
                Gérez les supports de cours, les documents et les contenus multimédias.
              </p>
            </motion.div>
            
            <div className="flex gap-4">
              <button 
                onClick={() => setShowCreateFolder(true)}
                className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-black text-slate-600 hover:bg-slate-50 transition-all shadow-sm"
              >
                <FolderPlus size={18} /> Nouveau dossier
              </button>

              <button 
                onClick={() => setShowUploadModal(true)}
                className="flex items-center gap-2 px-8 py-4 bg-[#002366] text-white rounded-[22px] font-black text-sm shadow-xl shadow-blue-900/20 hover:scale-105 transition-all"
              >
                <Upload size={18} /> Télécharger des fichiers
              </button>
            </div>
          </header>

          {/* STATISTIQUES */}
          {!currentFolder && (
            <motion.div 
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
            >
              <StatCard icon={<HardDrive size={22}/>} label="Stockage utilisé" value={stats.totalSize} sub="50GB Total" color="blue" />
              <StatCard icon={<FileText size={22}/>} label="Documents PDF" value={stats.totalFiles} sub="Fichiers" color="orange" />
              <StatCard icon={<Video size={22}/>} label="Contenus vidéo" value={stats.totalVideos} sub="Vidéos" color="green" />
              <StatCard icon={<Link size={22}/>} label="Liens partagés" value={stats.totalLinks} sub="Actifs" color="purple" />
            </motion.div>
          )}

          {/* DOSSIERS */}
          {!currentFolder && folders.length > 0 && (
            <section className="mb-12">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-[1000] text-[#002366]">Mes Dossiers</h2>
              </div>
              <motion.div 
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-4 gap-6"
              >
                {folders.map((folder) => (
                  <FolderCard 
                    key={folder.id}
                    id={folder.id}
                    name={folder.nom}
                    files={folder.files_count}
                    date={formatDate(folder.updated_at)}
                    isPrivate={folder.is_private}
                    onOpen={() => openFolder(folder)}
                    onDelete={() => deleteFolder(folder.id)}
                  />
                ))}
              </motion.div>
            </section>
          )}

          {/* TABLEAU DES FICHIERS */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-[1000] text-[#002366]">
                {currentFolder ? 'Fichiers du dossier' : 'Téléchargements récents'}
              </h2>
              <div className="flex gap-2 bg-slate-100 p-1 rounded-xl">
                <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-[#002366]' : 'text-slate-400'}`}><List size={16}/></button>
                <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-[#002366]' : 'text-slate-400'}`}><Grid size={16}/></button>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center py-20">
                <Loader2 size={40} className="animate-spin text-[#002366]" />
              </div>
            ) : files.length === 0 ? (
              <div className="bg-white rounded-[40px] p-12 text-center border border-slate-100">
                <Folder size={48} className="mx-auto text-slate-300 mb-4" />
                <h3 className="text-xl font-black text-[#002366] mb-2">Aucun fichier</h3>
                <p className="text-slate-400">Ce dossier est vide. Téléchargez des fichiers pour commencer.</p>
              </div>
            ) : viewMode === 'list' ? (
              <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-50/50 border-b border-slate-100">
                    <tr>
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Nom du fichier</th>
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Type</th>
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Taille</th>
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date d'ajout</th>
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {files.map((file) => (
                      <FileRow 
                        key={file.id}
                        id={file.id}
                        name={file.titre}
                        type={file.type}
                        size={file.taille || '—'}
                        time={formatDate(file.created_at)}
                        onDelete={() => deleteFile(file.id)}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {files.map((file) => (
                  <FileCard
                    key={file.id}
                    id={file.id}
                    name={file.titre}
                    type={file.type}
                    size={file.taille || '—'}
                    date={formatDate(file.created_at)}
                    onDelete={() => deleteFile(file.id)}
                  />
                ))}
              </div>
            )}
          </section>
        </main>

        {/* BOUTON FLOTTANT */}
        <motion.button 
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowUploadModal(true)}
          className="fixed bottom-10 right-10 w-16 h-16 bg-orange-600 text-white rounded-full flex items-center justify-center shadow-2xl shadow-orange-600/40 z-50"
        >
          <Plus size={32} />
        </motion.button>
      </div>

      {/* Modal Créer Dossier */}
      {showCreateFolder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-3xl max-w-md w-full p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black text-[#002366]">Créer un dossier</h3>
              <button onClick={() => setShowCreateFolder(false)} className="p-1 hover:bg-slate-100 rounded-full"><X size={20} /></button>
            </div>
            <input
              type="text"
              placeholder="Nom du dossier"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002366] mb-4"
              autoFocus
            />
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase mb-1">Filière *</label>
                <select value={selectedFiliere} onChange={(e) => setSelectedFiliere(e.target.value)} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002366]">
                  <option value="">Sélectionner une filière</option>
                  {filieres.map(f => <option key={f.id} value={f.id}>{f.nom}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase mb-1">Classe *</label>
                <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} disabled={!selectedFiliere} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002366] disabled:opacity-50">
                  <option value="">Sélectionner une classe</option>
                  {classes.map(c => <option key={c.id} value={c.id}>{c.nom}</option>)}
                </select>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={createFolder} className="flex-1 bg-[#002366] text-white py-3 rounded-xl font-bold">Créer</button>
              <button onClick={() => setShowCreateFolder(false)} className="flex-1 bg-slate-100 text-slate-600 py-3 rounded-xl font-bold">Annuler</button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Modal Upload Fichier */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-3xl max-w-lg w-full p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black text-[#002366]">Ajouter un fichier</h3>
              <button onClick={() => setShowUploadModal(false)} className="p-1 hover:bg-slate-100 rounded-full"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-black text-slate-500 uppercase mb-1">Titre</label>
                <input type="text" placeholder="Titre du fichier" value={fileTitle} onChange={(e) => setFileTitle(e.target.value)} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002366]" />
              </div>
              <div>
                <label className="block text-xs font-black text-slate-500 uppercase mb-1">Type</label>
                <select value={fileType} onChange={(e) => setFileType(e.target.value)} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002366]">
                  <option value="pdf">PDF / Document</option>
                  <option value="video">Vidéo</option>
                  <option value="link">Lien externe</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase mb-1">Filière *</label>
                  <select value={selectedFiliere} onChange={(e) => setSelectedFiliere(e.target.value)} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002366]">
                    <option value="">Sélectionner</option>
                    {filieres.map(f => <option key={f.id} value={f.id}>{f.nom}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase mb-1">Classe *</label>
                  <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} disabled={!selectedFiliere} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002366] disabled:opacity-50">
                    <option value="">Sélectionner</option>
                    {classes.map(c => <option key={c.id} value={c.id}>{c.nom}</option>)}
                  </select>
                </div>
              </div>
              {fileType === 'link' ? (
                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase mb-1">Lien URL</label>
                  <input type="url" placeholder="https://..." value={fileLink} onChange={(e) => setFileLink(e.target.value)} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002366]" />
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase mb-1">Fichier</label>
                  <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:border-[#002366] transition-colors">
                    <input type="file" accept={fileType === 'pdf' ? '.pdf,.doc,.docx,.ppt,.pptx' : 'video/*'} onChange={(e) => setSelectedFile(e.target.files[0])} className="hidden" id="file-input" />
                    <label htmlFor="file-input" className="cursor-pointer">
                      <Upload size={32} className="mx-auto text-slate-400 mb-2" />
                      <p className="text-sm text-slate-500">{selectedFile ? selectedFile.name : 'Cliquez pour sélectionner un fichier'}</p>
                    </label>
                  </div>
                </div>
              )}
            </div>
            <div className="flex gap-3 mt-8">
              <button onClick={uploadFile} className="flex-1 bg-[#002366] text-white py-3 rounded-xl font-bold">Ajouter</button>
              <button onClick={() => setShowUploadModal(false)} className="flex-1 bg-slate-100 text-slate-600 py-3 rounded-xl font-bold">Annuler</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

// --- SUB COMPONENTS IMPLEMENTATIONS ---

const StatCard = ({ icon, label, value, sub, color }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
    <div className={`p-3 rounded-xl ${color === 'blue' ? 'bg-blue-50 text-blue-600' : color === 'orange' ? 'bg-orange-50 text-orange-600' : color === 'green' ? 'bg-emerald-50 text-emerald-600' : 'bg-purple-50 text-purple-600'}`}>
      {icon}
    </div>
    <div>
      <p className="text-xs font-bold text-slate-400 uppercase">{label}</p>
      <h3 className="text-xl font-black text-[#002366]">{value}</h3>
      <p className="text-xs text-slate-400">{sub}</p>
    </div>
  </div>
);

const FolderCard = ({ name, files, date, isPrivate, onOpen, onDelete }) => (
  <motion.div 
    variants={{ hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1 } }}
    className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group relative cursor-pointer"
    onClick={onOpen}
  >
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 bg-blue-50 text-[#002366] rounded-xl">
        <Folder size={24} fill="#002366" className="opacity-80" />
      </div>
      <div className="flex items-center gap-2">
        {isPrivate ? <Lock size={14} className="text-slate-400" /> : <Globe size={14} className="text-emerald-500" />}
        <button 
          onClick={(e) => { e.stopPropagation(); onDelete(); }} 
          className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
    <h3 className="font-black text-[#002366] text-base mb-1 truncate">{name}</h3>
    <p className="text-xs text-slate-400 font-bold">{files || 0} Fichiers • {date}</p>
  </motion.div>
);

const getFileIcon = (type) => {
  if (type === 'video') return <Video size={18} className="text-emerald-600" />;
  if (type === 'link') return <Link size={18} className="text-purple-600" />;
  return <FileText size={18} className="text-orange-600" />;
};

const FileRow = ({ name, type, size, time, onDelete }) => (
  <tr className="hover:bg-slate-50/50 transition-colors group">
    <td className="px-8 py-4 font-bold text-[#002366] text-sm flex items-center gap-3">
      {getFileIcon(type)}
      <span className="truncate max-w-xs">{name}</span>
    </td>
    <td className="px-8 py-4 text-xs font-black text-slate-400 uppercase tracking-wider text-center">{type}</td>
    <td className="px-8 py-4 text-xs font-bold text-slate-500">{size}</td>
    <td className="px-8 py-4 text-xs font-bold text-slate-400">{time}</td>
    <td className="px-8 py-4 text-right">
      <button onClick={onDelete} className="text-slate-300 hover:text-red-500 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Trash2 size={16} />
      </button>
    </td>
  </tr>
);

const FileCard = ({ name, type, size, date, onDelete }) => (
  <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between">
    <div className="flex justify-between items-start mb-6">
      <div className={`p-3 rounded-xl ${type === 'video' ? 'bg-emerald-50' : type === 'link' ? 'bg-purple-50' : 'bg-orange-50'}`}>
        {getFileIcon(type)}
      </div>
      <button onClick={onDelete} className="text-slate-300 hover:text-red-500 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Trash2 size={16} />
      </button>
    </div>
    <div>
      <h4 className="font-black text-[#002366] text-sm mb-1 truncate">{name}</h4>
      <div className="flex justify-between items-center mt-2 text-[11px] text-slate-400 font-bold">
        <span>{size}</span>
        <span>{date}</span>
      </div>
    </div>
  </div>
);

export default PageRessources;

