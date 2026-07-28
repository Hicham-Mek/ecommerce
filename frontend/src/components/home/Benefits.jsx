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
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">Why Shop With Us?</h2>

          <p className="text-gray-500 mt-3">
            We provide the best shopping experience for our customers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow hover:shadow-xl transition p-8 text-center"
              >
                <div className="w-16 h-16 mx-auto rounded-full bg-blue-100 flex items-center justify-center">
                  <Icon className="text-blue-600" size={32} />
                </div>

                <h3 className="mt-6 text-xl font-bold">{item.title}</h3>

                <p className="text-gray-500 mt-3">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
