import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white overflow-hidden">
          <div className="grid lg:grid-cols-2 items-center">
            <div className="p-10 lg:p-16">
              <span className="uppercase text-sm tracking-widest">
                Limited Time Offer
              </span>

              <h2 className="text-5xl font-bold mt-4">Up To 50% OFF</h2>

              <p className="mt-6 text-lg text-blue-100">
                Discover exclusive deals on our newest collection before they're
                gone.
              </p>

              <Link
                to="/products"
                className="inline-block mt-8 bg-white text-blue-700 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition"
              >
                Shop Now
              </Link>
            </div>

            <div className="hidden lg:flex justify-center">
              <img
                src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80"
                alt="Sale"
                className="h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
