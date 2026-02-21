import { motion } from "framer-motion";

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

const products = [
  { name: "Turmeric", image: turmericImg },
  { name: "Cashew Nuts", image: cashewImg },
  { name: "Onions", image: onionsImg },
  { name: "Onion Powder", image: onionPowderImg },
  { name: "Millets", image: milletsImg },
  { name: "Jaggery", image: jaggeryImg },
  { name: "Jaggery Powder", image: jaggeryPowderImg },
  { name: "Honey", image: honeyImg },
  { name: "Moringa Powder", image: moringaImg },
  { name: "Banana Powder", image: bananaPowderImg },
  { name: "Groundnut", image: groundnutImg },
  { name: "Sesame Seeds", image: sesameImg },
  { name: "Ginger", image: gingerImg },
  { name: "Coconut Products", image: coconutImg },
  { name: "Herbal Powders", image: herbalImg },
  { name: "Spices", image: spicesImg },
  { name: "Potato", image: potatoImg },
];

const ProductCard = ({ product, index }: { product: typeof products[0]; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group product-card-hover shine-sweep glass-card overflow-hidden rounded-2xl"
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="text-lg font-serif font-semibold text-foreground mb-3">
            {product.name}
          </h3>
          <a
            href="#contact"
            className="inline-block gold-gradient-bg text-primary-foreground text-sm font-semibold px-5 py-2 rounded-full opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
          >
            Request Quote
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const ProductsSection = () => {
  return (
    <section id="products" className="py-24 section-gradient">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
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

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {products.map((product, i) => (
            <ProductCard key={product.name} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
