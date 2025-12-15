/**
 * INSPIRATION INDEX
 * 
 * Curated inspiration index exports
 */

export type { InspirationSite, DesignProfile, InspirationIndex, Tier } from './types.js';
export { calculateSlopRisk, calculateQualityScore, calculateDistinctivenessScore, determineTier } from './scorer.js';
export { getInspiration, type QueryOptions, type QueryResult } from './query.js';

