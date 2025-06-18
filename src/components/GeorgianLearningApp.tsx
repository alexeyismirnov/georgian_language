import { useState, useEffect } from "react";
import { AlphabetLesson } from "./AlphabetLesson";
import { PhrasesLesson } from "./PhrasesLesson";
import { FlashcardsLesson } from "./FlashcardsLesson";
import { GrammarLesson } from "./GrammarLesson";
import { SpellingBeeLesson } from "./SpellingBeeLesson";
import { ProgressTracker } from "./ProgressTracker";
import { getUserProgress, getLessonProgress, updateLessonProgress, UserProgress } from "../utils/localStorageUtils";
import { getLessonsByType, Lesson } from "../data/lessons";

export function GeorgianLearningApp() {
  const [activeTab, setActiveTab] = useState<"alphabet" | "phrases" | "grammar" | "flashcards">("alphabet");
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgress[]>([]);
  
  // Get lessons from local data
  const alphabetLessons = getLessonsByType("alphabet");
  const spellingLessons = getLessonsByType("spelling");
  const phraseLessons = getLessonsByType("phrases");
  const grammarLessons = getLessonsByType("grammar");
  const flashcardLessons = getLessonsByType("flashcards");
  // Load user progress from local storage
  useEffect(() => {
    const progress = getUserProgress();
    setUserProgress(progress);
  }, []);

  const getCurrentLessons = (): Lesson[] => {
    switch (activeTab) {
      case "alphabet": 
        return [...alphabetLessons, ...spellingLessons];
      case "phrases": return phraseLessons;
      case "grammar": return grammarLessons;
      case "flashcards": return flashcardLessons;
      default: return alphabetLessons;
    }
  };

  const currentLessons = getCurrentLessons();
  const selectedLesson = currentLessons?.find(lesson => lesson.id === selectedLessonId);

  const getProgressForLesson = (lessonId: string) => {
    return userProgress.find(p => p.lessonId === lessonId);
  };

  // Function to update lesson progress
  const updateProgress = (progress: UserProgress) => {
    updateLessonProgress(progress);
    setUserProgress(getUserProgress());
  };

  const tabConfig = {
    alphabet: { icon: "📝", label: "Alphabet & Reading" },
    flashcards: { icon: "🃏", label: "Flashcards" },
    phrases: { icon: "💬", label: "Travel Phrases" },
    grammar: { icon: "📚", label: "Grammar" },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center justify-center">
          <span className="mr-2">🇬🇪</span>
          Georgian Language Learning
        </h1>
        <p className="text-gray-600">
          Master the Georgian alphabet, vocabulary, phrases, and grammar
        </p>
      </div>

      {/* Progress Overview */}
      <ProgressTracker 
        alphabetLessons={[...alphabetLessons, ...spellingLessons]}
        phraseLessons={phraseLessons}
        grammarLessons={grammarLessons}
        flashcardLessons={flashcardLessons}
        userProgress={userProgress}
      />

      {/* Tab Navigation */}
      <div className="flex justify-center">
        <div className="bg-white rounded-lg p-1 shadow-sm border">
          {Object.entries(tabConfig).map(([key, config]) => (
            <button
              key={key}
              onClick={() => {
                setActiveTab(key as any);
                setSelectedLessonId(null);
              }}
              className={`px-4 py-2 rounded-md font-medium transition-colors text-sm ${
                activeTab === key
                  ? "bg-indigo-600 text-white"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              {config.icon} {config.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        {selectedLesson ? (
          <div>
            <button
              onClick={() => setSelectedLessonId(null)}
              className="mb-4 text-indigo-600 hover:text-indigo-800 font-medium"
            >
              ← Back to lessons
            </button>
            
            {selectedLesson.type === "alphabet" && (
              <AlphabetLesson 
                lesson={selectedLesson}
                progress={getProgressForLesson(selectedLesson.id)}
                updateProgress={updateProgress}
              />
            )}
            {selectedLesson.type === "spelling" && (
              <SpellingBeeLesson 
                lesson={selectedLesson}
                progress={getProgressForLesson(selectedLesson.id)}
                updateProgress={updateProgress}
              />
            )}
            {selectedLesson.type === "phrases" && (
              <PhrasesLesson 
                lesson={selectedLesson}
                progress={getProgressForLesson(selectedLesson.id)}
                updateProgress={updateProgress}
              />
            )}
            {selectedLesson.type === "flashcards" && (
              <FlashcardsLesson 
                lesson={selectedLesson}
                progress={getProgressForLesson(selectedLesson.id)}
                updateProgress={updateProgress}
              />
            )}
            {selectedLesson.type === "grammar" && (
              <GrammarLesson 
                lesson={selectedLesson}
                progress={getProgressForLesson(selectedLesson.id)}
                updateProgress={updateProgress}
              />
            )}
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              {tabConfig[activeTab].label}
            </h2>
            <p className="text-gray-600 mb-6">
              {activeTab === "alphabet" && "Learn the Georgian alphabet step by step with pronunciation guides and interactive spelling challenges"}
              {activeTab === "flashcards" && "Practice with interactive flashcards for quick memorization"}
              {activeTab === "phrases" && "Master essential phrases for traveling in Georgia"}
              {activeTab === "grammar" && "Understand Georgian grammar rules and sentence structure"}
            </p>
            
            <div className="grid gap-4 md:grid-cols-2">
              {currentLessons.map((lesson) => {
                const progress = getProgressForLesson(lesson.id);
                const isCompleted = progress?.completed || false;
                
                return (
                  <div
                    key={lesson.id}
                    onClick={() => setSelectedLessonId(lesson.id)}
                    className="p-4 border rounded-lg cursor-pointer hover:shadow-md transition-shadow bg-gray-50 hover:bg-gray-100"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-800">{lesson.title}</h3>
                      {isCompleted && (
                        <span className="text-green-600 text-xl">✓</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      {lesson.content.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">
                        {lesson.type === "alphabet" && "📝 Alphabet"}
                        {lesson.type === "spelling" && "🐝 Spelling Bee"}
                        {lesson.type === "phrases" && "💬 Phrases"}
                        {lesson.type === "flashcards" && "🃏 Flashcards"}
                        {lesson.type === "grammar" && "📚 Grammar"}
                      </span>
                      {progress?.score && (
                        <span className="text-xs text-indigo-600 font-medium">
                          {progress.score}%
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}