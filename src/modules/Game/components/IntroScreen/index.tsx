import { FC } from 'react';

import handImage from 'assets/images/hand.png';

import { Button } from 'ui/Button';
import { Image } from 'ui/Image';
import { Typography } from 'ui/Typography';

import styles from './styles.module.css';

export interface IntroScreenProps {
  onStart: () => void;
}

export const IntroScreen: FC<IntroScreenProps> = ({ onStart }) => {
  return (
    <div className={styles.root}>
      <div className={styles.imageContainer}>
        <div className={styles.imageWrapper}>
          <Image
            src={handImage}
            alt="Thumbs up illustration"
            priority
            fill
            className={styles.image}
          />
        </div>
      </div>

      <div className={styles.content}>
        <Typography variant="h1" component="h1">
          Who wants to be
          <br />a millionaire?
        </Typography>

        <Button size="large" onClick={onStart} className={styles.button}>
          Start
        </Button>
      </div>
    </div>
  );
};

export default IntroScreen;
