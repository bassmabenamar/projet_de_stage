import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Phone,
  Mail,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
  Clock,
  MessageSquare,
  User,
  BookOpen
} from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

const Contact1 = () => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    sujet: '',
    message: ''
  });
  const [status, setStatus] = useState(null); // null | 'loading' | 'success' | 'error'

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      // ✅ Correct endpoint for your API
      const res = await fetch('/api/student/contact-support', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${formData.prenom} ${formData.nom}`,
          email: formData.email,
          subject: formData.sujet,
          message: formData.message
        })
      });
      if (res.ok) {
        setStatus('success');
        setFormData({ nom: '', prenom: '', email: '', telephone: '', sujet: '', message: '' });
      } else {
        const errorData = await res.json();
        console.error('API Error:', errorData);
        setStatus('error');
      }
    } catch (error) {
      console.error('Fetch Error:', error);
      setStatus('error');
    }
  };

  const infos = [
    {
      icon: <Phone size={20} />,
      label: 'Téléphone',
      lines: ['+212 539 94 44 81', '+212 665 48 27 25'],
      href: ['tel:+212539944481', 'tel:+212665482725']
    },
    {
      icon: <Mail size={20} />,
      label: 'Email',
      lines: ['Amityschool2024@gmail.com'],
      href: ['mailto:Amityschool2024@gmail.com']
    },
    {
      icon: <MapPin size={20} />,
      label: 'Adresse',
      lines: ['03, rue Ibn Achir', 'Quartier Nzaha Souryenne', 'Tanger, Maroc'],
      href: [null]
    },
    {
      icon: <Clock size={20} />,
      label: 'Horaires',
      lines: ['Lun – Ven : 08h00 – 17h00', 'Sam : 08h00 – 12h00'],
      href: [null]
    }
  ];

  const sujets = [
    'Inscription 2026/2027',
    'Renseignements académiques',
    'Espace parents',
    'Support technique',
    'Partenariat',
    'Autre'
  ];

  return (
    <div className="selection:bg-[#F48120] selection:text-white">
      <Navbar />

      {/* --- HERO --- */}
      <section className="pt-40 pb-24 px-6 bg-gradient-to-br from-[#001233] via-[#002366] to-[#001a4d] relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-[#F48120]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2"
          >
            <MessageSquare size={14} className="text-[#F48120]" />
            <span className="text-white text-xs font-black uppercase tracking-widest">Contactez-nous</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-7xl font-black text-white tracking-tight leading-none"
          >
            Parlons de votre<br />
            <span className="text-[#F48120]">avenir académique</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-blue-200/70 max-w-2xl mx-auto text-lg font-medium leading-relaxed"
          >
            Notre équipe est disponible pour répondre à toutes vos questions sur les inscriptions, les programmes et la vie scolaire à Amity International School.
          </motion.p>
        </div>
      </section>

      {/* --- INFOS + FORMULAIRE --- */}
      <section className="py-24 px-6 md:px-20 max-w-7xl mx-auto grid md:grid-cols-5 gap-16 items-start">

        {/* LEFT — Infos contact */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="md:col-span-2 space-y-6"
        >
          <div className="space-y-2">
            <span className="text-[11px] font-black text-[#F48120] uppercase tracking-[0.4em]">Nos coordonnées</span>
            <h2 className="text-3xl font-black text-[#002366] leading-tight">On est là pour vous</h2>
          </div>

          {infos.map((info, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-4 items-start p-5 bg-slate-50 rounded-3xl border border-slate-100 hover:border-[#F48120]/30 hover:bg-[#F48120]/5 transition-all group"
            >
              <div className="w-10 h-10 bg-[#002366] text-white rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-[#F48120] transition-colors">
                {info.icon}
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{info.label}</p>
                {info.lines.map((line, j) => (
                  info.href[j] ? (
                    <a key={j} href={info.href[j]} className="block text-sm font-bold text-[#002366] hover:text-[#F48120] transition-colors">
                      {line}
                    </a>
                  ) : (
                    <p key={j} className="text-sm font-medium text-slate-500">{line}</p>
                  )
                ))}
              </div>
            </motion.div>
          ))}

          <div className="flex items-center gap-3 bg-[#002366] rounded-3xl px-6 py-5">
            <div className="w-3 h-3 bg-[#F48120] rounded-full animate-pulse shrink-0"></div>
            <div>
              <p className="text-[10px] font-black text-[#F48120] uppercase tracking-widest">Inscriptions Ouvertes</p>
              <p className="text-white font-black text-sm">Session 2026 / 2027</p>
            </div>
          </div>
        </motion.div>

        {/* RIGHT — Formulaire */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="md:col-span-3"
        >
          <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl shadow-slate-100/80 p-10 md:p-14">
            <div className="space-y-2 mb-10">
              <span className="text-[11px] font-black text-[#F48120] uppercase tracking-[0.4em]">Formulaire de contact</span>
              <h3 className="text-2xl font-black text-[#002366]">Envoyez-nous un message</h3>
            </div>

            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-4 bg-green-50 border border-green-200 rounded-2xl p-5 mb-8"
              >
                <CheckCircle size={24} className="text-green-500 shrink-0" />
                <div>
                  <p className="font-black text-green-700 text-sm">Message envoyé avec succès !</p>
                  <p className="text-green-600/70 text-xs">Notre équipe vous répondra dans les plus brefs délais.</p>
                </div>
              </motion.div>
            )}

            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-4 bg-red-50 border border-red-200 rounded-2xl p-5 mb-8"
              >
                <AlertCircle size={24} className="text-red-500 shrink-0" />
                <div>
                  <p className="font-black text-red-700 text-sm">Une erreur s'est produite.</p>
                  <p className="text-red-600/70 text-xs">Veuillez réessayer ou nous contacter par téléphone.</p>
                </div>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1">
                    <User size={10} /> Nom <span className="text-[#F48120]">*</span>
                  </label>
                  <input
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    required
                    placeholder="El Idrissi"
                    className="w-full border border-slate-200 rounded-2xl px-5 py-3.5 text-sm text-slate-700 placeholder:text-slate-300 outline-none focus:border-[#002366] focus:ring-2 focus:ring-[#002366]/10 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1">
                    <User size={10} /> Prénom <span className="text-[#F48120]">*</span>
                  </label>
                  <input
                    type="text"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleChange}
                    required
                    placeholder="Yassine"
                    className="w-full border border-slate-200 rounded-2xl px-5 py-3.5 text-sm text-slate-700 placeholder:text-slate-300 outline-none focus:border-[#002366] focus:ring-2 focus:ring-[#002366]/10 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1">
                    <Mail size={10} /> Email <span className="text-[#F48120]">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="email@exemple.com"
                    className="w-full border border-slate-200 rounded-2xl px-5 py-3.5 text-sm text-slate-700 placeholder:text-slate-300 outline-none focus:border-[#002366] focus:ring-2 focus:ring-[#002366]/10 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1">
                    <Phone size={10} /> Téléphone
                  </label>
                  <input
                    type="tel"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleChange}
                    placeholder="+212 6XX XXX XXX"
                    className="w-full border border-slate-200 rounded-2xl px-5 py-3.5 text-sm text-slate-700 placeholder:text-slate-300 outline-none focus:border-[#002366] focus:ring-2 focus:ring-[#002366]/10 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1">
                  <BookOpen size={10} /> Sujet <span className="text-[#F48120]">*</span>
                </label>
                <select
                  name="sujet"
                  value={formData.sujet}
                  onChange={handleChange}
                  required
                  className="w-full border border-slate-200 rounded-2xl px-5 py-3.5 text-sm text-slate-700 outline-none focus:border-[#002366] focus:ring-2 focus:ring-[#002366]/10 transition-all bg-white appearance-none cursor-pointer"
                >
                  <option value="" disabled>Choisissez un sujet...</option>
                  {sujets.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1">
                  <MessageSquare size={10} /> Message <span className="text-[#F48120]">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Décrivez votre demande en détail..."
                  className="w-full border border-slate-200 rounded-2xl px-5 py-3.5 text-sm text-slate-700 placeholder:text-slate-300 outline-none focus:border-[#002366] focus:ring-2 focus:ring-[#002366]/10 transition-all resize-none"
                />
              </div>

              <motion.button
                type="submit"
                disabled={status === 'loading'}
                whileHover={{ scale: status === 'loading' ? 1 : 1.02 }}
                whileTap={{ scale: status === 'loading' ? 1 : 0.98 }}
                className="w-full py-4 bg-[#002366] text-white rounded-2xl font-black uppercase text-xs tracking-widest flex items-center justify-center gap-3 hover:bg-[#001a4d] transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-blue-900/20"
              >
                {status === 'loading' ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <Send size={15} />
                    Envoyer le message
                  </>
                )}
              </motion.button>

              <p className="text-center text-[10px] text-slate-400 font-medium">
                En soumettant ce formulaire, vous acceptez notre politique de confidentialité.
              </p>
            </form>
          </div>
        </motion.div>
      </section>

      {/* --- MAP SECTION --- */}
      <section className="px-6 md:px-20 pb-24 max-w-7xl mx-auto">
        <div className="rounded-[40px] overflow-hidden border border-slate-100 shadow-xl h-80">
          <iframe
            title="Amity International School — Tanger"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d-5.8!3d35.77!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDQ2JzEyLjAiTiA1wrA0OCcwMC4wIlc!5e0!3m2!1sfr!2sma!4v1600000000000!5m2!1sfr!2sma&q=03+rue+Ibn+Achir+quartier+Nzaha+Souryenne+Tanger+Maroc"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <p className="text-center text-xs text-slate-400 font-medium mt-4">
          📍 03, rue Ibn Achir, quartier Nzaha Souryenne, Tanger, Maroc
        </p>
      </section>

      <Footer />
    </div>
  );
};

export default Contact1;