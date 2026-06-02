import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Users, 
  BookOpen, 
  Award, 
  Phone, 
  Quote,
  GraduationCap,
  Globe,
  Mail,
  MapPin
} from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="selection:bg-[#F48120] selection:text-white">
      
      {/* Navbar */}
      <Navbar />

      {/* --- HERO / CONTENU À PROPOS --- */}
      <section className="pt-32 pb-24 px-6 md:px-20 max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
        {/* Collage Layout */}
        <div className="relative grid grid-cols-2 gap-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            viewport={{ once: true }}
            className="rounded-[40px] overflow-hidden h-64 shadow-xl translate-y-10"
          >
            <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600" className="w-full h-full object-cover" alt="Étudiant 1" />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            viewport={{ once: true }}
            transition={{ delay: 0.2 }} 
            className="rounded-full overflow-hidden h-48 w-48 shadow-xl"
          >
            <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=600" className="w-full h-full object-cover" alt="Étudiant 2" />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            viewport={{ once: true }}
            transition={{ delay: 0.4 }} 
            className="col-span-2 rounded-[60px] overflow-hidden h-72 shadow-2xl"
          >
            <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800" className="w-full h-full object-cover" alt="Travail d'équipe" />
          </motion.div>
          
          {/* Badge Flottant — 20+ ans */}
          <div className="absolute top-1/2 -left-10 bg-[#F48120] p-6 rounded-3xl text-white shadow-2xl text-center hidden md:block">
            <p className="text-3xl font-black italic">20+</p>
            <p className="text-[10px] font-bold uppercase tracking-widest">Années d'Excellence</p>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }} 
          whileInView={{ opacity: 1, x: 0 }} 
          viewport={{ once: true }}
          className="space-y-8"
        >
          <span className="text-[12px] font-black text-[#F48120] uppercase tracking-[0.4em]">À Propos de Nous</span>
          <h2 className="text-5xl font-black text-[#002366] leading-tight">Amity International School — Tanger</h2>
          <p className="text-slate-500 leading-relaxed font-medium">Depuis notre campus au cœur de Tanger, Amity International School offre une expérience éducative transformatrice qui nourrit la créativité, la discipline et les compétences prêtes pour l'avenir chez chaque élève.</p>
          
          <div className="grid grid-cols-1 gap-6">
            <div className="flex gap-4 items-start group">
              <div className="p-3 bg-[#F48120]/10 rounded-xl text-[#F48120] group-hover:bg-[#F48120] group-hover:text-white transition-all"><BookOpen size={24}/></div>
              <div>
                <h4 className="font-black text-[#002366] text-lg uppercase">Excellence Scolaire</h4>
                <p className="text-slate-400 text-sm">Programmes académiques de haut niveau et coaching extrascolaire adaptés à chaque élève.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start group">
              <div className="p-3 bg-[#002366]/5 rounded-xl text-[#002366] group-hover:bg-[#002366] group-hover:text-white transition-all"><Globe size={24}/></div>
              <div>
                <h4 className="font-black text-[#002366] text-lg uppercase">Ouverture Internationale</h4>
                <p className="text-slate-400 text-sm">Opportunités de réseautage mondial pour nos futurs diplômés — Innovation & Créativité au cœur de l'enseignement.</p>
              </div>
            </div>
          </div>

          {/* Contact cards */}
          <div className="grid grid-cols-1 gap-3 pt-2">
            <div className="flex items-center gap-3 bg-slate-50 rounded-2xl px-5 py-3">
              <MapPin size={16} className="text-[#F48120] shrink-0" />
              <span className="text-slate-600 text-sm font-medium">03, rue Ibn Achir, quartier Nzaha Souryenne, Tanger</span>
            </div>
            <div className="flex flex-col md:flex-row gap-3">
              <a href="tel:+212539944481" className="flex items-center gap-3 bg-slate-50 rounded-2xl px-5 py-3 flex-1 hover:bg-[#002366]/5 transition-colors">
                <Phone size={16} className="text-[#F48120] shrink-0" />
                <span className="text-slate-600 text-sm font-medium">+212 539 94 44 81</span>
              </a>
              <a href="tel:+212665482725" className="flex items-center gap-3 bg-slate-50 rounded-2xl px-5 py-3 flex-1 hover:bg-[#002366]/5 transition-colors">
                <Phone size={16} className="text-[#F48120] shrink-0" />
                <span className="text-slate-600 text-sm font-medium">+212 665 48 27 25</span>
              </a>
            </div>
            <a href="mailto:Amityschool2024@gmail.com" className="flex items-center gap-3 bg-slate-50 rounded-2xl px-5 py-3 hover:bg-[#002366]/5 transition-colors">
              <Mail size={16} className="text-[#F48120] shrink-0" />
              <span className="text-slate-600 text-sm font-medium">Amityschool2024@gmail.com</span>
            </a>
          </div>
          
          <div className="flex gap-6 pt-2">
            <button 
              onClick={() => navigate('/contact')}
              className="px-10 py-4 bg-[#F48120] text-white rounded-full font-bold uppercase text-[10px] tracking-widest hover:scale-105 transition-all"
            >
              Nous Contacter
            </button>
          </div>
        </motion.div>
      </section>

      {/* --- STATISTIQUES --- */}
      <section className="bg-[#002366] py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { icon: <BookOpen />, val: "500+", label: "Cours Disponibles" },
            { icon: <Users />, val: "1200+", label: "Nos Étudiants" },
            { icon: <GraduationCap />, val: "750+", label: "Enseignants Qualifiés" },
            { icon: <Award />, val: "20+", label: "Années d'Excellence" }
          ].map((stat, idx) => (
            <div key={idx} className="space-y-4 group">
              <div className="w-16 h-16 bg-[#F48120] rounded-2xl flex items-center justify-center text-white mx-auto group-hover:rotate-12 transition-all shadow-lg">
                {stat.icon}
              </div>
              <h3 className="text-4xl font-black text-white italic tracking-tighter">{stat.val}</h3>
              <p className="text-blue-200/50 text-[10px] font-bold uppercase tracking-[0.2em]">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- VALEURS --- */}
      <section className="py-20 bg-slate-50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <span className="text-[#F48120] font-black uppercase text-[10px] tracking-[0.5em]">Nos Valeurs</span>
            <h2 className="text-4xl font-black text-[#002366]">Ce qui nous définit</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Excellence Scolaire", icon: "🎓" },
              { label: "Innovation & Créativité", icon: "💡" },
              { label: "Épanouissement & Valeurs", icon: "🌱" },
              { label: "Ouverture Internationale", icon: "🌍" }
            ].map((val, i) => (
              <motion.div key={i} whileHover={{ y: -8 }} className="bg-white rounded-[30px] p-8 text-center shadow-sm border border-slate-100 space-y-4">
                <div className="text-4xl">{val.icon}</div>
                <p className="text-[#002366] font-black text-sm uppercase tracking-tight">{val.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TÉMOIGNAGES --- */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto text-center mb-20 space-y-4">
          <span className="text-[#F48120] font-black uppercase text-[10px] tracking-[0.5em]">Témoignages</span>
          <h2 className="text-4xl font-black text-[#002366]">Ce que disent nos élèves</h2>
        </div>
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-6">
          {[1,2,3,4].map((i) => (
            <motion.div key={i} whileHover={{ y: -10 }} className="bg-slate-50 p-8 rounded-[30px] shadow-sm border border-slate-100 relative group transition-all">
              <div className="text-orange-400 mb-4 flex gap-1">{"★".repeat(5)}</div>
              <p className="text-slate-500 text-xs italic leading-relaxed mb-6">"Amity International School a changé ma perspective sur l'apprentissage. Une école qui prépare vraiment à l'avenir."</p>
              <div className="flex items-center gap-3 pt-6 border-t border-slate-100">
                <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden"><img src={`https://i.pravatar.cc/100?u=${i}`} alt="user"/></div>
                <div className="text-left"><p className="text-xs font-black text-[#002366]">Élève Amity</p><p className="text-[9px] text-slate-400 font-bold uppercase">Tanger, Maroc</p></div>
              </div>
              <Quote className="absolute top-6 right-6 text-slate-100 group-hover:text-orange-100 transition-colors" size={40}/>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- ENSEIGNANTS --- */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto text-center mb-20 space-y-4">
          <span className="text-[#F48120] font-black uppercase text-[10px] tracking-[0.5em]">Notre Équipe</span>
          <h2 className="text-4xl font-black text-[#002366]">Rencontrez nos professeurs</h2>
        </div>
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
          {[1,2,3,4].map((i) => (
            <motion.div key={i} whileHover={{ scale: 1.05 }} className="bg-white rounded-[40px] overflow-hidden shadow-xl border border-slate-100 group">
              <div className="h-64 bg-slate-100 overflow-hidden relative">
                <img src={`https://images.unsplash.com/photo-${1500648767791 + i}?q=80&w=400`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Prof" />
              </div>
              <div className="p-6 text-center space-y-2">
                <h4 className="font-black text-[#002366] uppercase text-sm tracking-tight">Professeur Amity</h4>
                <p className="text-[10px] font-bold text-[#F48120] uppercase tracking-widest">Expert Éducatif</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default About;
