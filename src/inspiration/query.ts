/**
 * INSPIRATION QUERY API
 * 
 * Query the inspiration index for safe references
 */

import type { InspirationSite, DesignProfile, InspirationIndex } from './types.js';
import type { KitName } from '../design-kits/types.js';

export interface QueryOptions {
  kit?: KitName;
  tags?: string[];
  tier?: 'gold' | 'silver';
  limit?: number;
  excludeUrls?: string[];
}

export interface QueryResult {
  sites: InspirationSite[];
  kit?: {
    id: KitName;
    name: string;
  };
  guidance: {
    stealThis: string[];
    avoidThis: string[];
  };
}

/**
 * Query inspiration index
 */
export function getInspiration(
  index: InspirationIndex,
  options: QueryOptions = {}
): QueryResult {
  const {
    kit,
    tags = [],
    tier = 'gold',
    limit = 3,
    excludeUrls = [],
  } = options;

  // Filter by tier
  let sites = index.sites.filter(s => s.tier === tier);

  // Filter out excluded URLs
  sites = sites.filter(s => !excludeUrls.includes(s.url));

  // Filter by kit profile if provided
  if (kit) {
    const profile = index.profiles.find(p => p.id === kit);
    if (profile) {
      const profileSiteIds = new Set(profile.referenceSiteIds);
      sites = sites.filter(s => profileSiteIds.has(s.id));
    }
  }

  // Filter by tags if provided
  if (tags.length > 0) {
    sites = sites.filter(s => {
      const siteTags = [
        ...(s.styles || []),
        ...(s.types || []),
      ].map(t => t.toLowerCase());
      return tags.some(tag => siteTags.includes(tag.toLowerCase()));
    });
  }

  // Sort by quality score (descending)
  sites.sort((a, b) => b.qualityScore - a.qualityScore);

  // Limit results
  sites = sites.slice(0, limit);

  // Build guidance
  const stealThis: string[] = [];
  const avoidThis: string[] = [];

  for (const site of sites) {
    if (site.avoidCopy.length > 0) {
      avoidThis.push(...site.avoidCopy);
    }
    // Could extract "steal this" from site metadata
  }

  return {
    sites,
    kit: kit ? {
      id: kit,
      name: index.profiles.find(p => p.id === kit)?.name || kit,
    } : undefined,
    guidance: {
      stealThis: [...new Set(stealThis)],
      avoidThis: [...new Set(avoidThis)],
    },
  };
}

