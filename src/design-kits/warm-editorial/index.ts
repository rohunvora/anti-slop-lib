/**
 * WARM EDITORIAL - Complete Design Kit
 * 
 * Literary, thoughtful, New Yorker website vibe
 */

import type { DesignKit, KitTokens, FontDefinition, ComponentVariants, ReferenceSite } from '../types.js';

// --- TOKENS ---
const tokens: KitTokens = {
  colors: {
    background: '#FAF7F2',      // Cream
    foreground: '#2D2A26',     // Dark brown-black
    primary: '#B8860B',         // Dark goldenrod
    primaryForeground: '#FFFFFF',
    secondary: '#8B4513',      // Saddle brown
    secondaryForeground: '#FFFFFF',
    muted: '#E8E4DD',          // Light beige
    mutedForeground: '#6B6560', // Muted brown
    accent: '#CD853F',         // Peru (warm accent)
    accentForeground: '#FFFFFF',
    border: '#D4C5B0',         // Warm border
    ring: '#B8860B',
    success: '#6B8E23',        // Olive drab
    warning: '#DAA520',        // Goldenrod
    error: '#8B4513',          // Saddle brown (muted error)
  },
  colorsDark: {
    background: '#1A1815',     // Dark brown
    foreground: '#F5F0E8',     // Cream text
    primary: '#DAA520',        // Lighter goldenrod
    primaryForeground: '#1A1815',
    secondary: '#CD853F',      // Peru
    secondaryForeground: '#1A1815',
    muted: '#3A352F',          // Dark muted
    mutedForeground: '#A89F94', // Light muted
    accent: '#F4A460',         // Sandy brown
    accentForeground: '#1A1815',
    border: '#4A4439',         // Dark border
    ring: '#DAA520',
    success: '#9ACD32',         // Yellow green
    warning: '#FFD700',         // Gold
    error: '#CD853F',          // Peru
  },
  radius: 'sm',
  borderWidth: '1px',
  typography: {
    hero: { size: 'clamp(3rem, 8vw, 6rem)', weight: '700', tracking: '-0.02em', leading: '0.95' },
    h1: { size: 'clamp(2.5rem, 6vw, 4rem)', weight: '700', tracking: '-0.01em', leading: '1.1' },
    h2: { size: 'clamp(2rem, 5vw, 3rem)', weight: '600', tracking: '-0.01em', leading: '1.2' },
    h3: { size: 'clamp(1.5rem, 4vw, 2rem)', weight: '600', tracking: '0', leading: '1.3' },
    body: { size: 'clamp(1rem, 2vw, 1.125rem)', weight: '400', tracking: '0', leading: '1.7' },
    small: { size: '0.875rem', weight: '400', tracking: '0', leading: '1.6' },
    caption: { size: '0.75rem', weight: '400', tracking: '0.05em', leading: '1.5' },
  },
};

// --- FONTS ---
const frauncesFont: FontDefinition = {
  name: 'Fraunces',
  source: 'google',
  url: 'https://fonts.google.com/specimen/Fraunces',
  cssImport: '@import url("https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,100..900&display=swap");',
  fallback: 'Georgia, serif',
  weights: '100-900',
  alternativeFonts: ['Playfair Display', 'Libre Baskerville', 'Georgia'],
  nextJsSetup: `// Next.js setup for Fraunces
import { Fraunces } from 'next/font/google';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});`,
};

const satoshiFont: FontDefinition = {
  name: 'Satoshi',
  source: 'fontshare',
  url: 'https://www.fontshare.com/fonts/satoshi',
  cssImport: '@import url("https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,600,700&display=swap");',
  fallback: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  weights: '300-700',
  alternativeFonts: ['IBM Plex Sans', 'Source Sans 3', 'Work Sans'],
  nextJsSetup: `// Option A: Use Fontshare CDN (add to globals.css)
@import url("https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,600,700&display=swap");

// Option B: Use IBM Plex Sans as fallback (Google Fonts)
import { IBM_Plex_Sans } from 'next/font/google';
const ibmPlex = IBM_Plex_Sans({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'] 
});`,
};

// --- COMPONENTS ---
const components = {
  button: {
    base: 'font-body font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring',
    variants: {
      primary: 'text-primary border-b-2 border-primary hover:border-b-4 pb-1',
      secondary: 'text-secondary border-b-2 border-secondary hover:border-b-4 pb-1',
      ghost: 'text-foreground border-b-2 border-transparent hover:border-foreground pb-1',
    },
    sizes: {
      sm: 'text-sm px-3 py-1.5',
      md: 'text-base px-4 py-2',
      lg: 'text-lg px-6 py-3',
    },
  },
  card: {
    base: 'bg-surface border border-border p-6',
    variants: {
      default: 'border-l-4 border-l-accent pl-5',
      elevated: 'border-l-4 border-l-primary shadow-sm',
    },
  },
  input: {
    base: 'w-full bg-background border border-border px-4 py-2 font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-0 transition-colors',
    variants: {
      default: 'focus:border-primary',
    },
  },
} as const satisfies { button: ComponentVariants; card: ComponentVariants; input: ComponentVariants };

// --- GUIDANCE ---
const references: ReferenceSite[] = [
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
    avoidThis: ['Their footer is generic', 'Some pages use too much white space'],
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
    avoidThis: ['Their marketing pages are more generic', 'Some CTAs are too corporate'],
  },
];

const guidance = {
  vibe: 'Literary, thoughtful, the New Yorker website vibe',
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

// --- LAYOUTS ---
const layouts = {
  heroAsymmetric: `<section class="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-8 md:gap-12 items-center py-12 md:py-20">
  <div class="space-y-6">
    <h1 class="font-display text-hero text-foreground">Headline here</h1>
    <p class="font-body text-body text-muted-foreground max-w-lg">Description text that sets the tone. Not centered, not generic.</p>
    <div class="flex gap-4">
      <button class="font-body text-primary border-b-2 border-primary hover:border-b-4 pb-1 transition-all">Primary Action</button>
      <button class="font-body text-foreground border-b-2 border-transparent hover:border-foreground pb-1 transition-all">Secondary</button>
    </div>
  </div>
  <div class="relative"><div class="aspect-[4/3] bg-muted border border-border"></div></div>
</section>`,
  heroEditorial: `<section class="py-12 md:py-20">
  <h1 class="font-display text-hero text-foreground mb-8 max-w-4xl">Big bold headline that spans the width</h1>
  <div class="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8 md:gap-12">
    <div class="space-y-4">
      <p class="font-body text-body text-foreground leading-relaxed">Main descriptive text here. This is the editorial approach—large headline, then content flows naturally below. Not everything centered.</p>
      <p class="font-body text-body text-muted-foreground">Secondary paragraph with muted color for hierarchy.</p>
    </div>
    <nav class="flex flex-col gap-4 pt-4 border-t border-border">
      <a href="#" class="font-body text-foreground border-b-2 border-transparent hover:border-foreground pb-1 w-fit transition-all">Link 1</a>
      <a href="#" class="font-body text-foreground border-b-2 border-transparent hover:border-foreground pb-1 w-fit transition-all">Link 2</a>
    </nav>
  </div>
</section>`,
  grid: `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div class="bg-surface border border-border border-l-4 border-l-accent p-6">
    <h3 class="font-display text-h3 text-foreground mb-2">Card Title</h3>
    <p class="font-body text-body text-muted-foreground">Card content</p>
  </div>
</div>`,
};

export const warmEditorialKit: DesignKit = {
  id: 'warm-editorial',
  name: 'Warm Editorial',
  description: 'Literary, thoughtful, the New Yorker website vibe',
  vibe: guidance.vibe,
  fonts: {
    display: frauncesFont,
    body: satoshiFont,
    cssImports: [frauncesFont.cssImport, satoshiFont.cssImport],
    fallbackStack: `"Fraunces", ${frauncesFont.fallback}, "Satoshi", ${satoshiFont.fallback}`,
  },
  tokens,
  tailwindExtend: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: { DEFAULT: 'var(--primary)', foreground: 'var(--primary-foreground)' },
        secondary: { DEFAULT: 'var(--secondary)', foreground: 'var(--secondary-foreground)' },
        muted: { DEFAULT: 'var(--muted)', foreground: 'var(--muted-foreground)' },
        accent: { DEFAULT: 'var(--accent)', foreground: 'var(--accent-foreground)' },
        border: 'var(--border)',
        ring: 'var(--ring)',
        success: 'var(--success)',
        warning: 'var(--warning)',
        error: 'var(--error)',
      },
      borderRadius: { DEFAULT: '0.125rem' },
      borderWidth: { DEFAULT: '1px' },
      fontFamily: {
        display: ['"Fraunces"', 'Georgia', 'serif'],
        body: ['"Satoshi"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
      },
      fontSize: {
        hero: [tokens.typography.hero.size, { lineHeight: tokens.typography.hero.leading, letterSpacing: tokens.typography.hero.tracking, fontWeight: tokens.typography.hero.weight }],
        'h1': [tokens.typography.h1.size, { lineHeight: tokens.typography.h1.leading, letterSpacing: tokens.typography.h1.tracking, fontWeight: tokens.typography.h1.weight }],
        'h2': [tokens.typography.h2.size, { lineHeight: tokens.typography.h2.leading, letterSpacing: tokens.typography.h2.tracking, fontWeight: tokens.typography.h2.weight }],
        'h3': [tokens.typography.h3.size, { lineHeight: tokens.typography.h3.leading, letterSpacing: tokens.typography.h3.tracking, fontWeight: tokens.typography.h3.weight }],
        body: [tokens.typography.body.size, { lineHeight: tokens.typography.body.leading, letterSpacing: tokens.typography.body.tracking, fontWeight: tokens.typography.body.weight }],
        small: [tokens.typography.small.size, { lineHeight: tokens.typography.small.leading, letterSpacing: tokens.typography.small.tracking, fontWeight: tokens.typography.small.weight }],
        caption: [tokens.typography.caption.size, { lineHeight: tokens.typography.caption.leading, letterSpacing: tokens.typography.caption.tracking, fontWeight: tokens.typography.caption.weight }],
      },
    },
  },
  components,
  layouts,
  references: { gold: references },
  guidance: { antiPatterns: guidance.antiPatterns },
  validation: {
    slopScore: 0,
    accessibilityGrade: 'AA',
    uniqueFontSizes: 7,
    hasAllComponents: true,
    darkModeComplete: true,
  },
};

export { tokens as warmEditorialTokens };
