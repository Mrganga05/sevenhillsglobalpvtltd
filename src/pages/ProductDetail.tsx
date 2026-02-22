import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Award, MapPin, Package, MessageCircle, Mail, Phone, FileCheck } from "lucide-react";
import { products } from "@/components/ProductsSection";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const certifications = ["APEDA Registered", "FSSAI Certified", "ISO 22000", "HACCP Compliant"];
const packagingOptions = ["PP Bags (25/50 Kg)", "Jute Bags", "Vacuum Sealed", "Custom Buyer Packaging"];

const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-serif font-bold text-foreground mb-4">Product Not Found</h1>
          <button onClick={() => navigate("/")} className="gold-gradient-bg text-primary-foreground px-6 py-3 rounded-full font-semibold">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const whatsappMsg = encodeURIComponent(`Hello Seven Hills Global, I'm interested in ${product.name}. Please share pricing and availability.`);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Back */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate("/#products")}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-sans mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Products
          </motion.button>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="glass-card overflow-hidden rounded-2xl"
            >
              <div className="relative aspect-square sm:aspect-[4/3]">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase gold-gradient-bg text-primary-foreground px-3 py-1.5 rounded-full">
                    <Award className="w-3.5 h-3.5" /> {product.grade}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6"
            >
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-3">
                  {product.name}
                </h1>
                <p className="text-foreground/60 font-sans text-base sm:text-lg leading-relaxed">
                  {product.desc}
                </p>
              </div>

              {/* Specs grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="glass-card p-4 rounded-xl">
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="text-xs font-sans uppercase tracking-wider text-muted-foreground">Origin</span>
                  </div>
                  <p className="font-serif font-semibold text-foreground">{product.origin}</p>
                </div>
                <div className="glass-card p-4 rounded-xl">
                  <div className="flex items-center gap-2 mb-1">
                    <Package className="w-4 h-4 text-primary" />
                    <span className="text-xs font-sans uppercase tracking-wider text-muted-foreground">Min Order</span>
                  </div>
                  <p className="font-serif font-semibold text-foreground">{product.moq}</p>
                </div>
              </div>

              {/* Certifications */}
              <div>
                <h3 className="font-serif font-semibold text-foreground mb-3 flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-primary" /> Certifications
                </h3>
                <div className="flex flex-wrap gap-2">
                  {certifications.map((cert) => (
                    <span key={cert} className="text-xs font-sans border border-primary/30 text-primary/80 px-3 py-1.5 rounded-full">
                      {cert}
                    </span>
                  ))}
                </div>
              </div>

              {/* Packaging */}
              <div>
                <h3 className="font-serif font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Package className="w-5 h-5 text-primary" /> Packaging Options
                </h3>
                <div className="flex flex-wrap gap-2">
                  {packagingOptions.map((pkg) => (
                    <span key={pkg} className="text-xs font-sans bg-secondary/50 text-secondary-foreground px-3 py-1.5 rounded-full">
                      {pkg}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href={`https://wa.me/918500336668?text=${whatsappMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 gold-gradient-bg text-primary-foreground px-6 py-3.5 rounded-full font-semibold text-base hover:opacity-90 transition-all"
                >
                  <MessageCircle className="w-5 h-5" /> WhatsApp Inquiry
                </a>
                <a
                  href={`mailto:sevenhillsglobalprivatelimited@gmail.com?subject=Inquiry: ${product.name}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 border border-primary/40 text-foreground px-6 py-3.5 rounded-full font-semibold text-base hover:bg-primary/10 transition-all"
                >
                  <Mail className="w-5 h-5" /> Email Inquiry
                </a>
              </div>

              {/* Phone */}
              <a href="tel:+918500336668" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-sans">
                <Phone className="w-4 h-4" /> +91 85003 36668
              </a>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ProductDetail;
