import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Spinner from "../../components/common/Spinner";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import adminCategoryService from "../../services/adminCategoryService";

const EditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    is_active: 1,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCategory = async () => {
      try {
        const res = await adminCategoryService.getCategory(id);
        const category = res.data.data || res.data;

        setForm({
          name: category.name || "",
          is_active: category.is_active ? 1 : 0,
        });
      } catch (err) {
        console.error(err);
        setError("Failed to load category.");
      } finally {
        setLoading(false);
      }
    };

    loadCategory();
  }, [id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      await adminCategoryService.updateCategory(id, form);
      toast.success("Category updated successfully.");
      navigate("/admin/categories");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to update category.");
      setError(err.response?.data?.message || "Failed to update category.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-24">
        <Spinner size="lg" />
      </div>
    );
  }

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
          <h1 className="text-2xl font-bold text-[var(--text-primary)] tracking-tight">Edit Category</h1>
          <p className="text-[var(--text-secondary)] mt-1">Update category information.</p>
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
            isLoading={saving}
          >
            Update Category
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditCategory;
