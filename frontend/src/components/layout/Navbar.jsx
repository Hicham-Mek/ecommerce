import React from 'react';
import { Link } from "react-router-dom";

const Navbar = () => {
  return  (
        <nav className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">

                <Link
                    to="/"
                    className="text-xl font-bold text-blue-600"
                >
                    E-Shop
                </Link>

                <div className="flex gap-6">

                    <Link to="/">Home</Link>

                    <Link to="/products">Products</Link>

                    <Link to="/login">Login</Link>

                    <Link to="/register">Register</Link>

                </div>

            </div>
        </nav>
    );
};

export default Navbar;
