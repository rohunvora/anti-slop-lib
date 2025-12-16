import { nonExistentFunction } from './this-file-does-not-exist';
'use client';

import { useState, useCallback, Suspense } from 'react';
import Link from 'next/link';

// ============================================================================
// TYPES (matching analyzer output)
// ============================================================================

type Salience = 'high' | 'medium' | 'low';
type RiskLevel = 'low' | 'medium' | 'high';
type ToneMode = 'direct' | 'diplomatic';

interface QuickFix {
  effort: 'low' | 'medium' | 'high';
  change: string;
  patch?: string;
  tradeoffs?: string;
}

interface DetectedSignal {
  id: string;
  label: string;
  salience: Salience;
  confidence: number;
  whyItReadsGeneric: string;
  perception: string;
  quickFixes: QuickFix[];
  evidence: Array<{ type: string; snippet: string }>;
}

interface AnalysisResult {
  templateScore: number;
  risk: RiskLevel;
  headline: string;
  explanation: string;
  topSignals: DetectedSignal[];
  summary: { high: number; medium: number; low: number; total: number };
  disclaimer: string;
}

interface VerifyResult {
  improved: boolean;
  before: { score: number; risk: RiskLevel; signalCount: number };
  after: { score: number; risk: RiskLevel; signalCount: number };
  signalsRemoved: string[];
  signalsRemaining: string[];
  regressions: string[];
  summary: string;
}

// ============================================================================
// CLIENT-SIDE ANALYZER (simplified version for demo)
// ============================================================================

const TEMPLATE_SIGNALS: Array<{
  id: string;
  label: string;
  salience: Salience;
  whyItReadsGeneric: string;
  perception: string;
  detect: { patterns: RegExp[] };
  quickFixes: QuickFix[];
}> = [
  {
    id: 'purple-gradient',
    label: 'Purple/Violet Gradient',
    salience: 'high',
    whyItReadsGeneric: 'Purple-to-pink gradients are the default output of most AI design tools.',
    perception: 'Viewers immediately pattern-match to "AI-generated"',
    detect: {
      patterns: [
        /from-purple/i, /from-violet/i, /from-indigo/i,
        /to-pink/i, /to-fuchsia/i, /to-purple/i,
        /bg-purple/i, /bg-violet/i, /bg-indigo/i,
        /#8B5CF6/i, /#7C3AED/i, /#6366F1/i,
      ],
    },
    quickFixes: [
      { effort: 'low', change: 'Replace gradient with solid brand color', patch: '// Before: bg-gradient-to-r from-purple-500 to-pink-500
// After:  bg-[#your-brand-color]' },
      { effort: 'medium', change: 'Use warm tones instead (terracotta, gold, forest green)', patch: '// Try: bg-amber-600, bg-emerald-700, bg-rose-600' },
    ],
  },
  {
    id: 'blob-backgrounds',
    label: '3D Blob/Orb Decorations',
    salience: 'high',
    whyItReadsGeneric: 'Floating blurred gradient shapes are semantically meaningless template filler.',
    perception: 'Immediately signals "this was generated, not designed"',
    detect: {
      patterns: [/blur-3xl/i, /blur-2xl/i, /blob/i, /orb/i],
    },
    quickFixes: [
      { effort: 'low', change: 'Remove entirely — empty space is fine', patch: '// Delete the blob div entirely' },
      { effort: 'low', change: 'Use subtle grid/dot pattern instead', patch: '// Add a subtle grid background:
// <div className="absolute inset-0 bg-[url(/grid.svg)] opacity-[0.02]" />' },
    ],
  },
  {
    id: 'centered-hero-generic-cta',
    label: 'Centered Hero + Generic CTA',
    salience: 'high',
    whyItReadsGeneric: 'The centered headline → subtext → "Get Started" button is the #1 template layout.',
    perception: 'Reads as "SaaS template" regardless of actual content',
    detect: {
      patterns: [
        /text-center.*mx-auto/i,
        /Get Started/i, /Start Free/i, /Try Free/i, /Learn More/i,
      ],
    },
    quickFixes: [
      { effort: 'medium', change: 'Switch to asymmetric split layout', patch: '// Before: <section className="text-center mx-auto">
// After:  <section className="grid md:grid-cols-[1fr_1.2fr] gap-12">' },
      { effort: 'low', change: 'Left-align text, keep centered container', patch: '// Change: text-center → text-left' },
      { effort: 'low', change: 'Make CTA specific to your product', patch: '// Before: "Get Started Free"
// After:  "Create your first [thing]"' },
    ],
  },
  {
    id: 'inter-only-typography',
    label: 'Inter-Only Typography',
    salience: 'medium',
    whyItReadsGeneric: 'Inter is the default font in Tailwind/Next.js. Using it alone signals "I didn\'t make a typography choice."',
    perception: 'Reads as "default stack" rather than "designed"',
    detect: {
      patterns: [/font-family.*Inter/i, /'Inter'/i, /"Inter"/i, /font-sans/i],
    },
    quickFixes: [
      { effort: 'low', change: 'Pair with a serif for headlines', patch: '// Add: font-serif for h1-h3, keep Inter for body' },
      { effort: 'low', change: 'Switch to less common grotesque (IBM Plex Sans, Geist)', patch: '// Replace Inter with IBM Plex Sans or Geist' },
    ],
  },
  {
    id: 'rounded-xl-everything',
    label: 'Rounded-XL on Everything',
    salience: 'medium',
    whyItReadsGeneric: 'rounded-xl/2xl on every element is the shadcn/ui default.',
    perception: 'Signals "shadcn template" or "Tailwind UI starter"',
    detect: {
      patterns: [/rounded-xl/i, /rounded-2xl/i, /rounded-3xl/i],
    },
    quickFixes: [
      { effort: 'low', change: 'Go sharp (rounded-none or rounded-sm)', patch: '// Before: rounded-xl
// After:  rounded-sm' },
      { effort: 'low', change: 'Pick ONE radius and use consistently', patch: '// Define: borderRadius: { DEFAULT: "4px" }' },
    ],
  },
  {
    id: 'shadow-cards',
    label: 'Shadow-Elevated Cards',
    salience: 'medium',
    whyItReadsGeneric: 'shadow-sm/md/lg on cards is the default "depth" approach.',
    perception: 'Reads as "Material Design era" or "generic dashboard"',
    detect: {
      patterns: [/shadow-sm/i, /shadow-md/i, /shadow-lg/i, /shadow-xl/i],
    },
    quickFixes: [
      { effort: 'low', change: 'Replace shadows with borders', patch: '// Before: shadow-md rounded-xl
// After:  border border-border' },
      { effort: 'medium', change: 'Use hard/offset shadows for character', patch: '// After: shadow-[4px_4px_0_0_#000]' },
    ],
  },
  {
    id: 'glassmorphism',
    label: 'Glassmorphism Effects',
    salience: 'medium',
    whyItReadsGeneric: 'backdrop-blur + transparency was peak 2021 and is now a dated template marker.',
    perception: 'Reads as "2021 Dribbble shot"',
    detect: {
      patterns: [/backdrop-blur/i, /bg-white\/10/i, /bg-black\/10/i, /bg-white\/20/i],
    },
    quickFixes: [
      { effort: 'low', change: 'Use solid backgrounds', patch: '// Before: backdrop-blur-md bg-white/10
// After:  bg-background border' },
    ],
  },
  {
    id: 'generic-headline-copy',
    label: 'Generic Headline Copy',
    salience: 'medium',
    whyItReadsGeneric: 'Phrases like "Transform your X" are default AI writing outputs.',
    perception: 'Reads as "placeholder copy" or "ChatGPT wrote this"',
    detect: {
      patterns: [
        /AI[- ]?Powered/i, /Supercharge your/i, /Transform your/i,
        /Revolutionize/i, /Next[- ]?generation/i, /Seamlessly/i,
        /10x your/i, /Ship faster/i, /Scale your/i, /Level up/i,
      ],
    },
    quickFixes: [
      { effort: 'medium', change: 'Be specific about what your product does', patch: '// Before: "Transform your workflow"
// After:  "Ship features 3x faster"' },
      { effort: 'low', change: 'Lead with the outcome, not the mechanism', patch: '// Before: "AI-Powered Analytics"
// After:  "Know which features users want"' },
    ],
  },
];

function analyzeCode(code: string, tone: ToneMode = 'direct'): AnalysisResult {
  const detectedSignals: DetectedSignal[] = [];
  
  for (const signal of TEMPLATE_SIGNALS) {
    const evidence: Array<{ type: string; snippet: string }> = [];
    
    for (const pattern of signal.detect.patterns) {
      const matches = code.match(pattern);
      if (matches) {
        evidence.push({ type: 'match', snippet: matches[0] });
      }
    }
    
    if (evidence.length > 0) {
      detectedSignals.push({
        id: signal.id,
        label: signal.label,
        salience: signal.salience,
        confidence: Math.min(1, 0.5 + evidence.length * 0.15),
        whyItReadsGeneric: signal.whyItReadsGeneric,
        perception: signal.perception,
        quickFixes: signal.quickFixes,
        evidence,
      });
    }
  }
  
  // Sort by salience
  const salienceOrder = { high: 0, medium: 1, low: 2 };
  detectedSignals.sort((a, b) => salienceOrder[a.salience] - salienceOrder[b.salience]);
  
  // Calculate score
  const weights = { high: 20, medium: 10, low: 4 };
  let score = 0;
  for (const signal of detectedSignals) {
    score += weights[signal.salience] * Math.log2(signal.evidence.length + 1);
  }
  score = Math.min(100, score);
  
  const risk: RiskLevel = score <= 15 ? 'low' : score <= 40 ? 'medium' : 'high';
  const summary = {
    high: detectedSignals.filter(s => s.salience === 'high').length,
    medium: detectedSignals.filter(s => s.salience === 'medium').length,
    low: detectedSignals.filter(s => s.salience === 'low').length,
    total: detectedSignals.length,
  };
  
  let headline: string;
  if (tone === 'diplomatic') {
    headline = risk === 'low' 
      ? `Your page looks distinctive (${summary.total} minor signal${summary.total !== 1 ? 's' : ''})` 
      : risk === 'medium'
      ? `Your page may read as template-like (${summary.total} signal${summary.total !== 1 ? 's' : ''})`
      : `Your page triggers several template patterns (${summary.total} signal${summary.total !== 1 ? 's' : ''})`;
  } else {
    headline = risk === 'low'
      ? `Looking good — ${summary.total} minor signal${summary.total !== 1 ? 's' : ''}`
      : risk === 'medium'
      ? `Template-likeness risk: Medium (${summary.total} signal${summary.total !== 1 ? 's' : ''})`
      : `This reads AI-generated (${summary.total} signal${summary.total !== 1 ? 's' : ''})`;
  }
  
  const highLabels = detectedSignals.filter(s => s.salience === 'high').map(s => s.label).slice(0, 3);
  const explanation = highLabels.length > 0
    ? `Main tells: ${highLabels.join(', ')}.`
    : 'No major template tells found.';
  
  return {
    templateScore: Math.round(score * 10) / 10,
    risk,
    headline,
    explanation,
    topSignals: detectedSignals.slice(0, 5),
    summary,
    disclaimer: 'Signals correlate with template/AI-looking sites — not proof you used AI.',
  };
}

function verifyFix(original: string, fixed: string, tone: ToneMode = 'direct'): VerifyResult {
  const before = analyzeCode(original, tone);
  const after = analyzeCode(fixed, tone);
  
  const beforeIds = new Set(before.topSignals.map(s => s.id));
  const afterIds = new Set(after.topSignals.map(s => s.id));
  
  const signalsRemoved = Array.from(beforeIds).filter(id => !afterIds.has(id));
  const signalsRemaining = Array.from(afterIds).filter(id => beforeIds.has(id));
  const regressions = Array.from(afterIds).filter(id => !beforeIds.has(id));
  
  const improved = after.templateScore < before.templateScore;
  
  let summary: string;
  if (improved) {
    summary = `Score improved from ${before.templateScore} to ${after.templateScore}. `;
    if (signalsRemoved.length > 0) {
      const labels = signalsRemoved.map(id => before.topSignals.find(s => s.id === id)?.label).filter(Boolean);
      summary += `Removed: ${labels.join(', ')}.`;
    }
  } else if (after.templateScore === before.templateScore) {
    summary = 'Score unchanged. The changes didn\'t affect detected template signals.';
  } else {
    summary = `Score increased from ${before.templateScore} to ${after.templateScore}. `;
    if (regressions.length > 0) {
      const labels = regressions.map(id => after.topSignals.find(s => s.id === id)?.label).filter(Boolean);
      summary += `New signals: ${labels.join(', ')}.`;
    }
  }
  
  return {
    improved,
    before: { score: before.templateScore, risk: before.risk, signalCount: before.summary.total },
    after: { score: after.templateScore, risk: after.risk, signalCount: after.summary.total },
    signalsRemoved,
    signalsRemaining,
    regressions,
    summary,
  };
}

// ============================================================================
// DEMO CODE SAMPLES
// ============================================================================

const DEMO_CODE = `<section class="min-h-screen bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
  <div class="text-center mx-auto max-w-4xl px-6">
    <div class="absolute -z-10 blur-3xl w-96 h-96 bg-violet-500/30 rounded-full"></div>
    <h1 class="text-5xl font-sans font-bold text-white mb-6">
      Transform Your Workflow with AI-Powered Tools
    </h1>
    <p class="text-xl text-white/80 mb-8">
      Supercharge your productivity and ship faster with our next-generation platform.
    </p>
    <button class="bg-white text-purple-600 px-8 py-4 rounded-xl shadow-lg font-semibold">
      Get Started Free
    </button>
  </div>
</section>`;

const FIXED_CODE = `<section class="min-h-screen bg-stone-950 grid md:grid-cols-[1fr_1.2fr] gap-12 items-center px-8 py-20">
  <div class="text-left max-w-xl">
    <h1 class="text-5xl font-serif font-normal text-stone-100 mb-6 tracking-tight">
      Deploy your ML models in 3 commands
    </h1>
    <p class="text-lg text-stone-400 mb-8 leading-relaxed">
      No infrastructure setup. No cold starts. Just push code and get a URL.
    </p>
    <button class="bg-amber-500 text-stone-950 px-6 py-3 font-semibold border-2 border-amber-500 hover:bg-transparent hover:text-amber-500 transition-colors">
      Deploy your first model →
    </button>
  </div>
  <div class="border border-stone-800 p-1">
    <img src="/demo-screenshot.png" alt="Terminal showing deployment" class="w-full" />
  </div>
</section>`;

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

function RiskIndicator({ risk, score }: { risk: RiskLevel; score: number }) {
  const colors = {
    low: 'text-teal border-teal',
    medium: 'text-ink border-ink',
    high: 'text-vermilion border-vermilion',
  };
  const labels = {
    low: 'Low risk',
    medium: 'Medium risk',
    high: 'High risk',
  };
  return (
    <div className={`inline-flex items-center gap-3 px-4 py-2 border-3 ${colors[risk]}`}>
      <span className="font-mono text-2xl font-bold">{score}</span>
      <span className="text-sm font-semibold uppercase tracking-wider">{labels[risk]}</span>
    </div>
  );
}

function CopyButton({ text, label = 'Copy' }: { text: string; label?: string }) {
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
      {copied ? '✓ Copied' : label}
    </button>
  );
}

function SignalCard({ signal, showPatch = true }: { signal: DetectedSignal; showPatch?: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const [selectedFix, setSelectedFix] = useState(0);
  
  return (
    <div className="border-3 border-ink bg-paper-bright">
      <div className="p-4">
        <div className="flex items-start justify-between gap-4 mb-2">
          <div className="flex items-center gap-2">
            <SalienceBadge salience={signal.salience} />
            <h3 className="font-semibold">{signal.label}</h3>
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-xs font-mono text-ink-60 hover:text-ink"
          >
            {expanded ? '− Less' : '+ More'}
          </button>
        </div>
        <p className="text-sm text-ink-60 mb-3">{signal.whyItReadsGeneric}</p>
        
        {/* Evidence */}
        {signal.evidence.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {signal.evidence.slice(0, 3).map((e, i) => (
              <code key={i} className="text-[10px] bg-ink/10 px-1.5 py-0.5 font-mono">
                {e.snippet.length > 30 ? e.snippet.slice(0, 30) + '…' : e.snippet}
              </code>
            ))}
          </div>
        )}
        
        {/* Quick fixes */}
        {showPatch && (
          <div className="flex flex-wrap gap-2">
            {signal.quickFixes.map((fix, i) => (
              <button
                key={i}
                onClick={() => { setSelectedFix(i); setExpanded(true); }}
                className={`text-xs px-2 py-1 border-2 transition-colors ${
                  selectedFix === i && expanded
                    ? 'bg-ink text-paper border-ink'
                    : 'border-ink-40 text-ink-60 hover:border-ink hover:text-ink'
                }`}
              >
                {fix.effort === 'low' ? '⚡' : fix.effort === 'medium' ? '🔧' : '🏗️'} {fix.change.slice(0, 40)}{fix.change.length > 40 ? '…' : ''}
              </button>
            ))}
          </div>
        )}
      </div>
      
      {/* Expanded patch view */}
      {expanded && signal.quickFixes[selectedFix]?.patch && (
        <div className="border-t-3 border-ink bg-ink text-paper p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-paper/60">
              {signal.quickFixes[selectedFix].effort.toUpperCase()} EFFORT FIX
            </span>
            <CopyButton text={signal.quickFixes[selectedFix].patch || ''} label="Copy patch" />
          </div>
          <pre className="text-xs font-mono overflow-x-auto whitespace-pre-wrap">
            {signal.quickFixes[selectedFix].patch}
          </pre>
          {signal.quickFixes[selectedFix].tradeoffs && (
            <p className="text-xs text-paper/60 mt-2 italic">
              ⚠️ {signal.quickFixes[selectedFix].tradeoffs}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function ToneToggle({ tone, onChange }: { tone: ToneMode; onChange: (t: ToneMode) => void }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-ink-60">Tone:</span>
      <button
        onClick={() => onChange('direct')}
        className={`px-2 py-0.5 border-2 transition-colors ${
          tone === 'direct' ? 'bg-ink text-paper border-ink' : 'border-ink-40 text-ink-60'
        }`}
      >
        Direct
      </button>
      <button
        onClick={() => onChange('diplomatic')}
        className={`px-2 py-0.5 border-2 transition-colors ${
          tone === 'diplomatic' ? 'bg-ink text-paper border-ink' : 'border-ink-40 text-ink-60'
        }`}
      >
        Diplomatic
      </button>
    </div>
  );
}

// ============================================================================
// MAIN PAGE
// ============================================================================

function HomeContent() {
  const [inputMode, setInputMode] = useState<'code' | 'url'>('code');
  const [code, setCode] = useState('');
  const [tone, setTone] = useState<ToneMode>('direct');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [verifyMode, setVerifyMode] = useState(false);
  const [fixedCode, setFixedCode] = useState('');
  const [verifyResult, setVerifyResult] = useState<VerifyResult | null>(null);
  const [activeInstallTool, setActiveInstallTool] = useState<'cursor' | 'claude' | 'vscode'>('cursor');
  
  const handleAnalyze = useCallback(() => {
    const codeToAnalyze = code.trim() || DEMO_CODE;
    setResult(analyzeCode(codeToAnalyze, tone));
    setVerifyMode(false);
    setVerifyResult(null);
  }, [code, tone]);
  
  const handleTryDemo = useCallback(() => {
    setCode(DEMO_CODE);
    setResult(analyzeCode(DEMO_CODE, tone));
    setVerifyMode(false);
  }, [tone]);
  
  const handleVerify = useCallback(() => {
    const original = code.trim() || DEMO_CODE;
    const fixed = fixedCode.trim() || FIXED_CODE;
    setVerifyResult(verifyFix(original, fixed, tone));
  }, [code, fixedCode, tone]);
  
  const handleShowFixedDemo = useCallback(() => {
    setFixedCode(FIXED_CODE);
    setVerifyMode(true);
  }, []);

  const installSnippets = {
    cursor: `// Add to .cursor/mcp.json
{
  "mcpServers": {
    "anti-slop": {
      "command": "npx",
      "args": ["-y", "anti-slop"]
    }
  }
}`,
    claude: `// Add to claude_desktop_config.json
{
  "mcpServers": {
    "anti-slop": {
      "command": "npx",
      "args": ["-y", "anti-slop"]
    }
  }
}`,
    vscode: `// Install via npm
npm install -g anti-slop

// Or use npx directly
npx anti-slop`,
  };

  return (
    <>
      {/* ================================================================
          HERO: Live Diagnostic
          ================================================================ */}
      <section className="border-b-3 border-ink">
        <div className="max-w-[1400px] mx-auto">
          {/* Hero header */}
          <div className="p-6 lg:p-8 border-b-3 border-ink">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="px-2 py-1 bg-vermilion text-paper text-xs font-mono font-bold">MCP SERVER</span>
              <span className="text-ink-40 text-sm">for Cursor, Claude Code, and AI coding tools</span>
            </div>
            <h1 className="font-display text-2xl lg:text-4xl mb-3 max-w-3xl">
              Remove the tells that make your site look mass-produced.
            </h1>
            <p className="text-ink-60 text-lg max-w-2xl">
              Detect template signals in your code. Get minimal patches. Verify fixes — all inside your editor.
            </p>
          </div>
          
          {/* Input area */}
          <div className="grid lg:grid-cols-[1fr,400px]">
            {/* Code input */}
            <div className="p-6 lg:p-8 border-b-3 lg:border-b-0 lg:border-r-3 border-ink">
              {/* Tabs + Tone toggle */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => setInputMode('code')}
                    className={`px-4 py-2 text-sm font-semibold border-3 transition-colors ${
                      inputMode === 'code' ? 'bg-ink text-paper border-ink' : 'border-ink text-ink hover:bg-paper-bright'
                    }`}
                  >
                    Paste Code
                  </button>
                  <button
                    onClick={() => setInputMode('url')}
                    className={`px-4 py-2 text-sm font-semibold border-3 transition-colors ${
                      inputMode === 'url' ? 'bg-ink text-paper border-ink' : 'border-ink text-ink hover:bg-paper-bright'
                    }`}
                  >
                    Paste URL <span className="text-xs opacity-60">(beta)</span>
                  </button>
                </div>
                <ToneToggle tone={tone} onChange={setTone} />
              </div>
              
              {/* Input */}
              {inputMode === 'code' ? (
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Paste your HTML, JSX, or Tailwind classes here..."
                  className="w-full h-48 font-mono text-sm p-4 border-3 border-ink resize-none bg-paper-bright"
                  spellCheck={false}
                />
              ) : (
                <div className="border-3 border-dashed border-ink-40 p-8 text-center bg-paper-bright">
                  <p className="text-ink-40 mb-2">URL analysis coming soon</p>
                  <p className="text-sm text-ink-40">Paste HTML/Tailwind for accurate results today.</p>
                </div>
              )}
              
              {/* Actions */}
              <div className="flex flex-wrap gap-3 mt-4">
                <button onClick={handleAnalyze} className="btn">
                  Run Check
                </button>
                <button onClick={handleTryDemo} className="btn btn-outline">
                  Try Demo Code
                </button>
              </div>
              
              {/* Disclaimer */}
              <p className="text-xs text-ink-40 mt-4 border-l-3 border-ink-40 pl-3">
                Signals correlate with template/AI-looking sites — not proof you used AI.
              </p>
            </div>
            
            {/* MCP Quick Install - Primary CTA */}
            <div className="p-6 lg:p-8 bg-ink text-paper">
              <p className="font-mono text-xs text-paper/50 mb-2">BEST EXPERIENCE</p>
              <h3 className="font-display text-xl mb-3">Install in Cursor</h3>
              <p className="text-paper/70 text-sm mb-4">
                Run checks directly in your editor. Get patches inline. No copy-pasting.
              </p>
              
              {/* Quick install snippet */}
              <div className="bg-paper/10 p-3 mb-4 border border-paper/20">
                <p className="font-mono text-xs text-paper/50 mb-2">.cursor/mcp.json</p>
                <pre className="text-xs font-mono text-paper/90 overflow-x-auto">{`{
  "mcpServers": {
    "anti-slop": {
      "command": "npx",
      "args": ["-y", "anti-slop"]
    }
  }
}`}</pre>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={async () => {
                    await navigator.clipboard.writeText(`{
  "mcpServers": {
    "anti-slop": {
      "command": "npx",
      "args": ["-y", "anti-slop"]
    }
  }
}`);
                  }}
                  className="flex-1 px-3 py-2 bg-vermilion text-paper text-sm font-semibold hover:bg-vermilion-light transition-colors"
                >
                  Copy Config
                </button>
                <Link
                  href="#install"
                  className="px-3 py-2 border border-paper/30 text-paper text-sm hover:border-paper transition-colors"
                >
                  More options
                </Link>
              </div>
              
              <p className="text-xs text-paper/50 mt-4">
                Then ask Cursor: "check this file for template signals"
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* ================================================================
          SIGNAL REPORT
          ================================================================ */}
      {result && (
        <section className="border-b-3 border-ink" id="report">
          <div className="max-w-[1400px] mx-auto p-6 lg:p-8">
            {/* Report header */}
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
              <div>
                <p className="font-mono text-xs text-ink-40 mb-2">TEMPLATE SIGNAL REPORT</p>
                <h2 className="font-display text-xl lg:text-2xl mb-2">{result.headline}</h2>
                <p className="text-ink-60">{result.explanation}</p>
              </div>
              <RiskIndicator risk={result.risk} score={result.templateScore} />
            </div>
            
            {/* Summary badges */}
            <div className="flex flex-wrap gap-3 mb-6 pb-6 border-b-3 border-ink">
              {result.summary.high > 0 && (
                <span className="px-3 py-1 bg-vermilion text-paper text-sm font-semibold">
                  {result.summary.high} high-salience
                </span>
              )}
              {result.summary.medium > 0 && (
                <span className="px-3 py-1 border-2 border-ink text-sm font-semibold">
                  {result.summary.medium} medium
                </span>
              )}
              {result.summary.low > 0 && (
                <span className="px-3 py-1 border-2 border-ink-40 text-ink-60 text-sm">
                  {result.summary.low} low
                </span>
              )}
            </div>
            
            {/* Signal cards */}
            {result.topSignals.length > 0 ? (
              <div className="space-y-4">
                <p className="font-mono text-xs text-ink-40">TOP SIGNALS (with patches)</p>
                {result.topSignals.map((signal) => (
                  <SignalCard key={signal.id} signal={signal} />
                ))}
              </div>
            ) : (
              <div className="border-3 border-teal bg-teal/10 p-6 text-center">
                <p className="text-teal font-semibold">✓ No major template signals detected</p>
                <p className="text-sm text-ink-60 mt-2">Your code appears distinctive.</p>
              </div>
            )}
            
            {/* Verify CTA */}
            {result.topSignals.length > 0 && (
              <div className="mt-6 pt-6 border-t-3 border-ink">
                <button
                  onClick={handleShowFixedDemo}
                  className="btn"
                >
                  Apply Patches → Verify Fix
                </button>
                <span className="ml-4 text-sm text-ink-60">
                  See the fix → verify loop in action
                </span>
              </div>
            )}
          </div>
        </section>
      )}
      
      {/* ================================================================
          VERIFY FIX LOOP
          ================================================================ */}
      {verifyMode && (
        <section className="border-b-3 border-ink bg-paper-bright" id="verify">
          <div className="max-w-[1400px] mx-auto p-6 lg:p-8">
            <p className="font-mono text-xs text-ink-40 mb-2">FIX → VERIFY LOOP</p>
            <h2 className="font-display text-xl lg:text-2xl mb-4">Paste your fixed code</h2>
            
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Fixed code input */}
              <div>
                <label className="block text-sm font-semibold mb-2">Fixed Code</label>
                <textarea
                  value={fixedCode}
                  onChange={(e) => setFixedCode(e.target.value)}
                  placeholder="Paste your patched code here..."
                  className="w-full h-48 font-mono text-sm p-4 border-3 border-ink resize-none"
                  spellCheck={false}
                />
                <button onClick={handleVerify} className="btn mt-4">
                  Verify Fix
                </button>
              </div>
              
              {/* Verify result */}
              <div>
                {verifyResult ? (
                  <div className={`border-3 p-6 ${verifyResult.improved ? 'border-teal bg-teal/10' : 'border-vermilion bg-vermilion/10'}`}>
                    <p className={`font-semibold text-lg mb-2 ${verifyResult.improved ? 'text-teal' : 'text-vermilion'}`}>
                      {verifyResult.improved ? '✓ Improvement detected' : '✗ No improvement'}
                    </p>
                    <p className="text-sm mb-4">{verifyResult.summary}</p>
                    
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="border-3 border-ink p-3">
                        <p className="font-mono text-2xl font-bold">{verifyResult.before.score}</p>
                        <p className="text-xs text-ink-60">Before</p>
                      </div>
                      <div className="border-3 border-ink p-3">
                        <p className="font-mono text-2xl font-bold">{verifyResult.after.score}</p>
                        <p className="text-xs text-ink-60">After</p>
                      </div>
                    </div>
                    
                    {verifyResult.signalsRemoved.length > 0 && (
                      <div className="mt-4">
                        <p className="text-xs font-mono text-ink-40 mb-1">SIGNALS REMOVED</p>
                        <div className="flex flex-wrap gap-1">
                          {verifyResult.signalsRemoved.map(id => (
                            <span key={id} className="text-xs bg-teal text-paper px-2 py-0.5">{id}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {verifyResult.regressions.length > 0 && (
                      <div className="mt-4">
                        <p className="text-xs font-mono text-vermilion mb-1">⚠️ NEW SIGNALS INTRODUCED</p>
                        <div className="flex flex-wrap gap-1">
                          {verifyResult.regressions.map(id => (
                            <span key={id} className="text-xs bg-vermilion text-paper px-2 py-0.5">{id}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="border-3 border-dashed border-ink-40 p-6 text-center h-full flex items-center justify-center">
                    <p className="text-ink-40">Verify result will appear here</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
      
      {/* ================================================================
          INSTALL SECTION - MCP FOCUSED
          ================================================================ */}
      <section className="border-b-3 border-ink bg-ink text-paper" id="install">
        <div className="max-w-[1400px] mx-auto p-6 lg:p-8">
          <div className="mb-8">
            <p className="font-mono text-xs text-paper/50 mb-2">MCP INSTALLATION</p>
            <h2 className="font-display text-2xl lg:text-3xl mb-3">
              Install the Anti-Slop MCP Server
            </h2>
            <p className="text-paper/70 max-w-2xl">
              Anti-Slop is an MCP (Model Context Protocol) server that integrates directly with Cursor, Claude Code, and other AI coding tools. 
              Run checks on your code without leaving your editor.
            </p>
          </div>
          
          {/* Tool selector tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {(['cursor', 'claude', 'vscode'] as const).map((tool) => (
              <button
                key={tool}
                onClick={() => setActiveInstallTool(tool)}
                className={`px-5 py-3 text-sm font-semibold border-3 transition-colors ${
                  activeInstallTool === tool
                    ? 'bg-paper text-ink border-paper'
                    : 'border-paper/30 text-paper hover:border-paper/60'
                }`}
              >
                {tool === 'cursor' ? '⚡ Cursor' : tool === 'claude' ? '🤖 Claude Code' : '💻 VS Code / CLI'}
              </button>
            ))}
          </div>
          
          <div className="grid lg:grid-cols-[1.2fr,1fr] gap-8">
            {/* Config + Instructions */}
            <div>
              {/* Step 1: Config file */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-6 h-6 bg-vermilion text-paper flex items-center justify-center text-xs font-bold">1</span>
                  <span className="font-semibold">
                    {activeInstallTool === 'cursor' ? 'Add to .cursor/mcp.json' : 
                     activeInstallTool === 'claude' ? 'Add to claude_desktop_config.json' : 'Install globally'}
                  </span>
                </div>
                <div className="bg-paper/10 border border-paper/20 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs text-paper/50">
                      {activeInstallTool === 'cursor' ? '.cursor/mcp.json' : 
                       activeInstallTool === 'claude' ? 'claude_desktop_config.json' : 'Terminal'}
                    </span>
                    <CopyButton text={installSnippets[activeInstallTool]} label="Copy" />
                  </div>
                  <pre className="text-sm font-mono overflow-x-auto whitespace-pre-wrap text-paper/90">
                    {installSnippets[activeInstallTool]}
                  </pre>
                </div>
              </div>
              
              {/* Step 2: Restart */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-6 h-6 bg-vermilion text-paper flex items-center justify-center text-xs font-bold">2</span>
                  <span className="font-semibold">
                    {activeInstallTool === 'vscode' ? 'Run your first check' : 'Restart your editor'}
                  </span>
                </div>
                <p className="text-paper/70 text-sm pl-8">
                  {activeInstallTool === 'cursor' 
                    ? 'Restart Cursor to load the MCP server. You\'ll see "anti-slop" in your MCP tools.'
                    : activeInstallTool === 'claude'
                    ? 'Restart Claude Desktop. The anti-slop tools will be available in your conversation.'
                    : 'The CLI is ready to use immediately after installation.'}
                </p>
              </div>
              
              {/* Step 3: Use it */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-6 h-6 bg-vermilion text-paper flex items-center justify-center text-xs font-bold">3</span>
                  <span className="font-semibold">Run your first check</span>
                </div>
                <div className="bg-paper/10 border border-paper/20 p-4 pl-8">
                  <p className="text-paper/70 text-sm mb-3">Try asking:</p>
                  <div className="space-y-2">
                    <code className="block text-sm font-mono text-vermilion-light">
                      "Check this file for template signals"
                    </code>
                    <code className="block text-sm font-mono text-paper/60">
                      "What makes my landing page look AI-generated?"
                    </code>
                    <code className="block text-sm font-mono text-paper/60">
                      "Suggest patches for the purple gradient"
                    </code>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Available MCP Tools */}
            <div className="bg-paper/5 border border-paper/20 p-6">
              <p className="font-mono text-xs text-paper/50 mb-4">AVAILABLE MCP TOOLS</p>
              
              <div className="space-y-4">
                <div className="border-b border-paper/10 pb-4">
                  <code className="text-vermilion-light font-mono text-sm">check_for_template_signals</code>
                  <p className="text-paper/60 text-sm mt-1">Analyze code for signals that make sites look template-derived. Returns ranked signals with fixes.</p>
                </div>
                
                <div className="border-b border-paper/10 pb-4">
                  <code className="text-vermilion-light font-mono text-sm">suggest_patches</code>
                  <p className="text-paper/60 text-sm mt-1">Get specific code patches to remove a detected signal. Returns minimal, structural, and alternative fixes.</p>
                </div>
                
                <div className="border-b border-paper/10 pb-4">
                  <code className="text-vermilion-light font-mono text-sm">verify_fix</code>
                  <p className="text-paper/60 text-sm mt-1">Compare before/after code. Shows which signals were removed, which remain, and any regressions.</p>
                </div>
                
                <div className="border-b border-paper/10 pb-4">
                  <code className="text-vermilion-light font-mono text-sm">list_signals</code>
                  <p className="text-paper/60 text-sm mt-1">List all detectable template signals with salience levels and descriptions.</p>
                </div>
                
                <div>
                  <code className="text-paper/40 font-mono text-sm">get_escape_kit</code>
                  <p className="text-paper/50 text-sm mt-1">Get a design grammar (editorial, technical, playful) if you're stuck. Use as escape hatch, not default.</p>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-paper/10">
                <a 
                  href="https://github.com/rohunvora/anti-slop-lib" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-paper/60 hover:text-paper"
                >
                  Full documentation on GitHub →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* ================================================================
          PROOF SECTION (lightweight)
          ================================================================ */}
      <section className="border-b-3 border-ink">
        <div className="max-w-[1400px] mx-auto p-6 lg:p-8">
          <div className="flex items-end justify-between mb-6">
            <div>
              <p className="font-mono text-xs text-ink-40 mb-2">PROOF: GOOD SITES AVOID THESE TELLS</p>
              <h2 className="font-display text-xl">Sites that pass the signal check</h2>
            </div>
            <Link href="/gallery" className="font-mono text-sm text-vermilion hover:underline">
              Full gallery →
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { name: 'Linear', url: 'linear.app', avoids: ['Purple gradients', 'Centered hero'], uses: 'Dark theme with restraint' },
              { name: 'Vercel', url: 'vercel.com', avoids: ['Blob backgrounds', 'Generic CTA'], uses: 'Left-aligned hero, product demo' },
              { name: 'Stripe', url: 'stripe.com', avoids: ['Inter-only', 'Shadow cards'], uses: 'Custom type, border-based cards' },
            ].map((site) => (
              <div key={site.name} className="border-3 border-ink p-4">
                <p className="font-mono text-xs text-ink-40 mb-1">{site.url}</p>
                <h3 className="font-display text-lg mb-3">{site.name}</h3>
                <div className="text-xs space-y-1">
                  <p><span className="text-teal">✓ Avoids:</span> {site.avoids.join(', ')}</p>
                  <p><span className="text-ink-60">→ Uses:</span> {site.uses}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* ================================================================
          FAQ / METHODOLOGY
          ================================================================ */}
      <section className="border-b-3 border-ink bg-paper-bright">
        <div className="max-w-[1400px] mx-auto p-6 lg:p-8">
          <p className="font-mono text-xs text-ink-40 mb-2">FAQ + METHODOLOGY</p>
          <h2 className="font-display text-xl mb-6">Common questions</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                q: 'Does this mean my site is bad?',
                a: 'No. These are perception triggers, not design crimes. A purple gradient isn\'t wrong — it just reads as "template" to many viewers.',
              },
              {
                q: 'Can you prove my site was made with AI?',
                a: 'No, and we don\'t try. We detect signals correlated with template/AI outputs. Correlation ≠ causation.',
              },
              {
                q: 'What about Tailwind? Is it bad?',
                a: 'Tailwind is great. The problem is using defaults without customization. Override the theme, don\'t just use it.',
              },
              {
                q: 'How do you rank salience?',
                a: 'Based on how strongly a pattern triggers "template site" perception. Purple gradients are high because they\'re extremely common in AI outputs.',
              },
            ].map((faq, i) => (
              <div key={i} className="border-l-3 border-ink pl-4">
                <h3 className="font-semibold mb-2">{faq.q}</h3>
                <p className="text-sm text-ink-60">{faq.a}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-8 pt-6 border-t-3 border-ink">
            <p className="text-sm text-ink-60">
              <strong>Methodology:</strong> We analyze DOM structure, CSS properties, Tailwind classes, and copy patterns. 
              We rank signals by prevalence in template/AI outputs and distinctiveness impact. 
              <Link href="/signals" className="text-vermilion ml-1 hover:underline">Full signal index →</Link>
            </p>
          </div>
        </div>
      </section>
      
      {/* ================================================================
          SELF-CHECK BADGE
          ================================================================ */}
      <section className="dark-section">
        <div className="max-w-[1400px] mx-auto p-6 lg:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="font-mono text-xs text-paper/50 mb-1">SELF-CHECK</p>
              <p className="text-paper">
                This site runs its own analyzer: <span className="text-teal font-semibold">✓ 0 high-salience signals</span>
              </p>
            </div>
            <div className="flex gap-4">
              <a 
                href="https://github.com/rohunvora/anti-slop-lib" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-4 py-2 border-3 border-paper/30 text-paper hover:border-paper transition-colors text-sm font-semibold"
              >
                GitHub →
              </a>
              <a 
                href="https://npmjs.com/package/anti-slop" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-4 py-2 border-3 border-paper/30 text-paper hover:border-paper transition-colors text-sm font-semibold"
              >
                npm →
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