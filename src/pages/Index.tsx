import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Navbar } from "@/components/Navbar";
import { RecipeCard, RecipeCardData } from "@/components/RecipeCard";
import { CategoryFilter } from "@/components/CategoryFilter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Sparkles } from "lucide-react";
import { toast } from "sonner";
import hero from "@/assets/hero.jpg";

const Index = () => {
  const { user } = useAuth();
  const [recipes, setRecipes] = useState<RecipeCardData[]>([]);
  const [favs, setFavs] = useState<Set<string>>(new Set());
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "YumBook — Colorful Recipes You'll Love";
  }, []);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("recipes")
        .select("id, title, description, category, image_url")
        .order("created_at", { ascending: false });
      if (error) toast.error(error.message);
      setRecipes((data ?? []) as RecipeCardData[]);
      setLoading(false);
    };
    load();
  }, []);

  useEffect(() => {
    if (!user) { setFavs(new Set()); return; }
    supabase.from("favorites").select("recipe_id").eq("user_id", user.id).then(({ data }) => {
      setFavs(new Set((data ?? []).map((r) => r.recipe_id)));
    });
  }, [user]);

  const filtered = useMemo(() => {
    return recipes.filter((r) => {
      if (cat && r.category !== cat) return false;
      if (q && !r.title.toLowerCase().includes(q.toLowerCase()) && !(r.description ?? "").toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
  }, [recipes, q, cat]);

  const toggleFav = async (id: string) => {
    if (!user) { toast("Sign in to save favorites"); return; }
    if (favs.has(id)) {
      const next = new Set(favs); next.delete(id); setFavs(next);
      await supabase.from("favorites").delete().eq("user_id", user.id).eq("recipe_id", id);
    } else {
      const next = new Set(favs); next.add(id); setFavs(next);
      const { error } = await supabase.from("favorites").insert({ user_id: user.id, recipe_id: id });
      if (error) toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-60" aria-hidden />
        <div className="container relative py-12 md:py-20 grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-5 animate-pop-in">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-card/80 backdrop-blur text-sm font-bold shadow-soft">
              <Sparkles className="h-4 w-4 text-primary" /> Cook joyfully
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight">
              Recipes that <span className="text-primary">pop</span>,<br />
              flavors that <span className="text-berry">wow</span>.
            </h1>
            <p className="text-lg text-foreground/80 max-w-md">
              Discover, save, and share colorful recipes — complete with ingredients, steps, and reference videos.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="hero" size="xl" asChild>
                <Link to={user ? "/new" : "/auth"}>Add a recipe</Link>
              </Button>
              <Button variant="fun" size="xl" asChild>
                <a href="#browse">Browse recipes</a>
              </Button>
            </div>
          </div>
          <div className="relative">
            <img
              src={hero}
              alt="Colorful recipe book with floating fresh ingredients"
              width={1536}
              height={1024}
              className="rounded-3xl shadow-pop animate-float"
            />
          </div>
        </div>
      </section>

      {/* Browse */}
      <section id="browse" className="container py-10 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 className="font-display text-3xl font-bold">Explore the cookbook</h2>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search recipes..."
              className="pl-9 rounded-full h-11 bg-card"
            />
          </div>
        </div>

        <CategoryFilter value={cat} onChange={setCat} />

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-[4/3] rounded-2xl bg-muted animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 rounded-2xl bg-card shadow-soft">
            <div className="text-6xl mb-3">🥕</div>
            <h3 className="font-display text-xl font-bold">No recipes here yet</h3>
            <p className="text-muted-foreground mt-1">Be the first to add one!</p>
            <Button variant="hero" size="lg" className="mt-5" asChild>
              <Link to={user ? "/new" : "/auth"}>Add a recipe</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((r) => (
              <RecipeCard
                key={r.id}
                recipe={r}
                isFavorite={favs.has(r.id)}
                onToggleFavorite={toggleFav}
              />
            ))}
          </div>
        )}
      </section>

      <footer className="border-t border-border mt-16">
        <div className="container py-8 text-center text-sm text-muted-foreground">
          Made with 💛 in YumBook
        </div>
      </footer>
    </div>
  );
};

export default Index;
