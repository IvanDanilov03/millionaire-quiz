import { Reducer } from 'react';

import { GameStage, type GameState } from 'modules/Game/types';

import { getNextSelectedAnswerIds } from './selection';

export type GameEngineAction =
  | { type: 'START' }
  | { type: 'NEXT_QUESTION'; totalQuestions: number }
  | { type: 'SHOW_RESULTS' }
  | { type: 'REVEAL_ANSWER'; isCorrect: boolean; rewardOnWin: number }
  | { type: 'TOGGLE_ANSWER'; answerId: string; allowsMultipleAnswers: boolean }
  | { type: 'RESET_SELECTIONS' };

export const gameEngineReducer: Reducer<GameState, GameEngineAction> = (
  state: GameState,
  action: GameEngineAction,
): GameState => {
  switch (action.type) {
    case 'START': {
      return {
        stage: GameStage.Question,
        currentQuestionIndex: 0,
        selectedAnswerIds: [],
        earnedReward: 0,
        isAnswerRevealed: false,
        isLastAnswerCorrect: null,
      };
    }

    case 'NEXT_QUESTION': {
      const nextQuestionIndex = state.currentQuestionIndex + 1;
      if (nextQuestionIndex >= action.totalQuestions) {
        return {
          ...state,
          stage: GameStage.Results,
          selectedAnswerIds: [],
          isAnswerRevealed: false,
          isLastAnswerCorrect: null,
        };
      }
      return {
        ...state,
        stage: GameStage.Question,
        currentQuestionIndex: nextQuestionIndex,
        selectedAnswerIds: [],
        isAnswerRevealed: false,
        isLastAnswerCorrect: null,
      };
    }

    case 'SHOW_RESULTS': {
      return { ...state, stage: GameStage.Results };
    }

    case 'REVEAL_ANSWER': {
      return {
        ...state,
        isAnswerRevealed: true,
        isLastAnswerCorrect: action.isCorrect,
        earnedReward: action.isCorrect
          ? action.rewardOnWin
          : state.earnedReward,
      };
    }

    case 'TOGGLE_ANSWER': {
      if (state.stage !== GameStage.Question || state.isAnswerRevealed) {
        return state;
      }
      const { nextSelectedAnswerIds } = getNextSelectedAnswerIds(
        state.selectedAnswerIds,
        action.answerId,
        action.allowsMultipleAnswers,
      );

      return {
        ...state,
        selectedAnswerIds: nextSelectedAnswerIds,
      };
    }

    case 'RESET_SELECTIONS': {
      return { ...state, selectedAnswerIds: [] };
    }

    default: {
      return state;
    }
  }
};
