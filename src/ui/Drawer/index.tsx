import { FC, ReactNode, useEffect, useMemo } from 'react';

import { createPortal } from 'react-dom';
import classNames from 'utils/classNames';

import styles from './styles.module.css';

type DrawerAnchor = 'left' | 'right' | 'top' | 'bottom' | 'center';

type DrawerRole = 'dialog' | 'navigation';

export interface DrawerProps {
  isOpen: boolean;
  onClose?: () => void;
  children: ReactNode;
  anchor?: DrawerAnchor;
  role?: DrawerRole;
  className?: string;
  backdropClassName?: string;
  isBackdropClosable?: boolean;
}

const getContainer = () => {
  if (typeof document === 'undefined') {
    return null;
  }

  let element = document.querySelector<HTMLElement>('#drawer-root');

  if (!element) {
    element = document.createElement('div');
    element.setAttribute('id', 'drawer-root');
    document.body.append(element);
  }

  return element;
};

export const Drawer: FC<DrawerProps> = ({
  isOpen,
  onClose,
  children,
  anchor = 'right',
  role = 'dialog',
  className,
  backdropClassName,
  isBackdropClosable = true,
}) => {
  const portalTarget = useMemo(() => getContainer(), []);

  useEffect(() => {
    if (!isOpen || typeof document === 'undefined') {
      return undefined;
    }

    const { body } = document;
    const previousOverflow = body.style.overflow;
    body.style.overflow = 'hidden';

    return () => {
      body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  if (!isOpen || !portalTarget) {
    return null;
  }

  const handleBackdropClick: React.MouseEventHandler<HTMLDivElement> = (
    event,
  ) => {
    if (!isBackdropClosable) {
      return;
    }

    if (event.target === event.currentTarget) {
      onClose?.();
    }
  };

  const handleBackdropKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (
    event,
  ) => {
    if (!isBackdropClosable) {
      return;
    }

    if (event.key === 'Escape') {
      onClose?.();
    }
  };

  const drawerContent = (
    <div
      className={classNames(styles.backdrop, backdropClassName)}
      role="presentation"
      onClick={handleBackdropClick}
      onKeyDown={handleBackdropKeyDown}
      tabIndex={-1}
    >
      <div
        className={classNames(
          styles.drawer,
          styles[`anchor-${anchor}`],
          className,
        )}
        role={role}
        aria-modal={role === 'dialog' ? true : undefined}
      >
        {children}
      </div>
    </div>
  );

  return createPortal(drawerContent, portalTarget);
};

export default Drawer;
