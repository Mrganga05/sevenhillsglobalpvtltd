import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, Mail } from "lucide-react";

/** Maps Supabase Auth error codes/messages to human-readable text. */
function getAuthErrorMessage(error: any): string {
    const msg: string = error?.message ?? "";
    const status: number = error?.status ?? 0;

    // Log the full raw error so you can inspect it in DevTools console
    console.error("[Supabase Auth Error]", {
        message: msg,
        status,
        name: error?.name,
        code: error?.code,
        fullError: error,
    });

    // Map common Supabase Auth 400 causes
    if (msg.includes("Invalid login credentials")) {
        return "Incorrect email or password. Make sure the account exists in Supabase Auth and the email is confirmed.";
    }
    if (msg.includes("Email not confirmed")) {
        return "Your email address is not confirmed. Please check your inbox and click the confirmation link.";
    }
    if (msg.includes("User not found")) {
        return "No account found with this email. Please create the user in the Supabase Dashboard first.";
    }
    if (msg.includes("Password should be")) {
        return "Password does not meet requirements. Supabase requires a minimum of 6 characters.";
    }
    if (msg.includes("signup is disabled") || msg.includes("Signups not allowed")) {
        return "New sign-ups are disabled on this Supabase project. Enable it in Authentication → Settings.";
    }
    if (msg === "Failed to fetch" || status === 0) {
        return "Network error. Cannot reach Supabase. Check your internet connection.";
    }
    if (status === 400) {
        return `Bad request (400): ${msg}. Check Supabase Dashboard → Authentication → Users to confirm this account exists and is confirmed.`;
    }
    if (status === 422) {
        return "Invalid email format or missing required fields.";
    }
    if (status === 429) {
        return "Too many login attempts. Please wait a few minutes and try again.";
    }

    return msg || "Login failed. Please try again.";
}

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

        const trimmedEmail = email.trim().toLowerCase();
        const trimmedPassword = password;

        // Basic client-side validation before hitting the network
        if (!trimmedEmail || !trimmedPassword) {
            setError("Please enter both email and password.");
            setLoading(false);
            return;
        }
        if (trimmedPassword.length < 6) {
            setError("Password must be at least 6 characters.");
            setLoading(false);
            return;
        }

        try {
            // DEBUG: log what's being sent (remove after fixing)
            console.log("[Auth Debug] Attempting login with:", {
                email: trimmedEmail,
                passwordLength: trimmedPassword.length,
                passwordFirst2Chars: trimmedPassword.slice(0, 2) + "***",
            });

            const { data, error: authError } = await supabase.auth.signInWithPassword({
                email: trimmedEmail,
                password: trimmedPassword,
            });

            if (authError) {
                // Full error detail is logged inside getAuthErrorMessage
                setError(getAuthErrorMessage(authError));
                return;
            }

            if (data?.session) {
                console.log("[Auth] Login successful. User:", data.user?.email);
                navigate("/admin/dashboard");
            } else {
                // Session is null despite no error — should not happen, but handle gracefully
                setError("Login succeeded but no session was returned. Please try again.");
            }
        } catch (unexpected: any) {
            console.error("[Auth] Unexpected error:", unexpected);
            setError(getAuthErrorMessage(unexpected));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
            {/* Background aesthetics */}
            <div className="absolute inset-0 forest-gradient opacity-50 z-0"></div>
            <div className="hidden md:block absolute top-1/4 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl z-0"></div>
            <div className="hidden md:block absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald/5 rounded-full blur-3xl z-0"></div>

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
                                autoComplete="email"
                                className="bg-background/50 border-border/50 focus:border-gold/50 focus:ring-gold/20 text-foreground py-3 sm:py-2 text-base sm:text-sm"
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
                                autoComplete="current-password"
                                className="bg-background/50 border-border/50 focus:border-gold/50 focus:ring-gold/20 text-foreground py-3 sm:py-2 text-base sm:text-sm"
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="pt-2 pb-6">
                        <Button
                            type="submit"
                            className="w-full bg-gold hover:bg-gold-light text-forest font-semibold shine-sweep py-6 sm:py-4 text-base"
                            disabled={loading}
                        >
                            {loading ? "Signing in…" : "Access Dashboard"}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};

export default AdminLogin;
