import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Heart, ShoppingCart, Tag, Package } from "lucide-react";
import toast from "react-hot-toast";
import Spinner from "../components/common/Spinner";
import EmptyState from "../components/common/EmptyState";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import Button from "../components/common/Button";

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
    return (
      <div className="py-24">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="py-24">
        <EmptyState title="Product not found" description="The product you are looking for does not exist or has been removed." />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
        <div className="rounded-2xl overflow-hidden bg-[var(--bg-main)] border border-[var(--border-subtle)] flex items-center justify-center p-4">
          <img
            src={
              product.image
                ? product.image.startsWith("http")
                  ? product.image
                  : `http://127.0.0.1:8000/storage/${product.image}`
                : "https://placehold.co/800x800?text=No+Image"
            }
            alt={product.name}
            className="w-full h-auto object-cover rounded-xl shadow-sm aspect-square"
          />
        </div>

        <div className="flex flex-col py-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] tracking-tight leading-tight">
            {product.name}
          </h1>

          <div className="mt-6 flex items-baseline gap-4">
            <p className="text-3xl font-bold text-[var(--color-primary-600)] tracking-tight">
              ${Number(product.price).toFixed(2)}
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-[var(--text-secondary)]">
            <div className="inline-flex items-center gap-1.5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] px-3 py-1.5 rounded-full">
              <Tag size={16} className="text-[var(--text-muted)]" />
              <span className="font-medium text-[var(--text-primary)]">{product.category?.name || "Uncategorized"}</span>
            </div>
            
            <div className="inline-flex items-center gap-1.5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] px-3 py-1.5 rounded-full">
              <Package size={16} className="text-[var(--text-muted)]" />
              <span className={`font-medium ${product.stock > 0 ? "text-[var(--status-success)]" : "text-[var(--status-error)]"}`}>
                {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
              </span>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-[var(--border-subtle)]">
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3">Description</h3>
            <p className="text-[var(--text-secondary)] leading-relaxed text-lg">
              {product.description}
            </p>
          </div>

          <div className="mt-auto pt-10">
            {user ? (
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  variant="primary"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0 || isCartPending}
                  className="flex-1 gap-2 shadow-sm"
                >
                  <ShoppingCart size={20} />
                  {isCartPending ? "Adding..." : "Add to Cart"}
                </Button>

                <Button
                  size="lg"
                  variant={wishItem ? "secondary" : "outline"}
                  onClick={handleWishlistToggle}
                  disabled={isWishlistPending}
                  className={`gap-2 sm:w-auto ${wishItem ? "text-red-600 hover:text-red-700 bg-red-50 border-red-100 hover:bg-red-100 hover:border-red-200" : ""}`}
                >
                  <Heart size={20} fill={wishItem ? "currentColor" : "none"} className={wishItem ? "text-red-500" : ""} />
                  {isWishlistPending
                    ? "Updating..."
                    : wishItem
                      ? "Remove from Wishlist"
                      : "Add to Wishlist"}
                </Button>
              </div>
            ) : (
              <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl p-6 text-center">
                <p className="text-[var(--text-secondary)] font-medium mb-4">
                  Please sign in to add this product to your cart or wishlist.
                </p>
                <div className="flex justify-center gap-4">
                  <Button variant="outline" onClick={() => window.location.href = '/login'}>Sign In</Button>
                  <Button variant="primary" onClick={() => window.location.href = '/register'}>Create Account</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
