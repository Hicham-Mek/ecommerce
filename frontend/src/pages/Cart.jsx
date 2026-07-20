import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import orderService from "../services/orderService";

const Cart = () => {
  const { cart, updateQuantity, removeItem, clearCart, fetchCart } = useCart();
  const navigate = useNavigate();

  if (!cart || !cart.items.length) return <h2>Your cart is empty.</h2>;
  const handleCheckout = async () => {
    try {
      await orderService.placeOrder();

      fetchCart();

      navigate("/orders");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="max-w-5xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      {cart.items.map((item) => (
        <div
          key={item.id}
          className="border rounded p-4 mb-4 flex justify-between"
        >
          <div>
            <h2>{item.product.name}</h2>

            <p>${item.product.price}</p>

            <p>Qty: {item.quantity}</p>
          </div>

          <div className="space-x-2">
            <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
              +
            </button>

            <button
              onClick={() => {
                if (item.quantity > 1) {
                  updateQuantity(item.id, item.quantity - 1);
                }
              }}
              disabled={item.quantity <= 1}
            >
              -
            </button>
            <button
              onClick={handleCheckout}
              className="bg-green-600 text-white px-5 py-2 rounded"
            >
              Place Order (COD)
            </button>

            <button onClick={() => removeItem(item.id)}>Remove</button>
          </div>
        </div>
      ))}

      <button
        onClick={clearCart}
        className="bg-red-600 text-white px-4 py-2 rounded"
      >
        Clear Cart
      </button>
    </div>
  );
};

export default Cart;
