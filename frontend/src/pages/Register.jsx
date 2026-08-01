import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

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
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: null,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setErrors({});

    try {
      await register(formData);

      alert("Registration successful!");

      navigate("/login");
    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        alert(JSON.stringify(error.response?.data, null, 2) || error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-white shadow-lg rounded-lg p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Register</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-md p-3"
          />

          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name[0]}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-md p-3"
          />

          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email[0]}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border rounded-md p-3"
          />

          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password[0]}</p>
          )}
        </div>

        {/* Password Confirmation */}
        <div>
          <input
            type="password"
            name="password_confirmation"
            placeholder="Confirm Password"
            value={formData.password_confirmation}
            onChange={handleChange}
            className="w-full border rounded-md p-3"
          />

          {errors.password_confirmation && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password_confirmation[0]}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md disabled:bg-gray-400"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      <p className="text-center mt-6">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
