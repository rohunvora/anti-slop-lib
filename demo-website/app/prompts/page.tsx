'use client';

import { useState, useMemo } from 'react';

interface Pattern {
  id: string;
  label: string;
  category: 'layout' | 'color' | 'typography' | 'interaction' | 'component';
  priority: 1 | 2 | 3; // 1 = critical, 2 = important, 3 = nice-to-have
  conflicts?: string[];
  preview: 'good' | 'bad';
  slop: string;
  alternative: string;
  promptText: string;
}

const patterns: Pattern[] = [
  // Layout - Priority 1
  {
    id: 'hero-asymmetric',
    label: 'Asymmetric Hero',
    category: 'layout',
    priority: 1,
    conflicts: ['hero-centered'],
    preview: 'good',
    slop: 'Center-aligned hero with H1 → Subtext → CTA',
    alternative: 'Asymmetric grid with content left, visual right',
    promptText: 'Hero section: Use asymmetric grid (grid-cols-[1.2fr,1fr]). Left-align headline and CTA. Place product visual on right.',
  },
  {
    id: 'hero-centered',
    label: 'Centered Hero',
    category: 'layout',
    priority: 2,
    conflicts: ['hero-asymmetric'],
    preview: 'bad',
    slop: 'The default AI-generated layout',
    alternative: 'Acceptable for certain use cases (events, minimal)',
    promptText: 'Hero section: Center-aligned is acceptable only for event pages or extreme minimalism.',
  },
  {
    id: 'card-varied',
    label: 'Varied Card Layout',
    category: 'layout',
    priority: 2,
    conflicts: ['card-grid'],
    preview: 'good',
    slop: 'Uniform 3-column grid of identical cards',
    alternative: 'Horizontal cards, varied sizes, or list layout',
    promptText: 'Cards: Use horizontal layout with thumbnail + content, OR varied card sizes. Avoid uniform grids.',
  },
  {
    id: 'card-grid',
    label: 'Uniform Card Grid',
    category: 'layout',
    priority: 3,
    conflicts: ['card-varied'],
    preview: 'bad',
    slop: 'Grid of identical cards—very common',
    alternative: 'Use only when content truly requires uniformity',
    promptText: 'Cards: Uniform grid only when all items are truly equivalent (e.g., product catalog).',
  },
  
  // Colors - Priority 1
  {
    id: 'no-gradient',
    label: 'No Gradient Heroes',
    category: 'color',
    priority: 1,
    preview: 'good',
    slop: 'Purple-to-blue gradient background',
    alternative: 'Solid colors (deep black or warm off-white)',
    promptText: 'NO gradient backgrounds. Use solid colors: #0a0a0a for dark mode, #f5f2eb for light mode.',
  },
  {
    id: 'limited-palette',
    label: 'Limited Palette',
    category: 'color',
    priority: 1,
    preview: 'good',
    slop: 'Multiple accent colors (blue, purple, teal)',
    alternative: '2-3 colors max, ONE accent',
    promptText: 'Color palette: Maximum 3 colors. ONE accent color used consistently for interactive elements.',
  },
  {
    id: 'no-slate',
    label: 'Custom Grays',
    category: 'color',
    priority: 2,
    preview: 'good',
    slop: 'Tailwind slate/gray/zinc defaults',
    alternative: 'Custom neutral tones (warm or cool)',
    promptText: 'Define custom neutral colors. Avoid Tailwind\'s default gray scales (slate, zinc, gray).',
  },
  
  // Typography - Priority 1
  {
    id: 'font-pairing',
    label: 'Font Pairing',
    category: 'typography',
    priority: 1,
    conflicts: ['font-inter'],
    preview: 'good',
    slop: 'Inter for everything',
    alternative: 'Serif headlines + sans body, or distinctive sans',
    promptText: 'Typography: Use serif for headlines (Instrument Serif, Fraunces, Playfair). Pair with geometric sans for body.',
  },
  {
    id: 'font-inter',
    label: 'Inter Only',
    category: 'typography',
    priority: 3,
    conflicts: ['font-pairing'],
    preview: 'bad',
    slop: 'The most common AI default',
    alternative: 'Acceptable only with strong hierarchy through size/weight',
    promptText: 'If using Inter, create strong hierarchy through dramatic size differences (48px+ headlines).',
  },
  {
    id: 'no-generic-copy',
    label: 'Specific Copy',
    category: 'typography',
    priority: 1,
    preview: 'good',
    slop: '"Transform your workflow" generic phrases',
    alternative: 'Concrete, falsifiable value propositions',
    promptText: 'NO generic copy like "Transform," "Supercharge," "Revolutionize." Write specific claims that name the user and describe concrete benefits.',
  },
  
  // Interaction - Priority 2
  {
    id: 'multi-hover',
    label: 'Multi-Property Hover',
    category: 'interaction',
    priority: 2,
    preview: 'good',
    slop: 'Just color change on hover',
    alternative: 'Transform + shadow combinations',
    promptText: 'Hover states: Combine transform (translateY -2px to -4px) with shadow or offset. Include active states.',
  },
  {
    id: 'visible-focus',
    label: 'Visible Focus States',
    category: 'interaction',
    priority: 1,
    preview: 'good',
    slop: 'No visible focus indicators',
    alternative: '3px outline with offset, contrasting color',
    promptText: 'REQUIRED: All interactive elements must have :focus-visible with 3px outline, offset 2px, contrasting color.',
  },
  
  // Components - Priority 2
  {
    id: 'sharp-cards',
    label: 'Sharp Card Corners',
    category: 'component',
    priority: 2,
    conflicts: ['rounded-cards'],
    preview: 'good',
    slop: 'rounded-xl shadow-lg on everything',
    alternative: 'Sharp corners with thick borders (2-3px)',
    promptText: 'Cards: border-radius: 0 with 2-3px borders. NO shadow-lg. Use transform for hover lift.',
  },
  {
    id: 'rounded-cards',
    label: 'Rounded Cards',
    category: 'component',
    priority: 3,
    conflicts: ['sharp-cards'],
    preview: 'bad',
    slop: 'The Tailwind default look',
    alternative: 'If rounding, use subtle values (4-8px max)',
    promptText: 'If using border-radius, limit to 4-8px maximum. Avoid rounded-xl (12px+).',
  },
];

// Conflict detection
function getConflicts(selected: Set<string>): string[] {
  const conflicts: string[] = [];
  selected.forEach(id => {
    const pattern = patterns.find(p => p.id === id);
    pattern?.conflicts?.forEach(conflictId => {
      if (selected.has(conflictId)) {
        const conflicting = patterns.find(p => p.id === conflictId);
        if (conflicting && !conflicts.includes(`${pattern.label} ↔ ${conflicting.label}`)) {
          conflicts.push(`${pattern.label} ↔ ${conflicting.label}`);
        }
      }
    });
  });
  return conflicts;
}

export default function PromptsPage() {
  const [selected, setSelected] = useState<Set<string>>(new Set(['hero-asymmetric', 'no-gradient', 'limited-palette', 'font-pairing', 'no-generic-copy', 'visible-focus', 'sharp-cards']));
  const [projectType, setProjectType] = useState('');
  const [copied, setCopied] = useState(false);
  
  const toggle = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };
  
  const selectRecommended = () => {
    setSelected(new Set(patterns.filter(p => p.preview === 'good').map(p => p.id)));
  };
  
  const clearAll = () => setSelected(new Set());
  
  const conflicts = useMemo(() => getConflicts(selected), [selected]);
  
  // Generate prioritized prompt
  const generatedPrompt = useMemo(() => {
    const selectedPatterns = patterns.filter(p => selected.has(p.id));
    
    // Sort by priority
    const sorted = [...selectedPatterns].sort((a, b) => a.priority - b.priority);
    const critical = sorted.filter(p => p.priority === 1);
    const important = sorted.filter(p => p.priority === 2);
    const optional = sorted.filter(p => p.priority === 3);
    
    const parts = [
      projectType ? `Create a ${projectType} website with the following design requirements:` : 'Create a website with the following design requirements:',
      '',
    ];
    
    if (critical.length > 0) {
      parts.push('## CRITICAL (Must follow)');
      critical.forEach(p => parts.push(`- ${p.promptText}`));
      parts.push('');
    }
    
    if (important.length > 0) {
      parts.push('## IMPORTANT (Strongly recommended)');
      important.forEach(p => parts.push(`- ${p.promptText}`));
      parts.push('');
    }
    
    if (optional.length > 0) {
      parts.push('## OPTIONAL (If applicable)');
      optional.forEach(p => parts.push(`- ${p.promptText}`));
      parts.push('');
    }
    
    // Always include accessibility
    parts.push('## ACCESSIBILITY (Required)');
    parts.push('- All text must meet 4.5:1 contrast ratio (WCAG AA)');
    parts.push('- Visible focus states on all interactive elements');
    parts.push('- Semantic HTML with proper heading hierarchy');
    parts.push('- Skip link for keyboard navigation');
    parts.push('');
    
    // Usability reminder
    parts.push('## TESTING');
    parts.push('- After implementation, test with real users');
    parts.push('- Attractive designs can mask usability problems');
    parts.push('- Verify the design works, not just looks good');
    
    return parts.join('\n');
  }, [selected, projectType]);
  
  const copy = async () => {
    await navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const categories = ['layout', 'color', 'typography', 'interaction', 'component'] as const;

  return (
    <>
      {/* Header */}
      <section className="border-b-3 border-ink">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-10">
          <h1 className="font-display text-3xl lg:text-4xl mb-4">Pattern-Based Prompt Builder</h1>
          <p className="text-ink-60 max-w-2xl">
            Select patterns to include, see conflicts highlighted, get prioritized output.
            Critical constraints appear first so AI follows them.
          </p>
        </div>
      </section>
      
      <div className="max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-[1fr,420px]">
          {/* Pattern selection */}
          <section className="p-6 lg:p-8 border-r-3 border-ink">
            {/* Project type */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">Project type (optional)</label>
              <input
                type="text"
                value={projectType}
                onChange={e => setProjectType(e.target.value)}
                placeholder="e.g., SaaS landing page, portfolio"
                className="w-full max-w-md"
              />
            </div>
            
            {/* Quick actions */}
            <div className="flex gap-2 mb-6">
              <button onClick={selectRecommended} className="btn btn-small">
                Select Recommended
              </button>
              <button onClick={clearAll} className="btn btn-small btn-outline">
                Clear All
              </button>
            </div>
            
            {/* Conflicts warning */}
            {conflicts.length > 0 && (
              <div className="mb-6 p-4 border-3 border-vermilion bg-vermilion/5">
                <p className="font-semibold text-sm text-vermilion mb-2">⚠ Conflicting patterns selected:</p>
                <ul className="text-sm text-ink-60">
                  {conflicts.map(c => <li key={c}>{c}</li>)}
                </ul>
              </div>
            )}
            
            {/* Patterns by category */}
            {categories.map(cat => (
              <div key={cat} className="mb-8">
                <h2 className="font-display text-lg mb-4 capitalize">{cat}</h2>
                <div className="space-y-2">
                  {patterns.filter(p => p.category === cat).map(pattern => {
                    const isSelected = selected.has(pattern.id);
                    const hasConflict = pattern.conflicts?.some(c => selected.has(c));
                    
                    return (
                      <button
                        key={pattern.id}
                        onClick={() => toggle(pattern.id)}
                        className={`w-full text-left p-4 border-3 transition-colors ${
                          isSelected 
                            ? hasConflict 
                              ? 'border-vermilion bg-vermilion/5' 
                              : 'border-teal bg-teal/5'
                            : 'border-ink hover:bg-paper-bright'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {/* Checkbox */}
                          <span className={`w-5 h-5 border-2 flex items-center justify-center text-xs flex-shrink-0 mt-0.5 ${
                            isSelected 
                              ? hasConflict
                                ? 'border-vermilion bg-vermilion text-paper'
                                : 'border-teal bg-teal text-paper' 
                              : 'border-ink'
                          }`}>
                            {isSelected && (hasConflict ? '!' : '✓')}
                          </span>
                          
                          <div className="flex-1">
                            {/* Label + priority */}
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold">{pattern.label}</span>
                              <span className={`text-[10px] px-1.5 py-0.5 border ${
                                pattern.priority === 1 ? 'border-vermilion text-vermilion' :
                                pattern.priority === 2 ? 'border-ink-40 text-ink-40' :
                                'border-ink-20 text-ink-40'
                              }`}>
                                {pattern.priority === 1 ? 'CRITICAL' : pattern.priority === 2 ? 'IMPORTANT' : 'OPTIONAL'}
                              </span>
                              <span className={`text-[10px] px-1.5 py-0.5 ${
                                pattern.preview === 'good' ? 'bg-teal/20 text-teal' : 'bg-vermilion/20 text-vermilion'
                              }`}>
                                {pattern.preview === 'good' ? 'Anti-slop' : 'Slop pattern'}
                              </span>
                            </div>
                            
                            {/* Description */}
                            <div className="grid grid-cols-2 gap-4 text-xs mt-2">
                              <div>
                                <span className="text-vermilion font-mono">AVOID:</span>
                                <p className="text-ink-60 mt-0.5">{pattern.slop}</p>
                              </div>
                              <div>
                                <span className="text-teal font-mono">USE:</span>
                                <p className="text-ink-60 mt-0.5">{pattern.alternative}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </section>
          
          {/* Generated prompt */}
          <section className="p-6 lg:p-8 bg-paper-bright lg:sticky lg:top-14 lg:h-[calc(100vh-3.5rem)] lg:overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-lg">Generated Prompt</h2>
              <button
                onClick={copy}
                disabled={selected.size === 0}
                className={`btn btn-small ${copied ? 'bg-teal border-teal' : ''} disabled:opacity-30`}
              >
                {copied ? '✓ Copied' : 'Copy'}
              </button>
            </div>
            
            <p className="text-xs text-ink-60 mb-4">
              {selected.size} patterns selected • Critical constraints appear first
            </p>
            
            <div className="code-block p-4 text-sm min-h-[300px]">
              <pre className="whitespace-pre-wrap">{generatedPrompt}</pre>
            </div>
            
            {/* Export options */}
            <div className="mt-6 p-4 border-3 border-ink">
              <p className="font-semibold text-sm mb-3">Usage</p>
              <ol className="text-xs text-ink-60 space-y-1">
                <li>1. Copy the prompt above</li>
                <li>2. Paste into Claude, ChatGPT, or Cursor</li>
                <li>3. Add specifics about your content</li>
                <li>4. If AI ignores constraints, reference CRITICAL section</li>
              </ol>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
