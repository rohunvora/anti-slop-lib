/**
 * SWISS PRECISION - Design Tokens
 * 
 * Grids, hierarchy, no decoration. Dieter Rams.
 * Mona Sans (single family)
 */

import type { KitTokens } from '../types.js';

export const swissPrecisionTokens: KitTokens = {
  colors: {
    background: '#FFFFFF',
    foreground: '#000000',
    primary: '#000000',
    primaryForeground: '#FFFFFF',
    secondary: '#333333',
    secondaryForeground: '#FFFFFF',
    muted: '#F5F5F5',
    mutedForeground: '#666666',
    accent: '#000000',
    accentForeground: '#FFFFFF',
    border: '#E5E5E5',
    ring: '#000000',
    success: '#000000',
    warning: '#000000',
    error: '#000000',
  },
  colorsDark: {
    background: '#000000',
    foreground: '#FFFFFF',
    primary: '#FFFFFF',
    primaryForeground: '#000000',
    secondary: '#CCCCCC',
    secondaryForeground: '#000000',
    muted: '#1A1A1A',
    mutedForeground: '#999999',
    accent: '#FFFFFF',
    accentForeground: '#000000',
    border: '#333333',
    ring: '#FFFFFF',
    success: '#FFFFFF',
    warning: '#FFFFFF',
    error: '#FFFFFF',
  },
  radius: 'none',
  borderWidth: '1px',
  typography: {
    hero: {
      size: 'clamp(3rem, 8vw, 5rem)',
      weight: '700',
      tracking: '-0.03em',
      leading: '0.95',
    },
    h1: {
      size: 'clamp(2rem, 5vw, 3rem)',
      weight: '700',
      tracking: '-0.02em',
      leading: '1.1',
    },
    h2: {
      size: 'clamp(1.5rem, 4vw, 2rem)',
      weight: '600',
      tracking: '-0.01em',
      leading: '1.2',
    },
    h3: {
      size: 'clamp(1.25rem, 3vw, 1.5rem)',
      weight: '600',
      tracking: '0',
      leading: '1.3',
    },
    body: {
      size: 'clamp(1rem, 2vw, 1.125rem)',
      weight: '400',
      tracking: '0',
      leading: '1.6',
    },
    small: {
      size: '0.875rem',
      weight: '400',
      tracking: '0',
      leading: '1.5',
    },
    caption: {
      size: '0.75rem',
      weight: '400',
      tracking: '0.05em',
      leading: '1.4',
    },
  },
};

