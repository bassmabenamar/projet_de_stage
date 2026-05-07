import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <Router>
      {/* h-screen o overflow-hidden bach dakchi i-koun nqi */}
      <div className="flex h-screen w-full bg-[#F8FAFC] overflow-hidden">
        
        {/* SIDEBAR: dima flex, width kitchonja 3la hsab l-écran */}
        <Sidebar />

        {/* MAIN CONTENT */}
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          <main className="flex-1 overflow-y-auto w-full">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/homework" element={<Homework />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/grades" element={<Grades />} />
              <Route path="/timetable" element={<Timetable />} />
              <Route path="/attendance" element={<Attendance />} />
              <Route path="/activities" element={<Activities />} />
              <Route path="/paramétres" element={<Settings/>} />
              <Route path="/notifications" element={<Notifications/>} />
              <Route path="/messages" element={<Messages/>} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;