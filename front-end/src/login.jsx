import { Mail, Lock, LogIn, HelpCircle } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function onchangeEmail(e) {
    setEmail(e.target.value);
  }
  function onchangePassword(e) {
    setPassword(e.target.value);
  }

  async function SignIn(e) {
    e.preventDefault();
    try {
      const reponse = await axios.post("http://127.0.0.1:8000/api/login", {
        email,
        password,
      });
      const user = reponse.data.user;
      const token = reponse.data.token;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("role", user.role);

      if (user.role === "admin")     navigate("/admin/dashboard");
      if (user.role === "formateur") navigate("/teacher/dashboard");
      if (user.role === "etudiant")  navigate("/student/dashboard");

    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please check your credentials and try again.");
    }
  }

  return (
    <div className="min-h-screen bg-white flex">

      {/* Left Side - Logo */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#2F5D9F] to-[#E55B2D] flex-col items-center justify-center p-12">
        <div className="text-center">
          <div className="bg-white/95 w-32 h-32 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
            <img src="/amity.png" alt="Amity School" className="w-32 h-32 object-contain" />
          </div>
          <h1 className="text-white text-4xl font-bold tracking-tight mb-3">AMITY INTERNATIONNAL SCHOOL</h1>
          <p className="text-white/80 text-sm font-medium">Portail d'excellence académique</p>
          <div className="mt-8 flex justify-center gap-2">
            <div className="w-12 h-1 bg-white/30 rounded-full"></div>
            <div className="w-12 h-1 bg-white/60 rounded-full"></div>
            <div className="w-12 h-1 bg-white/30 rounded-full"></div>
          </div>
          <p className="mt-8 text-white/60 text-xs">L'éducation au cœur de la transformation numérique</p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-[400px]">

          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="bg-gradient-to-br from-[#2F5D9F] to-[#E55B2D] w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <img src="/amity.png" alt="Amity School" className="w-14 h-14 object-contain" />
            </div>
            <h1 className="text-[#2F5D9F] text-2xl font-bold">AMITY SCHOOL</h1>
            <p className="text-gray-400 text-[10px] font-semibold uppercase tracking-wider mt-1">Portail d'excellence académique</p>
          </div>

          {/* Login Card */}
          <div className="bg-white rounded-2xl">
            <div className="mb-6 text-center lg:text-left">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Bienvenue</h2>
              <p className="text-gray-500 text-sm">Connectez-vous à votre compte</p>
            </div>

            <div className="space-y-5">
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-gray-600 uppercase">Email ou nom d'utilisateur</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    value={email}
                    onChange={onchangeEmail}
                    placeholder="Entrez vos identifiants"
                    className="w-full border border-gray-200 rounded-lg py-3.5 pl-11 pr-4 outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/80 transition-all text-sm font-medium text-gray-700 placeholder:text-gray-300"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-gray-600 uppercase">Mot de passe</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="password"
                    value={password}
                    onChange={onchangePassword}
                    placeholder="••••••••"
                    className="w-full border border-gray-200 rounded-lg py-3.5 pl-11 pr-4 outline-none focus:border-[#2F5D9F] focus:ring-2 focus:ring-[#2F5D9F]/80 transition-all text-sm font-medium text-gray-700 placeholder:text-gray-300"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-3.5 h-3.5 rounded border-gray-300 text-[#E55B2D] focus:ring-[#E55B2D]/20" />
                  <span className="text-[11px] text-gray-500">Se souvenir de moi</span>
                </label>
              </div>

              <button
                onClick={SignIn}
                type="submit"
                className="w-full bg-[#E55B2D] text-white py-3.5 rounded-lg font-bold uppercase text-xs tracking-wider flex items-center justify-center gap-2 hover:bg-[#c44d24] transition-all"
              >
                Se connecter <LogIn size={14} />
              </button>
            </div>

            {/* Support Section */}
            <div className="mt-6 pt-6 border-t border-gray-100 text-center">
              <button className="inline-flex items-center gap-1.5 text-[11px] font-medium text-gray-500 hover:text-gray-700 transition-all">
                Besoin d'aide ? <HelpCircle size={14} />
                <span className="underline underline-offset-2">Contacter le support</span>
              </button>
            </div>

            {/* Copyright mobile */}
            <div className="mt-8 text-center lg:hidden">
              <p className="text-gray-300 text-[9px] font-medium uppercase tracking-wider">
                © 2026 Amity School
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright desktop */}
      <div className="hidden lg:block absolute bottom-4 right-4">
        <p className="text-gray-300 text-[9px] font-medium uppercase tracking-wider">
          © 2026 Amity School
        </p>
      </div>
    </div>
  );
}