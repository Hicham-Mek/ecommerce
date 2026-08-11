import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import Spinner from "../common/Spinner";
import ProductCard from "../product/ProductCard";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products?sort=latest");

      const data = res.data.data || res.data;

      setProducts(data.slice(0, 8));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-24 bg-[var(--bg-main)]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <Spinner size="lg" />
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-[var(--bg-main)]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] tracking-tight">
              Featured Products
            </h2>
            <p className="text-[var(--text-secondary)] mt-3 text-lg">
              Discover our newest arrivals.
            </p>
          </div>

          <Link
            to="/products"
            className="text-[var(--color-primary-600)] font-medium hover:text-[var(--color-primary-700)] transition-colors inline-flex items-center gap-1 group"
          >
            View All 
            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
