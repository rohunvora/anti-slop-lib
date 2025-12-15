/**
 * FOREST ORGANIC - Tailwind Config Extension
 */

import { forestOrganicTokens } from './tokens.js';

export const forestOrganicTheme = {
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
      DEFAULT: '0.125rem',
    },
    borderWidth: {
      DEFAULT: '1px',
    },
    fontFamily: {
      display: ['"Newsreader"', 'Georgia', 'serif'],
      body: ['"General Sans"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
    },
    fontSize: {
      hero: [forestOrganicTokens.typography.hero.size, {
        lineHeight: forestOrganicTokens.typography.hero.leading,
        letterSpacing: forestOrganicTokens.typography.hero.tracking,
        fontWeight: forestOrganicTokens.typography.hero.weight,
      }],
      'h1': [forestOrganicTokens.typography.h1.size, {
        lineHeight: forestOrganicTokens.typography.h1.leading,
        letterSpacing: forestOrganicTokens.typography.h1.tracking,
        fontWeight: forestOrganicTokens.typography.h1.weight,
      }],
      'h2': [forestOrganicTokens.typography.h2.size, {
        lineHeight: forestOrganicTokens.typography.h2.leading,
        letterSpacing: forestOrganicTokens.typography.h2.tracking,
        fontWeight: forestOrganicTokens.typography.h2.weight,
      }],
      'h3': [forestOrganicTokens.typography.h3.size, {
        lineHeight: forestOrganicTokens.typography.h3.leading,
        letterSpacing: forestOrganicTokens.typography.h3.tracking,
        fontWeight: forestOrganicTokens.typography.h3.weight,
      }],
      body: [forestOrganicTokens.typography.body.size, {
        lineHeight: forestOrganicTokens.typography.body.leading,
        letterSpacing: forestOrganicTokens.typography.body.tracking,
        fontWeight: forestOrganicTokens.typography.body.weight,
      }],
      small: [forestOrganicTokens.typography.small.size, {
        lineHeight: forestOrganicTokens.typography.small.leading,
        letterSpacing: forestOrganicTokens.typography.small.tracking,
        fontWeight: forestOrganicTokens.typography.small.weight,
      }],
      caption: [forestOrganicTokens.typography.caption.size, {
        lineHeight: forestOrganicTokens.typography.caption.leading,
        letterSpacing: forestOrganicTokens.typography.caption.tracking,
        fontWeight: forestOrganicTokens.typography.caption.weight,
      }],
    },
  },
};

