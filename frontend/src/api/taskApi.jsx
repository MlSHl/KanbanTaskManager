import axios from "axios";

const BASE_URL = 'http://localhost:8080/tasks'

const api = axios.create({
    baseURL: BASE_URL
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const findTaskById = (id) => api.get(`${BASE_URL}/${id}`);
export const createTask = (task) => api.post(BASE_URL, task);
export const updateTask = (task) => api.put(`${BASE_URL}/${task.id}`, task);
export const getAllTasks = () => api.get(BASE_URL)
export const reorderTasks = (taskId, reorderRequest) => api.put(`${BASE_URL}/${taskId}/reorder`, reorderRequest);