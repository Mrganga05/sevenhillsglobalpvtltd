import { memo, useState } from "react";
import { MessageCircle, Award, Eye, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { DEFAULT_PRODUCT_IMAGE } from "../constants/defaultImage";
import { getFallbackImage } from "../utils/productImages";

export const ProductCard = memo(({ product, index }: { product: any; index: number }) => {
    const navigate = useNavigate();
    const { addItem } = useCart();

    const whatsappMsg = encodeURIComponent(`Hello Seven Hills Global, I'm interested in ${product.name}. Please share details.`);

    const fallback = getFallbackImage(product.name);
    const image = product.image_url || fallback || DEFAULT_PRODUCT_IMAGE;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="group flex flex-col justify-between overflow-hidden rounded-xl sm:rounded-2xl h-full border border-white/5 hover:border-primary/50 bg-card/60 backdrop-blur-xl transition-colors duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.15)]"
        >
            <div
                className="relative overflow-hidden bg-muted/20 rounded-t-xl sm:rounded-t-2xl h-32 sm:h-48 md:h-60 cursor-pointer"
                onClick={() => navigate(`/products/${product.slug}`)}
            >
                {/* Image Skeleton removed for robust loading */}

                <img
                    src={image}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-t-xl sm:rounded-t-2xl transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-80 transition-opacity duration-300 pointer-events-none" />

                {product.categories?.name && (
                    <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10">
                        <span className="inline-flex items-center gap-1 sm:gap-1.5 text-[8px] sm:text-[10px] font-bold tracking-[0.1em] uppercase bg-black/50 backdrop-blur-md border border-white/10 text-white px-2 sm:px-3 py-1 rounded-full shadow-lg">
                            <Award className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-primary" />
                            {product.categories?.name}
                        </span>
                    </div>
                )}
            </div>

            <div className="p-3 sm:p-4 md:p-5 flex flex-col flex-1 relative z-10 bg-gradient-to-b from-transparent to-background/50">
                <h3
                    className="text-sm sm:text-base md:text-lg font-bold text-primary mb-1.5 line-clamp-1 group-hover:text-primary transition-colors duration-300 cursor-pointer"
                    onClick={() => navigate(`/products/${product.slug}`)}
                >
                    {product.name}
                </h3>
                <p className="text-[10px] sm:text-xs md:text-sm text-primary/80 line-clamp-2 mb-4 leading-relaxed flex-1">
                    {product.short_description}
                </p>

                {/* Specs Grid */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                    {product.origin && (
                        <div className="bg-white/5 rounded-lg p-2 border border-white/5 backdrop-blur-sm group-hover:bg-white/10 transition-colors">
                            <span className="block text-[8px] sm:text-[9px] uppercase tracking-widest text-white/40 font-bold mb-1">Origin</span>
                            <span className="block text-[10px] sm:text-xs font-semibold text-white/90 truncate">{product.origin}</span>
                        </div>
                    )}
                    {product.moq && (
                        <div className="bg-white/5 rounded-lg p-2 border border-white/5 backdrop-blur-sm group-hover:bg-white/10 transition-colors">
                            <span className="block text-[8px] sm:text-[9px] uppercase tracking-widest text-white/40 font-bold mb-1">MOQ</span>
                            <span className="block text-[10px] sm:text-xs font-semibold text-white/90 truncate">{product.moq}</span>
                        </div>
                    )}
                </div>

                <div className="flex flex-col gap-2 mt-auto">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            addItem(product);
                        }}
                        className="w-full relative overflow-hidden flex items-center justify-center gap-2 text-[10px] sm:text-xs font-bold py-2.5 sm:py-3 rounded-lg transition-all duration-300 bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                        <div className="flex items-center gap-1.5">
                            <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Add to Cart
                        </div>
                    </button>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => navigate(`/products/${product.slug}`)}
                            className="flex-1 inline-flex items-center justify-center gap-1.5 border border-white/10 text-white/70 hover:text-white hover:bg-white/5 hover:border-white/20 text-[10px] sm:text-xs font-bold py-2 rounded-lg transition-all duration-300"
                        >
                            <Eye className="w-3.5 h-3.5" /> Details
                        </button>
                        <a
                            href={`https://wa.me/918500336668?text=${whatsappMsg}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 inline-flex items-center justify-center gap-1.5 bg-white/5 border border-white/10 text-primary hover:bg-primary/10 hover:border-primary/30 text-[10px] sm:text-xs font-bold py-2 rounded-lg transition-all duration-300"
                        >
                            <MessageCircle className="w-3.5 h-3.5" /> Inquiry
                        </a>
                    </div>
                </div>
            </div>
        </motion.div >
    );
});

ProductCard.displayName = 'ProductCard';
