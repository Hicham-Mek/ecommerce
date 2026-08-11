import React, { useState } from "react";
import {
  ShoppingCart,
  Heart,
  Package,
  LogOut,
  LogIn,
  UserPlus,
  Menu,
  X
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import Button from "../common/Button";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { wishlist } = useWishlist();
  const { cart } = useCart();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
  };

  const NavLinks = () => (
    <>
      <Link to="/" className={`font-medium transition-colors ${location.pathname === '/' ? 'text-[var(--color-primary-600)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}>
        Home
      </Link>
      <Link to="/products" className={`inline-flex items-center gap-1 font-medium transition-colors ${location.pathname === '/products' ? 'text-[var(--color-primary-600)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}>
        <Package size={16} />
        Products
      </Link>
      {user && (
        <>
          {user.role === "admin" && (
            <Link
              to="/admin"
              className="inline-flex items-center gap-1 font-medium text-[var(--color-primary-600)] hover:text-[var(--color-primary-700)] transition-colors"
            >
              <Package size={16} />
              Admin Dashboard
            </Link>
          )}
          <Link to="/orders" className={`inline-flex items-center gap-1 font-medium transition-colors ${location.pathname === '/orders' ? 'text-[var(--color-primary-600)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}>
            <Package size={16} />
            Orders
          </Link>
        </>
      )}
    </>
  );

  return (
    <nav className="bg-[var(--bg-surface)] border-b border-[var(--border-subtle)] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-[var(--text-primary)] tracking-tight">
          ShopHub
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8 items-center">
          <NavLinks />
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex gap-4 items-center">
          {user && (
            <div className="flex items-center gap-5 mr-2">
              <Link to="/wishlist" className="relative text-[var(--text-secondary)] hover:text-[var(--color-primary-600)] transition-colors">
                <Heart size={20} />
                {wishlist?.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[var(--status-error)] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>
              <Link to="/cart" className="relative text-[var(--text-secondary)] hover:text-[var(--color-primary-600)] transition-colors">
                <ShoppingCart size={20} />
                {cart?.items?.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[var(--color-primary-600)] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {cart.items.length}
                  </span>
                )}
              </Link>
            </div>
          )}

          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-[var(--text-secondary)]">
                Hi, {user.name}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="gap-2 text-[var(--status-error)] hover:bg-red-50 hover:text-red-700"
              >
                <LogOut size={16} />
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="ghost" size="sm" className="gap-2">
                  <LogIn size={16} />
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="primary" size="sm" className="gap-2">
                  <UserPlus size={16} />
                  Register
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-4">
          {user && (
            <Link to="/cart" className="relative text-[var(--text-secondary)]">
              <ShoppingCart size={20} />
              {cart?.items?.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-[var(--color-primary-600)] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {cart.items.length}
                </span>
              )}
            </Link>
          )}
          <button 
            className="text-[var(--text-secondary)] p-1 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] py-4 px-4 space-y-4 shadow-sm absolute w-full">
          <div className="flex flex-col gap-4">
            <NavLinks />
            {user && (
              <Link to="/wishlist" className="inline-flex items-center gap-2 font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                <Heart size={16} />
                Wishlist 
                {wishlist?.length > 0 && (
                  <span className="bg-[var(--status-error)] text-white text-xs px-2 py-0.5 rounded-full ml-auto">
                    {wishlist.length}
                  </span>
                )}
              </Link>
            )}
          </div>
          <div className="border-t border-[var(--border-subtle)] pt-4 flex flex-col gap-3">
             {user ? (
                <>
                  <span className="text-sm font-medium text-[var(--text-secondary)] px-2">
                    Signed in as {user.name}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="justify-start gap-2 text-[var(--status-error)] hover:bg-red-50 hover:text-red-700 w-full"
                  >
                    <LogOut size={16} />
                    Logout
                  </Button>
                </>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full justify-center gap-2">
                      <LogIn size={16} />
                      Login
                    </Button>
                  </Link>
                  <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="primary" className="w-full justify-center gap-2">
                      <UserPlus size={16} />
                      Register
                    </Button>
                  </Link>
                </div>
              )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
