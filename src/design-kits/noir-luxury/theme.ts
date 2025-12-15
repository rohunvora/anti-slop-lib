/**
 * NOIR LUXURY - Tailwind Config Extension
 */

import { noirLuxuryTokens } from './tokens.js';

export const noirLuxuryTheme = {
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
      display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      body: ['"Satoshi"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
    },
    fontSize: {
      hero: [noirLuxuryTokens.typography.hero.size, {
        lineHeight: noirLuxuryTokens.typography.hero.leading,
        letterSpacing: noirLuxuryTokens.typography.hero.tracking,
        fontWeight: noirLuxuryTokens.typography.hero.weight,
      }],
      'h1': [noirLuxuryTokens.typography.h1.size, {
        lineHeight: noirLuxuryTokens.typography.h1.leading,
        letterSpacing: noirLuxuryTokens.typography.h1.tracking,
        fontWeight: noirLuxuryTokens.typography.h1.weight,
      }],
      'h2': [noirLuxuryTokens.typography.h2.size, {
        lineHeight: noirLuxuryTokens.typography.h2.leading,
        letterSpacing: noirLuxuryTokens.typography.h2.tracking,
        fontWeight: noirLuxuryTokens.typography.h2.weight,
      }],
      'h3': [noirLuxuryTokens.typography.h3.size, {
        lineHeight: noirLuxuryTokens.typography.h3.leading,
        letterSpacing: noirLuxuryTokens.typography.h3.tracking,
        fontWeight: noirLuxuryTokens.typography.h3.weight,
      }],
      body: [noirLuxuryTokens.typography.body.size, {
        lineHeight: noirLuxuryTokens.typography.body.leading,
        letterSpacing: noirLuxuryTokens.typography.body.tracking,
        fontWeight: noirLuxuryTokens.typography.body.weight,
      }],
      small: [noirLuxuryTokens.typography.small.size, {
        lineHeight: noirLuxuryTokens.typography.small.leading,
        letterSpacing: noirLuxuryTokens.typography.small.tracking,
        fontWeight: noirLuxuryTokens.typography.small.weight,
      }],
      caption: [noirLuxuryTokens.typography.caption.size, {
        lineHeight: noirLuxuryTokens.typography.caption.leading,
        letterSpacing: noirLuxuryTokens.typography.caption.tracking,
        fontWeight: noirLuxuryTokens.typography.caption.weight,
      }],
    },
  },
};

