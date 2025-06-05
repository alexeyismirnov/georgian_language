// Define types for lessons
export type LessonType = "alphabet" | "spelling" | "phrases" | "grammar" | "flashcards";

export interface Lesson {
  id: string;
  title: string;
  type: LessonType;
  order: number;
  content: {
    description: string;
    items: Array<{
      georgian: string;
      phonetic: string;
      english: string;
      category?: string;
    }>;
    grammarRules?: Array<{
      rule: string;
      explanation: string;
      examples: Array<{
        georgian: string;
        phonetic: string;
        english: string;
      }>;
    }>;
  };
}