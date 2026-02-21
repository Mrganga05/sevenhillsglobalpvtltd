import { motion } from "framer-motion";
import { Sprout, FlaskConical, Package, FileCheck, Plane } from "lucide-react";

const steps = [
  {
    icon: Sprout,
    number: 1,
    title: "Farmer Sourcing",
    desc: "Directly partnering with verified farmers across Andhra Pradesh and India.",
  },
  {
    icon: FlaskConical,
    number: 2,
    title: "Quality Testing",
    desc: "Rigorous lab testing and grading to meet international export standards.",
  },
  {
    icon: Package,
    number: 3,
    title: "Processing & Packing",
    desc: "Hygienic processing, grading, and custom packaging as per buyer specifications.",
  },
  {
    icon: FileCheck,
    number: 4,
    title: "Documentation",
    desc: "APEDA, FSSAI and all export compliance documents prepared seamlessly.",
  },
  {
    icon: Plane,
    number: 5,
    title: "Global Delivery",
    desc: "Air and sea freight to 30+ countries with real-time tracking.",
  },
];

const HowItWorks = () => {
  return (
    <section id="process" className="py-24 section-gradient">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-sans font-semibold tracking-[0.2em] uppercase text-primary/70 mb-4 block">
            Our Export Process
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">
            From Farm <span className="gold-gradient-text">to Your Door</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto font-sans">
            A transparent, quality-first supply chain ensuring the finest produce reaches global markets.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Connecting line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent -translate-x-1/2" />

          <div className="space-y-12 md:space-y-0">
            {steps.map((step, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className={`relative md:flex items-center md:mb-16 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Card */}
                  <div className={`md:w-[calc(50%-2rem)] ${isLeft ? "md:pr-0" : "md:pl-0"}`}>
                    <div className="glass-card p-6 group hover:gold-glow transition-all duration-500">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                          <step.icon className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="text-lg font-serif font-semibold text-foreground">{step.title}</h3>
                      </div>
                      <p className="text-muted-foreground font-sans text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>

                  {/* Center number badge */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full gold-gradient-bg items-center justify-center z-10 shadow-lg">
                    <span className="text-sm font-bold text-primary-foreground">{step.number}</span>
                  </div>

                  {/* Spacer */}
                  <div className="hidden md:block md:w-[calc(50%-2rem)]" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
