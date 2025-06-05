// Import types and lesson data
import type { Lesson, LessonType } from './types';
import { alphabetLessons } from './alphabet';
import { flashcardLessons } from './flashcards';
import { phraseLessons } from './phrases';
import { grammarLessons } from './grammar';

// Combine all lessons into a single array
export const lessons: Lesson[] = [
  ...alphabetLessons,
  ...flashcardLessons,
  ...phraseLessons,
  ...grammarLessons,
];

// Helper functions to get lessons by type
export function getLessonsByType(type: LessonType): Lesson[] {
  return lessons.filter(lesson => lesson.type === type).sort((a, b) => a.order - b.order);
}

// Helper function to get a specific lesson by ID
export function getLessonById(id: string): Lesson | undefined {
  return lessons.find(lesson => lesson.id === id);
}

// Re-export types
export type { Lesson, LessonType } from './types';