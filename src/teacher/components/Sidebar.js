import React, { useState } from "react";
import {
  LayoutDashboard,
  Star,
  BookOpen,
  UserCheck,
  Calendar,
  MessageSquare,
  Bell,
  LogOut,
  Settings,
  User,
  GraduationCap,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);

  const menuItems = [
    { label: "Dashboard", path: "/", icon: <LayoutDashboard /> },
    { label: "Grades", path: "/grades", icon: <Star /> },
    { label: "Homework", path: "/homework", icon: <BookOpen /> },
    { label: "Attendance", path: "/attendance", icon: <UserCheck /> },
    { label: "Timetable", path: "/timetable", icon: <Calendar /> },
    { label: "Messages", path: "/messages", icon: <MessageSquare /> },
    { label: "Notifications", path: "/notifications", icon: <Bell /> },
  ];

  const bottomItems = [
    { label: "Profile", path: "/profile", icon: <User /> },
    { label: "Settings", path: "/settings", icon: <Settings /> },
    { label: "Logout", path: "/logout", icon: <LogOut /> },
  ];

  const Item = ({ label, path, icon }) => {
    const isActive = active === path;

    return (
      <Link to={path} onClick={() => setActive(path)}>
        <p
          className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium w-full cursor-pointer transition-all duration-300 border-l-4
          ${
            !isActive
              ? "hover:translate-x-1 hover:shadow-md hover:text-[#2F5D9F] hover:bg-orange-50 hover:border-l-[#E55B2D] text-[#2F5D9F] border-l-transparent"
              : "bg-[#E55B2D] text-white border-l-[#E55B2D]"
          }`}
        >
          {icon}
          {label}
        </p>
      </Link>
    );
  };

  return (
    <div className="w-64 flex flex-col h-screen bg-white border-r shadow-sm">

      {/* Logo */}
      <div className="p-4 border-b flex items-center gap-3">
        <GraduationCap className="w-10 h-10 text-[#2F5D9F]" />
        <div>
          <h1 className="text-lg font-bold text-[#2F5D9F]">
            EduElite
          </h1>
          <p className="text-xs text-gray-500">Management</p>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        <p className="text-xs font-bold text-gray-400 uppercase mb-3">
          Main Menu
        </p>

        {menuItems.map((item) => (
          <Item key={item.path} {...item} />
        ))}
      </nav>

      {/* Bottom */}
      <div className="p-4 border-t space-y-1">
        {bottomItems.map((item) => (
          <Item key={item.path} {...item} />
        ))}
      </div>
    </div>
  );
}