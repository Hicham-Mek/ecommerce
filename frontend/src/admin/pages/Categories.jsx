import { useEffect, useState } from "react";
import { Edit, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Spinner from "../../components/common/Spinner";
import adminCategoryService from "../../services/adminCategoryService";

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
          "bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded",
        cancelButton:
          "bg-gray-500 hover:bg-gray-600 text-white font-medium px-4 py-2 rounded ml-2",
      },
    });

    if (!result.isConfirmed) return;

    try {
      await adminCategoryService.deleteCategory(id);
      await Swal.fire({
        title: "Deleted!",
        text: "The category was removed successfully.",
        icon: "success",
        confirmButtonColor: "#2563eb",
      });
      fetchCategories();
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Failed",
        text: error.response?.data?.message || "Unable to delete category.",
        icon: "error",
        confirmButtonColor: "#2563eb",
      });
    }
  };

  if (loading) return <Spinner />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Categories</h1>
        <Link
          to="/admin/categories/create"
          className="bg-blue-600 text-white px-4 py-2 rounded inline-flex items-center gap-2"
        >
          <Plus size={16} />
          Add Category
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Slug</th>
              <th className="p-3 text-left">Actions</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id} className="border-t">
                <td className="p-3">{category.name}</td>
                <td className="p-3">{category.slug}</td>
                <td className="p-3 space-x-3">
                  <Link
                    to={`/admin/categories/${category.id}/edit`}
                    className="inline-flex items-center gap-1 text-blue-600"
                  >
                    <Edit size={16} />
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="inline-flex items-center gap-1 text-red-600"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </td>
                <td>
                  {category.is_active ? (
                    <span className="text-green-600">Active</span>
                  ) : (
                    <span className="text-red-600">Inactive</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span className="font-medium">
          Page {page} of {lastPage}
        </span>

        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, lastPage))}
          disabled={page === lastPage}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Categories;
