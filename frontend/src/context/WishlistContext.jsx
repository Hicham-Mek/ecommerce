import { createContext, useContext, useEffect, useState } from "react";
import wishlistService from "../services/wishlistService";
import { useAuth } from "./AuthContext";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth();

  const [wishlist, setWishlist] = useState([]);

  const fetchWishlist = async () => {
    if (!user) {
      setWishlist([]);
      return;
    }

    try {
      const res = await wishlistService.getWishlist();
      setWishlist(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [user]);

  const add = async (productId) => {
    await wishlistService.addToWishlist(productId);
    fetchWishlist();
  };

  const remove = async (wishlistId) => {
    await wishlistService.removeFromWishlist(wishlistId);
    fetchWishlist();
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        add,
        remove,
        fetchWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
