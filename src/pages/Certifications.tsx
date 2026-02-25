import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Award, Image as ImageIcon } from "lucide-react";
import { supabase } from "../lib/supabase";

interface Certification {
    id: string;
    title: string;
    description: string;
    image_url: string | null;
}

const Certifications = () => {
    const [certs, setCerts] = useState<Certification[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCerts = async () => {
            const { data, error } = await supabase
                .from('certifications')
                .select('*')
                .order('created_at', { ascending: true });

            if (data && !error) {
                setCerts(data);
            }
            setLoading(false);
        };
        fetchCerts();
    }, []);

    return (
        <div className="bg-background pt-24 pb-16 min-h-screen relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[400px] sm:w-[500px] h-[400px] sm:h-[500px] bg-gold/5 rounded-full blur-[100px] sm:blur-[120px] -z-10 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[400px] sm:w-[500px] h-[400px] sm:h-[500px] bg-emerald/5 rounded-full blur-[100px] sm:blur-[120px] -z-10 pointer-events-none"></div>

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
                            Quality Assured
                        </span>
                        <div className="h-px w-6 sm:w-8 bg-gold/50"></div>
                    </div>
                    <h1 className="text-3xl sm:text-5xl lg:text-7xl font-serif font-bold text-foreground mb-6 leading-tight">
                        Global <span className="gold-gradient-text">Compliance</span> & Standards
                    </h1>
                    <p className="text-muted-foreground text-sm sm:text-xl font-sans leading-relaxed max-w-2xl mx-auto">
                        Trust is the foundation of our trade. We are fully licensed and certified by India's apex agricultural and food safety regulatory bodies.
                    </p>
                </motion.div>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold"></div>
                    </div>
                ) : certs.length === 0 ? (
                    <div className="text-center py-10">
                        <p className="text-muted-foreground font-sans">More certifications and standards coming soon.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 max-w-5xl mx-auto">
                        {certs.map((cert, index) => (
                            <motion.div
                                key={cert.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="glass-card p-6 sm:p-10 rounded-3xl border border-white/5 bg-card/20 hover:bg-card/40 hover:border-gold/30 transition-all group overflow-hidden relative flex flex-col"
                            >
                                <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-gold/5 rounded-bl-full -z-10 transition-transform group-hover:scale-125"></div>

                                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gold/10 flex flex-shrink-0 items-center justify-center border border-gold/20 mb-6 group-hover:scale-110 transition-transform overflow-hidden relative">
                                    {cert.image_url ? (
                                        <img src={cert.image_url} alt={cert.title} className="w-full h-full object-cover" />
                                    ) : (
                                        <Award className="w-8 h-8 text-gold" />
                                    )}
                                </div>

                                <h3 className="text-xl sm:text-2xl font-serif font-bold text-foreground mb-3">{cert.title}</h3>
                                <p className="text-muted-foreground font-sans flex-1 leading-relaxed text-xs sm:text-base whitespace-pre-line">
                                    {cert.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Trust Banner - Improved Mobile Layout */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-20 sm:mt-32 max-w-4xl mx-auto glass-card border border-gold/30 relative overflow-hidden text-center rounded-3xl"
                >
                    <div className="absolute inset-0 bg-forest/90 z-0"></div>
                    <div className="relative z-10 p-8 sm:p-16 flex flex-col items-center">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gold/10 rounded-full flex items-center justify-center mb-6 border border-gold/30">
                            <ShieldCheck className="w-8 h-8 sm:w-10 sm:h-10 text-gold" />
                        </div>
                        <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white mb-6">100% Export Ready</h2>
                        <p className="text-white/70 max-w-2xl font-sans text-sm sm:text-lg leading-relaxed">
                            Every single shipment is accompanied by the necessary phytosanitary certificates, certificates of origin, and custom documents for seamless global delivery.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Certifications;
