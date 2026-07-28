import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative bg-gray-900 text-white overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-28">
        <div className="max-w-2xl">
          <span className="inline-block bg-blue-600 px-4 py-1 rounded-full text-sm font-semibold mb-6">
            New Collection 2026
          </span>

          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Discover Premium Fashion
          </h1>

          <p className="mt-6 text-lg text-gray-200">
            Shop the latest fashion trends with premium quality and unbeatable
            prices.
          </p>

          <div className="flex gap-4 mt-10">
            <Link
              to="/products"
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
