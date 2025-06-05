import { useState, useEffect } from "react";
import { Lesson, getLessonsByType } from "../data/lessons";
import { UserProgress } from "../utils/localStorageUtils";

interface SpellingBeeLessonProps {
  lesson: Lesson;
  progress?: UserProgress;
  updateProgress: (progress: UserProgress) => void;
}

export function SpellingBeeLesson({ lesson, progress, updateProgress }: SpellingBeeLessonProps) {
  const [currentRound, setCurrentRound] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [words, setWords] = useState<Array<{ georgian: string; phonetic: string; }>>([]);

  // Initialize words from noun flashcards
  useEffect(() => {
    // Get words from noun flashcards
    const nounLessons = getLessonsByType("flashcards").filter(l => 
      l.id.includes("nouns") || l.id.includes("numbers")
    );
    
    const allWords: Array<{ georgian: string; phonetic: string; }> = [];
    
    nounLessons.forEach(lesson => {
      lesson.content.items.forEach(item => {
        if (item.georgian && item.phonetic) {
          allWords.push({ georgian: item.georgian, phonetic: item.phonetic });
        }
      });
    });
    
    // Shuffle and take 10 random words
    const shuffled = [...allWords].sort(() => 0.5 - Math.random());
    setWords(shuffled.slice(0, 10));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!words.length || currentRound >= words.length) return;
    
    const currentWord = words[currentRound];
    const isCorrect = userInput.trim().toLowerCase() === currentWord.phonetic.toLowerCase();
    
    setFeedback(isCorrect ? "correct" : "incorrect");
    
    if (isCorrect) {
      setScore(score + 1);
    }
    
    setTimeout(() => {
      setFeedback(null);
      setUserInput("");
      
      if (currentRound < words.length - 1) {
        setCurrentRound(currentRound + 1);
      } else {
        // Quiz completed
        const finalScore = Math.round(((score + (isCorrect ? 1 : 0)) / words.length) * 100);
        setCompleted(true);
        
        // Update progress
        updateProgress({
          lessonId: lesson.id,
          completed: true,
          score: finalScore,
          completedAt: Date.now()
        });
      }
    }, 1500);
  };

  if (words.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (completed) {
    const finalScore = Math.round((score / words.length) * 100);
    
    return (
      <div className="text-center space-y-6">
        <h2 className="text-2xl font-bold mb-4">{lesson.title}</h2>
        <div className="text-5xl mb-4">🎉</div>
        <h3 className="text-xl font-bold">Challenge Completed!</h3>
        <p className="text-gray-600">
          You scored {score} out of {words.length} ({finalScore}%)
        </p>
        <button
          onClick={() => {
            setCurrentRound(0);
            setScore(0);
            setCompleted(false);
            setUserInput("");
            setFeedback(null);
          }}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  const currentWord = words[currentRound];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">{lesson.title}</h2>
      <p className="text-gray-600 mb-6">{lesson.content.description}</p>
      
      <div className="bg-gray-50 p-6 rounded-lg border">
        <div className="text-center mb-6">
          <p className="text-sm text-gray-500 mb-2">Round {currentRound + 1} of {words.length}</p>
          <div className="text-5xl mb-4">{currentWord.georgian}</div>
          <p className="text-gray-600">Type the phonetic transcription of this Georgian word</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className={`w-full p-3 border rounded-md ${
                feedback === "correct"
                  ? "border-green-500 bg-green-50"
                  : feedback === "incorrect"
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300"
              }`}
              placeholder="Type the phonetic transcription..."
              disabled={feedback !== null}
              autoFocus
            />
            {feedback === "correct" && (
              <p className="text-green-600 mt-2">Correct! ✓</p>
            )}
            {feedback === "incorrect" && (
              <p className="text-red-600 mt-2">
                Incorrect. The correct phonetic transcription is: {currentWord.phonetic}
              </p>
            )}
          </div>
          
          {feedback === null && (
            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Submit
            </button>
          )}
        </form>
        
        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-500">Progress</span>
            <span className="text-sm text-gray-500">
              {score} / {words.length} correct
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-600 rounded-full"
              style={{ width: `${(currentRound / words.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}