import { Link } from "react-router-dom";
import { ArrowRight, Leaf, Globe, ShieldCheck } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { motion } from "framer-motion";

const HeroSection = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  const floatVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section id="home" className="w-full relative min-h-[100vh] flex items-center justify-center overflow-hidden bg-background">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Slow zoom background image */}
        <motion.div
          className="w-full h-full"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "easeOut" }}
        >
          <img
            src={heroBg}
            alt="Seven Hills Global agricultural products showcase"
            className="w-full h-full object-cover object-center"
            loading="eager"
            decoding="async"
          />
        </motion.div>

        {/* Gradients - Reduced opacity by 20-30% */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/50 to-background/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/30 to-transparent" />

        {/* Animated Gold Particles Flowing Up - Optimized count and hardware acceleration */}
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute bg-primary/70 rounded-full pointer-events-none shadow-[0_0_10px_var(--primary)] ${i > 5 ? 'hidden sm:block' : ''}`}
            style={{
              width: Math.random() * 2 + 1 + "px",
              height: Math.random() * 2 + 1 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              willChange: "transform, opacity",
            }}
            animate={{
              y: [0, -Math.random() * 1200 - 600],
              x: [0, Math.random() * 200 - 100],
              opacity: [0, Math.random() * 0.7 + 0.3, 0],
              scale: [0.8, 1.5, 0.8]
            }}
            transition={{
              duration: Math.random() * 25 + 15,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 10,
            }}
          />
        ))}

        {/* Floating Leaves */}
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={`leaf-${i}`}
            className="absolute text-primary/20 pointer-events-none hidden sm:block"
            style={{
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              willChange: "transform",
            }}
            animate={{
              y: [0, -Math.random() * 100 - 50, 0],
              x: [0, Math.random() * 100 - 50, 0],
              rotate: [0, Math.random() * 360],
            }}
            transition={{
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Leaf size={Math.random() * 40 + 20} className="drop-shadow-lg" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 flex flex-col items-center justify-center h-full text-center">
        <motion.div
          className="max-w-4xl flex flex-col items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Elegant Premium Badge */}
          <motion.div variants={itemVariants} className="mb-8 flex items-center justify-center w-full">
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-r from-transparent to-primary"></div>
              <span className="text-[10px] sm:text-xs md:text-sm font-light uppercase tracking-[0.4em] text-primary drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]">
                TRUSTED GLOBAL EXPORT PARTNER
              </span>
              <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-l from-transparent to-primary"></div>
            </div>
          </motion.div>

          {/* Main Typography */}
          <motion.h1
            variants={itemVariants}
            className="text-[3rem] sm:text-6xl md:text-[5.5rem] lg:text-[7rem] xl:text-[8rem] font-extrabold leading-[0.95] mb-8 sm:mb-12 flex flex-col items-center text-balance tracking-normal"
          >
            {/* Animated SEVEN HILLS - Reduced Glow */}
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white/95 to-white/80 drop-shadow-[0_0_6px_rgba(255,255,255,0.15)] uppercase tracking-normal flex flex-wrap justify-center overflow-hidden py-1 sm:py-2" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.1)" }}>
              {"SEVEN HILLS".split("").map((letter, index) => (
                <motion.span
                  key={index}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.5,
                    ease: [0.2, 0.65, 0.3, 0.9],
                    delay: 0.5 + index * 0.05,
                  }}
                  className={letter === " " ? "w-[0.3em]" : "inline-block"}
                >
                  {letter}
                </motion.span>
              ))}
            </span>
            <span className="mt-1 sm:mt-2 lg:mt-3 flex flex-col lg:flex-row items-center justify-center lg:items-baseline lg:gap-8 uppercase">
              {/* Animated GLOBAL - Reduced Glow */}
              <span className="flex overflow-hidden text-primary drop-shadow-[0_0_6px_var(--primary)]">
                {"GLOBAL".split("").map((letter, index) => (
                  <motion.span
                    key={index}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.5,
                      ease: [0.2, 0.65, 0.3, 0.9],
                      delay: 1.2 + index * 0.08, // Starts after SEVEN HILLS
                    }}
                    className="inline-block"
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.div
            variants={itemVariants}
            className="text-[14px] sm:text-lg md:text-xl text-white/90 max-w-3xl leading-relaxed sm:leading-relaxed mb-10 sm:mb-12 text-balance font-light relative text-center mx-auto px-2 sm:px-0"
          >
            <span className="block font-medium text-white/90 text-sm sm:text-xl md:text-2xl drop-shadow-sm mb-2">Premium Indian Agricultural Exports to 10+ Countries Worldwide.</span>
            <span className="block font-medium text-primary text-sm sm:text-lg md:text-xl drop-shadow-[0_0_3px_var(--primary)]">Delivering Quality. Consistency. Global Standards.</span>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 w-full sm:w-auto mt-2">
            <Link
              to="/products"
              className="w-full sm:w-auto relative group inline-flex"
            >
              {/* Dynamic glowing aura - Reduced Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-primary/80 to-primary/40 rounded-full blur-md opacity-50 group-hover:opacity-80 transition duration-500 group-hover:animate-pulse"></div>

              <div className="relative w-full flex items-center justify-center gap-2.5 px-8 sm:px-10 py-3.5 sm:py-4 bg-gradient-to-r from-primary/95 to-primary/80 hover:from-primary hover:to-primary/90 rounded-full text-primary-foreground font-bold text-sm sm:text-base border border-white/20 overflow-hidden transform transition-all duration-300 group-hover:scale-[1.05] group-hover:-translate-y-1 shadow-[0_0_20px_-5px_var(--primary)] shadow-primary/30">
                {/* Advanced shine sweep effect */}
                <div className="absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[30deg] transition-all ease-in-out duration-1000 z-0 group-hover:translate-x-[150%]" />

                {/* Live pulsing dot */}
                <span className="relative flex h-2 w-2 z-10 mr-1">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-90"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>

                <span className="relative z-10 tracking-widest uppercase text-[13px] sm:text-[15px] drop-shadow-sm font-black">View Products</span>

                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="relative z-10"
                >
                  <ArrowRight className="w-5 h-5 ml-1 stroke-[3px]" />
                </motion.div>

                {/* Subtle border wrap */}
                <div className="absolute inset-0 rounded-full border border-transparent group-hover:border-white/40 transition-colors duration-300 z-10"></div>
              </div>
            </Link>

            <Link
              to="/contact"
              className="w-full sm:w-auto relative group inline-flex"
            >
              {/* Dynamic glowing aura for secondary button */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-white/20 to-white/5 rounded-full blur-md opacity-0 group-hover:opacity-100 transition duration-500"></div>

              <div className="relative w-full overflow-hidden flex items-center justify-center px-6 sm:px-8 py-3.5 sm:py-4 rounded-full border border-white/30 bg-white/5 backdrop-blur-md text-white font-bold text-xs sm:text-sm hover:bg-white/15 hover:border-white/50 hover:text-white transition-all duration-300 shadow-lg transform group-hover:scale-[1.05] group-hover:-translate-y-1">
                {/* Shine effect across the entire button on hover */}
                <div className="absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[30deg] transition-all ease-in-out duration-1000 z-0 group-hover:translate-x-[150%]" />
                <span className="relative z-10 tracking-widest uppercase drop-shadow-sm text-[12px] sm:text-[14px] font-bold">Get in Touch</span>
              </div>
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            variants={itemVariants}
            className="mt-12 sm:mt-16 pt-8 sm:pt-12 w-full"
          >
            <div className="grid grid-cols-3 gap-2 sm:flex sm:items-start sm:justify-center sm:gap-16 lg:gap-24">

              <div className="flex flex-col items-center gap-3 sm:gap-4 group p-2 sm:p-0 rounded-xl transition-colors">
                <div className="p-4 sm:p-5 rounded-full border border-primary bg-primary/5 transition-all shadow-[0_0_15px_-2px_var(--primary)] text-primary group-hover:shadow-[0_0_30px_0px_var(--primary)]">
                  <Globe className="w-6 h-6 sm:w-8 sm:h-8 drop-shadow-[0_0_8px_var(--primary)]" strokeWidth={1.5} />
                </div>
                <div className="text-center flex flex-col items-center">
                  <div className="text-xl sm:text-4xl font-extrabold text-white mb-2 tracking-tight drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]">10+</div>
                  <div className="text-[10px] sm:text-[13px] uppercase tracking-widest text-primary font-bold leading-relaxed drop-shadow-[0_0_8px_var(--primary)]">
                    Export<br />Destinations
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center gap-3 sm:gap-4 group p-2 sm:p-0 rounded-xl transition-colors relative">
                {/* Thin dividing lines acting as borders between items, visible only on sm+ */}
                <div className="hidden sm:block absolute -left-8 lg:-left-12 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
                <div className="hidden sm:block absolute -right-8 lg:-right-12 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>

                <div className="p-4 sm:p-5 rounded-full border border-primary bg-primary/5 transition-all shadow-[0_0_15px_-2px_var(--primary)] text-primary group-hover:shadow-[0_0_30px_0px_var(--primary)]">
                  <Leaf className="w-6 h-6 sm:w-8 sm:h-8 drop-shadow-[0_0_8px_var(--primary)]" strokeWidth={1.5} />
                </div>
                <div className="text-center flex flex-col items-center">
                  <div className="text-xl sm:text-4xl font-extrabold text-white mb-2 tracking-tight drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]">50+</div>
                  <div className="text-[10px] sm:text-[13px] uppercase tracking-widest text-primary font-bold leading-relaxed drop-shadow-[0_0_8px_var(--primary)]">
                    Agricultural<br />Products
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center gap-2 group p-2 sm:p-0 rounded-xl transition-colors">
                <div className="flex flex-col items-center gap-2 mb-1">
                  <div className="p-4 sm:p-5 rounded-full border border-primary bg-primary/5 transition-all shadow-[0_0_15px_-2px_var(--primary)] text-primary relative group-hover:shadow-[0_0_30px_0px_var(--primary)]">
                    <ShieldCheck className="w-6 h-6 sm:w-8 sm:h-8 relative z-10 drop-shadow-[0_0_8px_var(--primary)]" strokeWidth={1.5} />
                  </div>
                  <span className="text-[8px] sm:text-[10px] text-primary/90 font-bold uppercase tracking-widest drop-shadow-[0_0_8px_var(--primary)]">ISO | FSSAI</span>
                </div>
                <div className="text-center flex flex-col items-center">
                  <div className="text-[11px] sm:text-[14px] leading-relaxed font-bold text-white uppercase tracking-widest drop-shadow-[0_0_5px_rgba(255,255,255,0.4)]">
                    Certified<br />Quality<br />
                    <span className="text-primary font-extrabold drop-shadow-[0_0_10px_var(--primary)]">Standards</span>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
