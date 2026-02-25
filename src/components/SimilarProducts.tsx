import { useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, PackageSearch } from "lucide-react";
import { useProducts } from "../hooks/useDatabase";
import { ProductCard } from "./ProductCard";

interface SimilarProductsProps {
    currentProductId: string;
    categorySlug?: string;
}

export const SimilarProducts = ({ currentProductId, categorySlug }: SimilarProductsProps) => {
    // Fetch products from the same category.
    const { data: products, isLoading } = useProducts(categorySlug);

    const similarProducts = useMemo(() => {
        if (!products) return [];
        // Filter out the current product and grab up to 4 items
        return products.filter(p => p.id !== currentProductId).slice(0, 4);
    }, [products, currentProductId]);

    if (isLoading) {
        return (
            <div className="py-12 border-t border-border mt-16 animate-pulse">
                <div className="h-8 w-64 bg-white/5 rounded-md mb-8"></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-80 bg-white/5 rounded-2xl"></div>
                    ))}
                </div>
            </div>
        );
    }

    if (similarProducts.length === 0) return null;

    return (
        <div className="py-16 sm:py-20 border-t border-border mt-12 sm:mt-24">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
                <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">
                    <PackageSearch className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                    Similar Products You May Like
                </h2>

                {categorySlug && (
                    <Link
                        to={`/collections/${categorySlug}`}
                        className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors bg-card px-4 py-2 border border-border rounded-xl shadow-sm"
                    >
                        View full category <ArrowRight className="w-4 h-4" />
                    </Link>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
                {similarProducts.map((product, index) => (
                    <ProductCard key={product.id} product={product} index={index} />
                ))}
            </div>
        </div>
    );
};
