import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export const Hero = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleGetStarted = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      setLoading(true);
      
      // Check if user has completed assessment
      const { data: assessmentData, error: assessmentError } = await supabase
        .from("assessments")
        .select("id")
        .eq("user_id", user.id)
        .maybeSingle();

      if (assessmentError) {
        throw assessmentError;
      }

      if (!assessmentData) {
        // User hasn't completed assessment, redirect to academic marks page
        navigate("/academic-marks");
      } else {
        // User has completed assessment, redirect to roadmaps page
        navigate("/roadmaps");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-[80vh] flex items-center justify-center gradient-bg text-white px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
          Empower Your Future with AI-Driven Personalized Roadmaps
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-in">
          Get tailored academic and career pathways based on your performance and interests
        </p>
        <Button 
          size="lg"
          className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg animate-scale-in"
          onClick={handleGetStarted}
          disabled={loading}
        >
          {loading ? "Loading..." : "Get Started"}
        </Button>
      </div>
    </div>
  );
};