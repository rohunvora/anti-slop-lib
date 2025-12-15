/**
 * INSPIRATION INDEX TYPES
 * 
 * Types for the curated inspiration index
 */

export type Tier = 'gold' | 'silver' | 'banned';

export interface InspirationSite {
  id: string;
  name: string;
  url: string;
  source: 'godly' | 'manual';
  
  // Core metadata
  types?: string[];
  styles?: string[];
  frameworks?: string[];
  fonts?: string[];
  thumbnail?: string;
  video?: string;
  views?: number;
  createdAt?: string;
  
  // Computed signals
  palette?: {
    dominant: string;
    accent: string[];
    luminance: number;
    warmth: number;
    accentCount: number;
  };
  
  // Safety scoring
  slopFlags: string[];
  slopRisk: number;  // 0-100
  safeFor: string[];
  avoidCopy: string[];
  
  // Ranking
  qualityScore: number;  // 0-100
  distinctivenessScore: number;  // 0-100
  tier: Tier;
}

export interface DesignProfile {
  id: string;
  name: string;
  vibe: string;
  tokens: {
    fonts: string[];
    colors: string[];
    radius: string;
    borderWidth: string;
  };
  referenceSiteIds: string[];  // Gold-first
}

export interface InspirationIndex {
  profiles: DesignProfile[];
  sites: InspirationSite[];
  version: string;
  builtAt: string;
  scoringWeights: {
    slopRisk: number;
    qualityScore: number;
    distinctivenessScore: number;
  };
}

