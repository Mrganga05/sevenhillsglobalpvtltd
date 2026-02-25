import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, Award, MapPin, Package, MessageCircle, PackageOpen, ShoppingCart, Check, ListTree, Box } from "lucide-react";
import { motion } from "framer-motion";
import { useProductBySlug, useSubproducts } from "../hooks/useDatabase";
import { ProductInquiryForm } from "../components/ProductInquiryForm";
import { getFallbackImage } from "../utils/productImages";
import { useCart } from "../context/CartContext";
import { SimilarProducts } from "../components/SimilarProducts";

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useProductBySlug(slug || '');
  const product = data as any;
  const { data: subproducts = [] } = useSubproducts(product?.id);
  const { addItem } = useCart();

  const [activeImage, setActiveImage] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePosition({ x, y });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin mb-4"></div>
          <p className="text-primary font-bold text-lg">Loading Details...</p>
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="text-center bg-card p-10 rounded-3xl border border-border max-w-md w-full shadow-md">
          <PackageOpen className="w-16 h-16 text-primary/20 mx-auto mb-6" />
          <h1 className="text-2xl sm:text-3xl font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-8">The requested product could not be found or has been moved.</p>
          <button onClick={() => navigate("/products")} className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold hover:bg-primary/90 transition-colors">
            Back to Catalog
          </button>
        </div>
      </div>
    );
  }

  const whatsappMsg = encodeURIComponent(`Hello Seven Hills Global, I'm interested in ${product.name}. Please share details.`);
  const certifications = product.certifications || ["APEDA", "FSSAI", "ISO 22000"];
  const fallback = getFallbackImage(product.name);
  const mainImage = product.image_url || fallback;

  // Mock gallery images - replacing with fallback/main if real gallery isn't available
  const images = product.gallery ? [mainImage, ...product.gallery] : [mainImage, ...Array(3).fill(fallback)];

  return (
    <div className="bg-background pt-24 pb-16 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 relative">
        {/* Back Link */}
        <button
          onClick={() => navigate("/products")}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-bold text-[10px] sm:text-xs uppercase tracking-[0.2em] mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Products
        </button>

        <div className="grid lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-20 items-start">
          {/* Left: Image Column (Gallery + Zoom) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 sticky top-28"
          >
            <div
              className="overflow-hidden rounded-3xl border border-border bg-card shadow-md relative"
            >
              {/* Main Image with Zoom on Hover */}
              <div
                className="aspect-square sm:aspect-[4/3] lg:aspect-square bg-muted/20 relative cursor-crosshair overflow-hidden group"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                onMouseMove={handleMouseMove}
              >
                <img
                  src={images[activeImage]}
                  alt={product.name}
                  className={`w-full h-full object-cover transition-opacity duration-300 ${isHovering ? 'opacity-0' : 'opacity-100'}`}
                />

                {/* Zoom Overlay */}
                <div
                  className={`absolute inset-0 bg-no-repeat transition-opacity duration-300 pointer-events-none ${isHovering ? 'opacity-100' : 'opacity-0'}`}
                  style={{
                    backgroundImage: `url(${images[activeImage]})`,
                    backgroundPosition: `${mousePosition.x}% ${mousePosition.y}%`,
                    backgroundSize: '250%' // Zoom level
                  }}
                />

                {product.categories?.name && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="text-[10px] font-bold tracking-widest uppercase bg-black/50 backdrop-blur-md border border-white/10 text-white px-4 py-1.5 rounded-full shadow-lg">
                      {product.categories.name}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Gallery Thumbnails */}
            <div className="flex gap-3 mt-4 overflow-x-auto pb-2 no-scrollbar">
              {images.map((img: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-primary shadow-md' : 'border-border opacity-50 hover:opacity-100'}`}
                >
                  <img src={img} alt={`${product.name} - view ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Right: Info Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
                  {product.name}
                </h1>
                <p className="text-muted-foreground text-sm sm:text-xl leading-relaxed">
                  {product.full_description}
                </p>
              </div>

              {/* Core Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                <div className="bg-card p-4 rounded-2xl border border-border shadow-sm flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Origin</span>
                  </div>
                  <p className="font-bold text-sm sm:text-lg text-foreground">{product.origin || 'India'}</p>
                </div>
                <div className="bg-card p-4 rounded-2xl border border-border shadow-sm flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="w-4 h-4 text-primary" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">MOQ</span>
                  </div>
                  <p className="font-bold text-sm sm:text-lg text-foreground">{product.moq || 'Contact Us'}</p>
                </div>
                <div className="bg-card p-4 rounded-2xl border border-border shadow-sm flex flex-col justify-center sm:col-span-1 col-span-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Box className="w-4 h-4 text-primary" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Packaging</span>
                  </div>
                  <p className="font-bold text-sm sm:text-lg text-foreground line-clamp-2" title={product.packaging_details}>
                    {product.packaging_details || 'Custom Packaging Available'}
                  </p>
                </div>
              </div>

              {/* Add to Cart - Interactive Area */}
              <div className="bg-card p-6 rounded-3xl border border-border shadow-md space-y-4">
                <div className="flex items-end justify-between mb-4">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Price</p>
                    {product.price ? (
                      <p className="font-bold text-3xl sm:text-4xl text-foreground">₹{product.price}</p>
                    ) : (
                      <p className="font-bold text-2xl text-foreground">Request Quote</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-green-600 text-sm font-bold flex items-center gap-1.5"><Check className="w-4 h-4" /> Global Shipping Available</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => addItem(product)}
                    className="flex-1 relative overflow-hidden flex items-center justify-center gap-3 py-4 sm:py-5 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    <div className="flex items-center gap-2">
                      <ShoppingCart className="w-5 h-5" /> Add to Cart
                    </div>
                  </button>
                  <a
                    href={`https://wa.me/918500336668?text=${whatsappMsg}`}
                    className="flex-1 sm:flex-none sm:w-auto flex items-center justify-center gap-2 border border-border bg-background text-foreground px-8 py-4 sm:py-5 rounded-xl font-bold text-sm hover:bg-muted transition-all"
                  >
                    <MessageCircle className="w-5 h-5" /> Quick Inquiry
                  </a>
                </div>
              </div>

              {/* Specs and Variations */}
              <div className="pt-8 border-t border-border">
                {subproducts.length > 0 && (
                  <div className="mb-10">
                    <h3 className="font-bold text-xl sm:text-2xl mb-4 flex items-center gap-2">
                      <ListTree className="w-6 h-6 text-primary" /> Available Variations & Grades
                    </h3>
                    <p className="text-muted-foreground text-sm mb-6">
                      We offer multiple grades and processing types for this product. Select your required specification when requesting a quote.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {subproducts.map((sp: { id: string, name: string }) => (
                        <div
                          key={sp.id}
                          className="bg-muted/30 border border-white/5 p-4 rounded-xl flex items-center gap-3 hover:bg-white/5 hover:border-primary/30 transition-colors"
                        >
                          <div className="w-2 h-2 rounded-full bg-primary" />
                          <span className="font-semibold text-foreground">{sp.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary" /> Quality Certifications
                  </h3>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {certifications.map((c: string) => (
                      <span key={c} className="text-xs sm:text-sm font-bold border border-border bg-card px-5 py-2.5 rounded-full text-foreground shadow-sm">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Inquiry Form */}
              <div className="pt-8">
                <div className="bg-card p-6 sm:p-10 rounded-3xl border border-border shadow-sm">
                  <h3 className="text-xl sm:text-2xl font-bold mb-2">Request Official Quote</h3>
                  <p className="text-muted-foreground text-sm mb-6">Our team will get back to you with pricing and logistics within 24 hours.</p>
                  <ProductInquiryForm productName={product.name} />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Similar Products Section */}
        {product.id && (
          <SimilarProducts
            currentProductId={product.id}
            categorySlug={product.categories?.slug}
          />
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
