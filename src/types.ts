export type DistanceType = 'near' | 'far';
export type QuantityType = 'singular' | 'plural';

export interface VocabItem {
  id: string;
  word: string; // singular word, e.g. "apple"
  pluralWord: string; // "apples"
  article: 'a' | 'an'; // "an apple", "a book"
  chinese: string; // "苹果"
  pluralChinese: string; // "苹果（复数）"
  emoji: string; // 🍎
  category: 'fruit' | 'animal' | 'stationery' | 'nature' | 'object';
  soundHint: string; // 辅音或元音发音提示
}

export interface GrammarRule {
  key: 'this' | 'that' | 'these' | 'those';
  distance: DistanceType;
  quantity: QuantityType;
  questionEn: string;
  questionCn: string;
  answerPatternEn: string;
  answerPatternCn: string;
  distanceLabel: string;
  quantityLabel: string;
  pronoun: string;
  beVerb: string;
  exampleQuestion: string;
  exampleAnswer: string;
  colorScheme: {
    bg: string;
    border: string;
    text: string;
    badge: string;
  };
}

export interface QuizQuestion {
  id: string;
  distance: DistanceType;
  quantity: QuantityType;
  item: VocabItem;
  count: number; // 1 or 2..4
  questionPrompt: string; // e.g. "What's this?"
  correctAnswer: string; // e.g. "It's an apple."
  options: string[]; // 4 options
  explanation: string;
}

export interface SentenceTile {
  id: string;
  text: string;
  role: 'wh' | 'be' | 'demonstrative' | 'pronoun' | 'article' | 'noun' | 'punct';
}

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  requiredStars: number;
}
