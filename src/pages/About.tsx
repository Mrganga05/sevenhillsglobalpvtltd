import { motion } from "framer-motion";
import { Leaf, ShieldCheck, Globe, ThumbsUp } from "lucide-react";

const About = () => {
    return (
        <div className="bg-background pt-24 pb-16 min-h-screen relative overflow-hidden">
            <div className="absolute top-[-10%] right-[-5%] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-gold/5 rounded-full blur-[80px] sm:blur-[120px] -z-10 pointer-events-none"></div>
            <div className="absolute bottom-[-10%] left-[-5%] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-emerald/5 rounded-full blur-[80px] sm:blur-[120px] -z-10 pointer-events-none"></div>

            <div className="container mx-auto px-4 sm:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-4xl mx-auto mb-12 sm:mb-20"
                >
                    <div className="inline-flex items-center justify-center gap-2 mb-4">
                        <div className="h-px w-6 sm:w-8 bg-gold/50"></div>
                        <span className="text-[10px] sm:text-sm font-sans font-bold tracking-[0.2em] uppercase text-gold">
                            Our Story
                        </span>
                        <div className="h-px w-6 sm:w-8 bg-gold/50"></div>
                    </div>
                    <h1 className="text-3xl sm:text-5xl lg:text-7xl font-serif font-bold text-foreground mb-6 leading-tight">
                        Pioneering <span className="gold-gradient-text">Agricultural Excellence</span>
                    </h1>
                    <p className="text-muted-foreground text-sm sm:text-xl font-sans leading-relaxed max-w-2xl mx-auto">
                        Seven Hills Global Pvt Ltd is a premier exporter of Indian agricultural goods. We bridge the gap between hard-working Indian farmers and international markets demanding top-tier quality.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-10 lg:gap-20 items-center mb-24 sm:mb-32">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-2xl sm:text-4xl font-serif font-bold text-foreground mb-6">Who We Are</h2>
                        <div className="space-y-4 text-muted-foreground font-sans leading-relaxed text-sm sm:text-base">
                            <p>
                                Founded with a vision to take India's rich agricultural heritage to the global stage, Seven Hills Global is built on principles of integrity, quality, and mutual growth. Headquartered in Visakhapatnam, Andhra Pradesh, we are strategically positioned near major agricultural hubs and maritime trade routes.
                            </p>
                            <p>
                                We work directly with farmers and cooperatives to source authentic Spices, Millets, Natural Sweeteners, and Fresh Produce. Our rigorous quality control processes ensure that only the best products make their way to our clients.
                            </p>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative"
                    >
                        <div className="aspect-[4/3] rounded-3xl overflow-hidden glass-card border border-border/50 group">
                            <img
                                src="https://images.unsplash.com/photo-1595856468792-56b0d9111c1d?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=1200&h=900" /* Better quality crop */
                                alt="Indian Agriculture"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                        </div>
                        <div className="mt-6 md:absolute md:-bottom-8 md:-left-8 glass-card p-5 sm:p-8 rounded-2xl border border-border/50 bg-card/80 backdrop-blur-2xl shadow-2xl md:max-w-xs border-l-gold/40 border-l-4">
                            <p className="font-serif font-bold text-xl sm:text-2xl gold-gradient-text mb-1 italic">Direct from Farms</p>
                            <p className="text-xs sm:text-sm font-sans text-muted-foreground/80 leading-relaxed">
                                Cutting out middlemen to ensure fair pricing for farmers and absolute freshness for global buyers.
                            </p>
                        </div>
                    </motion.div>
                </div>

                <div className="mb-16">
                    <h2 className="text-2xl sm:text-4xl font-serif font-bold text-center text-foreground mb-12">Our Core Values</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        {[
                            { icon: ShieldCheck, title: "Uncompromising Quality", desc: "Rigorous testing and grading at every stage of the supply chain." },
                            { icon: Leaf, title: "Sustainable Sourcing", desc: "Promoting eco-friendly farming and supporting rural economies." },
                            { icon: Globe, title: "Global Reliability", desc: "Timely shipping and seamless customs handling worldwide." },
                            { icon: ThumbsUp, title: "Client First", desc: "Dedicated support tailored to meet bespoke buyer requirements." }
                        ].map((value, i) => (
                            <motion.div
                                key={value.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                className="glass-card p-6 sm:p-8 rounded-2xl border border-border/50 bg-card/20 hover:border-gold/40 hover:bg-card/40 transition-all duration-300 group"
                            >
                                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-6 border border-gold/20 group-hover:scale-110 group-hover:bg-gold/20 transition-all">
                                    <value.icon className="w-6 h-6 text-gold" />
                                </div>
                                <h3 className="font-serif font-bold text-lg sm:text-xl text-foreground mb-3">{value.title}</h3>
                                <p className="text-muted-foreground font-sans text-xs sm:text-sm leading-relaxed">{value.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
