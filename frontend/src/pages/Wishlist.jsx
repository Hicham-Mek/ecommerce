import React from "react";
import { Link } from "react-router-dom";
import EmptyState from "../components/common/EmptyState";
import { useWishlist } from "../context/WishlistContext";
import ProductCard from "../components/product/ProductCard";
import { Heart } from "lucide-react";
import Button from "../components/common/Button";

const Wishlist = () => {
  const { wishlist } = useWishlist();

  if (!wishlist.length) {
    return (
      <div className="py-24">
        <EmptyState 
          title="Your wishlist is empty" 
          description="Save items you love to your wishlist and they'll show up here."
        />
        <div className="flex justify-center mt-6">
          <Link to="/products">
            <Button variant="primary">Explore Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="flex items-center gap-3 mb-10">
        <Heart size={32} className="text-[var(--status-error)] fill-[var(--status-error)]" />
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] tracking-tight">
          My Wishlist
        </h1>
        <span className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-secondary)] px-3 py-1 rounded-full text-sm font-medium ml-2">
          {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
        {wishlist.map((item) => (
          <ProductCard key={item.id} product={item.product} />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
