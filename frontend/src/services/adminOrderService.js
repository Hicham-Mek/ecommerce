import api from "../api/axios";

const getOrders = (page = 1) => api.get(`/admin/orders?page=${page}`);

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
