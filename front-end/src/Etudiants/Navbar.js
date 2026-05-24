import { useNavigate, useLocation } from "react-router-dom";
import React, { useState } from "react";
import { motion } from 'framer-motion';
import { LogOut, User, Search, Bell, HelpCircle } from "lucide-react";

const springTransition = { type: "spring", stiffness: 300, damping: 24 };

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Vérifier si l'utilisateur est connecté
  const isAuthenticated = localStorage.getItem('token') !== null;

  // Jibi user mn localStorage
  const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
  const user = {
    firstName: storedUser.prenom || 'User',
    lastName:  storedUser.nom   || '',
    role:      storedUser.role  || 'etudiant',
    photoUrl:  storedUser.photo || null,
  };

  const getInitials = () => {
    const f = user.firstName?.[0] || '';
    const l = user.lastName?.[0]  || '';
    return `${f}${l}`.toUpperCase() || 'U';
  };

  const initials = getInitials();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      await fetch('http://127.0.0.1:8000/api/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        }
      });
    } catch (e) {
      console.error(e);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login');
      setIsOpen(false);
    }
  };

  const handleProfile = () => {
    if (isAuthenticated) {
      navigate('/profile');
    } else {
      navigate('/login');
    }
    setIsOpen(false);
  };

  const handleNotifications = () => {
    if (isAuthenticated) {
      navigate('/notifications');
    } else {
      navigate('/login');
    }
  };

  const handleHelp = () => {
    if (isAuthenticated) {
      navigate('/support');
    } else {
      navigate('/contact');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <motion.header 
      initial={{ y: -30, opacity: 0 }} 
      animate={{ y: 0, opacity: 1 }}
      transition={springTransition} 
      className="bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-3 flex items-center justify-between sticky top-0 z-30"
    >
      {/* Espace vide à gauche pour équilibre */}
      <div className="w-12"></div>

      {/* Search Bar - longue et flexible */}
      {isAuthenticated && (
        <form onSubmit={handleSearch} className="relative flex-1 max-w-2xl mx-4 md:mx-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher un cours, un devoir, une activité..." 
            className="w-full bg-slate-50 border border-transparent rounded-xl py-3 pl-12 pr-4 text-sm focus:bg-white focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all outline-none"
          />
        </form>
      )}
      
      {/* Right Actions */}
      <div className="flex items-center gap-6 flex-shrink-0">
        <div className="flex items-center gap-4 text-slate-400">
          <motion.div 
            whileHover={{ scale: 1.2, rotate: 15 }} 
            className="cursor-pointer relative"
            onClick={handleNotifications}
          >
            <Bell size={22} />
            {isAuthenticated && (
              <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            )}
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.2, rotate: -15 }} 
            className="cursor-pointer"
            onClick={handleHelp}
          >
            <HelpCircle size={22} />
          </motion.div>
        </div>

        {/* User Profile - seulement si connecté */}
        {isAuthenticated ? (
          <div className="flex items-center gap-3 border-l pl-6">
            <div className="text-right hidden md:block">
              <p className="text-sm font-black text-[#002366]">{user.firstName} {user.lastName}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                {user.role}
              </p>
            </div>
            
            <div className="relative">
              <motion.button 
                whileHover={{ scale: 1.1, rotate: 5 }}
                onClick={() => setIsOpen(!isOpen)} 
                className="relative focus:outline-none"
              >
                {user.photoUrl ? (
                  <img 
                    src={user.photoUrl} 
                    className="w-10 h-10 rounded-xl border-2 border-white shadow-sm cursor-pointer object-cover" 
                    alt={`${user.firstName} ${user.lastName}`} 
                  />
                ) : (
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2F5D9F] to-[#E55B2D] flex items-center justify-center text-white font-semibold text-sm border-2 border-white shadow-sm cursor-pointer">
                    {initials}
                  </div>
                )}
              </motion.button>

              {isOpen && (
                <div>
                  <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />      
                  <div className="absolute right-0 mt-2 w-56 z-50 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      <div className="px-4 py-3 border-b flex items-center gap-3">
                        {user.photoUrl ? (
                          <img 
                            src={user.photoUrl} 
                            className="w-10 h-10 rounded-xl object-cover" 
                            alt={`${user.firstName} ${user.lastName}`} 
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2F5D9F] to-[#E55B2D] flex items-center justify-center text-white font-semibold text-sm">
                            {initials}
                          </div>
                        )}
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none text-gray-900">{user.firstName} {user.lastName}</p>
                          <p className="text-xs leading-none text-gray-500">{user.role}</p>
                        </div>
                      </div>
                      
                      <div className="h-px bg-gray-200 my-1" />
                      
                      <button 
                        onClick={handleProfile} 
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2 transition-colors"
                      >
                        <User className="h-4 w-4" />
                        <span>Profil</span>
                      </button>
                      
                      <button 
                        onClick={handleLogout} 
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Déconnexion</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Boutons pour utilisateur non connecté */
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/login')}
              className="px-4 py-2 text-sm font-bold text-[#002366] hover:text-[#E55B2D] transition-colors"
            >
              Connexion
            </button>
            <button 
              onClick={() => navigate('/login')}
              className="px-5 py-2 bg-[#002366] text-white rounded-lg text-sm font-bold hover:bg-[#E55B2D] transition-colors"
            >
              Inscription
            </button>
          </div>
        )}
      </div>
    </motion.header>
  );
}