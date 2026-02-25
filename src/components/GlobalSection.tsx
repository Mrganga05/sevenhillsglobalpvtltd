import { motion } from "framer-motion";
import { Globe2, Quote, Star } from "lucide-react";
import { useTestimonials } from "../hooks/useDatabase";

const GlobalSection = () => {
  const { data: testimonials, isLoading } = useTestimonials(6);

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-card/50 to-background" />

      {/* Decorative Orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[150px] -z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald/5 rounded-full blur-[150px] -z-10 pointer-events-none"></div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gold/10 flex items-center justify-center mx-auto border border-gold/20 shadow-lg shadow-gold/5 transform rotate-3">
              <Globe2 className="w-8 h-8 sm:w-10 sm:h-10 text-gold transform -rotate-3" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center justify-center gap-2 mb-4">
              <div className="h-px w-8 bg-gold/50"></div>
              <span className="text-xs sm:text-sm font-sans font-bold tracking-[0.2em] uppercase text-gold">
                Global Network
              </span>
              <div className="h-px w-8 bg-gold/50"></div>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-6 text-foreground">
              Exporting Excellence <span className="gold-gradient-text">Worldwide</span>
            </h2>

            <p className="text-sm sm:text-base text-muted-foreground font-sans max-w-2xl mx-auto mb-10 leading-relaxed">
              Connecting Indian farms to global markets through reliable logistics, premium packaging, and unwavering commitment to quality across 30+ countries.
            </p>

            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 gold-gradient-bg text-forest px-8 py-4 rounded-full text-base font-bold hover:shadow-lg hover:shadow-gold/20 transition-all duration-300 shine-sweep"
            >
              Start Export Partnership
            </a>
          </motion.div>
        </div>

        {/* Testimonials Section */}
        <div className="mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-foreground">Client <span className="gold-gradient-text">Testimonials</span></h3>
          </motion.div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="glass-card animate-pulse h-48 rounded-2xl border border-border/30"></div>
              ))}
            </div>
          ) : !testimonials || testimonials.length === 0 ? null : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial, i) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card p-6 rounded-2xl border border-border/50 bg-card/40 backdrop-blur-md relative group hover:border-gold/30 transition-all duration-300"
                >
                  <Quote className="absolute top-6 right-6 w-8 h-8 text-gold/10 group-hover:text-gold/20 transition-colors" />

                  <div className="flex mb-4">
                    {[...Array(5)].map((_, idx) => (
                      <Star
                        key={idx}
                        className={`w-4 h-4 ${idx < (testimonial.rating || 5) ? 'text-gold fill-gold' : 'text-muted-foreground/30'}`}
                      />
                    ))}
                  </div>

                  <p className="text-muted-foreground font-sans text-sm italic mb-6 leading-relaxed relative z-10 line-clamp-4">
                    "{testimonial.message}"
                  </p>

                  <div className="mt-auto border-t border-border/50 pt-4 flex items-center justify-between">
                    <div>
                      <p className="font-serif font-bold text-foreground text-sm">{testimonial.name}</p>
                      <p className="text-xs text-gold font-medium mt-0.5">{testimonial.country}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default GlobalSection;
