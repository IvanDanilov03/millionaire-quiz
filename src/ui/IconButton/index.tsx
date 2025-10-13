import { ButtonHTMLAttributes, ForwardedRef, forwardRef } from 'react';

import classNames from 'utils/classNames';

import styles from './styles.module.css';

export type IconButtonVariant = 'primary' | 'secondary';
export type IconButtonSize = 'small' | 'medium' | 'large';

export interface IconButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  type?: 'button' | 'submit' | 'reset';
}

const IconButtonBase = (
  {
    variant = 'primary',
    size = 'small',
    className,
    type = 'button',
    ...rest
  }: IconButtonProps,
  forwardedReference: ForwardedRef<HTMLButtonElement>,
) => {
  return (
    <button
      {...rest}
      ref={forwardedReference}
      type={type === 'submit' ? 'submit' : 'button'}
      className={classNames(
        styles.root,
        styles[variant],
        styles[size],
        className,
      )}
    />
  );
};

export const IconButton = forwardRef(IconButtonBase);

export default IconButton;
