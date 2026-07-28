import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EmptyState from "../components/common/EmptyState";
import orderService from "../services/orderService";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await orderService.getOrders();
      setOrders(res.data);
    };

    fetchOrders();
  }, []);

  if (!orders.length) {
    return <EmptyState title="You have no orders yet" />;
  }
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      {orders.map((order) => (
        <Link
          key={order.id}
          to={`/orders/${order.id}`}
          className="block border rounded p-4 mb-4 hover:bg-gray-100"
        >
          <h2>Order #{order.id}</h2>

          <p>Total: ${order.total}</p>

          <p>Status: {order.status}</p>
        </Link>
      ))}
    </div>
  );
};

export default Orders;
