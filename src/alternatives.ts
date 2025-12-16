/**
 * ANTI-SLOP ALTERNATIVES DATABASE
 * 
 * Curated alternatives to common AI slop patterns
 */

// ============================================================================
// FONT ALTERNATIVES
// ============================================================================

export interface FontSuggestion {
  name: string;
  style: 'serif' | 'sans' | 'display' | 'mono' | 'slab';
  vibe: string;
  source: 'google' | 'fontshare' | 'system' | 'paid';
  url?: string;
  weights: string;
  bestFor: string[];
  cssImport?: string;
}

export const FONT_ALTERNATIVES: FontSuggestion[] = [
  // SERIFS
  {
    name: 'Fraunces',
    style: 'serif',
    vibe: 'Quirky, wonky, full of personality',
    source: 'google',
    url: 'https://fonts.google.com/specimen/Fraunces',
    weights: '100-900, italic',
    bestFor: ['headlines', 'editorial', 'brands with personality'],
    cssImport: '@import url("https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,100..900&display=swap");',
  },
  {
    name: 'Playfair Display',
    style: 'serif',
    vibe: 'Elegant, high contrast, editorial',
    source: 'google',
    url: 'https://fonts.google.com/specimen/Playfair+Display',
    weights: '400-900, italic',
    bestFor: ['luxury', 'fashion', 'editorial'],
    cssImport: '@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400..900&display=swap");',
  },
  {
    name: 'Libre Baskerville',
    style: 'serif',
    vibe: 'Classic, readable, trustworthy',
    source: 'google',
    url: 'https://fonts.google.com/specimen/Libre+Baskerville',
    weights: '400, 700, italic',
    bestFor: ['body text', 'long-form', 'professional'],
  },
  {
    name: 'Cormorant Garamond',
    style: 'serif',
    vibe: 'Delicate, refined, French elegance',
    source: 'google',
    url: 'https://fonts.google.com/specimen/Cormorant+Garamond',
    weights: '300-700, italic',
    bestFor: ['luxury', 'fashion', 'art'],
  },
  {
    name: 'Newsreader',
    style: 'serif',
    vibe: 'Modern editorial, newspaper-inspired',
    source: 'google',
    url: 'https://fonts.google.com/specimen/Newsreader',
    weights: '200-800, italic',
    bestFor: ['blogs', 'news', 'long reads'],
  },
  {
    name: 'Instrument Serif',
    style: 'serif',
    vibe: 'Contemporary, clean, versatile',
    source: 'google',
    url: 'https://fonts.google.com/specimen/Instrument+Serif',
    weights: '400, italic',
    bestFor: ['headlines', 'modern editorial'],
  },

  // DISPLAY / UNUSUAL SANS
  {
    name: 'Cabinet Grotesk',
    style: 'display',
    vibe: 'Bold, geometric, distinctive',
    source: 'fontshare',
    url: 'https://www.fontshare.com/fonts/cabinet-grotesk',
    weights: '100-900',
    bestFor: ['headlines', 'tech with personality', 'startups'],
  },
  {
    name: 'Clash Display',
    style: 'display',
    vibe: 'Strong, contemporary, impactful',
    source: 'fontshare',
    url: 'https://www.fontshare.com/fonts/clash-display',
    weights: '200-700',
    bestFor: ['headlines', 'branding', 'impact'],
  },
  {
    name: 'Satoshi',
    style: 'sans',
    vibe: 'Modern, geometric, but with soul',
    source: 'fontshare',
    url: 'https://www.fontshare.com/fonts/satoshi',
    weights: '300-900, italic',
    bestFor: ['body', 'ui', 'modern brands'],
  },
  {
    name: 'General Sans',
    style: 'sans',
    vibe: 'Clean, friendly, professional',
    source: 'fontshare',
    url: 'https://www.fontshare.com/fonts/general-sans',
    weights: '200-700, italic',
    bestFor: ['body', 'ui', 'professional'],
  },
  {
    name: 'Zodiak',
    style: 'display',
    vibe: 'Soft, organic, friendly serif-sans hybrid',
    source: 'fontshare',
    url: 'https://www.fontshare.com/fonts/zodiak',
    weights: '200-800, italic',
    bestFor: ['wellness', 'lifestyle', 'organic brands'],
  },
  {
    name: 'Erode',
    style: 'serif',
    vibe: 'Sharp, editorial, contemporary',
    source: 'fontshare',
    url: 'https://www.fontshare.com/fonts/erode',
    weights: '300-700, italic',
    bestFor: ['editorial', 'culture', 'sophisticated'],
  },
  {
    name: 'Gambetta',
    style: 'serif',
    vibe: 'Warm, human, literary',
    source: 'fontshare',
    url: 'https://www.fontshare.com/fonts/gambetta',
    weights: '300-700, italic',
    bestFor: ['publishing', 'books', 'thoughtful'],
  },

  // BODY-FRIENDLY ALTERNATIVES
  {
    name: 'IBM Plex Sans',
    style: 'sans',
    vibe: 'Corporate but with character',
    source: 'google',
    url: 'https://fonts.google.com/specimen/IBM+Plex+Sans',
    weights: '100-700, italic',
    bestFor: ['body', 'ui', 'enterprise'],
  },
  {
    name: 'Source Sans 3',
    style: 'sans',
    vibe: 'Adobe quality, open source',
    source: 'google',
    url: 'https://fonts.google.com/specimen/Source+Sans+3',
    weights: '200-900, italic',
    bestFor: ['body', 'ui', 'readable'],
  },
  {
    name: 'Atkinson Hyperlegible',
    style: 'sans',
    vibe: 'Accessibility-focused, distinctive',
    source: 'google',
    url: 'https://fonts.google.com/specimen/Atkinson+Hyperlegible',
    weights: '400, 700, italic',
    bestFor: ['accessibility', 'body', 'inclusive'],
  },
  {
    name: 'Lexend',
    style: 'sans',
    vibe: 'Designed for reading ease',
    source: 'google',
    url: 'https://fonts.google.com/specimen/Lexend',
    weights: '100-900',
    bestFor: ['body', 'readability', 'dyslexia-friendly'],
  },

  // MONOSPACE
  {
    name: 'JetBrains Mono',
    style: 'mono',
    vibe: 'Developer-focused, ligatures',
    source: 'google',
    url: 'https://fonts.google.com/specimen/JetBrains+Mono',
    weights: '100-800, italic',
    bestFor: ['code', 'developer tools', 'terminal'],
  },
  {
    name: 'Fira Code',
    style: 'mono',
    vibe: 'Coding ligatures, popular',
    source: 'google',
    url: 'https://fonts.google.com/specimen/Fira+Code',
    weights: '300-700',
    bestFor: ['code', 'programming'],
  },
  {
    name: 'Space Mono',
    style: 'mono',
    vibe: 'Quirky, retro-futurist',
    source: 'google',
    url: 'https://fonts.google.com/specimen/Space+Mono',
    weights: '400, 700, italic',
    bestFor: ['code', 'retro', 'display'],
  },
  {
    name: 'Recursive',
    style: 'mono',
    vibe: 'Variable, casual to mono spectrum',
    source: 'google',
    url: 'https://fonts.google.com/specimen/Recursive',
    weights: '300-1000',
    bestFor: ['code', 'ui', 'versatile'],
  },
];

// ============================================================================
// COLOR PALETTE ALTERNATIVES
// ============================================================================

export interface ColorPalette {
  name: string;
  vibe: string;
  bestFor: string[];
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textMuted: string;
    accent: string;
    border: string;
  };
  tailwindConfig: string;
}

export const COLOR_PALETTES: ColorPalette[] = [
  {
    name: 'Warm Editorial',
    vibe: 'Sophisticated, literary, inviting',
    bestFor: ['blogs', 'publishing', 'newsletters', 'thoughtful products'],
    colors: {
      primary: '#B8860B',
      secondary: '#8B4513',
      background: '#FAF7F2',
      surface: '#FFFFFF',
      text: '#2D2A26',
      textMuted: '#6B6560',
      accent: '#CD853F',
      border: '#E8E4DD',
    },
    tailwindConfig: `
colors: {
  primary: '#B8860B',
  secondary: '#8B4513',
  background: '#FAF7F2',
  surface: '#FFFFFF',
  foreground: '#2D2A26',
  muted: '#6B6560',
  accent: '#CD853F',
  border: '#E8E4DD',
}`,
  },
  {
    name: 'Forest',
    vibe: 'Natural, calm, sustainable',
    bestFor: ['eco brands', 'wellness', 'outdoor', 'organic'],
    colors: {
      primary: '#2D5A27',
      secondary: '#1B4D3E',
      background: '#F5F5DC',
      surface: '#FAFAF5',
      text: '#1C1C1C',
      textMuted: '#4A4A4A',
      accent: '#8FBC8F',
      border: '#D4D4B8',
    },
    tailwindConfig: `
colors: {
  primary: '#2D5A27',
  secondary: '#1B4D3E',
  background: '#F5F5DC',
  surface: '#FAFAF5',
  foreground: '#1C1C1C',
  muted: '#4A4A4A',
  accent: '#8FBC8F',
  border: '#D4D4B8',
}`,
  },
  {
    name: 'Brutalist',
    vibe: 'Raw, bold, uncompromising',
    bestFor: ['portfolio', 'art', 'experimental', 'design agencies'],
    colors: {
      primary: '#FF0000',
      secondary: '#0000FF',
      background: '#FFFFFF',
      surface: '#F0F0F0',
      text: '#000000',
      textMuted: '#666666',
      accent: '#FFFF00',
      border: '#000000',
    },
    tailwindConfig: `
colors: {
  primary: '#FF0000',
  secondary: '#0000FF',
  background: '#FFFFFF',
  surface: '#F0F0F0',
  foreground: '#000000',
  muted: '#666666',
  accent: '#FFFF00',
  border: '#000000',
}`,
  },
  {
    name: 'Monochrome',
    vibe: 'Minimal, sophisticated, timeless',
    bestFor: ['luxury', 'fashion', 'minimal products', 'architecture'],
    colors: {
      primary: '#000000',
      secondary: '#333333',
      background: '#FAFAFA',
      surface: '#FFFFFF',
      text: '#1A1A1A',
      textMuted: '#737373',
      accent: '#000000',
      border: '#E5E5E5',
    },
    tailwindConfig: `
colors: {
  primary: '#000000',
  secondary: '#333333',
  background: '#FAFAFA',
  surface: '#FFFFFF',
  foreground: '#1A1A1A',
  muted: '#737373',
  accent: '#000000',
  border: '#E5E5E5',
}`,
  },
  {
    name: 'Ocean',
    vibe: 'Fresh, trustworthy, calming',
    bestFor: ['finance', 'healthcare', 'productivity', 'B2B'],
    colors: {
      primary: '#0077B6',
      secondary: '#023E8A',
      background: '#F8FCFF',
      surface: '#FFFFFF',
      text: '#03045E',
      textMuted: '#4A6FA5',
      accent: '#00B4D8',
      border: '#CAE9FF',
    },
    tailwindConfig: `
colors: {
  primary: '#0077B6',
  secondary: '#023E8A',
  background: '#F8FCFF',
  surface: '#FFFFFF',
  foreground: '#03045E',
  muted: '#4A6FA5',
  accent: '#00B4D8',
  border: '#CAE9FF',
}`,
  },
  {
    name: 'Terracotta',
    vibe: 'Earthy, warm, artisanal',
    bestFor: ['food', 'craft', 'home goods', 'lifestyle'],
    colors: {
      primary: '#C2703D',
      secondary: '#8B4513',
      background: '#FDF5E6',
      surface: '#FFFFFF',
      text: '#3D2914',
      textMuted: '#7D6350',
      accent: '#E07B39',
      border: '#E8DDD0',
    },
    tailwindConfig: `
colors: {
  primary: '#C2703D',
  secondary: '#8B4513',
  background: '#FDF5E6',
  surface: '#FFFFFF',
  foreground: '#3D2914',
  muted: '#7D6350',
  accent: '#E07B39',
  border: '#E8DDD0',
}`,
  },
  {
    name: 'Midnight',
    vibe: 'Dark, sophisticated, modern',
    bestFor: ['developer tools', 'gaming', 'music', 'nightlife'],
    colors: {
      primary: '#E94560',
      secondary: '#533483',
      background: '#0F0F1A',
      surface: '#1A1A2E',
      text: '#EAEAEA',
      textMuted: '#9090A0',
      accent: '#E94560',
      border: '#2A2A3E',
    },
    tailwindConfig: `
colors: {
  primary: '#E94560',
  secondary: '#533483',
  background: '#0F0F1A',
  surface: '#1A1A2E',
  foreground: '#EAEAEA',
  muted: '#9090A0',
  accent: '#E94560',
  border: '#2A2A3E',
}`,
  },
  {
    name: 'Pastel Energy',
    vibe: 'Playful, youthful, creative',
    bestFor: ['kids', 'creative tools', 'social', 'entertainment'],
    colors: {
      primary: '#FF6B6B',
      secondary: '#4ECDC4',
      background: '#F7FFF7',
      surface: '#FFFFFF',
      text: '#1A535C',
      textMuted: '#4A7C7C',
      accent: '#FFE66D',
      border: '#C8F7C5',
    },
    tailwindConfig: `
colors: {
  primary: '#FF6B6B',
  secondary: '#4ECDC4',
  background: '#F7FFF7',
  surface: '#FFFFFF',
  foreground: '#1A535C',
  muted: '#4A7C7C',
  accent: '#FFE66D',
  border: '#C8F7C5',
}`,
  },
  {
    name: 'Noir',
    vibe: 'Dramatic, cinematic, bold',
    bestFor: ['photography', 'film', 'luxury', 'exclusive'],
    colors: {
      primary: '#C9A227',
      secondary: '#8B7355',
      background: '#0A0A0A',
      surface: '#141414',
      text: '#F5F5F5',
      textMuted: '#888888',
      accent: '#C9A227',
      border: '#2A2A2A',
    },
    tailwindConfig: `
colors: {
  primary: '#C9A227',
  secondary: '#8B7355',
  background: '#0A0A0A',
  surface: '#141414',
  foreground: '#F5F5F5',
  muted: '#888888',
  accent: '#C9A227',
  border: '#2A2A2A',
}`,
  },
  {
    name: 'Lavender Fields',
    vibe: 'Soft, serene, gentle',
    bestFor: ['wellness', 'meditation', 'self-care', 'therapy'],
    colors: {
      primary: '#9B7EBD',
      secondary: '#6B5B95',
      background: '#FAF8FC',
      surface: '#FFFFFF',
      text: '#3E3252',
      textMuted: '#7B6E8C',
      accent: '#D4A5A5',
      border: '#E8E0F0',
    },
    tailwindConfig: `
colors: {
  primary: '#9B7EBD',
  secondary: '#6B5B95',
  background: '#FAF8FC',
  surface: '#FFFFFF',
  foreground: '#3E3252',
  muted: '#7B6E8C',
  accent: '#D4A5A5',
  border: '#E8E0F0',
}`,
  },
];

// ============================================================================
// LAYOUT ALTERNATIVES
// ============================================================================

export interface LayoutPattern {
  name: string;
  description: string;
  cssGrid: string;
  htmlExample: string;
  avoids: string[];
}

export const LAYOUT_ALTERNATIVES: LayoutPattern[] = [
  {
    name: 'Asymmetric Split',
    description: 'Content on one side, larger visual on the other. Not centered.',
    avoids: ['centered hero', 'text stacking'],
    cssGrid: `
.hero {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 4rem;
  align-items: center;
}`,
    htmlExample: `
<section class="hero">
  <div class="content">
    <h1>Headline here</h1>
    <p>Description text</p>
    <button>CTA</button>
  </div>
  <div class="visual">
    <!-- Image or illustration -->
  </div>
</section>`,
  },
  {
    name: 'Editorial Stack',
    description: 'Large headline spanning full width, content below in columns',
    avoids: ['centered everything', 'small contained hero'],
    cssGrid: `
.editorial-hero {
  display: grid;
  grid-template-rows: auto auto;
}
.editorial-hero h1 {
  font-size: clamp(3rem, 10vw, 8rem);
  line-height: 0.95;
}
.editorial-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  margin-top: 3rem;
}`,
    htmlExample: `
<section class="editorial-hero">
  <h1>Big bold headline that spans the width</h1>
  <div class="editorial-content">
    <p class="lead">Main descriptive text here...</p>
    <nav class="meta">
      <a href="#">Link 1</a>
      <a href="#">Link 2</a>
    </nav>
  </div>
</section>`,
  },
  {
    name: 'Offset Grid',
    description: 'Items offset from each other, not perfectly aligned',
    avoids: ['perfect 3-column grid', 'same-size cards'],
    cssGrid: `
.offset-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1rem;
}
.offset-grid > *:nth-child(1) { grid-column: 1 / 5; }
.offset-grid > *:nth-child(2) { grid-column: 6 / 10; margin-top: 4rem; }
.offset-grid > *:nth-child(3) { grid-column: 9 / 13; margin-top: 8rem; }`,
    htmlExample: `
<div class="offset-grid">
  <div class="card">Item 1</div>
  <div class="card">Item 2</div>
  <div class="card">Item 3</div>
</div>`,
  },
  {
    name: 'Full Bleed Hero',
    description: 'Hero spans edge to edge with overlapping elements',
    avoids: ['contained hero', 'max-width constraints'],
    cssGrid: `
.full-bleed {
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  position: relative;
}
.full-bleed-content {
  position: absolute;
  bottom: 2rem;
  left: 5%;
  max-width: 600px;
}`,
    htmlExample: `
<section class="full-bleed">
  <img src="hero.jpg" alt="" />
  <div class="full-bleed-content">
    <h1>Overlapping headline</h1>
    <p>Description below</p>
  </div>
</section>`,
  },
];

// ============================================================================
// COMPONENT STYLE ALTERNATIVES
// ============================================================================

export interface ComponentStyle {
  name: string;
  description: string;
  avoids: string[];
  css: string;
}

export const BUTTON_ALTERNATIVES: ComponentStyle[] = [
  {
    name: 'Brutalist Button',
    description: 'Sharp corners, bold border, no shadow',
    avoids: ['rounded-lg', 'shadow', 'gradient'],
    css: `
.btn-brutalist {
  padding: 0.75rem 1.5rem;
  border: 3px solid currentColor;
  background: transparent;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: background 0.2s, color 0.2s;
}
.btn-brutalist:hover {
  background: black;
  color: white;
}`,
  },
  {
    name: 'Underline Button',
    description: 'Text with animated underline, no box',
    avoids: ['box shape', 'background color'],
    css: `
.btn-underline {
  padding: 0.5rem 0;
  background: none;
  border: none;
  position: relative;
  font-weight: 500;
}
.btn-underline::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.3s ease;
}
.btn-underline:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}`,
  },
  {
    name: 'Pill with Arrow',
    description: 'Pill shape with arrow that animates on hover',
    avoids: ['generic rounded-full', 'static'],
    css: `
.btn-pill-arrow {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border-radius: 9999px;
  background: black;
  color: white;
}
.btn-pill-arrow svg {
  transition: transform 0.2s;
}
.btn-pill-arrow:hover svg {
  transform: translateX(4px);
}`,
  },
  {
    name: 'Outlined with Fill',
    description: 'Outline that fills on hover',
    avoids: ['solid background by default'],
    css: `
.btn-outline-fill {
  padding: 0.75rem 1.5rem;
  border: 2px solid black;
  background: transparent;
  position: relative;
  overflow: hidden;
  z-index: 1;
}
.btn-outline-fill::before {
  content: '';
  position: absolute;
  inset: 0;
  background: black;
  transform: translateY(100%);
  transition: transform 0.3s ease;
  z-index: -1;
}
.btn-outline-fill:hover {
  color: white;
}
.btn-outline-fill:hover::before {
  transform: translateY(0);
}`,
  },
];

export const CARD_ALTERNATIVES: ComponentStyle[] = [
  {
    name: 'Bordered Card',
    description: 'Sharp corners, visible border, no shadow',
    avoids: ['rounded-xl', 'shadow-md'],
    css: `
.card-bordered {
  padding: 1.5rem;
  border: 2px solid #000;
  background: white;
}
.card-bordered:hover {
  background: #f5f5f5;
}`,
  },
  {
    name: 'Inset Card',
    description: 'Subtle inset shadow, appears pressed in',
    avoids: ['elevated shadow', 'floating effect'],
    css: `
.card-inset {
  padding: 1.5rem;
  background: #f8f8f8;
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.06);
  border-radius: 4px;
}`,
  },
  {
    name: 'Accent Border Card',
    description: 'Colored left border, otherwise minimal',
    avoids: ['full border', 'rounded corners'],
    css: `
.card-accent {
  padding: 1.5rem;
  padding-left: 1.75rem;
  border-left: 4px solid var(--accent-color, #B8860B);
  background: #fafafa;
}`,
  },
  {
    name: 'Hover Lift Card',
    description: 'Flat by default, lifts on hover with hard shadow',
    avoids: ['always-elevated', 'soft shadows'],
    css: `
.card-lift {
  padding: 1.5rem;
  border: 1px solid #e0e0e0;
  background: white;
  transition: transform 0.2s, box-shadow 0.2s;
}
.card-lift:hover {
  transform: translate(-4px, -4px);
  box-shadow: 4px 4px 0 #000;
}`,
  },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function getFontsForVibe(vibe: string): FontSuggestion[] {
  const vibeWords = vibe.toLowerCase().split(/\s+/);
  return FONT_ALTERNATIVES.filter(font => 
    vibeWords.some(word => font.vibe.toLowerCase().includes(word))
  );
}

export function getPalettesForIndustry(industry: string): ColorPalette[] {
  const industryWords = industry.toLowerCase().split(/\s+/);
  return COLOR_PALETTES.filter(palette =>
    palette.bestFor.some(use => 
      industryWords.some(word => use.toLowerCase().includes(word))
    )
  );
}

export function getRandomAlternative<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function suggestFontPairing(): { headline: FontSuggestion; body: FontSuggestion } {
  const serifs = FONT_ALTERNATIVES.filter(f => f.style === 'serif' || f.style === 'display');
  const sansSerifs = FONT_ALTERNATIVES.filter(f => f.style === 'sans');
  
  return {
    headline: getRandomAlternative(serifs),
    body: getRandomAlternative(sansSerifs),
  };
}





