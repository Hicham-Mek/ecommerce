import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import adminProductService from "../../services/adminProductService";

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    category_id: "",
    name: "",
    description: "",
    price: "",
    stock: "",
    is_active: 1,
    image: null,
  });

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await api.get("/categories");
        setCategories(res.data.data || res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load categories.");
      }
    };

    loadCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        if (key === "image" && !value) return;
        data.append(key, value);
      });

      await adminProductService.createProduct(data);
      navigate("/admin/products");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to create product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow space-y-4"
    >
      <h1 className="text-2xl font-bold">Add Product</h1>

      {error && (
        <div className="rounded bg-red-100 text-red-700 p-3">{error}</div>
      )}

      <select
        name="category_id"
        value={form.category_id}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      >
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
        className="w-full border p-2 rounded"
      />

      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full border p-2 rounded"
      />

      <input
        name="price"
        value={form.price}
        onChange={handleChange}
        placeholder="Price"
        className="w-full border p-2 rounded"
      />

      <input
        name="stock"
        value={form.stock}
        onChange={handleChange}
        placeholder="Stock"
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

      <input
        type="file"
        name="image"
        onChange={handleChange}
        className="w-full"
      />

      <button
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Product"}
      </button>
    </form>
  );
};

export default CreateProduct;
