import localFont from 'next/font/local';

// Kanit Font
export const kanit = localFont({
  src: '../public/fonts/kanit/Kanit-Regular.ttf',
  weight: '400',
  style: 'normal',
  variable: '--font-kanit',
});

// Causten Font Regular
export const caustenRegular = localFont({
  src: '../public/fonts/causten/Causten-Regular.ttf',
  weight: '400',
  style: 'normal',
  variable: '--font-causten-regular',
  fallback: ['sans-serif'],
});

// Causten Font Light
export const caustenLight = localFont({
  src: '../public/fonts/causten/Causten-Light.ttf',
  weight: '300',
  style: 'normal',
  variable: '--font-causten-light',
  fallback: ['sans-serif'],
});

// Causten Font Bold
export const caustenBold = localFont({
  src: '../public/fonts/causten/Causten-Bold.ttf',
  weight: '700',
  style: 'normal',
  variable: '--font-causten-bold',
  fallback: ['sans-serif'],
});

// Nexa Font Regular (keeping for backwards compatibility)
export const nexaRegular = localFont({
  src: '../public/fonts/nexa/Nexa-Regular.otf',
  weight: '400',
  style: 'normal',
  variable: '--font-nexa-regular',
});

// Nexa Font Light (keeping for backwards compatibility)
export const nexaLight = localFont({
  src: '../public/fonts/nexa/Nexa-Light.otf',
  weight: '100',
  style: 'normal',
  variable: '--font-nexa-light',
});
// Nexa Font Heavy (keeping for backwards compatibility)
export const nexaBlack = localFont({
  src: '../public/fonts/nexa/Nexa-Black.otf',
  weight: '900',
  style: 'normal',
  variable: '--font-nexa-black',
});
