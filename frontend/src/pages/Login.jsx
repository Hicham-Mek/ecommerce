import React from 'react';
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const navigate = useNavigate();
    const { login } = useAuth();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        try {
            await login(form);

            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || "Login failed.");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-16 bg-white shadow-lg rounded-lg p-6">
            <h1 className="text-3xl font-bold mb-6">Login</h1>

            {error && (
                <p className="text-red-500 mb-4">{error}</p>
            )}

            <form onSubmit={handleSubmit}>
                <input
                    className="w-full border p-2 mb-4"
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                />

                <input
                    className="w-full border p-2 mb-4"
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                />

                <button className="w-full bg-blue-600 text-white py-2 rounded">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
