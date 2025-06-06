import { useState, useEffect } from "react";
import { UserProgress } from "../utils/localStorageUtils";
import { Lesson } from "../data/lessons";
import Quiz, { QuizResult } from "./Quiz";

interface FlashcardsLessonProps {
  lesson: Lesson;
  progress?: UserProgress;
  updateProgress: (progress: UserProgress) => void;
}

export function FlashcardsLesson({ lesson, progress, updateProgress }: FlashcardsLessonProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [fabOpen, setFabOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);

  const cards = lesson.content.items;
  const currentCard = cards[currentIndex];

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (quizStarted || quizCompleted || showAll || completed) return;
      
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        handlePrevious();
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        handleNext();
      } else if (e.key === ' ') {
        e.preventDefault();
        handleFlip();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        startQuiz();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentIndex, completed, quizStarted, quizCompleted, showAll]);

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

  const startQuiz = () => {
    setQuizStarted(true);
    setShowAll(false);
    setFabOpen(false);
  };

  const completeQuiz = (quizScore: number, results: QuizResult[]) => {
    setQuizCompleted(true);
    setScore(quizScore);
    setQuizResults(results);
    
    // Update progress
    updateProgress({
      lessonId: lesson.id,
      completed: true,
      score: quizScore,
      completedAt: Date.now()
    });
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

  if (quizStarted && !quizCompleted) {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-4">{lesson.title} - Quiz</h2>
        <Quiz 
          items={cards} 
          onComplete={completeQuiz} 
          questionLabel="What does this Georgian word or phrase mean?"
        />
      </div>
    );
  }

  if (quizCompleted) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold mb-4">{lesson.title}</h2>
        <div className="text-center mb-8">
          <div className="text-4xl mb-4">🎉</div>
          <h3 className="text-xl font-bold mb-2">Quiz Completed!</h3>
          <p className="text-gray-600 mb-4">
            Your score: {score}%
          </p>
        </div>
        
        {/* Detailed Results Report */}
        <div className="border rounded-lg overflow-hidden">
          <h4 className="bg-gray-50 p-4 font-medium border-b">Detailed Results</h4>
          <div className="divide-y">
            {quizResults.map((result, index) => (
              <div key={index} className={`p-4 ${result.isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium">{result.question}</p>
                    <p className="text-sm text-gray-600">{result.phonetic}</p>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    result.isCorrect 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {result.isCorrect ? 'Correct' : 'Incorrect'}
                  </div>
                </div>
                <div className="text-sm">
                  <p>
                    <span className="font-medium">Correct answer:</span>{' '}
                    <span className="text-green-700">{result.correctAnswer}</span>
                  </p>
                  {!result.isCorrect && (
                    <p>
                      <span className="font-medium">Your answer:</span>{' '}
                      <span className="text-red-700">{result.userAnswer}</span>
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-center mt-6">
          <button
            onClick={() => {
              setQuizStarted(false);
              setQuizCompleted(false);
            }}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Review Flashcards
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative space-y-6">
      <h2 className="text-2xl font-bold mb-4">{lesson.title}</h2>
      <p className="text-gray-600 mb-6">{lesson.content.description}</p>
      
      {/* Main Content Area */}
      {showAll ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {cards.map((card, index) => (
            <div key={index} className="border p-4 rounded-lg bg-gray-50">
              <div className="text-lg mb-2">{card.georgian}</div>
              <div className="text-sm">
                <div className="font-medium">{card.phonetic}</div>
                <div className="text-gray-500">{card.english}</div>
              </div>
              {card.category && (
                <div className="mt-2 text-xs bg-gray-200 inline-block px-2 py-1 rounded">
                  {card.category}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <>
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
          
          {/* Navigation Controls */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="p-3 rounded-full border bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              title="Previous card"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex items-center px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-600">
              {currentIndex + 1} of {cards.length}
            </div>
            <button
              onClick={handleNext}
              disabled={currentIndex === cards.length - 1}
              className="p-3 rounded-full border bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              title="Next card"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </>
      )}
      
      {/* Floating Action Button */}
      <div className="absolute bottom-6 right-6 z-50">
        {/* FAB Menu Items */}
        {fabOpen && (
          <div className="absolute bottom-16 right-0 space-y-2 animate-in slide-in-from-bottom-2 duration-200">
            <button
              onClick={() => {
                setShowAll(!showAll);
                setFabOpen(false);
              }}
              className="flex items-center gap-3 px-4 py-3 bg-white border rounded-full shadow-lg hover:shadow-xl transition-shadow text-sm whitespace-nowrap"
            >
              {showAll ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  Show One by One
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                  Show All Cards
                </>
              )}
            </button>
            <button
              onClick={startQuiz}
              className="flex items-center gap-3 px-4 py-3 bg-indigo-600 text-white rounded-full shadow-lg hover:shadow-xl transition-shadow text-sm whitespace-nowrap"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Start Quiz
            </button>
          </div>
        )}

        {/* Main FAB Button */}
        <button
          onClick={() => setFabOpen(!fabOpen)}
          className={`w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center ${
            fabOpen ? 'bg-gray-600 rotate-45' : 'bg-indigo-600'
          } text-white`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
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