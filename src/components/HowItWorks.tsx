import { Card, CardContent } from "@/components/ui/card";

const steps = [
  {
    number: "01",
    title: "Sign Up & Share Your Data",
    description: "Fill out a simple form with your academic history and extracurricular interests",
  },
  {
    number: "02",
    title: "AI Creates Your Personalized Roadmap",
    description: "Our AI analyzes your data to build a custom learning path",
  },
  {
    number: "03",
    title: "Track Your Progress & Receive Feedback",
    description: "Weekly schedules and progress checks to keep you on track",
  },
  {
    number: "04",
    title: "Get Career-Ready!",
    description: "Receive personalized recommendations for internships and job opportunities",
  },
];

export const HowItWorks = () => {
  return (
    <section className="py-20 bg-gray-50 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          How Our AI Mentoring System Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <Card key={step.number} className="border-none shadow-lg">
              <CardContent className="p-6">
                <span className="text-4xl font-bold text-blue-600 mb-4 block">
                  {step.number}
                </span>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};