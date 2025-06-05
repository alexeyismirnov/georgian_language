import { useState } from "react";
import { UserProgress } from "../utils/localStorageUtils";
import { Lesson } from "../data/lessons";

interface PhrasesLessonProps {
  lesson: Lesson;
  progress?: UserProgress;
  updateProgress: (progress: UserProgress) => void;
}

export function PhrasesLesson({ lesson, progress, updateProgress }: PhrasesLessonProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const phrases = lesson.content.items;
  const currentPhrase = phrases[currentIndex];

  const handleNext = () => {
    if (currentIndex < phrases.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const startQuiz = () => {
    setQuizStarted(true);
    setShowAll(false);
  };

  const completeQuiz = (quizScore: number) => {
    setQuizCompleted(true);
    setScore(quizScore);
    
    // Update progress
    updateProgress({
      lessonId: lesson.id,
      completed: true,
      score: quizScore,
      completedAt: Date.now()
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{lesson.title}</h2>
      <p className="text-gray-600 mb-6">{lesson.content.description}</p>

      {!quizStarted && !quizCompleted && (
        <div className="space-y-6">
          {showAll ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {phrases.map((phrase, index) => (
                <div key={index} className="border p-4 rounded-lg bg-gray-50">
                  <div className="text-lg mb-2">{phrase.georgian}</div>
                  <div className="text-sm">
                    <div className="font-medium">{phrase.phonetic}</div>
                    <div className="text-gray-500">{phrase.english}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="text-xl mb-6 p-4 bg-gray-50 rounded-lg border w-full text-center">
                {currentPhrase.georgian}
              </div>
              <div className="text-lg mb-2 font-medium">{currentPhrase.phonetic}</div>
              <div className="text-gray-600 mb-6">{currentPhrase.english}</div>
              
              <div className="flex justify-center gap-4 mb-8">
                <button
                  onClick={handlePrevious}
                  disabled={currentIndex === 0}
                  className="px-4 py-2 border rounded-md disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentIndex === phrases.length - 1}
                  className="px-4 py-2 border rounded-md disabled:opacity-50"
                >
                  Next
                </button>
              </div>
              
              <div className="flex gap-1 mb-6">
                {phrases.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === currentIndex ? "bg-indigo-600" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-center gap-4">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-4 py-2 border rounded-md bg-white hover:bg-gray-50"
            >
              {showAll ? "Show One by One" : "Show All Phrases"}
            </button>
            <button
              onClick={startQuiz}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Start Quiz
            </button>
          </div>
        </div>
      )}

      {quizStarted && !quizCompleted && (
        <PhrasesQuiz 
          phrases={phrases} 
          onComplete={completeQuiz} 
        />
      )}

      {quizCompleted && (
        <div className="text-center">
          <div className="text-4xl mb-4">🎉</div>
          <h3 className="text-xl font-bold mb-2">Quiz Completed!</h3>
          <p className="text-gray-600 mb-4">
            Your score: {score}%
          </p>
          <button
            onClick={() => {
              setQuizStarted(false);
              setQuizCompleted(false);
            }}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Review Phrases
          </button>
        </div>
      )}
    </div>
  );
}

function PhrasesQuiz({ 
  phrases, 
  onComplete 
}: { 
  phrases: Array<{ georgian: string; phonetic: string; english: string }>; 
  onComplete: (score: number) => void;
}) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  
  const handleAnswer = (correct: boolean) => {
    const newAnswers = [...answers, correct];
    setAnswers(newAnswers);
    
    if (currentQuestion < phrases.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate score
      const correctAnswers = newAnswers.filter(a => a).length;
      const scorePercentage = Math.round((correctAnswers / phrases.length) * 100);
      onComplete(scorePercentage);
    }
  };
  
  // Simple quiz implementation - you would want to make this more robust
  return (
    <div className="space-y-6">
      <div className="p-6 border rounded-lg bg-gray-50">
        <h3 className="text-xl font-bold mb-4">Question {currentQuestion + 1} of {phrases.length}</h3>
        <p className="mb-2">What does this Georgian phrase mean?</p>
        <div className="p-4 bg-white rounded border mb-6">
          <div className="text-lg mb-1">{phrases[currentQuestion].georgian}</div>
          <div className="text-sm text-gray-600">{phrases[currentQuestion].phonetic}</div>
        </div>
        
        <div className="space-y-3">
          {/* Generate some options including the correct one */}
          {[phrases[currentQuestion].english, 
            ...phrases.filter((_, i) => i !== currentQuestion)
              .map(p => p.english)
              .sort(() => 0.5 - Math.random())
              .slice(0, 3)]
            .sort(() => 0.5 - Math.random())
            .map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option === phrases[currentQuestion].english)}
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