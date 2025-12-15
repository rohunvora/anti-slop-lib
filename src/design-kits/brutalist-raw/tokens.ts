/**
 * BRUTALIST RAW - Design Tokens
 * 
 * Intentionally rough, punk energy
 * Space Mono + System stack
 */

import type { KitTokens } from '../types.js';

export const brutalistRawTokens: KitTokens = {
  colors: {
    background: '#FFFFFF',
    foreground: '#000000',
    primary: '#FF0000',
    primaryForeground: '#FFFFFF',
    secondary: '#0000FF',
    secondaryForeground: '#FFFFFF',
    muted: '#F0F0F0',
    mutedForeground: '#666666',
    accent: '#FFFF00',
    accentForeground: '#000000',
    border: '#000000',
    ring: '#FF0000',
    success: '#00FF00',
    warning: '#FFFF00',
    error: '#FF0000',
  },
  colorsDark: {
    background: '#000000',
    foreground: '#FFFFFF',
    primary: '#FF0000',
    primaryForeground: '#FFFFFF',
    secondary: '#0000FF',
    secondaryForeground: '#FFFFFF',
    muted: '#1A1A1A',
    mutedForeground: '#CCCCCC',
    accent: '#FFFF00',
    accentForeground: '#000000',
    border: '#FFFFFF',
    ring: '#FF0000',
    success: '#00FF00',
    warning: '#FFFF00',
    error: '#FF0000',
  },
  radius: 'none',
  borderWidth: '3px',
  typography: {
    hero: {
      size: 'clamp(2.5rem, 8vw, 5rem)',
      weight: '700',
      tracking: '0',
      leading: '1',
    },
    h1: {
      size: 'clamp(2rem, 6vw, 4rem)',
      weight: '700',
      tracking: '0',
      leading: '1.1',
    },
    h2: {
      size: 'clamp(1.5rem, 5vw, 3rem)',
      weight: '700',
      tracking: '0',
      leading: '1.2',
    },
    h3: {
      size: 'clamp(1.25rem, 4vw, 2rem)',
      weight: '700',
      tracking: '0',
      leading: '1.3',
    },
    body: {
      size: 'clamp(1rem, 2vw, 1.125rem)',
      weight: '400',
      tracking: '0',
      leading: '1.5',
    },
    small: {
      size: '0.875rem',
      weight: '400',
      tracking: '0',
      leading: '1.4',
    },
    caption: {
      size: '0.75rem',
      weight: '400',
      tracking: '0.1em',
      leading: '1.3',
    },
    mono: {
      size: 'clamp(1rem, 2vw, 1.125rem)',
      weight: '400',
      tracking: '0',
      leading: '1.5',
    },
  },
};

