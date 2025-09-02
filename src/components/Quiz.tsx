import { useState, useMemo } from "react";

export interface QuizItem {
  georgian: string;
  phonetic: string;
  english: string;
  category?: string;
}

export interface QuizResult {
  question: string;
  phonetic: string;
  correctAnswer: string;
  userAnswer: string;
  isCorrect: boolean;
}

interface QuizProps {
  items: QuizItem[];
  onComplete: (score: number, results: QuizResult[]) => void;
  questionLabel?: string;
}

export function Quiz({ 
  items, 
  onComplete,
  questionLabel = "What does this Georgian phrase mean?"
}: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [results, setResults] = useState<QuizResult[]>([]);
  
  // Pre-generate all quiz options once to avoid shuffling on re-renders
  const quizOptions = useMemo(() => {
    return items.map((item, index) => {
      // Get the correct answer
      const correctAnswer = item.english;
      
      // Get 3 random incorrect answers
      const incorrectAnswers = items
        .filter((p, i) => i !== index)
        .map(p => p.english)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
      
      // Combine and shuffle all options
      return [...incorrectAnswers, correctAnswer]
        .sort(() => 0.5 - Math.random());
    });
  }, [items]);
  
  const handleOptionSelect = (option: string) => {
    if (isAnswered) return; // Prevent changing answer after submission
    
    setSelectedOption(option);
    setIsAnswered(true);
    
    const isCorrect = option === items[currentQuestion].english;
    
    // Record the result
    const newResults = [...results, {
      question: items[currentQuestion].georgian,
      phonetic: items[currentQuestion].phonetic,
      correctAnswer: items[currentQuestion].english,
      userAnswer: option,
      isCorrect
    }];
    
    setResults(newResults);
    
    // Move to next question after a delay
    setTimeout(() => {
      if (currentQuestion < items.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
        setIsAnswered(false);
      } else {
        // Quiz completed
        const correctAnswers = newResults.filter(r => r.isCorrect).length;
        const scorePercentage = Math.round((correctAnswers / items.length) * 100);
        onComplete(scorePercentage, newResults);
      }
    }, 1500); // 1.5 second delay to show feedback
  };
  
  // Get current question's options
  const currentOptions = quizOptions[currentQuestion];
  
  return (
    <div className="space-y-6">
      <div className="p-6 border rounded-lg bg-gray-50">
        <h3 className="text-xl font-bold mb-4">Question {currentQuestion + 1} of {items.length}</h3>
        <p className="mb-2">{questionLabel}</p>
        <div className="p-4 bg-white rounded border mb-6">
          <div className="text-lg mb-1">{items[currentQuestion].georgian}</div>
        </div>
        
        <div className="space-y-3">
          {currentOptions.map((option, index) => {
            const isCorrect = option === items[currentQuestion].english;
            const isSelected = selectedOption === option;
            
            // Determine button styling based on state
            let buttonClass = "w-full p-3 text-left border rounded-md";
            
            if (isAnswered) {
              if (isCorrect) {
                // Correct answer - always show green
                buttonClass += " border-green-500 bg-green-50 text-green-800";
              } else if (isSelected) {
                // Selected but incorrect
                buttonClass += " border-red-500 bg-red-50 text-red-800";
              }
            } else {
              // Not answered yet
              buttonClass += " hover:bg-gray-100";
            }
            
            return (
              <button
                key={index}
                onClick={() => handleOptionSelect(option)}
                disabled={isAnswered}
                className={buttonClass}
              >
                <div className="flex justify-between items-center">
                  <span>{option}</span>
                  {isAnswered && isCorrect && (
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                  {isAnswered && isSelected && !isCorrect && (
                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Quiz;