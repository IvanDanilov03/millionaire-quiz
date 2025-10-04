import { FC, ReactNode } from 'react';
import styles from './styles.module.css';

type TagVariants = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';

export interface TypographyProps {
  tag?: TagVariants;
  children: ReactNode;
  className?: string;
}

const Typography: FC<TypographyProps> = ({
  tag: Tag = 'p',
  children,
  className,
}) => {
  return <Tag className={styles[Tag]}>{children}</Tag>;
};

export default Typography;
