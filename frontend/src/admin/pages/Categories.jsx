import { useEffect, useState } from "react";
import { Edit, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Spinner from "../../components/common/Spinner";
import EmptyState from "../../components/common/EmptyState";
import Button from "../../components/common/Button";
import adminCategoryService from "../../services/adminCategoryService";

import Badge from "../../components/common/Badge";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const fetchCategories = async () => {
    try {
      const res = await adminCategoryService.getCategories(page);
      setCategories(res.data.data || res.data);
      setLastPage(res.data.last_page || 1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [page]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete category?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      buttonsStyling: false,
      customClass: {
        confirmButton:
          "bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-lg transition-colors",
        cancelButton:
          "bg-gray-500 hover:bg-gray-600 text-white font-medium px-4 py-2 rounded-lg transition-colors ml-3",
      },
    });

    if (!result.isConfirmed) return;

    try {
      await adminCategoryService.deleteCategory(id);
      await Swal.fire({
        title: "Deleted!",
        text: "The category was removed successfully.",
        icon: "success",
        confirmButtonColor: "var(--color-primary-600)",
      });
      fetchCategories();
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Failed",
        text: error.response?.data?.message || "Unable to delete category.",
        icon: "error",
        confirmButtonColor: "var(--color-primary-600)",
      });
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
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] tracking-tight">Categories</h1>
          <p className="text-[var(--text-secondary)] mt-1">Organize your products into categories.</p>
        </div>
        <Link to="/admin/categories/create">
          <Button variant="primary" className="gap-2 w-full sm:w-auto">
            <Plus size={18} />
            Add Category
          </Button>
        </Link>
      </div>

      <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl shadow-sm overflow-hidden">
        {categories.length === 0 ? (
          <div className="py-12">
            <EmptyState 
              title="No categories found" 
              description="You haven't created any categories yet."
            />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-[var(--text-muted)] uppercase bg-[var(--bg-main)] border-b border-[var(--border-subtle)]">
                <tr>
                  <th className="px-6 py-4 font-semibold tracking-wider">Name</th>
                  <th className="px-6 py-4 font-semibold tracking-wider">Slug</th>
                  <th className="px-6 py-4 font-semibold tracking-wider">Status</th>
                  <th className="px-6 py-4 font-semibold tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                {categories.map((category) => (
                  <tr key={category.id} className="hover:bg-[var(--bg-main)] transition-colors group">
                    <td className="px-6 py-4 font-medium text-[var(--text-primary)]">
                      {category.name}
                    </td>
                    <td className="px-6 py-4 text-[var(--text-secondary)]">
                      {category.slug}
                    </td>
                    <td className="px-6 py-4">
                      <Badge status={category.is_active} />
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <Link
                        to={`/admin/categories/${category.id}/edit`}
                        className="inline-flex items-center justify-center p-2 rounded-lg text-[var(--color-primary-600)] hover:bg-[var(--color-primary-50)] transition-colors"
                        title="Edit Category"
                      >
                        <Edit size={18} />
                      </Link>
                      <button
                        onClick={() => handleDelete(category.id)}
                        className="inline-flex items-center justify-center p-2 rounded-lg text-[var(--status-error)] hover:bg-red-50 transition-colors"
                        title="Delete Category"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {lastPage > 1 && (
        <div className="flex justify-center items-center gap-6 mt-8 pt-4">
          <Button
            variant="outline"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            Previous
          </Button>

          <span className="text-[var(--text-secondary)] font-medium text-sm">
            Page {page} of {lastPage}
          </span>

          <Button
            variant="outline"
            onClick={() => setPage((prev) => Math.min(prev + 1, lastPage))}
            disabled={page === lastPage}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default Categories;
