import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard, MessageSquare, UserCircle, Clock,
  ClipboardCheck, CalendarX, FileText, CalendarDays,
  CreditCard, Settings, Bell, Library, VideoIcon
} from "lucide-react";

export default function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { id: "dashboard",     label: "Tableau de bord",  path: "/student/dashboard",      icon: <LayoutDashboard size={20} /> },
    { id: "messages",      label: "Messages",          path: "/student/messages",        icon: <MessageSquare size={20} /> },
    { id: "notifications", label: "Notifications",     path: "/student/notifications",   icon: <Bell size={20} /> },
    { id: "timetable",     label: "Emploi du temps",   path: "/student/timetable",       icon: <Clock size={20} /> },
    { id: "grades",        label: "Mes Notes",         path: "/student/grades",          icon: <ClipboardCheck size={20} /> },
    { id: "attendance",    label: "Absences",          path: "/student/attendance",      icon: <CalendarX size={20} /> },
    { id: "homework",      label: "Devoirs",           path: "/student/homework",        icon: <FileText size={20} /> },
    { id: "activities",    label: "Activités",         path: "/student/activities",      icon: <CalendarDays size={20} /> },
    { id: "payment",       label: "Paiement",          path: "/student/payment",         icon: <CreditCard size={20} /> },
    { id: "library",       label: "Bibliothèque",      path: "/student/library",         icon: <Library size={20} /> },
    { id: "tutorials",     label: "Tutoriels",         path: "/student/tutorials",       icon: <VideoIcon size={20} /> },
    { id: "settings",      label: "Paramètres",        path: "/student/settings",        icon: <Settings size={20} /> },
  ];

  return (
    <div className="w-64 flex flex-col h-full bg-white border-r shadow-sm">
      <div className="p-2 border-b flex items-center justify-between">
        <div className="flex items-center gap-0.5">
          <img src="/logoo.jpeg" alt="Logo" className="w-20 h-20" />
          <div>
            <h1 className="text-lg font-bold" style={{ color: "#2F5D9F" }}>AMITY SCHOOL</h1>
            <p className="text-xs text-gray-500 font-medium">Étudiant</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium w-full transition-all duration-300 border-l-4
              ${location.pathname !== item.path
                ? "border-l-transparent hover:translate-x-1 hover:shadow-md hover:text-[#2F5D9F] hover:bg-orange-50 hover:border-l-[#E55B2D] text-[#2F5D9F]"
                : "bg-[#E55B2D] text-white border-l-[#E55B2D]"
              }`}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t">
        <Link
          to="/student/profile"
          className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium w-full transition-all duration-300 border-l-4
            ${location.pathname !== "/student/profile"
              ? "border-l-transparent hover:translate-x-1 hover:shadow-md hover:text-[#2F5D9F] hover:bg-orange-50 hover:border-l-[#E55B2D] text-[#2F5D9F]"
              : "bg-[#E55B2D] text-white border-l-[#E55B2D]"
            }`}
        >
          <UserCircle className="w-5 h-5" />
          Mon Profil
        </Link>
      </div>
    </div>
  );
}