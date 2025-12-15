/**
 * FOREST ORGANIC - Complete Design Kit
 */

import type { DesignKit } from '../types.js';
import { forestOrganicTokens } from './tokens.js';
import { forestOrganicFonts } from './fonts.js';
import { forestOrganicTheme } from './theme.js';
import { forestOrganicComponents } from './components.js';
import { forestOrganicLayouts } from './layouts.js';
import { forestOrganicReferences, forestOrganicGuidance } from './guidance.js';

export const forestOrganicKit: DesignKit = {
  id: 'forest-organic',
  name: 'Forest Organic',
  description: 'Natural, calm, trustworthy',
  vibe: forestOrganicGuidance.vibe,

  fonts: {
    display: forestOrganicFonts.display,
    body: forestOrganicFonts.body,
    cssImports: forestOrganicFonts.cssImports,
    fallbackStack: forestOrganicFonts.fallbackStack,
  },

  tokens: forestOrganicTokens,

  tailwindExtend: forestOrganicTheme.extend,

  components: forestOrganicComponents,

  layouts: {
    heroAsymmetric: forestOrganicLayouts.heroAsymmetric,
    heroEditorial: forestOrganicLayouts.heroEditorial,
    grid: forestOrganicLayouts.grid,
  },

  references: {
    gold: forestOrganicReferences,
  },

  guidance: {
    antiPatterns: forestOrganicGuidance.antiPatterns,
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

