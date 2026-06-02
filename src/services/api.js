import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

// ================= AUTH =================
export const login = (data) => API.post("/login", data);

// ================= DASHBOARD =================
export const getDashboard = () => API.get("/teacher/dashboard");

// ================= GRADES (NOTES) =================
export const getGrades = (classId) =>
  API.get(`/teacher/grades/${classId}`);

export const addGrade = (data) =>
  API.post("/teacher/grades", data);

export const importGrades = (data) =>
  API.post("/teacher/grades/import", data);

// ================= ATTENDANCE =================
export const getAttendance = () =>
  API.get("/teacher/attendance");

export const addAttendance = (data) =>
  API.post("/teacher/attendance", data);

// ================= HOMEWORK =================
export const getHomework = () =>
  API.get("/teacher/homeworks");

export const addHomework = (data) =>
  API.post("/teacher/homeworks", data);

export const deleteHomework = (id) =>
  API.delete(`/teacher/homeworks/${id}`);

// ================= MESSAGES =================
export const getMessages = () =>
  API.get("/teacher/messages");

export const sendMessage = (data) =>
  API.post("/teacher/messages", data);

// ================= CLASSES =================
export const getClasses = () =>
  API.get("/teacher/classes");

// ================= PROFILE =================
export const getProfile = () =>
  API.get("/teacher/profile");

export const updateProfile = (data) =>
  API.put("/teacher/profile", data);

// ================= RESOURCES =================
export const getResources = () =>
  API.get("/teacher/resources");

export const addResource = (data) =>
  API.post("/teacher/resources", data);

// ================= SUBMISSIONS =================
export const getSubmissions = () =>
  API.get("/teacher/submissions");

// ================= TIMETABLE =================
export const getTimetable = () =>
  API.get("/teacher/timetable");

export default API;