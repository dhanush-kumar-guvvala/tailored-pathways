import { Navigation } from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, GraduationCap, LineChart, Users } from "lucide-react";

const CareerGuidance = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="pt-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-4">Career Guidance</h1>
          <p className="text-xl text-gray-600 text-center mb-12">
            Expert guidance to help you make informed career decisions
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Briefcase className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4 text-center">Career Assessment</h3>
                <p className="text-gray-600 mb-4">
                  Take our comprehensive career assessment to discover careers that match
                  your skills, interests, and values.
                </p>
                <Button className="w-full">Take Assessment</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <GraduationCap className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4 text-center">Education Planning</h3>
                <p className="text-gray-600 mb-4">
                  Get personalized recommendations for courses, certifications, and degree
                  programs aligned with your career goals.
                </p>
                <Button className="w-full">Explore Programs</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <LineChart className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4 text-center">Industry Insights</h3>
                <p className="text-gray-600 mb-4">
                  Access real-time industry trends, salary data, and job market analysis
                  to make informed career decisions.
                </p>
                <Button className="w-full">View Insights</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4 text-center">Mentorship</h3>
                <p className="text-gray-600 mb-4">
                  Connect with industry professionals and mentors who can guide you
                  through your career journey.
                </p>
                <Button className="w-full">Find Mentors</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerGuidance;