import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, FileText, AlertCircle, Loader } from 'lucide-react';
import api from './api';

const HomeworkDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pdfUrl, setPdfUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadPDF();
  }, [id]);

  const loadPDF = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Récupérer le devoir d'abord
      const response = await api.get('/student/homeworks');
      const homeworks = response.data?.data || [];
      const found = homeworks.find(h => h.id === parseInt(id));
      
      if (!found) {
        setError('Devoir non trouvé');
        setLoading(false);
        return;
      }
      
      const filePath = found.file_path || found.pdf_path;
      
      if (!filePath) {
        setError('Aucun PDF disponible pour ce devoir');
        setLoading(false);
        return;
      }
      
      // URL directe vers storage
      const url = `http://127.0.0.1:8000/storage/${filePath}`;
      setPdfUrl(url);
      
      setLoading(false);
    } catch (err) {
      console.error('Erreur:', err);
      setError('Impossible de charger le devoir');
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (pdfUrl) {
      window.open(pdfUrl, '_blank');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F8FAFC]">
        <Loader className="w-12 h-12 animate-spin text-[#002366]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F8FAFC]">
        <div className="text-center max-w-md mx-auto p-6 bg-white rounded-xl shadow-sm">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Erreur</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate('/homework')}
            className="px-5 py-2 bg-[#002366] text-white rounded-lg hover:bg-[#1e3a8a] transition"
          >
            Retour
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <button
            onClick={() => navigate('/homework')}
            className="flex items-center gap-2 text-gray-600 hover:text-[#002366] transition"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Retour</span>
          </button>

          {pdfUrl && (
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 bg-[#002366] text-white rounded-lg hover:bg-[#1e3a8a] transition"
            >
              <Download className="w-4 h-4" />
              Télécharger PDF
            </button>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {pdfUrl && (
          <div className="bg-white rounded-2xl shadow-sm p-4">
            <iframe
              src={pdfUrl}
              className="w-full h-[700px] rounded-lg border"
              title="Aperçu PDF"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeworkDetails;