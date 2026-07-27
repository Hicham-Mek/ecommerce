import api from "../api/axios";

const getCategories = () => api.get("/admin/categories");
const getCategory = (id) => api.get(`/admin/categories/${id}`);
const createCategory = (data) => api.post("/admin/categories", data);
const updateCategory = (id, data) => api.put(`/admin/categories/${id}`, data);
const deleteCategory = (id) => api.delete(`/admin/categories/${id}`);

export default {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
