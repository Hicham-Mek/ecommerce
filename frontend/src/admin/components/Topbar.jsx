import { Menu, UserCircle, Bell } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Topbar = () => {
  const { user } = useAuth();

  return (
    <header className="bg-[var(--bg-surface)] border-b border-[var(--border-subtle)] px-4 sm:px-8 py-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 lg:hidden">
          <button className="p-1.5 rounded-md text-[var(--text-secondary)] hover:bg-[var(--bg-main)] hover:text-[var(--text-primary)] transition-colors">
            <Menu size={20} />
          </button>
          <h1 className="text-lg font-bold text-[var(--text-primary)]">Store<span className="text-[var(--color-primary-600)]">Admin</span></h1>
        </div>
        <h1 className="hidden lg:block text-xl font-bold tracking-tight text-[var(--text-primary)]">
          Welcome back, {user?.name?.split(' ')[0] || 'Admin'} 👋
        </h1>
      </div>

      <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-[var(--text-secondary)] lg:hidden">
        <NavLink to="/admin" end className="hover:text-[var(--color-primary-600)] transition-colors">
          Dashboard
        </NavLink>
        <NavLink to="/admin/products" className="hover:text-[var(--color-primary-600)] transition-colors">
          Products
        </NavLink>
        <NavLink to="/admin/orders" className="hover:text-[var(--color-primary-600)] transition-colors">
          Orders
        </NavLink>
        <NavLink to="/admin/users" className="hover:text-[var(--color-primary-600)] transition-colors">
          Users
        </NavLink>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-[var(--text-secondary)] hover:bg-[var(--bg-main)] hover:text-[var(--text-primary)] rounded-full transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-1.5 right-2 w-2 h-2 bg-[var(--status-error)] rounded-full border-2 border-[var(--bg-surface)]"></span>
        </button>
        
        <div className="h-6 w-px bg-[var(--border-subtle)] mx-1 hidden sm:block"></div>
        
        <div className="flex items-center gap-3 pl-1">
          <div className="flex flex-col items-end hidden sm:flex">
            <span className="text-sm font-semibold text-[var(--text-primary)] leading-tight">{user ? user.name : "Admin User"}</span>
            <span className="text-xs text-[var(--text-muted)] font-medium">Administrator</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-[var(--color-primary-50)] text-[var(--color-primary-700)] flex items-center justify-center border border-[var(--color-primary-100)]">
            <UserCircle size={24} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
