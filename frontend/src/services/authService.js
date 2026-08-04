import api from "../api/axios";

const login = async (credentials) => {
  return api.post("/login", credentials);
};

const register = async (data) => {
  return api.post("/register", data);
};

const logout = async () => {
  const response = await api.post("/logout");
  localStorage.removeItem("token");
  return response;
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
