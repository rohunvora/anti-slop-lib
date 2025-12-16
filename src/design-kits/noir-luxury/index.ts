/**
 * NOIR LUXURY - Complete Design Kit
 */

import type { DesignKit, KitTokens, FontDefinition, ComponentVariants, ReferenceSite } from '../types.js';

// --- TOKENS ---
const tokens: KitTokens = {
  colors: {
    background: '#0A0A0A', foreground: '#F5F5F5', primary: '#C9A227', primaryForeground: '#0A0A0A',
    secondary: '#8B7355', secondaryForeground: '#0A0A0A', muted: '#141414', mutedForeground: '#888888',
    accent: '#C9A227', accentForeground: '#0A0A0A', border: '#2A2A2A', ring: '#C9A227',
    success: '#C9A227', warning: '#DAA520', error: '#8B4513',
  },
  colorsDark: {
    background: '#000000', foreground: '#FFFFFF', primary: '#FFD700', primaryForeground: '#000000',
    secondary: '#C9A227', secondaryForeground: '#000000', muted: '#1A1A1A', mutedForeground: '#AAAAAA',
    accent: '#FFD700', accentForeground: '#000000', border: '#333333', ring: '#FFD700',
    success: '#FFD700', warning: '#FFA500', error: '#CD853F',
  },
  radius: 'none',
  borderWidth: '1px',
  typography: {
    hero: { size: 'clamp(4rem, 10vw, 8rem)', weight: '300', tracking: '0.02em', leading: '1' },
    h1: { size: 'clamp(3rem, 8vw, 5rem)', weight: '300', tracking: '0.01em', leading: '1.1' },
    h2: { size: 'clamp(2rem, 6vw, 3rem)', weight: '400', tracking: '0', leading: '1.2' },
    h3: { size: 'clamp(1.5rem, 4vw, 2rem)', weight: '400', tracking: '0', leading: '1.3' },
    body: { size: 'clamp(1rem, 2vw, 1.125rem)', weight: '400', tracking: '0', leading: '1.7' },
    small: { size: '0.875rem', weight: '400', tracking: '0', leading: '1.6' },
    caption: { size: '0.75rem', weight: '300', tracking: '0.1em', leading: '1.5' },
  },
};

// --- FONTS ---
const cormorantFont: FontDefinition = {
  name: 'Cormorant Garamond',
  source: 'google',
  url: 'https://fonts.google.com/specimen/Cormorant+Garamond',
  cssImport: '@import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&display=swap");',
  fallback: 'Georgia, serif',
  weights: '300-700',
  alternativeFonts: ['Playfair Display', 'EB Garamond', 'Georgia'],
  nextJsSetup: `// Next.js setup for Cormorant Garamond
import { Cormorant_Garamond } from 'next/font/google';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['300', '400', '500', '600', '700'],
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
    base: 'font-body font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring',
    variants: {
      primary: 'border border-primary/50 text-primary hover:bg-primary/10',
      secondary: 'border border-secondary/50 text-secondary hover:bg-secondary/10',
      ghost: 'border border-border text-foreground hover:border-primary/50',
    },
    sizes: { sm: 'text-sm px-4 py-2', md: 'text-base px-6 py-3', lg: 'text-lg px-8 py-4' },
  },
  card: {
    base: 'bg-muted border border-border p-6',
    variants: { default: '', elevated: 'border-primary/50' },
  },
  input: {
    base: 'w-full bg-muted border border-border px-4 py-2 font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-0 transition-colors',
    variants: { default: 'focus:border-primary/50' },
  },
} as const satisfies { button: ComponentVariants; card: ComponentVariants; input: ComponentVariants };

// --- GUIDANCE ---
const references: ReferenceSite[] = [
  {
    name: 'SSENSE',
    url: 'https://www.ssense.com/',
    stealThis: ['Brutal-luxury black/white', 'Minimal navigation', 'Large serif headlines', 'Gold/black ratios', 'Dark mode perfection'],
    avoidThis: ['Some pages are too minimal'],
  },
  {
    name: 'Oribe',
    url: 'https://www.oribe.com/',
    stealThis: ['High-end beauty aesthetic', 'Gold accents', 'Dark backgrounds', 'Elegant typography'],
    avoidThis: ['Some pages are too busy'],
  },
];

const guidance = {
  vibe: 'Dark, exclusive, whispered elegance',
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

// --- LAYOUTS ---
const layouts = {
  heroAsymmetric: `<section class="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-8 md:gap-12 items-center py-12 md:py-20">
  <div class="space-y-6">
    <h1 class="font-display text-hero text-foreground">Headline</h1>
    <p class="font-body text-body text-muted-foreground max-w-lg">Dark, exclusive, whispered elegance. Gold accents on near-black.</p>
    <button class="font-body border border-primary/50 text-primary px-6 py-3 hover:bg-primary/10 transition-colors">Primary Action</button>
  </div>
  <div class="relative"><div class="aspect-[4/3] bg-muted border border-border"></div></div>
</section>`,
  heroEditorial: `<section class="py-12 md:py-20">
  <h1 class="font-display text-hero text-foreground mb-8 max-w-4xl">Headline</h1>
  <div class="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8 md:gap-12">
    <div class="space-y-4">
      <p class="font-body text-body text-foreground leading-relaxed">Main text. Dark, exclusive, whispered elegance.</p>
    </div>
    <nav class="flex flex-col gap-4 pt-4 border-t border-border">
      <a href="#" class="font-body text-foreground hover:text-primary transition-colors">Link 1</a>
      <a href="#" class="font-body text-foreground hover:text-primary transition-colors">Link 2</a>
    </nav>
  </div>
</section>`,
  grid: `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div class="bg-muted border border-border p-6">
    <h3 class="font-display text-h3 text-foreground mb-2">Card Title</h3>
    <p class="font-body text-body text-muted-foreground">Card content</p>
  </div>
</div>`,
};

export const noirLuxuryKit: DesignKit = {
  id: 'noir-luxury',
  name: 'Noir Luxury',
  description: 'Dark, exclusive, whispered elegance',
  vibe: guidance.vibe,
  fonts: {
    display: cormorantFont,
    body: satoshiFont,
    cssImports: [cormorantFont.cssImport, satoshiFont.cssImport],
    fallbackStack: `"Cormorant Garamond", ${cormorantFont.fallback}, "Satoshi", ${satoshiFont.fallback}`,
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
      borderRadius: { DEFAULT: '0' },
      borderWidth: { DEFAULT: '1px' },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
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

export { tokens as noirLuxuryTokens };
