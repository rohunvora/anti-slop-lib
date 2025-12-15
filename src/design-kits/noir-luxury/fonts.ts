/**
 * NOIR LUXURY - Font Definitions
 * 
 * Cormorant Garamond + Satoshi
 */

import type { FontDefinition } from '../types.js';

export const cormorantFont: FontDefinition = {
  name: 'Cormorant Garamond',
  source: 'google',
  url: 'https://fonts.google.com/specimen/Cormorant+Garamond',
  cssImport: '@import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&display=swap");',
  fallback: 'Georgia, serif',
  weights: '300-700',
  alternativeFonts: ['Playfair Display', 'EB Garamond', 'Georgia'],
  nextJsSetup: `
// Next.js setup for Cormorant Garamond
import { Cormorant_Garamond } from 'next/font/google';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['300', '400', '500', '600', '700'],
});
`,
};

export const satoshiFont: FontDefinition = {
  name: 'Satoshi',
  source: 'fontshare',
  url: 'https://www.fontshare.com/fonts/satoshi',
  cssImport: '@import url("https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,600,700&display=swap");',
  fallback: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  weights: '300-700',
  alternativeFonts: ['IBM Plex Sans', 'Source Sans 3', 'Work Sans'],
  nextJsSetup: `
// Option A: Use Fontshare CDN (add to globals.css)
@import url("https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,600,700&display=swap");

// Option B: Use IBM Plex Sans as fallback (Google Fonts)
import { IBM_Plex_Sans } from 'next/font/google';
const ibmPlex = IBM_Plex_Sans({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'] 
});
`,
};

export const noirLuxuryFonts = {
  display: cormorantFont,
  body: satoshiFont,
  cssImports: [
    cormorantFont.cssImport,
    satoshiFont.cssImport,
  ],
  fallbackStack: `"Cormorant Garamond", ${cormorantFont.fallback}, "Satoshi", ${satoshiFont.fallback}`,
};

