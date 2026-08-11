import { Link } from "react-router-dom";
import Button from "../common/Button";

const Banner = () => {
  return (
    <section className="py-24 bg-[var(--bg-surface)]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-[var(--color-primary-600)] to-[var(--color-primary-800)] text-white overflow-hidden shadow-lg">
          <div className="grid lg:grid-cols-2 items-center">
            <div className="p-10 lg:p-16">
              <span className="uppercase text-sm tracking-widest font-bold opacity-90">
                Limited Time Offer
              </span>

              <h2 className="text-4xl md:text-5xl font-bold mt-4 tracking-tight leading-tight">
                Up To 50% OFF
              </h2>

              <p className="mt-6 text-lg text-[var(--color-primary-50)] max-w-md leading-relaxed">
                Discover exclusive deals on our newest collection before they're gone.
              </p>

              <div className="mt-10">
                <Link to="/products">
                  <Button variant="secondary" size="lg" className="border-none text-[var(--color-primary-700)] hover:text-[var(--color-primary-800)]">
                    Shop Now
                  </Button>
                </Link>
              </div>
            </div>

            <div className="hidden lg:flex justify-center h-full min-h-[400px]">
              <img
                src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80"
                alt="Sale"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
