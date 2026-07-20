import React from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";

const Wishlist = () => {
  const { wishlist, remove } = useWishlist();

  if (!wishlist.length)
    return <div className="text-center mt-10">Wishlist is empty.</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>

      {wishlist.map((item) => (
        <div
          key={item.id}
          className="border rounded p-4 mb-4 flex justify-between"
        >
          <Link to={`/products/${item.product.id}`}>{item.product.name}</Link>

          <button onClick={() => remove(item.id)} className="text-red-500">
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default Wishlist;
