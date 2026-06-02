import React from "react";
import {
  LayoutDashboard,
  Star,
  BookOpen,
  UserCheck,
  Calendar,
  MessageSquare,
  LogOut,
  User,
  GraduationCap,
  Users,FolderOpen,

  ListTodo
} from "lucide-react";

import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const currentPath = location.pathname;

  const menuItems = [
    {
      label: "Tableau de Bord",
      path: "/teacher/dashboard",
      icon: <LayoutDashboard />
    },
    {
      label: "Notes",
      path: "/grades",
      icon: <Star />
    },
    {
      label: "Devoirs",
      path: "/homework",
      icon: <BookOpen />
    },
    {
      label: "Tâches",
      path: "/tasks",
      icon: <ListTodo />
    },
    {
      label: "Présences",
      path: "/attendance",
      icon: <UserCheck />
    },
    
    {
      label: "Emploi du Temps",
      path: "/timetable",
      icon: <Calendar />
    },
    {
      label: "Messages",
      path: "/messages",
      icon: <MessageSquare />
    },
    { label: "Ressources", path: "/ressources", icon: <FolderOpen /> }
  ];

 

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login", { replace: true });
  };

  const Item = ({ label, path, icon }) => {
    const isActive =
      currentPath === path ||
      (path !== "/" && currentPath.startsWith(path));

    return (
      <Link to={path} className="block w-full">
        <div
          className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium w-full cursor-pointer transition-all duration-300 border-l-4
          ${
            !isActive
              ? "hover:translate-x-1 hover:shadow-md hover:text-[#2F5D9F] hover:bg-orange-50 hover:border-l-[#E55D2D] text-[#2F5D9F] border-l-transparent"
              : "bg-[#E55D2D] text-white border-l-[#E55D2D]"
          }`}
        >
          {React.cloneElement(icon, { size: 18 })}
          <span>{label}</span>
        </div>
      </Link>
    );
  };

  return (
    <div className="w-64 flex flex-col min-h-screen bg-white border-r shadow-sm select-none">

      <div className="p-4 border-b flex items-center gap-3">
        <GraduationCap className="w-10 h-10 text-[#2F5D9F]" />

        <div>
          <h1 className="text-lg font-bold text-[#2F5D9F]">
            Amity School
          </h1>

          <p className="text-xs text-gray-500">
            Gestion Scolaire
          </p>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">

        <p className="text-xs font-bold text-gray-400 uppercase mb-3 ml-1">
          Menu Principal
        </p>

        {menuItems.map((item) => (
          <Item key={item.path} {...item} />
        ))}

      </nav>

      <div className="p-4 border-t space-y-1">

        
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium w-full text-red-500 hover:bg-red-50 transition-all"
        >
          <LogOut size={18} />
          <span>Déconnexion</span>
        </button>

      </div>
    </div>
  );
}