import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

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

          <Link to="/products">Products</Link>
          <Link to="/cart">Cart</Link>
          {user && <Link to="/orders">My Orders</Link>}

          {user ? (
            <>
              <span>Welcome, {user.name}</span>

              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-800"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>

              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
