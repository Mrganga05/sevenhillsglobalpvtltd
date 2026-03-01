import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useCategories } from "../hooks/useDatabase";
import { supabase, supabaseAdmin } from "../lib/supabase";
import { toast } from "sonner";
import { Package, Plus, Trash2, Edit, Save, ImageIcon, Loader2, ListTree } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { getFallbackImage } from "../utils/productImages";

interface Product {
    id: string;
    name: string;
    slug: string;
    short_description: string;
    full_description: string;
    image_url: string;
    category_id: string;
    is_featured: boolean;
    gallery_images?: string[];
    created_at?: string;
    price?: number;
    categories?: {
        name: string;
        slug: string;
    };
}

const ProductsManager = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        category_id: "",
        short_description: "",
        full_description: "",
        image_url: "",
        gallery_images: [] as string[],
        price: "",
        is_featured: false,
    });

    // New Hierarchy State
    const [productType, setProductType] = useState<"product" | "subproduct">("product");
    const [parentId, setParentId] = useState("");

    const { data: categoriesList = [] } = useCategories();
    const queryClient = useQueryClient();
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
    const [saving, setSaving] = useState(false);

    const fetchProducts = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('products')
            .select('*, categories(*)')
            .order('created_at', { ascending: false });

        if (error) {
            toast.error("Failed to load products");
        } else {
            setProducts(data as Product[] || []);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
        setFormData({
            ...formData,
            [e.target.name]: value
        });

        // Auto-generate slug from name if slug is empty or currently matches old name
        if (e.target.name === 'name' && (!formData.slug || formData.slug === formData.name.toLowerCase().replace(/ /g, '-'))) {
            setFormData(prev => ({
                ...prev,
                slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
            }));
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setGalleryFiles(Array.from(e.target.files));
        }
    };

    const uploadImage = async (file: File): Promise<string | null> => {
        try {
            // Refresh auth session to ensure JWT is fresh for storage upload
            await supabase.auth.refreshSession();

            const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
            const uniqueName = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
            // Use a flat path — avoids folder-level permission issues on some bucket configs
            const filePath = uniqueName;

            const { error: uploadError } = await supabase.storage
                .from('products-images')
                .upload(filePath, file, {
                    cacheControl: '3600',
                    upsert: false,
                    contentType: file.type,
                });

            if (uploadError) {
                console.error("Storage upload error details:", JSON.stringify(uploadError, null, 2));
                toast.error(`Upload failed: ${uploadError.message}`);
                return null;
            }

            const { data } = supabase.storage.from('products-images').getPublicUrl(filePath);
            return data.publicUrl;
        } catch (error: any) {
            console.error("Unexpected upload error:", error);
            toast.error(`Upload error: ${error?.message || 'Unknown error'}`);
            return null;
        }
    };

    const handleCreateCategory = async () => {
        const name = window.prompt("Enter new Product Type name:");
        if (!name || name.trim() === "") return;

        try {
            const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
            const { data, error } = await supabaseAdmin
                .from('categories')
                .insert([{ name: name.trim(), slug }])
                .select()
                .single();

            if (error) throw error;

            toast.success("Product Type added successfully");
            setFormData(prev => ({ ...prev, category_id: data.id }));
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        } catch (error: any) {
            toast.error(error.message || "Failed to add product type");
        }
    };

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();

        if (productType === "product" && !formData.category_id) {
            toast.error("Please select a Product Type.");
            return;
        }
        if (productType === "subproduct" && !parentId) {
            toast.error("You must select a Parent Product for the Subproduct.");
            return;
        }

        setSaving(true);
        toast.info("Saving product...");

        try {
            let finalImageUrl = formData.image_url || "";
            let finalGalleryUrls = [...formData.gallery_images];

            // Upload main image if a file was selected
            if (imageFile) {
                toast.info("Uploading image...");
                const uploadedUrl = await uploadImage(imageFile);
                if (uploadedUrl) {
                    finalImageUrl = uploadedUrl;
                } else {
                    // Warn but don't block — product saves without image
                    toast.warning("Image upload failed (bucket missing?). Product will be saved without an image. You can edit it later.");
                }
            }

            // Upload gallery images
            if (galleryFiles.length > 0) {
                for (const file of galleryFiles) {
                    const url = await uploadImage(file);
                    if (url) finalGalleryUrls.push(url);
                }
            }

            if (productType === "product") {
                // Build a clean payload using only valid product columns
                const productData = {
                    name: formData.name,
                    slug: formData.slug,
                    category_id: formData.category_id,
                    short_description: formData.short_description || null,
                    full_description: formData.full_description || null,
                    image_url: finalImageUrl || null,
                    gallery_images: finalGalleryUrls.length > 0 ? finalGalleryUrls : null,
                    price: formData.price ? parseFloat(formData.price as string) : null,
                    is_featured: formData.is_featured,
                };

                if (editingId) {
                    const { error } = await supabaseAdmin
                        .from('products')
                        .update(productData)
                        .eq('id', editingId);
                    if (error) throw error;
                    toast.success("Product updated successfully!");
                } else {
                    const { error } = await supabaseAdmin
                        .from('products')
                        .insert([productData]);
                    if (error) throw error;
                    toast.success("Product added successfully!");
                }
            } else {
                const subproductData = {
                    product_id: parentId,
                    name: formData.name,
                    slug: formData.slug,
                    short_description: formData.short_description || null,
                    price: formData.price ? parseFloat(formData.price as string) : null,
                    image_url: finalImageUrl || null,
                };

                const { error } = await supabaseAdmin
                    .from('subproducts')
                    .insert([subproductData]);
                if (error) throw error;
                toast.success("Subproduct added successfully!");
            }

            // Refresh list
            await fetchProducts();
            queryClient.invalidateQueries({ queryKey: ["products"] });
            setIsAddOpen(false);
            resetForm();
        } catch (error: any) {
            console.error("Save error:", error);
            toast.error(error.message || "Failed to save. Check console for details.");
        } finally {
            setSaving(false);
        }
    };

    const resetForm = () => {
        setFormData({
            name: "",
            slug: "",
            category_id: "",
            short_description: "",
            full_description: "",
            image_url: "",
            gallery_images: [],
            price: "",
            is_featured: false,
        });
        setImageFile(null);
        setGalleryFiles([]);
        setEditingId(null);
        setProductType("product");
        setParentId("");
    };

    const handleEdit = (product: Product) => {
        setFormData({
            name: product.name || "",
            slug: product.slug || "",
            category_id: product.category_id || "",
            short_description: product.short_description || "",
            full_description: product.full_description || "",
            image_url: product.image_url || "",
            gallery_images: product.gallery_images || [],
            price: product.price ? product.price.toString() : "",
            is_featured: product.is_featured || false,
        });
        setEditingId(product.id);
        setProductType("product"); // Editing from this table is strictly for Main Products
        setParentId("");
        setImageFile(null);
        setGalleryFiles([]);
        setIsAddOpen(true);
    };

    const handleDelete = async (id: string, name: string) => {
        if (!confirm(`Are you sure you want to delete ${name}?`)) return;

        const { error } = await supabaseAdmin.from('products').delete().eq('id', id);

        if (error) {
            toast.error("Failed to delete product");
        } else {
            toast.success("Product deleted");
            setProducts(products.filter(p => p.id !== id));
            queryClient.invalidateQueries({ queryKey: ["products"] });
        }
    };

    const toggleFeatured = async (product: Product) => {
        const { error } = await supabaseAdmin
            .from('products')
            .update({ is_featured: !product.is_featured })
            .eq('id', product.id);

        if (error) {
            toast.error("Failed to update status");
        } else {
            toast.success(`Product ${!product.is_featured ? 'featured' : 'unfeatured'}`);
            setProducts(products.map(p => p.id === product.id ? { ...p, is_featured: !product.is_featured } : p));
            queryClient.invalidateQueries({ queryKey: ["products"] });
        }
    };

    return (
        <div className="space-y-6 animate-fade-in pb-20">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-border/50">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-foreground">Products Catalog</h1>
                    <p className="text-muted-foreground mt-1">Manage your agricultural exports catalog.</p>
                </div>
                <Dialog open={isAddOpen} onOpenChange={(open) => { setIsAddOpen(open); if (!open) resetForm(); }}>
                    <DialogTrigger asChild>
                        <Button className="bg-gold hover:bg-gold-light text-forest font-bold shine-sweep" onClick={resetForm}>
                            <Plus className="w-4 h-4 mr-2" /> Add Product
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="glass-card border-border/50 bg-card/95 sm:max-w-3xl max-h-[90vh] overflow-y-auto w-[95vw] sm:w-full">
                        <DialogHeader>
                            <DialogTitle className="font-serif text-2xl gold-gradient-text flex items-center gap-2">
                                {editingId ? <Edit className="w-6 h-6" /> : <Package className="w-6 h-6" />}
                                {editingId ? "Edit Product" : "New Product"}
                            </DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleAdd} className="space-y-6 pt-4">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-foreground">Product Name *</label>
                                        <Input
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="bg-background/50 border-border/50 focus:border-gold/50"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-foreground">URL Slug *</label>
                                        <Input
                                            name="slug"
                                            value={formData.slug}
                                            onChange={handleChange}
                                            required
                                            className="bg-background/50 border-border/50 focus:border-gold/50"
                                            placeholder="my-product-name"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-foreground">Type *</label>
                                        <Select
                                            value={productType}
                                            onValueChange={(val: "product" | "subproduct") => setProductType(val)}
                                            disabled={!!editingId}
                                        >
                                            <SelectTrigger className="w-full rounded-md border border-border/50 bg-background/50 px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold/50 h-10">
                                                <SelectValue placeholder="Select type" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-card border-border/50">
                                                <SelectItem value="product">Main Product</SelectItem>
                                                <SelectItem value="subproduct">Subproduct</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {productType === "product" ? (
                                        <>
                                            <div className="space-y-2">
                                                <div className="flex justify-between items-center">
                                                    <label className="text-sm font-semibold text-foreground">Product Type *</label>
                                                    <button type="button" onClick={handleCreateCategory} className="text-xs text-gold hover:underline flex items-center gap-1"><Plus className="w-3 h-3" /> Add New</button>
                                                </div>
                                                <Select
                                                    value={formData.category_id || undefined}
                                                    onValueChange={(val) => setFormData({ ...formData, category_id: val })}
                                                >
                                                    <SelectTrigger className="w-full rounded-md border border-border/50 bg-background/50 px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold/50 h-10">
                                                        <SelectValue placeholder="Select Product Type" />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-card border-border/50 max-h-[300px]">
                                                        {categoriesList.map(c => (
                                                            <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="flex items-center gap-2 mt-6">
                                                <input
                                                    type="checkbox"
                                                    id="is_featured"
                                                    name="is_featured"
                                                    checked={formData.is_featured}
                                                    onChange={handleChange}
                                                    className="w-4 h-4 rounded border-border/50 text-gold focus:ring-gold/20 accent-gold bg-background/50"
                                                />
                                                <label htmlFor="is_featured" className="text-sm font-semibold text-foreground">Feature on Homepage</label>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-foreground">Parent Product *</label>
                                            <Select
                                                value={parentId || undefined}
                                                onValueChange={(val) => setParentId(val)}
                                            >
                                                <SelectTrigger className="w-full rounded-md border border-border/50 bg-background/50 px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold/50 h-10">
                                                    <SelectValue placeholder="Select parent product" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-card border-border/50 max-h-[300px]">
                                                    {products.map(p => (
                                                        <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-foreground">
                                            {productType === "product" ? "Main Product Image *" : "Subproduct Image *"}
                                        </label>
                                        <div className="p-4 border border-dashed border-border/50 rounded-xl bg-background/30 hover:bg-white/5 transition-colors group relative">
                                            <Input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                            />
                                            <div className="flex flex-col items-center justify-center text-center space-y-2 pointer-events-none">
                                                <ImageIcon className="w-8 h-8 text-muted-foreground group-hover:text-gold transition-colors" />
                                                <p className="text-sm font-medium text-foreground">
                                                    {imageFile ? imageFile.name : "Click to upload main image"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    {productType === "product" && (
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-foreground">Gallery Images</label>
                                            <div className="p-4 border border-dashed border-border/50 rounded-xl bg-background/30 hover:bg-white/5 transition-colors group relative">
                                                <Input
                                                    type="file"
                                                    accept="image/*"
                                                    multiple
                                                    onChange={handleGalleryChange}
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                />
                                                <div className="flex flex-col items-center justify-center text-center space-y-2 pointer-events-none">
                                                    <ImageIcon className="w-8 h-8 text-muted-foreground group-hover:text-gold transition-colors" />
                                                    <p className="text-sm font-medium text-foreground">
                                                        {galleryFiles.length > 0 ? `${galleryFiles.length} files selected` : "Click to upload gallery images"}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-foreground">Short Description *</label>
                                        <textarea
                                            name="short_description"
                                            value={formData.short_description}
                                            onChange={handleChange}
                                            required
                                            rows={2}
                                            maxLength={150}
                                            className="w-full rounded-md border border-border/50 bg-background/50 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold/50 resize-none"
                                        ></textarea>
                                    </div>
                                </div>
                            </div>

                            {productType === "product" && (
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-foreground">Full Details (HTML supported)</label>
                                    <textarea
                                        name="full_description"
                                        value={formData.full_description}
                                        onChange={handleChange}
                                        rows={5}
                                        className="w-full rounded-md border border-border/50 bg-background/50 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold/50"
                                    ></textarea>
                                </div>
                            )}

                            <Button type="submit" disabled={saving} className="w-full bg-gold hover:bg-gold-light text-forest font-bold py-6 text-lg shine-sweep">
                                {saving ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Saving...</> : (productType === "product" ? "Publish Product" : "Publish Subproduct")}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {loading ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="glass-card h-64 animate-pulse rounded-2xl border border-border/30"></div>
                    ))}
                </div>
            ) : products.length === 0 ? (
                <div className="text-center py-20 p-8 glass-card border border-border/50 max-w-2xl mx-auto rounded-2xl bg-card/40">
                    <Package className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                    <h3 className="text-xl font-serif font-bold text-foreground mb-2">No Products Yet</h3>
                    <p className="text-muted-foreground mb-6">Start building your catalog to showcase items to your clients.</p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <div key={product.id} className="glass-card rounded-2xl border border-border/50 bg-card/40 flex flex-col overflow-hidden group">
                            <div className="relative h-48 bg-muted overflow-hidden">
                                {product.image_url || getFallbackImage(product.name) ? (
                                    <img src={product.image_url || getFallbackImage(product.name) as string} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-background/50"><ImageIcon className="w-8 h-8 text-muted-foreground/30" /></div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent"></div>
                                <div className="absolute top-2 right-2 flex gap-2">
                                    <button
                                        onClick={() => toggleFeatured(product)}
                                        className={`px-2 py-1 rounded text-xs font-bold shadow-lg transition-colors ${product.is_featured ? 'gold-gradient-bg text-forest' : 'bg-background/80 text-muted-foreground border border-border/50 hover:text-foreground'}`}
                                    >
                                        {product.is_featured ? 'Featured' : 'Standard'}
                                    </button>
                                </div>
                                <div className="absolute bottom-2 left-3 right-3 flex justify-between items-end">
                                    <div>
                                        <h3 className="font-serif font-bold text-lg text-foreground truncate drop-shadow-md">{product.name}</h3>
                                        <p className="text-xs text-gold font-bold uppercase tracking-wider">{product.categories?.name}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 flex flex-col flex-1">
                                <p className="text-sm text-muted-foreground line-clamp-2 flex-1 mb-4">{product.short_description}</p>
                                <div className="mb-4">
                                    <Link to={`/admin/products/${product.id}/subproducts`} className="w-full">
                                        <Button variant="outline" className="w-full border-gold/50 text-gold hover:bg-gold/10">
                                            <ListTree className="w-4 h-4 mr-2" />
                                            Manage Subproducts
                                        </Button>
                                    </Link>
                                </div>
                                <div className="flex items-center justify-between border-t border-border/30 pt-3">
                                    <span className="text-xs text-muted-foreground font-medium">/{product.slug}</span>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(product)}
                                            className="p-1.5 text-muted-foreground hover:text-gold hover:bg-gold/10 rounded-md transition-colors"
                                            title="Edit"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product.id, product.name)}
                                            className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors"
                                            title="Delete"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductsManager;
