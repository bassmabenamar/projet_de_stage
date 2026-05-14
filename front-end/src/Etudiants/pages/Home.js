import React from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Layout, 
  BookOpen
} from 'lucide-react';

const Home = () => {
  return (
    <div className="selection:bg-[#F48120] selection:text-white">
      
      {/* --- HERO SECTION --- */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/hero-video.mp4" type="video/mp4" />
            Votre navigateur ne supporte pas la vidéo.
          </video>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="relative z-20 text-center px-6 max-w-5xl"
        >
          <h1 className="text-4xl md:text-7xl font-black text-white tracking-tight mb-8 drop-shadow-lg">
            L'Éducation Connectée vers l'Avenir
          </h1>
          <p className="text-white text-lg md:text-xl font-medium mb-12 opacity-95 leading-relaxed max-w-3xl mx-auto drop-shadow-md">
            Former la prochaine génération de leaders grâce à une intégration numérique innovante et un engagement envers l'excellence académique au sein d'une communauté mondiale.
          </p>
          
          <div className="flex flex-col md:flex-row gap-5 justify-center">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-4 bg-[#002366] text-white rounded-md font-bold text-sm uppercase tracking-widest hover:bg-[#001a4d] transition-all"
            >
              Explorer les Programmes
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-white text-[#002366] border-2 border-white rounded-md font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-transparent hover:text-white transition-all"
            >
              <Play size={16} fill="currentColor" /> Visite Virtuelle
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* --- MISSION (ABOUT SECTION) --- */}
      <section id="about-section" className="py-32 px-6 md:px-20 max-w-7xl mx-auto grid md:grid-cols-2 gap-24 items-center scroll-mt-24">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-[#F8F9FA] p-8 md:p-16 rounded-[60px] relative shadow-inner group"
        >
          <img 
            src="https://img.freepik.com/free-vector/happy-students-group-standing-together-holding-books-illustration_1150-39164.jpg" 
            alt="Étudiants" 
            className="w-full h-auto group-hover:scale-105 transition-transform duration-1000"
          />
          <div className="mt-8 text-center">
             <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em]">Environnement Sécurisé & Inspirant</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <span className="text-[12px] font-black text-[#F48120] uppercase tracking-[0.5em]">Notre Mission</span>
          <h2 className="text-5xl font-black text-[#002366] leading-[1.1]">Excellence Académique et Valeurs Modernes</h2>
          <div className="space-y-6 text-slate-500 text-md leading-relaxed font-medium">
            <p>À Amity School, nous croyons que l'éducation est le fondement d'un avenir radieux. Notre mission est de fournir un environnement d'apprentissage holistique qui favorise la pensée critique, la créativité et la responsabilité sociale.</p>
            <p>En intégrant des outils numériques de pointe aux forces pédagogiques traditionnelles, nous préparons nos étudiants aux défis du 21ème siècle.</p>
          </div>
          <button className="flex items-center gap-3 text-[#002366] font-black text-xs uppercase tracking-widest hover:text-[#F48120] transition-all group">
            En savoir plus sur notre héritage <ArrowRight size={16} className="group-hover:translate-x-3 transition-transform" />
          </button>
        </motion.div>
      </section>

      {/* --- PILIERS --- */}
      <section className="py-32 bg-[#F1F5F9]/50 px-6">
        <div className="max-w-7xl mx-auto text-center mb-24 space-y-4">
          <h2 className="text-5xl font-black text-[#002366]">Nos Piliers Fondamentaux</h2>
          <p className="text-slate-400 font-medium max-w-2xl mx-auto">Exploiter la technologie pour combler le fossé entre les élèves, les enseignants et les parents.</p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div 
            whileHover={{ y: -15, scale: 1.02 }}
            className="md:col-span-2 bg-white p-12 rounded-[40px] shadow-sm border border-slate-100 flex flex-col md:flex-row gap-10 items-center overflow-hidden transition-all"
          >
            <div className="flex-1 space-y-5">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center"><Layout size={24} /></div>
              <h3 className="text-2xl font-black text-[#002366]">Gestion Scolaire Unifiée</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Gérez en toute transparence les présences, les horaires et les ressources grâce à notre portail intelligent conçu pour une efficacité administrative moderne.</p>
            </div>
            <div className="flex-1 bg-slate-900 rounded-3xl h-64 w-full overflow-hidden">
               <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800" className="w-full h-full object-cover opacity-80" alt="Tableau de bord" />
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-[#002366] p-12 rounded-[40px] text-white flex flex-col justify-between shadow-2xl relative overflow-hidden"
          >
            <div className="space-y-6">
               <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-[#F48120]"><BookOpen size={24} /></div>
               <h3 className="text-2xl font-bold italic">Excellence Académique</h3>
               <p className="text-blue-100/60 text-sm leading-relaxed">Des programmes conçus pour stimuler et inspirer les étudiants vers des résultats de classe mondiale.</p>
            </div>
            <div className="flex items-center gap-3 mt-12">
               <div className="flex -space-x-3">
                  {[1,2,3].map(i => <img key={i} src={`https://i.pravatar.cc/100?u=${i+10}`} className="w-10 h-10 rounded-full border-2 border-[#002366]" alt="Étudiant" />)}
               </div>
               <span className="text-xs font-black text-orange-400">+1200 Étudiants</span>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -15 }}
            className="bg-[#F48120] p-12 rounded-[40px] text-white flex flex-col items-center justify-center text-center gap-6 shadow-xl"
          >
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center shadow-inner"><ShieldCheck size={40} /></div>
            <h3 className="text-3xl font-black italic">Espace Parents</h3>
            <p className="text-white/90 text-sm">Suivi en temps réel des progrès des élèves et des activités scolaires.</p>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="md:col-span-2 bg-white p-12 rounded-[40px] border border-slate-100 shadow-sm flex flex-col md:flex-row-reverse gap-10 items-center overflow-hidden"
          >
            <div className="flex-1 space-y-5">
              <h3 className="text-2xl font-black text-[#002366]">Classes de Nouvelle Génération</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Des salles de classe intelligentes équipées de VR, d'apprentissage assisté par IA et de plateformes collaboratives.</p>
              <div className="flex gap-6">
                <span className="text-[11px] font-black text-orange-500 flex items-center gap-2 uppercase"><Zap size={14}/> Prêt pour la VR</span>
                <span className="text-[11px] font-black text-blue-500 flex items-center gap-2 uppercase"><Zap size={14}/> Mentors IA</span>
              </div>
            </div>
            <div className="flex-1 rounded-3xl overflow-hidden h-64 w-full">
               <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="Salle de classe" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-32 px-6 md:px-20">
        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="max-w-7xl mx-auto bg-[#001a4d] rounded-[60px] p-16 md:p-32 text-center text-white relative overflow-hidden shadow-2xl"
        >
          <div className="relative z-10 space-y-8">
            <h2 className="text-4xl md:text-7xl font-black tracking-tight leading-none">Prêt à rejoindre la<br/>Communauté Amity ?</h2>
            <p className="text-blue-200/70 max-w-2xl mx-auto text-lg font-medium leading-relaxed">Les inscriptions pour la session 2024-2025 sont maintenant ouvertes. Commencez votre voyage vers l'excellence dès aujourd'hui.</p>
            <div className="flex flex-col md:flex-row gap-6 justify-center pt-8">
              <motion.button 
                whileHover={{ scale: 1.1, backgroundColor: "#e67300" }}
                className="px-12 py-5 bg-[#F48120] text-white rounded-full font-black uppercase text-xs tracking-[0.2em] shadow-xl shadow-orange-500/20"
              >
                S'inscrire Maintenant
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)" }}
                className="px-12 py-5 border-2 border-white/20 text-white rounded-full font-black uppercase text-xs tracking-[0.2em] transition-all"
              >
                Contacter l'Admission
              </motion.button>
            </div>
          </div>
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]"></div>
        </motion.div>
      </section>

    </div>
  );
};

export default Home;