import React from 'react';
import { Menu } from 'lucide-react';
import { Link } from 'react-router-dom'; // Khass darori had l-import

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-[100] bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 md:px-16 py-3 flex items-center justify-between">
      <div className="flex items-center gap-4 group cursor-pointer">
        <Menu className="md:hidden text-[#002366]" size={24} />
        
        {/* Logo Link dyal Home */}
        <Link to="/" className="flex items-center gap-4">
          <div className="relative w-16 h-16 p-1 bg-white rounded-xl border border-slate-50 shadow-sm transition-transform hover:scale-105">
             <img 
               src="/logoo.jpeg" 
               alt="Logo Amity" 
               className="w-full h-full object-contain mix-blend-multiply" 
             />
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-[#002366] font-black text-xl tracking-tight uppercase leading-none">Amity International school</span>
            <span className="text-[#F48120] text-[10px] font-bold tracking-[0.2em] uppercase">Tanger, Maroc</span>
          </div>
        </Link>
      </div>
      
      <div className="hidden md:flex gap-10 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
        <Link to="/" className="hover:text-[#002366] transition-colors duration-300">Accueil</Link>
        
        {/* Had l-link hwa li ghadi ydik l-page About */}
        <Link to="/about" className="hover:text-[#F48120] transition-colors duration-300">À Propos</Link>
        
        <Link to="/academique" className="hover:text-[#F48120] transition-colors duration-300">Académique</Link>
        <Link to="/contact1" className="hover:text-[#F48120] transition-colors duration-300">Contact </Link>
      </div>

      <div className="flex gap-4">
        <Link to="/login" className="px-6 py-2 text-[11px] font-black uppercase bg-[#F48120] text-white rounded-md shadow-md hover:bg-orange-600 transition-all text-center">Connexion</Link>
        
      </div>
    </nav>
  );
};

export default Navbar;