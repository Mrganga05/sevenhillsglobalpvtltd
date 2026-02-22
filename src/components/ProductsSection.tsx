import { motion } from "framer-motion";
import { MessageCircle, Award, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

import turmericImg from "@/assets/products/turmeric.jpg";
import cashewImg from "@/assets/products/cashew.jpg";
import onionsImg from "@/assets/products/onions.jpg";
import onionPowderImg from "@/assets/products/onion-powder.jpg";
import milletsImg from "@/assets/products/millets.jpg";
import jaggeryImg from "@/assets/products/jaggery.jpg";
import jaggeryPowderImg from "@/assets/products/jaggery-powder.jpg";
import honeyImg from "@/assets/products/honey.jpg";
import moringaImg from "@/assets/products/moringa.jpg";
import bananaPowderImg from "@/assets/products/banana-powder.jpg";
import groundnutImg from "@/assets/products/groundnut.jpg";
import sesameImg from "@/assets/products/sesame.jpg";
import gingerImg from "@/assets/products/ginger.jpg";
import coconutImg from "@/assets/products/coconut.jpg";
import herbalImg from "@/assets/products/herbal.jpg";
import spicesImg from "@/assets/products/spices.jpg";
import potatoImg from "@/assets/products/potato.jpg";

export const products = [
  { name: "Turmeric", slug: "turmeric", image: turmericImg, desc: "Premium Erode & Nizamabad turmeric with high curcumin content, ideal for food, pharma & cosmetics.", origin: "Andhra Pradesh & Tamil Nadu", moq: "1 MT", grade: "Export A" },
  { name: "Cashew Nuts", slug: "cashew-nuts", image: cashewImg, desc: "Hand-sorted W180, W240, W320 grade cashew kernels with consistent quality.", origin: "Andhra Pradesh & Kerala", moq: "500 Kg", grade: "Export Premium" },
  { name: "Onions", slug: "onions", image: onionsImg, desc: "Fresh red, white & pink onions sourced from Nashik and AP regions.", origin: "Maharashtra & AP", moq: "5 MT", grade: "Export A" },
  { name: "Onion Powder", slug: "onion-powder", image: onionPowderImg, desc: "Dehydrated onion powder with rich aroma, perfect for seasoning blends.", origin: "Maharashtra", moq: "500 Kg", grade: "Export A" },
  { name: "Millets", slug: "millets", image: milletsImg, desc: "Organic foxtail, finger, pearl & barnyard millets — superfood grains.", origin: "Andhra Pradesh", moq: "1 MT", grade: "Organic" },
  { name: "Jaggery", slug: "jaggery", image: jaggeryImg, desc: "Traditional sugarcane jaggery blocks, chemical-free natural sweetener.", origin: "Andhra Pradesh", moq: "2 MT", grade: "Export A" },
  { name: "Jaggery Powder", slug: "jaggery-powder", image: jaggeryPowderImg, desc: "Fine-ground jaggery powder for beverages, bakery & health foods.", origin: "Andhra Pradesh", moq: "1 MT", grade: "Export A" },
  { name: "Honey", slug: "honey", image: honeyImg, desc: "Pure multiflora & acacia honey, NMR tested, raw & unprocessed.", origin: "Andhra Pradesh", moq: "500 Kg", grade: "NMR Tested" },
  { name: "Moringa Powder", slug: "moringa-powder", image: moringaImg, desc: "Shade-dried moringa oleifera leaf powder, rich in nutrients.", origin: "Tamil Nadu & AP", moq: "500 Kg", grade: "Organic" },
  { name: "Banana Powder", slug: "banana-powder", image: bananaPowderImg, desc: "Spray-dried banana powder ideal for baby food and health supplements.", origin: "Andhra Pradesh", moq: "500 Kg", grade: "Export A" },
  { name: "Groundnut", slug: "groundnut", image: groundnutImg, desc: "Bold & Java type groundnuts, hand-picked and sorted for export.", origin: "Gujarat & AP", moq: "2 MT", grade: "Export Premium" },
  { name: "Sesame Seeds", slug: "sesame-seeds", image: sesameImg, desc: "Natural & hulled white sesame seeds with 99.95% purity.", origin: "Rajasthan & Gujarat", moq: "1 MT", grade: "Export Premium" },
  { name: "Ginger", slug: "ginger", image: gingerImg, desc: "Fresh & dried ginger with high gingerol content for global markets.", origin: "Kerala & AP", moq: "1 MT", grade: "Export A" },
  { name: "Coconut Products", slug: "coconut-products", image: coconutImg, desc: "Desiccated coconut, coconut oil, virgin coconut oil & coconut powder.", origin: "Kerala & Tamil Nadu", moq: "1 MT", grade: "Export A" },
  { name: "Herbal Powders", slug: "herbal-powders", image: herbalImg, desc: "Ashwagandha, Brahmi, Tulsi & more — certified herbal powders.", origin: "Pan India", moq: "500 Kg", grade: "Organic" },
  { name: "Spices", slug: "spices", image: spicesImg, desc: "Red chilli, black pepper, coriander, cumin — premium Indian spices.", origin: "Andhra Pradesh & Kerala", moq: "1 MT", grade: "Export A" },
  { name: "Potato", slug: "potato", image: potatoImg, desc: "Fresh table potatoes and processing-grade potatoes for chips industry.", origin: "Uttar Pradesh & Gujarat", moq: "5 MT", grade: "Export A" },
];

const ProductCard = ({ product, index }: { product: typeof products[0]; index: number }) => {
  const navigate = useNavigate();
  const whatsappMsg = encodeURIComponent(`Hello Seven Hills Global, I'm interested in ${product.name}. Please share details.`);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.04 }}
      className="group product-card-hover shine-sweep glass-card overflow-hidden rounded-2xl"
    >
      <div className="relative aspect-[4/5] sm:aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent" />

        {/* Export grade badge */}
        <div className="absolute top-3 right-3">
          <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-sans font-semibold tracking-wide uppercase gold-gradient-bg text-primary-foreground px-2.5 py-1 rounded-full">
            <Award className="w-3 h-3" />
            {product.grade}
          </span>
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
          <h3 className="text-base sm:text-lg font-serif font-semibold text-foreground mb-1">
            {product.name}
          </h3>
          <p className="text-xs sm:text-sm text-foreground/50 font-sans line-clamp-2 mb-3 leading-relaxed">
            {product.desc}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate(`/product/${product.slug}`)}
              className="flex-1 inline-flex items-center justify-center gap-1.5 border border-primary/40 text-foreground text-xs sm:text-sm font-semibold px-3 py-2 rounded-full opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-primary/10"
            >
              <Eye className="w-3.5 h-3.5" /> Details
            </button>
            <a
              href={`https://wa.me/918500336668?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 gold-gradient-bg text-primary-foreground text-xs sm:text-sm font-semibold px-3 py-2 rounded-full opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-75"
            >
              <MessageCircle className="w-3.5 h-3.5" /> Inquire
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ProductsSection = () => {
  return (
    <section id="products" className="py-16 sm:py-24 section-gradient">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-16"
        >
          <span className="text-sm font-sans font-semibold tracking-[0.2em] uppercase text-primary/70 mb-4 block">
            Our Premium Products
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">
            Export-Grade <span className="gold-gradient-text">Agricultural Products</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto font-sans">
            Sourced directly from India's finest farms, processed to meet the highest international quality standards.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {products.map((product, i) => (
            <ProductCard key={product.name} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
