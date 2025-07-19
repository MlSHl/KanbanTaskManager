import axios from "axios";

const BASE_URL = "http://localhost:8080/auth"

export const registerUser = (userData) => axios.post(`${BASE_URL}/register`, userData);
export const loginUser = (userData) => axios.post(`${BASE_URL}/login`, userData);