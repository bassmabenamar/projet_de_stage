import React, { useMemo } from "react";
import {
  LayoutDashboard, Users, GraduationCap, BookOpen,
  ClipboardList, CalendarX, FileText, CalendarDays,
  CreditCard, MessageSquare, MessageSquareWarning,
  UserCircle, Bus, Clock, MapPin, School,
} from "lucide-react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Topbar } from "../component/Navbar";

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const isMessages = location.pathname.includes("/messages");

  const activeKey = useMemo(() => {
    const p = location.pathname;
    if (p.includes("/dashboard"))   return "dashboard";
    if (p.includes("/matieres"))    return "matieres";
    if (p.includes("/activites"))   return "activites";
    if (p.includes("/salle"))       return "salle";
    if (p.includes("/transports"))  return "transports";
    if (p.includes("/devoirs"))     return "devoirs";
    if (p.includes("/paiements"))   return "paiements";
    if (p.includes("/remarques"))   return "remarques";
    if (p.includes("/niveaux"))     return "niveaux";
    if (p.includes("/caisse"))      return "caisse";
    if (p.includes("/messages"))    return "messages";
    if (p.includes("/etudiants"))   return "etudiants";
    if (p.includes("/formateurs"))  return "formateurs";
    if (p.includes("/notes"))       return "notes";
    if (p.includes("/absences"))    return "absences";
    if (p.includes("/timetable"))   return "timetable";
    if (p.includes("/classes"))     return "classes";
    if (p.includes("/filieres"))    return "filieres";
    if (p.includes("/matieres"))    return "matieres";
    return "dashboard";
  }, [location.pathname]);

  const sidebarItems = [
    { key: "dashboard",  label: "Tableau de bord",  icon: LayoutDashboard,      to: "/admin/dashboard"  },
    { key: "messages",   label: "Messages",          icon: MessageSquare,        to: "/admin/messages"   },
    { key: "etudiants",  label: "Étudiants",         icon: Users,                to: "/admin/etudiants"  },
    { key: "formateurs", label: "Formateurs",        icon: GraduationCap,        to: "/admin/formateurs" },
    { key: "classes",    label: "Classes",           icon: BookOpen,             to: "/admin/classes"    },
    { key: "salle",      label: "Salles",            icon: MapPin,               to: "/admin/salle"      },
    { key: "filieres",   label: "Filières",          icon: School,               to: "/admin/filieres"   },
    { key: "subjects",   label: "Matières",          icon: ClipboardList,        to: "/admin/matieres"   },
    { key: "notes",      label: "Notes",             icon: FileText,             to: "/admin/notes"      },
    { key: "absences",   label: "Absences",          icon: CalendarX,            to: "/admin/absences"   },
    { key: "devoirs",    label: "Devoirs",           icon: FileText,             to: "/admin/devoirs"    },
    { key: "activites",  label: "Activités",         icon: CalendarDays,         to: "/admin/activites"  },
    { key: "timetable",  label: "Emploi du temps",   icon: Clock,                to: "/admin/timetable"  },
    { key: "paiements",  label: "Paiements",         icon: CreditCard,           to: "/admin/paiements"  },
    { key: "caisse",     label: "Caisse",            icon: ClipboardList,        to: "/admin/caisse"     },
    { key: "remarques",  label: "Remarques",         icon: MessageSquareWarning, to: "/admin/remarques"  },
    { key: "transports", label: "Transports",        icon: Bus,                  to: "/admin/transports" },
    { key: "niveaux",    label: "Niveaux scolaires", icon: GraduationCap,        to: "/admin/niveaux"    },
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
      <aside className="w-64 flex flex-col h-screen bg-white border-r shadow-sm flex-shrink-0">
        <div className="p-2 border-b flex items-center justify-between">
          <div className="flex items-center gap-0.5">
            <img src="/amity.png" alt="Logo" className="w-20 h-20" />
            <div>
              <h1 style={{ color: "#2F5D9F"}} className="text-lg font-bold ml-16px" style={{ color: "#2F5D9F" }}>
                <strong>AMITY</strong>
              </h1>
              <p>International School</p>
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
                onClick={() => navigate(it.to)}
                className={itemClass(it.key)}
              >
                <Icon className="w-5 h-5" />
                {it.label}
              </p>
            );
          })}
        </nav>

        <div className="p-4 border-t">
          <p
            className={itemClass("profil")}
            onClick={() => navigate("/profile")}
          >
            <UserCircle className="w-5 h-5" />
            Mon Profil
          </p>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar />
        <main className={`flex-1 min-h-0 ${isMessages ? "overflow-hidden" : "overflow-y-auto p-6"}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}