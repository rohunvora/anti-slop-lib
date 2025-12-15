/**
 * ANTI-SLOP LIBRARY
 * 
 * Detect and prevent AI-generated "slop" aesthetic in web projects
 * 
 * @example
 * ```ts
 * import { analyze, quickCheck, getSlopScore } from 'anti-slop';
 * 
 * // Full analysis
 * const result = analyze(htmlContent);
 * console.log(result.grade); // 'A' | 'B' | 'C' | 'D' | 'F'
 * console.log(result.slopScore); // 0-100
 * console.log(result.detections); // Array of detected patterns
 * 
 * // Quick check
 * const check = quickCheck(htmlContent);
 * if (check.isSlop) {
 *   console.log('Slop detected!', check.topIssues);
 * }
 * ```
 */

// Core detection
export {
  analyze,
  quickCheck,
  getSlopScore,
  getGrade,
  detectInHTML,
  detectInCSS,
  detectInTailwindClasses,
  detectInText,
  detectSlopFonts,
  detectSlopColors,
  detectSlopCopy,
  type AnalysisResult,
  type Detection,
} from './detector.js';

// Pattern definitions
export {
  PATTERNS,
  SLOP_FONTS,
  SLOP_COLORS,
  SLOP_LAYOUT_CLASSES,
  SLOP_COMPONENT_PATTERNS,
  SLOP_IMAGERY_PATTERNS,
  SLOP_COPY_PATTERNS,
  SLOP_EFFECT_PATTERNS,
  ALTERNATIVE_FONTS,
  ALTERNATIVE_PALETTES,
  ALTERNATIVE_COPY_APPROACHES,
  getPatternsByCategory,
  getPatternsBySeverity,
  getCriticalPatterns,
  type SlopPattern,
  type SlopCategory,
  type Severity,
} from './patterns.js';

// Prompts for AI tools
export {
  ANTI_SLOP_SYSTEM_PROMPT,
  DESIGN_DIRECTION_PROMPTS,
  PROMPTS,
  QUICK_INJECTIONS,
  getPrompt,
  getDesignDirection,
  combinePrompts,
  withAntiSlop,
  getAllPromptsAsText,
  type PromptTemplate,
} from './prompts.js';

// Alternative suggestions
export {
  FONT_ALTERNATIVES,
  COLOR_PALETTES,
  LAYOUT_ALTERNATIVES,
  BUTTON_ALTERNATIVES,
  CARD_ALTERNATIVES,
  getFontsForVibe,
  getPalettesForIndustry,
  getRandomAlternative,
  suggestFontPairing,
  type FontSuggestion,
  type ColorPalette,
  type LayoutPattern,
  type ComponentStyle,
} from './alternatives.js';

// Bookmarklet for browser analysis
export { generateBookmarklet, BOOKMARKLET_CODE } from './bookmarklet.js';

