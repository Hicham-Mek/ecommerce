import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Layout from "./components/layout/Layout";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <Layout>
              <AppRoutes />
            </Layout>
            <Toaster position="top-right" />
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
