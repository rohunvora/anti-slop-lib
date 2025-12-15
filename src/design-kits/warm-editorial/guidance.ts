/**
 * WARM EDITORIAL - Design Guidance
 * 
 * References: The Atlantic, Substack
 * Steal this, avoid that
 */

import type { ReferenceSite } from '../types.js';

export const warmEditorialReferences: ReferenceSite[] = [
  {
    name: 'The Atlantic',
    url: 'https://www.theatlantic.com/',
    stealThis: [
      'Cream background (#FAF7F2) with dark text',
      'Serif headlines (Fraunces) at large sizes',
      'Border treatments instead of shadows',
      'Asymmetric layouts, not centered',
      'Muted secondary text for hierarchy',
    ],
    avoidThis: [
      'Their footer is generic',
      'Some pages use too much white space',
    ],
  },
  {
    name: 'Substack',
    url: 'https://substack.com/',
    stealThis: [
      'Reader view typography rhythm',
      'Warm neutral palette',
      'Underline link animations',
      'Editorial stack layout',
      'Minimal navigation',
    ],
    avoidThis: [
      'Their marketing pages are more generic',
      'Some CTAs are too corporate',
    ],
  },
];

export const warmEditorialGuidance = {
  vibe: 'Literary, thoughtful, the New Yorker website vibe',
  bestFor: ['Blogs', 'Newsletters', 'SaaS with substance', 'Publishing platforms'],
  keyPrinciples: [
    'Use serif for headlines to create hierarchy',
    'Cream backgrounds feel warm, not sterile',
    'Borders > shadows for editorial feel',
    'Never center everything—use asymmetric layouts',
    'Muted colors create reading rhythm',
  ],
  commonMistakes: [
    'Centering the hero (use asymmetric split)',
    'Using Inter or Space Grotesk (use Satoshi)',
    'Purple gradients (use warm earth tones)',
    'Rounded-xl cards (use sharp corners with borders)',
    'Generic CTAs (use underline buttons)',
  ],
  antiPatterns: [
    'rounded-xl, rounded-2xl, rounded-full on containers',
    'gradient backgrounds (especially purple-to-pink)',
    'blur/glassmorphism effects',
    'centered hero with stacked text',
    'shadow-lg, shadow-xl on cards',
    'Inter, Space Grotesk, or other generic sans-serif fonts',
    'bright purple, cyan, or emerald color combos',
    '3D blob/orb decorative elements',
  ],
};

