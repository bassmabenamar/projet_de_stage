import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useState, useEffect, lazy, Suspense } from "react";
import ListeFormateurs from "./ListeFormateurs";

// ─── Constants ─────────────────────────────────────────────────────────────────
const USER_ROLES = {
  ADMIN: 'admin',
  TEACHER: 'formateur',
  STUDENT: 'etudiant'
};

// ─── Loading Component ────────────────────────────────────────────────────────
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-orange-50">
    <div className="relative">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-semibold text-gray-600">AMITY</span>
      </div>
    </div>
  </div>
);

// ─── Lazy Load Components for Better Performance ──────────────────────────────
// Admin Components
const AdminLayout = lazy(() => import("./layouts/AdminLayout"));
const AdminDashboard = lazy(() => import("./Dashboard"));
const AdminSubjects = lazy(() => import("./pages/admin/Matiers"));
const SubjectFormPage = lazy(() => import("./pages/admin/Subjectformpage"));
const AdminActivities = lazy(() => import("./pages/admin/Activite"));
const ActivityFormPage = lazy(() => import("./pages/admin/Activityformpage"));
const AdminSalles = lazy(() => import("./pages/admin/Salle"));
const AdminTransports = lazy(() => import("./pages/admin/transport"));
const TransportFormPage = lazy(() => import("./pages/admin/TransportFormPage"));
const AdminRemarques = lazy(() => import("./pages/admin/remarque"));
const RemarqueFormPage = lazy(() => import("./pages/admin/RemarqueFormPage"));
const RemarqueDetailsPage = lazy(() => import("./pages/admin/RemarqueDetailsPage"));
const AdminDevoirs = lazy(() => import("./pages/admin/devoirs"));
const AdminPaiements = lazy(() => import("./pages/admin/paiment"));
const PaiementFormPage = lazy(() => import("./pages/admin/PaymentFormPage"));
const PaiementDetailsPage = lazy(() => import("./pages/admin/PaiementDetailsPage"));
const AdminNiveaux = lazy(() => import("./pages/admin/AdminNiveaux"));
const LevelFormPage = lazy(() => import("./pages/admin/LevelFormPage"));
const AdminCaisse = lazy(() => import("./pages/admin/AdminCaisse"));
const AdminMessages = lazy(() => import("./pages/admin/Messages"));
const NotesPage = lazy(() => import("./pages/admin/NotesPage"));
const AbsencesPage = lazy(() => import("./pages/admin/AbsencesPage"));

// CRUD Admin: Classes, Etudiants, Filières, Formateurs, Salles
const ListeClasses = lazy(() => import("./ListeClasses"));
const AjouterClasse = lazy(() => import("./AjouterClasse"));
const ModifierClasse = lazy(() => import("./ModifierClasse"));
const DetailsClasse = lazy(() => import("./DetailsClasse"));

const ListeEtudiants = lazy(() => import("./ListeEtudiants"));
const AjouterEtudiant = lazy(() => import("./AjouterEtudiant"));
const ModifierEtudiant = lazy(() => import("./ModifierEtudiant"));
const DetailsEtudiant = lazy(() => import("./DetailsEtudiant"));

const ListeFiliere = lazy(() => import("./ListeFiliere"));
const AjouterFiliere = lazy(() => import("./AjouterFiliere"));
const ModifierFiliere = lazy(() => import("./ModifierFiliere"));

const AjouterFormateur = lazy(() => import("./AjouterFormateur"));
const ModifierFormateur = lazy(() => import("./ModifierFormateur"));
const DetailsFormateur = lazy(() => import("./DetailsFormateur"));

const ListeSalles = lazy(() => import("./ListeSalles"));
const AjouterSalle = lazy(() => import("./AjouterSalle"));
const ModifierSalle = lazy(() => import("./ModifierSalle"));
const DetailsSalle = lazy(() => import("./DetailsSalle"));

// Legacy list routes (kept for backward compatibility)
const EtudiantsPage = lazy(() => import("./ListeEtudiants"));
const FormateursPage = lazy(() => import("./ListeFormateurs"));
// Teacher Components
const TeacherSidebar = lazy(() => import("./teachers/Sidebar"));
const TeacherDashboard = lazy(() => import("./teachers/TeacherDashboard"));
const MyClasses = lazy(() => import("./teachers/MyClasses"));
const TeacherSettings = lazy(() => import("./teachers/Settings"));
const Announcements = lazy(() => import("./teachers/Announcements"));
const TeacherMessages = lazy(() => import("./teachers/Messages"));
const TeacherProfil = lazy(() => import("./teachers/Profil"));
const TimeTable = lazy(() => import("./teachers/TimeTable"));
const TeacherHomework = lazy(() => import("./teachers/Homework"));
const ResourcesPage = lazy(() => import("./teachers/Ressources"));
const SubmissionsPage = lazy(() => import("./teachers/Submissions"));
const ImportGrades = lazy(() => import("./teachers/Importgrades"));
const GradesPage = lazy(() => import("./teachers/Grades"));
const AttendancePage = lazy(() => import("./teachers/Attendence"));

// Student Components
const StudentSidebar = lazy(() => import("./Etudiants/Sidebar"));
const StudentDashboard = lazy(() => import("./Etudiants/Dashboard"));
const StudentHomework = lazy(() => import("./Etudiants/Homework"));
const StudentProfile = lazy(() => import("./Etudiants/Profile"));
const StudentGrades = lazy(() => import("./Etudiants/Grades"));
const StudentTimetable = lazy(() => import("./Etudiants/Timetable"));
const StudentNotifications = lazy(() => import("./Etudiants/Notifications"));
const StudentMessages = lazy(() => import("./Etudiants/Messages"));
const StudentSettings = lazy(() => import("./Etudiants/Settings"));
const StudentAttendance = lazy(() => import("./Etudiants/Attendance"));
const StudentActivities = lazy(() => import("./Etudiants/Activities"));
const StudentPayment = lazy(() => import("./Etudiants/StudentPayment"));
const ChangePassword = lazy(() => import("./Etudiants/ChangePassword"));
const Tutorials = lazy(() => import("./Etudiants/Tutorials"));
const Library = lazy(() => import("./Etudiants/Library"));
const UploadHomework = lazy(() => import("./Etudiants/UploadHomework"));
const MySubmissions = lazy(() => import("./Etudiants/MySubmissions"));
const MyLeaveRequests = lazy(() => import("./Etudiants/MyLeaveRequests"));
const Support = lazy(() => import("./Etudiants/Support"));
const BookDetails = lazy(() => import("./Etudiants/BookDetails"));
const HomeworkDetails = lazy(() => import("./Etudiants/Homeworkdetails"));
const TutorialDetails = lazy(() => import("./Etudiants/TutorialDetails"));

// Public Components
const Home = lazy(() => import("./Etudiants/pages/Home"));
const About = lazy(() => import("./Etudiants/pages/About"));
const Contact1 = lazy(() => import("./Etudiants/pages/Contact1"));
const Academique = lazy(() => import("./Etudiants/pages/Academique"));
const Login = lazy(() => import("./Login"));

// ─── Layout Components ─────────────────────────────────────────────────────────
const AppShell = ({ Sidebar, children }) => (
  <div className="flex h-screen w-full bg-[#F8FAFC] overflow-hidden">
    <Sidebar />
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <main className="flex-1 overflow-y-auto w-full">
        {children}
      </main>
    </div>
  </div>
);

const TeacherLayout = () => (
  <AppShell Sidebar={TeacherSidebar}>
    <Outlet />
  </AppShell>
);

const StudentLayout = () => (
  <AppShell Sidebar={StudentSidebar}>
    <Outlet />
  </AppShell>
);

// ─── Role Guard Component with Enhanced Security ──────────────────────────────
const RequireRole = ({ role, children, redirectTo = "/login" }) => {
  const [isAuthorized, setIsAuthorized] = useState(null);
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  useEffect(() => {
    // Validate token with backend (optional but recommended)
    const validateSession = async () => {
      if (!token) {
        setIsAuthorized(false);
        return;
      }

      // You can add API validation here if needed
      // const isValid = await validateTokenWithBackend(token);
      // setIsAuthorized(isValid && userRole === role);
      
      setIsAuthorized(userRole === role);
    };

    validateSession();
  }, [token, userRole, role]);

  if (isAuthorized === null) {
    return <LoadingSpinner />;
  }

  if (!token || !isAuthorized) {
    // Redirect to appropriate dashboard if already logged in but wrong role
    if (token && userRole) {
      const roleRedirects = {
        [USER_ROLES.ADMIN]: "/admin/dashboard",
        [USER_ROLES.TEACHER]: "/teacher/dashboard",
        [USER_ROLES.STUDENT]: "/student/dashboard",
      };
      return <Navigate to={roleRedirects[userRole] || redirectTo} replace />;
    }
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};

// ─── Main App Component ────────────────────────────────────────────────────────
function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate app initialization
    const initApp = async () => {
      // You can add app initialization logic here
      // e.g., load user data, check session, etc.
      await new Promise(resolve => setTimeout(resolve, 500));
      setLoading(false);
    };
    
    initApp();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* ── Public Routes ───────────────────────────────────────────── */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact1" element={<Contact1 />} />
          <Route path="/academique" element={<Academique />} />
          <Route path="/login" element={<Login />} />

          {/* ── Admin Routes (Nested Layout) ────────────────────────────── */}
          <Route 
            path="/admin" 
            element={
              <RequireRole role={USER_ROLES.ADMIN}>
                <AdminLayout />
              </RequireRole>
            }
          >
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="matieres" element={<AdminSubjects />} />
            <Route path="matieres/nouveau" element={<SubjectFormPage />} />
            <Route path="matieres/modifier/:id" element={<SubjectFormPage />} />

            <Route path="activites" element={<AdminActivities />} />
            <Route path="activites/nouveau" element={<ActivityFormPage />} />
            <Route path="activites/modifier/:id" element={<ActivityFormPage />} />
            <Route path="salle" element={<AdminSalles />} />
            <Route path="caisse" element={<AdminCaisse />} />
            <Route path="messages" element={<AdminMessages />} />
            <Route path="niveaux" element={<AdminNiveaux />} />
            <Route path="niveaux/nouveau" element={<LevelFormPage />} />
            <Route path="niveaux/modifier/:id" element={<LevelFormPage />} />
            <Route path="transports" element={<AdminTransports />} />
            <Route path="transports/nouveau" element={<TransportFormPage />} />
            <Route path="transports/modifier/:id" element={<TransportFormPage />} />
            <Route path="remarques" element={<AdminRemarques />} />
            <Route path="remarques/nouveau" element={<RemarqueFormPage />} />
            <Route path="remarques/modifier/:id" element={<RemarqueFormPage />} />
            <Route path="remarques/:id" element={<RemarqueDetailsPage />} />
            <Route path="devoirs" element={<AdminDevoirs />} />
            <Route path="paiements" element={<AdminPaiements />} />
            <Route path="paiements/nouveau" element={<PaiementFormPage />} />
            <Route path="paiements/modifier/:id" element={<PaiementFormPage />} />
            <Route path="paiements/:id" element={<PaiementDetailsPage />} />
            <Route path="notes" element={<NotesPage />} />
            <Route path="absences" element={<AbsencesPage />} />

            {/* Classes */}
            <Route path="classes" element={<ListeClasses />} />
            <Route path="classes/add" element={<AjouterClasse />} />
            <Route path="classes/edit/:id" element={<ModifierClasse />} />
            <Route path="classes/details/:id" element={<DetailsClasse />} />

            {/* Etudiants */}
            <Route path="etudiants" element={<ListeEtudiants />} />
            <Route path="etudiants/add" element={<AjouterEtudiant />} />
            <Route path="etudiants/edit/:id" element={<ModifierEtudiant />} />
            <Route path="etudiants/details/:id" element={<DetailsEtudiant />} />

            {/* Filieres */}
            <Route path="filieres" element={<ListeFiliere />} />
            <Route path="filieres/add" element={<AjouterFiliere />} />
            <Route path="filieres/edit/:id" element={<ModifierFiliere />} />

            {/* Formateurs */}
            <Route path="formateurs" element={<ListeFormateurs />} />
            <Route path="formateurs/add" element={<AjouterFormateur />} />
            <Route path="formateurs/edit/:id" element={<ModifierFormateur />} />
            <Route path="formateurs/details/:id" element={<DetailsFormateur />} />

            {/* Salles */}
            <Route path="salles" element={<ListeSalles />} />
            <Route path="salles/add" element={<AjouterSalle />} />
            <Route path="salles/edit/:id" element={<ModifierSalle />} />
            <Route path="salles/details/:id" element={<DetailsSalle />} />

          </Route>

          {/* ── Teacher Routes (Nested Layout) ──────────────────────────── */}
          <Route 
            path="/teacher" 
            element={
              <RequireRole role={USER_ROLES.TEACHER}>
                <TeacherLayout />
              </RequireRole>
            }
          >
            <Route index element={<Navigate to="/teacher/dashboard" replace />} />
            <Route path="dashboard" element={<TeacherDashboard />} />
            <Route path="my-classes" element={<MyClasses />} />
            <Route path="homework" element={<TeacherHomework />} />
            <Route path="submissions" element={<SubmissionsPage />} />
            <Route path="grades" element={<GradesPage />} />
            <Route path="grades/import" element={<ImportGrades />} />
            <Route path="attendance" element={<AttendancePage />} />
            <Route path="timetable" element={<TimeTable />} />
            <Route path="resources" element={<ResourcesPage />} />
            <Route path="announcements" element={<Announcements />} />
            <Route path="messages" element={<TeacherMessages />} />
            <Route path="profile" element={<TeacherProfil />} />
            <Route path="settings" element={<TeacherSettings />} />
          </Route>

          {/* ── Student Routes (Nested Layout) ──────────────────────────── */}
          <Route 
            path="/student" 
            element={
              <RequireRole role={USER_ROLES.STUDENT}>
                <StudentLayout />
              </RequireRole>
            }
          >
            <Route index element={<Navigate to="/student/dashboard" replace />} />
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="homework" element={<StudentHomework />} />
            <Route path="homework/:id/upload" element={<UploadHomework />} />
            <Route path="homework/:id/details" element={<HomeworkDetails />} />
            <Route path="profile" element={<StudentProfile />} />
            <Route path="grades" element={<StudentGrades />} />
            <Route path="timetable" element={<StudentTimetable />} />
            <Route path="attendance" element={<StudentAttendance />} />
            <Route path="activities" element={<StudentActivities />} />
            <Route path="settings" element={<StudentSettings />} />
            <Route path="notifications" element={<StudentNotifications />} />
            <Route path="messages" element={<StudentMessages />} />
            <Route path="payment" element={<StudentPayment />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="library" element={<Library />} />
            <Route path="library/favorites" element={<Library />} />
            <Route path="library/:id" element={<BookDetails />} />
            <Route path="tutorials" element={<Tutorials />} />
            <Route path="tutorials/:id" element={<TutorialDetails />} />
            <Route path="my-submissions" element={<MySubmissions />} />
            <Route path="my-leave-requests" element={<MyLeaveRequests />} />
            <Route path="support" element={<Support />} />
          </Route>

          {/* ── Unauthorized Page ───────────────────────────────────────── */}
          <Route path="/unauthorized" element={
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <h1 className="text-6xl font-bold text-red-500 mb-4">403</h1>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Unauthorized Access</h2>
                <p className="text-gray-600 mb-6">You don't have permission to access this page.</p>
                <button 
                  onClick={() => window.location.href = '/login'}
                  className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
                >
                  Go to Login
                </button>
              </div>
            </div>
          } />

          {/* ── 404 Fallback ─────────────────────────────────────────────── */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;