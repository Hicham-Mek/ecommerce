import { createContext, useContext, useEffect, useState } from "react";
import cartService from "../services/cartService";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);

  const fetchCart = async () => {
    try {
      const res = await cartService.getCart();
      setCart(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addToCart = async (productId) => {
    await cartService.addToCart({
      product_id: productId,
      quantity: 1,
    });

    fetchCart();
  };

  const updateQuantity = async (itemId, quantity) => {
    await cartService.updateCartItem(itemId, quantity);

    fetchCart();
  };

  const removeItem = async (itemId) => {
    await cartService.removeCartItem(itemId);

    fetchCart();
  };

  const clearCart = async () => {
    await cartService.clearCart();

    fetchCart();
  };

  useEffect(() => {
    fetchCart();
  }, []);

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