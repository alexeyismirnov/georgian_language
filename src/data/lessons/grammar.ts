import type { Lesson } from './types';

// Define all grammar lessons
export const grammarLessons: Lesson[] = [
  {
    id: "grammar-basics",
    title: "Basic Grammar Rules",
    type: "grammar",
    order: 1,
    content: {
      description: "Fundamental Georgian grammar concepts",
      items: [],
      grammarRules: [
        {
          rule: "Word Order",
          explanation: "Georgian typically follows Subject-Object-Verb (SOV) order, unlike English which is Subject-Verb-Object (SVO).",
          examples: [
            { georgian: "მე წიგნს ვკითხულობ", phonetic: "me ts'igns vk'itkhulob", english: "I read a book (literally: I book read)" },
            { georgian: "ის საქართველოში ცხოვრობს", phonetic: "is sakartvelos tskhrovrobs", english: "He/she lives in Georgia" },
          ],
        },
        {
          rule: "No Articles",
          explanation: "Georgian doesn't have articles like 'a', 'an', or 'the'. Context determines definiteness.",
          examples: [
            { georgian: "კაცი", phonetic: "k'atsi", english: "man / a man / the man" },
            { georgian: "ქალი", phonetic: "kali", english: "woman / a woman / the woman" },
          ],
        },
        {
          rule: "Verb Conjugation",
          explanation: "Georgian verbs change their endings based on the subject. The verb 'to be' is often omitted in present tense.",
          examples: [
            { georgian: "მე ვარ", phonetic: "me var", english: "I am" },
            { georgian: "შენ ხარ", phonetic: "shen khar", english: "You are" },
            { georgian: "ის არის", phonetic: "is aris", english: "He/she is" },
          ],
        },
      ],
    },
  },
  {
    id: "grammar-cases",
    title: "Noun Cases",
    type: "grammar",
    order: 2,
    content: {
      description: "Understanding Georgian noun cases and their usage",
      items: [],
      grammarRules: [
        {
          rule: "Nominative Case",
          explanation: "The subject of the sentence. This is the basic form of the noun.",
          examples: [
            { georgian: "კაცი მიდის", phonetic: "k'atsi midis", english: "The man goes" },
            { georgian: "ქალი მუშაობს", phonetic: "kali mushaobs", english: "The woman works" },
          ],
        },
        {
          rule: "Ergative Case",
          explanation: "Used for the subject of transitive verbs in past tense. Marked with -მა (-ma).",
          examples: [
            { georgian: "კაცმა წიგნი წაიკითხა", phonetic: "k'atsma ts'igni ts'aik'itkha", english: "The man read the book" },
            { georgian: "ქალმა საუზმე მოამზადა", phonetic: "kalma sauzme moamzada", english: "The woman prepared breakfast" },
          ],
        },
        {
          rule: "Dative Case",
          explanation: "Used for indirect objects and with certain verbs. Marked with -ს (-s).",
          examples: [
            { georgian: "მე მას წიგნი მივეცი", phonetic: "me mas ts'igni mivets'i", english: "I gave him/her a book" },
            { georgian: "ბავშვს სწავლა უყვარს", phonetic: "bavshvs sts'avla uq'vars", english: "The child likes studying" },
          ],
        },
      ],
    },
  },
  {
    id: "grammar-questions",
    title: "Asking Questions",
    type: "grammar",
    order: 3,
    content: {
      description: "Learn how to form questions in Georgian and master common question words",
      items: [],
      grammarRules: [
        {
          rule: "Question Word Order",
          explanation: "In Georgian, question words typically come at the beginning of the sentence, followed by the rest of the sentence in normal SOV order.",
          examples: [
            { georgian: "რა არის ეს?", phonetic: "ra aris es?", english: "What is this?" },
            { georgian: "სად მიდიხარ?", phonetic: "sad midikhar?", english: "Where are you going?" },
            { georgian: "როდის მოხვალ?", phonetic: "rodis mokhval?", english: "When will you come?" },
          ],
        },
        {
          rule: "Yes/No Questions",
          explanation: "Yes/No questions in Georgian often use rising intonation and can be formed by adding question particles or simply changing intonation.",
          examples: [
            { georgian: "შენ სტუდენტი ხარ?", phonetic: "shen studenti khar?", english: "Are you a student?" },
            { georgian: "ის სახლშია?", phonetic: "is sakhlshia?", english: "Is he/she at home?" },
            { georgian: "გინდა ყავა?", phonetic: "ginda q'ava?", english: "Do you want coffee?" },
          ],
        },
        // Other grammar rules...
      ],
    },
  },
  {
    id: "grammar-tenses",
    title: "Tenses: Past, Present, Future",
    type: "grammar",
    order: 4,
    content: {
      description: "Understanding how Georgian verbs express different tenses and their impact on sentence structure",
      items: [],
      grammarRules: [
        {
          rule: "Present Tense",
          explanation: "Georgian present tense is formed with specific verb endings. The verb often comes at the end of the sentence, and the subject is indicated by the verb ending.",
          examples: [
            { georgian: "მე ვმუშაობ", phonetic: "me vmushaob", english: "I work/am working" },
            { georgian: "შენ მუშაობ", phonetic: "shen mushaob", english: "You work/are working" },
            { georgian: "ის მუშაობს", phonetic: "is mushaobs", english: "He/she works/is working" },
          ],
        },
        {
          rule: "Past Tense (Aorist)",
          explanation: "Georgian past tense often uses the aorist form. Notice how the subject marking changes - the subject takes the ergative case (-მა) for transitive verbs.",
          examples: [
            { georgian: "მე ვიმუშავე", phonetic: "me vimushave", english: "I worked" },
            { georgian: "მან წიგნი წაიკითხა", phonetic: "man ts'igni ts'aik'itkha", english: "He/she read a book" },
            { georgian: "ჩვენ ვისაუბრეთ", phonetic: "chven visaubret", english: "We talked" },
          ],
        },
        {
          rule: "Future Tense",
          explanation: "Georgian future tense is formed by adding specific prefixes and suffixes to the verb stem. The structure remains SOV (Subject-Object-Verb).",
          examples: [
            { georgian: "მე ვიმუშავებ", phonetic: "me vimushaveb", english: "I will work" },
            { georgian: "ის წაიკითხავს წიგნს", phonetic: "is ts'aik'itkhavs ts'igns", english: "He/she will read a book" },
            { georgian: "ჩვენ ვისაუბრებთ", phonetic: "chven visaubrebt", english: "We will talk" },
          ],
        },
      ],
    },
  },
];