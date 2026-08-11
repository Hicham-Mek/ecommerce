import React from "react";
import { Heart, ShoppingCart, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useAuth } from "../../context/AuthContext";
import Button from "../common/Button";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { wishlist, add, remove } = useWishlist();
  const { user } = useAuth();
  const wishItem = wishlist.find((item) => item.product_id === product.id);

  const handleAddToCart = async (e) => {
    e.preventDefault(); // Prevent link navigation if inside a Link context
    try {
      await addToCart(product.id);
      toast.success("Added to cart");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add to cart");
    }
  };

  const handleWishlistToggle = async (e) => {
    e.preventDefault();
    try {
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
    }
  };

  return (
    <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl p-5 hover:border-[var(--color-primary-400)] hover:shadow-md transition-all duration-300 flex flex-col h-full group relative">
      {/* Wishlist Toggle Absolute (Premium UI pattern) */}
      {user && (
        <button
          onClick={handleWishlistToggle}
          className="absolute top-7 right-7 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-white text-[var(--text-secondary)] hover:text-red-500 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
          title={wishItem ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          <Heart size={18} fill={wishItem ? "#ef4444" : "none"} className={wishItem ? "text-red-500" : ""} />
        </button>
      )}

      <Link to={`/products/${product.id}`} className="block overflow-hidden rounded-lg mb-4 bg-[var(--bg-main)]">
        <img
          src={
            product.image
              ? product.image.startsWith("http")
                ? product.image
                : `http://127.0.0.1:8000/storage/${product.image}`
              : "https://placehold.co/300x300?text=No+Image"
          }
          alt={product.name}
          className="w-full aspect-[4/5] object-cover rounded-lg group-hover:scale-105 transition-transform duration-500 ease-out"
        />
      </Link>

      <div className="flex flex-col flex-grow">
        <Link to={`/products/${product.id}`}>
          <h2 className="text-lg font-semibold text-[var(--text-primary)] line-clamp-1 mb-1 group-hover:text-[var(--color-primary-600)] transition-colors">
            {product.name}
          </h2>
        </Link>
        <p className="text-sm text-[var(--text-secondary)] line-clamp-2 mb-4 flex-grow">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-[var(--border-subtle)]">
          <p className="text-xl font-bold text-[var(--text-primary)]">
            ${Number(product.price).toFixed(2)}
          </p>

          <div className="flex gap-2">
            {user ? (
              <Button
                variant="primary"
                size="sm"
                onClick={handleAddToCart}
                className="gap-2 px-3 shadow-sm"
                title="Add to Cart"
              >
                <ShoppingCart size={16} />
                <span className="hidden sm:inline">Add</span>
              </Button>
            ) : (
              <Link to={`/products/${product.id}`}>
                <Button variant="outline" size="sm" className="gap-2 px-3">
                  <Eye size={16} />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
