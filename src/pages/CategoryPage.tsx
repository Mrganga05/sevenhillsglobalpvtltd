import { useParams, Link } from "react-router-dom";
import { PackageOpen, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useProducts, useCategories } from "../hooks/useDatabase";
import { ProductCard } from "../components/ProductCard";

const CategoryPage = () => {
    const { categorySlug } = useParams<{ categorySlug: string }>();

    const { data: categories = [], isLoading: categoriesLoading } = useCategories();
    const { data: products, isLoading: productsLoading, isError } = useProducts(categorySlug);

    const currentCategory = categories.find(c => c.slug === categorySlug);
    const isLoading = categoriesLoading || productsLoading;

    return (
        <div className="bg-background min-h-screen pt-24 pb-16 relative overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                <Link to="/products" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8 transition-colors font-bold text-[10px] sm:text-xs uppercase tracking-widest">
                    <ArrowLeft className="w-3.5 h-3.5" /> All Products
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-10 sm:mb-16 bg-card p-6 sm:p-12 rounded-3xl border border-border shadow-md overflow-hidden relative"
                >
                    <div className="inline-flex items-center gap-2 mb-4">
                        <div className="h-px w-6 sm:w-8 bg-primary/50"></div>
                        <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase text-primary">
                            Collection
                        </span>
                        <div className="h-px w-6 sm:w-8 bg-primary/50"></div>
                    </div>

                    {isLoading ? (
                        <div className="animate-pulse space-y-4 max-w-2xl">
                            <div className="h-10 sm:h-14 bg-muted rounded-xl w-3/4"></div>
                            <div className="h-4 bg-muted rounded-lg w-full"></div>
                            <div className="h-4 bg-muted rounded-lg w-2/3"></div>
                        </div>
                    ) : (
                        <>
                            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
                                {currentCategory ? currentCategory.name : "Category Not Found"}
                            </h1>
                            <p className="text-muted-foreground text-sm sm:text-xl leading-relaxed max-w-3xl">
                                {currentCategory?.description || "Explore our premium selection of agricultural exports in this category, processed to meet rigorous global standards."}
                            </p>
                        </>
                    )}
                </motion.div>

                {isLoading ? (
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="animate-pulse aspect-[3/4] rounded-2xl bg-muted border border-border"></div>
                        ))}
                    </div>
                ) : isError || !products || products.length === 0 ? (
                    <div className="text-center py-20 px-4 bg-card max-w-xl mx-auto rounded-3xl border border-border shadow-sm">
                        <PackageOpen className="w-16 h-16 text-primary/20 mx-auto mb-6" />
                        <h3 className="text-2xl font-bold mb-3">No Items Found</h3>
                        <p className="text-muted-foreground">We haven't added items to this specific collection yet.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
                        {products.map((product, i) => (
                            <ProductCard key={product.id} product={product} index={i} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoryPage;
