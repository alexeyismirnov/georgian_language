import type { Lesson } from './types';

// Define all phrase lessons
export const phraseLessons: Lesson[] = [
  {
    id: "phrases-greetings",
    title: "Greetings & Basic Courtesy",
    type: "phrases",
    order: 1,
    content: {
      description: "Essential greetings and polite expressions",
      items: [
        { georgian: "გამარჯობა", phonetic: "gamarjoba", english: "Hello" },
        { georgian: "ნახვამდის", phonetic: "nakhvamdis", english: "Goodbye" },
        { georgian: "მადლობა", phonetic: "madloba", english: "Thank you" },
        { georgian: "ბოდიში", phonetic: "bodishi", english: "Sorry/Excuse me" },
        { georgian: "კარგად", phonetic: "kargad", english: "Good/Well" },
        { georgian: "როგორ ხარ?", phonetic: "rogor khar?", english: "How are you?" },
        { georgian: "კარგად ვარ", phonetic: "kargad var", english: "I'm fine" },
        { georgian: "სახელი რა გქვია?", phonetic: "sakheli ra gkvia?", english: "What's your name?" },
      ],
    },
  },
  {
    id: "phrases-directions",
    title: "Directions & Places",
    type: "phrases",
    order: 2,
    content: {
      description: "Ask for directions and find important places",
      items: [
        { georgian: "სად არის მუზეუმი?", phonetic: "sad aris muzeumi?", english: "Where is the museum?" },
        { georgian: "სად არის ავტობუსის გაჩერება?", phonetic: "sad aris avtobusის gachereba?", english: "Where is the bus station?" },
        { georgian: "სად არის რესტორანი?", phonetic: "sad aris restorani?", english: "Where is the restaurant?" },
        { georgian: "სად არის სასტუმრო?", phonetic: "sad aris sastumro?", english: "Where is the hotel?" },
        { georgian: "მარჯვნივ", phonetic: "marjvniv", english: "Right" },
        { georgian: "მარცხნივ", phonetic: "martsxniv", english: "Left" },
        { georgian: "პირდაპირ", phonetic: "pirdapir", english: "Straight" },
        { georgian: "ახლოს", phonetic: "akhlos", english: "Near" },
        { georgian: "შორს", phonetic: "shors", english: "Far" },
      ],
    },
  },
  {
    id: "phrases-food",
    title: "Food & Dining",
    type: "phrases",
    order: 3,
    content: {
      description: "Essential phrases for restaurants and food",
      items: [
        { georgian: "მინდა", phonetic: "minda", english: "I want" },
        { georgian: "წყალი", phonetic: "ts'q'ali", english: "Water" },
        { georgian: "პური", phonetic: "puri", english: "Bread" },
        { georgian: "ღია", phonetic: "ghia", english: "Open" },
        { georgian: "დახურული", phonetic: "dakhuruli", english: "Closed" },
        { georgian: "ანგარიში", phonetic: "angarishi", english: "Bill/Check" },
        { georgian: "გემრიელია", phonetic: "gemrielia", english: "It's delicious" },
        { georgian: "რამდენი ღირს?", phonetic: "ramdeni ghirs?", english: "How much does it cost?" },
      ],
    },
  },
  {
    id: "phrases-shopping",
    title: "Shopping & Services",
    type: "phrases",
    order: 4,
    content: {
      description: "Essential phrases for shopping and services",
      items: [
        { georgian: "სად არის ბანკი?", phonetic: "sad aris banki?", english: "Where is the bank?" },
        { georgian: "სად არის ფარმაცია?", phonetic: "sad aris pharmacia?", english: "Where is the pharmacy?" },
        { georgian: "სად არის ბაზარი?", phonetic: "sad aris bazari?", english: "Where is the market?" },
        { georgian: "რამდენი ღირს ეს?", phonetic: "ramdeni ghirs es?", english: "How much does this cost?" },
        { georgian: "ძვირია", phonetic: "dzviria", english: "It's expensive" },
        { georgian: "იაფია", phonetic: "iafia", english: "It's cheap" },
        { georgian: "მომეცით ეს", phonetic: "mometsit es", english: "Give me this" },
        { georgian: "არ მინდა", phonetic: "ar minda", english: "I don't want" },
      ],
    },
  },
];