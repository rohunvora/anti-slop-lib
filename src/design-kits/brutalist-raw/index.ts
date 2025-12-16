/**
 * BRUTALIST RAW - Complete Design Kit
 */

import type { DesignKit, KitTokens, FontDefinition, ComponentVariants, ReferenceSite } from '../types.js';

// --- TOKENS ---
const tokens: KitTokens = {
  colors: {
    background: '#FFFFFF', foreground: '#000000', primary: '#FF0000', primaryForeground: '#FFFFFF',
    secondary: '#0000FF', secondaryForeground: '#FFFFFF', muted: '#F0F0F0', mutedForeground: '#666666',
    accent: '#FFFF00', accentForeground: '#000000', border: '#000000', ring: '#FF0000',
    success: '#00FF00', warning: '#FFFF00', error: '#FF0000',
  },
  colorsDark: {
    background: '#000000', foreground: '#FFFFFF', primary: '#FF0000', primaryForeground: '#FFFFFF',
    secondary: '#0000FF', secondaryForeground: '#FFFFFF', muted: '#1A1A1A', mutedForeground: '#CCCCCC',
    accent: '#FFFF00', accentForeground: '#000000', border: '#FFFFFF', ring: '#FF0000',
    success: '#00FF00', warning: '#FFFF00', error: '#FF0000',
  },
  radius: 'none',
  borderWidth: '3px',
  typography: {
    hero: { size: 'clamp(2.5rem, 8vw, 5rem)', weight: '700', tracking: '0', leading: '1' },
    h1: { size: 'clamp(2rem, 6vw, 4rem)', weight: '700', tracking: '0', leading: '1.1' },
    h2: { size: 'clamp(1.5rem, 5vw, 3rem)', weight: '700', tracking: '0', leading: '1.2' },
    h3: { size: 'clamp(1.25rem, 4vw, 2rem)', weight: '700', tracking: '0', leading: '1.3' },
    body: { size: 'clamp(1rem, 2vw, 1.125rem)', weight: '400', tracking: '0', leading: '1.5' },
    small: { size: '0.875rem', weight: '400', tracking: '0', leading: '1.4' },
    caption: { size: '0.75rem', weight: '400', tracking: '0.1em', leading: '1.3' },
    mono: { size: 'clamp(1rem, 2vw, 1.125rem)', weight: '400', tracking: '0', leading: '1.5' },
  },
};

// --- FONTS ---
const spaceMonoFont: FontDefinition = {
  name: 'Space Mono',
  source: 'google',
  url: 'https://fonts.google.com/specimen/Space+Mono',
  cssImport: '@import url("https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap");',
  fallback: 'monospace',
  weights: '400, 700',
  alternativeFonts: ['JetBrains Mono', 'Fira Code', 'Courier New'],
  nextJsSetup: `// Next.js setup for Space Mono
import { Space_Mono } from 'next/font/google';

const spaceMono = Space_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '700'],
});`,
};

const systemFont: FontDefinition = {
  name: 'System Stack',
  source: 'system',
  url: '',
  cssImport: '',
  fallback: '-apple-system, BlinkMacSystemFont, "Segoe UI", monospace',
  weights: '400, 700',
  alternativeFonts: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI'],
};

// --- COMPONENTS ---
const components = {
  button: {
    base: 'font-mono font-bold uppercase transition-transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring',
    variants: {
      primary: 'bg-primary text-primary-foreground border-3 border-foreground shadow-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-none',
      secondary: 'bg-secondary text-secondary-foreground border-3 border-foreground shadow-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-none',
      ghost: 'bg-transparent text-foreground border-3 border-foreground shadow-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-none',
    },
    sizes: { sm: 'text-sm px-4 py-2', md: 'text-base px-6 py-3', lg: 'text-lg px-8 py-4' },
  },
  card: {
    base: 'bg-background border-3 border-foreground p-6 shadow-brutal',
    variants: { default: '', elevated: 'shadow-brutal-lg' },
  },
  input: {
    base: 'w-full bg-background border-3 border-foreground px-4 py-2 font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-0',
    variants: { default: 'focus:shadow-brutal' },
  },
} as const satisfies { button: ComponentVariants; card: ComponentVariants; input: ComponentVariants };

// --- GUIDANCE ---
const references: ReferenceSite[] = [
  {
    name: 'Gumroad',
    url: 'https://gumroad.com/',
    stealThis: ['Hard black borders everywhere', 'Stark primary RGB colors', 'Flat cards with offset shadows', 'Raw HTML energy', 'No rounded corners'],
    avoidThis: ['Some pages are too chaotic'],
  },
  {
    name: 'The Drunken Canal',
    url: 'https://www.thedrunkencanal.com/',
    stealThis: ['Unpolished raw HTML feel', 'Intentionally rough typography', 'Hard edges', 'Punk energy'],
    avoidThis: ['Can be hard to read'],
  },
];

const guidance = {
  vibe: 'Intentionally rough, punk energy',
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

// --- LAYOUTS ---
const layouts = {
  heroAsymmetric: `<section class="grid grid-cols-1 md:grid-cols-2 gap-8 py-12 md:py-20">
  <div class="space-y-6">
    <h1 class="font-mono text-hero text-foreground uppercase">HEADLINE</h1>
    <p class="font-sans text-body text-foreground">Description text. Raw, honest, zero pretense.</p>
    <button class="font-mono bg-primary text-primary-foreground border-3 border-foreground shadow-brutal px-6 py-3 uppercase hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-transform">PRIMARY ACTION</button>
  </div>
  <div class="border-3 border-foreground bg-muted p-8 shadow-brutal"><!-- Content --></div>
</section>`,
  heroEditorial: `<section class="py-12 md:py-20">
  <h1 class="font-mono text-hero text-foreground uppercase mb-8">HEADLINE</h1>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
    <div class="border-3 border-foreground p-6 shadow-brutal">
      <p class="font-sans text-body text-foreground">Main text. Brutalist raw energy.</p>
    </div>
    <div class="border-3 border-foreground p-6 shadow-brutal">
      <nav class="flex flex-col gap-2">
        <a href="#" class="font-mono text-foreground uppercase">LINK 1</a>
        <a href="#" class="font-mono text-foreground uppercase">LINK 2</a>
      </nav>
    </div>
  </div>
</section>`,
  grid: `<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
  <div class="bg-background border-3 border-foreground p-6 shadow-brutal">
    <h3 class="font-mono text-h3 text-foreground uppercase mb-2">CARD TITLE</h3>
    <p class="font-sans text-body text-foreground">Card content</p>
  </div>
</div>`,
};

export const brutalistRawKit: DesignKit = {
  id: 'brutalist-raw',
  name: 'Brutalist Raw',
  description: 'Intentionally rough, punk energy',
  vibe: guidance.vibe,
  fonts: {
    display: spaceMonoFont,
    body: systemFont,
    mono: spaceMonoFont,
    cssImports: [spaceMonoFont.cssImport],
    fallbackStack: `"Space Mono", ${spaceMonoFont.fallback}, -apple-system, BlinkMacSystemFont, "Segoe UI", monospace`,
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
      },
      borderRadius: { DEFAULT: '0' },
      borderWidth: { DEFAULT: '3px' },
      fontFamily: {
        mono: ['"Space Mono"', 'monospace'],
        sans: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'monospace'],
        display: ['"Space Mono"', 'monospace'],
        body: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'monospace'],
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
      boxShadow: {
        'brutal': '4px 4px 0 0 var(--border)',
        'brutal-lg': '8px 8px 0 0 var(--border)',
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

export { tokens as brutalistRawTokens };
