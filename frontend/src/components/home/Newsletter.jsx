import { Mail } from "lucide-react";
import Button from "../common/Button";

const Newsletter = () => {
  return (
    <section className="py-24 bg-[var(--bg-main)]">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center bg-[var(--color-primary-600)] text-white rounded-3xl p-12 md:p-20 shadow-lg">
        <div className="flex justify-center mb-8">
          <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm">
            <Mail size={40} className="text-white" />
          </div>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Stay Updated
        </h2>

        <p className="text-[var(--color-primary-100)] text-lg max-w-xl mx-auto">
          Subscribe to receive exclusive offers, discounts, and new arrivals.
        </p>

        <form
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center max-w-xl mx-auto"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="bg-white flex-1 px-5 py-3 rounded-lg text-[var(--text-primary)] outline-none border-2 border-transparent focus:border-[var(--color-primary-300)] transition-colors shadow-sm"
            required
          />

          <Button type="submit" variant="secondary" size="lg" className="border-none text-[var(--color-primary-700)] hover:text-[var(--color-primary-800)] shadow-sm">
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
