import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import logo from "../assets/logo.png";
import { Menu, X, LayoutDashboard, LogOut, User, ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Navbar() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { totalItems, setIsCartOpen } = useCart();

    const navigate = useNavigate();

    useEffect(() => {
        checkAdmin();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session) {
                checkAdmin();
            } else {
                setIsAdmin(false);
            }
        });

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);

        if (window.scrollY > 20) setIsScrolled(true);

        return () => {
            subscription.unsubscribe();
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    async function checkAdmin() {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) return;

        const { data } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", user.id)
            .maybeSingle<{ role: string }>();

        if (data && data.role === "admin") {
            setIsAdmin(true);
        }
    }

    function logout() {
        supabase.auth.signOut();
        navigate("/");
        setIsOpen(false);
    }

    const deskLinkBase = "px-2 xl:px-3 py-2 text-[13px] xl:text-sm font-semibold transition-all relative";
    const deskLinkActive = "text-primary font-bold";
    const deskLinkHover = "text-white/70 hover:text-primary";

    const mobLinkBase = "block px-4 py-4 text-base font-semibold border-b border-white/5 transition-all w-full text-left";
    const mobLinkActive = "bg-primary/10 text-primary pl-6 border-l-2 border-l-primary";
    const mobLinkNormal = "text-white/80 hover:bg-primary/5 hover:text-primary";

    return (
        <header
            className={`fixed left-0 right-0 z-50 transition-all duration-500 ease-in-out ${isScrolled
                ? "top-2 sm:top-6 mx-4 sm:mx-8 lg:mx-auto max-w-6xl bg-background/80 backdrop-blur-2xl shadow-[0_8px_30px_rgb(0,0,0,0.5),inset_0_0_20px_rgba(var(--primary),0.2)] border border-white/20 rounded-full"
                : "top-0 mx-0 bg-transparent rounded-none border-b border-white/5"
                }`}
        >
            <nav className={`mx-auto w-full transition-all duration-500 ${isScrolled ? "px-5 sm:px-8" : "max-w-7xl px-4 sm:px-6 lg:px-8"}`}>
                <div className={`flex justify-between items-center transition-all duration-500 ${isScrolled ? "h-14 sm:h-16" : "h-16 sm:h-24"}`}>
                    <NavLink to="/" className="flex items-center gap-3 shrink-0" onClick={() => setIsOpen(false)}>
                        <img src={logo} alt="Seven Hills Logo" className="h-10 w-auto sm:h-12" />
                        <div className="flex flex-col">
                            <span className="text-primary font-bold text-[13px] sm:text-[15px] xl:text-[17px] tracking-tight uppercase whitespace-nowrap">
                                SEVEN HILLS GLOBAL
                            </span>
                            <span className="text-primary/80 text-[10px] tracking-widest font-bold mt-0.5">
                                PVT LTD
                            </span>
                        </div>
                    </NavLink>

                    <div className="hidden lg:flex items-center gap-1 xl:gap-4">
                        <NavLink to="/" className={({ isActive }) => `${deskLinkBase} ${isActive ? deskLinkActive : deskLinkHover}`}>Home</NavLink>
                        <NavLink to="/about" className={({ isActive }) => `${deskLinkBase} ${isActive ? deskLinkActive : deskLinkHover}`}>About</NavLink>
                        <NavLink to="/products" className={({ isActive }) => `${deskLinkBase} ${isActive ? deskLinkActive : deskLinkHover}`}>Products</NavLink>
                        <NavLink to="/export-process" className={({ isActive }) => `${deskLinkBase} ${isActive ? deskLinkActive : deskLinkHover}`}>Export</NavLink>
                        <NavLink to="/certifications" className={({ isActive }) => `${deskLinkBase} ${isActive ? deskLinkActive : deskLinkHover}`}>Certifications</NavLink>
                        <NavLink to="/global-presence" className={({ isActive }) => `${deskLinkBase} ${isActive ? deskLinkActive : deskLinkHover}`}>Global</NavLink>
                        <NavLink to="/contact" className={({ isActive }) => `${deskLinkBase} ${isActive ? deskLinkActive : deskLinkHover}`}>Contact</NavLink>

                        <div className="ml-2 xl:ml-6 flex items-center gap-2 xl:gap-4 border-l border-white/10 pl-2 xl:pl-8">
                            <button
                                onClick={() => setIsCartOpen(true)}
                                className="flex items-center gap-2 px-3 xl:px-6 py-2 xl:py-2.5 bg-primary/10 border border-primary/30 text-primary hover:bg-primary/30 rounded-xl transition-all font-bold text-[13px] xl:text-sm"
                            >
                                <ShoppingCart className="w-4 h-4" />
                                <span className="hidden xl:inline">Quote Cart</span>
                                {totalItems > 0 && (
                                    <span className="bg-primary text-primary-foreground px-1.5 py-0.5 rounded-md text-[10px] xl:text-xs">
                                        {totalItems}
                                    </span>
                                )}
                            </button>

                            {isAdmin ? (
                                <div className="flex items-center gap-2 ml-1 xl:ml-3">
                                    <NavLink
                                        to="/admin/dashboard"
                                        className="flex items-center gap-2 px-3 xl:px-5 py-2 xl:py-2.5 bg-primary text-primary-foreground rounded-xl font-bold text-[13px] xl:text-sm hover:opacity-90 transition-all"
                                    >
                                        <LayoutDashboard className="w-4 h-4" /> Admin
                                    </NavLink>
                                    <button
                                        onClick={logout}
                                        className="p-2.5 border border-white/10 rounded-xl hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-500 transition-all"
                                    >
                                        <LogOut className="w-4 h-4" />
                                    </button>
                                </div>
                            ) : (
                                <NavLink
                                    to="/admin/login"
                                    className="flex items-center gap-2 px-3 xl:px-6 py-2 xl:py-2.5 border border-primary/30 rounded-xl hover:bg-primary/10 text-primary transition-all font-bold text-[13px] xl:text-sm"
                                >
                                    <User className="w-4 h-4" /> Partner Login
                                </NavLink>
                            )}
                        </div>
                    </div>

                    <div className="flex lg:hidden items-center gap-3">
                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="relative p-2 text-white/80 hover:text-primary hover:bg-white/5 rounded-full transition-colors flex items-center justify-center"
                        >
                            <ShoppingCart className="w-6 h-6" />
                            {totalItems > 0 && (
                                <span className="absolute top-0 right-0 w-4 h-4 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce">
                                    {totalItems}
                                </span>
                            )}
                        </button>
                        <button
                            className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="fixed inset-0 top-16 sm:top-20 z-40 bg-background lg:hidden border-t border-white/10 overflow-y-auto">
                    <div className="flex flex-col h-full px-4 pb-8 pt-4">
                        <div className="space-y-1">
                            <NavLink to="/" className={({ isActive }) => `${mobLinkBase} ${isActive ? mobLinkActive : mobLinkNormal}`} onClick={() => setIsOpen(false)}>Home</NavLink>
                            <NavLink to="/about" className={({ isActive }) => `${mobLinkBase} ${isActive ? mobLinkActive : mobLinkNormal}`} onClick={() => setIsOpen(false)}>About Us</NavLink>
                            <NavLink to="/products" className={({ isActive }) => `${mobLinkBase} ${isActive ? mobLinkActive : mobLinkNormal}`} onClick={() => setIsOpen(false)}>Product Range</NavLink>
                            <NavLink to="/export-process" className={({ isActive }) => `${mobLinkBase} ${isActive ? mobLinkActive : mobLinkNormal}`} onClick={() => setIsOpen(false)}>Export Process</NavLink>
                            <NavLink to="/certifications" className={({ isActive }) => `${mobLinkBase} ${isActive ? mobLinkActive : mobLinkNormal}`} onClick={() => setIsOpen(false)}>Certifications</NavLink>
                            <NavLink to="/global-presence" className={({ isActive }) => `${mobLinkBase} ${isActive ? mobLinkActive : mobLinkNormal}`} onClick={() => setIsOpen(false)}>Global</NavLink>
                            <NavLink to="/contact" className={({ isActive }) => `${mobLinkBase} ${isActive ? mobLinkActive : mobLinkNormal}`} onClick={() => setIsOpen(false)}>Contact</NavLink>
                        </div>

                        <div className="mt-8">
                            {isAdmin ? (
                                <div className="space-y-3">
                                    <NavLink
                                        to="/admin/dashboard"
                                        className="flex items-center justify-center gap-2 w-full py-4 bg-primary text-primary-foreground rounded-xl font-bold"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <LayoutDashboard className="w-5 h-5" /> Admin Dashboard
                                    </NavLink>
                                    <button
                                        onClick={logout}
                                        className="flex items-center justify-center gap-2 w-full py-4 border border-red-500/30 text-red-500 rounded-xl font-bold hover:bg-red-500/10"
                                    >
                                        <LogOut className="w-5 h-5" /> Logout
                                    </button>
                                </div>
                            ) : (
                                <NavLink
                                    to="/admin/login"
                                    className="flex items-center justify-center gap-2 w-full py-4 border border-primary/30 text-primary rounded-xl font-bold hover:bg-primary/10"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <User className="w-5 h-5" /> Partner Login
                                </NavLink>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
