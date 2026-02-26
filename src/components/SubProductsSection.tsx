import { ListTree } from "lucide-react";
import { SubProductCard } from "./SubProductCard";

interface SubProductsSectionProps {
    subproducts: any[];
    parentProduct: any;
}

export const SubProductsSection = ({ subproducts, parentProduct }: SubProductsSectionProps) => {
    if (!subproducts || subproducts.length === 0) return null;

    return (
        <div className="py-16 sm:py-20 border-t border-border mt-12 sm:mt-24">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
                <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">
                    <ListTree className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                    Available Variations & Sub-products
                </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                {subproducts.map((product, index) => (
                    <SubProductCard key={product.id} product={product} parentProduct={parentProduct} index={index} />
                ))}
            </div>
        </div>
    );
};
