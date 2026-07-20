import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import orderService from "../services/orderService";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const res = await orderService.getOrder(id);
      setOrder(res.data);
    };

    fetchOrder();
  }, [id]);

  if (!order) return <p>Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Order #{order.id}</h1>

      <p>Status: {order.status}</p>

      <p>Total: ${order.total}</p>

      <p>Payment: {order.payment_method}</p>

      <h2 className="text-xl font-bold mt-6 mb-4">Products</h2>

      {order.items.map((item) => (
        <div key={item.id} className="border rounded p-4 mb-3">
          <h3>{item.product.name}</h3>

          <p>Quantity: {item.quantity}</p>

          <p>Price: ${item.price}</p>
        </div>
      ))}
    </div>
  );
};

export default OrderDetails;
