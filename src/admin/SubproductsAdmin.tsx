import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
import { toast } from "sonner";
import { ArrowLeft, Plus, Trash2, Save, ImageIcon, Loader2, ListTree } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Subproduct {
    id: string;
    product_id: string;
    name: string;
    slug: string;
    short_description: string;
    image_url: string;
    price: number | null;
    created_at: string;
}

const SubproductsAdmin = () => {
    const { productId } = useParams<{ productId: string }>();
    const [subproducts, setSubproducts] = useState<Subproduct[]>([]);
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        short_description: "",
        price: "",
        image_url: "",
    });

    const queryClient = useQueryClient();
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [saving, setSaving] = useState(false);

    const fetchData = async () => {
        if (!productId) return;
        setLoading(true);

        // Fetch Parent Product
        const { data: productData, error: productError } = await supabase
            .from('products')
            .select('*')
            .eq('id', productId)
            .single();

        if (productError) {
            toast.error("Failed to load product details");
        } else {
            setProduct(productData);
        }

        // Fetch Subproducts
        const { data: subData, error: subError } = await supabase
            .from('subproducts')
            .select('*')
            .eq('product_id', productId)
            .order('created_at', { ascending: false });

        if (subError) {
            toast.error("Failed to load subproducts");
        } else {
            setSubproducts(subData as Subproduct[] || []);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, [productId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

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

    const uploadImage = async (file: File): Promise<string | null> => {
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
            const filePath = `public/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('products-images')
                .upload(filePath, file);

            if (uploadError) {
                console.error("Upload error:", uploadError);
                toast.error("Failed to upload image. Make sure the bucket is public.");
                return null;
            }

            const { data } = supabase.storage.from('products-images').getPublicUrl(filePath);
            return data.publicUrl;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!productId) return;

        if (!imageFile && !formData.image_url) {
            toast.error("A subproduct image is required.");
            return;
        }

        setSaving(true);
        toast.info("Saving subproduct...");

        try {
            let finalImageUrl = formData.image_url;

            if (imageFile) {
                const uploadedUrl = await uploadImage(imageFile);
                if (uploadedUrl) {
                    finalImageUrl = uploadedUrl;
                } else {
                    throw new Error("Image upload failed");
                }
            }

            const subproductData = {
                product_id: productId,
                name: formData.name,
                slug: formData.slug,
                short_description: formData.short_description,
                price: formData.price ? parseFloat(formData.price) : null,
                image_url: finalImageUrl
            };

            if (editingId) {
                // Update
                const { error } = await (supabase as any)
                    .from('subproducts')
                    .update(subproductData)
                    .eq('id', editingId);

                if (error) throw error;
                toast.success("Subproduct updated successfully");
            } else {
                // Insert
                const { error } = await (supabase as any)
                    .from('subproducts')
                    .insert([subproductData]);

                if (error) throw error;
                toast.success("Subproduct added successfully");
            }

            fetchData();
            setIsAddOpen(false);
            resetForm();
        } catch (error: any) {
            toast.error(error.message || "Failed to add subproduct");
        } finally {
            setSaving(false);
        }
    };

    const resetForm = () => {
        setFormData({
            name: "",
            slug: "",
            short_description: "",
            price: "",
            image_url: "",
        });
        setImageFile(null);
        setEditingId(null);
    };

    const handleEdit = (subproduct: Subproduct) => {
        setFormData({
            name: subproduct.name || "",
            slug: subproduct.slug || "",
            short_description: subproduct.short_description || "",
            price: subproduct.price ? subproduct.price.toString() : "",
            image_url: subproduct.image_url || "",
        });
        setEditingId(subproduct.id);
        setImageFile(null);
        setIsAddOpen(true);
    };

    const handleDelete = async (id: string, name: string) => {
        if (!confirm(`Are you sure you want to delete ${name}?`)) return;

        const { error } = await supabase.from('subproducts').delete().eq('id', id);

        if (error) {
            toast.error("Failed to delete subproduct");
        } else {
            toast.success("Subproduct deleted");
            setSubproducts(subproducts.filter(p => p.id !== id));
        }
    };

    return (
        <div className="space-y-6 animate-fade-in pb-20">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-border/50">
                <div className="flex items-center gap-4">
                    <Link to="/admin/products" className="p-2 hover:bg-white/10 rounded-full transition-colors group">
                        <ArrowLeft className="w-6 h-6 text-muted-foreground group-hover:text-gold" />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-foreground flex items-center gap-2">
                            {product ? `${product.name} Subproducts` : 'Subproducts Catalog'}
                        </h1>
                        <p className="text-muted-foreground mt-1">Manage variants and subproducts for this item.</p>
                    </div>
                </div>
                <Dialog open={isAddOpen} onOpenChange={(open) => { setIsAddOpen(open); if (!open) resetForm(); }}>
                    <DialogTrigger asChild>
                        <Button className="bg-gold hover:bg-gold-light text-forest font-bold shine-sweep" onClick={resetForm}>
                            <Plus className="w-4 h-4 mr-2" /> Add Subproduct
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="glass-card border-border/50 bg-card/95 sm:max-w-2xl max-h-[90vh] overflow-y-auto w-[95vw] sm:w-full">
                        <DialogHeader>
                            <DialogTitle className="font-serif text-2xl gold-gradient-text flex items-center gap-2">
                                <ListTree className="w-6 h-6" /> {editingId ? "Edit Subproduct" : "New Subproduct"}
                            </DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleAdd} className="space-y-6 pt-4">
                            <div className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-foreground">Name *</label>
                                        <Input
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="bg-background/50 border-border/50 focus:border-gold/50"
                                            placeholder="e.g. Raw Turmeric Fingers"
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
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-foreground">Price ($)</label>
                                        <Input
                                            name="price"
                                            type="number"
                                            step="0.01"
                                            value={formData.price}
                                            onChange={handleChange}
                                            className="bg-background/50 border-border/50 focus:border-gold/50"
                                            placeholder="0.00"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-foreground">Image *</label>
                                        <div className="p-2 border border-dashed border-border/50 rounded-xl bg-background/30 hover:bg-white/5 transition-colors group relative h-10 flex items-center justify-center overflow-hidden">
                                            <Input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                            />
                                            <div className="flex flex-col items-center justify-center text-center w-full pointer-events-none truncate px-2">
                                                <p className="text-xs font-medium text-foreground truncate">
                                                    {imageFile ? imageFile.name : "+ Upload Image"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-foreground">Short Description</label>
                                    <textarea
                                        name="short_description"
                                        value={formData.short_description}
                                        onChange={handleChange}
                                        rows={2}
                                        maxLength={150}
                                        className="w-full rounded-md border border-border/50 bg-background/50 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold/50 resize-none"
                                    ></textarea>
                                </div>
                            </div>

                            <Button type="submit" disabled={saving} className="w-full bg-gold hover:bg-gold-light text-forest font-bold py-6 text-lg shine-sweep">
                                {saving ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Saving...</> : "Publish Subproduct"}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {loading ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="glass-card h-64 animate-pulse rounded-2xl border border-border/30"></div>
                    ))}
                </div>
            ) : subproducts.length === 0 ? (
                <div className="text-center py-20 p-8 glass-card border border-border/50 max-w-2xl mx-auto rounded-2xl bg-card/40">
                    <ListTree className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                    <h3 className="text-xl font-serif font-bold text-foreground mb-2">No Subproducts Yet</h3>
                    <p className="text-muted-foreground mb-6">Add variants, types, or sub-items to this main product.</p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {subproducts.map((subproduct) => (
                        <div key={subproduct.id} className="glass-card rounded-2xl border border-border/50 bg-card/40 flex flex-col overflow-hidden group">
                            <div className="relative h-48 bg-muted overflow-hidden">
                                {subproduct.image_url ? (
                                    <img src={subproduct.image_url} alt={subproduct.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-background/50"><ImageIcon className="w-8 h-8 text-muted-foreground/30" /></div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent"></div>
                                <div className="absolute bottom-2 left-3 right-3 flex justify-between items-end">
                                    <div>
                                        <h3 className="font-serif font-bold text-lg text-foreground truncate drop-shadow-md">{subproduct.name}</h3>
                                    </div>
                                    {subproduct.price && <div className="text-white font-bold text-sm bg-black/50 px-2 py-1 rounded">${subproduct.price}</div>}
                                </div>
                            </div>
                            <div className="p-4 flex flex-col flex-1">
                                <p className="text-sm text-muted-foreground line-clamp-2 flex-1 mb-4">{subproduct.short_description}</p>
                                <div className="flex items-center justify-between border-t border-border/30 pt-3">
                                    <span className="text-xs text-muted-foreground font-medium">/{subproduct.slug}</span>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(subproduct)}
                                            className="p-1.5 text-muted-foreground hover:text-gold hover:bg-gold/10 rounded-md transition-colors"
                                            title="Edit"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                                        </button>
                                        <button
                                            onClick={() => handleDelete(subproduct.id, subproduct.name)}
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

export default SubproductsAdmin;
