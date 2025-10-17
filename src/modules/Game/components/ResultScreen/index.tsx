import { FC } from 'react';

import handImage from 'assets/images/hand.png';

import { Button } from 'ui/Button';
import { Image } from 'ui/Image';
import { Typography } from 'ui/Typography';

import styles from './styles.module.css';

export interface ResultScreenProps {
  reward: number;
  onRestart: () => void;
}

const formatAmount = (value: number) => `$${value.toLocaleString('en-US')}`;

export const ResultScreen: FC<ResultScreenProps> = ({ reward, onRestart }) => {
  return (
    <div className={styles.root}>
      <div className={styles.imageContainer}>
        <div className={styles.imageWrapper}>
          <Image
            src={handImage}
            alt="Thumbs up illustration"
            priority
            fill
            sizes="(min-width: 1280px) 451px, (min-width: 744px) 320px, 196px"
            className={styles.image}
          />
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.score}>
          <Typography variant="h2" component="h2" className={styles.subtitle}>
            Total score:
          </Typography>
          <Typography variant="h1" component="h1">
            {formatAmount(reward)} earned
          </Typography>
        </div>

        <Button size="large" onClick={onRestart} className={styles.button}>
          Try again
        </Button>
      </div>
    </div>
  );
};

export default ResultScreen;
