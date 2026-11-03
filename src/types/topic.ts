export type Category =
  | 'Essay'
  | 'Speaking'
  | 'Debate'
  | 'Storytelling'
  | 'Journal'
  | 'Opinion'
  | 'Creative Writing'
  | 'Daily Conversation';

export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export type TopicStyle =
  | 'Interesting'
  | 'Deep'
  | 'Practical'
  | 'Creative'
  | 'Challenging'
  | 'Random';

export interface VocabularyItem {
  word: string;
  meaning: string;
  example?: string;
}

export interface PracticeTask {
  type: 'writing' | 'speaking' | 'debate';
  description: string;
  timeOrWordTarget: string;
}

export interface CoverTheme {
  accentColor: string;
  paperColor: string;
  inkColor: string;
  pattern: 'minimal-lines' | 'concentric' | 'geometric-arch' | 'zen-circle' | 'horizon' | 'editorial-grid';
  romanNumeral?: string;
  kanji?: string;
  japaneseSub?: string;
}

export interface Topic {
  id: string;
  title: string;
  category: Category;
  difficulty: Difficulty;
  style: TopicStyle;
  subject: string;
  coverTheme: CoverTheme;
  mainQuestion: string;
  guidingQuestions: string[];
  vocabulary: VocabularyItem[];
  task: PracticeTask;
  isAiGenerated?: boolean;
}

export interface GeneratorOptions {
  category: string; // 'Any' | Category
  difficulty: Difficulty;
  style: TopicStyle;
  subject?: string;
}
