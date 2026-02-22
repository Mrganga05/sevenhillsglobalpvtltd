import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-[85vh] sm:min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Seven Hills Global agricultural products showcase"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/50 to-transparent" />
        <div className="absolute inset-0" style={{ boxShadow: 'inset 0 0 150px 60px hsla(150, 40%, 5%, 0.7)' }} />
      </div>

      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary/30"
          style={{ top: `${20 + i * 12}%`, left: `${10 + i * 15}%` }}
          animate={{ y: [-15, 15, -15], opacity: [0.15, 0.5, 0.15] }}
          transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-3 sm:mb-6"
        >
          <span className="inline-block text-[10px] sm:text-sm font-sans font-semibold tracking-[0.15em] sm:tracking-[0.3em] uppercase text-primary/80 border border-primary/30 rounded-full px-3 sm:px-6 py-1 sm:py-2">
            Premium Agricultural Exports
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-serif font-bold leading-tight mb-3 sm:mb-6"
        >
          <span className="text-primary">From Nature's Fields</span>
          <br />
          <span className="gold-gradient-text">to Global Markets</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-xs sm:text-lg md:text-xl text-primary/50 max-w-2xl mx-auto mb-6 sm:mb-10 font-sans px-2"
        >
          Premium Indian agricultural exports with world-class logistics
          and uncompromising quality. Trusted by businesses across 10+ countries.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-4"
        >
          <a
            href="#products"
            className="w-full sm:w-auto gold-gradient-bg text-primary-foreground px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-lg font-semibold hover:opacity-90 transition-all duration-300 hover:scale-105 animate-pulse-gold"
          >
            Explore Products
          </a>
          <a
            href="#contact"
            className="w-full sm:w-auto border border-primary/40 text-primary px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-lg font-semibold hover:bg-primary/10 transition-all duration-300 hover:scale-105"
          >
            Get Global Quote
          </a>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 hidden sm:block"
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
