import { CATEGORIES, CATEGORY_STYLES } from "@/lib/recipes";
import { cn } from "@/lib/utils";

export const CategoryFilter = ({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (v: string | null) => void;
}) => {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onChange(null)}
        className={cn(
          "px-4 py-2 rounded-full text-sm font-bold transition-bounce",
          value === null ? "bg-foreground text-background shadow-pop" : "bg-muted text-muted-foreground hover:bg-muted/70"
        )}
      >
        All
      </button>
      {CATEGORIES.map((c) => (
        <button
          key={c}
          onClick={() => onChange(c)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-bold transition-bounce hover:scale-105",
            value === c ? cn(CATEGORY_STYLES[c], "shadow-pop") : "bg-muted text-muted-foreground hover:bg-muted/70"
          )}
        >
          {c}
        </button>
      ))}
    </div>
  );
};
