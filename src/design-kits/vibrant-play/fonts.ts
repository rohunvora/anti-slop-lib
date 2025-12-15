/**
 * VIBRANT PLAY - Font Definitions
 * 
 * Cabinet Grotesk + Lexend
 */

import type { FontDefinition } from '../types.js';

export const cabinetGroteskFont: FontDefinition = {
  name: 'Cabinet Grotesk',
  source: 'fontshare',
  url: 'https://www.fontshare.com/fonts/cabinet-grotesk',
  cssImport: '@import url("https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@100,200,300,400,500,600,700,800,900&display=swap");',
  fallback: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  weights: '100-900',
  alternativeFonts: ['Poppins', 'DM Sans', 'Outfit'],
  nextJsSetup: `
// Option A: Use Fontshare CDN (add to globals.css)
@import url("https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@100,200,300,400,500,600,700,800,900&display=swap");

// Option B: Use Poppins as fallback (Google Fonts)
import { Poppins } from 'next/font/google';
const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] 
});
`,
};

export const lexendFont: FontDefinition = {
  name: 'Lexend',
  source: 'google',
  url: 'https://fonts.google.com/specimen/Lexend',
  cssImport: '@import url("https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&display=swap");',
  fallback: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  weights: '100-900',
  alternativeFonts: ['Inter', 'Source Sans 3', 'Work Sans'],
  nextJsSetup: `
// Next.js setup for Lexend
import { Lexend } from 'next/font/google';

const lexend = Lexend({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});
`,
};

export const vibrantPlayFonts = {
  display: cabinetGroteskFont,
  body: lexendFont,
  cssImports: [
    cabinetGroteskFont.cssImport,
    lexendFont.cssImport,
  ],
  fallbackStack: `"Cabinet Grotesk", ${cabinetGroteskFont.fallback}, "Lexend", ${lexendFont.fallback}`,
};

