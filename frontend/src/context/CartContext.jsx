import { createContext, useContext, useEffect, useState } from "react";
import cartService from "../services/cartService";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState({ items: [] });

  const fetchCart = async () => {
    if (!user) {
      setCart({ items: [] });
      return;
    }

    try {
      const res = await cartService.getCart();
      setCart(res.data || { items: [] });
    } catch (err) {
      console.error(err);
      setCart({ items: [] });
    }
  };

  const addToCart = async (productId) => {
    if (!user) return;

    await cartService.addToCart({
      product_id: productId,
      quantity: 1,
    });

    await fetchCart();
  };

  const updateQuantity = async (itemId, quantity) => {
    await cartService.updateCartItem(itemId, quantity);

    await fetchCart();
  };

  const removeItem = async (itemId) => {
    await cartService.removeCartItem(itemId);

    await fetchCart();
  };

  const clearCart = async () => {
    await cartService.clearCart();

    await fetchCart();
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
