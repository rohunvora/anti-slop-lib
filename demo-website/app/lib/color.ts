/**
 * Color contrast utilities for WCAG compliance
 */

/**
 * Convert hex color to RGB
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Calculate relative luminance for WCAG contrast
 */
function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((val) => {
    val = val / 255;
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculate contrast ratio between two colors (WCAG)
 * Returns a value between 1 (no contrast) and 21 (maximum contrast)
 */
export function contrastRatio(color1: string, color2: string): number {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  if (!rgb1 || !rgb2) return 1;

  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Pick readable text color (black or white) for a given background
 * Returns '#000000' or '#ffffff' based on which has better contrast
 */
export function pickReadableTextColor(backgroundColor: string): string {
  const contrastWithBlack = contrastRatio(backgroundColor, '#000000');
  const contrastWithWhite = contrastRatio(backgroundColor, '#ffffff');

  return contrastWithBlack > contrastWithWhite ? '#000000' : '#ffffff';
}

/**
 * Ensure minimum contrast ratio by adjusting foreground color
 * If contrast is too low, returns white or black (whichever meets 4.5:1)
 * Otherwise returns the original foreground color
 */
export function ensureMinContrast(
  backgroundColor: string,
  foregroundColor: string,
  minRatio: number = 4.5
): string {
  const currentContrast = contrastRatio(backgroundColor, foregroundColor);

  if (currentContrast >= minRatio) {
    return foregroundColor;
  }

  // Try white and black, pick the one that meets contrast
  const whiteContrast = contrastRatio(backgroundColor, '#ffffff');
  const blackContrast = contrastRatio(backgroundColor, '#000000');

  if (whiteContrast >= minRatio) return '#ffffff';
  if (blackContrast >= minRatio) return '#000000';

  // If neither meets it, return the better one
  return whiteContrast > blackContrast ? '#ffffff' : '#000000';
}

