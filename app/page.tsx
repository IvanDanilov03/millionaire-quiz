'use client';

import { FC } from 'react';

import { Game } from 'modules/Game';

export interface HomePageProps {}

const HomePage: FC<HomePageProps> = () => {
  return <Game />;
};

export default HomePage;
