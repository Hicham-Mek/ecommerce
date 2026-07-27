import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import adminCategoryService from "../../services/adminCategoryService";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const res = await adminCategoryService.getCategories();
      setCategories(res.data.data || res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this category?")) return;

    try {
      await adminCategoryService.deleteCategory(id);
      fetchCategories();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <div>Loading categories...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Categories</h1>
        <Link
          to="/admin/categories/create"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
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
                    className="text-blue-600"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="text-red-600"
                  >
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
    </div>
  );
};

export default Categories;
