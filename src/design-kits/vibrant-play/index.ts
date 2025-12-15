/**
 * VIBRANT PLAY - Complete Design Kit
 */

import type { DesignKit } from '../types.js';
import { vibrantPlayTokens } from './tokens.js';
import { vibrantPlayFonts } from './fonts.js';
import { vibrantPlayTheme } from './theme.js';
import { vibrantPlayComponents } from './components.js';
import { vibrantPlayLayouts } from './layouts.js';
import { vibrantPlayReferences, vibrantPlayGuidance } from './guidance.js';

export const vibrantPlayKit: DesignKit = {
  id: 'vibrant-play',
  name: 'Vibrant Play',
  description: 'Bold colors, movement, joy',
  vibe: vibrantPlayGuidance.vibe,

  fonts: {
    display: vibrantPlayFonts.display,
    body: vibrantPlayFonts.body,
    cssImports: vibrantPlayFonts.cssImports,
    fallbackStack: vibrantPlayFonts.fallbackStack,
  },

  tokens: vibrantPlayTokens,

  tailwindExtend: vibrantPlayTheme.extend,

  components: vibrantPlayComponents,

  layouts: {
    heroAsymmetric: vibrantPlayLayouts.heroAsymmetric,
    heroEditorial: vibrantPlayLayouts.heroEditorial,
    grid: vibrantPlayLayouts.grid,
  },

  references: {
    gold: vibrantPlayReferences,
  },

  guidance: {
    antiPatterns: vibrantPlayGuidance.antiPatterns,
  },

  validation: {
    slopScore: 0,
    accessibilityGrade: 'AA',
    uniqueFontSizes: 7,
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

