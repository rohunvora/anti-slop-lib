/**
 * DESIGN KIT TYPES
 * 
 * Core interfaces for the Anti-Slop Design Oracle
 */

export type KitName = 
  | 'warm-editorial'
  | 'swiss-precision'
  | 'brutalist-raw'
  | 'forest-organic'
  | 'noir-luxury'
  | 'vibrant-play';

export interface FontDefinition {
  name: string;
  source: 'google' | 'fontshare' | 'github' | 'system' | 'vercel';
  url: string;
  cssImport: string;
  fallback: string;
  weights: string;
  alternativeFonts?: string[];  // Fallbacks if primary isn't available
  nextJsSetup?: string;         // Setup instructions for Next.js
}

export interface TypographyScale {
  size: string;        // e.g., "clamp(2rem, 5vw, 4rem)"
  weight: string;      // e.g., "700"
  tracking: string;    // e.g., "-0.02em"
  leading: string;     // e.g., "1.1"
}

export interface ColorTokens {
  background: string;
  foreground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  border: string;
  ring: string;
  // Semantic states
  success?: string;
  warning?: string;
  error?: string;
}

export interface KitTokens {
  colors: ColorTokens;
  colorsDark: ColorTokens;
  radius: 'none' | 'sm' | 'md' | 'lg';
  borderWidth: '0' | '1px' | '2px' | '3px';
  typography: {
    hero: TypographyScale;
    h1: TypographyScale;
    h2: TypographyScale;
    h3: TypographyScale;
    body: TypographyScale;
    small: TypographyScale;
    caption: TypographyScale;
    mono?: TypographyScale;
  };
}

export interface ComponentVariants {
  base: string;  // Tailwind classes
  variants: Record<string, string>;
  sizes?: Record<string, string>;
}

export interface ReferenceSite {
  name: string;
  url: string;
  stealThis: string[];
  avoidThis: string[];
}

export interface KitGuidance {
  vibe: string;
  bestFor: string[];
  keyPrinciples: string[];
  commonMistakes: string[];
  antiPatterns: string[];
}

export interface KitValidation {
  slopScore: number;           // Must be 0
  accessibilityGrade: 'AAA' | 'AA' | 'A';
  uniqueFontSizes: number;     // Must be ≤ 8
  hasAllComponents: boolean;
  darkModeComplete: boolean;
}

export interface DesignKit {
  id: KitName;
  name: string;
  description: string;
  vibe: string;  // One-line soul

  // Typography
  fonts: {
    display: FontDefinition;
    body: FontDefinition;
    mono?: FontDefinition;
    cssImports: string[];
    fallbackStack: string;
  };

  // Design tokens
  tokens: KitTokens;

  // Tailwind config to merge
  tailwindExtend: Record<string, any>;

  // Component recipes
  components: {
    button: ComponentVariants;
    card: ComponentVariants;
    input: ComponentVariants;
  };

  // Layout patterns (NOT centered heroes)
  layouts: {
    heroAsymmetric: string;     // JSX/HTML template
    heroEditorial: string;
    grid?: string;
  };

  // References
  references: {
    gold: ReferenceSite[];
  };

  // Guidance
  guidance?: {
    antiPatterns: string[];
  };

  // Validation results
  validation: KitValidation;
}

