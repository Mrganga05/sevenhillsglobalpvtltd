import { Phone, Mail, MapPin } from "lucide-react";

const footerLinks = {
  "Quick Links": [
    { label: "Home", href: "#home" },
    { label: "Products", href: "#products" },
    { label: "Why Us", href: "#why-us" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ],
  "Products": [
    { label: "Turmeric", href: "#products" },
    { label: "Cashew Nuts", href: "#products" },
    { label: "Spices", href: "#products" },
    { label: "Millets", href: "#products" },
    { label: "Honey", href: "#products" },
    { label: "View All", href: "#products" },
  ],
};

const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-card/30">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-serif font-bold gold-gradient-text mb-4">
              Seven Hills Global
            </h3>
            <p className="text-sm text-muted-foreground font-sans leading-relaxed mb-6">
              India's premier agricultural export company delivering quality products to global markets with reliability and trust.
            </p>
            <div className="space-y-3">
              <a href="tel:+918500336668" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-sans">
                <Phone className="w-4 h-4" /> +91 85003 36668
              </a>
              <a href="mailto:sevenhillsglobalprivatelimited@gmail.com" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-sans break-all">
                <Mail className="w-4 h-4" /> sevenhillsglobalprivatelimited@gmail.com
              </a>
              <div className="flex items-start gap-2 text-sm text-muted-foreground font-sans">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>Yeleswaram, Andhra Pradesh, India</span>
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-serif font-semibold text-foreground mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors font-sans"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter CTA */}
          <div>
            <h4 className="font-serif font-semibold text-foreground mb-4">Get In Touch</h4>
            <p className="text-sm text-muted-foreground font-sans mb-4">
              Ready to source premium agricultural products? Let's discuss your requirements.
            </p>
            <a
              href="#contact"
              className="inline-block gold-gradient-bg text-primary-foreground px-6 py-3 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Request a Quote
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-border/30">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground font-sans">
            © 2026 Seven Hills Global Pvt Ltd. All Rights Reserved.
          </p>
          <p className="text-xs text-muted-foreground/50 font-sans">
            Global Transportation & Agricultural Export
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
