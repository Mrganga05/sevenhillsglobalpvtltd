import { motion } from "framer-motion";
import { Globe, Navigation } from "lucide-react";

const regions = [
    { name: "Middle East", countries: "UAE, Saudi Arabia, Dubai", description: "Strategic hub for our spice exports and fresh agricultural produce." },
    { name: "Europe", countries: "UK, France, Netherlands", description: "Meeting premium demands for organic millets and specialty spices." },
    { name: "North America", countries: "USA, Canada", description: "Full FDA compliance with strict grading for export-grade grains." },
    { name: "Southeast Asia", countries: "Singapore, Malaysia", description: "Connecting South India's harvests to dynamic Asian markets." }
];

const GlobalPresence = () => {
    return (
        <div className="bg-background pt-24 pb-16 min-h-screen relative overflow-hidden">
            <div className="absolute top-[20%] right-[-10%] w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-gold/5 rounded-full blur-[80px] sm:blur-[150px] -z-10"></div>
            <div className="absolute bottom-[10%] left-[-10%] w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-emerald/5 rounded-full blur-[100px] sm:blur-[150px] -z-10"></div>

            <div className="container mx-auto px-4 sm:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-4xl mx-auto mb-12 sm:mb-24"
                >
                    <div className="inline-flex items-center justify-center gap-2 mb-4">
                        <div className="h-px w-6 sm:w-8 bg-gold/50"></div>
                        <span className="text-[10px] sm:text-xs font-sans font-bold tracking-[0.2em] uppercase text-gold">
                            Our Global Footprint
                        </span>
                        <div className="h-px w-6 sm:w-8 bg-gold/50"></div>
                    </div>
                    <h1 className="text-3xl sm:text-5xl lg:text-7xl font-serif font-bold text-foreground mb-6 leading-tight">
                        Bridging India to the <span className="gold-gradient-text">World</span>
                    </h1>
                    <p className="text-muted-foreground text-sm sm:text-xl font-sans leading-relaxed max-w-2xl mx-auto">
                        With strategic logistics and a direct field presence, we deliver India's finest to every major continent efficiently.
                    </p>
                </motion.div>

                {/* Map Section - Improved Responsiveness */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative w-full aspect-[4/3] sm:aspect-[2/1] md:aspect-[21/9] rounded-3xl overflow-hidden glass-card border border-white/5 mb-16 sm:mb-24 group shadow-2xl"
                >
                    <div className="absolute inset-0 bg-background/20 backdrop-blur-[1px] z-10 transition-all group-hover:backdrop-blur-none"></div>
                    <img
                        src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000"
                        alt="Global Export Network"
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-6">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gold/10 rounded-full flex items-center justify-center mb-6 border border-gold/40 animate-pulse">
                            <Globe className="w-8 h-8 sm:w-10 sm:h-10 text-gold" />
                        </div>
                        <h3 className="text-xl sm:text-4xl font-serif font-bold text-white mb-2 drop-shadow-lg">Global Logistics Ready</h3>
                        <p className="text-white/80 max-w-md font-sans text-xs sm:text-base leading-relaxed drop-shadow-md">
                            Seamlessly connecting our local harvests to international markets with zero friction.
                        </p>
                    </div>
                </motion.div>

                {/* Regions Grid - Optimized for Mobile */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {regions.map((region, index) => (
                        <motion.div
                            key={region.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="glass-card p-6 rounded-2xl border border-white/5 bg-card/20 hover:bg-card/40 hover:border-gold/30 transition-all group"
                        >
                            <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center border border-gold/20 mb-6 group-hover:rotate-12 transition-transform">
                                <Navigation className="w-6 h-6 text-gold" />
                            </div>
                            <h3 className="text-lg sm:text-xl font-serif font-bold text-foreground mb-2">{region.name}</h3>
                            <div className="text-[10px] font-bold uppercase tracking-widest gold-gradient-bg text-black px-3 py-1 rounded-full inline-block mb-4 shadow-lg shadow-gold/10">
                                {region.countries}
                            </div>
                            <p className="text-muted-foreground font-sans text-xs sm:text-sm leading-relaxed">
                                {region.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GlobalPresence;
