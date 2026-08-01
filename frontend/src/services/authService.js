import axios from "axios";
import api from "../api/axios";

const apiBaseUrl =
  import.meta.env.VITE_API_URL?.replace(/\/api\/?$/, "") ||
  "https://ecommerce-nx2k.onrender.com";

const getCsrfCookie = async () => {
  await axios.get(`${apiBaseUrl}/sanctum/csrf-cookie`, {
    withCredentials: true,
  });
};

const login = async (credentials) => {
  await getCsrfCookie();
  return api.post("/login", credentials);
};

const register = async (data) => {
  await getCsrfCookie();
  return api.post("/register", data);
};

const logout = async () => {
  return api.post("/logout");
};

const getUser = async () => {
  return api.get("/user");
};

export default {
  login,
  register,
  logout,
  getUser,
};
