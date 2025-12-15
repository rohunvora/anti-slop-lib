/**
 * WARM EDITORIAL - Font Definitions
 * 
 * Fraunces (display) + Satoshi (body)
 */

import type { FontDefinition } from '../types.js';

export const frauncesFont: FontDefinition = {
  name: 'Fraunces',
  source: 'google',
  url: 'https://fonts.google.com/specimen/Fraunces',
  cssImport: '@import url("https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,100..900&display=swap");',
  fallback: 'Georgia, serif',
  weights: '100-900',
  alternativeFonts: ['Playfair Display', 'Libre Baskerville', 'Georgia'],
  nextJsSetup: `
// Next.js setup for Fraunces
import { Fraunces } from 'next/font/google';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
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
  // If Fontshare CDN fails, use Google Fonts alternative
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

export const warmEditorialFonts = {
  display: frauncesFont,
  body: satoshiFont,
  cssImports: [
    frauncesFont.cssImport,
    satoshiFont.cssImport,
  ],
  fallbackStack: `"Fraunces", ${frauncesFont.fallback}, "Satoshi", ${satoshiFont.fallback}`,
};

