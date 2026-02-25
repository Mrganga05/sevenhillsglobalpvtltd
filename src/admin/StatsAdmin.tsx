import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { toast } from "sonner";
import { Save, Globe, Package, Users, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface StatsData {
    id: string;
    countries_served: number;
    export_volume: string;
    happy_clients: number;
    product_categories: number;
}

const StatsManager = () => {
    const [stats, setStats] = useState<StatsData | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const fetchStats = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('stats')
            .select('*')
            .limit(1)
            .single();

        if (error && error.code !== 'PGRST116') { // Ignore 0 rows error
            toast.error("Failed to load statistics");
        } else if (data) {
            setStats(data as StatsData);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchStats();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!stats) return;
        setStats({
            ...stats,
            [e.target.name]: e.target.type === 'number' ? Number(e.target.value) : e.target.value
        });
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!stats) return;
        setSaving(true);

        const { id, ...updateData } = stats;

        let error;
        if (id) {
            const { error: updateError } = await (supabase as any).from('stats').update(updateData).eq('id', id);
            error = updateError;
        } else {
            // First time creating stats
            const { data, error: insertError } = await (supabase as any).from('stats').insert(updateData).select().single();
            if (data) setStats(data as StatsData);
            error = insertError;
        }

        if (error) {
            toast.error(error.message || "Failed to save statistics");
        } else {
            toast.success("Home page statistics updated");
        }
        setSaving(false);
    };

    return (
        <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-border/50">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-foreground">Manage Statistics</h1>
                    <p className="text-muted-foreground mt-1">Update the numbers displayed on the homepage stats section.</p>
                </div>
            </div>

            {loading ? (
                <div className="glass-card h-96 animate-pulse rounded-2xl border border-border/30"></div>
            ) : (
                <form onSubmit={handleSave} className="glass-card p-6 sm:p-8 rounded-2xl border border-border/50 bg-card/40">
                    <div className="grid sm:grid-cols-2 gap-8 mb-8">
                        {/* Product Categories */}
                        <div className="space-y-3">
                            <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                                <Package className="w-4 h-4 text-gold" /> Product Categories
                            </label>
                            <Input
                                type="number"
                                name="product_categories"
                                value={stats?.product_categories || ""}
                                onChange={handleChange}
                                required
                                min="0"
                                className="bg-background/50 border-border/50 focus:border-gold/50 focus:ring-gold/20 text-xl font-bold py-6 px-4"
                            />
                            <p className="text-xs text-muted-foreground">Will be displayed as "{stats?.product_categories || 0}+ Product Categories"</p>
                        </div>

                        {/* Countries Served */}
                        <div className="space-y-3">
                            <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                                <Globe className="w-4 h-4 text-emerald-500" /> Countries Served
                            </label>
                            <Input
                                type="number"
                                name="countries_served"
                                value={stats?.countries_served || ""}
                                onChange={handleChange}
                                required
                                min="0"
                                className="bg-background/50 border-border/50 focus:border-gold/50 focus:ring-gold/20 text-xl font-bold py-6 px-4"
                            />
                            <p className="text-xs text-muted-foreground">Will be displayed as "{stats?.countries_served || 0}+ Countries Served"</p>
                        </div>

                        {/* Happy Clients */}
                        <div className="space-y-3">
                            <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                                <Users className="w-4 h-4 text-blue-500" /> Happy Clients
                            </label>
                            <Input
                                type="number"
                                name="happy_clients"
                                value={stats?.happy_clients || ""}
                                onChange={handleChange}
                                required
                                min="0"
                                className="bg-background/50 border-border/50 focus:border-gold/50 focus:ring-gold/20 text-xl font-bold py-6 px-4"
                            />
                            <p className="text-xs text-muted-foreground">Will be displayed as "{stats?.happy_clients || 0}+ Happy Clients"</p>
                        </div>

                        {/* Export Volume */}
                        <div className="space-y-3">
                            <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                                <TrendingUp className="w-4 h-4 text-purple-500" /> Export Volume (Text)
                            </label>
                            <Input
                                type="text"
                                name="export_volume"
                                value={stats?.export_volume || ""}
                                onChange={handleChange}
                                required
                                placeholder="e.g. 50K+ Tons"
                                className="bg-background/50 border-border/50 focus:border-gold/50 focus:ring-gold/20 text-xl font-bold py-6 px-4"
                            />
                            <p className="text-xs text-muted-foreground">Displayed exactly as typed</p>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4 border-t border-border/50">
                        <Button
                            type="submit"
                            disabled={saving}
                            className="bg-gold hover:bg-gold-light text-forest font-bold px-8 shine-sweep"
                        >
                            {saving ? "Saving..." : <><Save className="w-4 h-4 mr-2" /> Save Changes</>}
                        </Button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default StatsManager;
