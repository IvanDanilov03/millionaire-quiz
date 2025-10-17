import { fireEvent, render, screen } from '@testing-library/react';
import Game from 'modules/Game/components/Game';
import { IntroScreen } from 'modules/Game/components/IntroScreen';
import { ResultScreen } from 'modules/Game/components/ResultScreen';
import { useGameEngine } from 'modules/Game/hooks/useGameEngine';
import {
  GameStage,
  type GameQuestion,
  type GameState,
} from 'modules/Game/types';

jest.mock('modules/Game/hooks/useGameEngine');

type EngineSnapshot = ReturnType<typeof useGameEngine>;

const mockedUseGameEngine = useGameEngine as jest.MockedFunction<
  typeof useGameEngine
>;

const baseState: GameState = {
  stage: GameStage.Intro,
  currentQuestionIndex: 0,
  selectedAnswerIds: [],
  earnedReward: 0,
  isAnswerRevealed: false,
  isLastAnswerCorrect: null,
};

interface EngineOverrides {
  state?: Partial<GameState>;
  currentQuestion?: GameQuestion;
  correctAnswerIds?: string[];
  allowsMultipleAnswers?: boolean;
  canSubmit?: boolean;
  progress?: EngineSnapshot['progress'];
  startGame?: EngineSnapshot['startGame'];
  toggleAnswer?: EngineSnapshot['toggleAnswer'];
  submitAnswer?: EngineSnapshot['submitAnswer'];
  tryAgain?: EngineSnapshot['tryAgain'];
}

const createEngineSnapshot = (
  overrides: EngineOverrides = {},
): EngineSnapshot => {
  const {
    state: stateOverrides,
    currentQuestion,
    correctAnswerIds = [],
    allowsMultipleAnswers = false,
    canSubmit = false,
    progress = [],
    startGame = jest.fn(),
    toggleAnswer = jest.fn(),
    submitAnswer = jest.fn(),
    tryAgain = jest.fn(),
  } = overrides;

  return {
    state: {
      ...baseState,
      ...stateOverrides,
    },
    currentQuestion,
    correctAnswerIds,
    allowsMultipleAnswers,
    canSubmit,
    progress,
    startGame,
    toggleAnswer,
    submitAnswer,
    tryAgain,
  } as EngineSnapshot;
};

beforeEach(() => {
  mockedUseGameEngine.mockReset();
  jest.clearAllMocks();
});

describe('IntroScreen', () => {
  it('renders the call-to-action and triggers the start handler', () => {
    const onStart = jest.fn();
    render(<IntroScreen onStart={onStart} />);

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /who wants to be a millionaire/i,
      }),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /start/i }));
    expect(onStart).toHaveBeenCalledTimes(1);
  });
});

describe('ResultScreen', () => {
  it('shows the formatted reward and handles restart', () => {
    const onRestart = jest.fn();
    render(<ResultScreen reward={125_000} onRestart={onRestart} />);

    expect(
      screen.getByRole('heading', { level: 1, name: '$125,000 earned' }),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /try again/i }));
    expect(onRestart).toHaveBeenCalledTimes(1);
  });
});

describe('Game component', () => {
  it('renders the intro screen and forwards start events', () => {
    const startGame = jest.fn();
    mockedUseGameEngine.mockReturnValue(
      createEngineSnapshot({
        state: { stage: GameStage.Intro },
        startGame,
      }),
    );

    render(<Game />);

    fireEvent.click(screen.getByRole('button', { name: /start/i }));
    expect(startGame).toHaveBeenCalledTimes(1);
  });

  it('renders the result screen with the earned reward', () => {
    const tryAgain = jest.fn();
    mockedUseGameEngine.mockReturnValue(
      createEngineSnapshot({
        state: {
          stage: GameStage.Results,
          earnedReward: 500_000,
        },
        tryAgain,
      }),
    );

    render(<Game />);

    expect(
      screen.getByRole('heading', { level: 1, name: '$500,000 earned' }),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /try again/i }));
    expect(tryAgain).toHaveBeenCalledTimes(1);
  });

  it('returns null when no question data is available during play', () => {
    mockedUseGameEngine.mockReturnValue(
      createEngineSnapshot({
        state: { stage: GameStage.Question },
        currentQuestion: undefined,
      }),
    );

    const { container } = render(<Game />);
    expect(container.firstChild).toBeNull();
  });

  it('renders the question screen and wires up answer interactions', () => {
    const toggleAnswer = jest.fn();
    const question: GameQuestion = {
      id: 'q4',
      question: 'Which animals are mammals?',
      reward: 4000,
      answers: [
        { id: 'ans-1', label: 'Dolphin', isCorrect: true },
        { id: 'ans-2', label: 'Eagle', isCorrect: false },
      ],
    };

    mockedUseGameEngine.mockReturnValue(
      createEngineSnapshot({
        state: {
          stage: GameStage.Question,
          currentQuestionIndex: 3,
          selectedAnswerIds: ['ans-1'],
          earnedReward: 16_000,
          isAnswerRevealed: false,
        },
        currentQuestion: question,
        correctAnswerIds: ['ans-1', 'ans-3'],
        allowsMultipleAnswers: true,
        canSubmit: true,
        progress: [
          { id: 'q1', amount: 500, isCompleted: true, isCurrent: false },
          { id: 'q4', amount: 4000, isCompleted: false, isCurrent: true },
        ],
        toggleAnswer,
      }),
    );

    render(<Game />);

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /which animals are mammals/i,
      }),
    ).toBeInTheDocument();

    const selectedAnswer = screen.getByRole('button', { name: /dolphin/i });
    expect(selectedAnswer).toHaveAttribute('data-status', 'selected');

    const alternateAnswer = screen.getByRole('button', { name: /eagle/i });
    fireEvent.click(alternateAnswer);

    expect(toggleAnswer).toHaveBeenCalledWith('ans-2');
  });
});
