import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { toast } from "sonner";
import { Star, Plus, Trash2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Testimonial {
    id: string;
    name: string;
    country: string;
    message: string;
    rating: number;
    created_at: string;
}

const TestimonialsManager = () => {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAddOpen, setIsAddOpen] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        country: "",
        message: "",
        rating: 5,
    });
    const [saving, setSaving] = useState(false);

    const fetchTestimonials = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('testimonials')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            toast.error("Failed to load testimonials");
        } else {
            setTestimonials(data as Testimonial[] || []);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.type === 'number' ? Number(e.target.value) : e.target.value
        });
    };

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        const { data, error } = await (supabase as any)
            .from('testimonials')
            .insert([formData])
            .select()
            .single();

        if (error) {
            toast.error(error.message || "Failed to add testimonial");
        } else if (data) {
            toast.success("Testimonial added");
            setTestimonials([data as Testimonial, ...testimonials]);
            setIsAddOpen(false);
            setFormData({ name: "", country: "", message: "", rating: 5 });
        }
        setSaving(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this testimonial?")) return;

        const { error } = await supabase.from('testimonials').delete().eq('id', id);

        if (error) {
            toast.error("Failed to delete testimonial");
        } else {
            toast.success("Testimonial deleted");
            setTestimonials(testimonials.filter(t => t.id !== id));
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-border/50">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-foreground">Testimonials Manager</h1>
                    <p className="text-muted-foreground mt-1">Manage client reviews shown on the global presence section.</p>
                </div>
                <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-gold hover:bg-gold-light text-forest font-bold shine-sweep">
                            <Plus className="w-4 h-4 mr-2" /> Add Client Review
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="glass-card border-border/50 bg-card/95 sm:max-w-[425px] w-[95vw] sm:w-full">
                        <DialogHeader>
                            <DialogTitle className="font-serif text-2xl gold-gradient-text">New Testimonial</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleAdd} className="space-y-4 pt-4">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-foreground">Client Name</label>
                                <Input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="bg-background/50 border-border/50 focus:border-gold/50 focus:ring-gold/20"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-foreground">Country</label>
                                <Input
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g. UAE"
                                    className="bg-background/50 border-border/50 focus:border-gold/50 focus:ring-gold/20"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-foreground">Rating (1-5)</label>
                                <Input
                                    type="number"
                                    name="rating"
                                    min="1"
                                    max="5"
                                    value={formData.rating}
                                    onChange={handleChange}
                                    required
                                    className="bg-background/50 border-border/50 focus:border-gold/50 focus:ring-gold/20"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-foreground">Review Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={4}
                                    className="w-full rounded-md border border-border/50 bg-background/50 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold/50"
                                ></textarea>
                            </div>
                            <Button type="submit" disabled={saving} className="w-full bg-gold hover:bg-gold-light text-forest font-bold mt-2">
                                {saving ? "Saving..." : "Save Testimonial"}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {loading ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="glass-card h-48 animate-pulse rounded-2xl border border-border/30"></div>
                    ))}
                </div>
            ) : testimonials.length === 0 ? (
                <div className="text-center py-20 p-8 glass-card border border-border/50 max-w-2xl mx-auto rounded-2xl bg-card/40">
                    <Star className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                    <h3 className="text-xl font-serif font-bold text-foreground mb-2">No Testimonials Yet</h3>
                    <p className="text-muted-foreground mb-6">Add client reviews to build trust on your public website.</p>
                    <Button onClick={() => setIsAddOpen(true)} variant="outline" className="border-gold/50 text-gold hover:bg-gold/10 hover:text-gold">
                        Add the first review
                    </Button>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map((testi) => (
                        <div key={testi.id} className="glass-card p-6 rounded-2xl border border-border/50 bg-card/40 hover:border-gold/30 transition-all flex flex-col justify-between group">
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className={`w-4 h-4 ${i < (testi.rating || 0) ? 'text-gold fill-gold' : 'text-muted-foreground/30'}`} />
                                        ))}
                                    </div>
                                    <button
                                        onClick={() => handleDelete(testi.id)}
                                        className="text-muted-foreground/50 hover:text-destructive transition-colors p-1 opacity-0 group-hover:opacity-100"
                                        title="Delete Testimonial"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                                <p className="text-foreground/90 font-sans italic mb-6 line-clamp-4">"{testi.message}"</p>
                            </div>
                            <div className="flex items-center gap-3 pt-4 border-t border-border/30 mt-auto">
                                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center border border-gold/20 text-gold font-bold">
                                    <User className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-bold text-foreground text-sm">{testi.name}</p>
                                    <p className="text-xs text-muted-foreground uppercase tracking-wider">{testi.country}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TestimonialsManager;
