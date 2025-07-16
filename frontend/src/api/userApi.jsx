import axios from "axios";

const BASE_URL = 'http://localhost:8080/users'

const api = axios.create({
    baseURL: BASE_URL
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");  // ← Read at call-time, not import-time
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getAllUsers = (() => api.get(``));