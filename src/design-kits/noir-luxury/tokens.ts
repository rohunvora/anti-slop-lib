/**
 * NOIR LUXURY - Design Tokens
 * 
 * Dark, exclusive, whispered elegance
 * Cormorant Garamond + Satoshi
 */

import type { KitTokens } from '../types.js';

export const noirLuxuryTokens: KitTokens = {
  colors: {
    background: '#0A0A0A',      // Near-black
    foreground: '#F5F5F5',      // Off-white
    primary: '#C9A227',        // Gold
    primaryForeground: '#0A0A0A',
    secondary: '#8B7355',       // Muted gold
    secondaryForeground: '#0A0A0A',
    muted: '#141414',           // Dark surface
    mutedForeground: '#888888', // Muted text
    accent: '#C9A227',          // Gold accent
    accentForeground: '#0A0A0A',
    border: '#2A2A2A',          // Dark border
    ring: '#C9A227',
    success: '#C9A227',
    warning: '#DAA520',
    error: '#8B4513',
  },
  colorsDark: {
    background: '#000000',      // Pure black
    foreground: '#FFFFFF',      // Pure white
    primary: '#FFD700',         // Brighter gold
    primaryForeground: '#000000',
    secondary: '#C9A227',
    secondaryForeground: '#000000',
    muted: '#1A1A1A',
    mutedForeground: '#AAAAAA',
    accent: '#FFD700',
    accentForeground: '#000000',
    border: '#333333',
    ring: '#FFD700',
    success: '#FFD700',
    warning: '#FFA500',
    error: '#CD853F',
  },
  radius: 'none',
  borderWidth: '1px',
  typography: {
    hero: {
      size: 'clamp(4rem, 10vw, 8rem)',
      weight: '300',
      tracking: '0.02em',
      leading: '1',
    },
    h1: {
      size: 'clamp(3rem, 8vw, 5rem)',
      weight: '300',
      tracking: '0.01em',
      leading: '1.1',
    },
    h2: {
      size: 'clamp(2rem, 6vw, 3rem)',
      weight: '400',
      tracking: '0',
      leading: '1.2',
    },
    h3: {
      size: 'clamp(1.5rem, 4vw, 2rem)',
      weight: '400',
      tracking: '0',
      leading: '1.3',
    },
    body: {
      size: 'clamp(1rem, 2vw, 1.125rem)',
      weight: '400',
      tracking: '0',
      leading: '1.7',
    },
    small: {
      size: '0.875rem',
      weight: '400',
      tracking: '0',
      leading: '1.6',
    },
    caption: {
      size: '0.75rem',
      weight: '300',
      tracking: '0.1em',
      leading: '1.5',
    },
  },
};

