import { useCart } from "../context/CartContext";
import { useNavigate, Link } from "react-router-dom";
import EmptyState from "../components/common/EmptyState";
import Button from "../components/common/Button";
import orderService from "../services/orderService";
import toast from "react-hot-toast";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";
import { useState } from "react";

const Cart = () => {
  const { cart, updateQuantity, removeItem, clearCart, fetchCart } = useCart();
  const navigate = useNavigate();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="py-24">
        <EmptyState 
          title="Your cart is empty" 
          description="Looks like you haven't added any products to your cart yet." 
        />
        <div className="flex justify-center mt-6">
          <Link to="/products">
            <Button variant="primary">Start Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  const subtotal = cart.items.reduce(
    (total, item) => total + Number(item.product.price) * item.quantity,
    0
  );

  const handleCheckout = async () => {
    try {
      setIsCheckingOut(true);
      await orderService.placeOrder();
      await fetchCart();
      toast.success("Order placed successfully!");
      navigate("/orders");
    } catch (err) {
      console.error(err);
      toast.error("Failed to place order.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="flex items-center gap-3 mb-10">
        <ShoppingBag size={32} className="text-[var(--color-primary-600)]" />
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] tracking-tight">
          Shopping Cart
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Cart Items List */}
        <div className="flex-1 space-y-6">
          {cart.items.map((item) => (
            <div
              key={item.id}
              className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl p-4 sm:p-6 flex flex-col sm:flex-row gap-6 items-center shadow-sm"
            >
              <Link to={`/products/${item.product.id}`} className="shrink-0 bg-[var(--bg-main)] rounded-lg overflow-hidden border border-[var(--border-subtle)]">
                <img
                  src={
                    item.product.image
                      ? item.product.image.startsWith("http")
                        ? item.product.image
                        : `http://127.0.0.1:8000/storage/${item.product.image}`
                      : "https://placehold.co/150x150?text=No+Image"
                  }
                  alt={item.product.name}
                  className="w-24 h-24 object-cover"
                />
              </Link>

              <div className="flex-1 text-center sm:text-left w-full">
                <Link to={`/products/${item.product.id}`}>
                  <h2 className="text-lg font-semibold text-[var(--text-primary)] hover:text-[var(--color-primary-600)] transition-colors line-clamp-1">
                    {item.product.name}
                  </h2>
                </Link>
                <p className="text-[var(--color-primary-600)] font-bold mt-1">
                  ${Number(item.product.price).toFixed(2)}
                </p>
              </div>

              <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                <div className="flex items-center bg-[var(--bg-main)] border border-[var(--border-subtle)] rounded-lg overflow-hidden">
                  <button
                    onClick={() => {
                      if (item.quantity > 1) {
                        updateQuantity(item.id, item.quantity - 1);
                      }
                    }}
                    disabled={item.quantity <= 1}
                    className="p-2 text-[var(--text-secondary)] hover:bg-[var(--bg-surface)] hover:text-[var(--text-primary)] disabled:opacity-50 transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-10 text-center font-medium text-[var(--text-primary)]">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-2 text-[var(--text-secondary)] hover:bg-[var(--bg-surface)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <div className="flex flex-col gap-2 items-end">
                  <p className="font-bold text-[var(--text-primary)]">
                    ${(Number(item.product.price) * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-sm text-[var(--status-error)] hover:text-red-700 flex items-center gap-1 transition-colors"
                  >
                    <Trash2 size={14} />
                    <span className="hidden sm:inline">Remove</span>
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-end pt-4">
            <Button
              variant="ghost"
              onClick={clearCart}
              className="text-[var(--status-error)] hover:bg-red-50 hover:text-red-700 gap-2"
            >
              <Trash2 size={18} />
              Clear Cart
            </Button>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="w-full lg:w-96">
          <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl p-6 shadow-sm sticky top-24">
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6 border-b border-[var(--border-subtle)] pb-4">
              Order Summary
            </h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-[var(--text-secondary)]">
                <span>Subtotal ({cart.items.length} items)</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[var(--text-secondary)]">
                <span>Shipping</span>
                <span className="text-[var(--status-success)] font-medium">Free</span>
              </div>
              <div className="border-t border-[var(--border-subtle)] pt-4 flex justify-between items-center">
                <span className="text-lg font-bold text-[var(--text-primary)]">Total</span>
                <span className="text-2xl font-bold text-[var(--color-primary-600)]">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
            </div>

            <Button
              variant="primary"
              size="lg"
              className="w-full gap-2 text-lg shadow-sm"
              onClick={handleCheckout}
              disabled={isCheckingOut}
            >
              {isCheckingOut ? "Processing..." : "Place Order (COD)"}
              {!isCheckingOut && <ArrowRight size={20} />}
            </Button>
            
            <p className="text-xs text-[var(--text-muted)] mt-4 text-center">
              Payment is collected upon delivery (Cash on Delivery).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
