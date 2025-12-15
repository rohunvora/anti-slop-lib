/**
 * SWISS PRECISION - Design Guidance
 * 
 * References: Readymag, Linear
 */

import type { ReferenceSite } from '../types.js';

export const swissPrecisionReferences: ReferenceSite[] = [
  {
    name: 'Readymag',
    url: 'https://readymag.com/',
    stealThis: [
      'Grid-based severe typography',
      '1px borders everywhere',
      'No rounded corners',
      'Perfect spacing rhythm',
      'Single font family (weights create hierarchy)',
    ],
    avoidThis: [
      'Some pages are too minimal',
      'Navigation can be hard to find',
    ],
  },
  {
    name: 'Linear',
    url: 'https://linear.app/',
    stealThis: [
      'Perfect dark mode implementation',
      '1px border treatment',
      'Sharp corners',
      'Grid precision',
      'Confident button styles',
    ],
    avoidThis: [
      'Their marketing pages are more generic',
    ],
  },
];

export const swissPrecisionGuidance = {
  vibe: 'Grids, hierarchy, no decoration',
  bestFor: ['Enterprise', 'Fintech', 'Serious tools', 'Developer products'],
  keyPrinciples: [
    'Single font family = discipline',
    'Weights create hierarchy, not sizes',
    '1px borders only, no shadows',
    'Grid-based layouts',
    'True black/white, one accent max',
  ],
  commonMistakes: [
    'Using Inter (use Geist/IBM Plex Sans)',
    'Rounded corners (use sharp)',
    'Shadows (use borders)',
    'Multiple colors (use black/white)',
    'Centered layouts (use grid)',
  ],
  antiPatterns: [
    'rounded-xl, rounded-2xl, rounded-full on containers',
    'gradient backgrounds (especially purple-to-pink)',
    'blur/glassmorphism effects',
    'emerald/cyan/purple color combos',
    'centered hero with stacked text',
    'shadow-lg, shadow-xl on cards',
    'multiple font families (use single family with weights)',
    'decorative elements or illustrations',
  ],
};

