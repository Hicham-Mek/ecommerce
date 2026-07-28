import { Menu } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const { logout } = useAuth();

  const linkClass = ({ isActive }) =>
    `block rounded px-4 py-2 transition ${
      isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-200"
    }`;

  return (
    <aside className="w-full lg:w-64 bg-white border-r min-h-screen p-4 flex flex-col">
      <div className="flex items-center justify-between lg:justify-start mb-8">
        <div className="text-2xl font-bold text-blue-600">Admin Panel</div>
        <div className="lg:hidden rounded p-2 text-gray-600">
          <Menu size={20} />
        </div>
      </div>

      <nav className="space-y-2 flex-1">
        <NavLink to="/admin" end className={linkClass}>
          Dashboard
        </NavLink>

        <NavLink to="/admin/products" className={linkClass}>
          Products
        </NavLink>

        <NavLink to="/admin/categories" className={linkClass}>
          Categories
        </NavLink>

        <NavLink to="/admin/orders" className={linkClass}>
          Orders
        </NavLink>

        <NavLink to="/admin/users" className={linkClass}>
          Users
        </NavLink>
      </nav>

      <div className="pt-4 border-t space-y-2">
        <Link
          to="/"
          className="block rounded px-4 py-2 text-gray-700 hover:bg-gray-200"
        >
          Back to Store
        </Link>

        <button
          onClick={logout}
          className="w-full rounded px-4 py-2 text-left text-red-600 hover:bg-red-50"
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
