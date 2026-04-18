export const CATEGORIES = [
  "Breakfast",
  "Lunch",
  "Dinner",
  "Dessert",
  "Snacks",
  "Drinks",
  "Vegetarian",
  "Vegan",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_STYLES: Record<string, string> = {
  Breakfast: "bg-accent text-accent-foreground",
  Lunch: "bg-secondary text-secondary-foreground",
  Dinner: "bg-primary text-primary-foreground",
  Dessert: "bg-berry text-berry-foreground",
  Snacks: "bg-gradient-warm text-primary-foreground",
  Drinks: "bg-sky text-sky-foreground",
  Vegetarian: "bg-secondary text-secondary-foreground",
  Vegan: "bg-secondary text-secondary-foreground",
};

export function getYouTubeEmbed(url: string | null | undefined): string | null {
  if (!url) return null;
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) {
      const id = u.pathname.slice(1);
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    if (u.hostname.includes("youtube.com")) {
      const id = u.searchParams.get("v");
      if (id) return `https://www.youtube.com/embed/${id}`;
      // /embed/ID or /shorts/ID
      const parts = u.pathname.split("/").filter(Boolean);
      const idx = parts.findIndex((p) => p === "embed" || p === "shorts");
      if (idx >= 0 && parts[idx + 1]) return `https://www.youtube.com/embed/${parts[idx + 1]}`;
    }
    if (u.hostname.includes("vimeo.com")) {
      const id = u.pathname.split("/").filter(Boolean)[0];
      if (id) return `https://player.vimeo.com/video/${id}`;
    }
  } catch {
    return null;
  }
  return null;
}
