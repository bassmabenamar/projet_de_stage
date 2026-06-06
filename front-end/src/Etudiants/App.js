import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import Homework from "./Homework";
import Profile from "./Profile";
import Grades from "./Grades";
import Timetable from "./Timetable";
import Notifications from "./Notifications";
import Messages from "./Messages";
import Settings from "./Settings";
import Attendance from "./Attendance";
import Activities from "./Activities";
import StudentPayment from "./StudentPayment";
import Login from "./Login";
import ChangePassword from './ChangePassword';
import Tutorials from './Tutorials';
import Library from "./Library";
import UploadHomework from './UploadHomework';
import MySubmissions from './MySubmissions';
import MyLeaveRequests from './MyLeaveRequests';
import Support from './Support';
import Home from './pages/Home';
import About from './pages/About';
import BookDetails from "./BookDetails";
import HomeworkDetails from "./Homeworkdetails";
import TutorialDetails from "./TutorialDetails";
import Contact1 from "./pages/Contact1";
import Academique from "./pages/Academique";
import ActivityDetails from './ActivityDetails';
// ── Guard: ila machi connecté → rj3 l /login ────────────────────────────────
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

function App() {
  return (
   
      <Router>
        <Routes>

          {/* Routes publiques (avant connexion) */}
          <Route path="/"      element={<Home />} />
          <Route path="/home"  element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact1" element={<Contact1 />} />
           <Route path="/academique" element={<Academique />} />

          {/* Route login */}
          <Route path="/login" element={<Login />} />

          {/* Toutes les routes protégées */}
          <Route path="/*" element={
            <ProtectedRoute>
              <div className="flex h-screen w-full bg-[#F8FAFC] overflow-hidden">
                <Sidebar />
                <div className="flex-1 flex flex-col h-full overflow-hidden">
                  <main className="flex-1 overflow-y-auto w-full">
                    <Routes>
                      <Route path="/dashboard"       element={<Dashboard />} />
                      <Route path="/homework"        element={<Homework />} />
                      <Route path="/profile"         element={<Profile />} />
                      <Route path="/grades"          element={<Grades />} />
                      <Route path="/timetable"       element={<Timetable />} />
                      <Route path="/attendance"      element={<Attendance />} />
                      <Route path="/activities"      element={<Activities />} />
                      <Route path="/paramétres"      element={<Settings />} />
                      <Route path="/notifications"   element={<Notifications />} />
                      <Route path="/messages"        element={<Messages />} />
                      <Route path="/payment"         element={<StudentPayment />} />
                      <Route path="/change-password" element={<ChangePassword />} />
                      <Route path="/library"         element={<Library />} />
                      <Route path="/library/favorites" element={<Library />} />
                      <Route path="/tutorials"         element={<Tutorials />} />
                      <Route path="/tutorials/:id" element={<TutorialDetails />} />
                      <Route path="/homework/:id/upload" element={<UploadHomework />} />
                      <Route path="/my-submissions"    element={<MySubmissions />} />
                      <Route path="/my-leave-requests" element={<MyLeaveRequests />} />
                      <Route path="/support"           element={<Support />} />
                      <Route path="/library/:id" element={<BookDetails />} />
                      <Route path="/homework/:id/details" element={<HomeworkDetails />} />
                      <Route path="/activities/:id" element={<ActivityDetails />} />
                      
                    </Routes>
                  </main>
                </div>
              </div>
            </ProtectedRoute>
          } />

        </Routes>
      </Router>
  
  );
}

export default App;