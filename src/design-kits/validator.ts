/**
 * DESIGN KIT VALIDATOR
 * 
 * Ensures all kits pass anti-slop validation
 */

import type { DesignKit, KitValidation } from './types.js';
import { analyze } from '../detector.js';
import { SLOP_FONTS } from '../patterns.js';

/**
 * Validate a design kit against anti-slop rules
 */
export function validateKit(kit: DesignKit): KitValidation {
  const validation: KitValidation = {
    slopScore: 0,
    accessibilityGrade: 'AA',
    uniqueFontSizes: 0,
    hasAllComponents: false,
    darkModeComplete: false,
  };

  // Check fonts (no slop fonts)
  const allFonts = [
    kit.fonts.display.name,
    kit.fonts.body.name,
    kit.fonts.mono?.name,
  ].filter((font): font is string => Boolean(font));

  const hasSlopFont = allFonts.some(font => 
    SLOP_FONTS.some(slop => font.toLowerCase().includes(slop.toLowerCase()))
  );

  if (hasSlopFont) {
    validation.slopScore += 50; // Critical violation
  }

  // Check unique font sizes (must be ≤ 8)
  const fontSizeKeys = Object.keys(kit.tokens.typography);
  validation.uniqueFontSizes = fontSizeKeys.length;

  if (validation.uniqueFontSizes > 8) {
    validation.slopScore += 20;
  }

  // Check components exist
  validation.hasAllComponents = !!(
    kit.components.button &&
    kit.components.card &&
    kit.components.input
  );

  if (!validation.hasAllComponents) {
    validation.slopScore += 10;
  }

  // Check dark mode tokens exist
  validation.darkModeComplete = !!(
    kit.tokens.colorsDark &&
    Object.keys(kit.tokens.colorsDark).length > 0
  );

  if (!validation.darkModeComplete) {
    validation.slopScore += 10;
  }

  // Check for purple gradients in colors
  const allColors = [
    ...Object.values(kit.tokens.colors),
    ...Object.values(kit.tokens.colorsDark),
  ].filter(Boolean);

  // More precise purple detection - check RGB values
  const hasPurple = allColors.some(color => {
    if (typeof color !== 'string') return false;
    
    // Check for purple keywords
    if (color.toLowerCase().includes('purple') || 
        color.toLowerCase().includes('violet') || 
        color.toLowerCase().includes('indigo')) {
      return true;
    }
    
    // Check hex codes - purple has high blue, medium red, low green
    const hexMatch = color.match(/#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})/i);
    if (hexMatch) {
      const r = parseInt(hexMatch[1], 16);
      const g = parseInt(hexMatch[2], 16);
      const b = parseInt(hexMatch[3], 16);
      // Purple: high blue, medium-high red, low-medium green
      // e.g., #8B5CF6 has r=139, g=92, b=246
      if (b > 150 && r > 100 && r < 200 && g < 150) {
        return true;
      }
    }
    
    return false;
  });

  if (hasPurple) {
    validation.slopScore += 30; // Critical violation
  }

  // Accessibility grade (simplified - would use axe-core in real implementation)
  if (validation.slopScore === 0 && validation.uniqueFontSizes <= 8) {
    validation.accessibilityGrade = 'AAA';
  } else if (validation.slopScore <= 20) {
    validation.accessibilityGrade = 'AA';
  } else {
    validation.accessibilityGrade = 'A';
  }

  return validation;
}

/**
 * Validate all kits
 */
export function validateAllKits(kits: DesignKit[]): Map<string, KitValidation> {
  const results = new Map<string, KitValidation>();
  
  for (const kit of kits) {
    results.set(kit.id, validateKit(kit));
  }
  
  return results;
}

/**
 * Check if a kit passes validation (slopScore === 0)
 */
export function kitPasses(kit: DesignKit): boolean {
  const validation = validateKit(kit);
  return validation.slopScore === 0;
}

