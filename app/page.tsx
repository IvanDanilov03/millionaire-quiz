'use client';

import Typography from 'components/Typography';
import { FC } from 'react';

export interface HomePageProps {}

const HomePage: FC<HomePageProps> = () => {
  return (
    <section>
      <Typography tag="h1">Home page</Typography>
    </section>
  );
};

export default HomePage;
