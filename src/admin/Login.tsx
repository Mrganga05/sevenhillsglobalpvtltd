import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, Mail } from "lucide-react";

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            // If we have a valid session, allow admin access.
            // The credential itself is the gate — only the site owner knows the password.
            if (data.session) {
                navigate("/admin/dashboard");
            }
        } catch (error: any) {
            setError(error.message || "Invalid email or password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
            {/* Background aesthetics */}
            <div className="absolute inset-0 forest-gradient opacity-50 z-0"></div>
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl z-0"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald/5 rounded-full blur-3xl z-0"></div>

            <Card className="w-full max-w-md glass-card z-10 border-border/50">
                <CardHeader className="space-y-3 pb-6 border-b border-border/30">
                    <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-2 border border-gold/20">
                        <Lock className="w-6 h-6 text-gold" />
                    </div>
                    <CardTitle className="text-3xl text-center font-serif text-foreground">Admin Access</CardTitle>
                    <CardDescription className="text-center text-muted-foreground">
                        Sign in to the Seven Hills Global CMS
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleLogin}>
                    <CardContent className="space-y-4 pt-6">
                        {error && (
                            <div className="p-3 text-sm bg-destructive/10 text-destructive border border-destructive/20 rounded-md text-center">
                                {error}
                            </div>
                        )}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground/80 flex items-center gap-2">
                                <Mail className="w-4 h-4 text-gold-light" />
                                Email Address
                            </label>
                            <Input
                                type="email"
                                placeholder="admin@sevenhills.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="bg-background/50 border-border/50 focus:border-gold/50 focus:ring-gold/20 text-foreground"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground/80 flex items-center gap-2">
                                <Lock className="w-4 h-4 text-gold-light" />
                                Password
                            </label>
                            <Input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="bg-background/50 border-border/50 focus:border-gold/50 focus:ring-gold/20 text-foreground"
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="pt-2">
                        <Button
                            type="submit"
                            className="w-full bg-gold hover:bg-gold-light text-forest font-semibold shine-sweep"
                            disabled={loading}
                        >
                            {loading ? "Signing in..." : "Access Dashboard"}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};

export default AdminLogin;
