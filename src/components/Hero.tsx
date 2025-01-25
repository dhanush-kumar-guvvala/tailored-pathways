import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <div className="relative min-h-[80vh] flex items-center justify-center gradient-bg text-white px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Empower Your Future with AI-Driven Personalized Roadmaps
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90">
          Get tailored academic and career pathways based on your performance and interests
        </p>
        <Button 
          size="lg"
          className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};