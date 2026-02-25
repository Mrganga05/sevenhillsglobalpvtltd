import { motion } from "framer-motion";
import { ClipboardCheck, PackageCheck, Ship, FileCheck, PhoneCall } from "lucide-react";

const steps = [
    {
        icon: PhoneCall,
        title: "1. Inquiry & Gathering",
        description: "We start by understanding your specific needs: product specifications, quality grades, MOQ, packaging requirements, and destination port to provide precise quotes."
    },
    {
        icon: ClipboardCheck,
        title: "2. Sourcing & Quality",
        description: "Once terms are agreed, we procure directly from our network of trusted farmers. Every batch undergoes rigorous lab testing for international compliance."
    },
    {
        icon: PackageCheck,
        title: "3. Processing & Packaging",
        description: "Products are cleaned and graded in state-of-the-art facilities. We offer private labeling and custom packaging tailored to your brand's unique identity."
    },
    {
        icon: FileCheck,
        title: "4. Documentation",
        description: "Our experts handle all paperwork, including Phytosanitary Certificates and Bill of Lading, ensuring a smooth transit without any regulatory hurdles."
    },
    {
        icon: Ship,
        title: "5. Logistics & Shipping",
        description: "We partner with leading freight forwarders to secure efficient sea or air routes, ensuring timely and safe delivery to your final destination."
    }
];

const ExportProcess = () => {
    return (
        <div className="bg-background pt-24 pb-16 min-h-screen relative overflow-hidden">
            <div className="absolute top-[10%] right-[-10%] w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-gold/5 rounded-full blur-[100px] sm:blur-[150px] -z-10"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-emerald/5 rounded-full blur-[100px] sm:blur-[150px] -z-10"></div>

            <div className="container mx-auto px-4 sm:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-4xl mx-auto mb-16 sm:mb-24"
                >
                    <div className="inline-flex items-center justify-center gap-2 mb-4">
                        <div className="h-px w-6 sm:w-8 bg-gold/50"></div>
                        <span className="text-[10px] sm:text-xs font-sans font-bold tracking-[0.2em] uppercase text-gold">
                            Our Methodology
                        </span>
                        <div className="h-px w-6 sm:w-8 bg-gold/50"></div>
                    </div>
                    <h1 className="text-3xl sm:text-5xl lg:text-7xl font-serif font-bold text-foreground mb-6 leading-tight">
                        Seamless <span className="gold-gradient-text">Export Process</span>
                    </h1>
                    <p className="text-muted-foreground text-sm sm:text-xl font-sans leading-relaxed max-w-2xl mx-auto">
                        From farm to fork, we maintain complete transparency and efficiency. Here's a look at our standardized global export journey.
                    </p>
                </motion.div>

                <div className="max-w-4xl mx-auto relative">
                    {/* Vertical Timeline Line */}
                    <div className="absolute left-[24px] sm:left-[39px] top-6 bottom-6 w-px bg-gradient-to-b from-gold/40 via-gold/10 to-transparent"></div>

                    <div className="space-y-10 sm:space-y-16">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.title}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="relative pl-14 sm:pl-28"
                            >
                                {/* Step Icon Node */}
                                <div className="absolute left-0 top-0 w-12 h-12 sm:w-20 sm:h-20 rounded-2xl bg-[#0F2E1C] border border-gold/30 flex items-center justify-center shadow-2xl shadow-gold/5 z-10 transition-transform hover:scale-110">
                                    <step.icon className="w-5 h-5 sm:w-8 sm:h-8 text-gold" />
                                </div>

                                <div className="glass-card p-6 sm:p-10 rounded-3xl border border-white/5 bg-card/20 hover:bg-card/40 hover:border-gold/20 transition-all duration-300">
                                    <h3 className="text-lg sm:text-2xl font-serif font-bold text-foreground mb-3">{step.title}</h3>
                                    <p className="text-muted-foreground font-sans leading-relaxed text-xs sm:text-base">
                                        {step.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExportProcess;
