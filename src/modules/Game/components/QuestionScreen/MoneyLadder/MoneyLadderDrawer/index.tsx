import { FC, PropsWithChildren } from 'react';

import { Drawer } from 'ui/Drawer';

import styles from './styles.module.css';

export interface MoneyLadderDrawerProps {
  isOpen: boolean;
  onClose?: () => void;
}

export const MoneyLadderDrawer: FC<
  PropsWithChildren<MoneyLadderDrawerProps>
> = ({ isOpen, onClose, children }) => (
  <Drawer
    isOpen={isOpen}
    onClose={onClose}
    anchor="center"
    className={styles.surface}
    backdropClassName={styles.backdrop}
  >
    <div className={styles.panel}>{children}</div>
  </Drawer>
);

export default MoneyLadderDrawer;
