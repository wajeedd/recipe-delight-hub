import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import { RequireAuth } from "@/components/RequireAuth";
import Index from "./pages/Index.tsx";
import Welcome from "./pages/Welcome.tsx";
import Auth from "./pages/Auth.tsx";
import RecipeDetail from "./pages/RecipeDetail.tsx";
import RecipeForm from "./pages/RecipeForm.tsx";
import Favorites from "./pages/Favorites.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/welcome" replace />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/welcome" element={<RequireAuth><Welcome /></RequireAuth>} />
            <Route path="/browse" element={<RequireAuth><Index /></RequireAuth>} />
            <Route path="/recipe/:id" element={<RequireAuth><RecipeDetail /></RequireAuth>} />
            <Route path="/new" element={<RequireAuth><RecipeForm /></RequireAuth>} />
            <Route path="/edit/:id" element={<RequireAuth><RecipeForm /></RequireAuth>} />
            <Route path="/favorites" element={<RequireAuth><Favorites /></RequireAuth>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
