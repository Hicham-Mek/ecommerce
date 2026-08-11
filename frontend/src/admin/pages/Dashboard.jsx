import { useEffect, useState } from "react";
import Spinner from "../../components/common/Spinner";
import Badge from "../../components/common/Badge";
import dashboardService from "../../services/adminDashboardService";
import StatCard from "../components/StatCard";
import RevenueChart from "../components/RevenueChart";
import StatusChart from "../components/StatusChart";
import { Users, Package, FolderTree, ShoppingBag, DollarSign } from "lucide-react";

const Dashboard = () => {
  const [statistics, setStatistics] = useState(null);
  const [latestOrders, setLatestOrders] = useState([]);
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [ordersByStatus, setOrdersByStatus] = useState([]);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await dashboardService.getDashboardStats();

        setStatistics(res.data.statistics);
        setLatestOrders(res.data.latest_orders);
        setLowStockProducts(res.data.low_stock_products);
        setRecentUsers(res.data.recent_users);

        setMonthlyRevenue(res.data.monthly_revenue);
        setOrdersByStatus(res.data.orders_by_status);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="py-24">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] tracking-tight">Dashboard Overview</h1>
        <p className="text-[var(--text-secondary)] mt-1">Here's what's happening with your store today.</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-6">
        <StatCard title="Total Revenue" value={`$${Number(statistics.revenue).toFixed(2)}`} icon={DollarSign} />
        <StatCard title="Orders" value={statistics.orders} icon={ShoppingBag} />
        <StatCard title="Products" value={statistics.products} icon={Package} />
        <StatCard title="Categories" value={statistics.categories} icon={FolderTree} />
        <StatCard title="Users" value={statistics.users} icon={Users} />
      </div>

      <div className="grid lg:grid-cols-2 gap-4 lg:gap-6">
        <RevenueChart data={monthlyRevenue} />
        <StatusChart data={ordersByStatus} />
      </div>

      {/* Latest Orders */}
      <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl shadow-sm overflow-hidden">
        <div className="border-b border-[var(--border-subtle)] px-6 py-5 bg-[var(--bg-main)]">
          <h2 className="text-lg font-bold text-[var(--text-primary)]">Latest Orders</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-[var(--text-muted)] uppercase bg-[var(--bg-main)] border-b border-[var(--border-subtle)]">
              <tr>
                <th className="px-6 py-4 font-semibold tracking-wider">Order ID</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Customer</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Total</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)]">
              {latestOrders.map((order) => (
                <tr key={order.id} className="hover:bg-[var(--bg-main)] transition-colors">
                  <td className="px-6 py-4 font-medium text-[var(--text-primary)]">
                    #{order.id.toString().padStart(6, '0')}
                  </td>
                  <td className="px-6 py-4 text-[var(--text-secondary)]">{order.user?.name}</td>
                  <td className="px-6 py-4 font-medium text-[var(--text-primary)]">
                    ${Number(order.total).toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <Badge status={order.status} />
                  </td>
                </tr>
              ))}
              {latestOrders.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-[var(--text-muted)]">
                    No recent orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid lg:grid-cols-2 gap-4 lg:gap-6 pb-10">
        {/* Low Stock */}
        <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl shadow-sm overflow-hidden">
          <div className="border-b border-[var(--border-subtle)] px-6 py-5 bg-[var(--bg-main)] flex justify-between items-center">
            <h2 className="text-lg font-bold text-[var(--text-primary)]">Low Stock Alerts</h2>
          </div>

          <div className="divide-y divide-[var(--border-subtle)]">
            {lowStockProducts.length === 0 ? (
              <p className="p-6 text-center text-[var(--text-muted)]">No low stock products.</p>
            ) : (
              lowStockProducts.map((product) => (
                <div key={product.id} className="flex justify-between items-center p-4 sm:px-6 hover:bg-[var(--bg-main)] transition-colors">
                  <span className="font-medium text-[var(--text-primary)] truncate pr-4">{product.name}</span>
                  <Badge variant="danger">{product.stock} left</Badge>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Users */}
        <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl shadow-sm overflow-hidden">
          <div className="border-b border-[var(--border-subtle)] px-6 py-5 bg-[var(--bg-main)]">
            <h2 className="text-lg font-bold text-[var(--text-primary)]">Recent Users</h2>
          </div>

          <div className="divide-y divide-[var(--border-subtle)]">
            {recentUsers.length === 0 ? (
              <p className="p-6 text-center text-[var(--text-muted)]">No users found.</p>
            ) : (
              recentUsers.map((user) => (
                <div key={user.id} className="flex justify-between items-center p-4 sm:px-6 hover:bg-[var(--bg-main)] transition-colors">
                  <div className="flex flex-col truncate pr-4">
                    <p className="font-medium text-[var(--text-primary)] truncate">{user.name}</p>
                    <p className="text-sm text-[var(--text-muted)] truncate">{user.email}</p>
                  </div>
                  <Badge variant={user.role === 'admin' ? 'indigo' : 'default'}>{user.role}</Badge>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
