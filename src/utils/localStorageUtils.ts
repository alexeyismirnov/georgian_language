// User progress type definition
export interface UserProgress {
  lessonId: string;
  completed: boolean;
  score?: number;
  completedAt?: number;
}

const STORAGE_KEY = 'georgian-app-progress';

// Get all user progress from local storage
export const getUserProgress = (): UserProgress[] => {
  const progressData = localStorage.getItem(STORAGE_KEY);
  if (!progressData) return [];
  
  try {
    return JSON.parse(progressData);
  } catch (error) {
    console.error('Error parsing progress data from local storage:', error);
    return [];
  }
};

// Get progress for a specific lesson
export const getLessonProgress = (lessonId: string): UserProgress | undefined => {
  const allProgress = getUserProgress();
  return allProgress.find(progress => progress.lessonId === lessonId);
};

// Update progress for a specific lesson
export const updateLessonProgress = (progress: UserProgress): void => {
  const allProgress = getUserProgress();
  const existingIndex = allProgress.findIndex(p => p.lessonId === progress.lessonId);
  
  if (existingIndex >= 0) {
    allProgress[existingIndex] = progress;
  } else {
    allProgress.push(progress);
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(allProgress));
};

// Clear all progress data (for testing purposes)
export const clearAllProgress = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};