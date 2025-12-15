/**
 * DESIGN KITS REGISTRY
 * 
 * Central registry for all design kits
 */

import type { DesignKit, KitName } from './types.js';
import { warmEditorialKit } from './warm-editorial/index.js';
import { swissPrecisionKit } from './swiss-precision/index.js';
import { brutalistRawKit } from './brutalist-raw/index.js';
import { forestOrganicKit } from './forest-organic/index.js';
import { noirLuxuryKit } from './noir-luxury/index.js';
import { vibrantPlayKit } from './vibrant-play/index.js';

const KITS: Record<KitName, DesignKit> = {
  'warm-editorial': warmEditorialKit,
  'swiss-precision': swissPrecisionKit,
  'brutalist-raw': brutalistRawKit,
  'forest-organic': forestOrganicKit,
  'noir-luxury': noirLuxuryKit,
  'vibrant-play': vibrantPlayKit,
};

/**
 * Get a design kit by name
 */
export function getKit(name: KitName): DesignKit {
  const kit = KITS[name];
  if (!kit) {
    throw new Error(`Design kit "${name}" not found. Available kits: ${listKitNames().join(', ')}`);
  }
  return kit;
}

/**
 * List all available kit names
 */
export function listKitNames(): KitName[] {
  return Object.keys(KITS) as KitName[];
}

/**
 * List all design kits
 */
export function listKits(): DesignKit[] {
  return Object.values(KITS);
}

/**
 * Get kit by ID (alias for getKit)
 */
export function getKitById(id: KitName): DesignKit {
  return getKit(id);
}

// Export all kits
export { warmEditorialKit } from './warm-editorial/index.js';
export { swissPrecisionKit } from './swiss-precision/index.js';
export { brutalistRawKit } from './brutalist-raw/index.js';
export { forestOrganicKit } from './forest-organic/index.js';
export { noirLuxuryKit } from './noir-luxury/index.js';
export { vibrantPlayKit } from './vibrant-play/index.js';

// Export types
export type { DesignKit, KitName, KitTokens, FontDefinition, ComponentVariants, ReferenceSite } from './types.js';

