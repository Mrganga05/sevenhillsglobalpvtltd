import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Package, Globe, Users, TrendingUp } from "lucide-react";

const stats = [
  { icon: Package, value: 20, suffix: "+", label: "Export Products" },
  { icon: Globe, value: 10, suffix: "+", label: "Countries Served" },
  { icon: Users, value: 100, suffix: "+", label: "Business Clients" },
  { icon: TrendingUp, value: 5000, suffix: "+", label: "Tons Delivered" },
];

const Counter = ({ target, suffix }: { target: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) setStarted(true);
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, target]);

  return (
    <div ref={ref} className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold gold-gradient-text">
      {count.toLocaleString()}{suffix}
    </div>
  );
};

const StatsSection = () => {
  return (
    <section className="relative py-12 sm:py-20 section-gradient">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card p-4 sm:p-6 text-center group hover:gold-glow transition-shadow duration-500"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 mb-3 group-hover:bg-primary/20 transition-colors">
                <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <Counter target={stat.value} suffix={stat.suffix} />
              <p className="text-primary/50 font-sans mt-1.5 text-[10px] sm:text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
