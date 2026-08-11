import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import api from "../../api/axios";
import Spinner from "../../components/common/Spinner";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import adminProductService from "../../services/adminProductService";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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

  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [productRes, categoriesRes] = await Promise.all([
          adminProductService.getProduct(id),
          api.get("/categories"),
        ]);

        const product = productRes.data;
        const categoriesData = categoriesRes.data.data || categoriesRes.data;

        setCategories(categoriesData);

        setForm({
          category_id: product.category_id ?? "",
          name: product.name ?? "",
          description: product.description ?? "",
          price: product.price ?? "",
          stock: product.stock ?? "",
          is_active: product.is_active ? 1 : 0,
          image: null,
        });

        if (product.image) {
          setPreview(
            product.image.startsWith('http') ? product.image : `http://127.0.0.1:8000/storage/${product.image}`,
          );
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load product data.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files[0]) {
      const file = files[0];
      setForm((prev) => ({
        ...prev,
        [name]: file,
      }));
      setPreview(URL.createObjectURL(file));
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const data = new FormData();
      data.append("_method", "PUT");
      data.append("category_id", form.category_id);
      data.append("name", form.name);
      data.append("description", form.description);
      data.append("price", form.price);
      data.append("stock", form.stock);
      data.append("is_active", form.is_active);

      if (form.image) {
        data.append("image", form.image);
      }

      await adminProductService.updateProduct(id, data);
      toast.success("Product updated successfully.");
      navigate("/admin/products");
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message ||
          "Failed to update product. Please check the form and try again.",
      );
      setError(
        err.response?.data?.message ||
          "Failed to update product. Please check the form and try again.",
      );
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    return () => {
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  if (loading) {
    return (
      <div className="py-24">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link 
          to="/admin/products" 
          className="p-2 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-surface)] hover:text-[var(--text-primary)] transition-colors border border-transparent hover:border-[var(--border-subtle)]"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)] tracking-tight">Edit Product</h1>
          <p className="text-[var(--text-secondary)] mt-1">Update your product information.</p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-[var(--bg-surface)] p-6 sm:p-8 rounded-2xl border border-[var(--border-subtle)] shadow-sm space-y-6"
      >
        {error && (
          <div className="rounded-lg bg-red-50 text-red-700 p-4 border border-red-200 text-sm font-medium">
            {error}
          </div>
        )}

        <div className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-sm font-medium text-[var(--text-primary)]">Product Name *</label>
            <Input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Wireless Headphones"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-[var(--text-primary)]">Category *</label>
            <select
              name="category_id"
              value={form.category_id}
              onChange={handleChange}
              required
              className="w-full bg-[var(--bg-main)] border border-[var(--border-subtle)] text-[var(--text-primary)] text-sm rounded-lg focus:ring-[var(--border-focus)] focus:border-[var(--border-focus)] block p-3 transition-colors"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-[var(--text-primary)]">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Product description..."
            rows="4"
            className="w-full bg-[var(--bg-main)] border border-[var(--border-subtle)] text-[var(--text-primary)] text-sm rounded-lg focus:ring-[var(--border-focus)] focus:border-[var(--border-focus)] block p-3 transition-colors resize-y"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-sm font-medium text-[var(--text-primary)]">Price ($) *</label>
            <Input
              type="number"
              step="0.01"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="0.00"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-[var(--text-primary)]">Stock Quantity *</label>
            <Input
              type="number"
              name="stock"
              value={form.stock}
              onChange={handleChange}
              placeholder="0"
              required
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-sm font-medium text-[var(--text-primary)]">Status</label>
            <select
              name="is_active"
              value={form.is_active}
              onChange={handleChange}
              className="w-full bg-[var(--bg-main)] border border-[var(--border-subtle)] text-[var(--text-primary)] text-sm rounded-lg focus:ring-[var(--border-focus)] focus:border-[var(--border-focus)] block p-3 transition-colors"
            >
              <option value={1}>Active (Visible)</option>
              <option value={0}>Inactive (Hidden)</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-[var(--text-primary)]">Product Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full text-sm text-[var(--text-secondary)] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[var(--color-primary-50)] file:text-[var(--color-primary-700)] hover:file:bg-[var(--color-primary-100)] file:cursor-pointer p-1.5"
            />
            {preview && (
              <div className="mt-4 relative inline-block">
                <img
                  src={preview}
                  alt="Product Preview"
                  className="w-24 h-24 object-cover rounded-lg border border-[var(--border-subtle)]"
                />
              </div>
            )}
          </div>
        </div>

        <div className="pt-4 flex items-center justify-end gap-3 border-t border-[var(--border-subtle)]">
          <Link to="/admin/products">
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            variant="primary"
            isLoading={saving}
          >
            Update Product
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
