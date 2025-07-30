import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ClerkProvider, SignIn, SignUp } from "@clerk/clerk-react";
import { Projects } from "./pages/Projects";
import { ProjectDetail } from "./pages/ProjectDetail";
import { DecisionDetail } from "./pages/DecisionDetail";
import { LandingPage } from "./pages/LandingPage";
import { ArchivedDecisions } from "./pages/ArchivedDecisions";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { CenteredAuthPage } from "./pages/CenteredAuthPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// You'll need to replace this with your actual Clerk publishable key
const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const App = () => (
  <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/sign-in/*"
              element={
                <CenteredAuthPage>
                  <SignIn routing="path" path="/sign-in" afterSignInUrl="/projects" />
                </CenteredAuthPage>
              }
            />
            <Route
              path="/sign-up/*"
              element={
                <CenteredAuthPage>
                  <SignUp 
                    routing="path" 
                    path="/sign-up" 
                    afterSignUpUrl="/projects" 
                    afterSignInUrl="/projects"
                  />
                </CenteredAuthPage>
              }
            />
            <Route 
              path="/projects" 
              element={
                <ProtectedRoute>
                  <Projects />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/project/:id" 
              element={
                <ProtectedRoute>
                  <ProjectDetail />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/project/:projectId/decision/:decisionId" 
              element={
                <ProtectedRoute>
                  <DecisionDetail />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/archived" 
              element={
                <ProtectedRoute>
                  <ArchivedDecisions />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ClerkProvider>
);

export default App;
