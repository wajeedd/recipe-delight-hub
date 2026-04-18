import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Plus, Search, Heart, BookOpen } from "lucide-react";

const Welcome = () => {
  const { user } = useAuth();

  useEffect(() => {
    document.title = "Welcome — YumBook";
  }, []);

  const name =
    (user?.user_metadata as { display_name?: string } | undefined)?.display_name ||
    user?.email?.split("@")[0] ||
    "Chef";

  const actions = [
    {
      to: "/new",
      icon: Plus,
      title: "Add a recipe",
      desc: "Share your dish with ingredients, steps & a video link.",
    },
    {
      to: "/browse",
      icon: Search,
      title: "Search recipes",
      desc: "Browse & filter the cookbook by category or keyword.",
    },
    {
      to: "/favorites",
      icon: Heart,
      title: "Your favorites",
      desc: "Quickly find the recipes you've saved.",
    },
    {
      to: "/browse",
      icon: BookOpen,
      title: "Explore cookbook",
      desc: "Discover new recipes from the community.",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="container py-12 md:py-20">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-primary uppercase tracking-wide">
            Welcome
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold mt-2">
            Hi {name}, what would you like to cook today?
          </h1>
          <p className="text-lg text-muted-foreground mt-4">
            Pick an action below to get started.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5 mt-10">
          {actions.map((a) => (
            <Link
              key={a.title}
              to={a.to}
              className="group bg-card rounded-2xl p-6 shadow-soft hover:shadow-pop transition-all border border-border hover:border-primary/40"
            >
              <div className="h-11 w-11 rounded-xl bg-gradient-primary grid place-items-center text-primary-foreground shadow-soft">
                <a.icon className="h-5 w-5" />
              </div>
              <h2 className="font-display text-xl font-bold mt-4">{a.title}</h2>
              <p className="text-muted-foreground text-sm mt-1">{a.desc}</p>
            </Link>
          ))}
        </div>

        <div className="mt-10">
          <Button variant="hero" size="lg" asChild>
            <Link to="/browse">Go to the cookbook</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Welcome;
