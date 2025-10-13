export interface AnswerOption {
  id: string;
  label: string;
  isCorrect: boolean;
}

export interface GameQuestion {
  id: string;
  question: string;
  answers: AnswerOption[];
  reward: number;
}

export type GameConfig = GameQuestion[];

export enum GameStage {
  Intro = 'intro',
  Question = 'question',
  Results = 'results',
}

export interface GameState {
  stage: GameStage;
  currentQuestionIndex: number;
  selectedAnswerIds: string[];
  earnedReward: number;
  isAnswerRevealed: boolean;
  isLastAnswerCorrect: boolean | null;
}

export interface EvaluatedAnswer {
  isCorrect: boolean;
  correctAnswerIds: string[];
}
