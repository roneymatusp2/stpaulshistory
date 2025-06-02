import { Question } from '../../types/game';
import { atomicStructureQuestions } from './atomic-structure';
import { chemicalBondingQuestions } from './chemical-bonding';
import { periodicTrendsQuestions } from './periodic-trends';

// Combine all questions
export const questions: Question[] = [
  ...atomicStructureQuestions,
  ...chemicalBondingQuestions,
  ...periodicTrendsQuestions,
];

// Helper function to get random questions
export const getRandomQuestions = (count: number): Question[] => {
  const shuffled = [...questions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Helper function to get questions by difficulty
export const getQuestionsByDifficulty = (difficulty: 'easy' | 'medium' | 'hard'): Question[] => {
  return questions.filter(q => q.difficulty === difficulty);
};