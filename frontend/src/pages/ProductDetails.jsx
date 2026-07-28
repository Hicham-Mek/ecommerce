import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";
import Spinner from "../components/common/Spinner";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const ProductDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { addToCart } = useCart();
  const { wishlist, add, remove } = useWishlist();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isCartPending, setIsCartPending] = useState(false);
  const [isWishlistPending, setIsWishlistPending] = useState(false);

  const wishItem = wishlist.find((item) => item.product_id === product?.id);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!user || !product) return;

    try {
      setIsCartPending(true);
      await addToCart(product.id);
      toast.success("Added to cart");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add to cart");
    } finally {
      setIsCartPending(false);
    }
  };

  const handleWishlistToggle = async () => {
    if (!user || !product) return;

    try {
      setIsWishlistPending(true);
      if (wishItem) {
        await remove(wishItem.id);
        toast.success("Removed from wishlist");
      } else {
        await add(product.id);
        toast.success("Added to wishlist");
      }
    } catch (error) {
      console.error(error);
      toast.error("Wishlist action failed");
    } finally {
      setIsWishlistPending(false);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  if (!product) {
    return <h2>Product not found.</h2>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      <img
        src={
          product.image
            ? `http://127.0.0.1:8000/storage/${product.image}`
            : "https://placehold.co/500x500?text=No+Image"
        }
        alt={product.name}
        className="rounded-lg shadow"
      />

      <div>
        <h1 className="text-4xl font-bold">{product.name}</h1>

        <p className="text-2xl text-blue-600 font-bold mt-4">
          ${Number(product.price).toFixed(2)}
        </p>

        <p className="mt-4">
          <strong>Category:</strong> {product.category?.name}
        </p>

        <p className="mt-2">
          <strong>Stock:</strong>{" "}
          {product.stock > 0 ? "In Stock" : "Out of Stock"}
        </p>

        <p className="mt-6 text-gray-700">{product.description}</p>

        {user ? (
          <div className="flex flex-wrap gap-4 mt-8">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0 || isCartPending}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg transition"
            >
              <ShoppingCart size={18} />
              {isCartPending ? "Adding..." : "Add to Cart"}
            </button>

            <button
              onClick={handleWishlistToggle}
              disabled={isWishlistPending}
              className={`inline-flex items-center gap-2 border px-6 py-3 rounded-lg transition ${
                wishItem
                  ? "border-red-500 bg-red-50 text-red-600"
                  : "border-red-300 text-red-500 hover:bg-red-50"
              }`}
            >
              <Heart size={18} fill={wishItem ? "currentColor" : "none"} />
              {isWishlistPending
                ? "Updating..."
                : wishItem
                  ? "Remove from Wishlist"
                  : "Add to Wishlist"}
            </button>
          </div>
        ) : (
          <p className="mt-8 text-sm text-gray-500">
            Please sign in to add this product to your cart or wishlist.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
