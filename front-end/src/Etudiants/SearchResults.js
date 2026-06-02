import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search, BookOpen, FileText, Calendar, User } from 'lucide-react';
import Navbar from './Navbar';
import api from './api';

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const query = new URLSearchParams(location.search).get('q') || '';

  useEffect(() => {
    if (query) {
      performSearch();
    }
  }, [query]);

  const performSearch = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/student/search?q=${query}`);
      setResults(response.data?.data || []);
    } catch (error) {
      console.error("Erreur recherche:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <main className="flex-1 flex flex-col overflow-auto">
        <Navbar />
        
        <div className="p-4 md:p-8 max-w-4xl mx-auto">
          <h1 className="text-2xl font-black text-[#002366] mb-2">
            Résultats de recherche
          </h1>
          <p className="text-slate-400 mb-8">
            {loading ? 'Recherche en cours...' : `${results.length} résultat(s) pour "${query}"`}
          </p>

          {loading ? (
            <div className="text-center py-20">
              <div className="w-12 h-12 border-4 border-[#002366] border-t-transparent rounded-full animate-spin mx-auto" />
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl">
              <Search size={48} className="mx-auto text-slate-200 mb-4" />
              <p className="text-slate-400">Aucun résultat trouvé</p>
            </div>
          ) : (
            <div className="space-y-4">
              {results.map((result, idx) => (
                <div
                  key={idx}
                  onClick={() => navigate(result.link)}
                  className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm cursor-pointer hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-2 mb-2">
                    {result.type === 'homework' && <FileText size={16} className="text-orange-500" />}
                    {result.type === 'grades' && <BookOpen size={16} className="text-blue-500" />}
                    {result.type === 'timetable' && <Calendar size={16} className="text-green-500" />}
                    {result.type === 'profile' && <User size={16} className="text-purple-500" />}
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      {result.type}
                    </span>
                  </div>
                  <h3 className="font-black text-[#002366] mb-2">{result.title}</h3>
                  <p className="text-slate-500 text-sm">{result.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default SearchResults;