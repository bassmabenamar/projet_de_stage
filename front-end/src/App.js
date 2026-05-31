import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import AdminSubjects from "./pages/admin/Matiers";
import SubjectFormPage from "./pages/admin/Subjectformpage";
import AdminActivities from "./pages/admin/Activite";
import ActivityFormPage from "./pages/admin/Activityformpage";
import AdminSalles from "./pages/admin/Salle";
import AdminTransports from "./pages/admin/transport";
import TransportFormPage from "./pages/admin/TransportFormPage";
import AdminRemarques from "./pages/admin/remarque";
import RemarqueFormPage from "./pages/admin/RemarqueFormPage";
import RemarqueDetailsPage from "./pages/admin/RemarqueDetailsPage";
import AdminDevoirs from "./pages/admin/devoirs";
import AdminPaiements from "./pages/admin/paiment";
import PaiementFormPage from "./pages/admin/PaymentFormPage";
import PaiementDetailsPage from "./pages/admin/PaiementDetailsPage";
import AdminNiveaux from "./pages/admin/AdminNiveaux";
import LevelFormPage from "./pages/admin/LevelFormPage";
import AdminCaisse from "./pages/admin/AdminCaisse";
import Messages from "./pages/admin/Messages";
import Login from "./login";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  if (userRole !== "admin") {
    // Redirect to appropriate dashboard based on role
    if (userRole === "formateur") {
      return <Navigate to="/formateur/dashboard" replace />;
    } else if (userRole === "etudiant") {
      return <Navigate to="/etudiant/dashboard" replace />;
    }
  }
  
  return children;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      
      {/* Protected Admin Routes */}
      <Route path="/" element={
        <ProtectedRoute>
          <AdminLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />

        {/* Subjects routes */}
        <Route path="subjects" element={<AdminSubjects />} />
        <Route path="/matieres/nouveau" element={<SubjectFormPage />} />
        <Route path="subjects/modifier/:id" element={<SubjectFormPage />} />

        {/* Activities routes */}
        <Route path="activites" element={<AdminActivities />} />
        <Route path="activites/nouveau" element={<ActivityFormPage />} />
        <Route path="activites/modifier/:id" element={<ActivityFormPage />} />

        {/* Salles */}
        <Route path="salle" element={<AdminSalles />} />
        <Route path="caisse" element={<AdminCaisse />} />
        <Route path="messages" element={<Messages />} />




        {/* Niveaux Scolaires (Moroccan System) */}
        <Route path="niveaux" element={<AdminNiveaux />} />
        <Route path="niveaux/nouveau" element={<LevelFormPage />} />
        <Route path="niveaux/modifier/:id" element={<LevelFormPage />} />

        {/* Transports */}
        <Route path="transports" element={<AdminTransports />} />
        <Route path="transports/nouveau" element={<TransportFormPage />} />
        <Route path="transports/modifier/:id" element={<TransportFormPage />} />

        {/* Remarques */}
        <Route path="remarques" element={<AdminRemarques />} />
        <Route path="remarques/nouveau" element={<RemarqueFormPage />} />
        <Route path="remarques/modifier/:id" element={<RemarqueFormPage />} />
        <Route path="remarques/:id" element={<RemarqueDetailsPage />} />

        {/* Devoirs */}
        <Route path="devoirs" element={<AdminDevoirs />} />

        {/* Payments routes */}
        <Route path="paiements" element={<AdminPaiements />} />
        <Route path="paiements/nouveau" element={<PaiementFormPage />} />
        <Route path="paiements/modifier/:id" element={<PaiementFormPage />} />
        <Route path="paiements/:id" element={<PaiementDetailsPage />} />
      </Route>
      
      {/* Fallback Route - 404 */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;