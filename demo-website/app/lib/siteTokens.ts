/**
 * Site token utilities - fallbacks and inference
 */
import type { Website } from '../data/websites';

// Default fallback colors (Anti-Slop palette)
const DEFAULT_PRIMARY = '#c42a0e'; // vermilion
const DEFAULT_SECONDARY = '#0a6e66'; // teal

/**
 * Infer font category from fonts array
 */
function inferFontCategory(fonts: string[]): 'serif' | 'sans' | 'monospace' {
  if (fonts.length === 0) return 'sans';

  const fontStr = fonts.join(' ').toLowerCase();

  // Check for monospace indicators
  if (fontStr.includes('mono') || fontStr.includes('code') || fontStr.includes('courier')) {
    return 'monospace';
  }

  // Check for serif indicators
  if (
    fontStr.includes('serif') ||
    fontStr.includes('georgia') ||
    fontStr.includes('times') ||
    fontStr.includes('garamond') ||
    fontStr.includes('baskerville') ||
    fontStr.includes('playfair') ||
    fontStr.includes('lora') ||
    fontStr.includes('merriweather') ||
    fontStr.includes('crimson') ||
    fontStr.includes('libre baskerville')
  ) {
    return 'serif';
  }

  // Default to sans-serif
  return 'sans';
}

/**
 * Infer radius style from styles array
 */
function inferRadiusStyle(styles: string[]): 'sharp' | 'rounded' {
  const roundedIndicators = ['Fun', 'Pastel', 'Illustrative', 'Playful', 'Colourful'];
  return styles.some((s) => roundedIndicators.includes(s)) ? 'rounded' : 'sharp';
}

/**
 * Get site tokens with fallbacks
 */
export function getSiteTokens(website: Website): {
  primaryColor: string;
  secondaryColor: string;
  fontCategory: 'serif' | 'sans' | 'monospace';
  radiusStyle: 'sharp' | 'rounded';
} {
  return {
    primaryColor: website.primaryColor || DEFAULT_PRIMARY,
    secondaryColor: website.secondaryColor || DEFAULT_SECONDARY,
    fontCategory: website.fontCategory || inferFontCategory(website.fonts),
    radiusStyle: website.radiusStyle || inferRadiusStyle(website.styles),
  };
}

/**
 * Check if site has interactive/animated styles
 */
export function hasInteractiveStyles(website: Website): boolean {
  const interactiveKeywords = [
    'Interactive',
    'Animation',
    'Transitions',
    'Scrolling Animation',
    'Fun',
  ];
  return website.styles.some((s) => interactiveKeywords.includes(s));
}

