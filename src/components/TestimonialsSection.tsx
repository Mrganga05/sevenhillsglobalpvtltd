import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useTestimonials } from "../hooks/useDatabase";

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);
  const { data: testimonials, isLoading, isError } = useTestimonials(5); // Fetch top 5

  const prev = () => {
    if (testimonials) {
      setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
    }
  };
  const next = () => {
    if (testimonials) {
      setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));
    }
  };

  if (isLoading) {
    return (
      <section id="testimonials" className="w-full py-14 sm:py-20 lg:py-24 section-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 animate-pulse">
            <div className="h-4 w-32 bg-primary/20 mx-auto rounded mb-4"></div>
            <div className="h-10 w-64 bg-primary/20 mx-auto rounded"></div>
          </div>
          <div className="max-w-3xl mx-auto relative glass-card p-8 h-80 animate-pulse"></div>
        </div>
      </section>
    );
  }

  if (isError || !testimonials || testimonials.length === 0) {
    return null; // Do not render if no testimonials
  }

  return (
    <section id="testimonials" className="w-full py-14 sm:py-20 lg:py-24 section-gradient overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-16"
        >
          <span className="text-xs sm:text-sm font-sans font-semibold tracking-[0.2em] uppercase text-primary/70 mb-4 block">
            Testimonials
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold">
            Trusted <span className="gold-gradient-text">Worldwide</span>
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto relative px-4">
          <div className="absolute top-0 left-0 -translate-x-4 -translate-y-4 opacity-10 pointer-events-none">
            <Quote className="w-16 h-16 sm:w-24 sm:h-24 text-primary fill-primary" />
          </div>

          <div className="relative z-10 min-h-[350px] sm:min-h-[320px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.4 }}
                className="glass-card p-6 sm:p-10 md:p-14 text-center w-full"
              >
                <div className="flex justify-center gap-1 mb-6 sm:mb-8">
                  {[...Array(testimonials[current].rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-primary text-primary" />
                  ))}
                </div>

                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-foreground font-serif leading-relaxed mb-8 sm:mb-10 italic">
                  "{testimonials[current].message}"
                </p>

                <div className="mt-auto">
                  <h4 className="text-lg sm:text-xl font-serif font-bold text-primary mb-1">
                    {testimonials[current].name}
                  </h4>
                  <p className="text-xs sm:text-sm text-primary/40 font-sans tracking-wider uppercase">
                    {testimonials[current].country}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {testimonials.length > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-10">
              <div className="flex gap-4">
                <button
                  onClick={prev}
                  aria-label="Previous testimonial"
                  className="w-12 h-12 rounded-full border border-primary/20 hover:border-primary hover:bg-primary/10 flex items-center justify-center transition-all group"
                >
                  <ChevronLeft className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                </button>
                <button
                  onClick={next}
                  aria-label="Next testimonial"
                  className="w-12 h-12 rounded-full border border-primary/20 hover:border-primary hover:bg-primary/10 flex items-center justify-center transition-all group"
                >
                  <ChevronRight className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                </button>
              </div>

              <div className="flex items-center gap-2.5">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${i === current ? "bg-primary w-10" : "bg-primary/20 w-2 hover:bg-primary/40"
                      }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
