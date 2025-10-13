import { FC, memo, useMemo } from 'react';

import { useBreakpoints } from 'hooks/useBreakpoints';
import classNames from 'utils/classNames';

import Typography from 'ui/Typography';

import styles from './styles.module.css';

export type AnswerOptionStatus =
  | 'default'
  | 'selected'
  | 'correct'
  | 'incorrect';

export interface AnswerOptionProps {
  letter: string;
  label: string;
  isDisabled?: boolean;
  status?: AnswerOptionStatus;
  onClick: () => void;
}

const statusToClass: Record<AnswerOptionStatus, string | undefined> = {
  default: undefined,
  selected: styles.stateSelected,
  correct: styles.stateCorrect,
  incorrect: styles.stateWrong,
};

export const AnswerOption: FC<AnswerOptionProps> = memo(
  ({ letter, label, isDisabled = false, status = 'default', onClick }) => {
    const { isUpTablet } = useBreakpoints();

    const statusClass = useMemo(() => statusToClass[status], [status]);

    return (
      <button
        type="button"
        onClick={onClick}
        disabled={isDisabled}
        className={classNames(styles.root, statusClass)}
        data-status={status}
        aria-disabled={isDisabled || undefined}
      >
        <span aria-hidden className={styles.connector} />

        <span className={styles.body}>
          {isUpTablet ? (
            <svg
              className={styles.surface}
              viewBox="0 0 372 72"
              aria-hidden="true"
              focusable="false"
            >
              <path
                className={styles.shape}
                d="M32 0.75H340C343.56 0.75 346.91 2.42 349.09 5.23L371.25 36L349.09 66.77C346.91 69.58 343.56 71.25 340 71.25H32C28.44 71.25 25.09 69.58 22.91 66.77L0.75 36L22.91 5.23C25.09 2.42 28.44 0.75 32 0.75Z"
              />
            </svg>
          ) : (
            <svg
              className={styles.surface}
              viewBox="0 0 288 56"
              aria-hidden="true"
              focusable="false"
            >
              <path
                className={styles.shape}
                d="M26 0.75H262C265.63 0.75 269 2.43 271.18 5.28L287.25 28L271.18 50.72C269 53.57 265.63 55.25 262 55.25H26C22.37 55.25 19 53.57 16.82 50.72L0.75 28L16.82 5.28C19 2.43 22.37 0.75 26 0.75Z"
              />
            </svg>
          )}

          <Typography className={styles.content} component="span">
            <Typography
              className={styles.label}
              component="span"
              weight="bold"
              variant="body2"
            >
              {letter}
            </Typography>

            <Typography
              className={styles.text}
              component="span"
              variant="body2"
            >
              {label}
            </Typography>
          </Typography>
        </span>

        <span aria-hidden className={styles.connector} />
      </button>
    );
  },
);

export default AnswerOption;
