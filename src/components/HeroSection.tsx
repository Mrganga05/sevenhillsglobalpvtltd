import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Indian agriculture and spices"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/60 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 to-transparent" />
      </div>

      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full"
          style={{
            top: `${15 + i * 10}%`,
            left: `${8 + i * 12}%`,
            background: i % 2 === 0 ? 'hsla(42, 85%, 55%, 0.3)' : 'hsla(155, 60%, 30%, 0.3)',
          }}
          animate={{
            y: [-20, 20, -20],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 3 + i * 0.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-6"
        >
          <span className="inline-block text-sm font-sans font-semibold tracking-[0.3em] uppercase text-primary/80 border border-primary/30 rounded-full px-6 py-2">
            Premium Agricultural Exports
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight mb-6"
        >
          From Nature's Fields
          <br />
          <span className="gold-gradient-text">to Global Markets</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto mb-10 font-sans"
        >
          Premium Indian agricultural exports with world-class logistics
          and uncompromising quality. Trusted by businesses across 10+ countries.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#products"
            className="gold-gradient-bg text-primary-foreground px-8 py-4 rounded-full text-lg font-semibold hover:opacity-90 transition-all duration-300 hover:scale-105 animate-pulse-gold"
          >
            Explore Products
          </a>
          <a
            href="#contact"
            className="border border-primary/40 text-foreground px-8 py-4 rounded-full text-lg font-semibold hover:bg-primary/10 transition-all duration-300 hover:scale-105"
          >
            Get Global Quote
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-primary/50 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
