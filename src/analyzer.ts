/**
 * TEMPLATE SIGNAL ANALYZER
 * 
 * Detects signals correlated with template/AI-looking sites.
 * These are perception triggers — not proof of AI usage.
 */

import {
  SIGNALS,
  TemplateSignal,
  Salience,
  SignalCategory,
  TEMPLATE_FONTS,
  TEMPLATE_COLORS,
  TEMPLATE_COPY_PATTERNS,
  QuickFix,
} from './signals.js';

// ============================================================================
// TYPES
// ============================================================================

export type ToneMode = 'direct' | 'diplomatic';
export type RiskLevel = 'low' | 'medium' | 'high';

export interface Evidence {
  type: 'css' | 'dom' | 'copy' | 'class';
  selector?: string;
  snippet: string;
}

export interface DetectedSignal {
  id: string;
  label: string;
  salience: Salience;
  category: SignalCategory;
  confidence: number;  // 0-1
  evidence: Evidence[];
  whyItReadsGeneric: string;
  perception: string;
  quickFixes: QuickFix[];
  prevalence?: string;
  references?: Array<{ title: string; url: string; note: string }>;
}

export interface AnalysisReport {
  // Core metrics
  templateScore: number;  // 0-100, higher = more template-like
  risk: RiskLevel;
  
  // Signals ranked by salience
  topSignals: DetectedSignal[];  // High salience first
  allSignals: DetectedSignal[];
  
  // Breakdown
  summary: {
    high: number;
    medium: number;
    low: number;
    total: number;
  };
  categories: Record<SignalCategory, number>;
  
  // Messaging (tone-aware)
  headline: string;
  explanation: string;
  
  // Always include
  disclaimer: string;
}

export interface VerifyResult {
  improved: boolean;
  before: {
    score: number;
    risk: RiskLevel;
    signalCount: number;
  };
  after: {
    score: number;
    risk: RiskLevel;
    signalCount: number;
  };
  signalsRemoved: string[];
  signalsDowngraded: string[];  // Salience reduced
  signalsRemaining: string[];
  regressions: string[];  // New signals introduced
  summary: string;
}

// ============================================================================
// DETECTION ENGINE
// ============================================================================

function detectInTailwindClasses(
  classes: string,
  signals: TemplateSignal[]
): Map<string, Evidence[]> {
  const results = new Map<string, Evidence[]>();
  const classList = classes.split(/\s+/);

  for (const signal of signals) {
    if (!signal.detect.tailwindClasses) continue;

    const evidence: Evidence[] = [];
    for (const cls of classList) {
      for (const targetClass of signal.detect.tailwindClasses) {
        if (cls.includes(targetClass)) {
          evidence.push({
            type: 'class',
            snippet: cls,
          });
        }
      }
    }

    if (evidence.length > 0) {
      results.set(signal.id, evidence);
    }
  }

  return results;
}

function detectInCSS(css: string, signals: TemplateSignal[]): Map<string, Evidence[]> {
  const results = new Map<string, Evidence[]>();

  for (const signal of signals) {
    const evidence: Evidence[] = [];

    // Check color patterns
    if (signal.detect.colorPatterns) {
      for (const color of signal.detect.colorPatterns) {
        if (css.toLowerCase().includes(color.toLowerCase())) {
          evidence.push({
            type: 'css',
            snippet: color,
          });
        }
      }
    }

    // Check font patterns
    if (signal.detect.fontPatterns) {
      for (const font of signal.detect.fontPatterns) {
        const regex = new RegExp(font, 'gi');
        if (regex.test(css)) {
          evidence.push({
            type: 'css',
            snippet: `font: ${font}`,
          });
        }
      }
    }

    // Check CSS properties
    if (signal.detect.cssProperties) {
      for (const [prop, values] of Object.entries(signal.detect.cssProperties)) {
        const propRegex = new RegExp(`${prop}\\s*:\\s*([^;]+)`, 'gi');
        const propMatches = css.matchAll(propRegex);
        for (const match of propMatches) {
          const value = match[1];
          for (const targetValue of values) {
            if (value.toLowerCase().includes(targetValue.toLowerCase())) {
              evidence.push({
                type: 'css',
                snippet: `${prop}: ${value.trim()}`,
              });
            }
          }
        }
      }
    }

    if (evidence.length > 0) {
      const existing = results.get(signal.id) || [];
      results.set(signal.id, [...existing, ...evidence]);
    }
  }

  return results;
}

function detectInHTML(html: string, signals: TemplateSignal[]): Map<string, Evidence[]> {
  const results = new Map<string, Evidence[]>();

  // Extract all class attributes
  const classRegex = /class="([^"]+)"/g;
  let allClasses = '';
  let match;
  while ((match = classRegex.exec(html)) !== null) {
    allClasses += ' ' + match[1];
  }

  // Detect Tailwind classes
  const tailwindResults = detectInTailwindClasses(allClasses, signals);
  for (const [id, evidence] of tailwindResults) {
    results.set(id, evidence);
  }

  // Check HTML patterns
  for (const signal of signals) {
    if (!signal.detect.htmlPatterns) continue;

    const evidence: Evidence[] = [];
    for (const pattern of signal.detect.htmlPatterns) {
      const regex = new RegExp(pattern, 'gi');
      if (regex.test(html)) {
        evidence.push({
          type: 'dom',
          snippet: pattern,
        });
      }
    }

    if (evidence.length > 0) {
      const existing = results.get(signal.id) || [];
      results.set(signal.id, [...existing, ...evidence]);
    }
  }

  return results;
}

function detectInText(text: string, signals: TemplateSignal[]): Map<string, Evidence[]> {
  const results = new Map<string, Evidence[]>();

  for (const signal of signals) {
    if (!signal.detect.textPatterns) continue;

    const evidence: Evidence[] = [];
    for (const pattern of signal.detect.textPatterns) {
      const regex = typeof pattern === 'string'
        ? new RegExp(pattern, 'gi')
        : pattern;

      const found = text.match(regex);
      if (found) {
        for (const match of found) {
          evidence.push({
            type: 'copy',
            snippet: match,
          });
        }
      }
    }

    if (evidence.length > 0) {
      results.set(signal.id, evidence);
    }
  }

  return results;
}

function detectFonts(content: string): Map<string, Evidence[]> {
  const results = new Map<string, Evidence[]>();
  const evidence: Evidence[] = [];

  for (const font of TEMPLATE_FONTS) {
    const regex = new RegExp(`['"]?${font}['"]?`, 'gi');
    if (regex.test(content)) {
      evidence.push({
        type: 'css',
        snippet: font,
      });
    }
  }

  if (evidence.length > 0) {
    // Map to the inter-only-typography signal
    results.set('inter-only-typography', evidence);
  }

  return results;
}

function detectCopy(text: string): Map<string, Evidence[]> {
  const results = new Map<string, Evidence[]>();
  const evidence: Evidence[] = [];

  for (const pattern of TEMPLATE_COPY_PATTERNS) {
    const found = text.match(pattern);
    if (found) {
      for (const match of found) {
        evidence.push({
          type: 'copy',
          snippet: match,
        });
      }
    }
  }

  if (evidence.length > 0) {
    results.set('generic-headline-copy', evidence);
  }

  return results;
}

// ============================================================================
// SCORING
// ============================================================================

const SALIENCE_WEIGHTS: Record<Salience, number> = {
  high: 20,
  medium: 10,
  low: 4,
};

function calculateScore(detections: Map<string, Evidence[]>): number {
  let score = 0;

  for (const [signalId, evidence] of detections) {
    const signal = SIGNALS.find(s => s.id === signalId);
    if (!signal) continue;

    const baseScore = SALIENCE_WEIGHTS[signal.salience];
    // Diminishing returns for multiple matches of same signal
    const evidenceMultiplier = Math.log2(evidence.length + 1);
    score += baseScore * evidenceMultiplier;
  }

  return Math.min(100, score);
}

function scoreToRisk(score: number): RiskLevel {
  if (score <= 15) return 'low';
  if (score <= 40) return 'medium';
  return 'high';
}

function calculateConfidence(evidence: Evidence[]): number {
  // More evidence = higher confidence, capped at 1
  return Math.min(1, 0.5 + (evidence.length * 0.15));
}

// ============================================================================
// MESSAGING
// ============================================================================

function generateHeadline(risk: RiskLevel, signalCount: number, tone: ToneMode): string {
  if (tone === 'diplomatic') {
    switch (risk) {
      case 'low':
        return `Your page looks distinctive (${signalCount} minor signal${signalCount !== 1 ? 's' : ''} detected)`;
      case 'medium':
        return `Your page may read as template-like (${signalCount} signal${signalCount !== 1 ? 's' : ''} detected)`;
      case 'high':
        return `Your page triggers several template patterns (${signalCount} signal${signalCount !== 1 ? 's' : ''} detected)`;
    }
  } else {
    switch (risk) {
      case 'low':
        return `Looking good — ${signalCount} minor signal${signalCount !== 1 ? 's' : ''}`;
      case 'medium':
        return `Template-likeness risk: Medium (${signalCount} signal${signalCount !== 1 ? 's' : ''})`;
      case 'high':
        return `This reads AI-generated (${signalCount} signal${signalCount !== 1 ? 's' : ''})`;
    }
  }
}

function generateExplanation(
  topSignals: DetectedSignal[],
  tone: ToneMode
): string {
  if (topSignals.length === 0) {
    return tone === 'diplomatic'
      ? 'No significant template patterns detected. Your design appears distinctive.'
      : 'Clean. No major template tells found.';
  }

  const highSalience = topSignals.filter(s => s.salience === 'high');

  if (highSalience.length === 0) {
    return tone === 'diplomatic'
      ? 'Some common patterns detected, but nothing that strongly signals "template site."'
      : 'Minor template signals — probably fine, but review if you want to stand out more.';
  }

  const topLabels = highSalience.slice(0, 3).map(s => s.label).join(', ');
  return tone === 'diplomatic'
    ? `The most noticeable patterns are: ${topLabels}. These are commonly associated with template-derived sites.`
    : `Main tells: ${topLabels}. These are what make viewers think "AI-generated."`;
}

const DISCLAIMER = 'These are signals correlated with template/AI-looking sites — not proof you used AI. Context matters.';

// ============================================================================
// MAIN ANALYZER
// ============================================================================

export function analyze(
  content: string,
  options: { tone?: ToneMode } = {}
): AnalysisReport {
  const tone = options.tone || 'direct';

  // Run all detectors
  const allDetections = new Map<string, Evidence[]>();

  const htmlResults = detectInHTML(content, SIGNALS);
  const cssResults = detectInCSS(content, SIGNALS);
  const textResults = detectInText(content, SIGNALS);
  const fontResults = detectFonts(content);
  const copyResults = detectCopy(content);

  // Merge all results
  for (const results of [htmlResults, cssResults, textResults, fontResults, copyResults]) {
    for (const [id, evidence] of results) {
      const existing = allDetections.get(id) || [];
      allDetections.set(id, [...existing, ...evidence]);
    }
  }

  // Deduplicate evidence within each signal
  for (const [id, evidence] of allDetections) {
    const unique = evidence.filter((e, i, arr) =>
      arr.findIndex(x => x.snippet === e.snippet && x.type === e.type) === i
    );
    allDetections.set(id, unique);
  }

  // Build detected signals
  const detectedSignals: DetectedSignal[] = [];
  for (const [signalId, evidence] of allDetections) {
    const signal = SIGNALS.find(s => s.id === signalId);
    if (!signal) continue;

    detectedSignals.push({
      id: signal.id,
      label: signal.label,
      salience: signal.salience,
      category: signal.category,
      confidence: calculateConfidence(evidence),
      evidence,
      whyItReadsGeneric: signal.whyItReadsGeneric,
      perception: signal.perception,
      quickFixes: signal.quickFixes,
      prevalence: signal.prevalence,
      references: signal.references,
    });
  }

  // Sort by salience (high first), then by confidence
  const salienceOrder: Record<Salience, number> = { high: 0, medium: 1, low: 2 };
  detectedSignals.sort((a, b) => {
    const salienceDiff = salienceOrder[a.salience] - salienceOrder[b.salience];
    if (salienceDiff !== 0) return salienceDiff;
    return b.confidence - a.confidence;
  });

  // Calculate score
  const score = calculateScore(allDetections);
  const risk = scoreToRisk(score);

  // Count by salience
  const summary = {
    high: detectedSignals.filter(s => s.salience === 'high').length,
    medium: detectedSignals.filter(s => s.salience === 'medium').length,
    low: detectedSignals.filter(s => s.salience === 'low').length,
    total: detectedSignals.length,
  };

  // Count by category
  const categories: Record<SignalCategory, number> = {
    typography: 0,
    color: 0,
    layout: 0,
    components: 0,
    imagery: 0,
    copy: 0,
    effects: 0,
  };
  for (const signal of detectedSignals) {
    categories[signal.category]++;
  }

  return {
    templateScore: Math.round(score * 10) / 10,
    risk,
    topSignals: detectedSignals.slice(0, 5),
    allSignals: detectedSignals,
    summary,
    categories,
    headline: generateHeadline(risk, summary.total, tone),
    explanation: generateExplanation(detectedSignals, tone),
    disclaimer: DISCLAIMER,
  };
}

// ============================================================================
// VERIFY FIX
// ============================================================================

export function verifyFix(
  originalContent: string,
  newContent: string,
  options: { tone?: ToneMode } = {}
): VerifyResult {
  const before = analyze(originalContent, options);
  const after = analyze(newContent, options);

  const beforeIds = new Set(before.allSignals.map(s => s.id));
  const afterIds = new Set(after.allSignals.map(s => s.id));

  const signalsRemoved = [...beforeIds].filter(id => !afterIds.has(id));
  const signalsRemaining = [...afterIds].filter(id => beforeIds.has(id));
  const regressions = [...afterIds].filter(id => !beforeIds.has(id));

  // Check for salience downgrades
  const signalsDowngraded: string[] = [];
  for (const id of signalsRemaining) {
    const beforeSignal = before.allSignals.find(s => s.id === id);
    const afterSignal = after.allSignals.find(s => s.id === id);
    if (beforeSignal && afterSignal) {
      const salienceOrder: Record<Salience, number> = { high: 0, medium: 1, low: 2 };
      if (salienceOrder[afterSignal.salience] > salienceOrder[beforeSignal.salience]) {
        signalsDowngraded.push(id);
      }
    }
  }

  const improved = after.templateScore < before.templateScore;

  let summary: string;
  if (improved) {
    const removedLabels = signalsRemoved
      .map(id => before.allSignals.find(s => s.id === id)?.label)
      .filter(Boolean)
      .slice(0, 3)
      .join(', ');

    summary = `Score improved from ${before.templateScore} to ${after.templateScore}. `;
    if (signalsRemoved.length > 0) {
      summary += `Removed: ${removedLabels}. `;
    }
    if (signalsRemaining.length > 0) {
      const remainingHighSalience = after.allSignals
        .filter(s => signalsRemaining.includes(s.id) && s.salience === 'high')
        .map(s => s.label);
      if (remainingHighSalience.length > 0) {
        summary += `Still present (high salience): ${remainingHighSalience.join(', ')}.`;
      }
    }
  } else if (after.templateScore === before.templateScore) {
    summary = 'Score unchanged. The changes didn\'t affect detected template signals.';
  } else {
    summary = `Score increased from ${before.templateScore} to ${after.templateScore}. `;
    if (regressions.length > 0) {
      const regressedLabels = regressions
        .map(id => after.allSignals.find(s => s.id === id)?.label)
        .filter(Boolean)
        .join(', ');
      summary += `New signals introduced: ${regressedLabels}.`;
    }
  }

  return {
    improved,
    before: {
      score: before.templateScore,
      risk: before.risk,
      signalCount: before.summary.total,
    },
    after: {
      score: after.templateScore,
      risk: after.risk,
      signalCount: after.summary.total,
    },
    signalsRemoved,
    signalsDowngraded,
    signalsRemaining,
    regressions,
    summary,
  };
}

// ============================================================================
// QUICK CHECK (backwards compatible)
// ============================================================================

export function quickCheck(content: string): {
  looksGeneric: boolean;
  confidence: 'low' | 'medium' | 'high';
  topIssues: string[];
} {
  const result = analyze(content);

  return {
    looksGeneric: result.risk !== 'low',
    confidence: result.risk,
    topIssues: result.topSignals
      .filter(s => s.salience !== 'low')
      .slice(0, 3)
      .map(s => s.label),
  };
}

export function getTemplateScore(content: string): number {
  return analyze(content).templateScore;
}

export function getRisk(content: string): RiskLevel {
  return analyze(content).risk;
}

