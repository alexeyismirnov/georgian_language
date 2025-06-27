import { useState, useEffect } from "react";
import { UserProgress } from "../utils/localStorageUtils";
import { Lesson } from "../data/lessons";
import PhrasesQuiz from "./PhrasesQuiz";

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
  const [quizResults, setQuizResults] = useState<Array<{
    question: string;
    phonetic: string;
    correctAnswer: string;
    userAnswer: string;
    isCorrect: boolean;
  }>>([]);
  const [fabOpen, setFabOpen] = useState(false);
  const [showKeyboardHint, setShowKeyboardHint] = useState(() => {
    // Check localStorage to see if user has dismissed the hint
    const dismissed = localStorage.getItem('keyboardHintDismissed');
    return dismissed !== 'true';
  });

  const phrases = lesson.content.items;
  const currentPhrase = phrases[currentIndex];

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (quizStarted || quizCompleted || showAll) return;
      
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        handlePrevious();
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        handleNext();
      } else if (e.key === ' ') {
        e.preventDefault();
        setShowAll(!showAll);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        startQuiz();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentIndex, phrases.length, quizStarted, quizCompleted, showAll]);

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
    setFabOpen(false);
  };

  const dismissKeyboardHint = () => {
    setShowKeyboardHint(false);
    localStorage.setItem('keyboardHintDismissed', 'true');
  };

  const completeQuiz = (quizScore: number, results: Array<{
    question: string;
    phonetic: string;
    correctAnswer: string;
    userAnswer: string;
    isCorrect: boolean;
  }>) => {
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

  return (
    <div className="relative">
      <h2 className="text-2xl font-bold mb-4">{lesson.title}</h2>
      <p className="text-gray-600 mb-6">{lesson.content.description}</p>

      {/* Keyboard shortcuts hint */}
      {!quizStarted && !quizCompleted && !showAll && showKeyboardHint && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg relative">
          <button
            onClick={dismissKeyboardHint}
            className="absolute top-2 right-2 text-blue-400 hover:text-blue-600 transition-colors"
            title="Dismiss hint"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <p className="text-sm text-blue-700 pr-6">
            💡 <strong>Keyboard shortcuts:</strong> Use ← → arrow keys to navigate, Space to toggle view, Enter to start quiz
          </p>
        </div>
      )}

      {!quizStarted && !quizCompleted && (
        <div className="space-y-6">
          {/* Main Content Area */}
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
              
              <div className="flex justify-center mb-8">
                <div className="w-full max-w-md flex justify-between items-center">
                  {/* Navigation Controls - Left Side */}
                  <div className="flex gap-4">
                    <button
                      onClick={handlePrevious}
                      disabled={currentIndex === 0}
                      className="p-3 rounded-full border bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                      title="Previous phrase"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <div className="flex items-center px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-600">
                      {currentIndex + 1} of {phrases.length}
                    </div>
                    <button
                      onClick={handleNext}
                      disabled={currentIndex === phrases.length - 1}
                      className="p-3 rounded-full border bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                      title="Next phrase"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>

                  <div className="w-8"></div>
                  
                  {/* FAB - Right Side */}
                  <div className="relative">
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
                              Show All Phrases
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
                </div>
              </div>
            </div>
          )}

        </div>
      )}

      {quizStarted && !quizCompleted && (
        <PhrasesQuiz 
          phrases={phrases} 
          onComplete={completeQuiz} 
        />
      )}

      {quizCompleted && (
        <div className="space-y-6">
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
              Review Phrases
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PhrasesLesson;