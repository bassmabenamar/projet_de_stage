import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, FileText, AlertCircle, Loader,Star } from 'lucide-react';
import api from './api';

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBookAndPDF();
  }, [id]);

  const fetchBookAndPDF = async () => {
    try {
      setLoading(true);
      
      // Récupérer les infos du livre
      const response = await api.get(`/student/books/${id}`);
      setBook(response.data?.data);
      
      // Charger le PDF
      const pdfResponse = await api.get(`/student/books/${id}/download`, {
        responseType: 'blob'
      });
      
      const url = URL.createObjectURL(new Blob([pdfResponse.data], { type: 'application/pdf' }));
      setPdfUrl(url);
      
    } catch (err) {
      console.error('Erreur:', err);
      setError(err.response?.data?.message || 'Impossible de charger le livre');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await api.get(`/student/books/${id}/download`, {
        responseType: 'blob'
      });
      
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = book?.file_name || `book_${id}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
    } catch (err) {
      console.error('Erreur téléchargement:', err);
      alert('Erreur lors du téléchargement');
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
        <Loader className="w-12 h-12 animate-spin text-[#002366]" />
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F8FAFC]">
        <div className="text-center max-w-md mx-auto p-6 bg-white rounded-xl shadow-sm">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Erreur</h2>
          <p className="text-gray-600 mb-6">{error || 'Livre non trouvé'}</p>
          <button
            onClick={() => navigate('/library')}
            className="px-6 py-2 bg-[#002366] text-white rounded-lg"
          >
            Retour à la bibliothèque
          </button>
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
            onClick={() => navigate('/library')}
            className="flex items-center gap-2 text-gray-600 hover:text-[#002366]"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Retour</span>
          </button>
          
          <div className="flex gap-3">
            <button
              onClick={openPDF}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <FileText className="w-4 h-4" />
              <span>Ouvrir dans nouvel onglet</span>
            </button>
            
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 bg-[#002366] text-white rounded-lg hover:bg-[#001a4f]"
            >
              <Download className="w-4 h-4" />
              <span>Télécharger</span>
            </button>
          </div>
        </div>
      </div>

      {/* Détails du livre */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Couverture */}
            <div className="md:w-1/3">
              <div className="bg-gradient-to-br from-[#002366] to-[#0044aa] rounded-2xl p-8 text-white text-center">
                <FileText className="w-20 h-20 mx-auto mb-4" />
                <h3 className="text-xl font-bold">{book.title}</h3>
                <p className="text-sm opacity-80 mt-2">{book.author}</p>
                <div className="flex items-center justify-center gap-1 mt-4 text-yellow-400">
                  <Star size={16} fill="currentColor" />
                  <span>{book.rating || 4.5}/5</span>
                </div>
              </div>
            </div>
            
            {/* Infos */}
            <div className="md:w-2/3">
              <h1 className="text-3xl font-black text-[#002366] mb-2">{book.title}</h1>
              <p className="text-gray-600 mb-4">par {book.author}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-500">Type</p>
                  <p className="font-semibold">{book.type || 'PDF'}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-500">Pages</p>
                  <p className="font-semibold">{book.pages || 'N/A'}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-500">Année</p>
                  <p className="font-semibold">{book.year || '2024'}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-500">Téléchargements</p>
                  <p className="font-semibold">{book.downloads || 0}</p>
                </div>
              </div>
              
              {book.description && (
                <div className="mb-6">
                  <h3 className="font-bold mb-2">Description</h3>
                  <p className="text-gray-600">{book.description}</p>
                </div>
              )}
              
              <div className="flex gap-4">
                <button
                  onClick={openPDF}
                  className="flex-1 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700"
                >
                  📖 Lire maintenant
                </button>
                <button
                  onClick={handleDownload}
                  className="flex-1 py-3 bg-[#002366] text-white rounded-xl font-bold hover:bg-[#001a4f]"
                >
                  💾 Télécharger PDF
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Aperçu PDF */}
        {pdfUrl && (
          <div className="mt-8 bg-white rounded-2xl shadow-sm p-4">
            <h2 className="text-xl font-bold mb-4">Aperçu</h2>
            <iframe
              src={pdfUrl}
              className="w-full h-[600px] rounded-lg border"
              title="PDF Preview"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BookDetails;