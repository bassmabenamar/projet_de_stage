import React, { useState } from "react";
import { motion } from 'framer-motion';
import { LogOut, User, Search, Bell, HelpCircle } from "lucide-react";

const springTransition = { type: "spring", stiffness: 300, damping: 24 };

export  default function Nabar() {
  const [isOpen, setIsOpen] = useState(false);
  
  // Données statiques pour l'UI (test b 7alat mkhalfa)
  const user = {
    firstName: "Alex",
    lastName: "Johnson",
    username: "alex",
    role: "student",
    photoUrl: null, // Changer à null bach tchof l'initials
    id: "AM-2021"
  };

  // Fonction pour générer les initials
  const getInitials = () => {
    const firstInitial = user.firstName?.[0] || "";
    const lastInitial = user.lastName?.[0] || "";
    if (firstInitial || lastInitial) {
      return `${firstInitial}${lastInitial}`.toUpperCase();
    }
    return user.username?.[0]?.toUpperCase() || "U";
  };

  const initials = getInitials();

  const handleLogout = () => {
    console.log("Déconnexion");
    setIsOpen(false);
  };

  const handleProfile = () => {
    console.log("Profil");
    setIsOpen(false);
  };

  return (
    <motion.header initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
      transition={springTransition} className="bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-3 flex items-center justify-between sticky top-0 z-30">
      {/* Search Bar - Amity Style */}
      <div className="relative w-[450px]">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
        <input type="text" placeholder="Search ..." className="w-full bg-slate-50 border border-transparent rounded-xl py-3 pl-12 pr-4 text-sm focus:bg-white focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all outline-none"/>
      </div>
      
      {/* Right Actions */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4 text-slate-400">
          <motion.div whileHover={{ scale: 1.2, rotate: 15 }} className="cursor-pointer relative">
            <Bell size={22} />
            <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
          </motion.div>
          <motion.div whileHover={{ scale: 1.2, rotate: -15 }} className="cursor-pointer">
            <HelpCircle size={22} />
          </motion.div>
        </div>

        {/* User Profile Info with Dropdown */}
        <div className="flex items-center gap-3 border-l pl-6">
          <div className="text-right">
            <p className="text-sm font-black text-[#002366]">{user.firstName} {user.lastName}</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
              Administrateur
            </p>
          </div>
          
          {/* Dropdown Menu basique */}
          <div className="relative">
            {/* Trigger Button - Condition pour image wla initials */}
            <motion.button whileHover={{ scale: 1.1, rotate: 5 }}
              onClick={() => setIsOpen(!isOpen)} className="relative focus:outline-none">
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

            {/* Dropdown Content */}
            {isOpen && (
              <div>
                {/* Backdrop pour fermer en cliquant dehors */}
                <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />      
                <div className="absolute right-0 mt-2 w-56 z-50 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    {/* Label avec image ou initials */}
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
                        <p className="text-xs leading-none text-gray-500">
                          Administrateur
                        </p>
                      </div>
                    </div>
                    
                    {/* Separator */}
                    <div className="h-px bg-gray-200 my-1" />
                    
                    {/* Profile Item */}
                    <button onClick={handleProfile} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2 transition-colors">
                      <User className="h-4 w-4" />
                      <span>Profil</span>
                    </button>
                    
                    {/* Logout Item */}
                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2 transition-colors">
                      <LogOut className="h-4 w-4" />
                      <span>Déconnexion</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
}