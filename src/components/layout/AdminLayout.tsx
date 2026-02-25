import { Outlet, Navigate, Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { LayoutDashboard, Package, MessageSquare, PieChart, Star, LogOut, FolderTree, Home, Menu, X, Award } from "lucide-react";

const navLinks = [
    { to: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/admin/products", icon: Package, label: "Products" },
    { to: "/admin/categories", icon: FolderTree, label: "Categories" },
    { to: "/admin/inquiries", icon: MessageSquare, label: "Inquiries" },
    { to: "/admin/stats", icon: PieChart, label: "Stats" },
    { to: "/admin/testimonials", icon: Star, label: "Testimonials" },
    { to: "/admin/certifications", icon: Award, label: "Certifications" },
];

const AdminLayout = () => {
    const [session, setSession] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                setSession(null);
                setLoading(false);
                return;
            }
            setSession(session);
            setLoading(false);
        };

        checkAuth();

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
            if (newSession) {
                setSession(newSession);
            } else {
                setSession(null);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-background text-foreground">Loading...</div>;
    }

    if (!session) {
        return <Navigate to="/admin/login" replace />;
    }

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-background">
            {/* Mobile Header */}
            <header className="md:hidden flex items-center justify-between p-4 border-b border-border bg-card sticky top-0 z-50">
                <h2 className="text-xl font-serif font-bold text-gold-light">7Hills Admin</h2>
                <div className="flex items-center gap-2">
                    <Link to="/" className="p-2 text-foreground/80 hover:text-gold transition-colors" title="Go to Home Page">
                        <Home className="w-5 h-5" />
                    </Link>
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-foreground/80 hover:text-gold transition-colors">
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="md:hidden fixed inset-0 top-[73px] z-40 bg-background/95 backdrop-blur-md shadow-xl flex flex-col p-4 overflow-y-auto border-t border-border animate-in slide-in-from-top-2">
                    <nav className="flex-1 space-y-2">
                        {navLinks.map((link) => {
                            const Icon = link.icon;
                            return (
                                <Link key={link.to} to={link.to} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-foreground hover:text-gold transition-colors font-medium">
                                    <Icon className="w-5 h-5 text-gold" />
                                    <span>{link.label}</span>
                                </Link>
                            )
                        })}
                    </nav>
                    <div className="mt-8 pt-4 border-t border-border space-y-2 pb-8">
                        <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-foreground hover:text-gold transition-colors font-medium">
                            <Home className="w-5 h-5 text-gold" />
                            <span>Go to Home Page</span>
                        </Link>
                        <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 w-full rounded-xl hover:bg-destructive/10 text-destructive transition-colors text-left font-medium">
                            <LogOut className="w-5 h-5" />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            )}

            {/* Desktop Sidebar */}
            <aside className="w-64 bg-card border-r border-border hidden md:flex flex-col sticky top-0 h-screen overflow-y-auto">
                <div className="p-6">
                    <h2 className="text-xl font-serif font-bold text-gold-light">7Hills Admin</h2>
                </div>
                <nav className="flex-1 px-4 space-y-2">
                    {navLinks.map((link) => {
                        const Icon = link.icon;
                        return (
                            <Link key={link.to} to={link.to} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 text-foreground/80 hover:text-gold transition-colors">
                                <Icon className="w-5 h-5" />
                                <span>{link.label}</span>
                            </Link>
                        )
                    })}
                </nav>
                <div className="p-4 border-t border-border space-y-2 mt-auto">
                    <Link to="/" className="flex items-center gap-3 px-3 py-2 w-full rounded-lg hover:bg-white/5 text-foreground/80 hover:text-gold transition-colors">
                        <Home className="w-5 h-5" />
                        <span>Go to Home Page</span>
                    </Link>
                    <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2 w-full rounded-lg hover:bg-destructive/10 text-destructive transition-colors text-left">
                        <LogOut className="w-5 h-5" />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-4 md:p-8 overflow-x-hidden min-h-[calc(100vh-73px)] md:min-h-screen">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
