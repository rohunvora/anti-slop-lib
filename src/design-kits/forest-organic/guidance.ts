/**
 * FOREST ORGANIC - Design Guidance
 * 
 * References: Aesop, Patagonia
 */

import type { ReferenceSite } from '../types.js';

export const forestOrganicReferences: ReferenceSite[] = [
  {
    name: 'Aesop',
    url: 'https://www.aesop.com/',
    stealThis: [
      'Calm organic luxury',
      'Muted earth tones',
      'Negative space',
      'Serif + sans pairing',
      'Natural photography',
    ],
    avoidThis: [
      'Some pages are too minimal',
    ],
  },
  {
    name: 'Patagonia',
    url: 'https://www.patagonia.com/',
    stealThis: [
      'Trustworthy functionalism',
      'Earthy palettes',
      'Natural imagery',
      'Clear hierarchy',
    ],
    avoidThis: [
      'Some pages are too busy',
    ],
  },
];

export const forestOrganicGuidance = {
  vibe: 'Natural, calm, trustworthy',
  bestFor: ['Wellness', 'Eco-brands', 'Healthcare', 'Organic products'],
  keyPrinciples: [
    'Earthy color palette',
    'Serif headlines for authority',
    'Soft rounded corners',
    'Natural imagery',
    'Generous spacing',
  ],
  commonMistakes: [
    'Using Inter (use General Sans)',
    'Purple gradients (use earth tones)',
    'Sharp corners (use rounded-sm)',
    'Centered layouts (use asymmetric)',
  ],
  antiPatterns: [
    'purple, cyan, or bright neon colors',
    'gradient backgrounds',
    'sharp corners (rounded-none)',
    'blur/glassmorphism effects',
    '3D blob/orb decorative elements',
    'Inter, Space Grotesk, or other generic sans-serif fonts',
    'centered hero with stacked text',
    'shadow-lg, shadow-xl on cards',
  ],
};

