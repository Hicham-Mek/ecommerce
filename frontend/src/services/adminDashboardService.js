import api from "../api/axios";

const getDashboardStats = () => api.get("/admin/dashboard");

export default {
  getDashboardStats,
};
