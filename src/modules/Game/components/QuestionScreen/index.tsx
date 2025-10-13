import React, { FC } from 'react';

import menuIcon from 'assets/icons/menu-icon.svg';
import { useBreakpoints } from 'hooks/useBreakpoints';
import { getAssetUrlString } from 'modules/Game/helpers';
import { GameQuestion } from 'modules/Game/types';

import { IconButton } from 'ui/IconButton';
import { Image } from 'ui/Image';
import { Typography } from 'ui/Typography';

import {
  AnswerOptionGroup,
  MoneyLadderDrawer,
  MoneyLadderGroup,
  MoneyLadderHeader,
  type MoneyLadderStep,
} from './components';
import styles from './styles.module.css';

export interface QuestionScreenProps {
  question: GameQuestion;
  selectedAnswerIds: string[];
  correctAnswerIds: string[];
  allowsMultipleAnswers: boolean;
  canSubmit: boolean;
  isRevealed: boolean;
  progress: MoneyLadderStep[];
  onSelect: (answerId: string) => void;
  onSubmit: () => void;
  onOpenLadder: () => void;
  onCloseLadder: () => void;
  isLadderOpen: boolean;
}

export const QuestionScreen: FC<QuestionScreenProps> = ({
  question,
  selectedAnswerIds,
  correctAnswerIds,
  isRevealed,
  progress,
  onSelect,
  onOpenLadder,
  onCloseLadder,
  isLadderOpen,
}) => {
  const { isUpLaptop } = useBreakpoints();
  const isMobileDevice = !isUpLaptop;

  return (
    <section className={styles.root}>
      {isMobileDevice && (
        <header className={styles.mobileHeader}>
          <IconButton
            className={styles.menuButton}
            onClick={onOpenLadder}
            aria-label="Open prize ladder"
          >
            <Image
              src={getAssetUrlString(menuIcon)}
              alt=""
              width={24}
              height={24}
              aria-hidden
            />
          </IconButton>
        </header>
      )}

      <div className={styles.layout}>
        <div className={styles.questionPanel}>
          <div className={styles.contentArea}>
            <div className={styles.questionText}>
              <Typography
                variant="h2"
                component="h2"
                align={isUpLaptop ? 'left' : 'center'}
              >
                {question.question}
              </Typography>
            </div>

            <div className={styles.answers}>
              <AnswerOptionGroup
                answers={question.answers}
                selectedAnswerIds={selectedAnswerIds}
                correctAnswerIds={correctAnswerIds}
                isRevealed={isRevealed}
                isDisabled={isRevealed}
                onSelect={onSelect}
              />
            </div>
          </div>
        </div>

        {!isMobileDevice && (
          <aside className={styles.ladderPanel}>
            <MoneyLadderGroup items={progress} variant="desktop" />
          </aside>
        )}
      </div>

      {isMobileDevice && (
        <MoneyLadderDrawer isOpen={isLadderOpen} onClose={onCloseLadder}>
          <MoneyLadderHeader variant="mobile" onClose={onCloseLadder} />
          <MoneyLadderGroup items={progress} variant="mobile" />
        </MoneyLadderDrawer>
      )}
    </section>
  );
};

export default QuestionScreen;
