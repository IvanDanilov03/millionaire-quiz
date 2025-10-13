import { GameStage, type GameState } from 'modules/Game/types';

export const createInitialState = (): GameState => ({
  stage: GameStage.Intro,
  currentQuestionIndex: 0,
  selectedAnswerIds: [],
  earnedReward: 0,
  isAnswerRevealed: false,
  isLastAnswerCorrect: null,
});
