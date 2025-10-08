import {
  CSSProperties,
  ForwardedRef,
  HTMLAttributes,
  JSX,
  ReactNode,
  createElement,
  forwardRef,
} from 'react';

import classNames from 'utils/classNames';

import styles from './styles.module.css';

type Variant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body1'
  | 'body2'
  | 'button'
  | 'caption';

type Color =
  | 'inherit'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'error'
  | 'muted';

type TextAlign = 'left' | 'center' | 'right' | 'justify';

type IntrinsicElement = keyof JSX.IntrinsicElements;

type VariantMapping = Record<Variant, IntrinsicElement>;

const defaultVariantMapping: VariantMapping = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  body1: 'p',
  body2: 'p',
  button: 'span',
  caption: 'span',
};

export interface TypographyProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  variant?: Variant;
  component?: IntrinsicElement;
  color?: Color;
  align?: TextAlign;
  gutterBottom?: boolean;
  noWrap?: boolean;
  weight?: CSSProperties['fontWeight'];
  className?: string;
  style?: CSSProperties;
}

const TypographyBase = (
  {
    children,
    variant = 'body1',
    component,
    color = 'inherit',
    align,
    gutterBottom,
    noWrap,
    weight,
    className,
    style,
    ...rest
  }: TypographyProps,
  forwardedReference: ForwardedRef<HTMLElement>,
) => {
  const elementTag = component ?? defaultVariantMapping[variant];

  const alignStyle: CSSProperties | undefined = align
    ? { textAlign: align }
    : undefined;
  const weightStyle: CSSProperties | undefined = weight
    ? { fontWeight: weight }
    : undefined;

  const mergedStyles: CSSProperties | undefined =
    alignStyle || weightStyle || style
      ? {
          ...alignStyle,
          ...weightStyle,
          ...style,
        }
      : undefined;

  const classValue = classNames(
    styles.root,
    styles[`variant-${variant}`],
    styles[`color-${color}`],
    gutterBottom && styles.gutterBottom,
    noWrap && styles.noWrap,
    className,
  );

  return createElement(
    elementTag,
    {
      ...rest,
      ref: forwardedReference,
      className: classValue,
      style: mergedStyles,
    },
    children,
  );
};

export const Typography = forwardRef(TypographyBase);

export default Typography;
