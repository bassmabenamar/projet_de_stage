import React from 'react';
import { Share2, Send, Link2, ArrowRight, Globe, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#002366] pt-24 pb-12 text-white px-6 md:px-20 mt-20">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-16 border-b border-white/10 pb-20 mb-12">

        {/* Col 1 — Logo + infos */}
        <div className="col-span-1 space-y-8">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-white p-2 rounded-2xl shadow-2xl shadow-black/20 flex items-center justify-center overflow-hidden">
              <img src="/logoo.jpeg" alt="Logo Amity Footer" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black italic tracking-tighter uppercase leading-none">Amity</span>
              <span className="text-[#F48120] text-xs font-bold tracking-widest uppercase">International School</span>
            </div>
          </div>

          <p className="text-blue-100/60 text-sm leading-relaxed">
            Leader dans la transformation numérique de l'éducation. Former la prochaine génération de leaders depuis Tanger, vers le monde entier.
          </p>

          {/* Contact info */}
          <div className="space-y-3">
            <a href="tel:+212539944481" className="flex items-center gap-3 text-blue-100/60 text-xs font-bold hover:text-[#F48120] transition-colors group">
              <Phone size={13} className="text-[#F48120] shrink-0" />
              +212 539 94 44 81
            </a>
            <a href="tel:+212665482725" className="flex items-center gap-3 text-blue-100/60 text-xs font-bold hover:text-[#F48120] transition-colors group">
              <Phone size={13} className="text-[#F48120] shrink-0" />
              +212 665 48 27 25
            </a>
            <a href="mailto:Amityschool2024@gmail.com" className="flex items-center gap-3 text-blue-100/60 text-xs font-bold hover:text-[#F48120] transition-colors group">
              <Mail size={13} className="text-[#F48120] shrink-0" />
              Amityschool2024@gmail.com
            </a>
            <div className="flex items-start gap-3 text-blue-100/60 text-xs font-bold">
              <MapPin size={13} className="text-[#F48120] shrink-0 mt-0.5" />
              <span>03, rue Ibn Achir, quartier Nzaha Souryenne, Tanger</span>
            </div>
          </div>

          <div className="flex gap-5">
            <Share2 size={20} className="text-blue-200/40 hover:text-[#F48120] cursor-pointer transition-all" />
            <Send size={20} className="text-blue-200/40 hover:text-[#F48120] cursor-pointer transition-all" />
            <Link2 size={20} className="text-blue-200/40 hover:text-[#F48120] cursor-pointer transition-all" />
          </div>
        </div>

        {/* Col 2 — Liens Rapides */}
        <div className="space-y-8">
          <h4 className="text-[12px] font-black uppercase tracking-[0.3em] text-[#F48120]">Liens Rapides</h4>
          <ul className="space-y-5 text-blue-100/60 text-xs font-bold uppercase tracking-widest">
            <li className="hover:text-white cursor-pointer transition-all hover:translate-x-2"><a href="/">Accueil</a></li>
            <li className="hover:text-white cursor-pointer transition-all hover:translate-x-2"><a href="#about-section">À Propos</a></li>
            <li className="hover:text-white cursor-pointer transition-all hover:translate-x-2"><a href="/academique">Académique</a></li>
            <li className="hover:text-white cursor-pointer transition-all hover:translate-x-2"><a href="/admission">Admission</a></li>
            <li className="hover:text-white cursor-pointer transition-all hover:translate-x-2"><a href="/contact">Contact</a></li>
          </ul>

          {/* Inscriptions badge */}
          <div className="inline-flex items-center gap-2 bg-[#F48120]/10 border border-[#F48120]/20 rounded-xl px-4 py-3">
            <div className="w-2 h-2 bg-[#F48120] rounded-full animate-pulse shrink-0"></div>
            <div>
              <p className="text-[9px] font-black text-[#F48120] uppercase tracking-widest">Inscriptions Ouvertes</p>
              <p className="text-white font-black text-xs">Session 2026 / 2027</p>
            </div>
          </div>
        </div>

        {/* Col 3-4 — Newsletter */}
        <div className="space-y-8 md:col-span-2">
          <h4 className="text-[12px] font-black uppercase tracking-[0.3em] text-[#F48120]">Newsletter</h4>
          <p className="text-blue-100/60 text-sm font-medium">
            Rejoignez la communauté Amity International School pour rester informé des dernières actualités académiques et des événements scolaires.
          </p>
          <div className="relative group max-w-md">
            <input 
              type="email" 
              placeholder="Votre adresse email" 
              className="w-full bg-white/5 border border-white/10 rounded-full py-4 px-6 text-sm outline-none focus:border-[#F48120] transition-all placeholder:text-blue-200/20 text-white" 
            />
            <button className="absolute right-2 top-2 bg-[#F48120] p-3 rounded-full text-white hover:scale-110 active:scale-95 transition-all shadow-lg shadow-orange-600/40">
              <ArrowRight size={18}/>
            </button>
          </div>

          {/* Valeurs */}
          <div className="flex flex-wrap gap-2 pt-2">
            {["Excellence Scolaire", "Innovation & Créativité", "Épanouissement & Valeurs", "Ouverture Internationale"].map(v => (
              <span key={v} className="text-[9px] font-black uppercase tracking-widest bg-white/5 border border-white/10 rounded-full px-3 py-1 text-blue-200/50">
                {v}
              </span>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-blue-200/30 text-[10px] font-bold uppercase tracking-[0.2em]">
        <span>© {new Date().getFullYear()} Amity International School — Tanger, Maroc</span>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white transition-all">Confidentialité</a>
          <a href="#" className="hover:text-white transition-all">Conditions d'Utilisation</a>
          <div className="flex gap-2 items-center"><Globe size={12}/> FR</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
