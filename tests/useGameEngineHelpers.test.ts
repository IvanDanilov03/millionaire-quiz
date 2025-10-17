import {
  areIdSetsEqualIgnoreOrder,
  createInitialState,
  gameEngineReducer,
  getNextSelectedAnswerIds,
  type GameEngineAction,
} from 'modules/Game/hooks/useGameEngineHelpers';
import { GameStage, type GameState } from 'modules/Game/types';

describe('createInitialState', () => {
  it('produces the expected baseline state snapshot', () => {
    const state = createInitialState();

    expect(state.stage).toBe(GameStage.Intro);
    expect(state.currentQuestionIndex).toBe(0);
    expect(state.selectedAnswerIds).toEqual([]);
    expect(state.earnedReward).toBe(0);
    expect(state.isAnswerRevealed).toBe(false);
    expect(state.isLastAnswerCorrect).toBeNull();
  });
});

describe('areIdSetsEqualIgnoreOrder', () => {
  it('treats arrays with identical members as equivalent regardless of order', () => {
    expect(areIdSetsEqualIgnoreOrder(['a', 'b', 'c'], ['c', 'b', 'a'])).toBe(
      true,
    );
  });

  it('accounts for duplicate identifiers when comparing', () => {
    expect(areIdSetsEqualIgnoreOrder(['x', 'x', 'y'], ['y', 'x', 'x'])).toBe(
      true,
    );
    expect(areIdSetsEqualIgnoreOrder(['x', 'y', 'y'], ['y', 'x', 'x'])).toBe(
      false,
    );
  });

  it('marks arrays with different lengths as mismatched', () => {
    expect(areIdSetsEqualIgnoreOrder(['a', 'b'], ['a'])).toBe(false);
  });
});

describe('getNextSelectedAnswerIds', () => {
  it('toggles a single answer when multiple selections are disabled', () => {
    const first = getNextSelectedAnswerIds([], 'answer-1', false);
    expect(first.nextSelectedAnswerIds).toEqual(['answer-1']);
    expect(first.isAlreadySelected).toBe(false);

    const second = getNextSelectedAnswerIds(['answer-1'], 'answer-1', false);
    expect(second.nextSelectedAnswerIds).toEqual([]);
    expect(second.isAlreadySelected).toBe(true);
  });

  it('accumulates selections when multiple answers are allowed', () => {
    const first = getNextSelectedAnswerIds([], 'answer-1', true);
    expect(first.nextSelectedAnswerIds).toEqual(['answer-1']);
    expect(first.isAlreadySelected).toBe(false);

    const second = getNextSelectedAnswerIds(['answer-1'], 'answer-2', true);
    expect(second.nextSelectedAnswerIds).toEqual(['answer-1', 'answer-2']);
    expect(second.isAlreadySelected).toBe(false);
  });
});

describe('gameEngineReducer', () => {
  const runReducerSequence = (
    initialState: GameState,
    actions: GameEngineAction[],
  ) =>
    actions.reduce<GameState>(
      (state, action) => gameEngineReducer(state, action),
      initialState,
    );

  it('moves from intro to the first question when the game starts', () => {
    const state = createInitialState();
    const next = gameEngineReducer(state, { type: 'START' });

    expect(next.stage).toBe(GameStage.Question);
    expect(next.currentQuestionIndex).toBe(0);
    expect(next.selectedAnswerIds).toEqual([]);
  });

  it('records revealed answers and rewards correctly', () => {
    const started = gameEngineReducer(createInitialState(), { type: 'START' });
    const revealed = gameEngineReducer(started, {
      type: 'REVEAL_ANSWER',
      isCorrect: true,
      rewardOnWin: 1000,
    });

    expect(revealed.isAnswerRevealed).toBe(true);
    expect(revealed.isLastAnswerCorrect).toBe(true);
    expect(revealed.earnedReward).toBe(1000);
  });

  it('advances to the next question and clears transient state', () => {
    const started = gameEngineReducer(createInitialState(), { type: 'START' });
    const revealed = gameEngineReducer(started, {
      type: 'REVEAL_ANSWER',
      isCorrect: true,
      rewardOnWin: 1000,
    });

    const advanced = gameEngineReducer(revealed, {
      type: 'NEXT_QUESTION',
      totalQuestions: 2,
    });

    expect(advanced.currentQuestionIndex).toBe(1);
    expect(advanced.stage).toBe(GameStage.Question);
    expect(advanced.selectedAnswerIds).toEqual([]);
    expect(advanced.isAnswerRevealed).toBe(false);
  });

  it('enters the results stage once the final question has been handled', () => {
    const started = gameEngineReducer(createInitialState(), { type: 'START' });

    const penultimate: GameState = {
      ...started,
      currentQuestionIndex: 1,
      selectedAnswerIds: [],
      earnedReward: 500_000,
      isAnswerRevealed: true,
      isLastAnswerCorrect: true,
    };

    const finalState = gameEngineReducer(penultimate, {
      type: 'NEXT_QUESTION',
      totalQuestions: 2,
    });

    expect(finalState.stage).toBe(GameStage.Results);
    expect(finalState.selectedAnswerIds).toEqual([]);
    expect(finalState.isAnswerRevealed).toBe(false);
    expect(finalState.isLastAnswerCorrect).toBeNull();
  });

  it('ignores answer toggles once the reveal phase begins', () => {
    const started = gameEngineReducer(createInitialState(), { type: 'START' });
    const revealed = gameEngineReducer(started, {
      type: 'REVEAL_ANSWER',
      isCorrect: false,
      rewardOnWin: 0,
    });

    const afterToggle = gameEngineReducer(revealed, {
      type: 'TOGGLE_ANSWER',
      answerId: 'ans-1',
      allowsMultipleAnswers: false,
    });

    expect(afterToggle.selectedAnswerIds).toEqual([]);
  });

  it('can reset selections explicitly', () => {
    const started = gameEngineReducer(createInitialState(), { type: 'START' });
    const withSelection = gameEngineReducer(started, {
      type: 'TOGGLE_ANSWER',
      answerId: 'ans-1',
      allowsMultipleAnswers: false,
    });

    const reset = gameEngineReducer(withSelection, {
      type: 'RESET_SELECTIONS',
    });
    expect(reset.selectedAnswerIds).toEqual([]);
  });

  it('supports a full happy path flow with multiple actions', () => {
    const finalState = runReducerSequence(createInitialState(), [
      { type: 'START' },
      {
        type: 'TOGGLE_ANSWER',
        answerId: 'ans-1',
        allowsMultipleAnswers: false,
      },
      { type: 'REVEAL_ANSWER', isCorrect: true, rewardOnWin: 1000 },
      { type: 'NEXT_QUESTION', totalQuestions: 2 },
      { type: 'SHOW_RESULTS' },
    ]);

    expect(finalState.stage).toBe(GameStage.Results);
    expect(finalState.earnedReward).toBe(1000);
    expect(finalState.currentQuestionIndex).toBe(1);
  });
});
