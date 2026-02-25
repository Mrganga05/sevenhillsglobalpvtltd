import { useState, useMemo } from "react";
import { PackageOpen, Filter, Search, X } from "lucide-react";
import { useProducts, useCategories } from "../hooks/useDatabase";
import { ProductCard } from "../components/ProductCard";

const Products = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const { data: categories = [], isLoading: categoriesLoading } = useCategories();
    const { data: products, isLoading: productsLoading, isError } = useProducts();

    const filteredProducts = useMemo(() => {
        if (!products) return [];
        return products.filter((p) => {
            const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (p.short_description || "").toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === "all" || p.categories?.slug === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [products, searchQuery, selectedCategory]);

    return (
        <div className="bg-background min-h-screen pt-24 pb-16 relative overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
                    <div className="inline-flex items-center justify-center gap-2 mb-4">
                        <div className="h-px w-6 sm:w-8 bg-primary/50"></div>
                        <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase text-primary">
                            Our Catalog
                        </span>
                        <div className="h-px w-6 sm:w-8 bg-primary/50"></div>
                    </div>
                    <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
                        Premium <span className="text-primary">Agricultural Products</span>
                    </h1>
                    <p className="text-muted-foreground text-sm sm:text-xl leading-relaxed">
                        Explore our comprehensive range of high-quality Indian agricultural exports, sourced and processed to meet international standards.
                    </p>
                </div>

                {/* Filters & Search */}
                <div className="mb-8 sm:mb-12 bg-card p-4 sm:p-6 rounded-2xl border border-border shadow-md">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 sm:w-5 sm:h-5" />
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary text-sm transition-all"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>

                        {/* Desktop Category Select */}
                        <div className="hidden md:block min-w-[220px]">
                            <div className="relative">
                                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-primary w-4 h-4" />
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="w-full pl-9 pr-8 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary text-sm font-semibold appearance-none cursor-pointer"
                                >
                                    <option value="all">All Categories</option>
                                    {!categoriesLoading && categories.map(cat => (
                                        <option key={cat.id} value={cat.slug}>{cat.name}</option>
                                    ))}
                                </select>
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                    <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                </div>
                            </div>
                        </div>

                        {/* Mobile Category Scroll */}
                        <div className="md:hidden flex overflow-x-auto gap-2 pb-2 no-scrollbar">
                            <button
                                onClick={() => setSelectedCategory("all")}
                                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${selectedCategory === "all"
                                    ? "bg-primary text-primary-foreground border-transparent shadow-md"
                                    : "bg-background text-foreground border-border"
                                    }`}
                            >
                                All Items
                            </button>
                            {!categoriesLoading && categories.map(cat => (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.slug)}
                                    className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${selectedCategory === cat.slug
                                        ? "bg-primary text-primary-foreground border-transparent shadow-md"
                                        : "bg-background text-foreground border-border"
                                        }`}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {productsLoading ? (
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="animate-pulse aspect-[3/4] rounded-2xl bg-muted border border-border"></div>
                        ))}
                    </div>
                ) : isError ? (
                    <div className="text-center py-20 bg-card max-w-xl mx-auto rounded-3xl border border-border">
                        <PackageOpen className="w-16 h-16 text-primary/20 mx-auto mb-6" />
                        <h3 className="text-2xl font-bold mb-3">Connection Error</h3>
                        <p className="text-muted-foreground px-6">We're unable to fetch our products at the moment. Please check back shortly.</p>
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className="text-center py-20 px-4 bg-card max-w-xl mx-auto rounded-3xl border border-border">
                        <PackageOpen className="w-16 h-16 text-primary/20 mx-auto mb-6" />
                        <h3 className="text-2xl font-bold mb-3">No Results Found</h3>
                        <p className="text-muted-foreground mb-8">Try adjusting your filters or search terms.</p>
                        <button
                            onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }}
                            className="bg-primary text-primary-foreground font-bold py-3 px-8 rounded-xl"
                        >
                            View All Products
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                        {filteredProducts.map((product, i) => (
                            <ProductCard key={product.id} product={product} index={i} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Products;
