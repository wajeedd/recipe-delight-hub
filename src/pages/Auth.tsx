import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChefHat } from "lucide-react";
import { toast } from "sonner";

const Auth = () => {
  const nav = useNavigate();
  const { user } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => { document.title = "Sign in — YumBook"; }, []);
  useEffect(() => { if (user) nav("/welcome"); }, [user, nav]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/welcome`,
          data: { display_name: name || email.split("@")[0] },
        },
      });
      if (error) toast.error(error.message);
      else { toast.success("Welcome to YumBook!"); nav("/welcome"); }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) toast.error(error.message);
      else nav("/welcome");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen grid place-items-center bg-gradient-hero/40 p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-hero opacity-50" aria-hidden />
      <div className="relative w-full max-w-md bg-card rounded-3xl shadow-pop p-8 animate-pop-in">
        <Link to="/" className="flex items-center justify-center gap-2 mb-6">
          <div className="h-11 w-11 rounded-2xl bg-gradient-primary grid place-items-center shadow-soft">
            <ChefHat className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="font-display text-2xl font-bold">Yum<span className="text-primary">Book</span></span>
        </Link>
        <h1 className="font-display text-2xl font-bold text-center">
          {mode === "signin" ? "Welcome back!" : "Join the kitchen"}
        </h1>
        <p className="text-center text-muted-foreground text-sm mt-1">
          {mode === "signin" ? "Sign in to save and share recipes." : "Create an account to start cooking."}
        </p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          {mode === "signup" && (
            <div className="space-y-1.5">
              <Label htmlFor="name">Display name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Chef Pat" />
            </div>
          )}
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>
            {loading ? "..." : mode === "signin" ? "Sign in" : "Create account"}
          </Button>
        </form>

        <button
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="block w-full text-center text-sm text-muted-foreground mt-4 hover:text-foreground"
        >
          {mode === "signin" ? "No account? Sign up" : "Already have an account? Sign in"}
        </button>
      </div>
    </div>
  );
};

export default Auth;
