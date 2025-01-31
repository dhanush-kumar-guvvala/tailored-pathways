import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Roadmaps from "./pages/Roadmaps";
import AdaptiveLearning from "./pages/AdaptiveLearning";
import CareerGuidance from "./pages/CareerGuidance";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AcademicMarks from "./pages/AcademicMarks";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/roadmaps" element={<Roadmaps />} />
            <Route path="/adaptive-learning" element={<AdaptiveLearning />} />
            <Route path="/career-guidance" element={<CareerGuidance />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/academic-marks" element={<AcademicMarks />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;