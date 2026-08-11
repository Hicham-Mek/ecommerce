import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import Spinner from "../common/Spinner";

const CategoriesSection = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/categories");

        setCategories(res.data.data || res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <section className="py-24 bg-[var(--bg-main)]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <Spinner size="lg" />
        </div>
      </section>
    );
  }

  const categoryImageUrl = (category) => {
    const localMap = {
      electronics: "/electronics.jpg",
      fashion: "/fashion.jpg",
      gaming: "/gaming.jpg",
      "home & kitchen": "/home.jpg",
      beauty: "/beauty.jpg",
      sports: "/sports.jpg",
      books: "/books.jpg",
      accessories: "/accesoires.jpg",
      baby: "/baby.jpg",
      grocery: "/grocery.jpg",
    };

    if (category.image) {
      return category.image.startsWith("http")
        ? category.image
        : `https://ecommerce-nx2k.onrender.com/storage/${category.image}`;
    }

    return localMap[category.name.toLowerCase()] || "/electronics.jpg";
  };

  return (
    <section className="py-24 bg-[var(--bg-main)]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] tracking-tight">
            Shop By Category
          </h2>
          <p className="text-[var(--text-secondary)] mt-4 max-w-2xl mx-auto text-lg">
            Explore our curated selection of product categories.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/products?category=${category.id}`}
              className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl shadow-sm hover:shadow-md hover:border-[var(--color-primary-300)] transition-all duration-300 p-6 text-center group flex flex-col items-center justify-center"
            >
              <div className="w-24 h-24 mx-auto mb-6 overflow-hidden rounded-full bg-[var(--bg-main)] flex-shrink-0">
                <img
                  src={categoryImageUrl(category)}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                />
              </div>

              <h3 className="font-semibold text-lg text-[var(--text-primary)] mb-2 group-hover:text-[var(--color-primary-600)] transition-colors">
                {category.name}
              </h3>

              {category.description && (
                <p className="text-[var(--text-muted)] text-sm line-clamp-2">
                  {category.description}
                </p>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
