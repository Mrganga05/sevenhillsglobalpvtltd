import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { useSubmitInquiry } from "../hooks/useDatabase";
import { motion } from "framer-motion";

interface ProductInquiryFormProps {
    productName: string;
}

export const ProductInquiryForm = ({ productName }: ProductInquiryFormProps) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
    });

    const submitInquiry = useSubmitInquiry();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await submitInquiry.mutateAsync({
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                message: `Company: ${formData.company}\nProduct Interest: ${productName}\n\n${formData.message}`,
                status: 'new'
            });

            setIsSuccess(true);
            toast.success("Quote requested successfully!");
            setFormData({
                name: "",
                email: "",
                phone: "",
                company: "",
                message: "",
            });

            setTimeout(() => setIsSuccess(false), 5000);

        } catch (error) {
            console.error("Error submitting quote request:", error);
            toast.error("Failed to submit request. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-6 flex flex-col items-center text-center"
            >
                <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center mb-4 border border-emerald-500/20">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                </div>
                <h5 className="text-xl font-serif font-bold text-foreground mb-2">Request Sent Automatically!</h5>
                <p className="text-muted-foreground mb-4 text-sm mt-2">Thank you. Our team will contact you with a customized quote for {productName}.</p>
                <button
                    onClick={() => setIsSuccess(false)}
                    className="text-xs font-bold uppercase tracking-wider text-forest gold-gradient-bg px-4 py-2 rounded-lg shine-sweep"
                >
                    Send Another Request
                </button>
            </motion.div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <label htmlFor="name" className="text-xs font-semibold text-foreground ml-1">Full Name *</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-background/50 border border-border/50 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-all font-sans"
                        placeholder="John Doe"
                    />
                </div>
                <div className="space-y-1.5">
                    <label htmlFor="email" className="text-xs font-semibold text-foreground ml-1">Email Address *</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-background/50 border border-border/50 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-all font-sans"
                        placeholder="john@company.com"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <label htmlFor="phone" className="text-xs font-semibold text-foreground ml-1">Phone / WhatsApp *</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-background/50 border border-border/50 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-all font-sans"
                        placeholder="+1 234 567 8900"
                    />
                </div>
                <div className="space-y-1.5">
                    <label htmlFor="company" className="text-xs font-semibold text-foreground ml-1">Company</label>
                    <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full bg-background/50 border border-border/50 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-all font-sans"
                        placeholder="Company Ltd."
                    />
                </div>
            </div>

            <div className="space-y-1.5">
                <label htmlFor="message" className="text-xs font-semibold text-foreground ml-1">Requirements (Qty, Spec, Port) *</label>
                <textarea
                    id="message"
                    name="message"
                    required
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-background/50 border border-border/50 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-all font-sans resize-none"
                    placeholder={`Details for ${productName} inquiry...`}
                ></textarea>
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 gold-gradient-bg text-forest px-6 py-3 rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-gold/20 transition-all shine-sweep disabled:opacity-70 disabled:cursor-not-allowed mt-2"
            >
                {isSubmitting ? (
                    <>
                        <div className="w-4 h-4 border-2 border-forest/30 border-t-forest animate-spin rounded-full"></div>
                        Requesting...
                    </>
                ) : (
                    <>
                        <Send className="w-4 h-4" /> Request Quote
                    </>
                )}
            </button>
        </form>
    );
};
