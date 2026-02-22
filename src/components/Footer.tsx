import { Phone, Mail, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";

const footerLinks = {
  "Quick Links": [
    { label: "Home", href: "#home" },
    { label: "Products", href: "#products" },
    { label: "Why Us", href: "#why-us" },
    { label: "Process", href: "#process" },
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
    <footer className="border-t border-primary/20 bg-card/30">
      <div className="h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="container mx-auto px-3 sm:px-4 py-10 sm:py-14">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <img src={logo} alt="Seven Hills Global" className="h-10 w-auto" />
              <h3 className="text-base sm:text-lg font-serif font-bold gold-gradient-text">
                Seven Hills Global
              </h3>
            </div>
            <p className="text-[11px] sm:text-xs text-primary/40 font-sans leading-relaxed mb-4">
              India's premier agricultural export company delivering quality products to global markets.
            </p>
            <div className="space-y-2">
              <a href="tel:+918500336668" className="flex items-center gap-2 text-[11px] sm:text-xs text-primary/40 hover:text-primary transition-colors font-sans">
                <Phone className="w-3.5 h-3.5" /> +91 85003 36668
              </a>
              <a href="mailto:sevenhillsglobalprivatelimited@gmail.com" className="flex items-center gap-2 text-[11px] sm:text-xs text-primary/40 hover:text-primary transition-colors font-sans break-all">
                <Mail className="w-3.5 h-3.5" /> sevenhillsglobalprivatelimited@gmail.com
              </a>
              <div className="flex items-start gap-2 text-[11px] sm:text-xs text-primary/40 font-sans">
                <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                <span>Yeleswaram, Andhra Pradesh, India</span>
              </div>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-serif font-semibold text-primary text-sm mb-3">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[11px] sm:text-xs text-primary/40 hover:text-primary transition-colors font-sans"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="font-serif font-semibold text-primary text-sm mb-3">Get In Touch</h4>
            <p className="text-[11px] sm:text-xs text-primary/40 font-sans mb-3">
              Ready to source premium agricultural products? Let's discuss your requirements.
            </p>
            <a
              href="#contact"
              className="inline-block gold-gradient-bg text-primary-foreground px-5 py-2.5 rounded-full text-xs font-semibold hover:opacity-90 transition-opacity"
            >
              Request a Quote
            </a>
          </div>
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="container mx-auto px-3 sm:px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-[10px] sm:text-xs text-primary/40 font-sans">
          © 2026 Seven Hills Global Pvt Ltd. All Rights Reserved.
        </p>
        <p className="text-[10px] text-primary/30 font-sans">
          Global Transportation & Agricultural Export
        </p>
      </div>
    </footer>
  );
};

export default Footer;
