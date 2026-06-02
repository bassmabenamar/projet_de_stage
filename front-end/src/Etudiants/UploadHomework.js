import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Upload, File, X, CheckCircle, Loader2 } from 'lucide-react';
import Navbar from './Navbar';
import api from './api';

const UploadHomework = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Vérifier la taille (max 10MB)
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError('Le fichier est trop volumineux (max 10MB)');
        setFile(null);
        return;
      }
      setError('');
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Veuillez sélectionner un fichier');
      return;
    }

    setUploading(true);
    setError('');
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('devoir_id', id);

    try {
      const token = localStorage.getItem('token');
      console.log('Uploading file:', file.name);
      console.log('Devoir ID:', id);
      
      const response = await api.post('/student/homework/upload', formData, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
      
      console.log('Upload success:', response.data);
      setSuccess(true);
      setTimeout(() => navigate('/homework'), 2000);
    } catch (error) {
      console.error('Upload error:', error);
      console.error('Response:', error.response?.data);
      
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else if (error.response?.data?.errors) {
        const errors = Object.values(error.response.data.errors).flat();
        setError(errors.join(', '));
      } else {
        setError('Erreur lors du téléversement. Veuillez réessayer.');
      }
    } finally {
      setUploading(false);
    }
  };

  const getFileIcon = () => {
    if (!file) return <Upload size={48} className="text-slate-300 mb-4" />;
    const ext = file.name.split('.').pop().toLowerCase();
    if (ext === 'pdf') return <File size={48} className="text-red-500 mb-4" />;
    return <File size={48} className="text-blue-500 mb-4" />;
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <main className="flex-1">
        <Navbar />
        <div className="p-10 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[32px] p-8 shadow-xl"
          >
            <h1 className="text-2xl font-black text-[#002366] mb-2">
              Téléverser votre devoir
            </h1>
            <p className="text-slate-400 mb-8">Devoir #{id}</p>

            {!success ? (
              <>
                {/* Zone de drop/file */}
                <div className={`border-2 border-dashed rounded-2xl p-8 text-center mb-6 transition-all ${
                  error ? 'border-red-300 bg-red-50/30' : 'border-slate-200 hover:border-[#002366]'
                }`}>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                    accept=".pdf,.doc,.docx,.zip,.jpg,.png"
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    {getFileIcon()}
                    <span className="text-[#002366] font-bold text-lg">
                      {file ? file.name : 'Cliquez pour sélectionner un fichier'}
                    </span>
                    <span className="text-slate-400 text-sm mt-2">
                      PDF, DOC, DOCX, ZIP, JPG, PNG (Max 10MB)
                    </span>
                  </label>
                </div>

                {/* Message d'erreur */}
                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                    <X size={16} className="inline mr-2" />
                    {error}
                  </div>
                )}

                {/* Boutons */}
                <div className="flex gap-4">
                  <button
                    onClick={() => navigate('/homework')}
                    className="flex-1 py-3 rounded-xl bg-slate-100 text-slate-500 font-black hover:bg-slate-200 transition-all"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleUpload}
                    disabled={!file || uploading}
                    className="flex-1 py-3 rounded-xl bg-[#002366] text-white font-black hover:bg-orange-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {uploading ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Téléversement...
                      </>
                    ) : (
                      'Envoyer'
                    )}
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={48} className="text-green-500" />
                </div>
                <h2 className="text-2xl font-black text-green-600">Devoir envoyé !</h2>
                <p className="text-slate-400 mt-2">Redirection vers la liste des devoirs...</p>
                <div className="mt-6 w-12 h-12 border-4 border-[#002366] border-t-transparent rounded-full animate-spin mx-auto" />
              </div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default UploadHomework;