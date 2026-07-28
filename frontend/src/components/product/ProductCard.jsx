import React from "react";
import { Heart, ShoppingCart, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useAuth } from "../../context/AuthContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { wishlist, add, remove } = useWishlist();
  const { user } = useAuth();
  const wishItem = wishlist.find((item) => item.product_id === product.id);

  const handleAddToCart = async () => {
    try {
      await addToCart(product.id);
      toast.success("Added to cart");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add to cart");
    }
  };

  const handleWishlistToggle = async () => {
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
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
      <img
        src={
          product.image
            ? product.image.startsWith("http")
              ? product.image
              : `http://127.0.0.1:8000/storage/${product.image}`
            : "https://placehold.co/300x300?text=No+Image"
        }
        alt={product.name}
        className="w-full h-56 object-cover rounded"
      />

      <h2 className="text-xl font-semibold mt-4">{product.name}</h2>

      <p className="text-gray-500 mt-2 line-clamp-2">{product.description}</p>

      <p className="text-blue-600 font-bold text-lg mt-3">
        ${Number(product.price).toFixed(2)}
      </p>

      {user && (
        <div className="flex flex-wrap gap-2 mt-4">
          <button
            onClick={handleAddToCart}
            className=" cursor-pointer inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded"
          >
            <ShoppingCart size={16} />
            Add to Cart
          </button>
          <button
            className=" cursor-pointer inline-flex items-center gap-2 text-red-500"
            onClick={handleWishlistToggle}
          >
            <Heart size={16} fill={wishItem ? "currentColor" : "none"} />
            {wishItem ? "Remove" : "Wishlist"}
          </button>
        </div>
      )}
      <Link
        to={`/products/${product.id}`}
        className="inline-flex items-center gap-2 mt-4 bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200"
      >
        <Eye size={16} />
        View Details
      </Link>
    </div>
  );
};

export default ProductCard;
