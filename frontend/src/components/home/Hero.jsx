import { Link } from "react-router-dom";
import Button from "../common/Button";

const Hero = () => {
  return (
    <section className="relative bg-[var(--text-primary)] text-white overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/30"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-32 md:py-40">
        <div className="max-w-2xl">
          <span className="inline-block bg-[var(--color-primary-600)] px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-6 shadow-sm">
            New Collection 2026
          </span>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight mb-6">
            Discover Premium Fashion
          </h1>

          <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-xl leading-relaxed">
            Shop the latest fashion trends with premium quality and unbeatable prices.
            Elevate your everyday style.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link to="/products">
              <Button size="lg" className="w-full sm:w-auto shadow-sm">
                Shop Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
