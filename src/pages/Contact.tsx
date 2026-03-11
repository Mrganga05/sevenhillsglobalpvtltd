import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Send, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { useSubmitInquiry } from "../hooks/useDatabase";

const Contact = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
        product: "",
        message: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const submitInquiry = useSubmitInquiry();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await submitInquiry.mutateAsync({
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                message: `Company: ${formData.company}\nProduct Interest: ${formData.product || 'None'}\n\n${formData.message}`,
                status: 'new'
            });

            setIsSuccess(true);
            toast.success("Inquiry submitted successfully!");
            setFormData({
                name: "",
                email: "",
                phone: "",
                company: "",
                product: "",
                message: "",
            });

            setTimeout(() => setIsSuccess(false), 5000);

        } catch (error) {
            toast.error("Failed to submit inquiry. Please try again or contact us directly.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-background pt-24 pb-16 min-h-screen relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 right-[-10%] w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

            <div className="container mx-auto px-4 sm:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <div className="inline-flex items-center justify-center gap-2 mb-4">
                        <div className="h-px w-8 bg-gold/50"></div>
                        <span className="text-sm font-sans font-bold tracking-[0.2em] uppercase text-gold">
                            Get In Touch
                        </span>
                        <div className="h-px w-8 bg-gold/50"></div>
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-6">
                        Start Your Global <span className="gold-gradient-text">Partnership</span>
                    </h1>
                    <p className="text-muted-foreground text-base sm:text-lg font-sans leading-relaxed">
                        Whether you are a buyer looking for premium Indian agricultural products or a supplier aiming to reach global markets, we are here to collaborate.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start max-w-6xl mx-auto">
                    {/* Contact Information */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="lg:col-span-5 space-y-8"
                    >
                        <div className="glass-card p-8 rounded-2xl border border-border/50 bg-card/40 backdrop-blur-md hover:border-gold/30 transition-colors group">
                            <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors border border-gold/20">
                                <MapPin className="w-6 h-6 text-gold" />
                            </div>
                            <h3 className="text-xl font-serif font-bold text-foreground mb-3">Headquarters</h3>
                            <p className="text-muted-foreground font-sans leading-relaxed">
                                Seven Hills Global Pvt Ltd.<br />
                                KBR Complex, Daba Gardens,<br />
                                Visakhapatnam, Andhra Pradesh,<br />
                                India - 530020
                            </p>
                        </div>

                        <div className="glass-card p-8 rounded-2xl border border-border/50 bg-card/40 backdrop-blur-md hover:border-gold/30 transition-colors group">
                            <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors border border-gold/20">
                                <Phone className="w-6 h-6 text-gold" />
                            </div>
                            <h3 className="text-xl font-serif font-bold text-foreground mb-3">Phone & WhatsApp</h3>
                            <p className="text-muted-foreground font-sans mb-1">Domestic & International Inquiries:</p>
                            <a href="tel:+918500336668" className="text-lg font-semibold text-foreground hover:text-gold transition-colors block mb-4">
                                +91 85003 36668
                            </a>
                            <a
                                href="https://wa.me/918500336668"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-forest gold-gradient-bg px-4 py-2 rounded-lg shine-sweep"
                            >
                                Message on WhatsApp
                            </a>
                        </div>

                        <div className="glass-card p-8 rounded-2xl border border-border/50 bg-card/40 backdrop-blur-md hover:border-gold/30 transition-colors group">
                            <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors border border-gold/20">
                                <Mail className="w-6 h-6 text-gold" />
                            </div>
                            <h3 className="text-xl font-serif font-bold text-foreground mb-3">Email Details</h3>
                            <p className="text-muted-foreground font-sans mb-1 text-sm font-semibold">General & Company Details:</p>
                            <a href="mailto:sevenhillsglobalprivatelimited@gmail.com" className="text-sm sm:text-base text-foreground hover:text-gold transition-colors block break-all mb-4">
                                sevenhillsglobalprivatelimited@gmail.com
                            </a>
                            <p className="text-muted-foreground font-sans mb-1 text-sm font-semibold">Business Inquiries:</p>
                            <a href="mailto:Info@sevenhillsglobalpvtltd.com" className="text-sm sm:text-base text-foreground hover:text-gold transition-colors block break-all">
                                Info@sevenhillsglobalpvtltd.com
                            </a>
                        </div>
                    </motion.div>

                    {/* Inquiry Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="lg:col-span-7"
                    >
                        <div className="glass-card p-8 sm:p-10 rounded-2xl border border-border/50 bg-card/60 backdrop-blur-xl shadow-2xl relative overflow-hidden">
                            {/* Decorative element inside form */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-bl-[100px] -z-10"></div>

                            <h3 className="text-2xl font-serif font-bold text-foreground mb-6">Send an Inquiry</h3>

                            {isSuccess ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="py-12 flex flex-col items-center text-center"
                                >
                                    <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6 border border-emerald-500/20">
                                        <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                                    </div>
                                    <h4 className="text-2xl font-serif font-bold text-foreground mb-3">Inquiry Sent Successfully!</h4>
                                    <p className="text-muted-foreground mb-8">Thank you for reaching out. Our export team will review your requirements and contact you within 24 hours.</p>
                                    <button
                                        onClick={() => setIsSuccess(false)}
                                        className="text-sm font-bold uppercase tracking-wider text-forest gold-gradient-bg px-6 py-3 rounded-xl shine-sweep"
                                    >
                                        Send Another Inquiry
                                    </button>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div className="space-y-2">
                                            <label htmlFor="name" className="text-sm font-semibold text-foreground ml-1">Full Name *</label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                required
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="w-full bg-background/50 border border-border/50 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-all font-sans"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="email" className="text-sm font-semibold text-foreground ml-1">Email Address *</label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                required
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full bg-background/50 border border-border/50 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-all font-sans"
                                                placeholder="john@company.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div className="space-y-2">
                                            <label htmlFor="phone" className="text-sm font-semibold text-foreground ml-1">Phone Number / WhatsApp *</label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                required
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="w-full bg-background/50 border border-border/50 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-all font-sans"
                                                placeholder="+1 234 567 8900"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="company" className="text-sm font-semibold text-foreground ml-1">Company Name</label>
                                            <input
                                                type="text"
                                                id="company"
                                                name="company"
                                                value={formData.company}
                                                onChange={handleChange}
                                                className="w-full bg-background/50 border border-border/50 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-all font-sans"
                                                placeholder="Company Ltd."
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="product" className="text-sm font-semibold text-foreground ml-1">Product of Interest</label>
                                        <select
                                            id="product"
                                            name="product"
                                            value={formData.product}
                                            onChange={handleChange}
                                            className="w-full bg-background/50 border border-border/50 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-all font-sans appearance-none"
                                        >
                                            <option value="" disabled>Select a product category...</option>
                                            <option value="Spices">Spices (Turmeric, Chilli, etc.)</option>
                                            <option value="Millets">Millets</option>
                                            <option value="Jaggery">Jaggery & Sweeteners</option>
                                            <option value="Nuts">Nuts (Cashews, Groundnuts)</option>
                                            <option value="Fresh Produce">Fresh Produce (Onions, Potatoes, Ginger)</option>
                                            <option value="Coconut">Coconut Products</option>
                                            <option value="Other">Other Products</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="message" className="text-sm font-semibold text-foreground ml-1">Your Requirements / Message *</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            required
                                            rows={5}
                                            value={formData.message}
                                            onChange={handleChange}
                                            className="w-full bg-background/50 border border-border/50 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-all font-sans resize-none"
                                            placeholder="Please include details like Quantity (MOQ), Grade, Packaging requirements, and Destination Port."
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full inline-flex items-center justify-center gap-2 gold-gradient-bg text-forest px-8 py-4 rounded-xl font-bold text-base hover:shadow-lg hover:shadow-gold/20 transition-all shine-sweep disabled:opacity-70 disabled:cursor-not-allowed mt-4"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-forest/30 border-t-forest animate-spin rounded-full"></div>
                                                Submitting...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-5 h-5" /> Submit Inquiry
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Map Placeholder */}
            <div className="mt-20 w-full h-[400px] bg-muted relative">
                <div className="absolute inset-0 bg-background/50 backdrop-blur-sm z-10 flex items-center justify-center">
                    <p className="text-muted-foreground font-medium flex items-center gap-2">
                        <MapPin className="w-5 h-5" /> Interactive Map Integration
                    </p>
                </div>
                {/* Normally place Google Maps iframe here */}
                <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=2000" alt="Map" className="w-full h-full object-cover opacity-50 grayscale" />
            </div>
        </div>
    );
};

export default Contact;
