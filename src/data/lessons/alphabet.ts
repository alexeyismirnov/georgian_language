import type { Lesson } from './types';

// Define all alphabet lessons
export const alphabetLessons: Lesson[] = [
  {
    id: "alphabet-basics",
    title: "Georgian Alphabet Basics",
    type: "alphabet",
    order: 1,
    content: {
      description: "Learn the first 10 letters of the Georgian alphabet",
      items: [
        { georgian: "ა", phonetic: "a", english: "a as in 'father'" },
        { georgian: "ბ", phonetic: "b", english: "b as in 'boy'" },
        { georgian: "გ", phonetic: "g", english: "g as in 'go'" },
        { georgian: "დ", phonetic: "d", english: "d as in 'dog'" },
        { georgian: "ე", phonetic: "e", english: "e as in 'bed'" },
        { georgian: "ვ", phonetic: "v", english: "v as in 'very'" },
        { georgian: "ზ", phonetic: "z", english: "z as in 'zoo'" },
        { georgian: "თ", phonetic: "t'", english: "aspirated t" },
        { georgian: "ი", phonetic: "i", english: "i as in 'machine'" },
        { georgian: "კ", phonetic: "k'", english: "aspirated k" },
      ],
    },
  },
  {
    id: "alphabet-intermediate",
    title: "Georgian Alphabet Intermediate",
    type: "alphabet",
    order: 2,
    content: {
      description: "Learn the next 10 letters of the Georgian alphabet",
      items: [
        { georgian: "ლ", phonetic: "l", english: "l as in 'love'" },
        { georgian: "მ", phonetic: "m", english: "m as in 'mother'" },
        { georgian: "ნ", phonetic: "n", english: "n as in 'no'" },
        { georgian: "ო", phonetic: "o", english: "o as in 'more'" },
        { georgian: "პ", phonetic: "p'", english: "aspirated p" },
        { georgian: "ჟ", phonetic: "zh", english: "zh as in 'pleasure'" },
        { georgian: "რ", phonetic: "r", english: "rolled r" },
        { georgian: "ს", phonetic: "s", english: "s as in 'see'" },
        { georgian: "ტ", phonetic: "t'", english: "aspirated t" },
        { georgian: "უ", phonetic: "u", english: "u as in 'rule'" },
      ],
    },
  },
  {
    id: "alphabet-advanced",
    title: "Georgian Alphabet Advanced",
    type: "alphabet",
    order: 3,
    content: {
      description: "Learn the remaining letters of the Georgian alphabet",
      items: [
        { georgian: "ფ", phonetic: "p", english: "p as in 'spot'" },
        { georgian: "ქ", phonetic: "k", english: "k as in 'skin'" },
        { georgian: "ღ", phonetic: "gh", english: "guttural g" },
        { georgian: "ყ", phonetic: "q'", english: "glottalized k" },
        { georgian: "შ", phonetic: "sh", english: "sh as in 'shoe'" },
        { georgian: "ჩ", phonetic: "ch", english: "ch as in 'church'" },
        { georgian: "ც", phonetic: "ts", english: "ts as in 'cats'" },
        { georgian: "ძ", phonetic: "dz", english: "dz as in 'adze'" },
        { georgian: "წ", phonetic: "ts'", english: "ejective ts" },
        { georgian: "ჭ", phonetic: "ch'", english: "ejective ch" },
        { georgian: "ხ", phonetic: "kh", english: "kh as in German 'ach'" },
        { georgian: "ჯ", phonetic: "j", english: "j as in 'judge'" },
        { georgian: "ჰ", phonetic: "h", english: "h as in 'house'" },
      ],
    },
  },
  // Spelling Bee lesson
  {
    id: "spelling-bee-1",
    title: "Spelling Bee Challenge",
    type: "spelling",
    order: 4,
    content: {
      description: "Test your Georgian reading skills by providing the phonetic transcription of Georgian words",
      items: [], // Will be populated dynamically from noun words
    },
  },
];