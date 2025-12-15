/**
 * BRUTALIST RAW - Complete Design Kit
 */

import type { DesignKit } from '../types.js';
import { brutalistRawTokens } from './tokens.js';
import { brutalistRawFonts } from './fonts.js';
import { brutalistRawTheme } from './theme.js';
import { brutalistRawComponents } from './components.js';
import { brutalistRawLayouts } from './layouts.js';
import { brutalistRawReferences, brutalistRawGuidance } from './guidance.js';

export const brutalistRawKit: DesignKit = {
  id: 'brutalist-raw',
  name: 'Brutalist Raw',
  description: 'Intentionally rough, punk energy',
  vibe: brutalistRawGuidance.vibe,

  fonts: {
    display: brutalistRawFonts.display,
    body: brutalistRawFonts.body,
    mono: brutalistRawFonts.mono,
    cssImports: brutalistRawFonts.cssImports,
    fallbackStack: brutalistRawFonts.fallbackStack,
  },

  tokens: brutalistRawTokens,

  tailwindExtend: brutalistRawTheme.extend,

  components: brutalistRawComponents,

  layouts: {
    heroAsymmetric: brutalistRawLayouts.heroAsymmetric,
    heroEditorial: brutalistRawLayouts.heroEditorial,
    grid: brutalistRawLayouts.grid,
  },

  references: {
    gold: brutalistRawReferences,
  },

  guidance: {
    antiPatterns: brutalistRawGuidance.antiPatterns,
  },

  validation: {
    slopScore: 0,
    accessibilityGrade: 'AA',
    uniqueFontSizes: 8, // includes mono
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

