import api from "../api/axios";

const getProfile = () => api.get("/profile");

const updateProfile = (data) => api.put("/profile", data);

const updatePassword = (data) => api.put("/profile/password", data);

export default {
  getProfile,
  updateProfile,
  updatePassword,
};
