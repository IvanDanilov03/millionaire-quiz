import { FC, memo } from 'react';

import {
  AnswerOption,
  type AnswerOptionStatus,
} from 'modules/Game/components/QuestionScreen/components/AnswerOption';
import { ANSWER_LETTERS } from 'modules/Game/constants';

import styles from './styles.module.css';

export interface Answer {
  id: string;
  label: string;
}

export interface AnswerOptionGroupProps {
  answers: Answer[];
  selectedAnswerIds: string[];
  correctAnswerIds: string[];
  isRevealed: boolean;
  isDisabled?: boolean;
  onSelect: (id: string) => void;
}

export const AnswerOptionGroup: FC<AnswerOptionGroupProps> = memo(
  ({
    answers,
    selectedAnswerIds,
    correctAnswerIds,
    isRevealed,
    isDisabled = false,
    onSelect,
  }) => {
    const getStatus = (id: string): AnswerOptionStatus => {
      if (isRevealed) {
        if (correctAnswerIds.includes(id)) return 'correct';
        if (selectedAnswerIds.includes(id)) return 'incorrect';
        return 'default';
      }
      return selectedAnswerIds.includes(id) ? 'selected' : 'default';
    };

    return (
      <div className={styles.root} role="group" aria-label="Answer options">
        {answers.map((answer, index) => (
          <AnswerOption
            key={answer.id}
            letter={ANSWER_LETTERS[index] ?? ''}
            label={answer.label}
            status={getStatus(answer.id)}
            isDisabled={isDisabled || isRevealed}
            onClick={() => onSelect(answer.id)}
          />
        ))}
      </div>
    );
  },
);

export default AnswerOptionGroup;
