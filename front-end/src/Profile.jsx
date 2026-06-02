import React, { useState,useEffect } from "react";
import { User, Lock, KeyRound } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate()

  const [nom,setNom] = useState("");
  const [prenom,setPrenom] = useState("");
  const [email,setEmail] = useState("");
  const [profile_image,setProfileImage] = useState(null);
  const [biographie,setBiographie] = useState("");
  const [phone,setPhone] = useState("");

  const [current_password,setCurrentPassword] = useState("");
  const [new_password,setNewPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("")
  const [passwordError, setPasswordError] = useState("");

  const [user, setUser] = useState(null);
  useEffect(() => {
    async function getUser() {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        setUser(res.data);
        console.log(res.data)
        setNom(res.data.nom || "");
        setPrenom(res.data.prenom || "");
        setEmail(res.data.email || "");
        setBiographie(res.data.biographie || "");
        setPhone(res.data.phone || "");
      } catch (error) {
        console.log(error);
      }
    }

    getUser();
  }, []);

  const imageUrl = user?.profile_image
    ? `http://127.0.0.1:8000/storage/${user.profile_image}`
    : null;


  const initials = `${user?.prenom?.[0] || ""}${user?.nom?.[0] || ""}`.toUpperCase();

  function onchangeNom(e){
    setNom(e.target.value)
  }
  function onchangePrenom(e){
    setPrenom(e.target.value)
  }
  function onchangeEmail(e){
    setEmail(e.target.value)
  }
  function onchangeProfileImage(e){
    setProfileImage(e.target.files[0])
  }
  function onchangeBiographie(e){
    setBiographie(e.target.value)
  }
  function onchangePhone(e){
    setPhone(e.target.value)
  }
  function onchangeCurrentPassword(e){
    setCurrentPassword(e.target.value)
  }
  function onchangeNewPassword(e){
    setNewPassword(e.target.value)
  }
  function onchangeConfirmPassword(e){
    setConfirmPassword(e.target.value);
  }

  useEffect(() => {
    if (confirmPassword && new_password !== confirmPassword) {
      setPasswordError("Les mots de passe ne correspondent pas");
    } else {
      setPasswordError("");
    }
  }, [new_password, confirmPassword]);

  async function ProfileUpdate() {
    try {
    const formData = new FormData();
    formData.append("prenom", prenom);
    formData.append("nom", nom);
    formData.append("email", email);
    formData.append("biographie", biographie);
    formData.append("phone", phone);
    if (profile_image) formData.append("profile_image", profile_image);
    formData.append("_method", "PUT");
    const res = await axios.post(`http://127.0.0.1:8000/api/profile`,formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      }
    )
    if (res.status === 200) {
      navigate("/Dashboard");
    }
    } catch (err) {
      console.log(err.response.data);
    }
            
  }

    async function Passwordchange() {
      try {
      if (!current_password || !new_password || !confirmPassword) {
        setPasswordError("Veuillez remplir tous les champs");
        return;
      }

      if (new_password !== confirmPassword) {
        setPasswordError("Les mots de passe ne correspondent pas");
        return;
      }

      const formData = new FormData();
      formData.append("current_password", current_password);
      formData.append("new_password", new_password);
      formData.append("_method", "PUT");
      const res = await axios.post(`http://127.0.0.1:8000/api/profile/change-password`,formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        }     
        )
        if (res.status === 200) {
          navigate("/Dashboard");
        }
        } catch (err) {
        console.log(err);
      }       
    }
   
    if (!user) {
      return <div>Loading...</div>;
    }

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col overflow-auto">
        <div className="p-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-semibold m-0 mb-2 text-gray-800">Profil</h1>
            <p className="text-gray-500 m-0">Gérez vos informations personnelles et vos identifiants.</p>
          </div>

          {/* Card 1 - Profile Header */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#2F5D9F] to-[#E55B2D] flex items-center justify-center overflow-hidden">
                {imageUrl ? (
                  <img src={imageUrl} alt={user?.nom} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-lg font-medium text-white">{initials}</span>
                )}
              </div>
              
              {/* Info */}
              <div>
                <h2 className="text-xl font-semibold m-0 mb-2 text-gray-800">{user?.nom} {user?.prenom}</h2>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="bg-gray-100 px-2 py-1 rounded text-xs text-gray-600">{user?.role}</span>
                  <span className="text-sm text-gray-500">{user?.email}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 - Informations personnelles */}
          <div className="bg-white border border-gray-200 rounded-xl mb-6">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <User size={20} className="text-gray-500" />
                <h2 className="text-xl font-semibold m-0 text-gray-800">Informations personnelles</h2>
              </div>
              <p className="text-gray-500 text-sm mt-2 m-0">Mettez à jour vos coordonnées et votre biographie.</p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Prénom</label>
                  <input type="text" value={prenom} onChange={onchangePrenom} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all"/>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Nom</label>
                  <input type="text" value={nom} onChange={onchangeNom} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all"/>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Téléphone</label>
                  <input type="tel" value={phone} onChange={onchangePhone} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all"/>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Photo (Fichier)</label>
                  <input type="file" onChange={onchangeProfileImage} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all"/>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 text-gray-700">Email</label>
                <input type="text" value={email} onChange={onchangeEmail} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all"/>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 text-gray-700">Biographie</label>
                <textarea rows="3" value={biographie} onChange={onchangeBiographie} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all font-inherit"/>
              </div>
              <div className="flex justify-end">
                <button onClick={ProfileUpdate} className="px-4 py-2 bg-[#2F5D9F] text-white border-none rounded-lg cursor-pointer font-medium hover:bg-[#244A80] transition-colors">
                  Enregistrer
                </button>
              </div>
            </div>
          </div>

          {/* Card 3 - Mot de passe */}
          <div className="bg-white border border-gray-200 rounded-xl mb-6">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <Lock size={20} className="text-gray-500" />
                <h2 className="text-xl font-semibold m-0 text-gray-800">Mot de passe</h2>
              </div>
              <p className="text-gray-500 text-sm mt-2 m-0">Choisissez un mot de passe d'au moins 6 caractères.</p>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 text-gray-700">Mot de passe actuel</label>
                <input type="password" value={current_password} onChange={onchangeCurrentPassword} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all"/>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Nouveau mot de passe</label>
                  <input type="password" value={new_password} onChange={onchangeNewPassword} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all"/>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Confirmer le mot de passe</label>
                  <input type="password" value={confirmPassword} onChange={onchangeConfirmPassword} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/100 transition-all"/>
                  <p style={{color:"red"}}>{passwordError}</p>
                </div>
              </div>
              <div className="flex justify-end">
                <button onClick={Passwordchange} className="px-4 py-2 bg-[#E55B2D] text-white border-none rounded-lg cursor-pointer font-medium hover:bg-[#c44d24] transition-colors">
                  Modifier le mot de passe
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}