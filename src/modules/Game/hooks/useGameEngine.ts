import { useCallback, useEffect, useMemo, useReducer, useRef } from 'react';

import { gameConfig } from 'modules/Game/constants';
import { GameConfig, GameQuestion, GameStage } from 'modules/Game/types';

import {
  areIdSetsEqualIgnoreOrder,
  createInitialState,
  gameEngineReducer,
  getNextSelectedAnswerIds,
} from './useGameEngineHelpers';

export interface UseGameEngineOptions {
  config?: GameConfig;
  autoAdvanceDelay?: number;
  autoFailDelay?: number;
}

export const useGameEngine = ({
  config = gameConfig,
  autoAdvanceDelay = 1200,
  autoFailDelay = 1400,
}: UseGameEngineOptions = {}) => {
  const [state, dispatch] = useReducer(
    gameEngineReducer,
    undefined,
    createInitialState,
  );

  // Robust timeout ref for browsers & SSR type-compat
  const timeoutReference = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearScheduledTimeout = useCallback(() => {
    if (timeoutReference.current) {
      clearTimeout(timeoutReference.current);
      timeoutReference.current = null;
    }
  }, []);

  const scheduleWithTimeout = useCallback(
    (callback: () => void, milliseconds: number) => {
      clearScheduledTimeout();
      timeoutReference.current = setTimeout(() => {
        timeoutReference.current = null;
        callback();
      }, milliseconds);
    },
    [clearScheduledTimeout],
  );

  useEffect(() => clearScheduledTimeout, [clearScheduledTimeout]);

  const currentQuestion: GameQuestion | undefined =
    config[state.currentQuestionIndex];

  const correctAnswerIds = useMemo(() => {
    if (!currentQuestion) return [];
    return currentQuestion.answers
      .filter((answer) => answer.isCorrect)
      .map((answer) => answer.id);
  }, [currentQuestion]);

  const allowsMultipleAnswers = correctAnswerIds.length > 1;

  const startGame = useCallback(() => {
    clearScheduledTimeout();
    dispatch({ type: 'START' });
  }, [clearScheduledTimeout]);

  const showResults = useCallback(() => {
    dispatch({ type: 'SHOW_RESULTS' });
  }, []);

  const goToNextQuestion = useCallback(() => {
    dispatch({ type: 'NEXT_QUESTION', totalQuestions: config.length });
  }, [config.length]);

  const evaluateAnswer = useCallback(
    (question: GameQuestion, selectedIds: string[]) => {
      const questionCorrectIds = question.answers
        .filter((answer) => answer.isCorrect)
        .map((answer) => answer.id);

      const isCorrect = areIdSetsEqualIgnoreOrder(
        selectedIds,
        questionCorrectIds,
      );

      dispatch({
        type: 'REVEAL_ANSWER',
        isCorrect,
        rewardOnWin: question.reward,
      });

      const isLastQuestion = state.currentQuestionIndex === config.length - 1;

      if (isCorrect) {
        scheduleWithTimeout(() => {
          if (isLastQuestion) {
            showResults();
          } else {
            goToNextQuestion();
          }
        }, autoAdvanceDelay);
      } else {
        scheduleWithTimeout(showResults, autoFailDelay);
      }
    },
    [
      scheduleWithTimeout,
      showResults,
      goToNextQuestion,
      autoAdvanceDelay,
      autoFailDelay,
      config.length,
      state.currentQuestionIndex,
    ],
  );

  const toggleAnswer = useCallback(
    (answerId: string) => {
      if (!currentQuestion || state.isAnswerRevealed) {
        return;
      }

      const { nextSelectedAnswerIds, isAlreadySelected } =
        getNextSelectedAnswerIds(
          state.selectedAnswerIds,
          answerId,
          allowsMultipleAnswers,
        );

      dispatch({
        type: 'TOGGLE_ANSWER',
        answerId,
        allowsMultipleAnswers,
      });

      if (!allowsMultipleAnswers) {
        if (!isAlreadySelected) {
          evaluateAnswer(currentQuestion, [answerId]);
        }
        return;
      }

      if (isAlreadySelected) {
        return;
      }

      const isIncorrectSelection = !correctAnswerIds.includes(answerId);
      if (isIncorrectSelection) {
        evaluateAnswer(currentQuestion, nextSelectedAnswerIds);
        return;
      }

      if (areIdSetsEqualIgnoreOrder(nextSelectedAnswerIds, correctAnswerIds)) {
        evaluateAnswer(currentQuestion, nextSelectedAnswerIds);
      }
    },
    [
      currentQuestion,
      allowsMultipleAnswers,
      evaluateAnswer,
      state.selectedAnswerIds,
      state.isAnswerRevealed,
      correctAnswerIds,
    ],
  );

  const submitAnswer = useCallback(() => {
    if (
      !currentQuestion ||
      state.isAnswerRevealed ||
      state.selectedAnswerIds.length === 0
    ) {
      return;
    }
    evaluateAnswer(currentQuestion, state.selectedAnswerIds);
  }, [
    currentQuestion,
    evaluateAnswer,
    state.isAnswerRevealed,
    state.selectedAnswerIds,
  ]);

  const tryAgain = useCallback(() => {
    startGame();
  }, [startGame]);

  const progress = useMemo(
    () =>
      config.map((questionItem, questionIndex) => ({
        id: questionItem.id,
        amount: questionItem.reward,
        isCompleted: state.earnedReward >= questionItem.reward,
        isCurrent:
          questionIndex === state.currentQuestionIndex &&
          state.stage === GameStage.Question,
      })),
    [config, state.earnedReward, state.currentQuestionIndex, state.stage],
  );

  const canSubmit =
    allowsMultipleAnswers &&
    state.selectedAnswerIds.length > 0 &&
    !state.isAnswerRevealed;

  return {
    state,
    currentQuestion,
    correctAnswerIds,
    allowsMultipleAnswers,
    canSubmit,
    progress,
    startGame,
    toggleAnswer,
    submitAnswer,
    tryAgain,
  };
};
