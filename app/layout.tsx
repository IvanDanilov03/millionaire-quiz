import React from 'react';

import type { Metadata } from 'next';

import './global.css';

const APP_TITLE = 'Millionaire Quiz';
const APP_DESCRIPTION =
  'Interactive millionaire quiz game built for the Headway front-end test.';
const APP_URL = 'https://example.com';

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: APP_TITLE,
    template: '%s · Millionaire Quiz',
  },
  description: APP_DESCRIPTION,
  applicationName: APP_TITLE,
  keywords: ['millionaire quiz', 'trivia game', 'next.js'],
  openGraph: {
    title: APP_TITLE,
    description: APP_DESCRIPTION,
    url: APP_URL,
    siteName: APP_TITLE,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: APP_TITLE,
    description: APP_DESCRIPTION,
  },
  alternates: {
    canonical: APP_URL,
  },
  icons: {
    icon: '/favicon.ico',
  },
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

const RootLayout = ({ children }: RootLayoutProps) => (
  <html lang="en">
    <head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
        rel="stylesheet"
      />
    </head>
    <body>
      <main>{children}</main>
    </body>
  </html>
);

export default RootLayout;
