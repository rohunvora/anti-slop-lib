'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

// ============================================================================
// SIGNAL DATA (matching the analyzer)
// ============================================================================

type Salience = 'high' | 'medium' | 'low';
type Category = 'typography' | 'color' | 'layout' | 'components' | 'imagery' | 'copy' | 'effects';

interface QuickFix {
  effort: 'low' | 'medium' | 'high';
  change: string;
  patch?: string;
  tradeoffs?: string;
}

interface Signal {
  id: string;
  label: string;
  category: Category;
  salience: Salience;
  whyItReadsGeneric: string;
  perception: string;
  prevalence?: string;
  quickFixes: QuickFix[];
  references?: Array<{ title: string; url: string; note: string }>;
}

const SIGNALS: Signal[] = [
  // HIGH SALIENCE
  {
    id: 'purple-gradient',
    label: 'Purple/Violet Gradient',
    category: 'color',
    salience: 'high',
    whyItReadsGeneric: 'Purple-to-pink gradients are the default output of most AI design tools and appear in the majority of template landing pages.',
    perception: 'Viewers immediately pattern-match to "AI-generated" or "template site"',
    prevalence: 'Present in ~60% of v0/Vercel template outputs',
    quickFixes: [
      { effort: 'low', change: 'Replace gradient with solid brand color', patch: '// Before: bg-gradient-to-r from-purple-500 to-pink-500\n// After:  bg-[#your-brand-color]', tradeoffs: 'Less "modern" feel, but more distinctive' },
      { effort: 'medium', change: 'Use warm tones instead (terracotta, gold, forest green)', patch: '// Try: bg-amber-600, bg-emerald-700, bg-rose-600', tradeoffs: 'Requires rethinking accent colors across site' },
      { effort: 'low', change: 'Go monochrome (black/white/gray only)', patch: '// Before: bg-gradient-to-r from-purple-500 to-pink-500\n// After:  bg-foreground text-background' },
    ],
    references: [
      { title: 'Stripe', url: 'https://stripe.com', note: 'Uses purple but with restraint and custom gradients' },
      { title: 'Linear', url: 'https://linear.app', note: 'Dark theme without purple gradients' },
    ],
  },
  {
    id: 'blob-backgrounds',
    label: '3D Blob/Orb Decorations',
    category: 'imagery',
    salience: 'high',
    whyItReadsGeneric: 'Floating blurred gradient shapes became the go-to "hero decoration" in 2022-2023 AI outputs. They\'re semantically meaningless.',
    perception: 'Immediately signals "this was generated, not designed"',
    prevalence: 'Present in ~45% of AI-generated landing pages',
    quickFixes: [
      { effort: 'low', change: 'Remove entirely — empty space is fine', patch: '// Delete the blob div entirely\n// Hero sections don\'t need decorative elements' },
      { effort: 'medium', change: 'Replace with actual product screenshot or illustration', tradeoffs: 'Requires having real visual assets' },
      { effort: 'low', change: 'Use subtle grid/dot pattern instead', patch: '// Replace blur-3xl blob with:\n// <div className="absolute inset-0 bg-[url(/grid.svg)] opacity-2" />' },
    ],
  },
  {
    id: 'centered-hero-generic-cta',
    label: 'Centered Hero + Generic CTA',
    category: 'layout',
    salience: 'high',
    whyItReadsGeneric: 'The centered headline → subtext → "Get Started" button stack is the #1 most common template layout.',
    perception: 'Reads as "SaaS template" regardless of actual content',
    prevalence: 'Default layout in Tailwind UI, shadcn, and most AI outputs',
    quickFixes: [
      { effort: 'medium', change: 'Switch to asymmetric split layout', patch: '// Before: <section className="text-center mx-auto">\n// After:  <section className="grid md:grid-cols-[1fr_1.2fr] gap-12 items-center">', tradeoffs: 'Requires restructuring hero content' },
      { effort: 'low', change: 'Left-align text, keep centered container', patch: '// Change: text-center → text-left\n// Keep: mx-auto max-w-4xl' },
      { effort: 'low', change: 'Make CTA specific to your product', patch: '// Before: "Get Started Free"\n// After:  "Create your first [thing]" or "See it in action"' },
    ],
    references: [
      { title: 'Vercel', url: 'https://vercel.com', note: 'Left-aligned hero with product demo' },
      { title: 'Raycast', url: 'https://raycast.com', note: 'Asymmetric layout with video' },
    ],
  },

  // MEDIUM SALIENCE
  {
    id: 'inter-only-typography',
    label: 'Inter-Only Typography',
    category: 'typography',
    salience: 'medium',
    whyItReadsGeneric: 'Inter is the default font in Tailwind, Next.js, and most UI frameworks. Using it alone signals "I didn\'t make a typography choice."',
    perception: 'Reads as "default stack" rather than "designed"',
    prevalence: 'Default in Tailwind CSS, Next.js, shadcn/ui',
    quickFixes: [
      { effort: 'low', change: 'Pair with a serif for headlines', patch: '// Add to globals.css:\n@import url("https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;700&display=swap");\n\n// Use: font-serif for h1-h3, keep Inter for body', tradeoffs: 'Adds ~20kb font load' },
      { effort: 'low', change: 'Switch to less common grotesque (IBM Plex Sans, Geist)', patch: '// Replace Inter import with:\n@import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&display=swap");' },
      { effort: 'medium', change: 'Use system font stack intentionally', patch: 'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;\n// This reads as "intentionally native" vs "forgot to set font"' },
    ],
  },
  {
    id: 'rounded-xl-everything',
    label: 'Rounded-XL on Everything',
    category: 'components',
    salience: 'medium',
    whyItReadsGeneric: 'rounded-xl/2xl on every card and button is the shadcn/ui default. It\'s pleasant but instantly recognizable.',
    perception: 'Signals "shadcn template" or "Tailwind UI starter"',
    prevalence: 'Default in shadcn/ui, Tailwind UI components',
    quickFixes: [
      { effort: 'low', change: 'Go sharp (rounded-none or rounded-sm)', patch: '// Before: rounded-xl\n// After:  rounded-sm (or rounded-none for editorial feel)', tradeoffs: 'Less "friendly" appearance' },
      { effort: 'low', change: 'Pick ONE radius and use consistently', patch: '// Define in tailwind.config:\nborderRadius: { DEFAULT: "4px" }\n// Then use: rounded (not rounded-xl, rounded-2xl, etc)' },
      { effort: 'medium', change: 'Mix sharp containers with rounded interactive elements', patch: '// Cards: rounded-none border\n// Buttons: rounded-full\n// Creates intentional contrast' },
    ],
  },
  {
    id: 'shadow-cards',
    label: 'Shadow-Elevated Cards',
    category: 'components',
    salience: 'medium',
    whyItReadsGeneric: 'shadow-sm/md/lg on cards is the default "depth" approach in every UI kit.',
    perception: 'Reads as "Material Design era" or "generic dashboard"',
    quickFixes: [
      { effort: 'low', change: 'Replace shadows with borders', patch: '// Before: shadow-md rounded-xl\n// After:  border border-border rounded-sm' },
      { effort: 'low', change: 'Use background color differentiation instead', patch: '// Before: bg-white shadow-md\n// After:  bg-muted (slightly darker than page bg)' },
      { effort: 'medium', change: 'Use hard/offset shadows for character', patch: '// Before: shadow-lg\n// After:  shadow-[4px_4px_0_0_#000] (hard shadow)' },
    ],
  },
  {
    id: 'glassmorphism',
    label: 'Glassmorphism Effects',
    category: 'effects',
    salience: 'medium',
    whyItReadsGeneric: 'backdrop-blur + transparency was peak 2021 and is now a dated template marker.',
    perception: 'Reads as "2021 Dribbble shot" or "iOS clone attempt"',
    quickFixes: [
      { effort: 'low', change: 'Use solid backgrounds', patch: '// Before: backdrop-blur-md bg-white/10\n// After:  bg-background border border-border' },
      { effort: 'low', change: 'If you need transparency, skip the blur', patch: '// Before: backdrop-blur-md bg-black/50\n// After:  bg-black/80 (higher opacity, no blur)' },
    ],
  },
  {
    id: 'generic-headline-copy',
    label: 'Generic Headline Copy',
    category: 'copy',
    salience: 'medium',
    whyItReadsGeneric: 'Phrases like "Transform your X" or "AI-Powered Y" are the default outputs of every AI writing tool.',
    perception: 'Reads as "placeholder copy" or "ChatGPT wrote this"',
    quickFixes: [
      { effort: 'medium', change: 'Be specific about what your product does', patch: '// Before: "Transform your workflow"\n// After:  "Ship features 3x faster" or "Track sprint velocity in real-time"' },
      { effort: 'low', change: 'Lead with the outcome, not the mechanism', patch: '// Before: "AI-Powered Analytics"\n// After:  "Know which features your users actually want"' },
      { effort: 'medium', change: 'Use your brand voice, even if it\'s weird', patch: '// Before: "Get Started Free"\n// After:  "Let\'s build something" or "Jump in" or "Start breaking things"' },
    ],
  },

  // LOW SALIENCE
  {
    id: 'dark-slate-background',
    label: 'Standard Dark Slate Background',
    category: 'color',
    salience: 'low',
    whyItReadsGeneric: 'The #0f0f0f / slate-950 dark mode is fine but extremely common. Not bad alone, but compounds with other signals.',
    perception: 'Neutral — only problematic when combined with other template signals',
    quickFixes: [
      { effort: 'low', change: 'Go true black for more contrast', patch: '// Before: bg-slate-950\n// After:  bg-black' },
      { effort: 'low', change: 'Add subtle warmth or coolness', patch: '// Before: bg-[#0f0f0f]\n// After:  bg-[#0f0f12] (slight blue) or bg-[#12100f] (slight warm)' },
      { effort: 'medium', change: 'Consider light mode as default instead', tradeoffs: 'Dark mode is expected in dev tools / technical products' },
    ],
  },
  {
    id: 'glow-effects',
    label: 'Colored Glow Effects',
    category: 'effects',
    salience: 'low',
    whyItReadsGeneric: 'Purple/blue glows were a 2022-2023 trend that\'s now associated with template sites.',
    perception: 'Reads as "trying too hard to look modern"',
    quickFixes: [
      { effort: 'low', change: 'Remove glows entirely', patch: '// Before: shadow-[0_0_30px_rgba(139,92,246,0.3)]\n// After:  (remove)' },
      { effort: 'low', change: 'Use neutral/white glow if glow is needed', patch: '// Before: shadow-purple-500/30\n// After:  shadow-white/10' },
    ],
  },
  {
    id: 'space-grotesk',
    label: 'Space Grotesk Typography',
    category: 'typography',
    salience: 'low',
    whyItReadsGeneric: 'Space Grotesk became the "I\'m not using Inter" choice, making it equally clichéd.',
    perception: 'Reads as "trying to be different but not really"',
    quickFixes: [
      { effort: 'low', change: 'Try a less common grotesque', patch: '// Alternatives: General Sans, Switzer, Satoshi (from Fontshare)\n// Or: IBM Plex Sans, Geist (from Google/Vercel)' },
      { effort: 'medium', change: 'Pair with a contrasting serif', patch: '// Headlines: Fraunces, Newsreader, or Libre Baskerville\n// Body: Keep a clean sans' },
    ],
  },
];

const CATEGORIES: Category[] = ['color', 'typography', 'layout', 'components', 'imagery', 'copy', 'effects'];

// ============================================================================
// COMPONENTS
// ============================================================================

function SalienceBadge({ salience }: { salience: Salience }) {
  const colors = {
    high: 'bg-vermilion text-paper',
    medium: 'border-2 border-ink text-ink',
    low: 'border-2 border-ink-40 text-ink-40',
  };
  return (
    <span className={`inline-block px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider ${colors[salience]}`}>
      {salience}
    </span>
  );
}

function CategoryBadge({ category }: { category: Category }) {
  return (
    <span className="inline-block px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider bg-ink/10 text-ink-60">
      {category}
    </span>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <button
      onClick={handleCopy}
      className="text-xs font-mono px-2 py-1 border-2 border-ink hover:bg-ink hover:text-paper transition-colors"
    >
      {copied ? '✓' : 'Copy'}
    </button>
  );
}

function SignalCard({ signal }: { signal: Signal }) {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <div className="border-3 border-ink bg-paper-bright" id={signal.id}>
      <div className="p-5">
        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
          <div className="flex flex-wrap items-center gap-2">
            <SalienceBadge salience={signal.salience} />
            <CategoryBadge category={signal.category} />
          </div>
          <code className="text-xs font-mono text-ink-40">{signal.id}</code>
        </div>
        
        <h2 className="font-display text-xl mb-2">{signal.label}</h2>
        <p className="text-ink-60 mb-3">{signal.whyItReadsGeneric}</p>
        
        <div className="flex flex-wrap gap-4 text-sm mb-4">
          <div className="flex-1 min-w-[200px]">
            <p className="font-mono text-xs text-ink-40 mb-1">PERCEPTION</p>
            <p className="text-ink-60 italic">"{signal.perception}"</p>
          </div>
          {signal.prevalence && (
            <div className="flex-1 min-w-[200px]">
              <p className="font-mono text-xs text-ink-40 mb-1">PREVALENCE</p>
              <p className="text-ink-60">{signal.prevalence}</p>
            </div>
          )}
        </div>
        
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-sm font-semibold text-vermilion hover:underline"
        >
          {expanded ? '− Hide fixes' : `+ Show ${signal.quickFixes.length} fixes`}
        </button>
      </div>
      
      {expanded && (
        <div className="border-t-3 border-ink">
          {signal.quickFixes.map((fix, i) => (
            <div key={i} className={`p-5 ${i > 0 ? 'border-t-3 border-ink' : ''}`}>
              <div className="flex items-start justify-between gap-4 mb-2">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-mono px-2 py-0.5 ${
                    fix.effort === 'low' ? 'bg-teal text-paper' :
                    fix.effort === 'medium' ? 'bg-ink text-paper' :
                    'bg-vermilion text-paper'
                  }`}>
                    {fix.effort.toUpperCase()} EFFORT
                  </span>
                </div>
                {fix.patch && <CopyButton text={fix.patch} />}
              </div>
              <p className="font-semibold mb-2">{fix.change}</p>
              {fix.patch && (
                <pre className="text-xs font-mono bg-ink text-paper p-3 overflow-x-auto whitespace-pre-wrap">
                  {fix.patch}
                </pre>
              )}
              {fix.tradeoffs && (
                <p className="text-xs text-ink-40 mt-2 italic">⚠️ {fix.tradeoffs}</p>
              )}
            </div>
          ))}
          
          {signal.references && signal.references.length > 0 && (
            <div className="p-5 border-t-3 border-ink bg-paper">
              <p className="font-mono text-xs text-ink-40 mb-2">REFERENCES</p>
              <div className="flex flex-wrap gap-3">
                {signal.references.map((ref, i) => (
                  <a
                    key={i}
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm border-2 border-ink px-3 py-2 hover:bg-ink hover:text-paper transition-colors"
                  >
                    <span className="font-semibold">{ref.title}</span>
                    <span className="text-ink-60 ml-2">— {ref.note}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// PAGE
// ============================================================================

export default function SignalsPage() {
  const [filterSalience, setFilterSalience] = useState<Salience | 'all'>('all');
  const [filterCategory, setFilterCategory] = useState<Category | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredSignals = useMemo(() => {
    return SIGNALS.filter(signal => {
      if (filterSalience !== 'all' && signal.salience !== filterSalience) return false;
      if (filterCategory !== 'all' && signal.category !== filterCategory) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          signal.label.toLowerCase().includes(q) ||
          signal.id.toLowerCase().includes(q) ||
          signal.whyItReadsGeneric.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [filterSalience, filterCategory, searchQuery]);
  
  const signalsByCategory = useMemo(() => {
    const grouped: Record<string, Signal[]> = {};
    for (const signal of filteredSignals) {
      if (!grouped[signal.salience]) grouped[signal.salience] = [];
      grouped[signal.salience].push(signal);
    }
    return grouped;
  }, [filteredSignals]);

  return (
    <>
      {/* Header */}
      <section className="border-b-3 border-ink">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-10">
          <h1 className="font-display text-3xl lg:text-4xl mb-4">
            Template Signal Index
          </h1>
          <p className="text-ink-60 max-w-2xl mb-6">
            {SIGNALS.length} detectable signals that correlate with template/AI-looking sites. 
            Each includes why it reads generic, perception impact, and specific patches.
          </p>
          
          {/* Disclaimer */}
          <div className="border-l-3 border-vermilion pl-4 text-sm text-ink-60">
            <strong className="text-ink">These are perception triggers, not design crimes.</strong> Context matters. 
            A purple gradient isn't wrong — it just reads as "template" to many viewers.
          </div>
        </div>
      </section>
      
      {/* Filters */}
      <section className="border-b-3 border-ink bg-paper-bright sticky top-14 z-30">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 max-w-md">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search signals..."
                className="w-full"
                aria-label="Search signals"
              />
            </div>
            
            {/* Salience filter */}
            <div className="flex gap-2">
              <span className="text-sm text-ink-60 py-2">Salience:</span>
              {(['all', 'high', 'medium', 'low'] as const).map(s => (
                <button
                  key={s}
                  onClick={() => setFilterSalience(s)}
                  className={`px-3 py-1 text-sm border-2 transition-colors ${
                    filterSalience === s
                      ? 'bg-ink text-paper border-ink'
                      : 'border-ink-40 text-ink-60 hover:border-ink'
                  }`}
                >
                  {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
            
            {/* Category filter */}
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-ink-60 py-2">Category:</span>
              <button
                onClick={() => setFilterCategory('all')}
                className={`px-3 py-1 text-sm border-2 transition-colors ${
                  filterCategory === 'all'
                    ? 'bg-ink text-paper border-ink'
                    : 'border-ink-40 text-ink-60 hover:border-ink'
                }`}
              >
                All
              </button>
              {CATEGORIES.map(c => (
                <button
                  key={c}
                  onClick={() => setFilterCategory(c)}
                  className={`px-3 py-1 text-sm border-2 transition-colors ${
                    filterCategory === c
                      ? 'bg-ink text-paper border-ink'
                      : 'border-ink-40 text-ink-60 hover:border-ink'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Signal list */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-8 py-8">
        <p className="text-sm text-ink-60 mb-6">
          Showing {filteredSignals.length} of {SIGNALS.length} signals
        </p>
        
        {/* Group by salience */}
        {(['high', 'medium', 'low'] as const).map(salience => {
          const signals = signalsByCategory[salience];
          if (!signals || signals.length === 0) return null;
          
          return (
            <div key={salience} className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <SalienceBadge salience={salience} />
                <span className="font-mono text-sm text-ink-40">
                  {signals.length} signal{signals.length !== 1 ? 's' : ''}
                </span>
              </div>
              <div className="space-y-4">
                {signals.map(signal => (
                  <SignalCard key={signal.id} signal={signal} />
                ))}
              </div>
            </div>
          );
        })}
        
        {filteredSignals.length === 0 && (
          <div className="border-3 border-dashed border-ink-40 p-12 text-center">
            <p className="text-ink-60 mb-4">No signals match your filters</p>
            <button
              onClick={() => {
                setFilterSalience('all');
                setFilterCategory('all');
                setSearchQuery('');
              }}
              className="btn btn-outline btn-small"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>
      
      {/* Methodology */}
      <section className="border-t-3 border-ink bg-paper-bright">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-8">
          <h2 className="font-display text-xl mb-4">Methodology</h2>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-ink-60">
            <div>
              <p className="font-semibold text-ink mb-2">What we analyze</p>
              <ul className="space-y-1">
                <li>• DOM structure and HTML patterns</li>
                <li>• CSS properties and values</li>
                <li>• Tailwind class combinations</li>
                <li>• Copy/headline patterns</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-ink mb-2">What we don't do</p>
              <ul className="space-y-1">
                <li>• Claim to detect "AI-generated" content definitively</li>
                <li>• Judge design quality — only template correlation</li>
                <li>• Store or transmit your code</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t-3 border-ink">
            <p className="text-sm text-ink-60">
              <strong className="text-ink">Salience ranking</strong> is based on how strongly a pattern triggers 
              "template site" perception. High-salience signals (like purple gradients) are extremely common in 
              AI/template outputs and immediately recognizable. Low-salience signals only compound existing issues.
            </p>
          </div>
        </div>
      </section>
      
      {/* Back to home CTA */}
      <section className="dark-section">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-paper">
              Ready to check your code? <Link href="/" className="text-vermilion-light hover:underline">Run the analyzer →</Link>
            </p>
            <Link href="/#install" className="px-4 py-2 border-3 border-paper/30 text-paper hover:border-paper transition-colors text-sm font-semibold">
              Install in Cursor →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

