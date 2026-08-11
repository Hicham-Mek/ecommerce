import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Package, Clock, CreditCard, User, CheckCircle2 } from "lucide-react";
import Spinner from "../components/common/Spinner";
import Badge from "../components/common/Badge";
import orderService from "../services/orderService";
import adminOrderService from "../services/adminOrderService";

const OrderDetails = () => {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchOrder = async () => {
    try {
      let res;
      try {
        res = await orderService.getOrder(id);
      } catch (err) {
        res = await adminOrderService.getOrder(id);
      }
      const data = res.data.data || res.data;
      setOrder(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const badgeColor = (status) => {
    if (!status) return "";
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "processing":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "shipped":
        return "bg-indigo-100 text-indigo-700 border-indigo-200";
      case "delivered":
      case "completed":
        return "bg-green-100 text-green-700 border-green-200";
      case "cancelled":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto py-24 px-6 text-center">
        <h2 className="text-2xl font-bold text-[var(--text-primary)]">Order not found</h2>
        <p className="text-[var(--text-secondary)] mt-2">We couldn't find the requested order details.</p>
        <Link to="/orders" className="inline-flex items-center gap-2 mt-6 text-[var(--color-primary-600)] font-medium hover:underline">
          <ArrowLeft size={18} />
          Back to Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[var(--bg-main)] min-h-[calc(100vh-80px)] py-12">
      <div className="max-w-5xl mx-auto px-6 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              to="/orders"
              className="p-2.5 rounded-xl bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)] hover:border-[var(--color-primary-300)] transition-all shadow-sm"
            >
              <ArrowLeft size={20} />
            </Link>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-tight">
                  Order #{order.id.toString().padStart(6, "0")}
                </h1>
                <Badge status={order.status} />
              </div>
              <p className="text-[var(--text-secondary)] mt-1 flex items-center gap-1.5 text-sm">
                <Clock size={14} />
                Placed on {new Date(order.created_at).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Ordered Products */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl shadow-sm overflow-hidden">
              <div className="border-b border-[var(--border-subtle)] px-6 py-5 bg-[var(--bg-main)]">
                <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
                  <Package size={20} className="text-[var(--color-primary-600)]" />
                  Order Items ({order.items?.length || 0})
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
                    {order.items?.map((item) => (
                      <tr key={item.id} className="hover:bg-[var(--bg-main)] transition-colors">
                        <td className="px-6 py-4 font-medium text-[var(--text-primary)]">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-[var(--bg-main)] border border-[var(--border-subtle)] flex items-center justify-center shrink-0 overflow-hidden">
                              {item.product?.image ? (
                                <img
                                  src={
                                    item.product.image.startsWith("http")
                                      ? item.product.image
                                      : `http://127.0.0.1:8000/storage/${item.product.image}`
                                  }
                                  alt={item.product.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <Package size={22} className="text-[var(--text-muted)]" />
                              )}
                            </div>
                            <span className="font-semibold text-[var(--text-primary)]">
                              {item.product?.name || "Product"}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right text-[var(--text-secondary)] font-medium">
                          ${Number(item.price).toFixed(2)}
                        </td>
                        <td className="px-6 py-4 text-center font-semibold text-[var(--text-primary)]">
                          {item.quantity}
                        </td>
                        <td className="px-6 py-4 text-right font-bold text-[var(--text-primary)]">
                          ${(Number(item.price) * item.quantity).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-[var(--bg-main)] px-6 py-5 border-t border-[var(--border-subtle)] flex justify-between items-center">
                <span className="text-sm text-[var(--text-secondary)]">Payment method: <strong className="capitalize text-[var(--text-primary)]">{order.payment_method?.replaceAll("_", " ")}</strong></span>
                <div className="text-right">
                  <span className="text-sm text-[var(--text-secondary)] mr-3">Order Total:</span>
                  <span className="text-xl font-bold text-[var(--text-primary)]">
                    ${Number(order.total).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Side Details */}
          <div className="space-y-6">
            {/* Customer Information */}
            <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl shadow-sm p-6 space-y-4">
              <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2 border-b border-[var(--border-subtle)] pb-4">
                <User size={20} className="text-[var(--color-primary-600)]" />
                Customer Info
              </h2>

              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Name</p>
                  <p className="font-medium text-[var(--text-primary)] mt-0.5">{order.user?.name || "N/A"}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Email</p>
                  <p className="font-medium text-[var(--text-primary)] mt-0.5 break-all">{order.user?.email || "N/A"}</p>
                </div>
              </div>
            </div>

            {/* Payment Status Summary */}
            <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl shadow-sm p-6 space-y-4">
              <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2 border-b border-[var(--border-subtle)] pb-4">
                <CreditCard size={20} className="text-[var(--color-primary-600)]" />
                Payment Summary
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-[var(--text-secondary)]">Payment Method</span>
                  <span className="font-medium text-[var(--text-primary)] capitalize">
                    {order.payment_method?.replaceAll("_", " ")}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[var(--text-secondary)]">Order Status</span>
                  <span className="font-semibold text-[var(--text-primary)] capitalize flex items-center gap-1">
                    <CheckCircle2 size={16} className="text-emerald-500" />
                    {order.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
