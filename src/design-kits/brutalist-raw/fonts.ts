/**
 * BRUTALIST RAW - Font Definitions
 * 
 * Space Mono + System stack
 */

import type { FontDefinition } from '../types.js';

export const spaceMonoFont: FontDefinition = {
  name: 'Space Mono',
  source: 'google',
  url: 'https://fonts.google.com/specimen/Space+Mono',
  cssImport: '@import url("https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap");',
  fallback: 'monospace',
  weights: '400, 700',
  alternativeFonts: ['JetBrains Mono', 'Fira Code', 'Courier New'],
  nextJsSetup: `
// Next.js setup for Space Mono
import { Space_Mono } from 'next/font/google';

const spaceMono = Space_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '700'],
});
`,
};

const systemFont: FontDefinition = {
  name: 'System Stack',
  source: 'system',
  url: '',
  cssImport: '',
  fallback: '-apple-system, BlinkMacSystemFont, "Segoe UI", monospace',
  weights: '400, 700',
  alternativeFonts: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI'],
};

export const brutalistRawFonts = {
  display: spaceMonoFont,
  body: systemFont,
  mono: spaceMonoFont,
  cssImports: [
    spaceMonoFont.cssImport,
  ],
  fallbackStack: `"Space Mono", ${spaceMonoFont.fallback}, -apple-system, BlinkMacSystemFont, "Segoe UI", monospace`,
};

