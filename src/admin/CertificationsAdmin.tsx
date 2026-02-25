import { useEffect, useState } from "react";
import { supabase, supabaseAdmin } from "../lib/supabase";
import { toast } from "sonner";
import { Award, Plus, Trash2, Edit, Save, ImageIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Certification {
    id: string;
    title: string;
    description: string | null;
    image_url: string | null;
    created_at: string;
}

const CertificationsManager = () => {
    const [certifications, setCertifications] = useState<Certification[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    // Form State
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        image_url: "",
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [saving, setSaving] = useState(false);

    const fetchCertifications = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('certifications')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            toast.error("Failed to load certifications");
        } else {
            setCertifications(data as Certification[] || []);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchCertifications();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const uploadImage = async (file: File): Promise<string | null> => {
        try {
            await supabase.auth.refreshSession();
            const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
            const uniqueName = `cert_${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
            const filePath = uniqueName;

            const { error: uploadError } = await supabase.storage
                .from('products-images')
                .upload(filePath, file, {
                    cacheControl: '3600',
                    upsert: false,
                    contentType: file.type,
                });

            if (uploadError) {
                console.error("Storage upload error:", uploadError);
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

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        toast.info("Saving certification...");

        try {
            let finalImageUrl = formData.image_url || "";

            if (imageFile) {
                toast.info("Uploading image...");
                const uploadedUrl = await uploadImage(imageFile);
                if (uploadedUrl) {
                    finalImageUrl = uploadedUrl;
                } else {
                    toast.warning("Image upload failed. Certification will be saved without an image.");
                }
            }

            const certData = {
                title: formData.title,
                description: formData.description || null,
                image_url: finalImageUrl || null,
            };

            if (editingId) {
                const { error } = await supabaseAdmin
                    .from('certifications')
                    .update(certData)
                    .eq('id', editingId);

                if (error) throw error;
                toast.success("Certification updated!");
            } else {
                const { error } = await supabaseAdmin
                    .from('certifications')
                    .insert([certData]);

                if (error) throw error;
                toast.success("Certification added!");
            }

            await fetchCertifications();
            setIsAddOpen(false);
            resetForm();
        } catch (error: any) {
            console.error("Save error:", error);
            toast.error(error.message || "Failed to save.");
        } finally {
            setSaving(false);
        }
    };

    const resetForm = () => {
        setFormData({ title: "", description: "", image_url: "" });
        setImageFile(null);
        setEditingId(null);
    };

    const handleEdit = (cert: Certification) => {
        setFormData({
            title: cert.title,
            description: cert.description || "",
            image_url: cert.image_url || "",
        });
        setEditingId(cert.id);
        setImageFile(null);
        setIsAddOpen(true);
    };

    const handleDelete = async (id: string, title: string) => {
        if (!confirm(`Are you sure you want to delete ${title}?`)) return;

        const { error } = await supabaseAdmin.from('certifications').delete().eq('id', id);

        if (error) {
            toast.error("Failed to delete certification");
        } else {
            toast.success("Certification deleted");
            setCertifications(certifications.filter(c => c.id !== id));
        }
    };

    return (
        <div className="space-y-6 animate-fade-in pb-20">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-border/50">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-foreground">Certifications Manager</h1>
                    <p className="text-muted-foreground mt-1">Manage global standard certificates and licenses.</p>
                </div>
                <Dialog open={isAddOpen} onOpenChange={(open) => { setIsAddOpen(open); if (!open) resetForm(); }}>
                    <DialogTrigger asChild>
                        <Button className="bg-gold hover:bg-gold-light text-forest font-bold shine-sweep" onClick={resetForm}>
                            <Plus className="w-4 h-4 mr-2" /> Add Certification
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="glass-card border-border/50 bg-card/95 sm:max-w-xl max-h-[90vh] overflow-y-auto w-[95vw] sm:w-full">
                        <DialogHeader>
                            <DialogTitle className="font-serif text-2xl gold-gradient-text flex items-center gap-2">
                                {editingId ? <Edit className="w-6 h-6" /> : <Award className="w-6 h-6" />}
                                {editingId ? "Edit Certification" : "New Certification"}
                            </DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleAdd} className="space-y-6 pt-4">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-foreground">Title *</label>
                                    <Input
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        required
                                        className="bg-background/50 border-border/50 focus:border-gold/50"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-foreground">Icon / Image</label>
                                    <div className="p-4 border border-dashed border-border/50 rounded-xl bg-background/30 hover:bg-white/5 transition-colors group relative">
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                        />
                                        <div className="flex flex-col items-center justify-center text-center space-y-2 pointer-events-none">
                                            {formData.image_url && !imageFile ? (
                                                <img src={formData.image_url} alt="Current icon" className="w-12 h-12 object-cover rounded-md" />
                                            ) : (
                                                <ImageIcon className="w-8 h-8 text-muted-foreground group-hover:text-gold transition-colors" />
                                            )}
                                            <p className="text-sm font-medium text-foreground">
                                                {imageFile ? imageFile.name : (formData.image_url ? "Click to replace image" : "Upload certification icon")}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-foreground">Description *</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        required
                                        rows={4}
                                        className="w-full rounded-md border border-border/50 bg-background/50 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold/50 resize-none"
                                    ></textarea>
                                </div>
                            </div>

                            <Button type="submit" disabled={saving} className="w-full bg-gold hover:bg-gold-light text-forest font-bold py-6 text-lg shine-sweep">
                                {saving ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Saving...</> : (editingId ? "Update Certification" : "Publish Certification")}
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
            ) : certifications.length === 0 ? (
                <div className="text-center py-20 p-8 glass-card border border-border/50 max-w-2xl mx-auto rounded-2xl bg-card/40">
                    <Award className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                    <h3 className="text-xl font-serif font-bold text-foreground mb-2">No Certifications Yet</h3>
                    <p className="text-muted-foreground mb-6">Add your business licenses and quality certificates to build trust.</p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {certifications.map((cert) => (
                        <div key={cert.id} className="glass-card p-6 rounded-2xl border border-border/50 bg-card/40 hover:border-gold/30 transition-all group flex flex-col">
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-16 h-16 rounded-xl bg-gold/10 flex items-center justify-center border border-gold/20 overflow-hidden">
                                    {cert.image_url ? (
                                        <img src={cert.image_url} alt={cert.title} className="w-full h-full object-cover" />
                                    ) : (
                                        <Award className="w-8 h-8 text-gold" />
                                    )}
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEdit(cert)}
                                        className="p-1.5 text-muted-foreground hover:text-gold hover:bg-gold/10 rounded-md transition-colors opacity-0 group-hover:opacity-100"
                                        title="Edit"
                                    >
                                        <Edit className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(cert.id, cert.title)}
                                        className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors opacity-0 group-hover:opacity-100"
                                        title="Delete"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            <h3 className="text-xl font-serif font-bold text-foreground mb-2">{cert.title}</h3>
                            <p className="text-muted-foreground font-sans line-clamp-3 mb-4 flex-1">
                                {cert.description}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CertificationsManager;
