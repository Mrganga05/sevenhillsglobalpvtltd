import { Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const footerLinks = {
  "Quick Links": [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "About Us", href: "/about" },
    { label: "Export Process", href: "/export-process" },
    { label: "Contact Us", href: "/contact" },
  ],
  "Our Products": [
    { label: "Spices & Powders", href: "/products" },
    { label: "Nuts & Kernels", href: "/products" },
    { label: "Natural Sweets", href: "/products" },
    { label: "Grains & Millets", href: "/products" },
    { label: "Herbal Solutions", href: "/products" },
  ],
};

const Footer = () => {
  return (
    <footer className="border-t border-primary/20 bg-card/40 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Seven Hills Global" className="h-12 w-auto" />
              <h3 className="text-xl font-serif font-bold gold-gradient-text lg:text-2xl">
                Seven Hills Global
              </h3>
            </div>
            <p className="text-sm text-primary/60 font-sans leading-relaxed">
              Empowering global health through premium Indian agricultural exports. From our fields to your table, quality is our promise.
            </p>
            <div className="space-y-4 pt-2">
              <a href="tel:+918500336668" className="flex items-center gap-3 text-sm text-primary/60 hover:text-primary transition-colors font-sans group">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                +91 85003 36668
              </a>
              <a href="mailto:sevenhillsglobalprivatelimited@gmail.com" className="flex items-center gap-3 text-sm text-primary/60 hover:text-primary transition-colors font-sans break-all group">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <span>
                  <span className="block text-xs uppercase tracking-wider mb-0.5 opacity-70">Company Details</span>
                  sevenhillsglobalprivatelimited@gmail.com
                </span>
              </a>
              <a href="mailto:Info@sevenhillsglobalpvtltd.com" className="flex items-center gap-3 text-sm text-primary/60 hover:text-primary transition-colors font-sans break-all group">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <span>
                  <span className="block text-xs uppercase tracking-wider mb-0.5 opacity-70">Business Inquiries</span>
                  Info@sevenhillsglobalpvtltd.com
                </span>
              </a>
              <div className="flex items-start gap-3 text-sm text-primary/60 font-sans group">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <span>Andhra Pradesh, India</span>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="sm:pl-4 lg:pl-10">
              <h4 className="font-serif font-bold text-primary text-lg mb-6">{title}</h4>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-primary/60 hover:text-primary transition-colors font-sans hover:translate-x-1 inline-block transform"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* CTA Column */}
          <div className="lg:pl-6">
            <h4 className="font-serif font-bold text-primary text-lg mb-6">Partner With Us</h4>
            <p className="text-sm text-primary/60 font-sans mb-6 leading-relaxed">
              We provide end-to-end export solutions for wholesalers and retailers worldwide.
            </p>
            <Link
              to="/contact"
              className="inline-block gold-gradient-bg text-primary-foreground px-8 py-3 rounded-xl text-sm font-bold hover:opacity-90 transition-all hover:shadow-lg hover:shadow-primary/20"
            >
              Request Bulk Quote
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-primary/5 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs sm:text-sm text-primary/40 font-sans text-center md:text-left">
            © 2026 Seven Hills Global Private Limited. Built with Excellence.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/about" className="text-xs text-primary/40 hover:text-primary transition-colors font-sans">Privacy Policy</Link>
            <Link to="/contact" className="text-xs text-primary/40 hover:text-primary transition-colors font-sans">Terms of Trade</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
