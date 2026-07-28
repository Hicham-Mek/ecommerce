import {
  ShoppingCart,
  Heart,
  Package,
  LogOut,
  LogIn,
  UserPlus,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useWishlist } from "../../context/WishlistContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { wishlist } = useWishlist();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600">
          E-Shop
        </Link>

        <div className="flex gap-6 items-center">
          <Link to="/">Home</Link>

          <Link to="/products" className="inline-flex items-center gap-1">
            <Package size={16} />
            Products
          </Link>
          {user && (
            <>
              {user.role === "admin" && (
                <Link
                  to="/admin"
                  className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800"
                >
                  <Package size={16} />
                  Admin Dashboard
                </Link>
              )}

              <Link to="/cart" className="inline-flex items-center gap-1">
                <ShoppingCart size={16} />
                Cart
              </Link>
              <Link to="/orders" className="inline-flex items-center gap-1">
                <Package size={16} />
                Orders
              </Link>
              <Link to="/wishlist" className="inline-flex items-center gap-1">
                <Heart size={16} />
                Wishlist ({wishlist.length})
              </Link>
            </>
          )}

          {user ? (
            <>
              <span>Welcome, {user.name}</span>

              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1 text-red-600 hover:text-red-800"
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="inline-flex items-center gap-1">
                <LogIn size={16} />
                Login
              </Link>

              <Link to="/register" className="inline-flex items-center gap-1">
                <UserPlus size={16} />
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
