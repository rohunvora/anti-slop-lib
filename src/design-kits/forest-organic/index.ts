/**
 * FOREST ORGANIC - Complete Design Kit
 */

import type { DesignKit, KitTokens, FontDefinition, ComponentVariants, ReferenceSite } from '../types.js';

// --- TOKENS ---
const tokens: KitTokens = {
  colors: {
    background: '#F5F5DC', foreground: '#1C1C1C', primary: '#2D5A27', primaryForeground: '#FFFFFF',
    secondary: '#1B4D3E', secondaryForeground: '#FFFFFF', muted: '#D4D4B8', mutedForeground: '#4A4A4A',
    accent: '#8FBC8F', accentForeground: '#1C1C1C', border: '#D4D4B8', ring: '#2D5A27',
    success: '#2D5A27', warning: '#8B7355', error: '#8B4513',
  },
  colorsDark: {
    background: '#1A1F1A', foreground: '#F5F5DC', primary: '#8FBC8F', primaryForeground: '#1A1F1A',
    secondary: '#6B8E6B', secondaryForeground: '#1A1F1A', muted: '#2A352A', mutedForeground: '#A8B8A8',
    accent: '#A8D8A8', accentForeground: '#1A1F1A', border: '#3A4A3A', ring: '#8FBC8F',
    success: '#8FBC8F', warning: '#B8A878', error: '#B88A5A',
  },
  radius: 'sm',
  borderWidth: '1px',
  typography: {
    hero: { size: 'clamp(3rem, 8vw, 5rem)', weight: '700', tracking: '-0.01em', leading: '1.1' },
    h1: { size: 'clamp(2.5rem, 6vw, 4rem)', weight: '700', tracking: '-0.01em', leading: '1.2' },
    h2: { size: 'clamp(2rem, 5vw, 3rem)', weight: '600', tracking: '0', leading: '1.3' },
    h3: { size: 'clamp(1.5rem, 4vw, 2rem)', weight: '600', tracking: '0', leading: '1.4' },
    body: { size: 'clamp(1rem, 2vw, 1.125rem)', weight: '400', tracking: '0', leading: '1.7' },
    small: { size: '0.875rem', weight: '400', tracking: '0', leading: '1.6' },
    caption: { size: '0.75rem', weight: '400', tracking: '0.05em', leading: '1.5' },
  },
};

// --- FONTS ---
const newsreaderFont: FontDefinition = {
  name: 'Newsreader',
  source: 'google',
  url: 'https://fonts.google.com/specimen/Newsreader',
  cssImport: '@import url("https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,200..800&display=swap");',
  fallback: 'Georgia, serif',
  weights: '200-800',
  alternativeFonts: ['Libre Baskerville', 'Merriweather', 'Georgia'],
  nextJsSetup: `// Next.js setup for Newsreader
import { Newsreader } from 'next/font/google';

const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['200', '300', '400', '500', '600', '700', '800'],
});`,
};

const generalSansFont: FontDefinition = {
  name: 'General Sans',
  source: 'fontshare',
  url: 'https://www.fontshare.com/fonts/general-sans',
  cssImport: '@import url("https://api.fontshare.com/v2/css?f[]=general-sans@200,300,400,500,600,700&display=swap");',
  fallback: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  weights: '200-700',
  alternativeFonts: ['IBM Plex Sans', 'Source Sans 3', 'Work Sans'],
  nextJsSetup: `// Option A: Use Fontshare CDN (add to globals.css)
@import url("https://api.fontshare.com/v2/css?f[]=general-sans@200,300,400,500,600,700&display=swap");

// Option B: Use IBM Plex Sans as fallback (Google Fonts)
import { IBM_Plex_Sans } from 'next/font/google';
const ibmPlex = IBM_Plex_Sans({ 
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'] 
});`,
};

// --- COMPONENTS ---
const components = {
  button: {
    base: 'font-body font-medium rounded-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring',
    variants: {
      primary: 'bg-primary text-primary-foreground hover:opacity-90',
      secondary: 'bg-secondary text-secondary-foreground hover:opacity-90',
      ghost: 'bg-transparent text-foreground hover:bg-muted',
    },
    sizes: { sm: 'text-sm px-4 py-2', md: 'text-base px-5 py-2.5', lg: 'text-lg px-6 py-3' },
  },
  card: {
    base: 'bg-surface border border-border rounded-sm p-6',
    variants: { default: '', elevated: 'shadow-sm' },
  },
  input: {
    base: 'w-full bg-background border border-border rounded-sm px-4 py-2 font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-0 transition-colors',
    variants: { default: 'focus:border-primary' },
  },
} as const satisfies { button: ComponentVariants; card: ComponentVariants; input: ComponentVariants };

// --- GUIDANCE ---
const references: ReferenceSite[] = [
  {
    name: 'Aesop',
    url: 'https://www.aesop.com/',
    stealThis: ['Calm organic luxury', 'Muted earth tones', 'Negative space', 'Serif + sans pairing', 'Natural photography'],
    avoidThis: ['Some pages are too minimal'],
  },
  {
    name: 'Patagonia',
    url: 'https://www.patagonia.com/',
    stealThis: ['Trustworthy functionalism', 'Earthy palettes', 'Natural imagery', 'Clear hierarchy'],
    avoidThis: ['Some pages are too busy'],
  },
];

const guidance = {
  vibe: 'Natural, calm, trustworthy',
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

// --- LAYOUTS ---
const layouts = {
  heroAsymmetric: `<section class="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-8 md:gap-12 items-center py-12 md:py-20">
  <div class="space-y-6">
    <h1 class="font-display text-hero text-foreground">Headline</h1>
    <p class="font-body text-body text-muted-foreground max-w-lg">Natural, calm, trustworthy. Earthy tones and organic feel.</p>
    <button class="font-body bg-primary text-primary-foreground rounded-sm px-5 py-2.5 hover:opacity-90 transition-colors">Primary Action</button>
  </div>
  <div class="relative"><div class="aspect-[4/3] bg-muted border border-border rounded-sm"></div></div>
</section>`,
  heroEditorial: `<section class="py-12 md:py-20">
  <h1 class="font-display text-hero text-foreground mb-8 max-w-4xl">Headline</h1>
  <div class="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8 md:gap-12">
    <div class="space-y-4">
      <p class="font-body text-body text-foreground leading-relaxed">Main text. Natural, calm, trustworthy.</p>
    </div>
    <nav class="flex flex-col gap-4 pt-4 border-t border-border">
      <a href="#" class="font-body text-foreground hover:text-primary transition-colors">Link 1</a>
      <a href="#" class="font-body text-foreground hover:text-primary transition-colors">Link 2</a>
    </nav>
  </div>
</section>`,
  grid: `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div class="bg-surface border border-border rounded-sm p-6">
    <h3 class="font-display text-h3 text-foreground mb-2">Card Title</h3>
    <p class="font-body text-body text-muted-foreground">Card content</p>
  </div>
</div>`,
};

export const forestOrganicKit: DesignKit = {
  id: 'forest-organic',
  name: 'Forest Organic',
  description: 'Natural, calm, trustworthy',
  vibe: guidance.vibe,
  fonts: {
    display: newsreaderFont,
    body: generalSansFont,
    cssImports: [newsreaderFont.cssImport, generalSansFont.cssImport],
    fallbackStack: `"Newsreader", ${newsreaderFont.fallback}, "General Sans", ${generalSansFont.fallback}`,
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
        display: ['"Newsreader"', 'Georgia', 'serif'],
        body: ['"General Sans"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
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

export { tokens as forestOrganicTokens };
