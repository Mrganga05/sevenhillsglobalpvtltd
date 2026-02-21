import { useState } from "react";
import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Ahmed Al-Rashid",
    country: "UAE",
    flag: "🇦🇪",
    text: "Seven Hills Global has been our trusted partner for over 3 years. Their turmeric and spice quality is unmatched in the Middle Eastern market.",
  },
  {
    name: "Sarah Chen",
    country: "Singapore",
    flag: "🇸🇬",
    text: "Exceptional consistency in product quality and timely deliveries. Their moringa and herbal powders have been bestsellers for our health food brand.",
  },
  {
    name: "James Okafor",
    country: "Nigeria",
    flag: "🇳🇬",
    text: "Competitive pricing with premium quality. Seven Hills is our go-to supplier for agricultural products from India. Highly recommended!",
  },
  {
    name: "Maria Santos",
    country: "Brazil",
    flag: "🇧🇷",
    text: "From first inquiry to delivery, the experience was world-class. The cashew nuts and sesame seeds quality exceeded our expectations.",
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  return (
    <section id="testimonials" className="py-24 section-gradient">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-sans font-semibold tracking-[0.2em] uppercase text-primary/70 mb-4 block">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold">
            Trusted <span className="gold-gradient-text">Worldwide</span>
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto relative">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4 }}
            className="glass-card p-10 md:p-12 text-center"
          >
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-lg md:text-xl text-foreground/80 font-sans leading-relaxed mb-8 italic">
              "{testimonials[current].text}"
            </p>
            <div className="text-4xl mb-3">{testimonials[current].flag}</div>
            <h4 className="text-lg font-serif font-semibold text-foreground">
              {testimonials[current].name}
            </h4>
            <p className="text-sm text-muted-foreground font-sans">{testimonials[current].country}</p>
          </motion.div>

          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full border border-border hover:border-primary hover:bg-primary/10 flex items-center justify-center transition-all"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    i === current ? "bg-primary w-8" : "bg-muted-foreground/30"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-12 h-12 rounded-full border border-border hover:border-primary hover:bg-primary/10 flex items-center justify-center transition-all"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
