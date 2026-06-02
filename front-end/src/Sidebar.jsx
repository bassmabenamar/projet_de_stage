import React from "react";
import {LayoutDashboard,MapPin,Users,GraduationCap,BookOpen,ClipboardList,CalendarX,FileText,CalendarDays,CreditCard,MessageSquare,MessageSquareWarning,UserCircle,School} from "lucide-react";
import { useNavigate,useLocation } from "react-router-dom";

export function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();

    function Adashboard(){
      navigate("/Dashboard")
    }
    function Amessages(){
      navigate("/Messages")
    }
    function Aetudiants(){
      navigate("/ListeEtudiants")
    }
    function Aformateurs(){
      navigate("/ListeFormateurs")
    }
    function Aclasses(){
      navigate("/ListeClasses")
    }
    function Asalles(){
      navigate("/ListeSalles")
    }
    function Anotes(){
      navigate("/Notes")
    }
    function Aabsences(){
      navigate("/Absences")
    }
    function Aprofil(){
      navigate("/Profile")
    }
    function Afiliere(){
      navigate("/ListeFiliere")
    }

   const isFormateurRoute =
      location.pathname.startsWith("/ListeFormateurs") ||
      location.pathname.startsWith("/AjouterFormateur") ||
      location.pathname.startsWith("/ModifierFormateur") ||
      location.pathname.startsWith("/DetailsFormateur");

   const isEtudiantRoute =
      location.pathname.startsWith("/ListeEtudiants") ||
      location.pathname.startsWith("/AjouterEtudiant") ||
      location.pathname.startsWith("/ModifierEtudiant") ||
      location.pathname.startsWith("/DetailsEtudiant");
   
   const isClassesRoute =
      location.pathname.startsWith("/ListeClasses") ||
      location.pathname.startsWith("/DetailsClasse") ||
      location.pathname.startsWith("/AjouterClasse") ||
      location.pathname.startsWith("/ModifierClasse");

   const isSallesRoute =
      location.pathname.startsWith("/ListeSalles") ||
      location.pathname.startsWith("/AjouterSalle") ||
      location.pathname.startsWith("/ModifierSalle") ||
      location.pathname.startsWith("/DetailsSalle");
   
   const isFiliereRoute =
      location.pathname.startsWith("/ListeFiliere") ||
      location.pathname.startsWith("/AjouterFiliere") ||
      location.pathname.startsWith("/ModifierFiliere");

    return (
        <div className="w-64 flex flex-col h-full bg-white border-r shadow-sm">
        {/* Logo et Photo */}
        <div className="p-2 border-b flex items-center justify-between">
            <div className="flex items-center gap-0.5">
                <img src="/amity.png" alt="Logo" className="w-20 h-20"/>
                <div>
                <h1 className="text-lg font-semibold font-bold" style={{ color: "#2F5D9F" }}><strong> AMITY SCHOOL</strong></h1>
                <p className="text-xs text-gray-500">Administrateur</p>
                </div>
            </div>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {/* Tableau de bord - ACTIF */}
            <p onClick={Adashboard} 
               className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium w-full cursor-pointer transition-all duration-300 border-l-4
                ${location.pathname !== "/Dashboard" ? "hover:translate-x-1 hover:shadow-md hover:text-[#2F5D9F] hover:bg-orange-50 hover:border-l-[#E55B2D]" : ""} 
                ${location.pathname === "/Dashboard" ? "bg-[#E55B2D] text-white border-l-[#E55B2D]" : "border-l-transparent text-[#2F5D9F]"}`}>
               <LayoutDashboard className="w-5 h-5" />
               Tableau de bord
            </p>

            {/* Messages */}
            <p onClick={Amessages} 
               className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium w-full cursor-pointer transition-all duration-300 border-l-4
                ${location.pathname !== "/Messages" ? "hover:translate-x-1 hover:shadow-md hover:text-[#2F5D9F] hover:bg-orange-50 hover:border-l-[#E55B2D]" : ""} 
                ${location.pathname === "/Messages" ? "bg-[#E55B2D] text-white border-l-[#E55B2D]" : "border-l-transparent text-[#2F5D9F]"}`}>
               <MessageSquare className="w-5 h-5" />
               Messages
            </p>

            {/* Étudiants */}
            <p onClick={Aetudiants} 
               className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium w-full cursor-pointer transition-all duration-300 border-l-4
                  ${!isEtudiantRoute
                  ? "hover:translate-x-1 hover:shadow-md hover:text-[#2F5D9F] hover:bg-orange-50 hover:border-l-[#E55B2D]"
                  : ""} 
                ${isEtudiantRoute
                  ? "bg-[#E55B2D] text-white border-l-[#E55B2D]"
                  : "border-l-transparent text-[#2F5D9F]"}`}>
               <Users className="w-5 h-5" />
               Étudiants
            </p>

            {/* Formateurs */}
            <p onClick={Aformateurs} 
               className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium w-full cursor-pointer transition-all duration-300 border-l-4
                ${!isFormateurRoute
                  ? "hover:translate-x-1 hover:shadow-md hover:text-[#2F5D9F] hover:bg-orange-50 hover:border-l-[#E55B2D]"
                  : ""} 
                ${isFormateurRoute
                  ? "bg-[#E55B2D] text-white border-l-[#E55B2D]"
                  : "border-l-transparent text-[#2F5D9F]"}`}>
               <GraduationCap className="w-5 h-5" />
               Formateurs
            </p>

            {/* Classes */}
            <p onClick={Aclasses} 
               className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium w-full cursor-pointer transition-all duration-300 border-l-4
                ${!isClassesRoute
                  ? "hover:translate-x-1 hover:shadow-md hover:text-[#2F5D9F] hover:bg-orange-50 hover:border-l-[#E55B2D]"
                  : ""} 
                ${isClassesRoute
                  ? "bg-[#E55B2D] text-white border-l-[#E55B2D]"
                  : "border-l-transparent text-[#2F5D9F]"}`}>
               <BookOpen className="w-5 h-5" />
               Classes
            </p>

            {/* Salles */}
            <p onClick={Asalles} 
               className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium w-full cursor-pointer transition-all duration-300 border-l-4
                ${!isSallesRoute
                  ? "hover:translate-x-1 hover:shadow-md hover:text-[#2F5D9F] hover:bg-orange-50 hover:border-l-[#E55B2D]"
                  : ""} 
                ${isSallesRoute
                  ? "bg-[#E55B2D] text-white border-l-[#E55B2D]"
                  : "border-l-transparent text-[#2F5D9F]"}`}>
               <MapPin className="w-5 h-5" />
               Salles
            </p>

            {/* filières */}
            <p onClick={Afiliere}
               className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium w-full cursor-pointer transition-all duration-300 border-l-4
                ${!isFiliereRoute
                  ? "hover:translate-x-1 hover:shadow-md hover:text-[#2F5D9F] hover:bg-orange-50 hover:border-l-[#E55B2D]"
                  : ""} 
                ${isFiliereRoute
                  ? "bg-[#E55B2D] text-white border-l-[#E55B2D]"
                  : "border-l-transparent text-[#2F5D9F]"}`}>
               <GraduationCap className="w-5 h-5" />
               Filières
            </p>

            {/* Matières */}
            <p 
               className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium w-full cursor-pointer transition-all duration-300 border-l-4
                ${location.pathname !== "/Matières" ? "hover:translate-x-1 hover:shadow-md hover:text-[#2F5D9F] hover:bg-orange-50 hover:border-l-[#E55B2D]" : ""} 
                ${location.pathname === "/Matières" ? "bg-[#E55B2D] text-white border-l-[#E55B2D]" : "border-l-transparent text-[#2F5D9F]"}`}>
               <ClipboardList className="w-5 h-5" />
               Matières
            </p>

            {/* Notes */}
            <p onClick={Anotes} 
               className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium w-full cursor-pointer transition-all duration-300 border-l-4
                ${location.pathname !== "/Notes" ? "hover:translate-x-1 hover:shadow-md hover:text-[#2F5D9F] hover:bg-orange-50 hover:border-l-[#E55B2D]" : ""} 
                ${location.pathname === "/Notes" ? "bg-[#E55B2D] text-white border-l-[#E55B2D]" : "border-l-transparent text-[#2F5D9F]"}`}>
               <FileText className="w-5 h-5" />
               Notes
            </p>

            {/* Absences */}
            <p onClick={Aabsences} 
               className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium w-full cursor-pointer transition-all duration-300 border-l-4
                ${location.pathname !== "/Absences" ? "hover:translate-x-1 hover:shadow-md hover:text-[#2F5D9F] hover:bg-orange-50 hover:border-l-[#E55B2D]" : ""} 
                ${location.pathname === "/Absences" ? "bg-[#E55B2D] text-white border-l-[#E55B2D]" : "border-l-transparent text-[#2F5D9F]"}`}>
               <CalendarX className="w-5 h-5" />
               Absences
            </p>

            {/* Devoirs */}
            <p  
               className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium w-full cursor-pointer transition-all duration-300 border-l-4
                ${location.pathname !== "/Devoirs" ? "hover:translate-x-1 hover:shadow-md hover:text-[#2F5D9F] hover:bg-orange-50 hover:border-l-[#E55B2D]" : ""} 
                ${location.pathname === "/Devoirs" ? "bg-[#E55B2D] text-white border-l-[#E55B2D]" : "border-l-transparent text-[#2F5D9F]"}`}>
               <FileText className="w-5 h-5" />
               Devoirs
            </p>

            {/* Activités */}
            <p  
               className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium w-full cursor-pointer transition-all duration-300 border-l-4
                ${location.pathname !== "/Activités" ? "hover:translate-x-1 hover:shadow-md hover:text-[#2F5D9F] hover:bg-orange-50 hover:border-l-[#E55B2D]" : ""} 
                ${location.pathname === "/Activités" ? "bg-[#E55B2D] text-white border-l-[#E55B2D]" : "border-l-transparent text-[#2F5D9F]"}`}>
               <CalendarDays className="w-5 h-5" />
               Activités
            </p>

            {/* Paiements */}
            <p  
               className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium w-full cursor-pointer transition-all duration-300 border-l-4
                ${location.pathname !== "/Paiements" ? "hover:translate-x-1 hover:shadow-md hover:text-[#2F5D9F] hover:bg-orange-50 hover:border-l-[#E55B2D]" : ""} 
                ${location.pathname === "/Paiements" ? "bg-[#E55B2D] text-white border-l-[#E55B2D]" : "border-l-transparent text-[#2F5D9F]"}`}>
               <CreditCard className="w-5 h-5" />
               Paiements
            </p>

            {/* Remarques */}
            <p  
               className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium w-full cursor-pointer transition-all duration-300 border-l-4
                ${location.pathname !== "/Remarques" ? "hover:translate-x-1 hover:shadow-md hover:text-[#2F5D9F] hover:bg-orange-50 hover:border-l-[#E55B2D]" : ""} 
                ${location.pathname === "/Remarques" ? "bg-[#E55B2D] text-white border-l-[#E55B2D]" : "border-l-transparent text-[#2F5D9F]"}`}>
               <MessageSquareWarning className="w-5 h-5" />
               Remarques
            </p>
        </nav>
        
        <div className="p-4 border-t">
            <p onClick={Aprofil} 
               className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium w-full cursor-pointer transition-all duration-300 border-l-4
                ${location.pathname !== "/Profile" ? "hover:translate-x-1 hover:shadow-md hover:text-[#2F5D9F] hover:bg-orange-50 hover:border-l-[#E55B2D]" : ""} 
                ${location.pathname === "/Profile" ? "bg-[#E55B2D] text-white border-l-[#E55B2D]" : "border-l-transparent text-[#2F5D9F]"}`}>
               <UserCircle className="w-5 h-5" />
               Mon Profil
            </p>
        </div>
        </div>
    );
}