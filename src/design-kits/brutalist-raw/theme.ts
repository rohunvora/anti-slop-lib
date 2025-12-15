/**
 * BRUTALIST RAW - Tailwind Config Extension
 */

import { brutalistRawTokens } from './tokens.js';

export const brutalistRawTheme = {
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
      DEFAULT: '3px',
    },
    fontFamily: {
      mono: ['"Space Mono"', 'monospace'],
      sans: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'monospace'],
      display: ['"Space Mono"', 'monospace'],
      body: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'monospace'],
    },
    fontSize: {
      hero: [brutalistRawTokens.typography.hero.size, {
        lineHeight: brutalistRawTokens.typography.hero.leading,
        letterSpacing: brutalistRawTokens.typography.hero.tracking,
        fontWeight: brutalistRawTokens.typography.hero.weight,
      }],
      'h1': [brutalistRawTokens.typography.h1.size, {
        lineHeight: brutalistRawTokens.typography.h1.leading,
        letterSpacing: brutalistRawTokens.typography.h1.tracking,
        fontWeight: brutalistRawTokens.typography.h1.weight,
      }],
      'h2': [brutalistRawTokens.typography.h2.size, {
        lineHeight: brutalistRawTokens.typography.h2.leading,
        letterSpacing: brutalistRawTokens.typography.h2.tracking,
        fontWeight: brutalistRawTokens.typography.h2.weight,
      }],
      'h3': [brutalistRawTokens.typography.h3.size, {
        lineHeight: brutalistRawTokens.typography.h3.leading,
        letterSpacing: brutalistRawTokens.typography.h3.tracking,
        fontWeight: brutalistRawTokens.typography.h3.weight,
      }],
      body: [brutalistRawTokens.typography.body.size, {
        lineHeight: brutalistRawTokens.typography.body.leading,
        letterSpacing: brutalistRawTokens.typography.body.tracking,
        fontWeight: brutalistRawTokens.typography.body.weight,
      }],
      small: [brutalistRawTokens.typography.small.size, {
        lineHeight: brutalistRawTokens.typography.small.leading,
        letterSpacing: brutalistRawTokens.typography.small.tracking,
        fontWeight: brutalistRawTokens.typography.small.weight,
      }],
      caption: [brutalistRawTokens.typography.caption.size, {
        lineHeight: brutalistRawTokens.typography.caption.leading,
        letterSpacing: brutalistRawTokens.typography.caption.tracking,
        fontWeight: brutalistRawTokens.typography.caption.weight,
      }],
    },
    boxShadow: {
      'brutal': '4px 4px 0 0 var(--border)',
      'brutal-lg': '8px 8px 0 0 var(--border)',
    },
  },
};

