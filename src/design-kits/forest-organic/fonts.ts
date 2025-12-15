/**
 * FOREST ORGANIC - Font Definitions
 */

import type { FontDefinition } from '../types.js';

export const newsreaderFont: FontDefinition = {
  name: 'Newsreader',
  source: 'google',
  url: 'https://fonts.google.com/specimen/Newsreader',
  cssImport: '@import url("https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,200..800&display=swap");',
  fallback: 'Georgia, serif',
  weights: '200-800',
  alternativeFonts: ['Libre Baskerville', 'Merriweather', 'Georgia'],
  nextJsSetup: `
// Next.js setup for Newsreader
import { Newsreader } from 'next/font/google';

const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['200', '300', '400', '500', '600', '700', '800'],
});
`,
};

export const generalSansFont: FontDefinition = {
  name: 'General Sans',
  source: 'fontshare',
  url: 'https://www.fontshare.com/fonts/general-sans',
  cssImport: '@import url("https://api.fontshare.com/v2/css?f[]=general-sans@200,300,400,500,600,700&display=swap");',
  fallback: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  weights: '200-700',
  alternativeFonts: ['IBM Plex Sans', 'Source Sans 3', 'Work Sans'],
  nextJsSetup: `
// Option A: Use Fontshare CDN (add to globals.css)
@import url("https://api.fontshare.com/v2/css?f[]=general-sans@200,300,400,500,600,700&display=swap");

// Option B: Use IBM Plex Sans as fallback (Google Fonts)
import { IBM_Plex_Sans } from 'next/font/google';
const ibmPlex = IBM_Plex_Sans({ 
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'] 
});
`,
};

export const forestOrganicFonts = {
  display: newsreaderFont,
  body: generalSansFont,
  cssImports: [
    newsreaderFont.cssImport,
    generalSansFont.cssImport,
  ],
  fallbackStack: `"Newsreader", ${newsreaderFont.fallback}, "General Sans", ${generalSansFont.fallback}`,
};

