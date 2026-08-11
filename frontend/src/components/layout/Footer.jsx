import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[var(--bg-main)] text-[var(--text-secondary)] border-t border-[var(--border-subtle)]">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] tracking-tight">ShopHub</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed max-w-xs">
              Premium shopping experience with quality products and fast delivery.
            </p>
          </div>

          {/* Shop */}
          <div className="space-y-4">
            <h3 className="text-[var(--text-primary)] font-semibold text-lg">Shop</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/products" className="hover:text-[var(--color-primary-600)] transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-[var(--color-primary-600)] transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="hover:text-[var(--color-primary-600)] transition-colors">
                  Wishlist
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-[var(--color-primary-600)] transition-colors">
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div className="space-y-4">
            <h3 className="text-[var(--text-primary)] font-semibold text-lg">Account</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/profile" className="hover:text-[var(--color-primary-600)] transition-colors">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/orders" className="hover:text-[var(--color-primary-600)] transition-colors">
                  Orders
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-[var(--color-primary-600)] transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-[var(--color-primary-600)] transition-colors">
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-[var(--text-primary)] font-semibold text-lg">Connect</h3>
            <div className="flex gap-4">
              <a href="#" className="text-[var(--text-muted)] hover:text-[var(--color-primary-600)] transition-colors">
                <svg xmlns="http://w3.org/2007/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                </svg>
              </a>
              <a href="#" className="text-[var(--text-muted)] hover:text-[var(--color-primary-600)] transition-colors">
                <svg xmlns="http://w3.org/2007/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="text-[var(--text-muted)] hover:text-[var(--color-primary-600)] transition-colors">
                <svg xmlns="http://w3.org/2007/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
            
            <div className="pt-4">
              <p className="text-sm">Email support</p>
              <a href="mailto:support@shophub.com" className="text-[var(--text-primary)] font-medium hover:text-[var(--color-primary-600)] transition-colors">
                support@shophub.com
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[var(--border-subtle)] mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>© {new Date().getFullYear()} ShopHub. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="#" className="hover:text-[var(--color-primary-600)] transition-colors">
              Privacy Policy
            </Link>
            <Link to="#" className="hover:text-[var(--color-primary-600)] transition-colors">
              Terms of Service
            </Link>
            <Link to="#" className="hover:text-[var(--color-primary-600)] transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
