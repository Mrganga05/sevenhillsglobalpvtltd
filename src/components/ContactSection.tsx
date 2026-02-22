import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Send } from "lucide-react";

const products = [
  "Turmeric", "Cashew Nuts", "Onions", "Onion Powder", "Millets", "Jaggery",
  "Jaggery Powder", "Honey", "Moringa Powder", "Banana Powder", "Groundnut",
  "Sesame Seeds", "Ginger", "Coconut Products", "Herbal Powders", "Spices", "Potato",
];

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", product: "", message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Quote Request - ${formData.product || "General Inquiry"}`;
    const body = `Name: ${formData.name}%0AEmail: ${formData.email}%0APhone: ${formData.phone}%0AProduct: ${formData.product}%0AMessage: ${formData.message}`;
    window.location.href = `mailto:sevenhillsglobalprivatelimited@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-12 sm:py-20 section-gradient">
      <div className="container mx-auto px-3 sm:px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-14"
        >
          <span className="text-xs sm:text-sm font-sans font-semibold tracking-[0.2em] uppercase text-primary/70 mb-3 block">
            Contact Us
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-serif font-bold">
            Let's <span className="gold-gradient-text">Connect</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-10 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-5 sm:p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs sm:text-sm font-sans font-medium text-primary/60 mb-1.5">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-secondary/50 border border-border rounded-xl px-3 py-2.5 text-sm text-primary font-sans placeholder:text-primary/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  placeholder="Your name"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs sm:text-sm font-sans font-medium text-primary/60 mb-1.5">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-secondary/50 border border-border rounded-xl px-3 py-2.5 text-sm text-primary font-sans placeholder:text-primary/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    placeholder="you@company.com"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-sans font-medium text-primary/60 mb-1.5">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-secondary/50 border border-border rounded-xl px-3 py-2.5 text-sm text-primary font-sans placeholder:text-primary/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    placeholder="+1 234 567 890"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-sans font-medium text-primary/60 mb-1.5">Product Interest</label>
                <select
                  value={formData.product}
                  onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                  className="w-full bg-secondary/50 border border-border rounded-xl px-3 py-2.5 text-sm text-primary font-sans focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                >
                  <option value="">Select a product</option>
                  {products.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-sans font-medium text-primary/60 mb-1.5">Message</label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-secondary/50 border border-border rounded-xl px-3 py-2.5 text-sm text-primary font-sans placeholder:text-primary/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                  placeholder="Tell us about your requirements..."
                />
              </div>
              <button
                type="submit"
                className="w-full gold-gradient-bg text-primary-foreground py-3 rounded-xl font-semibold font-sans text-sm sm:text-base hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.02]"
              >
                <Send className="w-4 h-4" />
                Send Inquiry
              </button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="glass-card p-5 sm:p-6 space-y-5">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-serif font-semibold text-primary text-sm mb-1">Address</h4>
                  <p className="text-[11px] sm:text-xs text-primary/50 font-sans">
                    Sri Krishna Hospital, 2-2-10, Shirdi Nagar, Lingamparth,<br />
                    East Godavari, AP, Yeleswaram, PIN: 533429, India
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-serif font-semibold text-primary text-sm mb-1">Phone</h4>
                  <a href="tel:+918500336668" className="text-xs text-primary/50 font-sans hover:text-primary transition-colors">
                    +91 85003 36668
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-serif font-semibold text-primary text-sm mb-1">Email</h4>
                  <a href="mailto:sevenhillsglobalprivatelimited@gmail.com" className="text-xs text-primary/50 font-sans hover:text-primary transition-colors break-all">
                    sevenhillsglobalprivatelimited@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="glass-card overflow-hidden rounded-2xl h-[220px] sm:h-[280px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3820.0!2d82.1!3d17.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDAwJzAwLjAiTiA4MsKwMDYnMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Seven Hills Global Location"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
