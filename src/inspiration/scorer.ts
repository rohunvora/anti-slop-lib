/**
 * INSPIRATION SCORER
 * 
 * Scores sites for slop risk and quality
 */

import { SLOP_FONTS } from '../patterns.js';
import type { InspirationSite } from './types.js';

interface RawSite {
  name: string;
  url: string;
  fonts?: string[];
  styles?: string[];
  views?: number;
  createdAt?: string;
}

/**
 * Calculate slop risk (0-100, higher = more slop)
 */
export function calculateSlopRisk(site: RawSite): number {
  let risk = 0;

  // Font penalties
  if (site.fonts?.some(f => SLOP_FONTS.includes(f))) {
    risk += 25;
  }

  // Style tag penalties
  const slopStyles = ['Gradient', '3D', 'Glassmorphism', 'Dark Mode'];
  const slopCount = site.styles?.filter(s => slopStyles.includes(s)).length || 0;
  risk += slopCount * 10;

  // Positive signals reduce risk
  const goodStyles = ['Asymmetric', 'Unusual Layout', 'Bold Typography', 'Editorial', 'Experimental'];
  const goodCount = site.styles?.filter(s => goodStyles.includes(s)).length || 0;
  risk -= goodCount * 8;

  return Math.max(0, Math.min(100, risk));
}

/**
 * Calculate quality score (0-100, higher = better)
 */
export function calculateQualityScore(site: RawSite): number {
  let score = 0;

  // Views (log-scaled, capped at 30)
  if (site.views) {
    score += Math.min(30, Math.log10(site.views + 1) * 10);
  }

  // Recency bonus
  if (site.createdAt) {
    const daysOld = daysSince(site.createdAt);
    if (daysOld < 90) score += 15;
    else if (daysOld < 180) score += 10;
    else if (daysOld < 365) score += 5;
  }

  // Distinctive style tags
  const distinctiveTags = ['Experimental', 'Unusual Layout', 'Bold Typography', 'Art Direction', 'Asymmetric'];
  const distinctiveCount = site.styles?.filter(s => distinctiveTags.includes(s)).length || 0;
  score += distinctiveCount * 12;

  return Math.min(100, score);
}

/**
 * Calculate distinctiveness score (0-100)
 */
export function calculateDistinctivenessScore(site: RawSite): number {
  let score = 0;

  // Non-slop fonts boost score
  if (site.fonts && site.fonts.length > 0) {
    const hasSlopFont = site.fonts.some(f => SLOP_FONTS.includes(f));
    if (!hasSlopFont) score += 30;
  }

  // Distinctive styles
  const distinctiveStyles = ['Experimental', 'Unusual Layout', 'Bold Typography', 'Art Direction'];
  const distinctiveCount = site.styles?.filter(s => distinctiveStyles.includes(s)).length || 0;
  score += distinctiveCount * 15;

  // Avoid generic styles
  const genericStyles = ['Minimal', 'Clean', 'Modern'];
  const genericCount = site.styles?.filter(s => genericStyles.includes(s)).length || 0;
  score -= genericCount * 5;

  return Math.max(0, Math.min(100, score));
}

/**
 * Determine tier based on scores
 */
export function determineTier(slopRisk: number, qualityScore: number): 'gold' | 'silver' | 'banned' {
  if (slopRisk >= 50) return 'banned';
  if (slopRisk < 20 && qualityScore > 60) return 'gold';
  if (slopRisk < 50 && qualityScore > 40) return 'silver';
  return 'banned';
}

/**
 * Helper: days since date string
 */
function daysSince(dateString: string): number {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

