'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { websites, allStyles } from './data/websites';
import Link from 'next/link';
import Image from 'next/image';

// NOT a template: This page leads with education, not a hero CTA
// Structure: Problem statement → Interactive diagnosis → Tool links → Curated analysis

function ContrastChecker() {
  const [fg, setFg] = useState('#0d0c0b');
  const [bg, setBg] = useState('#f5f2eb');
  
  // Calculate relative luminance
  const getLuminance = (hex: string) => {
    const rgb = hex.match(/[A-Za-z0-9]{2}/g)?.map(v => parseInt(v, 16) / 255) || [0, 0, 0];
    const [r, g, b] = rgb.map(v => v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  
  const l1 = getLuminance(fg);
  const l2 = getLuminance(bg);
  const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  const passesAA = ratio >= 4.5;
  const passesAAA = ratio >= 7;
  
  return (
    <div className="border-3 border-ink p-6 bg-paper-bright">
      <h3 className="font-display text-xl mb-4">Contrast Checker</h3>
      <p className="text-ink-60 text-sm mb-6">
        WCAG requires 4.5:1 for normal text, 3:1 for large text. Test your colors here.
      </p>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-ink-60 mb-2">
            Text Color
          </label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={fg}
              onChange={(e) => setFg(e.target.value)}
              className="w-12 h-12"
            />
            <input
              type="text"
              value={fg}
              onChange={(e) => setFg(e.target.value)}
              className="flex-1 font-mono text-sm px-3 py-2"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-ink-60 mb-2">
            Background
          </label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={bg}
              onChange={(e) => setBg(e.target.value)}
            />
            <input
              type="text"
              value={bg}
              onChange={(e) => setBg(e.target.value)}
              className="flex-1 font-mono text-sm px-3 py-2"
            />
          </div>
        </div>
      </div>
      
      {/* Preview */}
      <div 
        className="p-6 mb-4 border-3 border-ink"
        style={{ backgroundColor: bg, color: fg }}
      >
        <p className="text-lg font-semibold">Sample Text Preview</p>
        <p className="text-sm mt-1">This is what your text will look like.</p>
      </div>
      
      {/* Results */}
      <div className={`p-4 border-3 ${passesAA ? 'contrast-pass' : 'contrast-fail'}`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-mono text-2xl font-bold">{ratio.toFixed(2)}:1</p>
            <p className="text-sm text-ink-60 mt-1">Contrast ratio</p>
          </div>
          <div className="text-right">
            <p className={`font-semibold ${passesAA ? 'text-teal' : 'text-vermilion'}`}>
              {passesAA ? '✓ Passes' : '✕ Fails'} WCAG AA
            </p>
            <p className={`text-sm ${passesAAA ? 'text-teal' : 'text-ink-40'}`}>
              {passesAAA ? '✓ Passes' : '○ Does not pass'} AAA
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SlopDiagnosis() {
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  
  const questions = [
    { id: 'gradient', text: 'Does it use a purple-to-blue gradient?' },
    { id: 'rounded', text: 'Are corners rounded-xl or larger?' },
    { id: 'shadow', text: 'Does it rely on shadow-lg for depth?' },
    { id: 'inter', text: 'Is Inter the only typeface?' },
    { id: 'centered', text: 'Is the hero section center-aligned?' },
    { id: 'generic', text: 'Does the copy mention "transforming" or "supercharging"?' },
  ];
  
  const slopScore = Object.values(answers).filter(Boolean).length;
  const totalAnswered = Object.keys(answers).length;
  
  return (
    <div className="border-3 border-ink p-6 bg-paper-bright">
      <h3 className="font-display text-xl mb-4">Slop Diagnosis</h3>
      <p className="text-ink-60 text-sm mb-6">
        Answer these questions about your design. Each "yes" is a warning sign.
      </p>
      
      <div className="space-y-3 mb-6">
        {questions.map(q => (
          <div key={q.id} className="flex items-center gap-4">
            <div className="flex gap-2">
              <button
                onClick={() => setAnswers(a => ({ ...a, [q.id]: true }))}
                className={`px-3 py-1 text-sm font-semibold border-2 ${
                  answers[q.id] === true 
                    ? 'bg-vermilion border-vermilion text-paper' 
                    : 'border-ink hover:bg-ink hover:text-paper'
                }`}
              >
                Yes
              </button>
              <button
                onClick={() => setAnswers(a => ({ ...a, [q.id]: false }))}
                className={`px-3 py-1 text-sm font-semibold border-2 ${
                  answers[q.id] === false 
                    ? 'bg-teal border-teal text-paper' 
                    : 'border-ink hover:bg-ink hover:text-paper'
                }`}
              >
                No
              </button>
            </div>
            <span className="text-sm">{q.text}</span>
          </div>
        ))}
      </div>
      
      {totalAnswered > 0 && (
        <div className={`p-4 border-3 ${slopScore >= 3 ? 'contrast-fail' : slopScore >= 1 ? 'border-ink' : 'contrast-pass'}`}>
          <p className="font-mono text-2xl font-bold">{slopScore}/{questions.length}</p>
          <p className="text-sm text-ink-60 mt-1">
            {slopScore === 0 && 'Looking good! Your design avoids common slop patterns.'}
            {slopScore >= 1 && slopScore < 3 && 'Some warning signs. Review the patterns below.'}
            {slopScore >= 3 && 'High slop alert. Your design may look AI-generated.'}
          </p>
        </div>
      )}
    </div>
  );
}

function HomeContent() {
  const searchParams = useSearchParams();
  const initialStyle = searchParams.get('style');
  const [selectedStyle, setSelectedStyle] = useState<string | null>(initialStyle);
  
  const filteredSites = useMemo(() => {
    if (!selectedStyle) return websites.slice(0, 6);
    return websites.filter(w => w.styles.includes(selectedStyle)).slice(0, 6);
  }, [selectedStyle]);

  return (
    <>
      {/* Section 1: The Problem (NOT a hero with CTA) */}
      <section className="border-b-3 border-ink">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-[1fr,1px,1fr]">
            {/* Left: The problem statement */}
            <div className="p-8 lg:p-12">
              <p className="font-mono text-xs uppercase tracking-wider text-vermilion mb-6">
                The problem
              </p>
              <h1 className="font-display text-3xl lg:text-4xl mb-6 leading-tight">
                AI tools have created a new form of design homogeneity.
              </h1>
              <div className="space-y-4 text-ink-60">
                <p>
                  <strong className="text-ink">Purple gradients.</strong> Rounded corners on everything. 
                  Inter font. Shadow-lg. Center-aligned heroes. "Transform your workflow" copy.
                </p>
                <p>
                  These patterns appear in AI-generated code because they're statistically common 
                  in training data—not because they're good design decisions.
                </p>
                <p>
                  <strong className="text-ink">This site is a tool</strong>, not a gallery. 
                  It helps you identify slop patterns, understand why they fail, and make 
                  intentional choices instead.
                </p>
              </div>
            </div>
            
            {/* Divider */}
            <div className="hidden lg:block bg-ink" />
            
            {/* Right: Diagnosis tool */}
            <div className="p-8 lg:p-12 bg-paper">
              <SlopDiagnosis />
            </div>
          </div>
        </div>
      </section>
      
      {/* Section 2: Tools (NOT metric counters) */}
      <section className="border-b-3 border-ink">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-3">
            {/* Tool 1: Pattern Library */}
            <Link 
              href="/patterns" 
              className="group p-8 lg:p-10 border-b-3 lg:border-b-0 lg:border-r-3 border-ink hover:bg-paper-bright transition-colors"
            >
              <p className="font-mono text-xs uppercase tracking-wider text-ink-40 mb-4">01</p>
              <h2 className="font-display text-2xl mb-3 group-hover:text-vermilion transition-colors">
                Pattern Library
              </h2>
              <p className="text-ink-60 text-sm mb-4">
                Interactive examples of slop patterns and their alternatives. 
                Adjust border radius, colors, and typography live.
              </p>
              <span className="font-mono text-sm text-vermilion">
                Explore patterns →
              </span>
            </Link>
            
            {/* Tool 2: Prompt Builder */}
            <Link 
              href="/prompts" 
              className="group p-8 lg:p-10 border-b-3 lg:border-b-0 lg:border-r-3 border-ink hover:bg-paper-bright transition-colors"
            >
              <p className="font-mono text-xs uppercase tracking-wider text-ink-40 mb-4">02</p>
              <h2 className="font-display text-2xl mb-3 group-hover:text-vermilion transition-colors">
                Prompt Builder
              </h2>
              <p className="text-ink-60 text-sm mb-4">
                Generate AI prompts by selecting specific patterns to include 
                or avoid. Copy structured instructions, not vague descriptions.
              </p>
              <span className="font-mono text-sm text-vermilion">
                Build a prompt →
              </span>
            </Link>
            
            {/* Tool 3: Contrast Checker */}
            <div className="p-8 lg:p-10">
              <p className="font-mono text-xs uppercase tracking-wider text-ink-40 mb-4">03</p>
              <h2 className="font-display text-2xl mb-3">
                Accessibility Tools
              </h2>
              <p className="text-ink-60 text-sm mb-4">
                Check color contrast ratios against WCAG standards. 
                Beautiful design must also be readable.
              </p>
              <ContrastChecker />
            </div>
          </div>
        </div>
      </section>
      
      {/* Section 3: Curated Analysis (NOT a card grid) */}
      <section className="border-b-3 border-ink">
        <div className="max-w-[1400px] mx-auto p-8 lg:p-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-ink-40 mb-3">
                Curated examples
              </p>
              <h2 className="font-display text-2xl lg:text-3xl">
                Sites that avoid the slop patterns
              </h2>
              <p className="text-ink-60 mt-2 max-w-xl">
                Not just inspiration—analysis. Click any site to see 
                <strong className="text-ink"> why </strong> 
                it works and how to apply its principles.
              </p>
            </div>
            
            {/* Style filter */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedStyle(null)}
                className={`tag ${!selectedStyle ? 'tag-filled' : ''}`}
              >
                All
              </button>
              {['Minimal', 'Dark', 'Editorial', 'Unusual Layout'].map(style => (
                <button
                  key={style}
                  onClick={() => setSelectedStyle(style)}
                  className={`tag ${selectedStyle === style ? 'tag-filled' : ''}`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>
          
          {/* Sites - NOT uniform cards */}
          <div className="grid lg:grid-cols-2 gap-6">
            {filteredSites.map((site, i) => (
              <Link 
                key={site.slug}
                href={`/site/${site.slug}`}
                className="group border-3 border-ink bg-paper-bright hover:bg-paper transition-colors"
              >
                <div className="grid grid-cols-[200px,1fr]">
                  {/* Thumbnail */}
                  <div className="relative aspect-[4/3] border-r-3 border-ink overflow-hidden">
                    {site.thumbnail ? (
                      <Image
                        src={site.thumbnail}
                        alt={`Screenshot of ${site.name}`}
                        fill
                        className="object-cover"
                        sizes="200px"
                      />
                    ) : (
                      <div className="w-full h-full bg-ink-40" />
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="p-5">
                    <p className="font-mono text-xs text-ink-40 mb-1">
                      {site.url.replace('https://', '').replace('www.', '')}
                    </p>
                    <h3 className="font-display text-xl mb-2 group-hover:text-vermilion transition-colors">
                      {site.name}
                    </h3>
                    <p className="text-sm text-ink-60 mb-3 line-clamp-2">
                      {getAnalysisSummary(site.styles)}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {site.styles.slice(0, 3).map(style => (
                        <span key={style} className="tag text-[10px]">
                          {style}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <Link href="/gallery" className="btn btn-outline">
              View all {websites.length} sites →
            </Link>
          </div>
        </div>
      </section>
      
      {/* Section 4: About (WHO is behind this) */}
      <section className="dark-section">
        <div className="max-w-[1400px] mx-auto p-8 lg:p-12">
          <div className="grid lg:grid-cols-[2fr,1fr] gap-12">
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-paper/50 mb-4">
                About this project
              </p>
              <h2 className="font-display text-2xl lg:text-3xl mb-6">
                Built by developers who were tired of AI-generated sameness.
              </h2>
              <div className="space-y-4 text-paper/70">
                <p>
                  Anti-Slop started as a collection of prompts to steer AI coding assistants 
                  away from default patterns. It grew into this toolkit after we realized 
                  the problem wasn't just AI—it was the lack of intentional design education.
                </p>
                <p>
                  <strong className="text-paper">The gallery data comes from godly.website</strong>, 
                  a curated collection of award-winning web design. We add analysis: explaining 
                  why each site works, connecting examples to patterns, and providing actionable 
                  prompts you can use.
                </p>
                <p>
                  This site practices what it preaches: no rounded corners, no shadows, 
                  no gradients. Every design choice is documented in the pattern library.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="border-3 border-paper/30 p-6">
                <p className="font-mono text-xs uppercase tracking-wider text-paper/50 mb-3">
                  Open source
                </p>
                <a 
                  href="https://github.com/rohunvora/anti-slop-lib"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display text-xl hover:text-vermilion-light transition-colors"
                >
                  github.com/rohunvora/anti-slop-lib →
                </a>
              </div>
              <div className="border-3 border-paper/30 p-6">
                <p className="font-mono text-xs uppercase tracking-wider text-paper/50 mb-3">
                  npm package
                </p>
                <a 
                  href="https://www.npmjs.com/package/anti-slop"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display text-xl hover:text-vermilion-light transition-colors"
                >
                  npm install anti-slop →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// Generate analysis summary based on site styles
function getAnalysisSummary(styles: string[]): string {
  if (styles.includes('Minimal')) {
    return 'Uses restraint as a design tool. Every element earns its place through necessity, not decoration.';
  }
  if (styles.includes('Dark')) {
    return 'Dark theme done right: true blacks, not dark grays. Single accent color creates focus.';
  }
  if (styles.includes('Animation')) {
    return 'Animation serves communication, not decoration. Each motion guides attention or confirms action.';
  }
  if (styles.includes('Editorial')) {
    return 'Typography-first design. Serif headlines create editorial weight; generous whitespace aids reading.';
  }
  if (styles.includes('Unusual Layout')) {
    return 'Breaks the grid intentionally. Asymmetry creates visual tension and memorability.';
  }
  if (styles.includes('3D')) {
    return 'Three-dimensional elements serve the content, not just spectacle. Fast loading, graceful fallbacks.';
  }
  return 'Distinctive design choices that set it apart from template-based sites.';
}

function HomeLoading() {
  return (
    <div className="max-w-[1400px] mx-auto p-12">
      <div className="animate-pulse space-y-8">
        <div className="h-8 bg-ink/10 w-1/2" />
        <div className="h-4 bg-ink/10 w-3/4" />
        <div className="h-4 bg-ink/10 w-2/3" />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<HomeLoading />}>
      <HomeContent />
    </Suspense>
  );
}
