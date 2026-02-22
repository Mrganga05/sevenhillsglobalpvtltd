import { motion } from "framer-motion";
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
    <section className="py-12 sm:py-20 section-gradient">
      <div className="container mx-auto px-3 sm:px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <span className="text-xs sm:text-sm font-sans font-semibold tracking-[0.2em] uppercase text-primary/70 mb-3 block">
            What Sets Us Apart
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-serif font-bold mb-3">
            The <span className="gold-gradient-text">Seven Hills</span> Promise
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="glass-card p-4 sm:p-6 group hover:gold-glow transition-all duration-500 text-center"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                <motion.div whileHover={{ rotate: 10, scale: 1.15 }} transition={{ type: "spring" }}>
                  <f.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </motion.div>
              </div>
              <h3 className="text-sm sm:text-base font-serif font-semibold mb-1.5 text-primary">{f.title}</h3>
              <p className="text-primary/40 font-sans text-[10px] sm:text-xs leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;
