/**
 * SWISS PRECISION - Font Definitions
 * 
 * Geist (Vercel's clean grotesque) - actually available!
 * Alternative: IBM Plex Sans for similar Swiss feel
 */

import type { FontDefinition } from '../types.js';

// Alternative if using Next.js (recommended)
const geistNextJs = `
// In your layout.tsx or _app.tsx:
import { GeistSans } from 'geist/font/sans';

export default function Layout({ children }) {
  return (
    <html className={GeistSans.className}>
      {children}
    </html>
  );
}

// Install: npm install geist
`;

export const geistFont: FontDefinition = {
  name: 'Geist',
  source: 'vercel',
  url: 'https://vercel.com/font',
  // Geist is available via next/font or self-hosting from Vercel
  // For non-Next.js projects, use IBM Plex Sans as the fallback
  cssImport: '@import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@100;200;300;400;500;600;700&display=swap");',
  fallback: '"IBM Plex Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  weights: '100-700',
  alternativeFonts: ['IBM Plex Sans', 'Inter', 'System UI'],
  nextJsSetup: geistNextJs,
};

export { geistNextJs };

export const swissPrecisionFonts = {
  display: geistFont,
  body: geistFont,
  cssImports: [
    geistFont.cssImport,
  ],
  fallbackStack: `"Geist", "IBM Plex Sans", ${geistFont.fallback}`,
};

