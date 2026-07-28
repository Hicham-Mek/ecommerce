import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../../components/common/Spinner";
import adminOrderService from "../../services/adminOrderService";

const OrderDetails = () => {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const statuses = [
    "pending",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
  ];

  const fetchOrder = async () => {
    try {
      const res = await adminOrderService.getOrder(id);
      setOrder(res.data.data || res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const handleStatusChange = async (e) => {
    const status = e.target.value;

    try {
      setSaving(true);

      await adminOrderService.updateStatus(id, status);

      setOrder((prev) => ({
        ...prev,
        status,
      }));
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  if (!order) {
    return <div>Order not found.</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Order #{order.id}</h1>

      {/* Customer */}

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Customer Information</h2>

        <div className="space-y-2">
          <p>
            <strong>Name:</strong> {order.user?.name}
          </p>

          <p>
            <strong>Email:</strong> {order.user?.email}
          </p>

          <p>
            <strong>Order Date:</strong>{" "}
            {new Date(order.created_at).toLocaleString()}
          </p>

          <p>
            <strong>Payment:</strong>{" "}
            {order.payment_method.replaceAll("_", " ")}
          </p>
        </div>
      </div>

      {/* Status */}

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Order Status</h2>

        <select
          value={order.status}
          onChange={handleStatusChange}
          disabled={saving}
          className="border rounded p-2"
        >
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      {/* Products */}

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Ordered Products</h2>

        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Product</th>

              <th className="text-left p-2">Price</th>

              <th className="text-left p-2">Qty</th>

              <th className="text-left p-2">Total</th>
            </tr>
          </thead>

          <tbody>
            {order.items.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="p-2">{item.product?.name}</td>

                <td className="p-2">${Number(item.price).toFixed(2)}</td>

                <td className="p-2">{item.quantity}</td>

                <td className="p-2">
                  ${(item.price * item.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="text-right mt-6 text-xl font-bold">
          Grand Total: ${Number(order.total).toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
