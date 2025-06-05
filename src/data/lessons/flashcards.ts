import type { Lesson } from './types';

// Define all flashcard lessons
export const flashcardLessons: Lesson[] = [
  // NOUNS FIRST
  {
    id: "flashcards-nouns-places",
    title: "Nouns - Places",
    type: "flashcards",
    order: 1,
    content: {
      description: "Learn common Georgian nouns for places and locations",
      items: [
        { georgian: "მუზეუმი", phonetic: "muzeumi", english: "museum", category: "places" },
        { georgian: "რესტორანი", phonetic: "restorani", english: "restaurant", category: "places" },
        { georgian: "სასტუმრო", phonetic: "sastumro", english: "hotel", category: "places" },
        { georgian: "ბანკი", phonetic: "banki", english: "bank", category: "places" },
        { georgian: "ფარმაცია", phonetic: "pharmacia", english: "pharmacy", category: "places" },
        { georgian: "ბაზარი", phonetic: "bazari", english: "market", category: "places" },
        { georgian: "ეკლესია", phonetic: "eklesia", english: "church", category: "places" },
        { georgian: "სკოლა", phonetic: "skola", english: "school", category: "places" },
        { georgian: "ბიბლიოთეკა", phonetic: "biblioteka", english: "library", category: "places" },
        { georgian: "პარკი", phonetic: "parki", english: "park", category: "places" },
      ],
    },
  },
  {
    id: "flashcards-nouns-food",
    title: "Nouns - Food & Drinks",
    type: "flashcards",
    order: 2,
    content: {
      description: "Learn Georgian words for food and beverages",
      items: [
        { georgian: "პური", phonetic: "puri", english: "bread", category: "food" },
        { georgian: "წყალი", phonetic: "ts'q'ali", english: "water", category: "drinks" },
        { georgian: "ღვინო", phonetic: "ghvino", english: "wine", category: "drinks" },
        { georgian: "ხაჭაპური", phonetic: "khachapuri", english: "cheese bread", category: "food" },
        { georgian: "ხინკალი", phonetic: "khinkali", english: "dumpling", category: "food" },
        { georgian: "ყავა", phonetic: "q'ava", english: "coffee", category: "drinks" },
        { georgian: "ჩაი", phonetic: "chai", english: "tea", category: "drinks" },
        { georgian: "ხორცი", phonetic: "khortsi", english: "meat", category: "food" },
        { georgian: "ყველი", phonetic: "q'veli", english: "cheese", category: "food" },
        { georgian: "ხილი", phonetic: "khili", english: "fruit", category: "food" },
      ],
    },
  },
  {
    id: "flashcards-nouns-family",
    title: "Nouns - Family",
    type: "flashcards",
    order: 3,
    content: {
      description: "Learn Georgian words for family members",
      items: [
        { georgian: "დედა", phonetic: "deda", english: "mother", category: "family" },
        { georgian: "მამა", phonetic: "mama", english: "father", category: "family" },
        { georgian: "ძმა", phonetic: "dzma", english: "brother", category: "family" },
        { georgian: "და", phonetic: "da", english: "sister", category: "family" },
        { georgian: "შვილი", phonetic: "shvili", english: "child", category: "family" },
        { georgian: "ბებია", phonetic: "bebia", english: "grandmother", category: "family" },
        { georgian: "ბაბუა", phonetic: "babua", english: "grandfather", category: "family" },
        { georgian: "ცოლი", phonetic: "tsoli", english: "wife", category: "family" },
        { georgian: "ქმარი", phonetic: "qmari", english: "husband", category: "family" },
        { georgian: "ოჯახი", phonetic: "ojahi", english: "family", category: "family" },
      ],
    },
  },
  {
    id: "flashcards-nouns-body",
    title: "Nouns - Body Parts",
    type: "flashcards",
    order: 4,
    content: {
      description: "Learn Georgian words for body parts",
      items: [
        { georgian: "თავი", phonetic: "tavi", english: "head", category: "body" },
        { georgian: "ხელი", phonetic: "kheli", english: "hand", category: "body" },
        { georgian: "ფეხი", phonetic: "pekhi", english: "foot", category: "body" },
        { georgian: "თვალი", phonetic: "tvali", english: "eye", category: "body" },
        { georgian: "ყური", phonetic: "q'uri", english: "ear", category: "body" },
        { georgian: "ცხვირი", phonetic: "tskhviri", english: "nose", category: "body" },
        { georgian: "პირი", phonetic: "piri", english: "mouth", category: "body" },
        { georgian: "კბილი", phonetic: "kbili", english: "tooth", category: "body" },
        { georgian: "ენა", phonetic: "ena", english: "tongue", category: "body" },
        { georgian: "გული", phonetic: "guli", english: "heart", category: "body" },
      ],
    },
  },
  {
    id: "flashcards-nouns-objects",
    title: "Nouns - Common Objects",
    type: "flashcards",
    order: 5,
    content: {
      description: "Learn Georgian words for everyday objects",
      items: [
        { georgian: "წიგნი", phonetic: "ts'igni", english: "book", category: "objects" },
        { georgian: "მაგიდა", phonetic: "magida", english: "table", category: "objects" },
        { georgian: "კომპიუტერი", phonetic: "k'ompiuteri", english: "computer", category: "objects" },
        { georgian: "ტელეფონი", phonetic: "teleponi", english: "phone", category: "objects" },
        { georgian: "ჭიქა", phonetic: "ch'iq'a", english: "cup", category: "objects" },
        { georgian: "კალამი", phonetic: "k'alami", english: "pen", category: "objects" },
        { georgian: "ქაღალდი", phonetic: "q'aghaldi", english: "paper", category: "objects" },
        { georgian: "სკამი", phonetic: "sk'ami", english: "chair", category: "objects" },
        { georgian: "ფანჯარა", phonetic: "panjara", english: "window", category: "objects" },
        { georgian: "კარი", phonetic: "k'ari", english: "door", category: "objects" },
      ],
    },
  },
  // NEW PRONOUNS LESSON
  {
    id: "flashcards-pronouns",
    title: "Pronouns",
    type: "flashcards",
    order: 6,
    content: {
      description: "Learn essential Georgian pronouns for everyday communication",
      items: [
        // Personal pronouns - singular
        { georgian: "მე", phonetic: "me", english: "I", category: "personal" },
        { georgian: "შენ", phonetic: "shen", english: "you (singular/informal)", category: "personal" },
        { georgian: "ის", phonetic: "is", english: "he/she/it", category: "personal" },
        
        // Personal pronouns - plural
        { georgian: "ჩვენ", phonetic: "chven", english: "we", category: "personal" },
        { georgian: "თქვენ", phonetic: "tkven", english: "you (plural/formal)", category: "personal" },
        { georgian: "ისინი", phonetic: "isini", english: "they", category: "personal" },
        
        // Possessive pronouns
        { georgian: "ჩემი", phonetic: "chemi", english: "my/mine", category: "possessive" },
        { georgian: "შენი", phonetic: "sheni", english: "your/yours (singular)", category: "possessive" },
        { georgian: "მისი", phonetic: "misi", english: "his/her/its", category: "possessive" },
        { georgian: "ჩვენი", phonetic: "chveni", english: "our/ours", category: "possessive" },
        { georgian: "თქვენი", phonetic: "tkveni", english: "your/yours (plural)", category: "possessive" },
        { georgian: "მათი", phonetic: "mati", english: "their/theirs", category: "possessive" },
        
        // Demonstrative pronouns
        { georgian: "ეს", phonetic: "es", english: "this", category: "demonstrative" },
        { georgian: "ის", phonetic: "is", english: "that", category: "demonstrative" },
        { georgian: "ესენი", phonetic: "eseni", english: "these", category: "demonstrative" },
        { georgian: "ისინი", phonetic: "isini", english: "those", category: "demonstrative" },
        
        // Interrogative pronouns
        { georgian: "ვინ", phonetic: "vin", english: "who", category: "interrogative" },
        { georgian: "რა", phonetic: "ra", english: "what", category: "interrogative" },
        { georgian: "რომელი", phonetic: "romeli", english: "which", category: "interrogative" },
        { georgian: "რამდენი", phonetic: "ramdeni", english: "how many/how much", category: "interrogative" },
        
        // Reflexive pronouns
        { georgian: "თავი", phonetic: "tavi", english: "self/myself/yourself/etc.", category: "reflexive" },
      ],
    },
  },
  // ADJECTIVES
  {
    id: "flashcards-adjectives",
    title: "Descriptive Adjectives",
    type: "flashcards",
    order: 7,
    content: {
      description: "Practice common Georgian adjectives",
      items: [
        { georgian: "კარგი", phonetic: "kargi", english: "good", category: "adjectives" },
        { georgian: "ცუდი", phonetic: "tsudi", english: "bad", category: "adjectives" },
        { georgian: "დიდი", phonetic: "didi", english: "big", category: "adjectives" },
        { georgian: "პატარა", phonetic: "patara", english: "small", category: "adjectives" },
        { georgian: "ახალი", phonetic: "akhali", english: "new", category: "adjectives" },
        { georgian: "ძველი", phonetic: "dzveli", english: "old", category: "adjectives" },
        { georgian: "ლამაზი", phonetic: "lamazi", english: "beautiful", category: "adjectives" },
        { georgian: "ცივი", phonetic: "tsivi", english: "cold", category: "adjectives" },
        { georgian: "ცხელი", phonetic: "tskheli", english: "hot", category: "adjectives" },
        { georgian: "ძვირი", phonetic: "dzviri", english: "expensive", category: "adjectives" },
        { georgian: "იაფი", phonetic: "iapi", english: "cheap", category: "adjectives" },
        { georgian: "ღია", phonetic: "ghia", english: "open", category: "adjectives" },
      ],
    },
  },
  // VERBS
  {
    id: "flashcards-verbs",
    title: "Common Verbs",
    type: "flashcards",
    order: 8,
    content: {
      description: "Practice essential Georgian verbs",
      items: [
        { georgian: "ვარ", phonetic: "var", english: "I am", category: "verbs" },
        { georgian: "მინდა", phonetic: "minda", english: "I want", category: "verbs" },
        { georgian: "მიყვარს", phonetic: "miq'vars", english: "I love/like", category: "verbs" },
        { georgian: "ვიცი", phonetic: "vitsi", english: "I know", category: "verbs" },
        { georgian: "ვხედავ", phonetic: "vkhedav", english: "I see", category: "verbs" },
        { georgian: "ვსმევ", phonetic: "vsmev", english: "I drink", category: "verbs" },
        { georgian: "ვჭამ", phonetic: "vcham", english: "I eat", category: "verbs" },
        { georgian: "ვდივარ", phonetic: "vdivar", english: "I go", category: "verbs" },
        { georgian: "ვმუშაობ", phonetic: "vmushaob", english: "I work", category: "verbs" },
        { georgian: "ვცხოვრობ", phonetic: "vtskhrovrob", english: "I live", category: "verbs" },
        { georgian: "ვსწავლობ", phonetic: "vsts'avlob", english: "I study", category: "verbs" },
        { georgian: "ვლაპარაკობ", phonetic: "vlaparakob", english: "I speak", category: "verbs" },
      ],
    },
  },
  // NUMBERS
  {
    id: "flashcards-numbers-basic",
    title: "Numbers 1-10",
    type: "flashcards",
    order: 9,
    content: {
      description: "Learn basic Georgian numbers from 1 to 10",
      items: [
        { georgian: "ერთი", phonetic: "erti", english: "one (1)", category: "numbers" },
        { georgian: "ორი", phonetic: "ori", english: "two (2)", category: "numbers" },
        { georgian: "სამი", phonetic: "sami", english: "three (3)", category: "numbers" },
        { georgian: "ოთხი", phonetic: "otkhi", english: "four (4)", category: "numbers" },
        { georgian: "ხუთი", phonetic: "khuti", english: "five (5)", category: "numbers" },
        { georgian: "ექვსი", phonetic: "ekvsi", english: "six (6)", category: "numbers" },
        { georgian: "შვიდი", phonetic: "shvidi", english: "seven (7)", category: "numbers" },
        { georgian: "რვა", phonetic: "rva", english: "eight (8)", category: "numbers" },
        { georgian: "ცხრა", phonetic: "tskhra", english: "nine (9)", category: "numbers" },
        { georgian: "ათი", phonetic: "ati", english: "ten (10)", category: "numbers" },
      ],
    },
  },
  {
    id: "flashcards-numbers-advanced",
    title: "Larger Numbers & Ordinals",
    type: "flashcards",
    order: 10,
    content: {
      description: "Practice larger numbers, ordinals, and number-related expressions",
      items: [
        // Larger numbers
        { georgian: "ოცი", phonetic: "otsi", english: "twenty (20)", category: "large numbers" },
        { georgian: "ოცდაათი", phonetic: "otsdaati", english: "thirty (30)", category: "large numbers" },
        { georgian: "ორმოცი", phonetic: "ormotsi", english: "forty (40)", category: "large numbers" },
        { georgian: "ორმოცდაათი", phonetic: "ormotsadaati", english: "fifty (50)", category: "large numbers" },
        { georgian: "სამოცი", phonetic: "samotsi", english: "sixty (60)", category: "large numbers" },
        { georgian: "ასი", phonetic: "asi", english: "one hundred (100)", category: "large numbers" },
        { georgian: "ათასი", phonetic: "atasi", english: "one thousand (1000)", category: "large numbers" },
        { georgian: "მილიონი", phonetic: "milioni", english: "one million", category: "large numbers" },
        // Ordinal numbers
        { georgian: "პირველი", phonetic: "pirveli", english: "first (1st)", category: "ordinals" },
        { georgian: "მეორე", phonetic: "meore", english: "second (2nd)", category: "ordinals" },
        { georgian: "მესამე", phonetic: "mesame", english: "third (3rd)", category: "ordinals" },
        { georgian: "მეოთხე", phonetic: "meotkhe", english: "fourth (4th)", category: "ordinals" },
        { georgian: "მეხუთე", phonetic: "mekhute", english: "fifth (5th)", category: "ordinals" },
        { georgian: "მეექვსე", phonetic: "meekvse", english: "sixth (6th)", category: "ordinals" },
        { georgian: "მეშვიდე", phonetic: "meshvide", english: "seventh (7th)", category: "ordinals" },
        { georgian: "მერვე", phonetic: "merve", english: "eighth (8th)", category: "ordinals" },
        { georgian: "მეცხრე", phonetic: "metskre", english: "ninth (9th)", category: "ordinals" },
        { georgian: "მეათე", phonetic: "meate", english: "tenth (10th)", category: "ordinals" },
        // Number expressions
        { georgian: "ნული", phonetic: "nuli", english: "zero (0)", category: "special" },
        { georgian: "ნახევარი", phonetic: "nakhevari", english: "half", category: "fractions" },
        { georgian: "მეოთხედი", phonetic: "meotkedi", english: "quarter", category: "fractions" },
      ],
    },
  },
];