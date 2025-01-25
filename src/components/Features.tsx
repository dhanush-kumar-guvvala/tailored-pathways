import { Lightbulb, Target, Trophy } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    title: "Personalized Roadmaps",
    description: "Academic milestones and career pathways tailored to your strengths and interests",
    icon: Target,
  },
  {
    title: "Adaptive Mentoring",
    description: "AI-driven guidance and real-time feedback to keep you on track",
    icon: Lightbulb,
  },
  {
    title: "Career Readiness",
    description: "Guidance toward your dream job through internships, skill-building, and projects",
    icon: Trophy,
  },
];

export const Features = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          What We Offer
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Card key={feature.title} className="feature-card">
              <CardContent className="p-6 text-center">
                <feature.icon className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};