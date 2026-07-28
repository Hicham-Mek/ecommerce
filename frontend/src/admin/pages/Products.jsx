import { useEffect, useState } from "react";
import { Edit, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Spinner from "../../components/common/Spinner";
import adminProductService from "../../services/adminProductService";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await adminProductService.getProducts();
      setProducts(res.data.data || res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete product?",
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
      await adminProductService.deleteProduct(id);
      await Swal.fire({
        title: "Deleted!",
        text: "The product was removed successfully.",
        icon: "success",
        confirmButtonColor: "#2563eb",
      });
      fetchProducts();
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Failed",
        text: error.response?.data?.message || "Unable to delete product.",
        icon: "error",
        confirmButtonColor: "#2563eb",
      });
    }
  };

  if (loading) return <Spinner />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <Link
          to="/admin/products/create"
          className="bg-blue-600 text-white px-4 py-2 rounded inline-flex items-center gap-2"
        >
          <Plus size={16} />
          Add Product
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Stock</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t">
                <td className="p-3">{product.name}</td>
                <td className="p-3">{product.category?.name}</td>
                <td className="p-3">${Number(product.price).toFixed(2)}</td>
                <td className="p-3">{product.stock}</td>
                <td className="p-3 space-x-3">
                  <Link
                    to={`/admin/products/${product.id}/edit`}
                    className="inline-flex items-center gap-1 text-blue-600"
                  >
                    <Edit size={16} />
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="inline-flex items-center gap-1 text-red-600"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
