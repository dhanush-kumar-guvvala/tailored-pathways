import { Navigation } from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Target, Clock, Trophy } from "lucide-react";

const AdaptiveLearning = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="pt-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-4">Adaptive Learning Platform</h1>
          <p className="text-xl text-gray-600 text-center mb-12">
            Personalized learning experiences that adapt to your progress and needs
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardContent className="p-6">
                <Brain className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4 text-center">AI-Powered Learning</h3>
                <p className="text-gray-600">
                  Our AI system analyzes your learning style, pace, and preferences to create
                  a customized learning experience that evolves with you.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <Target className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4 text-center">Personalized Goals</h3>
                <p className="text-gray-600">
                  Set and track your learning goals while our system adjusts the difficulty
                  and content to help you achieve them effectively.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <Clock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4 text-center">Progress Tracking</h3>
                <p className="text-gray-600">
                  Monitor your progress in real-time with detailed analytics and insights
                  about your learning journey.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <Trophy className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4 text-center">Achievement System</h3>
                <p className="text-gray-600">
                  Earn badges and certificates as you progress through your learning path
                  and master new skills.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button size="lg" className="px-8">Start Learning Now</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdaptiveLearning;