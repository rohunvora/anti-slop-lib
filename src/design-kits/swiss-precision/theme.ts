/**
 * SWISS PRECISION - Tailwind Config Extension
 */

import { swissPrecisionTokens } from './tokens.js';

export const swissPrecisionTheme = {
  extend: {
    colors: {
      background: 'var(--background)',
      foreground: 'var(--foreground)',
      primary: {
        DEFAULT: 'var(--primary)',
        foreground: 'var(--primary-foreground)',
      },
      secondary: {
        DEFAULT: 'var(--secondary)',
        foreground: 'var(--secondary-foreground)',
      },
      muted: {
        DEFAULT: 'var(--muted)',
        foreground: 'var(--muted-foreground)',
      },
      accent: {
        DEFAULT: 'var(--accent)',
        foreground: 'var(--accent-foreground)',
      },
      border: 'var(--border)',
      ring: 'var(--ring)',
    },
    borderRadius: {
      DEFAULT: '0',
    },
    borderWidth: {
      DEFAULT: '1px',
    },
    fontFamily: {
      sans: ['"Geist"', '"IBM Plex Sans"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
      display: ['"Geist"', '"IBM Plex Sans"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
      body: ['"Geist"', '"IBM Plex Sans"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
    },
    fontSize: {
      hero: [swissPrecisionTokens.typography.hero.size, {
        lineHeight: swissPrecisionTokens.typography.hero.leading,
        letterSpacing: swissPrecisionTokens.typography.hero.tracking,
        fontWeight: swissPrecisionTokens.typography.hero.weight,
      }],
      'h1': [swissPrecisionTokens.typography.h1.size, {
        lineHeight: swissPrecisionTokens.typography.h1.leading,
        letterSpacing: swissPrecisionTokens.typography.h1.tracking,
        fontWeight: swissPrecisionTokens.typography.h1.weight,
      }],
      'h2': [swissPrecisionTokens.typography.h2.size, {
        lineHeight: swissPrecisionTokens.typography.h2.leading,
        letterSpacing: swissPrecisionTokens.typography.h2.tracking,
        fontWeight: swissPrecisionTokens.typography.h2.weight,
      }],
      'h3': [swissPrecisionTokens.typography.h3.size, {
        lineHeight: swissPrecisionTokens.typography.h3.leading,
        letterSpacing: swissPrecisionTokens.typography.h3.tracking,
        fontWeight: swissPrecisionTokens.typography.h3.weight,
      }],
      body: [swissPrecisionTokens.typography.body.size, {
        lineHeight: swissPrecisionTokens.typography.body.leading,
        letterSpacing: swissPrecisionTokens.typography.body.tracking,
        fontWeight: swissPrecisionTokens.typography.body.weight,
      }],
      small: [swissPrecisionTokens.typography.small.size, {
        lineHeight: swissPrecisionTokens.typography.small.leading,
        letterSpacing: swissPrecisionTokens.typography.small.tracking,
        fontWeight: swissPrecisionTokens.typography.small.weight,
      }],
      caption: [swissPrecisionTokens.typography.caption.size, {
        lineHeight: swissPrecisionTokens.typography.caption.leading,
        letterSpacing: swissPrecisionTokens.typography.caption.tracking,
        fontWeight: swissPrecisionTokens.typography.caption.weight,
      }],
    },
  },
};

