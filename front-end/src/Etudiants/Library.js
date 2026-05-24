import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, Search, Download, Eye, Star, 
  Clock, User, ChevronRight, Filter, Calendar,
  TrendingUp, Award, FileText, Video, Headphones
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import api from './api';

const Library = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [downloading, setDownloading] = useState(null);
  const [reading, setReading] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await api.get('/student/books');
      setBooks(response.data?.data || []);
      setLoading(false);
    } catch (error) {
      console.error("Erreur chargement livres:", error);
      setLoading(false);
    }
  };

  // Fonction pour télécharger le PDF
  const handleDownload = async (id) => {
    try {
      setDownloading(id);
      
      const response = await api.get(`/student/books/${id}/download`, {
        responseType: 'blob'
      });
      
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `book_${id}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      // Rafraîchir la liste
      fetchBooks();
      
    } catch (error) {
      console.error("Erreur téléchargement:", error);
      alert("Erreur lors du téléchargement");
    } finally {
      setDownloading(null);
    }
  };

  // Fonction pour lire le PDF dans un nouvel onglet
  const handleRead = async (id) => {
    try {
      setReading(id);
      
      const response = await api.get(`/student/books/${id}/download`, {
        responseType: 'blob'
      });
      
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      // Ouvrir dans un nouvel onglet
      window.open(url, '_blank');
      
      // Nettoyer après 2 secondes
      setTimeout(() => URL.revokeObjectURL(url), 2000);
      
    } catch (error) {
      console.error("Erreur lecture:", error);
      alert("Impossible d'ouvrir le PDF");
    } finally {
      setReading(null);
    }
  };

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || book.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.2 } }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  const totalDownloads = books.reduce((sum, book) => sum + (book.downloads || 0), 0);
  const totalViews = books.reduce((sum, book) => sum + (book.views || 0), 0);
  const newBooks = books.filter(book => book.year === '2024').length;

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC]">
        <div className="text-2xl font-black text-[#002366] animate-pulse">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans text-[#1E293B]">
      <main className="flex-1 overflow-y-auto pb-20">
        <Navbar />

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="p-6 md:p-10 max-w-[1400px] mx-auto"
        >
          {/* Header */}
          <motion.div variants={cardVariants} className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
            <div>
              <h1 className="text-3xl md:text-[42px] font-black text-[#002366] tracking-tight leading-none mb-3">
                Bibliothèque Numérique
              </h1>
              <p className="text-slate-400 font-bold text-base">
                Accédez à toutes vos ressources pédagogiques
              </p>
            </div>
            <div className="flex gap-3">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/library/favorites')}
                className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-slate-500 shadow-sm uppercase tracking-widest"
              >
                <Star size={16} /> Mes favoris
              </motion.button>
            </div>
          </motion.div>

          {/* Search Bar */}
          <motion.div variants={cardVariants} className="mb-8">
            <div className="relative max-w-2xl">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
              <input 
                type="text"
                placeholder="Rechercher un livre, un auteur..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-6 py-5 bg-white border border-slate-100 rounded-[28px] text-sm font-bold text-[#002366] placeholder:text-slate-300 outline-none focus:ring-2 focus:ring-blue-100 shadow-sm"
              />
            </div>
          </motion.div>

          {/* Categories */}
          <motion.div variants={cardVariants} className="flex flex-wrap gap-3 mb-10">
            {[
              { id: 'all', label: 'Tous', icon: <BookOpen size={14} /> },
              { id: 'math', label: 'Mathématiques', icon: null },
              { id: 'science', label: 'Sciences', icon: null },
              { id: 'tech', label: 'Informatique', icon: null },
              { id: 'literature', label: 'Littérature', icon: null },
              { id: 'history', label: 'Histoire', icon: null },
              { id: 'language', label: 'Langues', icon: null },
            ].map(cat => (
              <motion.button
                key={cat.id}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeCategory === cat.id
                    ? 'bg-[#002366] text-white shadow-lg'
                    : 'bg-white text-slate-400 hover:text-[#002366] border border-slate-100'
                }`}
              >
                {cat.icon}
                {cat.label}
              </motion.button>
            ))}
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
            <StatBox label="Livres disponibles" value={books.length.toString()} icon={<BookOpen size={20} />} />
            <StatBox label="Téléchargements" value={totalDownloads > 1000 ? `${(totalDownloads/1000).toFixed(1)}K` : totalDownloads.toString()} icon={<Download size={20} />} />
            <StatBox label="Consultations" value={totalViews > 1000 ? `${(totalViews/1000).toFixed(1)}K` : totalViews.toString()} icon={<Eye size={20} />} />
            <StatBox label="Nouveautés" value={newBooks.toString()} icon={<Calendar size={20} />} />
          </div>

          {/* Books Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBooks.map((book) => (
              <BookCard 
                key={book.id} 
                book={book} 
                onDownload={() => handleDownload(book.id)}
                onRead={() => handleRead(book.id)}
                downloading={downloading === book.id}
                reading={reading === book.id}
              />
            ))}
          </div>

          {filteredBooks.length === 0 && (
            <div className="text-center py-20">
              <BookOpen size={64} className="mx-auto text-slate-200 mb-4" />
              <p className="text-slate-400 font-bold">Aucun livre trouvé</p>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
};

const StatBox = ({ label, value, icon }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white rounded-[24px] p-6 border border-slate-100 shadow-sm text-center"
  >
    <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-3 text-[#002366]">
      {icon}
    </div>
    <p className="text-2xl font-black text-[#002366]">{value}</p>
    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">{label}</p>
  </motion.div>
);

const BookCard = ({ book, onDownload, onRead, downloading, reading }) => (
  <motion.div 
    whileHover={{ y: -10, scale: 1.02 }}
    className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden group"
  >
    <div className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="w-12 h-12 bg-[#002366]/10 rounded-2xl flex items-center justify-center text-[#002366]">
          <FileText size={24} />
        </div>
        <div className="flex items-center gap-1 text-orange-400">
          <Star size={14} fill="currentColor" />
          <span className="text-[10px] font-black text-slate-600">{book.rating || 4.5}</span>
        </div>
      </div>
      
      <h3 className="text-lg font-black text-[#002366] mb-2 group-hover:text-orange-500 transition-colors">
        {book.title}
      </h3>
      <p className="text-[10px] text-slate-400 font-bold mb-4">{book.author}</p>
      
      <div className="flex flex-wrap gap-3 mb-4">
        <span className="px-2 py-1 bg-slate-50 rounded-lg text-[8px] font-black text-slate-400 uppercase tracking-widest">
          {book.type || 'PDF'}
        </span>
        <span className="px-2 py-1 bg-slate-50 rounded-lg text-[8px] font-black text-slate-400 uppercase tracking-widest">
          {book.pages} pages
        </span>
        <span className="px-2 py-1 bg-slate-50 rounded-lg text-[8px] font-black text-slate-400 uppercase tracking-widest">
          {book.year}
        </span>
      </div>
      
      <div className="flex items-center justify-between pt-4 border-t border-slate-50">
        <div className="flex items-center gap-1 text-slate-400">
          {downloading ? (
            <div className="w-3 h-3 border-2 border-[#002366] border-t-transparent rounded-full animate-spin" />
          ) : (
            <Download size={12} onClick={onDownload} className="cursor-pointer hover:text-[#002366] transition-colors" />
          )}
          <span className="text-[9px] font-bold">{book.downloads || 0}</span>
        </div>
        
        <button 
          onClick={onRead}
          disabled={reading}
          className="text-[9px] font-black text-[#002366] uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all"
        >
          {reading ? (
            <div className="w-3 h-3 border-2 border-[#002366] border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              Lire <ChevronRight size={12} />
            </>
          )}
        </button>
      </div>
    </div>
  </motion.div>
);

export default Library;