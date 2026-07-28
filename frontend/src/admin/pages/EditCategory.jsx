import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../components/common/Spinner";
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

  if (loading) return <Spinner />;

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow space-y-4"
    >
      <h1 className="text-2xl font-bold">Edit Category</h1>

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
        disabled={saving}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {saving ? "Updating..." : "Update Category"}
      </button>
    </form>
  );
};

export default EditCategory;
