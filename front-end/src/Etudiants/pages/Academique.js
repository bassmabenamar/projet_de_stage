import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Globe, Award, Clock, Users, ChevronRight, Calendar, Phone, Mail, MapPin, MessageCircle, Eye, Info, CheckCircle } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

const Academique = () => {
  const niveaux = [
    {
      titre: "Préscolaire",
      age: "3 - 5 ans",
      horaire: "8h30 - 12h30",
      langues: ["Arabe", "Français"],
      description: "Éveil linguistique et développement sensoriel dans un environnement bilingue. Méthode ludique et pédagogie active."
    },
    {
      titre: "Primaire",
      age: "6 - 11 ans",
      horaire: "8h30 - 15h30",
      langues: ["Arabe", "Français", "Anglais"],
      description: "Bases solides en trilingue : lecture, écriture, mathématiques et découverte du monde. Programme international adapté."
    },
    {
      titre: "Collège",
      age: "12 - 14 ans",
      horaire: "8h30 - 16h30",
      langues: ["Arabe", "Français", "Anglais"],
      description: "Approfondissement des matières scientifiques et littéraires en trilingue. Préparation aux examens régionaux."
    },
    {
      titre: "Lycée",
      age: "15 - 17 ans",
      horaire: "8h30 - 17h00",
      langues: ["Arabe", "Français", "Anglais"],
      description: "Préparation aux examens nationaux et internationaux (BAC, A-Level, Baccalauréat Français). Accompagnement personnalisé."
    }
  ];

  const pourquoiVisiter = [
    {
      icone: Eye,
      titre: "Visite des locaux",
      description: "Découvrez nos infrastructures modernes et nos salles de classe équipées"
    },
    {
      icone: Info,
      titre: "Projet éducatif",
      description: "Présentation détaillée de notre approche pédagogique trilingue"
    },
    {
      icone: Calendar,
      titre: "Informations admissions",
      description: "Modalités d'inscription, tarifs et bourses disponibles"
    },
    {
      icone: MessageCircle,
      titre: "Questions/Réponses",
      description: "Échange direct avec notre équipe pédagogique et administrative"
    }
  ];

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20 bg-gradient-to-b from-white to-blue-50/30">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-[#002366] text-white py-20 mb-16">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-[#F48120] rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-6 md:px-20 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <Globe size={18} className="text-[#F48120]" />
                <span className="text-xs font-bold uppercase tracking-wider">Programme Trilingue</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black mb-6">
                AMITY <span className="text-[#F48120]">International</span> School
              </h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                Arabe · Français · Anglais — Une éducation d'excellence au cœur de Tanger
              </p>
            </motion.div>
          </div>
        </div>

        {/* Portes Ouvertes Section - ULTRA PRO */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-6 md:px-20 mb-20"
        >
          <div className="bg-gradient-to-br from-[#F48120]/5 via-white to-[#002366]/5 rounded-3xl border-2 border-[#F48120]/20 overflow-hidden shadow-2xl">
            {/* Badge Portes Ouvertes */}
            <div className="bg-[#F48120] text-white text-center py-3">
              <div className="flex items-center justify-center gap-3">
                <Calendar size={20} />
                <span className="text-xs font-black uppercase tracking-[0.2em]">Événement exceptionnel</span>
                <Calendar size={20} />
              </div>
            </div>
            
            <div className="p-8 md:p-12">
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-5xl font-black text-[#002366] mb-4">
                  PORTES <span className="text-[#F48120]">OUVERTES</span>
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Venez découvrir notre école et son environnement d'apprentissage unique !
                </p>
              </div>

              {/* Dates et horaires */}
              <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="text-center border-b md:border-b-0 md:border-r border-gray-200 pb-4 md:pb-0">
                    <Calendar size={32} className="text-[#F48120] mx-auto mb-2" />
                    <p className="text-sm text-gray-500 font-bold uppercase">Du lundi 4 mai au vendredi 9 mai</p>
                    <p className="text-2xl font-black text-[#002366]">📅 4 - 9 MAI 2026</p>
                  </div>
                  <div className="text-center">
                    <Clock size={32} className="text-[#F48120] mx-auto mb-2" />
                    <p className="text-sm text-gray-500 font-bold uppercase">Horaires d'accueil</p>
                    <p className="text-2xl font-black text-[#002366]">⏰ 9h00 - 15h00</p>
                  </div>
                </div>
              </div>

              {/* Niveaux disponibles */}
              <div className="flex flex-wrap justify-center gap-3 mb-10">
                {["PRÉSCOLAIRE", "PRIMAIRE", "COLLÈGE", "LYCÉE"].map((niveau, idx) => (
                  <span key={idx} className="bg-[#002366] text-white px-4 py-2 rounded-full text-xs font-bold tracking-wide">
                    {niveau}
                  </span>
                ))}
              </div>

              {/* Pourquoi visiter */}
              <div className="mb-8">
                <h3 className="text-xl font-black text-[#002366] mb-6 text-center">
                  Pourquoi nous rendre visite ?
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {pourquoiVisiter.map((item, idx) => (
                    <div key={idx} className="bg-white rounded-xl p-4 text-center shadow-md hover:shadow-xl transition-all group">
                      <div className="w-12 h-12 bg-[#F48120]/10 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-[#F48120] transition-all">
                        <item.icone size={24} className="text-[#F48120] group-hover:text-white" />
                      </div>
                      <h4 className="font-bold text-[#002366] text-sm mb-1">{item.titre}</h4>
                      <p className="text-xs text-gray-500">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact rapide */}
              <div className="bg-gradient-to-r from-[#002366] to-[#003080] rounded-2xl p-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="text-white space-y-3">
                    <div className="flex items-center gap-3">
                      <Phone size={18} className="text-[#F48120]" />
                      <a href="tel:+212539944481" className="text-sm hover:text-[#F48120] transition">+212 539 94 44 81</a>
                    </div>
                    <div className="flex items-center gap-3">
                      <MessageCircle size={18} className="text-[#F48120]" />
                      <a href="https://wa.me/212665482725" className="text-sm hover:text-[#F48120] transition">+212 665 48 27 25</a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail size={18} className="text-[#F48120]" />
                      <a href="mailto:amityinternational2024@gmail.com" className="text-sm hover:text-[#F48120] transition">amityinternational2024@gmail.com</a>
                    </div>
                  </div>
                  <div className="text-white">
                    <div className="flex items-start gap-3">
                      <MapPin size={18} className="text-[#F48120] mt-1" />
                      <p className="text-sm">Rue Ibn Achir N° 03, Quartier Nzaha Souryenne, Tanger, Maroc 90000</p>
                    </div>
                  </div>
                </div>
                
                <div className="text-center mt-6">
                  <a 
                    href="/contact" 
                    className="inline-flex items-center gap-2 bg-[#F48120] text-white px-8 py-3 rounded-full font-bold hover:bg-orange-600 transition-all shadow-lg"
                  >
                    Je réserve ma visite
                    <ChevronRight size={18} />
                  </a>
                </div>
              </div>

              {/* Message final */}
              <div className="text-center mt-8">
                <p className="text-sm text-gray-500 italic">
                  "Un moment privilégié pour faire le meilleur choix pour l'avenir de votre enfant"
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Niveaux Section */}
        <div className="max-w-7xl mx-auto px-6 md:px-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-[#002366] mb-4">
              Nos Programmes par Niveau
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Du préscolaire au lycée, un parcours éducatif continu et exigeant
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {niveaux.map((niveau, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all group border border-gray-100"
              >
                <div className="h-2 bg-[#F48120]"></div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-black text-[#002366]">{niveau.titre}</h3>
                    <Award className="text-[#F48120] opacity-60 group-hover:opacity-100 transition-all" size={32} />
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Users size={16} className="text-[#F48120]" />
                      <span className="text-sm font-medium">Âge: {niveau.age}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock size={16} className="text-[#F48120]" />
                      <span className="text-sm font-medium">Horaires: {niveau.horaire}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {niveau.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {niveau.langues.map((langue, idx) => (
                      <span key={idx} className="bg-blue-50 text-[#002366] px-3 py-1 rounded-full text-xs font-bold">
                        {langue}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Spécificités */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-20 bg-gradient-to-r from-[#002366] to-[#003080] rounded-2xl p-10 text-white"
          >
            <h3 className="text-2xl font-black mb-6 text-center">Pourquoi choisir Amity ?</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <BookOpen size={40} className="text-[#F48120] mx-auto mb-4" />
                <h4 className="font-bold mb-2">Programme International</h4>
                <p className="text-sm text-blue-100">Certifié et reconnu mondialement</p>
              </div>
              <div className="text-center">
                <Globe size={40} className="text-[#F48120] mx-auto mb-4" />
                <h4 className="font-bold mb-2">Trilingue</h4>
                <p className="text-sm text-blue-100">Arabe, Français, Anglais dès le préscolaire</p>
              </div>
              <div className="text-center">
                <Award size={40} className="text-[#F48120] mx-auto mb-4" />
                <h4 className="font-bold mb-2">Excellence Académique</h4>
                <p className="text-sm text-blue-100">1200+ étudiants formés depuis 20 ans</p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Academique;