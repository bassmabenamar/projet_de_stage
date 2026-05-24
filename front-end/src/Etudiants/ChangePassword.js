import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Eye, EyeOff, Lock, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from './pages/Navbar';
import api from './api';

const ChangePassword = () => {
  const navigate = useNavigate();
  const [isUpdating, setIsUpdating] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    current: '', new: '', confirm: ''
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const updatePassword = async () => {
    if (passwordData.new !== passwordData.confirm) {
      setMessage({ type: 'error', text: 'Les nouveaux mots de passe ne correspondent pas' });
      return;
    }
    if (passwordData.new.length < 6) {
      setMessage({ type: 'error', text: 'Le mot de passe doit contenir au moins 6 caractères' });
      return;
    }

    setIsUpdating(true);
    try {
      const response = await api.post('/student/update-password', {
        current_password: passwordData.current,
        password: passwordData.new,
        password_confirmation: passwordData.confirm
      });

      if (response.data.success) {
        setMessage({ type: 'success', text: 'Mot de passe mis à jour avec succès !' });
        setPasswordData({ current: '', new: '', confirm: '' });
        setTimeout(() => navigate('/profile'), 2000);
      }
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Erreur lors de la mise à jour' });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans text-[#1E293B]">
      <main className="flex-1 overflow-y-auto min-w-0">
        <Navbar />

        <div className="p-4 md:p-8 max-w-2xl mx-auto">

          {/* Fil d'Ariane */}
          <div className="hidden sm:flex items-center gap-2 mb-8 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
            ACCUEIL
            <ChevronRight size={14} className="opacity-40" />
            <span className="cursor-pointer hover:text-blue-600" onClick={() => navigate('/profile')}>PROFIL</span>
            <ChevronRight size={14} className="opacity-40" />
            <span className="text-blue-600">MOT DE PASSE</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#002366] p-8 text-white">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
                  <Lock size={28} />
                </div>
                <div>
                  <h1 className="text-2xl font-black">Changer le mot de passe</h1>
                  <p className="text-blue-200/70 text-sm mt-1">Sécurisez votre compte avec un nouveau mot de passe</p>
                </div>
              </div>
            </div>

            <div className="p-8 space-y-6">

              {/* Info utilisateur */}
              <div className="bg-slate-50 rounded-2xl p-4 flex items-center gap-3 border border-slate-100">
                <div className="w-10 h-10 rounded-full bg-[#002366] flex items-center justify-center text-white font-black text-sm flex-shrink-0">
                  {user?.prenom?.charAt(0)}{user?.nom?.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="font-black text-sm text-[#002366] truncate">{user?.prenom} {user?.nom}</p>
                  <p className="text-[10px] text-slate-400 truncate">{user?.email}</p>
                </div>
                <span className="ml-auto text-[9px] font-black bg-green-100 text-green-600 px-2 py-1 rounded-full uppercase tracking-widest flex-shrink-0">
                  Connecté
                </span>
              </div>

              {/* Message */}
              {message.text && (
                <div className={`rounded-2xl p-4 text-sm font-bold ${
                  message.type === 'success'
                    ? 'bg-green-50 text-green-600 border border-green-100'
                    : 'bg-red-50 text-red-500 border border-red-100'
                }`}>
                  {message.text}
                </div>
              )}

              {/* Mot de passe actuel */}
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">
                  Mot de passe actuel
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    value={passwordData.current}
                    onChange={(e) => setPasswordData({...passwordData, current: e.target.value})}
                    placeholder="••••••••"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 px-5 outline-none focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all font-medium text-sm pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#002366]"
                  >
                    {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Nouveau mot de passe */}
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">
                  Nouveau mot de passe
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={passwordData.new}
                    onChange={(e) => setPasswordData({...passwordData, new: e.target.value})}
                    placeholder="••••••••"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 px-5 outline-none focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all font-medium text-sm pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#002366]"
                  >
                    {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {/* Indicateur de force */}
                {passwordData.new && (
                  <div className="mt-3">
                    <div className="flex gap-1 h-1.5 mb-2">
                      <div className={`flex-1 rounded-full transition-all ${passwordData.new.length >= 6 ? 'bg-green-500' : 'bg-slate-200'}`} />
                      <div className={`flex-1 rounded-full transition-all ${passwordData.new.length >= 8 ? 'bg-green-500' : 'bg-slate-200'}`} />
                      <div className={`flex-1 rounded-full transition-all ${/[0-9]/.test(passwordData.new) ? 'bg-green-500' : 'bg-slate-200'}`} />
                      <div className={`flex-1 rounded-full transition-all ${/[A-Z]/.test(passwordData.new) ? 'bg-green-500' : 'bg-slate-200'}`} />
                    </div>
                    <p className="text-[9px] text-slate-400">
                      {passwordData.new.length < 6 ? 'Trop court' :
                       passwordData.new.length >= 8 && /[0-9]/.test(passwordData.new) && /[A-Z]/.test(passwordData.new)
                         ? 'Mot de passe fort ✓'
                         : 'Ajoutez des chiffres et majuscules pour renforcer'}
                    </p>
                  </div>
                )}
              </div>

              {/* Confirmer mot de passe */}
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">
                  Confirmer le mot de passe
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={passwordData.confirm}
                    onChange={(e) => setPasswordData({...passwordData, confirm: e.target.value})}
                    placeholder="••••••••"
                    className={`w-full bg-slate-50 border rounded-xl py-3.5 px-5 outline-none focus:ring-2 focus:bg-white transition-all font-medium text-sm pr-12 ${
                      passwordData.confirm && passwordData.new !== passwordData.confirm
                        ? 'border-red-300 focus:ring-red-100'
                        : 'border-slate-200 focus:ring-blue-100'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#002366]"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {passwordData.confirm && passwordData.new !== passwordData.confirm && (
                  <p className="text-[10px] text-red-400 mt-1 font-bold">Les mots de passe ne correspondent pas</p>
                )}
              </div>

              {/* Boutons */}
              <div className="flex gap-3 pt-2">
                <motion.button
                  onClick={() => navigate('/profile')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 py-3.5 rounded-xl font-black text-xs uppercase tracking-widest bg-slate-100 text-slate-500 hover:bg-slate-200 transition-all"
                >
                  Annuler
                </motion.button>
                <motion.button
                  onClick={updatePassword}
                  disabled={isUpdating || !passwordData.current || !passwordData.new || !passwordData.confirm}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex-1 py-3.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${
                    isUpdating || !passwordData.current || !passwordData.new || !passwordData.confirm
                      ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                      : 'bg-[#002366] text-white hover:bg-orange-500'
                  }`}
                >
                  {isUpdating ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Mise à jour...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Check size={16} /> Mettre à jour
                    </span>
                  )}
                </motion.button>
              </div>

            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default ChangePassword;