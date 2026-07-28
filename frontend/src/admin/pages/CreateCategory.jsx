import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import adminCategoryService from "../../services/adminCategoryService";

const CreateCategory = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    is_active: 1,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await adminCategoryService.createCategory(form);
      toast.success("Category created successfully.");
      navigate("/admin/categories");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to create category.");
      setError(err.response?.data?.message || "Failed to create category.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow space-y-4"
    >
      <h1 className="text-2xl font-bold">Add Category</h1>

      {error && (
        <div className="rounded bg-red-100 text-red-700 p-3">{error}</div>
      )}

      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Category name"
        className="w-full border p-2 rounded"
      />
      <select
        name="is_active"
        value={form.is_active}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      >
        <option value={1}>Active</option>
        <option value={0}>Inactive</option>
      </select>

      <button
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Category"}
      </button>
    </form>
  );
};

export default CreateCategory;
