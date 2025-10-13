import { FC, useEffect, useState } from 'react';

import { IntroScreen } from 'modules/Game/components/IntroScreen';
import { QuestionScreenLayout } from 'modules/Game/components/QuestionScreen/QuestionScreenLayout';
import { ResultScreen } from 'modules/Game/components/ResultScreen';
import { useGameEngine } from 'modules/Game/hooks/useGameEngine';
import { GameStage } from 'modules/Game/types';

export const Game: FC = () => {
  const {
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
  } = useGameEngine();

  const [isLadderOpen, setIsLadderOpen] = useState(false);

  useEffect(() => {
    if (state.stage !== GameStage.Question) {
      setIsLadderOpen(false);
    }
  }, [state.stage]);

  if (state.stage === GameStage.Intro) {
    return <IntroScreen onStart={startGame} />;
  }

  if (state.stage === GameStage.Results) {
    return <ResultScreen reward={state.earnedReward} onRestart={tryAgain} />;
  }

  if (!currentQuestion) {
    return null;
  }

  return (
    <QuestionScreenLayout
      question={currentQuestion}
      selectedAnswerIds={state.selectedAnswerIds}
      correctAnswerIds={correctAnswerIds}
      allowsMultipleAnswers={allowsMultipleAnswers}
      canSubmit={canSubmit}
      isRevealed={state.isAnswerRevealed}
      progress={progress}
      onSelect={toggleAnswer}
      onSubmit={submitAnswer}
      onOpenLadder={() => setIsLadderOpen(true)}
      onCloseLadder={() => setIsLadderOpen(false)}
      isLadderOpen={isLadderOpen}
    />
  );
};

export default Game;
