import { ShieldCheck, Globe2, Sprout, DollarSign, Package, Clock } from "lucide-react";

const features = [
  { icon: ShieldCheck, title: "Premium Quality Assurance", desc: "Rigorous testing at every stage ensures products meet international standards." },
  { icon: Globe2, title: "Global Logistics Network", desc: "Seamless supply chain across 10+ countries with real-time tracking." },
  { icon: Sprout, title: "Direct Farmer Sourcing", desc: "Ethically sourced from India's finest farms, ensuring freshness and quality." },
  { icon: DollarSign, title: "Competitive Export Pricing", desc: "Best-in-class pricing without compromising on quality or reliability." },
  { icon: Package, title: "Bulk Supply Capability", desc: "Large-scale order fulfillment with consistent quality across shipments." },
  { icon: Clock, title: "Timely Global Delivery", desc: "Punctual delivery schedules with optimized logistics routes worldwide." },
];

const WhyChooseUs = () => {
  return (
    <section id="why-us" className="w-full py-14 sm:py-20 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14">
          <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-primary mb-3 block">
            Why Choose Us
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3">
            The <span className="text-primary">Seven Hills</span> Advantage
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base leading-relaxed px-2">
            Delivering excellence at every step, from farm to international markets.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="bg-card p-5 sm:p-6 lg:p-7 hover:-translate-y-1 transition-transform duration-300 rounded-2xl border border-border shadow-sm"
            >
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3 sm:mb-4">
                <f.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <h3 className="text-sm sm:text-base lg:text-lg font-semibold mb-1.5 sm:mb-2 text-foreground">{f.title}</h3>
              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
