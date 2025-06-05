import { useState } from "react";
import { UserProgress } from "../utils/localStorageUtils";
import { Lesson } from "../data/lessons";

interface GrammarLessonProps {
  lesson: Lesson;
  progress?: UserProgress;
  updateProgress: (progress: UserProgress) => void;
}

export function GrammarLesson({ lesson, progress, updateProgress }: GrammarLessonProps) {
  const [currentRuleIndex, setCurrentRuleIndex] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const grammarRules = lesson.content.grammarRules || [];
  const currentRule = grammarRules[currentRuleIndex];

  const handleNext = () => {
    if (currentRuleIndex < grammarRules.length - 1) {
      setCurrentRuleIndex(currentRuleIndex + 1);
    } else {
      setShowQuiz(true);
    }
  };

  const handlePrevious = () => {
    if (currentRuleIndex > 0) {
      setCurrentRuleIndex(currentRuleIndex - 1);
    }
  };

  const handleQuizComplete = (score: number) => {
    setQuizCompleted(true);
    
    // Update progress
    updateProgress({
      lessonId: lesson.id,
      completed: true,
      score,
      completedAt: Date.now()
    });
  };

  if (!currentRule && !showQuiz) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-600">No grammar rules available for this lesson.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">{lesson.title}</h2>
      <p className="text-gray-600 mb-6">{lesson.content.description}</p>

      {!showQuiz && !quizCompleted && (
        <div className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-lg border">
            <h3 className="text-xl font-semibold mb-4">{currentRule.rule}</h3>
            <p className="mb-6 text-gray-700">{currentRule.explanation}</p>
            
            <div className="space-y-4">
              <h4 className="font-medium text-gray-800">Examples:</h4>
              {currentRule.examples.map((example, index) => (
                <div key={index} className="p-3 bg-white rounded border">
                  <div className="text-lg mb-1">{example.georgian}</div>
                  <div className="text-sm text-gray-600 mb-1">{example.phonetic}</div>
                  <div className="text-sm text-gray-800">{example.english}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentRuleIndex === 0}
              className="px-4 py-2 border rounded-md disabled:opacity-50"
            >
              Previous Rule
            </button>
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              {currentRuleIndex < grammarRules.length - 1 ? "Next Rule" : "Start Quiz"}
            </button>
          </div>
          
          <div className="flex justify-center gap-1 mt-4">
            {grammarRules.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentRuleIndex ? "bg-indigo-600" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {showQuiz && !quizCompleted && (
        <GrammarQuiz 
          rules={grammarRules} 
          onComplete={handleQuizComplete} 
        />
      )}

      {quizCompleted && (
        <div className="text-center p-8">
          <div className="text-4xl mb-4">🎉</div>
          <h3 className="text-xl font-bold mb-2">Lesson Completed!</h3>
          <p className="text-gray-600 mb-4">
            You've completed this grammar lesson. Great job!
          </p>
          <button
            onClick={() => {
              setShowQuiz(false);
              setQuizCompleted(false);
              setCurrentRuleIndex(0);
            }}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Review Lesson
          </button>
        </div>
      )}
    </div>
  );
}

function GrammarQuiz({ 
  rules, 
  onComplete 
}: { 
  rules: Array<{
    rule: string;
    explanation: string;
    examples: Array<{
      georgian: string;
      phonetic: string;
      english: string;
    }>;
  }>; 
  onComplete: (score: number) => void;
}) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  
  // Generate questions from the rules
  const questions = rules.flatMap(rule => 
    rule.examples.map(example => ({
      rule: rule.rule,
      georgian: example.georgian,
      phonetic: example.phonetic,
      english: example.english,
    }))
  ).sort(() => Math.random() - 0.5).slice(0, 5); // Take 5 random questions
  
  if (questions.length === 0) {
    onComplete(100);
    return null;
  }
  
  const handleAnswer = (correct: boolean) => {
    const newAnswers = [...answers, correct];
    setAnswers(newAnswers);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate score
      const correctAnswers = newAnswers.filter(a => a).length;
      const scorePercentage = Math.round((correctAnswers / questions.length) * 100);
      onComplete(scorePercentage);
    }
  };
  
  const currentQ = questions[currentQuestion];
  
  // Generate options including the correct one
  const options = [
    currentQ.english,
    ...rules
      .flatMap(rule => rule.examples.map(ex => ex.english))
      .filter(eng => eng !== currentQ.english)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
  ].sort(() => Math.random() - 0.5);
  
  return (
    <div className="space-y-6">
      <div className="p-6 border rounded-lg bg-gray-50">
        <h3 className="text-xl font-bold mb-4">Question {currentQuestion + 1} of {questions.length}</h3>
        <p className="mb-2">What does this Georgian phrase mean?</p>
        <div className="p-4 bg-white rounded border mb-6">
          <div className="text-lg mb-1">{currentQ.georgian}</div>
          <div className="text-sm text-gray-600">{currentQ.phonetic}</div>
        </div>
        
        <div className="space-y-3">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option === currentQ.english)}
              className="w-full p-3 text-left border rounded-md hover:bg-gray-100"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}