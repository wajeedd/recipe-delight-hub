import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CATEGORIES } from "@/lib/recipes";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

const RecipeForm = () => {
  const { id } = useParams();
  const editing = !!id;
  const nav = useNavigate();
  const { user, loading: authLoading } = useAuth();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<string>(CATEGORIES[0]);
  const [imageUrl, setImageUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([""]);
  const [steps, setSteps] = useState<string[]>([""]);
  const [prep, setPrep] = useState<string>("");
  const [cook, setCook] = useState<string>("");
  const [servings, setServings] = useState<string>("");
  const [saving, setSaving] = useState(false);

  useEffect(() => { document.title = editing ? "Edit recipe — YumBook" : "Add recipe — YumBook"; }, [editing]);
  useEffect(() => { if (!authLoading && !user) nav("/auth"); }, [authLoading, user, nav]);

  useEffect(() => {
    if (!editing || !id) return;
    supabase.from("recipes").select("*").eq("id", id).maybeSingle().then(({ data, error }) => {
      if (error) { toast.error(error.message); return; }
      if (!data) return;
      setTitle(data.title);
      setDescription(data.description ?? "");
      setCategory(data.category);
      setImageUrl(data.image_url ?? "");
      setVideoUrl(data.video_url ?? "");
      setIngredients(data.ingredients?.length ? data.ingredients : [""]);
      setSteps(data.steps?.length ? data.steps : [""]);
      setPrep(data.prep_time?.toString() ?? "");
      setCook(data.cook_time?.toString() ?? "");
      setServings(data.servings?.toString() ?? "");
    });
  }, [editing, id]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    const payload = {
      user_id: user.id,
      title: title.trim(),
      description: description.trim() || null,
      category,
      image_url: imageUrl.trim() || null,
      video_url: videoUrl.trim() || null,
      ingredients: ingredients.map((s) => s.trim()).filter(Boolean),
      steps: steps.map((s) => s.trim()).filter(Boolean),
      prep_time: prep ? parseInt(prep) : null,
      cook_time: cook ? parseInt(cook) : null,
      servings: servings ? parseInt(servings) : null,
    };
    if (editing && id) {
      const { error } = await supabase.from("recipes").update(payload).eq("id", id);
      if (error) toast.error(error.message);
      else { toast.success("Recipe updated"); nav(`/recipe/${id}`); }
    } else {
      const { data, error } = await supabase.from("recipes").insert(payload).select("id").single();
      if (error) toast.error(error.message);
      else { toast.success("Recipe added!"); nav(`/recipe/${data.id}`); }
    }
    setSaving(false);
  };

  const updArr = (arr: string[], setArr: (v: string[]) => void, i: number, v: string) => {
    const next = [...arr]; next[i] = v; setArr(next);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <form onSubmit={submit} className="container py-8 max-w-3xl space-y-6">
        <h1 className="font-display text-3xl font-bold">{editing ? "Edit recipe" : "Add a recipe"}</h1>

        <div className="bg-card rounded-2xl p-6 shadow-soft space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="title">Title</Label>
            <Input id="title" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Sunny lemon pasta" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="desc">Short description</Label>
            <Textarea id="desc" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Bright, zesty, ready in 20 minutes." />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="img">Image URL</Label>
              <Input id="img" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://..." />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="prep">Prep (min)</Label>
              <Input id="prep" type="number" min={0} value={prep} onChange={(e) => setPrep(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="cook">Cook (min)</Label>
              <Input id="cook" type="number" min={0} value={cook} onChange={(e) => setCook(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="serv">Serves</Label>
              <Input id="serv" type="number" min={0} value={servings} onChange={(e) => setServings(e.target.value)} />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="vid">Reference video URL (YouTube / Vimeo)</Label>
            <Input id="vid" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} placeholder="https://www.youtube.com/watch?v=..." />
            <p className="text-xs text-muted-foreground">Adds a play button on the recipe page.</p>
          </div>
        </div>

        <div className="bg-card rounded-2xl p-6 shadow-soft space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-bold">Ingredients</Label>
            <Button type="button" variant="ghost" size="sm" onClick={() => setIngredients([...ingredients, ""])}>
              <Plus className="h-4 w-4" /> Add
            </Button>
          </div>
          {ingredients.map((v, i) => (
            <div key={i} className="flex gap-2">
              <Input value={v} onChange={(e) => updArr(ingredients, setIngredients, i, e.target.value)} placeholder={`Ingredient ${i + 1}`} />
              {ingredients.length > 1 && (
                <Button type="button" variant="ghost" size="icon" onClick={() => setIngredients(ingredients.filter((_, j) => j !== i))}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>

        <div className="bg-card rounded-2xl p-6 shadow-soft space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-bold">Cooking steps</Label>
            <Button type="button" variant="ghost" size="sm" onClick={() => setSteps([...steps, ""])}>
              <Plus className="h-4 w-4" /> Add
            </Button>
          </div>
          {steps.map((v, i) => (
            <div key={i} className="flex gap-2">
              <span className="mt-2 h-7 w-7 shrink-0 rounded-full bg-gradient-primary text-primary-foreground font-bold grid place-items-center text-sm">{i + 1}</span>
              <Textarea value={v} onChange={(e) => updArr(steps, setSteps, i, e.target.value)} placeholder={`Step ${i + 1}`} rows={2} />
              {steps.length > 1 && (
                <Button type="button" variant="ghost" size="icon" onClick={() => setSteps(steps.filter((_, j) => j !== i))}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>

        <div className="flex gap-3 justify-end">
          <Button type="button" variant="outline" onClick={() => nav(-1)}>Cancel</Button>
          <Button type="submit" variant="hero" size="lg" disabled={saving}>{saving ? "Saving..." : editing ? "Save changes" : "Publish recipe"}</Button>
        </div>
      </form>
    </div>
  );
};

export default RecipeForm;
