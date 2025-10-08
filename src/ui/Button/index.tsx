import { ButtonHTMLAttributes, ForwardedRef, forwardRef } from 'react';

import classNames from 'utils/classNames';

import styles from './styles.module.css';

type Variant = 'contained' | 'outlined' | 'text';
type Color = 'primary' | 'secondary';
type Size = 'small' | 'medium' | 'large';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  color?: Color;
  size?: Size;
  fullWidth?: boolean;
}

const ButtonBase = (
  {
    variant = 'contained',
    color = 'primary',
    size = 'medium',
    fullWidth,
    className,
    type = 'button',
    ...rest
  }: ButtonProps,
  forwardedReference: ForwardedRef<HTMLButtonElement>,
) => {
  return (
    <button
      {...rest}
      ref={forwardedReference}
      type={type === 'submit' ? 'submit' : 'button'}
      className={classNames(
        styles.button,
        styles[`variant-${variant}`],
        styles[`color-${color}`],
        styles[`size-${size}`],
        fullWidth && styles.fullWidth,
        className,
      )}
    />
  );
};

export const Button = forwardRef(ButtonBase);

export default Button;
