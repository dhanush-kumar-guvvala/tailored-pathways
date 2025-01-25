import { Card, CardContent } from "@/components/ui/card";
import { Target, Clock, Briefcase } from "lucide-react";

const benefits = [
  {
    title: "Tailored Learning",
    description: "No more generic learning paths. Your roadmap adapts to your unique skills and ambitions",
    icon: Target,
  },
  {
    title: "Motivation & Accountability",
    description: "Stay motivated with real-time feedback and weekly check-ins",
    icon: Clock,
  },
  {
    title: "Career Focused",
    description: "Get clear, actionable steps toward achieving your dream job",
    icon: Briefcase,
  },
];

export const Benefits = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Why Choose Our Platform?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit) => (
            <Card key={benefit.title} className="feature-card">
              <CardContent className="p-6 text-center">
                <benefit.icon className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};