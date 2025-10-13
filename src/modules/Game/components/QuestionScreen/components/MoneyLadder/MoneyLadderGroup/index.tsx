import { FC, memo, useMemo } from 'react';

import { MoneyLadderItem } from 'modules/Game/components/QuestionScreen/components/MoneyLadder/MoneyLadderItem';
import type {
  MoneyLadderStep,
  MoneyLadderVariant,
} from 'modules/Game/components/QuestionScreen/components/MoneyLadder/types';
import classNames from 'utils/classNames';

import styles from './styles.module.css';

export interface MoneyLadderGroupProps {
  items: MoneyLadderStep[];
  variant?: MoneyLadderVariant;
}

export const MoneyLadderGroup: FC<MoneyLadderGroupProps> = memo(
  ({ items, variant = 'desktop' }) => {
    const sortedItems = useMemo(
      () => [...items].sort((a, b) => b.amount - a.amount),
      [items],
    );

    return (
      <div className={classNames(styles.root, styles[variant])}>
        <ul
          className={classNames(
            styles.list,
            variant === 'mobile' && styles.listMobile,
          )}
        >
          {sortedItems.map((item) => (
            <MoneyLadderItem
              key={item.id}
              amount={item.amount}
              isCurrent={item.isCurrent}
              isCompleted={item.isCompleted}
            />
          ))}
        </ul>
      </div>
    );
  },
);

MoneyLadderGroup.displayName = 'MoneyLadderGroup';

export default MoneyLadderGroup;
