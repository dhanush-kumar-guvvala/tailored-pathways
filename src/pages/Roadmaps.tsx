import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { Code, Book, Briefcase } from "lucide-react";

const roadmaps = [
  {
    title: "Software Development",
    description: "Master programming languages, frameworks, and software engineering principles",
    icon: Code,
    skills: ["JavaScript", "React", "Node.js", "Python"],
    duration: "12 months"
  },
  {
    title: "Data Science",
    description: "Learn statistics, machine learning, and data analysis techniques",
    icon: Book,
    skills: ["Python", "SQL", "Machine Learning", "Statistics"],
    duration: "15 months"
  },
  {
    title: "Business Analytics",
    description: "Develop skills in business intelligence, analytics, and strategic planning",
    icon: Briefcase,
    skills: ["Excel", "SQL", "Tableau", "Power BI"],
    duration: "9 months"
  }
];

const Roadmaps = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="pt-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-4">Personalized Learning Roadmaps</h1>
          <p className="text-xl text-gray-600 text-center mb-12">
            Choose your path and start your journey to success
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {roadmaps.map((roadmap) => (
              <Card key={roadmap.title} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <roadmap.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-center">{roadmap.title}</h3>
                  <p className="text-gray-600 mb-4 text-center">{roadmap.description}</p>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Key Skills:</p>
                    <div className="flex flex-wrap gap-2">
                      {roadmap.skills.map((skill) => (
                        <span
                          key={skill}
                          className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 mt-4">Duration: {roadmap.duration}</p>
                  </div>
                  <Button className="w-full mt-6">Start This Path</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roadmaps;