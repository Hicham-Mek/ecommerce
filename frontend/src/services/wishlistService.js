import api from "../api/axios";

const getWishlist = () => api.get("/wishlist");

const addToWishlist = (productId) =>
  api.post("/wishlist", {
    product_id: productId,
  });

const removeFromWishlist = (id) => api.delete(`/wishlist/${id}`);

export default {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
};
