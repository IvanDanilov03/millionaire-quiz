import { FC, memo, useMemo } from 'react';

import { useBreakpoints } from 'hooks/useBreakpoints';
import classNames from 'utils/classNames';

import Typography from 'ui/Typography';

import styles from './styles.module.css';

export interface MoneyLadderItemProps {
  amount: number;
  isCompleted: boolean;
  isCurrent: boolean;
  className?: string;
}

type LadderState = 'locked' | 'completed' | 'current';

const statusToClass: Record<LadderState, string> = {
  locked: styles.stateLocked,
  completed: styles.stateCompleted,
  current: styles.stateCurrent,
};

const usdFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

export const MoneyLadderItem: FC<MoneyLadderItemProps> = memo(
  ({ amount, isCompleted, isCurrent, className }) => {
    const { isUpTablet } = useBreakpoints();

    const state: LadderState = isCurrent
      ? 'current'
      : isCompleted
        ? 'completed'
        : 'locked';
    const stateClass = useMemo(() => statusToClass[state], [state]);

    const viewBox = isUpTablet ? '0 0 240 40' : '0 0 240 32';
    const d = isUpTablet
      ? 'M22.2871 0.5H217.713C221.126 0.500018 224.363 2.0158 226.548 4.6377L239.349 20L226.548 35.3623C224.363 37.9842 221.126 39.5 217.713 39.5H22.2871C18.8742 39.5 15.6371 37.9842 13.4521 35.3623L0.650391 20L13.4521 4.6377C15.6371 2.0158 18.8742 0.500017 22.2871 0.5Z'
      : 'M21.4941 0.5H218.506C221.475 0.500071 224.328 1.64821 226.47 3.7041L239.277 16L226.47 28.2959C224.328 30.3518 221.475 31.4999 218.506 31.5H21.4941C18.5255 31.4999 15.6718 30.3518 13.5303 28.2959L0.72168 16L13.5303 3.7041C15.6718 1.6482 18.5255 0.500064 21.4941 0.5Z';

    return (
      <li
        className={classNames(styles.root, stateClass, className)}
        aria-current={isCurrent ? 'true' : undefined}
        data-state={state}
      >
        <span aria-hidden className={styles.connector} />

        <span className={styles.body}>
          <svg
            className={styles.surface}
            viewBox={viewBox}
            aria-hidden="true"
            focusable="false"
          >
            <path className={styles.shape} d={d} />
          </svg>

          <Typography className={styles.text} component="span" variant="body2">
            {usdFormatter.format(amount)}
          </Typography>
        </span>

        <span aria-hidden className={styles.connector} />
      </li>
    );
  },
);

export default MoneyLadderItem;
