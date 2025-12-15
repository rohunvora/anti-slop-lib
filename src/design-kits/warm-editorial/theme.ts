/**
 * WARM EDITORIAL - Tailwind Config Extension
 * 
 * Semantic tokens via CSS variables for kit-swapping
 */

import { warmEditorialTokens } from './tokens.js';

export const warmEditorialTheme = {
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
      success: 'var(--success)',
      warning: 'var(--warning)',
      error: 'var(--error)',
    },
    borderRadius: {
      DEFAULT: '0.125rem', // sm
    },
    borderWidth: {
      DEFAULT: '1px',
    },
    fontFamily: {
      display: ['"Fraunces"', 'Georgia', 'serif'],
      body: ['"Satoshi"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
    },
    fontSize: {
      hero: [warmEditorialTokens.typography.hero.size, {
        lineHeight: warmEditorialTokens.typography.hero.leading,
        letterSpacing: warmEditorialTokens.typography.hero.tracking,
        fontWeight: warmEditorialTokens.typography.hero.weight,
      }],
      'h1': [warmEditorialTokens.typography.h1.size, {
        lineHeight: warmEditorialTokens.typography.h1.leading,
        letterSpacing: warmEditorialTokens.typography.h1.tracking,
        fontWeight: warmEditorialTokens.typography.h1.weight,
      }],
      'h2': [warmEditorialTokens.typography.h2.size, {
        lineHeight: warmEditorialTokens.typography.h2.leading,
        letterSpacing: warmEditorialTokens.typography.h2.tracking,
        fontWeight: warmEditorialTokens.typography.h2.weight,
      }],
      'h3': [warmEditorialTokens.typography.h3.size, {
        lineHeight: warmEditorialTokens.typography.h3.leading,
        letterSpacing: warmEditorialTokens.typography.h3.tracking,
        fontWeight: warmEditorialTokens.typography.h3.weight,
      }],
      body: [warmEditorialTokens.typography.body.size, {
        lineHeight: warmEditorialTokens.typography.body.leading,
        letterSpacing: warmEditorialTokens.typography.body.tracking,
        fontWeight: warmEditorialTokens.typography.body.weight,
      }],
      small: [warmEditorialTokens.typography.small.size, {
        lineHeight: warmEditorialTokens.typography.small.leading,
        letterSpacing: warmEditorialTokens.typography.small.tracking,
        fontWeight: warmEditorialTokens.typography.small.weight,
      }],
      caption: [warmEditorialTokens.typography.caption.size, {
        lineHeight: warmEditorialTokens.typography.caption.leading,
        letterSpacing: warmEditorialTokens.typography.caption.tracking,
        fontWeight: warmEditorialTokens.typography.caption.weight,
      }],
    },
  },
};

