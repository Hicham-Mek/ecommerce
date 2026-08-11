import { Truck, ShieldCheck, RotateCcw, BadgeCheck } from "lucide-react";

const benefits = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Free delivery on all orders over $50.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payment",
    description: "100% secure checkout with trusted payment methods.",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "Return products within 30 days with no hassle.",
  },
  {
    icon: BadgeCheck,
    title: "Premium Quality",
    description: "Carefully selected products from trusted brands.",
  },
];

const Benefits = () => {
  return (
    <section className="py-24 bg-[var(--bg-surface)] border-y border-[var(--border-subtle)]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] tracking-tight">
            Why Shop With Us?
          </h2>
          <p className="text-[var(--text-secondary)] mt-4 max-w-2xl mx-auto text-lg">
            We provide the best shopping experience for our customers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="bg-[var(--bg-main)] rounded-2xl p-8 text-center border border-[var(--border-subtle)] shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="w-16 h-16 mx-auto rounded-full bg-teal-50 flex items-center justify-center mb-6">
                  <Icon className="text-[var(--color-primary-600)]" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">
                  {item.title}
                </h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
