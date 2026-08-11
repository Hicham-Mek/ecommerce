import api from "../api/axios";

const getProducts = (page = 1) =>
  api.get("/admin/products", {
    params: typeof page === "object" ? page : { page },
  });
const getProduct = (id) => api.get(`/admin/products/${id}`);
const createProduct = (data) => api.post("/admin/products", data);
const updateProduct = (id, data) => api.post(`/admin/products/${id}`, data);
const deleteProduct = (id) => api.delete(`/admin/products/${id}`);

export default {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
