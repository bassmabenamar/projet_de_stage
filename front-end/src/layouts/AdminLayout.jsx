import React, { useMemo } from "react";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  ClipboardList,
  CalendarX,
  FileText,
  CalendarDays,
  CreditCard,
  MessageSquare,
  MessageSquareWarning,
  UserCircle,
  Bus,
} from "lucide-react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Topbar } from "../component/Navbar";

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const isMessages = location.pathname.includes("/messages");

  const activeKey = useMemo(() => {
    const p = location.pathname;
    if (p === "/" || p.endsWith("/dashboard")) return "dashboard";
    if (p.endsWith("/subjects")) return "subjects";
    if (p.endsWith("/activites")) return "activites";
    if (p.endsWith("/salle")) return "salle";
    if (p.endsWith("/transports")) return "transports";
    if (p.endsWith("/devoirs")) return "devoirs";
    if (p.includes("/paiements")) return "paiements";
    if (p.endsWith("/remarques")) return "remarques";
    if (p.includes("/niveaux")) return "niveaux";
    if (p.includes("/caisse")) return "caisse";
    if (p.includes("/messages")) return "messages";
    return "dashboard";
  }, [location.pathname]);

  const sidebarItems = [
    { key: "dashboard", label: "Tableau de bord", icon: LayoutDashboard, to: "/dashboard" },
    { key: "subjects",  label: "Matières",         icon: ClipboardList,   to: "/subjects"  },
    { key: "activites", label: "Activités",         icon: CalendarDays,    to: "/activites" },
    { key: "salle",     label: "Salles",            icon: BookOpen,        to: "/salle"     },
    { key: "messages",  label: "Messages",          icon: MessageSquare,   to: "/messages"  },
    { key: "etudiants", label: "Étudiants",         icon: Users,           to: null         },
    { key: "formateurs",label: "Formateurs",        icon: GraduationCap,   to: null         },
    { key: "notes",     label: "Notes",             icon: FileText,        to: null         },
    { key: "absences",  label: "Absences",          icon: CalendarX,       to: null         },
    { key: "devoirs",   label: "Devoirs",           icon: FileText,        to: "/devoirs"   },
    { key: "paiements", label: "Paiements",         icon: CreditCard,      to: "/paiements" },
    { key: "caisse",    label: "Caisse",            icon: ClipboardList,   to: "/caisse"    },
    { key: "remarques", label: "Remarques",         icon: MessageSquareWarning, to: "/remarques" },
    { key: "transports",label: "Transports",        icon: Bus,             to: "/transports"},
    { key: "niveaux",   label: "Niveaux scolaires", icon: GraduationCap,   to: "/niveaux"   },
  ];

  const itemClass = (key) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium w-full cursor-pointer transition-all duration-300 border-l-4 ${
      activeKey !== key
        ? "hover:translate-x-1 hover:shadow-md hover:text-[#2F5D9F] hover:bg-orange-50 hover:border-l-[#E55B2D]"
        : ""
    } ${
      activeKey === key
        ? "bg-[#E55B2D] text-white border-l-[#E55B2D]"
        : "border-l-transparent text-[#2F5D9F]"
    }`;

  return (
    <div className="h-screen w-full bg-white flex overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 flex flex-col h-screen bg-white border-r shadow-sm flex-shrink-0">
        <div className="p-2 border-b flex items-center justify-between">
          <div className="flex items-center gap-0.5">
            <img src="/amity.png" alt="Logo" className="w-20 h-20" />
            <div>
              <h1 className="text-lg font-semibold font-bold" style={{ color: "#2F5D9F" }}>
                <strong>AMITY SCHOOL</strong>
              </h1>
              <p className="text-xs text-gray-500">Administrateur</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {sidebarItems.map((it) => {
            const Icon = it.icon;
            return (
              <p
                key={it.key}
                onClick={() => { if (it.to) navigate(it.to); }}
                className={itemClass(it.key)}
              >
                <Icon className="w-5 h-5" />
                {it.label}
              </p>
            );
          })}
        </nav>

        <div className="p-4 border-t">
          <p className={itemClass("profil")} onClick={() => {}}>
            <UserCircle className="w-5 h-5" />
            Mon Profil
          </p>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar />
        {/* Messages gets no padding and no scroll (manages itself) */}
        {/* All other pages get padding + scroll */}
        <main className={`flex-1 min-h-0 ${isMessages ? "overflow-hidden" : "overflow-y-auto p-6"}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}