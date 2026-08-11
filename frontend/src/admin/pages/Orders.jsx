import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Eye } from "lucide-react";
import Spinner from "../../components/common/Spinner";
import EmptyState from "../../components/common/EmptyState";
import Button from "../../components/common/Button";
import Badge from "../../components/common/Badge";
import adminOrderService from "../../services/adminOrderService";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const fetchOrders = async () => {
    try {
      const res = await adminOrderService.getOrders(page);
      setOrders(res.data.data || res.data);
      setLastPage(res.data.last_page || 1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [page]);

  if (loading) {
    return (
      <div className="py-24">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] tracking-tight">Orders</h1>
          <p className="text-[var(--text-secondary)] mt-1">Manage and track customer orders.</p>
        </div>
      </div>

      <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl shadow-sm overflow-hidden">
        {orders.length === 0 ? (
          <div className="py-12">
            <EmptyState 
              title="No orders found" 
              description="You don't have any orders yet."
            />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-[var(--text-muted)] uppercase bg-[var(--bg-main)] border-b border-[var(--border-subtle)]">
                <tr>
                  <th className="px-6 py-4 font-semibold tracking-wider">Order ID</th>
                  <th className="px-6 py-4 font-semibold tracking-wider">Customer</th>
                  <th className="px-6 py-4 font-semibold tracking-wider">Total</th>
                  <th className="px-6 py-4 font-semibold tracking-wider">Payment</th>
                  <th className="px-6 py-4 font-semibold tracking-wider">Status</th>
                  <th className="px-6 py-4 font-semibold tracking-wider">Date</th>
                  <th className="px-6 py-4 font-semibold tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-[var(--bg-main)] transition-colors group">
                    <td className="px-6 py-4 font-medium text-[var(--text-primary)]">
                      #{order.id.toString().padStart(6, '0')}
                    </td>
                    <td className="px-6 py-4 text-[var(--text-secondary)]">
                      {order.user?.name}
                    </td>
                    <td className="px-6 py-4 font-medium text-[var(--text-primary)]">
                      ${Number(order.total).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 capitalize text-[var(--text-secondary)]">
                      {order.payment_method?.replaceAll("_", " ")}
                    </td>
                    <td className="px-6 py-4">
                      <Badge status={order.status} />
                    </td>
                    <td className="px-6 py-4 text-[var(--text-secondary)] whitespace-nowrap">
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        to={`/admin/orders/${order.id}`}
                        className="inline-flex items-center justify-center p-2 rounded-lg text-[var(--color-primary-600)] hover:bg-[var(--color-primary-50)] transition-colors"
                        title="View Order"
                      >
                        <Eye size={18} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {lastPage > 1 && (
        <div className="flex justify-center items-center gap-6 mt-8 pt-4">
          <Button
            variant="outline"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            Previous
          </Button>

          <span className="text-[var(--text-secondary)] font-medium text-sm">
            Page {page} of {lastPage}
          </span>

          <Button
            variant="outline"
            onClick={() => setPage((prev) => Math.min(prev + 1, lastPage))}
            disabled={page === lastPage}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default Orders;
