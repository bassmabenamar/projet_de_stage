import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor to add token to all requests except login
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  // Add token to all requests except login
  if (!config.url?.includes('/login') && token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Response interceptor to handle token expiration
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("role");
      // Redirect to login page if not already there
      if (window.location.pathname !== "/login") {
  window.location.replace("/login");
}
    }
    return Promise.reject(error);
  }
);

export const dashboardService = {
  getOverview: async () => {
    const response = await API.get("/teacher/dashboard/overview");
    return response.data;
  },

  addTask: async (label) => {
    const response = await API.post("/teacher/tasks", { label });
    return response.data;
  },

  getAnnouncements: async () => {
    const response = await API.get("/teacher/announcements");
    return response.data;
  },

  getTimeTable: async () => {
    const response = await API.get("/teacher/timetable");
    return response.data;
  },

  getActivities: async () => {
    const response = await API.get("/teacher/dashboard/activities");
    return response.data;
  },
};

export const homeworkService = {
  getClasses: async () => {
    const response = await API.get("/teacher/classes");
    return response.data;
  },

  createHomework: async (formData) => {
    const response = await API.post(
      "/teacher/homeworks",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  },
};

export default API;