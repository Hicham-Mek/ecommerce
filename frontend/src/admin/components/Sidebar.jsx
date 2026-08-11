import { LayoutDashboard, Package, FolderTree, ShoppingBag, Users, Store, LogOut, Menu } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const { logout } = useAuth();

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-lg px-4 py-2.5 transition-colors font-medium ${
      isActive
        ? "bg-[var(--color-primary-50)] text-[var(--color-primary-700)]"
        : "text-[var(--text-secondary)] hover:bg-[var(--bg-main)] hover:text-[var(--text-primary)]"
    }`;

  return (
    <aside className="w-full bg-[var(--bg-surface)] border-r border-[var(--border-subtle)] min-h-screen p-5 flex flex-col shadow-[1px_0_10px_rgba(0,0,0,0.02)]">
      <div className="flex items-center justify-between lg:justify-start mb-8 pl-2">
        <div className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">
          Store<span className="text-[var(--color-primary-600)]">Admin</span>
        </div>
        <div className="lg:hidden rounded p-2 text-[var(--text-secondary)] cursor-pointer">
          <Menu size={20} />
        </div>
      </div>

      <nav className="space-y-1 flex-1">
        <div className="px-3 mb-2 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
          Main Menu
        </div>
        
        <NavLink to="/admin" end className={linkClass}>
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/admin/products" className={linkClass}>
          <Package size={20} />
          <span>Products</span>
        </NavLink>

        <NavLink to="/admin/categories" className={linkClass}>
          <FolderTree size={20} />
          <span>Categories</span>
        </NavLink>

        <NavLink to="/admin/orders" className={linkClass}>
          <ShoppingBag size={20} />
          <span>Orders</span>
        </NavLink>

        <NavLink to="/admin/users" className={linkClass}>
          <Users size={20} />
          <span>Users</span>
        </NavLink>
      </nav>

      <div className="pt-6 border-t border-[var(--border-subtle)] space-y-2">
        <Link
          to="/"
          className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-[var(--text-secondary)] hover:bg-[var(--bg-main)] hover:text-[var(--text-primary)] transition-colors font-medium"
        >
          <Store size={20} />
          <span>Back to Store</span>
        </Link>

        <button
          onClick={logout}
          className="w-full flex items-center gap-3 rounded-lg px-4 py-2.5 text-left text-[var(--status-error)] hover:bg-red-50 transition-colors font-medium"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
