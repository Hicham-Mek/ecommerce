import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";
import Spinner from "../../components/common/Spinner";
import adminProductService from "../../services/adminProductService";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
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
          setPreview(`http://localhost:8000/storage/${product.image}`);
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
    return <Spinner />;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow space-y-4"
    >
      <h1 className="text-2xl font-bold">Edit Product</h1>

      {error && (
        <div className="rounded bg-red-100 text-red-700 p-3">{error}</div>
      )}

      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="w-40 h-40 object-cover rounded border"
        />
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

      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Update Product
      </button>
    </form>
  );
};

export default EditProduct;
