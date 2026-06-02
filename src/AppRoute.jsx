import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// AUTH
import Login from "./teacher/pages/Login";

// TEACHER PAGES
import TeacherDashboard from "./teacher/pages/TeacherDashboard";
import Announcement from "./teacher/pages/Announcements";
import Attendence from "./teacher/pages/Attendence";
import GradesPage from "./teacher/pages/GradesPage";
import Homework from "./teacher/pages/Homework";
import AddHomeworkPage from "./teacher/pages/AddHomeworkPage";
import Messages from "./teacher/pages/Messages";
import MyClasses from "./teacher/pages/MyClasses";
import Profil from "./teacher/pages/Profil";
import Ressources from "./teacher/pages/Ressources";
import Settings from "./teacher/pages/Settings";
import Submissions from "./teacher/pages/Submissions";
import TimeTable from "./teacher/pages/TimeTable";

const AppRoute = () => {

  return (
    <Router>

      <Routes>

        {/* AUTH */}
        <Route path="/login" element={<Login />} />

        {/* DASHBOARD */}
        <Route path="/" element={<TeacherDashboard />} />

        {/* TEACHER */}
        <Route path="/announcements" element={<Announcement />} />

        <Route path="/attendance" element={<Attendence />} />

        <Route path="/grades" element={<GradesPage />} />

        <Route path="/homework" element={<Homework />} />

        <Route path="/homework/add" element={<AddHomeworkPage />} />

        <Route path="/messages" element={<Messages />} />

        <Route path="/my-classes" element={<MyClasses />} />

        <Route path="/profile" element={<Profil />} />

        <Route path="/ressources" element={<Ressources />} />

        <Route path="/settings" element={<Settings />} />

        <Route path="/submissions" element={<Submissions />} />

        <Route path="/timetable" element={<TimeTable />} />

      </Routes>

    </Router>
  );
};

export default AppRoute;