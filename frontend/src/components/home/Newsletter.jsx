import { Mail } from "lucide-react";

const Newsletter = () => {
  return (
    <section className="py-20 bg-blue-700 text-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-white/20 p-4 rounded-full">
            <Mail size={40} />
          </div>
        </div>

        <h2 className="text-4xl font-bold">Stay Updated</h2>

        <p className="mt-4 text-blue-100">
          Subscribe to receive exclusive offers, discounts, and new arrivals.
        </p>

        <form
          className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="bg-white flex-1 max-w-md px-5 py-3 rounded-lg text-gray-800 outline-none"
          />

          <button className="cursor-pointer bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
