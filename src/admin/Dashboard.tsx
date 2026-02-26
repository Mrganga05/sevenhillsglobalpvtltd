import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, MessageSquare, Eye, TrendingUp, Users, Globe } from "lucide-react";
import { Link } from "react-router-dom";

interface StatsData {
    products: number;
    inquiries: number;
    featured: number;
    categories: number;
}

const AdminDashboard = () => {
    const [stats, setStats] = useState<StatsData>({
        products: 0,
        inquiries: 0,
        featured: 0,
        categories: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardStats = async () => {
            try {
                // Fetch basic counts
                // Note: Real implementation would use properly structured RPC calls or aggregated queries
                const [
                    { count: productsCount },
                    { count: inquiriesCount },
                    { count: featuredCount },
                    { count: categoriesCount }
                ] = await Promise.all([
                    supabase.from('products').select('*', { count: 'exact', head: true }),
                    supabase.from('inquiries').select('*', { count: 'exact', head: true }).eq('status', 'new'),
                    supabase.from('products').select('*', { count: 'exact', head: true }).eq('is_featured', true),
                    supabase.from('categories').select('*', { count: 'exact', head: true })
                ]);

                setStats({
                    products: productsCount || 0,
                    inquiries: inquiriesCount || 0,
                    featured: featuredCount || 0,
                    categories: categoriesCount || 0,
                });
            } catch (error) {
                // Silently handle error to prevent console errors as per requirements
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardStats();
    }, []);

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex justify-between items-center pb-4 border-b border-border/50">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-foreground">Dashboard Overview</h1>
                    <p className="text-muted-foreground mt-1">Welcome back. Here's what's happening with your platform today.</p>
                </div>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <Card key={i} className="glass-card animate-pulse h-32 border-border/30"></Card>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <DashboardStatCard
                        title="Total Products"
                        value={stats.products}
                        icon={<Package className="text-gold w-6 h-6" />}
                        trend="+2% this month"
                    />
                    <DashboardStatCard
                        title="New Inquiries"
                        value={stats.inquiries}
                        icon={<MessageSquare className="text-emerald-500 w-6 h-6" />}
                        trend="Needs attention"
                        urgent={stats.inquiries > 0}
                    />
                    <DashboardStatCard
                        title="Featured Items"
                        value={stats.featured}
                        icon={<TrendingUp className="text-blue-500 w-6 h-6" />}
                        trend="Active on homepage"
                    />
                    <DashboardStatCard
                        title="Active Categories"
                        value={stats.categories}
                        icon={<Package className="text-purple-500 w-6 h-6" />}
                        trend="Across catalogue"
                    />
                </div>
            )}

            {/* Quick Actions & Recent Activity placeholders */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                <Card className="glass-card border-border/50 lg:col-span-2">
                    <CardHeader className="pb-3 border-b border-border/30">
                        <CardTitle className="text-lg font-serif">Platform Analytics (Demo)</CardTitle>
                    </CardHeader>
                    <CardContent className="h-64 flex items-center justify-center text-muted-foreground pt-6">
                        <div className="text-center space-y-3">
                            <Globe className="w-12 h-12 mx-auto opacity-20" />
                            <p>Connect Google Analytics or Plausible for detailed traffic insights.</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="glass-card border-border/50">
                    <CardHeader className="pb-3 border-b border-border/30">
                        <CardTitle className="text-lg font-serif">Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-4">
                        <Link to="/admin/products" className="w-full text-left px-4 py-3 rounded-lg bg-background/50 border border-border/50 hover:border-gold/50 hover:bg-gold/5 transition-all text-sm flex items-center gap-3">
                            <div className="p-2 bg-gold/10 rounded-md"><Package className="w-4 h-4 text-gold" /></div>
                            Manage Products
                        </Link>
                        <Link to="/admin/stats" className="w-full text-left px-4 py-3 rounded-lg bg-background/50 border border-border/50 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all text-sm flex items-center gap-3">
                            <div className="p-2 bg-emerald-500/10 rounded-md"><Globe className="w-4 h-4 text-emerald-500" /></div>
                            Update Homepage Stats
                        </Link>
                        <Link to="/admin/testimonials" className="w-full text-left px-4 py-3 rounded-lg bg-background/50 border border-border/50 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all text-sm flex items-center gap-3">
                            <div className="p-2 bg-blue-500/10 rounded-md"><Users className="w-4 h-4 text-blue-500" /></div>
                            Manage Testimonials
                        </Link>
                    </CardContent>
                </Card>
            </div>

        </div>
    );
};

const DashboardStatCard = ({ title, value, icon, trend, urgent = false }: { title: string, value: number, icon: React.ReactNode, trend: string, urgent?: boolean }) => (
    <Card className={`glass-card border-border/40 relative overflow-hidden transition-all duration-300 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5 ${urgent ? 'ring-1 ring-emerald-500/30 bg-emerald-950/20' : ''}`}>
        <CardContent className="p-6">
            <div className="flex justify-between items-start">
                <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">{title}</p>
                    <p className="text-3xl font-serif font-bold text-foreground">{value}</p>
                </div>
                <div className={`p-3 rounded-xl ${urgent ? 'bg-emerald-500/20' : 'bg-background/80'} border border-border/50 backdrop-blur-sm`}>
                    {icon}
                </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
                <span className={urgent ? "text-emerald-400 font-medium" : "text-muted-foreground"}>{trend}</span>
            </div>
        </CardContent>
        {/* Subtle gradient accent line at bottom */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/20 to-transparent opacity-0 transition-opacity hover:opacity-100"></div>
    </Card>
);

export default AdminDashboard;
