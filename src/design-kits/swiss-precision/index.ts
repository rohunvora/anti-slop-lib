/**
 * SWISS PRECISION - Complete Design Kit
 */

import type { DesignKit } from '../types.js';
import { swissPrecisionTokens } from './tokens.js';
import { swissPrecisionFonts } from './fonts.js';
import { swissPrecisionTheme } from './theme.js';
import { swissPrecisionComponents } from './components.js';
import { swissPrecisionLayouts } from './layouts.js';
import { swissPrecisionReferences, swissPrecisionGuidance } from './guidance.js';

export const swissPrecisionKit: DesignKit = {
  id: 'swiss-precision',
  name: 'Swiss Precision',
  description: 'Grids, hierarchy, no decoration',
  vibe: swissPrecisionGuidance.vibe,

  fonts: {
    display: swissPrecisionFonts.display,
    body: swissPrecisionFonts.body,
    cssImports: swissPrecisionFonts.cssImports,
    fallbackStack: swissPrecisionFonts.fallbackStack,
  },

  tokens: swissPrecisionTokens,

  tailwindExtend: swissPrecisionTheme.extend,

  components: swissPrecisionComponents,

  layouts: {
    heroAsymmetric: swissPrecisionLayouts.heroAsymmetric,
    heroEditorial: swissPrecisionLayouts.heroEditorial,
    grid: swissPrecisionLayouts.grid,
  },

  references: {
    gold: swissPrecisionReferences,
  },

  guidance: {
    antiPatterns: swissPrecisionGuidance.antiPatterns,
  },

  validation: {
    slopScore: 0,
    accessibilityGrade: 'AAA',
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

