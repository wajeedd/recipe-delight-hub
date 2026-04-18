import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CATEGORY_STYLES } from "@/lib/recipes";
import { cn } from "@/lib/utils";

export type RecipeCardData = {
  id: string;
  title: string;
  description: string | null;
  category: string;
  image_url: string | null;
};

export const RecipeCard = ({
  recipe,
  isFavorite,
  onToggleFavorite,
}: {
  recipe: RecipeCardData;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
}) => {
  return (
    <article className="group relative overflow-hidden rounded-2xl bg-card shadow-soft hover:shadow-pop transition-bounce hover:-translate-y-1 animate-pop-in">
      <Link to={`/recipe/${recipe.id}`} className="block">
        <div className="aspect-[4/3] overflow-hidden bg-muted">
          {recipe.image_url ? (
            <img
              src={recipe.image_url}
              alt={recipe.title}
              loading="lazy"
              className="h-full w-full object-cover group-hover:scale-110 transition-bounce"
            />
          ) : (
            <div className="h-full w-full bg-gradient-hero grid place-items-center text-5xl">🍽️</div>
          )}
        </div>
        <div className="p-4 space-y-2">
          <span className={cn("inline-block px-3 py-1 rounded-full text-xs font-bold", CATEGORY_STYLES[recipe.category] ?? "bg-muted")}>
            {recipe.category}
          </span>
          <h3 className="font-display text-lg font-bold leading-tight line-clamp-1">{recipe.title}</h3>
          {recipe.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">{recipe.description}</p>
          )}
        </div>
      </Link>
      {onToggleFavorite && (
        <Button
          variant="secondary"
          size="icon"
          className="absolute top-3 right-3 rounded-full h-9 w-9 shadow-soft"
          onClick={(e) => { e.preventDefault(); onToggleFavorite(recipe.id); }}
          aria-label={isFavorite ? "Remove favorite" : "Add favorite"}
        >
          <Heart className={cn("h-4 w-4", isFavorite && "fill-primary text-primary")} />
        </Button>
      )}
    </article>
  );
};
