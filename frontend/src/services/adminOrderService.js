import api from "../api/axios";

const getOrders = () => api.get("/admin/orders");

const getOrder = (id) => api.get(`/admin/orders/${id}`);

const updateStatus = (id, status) =>
  api.patch(`/admin/orders/${id}/status`, {
    status,
  });

export default {
  getOrders,
  getOrder,
  updateStatus,
};
