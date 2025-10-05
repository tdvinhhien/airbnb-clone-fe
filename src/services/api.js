import axios from "axios";

const API_BASE = "https://airbnbnew.cybersoft.edu.vn/api";
const TOKEN_CYBERSOFT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA4MyIsIkhldEhhblN0cmluZyI6IjIyLzAxLzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc2OTA0MDAwMDAwMCIsIm5iZiI6MTc0MTg4ODgwMCwiZXhwIjoxNzY5MTkxMjAwfQ.kBKKhbMMH6Pqm5TdwA9DOp9z6srHiyc9KnYL_084PPo";

const api = axios.create({
  baseURL: "https://airbnbnew.cybersoft.edu.vn/api",
  headers: {
    "Content-Type": "application/json",
    tokenCybersoft: TOKEN_CYBERSOFT
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const AuthAPI = {
  login: (payload) => api.post("/auth/signin", payload),
  signup: (payload) => api.post("/auth/signup", payload)
};

export const UsersAPI = {
  getAll: () => api.get("/users"),
  getById: (id) => api.get(`/users/${id}`),
  create: (payload) => api.post("/users", payload),
  update: (id, payload) => api.put(`/users/${id}`, payload),
  delete: (id) => api.delete(`/users/${id}`)
};

export const RoomsAPI = {
  list: () => api.get("/phong-thue"),
  get: (id) => api.get(`/phong-thue/${id}`),
  create: (payload) => api.post("/phong-thue", payload),
  update: (id, payload) => api.put(`/phong-thue/${id}`, payload),
  delete: (id) => api.delete(`/phong-thue/${id}`)
};

export const BookingAPI = {
  list: () => api.get("/dat-phong"),
  get: (id) => api.get(`/dat-phong/${id}`),
  create: (payload) => api.post("/dat-phong", payload),
  update: (id, payload) => api.put(`/dat-phong/${id}`, payload),
  delete: (id) => api.delete(`/dat-phong/${id}`)
};

export const LocationsAPI = {
  list: () => api.get("/vi-tri"),
  get: (id) => api.get(`/vi-tri/${id}`),
  create: (payload) => api.post("/vi-tri", payload),
  update: (id, payload) => api.put(`/vi-tri/${id}`, payload),
  delete: (id) => api.delete(`/vi-tri/${id}`)
};
