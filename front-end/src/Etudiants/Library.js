import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, BookOpen, Download, Eye, Star, 
  Filter, X, ChevronRight, TrendingUp, 
  Clock, Users, ArrowRight, Loader2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import api from './api';

const Library = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);
  const [downloadingId, setDownloadingId] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    filterBooks();
  }, [books, searchTerm, selectedCategory]);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await api.get('/student/books');
      const booksData = response.data?.data || [];
      setBooks(booksData);
      setFilteredBooks(booksData);
      
      const uniqueCategories = [...new Set(booksData.map(book => book.category).filter(Boolean))];
      setCategories(uniqueCategories);
      
      setLoading(false);
    } catch (error) {
      console.error('Erreur chargement livres:', error);
      setBooks([]);
      setFilteredBooks([]);
      setLoading(false);
    }
  };

  const filterBooks = () => {
    let filtered = [...books];
    
    if (searchTerm.trim()) {
      filtered = filtered.filter(book => 
        book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(book => book.category === selectedCategory);
    }
    
    setFilteredBooks(filtered);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSelectedCategory('all');
  };

  const handleBookClick = (id) => {
    navigate(`/library/${id}`);
  };

  const handleDownload = async (e, book) => {
    e.stopPropagation();
    setDownloadingId(book.id);
    try {
      const response = await api.get(`/student/books/${book.id}/download`, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.download = book.file_name || `${book.title}.pdf`;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors du téléchargement');
    } finally {
      setDownloadingId(null);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC]">
        <Loader2 size={48} className="text-[#002366] animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <main className="flex-1 overflow-y-auto pb-20">
        <Navbar />

        <div className="p-6 md:p-10 max-w-[1400px] mx-auto">
          
          {/* Header */}
          <motion.div variants={cardVariants} className="mb-10">
            <h1 className="text-3xl md:text-[42px] font-black text-[#002366] tracking-tight">
              Bibliothèque Numérique
            </h1>
            <p className="text-slate-400 font-bold mt-2">
              Découvrez notre collection de livres et ressources éducatives
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div variants={cardVariants} className="mb-8">
            <div className="relative max-w-2xl">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
              <input 
                type="text"
                placeholder="Rechercher par titre, auteur ou description..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full pl-14 pr-12 py-5 bg-white border border-slate-100 rounded-[28px] text-sm font-bold text-[#002366] placeholder:text-slate-300 outline-none focus:ring-2 focus:ring-blue-100 shadow-sm"
              />
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-red-500 transition-colors"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </motion.div>

          {/* Categories Filter */}
          <motion.div variants={cardVariants} className="flex flex-wrap gap-3 mb-10">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                selectedCategory === 'all'
                  ? 'bg-[#002366] text-white shadow-lg'
                  : 'bg-white text-slate-400 hover:text-[#002366] border border-slate-100'
              }`}
            >
              Tous
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#002366] text-white shadow-lg'
                    : 'bg-white text-slate-400 hover:text-[#002366] border border-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Results Count */}
          <motion.div variants={cardVariants} className="mb-6">
            <p className="text-slate-400 text-sm font-bold">
              {filteredBooks.length} livre(s) trouvé(s)
            </p>
          </motion.div>

          {/* Books Grid */}
          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredBooks.map((book) => (
              <BookCard 
                key={book.id}
                id={book.id}
                title={book.title}
                author={book.author}
                category={book.category}
                rating={book.rating}
                downloads={book.downloads}
                year={book.year}
                image={book.image}
                onDownload={(e) => handleDownload(e, book)}
                onClick={() => handleBookClick(book.id)}
                isDownloading={downloadingId === book.id}
              />
            ))}
          </motion.div>

          {filteredBooks.length === 0 && (
            <motion.div variants={cardVariants} className="text-center py-20 bg-white rounded-[40px]">
              <BookOpen size={64} className="text-slate-200 mx-auto mb-4" />
              <p className="text-slate-400 font-bold text-lg">Aucun livre trouvé</p>
              <p className="text-slate-300 text-sm mt-2">
                Essayez de modifier votre recherche ou vos filtres
              </p>
              <button
                onClick={clearSearch}
                className="mt-6 px-6 py-3 bg-[#002366] text-white rounded-xl font-bold text-sm"
              >
                Effacer les filtres
              </button>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

const BookCard = ({ id, title, author, category, rating, downloads, year, image, onDownload, onClick, isDownloading }) => {
  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all cursor-pointer group"
    >
      <div onClick={onClick} className="relative h-48 bg-gradient-to-br from-[#002366] to-[#0044aa] flex items-center justify-center">
        <BookOpen size={48} className="text-white/30 group-hover:scale-110 transition-transform duration-300" />
        <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-lg text-[9px] font-black text-white">
          {category || 'Général'}
        </div>
        <button
          onClick={onDownload}
          disabled={isDownloading}
          className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm p-2 rounded-full text-[#002366] hover:bg-[#002366] hover:text-white transition-all shadow-md disabled:opacity-50"
          title="Télécharger PDF"
        >
          {isDownloading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Download size={16} />
          )}
        </button>
      </div>
      
      <div className="p-5">
        <h3 className="text-lg font-black text-[#002366] mb-1 line-clamp-1 group-hover:text-orange-600 transition-colors">
          {title}
        </h3>
        <p className="text-xs text-slate-400 font-bold mb-3">{author}</p>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1">
            <Star size={14} className="text-yellow-400 fill-yellow-400" />
            <span className="text-xs font-bold text-slate-600">{rating || 4.5}</span>
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <Download size={12} />
            <span className="text-[10px] font-bold">{downloads || 0}</span>
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <Clock size={12} />
            <span className="text-[10px] font-bold">{year || '2024'}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-3 border-t border-slate-50">
          <span className="text-[9px] font-black text-[#002366] uppercase tracking-widest">
            PDF disponible
          </span>
          <button onClick={onClick} className="text-orange-500 group-hover:translate-x-1 transition-transform">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Library;