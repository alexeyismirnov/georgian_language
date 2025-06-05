import { Lesson } from "../data/lessons";
import { UserProgress } from "../utils/localStorageUtils";
interface ProgressTrackerProps {
  alphabetLessons: Lesson[];
  phraseLessons: Lesson[];
  grammarLessons: Lesson[];
  flashcardLessons: Lesson[];
  userProgress: UserProgress[];
}

export function ProgressTracker({
  alphabetLessons,
  phraseLessons,
  grammarLessons,
  flashcardLessons,
  userProgress,
}: ProgressTrackerProps) {
  const calculateProgress = (lessons: Lesson[]) => {
    if (!lessons.length) return 0;
    
    const completedLessons = lessons.filter(lesson => 
      userProgress.some(p => p.lessonId === lesson.id && p.completed)
    );
    
    return Math.round((completedLessons.length / lessons.length) * 100);
  };

  const alphabetProgress = calculateProgress(alphabetLessons);
  const phrasesProgress = calculateProgress(phraseLessons);
  const grammarProgress = calculateProgress(grammarLessons);
  const flashcardsProgress = calculateProgress(flashcardLessons);

  const totalLessons = alphabetLessons.length + phraseLessons.length + 
                       grammarLessons.length + flashcardLessons.length;
  
  const completedLessons = userProgress.filter(p => p.completed).length;
  
  const overallProgress = totalLessons ? Math.round((completedLessons / totalLessons) * 100) : 0;
  return (
    <div className="bg-white rounded-lg shadow-sm border p-4">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Your Progress</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <ProgressCard 
          title="Overall" 
          icon="📊" 
          progress={overallProgress} 
          completed={completedLessons}
          total={totalLessons}
        />
        <ProgressCard 
          title="Alphabet" 
          icon="📝" 
          progress={alphabetProgress}
          completed={alphabetLessons.filter(l => userProgress.some(p => p.lessonId === l.id && p.completed)).length}
          total={alphabetLessons.length}
        />
        <ProgressCard 
          title="Flashcards" 
          icon="🃏" 
          progress={flashcardsProgress}
          completed={flashcardLessons.filter(l => userProgress.some(p => p.lessonId === l.id && p.completed)).length}
          total={flashcardLessons.length}
        />
        <ProgressCard 
          title="Phrases" 
          icon="💬" 
          progress={phrasesProgress}
          completed={phraseLessons.filter(l => userProgress.some(p => p.lessonId === l.id && p.completed)).length}
          total={phraseLessons.length}
        />
        <ProgressCard 
          title="Grammar" 
          icon="📚" 
          progress={grammarProgress}
          completed={grammarLessons.filter(l => userProgress.some(p => p.lessonId === l.id && p.completed)).length}
          total={grammarLessons.length}
        />
            </div>
            </div>
  );
}

function ProgressCard({ 
  title, 
  icon, 
  progress, 
  completed, 
  total 
}: { 
  title: string; 
  icon: string; 
  progress: number;
  completed: number;
  total: number;
}) {
  return (
    <div className="bg-gray-50 rounded-lg p-3 border">
      <div className="flex justify-between items-center mb-2">
        <div className="font-medium text-gray-700">{title}</div>
        <div className="text-xl">{icon}</div>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
        <div 
          className="h-full bg-indigo-600 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="text-xs text-gray-500">
        {completed} of {total} lessons completed ({progress}%)
      </div>
    </div>
  );
}