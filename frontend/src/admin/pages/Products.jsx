import { useEffect, useState } from "react";
import { Edit, Plus, Trash2, Package } from "lucide-react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Spinner from "../../components/common/Spinner";
import EmptyState from "../../components/common/EmptyState";
import Button from "../../components/common/Button";
import Badge from "../../components/common/Badge";
import adminProductService from "../../services/adminProductService";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await adminProductService.getProducts(page);
      setProducts(res.data.data || res.data);
      setLastPage(res.data.last_page || 1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

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
          "bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-lg transition-colors",
        cancelButton:
          "bg-gray-500 hover:bg-gray-600 text-white font-medium px-4 py-2 rounded-lg transition-colors ml-3",
      },
    });

    if (!result.isConfirmed) return;

    try {
      await adminProductService.deleteProduct(id);
      await Swal.fire({
        title: "Deleted!",
        text: "The product was removed successfully.",
        icon: "success",
        confirmButtonColor: "var(--color-primary-600)",
      });
      fetchProducts();
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Failed",
        text: error.response?.data?.message || "Unable to delete product.",
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
          <h1 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] tracking-tight">Products</h1>
          <p className="text-[var(--text-secondary)] mt-1">Manage your store's inventory and pricing.</p>
        </div>
        <Link to="/admin/products/create">
          <Button variant="primary" className="gap-2 w-full sm:w-auto">
            <Plus size={18} />
            Add Product
          </Button>
        </Link>
      </div>

      <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl shadow-sm overflow-hidden">
        {products.length === 0 ? (
          <div className="py-12">
            <EmptyState 
              title="No products found" 
              description="You haven't added any products to your store yet."
            />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-[var(--text-muted)] uppercase bg-[var(--bg-main)] border-b border-[var(--border-subtle)]">
                <tr>
                  <th className="px-6 py-4 font-semibold tracking-wider">Product</th>
                  <th className="px-6 py-4 font-semibold tracking-wider">Category</th>
                  <th className="px-6 py-4 font-semibold tracking-wider">Price</th>
                  <th className="px-6 py-4 font-semibold tracking-wider">Stock</th>
                  <th className="px-6 py-4 font-semibold tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-[var(--bg-main)] transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[var(--bg-main)] border border-[var(--border-subtle)] flex items-center justify-center shrink-0 overflow-hidden">
                          {product.image ? (
                            <img src={product.image.startsWith('http') ? product.image : `http://127.0.0.1:8000/storage/${product.image}`} alt={product.name} className="w-full h-full object-cover" />
                          ) : (
                            <Package size={20} className="text-[var(--text-muted)]" />
                          )}
                        </div>
                        <span className="font-medium text-[var(--text-primary)]">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[var(--text-secondary)]">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-[var(--bg-main)] border border-[var(--border-subtle)] text-xs font-medium">
                        {product.category?.name || "Uncategorized"}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-[var(--text-primary)]">
                      ${Number(product.price).toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={product.stock > 10 ? 'success' : product.stock > 0 ? 'warning' : 'danger'}>
                        {product.stock} in stock
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <Link
                        to={`/admin/products/${product.id}/edit`}
                        className="inline-flex items-center justify-center p-2 rounded-lg text-[var(--color-primary-600)] hover:bg-[var(--color-primary-50)] transition-colors"
                        title="Edit Product"
                      >
                        <Edit size={18} />
                      </Link>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="inline-flex items-center justify-center p-2 rounded-lg text-[var(--status-error)] hover:bg-red-50 transition-colors"
                        title="Delete Product"
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

export default Products;
