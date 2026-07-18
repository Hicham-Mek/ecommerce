import api from "../api/axios";

const getCart = () => api.get("/cart");

const addToCart = (data) => api.post("/cart", data);

const updateCartItem = (id, quantity) =>
  api.put(`/cart/${id}`, { quantity });

const removeCartItem = (id) =>
  api.delete(`/cart/${id}`);

const clearCart = () =>
  api.delete("/cart");

export default {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
};