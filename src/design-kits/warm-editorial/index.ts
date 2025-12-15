/**
 * WARM EDITORIAL - Complete Design Kit
 * 
 * Literary, thoughtful, New Yorker website vibe
 */

import type { DesignKit } from '../types.js';
import { warmEditorialTokens } from './tokens.js';
import { warmEditorialFonts } from './fonts.js';
import { warmEditorialTheme } from './theme.js';
import { warmEditorialComponents } from './components.js';
import { warmEditorialLayouts } from './layouts.js';
import { warmEditorialReferences, warmEditorialGuidance } from './guidance.js';

export const warmEditorialKit: DesignKit = {
  id: 'warm-editorial',
  name: 'Warm Editorial',
  description: 'Literary, thoughtful, the New Yorker website vibe',
  vibe: warmEditorialGuidance.vibe,

  fonts: {
    display: warmEditorialFonts.display,
    body: warmEditorialFonts.body,
    cssImports: warmEditorialFonts.cssImports,
    fallbackStack: warmEditorialFonts.fallbackStack,
  },

  tokens: warmEditorialTokens,

  tailwindExtend: warmEditorialTheme.extend,

  components: warmEditorialComponents,

  layouts: {
    heroAsymmetric: warmEditorialLayouts.heroAsymmetric,
    heroEditorial: warmEditorialLayouts.heroEditorial,
    grid: warmEditorialLayouts.grid,
  },

  references: {
    gold: warmEditorialReferences,
  },

  guidance: {
    antiPatterns: warmEditorialGuidance.antiPatterns,
  },

  validation: {
    slopScore: 0,
    accessibilityGrade: 'AA',
    uniqueFontSizes: 7, // hero, h1, h2, h3, body, small, caption
    hasAllComponents: true,
    darkModeComplete: true,
  },
};

export * from './tokens.js';
export * from './fonts.js';
export * from './theme.js';
export * from './components.js';
export * from './layouts.js';
export * from './guidance.js';

