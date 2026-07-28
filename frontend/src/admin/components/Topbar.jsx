import { Menu } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Topbar = () => {
  const { user } = useAuth();

  return (
    <header className="bg-white border-b px-4 sm:px-6 py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 lg:hidden">
          <Menu size={18} className="text-gray-700" />
          <h1 className="text-xl font-semibold">Admin Dashboard</h1>
        </div>
        <h1 className="hidden lg:block text-xl font-semibold">
          Admin Dashboard
        </h1>
      </div>

      <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 lg:hidden">
        <NavLink to="/admin" end className="hover:text-blue-600">
          Dashboard
        </NavLink>
        <NavLink to="/admin/products" className="hover:text-blue-600">
          Products
        </NavLink>
        <NavLink to="/admin/orders" className="hover:text-blue-600">
          Orders
        </NavLink>
        <NavLink to="/admin/users" className="hover:text-blue-600">
          Users
        </NavLink>
      </div>

      <div className="text-sm text-gray-600">
        {user ? `Welcome, ${user.name}` : ""}
      </div>
    </header>
  );
};

export default Topbar;
