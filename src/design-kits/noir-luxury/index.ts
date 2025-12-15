/**
 * NOIR LUXURY - Complete Design Kit
 */

import type { DesignKit } from '../types.js';
import { noirLuxuryTokens } from './tokens.js';
import { noirLuxuryFonts } from './fonts.js';
import { noirLuxuryTheme } from './theme.js';
import { noirLuxuryComponents } from './components.js';
import { noirLuxuryLayouts } from './layouts.js';
import { noirLuxuryReferences, noirLuxuryGuidance } from './guidance.js';

export const noirLuxuryKit: DesignKit = {
  id: 'noir-luxury',
  name: 'Noir Luxury',
  description: 'Dark, exclusive, whispered elegance',
  vibe: noirLuxuryGuidance.vibe,

  fonts: {
    display: noirLuxuryFonts.display,
    body: noirLuxuryFonts.body,
    cssImports: noirLuxuryFonts.cssImports,
    fallbackStack: noirLuxuryFonts.fallbackStack,
  },

  tokens: noirLuxuryTokens,

  tailwindExtend: noirLuxuryTheme.extend,

  components: noirLuxuryComponents,

  layouts: {
    heroAsymmetric: noirLuxuryLayouts.heroAsymmetric,
    heroEditorial: noirLuxuryLayouts.heroEditorial,
    grid: noirLuxuryLayouts.grid,
  },

  references: {
    gold: noirLuxuryReferences,
  },

  guidance: {
    antiPatterns: noirLuxuryGuidance.antiPatterns,
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

