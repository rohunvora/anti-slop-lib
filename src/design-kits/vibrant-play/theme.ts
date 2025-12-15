/**
 * VIBRANT PLAY - Tailwind Config Extension
 */

import { vibrantPlayTokens } from './tokens.js';

export const vibrantPlayTheme = {
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
      DEFAULT: '0.5rem',
    },
    borderWidth: {
      DEFAULT: '1px',
    },
    fontFamily: {
      display: ['"Cabinet Grotesk"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
      body: ['"Lexend"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
    },
    fontSize: {
      hero: [vibrantPlayTokens.typography.hero.size, {
        lineHeight: vibrantPlayTokens.typography.hero.leading,
        letterSpacing: vibrantPlayTokens.typography.hero.tracking,
        fontWeight: vibrantPlayTokens.typography.hero.weight,
      }],
      'h1': [vibrantPlayTokens.typography.h1.size, {
        lineHeight: vibrantPlayTokens.typography.h1.leading,
        letterSpacing: vibrantPlayTokens.typography.h1.tracking,
        fontWeight: vibrantPlayTokens.typography.h1.weight,
      }],
      'h2': [vibrantPlayTokens.typography.h2.size, {
        lineHeight: vibrantPlayTokens.typography.h2.leading,
        letterSpacing: vibrantPlayTokens.typography.h2.tracking,
        fontWeight: vibrantPlayTokens.typography.h2.weight,
      }],
      'h3': [vibrantPlayTokens.typography.h3.size, {
        lineHeight: vibrantPlayTokens.typography.h3.leading,
        letterSpacing: vibrantPlayTokens.typography.h3.tracking,
        fontWeight: vibrantPlayTokens.typography.h3.weight,
      }],
      body: [vibrantPlayTokens.typography.body.size, {
        lineHeight: vibrantPlayTokens.typography.body.leading,
        letterSpacing: vibrantPlayTokens.typography.body.tracking,
        fontWeight: vibrantPlayTokens.typography.body.weight,
      }],
      small: [vibrantPlayTokens.typography.small.size, {
        lineHeight: vibrantPlayTokens.typography.small.leading,
        letterSpacing: vibrantPlayTokens.typography.small.tracking,
        fontWeight: vibrantPlayTokens.typography.small.weight,
      }],
      caption: [vibrantPlayTokens.typography.caption.size, {
        lineHeight: vibrantPlayTokens.typography.caption.leading,
        letterSpacing: vibrantPlayTokens.typography.caption.tracking,
        fontWeight: vibrantPlayTokens.typography.caption.weight,
      }],
    },
  },
};

