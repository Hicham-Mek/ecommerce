import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import adminCategoryService from "../../services/adminCategoryService";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

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
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link 
          to="/admin/categories" 
          className="p-2 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-surface)] hover:text-[var(--text-primary)] transition-colors border border-transparent hover:border-[var(--border-subtle)]"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)] tracking-tight">Add Category</h1>
          <p className="text-[var(--text-secondary)] mt-1">Create a new category for products.</p>
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

        <div className="space-y-1">
          <label className="text-sm font-medium text-[var(--text-primary)]">Category Name *</label>
          <Input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. Electronics"
            required
          />
        </div>

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

        <div className="pt-4 flex items-center justify-end gap-3 border-t border-[var(--border-subtle)]">
          <Link to="/admin/categories">
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            variant="primary"
            isLoading={loading}
          >
            Save Category
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateCategory;
