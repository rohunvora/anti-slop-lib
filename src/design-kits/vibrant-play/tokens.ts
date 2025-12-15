/**
 * VIBRANT PLAY - Design Tokens
 * 
 * Bold colors, movement, joy
 * Cabinet Grotesk + Lexend
 */

import type { KitTokens } from '../types.js';

export const vibrantPlayTokens: KitTokens = {
  colors: {
    background: '#F7FFF7',      // Off-white
    foreground: '#1A535C',      // Dark teal
    primary: '#FF6B6B',         // Coral
    primaryForeground: '#FFFFFF',
    secondary: '#4ECDC4',       // Teal
    secondaryForeground: '#FFFFFF',
    muted: '#C8F7C5',           // Light green
    mutedForeground: '#4A7C7C',
    accent: '#FFE66D',          // Yellow
    accentForeground: '#1A535C',
    border: '#C8F7C5',
    ring: '#FF6B6B',
    success: '#4ECDC4',
    warning: '#FFE66D',
    error: '#FF6B6B',
  },
  colorsDark: {
    background: '#1A1A1A',
    foreground: '#F7FFF7',
    primary: '#FF6B6B',
    primaryForeground: '#FFFFFF',
    secondary: '#4ECDC4',
    secondaryForeground: '#1A1A1A',
    muted: '#2A2A2A',
    mutedForeground: '#AAAAAA',
    accent: '#FFE66D',
    accentForeground: '#1A1A1A',
    border: '#4A4A4A',
    ring: '#FF6B6B',
    success: '#4ECDC4',
    warning: '#FFE66D',
    error: '#FF6B6B',
  },
  radius: 'lg',
  borderWidth: '1px',
  typography: {
    hero: {
      size: 'clamp(3rem, 8vw, 6rem)',
      weight: '700',
      tracking: '-0.02em',
      leading: '1',
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
      tracking: '0',
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

