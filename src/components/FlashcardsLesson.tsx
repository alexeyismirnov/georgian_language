import { useState } from "react";
import { UserProgress } from "../utils/localStorageUtils";
import { Lesson } from "../data/lessons";

interface FlashcardsLessonProps {
  lesson: Lesson;
  progress?: UserProgress;
  updateProgress: (progress: UserProgress) => void;
}

export function FlashcardsLesson({ lesson, progress, updateProgress }: FlashcardsLessonProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [completed, setCompleted] = useState(false);

  const cards = lesson.content.items;
  const currentCard = cards[currentIndex];

  const handleNext = () => {
    setFlipped(false);
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Completed all cards
      setCompleted(true);
      
      // Update progress
      updateProgress({
        lessonId: lesson.id,
        completed: true,
        score: 100, // Flashcards don't have a score, so we set it to 100
        completedAt: Date.now()
      });
    }
  };

  const handlePrevious = () => {
    setFlipped(false);
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setFlipped(false);
    setCompleted(false);
  };

  if (completed) {
    return (
      <div className="text-center space-y-6">
        <h2 className="text-2xl font-bold mb-4">{lesson.title}</h2>
        <div className="text-5xl mb-4">🎉</div>
        <h3 className="text-xl font-bold">Flashcards Completed!</h3>
        <p className="text-gray-600 mb-6">
          You've gone through all {cards.length} flashcards.
        </p>
        <button
          onClick={handleRestart}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Start Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">{lesson.title}</h2>
      <p className="text-gray-600 mb-6">{lesson.content.description}</p>
      
      <div className="flex justify-center mb-8">
        <div className="flashcard-container w-full max-w-md h-64">
          <div 
            className={`flashcard ${flipped ? 'flipped' : ''}`}
            onClick={handleFlip}
          >
            {/* Front of card */}
            <div className="flashcard-face front">
              <div className="text-4xl mb-4">{currentCard.georgian}</div>
              <div className="text-gray-600">{currentCard.phonetic}</div>
              {currentCard.category && (
                <div className="absolute top-2 right-2 text-xs bg-gray-100 px-2 py-1 rounded">
                  {currentCard.category}
                </div>
              )}
              <div className="absolute bottom-2 text-xs text-gray-400">
                Click to flip
              </div>
            </div>
            
            {/* Back of card */}
            <div className="flashcard-face back">
              <div className="text-2xl mb-2">{currentCard.english}</div>
              <div className="text-gray-600 text-center">
                {currentCard.phonetic} - {currentCard.georgian}
              </div>
              <div className="absolute bottom-2 text-xs text-gray-400">
                Click to flip back
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="px-4 py-2 border rounded-md disabled:opacity-50"
        >
          Previous
        </button>
        
        <div className="text-sm text-gray-600">
          Card {currentIndex + 1} of {cards.length}
        </div>
        
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          {currentIndex < cards.length - 1 ? "Next" : "Complete"}
        </button>
      </div>
      
      <div className="flex justify-center gap-1 mt-4">
        {cards.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentIndex ? "bg-indigo-600" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
      
      <style jsx>{`
        .flashcard-container {
          perspective: 1000px;
        }
        
        .flashcard {
          position: relative;
          width: 100%;
          height: 100%;
          cursor: pointer;
          transform-style: preserve-3d;
          transition: transform 0.6s;
        }
        
        .flashcard.flipped {
          transform: rotateY(180deg);
        }
        
        .flashcard-face {
          position: absolute;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          border-radius: 0.5rem;
          border: 1px solid #e5e7eb;
          backface-visibility: hidden;
        }
        
        .front {
          background-color: white;
        }
        
        .back {
          background-color: #eef2ff;
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
}