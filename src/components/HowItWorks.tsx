import { Sprout, FlaskConical, Package, FileCheck, Plane } from "lucide-react";

const steps = [
  { icon: Sprout, number: 1, title: "Farmer Sourcing", desc: "Directly partnering with verified farmers across Andhra Pradesh and India." },
  { icon: FlaskConical, number: 2, title: "Quality Testing", desc: "Rigorous lab testing and grading to meet international export standards." },
  { icon: Package, number: 3, title: "Processing & Packing", desc: "Hygienic processing, grading, and custom packaging as per buyer specifications." },
  { icon: FileCheck, number: 4, title: "Documentation", desc: "APEDA, FSSAI and all export compliance documents prepared seamlessly." },
  { icon: Plane, number: 5, title: "Global Delivery", desc: "Air and sea freight to 30+ countries with real-time tracking." },
];

const HowItWorks = () => {
  return (
    <section id="process" className="w-full py-14 sm:py-20 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-primary mb-3 block">
            Our Export Process
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3">
            From Farm <span className="text-primary">to Your Door</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base leading-relaxed px-2">
            A transparent, quality-first supply chain ensuring the finest produce reaches global markets.
          </p>
        </div>

        {/* Mobile: vertical steps with numbered left badge */}
        <div className="flex flex-col gap-4 md:hidden">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="flex items-start gap-4"
            >
              {/* Number badge + connecting line */}
              <div className="flex flex-col items-center shrink-0">
                <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center shadow-md">
                  <span className="text-xs font-bold text-primary-foreground">{step.number}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className="w-px flex-1 min-h-[24px] bg-primary/20 mt-1" />
                )}
              </div>
              <div className="bg-card p-4 flex-1 rounded-2xl border border-border shadow-sm mb-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <step.icon className="w-4 h-4 text-primary" />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground">{step.title}</h3>
                </div>
                <p className="text-muted-foreground text-xs leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: alternating left/right with center timeline */}
        <div className="relative max-w-4xl mx-auto hidden md:block">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-primary/20 -translate-x-1/2" />

          <div className="space-y-12">
            {steps.map((step, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={step.number}
                  className={`relative flex items-center ${isLeft ? "flex-row" : "flex-row-reverse"}`}
                >
                  <div className={`w-[calc(50%-2.5rem)] ${isLeft ? "pr-0 text-right" : "pl-0 text-left"}`}>
                    <div className="bg-card rounded-2xl border border-border shadow-sm p-5 lg:p-6 inline-block w-full">
                      <div className={`flex items-center gap-3 mb-2 ${isLeft ? "flex-row-reverse" : "flex-row"}`}>
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                          <step.icon className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="text-base lg:text-lg font-semibold text-foreground">{step.title}</h3>
                      </div>
                      <p className={`text-muted-foreground text-xs sm:text-sm leading-relaxed ${isLeft ? "text-right" : "text-left"}`}>{step.desc}</p>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-primary items-center justify-center z-10 shadow-sm shrink-0">
                    <span className="text-sm font-bold text-primary-foreground">{step.number}</span>
                  </div>

                  <div className="w-[calc(50%-2.5rem)]" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
