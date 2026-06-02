import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// AUTH
import Login from "./teacher/pages/Login";

// TEACHER PAGES
import TeacherDashboard from "./teacher/pages/TeacherDashboard";
import Announcement from "./teacher/pages/Announcements";
import Attendence from "./teacher/pages/Attendence";
import GradesPage from "./teacher/pages/GradesPage";

import Homework from "./teacher/pages/Homework";
import HomeworkDetails from "./teacher/pages/HomeworkDetailsPage";
import EditHomeworkPage from "./teacher/pages/EditHomeworkPage";
import AddHomeworkPage from "./teacher/pages/AddHomeworkPage";

import TasksPage from "./teacher/pages/tasksPage";
import AddTaskPage from "./teacher/pages/AddTaskPage";
import EditTaskPage from "./teacher/pages/EditTaskPage";

import Messages from "./teacher/pages/Messages";
import Profil from "./teacher/pages/Profil";
import Ressources from "./teacher/pages/Ressources";
import TimeTable from "./teacher/pages/TimeTable";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const AppRoute = () => {
  return (
    <Router>
      <Routes>

        <Route path="/login" element={<Login />} />

        <Route path="/teacher/dashboard" element={
          <ProtectedRoute allowedRoles={['teacher', 'admin']}>
            <TeacherDashboard />
          </ProtectedRoute>
        } />

        <Route path="/announcements" element={
          <ProtectedRoute allowedRoles={['teacher', 'admin']}>
            <Announcement />
          </ProtectedRoute>
        } />

        <Route path="/attendance" element={
          <ProtectedRoute allowedRoles={['teacher', 'admin']}>
            <Attendence />
          </ProtectedRoute>
        } />

        <Route path="/grades" element={
          <ProtectedRoute allowedRoles={['teacher', 'admin']}>
            <GradesPage />
          </ProtectedRoute>
        } />

        {/* HOMEWORK */}
        <Route path="/homework" element={
          <ProtectedRoute allowedRoles={['teacher', 'admin']}>
            <Homework />
          </ProtectedRoute>
        } />

        <Route path="/homework/add" element={
          <ProtectedRoute allowedRoles={['teacher', 'admin']}>
            <AddHomeworkPage />
          </ProtectedRoute>
        } />
        <Route path="/homework/edit/:id" element={
          <ProtectedRoute allowedRoles={['teacher', 'admin']}>
            <EditHomeworkPage />
          </ProtectedRoute>
        } />

        <Route path="/homework/:id" element={
          <ProtectedRoute allowedRoles={['teacher', 'admin']}>
            <HomeworkDetails />
          </ProtectedRoute>
        } />

        <Route path="/tasks" element={
  <ProtectedRoute allowedRoles={['teacher', 'admin']}>
    <TasksPage />
  </ProtectedRoute>
} />

<Route path="/tasks/add" element={
  <ProtectedRoute allowedRoles={['teacher', 'admin']}>
    <AddTaskPage />
  </ProtectedRoute>
} />

<Route path="/tasks/edit/:id" element={
  <ProtectedRoute allowedRoles={['teacher', 'admin']}>
    <EditTaskPage />
  </ProtectedRoute>
} />

        

        <Route path="/messages" element={
          <ProtectedRoute allowedRoles={['teacher', 'admin']}>
            <Messages />
          </ProtectedRoute>
        } />


        <Route path="/profile" element={
          <ProtectedRoute allowedRoles={['teacher', 'admin']}>
            <Profil />
          </ProtectedRoute>
        } />

        <Route path="/ressources" element={
          <ProtectedRoute allowedRoles={['teacher', 'admin']}>
            <Ressources />
          </ProtectedRoute>
        } />

        

        <Route path="/timetable" element={
          <ProtectedRoute allowedRoles={['teacher', 'admin']}>
            <TimeTable />
          </ProtectedRoute>
        } />

        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>
    </Router>
  );
};

export default AppRoute;