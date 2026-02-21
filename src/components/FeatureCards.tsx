import { motion } from "framer-motion";
import { Leaf, Plane, Trophy, Handshake } from "lucide-react";

const features = [
  {
    icon: Leaf,
    title: "100% Natural",
    desc: "All products are naturally grown, free from artificial additives and preservatives.",
  },
  {
    icon: Plane,
    title: "Global Shipping",
    desc: "Reliable export logistics to destinations worldwide — air, sea, and land freight.",
  },
  {
    icon: Trophy,
    title: "Premium Quality",
    desc: "Rigorous quality checks ensure only the finest produce reaches your hands.",
  },
  {
    icon: Handshake,
    title: "Ethical Sourcing",
    desc: "Directly partnering with farmers for fair trade and transparent supply chains.",
  },
];

const FeatureCards = () => {
  return (
    <section className="py-24 section-gradient">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-sans font-semibold tracking-[0.2em] uppercase text-primary/70 mb-4 block">
            What Sets Us Apart
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">
            The <span className="gold-gradient-text">Seven Hills</span> Promise
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={{ y: -8, scale: 1.03 }}
              className="glass-card p-8 group hover:gold-glow transition-all duration-500 text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                <motion.div whileHover={{ rotate: 10, scale: 1.15 }} transition={{ type: "spring" }}>
                  <f.icon className="w-8 h-8 text-primary" />
                </motion.div>
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

export default FeatureCards;
