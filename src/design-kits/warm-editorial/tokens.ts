/**
 * WARM EDITORIAL - Design Tokens
 * 
 * Literary, thoughtful, New Yorker website vibe
 * Fraunces (serif) + Satoshi (sans)
 */

import type { KitTokens } from '../types.js';

export const warmEditorialTokens: KitTokens = {
  colors: {
    background: '#FAF7F2',      // Cream
    foreground: '#2D2A26',     // Dark brown-black
    primary: '#B8860B',         // Dark goldenrod
    primaryForeground: '#FFFFFF',
    secondary: '#8B4513',      // Saddle brown
    secondaryForeground: '#FFFFFF',
    muted: '#E8E4DD',          // Light beige
    mutedForeground: '#6B6560', // Muted brown
    accent: '#CD853F',         // Peru (warm accent)
    accentForeground: '#FFFFFF',
    border: '#D4C5B0',         // Warm border
    ring: '#B8860B',
    success: '#6B8E23',        // Olive drab
    warning: '#DAA520',        // Goldenrod
    error: '#8B4513',          // Saddle brown (muted error)
  },
  colorsDark: {
    background: '#1A1815',     // Dark brown
    foreground: '#F5F0E8',     // Cream text
    primary: '#DAA520',        // Lighter goldenrod
    primaryForeground: '#1A1815',
    secondary: '#CD853F',      // Peru
    secondaryForeground: '#1A1815',
    muted: '#3A352F',          // Dark muted
    mutedForeground: '#A89F94', // Light muted
    accent: '#F4A460',         // Sandy brown
    accentForeground: '#1A1815',
    border: '#4A4439',         // Dark border
    ring: '#DAA520',
    success: '#9ACD32',         // Yellow green
    warning: '#FFD700',         // Gold
    error: '#CD853F',          // Peru
  },
  radius: 'sm',
  borderWidth: '1px',
  typography: {
    hero: {
      size: 'clamp(3rem, 8vw, 6rem)',
      weight: '700',
      tracking: '-0.02em',
      leading: '0.95',
    },
    h1: {
      size: 'clamp(2.5rem, 6vw, 4rem)',
      weight: '700',
      tracking: '-0.01em',
      leading: '1.1',
    },
    h2: {
      size: 'clamp(2rem, 5vw, 3rem)',
      weight: '600',
      tracking: '-0.01em',
      leading: '1.2',
    },
    h3: {
      size: 'clamp(1.5rem, 4vw, 2rem)',
      weight: '600',
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
      weight: '400',
      tracking: '0.05em',
      leading: '1.5',
    },
  },
};

