'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { websites } from './data/websites';
import Link from 'next/link';
import Image from 'next/image';

// Quick-access tool cards for dashboard layout
function ToolCard({ 
  href, 
  number, 
  title, 
  description, 
  cta 
}: { 
  href: string; 
  number: string; 
  title: string; 
  description: string; 
  cta: string;
}) {
  return (
    <Link 
      href={href}
      className="group block border-3 border-ink p-6 hover:bg-paper-bright transition-colors h-full"
    >
      <p className="font-mono text-xs text-ink-40 mb-3">{number}</p>
      <h2 className="font-display text-xl mb-2 group-hover:text-vermilion transition-colors">
        {title}
      </h2>
      <p className="text-sm text-ink-60 mb-4">{description}</p>
      <span className="font-mono text-sm text-vermilion">{cta}</span>
    </Link>
  );
}

// Inline contrast checker
function QuickContrastCheck() {
  const [fg, setFg] = useState('#0d0c0b');
  const [bg, setBg] = useState('#f5f2eb');
  
  const getLuminance = (hex: string) => {
    const rgb = hex.match(/[A-Za-z0-9]{2}/g)?.map(v => parseInt(v, 16) / 255) || [0, 0, 0];
    const [r, g, b] = rgb.map(v => v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  
  const l1 = getLuminance(fg);
  const l2 = getLuminance(bg);
  const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  const passesAA = ratio >= 4.5;
  
  return (
    <div className="border-3 border-ink p-4">
      <div className="flex items-center gap-4 mb-3">
        <div className="flex items-center gap-2">
          <input type="color" value={fg} onChange={e => setFg(e.target.value)} className="w-8 h-8" />
          <span className="font-mono text-xs">Text</span>
        </div>
        <div className="flex items-center gap-2">
          <input type="color" value={bg} onChange={e => setBg(e.target.value)} className="w-8 h-8" />
          <span className="font-mono text-xs">BG</span>
        </div>
        <div className={`ml-auto font-mono text-sm font-bold ${passesAA ? 'text-teal' : 'text-vermilion'}`}>
          {ratio.toFixed(1)}:1 {passesAA ? '✓' : '✗'}
        </div>
      </div>
      <div className="p-3 border-2 border-ink text-sm" style={{ backgroundColor: bg, color: fg }}>
        Sample text preview
      </div>
    </div>
  );
}

// Slop self-diagnosis (simplified)
function QuickDiagnosis() {
  const [score, setScore] = useState(0);
  const questions = [
    'Purple gradient?',
    'Inter only?', 
    'rounded-xl?',
    'Centered hero?',
  ];
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  
  const handleAnswer = (idx: number, val: boolean) => {
    setAnswers(prev => ({ ...prev, [idx]: val }));
  };
  
  const yesCount = Object.values(answers).filter(Boolean).length;
  
  return (
    <div className="border-3 border-ink p-4">
      <p className="font-mono text-xs text-ink-40 mb-3">QUICK SLOP CHECK</p>
      <div className="space-y-2">
        {questions.map((q, i) => (
          <div key={i} className="flex items-center justify-between text-sm">
            <span>{q}</span>
            <div className="flex gap-1">
              <button 
                onClick={() => handleAnswer(i, true)}
                className={`px-2 py-0.5 text-xs border-2 ${answers[i] === true ? 'bg-vermilion border-vermilion text-paper' : 'border-ink'}`}
              >
                Y
              </button>
              <button 
                onClick={() => handleAnswer(i, false)}
                className={`px-2 py-0.5 text-xs border-2 ${answers[i] === false ? 'bg-teal border-teal text-paper' : 'border-ink'}`}
              >
                N
              </button>
            </div>
          </div>
        ))}
      </div>
      {Object.keys(answers).length > 0 && (
        <p className={`mt-3 text-sm font-semibold ${yesCount >= 2 ? 'text-vermilion' : 'text-teal'}`}>
          {yesCount}/{questions.length} slop patterns detected
        </p>
      )}
    </div>
  );
}

function HomeContent() {
  return (
    <>
      {/* Hero: Problem + Quick Access Dashboard */}
      <section className="border-b-3 border-ink">
        <div className="max-w-[1400px] mx-auto">
          {/* Top bar with key message */}
          <div className="p-6 lg:p-8 border-b-3 border-ink">
            <div className="max-w-2xl">
              <h1 className="font-display text-2xl lg:text-3xl mb-3">
                AI tools create homogenized design. These tools help you escape it.
              </h1>
              <p className="text-ink-60">
                Jump to any tool below—they're independent, not sequential steps.
              </p>
            </div>
          </div>
          
          {/* Dashboard grid - quick access to all tools */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4">
            <ToolCard
              href="/patterns"
              number="01"
              title="Pattern Lab"
              description="Interactive sliders for radius, colors, type. See what's sloppy vs. distinctive."
              cta="Open playground →"
            />
            <ToolCard
              href="/prompts"
              number="02"
              title="Prompt Builder"
              description="Select patterns to include/avoid. Generate structured AI instructions."
              cta="Build prompt →"
            />
            <ToolCard
              href="/gallery"
              number="03"
              title="Site Gallery"
              description="Curated examples with analysis of WHY they work, not just what they look like."
              cta="Browse sites →"
            />
            <ToolCard
              href="/microinteractions"
              number="04"
              title="Microinteractions"
              description="Trigger-feedback patterns: loaders, validation, transitions with code."
              cta="See examples →"
            />
          </div>
        </div>
      </section>
      
      {/* Quick Tools Row - Inline utilities without navigation */}
      <section className="border-b-3 border-ink">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-3">
            {/* Contrast checker inline */}
            <div className="p-6 border-b-3 lg:border-b-0 lg:border-r-3 border-ink">
              <p className="font-mono text-xs text-ink-40 mb-3">CONTRAST CHECKER</p>
              <QuickContrastCheck />
              <p className="text-xs text-ink-40 mt-3">
                WCAG AA requires 4.5:1 for normal text.{' '}
                <Link href="/patterns?tab=colors" className="underline hover:text-ink">
                  More color tools →
                </Link>
              </p>
            </div>
            
            {/* Quick diagnosis */}
            <div className="p-6 border-b-3 lg:border-b-0 lg:border-r-3 border-ink">
              <QuickDiagnosis />
              <p className="text-xs text-ink-40 mt-3">
                <Link href="/patterns" className="underline hover:text-ink">
                  Full pattern analysis →
                </Link>
              </p>
            </div>
            
            {/* Usability reminder */}
            <div className="p-6 bg-paper-bright">
              <p className="font-mono text-xs text-vermilion mb-3">USABILITY REMINDER</p>
              <p className="text-sm text-ink-60 mb-3">
                <strong className="text-ink">Aesthetics can mask problems.</strong> Research shows 
                attractive designs feel more usable—even when they're not.
              </p>
              <p className="text-sm text-ink-60">
                After applying these patterns, test with real users. Does it work, or just look good?
              </p>
              <Link href="/patterns?tab=usability" className="font-mono text-xs text-vermilion mt-3 block">
                Usability checklist →
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Examples - Not a grid of identical cards */}
      <section className="border-b-3 border-ink">
        <div className="max-w-[1400px] mx-auto p-6 lg:p-8">
          <div className="flex items-end justify-between mb-6">
            <div>
              <p className="font-mono text-xs text-ink-40 mb-2">FEATURED EXAMPLES</p>
              <h2 className="font-display text-xl">Sites that avoid the slop patterns</h2>
            </div>
            <Link href="/gallery" className="font-mono text-sm text-vermilion">
              All {websites.length} sites →
            </Link>
          </div>
          
          {/* Varied layout - not uniform grid */}
          <div className="grid lg:grid-cols-[1fr,1fr,1fr] gap-4">
            {websites.slice(0, 3).map((site, i) => (
              <Link 
                key={site.slug}
                href={`/site/${site.slug}`}
                className={`group border-3 border-ink overflow-hidden hover:border-vermilion transition-colors ${
                  i === 0 ? 'lg:row-span-2' : ''
                }`}
              >
                <div className={`relative ${i === 0 ? 'aspect-[4/3]' : 'aspect-video'} border-b-3 border-ink`}>
                  {site.thumbnail && (
                    <Image
                      src={site.thumbnail}
                      alt={site.name}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold group-hover:text-vermilion transition-colors">{site.name}</h3>
                  <p className="text-xs text-ink-40 font-mono mt-1">{site.styles.slice(0, 2).join(' · ')}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Tailwind Customization Guidance */}
      <section className="border-b-3 border-ink">
        <div className="max-w-[1400px] mx-auto p-6 lg:p-8">
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <p className="font-mono text-xs text-ink-40 mb-2">ESCAPE THE DEFAULTS</p>
              <h2 className="font-display text-xl mb-4">Tailwind's theme is a starting point, not a destination</h2>
              <p className="text-ink-60 mb-4">
                Websites using the same framework converge visually because they share default 
                values. The fix isn't avoiding Tailwind—it's customizing the theme.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-teal">→</span>
                  <span>Override <code className="font-mono bg-ink/10 px-1">borderRadius</code> to remove xl/2xl/3xl</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal">→</span>
                  <span>Define custom colors instead of using slate/gray/zinc</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal">→</span>
                  <span>Create bespoke spacing values (not just 4/8/12/16)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal">→</span>
                  <span>Remove default shadows—use borders or transforms instead</span>
                </li>
              </ul>
            </div>
            <div className="code-block p-4 text-sm">
              <pre>{`// tailwind.config.ts
const config = {
  theme: {
    // OVERRIDE defaults, don't extend
    borderRadius: {
      'none': '0',
      'sm': '2px',
      // Intentionally omit xl, 2xl, 3xl
    },
    extend: {
      colors: {
        // YOUR brand colors, not Tailwind's
        ink: '#0d0c0b',
        paper: '#f5f2eb',
        accent: '#c42a0e',
      },
      // Remove default shadows
      boxShadow: {
        'none': 'none',
      },
    },
  },
};`}</pre>
            </div>
          </div>
        </div>
      </section>
      
      {/* About + Project Info */}
      <section className="dark-section">
        <div className="max-w-[1400px] mx-auto p-6 lg:p-8">
          <div className="grid lg:grid-cols-[2fr,1fr] gap-8">
            <div>
              <p className="font-mono text-xs text-paper/50 mb-2">ABOUT THIS PROJECT</p>
              <h2 className="font-display text-xl mb-4">Built by developers tired of AI sameness</h2>
              <p className="text-paper/70 mb-4">
                Anti-Slop started as prompt snippets to steer AI away from defaults. It grew into 
                these tools when we realized the problem isn't AI—it's lack of intentional design education.
              </p>
              <p className="text-paper/70">
                <strong className="text-paper">Gallery data from godly.website.</strong> We add 
                analysis: explaining why sites work, connecting to patterns, generating prompts.
              </p>
            </div>
            <div className="space-y-4">
              <a href="https://github.com/rohunvora/anti-slop-lib" target="_blank" rel="noopener noreferrer" 
                className="block border-3 border-paper/30 p-4 hover:border-paper/60 transition-colors">
                <p className="font-mono text-xs text-paper/50 mb-1">GITHUB</p>
                <p className="text-paper">rohunvora/anti-slop-lib →</p>
              </a>
              <a href="https://npmjs.com/package/anti-slop" target="_blank" rel="noopener noreferrer"
                className="block border-3 border-paper/30 p-4 hover:border-paper/60 transition-colors">
                <p className="font-mono text-xs text-paper/50 mb-1">NPM</p>
                <p className="text-paper">npm install anti-slop →</p>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="p-12 text-center">Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
