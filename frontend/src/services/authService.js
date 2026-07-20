import axios from "axios";
import api from "../api/axios";

const getCsrfCookie = async () => {
  await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
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
