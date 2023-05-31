import React from 'react';
import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Tower Hamlets Mosques',
  description: 'ADD IN SOME DESCRIPTION HERE',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* These links are for pwa - but not active yet! will wait until normal site is done - hopefully a pwa solution is out by then */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <meta name="theme-color" content="#fff" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
