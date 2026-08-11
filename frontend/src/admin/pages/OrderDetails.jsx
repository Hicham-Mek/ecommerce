import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, User, CreditCard, Clock, Package } from "lucide-react";
import Spinner from "../../components/common/Spinner";
import Badge from "../../components/common/Badge";
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
    return (
      <div className="py-24">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="py-24 text-center">
        <h2 className="text-xl font-bold text-[var(--text-primary)]">Order not found</h2>
        <p className="text-[var(--text-secondary)] mt-2">The requested order does not exist.</p>
        <Link to="/admin/orders" className="inline-block mt-4 text-[var(--color-primary-600)] hover:underline">
          Back to Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            to="/admin/orders"
            className="p-2 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-surface)] hover:text-[var(--text-primary)] transition-colors border border-transparent hover:border-[var(--border-subtle)]"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-[var(--text-primary)] tracking-tight">Order #{order.id.toString().padStart(6, '0')}</h1>
              <Badge status={order.status} />
            </div>
            <p className="text-[var(--text-secondary)] mt-1 flex items-center gap-1.5 text-sm">
              <Clock size={14} />
              {new Date(order.created_at).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Products */}
          <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl shadow-sm overflow-hidden">
            <div className="border-b border-[var(--border-subtle)] px-6 py-5 bg-[var(--bg-main)]">
              <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
                <Package size={20} className="text-[var(--text-secondary)]" />
                Order Items
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-[var(--text-muted)] uppercase bg-[var(--bg-main)] border-b border-[var(--border-subtle)]">
                  <tr>
                    <th className="px-6 py-4 font-semibold tracking-wider">Product</th>
                    <th className="px-6 py-4 font-semibold tracking-wider text-right">Price</th>
                    <th className="px-6 py-4 font-semibold tracking-wider text-center">Qty</th>
                    <th className="px-6 py-4 font-semibold tracking-wider text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-subtle)]">
                  {order.items.map((item) => (
                    <tr key={item.id} className="hover:bg-[var(--bg-main)] transition-colors">
                      <td className="px-6 py-4 font-medium text-[var(--text-primary)]">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-[var(--bg-main)] border border-[var(--border-subtle)] flex items-center justify-center shrink-0 overflow-hidden">
                            {item.product?.image ? (
                              <img src={item.product.image.startsWith('http') ? item.product.image : `http://127.0.0.1:8000/storage/${item.product.image}`} alt={item.product.name} className="w-full h-full object-cover" />
                            ) : (
                              <Package size={20} className="text-[var(--text-muted)]" />
                            )}
                          </div>
                          <span>{item.product?.name || "Unknown Product"}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right text-[var(--text-secondary)]">
                        ${Number(item.price).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-center font-medium">
                        {item.quantity}
                      </td>
                      <td className="px-6 py-4 text-right font-medium text-[var(--text-primary)]">
                        ${(item.price * item.quantity).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-[var(--bg-main)] px-6 py-4 border-t border-[var(--border-subtle)] flex justify-end">
              <div className="text-lg">
                <span className="text-[var(--text-secondary)] mr-4">Total Amount:</span>
                <span className="font-bold text-[var(--text-primary)]">${Number(order.total).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Customer */}
          <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2 mb-4 border-b border-[var(--border-subtle)] pb-4">
              <User size={20} className="text-[var(--text-secondary)]" />
              Customer Details
            </h2>

            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-[var(--text-muted)] uppercase tracking-wider mb-1">Name</p>
                <p className="font-medium text-[var(--text-primary)]">{order.user?.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-[var(--text-muted)] uppercase tracking-wider mb-1">Email</p>
                <p className="font-medium text-[var(--text-primary)] break-all">{order.user?.email}</p>
              </div>
            </div>
          </div>

          {/* Payment & Status */}
          <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2 mb-4 border-b border-[var(--border-subtle)] pb-4">
              <CreditCard size={20} className="text-[var(--text-secondary)]" />
              Order Info
            </h2>

            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-[var(--text-muted)] uppercase tracking-wider mb-1">Payment Method</p>
                <p className="font-medium text-[var(--text-primary)] capitalize">
                  {order.payment_method?.replaceAll("_", " ")}
                </p>
              </div>

              <div className="pt-2">
                <p className="text-sm font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2">Update Status</p>
                <select
                  value={order.status}
                  onChange={handleStatusChange}
                  disabled={saving}
                  className="w-full bg-[var(--bg-main)] border border-[var(--border-subtle)] text-[var(--text-primary)] text-sm rounded-lg focus:ring-[var(--border-focus)] focus:border-[var(--border-focus)] block p-2.5 transition-colors capitalize disabled:opacity-50"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                {saving && <p className="text-xs text-[var(--color-primary-600)] mt-2 flex items-center gap-1"><Spinner size="sm" /> Updating...</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
