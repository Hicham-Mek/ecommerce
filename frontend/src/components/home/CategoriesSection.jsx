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
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <Spinner />{" "}
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">Shop By Category</h2>

          <p className="text-gray-500 mt-3">Explore our product categories.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/products?category=${category.id}`}
              className="bg-white rounded-xl shadow hover:shadow-xl transition duration-300 p-6 text-center group"
            >
              <div className="w-24 h-24 mx-auto mb-4 overflow-hidden rounded-full bg-gray-100">
                <img
                  src={
                    category.image
                      ? `http://localhost:8000/storage/${category.image}`
                      : "https://placehold.co/200x200?text=Category"
                  }
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                />
              </div>

              <h3 className="font-bold text-lg">{category.name}</h3>

              {category.description && (
                <p className="text-gray-500 text-sm mt-2 line-clamp-2">
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
