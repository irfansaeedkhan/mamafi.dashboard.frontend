import UserProvider from '@/components/user-provider';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { caustenBold, caustenLight, caustenRegular, kanit, nexaBlack, nexaLight, nexaRegular } from './fonts';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://app.mamafi.io/'),
  title: 'mamafi',
  description:
    'An invitation-only club for meme enthusiasts exploring cultural signals, narrative momentum, and digital asset trends in the Meme Coin ecosystem.',
    keywords: [
      'meme coin',
      'meme coin ecosystem',
      'crypto memes',
      'meme culture',
      'digital asset trends',
      'crypto narratives',
      'cultural signals',
      'web3 community',
      'crypto community',
      'meme enthusiasts',
      'crypto alpha',
      'on-chain trends',
      'mamafi'
    ],
  authors: [{ name: 'mamafi' }],
  openGraph: {
    title: 'mamafi',
    siteName: 'app.mamafi',
    url: 'https://www.mamafi.io/',
    description:
      'An invitation-only club for meme enthusiasts exploring cultural signals, narrative momentum, and digital asset trends in the Meme Coin ecosystem.',
    images: [
      {
        url: '/images/logo-sm.png',
        width: '529',
        height: '529',
      },
    ],
  },
  icons: [
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon/favicon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicon/favicon.png',
    },
    {
      rel: 'apple-touch-icon',
      type: 'image/png',
      sizes: '180x180',
      url: '/favicon/apple-touch-icon.png',
    },
    {
      rel: 'shortcut icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicon/favicon.ico',
    },
  ],
  robots: {
    follow: true,
  },
  twitter: {
    title: 'mamafi',
    description:
      'An invitation-only club for meme enthusiasts exploring cultural signals, narrative momentum, and digital asset trends in the Meme Coin ecosystem.',
    images: [
      {
        url: '/images/logo-sm.png',
        width: '420',
        height: '420',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${caustenRegular.variable} ${caustenLight.variable} ${caustenBold.variable} ${kanit.variable} ${nexaLight.variable} ${nexaRegular.variable} ${nexaBlack.variable} ${inter.variable} font-sans`}
    >
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" href="/favicon/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/png" href="/favicon/favicon.png" sizes="32x32" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <meta name="apple-mobile-web-app-title" content="mamafi" />
        <meta name="theme-color" content="#FFAA21" />
        <meta name="msapplication-TileColor" content="#FFAA21" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"
        ></meta>
      </head>
      <body suppressHydrationWarning={true} className="bg-primary font-causten">
        {/* Global SVG gradient for icons (pink to blue theme) */}
        <svg width="0" height="0" className="absolute" aria-hidden="true">
          <defs>
            <linearGradient id="theme-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF294F" />
              <stop offset="100%" stopColor="#1C83FF" />
            </linearGradient>
          </defs>
        </svg>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            duration: 3000,
          }}
        />
        <UserProvider />
        {children}
      </body>
    </html>
  );
}
