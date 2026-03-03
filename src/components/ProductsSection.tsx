import { PackageOpen, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useProducts } from "../hooks/useDatabase";
import { DEFAULT_PRODUCT_IMAGE } from "../constants/defaultImage";
import { getFallbackImage } from "../utils/productImages";

const ProductsSection = () => {
  // Fetch featured products dynamically from the database — show up to 20
  const { data: displayProducts, isLoading, isError } = useProducts(undefined, true, 20);

  return (
    <section id="products" className="w-full py-14 sm:py-20 lg:py-24 relative overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14 lg:mb-16"
        >
          <div className="inline-flex items-center justify-center gap-2 mb-4">
            <div className="h-px w-8 bg-primary/50"></div>
            <span className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-primary">
              Featured Selection
            </span>
            <div className="h-px w-8 bg-primary/50"></div>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-foreground">
            Premium <span className="text-primary">Agricultural Exports</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base leading-relaxed px-2">
            Sourced directly from India's finest farms, meticulously processed to meet and exceed strict international quality standards.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5 max-w-7xl mx-auto">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="animate-pulse h-[220px] sm:h-[280px] rounded-2xl bg-muted border border-border"></div>
            ))}
          </div>
        ) : isError || !displayProducts || displayProducts.length === 0 ? (
          <div className="text-center py-12 p-6 bg-card border border-border max-w-2xl mx-auto rounded-xl shadow-sm">
            <PackageOpen className="w-12 h-12 text-muted-foreground opacity-50 mx-auto mb-4" />
            <p className="text-muted-foreground">No featured products found. Please check back later or add products via the admin dashboard.</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5 max-w-7xl mx-auto"
          >
            {displayProducts.map((product, i) => {
              const fallback = getFallbackImage(product.name);
              const image = product.image_url || fallback || DEFAULT_PRODUCT_IMAGE;

              return (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.5) }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  key={product.id}
                  className="group relative flex flex-col rounded-2xl overflow-hidden bg-card border border-border hover:border-primary/50 transition-colors duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.15)] cursor-pointer"
                >
                  <Link to={`/products/${product.slug}`} className="absolute inset-0 z-10">
                    <span className="sr-only">View {product.name}</span>
                  </Link>
                  <div className="relative w-full h-28 sm:h-44 md:h-48 overflow-hidden bg-muted">
                    <img
                      src={image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  <div className="relative p-3 sm:p-4 flex flex-col flex-1 bg-card/60 backdrop-blur-xl border-t border-white/5 z-20 pointer-events-none">
                    <h3 className="text-xs sm:text-sm lg:text-base font-bold text-primary mb-1 group-hover:text-primary transition-colors duration-300 line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-muted-foreground line-clamp-2 mb-2 flex-1 leading-relaxed hidden sm:block">
                      {product.short_description}
                    </p>
                    <div className="inline-flex items-center gap-1 text-primary font-bold uppercase tracking-wider text-[9px] sm:text-[10px] w-fit">
                      View Details <ArrowRight className="w-2.5 h-2.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        <div className="text-center mt-12 sm:mt-16 lg:mt-20">
          <Link
            to="/products"
            className="inline-flex items-center justify-center gap-2 border border-primary bg-primary text-primary-foreground hover:bg-primary/90 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full font-bold transition-all duration-300 text-sm sm:text-base"
          >
            Explore Full Product Range
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
