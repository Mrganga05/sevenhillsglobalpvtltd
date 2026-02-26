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
    window.location.href = `mailto:Sevenhillsexpo7@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="w-full py-14 sm:py-20 lg:py-24 section-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-16"
        >
          <span className="text-xs sm:text-sm font-sans font-semibold tracking-[0.2em] uppercase text-primary/70 mb-3 block">
            Contact Us
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-serif font-bold">
            Let's <span className="gold-gradient-text">Connect</span>
          </h2>
          <p className="text-primary/50 max-w-xl mx-auto font-sans text-sm sm:text-base leading-relaxed px-2 mt-4">
            Partner with India's leading agricultural exporter. Request a sample or a bulk quote today.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-6 sm:p-10 lg:p-12 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10" />

            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              <div>
                <label className="block text-xs sm:text-sm font-sans font-semibold text-primary/60 mb-2">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-secondary/50 border border-primary/10 rounded-xl px-4 py-3 text-base text-primary font-sans placeholder:text-primary/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all ring-offset-background"
                  placeholder="John Doe"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-sans font-semibold text-primary/60 mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-secondary/50 border border-primary/10 rounded-xl px-4 py-3 text-base text-primary font-sans placeholder:text-primary/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all ring-offset-background"
                    placeholder="john@company.com"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-sans font-semibold text-primary/60 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-secondary/50 border border-primary/10 rounded-xl px-4 py-3 text-base text-primary font-sans placeholder:text-primary/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all ring-offset-background"
                    placeholder="+91 00000 00000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-sans font-semibold text-primary/60 mb-2">Product Interest</label>
                <select
                  value={formData.product}
                  onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                  className="w-full bg-secondary/50 border border-primary/10 rounded-xl px-4 py-3 text-base text-primary font-sans focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all ring-offset-background appearance-none"
                >
                  <option value="" className="bg-background">Select a product</option>
                  {products.map((p) => (
                    <option key={p} value={p} className="bg-background">{p}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-sans font-semibold text-primary/60 mb-2">Message</label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-secondary/50 border border-primary/10 rounded-xl px-4 py-3 text-base text-primary font-sans placeholder:text-primary/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all resize-none ring-offset-background"
                  placeholder="Tell us about your volume and destination..."
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-10 gold-gradient-bg text-primary-foreground py-4 rounded-xl font-bold font-sans text-base hover:opacity-90 transition-all duration-300 ease-in-out flex items-center justify-center gap-2 hover:scale-[1.02] shadow-xl group"
              >
                <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                Send Inquiry
              </button>
            </form>
          </motion.div>

          {/* Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-8 sm:gap-10"
          >
            <div className="glass-card p-6 sm:p-10 space-y-8 flex-1">
              <div className="flex items-start gap-4 sm:gap-6">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-primary text-lg mb-2">Office Address</h4>
                  <p className="text-sm sm:text-base text-primary/60 font-sans leading-relaxed">
                    Sri Krishna Hospital, 2-2-10, Shirdi Nagar, Lingamparth,<br />
                    East Godavari, AP, Yeleswaram, PIN: 533429, India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 sm:gap-6">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-primary text-lg mb-2">Call Support</h4>
                  <a href="tel:+918500336668" className="text-base sm:text-lg text-primary/60 font-sans hover:text-primary transition-colors font-medium">
                    +91 85003 36668
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 sm:gap-6">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-primary text-lg mb-2">Email Inquiry</h4>
                  <div className="space-y-3">
                    <div>
                      <span className="block text-xs uppercase tracking-wider text-primary/40 font-bold mb-1">Company Details</span>
                      <a href="mailto:sevenhillsglobalprivatelimited@gmail.com" className="text-sm sm:text-base text-primary/60 font-sans hover:text-primary transition-colors break-all font-medium">
                        sevenhillsglobalprivatelimited@gmail.com
                      </a>
                    </div>
                    <div>
                      <span className="block text-xs uppercase tracking-wider text-primary/40 font-bold mb-1">Business Inquiries</span>
                      <a href="mailto:Sevenhillsexpo7@gmail.com" className="text-sm sm:text-base text-primary/60 font-sans hover:text-primary transition-colors break-all font-medium">
                        Sevenhillsexpo7@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card overflow-hidden rounded-2xl h-[280px] sm:h-[350px] lg:h-[400px] border border-primary/10 shadow-lg">
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
