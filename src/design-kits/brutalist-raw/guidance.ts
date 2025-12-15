/**
 * BRUTALIST RAW - Design Guidance
 * 
 * References: Gumroad, The Drunken Canal
 */

import type { ReferenceSite } from '../types.js';

export const brutalistRawReferences: ReferenceSite[] = [
  {
    name: 'Gumroad',
    url: 'https://gumroad.com/',
    stealThis: [
      'Hard black borders everywhere',
      'Stark primary RGB colors',
      'Flat cards with offset shadows',
      'Raw HTML energy',
      'No rounded corners',
    ],
    avoidThis: [
      'Some pages are too chaotic',
    ],
  },
  {
    name: 'The Drunken Canal',
    url: 'https://www.thedrunkencanal.com/',
    stealThis: [
      'Unpolished raw HTML feel',
      'Intentionally rough typography',
      'Hard edges',
      'Punk energy',
    ],
    avoidThis: [
      'Can be hard to read',
    ],
  },
];

export const brutalistRawGuidance = {
  vibe: 'Intentionally rough, punk energy',
  bestFor: ['Agencies', 'Portfolios', 'Standing out', 'Art projects'],
  keyPrinciples: [
    'Hard edges only (no radius)',
    'Chunky borders (3px+)',
    'Offset shadows (brutalist style)',
    'Primary RGB colors',
    'Monospace for display',
  ],
  commonMistakes: [
    'Using Inter (use Space Mono)',
    'Rounded corners (use sharp)',
    'Soft shadows (use offset hard shadows)',
    'Muted colors (use primary RGB)',
    'Centered layouts (use asymmetric)',
  ],
  antiPatterns: [
    'rounded-xl, rounded-2xl, rounded-full on containers',
    'soft shadows (shadow-sm, shadow-md)',
    'muted/pastel colors',
    'gradient backgrounds',
    'blur/glassmorphism effects',
    'Inter, Space Grotesk, or other generic sans-serif fonts',
    'centered hero with stacked text',
    'smooth animations (use abrupt transitions)',
  ],
};

