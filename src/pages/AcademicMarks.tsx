import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function AcademicMarks() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [marks, setMarks] = useState({
    class_10_math: "",
    class_10_science: "",
    class_10_english: "",
    class_10_social: "",
    class_11_physics: "",
    class_11_chemistry: "",
    class_11_math: "",
    class_11_english: "",
    class_12_physics: "",
    class_12_chemistry: "",
    class_12_math: "",
    class_12_english: ""
  });

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    // Check if user has already submitted marks
    const checkMarks = async () => {
      try {
        // First, ensure the profile exists
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("id")
          .eq("id", user.id)
          .maybeSingle();

        if (profileError) {
          console.error("Error fetching profile:", profileError);
          return;
        }

        if (!profileData) {
          // Create profile if it doesn't exist
          const { error: insertError } = await supabase
            .from("profiles")
            .insert([
              {
                id: user.id,
                email: user.email,
                updated_at: new Date().toISOString(),
              }
            ]);

          if (insertError) {
            console.error("Error creating profile:", insertError);
            return;
          }
        }

        // Now check for academic marks
        const { data, error } = await supabase
          .from("academic_marks")
          .select("*")
          .eq("user_id", user.id)
          .maybeSingle();

        if (error) {
          console.error("Error checking marks:", error);
          return;
        }

        if (data) {
          // If marks exist, redirect to dashboard
          navigate("/");
        }
      } catch (error) {
        console.error("Error in checkMarks:", error);
      }
    };

    checkMarks();
  }, [user, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMarks(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      setLoading(true);
      
      // Convert string values to numbers
      const numericMarks = Object.entries(marks).reduce((acc, [key, value]) => ({
        ...acc,
        [key]: value === "" ? null : parseFloat(value)
      }), {});

      const { error } = await supabase
        .from("academic_marks")
        .insert([
          {
            user_id: user.id,
            ...numericMarks
          }
        ]);

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Your academic marks have been saved.",
      });

      navigate("/");
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
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="pt-24 px-4">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Academic Information</CardTitle>
              <CardDescription>Please enter your academic marks to help us personalize your learning journey</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                {/* Class 10 */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Class 10</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="class_10_math" className="text-sm font-medium">Mathematics</label>
                      <Input
                        id="class_10_math"
                        name="class_10_math"
                        type="number"
                        min="0"
                        max="100"
                        step="0.01"
                        placeholder="Enter marks (0-100)"
                        value={marks.class_10_math}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="class_10_science" className="text-sm font-medium">Science</label>
                      <Input
                        id="class_10_science"
                        name="class_10_science"
                        type="number"
                        min="0"
                        max="100"
                        step="0.01"
                        placeholder="Enter marks (0-100)"
                        value={marks.class_10_science}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="class_10_english" className="text-sm font-medium">English</label>
                      <Input
                        id="class_10_english"
                        name="class_10_english"
                        type="number"
                        min="0"
                        max="100"
                        step="0.01"
                        placeholder="Enter marks (0-100)"
                        value={marks.class_10_english}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="class_10_social" className="text-sm font-medium">Social Studies</label>
                      <Input
                        id="class_10_social"
                        name="class_10_social"
                        type="number"
                        min="0"
                        max="100"
                        step="0.01"
                        placeholder="Enter marks (0-100)"
                        value={marks.class_10_social}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                {/* Class 11 */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Class 11</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="class_11_physics" className="text-sm font-medium">Physics</label>
                      <Input
                        id="class_11_physics"
                        name="class_11_physics"
                        type="number"
                        min="0"
                        max="100"
                        step="0.01"
                        placeholder="Enter marks (0-100)"
                        value={marks.class_11_physics}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="class_11_chemistry" className="text-sm font-medium">Chemistry</label>
                      <Input
                        id="class_11_chemistry"
                        name="class_11_chemistry"
                        type="number"
                        min="0"
                        max="100"
                        step="0.01"
                        placeholder="Enter marks (0-100)"
                        value={marks.class_11_chemistry}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="class_11_math" className="text-sm font-medium">Mathematics</label>
                      <Input
                        id="class_11_math"
                        name="class_11_math"
                        type="number"
                        min="0"
                        max="100"
                        step="0.01"
                        placeholder="Enter marks (0-100)"
                        value={marks.class_11_math}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="class_11_english" className="text-sm font-medium">English</label>
                      <Input
                        id="class_11_english"
                        name="class_11_english"
                        type="number"
                        min="0"
                        max="100"
                        step="0.01"
                        placeholder="Enter marks (0-100)"
                        value={marks.class_11_english}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                {/* Class 12 */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Class 12</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="class_12_physics" className="text-sm font-medium">Physics</label>
                      <Input
                        id="class_12_physics"
                        name="class_12_physics"
                        type="number"
                        min="0"
                        max="100"
                        step="0.01"
                        placeholder="Enter marks (0-100)"
                        value={marks.class_12_physics}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="class_12_chemistry" className="text-sm font-medium">Chemistry</label>
                      <Input
                        id="class_12_chemistry"
                        name="class_12_chemistry"
                        type="number"
                        min="0"
                        max="100"
                        step="0.01"
                        placeholder="Enter marks (0-100)"
                        value={marks.class_12_chemistry}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="class_12_math" className="text-sm font-medium">Mathematics</label>
                      <Input
                        id="class_12_math"
                        name="class_12_math"
                        type="number"
                        min="0"
                        max="100"
                        step="0.01"
                        placeholder="Enter marks (0-100)"
                        value={marks.class_12_math}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="class_12_english" className="text-sm font-medium">English</label>
                      <Input
                        id="class_12_english"
                        name="class_12_english"
                        type="number"
                        min="0"
                        max="100"
                        step="0.01"
                        placeholder="Enter marks (0-100)"
                        value={marks.class_12_english}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Saving..." : "Save Academic Marks"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
