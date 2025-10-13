import { FC } from 'react';

import closeIcon from 'assets/icons/close-icon.svg';
import { getAssetUrlString } from 'modules/Game/helpers';
import classNames from 'utils/classNames';

import { IconButton } from 'ui/IconButton';
import { Image } from 'ui/Image';

import styles from './styles.module.css';

type MoneyLadderHeaderVariant = 'desktop' | 'mobile';

export interface MoneyLadderHeaderProps {
  variant: MoneyLadderHeaderVariant;
  onClose?: () => void;
  className?: string;
}

export const MoneyLadderHeader: FC<MoneyLadderHeaderProps> = ({
  variant,
  onClose,
  className,
}) => {
  return (
    <header className={classNames(styles.root, styles[variant], className)}>
      {variant === 'mobile' && onClose && (
        <IconButton
          aria-label="Close prize ladder"
          onClick={onClose}
          size="small"
        >
          <Image
            src={getAssetUrlString(closeIcon)}
            alt=""
            width={24}
            height={24}
            aria-hidden
          />
        </IconButton>
      )}
    </header>
  );
};

export default MoneyLadderHeader;
