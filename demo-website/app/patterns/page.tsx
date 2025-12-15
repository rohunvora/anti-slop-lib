'use client';

import { useState } from 'react';

interface Pattern {
  id: string;
  name: string;
  category: 'colors' | 'typography' | 'layout' | 'components' | 'effects' | 'copy';
  impact: 'high' | 'medium' | 'low';
  slop: {
    description: string;
    code: string;
    why: string;
  };
  antiSlop: {
    description: string;
    code: string;
    why: string;
    principles: string[];
    accessibility?: string;
  };
}

const patterns: Pattern[] = [
  {
    id: 'purple-gradient',
    name: 'Hero Background',
    category: 'colors',
    impact: 'high',
    slop: {
      description: 'The purple-to-blue gradient has become the universal signifier of "I used AI to build this." It\'s on thousands of landing pages.',
      code: `<div className="bg-gradient-to-br from-purple-600 
  via-indigo-600 to-blue-600">
  <h1 className="text-white text-center">
    Transform Your Workflow
  </h1>
</div>`,
      why: 'AI models default to purple/indigo because it appears frequently in their training data—from SaaS marketing pages to design tutorials. The result is visual conformity.',
    },
    antiSlop: {
      description: 'A solid color with a single, intentional accent communicates clarity and confidence. The constraint forces you to make a real choice.',
      code: `/* Premium dark with surgical accent */
<div className="bg-[#0a0a0a]">
  <h1 className="text-white">
    Ship faster. <span className="text-[#00d4ff]">Build better.</span>
  </h1>
</div>

/* Or warm editorial */
<div className="bg-[#FAF7F2]">
  <h1 className="text-[#2D2A26] font-serif">
    The future of design systems
  </h1>
</div>`,
      why: 'Constraint breeds creativity. When you limit yourself to 2-3 colors, each choice must be justified. The accent color becomes meaningful—a wayfinding element—rather than decoration.',
      principles: [
        'Choose ONE accent color and use it consistently for interactive elements',
        'Solid backgrounds create visual quiet that lets content breathe',
        'Dark mode ≠ dark gray; go truly dark (#0a0a0a) or stay light',
      ],
      accessibility: 'Ensure at least 4.5:1 contrast ratio between text and background. Tools: WebAIM contrast checker, Chrome DevTools.',
    },
  },
  {
    id: 'inter-everywhere',
    name: 'Typography Choices',
    category: 'typography',
    impact: 'high',
    slop: {
      description: 'Inter everywhere. No hierarchy through font choice, just weight variations. The "safe" choice that makes everything look the same.',
      code: `font-family: 'Inter', sans-serif;

/* Everything is Inter: */
h1 { font-weight: 700; }
h2 { font-weight: 600; }
p  { font-weight: 400; }

/* No character, just weight */`,
      why: 'Inter is a well-designed typeface—that\'s why everyone uses it. But ubiquity erases distinctiveness. When every site uses Inter, none stand out.',
    },
    antiSlop: {
      description: 'Intentional font pairing creates visual hierarchy AND brand character. Serif + sans creates tension. Mono adds technical credibility.',
      code: `/* Serif headlines for editorial weight */
h1, h2 { 
  font-family: 'Instrument Serif', Georgia, serif;
  letter-spacing: -0.02em;
}

/* Geometric sans for body */
body { 
  font-family: 'Anybody', system-ui, sans-serif;
}

/* Mono for technical elements */
code, .data { 
  font-family: 'JetBrains Mono', monospace;
}`,
      why: 'Font choice communicates before anyone reads a word. Serif says "editorial, trustworthy, established." Geometric sans says "modern, precise." Mono says "technical, honest." Mix them with purpose.',
      principles: [
        'Limit yourself to 2-3 font families maximum',
        'Use serif for headlines to add editorial weight',
        'Pair contrasting categories (serif + sans) rather than similar fonts',
        'Consider the cultural associations of your typeface choices',
      ],
      accessibility: 'Minimum 16px body text. Line height 1.5-1.7. Max line length ~70 characters. Test with dyslexia simulation tools.',
    },
  },
  {
    id: 'rounded-cards',
    name: 'Card Styling',
    category: 'components',
    impact: 'medium',
    slop: {
      description: 'rounded-xl shadow-lg border-0 on every card. The default "friendly" look that has become the visual equivalent of muzak.',
      code: `<div className="rounded-xl shadow-lg bg-white p-6 
  hover:shadow-xl transition-shadow">
  <h3 className="text-lg font-semibold">Feature</h3>
  <p className="text-gray-600 mt-2">Description text</p>
</div>`,
      why: 'Tailwind\'s default rounded values (rounded-xl, rounded-2xl) and shadow utilities are designed as starting points, not final answers. Using them unchanged produces identical results across sites.',
    },
    antiSlop: {
      description: 'Sharp corners with visible borders communicate structure and intention. The border IS the design element, not a subtle shadow.',
      code: `/* Sharp + thick border */
<div className="border-2 border-ink bg-paper p-6
  hover:translate-x-[-3px] hover:translate-y-[-3px]
  hover:shadow-[3px_3px_0_#0d0c0b] 
  transition-all duration-150">
  <h3 className="font-semibold">Feature</h3>
  <p className="text-ink-60 mt-2">Description text</p>
</div>

/* Or minimal dark */
<div className="bg-[#141414] border border-white/10 p-6
  hover:border-white/20 transition-colors">
  <h3 className="text-white">Feature</h3>
</div>`,
      why: 'The "hard shadow" hover effect draws from neo-brutalist design traditions. It feels intentional because it IS intentional—you had to write that specific shadow value.',
      principles: [
        'Border-radius: 0 is a valid design choice (neo-brutalist)',
        'If using rounded corners, be specific (8px, not "xl")',
        'Thick borders (2-3px) feel more intentional than hairlines',
        'Replace shadows with offset shadows for distinctiveness',
      ],
    },
  },
  {
    id: 'centered-hero',
    name: 'Hero Layout',
    category: 'layout',
    impact: 'high',
    slop: {
      description: 'Everything centered with a single column. Text → Subtext → CTA Button. The "safe" layout that tells users nothing memorable.',
      code: `<section className="text-center py-20 px-6">
  <h1 className="text-5xl font-bold">
    Transform Your Business
  </h1>
  <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
    AI-powered solutions for modern teams
  </p>
  <button className="mt-8 px-8 py-3 bg-blue-600 
    text-white rounded-lg">
    Get Started Free
  </button>
</section>`,
      why: 'Center-aligned layouts are visually "safe" because they have inherent balance. But safety ≠ memorability. The symmetric structure reduces visual tension to zero.',
    },
    antiSlop: {
      description: 'Asymmetric layouts create visual tension and guide the eye. Left-aligned text with a right visual creates natural reading flow.',
      code: `<section className="grid lg:grid-cols-[1.2fr,1fr] 
  gap-12 py-20 px-10 items-start">
  
  <div className="text-left">
    <p className="text-sm uppercase tracking-wider 
      text-vermilion mb-4">Issue Tracking</p>
    <h1 className="text-6xl font-display leading-tight">
      Linear is a better way<br/>
      <span className="text-ink-60">to build products</span>
    </h1>
    <p className="mt-6 text-lg text-ink-60 max-w-lg">
      Meet the system designed for modern software teams.
    </p>
    <div className="mt-8 flex gap-4">
      <button className="btn-hard">Start building</button>
      <button className="btn-ghost">Watch demo</button>
    </div>
  </div>
  
  <div className="relative">
    <img src="/product.png" className="border-2 border-ink" />
  </div>
</section>`,
      why: 'The 1.2fr:1fr grid ratio creates deliberate imbalance. The eye naturally moves from left (text) to right (visual). Two CTAs (primary + secondary) give users choice without overwhelm.',
      principles: [
        'Use grid ratios like 1.2fr:1fr or 1.4fr:1fr for subtle asymmetry',
        'Left-align text for natural reading flow',
        'Include a product visual—show, don\'t just tell',
        'Offer a secondary CTA (video, demo) for different buying stages',
      ],
    },
  },
  {
    id: 'generic-copy',
    name: 'Copywriting',
    category: 'copy',
    impact: 'high',
    slop: {
      description: 'Generic marketing speak that could apply to any product. "Transform," "Supercharge," "Revolutionize"—words that mean nothing.',
      code: `❌ "Transform your workflow"
❌ "AI-powered solutions"  
❌ "Supercharge your productivity"
❌ "Revolutionize the way you work"
❌ "Trusted by 10,000+ happy customers"
❌ "Get Started Free"`,
      why: 'These phrases are optimized for not being wrong. They\'re so generic they can\'t possibly mislead—but they also can\'t possibly convince. Specificity is persuasion.',
    },
    antiSlop: {
      description: 'Specific, concrete language that tells users exactly what your product does. If competitors could use your copy, rewrite it.',
      code: `✓ "Issue tracking for teams who ship fast"
✓ "See your database in real-time, not 5 minutes ago"
✓ "Documentation that writes itself from your codebase"
✓ "Video editing without the timeline scrubbing"
✓ "Used by 847 YC companies since 2019"
✓ "Start with 14 days free, no card needed"`,
      why: 'Specific claims are falsifiable—and therefore credible. "Issue tracking for teams who ship fast" excludes slow teams. That exclusion makes it feel true.',
      principles: [
        'Replace adjectives with specifics: "fast" → "sub-100ms"',
        'Name your user: "for teams" → "for seed-stage startups"',
        'Quantify claims: "many customers" → "847 companies"',
        'Make claims falsifiable: if it could be false, it feels true',
      ],
    },
  },
  {
    id: 'hover-states',
    name: 'Interaction Design',
    category: 'effects',
    impact: 'medium',
    slop: {
      description: 'Hover states that only change one property. Color shift alone feels like a minimum viable interaction.',
      code: `<button className="bg-blue-600 hover:bg-blue-700 
  text-white px-4 py-2">
  Click me
</button>

/* The entire hover state is: 
   background color 600 → 700 */`,
      why: 'Single-property hover states feel like an afterthought because they are. The browser needs feedback; you provided the minimum. Users notice this.',
    },
    antiSlop: {
      description: 'Multi-property transitions create physicality. Elements should feel like they exist in space—lifting, pressing, shifting.',
      code: `/* Lift effect with shadow */
<button className="bg-ink text-paper px-6 py-3
  hover:translate-y-[-2px] hover:shadow-lg
  active:translate-y-0 active:shadow-none
  transition-all duration-150">
  Click me
</button>

/* Card with offset shadow */
<div className="border-2 border-ink 
  hover:translate-x-[-3px] hover:translate-y-[-3px]
  hover:shadow-[3px_3px_0_currentColor]
  transition-all duration-150">
  Card content
</div>`,
      why: 'Physical metaphors (lift, press, offset) tap into muscle memory from real-world objects. Users intuitively understand that things that lift up are clickable.',
      principles: [
        'Combine transform + shadow for lift effects',
        'Use active: states for press feedback',
        'Keep durations short (100-200ms) for responsiveness',
        'Match the interaction to the element\'s importance',
      ],
      accessibility: 'Ensure hover states are also available via :focus-visible for keyboard users. Never rely on hover alone for essential information.',
    },
  },
];

const categories = [
  { id: 'all', name: 'All Patterns', icon: '○' },
  { id: 'colors', name: 'Colors', icon: '◐' },
  { id: 'typography', name: 'Typography', icon: 'Aa' },
  { id: 'layout', name: 'Layout', icon: '⊞' },
  { id: 'components', name: 'Components', icon: '□' },
  { id: 'effects', name: 'Effects', icon: '◇' },
  { id: 'copy', name: 'Copywriting', icon: '¶' },
];

export default function PatternsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedPattern, setExpandedPattern] = useState<string | null>(null);

  const filteredPatterns = selectedCategory === 'all' 
    ? patterns 
    : patterns.filter(p => p.category === selectedCategory);

  return (
    <>
      {/* Hero */}
      <section className="border-b-2 border-ink">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-16 lg:py-20">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-vermilion mb-4">
              Pattern Library
            </p>
            <h1 className="font-display text-4xl lg:text-5xl mb-6">
              Learn to recognize slop—<br/>
              then learn to <span className="italic">avoid</span> it.
            </h1>
            <p className="text-lg text-ink-60 leading-relaxed">
              Each pattern below shows a common AI-generated design choice alongside 
              a distinctive alternative. More importantly, we explain <strong className="text-ink">why</strong> the 
              alternatives work—so you can apply the principles, not just copy the code.
            </p>
          </div>
        </div>
      </section>
      
      {/* Category filter */}
      <section className="border-b-2 border-border sticky top-16 z-30 bg-paper">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
          <div className="flex gap-1 overflow-x-auto py-4 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold uppercase tracking-wider whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-ink text-paper'
                    : 'text-ink-60 hover:text-ink hover:bg-paper-warm'
                }`}
              >
                <span className="font-mono text-xs">{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>
      
      {/* Patterns */}
      <section className="max-w-[1600px] mx-auto px-6 lg:px-10 py-12">
        <div className="space-y-8">
          {filteredPatterns.map((pattern, index) => (
            <article 
              key={pattern.id} 
              className="anti-card overflow-hidden"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Pattern header */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 px-6 py-5 border-b-2 border-ink bg-paper-warm">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs text-ink-40 uppercase">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h2 className="font-display text-xl lg:text-2xl">{pattern.name}</h2>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="tag tag-primary text-[10px]">{pattern.category}</span>
                      <span className={`tag text-[10px] ${
                        pattern.impact === 'high' ? 'tag-accent' : 
                        pattern.impact === 'medium' ? 'tag-teal' : 'tag-primary'
                      }`}>
                        {pattern.impact} impact
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setExpandedPattern(
                    expandedPattern === pattern.id ? null : pattern.id
                  )}
                  className="btn-ghost text-sm py-2"
                >
                  {expandedPattern === pattern.id ? 'Collapse' : 'Expand details'}
                </button>
              </div>
              
              {/* Pattern content - Side by side */}
              <div className="grid lg:grid-cols-2">
                {/* Slop side */}
                <div className="p-6 lg:p-8 border-b-2 lg:border-b-0 lg:border-r-2 border-ink bg-[#fdf6f5]">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-8 h-8 flex items-center justify-center bg-vermilion text-paper font-bold text-sm">✕</span>
                    <h3 className="font-semibold uppercase tracking-wider text-sm text-vermilion">
                      The Slop
                    </h3>
                  </div>
                  <p className="text-ink-60 mb-6 leading-relaxed">
                    {pattern.slop.description}
                  </p>
                  <div className="code-block p-4">
                    <pre className="whitespace-pre-wrap">{pattern.slop.code}</pre>
                  </div>
                  
                  {/* Why it's slop */}
                  {expandedPattern === pattern.id && (
                    <div className="mt-6 pt-6 border-t border-vermilion/30">
                      <h4 className="font-semibold text-sm uppercase tracking-wider text-ink-60 mb-3">
                        Why this is slop
                      </h4>
                      <p className="text-ink-60 text-sm leading-relaxed">
                        {pattern.slop.why}
                      </p>
                    </div>
                  )}
                </div>
                
                {/* Anti-slop side */}
                <div className="p-6 lg:p-8 bg-[#f5faf9]">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-8 h-8 flex items-center justify-center bg-teal text-paper font-bold text-sm">✓</span>
                    <h3 className="font-semibold uppercase tracking-wider text-sm text-teal-dark">
                      The Alternative
                    </h3>
                  </div>
                  <p className="text-ink-60 mb-6 leading-relaxed">
                    {pattern.antiSlop.description}
                  </p>
                  <div className="code-block p-4">
                    <pre className="whitespace-pre-wrap">{pattern.antiSlop.code}</pre>
                  </div>
                  
                  {/* Why it works */}
                  {expandedPattern === pattern.id && (
                    <>
                      <div className="mt-6 pt-6 border-t border-teal/30">
                        <h4 className="font-semibold text-sm uppercase tracking-wider text-ink-60 mb-3">
                          Why this works
                        </h4>
                        <p className="text-ink-60 text-sm leading-relaxed mb-4">
                          {pattern.antiSlop.why}
                        </p>
                        
                        <h4 className="font-semibold text-sm uppercase tracking-wider text-ink-60 mb-3 mt-6">
                          Principles to apply
                        </h4>
                        <ul className="space-y-2">
                          {pattern.antiSlop.principles.map((principle, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-ink-60">
                              <span className="w-5 h-5 flex-shrink-0 flex items-center justify-center bg-teal/20 text-teal-dark font-mono text-xs">
                                {i + 1}
                              </span>
                              {principle}
                            </li>
                          ))}
                        </ul>
                        
                        {pattern.antiSlop.accessibility && (
                          <div className="mt-6 p-4 bg-paper border-l-4 border-ink">
                            <h4 className="font-semibold text-sm uppercase tracking-wider text-ink-60 mb-2 flex items-center gap-2">
                              <span aria-hidden="true">♿</span> Accessibility note
                            </h4>
                            <p className="text-sm text-ink-60">
                              {pattern.antiSlop.accessibility}
                            </p>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="dark-section border-t-2 border-ink">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-16">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl mb-4">
              Ready to apply these patterns?
            </h2>
            <p className="text-paper/70 mb-8">
              Use our Prompt Lab to generate AI instructions that bake in these 
              anti-slop principles from the start.
            </p>
            <a href="/prompts" className="btn-hard bg-vermilion border-vermilion inline-block">
              Open Prompt Lab →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
