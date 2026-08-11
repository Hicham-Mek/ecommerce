import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EmptyState from "../components/common/EmptyState";
import Spinner from "../components/common/Spinner";
import orderService from "../services/orderService";
import { Package, ChevronRight, Calendar, DollarSign } from "lucide-react";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await orderService.getOrders();
        setOrders(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="py-24">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="py-24">
        <EmptyState 
          title="No orders found" 
          description="You haven't placed any orders yet. Start exploring our products!"
        />
      </div>
    );
  }

  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
      case "delivered":
        return <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-green-100 text-green-700 border border-green-200">{status}</span>;
      case "processing":
        return <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-blue-100 text-blue-700 border border-blue-200">{status}</span>;
      case "cancelled":
        return <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-red-100 text-red-700 border border-red-200">{status}</span>;
      default:
        return <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-orange-100 text-orange-700 border border-orange-200">{status}</span>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="flex items-center gap-3 mb-10">
        <Package size={32} className="text-[var(--color-primary-600)]" />
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] tracking-tight">
          My Orders
        </h1>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <Link
            key={order.id}
            to={`/orders/${order.id}`}
            className="block bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl p-6 hover:shadow-md hover:border-[var(--color-primary-300)] transition-all duration-300 group"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-lg font-bold text-[var(--text-primary)] mb-1 group-hover:text-[var(--color-primary-600)] transition-colors">
                  Order #{order.id.toString().padStart(6, '0')}
                </h2>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--text-secondary)]">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-[var(--text-muted)]" />
                    <span>{new Date(order.created_at || Date.now()).toLocaleDateString()}</span>
                  </div>
                  
                  <div className="flex items-center gap-1.5">
                    <DollarSign size={14} className="text-[var(--text-muted)]" />
                    <span className="font-medium text-[var(--text-primary)]">${Number(order.total).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between w-full sm:w-auto gap-4">
                {getStatusBadge(order.status)}
                
                <div className="p-2 rounded-full bg-[var(--bg-main)] group-hover:bg-[var(--color-primary-50)] text-[var(--text-muted)] group-hover:text-[var(--color-primary-600)] transition-colors">
                  <ChevronRight size={18} />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Orders;
