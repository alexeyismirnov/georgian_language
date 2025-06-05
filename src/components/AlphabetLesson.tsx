import { useState } from "react";
import { UserProgress } from "../utils/localStorageUtils";
import { Lesson } from "../data/lessons";

interface AlphabetLessonProps {
  lesson: Lesson;
  progress?: UserProgress;
  updateProgress: (progress: UserProgress) => void;
}

export function AlphabetLesson({ lesson, progress, updateProgress }: AlphabetLessonProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const items = lesson.content.items;
  const currentItem = items[currentIndex];

  const handleNext = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowQuiz(true);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
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

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">{lesson.title}</h2>
      <p className="text-gray-600 mb-6">{lesson.content.description}</p>

      {!showQuiz && !quizCompleted && (
        <div className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-lg border">
            <div className="flex flex-col items-center mb-6">
              <div className="text-7xl mb-4">{currentItem.georgian}</div>
              <div className="text-xl font-medium">{currentItem.phonetic}</div>
              <div className="text-gray-600 mt-2">{currentItem.english}</div>
            </div>
            
            {/* Audio player would go here if we had audio files */}
            <div className="flex justify-center mb-4">
              <button className="px-4 py-2 border rounded-md bg-white hover:bg-gray-50">
                🔊 Listen
              </button>
            </div>
          </div>
          
          <div className="flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="px-4 py-2 border rounded-md disabled:opacity-50"
            >
              Previous Letter
            </button>
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              {currentIndex < items.length - 1 ? "Next Letter" : "Start Quiz"}
            </button>
          </div>
          
          <div className="flex justify-center gap-1 mt-4">
            {items.map((_, index) => (
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

      {showQuiz && !quizCompleted && (
        <AlphabetQuiz 
          items={items} 
          onComplete={handleQuizComplete} 
        />
      )}

      {quizCompleted && (
        <div className="text-center p-8">
          <div className="text-4xl mb-4">🎉</div>
          <h3 className="text-xl font-bold mb-2">Lesson Completed!</h3>
          <p className="text-gray-600 mb-4">
            You've completed this alphabet lesson. Great job!
          </p>
          <button
            onClick={() => {
              setShowQuiz(false);
              setQuizCompleted(false);
              setCurrentIndex(0);
            }}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Review Letters
          </button>
        </div>
      )}
    </div>
  );
}

function AlphabetQuiz({ 
  items, 
  onComplete 
}: { 
  items: Array<{ georgian: string; phonetic: string; english: string }>; 
  onComplete: (score: number) => void;
}) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  
  const handleAnswer = (correct: boolean) => {
    const newAnswers = [...answers, correct];
    setAnswers(newAnswers);
    
    if (currentQuestion < items.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate score
      const correctAnswers = newAnswers.filter(a => a).length;
      const scorePercentage = Math.round((correctAnswers / items.length) * 100);
      onComplete(scorePercentage);
    }
  };
  
  // Generate options including the correct one
  const options = [
    items[currentQuestion].phonetic,
    ...items
      .filter((_, i) => i !== currentQuestion)
      .map(item => item.phonetic)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
  ].sort(() => Math.random() - 0.5);
  
  return (
    <div className="space-y-6">
      <div className="p-6 border rounded-lg bg-gray-50">
        <h3 className="text-xl font-bold mb-4">Question {currentQuestion + 1} of {items.length}</h3>
        <p className="text-2xl mb-6 text-center">{items[currentQuestion].georgian}</p>
        <p className="mb-4">What is the pronunciation of this letter?</p>
        
        <div className="space-y-3">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option === items[currentQuestion].phonetic)}
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