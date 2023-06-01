import React from 'react';
import './globals.css';
import { Inter } from 'next/font/google';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

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
        {/* Last thing I searched about next js v13 and next-pwa */}
        {/* https://github.com/shadowwalker/next-pwa/issues/424 */}
        {/* newer package?  */}
        {/* https://www.npmjs.com/package/@ducanh2912/next-pwa */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <meta name="theme-color" content="#fff" />
      </head>
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
