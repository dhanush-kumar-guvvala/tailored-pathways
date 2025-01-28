import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Book, BookCheck, GraduationCap, Trophy, Target, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AssessmentQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

interface Milestone {
  title: string;
  timeframe: string;
  description: string;
}

interface CareerPath {
  title: string;
  description: string;
  milestones: Milestone[];
  requiredSkills: string[];
  potentialRoles: string[];
}

interface Assessment {
  assessmentQuestions: AssessmentQuestion[];
  careerRoadmap: {
    recommendedPaths: CareerPath[];
  };
}

export const AssessmentDisplay = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchAssessment = async () => {
      try {
        const { data, error } = await supabase
          .from("assessments")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(1)
          .single();

        if (error) throw error;

        if (data) {
          setAssessment(data.assessment_data as Assessment);
        }
      } catch (error: any) {
        toast({
          title: "Error fetching assessment",
          description: error.message,
          variant: "destructive",
        });
      }
    };

    fetchAssessment();
  }, [user, navigate, toast]);

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (!assessment || selectedAnswer === null) return;

    const currentQuestion = assessment.assessmentQuestions[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < assessment.assessmentQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    } else {
      setShowResults(true);
    }
  };

  if (!assessment) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p>Loading assessment...</p>
      </div>
    );
  }

  const currentQuestion = assessment.assessmentQuestions[currentQuestionIndex];

  return (
    <div className="space-y-8 p-4">
      {!showResults ? (
        <Card>
          <CardHeader>
            <CardTitle>Assessment Questions</CardTitle>
            <CardDescription>
              Question {currentQuestionIndex + 1} of {assessment.assessmentQuestions.length}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-lg font-medium">{currentQuestion.question}</div>
            <div className="space-y-2">
              {currentQuestion.options.map((option, index) => (
                <Button
                  key={index}
                  variant={selectedAnswer === option ? "default" : "outline"}
                  className="w-full justify-start text-left"
                  onClick={() => handleAnswerSelect(option)}
                >
                  {option}
                </Button>
              ))}
            </div>
            <Button
              className="w-full mt-4"
              onClick={handleNextQuestion}
              disabled={selectedAnswer === null}
            >
              {currentQuestionIndex < assessment.assessmentQuestions.length - 1
                ? "Next Question"
                : "Show Results"}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-6 w-6 text-yellow-500" />
                Assessment Results
              </CardTitle>
              <CardDescription>
                You scored {score} out of {assessment.assessmentQuestions.length}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={(score / assessment.assessmentQuestions.length) * 100} className="h-2" />
            </CardContent>
          </Card>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <GraduationCap className="h-6 w-6" />
              Recommended Career Paths
            </h2>
            {assessment.careerRoadmap.recommendedPaths.map((path, pathIndex) => (
              <Card key={pathIndex} className="relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500" />
                <CardHeader>
                  <CardTitle>{path.title}</CardTitle>
                  <CardDescription>{path.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold flex items-center gap-2 mb-2">
                      <Book className="h-4 w-4" />
                      Required Skills
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {path.requiredSkills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold flex items-center gap-2 mb-2">
                      <Target className="h-4 w-4" />
                      Potential Roles
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {path.potentialRoles.map((role, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-sm"
                        >
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold flex items-center gap-2">
                      <BookCheck className="h-4 w-4" />
                      Milestones
                    </h4>
                    <div className="space-y-4">
                      {path.milestones.map((milestone, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-4 relative pl-6 before:content-[''] before:absolute before:left-2 before:top-0 before:w-0.5 before:h-full before:bg-gray-200"
                        >
                          <ArrowRight className="h-4 w-4 text-gray-400 absolute left-0 top-1.5" />
                          <div className="space-y-1">
                            <h5 className="font-medium">{milestone.title}</h5>
                            <p className="text-sm text-gray-600">{milestone.description}</p>
                            <span className="text-xs text-gray-500">{milestone.timeframe}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};