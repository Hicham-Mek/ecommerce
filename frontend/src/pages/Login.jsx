import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(form);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[var(--bg-main)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-sm rounded-2xl p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[var(--text-primary)] tracking-tight">Welcome Back</h1>
          <p className="text-[var(--text-secondary)] mt-2 text-sm">Sign in to your account to continue</p>
        </div>

        {error && (
          <div className="rounded-xl bg-red-50 text-red-700 p-4 border border-red-200 text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email Address"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            required
          />

          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            required
          />

          <Button
            type="submit"
            variant="primary"
            className="w-full mt-2"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <p className="text-center text-sm text-[var(--text-secondary)] pt-2">
          Don't have an account?{" "}
          <Link to="/register" className="text-[var(--color-primary-600)] font-semibold hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
