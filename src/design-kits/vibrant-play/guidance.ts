/**
 * VIBRANT PLAY - Design Guidance
 * 
 * References: LottieFiles, Duolingo
 */

import type { ReferenceSite } from '../types.js';

export const vibrantPlayReferences: ReferenceSite[] = [
  {
    name: 'LottieFiles',
    url: 'https://lottiefiles.com/',
    stealThis: [
      'Bright, motion-heavy design',
      'Gen Z friendly',
      'Rounded corners',
      'Playful animations',
      'Bold color palette',
    ],
    avoidThis: [
      'Some pages are too busy',
    ],
  },
  {
    name: 'Duolingo',
    url: 'https://www.duolingo.com/',
    stealThis: [
      'Button "squish" animations',
      'Rounded corners',
      'Friendly color palette',
      'Playful interactions',
    ],
    avoidThis: [
      'Some pages are too generic',
    ],
  },
];

export const vibrantPlayGuidance = {
  vibe: 'Bold colors, movement, joy',
  bestFor: ['Consumer apps', 'Creative tools', 'Gen Z', 'Entertainment'],
  keyPrinciples: [
    'Bold color palette',
    'Rounded corners (lg)',
    'Playful animations',
    'Friendly typography',
    'Movement and energy',
  ],
  commonMistakes: [
    'Using Inter (use Cabinet Grotesk)',
    'Purple gradients (use coral/teal)',
    'Sharp corners (use rounded-lg)',
    'Centered layouts (use asymmetric)',
  ],
  antiPatterns: [
    'purple-to-pink gradients (use coral/teal/yellow)',
    'sharp corners (rounded-none)',
    'muted/pastel colors',
    'blur/glassmorphism effects',
    'Inter, Space Grotesk, or other generic sans-serif fonts',
    'centered hero with stacked text',
    'shadow-lg, shadow-xl on cards',
    'dark mode only (this kit should be bright)',
  ],
};

