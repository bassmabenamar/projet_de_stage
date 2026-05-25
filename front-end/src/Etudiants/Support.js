import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  HelpCircle, Mail, Phone, MessageSquare, 
  Send, CheckCircle, Clock, FileText, 
  ChevronRight, Search, Filter, Star, 
  ThumbsUp, ThumbsDown, User, Calendar, Loader2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import api from './api';

const Support = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('faq');
  const [searchTerm, setSearchTerm] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const faqs = [
    {
      id: 1,
      question: "Comment accéder à mon tableau de bord ?",
      answer: "Connectez-vous avec votre email et mot de passe, puis cliquez sur 'Dashboard' dans le menu latéral.",
      category: "compte",
      helpful: 45
    },
    {
      id: 2,
      question: "Comment télécharger mes notes ?",
      answer: "Allez dans la section 'Notes', cliquez sur 'Télécharger le bulletin (PDF)' pour exporter vos résultats.",
      category: "academique",
      helpful: 32
    },
    {
      id: 3,
      question: "Comment contacter un professeur ?",
      answer: "Utilisez la section 'Messages' pour envoyer un message directement à votre professeur.",
      category: "communication",
      helpful: 28
    },
    {
      id: 4,
      question: "Comment soumettre un devoir ?",
      answer: "Rendez-vous dans 'Devoirs', sélectionnez le devoir et cliquez sur 'Téléverser le devoir'.",
      category: "devoirs",
      helpful: 56
    },
    {
      id: 5,
      question: "Comment voir mon emploi du temps ?",
      answer: "Cliquez sur 'Emploi du temps' dans le menu latéral pour voir votre planning hebdomadaire.",
      category: "timetable",
      helpful: 23
    },
    {
      id: 6,
      question: "Comment signaler une absence ?",
      answer: "Allez dans 'Présence' et cliquez sur 'Congé' pour faire une demande de congé justifié.",
      category: "presence",
      helpful: 19
    }
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');
    
    try {
      const response = await api.post('/contact-support', formData);
      if (response.data.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSubmitted(false), 3000);
      }
    } catch (error) {
      console.error('Erreur:', error);
      if (error.response?.data?.errors) {
        const errors = Object.values(error.response.data.errors).flat();
        setErrorMsg(errors.join(', '));
      } else {
        setErrorMsg(error.response?.data?.message || 'Erreur lors de l\'envoi du message');
      }
      setTimeout(() => setErrorMsg(''), 3000);
    } finally {
      setSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans">
      <main className="flex-1 flex flex-col overflow-auto">
        <Navbar />
        
        <div className="p-4 md:p-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-6xl mx-auto"
          >
            {/* Header */}
            <motion.div variants={itemVariants} className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-50 rounded-2xl mb-4">
                <HelpCircle size={32} className="text-orange-500" />
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-[#002366] mb-3">
                Centre d'Aide
              </h1>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                Besoin d'aide ? Consultez notre FAQ ou contactez notre équipe de support
              </p>
            </motion.div>

            {/* Quick Contact Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <ContactCard 
                icon={<Mail className="w-6 h-6" />}
                title="Support Email"
                info="support@amity.com"
                action="Envoyer un email"
                color="blue"
                onClick={() => window.location.href = 'mailto:support@amity.com'}
              />
              <ContactCard 
                icon={<Phone className="w-6 h-6" />}
                title="Hotline"
                info="+212 5XX XXX XXX"
                action="Appeler maintenant"
                color="orange"
                onClick={() => window.location.href = 'tel:+212500000000'}
              />
              <ContactCard 
                icon={<MessageSquare className="w-6 h-6" />}
                title="Chat en direct"
                info="Disponible 24/7"
                action="Démarrer le chat"
                color="green"
              />
            </div>

            {/* Tabs */}
            <div className="flex justify-center mb-8">
              <div className="bg-white p-1.5 rounded-full shadow-sm border border-slate-100">
                <button
                  onClick={() => setActiveTab('faq')}
                  className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                    activeTab === 'faq' 
                      ? 'bg-[#002366] text-white shadow-md' 
                      : 'text-slate-500 hover:text-[#002366]'
                  }`}
                >
                  📚 FAQ
                </button>
                <button
                  onClick={() => setActiveTab('contact')}
                  className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                    activeTab === 'contact' 
                      ? 'bg-[#002366] text-white shadow-md' 
                      : 'text-slate-500 hover:text-[#002366]'
                  }`}
                >
                  ✉️ Nous contacter
                </button>
              </div>
            </div>

            {/* FAQ Section */}
            {activeTab === 'faq' && (
              <motion.div variants={itemVariants}>
                {/* Search Bar */}
                <div className="mb-8">
                  <div className="relative max-w-xl mx-auto">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                    <input
                      type="text"
                      placeholder="Rechercher dans la FAQ..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl text-sm outline-none focus:border-[#002366] focus:ring-2 focus:ring-[#002366]/10 transition-all"
                    />
                  </div>
                </div>

                {/* Results count */}
                <div className="text-center mb-6">
                  <p className="text-sm text-slate-400">
                    {filteredFaqs.length} question(s) trouvée(s)
                  </p>
                </div>

                {/* FAQ List */}
                <div className="space-y-4">
                  {filteredFaqs.map((faq) => (
                    <FaqCard key={faq.id} faq={faq} />
                  ))}
                </div>

                {filteredFaqs.length === 0 && (
                  <div className="text-center py-12 bg-white rounded-2xl">
                    <HelpCircle size={48} className="mx-auto text-slate-200 mb-4" />
                    <p className="text-slate-400">Aucune question trouvée</p>
                  </div>
                )}
              </motion.div>
            )}

            {/* Contact Form Section */}
            {activeTab === 'contact' && (
              <motion.div variants={itemVariants}>
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
                  <h2 className="text-2xl font-black text-[#002366] mb-6">Formulaire de contact</h2>
                  
                  {submitted && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-2 text-green-600">
                      <CheckCircle size={20} />
                      Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.
                    </div>
                  )}

                  {errorMsg && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {errorMsg}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Nom complet</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none focus:border-[#002366] focus:ring-2 focus:ring-[#002366]/10 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none focus:border-[#002366] focus:ring-2 focus:ring-[#002366]/10 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Sujet</label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none focus:border-[#002366] focus:ring-2 focus:ring-[#002366]/10 transition-all"
                      >
                        <option value="">Sélectionner un sujet</option>
                        <option value="Technique">Problème technique</option>
                        <option value="Académique">Question académique</option>
                        <option value="Paiement">Paiement / Facturation</option>
                        <option value="Autre">Autre</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows="6"
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none focus:border-[#002366] focus:ring-2 focus:ring-[#002366]/10 transition-all resize-none"
                        placeholder="Décrivez votre problème ou question..."
                      />
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="px-8 py-3 bg-[#002366] text-white rounded-xl font-bold hover:bg-orange-500 transition-colors flex items-center gap-2 disabled:opacity-50"
                      >
                        {submitting ? (
                          <Loader2 size={18} className="animate-spin" />
                        ) : (
                          <Send size={18} />
                        )}
                        {submitting ? 'Envoi en cours...' : 'Envoyer le message'}
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

const ContactCard = ({ icon, title, info, action, color, onClick }) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    orange: 'bg-orange-50 text-orange-600',
    green: 'bg-green-50 text-green-600'
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl p-6 text-center border border-slate-100 shadow-sm cursor-pointer"
      onClick={onClick}
    >
      <div className={`w-14 h-14 rounded-xl ${colorClasses[color]} flex items-center justify-center mx-auto mb-4`}>
        {icon}
      </div>
      <h3 className="font-black text-[#002366] mb-2">{title}</h3>
      <p className="text-slate-400 text-sm mb-3">{info}</p>
      <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">
        {action} →
      </span>
    </motion.div>
  );
};

const FaqCard = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex justify-between items-center hover:bg-slate-50 transition-colors text-left"
      >
        <span className="font-bold text-[#002366]">{faq.question}</span>
        <ChevronRight className={`transform transition-transform ${isOpen ? 'rotate-90' : ''} text-slate-400`} size={20} />
      </button>
      
      {isOpen && (
        <div className="px-6 pb-5 pt-0 border-t border-slate-50 bg-slate-50/30">
          <p className="text-slate-600 text-sm leading-relaxed">{faq.answer}</p>
          <div className="flex items-center gap-4 mt-4 pt-3 border-t border-slate-100">
            <span className="text-[10px] text-slate-400 flex items-center gap-1">
              <ThumbsUp size={12} /> Utile ({faq.helpful})
            </span>
            <button className="text-[10px] text-slate-400 hover:text-green-600 transition-colors flex items-center gap-1">
              <ThumbsUp size={12} /> Oui
            </button>
            <button className="text-[10px] text-slate-400 hover:text-red-600 transition-colors flex items-center gap-1">
              <ThumbsDown size={12} /> Non
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Support;