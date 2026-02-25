import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { toast } from "sonner";
import { FolderTree, Plus, Trash2, Edit, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Category {
    id: string;
    name: string;
    slug: string;
    description: string | null;
}

const CategoriesManager = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAddOpen, setIsAddOpen] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        id: "",
        name: "",
        slug: "",
        description: "",
    });
    const [saving, setSaving] = useState(false);

    const fetchCategories = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('categories')
            .select('*')
            .order('name');

        if (error) {
            toast.error("Failed to load categories");
        } else {
            setCategories(data as Category[] || []);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

        // Auto-generate slug from name
        if (e.target.name === 'name' && (!formData.id)) { // Only auto-slug on creation
            setFormData(prev => ({
                ...prev,
                slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
            }));
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const categoryData = {
                name: formData.name,
                slug: formData.slug,
                description: formData.description || null,
            };

            if (formData.id) {
                // Update
                const { error } = await (supabase as any)
                    .from('categories')
                    .update(categoryData)
                    .eq('id', formData.id);

                if (error) throw error;
                toast.success("Category updated successfully");
                setCategories(categories.map(c => c.id === formData.id ? { ...c, ...categoryData } : c));
            } else {
                // Insert
                const { data, error } = await (supabase as any)
                    .from('categories')
                    .insert([categoryData])
                    .select()
                    .single();

                if (error) throw error;
                toast.success("Category created successfully");
                setCategories([...categories, data as Category].sort((a, b) => a.name.localeCompare(b.name)));
            }

            setIsAddOpen(false);
            resetForm();
        } catch (error: any) {
            toast.error(error.message || "Failed to save category");
        } finally {
            setSaving(false);
        }
    };

    const resetForm = () => {
        setFormData({ id: "", name: "", slug: "", description: "" });
    };

    const handleEdit = (category: Category) => {
        setFormData({
            id: category.id,
            name: category.name,
            slug: category.slug,
            description: category.description || "",
        });
        setIsAddOpen(true);
    };

    const handleDelete = async (id: string, name: string) => {
        if (!confirm(`Are you sure you want to delete the category "${name}"? This will delete all products associated with it!`)) return;

        const { error } = await supabase.from('categories').delete().eq('id', id);

        if (error) {
            toast.error("Failed to delete category");
        } else {
            toast.success("Category deleted");
            setCategories(categories.filter(c => c.id !== id));
        }
    };

    return (
        <div className="space-y-6 animate-fade-in pb-20 max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-border/50">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-foreground">Categories Manager</h1>
                    <p className="text-muted-foreground mt-1">Organize your products into relational categories.</p>
                </div>
                <Dialog open={isAddOpen} onOpenChange={(open) => { setIsAddOpen(open); if (!open) resetForm(); }}>
                    <DialogTrigger asChild>
                        <Button className="bg-gold hover:bg-gold-light text-forest font-bold shine-sweep">
                            <Plus className="w-4 h-4 mr-2" /> Add Category
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="glass-card border-border/50 bg-card/95 sm:max-w-md w-[95vw] sm:w-full">
                        <DialogHeader>
                            <DialogTitle className="font-serif text-2xl gold-gradient-text flex items-center gap-2">
                                <FolderTree className="w-6 h-6" /> {formData.id ? "Edit Category" : "New Category"}
                            </DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSave} className="space-y-4 pt-4">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-foreground">Category Name *</label>
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
                                    placeholder="e.g. fresh-produce"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-foreground">Description (Optional)</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={3}
                                    className="w-full rounded-md border border-border/50 bg-background/50 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold/50 resize-none"
                                ></textarea>
                            </div>

                            <Button type="submit" disabled={saving} className="w-full bg-gold hover:bg-gold-light text-forest font-bold py-5 text-md shine-sweep mt-4">
                                {saving ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Saving...</> : "Save Category"}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {loading ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="glass-card h-32 animate-pulse rounded-2xl border border-border/30"></div>
                    ))}
                </div>
            ) : categories.length === 0 ? (
                <div className="text-center py-20 p-8 glass-card border border-border/50 max-w-2xl mx-auto rounded-2xl bg-card/40">
                    <FolderTree className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                    <h3 className="text-xl font-serif font-bold text-foreground mb-2">No Categories Yet</h3>
                    <p className="text-muted-foreground mb-6">Create a category first before adding products.</p>
                </div>
            ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category) => (
                        <div key={category.id} className="glass-card p-6 rounded-2xl border border-border/50 bg-card/40 hover:border-gold/30 transition-all flex flex-col group relative">
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center border border-gold/20">
                                        <FolderTree className="w-4 h-4 text-gold" />
                                    </div>
                                    <h3 className="font-serif font-bold text-lg text-foreground truncate">{category.name}</h3>
                                </div>
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => handleEdit(category)}
                                        className="p-1.5 text-muted-foreground hover:text-gold hover:bg-gold/10 rounded-md transition-colors"
                                        title="Edit"
                                    >
                                        <Edit className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(category.id, category.name)}
                                        className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors"
                                        title="Delete"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            <span className="text-xs font-mono text-muted-foreground/70 mb-3 bg-background/50 inline-block px-2 py-0.5 rounded w-max">/{category.slug}</span>
                            <p className="text-sm text-muted-foreground line-clamp-2 mt-auto">
                                {category.description || "No description provided."}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CategoriesManager;
