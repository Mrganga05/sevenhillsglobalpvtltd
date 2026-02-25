import { useEffect, useRef, useState } from "react";
import { Package, Globe, Users, TrendingUp } from "lucide-react";
import { useStats } from "../hooks/useDatabase";

const Counter = ({ target, suffix }: { target: number | string; suffix: string }) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const isStringTarget = typeof target === 'string';
  const numericTarget = isStringTarget ? parseInt(target.replace(/[^0-9]/g, ''), 10) || 0 : target;
  const displaySuffix = isStringTarget ? target.replace(/[0-9]/g, '') : suffix;

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
    if (!started || numericTarget === 0) return;
    const duration = 2000;
    const steps = 60;
    const increment = numericTarget / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= numericTarget) {
        setCount(numericTarget);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, numericTarget]);

  return (
    <div ref={ref} className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary">
      {numericTarget > 0 ? count.toLocaleString() : "0"}{displaySuffix}
    </div>
  );
};

const StatsSection = () => {
  const { data: statsData, isLoading } = useStats();

  const statsList = [
    { icon: Package, value: statsData?.product_categories || 0, suffix: "+", label: "Product Categories" },
    { icon: Globe, value: statsData?.countries_served || 0, suffix: "+", label: "Countries Served" },
    { icon: Users, value: statsData?.happy_clients || 0, suffix: "+", label: "Happy Clients" },
    { icon: TrendingUp, value: statsData?.export_volume || "0", suffix: "", label: "Export Volume" },
  ];

  return (
    <section className="w-full py-14 sm:py-20 lg:py-24 relative bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse h-36 rounded-xl border border-border bg-card"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
            {statsList.map((stat, i) => (
              <div
                key={stat.label}
                className="bg-card p-5 sm:p-6 lg:p-8 text-center rounded-2xl border border-border shadow-sm hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="inline-flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-xl bg-primary/10 mb-3 sm:mb-4">
                  <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <Counter target={stat.value} suffix={stat.suffix} />
                <p className="text-muted-foreground mt-2 text-xs sm:text-sm font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default StatsSection;
