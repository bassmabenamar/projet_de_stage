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

      const response = await api.get(`/student/student/homework/${id}/download-pdf`, {
        responseType: 'blob'
      });

      const url = URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
      setPdfUrl(url);

    } catch (err) {
      console.error('Erreur chargement PDF:', err);
      if (err.response?.status === 404) {
        setError('Aucun PDF disponible pour ce devoir.');
      } else if (err.response?.status === 401) {
        setError('Session expirée. Veuillez vous reconnecter.');
      } else {
        setError('Impossible de charger le PDF. Veuillez réessayer.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await api.get(`/student/student/homework/${id}/download-pdf`, {
        responseType: 'blob'
      });
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `devoir_${id}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Erreur téléchargement:', err);
    }
  };

  const openPDF = () => {
    if (pdfUrl) {
      window.open(pdfUrl, '_blank');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F8FAFC]">
        <Loader className="w-12 h-12 animate-spin text-blue-600" />
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
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => navigate('/homework')}
              className="px-5 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition"
            >
              Retour
            </button>
            <button
              onClick={loadPDF}
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Réessayer
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">

      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <button
            onClick={() => navigate('/homework')}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-700 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Retour</span>
          </button>

          <div className="flex gap-3">
            <button
              onClick={openPDF}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Ouvrir dans nouvel onglet</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Télécharger</span>
            </button>
          </div>
        </div>
      </div>

      {/* PDF iframe */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {pdfUrl && (
          <div className="bg-white rounded-2xl shadow-sm p-4">
            <h2 className="text-xl font-bold mb-4">Aperçu du devoir</h2>
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
