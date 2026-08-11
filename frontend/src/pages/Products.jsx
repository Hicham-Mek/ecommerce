import React from "react";
import { useEffect, useState } from "react";
import api from "../api/axios";
import EmptyState from "../components/common/EmptyState";
import Spinner from "../components/common/Spinner";
import ProductCard from "../components/product/ProductCard";
import { useSearchParams } from "react-router-dom";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    () => searchParams.get("category") || "",
  );
  const [sort, setSort] = useState("latest");

  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  useEffect(() => {
    setSelectedCategory(searchParams.get("category") || "");
  }, [searchParams]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedCategory, sort]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/categories");
        const raw = response.data.data || response.data;
        const active = raw.filter(
          (cat) =>
            cat.is_active === undefined ||
            cat.is_active === null ||
            Number(cat.is_active) === 1 ||
            cat.is_active === true,
        );
        setCategories(active);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, []);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products", {
          params: {
            page: currentPage,
            search: search,
            category: selectedCategory,
            sort: sort,
          },
        });
        setProducts(response.data.data);
        setCurrentPage(response.data.current_page);
        setLastPage(response.data.last_page);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [search, selectedCategory, sort, currentPage]);

  if (loading) {
    return (
      <div className="py-24">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] tracking-tight mb-2">
          Products
        </h1>
        <p className="text-[var(--text-secondary)]">
          Explore our full range of premium quality products.
        </p>
      </div>

      <div className="bg-[var(--bg-surface)] p-6 rounded-xl border border-[var(--border-subtle)] shadow-sm mb-10">
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          <div className="w-full lg:flex-1">
            <Input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full sm:w-48 px-4 py-2 bg-[var(--bg-surface)] border border-[var(--border-strong)] rounded-md text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--border-focus)] focus:border-[var(--border-focus)] transition-colors"
            >
              <option value="">All Categories</option>

              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full sm:w-48 px-4 py-2 bg-[var(--bg-surface)] border border-[var(--border-strong)] rounded-md text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--border-focus)] focus:border-[var(--border-focus)] transition-colors"
            >
              <option value="latest">Latest</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        {products.length === 0 ? (
          <EmptyState 
            title="No products found" 
            description="We couldn't find any products matching your current filters. Try adjusting your search or category."
          />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {lastPage > 1 && (
              <div className="flex justify-center items-center gap-6 mt-16 pt-8 border-t border-[var(--border-subtle)]">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>

                <span className="text-[var(--text-secondary)] font-medium">
                  Page {currentPage} of {lastPage}
                </span>

                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === lastPage}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Products;
