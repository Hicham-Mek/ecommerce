import { useEffect, useState } from "react";
import adminDashboardService from "../../services/adminDashboardService";

const StatCard = ({ title, value }) => (
  <div className="bg-white rounded-xl shadow p-6">
    <p className="text-gray-500 text-sm">{title}</p>
    <h3 className="text-3xl font-bold mt-2">{value}</h3>
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await adminDashboardService.getDashboardStats();
        setStats(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div>Loading dashboard...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        <StatCard title="Products" value={stats.products} />
        <StatCard title="Categories" value={stats.categories} />
        <StatCard title="Orders" value={stats.orders} />
        <StatCard title="Users" value={stats.users} />
        <StatCard
          title="Revenue"
          value={`$${Number(stats.revenue).toFixed(2)}`}
        />
        <StatCard title="Pending Orders" value={stats.pending_orders} />
      </div>

      <div className="mt-10 bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>

        <div className="space-y-3">
          {stats.recent_orders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between border-b pb-3"
            >
              <div>
                <p className="font-medium">Order #{order.id}</p>
                <p className="text-sm text-gray-500">
                  {order.user?.name || "Unknown user"}
                </p>
              </div>

              <div className="text-right">
                <p className="font-semibold">
                  ${Number(order.total).toFixed(2)}
                </p>
                <p className="text-sm text-gray-500">{order.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
