import { QuizResult } from "./Quiz";
import Quiz from "./Quiz";

interface PhrasesQuizProps {
  phrases: Array<{ georgian: string; phonetic: string; english: string }>;
  onComplete: (score: number, results: QuizResult[]) => void;
}

export function PhrasesQuiz({ phrases, onComplete }: PhrasesQuizProps) {
  return (
    <Quiz 
      items={phrases} 
      onComplete={onComplete} 
      questionLabel="What does this Georgian phrase mean?"
    />
  );
}

export default PhrasesQuiz;