import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { CATEGORY_STYLES, getYouTubeEmbed } from "@/lib/recipes";
import { cn } from "@/lib/utils";
import { Clock, Heart, Pencil, Play, Trash2, Users } from "lucide-react";
import { toast } from "sonner";
import { STARTER_RECIPE_BY_ID } from "@/lib/starterRecipes";

type Recipe = {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  category: string;
  image_url: string | null;
  video_url: string | null;
  ingredients: string[];
  steps: string[];
  prep_time: number | null;
  cook_time: number | null;
  servings: number | null;
};

const RecipeDetail = () => {
  const { id } = useParams();
  const nav = useNavigate();
  const { user } = useAuth();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFav, setIsFav] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!id) return;

    const starterRecipe = STARTER_RECIPE_BY_ID[id];
    if (starterRecipe) {
      setRecipe(starterRecipe);
      document.title = `${starterRecipe.title} - YumBook`;
      setLoading(false);
      return;
    }

    supabase
      .from("recipes")
      .select("*")
      .eq("id", id)
      .maybeSingle()
      .then(({ data, error }) => {
        if (error) toast.error(error.message);
        setRecipe(data as Recipe | null);
        if (data) document.title = `${data.title} - YumBook`;
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (!user || !id) return;
    if (id.startsWith("starter-")) {
      setIsFav(false);
      return;
    }

    supabase
      .from("favorites")
      .select("id")
      .eq("user_id", user.id)
      .eq("recipe_id", id)
      .maybeSingle()
      .then(({ data }) => setIsFav(!!data));
  }, [user, id]);

  const toggleFav = async () => {
    if (!user) {
      toast("Sign in to save favorites");
      return;
    }
    if (!recipe) return;
    if (recipe.id.startsWith("starter-")) {
      toast("Starter recipes are read-only and cannot be favorited");
      return;
    }

    if (isFav) {
      setIsFav(false);
      await supabase.from("favorites").delete().eq("user_id", user.id).eq("recipe_id", recipe.id);
    } else {
      setIsFav(true);
      const { error } = await supabase.from("favorites").insert({ user_id: user.id, recipe_id: recipe.id });
      if (error) {
        setIsFav(false);
        toast.error(error.message);
      }
    }
  };

  const remove = async () => {
    if (!recipe) return;
    if (recipe.id.startsWith("starter-")) {
      toast("Starter recipes cannot be deleted");
      return;
    }
    if (!confirm("Delete this recipe?")) return;

    const { error } = await supabase.from("recipes").delete().eq("id", recipe.id);
    if (error) toast.error(error.message);
    else {
      toast.success("Recipe deleted");
      nav("/");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container py-20 text-center text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container py-20 text-center">
          <h1 className="font-display text-2xl">Recipe not found</h1>
          <Button asChild className="mt-4">
            <Link to="/">Go home</Link>
          </Button>
        </div>
      </div>
    );
  }

  const embed = getYouTubeEmbed(recipe.video_url);
  const isOwner = user?.id === recipe.user_id && !recipe.id.startsWith("starter-");

  return (
    <div className="min-h-screen">
      <Navbar />
      <article className="container py-8 max-w-4xl space-y-8">
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <span
                className={cn(
                  "inline-block px-3 py-1 rounded-full text-xs font-bold mb-3",
                  CATEGORY_STYLES[recipe.category] ?? "bg-muted",
                )}
              >
                {recipe.category}
              </span>
              <h1 className="font-display text-3xl md:text-5xl font-bold leading-tight">{recipe.title}</h1>
              {recipe.description && <p className="text-lg text-muted-foreground mt-2">{recipe.description}</p>}
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" size="icon" onClick={toggleFav} aria-label="Favorite">
                <Heart className={cn("h-4 w-4", isFav && "fill-primary text-primary")} />
              </Button>
              {isOwner && (
                <>
                  <Button variant="outline" size="icon" asChild>
                    <Link to={`/edit/${recipe.id}`}>
                      <Pencil className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="destructive" size="icon" onClick={remove}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            {recipe.prep_time != null && (
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" /> Prep {recipe.prep_time}m
              </span>
            )}
            {recipe.cook_time != null && (
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" /> Cook {recipe.cook_time}m
              </span>
            )}
            {recipe.servings != null && (
              <span className="inline-flex items-center gap-1.5">
                <Users className="h-4 w-4" /> Serves {recipe.servings}
              </span>
            )}
          </div>
        </div>

        <div className="rounded-3xl overflow-hidden shadow-pop bg-card aspect-video relative">
          {playing && embed ? (
            <iframe
              src={`${embed}?autoplay=1`}
              title={recipe.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          ) : recipe.image_url ? (
            <>
              <img src={recipe.image_url} alt={recipe.title} className="w-full h-full object-cover" />
              {embed && (
                <button
                  onClick={() => setPlaying(true)}
                  className="absolute inset-0 grid place-items-center bg-black/30 hover:bg-black/40 transition-colors group"
                  aria-label="Play reference video"
                >
                  <span className="h-20 w-20 rounded-full bg-primary text-primary-foreground grid place-items-center shadow-pop group-hover:scale-110 transition-bounce">
                    <Play className="h-9 w-9 fill-current ml-1" />
                  </span>
                </button>
              )}
            </>
          ) : embed ? (
            <button onClick={() => setPlaying(true)} className="w-full h-full bg-gradient-hero grid place-items-center group">
              <span className="h-20 w-20 rounded-full bg-primary text-primary-foreground grid place-items-center shadow-pop group-hover:scale-110 transition-bounce">
                <Play className="h-9 w-9 fill-current ml-1" />
              </span>
            </button>
          ) : (
            <div className="w-full h-full bg-gradient-hero grid place-items-center text-6xl">Dish</div>
          )}
        </div>

        {embed && !playing && (
          <Button variant="berry" size="lg" onClick={() => setPlaying(true)}>
            <Play className="h-4 w-4 fill-current" /> Play reference video
          </Button>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          <section className="bg-card rounded-2xl p-6 shadow-soft">
            <h2 className="font-display text-2xl font-bold mb-4">Ingredients</h2>
            <ul className="space-y-2">
              {recipe.ingredients.map((ing, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  <span>{ing}</span>
                </li>
              ))}
            </ul>
          </section>
          <section className="bg-card rounded-2xl p-6 shadow-soft">
            <h2 className="font-display text-2xl font-bold mb-4">Steps</h2>
            <ol className="space-y-4">
              {recipe.steps.map((s, i) => (
                <li key={i} className="flex gap-3">
                  <span className="shrink-0 h-7 w-7 rounded-full bg-gradient-primary text-primary-foreground font-bold grid place-items-center text-sm">
                    {i + 1}
                  </span>
                  <span>{s}</span>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </article>
    </div>
  );
};

export default RecipeDetail;
