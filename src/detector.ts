/**
 * SLOP DETECTOR ENGINE
 * 
 * Analyzes code, CSS, and content to detect AI slop patterns
 */

import {
  PATTERNS,
  SlopPattern,
  Severity,
  SlopCategory,
  SLOP_FONTS,
  SLOP_COLORS,
  SLOP_COPY_PATTERNS,
} from './patterns.js';

export interface Detection {
  pattern: SlopPattern;
  matches: string[];
  locations: Array<{
    file?: string;
    line?: number;
    content: string;
  }>;
  score: number;
}

export interface AnalysisResult {
  slopScore: number; // 0-100, higher = more slop
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  detections: Detection[];
  summary: {
    critical: number;
    warnings: number;
    info: number;
    total: number;
  };
  categories: Record<SlopCategory, number>;
  recommendations: string[];
}

// ============================================================================
// CORE DETECTION
// ============================================================================

export function detectInTailwindClasses(
  classes: string,
  patterns: SlopPattern[]
): Detection[] {
  const detections: Detection[] = [];
  const classList = classes.split(/\s+/);

  for (const pattern of patterns) {
    if (!pattern.detect.tailwindClasses) continue;

    const matches: string[] = [];
    for (const cls of classList) {
      for (const slopClass of pattern.detect.tailwindClasses) {
        if (cls.includes(slopClass)) {
          matches.push(cls);
        }
      }
    }

    if (matches.length > 0) {
      detections.push({
        pattern,
        matches: [...new Set(matches)],
        locations: matches.map(m => ({ content: m })),
        score: calculatePatternScore(pattern, matches.length),
      });
    }
  }

  return detections;
}

export function detectInCSS(css: string, patterns: SlopPattern[]): Detection[] {
  const detections: Detection[] = [];

  for (const pattern of patterns) {
    // Check color patterns
    if (pattern.detect.colorPatterns) {
      const matches: string[] = [];
      for (const color of pattern.detect.colorPatterns) {
        if (css.toLowerCase().includes(color.toLowerCase())) {
          matches.push(color);
        }
      }
      if (matches.length > 0) {
        detections.push({
          pattern,
          matches: [...new Set(matches)],
          locations: matches.map(m => ({ content: m })),
          score: calculatePatternScore(pattern, matches.length),
        });
      }
    }

    // Check font patterns
    if (pattern.detect.fontPatterns) {
      const matches: string[] = [];
      for (const font of pattern.detect.fontPatterns) {
        const regex = new RegExp(font, 'gi');
        if (regex.test(css)) {
          matches.push(font);
        }
      }
      if (matches.length > 0) {
        detections.push({
          pattern,
          matches: [...new Set(matches)],
          locations: matches.map(m => ({ content: m })),
          score: calculatePatternScore(pattern, matches.length),
        });
      }
    }

    // Check CSS properties
    if (pattern.detect.cssProperties) {
      const matches: string[] = [];
      for (const [prop, values] of Object.entries(pattern.detect.cssProperties)) {
        const propRegex = new RegExp(`${prop}\\s*:\\s*([^;]+)`, 'gi');
        const propMatches = css.matchAll(propRegex);
        for (const match of propMatches) {
          const value = match[1];
          for (const slopValue of values) {
            if (value.toLowerCase().includes(slopValue.toLowerCase())) {
              matches.push(`${prop}: ${value}`);
            }
          }
        }
      }
      if (matches.length > 0) {
        detections.push({
          pattern,
          matches: [...new Set(matches)],
          locations: matches.map(m => ({ content: m })),
          score: calculatePatternScore(pattern, matches.length),
        });
      }
    }
  }

  return deduplicateDetections(detections);
}

export function detectInHTML(html: string, patterns: SlopPattern[]): Detection[] {
  const detections: Detection[] = [];

  // Extract all class attributes
  const classRegex = /class="([^"]+)"/g;
  let allClasses = '';
  let match;
  while ((match = classRegex.exec(html)) !== null) {
    allClasses += ' ' + match[1];
  }

  // Detect Tailwind classes
  const tailwindDetections = detectInTailwindClasses(allClasses, patterns);
  detections.push(...tailwindDetections);

  // Check HTML patterns
  for (const pattern of patterns) {
    if (pattern.detect.htmlPatterns) {
      const matches: string[] = [];
      for (const htmlPattern of pattern.detect.htmlPatterns) {
        const regex = new RegExp(htmlPattern, 'gi');
        if (regex.test(html)) {
          matches.push(htmlPattern);
        }
      }
      if (matches.length > 0) {
        detections.push({
          pattern,
          matches: [...new Set(matches)],
          locations: matches.map(m => ({ content: m })),
          score: calculatePatternScore(pattern, matches.length),
        });
      }
    }
  }

  return deduplicateDetections(detections);
}

export function detectInText(text: string, patterns: SlopPattern[]): Detection[] {
  const detections: Detection[] = [];

  for (const pattern of patterns) {
    if (!pattern.detect.textPatterns) continue;

    const matches: string[] = [];
    for (const textPattern of pattern.detect.textPatterns) {
      const regex = typeof textPattern === 'string' 
        ? new RegExp(textPattern, 'gi')
        : textPattern;
      
      const found = text.match(regex);
      if (found) {
        matches.push(...found);
      }
    }

    if (matches.length > 0) {
      detections.push({
        pattern,
        matches: [...new Set(matches)],
        locations: matches.map(m => ({ content: m })),
        score: calculatePatternScore(pattern, matches.length),
      });
    }
  }

  return detections;
}

// ============================================================================
// FONT DETECTION
// ============================================================================

export function detectSlopFonts(content: string): Detection[] {
  const detections: Detection[] = [];
  const matches: string[] = [];

  for (const font of SLOP_FONTS) {
    const regex = new RegExp(`['"]?${font}['"]?`, 'gi');
    if (regex.test(content)) {
      matches.push(font);
    }
  }

  if (matches.length > 0) {
    const pattern = PATTERNS.find(p => p.id === 'slop-font-inter') || PATTERNS[0];
    detections.push({
      pattern,
      matches: [...new Set(matches)],
      locations: matches.map(m => ({ content: m })),
      score: calculatePatternScore(pattern, matches.length),
    });
  }

  return detections;
}

// ============================================================================
// COPY DETECTION
// ============================================================================

export function detectSlopCopy(text: string): Detection[] {
  const detections: Detection[] = [];
  const matches: string[] = [];

  for (const pattern of SLOP_COPY_PATTERNS) {
    const found = text.match(pattern);
    if (found) {
      matches.push(...found);
    }
  }

  if (matches.length > 0) {
    const pattern = PATTERNS.find(p => p.id === 'slop-generic-headline')!;
    detections.push({
      pattern,
      matches: [...new Set(matches)],
      locations: matches.map(m => ({ content: m })),
      score: calculatePatternScore(pattern, matches.length),
    });
  }

  return detections;
}

// ============================================================================
// COLOR DETECTION
// ============================================================================

export function detectSlopColors(content: string): Detection[] {
  const detections: Detection[] = [];
  const matches: string[] = [];

  // Check purple family
  for (const purple of SLOP_COLORS.purples) {
    if (content.toLowerCase().includes(purple.toLowerCase())) {
      matches.push(purple);
    }
  }

  if (matches.length > 0) {
    const pattern = PATTERNS.find(p => p.id === 'slop-purple-gradient')!;
    detections.push({
      pattern,
      matches: [...new Set(matches)],
      locations: matches.map(m => ({ content: m })),
      score: calculatePatternScore(pattern, matches.length),
    });
  }

  return detections;
}

// ============================================================================
// COMPREHENSIVE ANALYSIS
// ============================================================================

export function analyze(content: string, type: 'html' | 'css' | 'jsx' | 'auto' = 'auto'): AnalysisResult {
  const detections: Detection[] = [];

  // Auto-detect content type
  if (type === 'auto') {
    if (content.includes('<!DOCTYPE') || content.includes('<html')) {
      type = 'html';
    } else if (content.includes('{') && content.includes('}') && !content.includes('<')) {
      type = 'css';
    } else {
      type = 'jsx';
    }
  }

  // Run all detectors
  detections.push(...detectInHTML(content, PATTERNS));
  detections.push(...detectInCSS(content, PATTERNS));
  detections.push(...detectSlopFonts(content));
  detections.push(...detectSlopColors(content));
  detections.push(...detectSlopCopy(content));
  detections.push(...detectInText(content, PATTERNS));

  // Deduplicate
  const uniqueDetections = deduplicateDetections(detections);

  // Calculate scores
  const totalScore = uniqueDetections.reduce((sum, d) => sum + d.score, 0);
  const normalizedScore = Math.min(100, totalScore);

  // Count by severity
  const summary = {
    critical: uniqueDetections.filter(d => d.pattern.severity === 'critical').length,
    warnings: uniqueDetections.filter(d => d.pattern.severity === 'warning').length,
    info: uniqueDetections.filter(d => d.pattern.severity === 'info').length,
    total: uniqueDetections.length,
  };

  // Count by category
  const categories: Record<SlopCategory, number> = {
    typography: 0,
    color: 0,
    layout: 0,
    components: 0,
    imagery: 0,
    copy: 0,
    effects: 0,
  };
  for (const detection of uniqueDetections) {
    categories[detection.pattern.category]++;
  }

  // Generate recommendations
  const recommendations = generateRecommendations(uniqueDetections);

  return {
    slopScore: normalizedScore,
    grade: scoreToGrade(normalizedScore),
    detections: uniqueDetections,
    summary,
    categories,
    recommendations,
  };
}

// ============================================================================
// HELPERS
// ============================================================================

function calculatePatternScore(pattern: SlopPattern, matchCount: number): number {
  const severityWeights: Record<Severity, number> = {
    critical: 15,
    warning: 8,
    info: 3,
  };
  
  const baseScore = severityWeights[pattern.severity];
  // Diminishing returns for multiple matches of same pattern
  return baseScore * Math.log2(matchCount + 1);
}

function scoreToGrade(score: number): 'A' | 'B' | 'C' | 'D' | 'F' {
  if (score <= 10) return 'A';
  if (score <= 25) return 'B';
  if (score <= 45) return 'C';
  if (score <= 65) return 'D';
  return 'F';
}

function deduplicateDetections(detections: Detection[]): Detection[] {
  const seen = new Map<string, Detection>();
  
  for (const detection of detections) {
    const key = detection.pattern.id;
    const existing = seen.get(key);
    
    if (existing) {
      // Merge matches
      existing.matches = [...new Set([...existing.matches, ...detection.matches])];
      existing.score = Math.max(existing.score, detection.score);
    } else {
      seen.set(key, { ...detection });
    }
  }
  
  return Array.from(seen.values());
}

function generateRecommendations(detections: Detection[]): string[] {
  const recommendations: string[] = [];
  const seenCategories = new Set<SlopCategory>();

  // Sort by severity
  const sorted = [...detections].sort((a, b) => {
    const order: Record<Severity, number> = { critical: 0, warning: 1, info: 2 };
    return order[a.pattern.severity] - order[b.pattern.severity];
  });

  for (const detection of sorted.slice(0, 5)) {
    if (!seenCategories.has(detection.pattern.category)) {
      const alt = detection.pattern.alternatives[0];
      if (alt) {
        recommendations.push(`${detection.pattern.name}: ${alt}`);
      }
      seenCategories.add(detection.pattern.category);
    }
  }

  // Add general recommendations if score is high
  if (detections.length >= 5) {
    recommendations.push(
      'Consider a complete design refresh with a distinctive aesthetic direction'
    );
  }

  return recommendations;
}

// ============================================================================
// QUICK CHECKS
// ============================================================================

export function quickCheck(content: string): {
  isSlop: boolean;
  confidence: 'low' | 'medium' | 'high';
  topIssues: string[];
} {
  const result = analyze(content);
  
  return {
    isSlop: result.slopScore > 30,
    confidence: result.slopScore > 60 ? 'high' : result.slopScore > 30 ? 'medium' : 'low',
    topIssues: result.detections
      .filter(d => d.pattern.severity !== 'info')
      .slice(0, 3)
      .map(d => d.pattern.name),
  };
}

export function getSlopScore(content: string): number {
  return analyze(content).slopScore;
}

export function getGrade(content: string): string {
  return analyze(content).grade;
}


