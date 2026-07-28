import { useEffect, useState } from "react";
import Spinner from "../../components/common/Spinner";
import dashboardService from "../../services/adminDashboardService";
import StatCard from "../components/StatCard";
import RevenueChart from "../components/RevenueChart";
import StatusChart from "../components/StatusChart";

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
    return <Spinner />;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <p className="text-gray-500 mt-2">Welcome to your admin dashboard.</p>
      </div>

      {/* Statistics */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">
        <StatCard title="Users" value={statistics.users} />

        <StatCard title="Products" value={statistics.products} />

        <StatCard title="Categories" value={statistics.categories} />

        <StatCard title="Orders" value={statistics.orders} />

        <StatCard
          title="Revenue"
          value={`$${Number(statistics.revenue).toFixed(2)}`}
        />
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        <RevenueChart data={monthlyRevenue} />

        <StatusChart data={ordersByStatus} />
      </div>
      {/* Latest Orders */}

      <div className="bg-white rounded-xl shadow">
        <div className="border-b px-6 py-4">
          <h2 className="text-xl font-semibold">Latest Orders</h2>
        </div>

        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-4">#</th>

              <th className="text-left p-4">Customer</th>

              <th className="text-left p-4">Total</th>

              <th className="text-left p-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {latestOrders.map((order) => (
              <tr key={order.id} className="border-t">
                <td className="p-4">#{order.id}</td>

                <td className="p-4">{order.user?.name}</td>

                <td className="p-4">${Number(order.total).toFixed(2)}</td>

                <td className="p-4 capitalize">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bottom */}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Low Stock */}

        <div className="bg-white rounded-xl shadow">
          <div className="border-b px-6 py-4">
            <h2 className="text-xl font-semibold">Low Stock Products</h2>
          </div>

          <div className="divide-y">
            {lowStockProducts.length === 0 ? (
              <p className="p-6 text-gray-500">No low stock products.</p>
            ) : (
              lowStockProducts.map((product) => (
                <div key={product.id} className="flex justify-between p-4">
                  <span>{product.name}</span>

                  <span className="font-semibold text-red-600">
                    {product.stock}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Users */}

        <div className="bg-white rounded-xl shadow">
          <div className="border-b px-6 py-4">
            <h2 className="text-xl font-semibold">Recent Users</h2>
          </div>

          <div className="divide-y">
            {recentUsers.length === 0 ? (
              <p className="p-6 text-gray-500">No users found.</p>
            ) : (
              recentUsers.map((user) => (
                <div key={user.id} className="flex justify-between p-4">
                  <div>
                    <p className="font-semibold">{user.name}</p>

                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>

                  <span className="capitalize">{user.role}</span>
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
