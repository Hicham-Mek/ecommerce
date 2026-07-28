import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-50 text-gray-700 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo */}

          <div>
            <h2 className="text-3xl font-bold text-gray-900">ShopHub</h2>

            <p className="mt-4 text-gray-600">
              Premium shopping experience with quality products and fast
              delivery.
            </p>
          </div>

          {/* Shop */}

          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Shop</h3>

            <ul className="space-y-3">
              <li>
                <Link to="/products" className="hover:text-blue-600">
                  Products
                </Link>
              </li>

              <li>
                <Link to="/categories" className="hover:text-blue-600">
                  Categories
                </Link>
              </li>

              <li>
                <Link to="/wishlist" className="hover:text-blue-600">
                  Wishlist
                </Link>
              </li>

              <li>
                <Link to="/cart" className="hover:text-blue-600">
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}

          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Account</h3>

            <ul className="space-y-3">
              <li>
                <Link to="/profile" className="hover:text-blue-600">
                  Profile
                </Link>
              </li>

              <li>
                <Link to="/orders" className="hover:text-blue-600">
                  Orders
                </Link>
              </li>

              <li>
                <Link to="/login" className="hover:text-blue-600">
                  Login
                </Link>
              </li>

              <li>
                <Link to="/register" className="hover:text-blue-600">
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}

          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Follow Us</h3>

            <div className="flex gap-4">
              <a href="#" className="hover:text-blue-600">
                <svg
                  xmlns="http://w3.org"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                </svg>
              </a>

              <a href="#" className="hover:text-blue-600">
                <svg
                  xmlns="http://w3.org"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>

              <a href="#" className="hover:text-blue-600">
                <svg
                  xmlns="http://w3.org"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>

              <a href="#" className="hover:text-blue-600">
                <svg
                  xmlns="http://w3.org"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
            </div>

            <p className="mt-6 text-gray-600">Email</p>

            <p className="text-gray-900 font-medium">support@shophub.com</p>
          </div>
        </div>

        <hr className="border-gray-200 my-10" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} ShopHub. All rights reserved.</p>

          <div className="flex gap-6">
            <Link to="#" className="hover:text-blue-600">
              Privacy Policy
            </Link>

            <Link to="#" className="hover:text-blue-600">
              Terms
            </Link>

            <Link to="#" className="hover:text-blue-600">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
