import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Navbar } from "@/components/Navbar";
import { RecipeCard, RecipeCardData } from "@/components/RecipeCard";
import { Button } from "@/components/ui/button";

const Favorites = () => {
  const { user, loading: authLoading } = useAuth();
  const nav = useNavigate();
  const [recipes, setRecipes] = useState<RecipeCardData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { document.title = "Favorites — YumBook"; }, []);
  useEffect(() => { if (!authLoading && !user) nav("/auth"); }, [authLoading, user, nav]);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("favorites")
      .select("recipe_id, recipes(id, title, description, category, image_url)")
      .eq("user_id", user.id)
      .then(({ data }) => {
        const list = (data ?? [])
          .map((row: any) => row.recipes)
          .filter(Boolean) as RecipeCardData[];
        setRecipes(list);
        setLoading(false);
      });
  }, [user]);

  const remove = async (id: string) => {
    if (!user) return;
    setRecipes((r) => r.filter((x) => x.id !== id));
    await supabase.from("favorites").delete().eq("user_id", user.id).eq("recipe_id", id);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="container py-8 space-y-6">
        <h1 className="font-display text-3xl md:text-4xl font-bold">Your favorites ❤️</h1>
        {loading ? (
          <div className="text-muted-foreground">Loading...</div>
        ) : recipes.length === 0 ? (
          <div className="text-center py-16 rounded-2xl bg-card shadow-soft">
            <div className="text-6xl mb-3">💔</div>
            <h3 className="font-display text-xl font-bold">No favorites yet</h3>
            <p className="text-muted-foreground mt-1">Tap the heart on any recipe to save it.</p>
            <Button variant="hero" size="lg" className="mt-5" asChild><Link to="/">Browse recipes</Link></Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {recipes.map((r) => (
              <RecipeCard key={r.id} recipe={r} isFavorite onToggleFavorite={remove} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Favorites;
