// Re-export everything from the lessons directory
// This ensures backward compatibility with existing imports

// Re-export the types
export type { Lesson, LessonType } from './lessons/types';

// Re-export the lesson data and helper functions
export { lessons, getLessonsByType, getLessonById } from './lessons/index';