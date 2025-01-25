import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Roadmaps from "./pages/Roadmaps";
import AdaptiveLearning from "./pages/AdaptiveLearning";
import CareerGuidance from "./pages/CareerGuidance";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/roadmaps" element={<Roadmaps />} />
          <Route path="/adaptive-learning" element={<AdaptiveLearning />} />
          <Route path="/career-guidance" element={<CareerGuidance />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;