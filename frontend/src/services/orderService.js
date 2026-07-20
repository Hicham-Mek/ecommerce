import api from "../api/axios";

const placeOrder = () => api.post("/orders");

const getOrders = () => api.get("/orders");

const getOrder = (id) => api.get(`/orders/${id}`);

export default {
    placeOrder,
    getOrders,
    getOrder,
};