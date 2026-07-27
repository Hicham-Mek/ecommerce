import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import adminOrderService from "../services/adminOrderService";

const OrderDetails = () => {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchOrder = async () => {
    try {
      const res = await adminOrderService.getOrder(id);

      const data = res.data.data || res.data;

      setOrder(data);
      setStatus(data.status);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const handleUpdateStatus = async () => {
    try {
      setSaving(true);

      await adminOrderService.updateStatus(id, status);

      setOrder((prev) => ({
        ...prev,
        status,
      }));

      alert("Order status updated successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to update order status.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-6">Loading order...</div>;
  }

  if (!order) {
    return <div className="p-6">Order not found.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Order #{order.id}</h1>

      {/* Customer */}

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Customer Information</h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-semibold">Customer</p>
            <p>{order.user?.name}</p>
          </div>

          <div>
            <p className="font-semibold">Email</p>
            <p>{order.user?.email}</p>
          </div>

          <div>
            <p className="font-semibold">Order Date</p>
            <p>{new Date(order.created_at).toLocaleString()}</p>
          </div>

          <div>
            <p className="font-semibold">Payment</p>
            <p className="capitalize">
              {order.payment_method.replaceAll("_", " ")}
            </p>
          </div>
        </div>
      </div>

      {/* Status */}

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Update Order Status</h2>

        <div className="flex gap-4 items-center">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border rounded-lg px-4 py-2"
          >
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <button
            onClick={handleUpdateStatus}
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg disabled:opacity-50"
          >
            {saving ? "Updating..." : "Update Status"}
          </button>
        </div>

        <p className="mt-4">
          <strong>Current Status:</strong>{" "}
          <span className="capitalize">{order.status}</span>
        </p>
      </div>

      {/* Products */}

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Ordered Products</h2>

        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-3">Product</th>
              <th className="text-left p-3">Price</th>
              <th className="text-left p-3">Quantity</th>
              <th className="text-left p-3">Subtotal</th>
            </tr>
          </thead>

          <tbody>
            {order.items.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="p-3">{item.product?.name}</td>

                <td className="p-3">${Number(item.price).toFixed(2)}</td>

                <td className="p-3">{item.quantity}</td>

                <td className="p-3">
                  ${(Number(item.price) * item.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="text-right mt-6 text-2xl font-bold">
          Total: ${Number(order.total).toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
