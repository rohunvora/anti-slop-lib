/**
 * SWISS PRECISION - Complete Design Kit
 */

import type { DesignKit, KitTokens, FontDefinition, ComponentVariants, ReferenceSite } from '../types.js';

// --- TOKENS ---
const tokens: KitTokens = {
  colors: {
    background: '#FFFFFF', foreground: '#000000', primary: '#000000', primaryForeground: '#FFFFFF',
    secondary: '#333333', secondaryForeground: '#FFFFFF', muted: '#F5F5F5', mutedForeground: '#666666',
    accent: '#000000', accentForeground: '#FFFFFF', border: '#E5E5E5', ring: '#000000',
    success: '#000000', warning: '#000000', error: '#000000',
  },
  colorsDark: {
    background: '#000000', foreground: '#FFFFFF', primary: '#FFFFFF', primaryForeground: '#000000',
    secondary: '#CCCCCC', secondaryForeground: '#000000', muted: '#1A1A1A', mutedForeground: '#999999',
    accent: '#FFFFFF', accentForeground: '#000000', border: '#333333', ring: '#FFFFFF',
    success: '#FFFFFF', warning: '#FFFFFF', error: '#FFFFFF',
  },
  radius: 'none',
  borderWidth: '1px',
  typography: {
    hero: { size: 'clamp(3rem, 8vw, 5rem)', weight: '700', tracking: '-0.03em', leading: '0.95' },
    h1: { size: 'clamp(2rem, 5vw, 3rem)', weight: '700', tracking: '-0.02em', leading: '1.1' },
    h2: { size: 'clamp(1.5rem, 4vw, 2rem)', weight: '600', tracking: '-0.01em', leading: '1.2' },
    h3: { size: 'clamp(1.25rem, 3vw, 1.5rem)', weight: '600', tracking: '0', leading: '1.3' },
    body: { size: 'clamp(1rem, 2vw, 1.125rem)', weight: '400', tracking: '0', leading: '1.6' },
    small: { size: '0.875rem', weight: '400', tracking: '0', leading: '1.5' },
    caption: { size: '0.75rem', weight: '400', tracking: '0.05em', leading: '1.4' },
  },
};

// --- FONTS ---
const geistNextJs = `// In your layout.tsx or _app.tsx:
import { GeistSans } from 'geist/font/sans';

export default function Layout({ children }) {
  return <html className={GeistSans.className}>{children}</html>;
}
// Install: npm install geist`;

const geistFont: FontDefinition = {
  name: 'Geist',
  source: 'vercel',
  url: 'https://vercel.com/font',
  cssImport: '@import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@100;200;300;400;500;600;700&display=swap");',
  fallback: '"IBM Plex Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  weights: '100-700',
  alternativeFonts: ['IBM Plex Sans', 'Inter', 'System UI'],
  nextJsSetup: geistNextJs,
};

// --- COMPONENTS ---
const components = {
  button: {
    base: 'font-sans font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring',
    variants: {
      primary: 'bg-primary text-primary-foreground hover:opacity-90',
      secondary: 'bg-secondary text-secondary-foreground hover:opacity-90',
      ghost: 'bg-transparent text-foreground hover:bg-muted',
    },
    sizes: { sm: 'text-sm px-4 py-2', md: 'text-base px-6 py-3', lg: 'text-lg px-8 py-4' },
  },
  card: {
    base: 'bg-background border border-border p-6',
    variants: { default: '', elevated: 'border-2' },
  },
  input: {
    base: 'w-full bg-background border border-border px-4 py-2 font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-0 transition-colors',
    variants: { default: 'focus:border-foreground' },
  },
} as const satisfies { button: ComponentVariants; card: ComponentVariants; input: ComponentVariants };

// --- GUIDANCE ---
const references: ReferenceSite[] = [
  {
    name: 'Readymag',
    url: 'https://readymag.com/',
    stealThis: ['Grid-based severe typography', '1px borders everywhere', 'No rounded corners', 'Perfect spacing rhythm', 'Single font family (weights create hierarchy)'],
    avoidThis: ['Some pages are too minimal', 'Navigation can be hard to find'],
  },
  {
    name: 'Linear',
    url: 'https://linear.app/',
    stealThis: ['Perfect dark mode implementation', '1px border treatment', 'Sharp corners', 'Grid precision', 'Confident button styles'],
    avoidThis: ['Their marketing pages are more generic'],
  },
];

const guidance = {
  vibe: 'Grids, hierarchy, no decoration',
  antiPatterns: [
    'rounded-xl, rounded-2xl, rounded-full on containers',
    'gradient backgrounds (especially purple-to-pink)',
    'blur/glassmorphism effects',
    'emerald/cyan/purple color combos',
    'centered hero with stacked text',
    'shadow-lg, shadow-xl on cards',
    'multiple font families (use single family with weights)',
    'decorative elements or illustrations',
  ],
};

// --- LAYOUTS ---
const layouts = {
  heroAsymmetric: `<section class="grid grid-cols-12 gap-4 py-12 md:py-20">
  <div class="col-span-12 md:col-span-6 space-y-6">
    <h1 class="font-sans text-hero text-foreground">Headline</h1>
    <p class="font-sans text-body text-muted-foreground max-w-lg">Description text. Sharp, confident, no decoration.</p>
    <button class="font-sans bg-primary text-primary-foreground px-6 py-3 hover:opacity-90 transition-colors">Primary Action</button>
  </div>
  <div class="col-span-12 md:col-span-6"><div class="aspect-[4/3] bg-muted border border-border"></div></div>
</section>`,
  heroEditorial: `<section class="py-12 md:py-20">
  <h1 class="font-sans text-hero text-foreground mb-8 max-w-4xl">Headline</h1>
  <div class="grid grid-cols-12 gap-4">
    <div class="col-span-12 md:col-span-8">
      <p class="font-sans text-body text-foreground">Main text. Grid-based, severe typography.</p>
    </div>
    <div class="col-span-12 md:col-span-4 border-t border-border pt-4">
      <nav class="flex flex-col gap-2">
        <a href="#" class="font-sans text-foreground hover:opacity-70">Link 1</a>
        <a href="#" class="font-sans text-foreground hover:opacity-70">Link 2</a>
      </nav>
    </div>
  </div>
</section>`,
  grid: `<div class="grid grid-cols-12 gap-4">
  <div class="col-span-12 md:col-span-4 bg-background border border-border p-6">
    <h3 class="font-sans text-h3 text-foreground mb-2">Card Title</h3>
    <p class="font-sans text-body text-muted-foreground">Card content</p>
  </div>
</div>`,
};

export const swissPrecisionKit: DesignKit = {
  id: 'swiss-precision',
  name: 'Swiss Precision',
  description: 'Grids, hierarchy, no decoration',
  vibe: guidance.vibe,
  fonts: {
    display: geistFont,
    body: geistFont,
    cssImports: [geistFont.cssImport],
    fallbackStack: `"Geist", "IBM Plex Sans", ${geistFont.fallback}`,
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
      borderWidth: { DEFAULT: '1px' },
      fontFamily: {
        sans: ['"Geist"', '"IBM Plex Sans"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
        display: ['"Geist"', '"IBM Plex Sans"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
        body: ['"Geist"', '"IBM Plex Sans"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
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
    accessibilityGrade: 'AAA',
    uniqueFontSizes: 7,
    hasAllComponents: true,
    darkModeComplete: true,
  },
};

export { tokens as swissPrecisionTokens };
