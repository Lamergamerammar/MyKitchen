import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/context/AuthContext"; // Import AuthProvider and useAuth
import { RecipeProvider } from "@/context/RecipeContext";
import { Layout } from "./components/Layout";
import HomePage from "./pages/HomePage";
import AddRecipePage from "./pages/AddRecipePage";
import RecipeDetailPage from "./pages/RecipeDetailPage";
import SavedRecipesPage from "./pages/SavedRecipesPage";
import UserProfilePage from "./pages/UserProfilePage";
import LandingPage from "./pages/LandingPage"; // Import LandingPage
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// PrivateRoute component to protect routes
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading authentication...</div>;
  }

  return user ? children : <Navigate to="/welcome" />;
};

const AppContent = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading app...</div>;
  }

  return (
    <BrowserRouter>
      {user ? (
        <RecipeProvider> {/* RecipeProvider only for authenticated users */}
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/add-recipe" element={<AddRecipePage />} />
              <Route path="/recipes/:id" element={<RecipeDetailPage />} />
              <Route path="/saved-recipes" element={<SavedRecipesPage />} />
              <Route path="/profile" element={<UserProfilePage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </RecipeProvider>
      ) : (
        <Routes>
          <Route path="/welcome" element={<LandingPage />} />
          <Route path="*" element={<Navigate to="/welcome" />} /> {/* Redirect all unauth routes to welcome */}
        </Routes>
      )}
    </BrowserRouter>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider> {/* Wrap the entire app with AuthProvider */}
        <AppContent />
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;