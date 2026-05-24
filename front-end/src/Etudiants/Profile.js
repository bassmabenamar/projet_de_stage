import React, { useState, useEffect } from "react";
import { User, Lock, KeyRound, Mail, Phone, FileText, Save, Camera, AlertCircle, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from './Navbar';
import api from './api';

export default function Profile() {
  const navigate = useNavigate();

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [profile_image, setProfileImage] = useState(null);
  const [biographie, setBiographie] = useState("");
  const [phone, setPhone] = useState("");
  const [classe, setClasse] = useState("");
  const [dateNaissance, setDateNaissance] = useState("");
  const [genre, setGenre] = useState("");

  const [current_password, setCurrentPassword] = useState("");
  const [new_password, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [profileSuccess, setProfileSuccess] = useState("");
  const [profileError, setProfileError] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  const [user, setUser] = useState(null);

  // Vérifier le token au chargement
  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Token présent:', !!token);
    if (!token) {
      navigate('/login');
    }
  }, []);

  // Fetch user profile data
  useEffect(() => {
    async function getUser() {
      try {
        console.log('Appel API /student/profile...');
        const res = await api.get("/student/profile");
        console.log('Réponse reçue:', res.data);
        
        const profileData = res.data?.data || res.data;
        
        console.log("Données du profil:", profileData);
        
        setUser(profileData);
        setNom(profileData.user?.nom || profileData.nom || "");
        setPrenom(profileData.user?.prenom || profileData.prenom || "");
        setEmail(profileData.user?.email || profileData.email || "");
        setBiographie(profileData.user?.biographie || profileData.biographie || "");
        setPhone(profileData.user?.phone || profileData.phone || profileData.tel || "");
        setClasse(profileData.classe?.nom || profileData.classe || "");
        setDateNaissance(profileData.date_naissance || "");
        setGenre(profileData.genre || "");
        setLoading(false);
      } catch (error) {
        console.error("Erreur détaillée:", error);
        console.error("Status:", error.response?.status);
        console.error("Message:", error.response?.data?.message);
        setLoading(false);
        if (error.response?.status === 401) {
          console.log("Token invalide ou expiré, redirection vers login");
          navigate('/login');
        }
      }
    }
    getUser();
  }, [navigate]);

  const imageUrl = user?.user?.photo || user?.photo || user?.profile_image
    ? `http://127.0.0.1:8000/storage/${user?.user?.photo || user?.photo || user?.profile_image}`
    : null;

  const initials = `${prenom?.[0] || ""}${nom?.[0] || ""}`.toUpperCase();

  // Validation des mots de passe
  useEffect(() => {
    if (confirmPassword && new_password !== confirmPassword) {
      setPasswordError("Les mots de passe ne correspondent pas");
    } else {
      setPasswordError("");
    }
  }, [new_password, confirmPassword]);

  // Mise à jour du profil
  async function ProfileUpdate() {
    setProfileError("");
    setProfileSuccess("");
    setUpdating(true);
    
    try {
      const formData = new FormData();
      formData.append("prenom", prenom);
      formData.append("nom", nom);
      formData.append("email", email);
      formData.append("biographie", biographie);
      formData.append("phone", phone);
      if (profile_image) formData.append("profile_image", profile_image);
      
      const res = await api.post("/student/settings/update", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      
      if (res.data.success) {
        setProfileSuccess("Profil mis à jour avec succès !");
        setTimeout(() => setProfileSuccess(""), 3000);
        // Recharger les données
        const userRes = await api.get("/student/profile");
        const profileData = userRes.data?.data || userRes.data;
        setUser(profileData);
        setNom(profileData.user?.nom || profileData.nom || "");
        setPrenom(profileData.user?.prenom || profileData.prenom || "");
      }
    } catch (err) {
      console.log(err);
      setProfileError(err.response?.data?.message || "Erreur lors de la mise à jour");
      setTimeout(() => setProfileError(""), 3000);
    } finally {
      setUpdating(false);
      setProfileImage(null);
    }
  }

  // Changement de mot de passe
  async function Passwordchange() {
    setPasswordError("");
    setPasswordSuccess("");
    
    if (!current_password || !new_password || !confirmPassword) {
      setPasswordError("Veuillez remplir tous les champs");
      return;
    }

    if (new_password !== confirmPassword) {
      setPasswordError("Les mots de passe ne correspondent pas");
      return;
    }

    if (new_password.length < 6) {
      setPasswordError("Le mot de passe doit contenir au moins 6 caractères");
      return;
    }

    setChangingPassword(true);
    
    try {
      const res = await api.post("/student/update-password", {
        current_password: current_password,
        password: new_password,
        password_confirmation: confirmPassword
      });
      
      if (res.data.success) {
        setPasswordSuccess("Mot de passe modifié avec succès !");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setTimeout(() => setPasswordSuccess(""), 3000);
      }
    } catch (err) {
      console.log(err);
      setPasswordError(err.response?.data?.message || "Erreur lors du changement de mot de passe");
      setTimeout(() => setPasswordError(""), 3000);
    } finally {
      setChangingPassword(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC]">
        <div className="text-2xl font-black text-[#002366] animate-pulse">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans">
      <main className="flex-1 flex flex-col overflow-auto">
        <Navbar />
        
        <div className="p-4 md:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-black text-[#002366] mb-2">Profil</h1>
            <p className="text-gray-500">Gérez vos informations personnelles et vos identifiants.</p>
          </div>

          {/* Messages */}
          {profileSuccess && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-2 text-green-600">
              <CheckCircle size={20} />
              {profileSuccess}
            </div>
          )}
          {profileError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-600">
              <AlertCircle size={20} />
              {profileError}
            </div>
          )}

          {/* Card 1 - Profile Header */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-6 shadow-sm">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#002366] to-[#E55B2D] flex items-center justify-center overflow-hidden">
                  {imageUrl ? (
                    <img src={imageUrl} alt={nom} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-2xl font-bold text-white">{initials}</span>
                  )}
                </div>
                <label className="absolute bottom-0 right-0 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center cursor-pointer border-2 border-white">
                  <Camera size={14} className="text-white" />
                  <input type="file" onChange={(e) => setProfileImage(e.target.files[0])} className="hidden" />
                </label>
              </div>
              
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold text-[#002366] mb-2">{prenom} {nom}</h2>
                <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start">
                  <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-bold uppercase">
                    {user?.role || 'Étudiant'}
                  </span>
                  <span className="text-sm text-gray-500">{email}</span>
                  {classe && <span className="text-sm text-gray-400">• {classe}</span>}
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 - Informations personnelles */}
          <div className="bg-white border border-gray-100 rounded-2xl mb-6 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-gray-50/30">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-xl">
                  <User size={20} className="text-[#002366]" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#002366]">Informations personnelles</h2>
                  <p className="text-gray-400 text-sm">Mettez à jour vos coordonnées et votre biographie.</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-600 mb-2">Prénom</label>
                  <input 
                    type="text" 
                    value={prenom} 
                    onChange={(e) => setPrenom(e.target.value)} 
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#002366] focus:ring-2 focus:ring-[#002366]/10 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-600 mb-2">Nom</label>
                  <input 
                    type="text" 
                    value={nom} 
                    onChange={(e) => setNom(e.target.value)} 
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#002366] focus:ring-2 focus:ring-[#002366]/10 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-600 mb-2 flex items-center gap-2">
                    <Phone size={16} /> Téléphone
                  </label>
                  <input 
                    type="tel" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#002366] focus:ring-2 focus:ring-[#002366]/10 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-600 mb-2 flex items-center gap-2">
                    <Mail size={16} /> Email
                  </label>
                  <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#002366] focus:ring-2 focus:ring-[#002366]/10 transition-all"
                  />
                </div>
              </div>
              <div className="mt-6">
                <label className="block text-sm font-bold text-gray-600 mb-2 flex items-center gap-2">
                  <FileText size={16} /> Biographie
                </label>
                <textarea 
                  rows="4" 
                  value={biographie} 
                  onChange={(e) => setBiographie(e.target.value)} 
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#002366] focus:ring-2 focus:ring-[#002366]/10 transition-all resize-none"
                  placeholder="Parlez-nous un peu de vous..."
                />
              </div>
              <div className="flex justify-end mt-8">
                <button 
                  onClick={ProfileUpdate} 
                  disabled={updating}
                  className="px-8 py-3 bg-[#002366] text-white rounded-xl font-bold text-sm hover:bg-orange-500 transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  {updating ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Save size={18} />
                  )}
                  {updating ? "Enregistrement..." : "Enregistrer les modifications"}
                </button>
              </div>
            </div>
          </div>

          {/* Card 3 - Mot de passe */}
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-gray-50/30">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-50 rounded-xl">
                  <Lock size={20} className="text-orange-500" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#002366]">Mot de passe</h2>
                  <p className="text-gray-400 text-sm">Choisissez un mot de passe d'au moins 6 caractères.</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              {passwordSuccess && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-2 text-green-600">
                  <CheckCircle size={20} />
                  {passwordSuccess}
                </div>
              )}
              {passwordError && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-600">
                  <AlertCircle size={20} />
                  {passwordError}
                </div>
              )}
              
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-600 mb-2">Mot de passe actuel</label>
                <input 
                  type="password" 
                  value={current_password} 
                  onChange={(e) => setCurrentPassword(e.target.value)} 
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#002366] focus:ring-2 focus:ring-[#002366]/10 transition-all"
                  placeholder="••••••••"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-600 mb-2">Nouveau mot de passe</label>
                  <input 
                    type="password" 
                    value={new_password} 
                    onChange={(e) => setNewPassword(e.target.value)} 
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#002366] focus:ring-2 focus:ring-[#002366]/10 transition-all"
                    placeholder="••••••••"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-600 mb-2">Confirmer le mot de passe</label>
                  <input 
                    type="password" 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    className={`w-full px-4 py-3 border rounded-xl text-sm outline-none transition-all ${
                      passwordError && confirmPassword ? 'border-red-400 focus:ring-red-100' : 'border-gray-200 focus:border-[#002366] focus:ring-2 focus:ring-[#002366]/10'
                    }`}
                    placeholder="••••••••"
                  />
                </div>
              </div>
              <div className="flex justify-end mt-8">
                <button 
                  onClick={Passwordchange} 
                  disabled={changingPassword}
                  className="px-8 py-3 bg-orange-500 text-white rounded-xl font-bold text-sm hover:bg-orange-600 transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  {changingPassword ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <KeyRound size={18} />
                  )}
                  {changingPassword ? "Modification..." : "Modifier le mot de passe"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}