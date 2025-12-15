/**
 * ANTI-SLOP LIBRARY
 * 
 * "We don't generate design — we remove the tells that make your site look mass-produced."
 * 
 * Detect template/AI signals in web projects and get specific fixes.
 * 
 * @example
 * ```ts
 * import { analyze, quickCheck, verifyFix } from 'anti-slop';
 * 
 * // Full analysis
 * const result = analyze(htmlContent);
 * console.log(result.risk); // 'low' | 'medium' | 'high'
 * console.log(result.templateScore); // 0-100
 * console.log(result.topSignals); // Ranked signals with fixes
 * 
 * // Quick check
 * const check = quickCheck(htmlContent);
 * if (check.looksGeneric) {
 *   console.log('Template signals detected:', check.topIssues);
 * }
 * 
 * // Verify improvements
 * const verification = verifyFix(originalCode, newCode);
 * console.log(verification.improved); // boolean
 * console.log(verification.signalsRemoved); // string[]
 * ```
 */

// ============================================================================
// NEW API (v2)
// ============================================================================

// Core analyzer
export {
  analyze,
  verifyFix,
  quickCheck,
  getTemplateScore,
  getRisk,
  type AnalysisReport,
  type DetectedSignal,
  type VerifyResult,
  type Evidence,
  type ToneMode,
  type RiskLevel,
} from './analyzer.js';

// Signal definitions
export {
  SIGNALS,
  TEMPLATE_FONTS,
  TEMPLATE_COLORS,
  TEMPLATE_COPY_PATTERNS,
  getSignalsByCategory,
  getSignalsBySalience,
  getHighSalienceSignals,
  LEGACY_ID_MAP,
  type TemplateSignal,
  type SignalCategory,
  type Salience,
  type Effort,
  type QuickFix,
} from './signals.js';

// ============================================================================
// LEGACY API (v1 - backwards compatible)
// ============================================================================

// Core detection (deprecated, use analyze from analyzer.js)
export {
  analyze as analyzeV1,
  quickCheck as quickCheckV1,
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

// Pattern definitions (deprecated, use signals.js)
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

// ============================================================================
// SHARED UTILITIES
// ============================================================================

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

// Design kits (now "escape hatches")
export {
  getKit,
  getKitById,
  listKits,
  listKitNames,
  warmEditorialKit,
  swissPrecisionKit,
  brutalistRawKit,
  forestOrganicKit,
  noirLuxuryKit,
  vibrantPlayKit,
  type DesignKit,
  type KitName,
  type KitTokens,
  type FontDefinition,
  type ComponentVariants,
  type ReferenceSite,
} from './design-kits/index.js';

export { validateKit, validateAllKits, kitPasses } from './design-kits/validator.js';

// Inspiration index
export {
  getInspiration,
  calculateSlopRisk,
  calculateQualityScore,
  calculateDistinctivenessScore,
  determineTier,
  type InspirationSite,
  type DesignProfile,
  type InspirationIndex,
  type Tier,
  type QueryOptions,
  type QueryResult,
} from './inspiration/index.js';
