import { Leaf, Plane, Trophy, Handshake } from "lucide-react";

const features = [
  {
    icon: Leaf,
    title: "100% Natural",
    desc: "Naturally grown, free from artificial additives and preservatives.",
  },
  {
    icon: Plane,
    title: "Global Shipping",
    desc: "Reliable export logistics worldwide — air, sea, and land freight.",
  },
  {
    icon: Trophy,
    title: "Premium Quality",
    desc: "Rigorous quality checks ensure only the finest produce.",
  },
  {
    icon: Handshake,
    title: "Ethical Sourcing",
    desc: "Fair trade partnerships with farmers for transparent supply chains.",
  },
];

const FeatureCards = () => {
  return (
    <section className="w-full py-14 sm:py-20 lg:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14">
          <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-primary mb-3 block">
            What Sets Us Apart
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3">
            The <span className="text-primary">Seven Hills</span> Promise
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="bg-card p-4 sm:p-6 lg:p-8 hover:-translate-y-1 transition-transform duration-300 text-center rounded-2xl border border-border shadow-sm"
            >
              <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <f.icon className="w-5 h-5 sm:w-7 sm:h-7 text-primary" />
              </div>
              <h3 className="text-sm sm:text-base lg:text-lg font-semibold mb-1.5 sm:mb-2 text-foreground">{f.title}</h3>
              <p className="text-muted-foreground text-[10px] sm:text-xs lg:text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;
