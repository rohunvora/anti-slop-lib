/**
 * NOIR LUXURY - Design Guidance
 * 
 * References: SSENSE, Oribe
 */

import type { ReferenceSite } from '../types.js';

export const noirLuxuryReferences: ReferenceSite[] = [
  {
    name: 'SSENSE',
    url: 'https://www.ssense.com/',
    stealThis: [
      'Brutal-luxury black/white',
      'Minimal navigation',
      'Large serif headlines',
      'Gold/black ratios',
      'Dark mode perfection',
    ],
    avoidThis: [
      'Some pages are too minimal',
    ],
  },
  {
    name: 'Oribe',
    url: 'https://www.oribe.com/',
    stealThis: [
      'High-end beauty aesthetic',
      'Gold accents',
      'Dark backgrounds',
      'Elegant typography',
    ],
    avoidThis: [
      'Some pages are too busy',
    ],
  },
];

export const noirLuxuryGuidance = {
  vibe: 'Dark, exclusive, whispered elegance',
  bestFor: ['Fashion', 'Photography', 'Premium products', 'Luxury brands'],
  keyPrinciples: [
    'Near-black backgrounds',
    'Gold accents sparingly',
    'Large serif headlines',
    'Minimal borders',
    'Whisper don\'t shout',
  ],
  commonMistakes: [
    'Using Inter (use Satoshi)',
    'Purple gradients (use gold/black)',
    'Rounded corners (use sharp)',
    'Centered layouts (use asymmetric)',
  ],
  antiPatterns: [
    'purple, cyan, or bright colors',
    'gradient backgrounds',
    'rounded-xl, rounded-2xl, rounded-full on containers',
    'blur/glassmorphism effects',
    'bright white backgrounds',
    'Inter, Space Grotesk, or other generic sans-serif fonts',
    'centered hero with stacked text',
    'shadow-lg, shadow-xl on cards',
    '3D blob/orb decorative elements',
  ],
};

