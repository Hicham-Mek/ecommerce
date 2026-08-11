import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors((prev) => ({
      ...prev,
      [e.target.name]: null,
    }));

    setServerError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setErrors({});
    setServerError("");

    try {
      await register(formData);

      navigate("/login", {
        state: {
          success: "Registration successful! Please login.",
        },
      });
    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors || {});
      } else {
        setServerError(
          error.response?.data?.message ||
            "Something went wrong. Please try again.",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[var(--bg-main)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-sm rounded-2xl p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[var(--text-primary)] tracking-tight">Create Account</h1>
          <p className="text-[var(--text-secondary)] mt-2 text-sm">Join ShopHub for a seamless shopping experience</p>
        </div>

        {serverError && (
          <div className="rounded-xl bg-red-50 text-red-700 p-4 border border-red-200 text-sm font-medium">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            name="name"
            type="text"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            error={errors.name ? errors.name[0] : null}
            required
          />

          <Input
            label="Email Address"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            error={errors.email ? errors.email[0] : null}
            required
          />

          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            error={errors.password ? errors.password[0] : null}
            required
          />

          <Input
            label="Confirm Password"
            name="password_confirmation"
            type="password"
            placeholder="••••••••"
            value={formData.password_confirmation}
            onChange={handleChange}
            error={errors.password_confirmation ? errors.password_confirmation[0] : null}
            required
          />

          <Button
            type="submit"
            variant="primary"
            className="w-full mt-2"
            disabled={loading}
          >
            {loading ? "Registering..." : "Create Account"}
          </Button>
        </form>

        <p className="text-center text-sm text-[var(--text-secondary)] pt-2">
          Already have an account?{" "}
          <Link to="/login" className="text-[var(--color-primary-600)] font-semibold hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
