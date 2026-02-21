import { motion } from "framer-motion";
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
    <section id="why-us" className="py-24 section-gradient">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-sans font-semibold tracking-[0.2em] uppercase text-primary/70 mb-4 block">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">
            The <span className="gold-gradient-text">Seven Hills</span> Advantage
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card p-8 group hover:gold-glow transition-all duration-500"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <f.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-serif font-semibold mb-3 text-foreground">{f.title}</h3>
              <p className="text-muted-foreground font-sans text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
