'use client';

import { useState, useMemo } from 'react';

interface PatternChoice {
  id: string;
  label: string;
  category: 'layout' | 'color' | 'typography' | 'interaction' | 'component';
  slop: string;
  alternative: string;
  promptText: string;
}

const patterns: PatternChoice[] = [
  // Layout patterns
  {
    id: 'hero-centered',
    label: 'Hero Layout',
    category: 'layout',
    slop: 'Center-aligned hero with H1 → Subtext → CTA',
    alternative: 'Asymmetric hero with content left, visual right',
    promptText: 'Use an asymmetric hero layout with grid-cols-[1.2fr,1fr]. Left-align the headline and CTA. Place a product screenshot or visual on the right side.',
  },
  {
    id: 'card-grid',
    label: 'Card Grid',
    category: 'layout',
    slop: 'Uniform 3-column grid of identical cards',
    alternative: 'Varied card sizes or list layout',
    promptText: 'Avoid uniform card grids. Use varied card sizes, or a list layout with horizontal cards showing thumbnail + content side by side.',
  },
  {
    id: 'section-rhythm',
    label: 'Section Rhythm',
    category: 'layout',
    slop: 'Alternating content+image sections',
    alternative: 'Distinct section styles with varying layouts',
    promptText: 'Each section should have a distinct layout. Avoid the pattern of alternating image-left/image-right. Use full-bleed sections, split layouts, or editorial columns.',
  },
  
  // Color patterns
  {
    id: 'gradient-hero',
    label: 'Hero Background',
    category: 'color',
    slop: 'Purple-to-blue gradient background',
    alternative: 'Solid color or subtle texture',
    promptText: 'NO gradient backgrounds, especially purple/indigo. Use solid colors: either deep black (#0a0a0a) with one accent color, or warm off-white (#f5f2eb) with dark text.',
  },
  {
    id: 'color-palette',
    label: 'Color Palette',
    category: 'color',
    slop: 'Blue primary, gray secondary, white background',
    alternative: 'Intentional palette with 2-3 colors max',
    promptText: 'Limit the palette to 2-3 colors. Choose ONE accent color (not blue) and use it consistently for interactive elements. Avoid gray text on white—use warm tones.',
  },
  {
    id: 'contrast',
    label: 'Text Contrast',
    category: 'color',
    slop: 'Light gray text (text-gray-400)',
    alternative: 'High contrast with readable body text',
    promptText: 'Ensure all text meets WCAG AA contrast (4.5:1 minimum). Body text should be at least 60% opacity on its background, not lighter.',
  },
  
  // Typography patterns
  {
    id: 'font-single',
    label: 'Font Choice',
    category: 'typography',
    slop: 'Inter for everything',
    alternative: 'Intentional font pairing (serif + sans)',
    promptText: 'Use a serif font for headlines (like Instrument Serif, Fraunces, or Playfair) paired with a geometric sans for body text. This creates visual hierarchy beyond just size.',
  },
  {
    id: 'type-scale',
    label: 'Type Scale',
    category: 'typography',
    slop: 'Tailwind default sizes (text-xl, text-2xl)',
    alternative: 'Custom scale with clear hierarchy',
    promptText: 'Body text must be at least 16px. Headlines should be dramatically larger (48-72px for heroes). Use letter-spacing: -0.02em on large headlines.',
  },
  {
    id: 'copy-generic',
    label: 'Copywriting',
    category: 'typography',
    slop: '"Transform your workflow" generic copy',
    alternative: 'Specific, concrete value propositions',
    promptText: 'NO generic marketing phrases like "Transform," "Supercharge," or "Revolutionize." Write specific copy that names the user and describes concrete benefits.',
  },
  
  // Interaction patterns
  {
    id: 'hover-color',
    label: 'Hover States',
    category: 'interaction',
    slop: 'Just background color change on hover',
    alternative: 'Multi-property transitions (translate + shadow)',
    promptText: 'Hover states should use multiple properties: translateY(-2px) to -4px, plus either shadow or an offset pseudo-element. Include active states that move the element back.',
  },
  {
    id: 'button-style',
    label: 'Button Design',
    category: 'interaction',
    slop: 'Rounded pill buttons with gradient',
    alternative: 'Sharp or slightly rounded with solid fill',
    promptText: 'Buttons should have sharp corners (border-radius: 0) or very slight rounding (4px max). Use solid colors, not gradients. Include visible pressed/active states.',
  },
  {
    id: 'focus-states',
    label: 'Focus States',
    category: 'interaction',
    slop: 'No visible focus indicators',
    alternative: 'Clear, high-contrast focus rings',
    promptText: 'All interactive elements MUST have visible focus states using :focus-visible. Use a 3px outline with offset, in a contrasting color like blue (#0066cc).',
  },
  
  // Component patterns
  {
    id: 'card-rounded',
    label: 'Card Styling',
    category: 'component',
    slop: 'rounded-xl shadow-lg border-0',
    alternative: 'Sharp corners with thick borders',
    promptText: 'Cards should NOT use rounded-xl or shadow-lg. Use sharp corners (border-radius: 0) with 2-3px solid borders. For hover, use translate + offset shadow, not box-shadow.',
  },
  {
    id: 'input-style',
    label: 'Form Inputs',
    category: 'component',
    slop: 'Rounded inputs with subtle borders',
    alternative: 'Sharp inputs with visible borders',
    promptText: 'Form inputs should have sharp corners and thick borders (2-3px). Placeholder text should have sufficient contrast. Focus states should change border color.',
  },
  {
    id: 'nav-glass',
    label: 'Navigation',
    category: 'component',
    slop: 'Glassmorphism navbar with blur',
    alternative: 'Solid background with clear border',
    promptText: 'Navigation should have a solid background and a visible bottom border (2-3px). Avoid backdrop-blur glassmorphism. Links should have clear hover and focus states.',
  },
];

export default function PromptsPage() {
  const [selectedPatterns, setSelectedPatterns] = useState<Set<string>>(new Set());
  const [projectType, setProjectType] = useState('');
  const [copied, setCopied] = useState(false);
  
  const categories = ['layout', 'color', 'typography', 'interaction', 'component'] as const;
  
  const togglePattern = (id: string) => {
    setSelectedPatterns(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };
  
  const selectAll = () => {
    setSelectedPatterns(new Set(patterns.map(p => p.id)));
  };
  
  const clearAll = () => {
    setSelectedPatterns(new Set());
  };
  
  // Generate prompt from selected patterns
  const generatedPrompt = useMemo(() => {
    if (selectedPatterns.size === 0) {
      return 'Select patterns above to generate a prompt.';
    }
    
    const selected = patterns.filter(p => selectedPatterns.has(p.id));
    
    const parts = [
      projectType 
        ? `Create a ${projectType} with the following anti-slop design requirements:`
        : 'Create a website with the following anti-slop design requirements:',
      '',
      '## Design Constraints',
      '',
    ];
    
    categories.forEach(cat => {
      const catPatterns = selected.filter(p => p.category === cat);
      if (catPatterns.length > 0) {
        parts.push(`### ${cat.charAt(0).toUpperCase() + cat.slice(1)}`);
        catPatterns.forEach(p => {
          parts.push(`- ${p.promptText}`);
        });
        parts.push('');
      }
    });
    
    parts.push('## Things to AVOID (Slop Patterns)');
    parts.push('');
    selected.forEach(p => {
      parts.push(`- NO: ${p.slop}`);
    });
    parts.push('');
    
    parts.push('## Accessibility Requirements');
    parts.push('- Minimum 4.5:1 color contrast ratio for all text');
    parts.push('- Visible focus states on all interactive elements');
    parts.push('- Semantic HTML with proper heading hierarchy');
    parts.push('- Skip link for keyboard navigation');
    
    return parts.join('\n');
  }, [selectedPatterns, projectType]);
  
  const copyPrompt = async () => {
    await navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Header */}
      <section className="border-b-3 border-ink">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-10">
          <h1 className="font-display text-3xl lg:text-4xl mb-4">
            Pattern-Based Prompt Builder
          </h1>
          <p className="text-ink-60 max-w-2xl">
            Build AI prompts by selecting specific design patterns to include or avoid. 
            Each selection adds concrete instructions, not vague descriptions.
          </p>
        </div>
      </section>
      
      <div className="max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-[1fr,400px]">
          {/* Pattern selection */}
          <section className="p-6 lg:p-8 border-r-3 border-ink">
            {/* Project type */}
            <div className="mb-8">
              <label className="block text-sm font-semibold uppercase tracking-wider text-ink-60 mb-3">
                Project Type (optional)
              </label>
              <input
                type="text"
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
                placeholder="e.g., SaaS landing page, portfolio, documentation"
                className="w-full max-w-md"
              />
            </div>
            
            {/* Quick actions */}
            <div className="flex gap-4 mb-8">
              <button onClick={selectAll} className="btn btn-small btn-outline">
                Select All
              </button>
              <button onClick={clearAll} className="btn btn-small btn-outline">
                Clear All
              </button>
              <span className="text-sm text-ink-60 self-center">
                {selectedPatterns.size} of {patterns.length} selected
              </span>
            </div>
            
            {/* Patterns by category */}
            {categories.map(category => (
              <div key={category} className="mb-8">
                <h2 className="font-display text-xl mb-4 capitalize">
                  {category}
                </h2>
                <div className="space-y-3">
                  {patterns.filter(p => p.category === category).map(pattern => (
                    <button
                      key={pattern.id}
                      onClick={() => togglePattern(pattern.id)}
                      className={`w-full text-left border-3 p-4 transition-colors ${
                        selectedPatterns.has(pattern.id)
                          ? 'border-teal bg-teal/5'
                          : 'border-ink hover:bg-paper-bright'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <span className={`w-5 h-5 border-2 flex items-center justify-center text-xs flex-shrink-0 mt-0.5 ${
                          selectedPatterns.has(pattern.id)
                            ? 'border-teal bg-teal text-paper'
                            : 'border-ink'
                        }`}>
                          {selectedPatterns.has(pattern.id) && '✓'}
                        </span>
                        <div>
                          <p className="font-semibold mb-1">{pattern.label}</p>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-vermilion font-mono text-xs mb-1">AVOID:</p>
                              <p className="text-ink-60">{pattern.slop}</p>
                            </div>
                            <div>
                              <p className="text-teal font-mono text-xs mb-1">USE:</p>
                              <p className="text-ink-60">{pattern.alternative}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </section>
          
          {/* Generated prompt */}
          <section className="p-6 lg:p-8 bg-paper-bright lg:sticky lg:top-14 lg:h-[calc(100vh-3.5rem)] lg:overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl">Generated Prompt</h2>
              <button
                onClick={copyPrompt}
                disabled={selectedPatterns.size === 0}
                className={`btn btn-small ${copied ? 'bg-teal border-teal' : ''} disabled:opacity-50`}
              >
                {copied ? '✓ Copied' : 'Copy'}
              </button>
            </div>
            
            <div className="code-block p-4 text-sm min-h-[300px]">
              <pre className="whitespace-pre-wrap">{generatedPrompt}</pre>
            </div>
            
            {selectedPatterns.size > 0 && (
              <div className="mt-6 p-4 border-3 border-ink">
                <h3 className="font-semibold text-sm mb-2">How to use</h3>
                <ol className="text-sm text-ink-60 space-y-2">
                  <li>1. Copy the prompt above</li>
                  <li>2. Paste into Claude, ChatGPT, or Cursor</li>
                  <li>3. Add specifics about your content and features</li>
                  <li>4. If AI generates slop anyway, point it to the "AVOID" section</li>
                </ol>
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  );
}
