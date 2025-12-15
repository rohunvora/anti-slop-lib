/**
 * FOREST ORGANIC - Design Tokens
 * 
 * Natural, calm, trustworthy
 * Newsreader (serif) + General Sans
 */

import type { KitTokens } from '../types.js';

export const forestOrganicTokens: KitTokens = {
  colors: {
    background: '#F5F5DC',      // Beige
    foreground: '#1C1C1C',      // Dark
    primary: '#2D5A27',          // Deep green
    primaryForeground: '#FFFFFF',
    secondary: '#1B4D3E',       // Dark teal
    secondaryForeground: '#FFFFFF',
    muted: '#D4D4B8',           // Light beige
    mutedForeground: '#4A4A4A',
    accent: '#8FBC8F',           // Light green
    accentForeground: '#1C1C1C',
    border: '#D4D4B8',
    ring: '#2D5A27',
    success: '#2D5A27',
    warning: '#8B7355',
    error: '#8B4513',
  },
  colorsDark: {
    background: '#1A1F1A',
    foreground: '#F5F5DC',
    primary: '#8FBC8F',
    primaryForeground: '#1A1F1A',
    secondary: '#6B8E6B',
    secondaryForeground: '#1A1F1A',
    muted: '#2A352A',
    mutedForeground: '#A8B8A8',
    accent: '#A8D8A8',
    accentForeground: '#1A1F1A',
    border: '#3A4A3A',
    ring: '#8FBC8F',
    success: '#8FBC8F',
    warning: '#B8A878',
    error: '#B88A5A',
  },
  radius: 'sm',
  borderWidth: '1px',
  typography: {
    hero: {
      size: 'clamp(3rem, 8vw, 5rem)',
      weight: '700',
      tracking: '-0.01em',
      leading: '1.1',
    },
    h1: {
      size: 'clamp(2.5rem, 6vw, 4rem)',
      weight: '700',
      tracking: '-0.01em',
      leading: '1.2',
    },
    h2: {
      size: 'clamp(2rem, 5vw, 3rem)',
      weight: '600',
      tracking: '0',
      leading: '1.3',
    },
    h3: {
      size: 'clamp(1.5rem, 4vw, 2rem)',
      weight: '600',
      tracking: '0',
      leading: '1.4',
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

