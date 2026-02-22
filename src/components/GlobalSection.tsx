import { motion } from "framer-motion";
import { Globe2 } from "lucide-react";

const GlobalSection = () => {
  return (
    <section className="py-12 sm:py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-background" />
      
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-primary/10"
          style={{
            width: `${200 + i * 150}px`,
            height: `${200 + i * 150}px`,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 30 + i * 10, repeat: Infinity, ease: "linear" }}
        />
      ))}

      <div className="relative z-10 container mx-auto px-3 sm:px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Globe2 className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl md:text-5xl font-serif font-bold mb-4"
        >
          Exporting Excellence <span className="gold-gradient-text">Worldwide</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-sm sm:text-base text-primary/50 font-sans max-w-2xl mx-auto mb-8"
        >
          Connecting Indian farms to global markets through reliable logistics, premium packaging, and
          unwavering commitment to quality across 30+ countries.
        </motion.p>

        <motion.a
          href="#contact"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="inline-block gold-gradient-bg text-primary-foreground px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base font-semibold hover:opacity-90 transition-all duration-300 hover:scale-105"
        >
          Start Export Partnership
        </motion.a>
      </div>
    </section>
  );
};

export default GlobalSection;
