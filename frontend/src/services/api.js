import axios from "axios";

const API = axios.create({
  baseURL: "https://mern-todo-app-4v28.onrender.com/api", // <-- updated backend URL
});

// Add token to every request automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
