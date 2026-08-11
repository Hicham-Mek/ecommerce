import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import Wishlist from "../pages/Wishlist";
import Checkout from "../pages/Checkout";
import Orders from "../pages/Orders";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";
import OrderDetails from "../pages/OrderDetails";
import AdminRoute from "./AdminRoute";
import ProtectedRoute from "./ProtectedRoute";
import AdminLayout from "../admin/layouts/AdminLayout";
import Dashboard from "../admin/pages/Dashboard";
import AdminProducts from "../admin/pages/Products";
import AdminCategories from "../admin/pages/Categories";
import AdminOrders from "../admin/pages/Orders";
import AdminUsers from "../admin/pages/Users";
import CreateProduct from "../admin/pages/CreateProduct";
import EditProduct from "../admin/pages/EditProduct";
import CreateCategory from "../admin/pages/CreateCategory";
import EditCategory from "../admin/pages/EditCategory";
import OrderDetailsAdmin from "../admin/pages/OrderDetails";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }
      />
      <Route
        path="/wishlist"
        element={
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        }
      />
      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        }
      />
      <Route
        path="/orders/:id"
        element={
          <ProtectedRoute>
            <OrderDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="products/create" element={<CreateProduct />} />
        <Route path="products/:id/edit" element={<EditProduct />} />

        <Route path="categories" element={<AdminCategories />} />
        <Route path="categories/create" element={<CreateCategory />} />
        <Route path="categories/:id/edit" element={<EditCategory />} />

        <Route path="orders" element={<AdminOrders />} />
        <Route path="orders/:id" element={<OrderDetailsAdmin />} />

        <Route path="users" element={<AdminUsers />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
