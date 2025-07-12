import axios from "axios";

const BASE_URL = 'http://localhost:8080/tasks'

export const createTask = (task) => axios.post(BASE_URL, task);
export const updateTask = (task) => axios.put('${BASE_URL}/${task_id}', task);
export const getAllTasks = () => axios.get(BASE_URL)