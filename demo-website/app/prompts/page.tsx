'use client';

import { useState, useMemo } from 'react';

type Step = 'purpose' | 'aesthetic' | 'constraints' | 'generate';

interface FormData {
  purpose: string;
  industry: string;
  targetAudience: string;
  aesthetic: string;
  mood: string;
  colorPreference: 'dark' | 'light' | 'either';
  typography: string;
  hasProduct: boolean;
  avoidList: string[];
  techStack: string;
  priority: 'speed' | 'uniqueness' | 'accessibility';
}

const aestheticOptions = [
  { 
    id: 'premium-dark', 
    name: 'Premium Dark',
    description: 'Deep blacks, single accent glow, technical precision',
    examples: ['linear.app', 'vercel.com', 'stripe.com/atlas'],
    colors: ['#0a0a0a', '#00d4ff', '#ffffff'],
  },
  { 
    id: 'editorial', 
    name: 'Editorial / Magazine',
    description: 'Serif headlines, warm neutrals, intentional typography',
    examples: ['airbnb.design', 'stripe.com/press'],
    colors: ['#FAF7F2', '#2D2A26', '#C4A574'],
  },
  { 
    id: 'neo-brutalist', 
    name: 'Neo-Brutalist',
    description: 'Sharp corners, thick borders, high contrast',
    examples: ['gumroad.com', 'poolsuite.net'],
    colors: ['#FFFFFF', '#000000', '#FF0000'],
  },
  { 
    id: 'minimal', 
    name: 'Extreme Minimal',
    description: 'Maximum whitespace, typography-first, nothing extraneous',
    examples: ['berkeleygraphics.com', 'apple.com'],
    colors: ['#FFFFFF', '#111111', '#666666'],
  },
  { 
    id: 'playful', 
    name: 'Playful / Energetic',
    description: 'Bold colors, bouncy animations, delightful interactions',
    examples: ['notion.so', 'figma.com'],
    colors: ['#FF5722', '#00BCD4', '#FFF8E1'],
  },
  { 
    id: 'immersive', 
    name: '3D / Immersive',
    description: 'WebGL, scroll-driven, experiential',
    examples: ['apple.com/airpods', 'linear.app'],
    colors: ['#0a0a0a', '#00d4ff', '#ff00ff'],
  },
];

const avoidOptions = [
  { id: 'purple-gradient', label: 'Purple/indigo gradients' },
  { id: 'generic-copy', label: 'Generic marketing copy ("Transform your...")' },
  { id: 'rounded-xl', label: 'Over-rounded corners (rounded-3xl everywhere)' },
  { id: 'shadow-lg', label: 'Heavy drop shadows' },
  { id: 'inter-font', label: 'Inter font as sole typeface' },
  { id: 'centered-hero', label: 'Center-aligned hero layouts' },
  { id: 'glassmorphism', label: 'Glassmorphism/blur effects everywhere' },
  { id: 'stock-photos', label: 'Generic stock photography' },
];

const moodOptions = [
  'Professional & trustworthy',
  'Cutting-edge & technical',
  'Warm & approachable',
  'Bold & confident',
  'Quiet & refined',
  'Playful & energetic',
];

const typographyOptions = [
  { id: 'serif-sans', label: 'Serif headlines + Sans body', example: 'Instrument Serif + Inter' },
  { id: 'geometric', label: 'Geometric sans throughout', example: 'Space Grotesk, Anybody' },
  { id: 'mono-accent', label: 'Sans with mono accents', example: 'Inter + JetBrains Mono' },
  { id: 'editorial', label: 'Classic editorial pairing', example: 'Playfair Display + Source Serif' },
  { id: 'modern-grotesque', label: 'Modern grotesque', example: 'Söhne, Untitled Sans' },
];

export default function PromptsPage() {
  const [step, setStep] = useState<Step>('purpose');
  const [formData, setFormData] = useState<FormData>({
    purpose: '',
    industry: '',
    targetAudience: '',
    aesthetic: '',
    mood: '',
    colorPreference: 'either',
    typography: '',
    hasProduct: true,
    avoidList: ['purple-gradient', 'generic-copy', 'rounded-xl'],
    techStack: 'React + Tailwind',
    priority: 'uniqueness',
  });
  const [copied, setCopied] = useState(false);

  const updateForm = (updates: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const toggleAvoid = (id: string) => {
    setFormData(prev => ({
      ...prev,
      avoidList: prev.avoidList.includes(id)
        ? prev.avoidList.filter(x => x !== id)
        : [...prev.avoidList, id],
    }));
  };

  const generatedPrompt = useMemo(() => {
    const aesthetic = aestheticOptions.find(a => a.id === formData.aesthetic);
    const typography = typographyOptions.find(t => t.id === formData.typography);
    
    const parts: string[] = [];
    
    // Header
    parts.push(`Create a ${formData.purpose || '[describe your project]'} website.`);
    if (formData.industry) {
      parts.push(`Industry: ${formData.industry}.`);
    }
    if (formData.targetAudience) {
      parts.push(`Target audience: ${formData.targetAudience}.`);
    }
    parts.push('');
    
    // Aesthetic
    if (aesthetic) {
      parts.push(`AESTHETIC: ${aesthetic.name}`);
      parts.push(aesthetic.description);
      parts.push(`Reference sites: ${aesthetic.examples.join(', ')}`);
      parts.push(`Color palette: ${aesthetic.colors.join(', ')}`);
      parts.push('');
    }
    
    // Mood
    if (formData.mood) {
      parts.push(`MOOD: ${formData.mood}`);
      parts.push('');
    }
    
    // Color preference
    parts.push(`COLOR SCHEME: ${
      formData.colorPreference === 'dark' 
        ? 'Dark mode - use #0a0a0a to #111111 backgrounds, high contrast text'
        : formData.colorPreference === 'light'
        ? 'Light mode - use off-white (#FAF7F2 or similar), not pure white'
        : 'Designer\'s choice based on aesthetic'
    }`);
    parts.push('');
    
    // Typography
    if (typography) {
      parts.push(`TYPOGRAPHY: ${typography.label}`);
      parts.push(`Suggestion: ${typography.example}`);
      parts.push('- Headlines should have visual weight and character');
      parts.push('- Body text: 16-18px, 1.5-1.7 line height');
      parts.push('- Consider a monospace font for technical elements');
      parts.push('');
    }
    
    // Layout
    parts.push('LAYOUT REQUIREMENTS:');
    if (formData.hasProduct) {
      parts.push('- Asymmetric hero with product screenshot/visual on one side');
      parts.push('- Use grid ratios like 1.2fr:1fr for subtle imbalance');
    } else {
      parts.push('- Text-focused hero with strong typographic hierarchy');
    }
    parts.push('- Left-align primary content for natural reading flow');
    parts.push('- Generous whitespace (py-16 to py-24 for sections)');
    parts.push('- Sticky navigation with subtle blur effect');
    parts.push('');
    
    // Interactions
    parts.push('INTERACTIONS:');
    parts.push('- Multi-property hover states (transform + shadow, not just color)');
    parts.push('- Subtle scroll-triggered animations');
    parts.push('- Active/pressed states on buttons');
    parts.push('- Focus states visible for keyboard navigation');
    parts.push('');
    
    // Anti-slop
    if (formData.avoidList.length > 0) {
      parts.push('ANTI-SLOP (STRICTLY AVOID):');
      formData.avoidList.forEach(id => {
        const option = avoidOptions.find(o => o.id === id);
        if (option) {
          parts.push(`• NO ${option.label}`);
        }
      });
      parts.push('');
    }
    
    // Accessibility
    parts.push('ACCESSIBILITY REQUIREMENTS:');
    parts.push('- Minimum 4.5:1 color contrast ratio for text');
    parts.push('- Focus-visible outlines on all interactive elements');
    parts.push('- Semantic HTML structure (proper heading hierarchy)');
    parts.push('- Skip link for keyboard users');
    parts.push('- Alt text for all images');
    parts.push('');
    
    // Tech stack
    if (formData.techStack) {
      parts.push(`TECH STACK: ${formData.techStack}`);
      parts.push('');
    }
    
    // Priority
    parts.push(`OPTIMIZATION PRIORITY: ${
      formData.priority === 'speed' 
        ? 'Performance - minimize JS, optimize images, fast load times'
        : formData.priority === 'accessibility'
        ? 'Accessibility - WCAG 2.1 AA compliance, screen reader tested'
        : 'Uniqueness - distinctive design that stands out from templates'
    }`);
    
    return parts.join('\n');
  }, [formData]);

  const copyPrompt = async () => {
    await navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const steps = [
    { id: 'purpose', label: '1. Purpose', complete: !!formData.purpose },
    { id: 'aesthetic', label: '2. Aesthetic', complete: !!formData.aesthetic },
    { id: 'constraints', label: '3. Constraints', complete: true },
    { id: 'generate', label: '4. Generate', complete: false },
  ];

  return (
    <>
      {/* Hero */}
      <section className="border-b-2 border-ink">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-16 lg:py-20">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-vermilion mb-4">
              Prompt Lab
            </p>
            <h1 className="font-display text-4xl lg:text-5xl mb-6">
              Generate AI prompts that<br/>
              <span className="italic">actually</span> avoid slop.
            </h1>
            <p className="text-lg text-ink-60 leading-relaxed">
              Answer a few questions about your project, and we'll generate a comprehensive 
              prompt with built-in anti-slop constraints. Copy it into Claude, ChatGPT, 
              or Cursor and start building something distinctive.
            </p>
          </div>
        </div>
      </section>
      
      {/* Step indicator */}
      <section className="border-b-2 border-border bg-paper-warm">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
          <div className="flex">
            {steps.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setStep(s.id as Step)}
                className={`flex-1 py-4 text-sm font-semibold uppercase tracking-wider border-b-3 transition-colors ${
                  step === s.id 
                    ? 'border-vermilion text-ink' 
                    : s.complete 
                    ? 'border-teal text-ink-60 hover:text-ink'
                    : 'border-transparent text-ink-40 hover:text-ink-60'
                }`}
              >
                {s.label}
                {s.complete && s.id !== 'generate' && (
                  <span className="ml-2 text-teal">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>
      
      {/* Form content */}
      <section className="max-w-[1600px] mx-auto px-6 lg:px-10 py-12">
        <div className="grid lg:grid-cols-[1fr,400px] gap-12">
          {/* Form */}
          <div>
            {step === 'purpose' && (
              <div className="space-y-8 animate-fade-in">
                <div>
                  <label className="block text-sm font-semibold uppercase tracking-wider text-ink-60 mb-3">
                    What are you building? *
                  </label>
                  <input
                    type="text"
                    value={formData.purpose}
                    onChange={(e) => updateForm({ purpose: e.target.value })}
                    placeholder="e.g., SaaS landing page, portfolio, documentation site"
                    className="w-full px-4 py-3 bg-paper-bright border-2 border-ink focus:outline-none focus:border-vermilion text-lg"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold uppercase tracking-wider text-ink-60 mb-3">
                    Industry / Domain
                  </label>
                  <input
                    type="text"
                    value={formData.industry}
                    onChange={(e) => updateForm({ industry: e.target.value })}
                    placeholder="e.g., Developer tools, Healthcare, Finance, Creative agency"
                    className="w-full px-4 py-3 bg-paper-bright border-2 border-ink focus:outline-none focus:border-vermilion"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold uppercase tracking-wider text-ink-60 mb-3">
                    Target Audience
                  </label>
                  <input
                    type="text"
                    value={formData.targetAudience}
                    onChange={(e) => updateForm({ targetAudience: e.target.value })}
                    placeholder="e.g., Seed-stage startup founders, Enterprise developers, Design teams"
                    className="w-full px-4 py-3 bg-paper-bright border-2 border-ink focus:outline-none focus:border-vermilion"
                  />
                  <p className="mt-2 text-sm text-ink-40">
                    Be specific. "Developers" is generic; "Backend engineers at Series A startups" is distinctive.
                  </p>
                </div>
                
                <div className="flex items-center gap-4">
                  <input
                    type="checkbox"
                    id="hasProduct"
                    checked={formData.hasProduct}
                    onChange={(e) => updateForm({ hasProduct: e.target.checked })}
                    className="w-5 h-5 border-2 border-ink accent-vermilion"
                  />
                  <label htmlFor="hasProduct" className="text-sm">
                    I have a product visual (screenshot, mockup, demo) to showcase
                  </label>
                </div>
                
                <button
                  onClick={() => setStep('aesthetic')}
                  disabled={!formData.purpose}
                  className="btn-hard disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue to Aesthetic →
                </button>
              </div>
            )}
            
            {step === 'aesthetic' && (
              <div className="space-y-8 animate-fade-in">
                <div>
                  <label className="block text-sm font-semibold uppercase tracking-wider text-ink-60 mb-4">
                    Choose an aesthetic direction *
                  </label>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {aestheticOptions.map(option => (
                      <button
                        key={option.id}
                        onClick={() => updateForm({ aesthetic: option.id })}
                        className={`anti-card text-left p-5 transition-all ${
                          formData.aesthetic === option.id 
                            ? 'border-vermilion bg-vermilion/5' 
                            : 'hover:border-ink-60'
                        }`}
                      >
                        <div className="flex gap-2 mb-3">
                          {option.colors.map((color, i) => (
                            <div
                              key={i}
                              className="w-5 h-5 border border-ink"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                        <h3 className="font-semibold mb-1">{option.name}</h3>
                        <p className="text-sm text-ink-60 mb-2">{option.description}</p>
                        <p className="text-xs text-ink-40 font-mono">
                          {option.examples.join(' · ')}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold uppercase tracking-wider text-ink-60 mb-3">
                    Mood / Personality
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {moodOptions.map(mood => (
                      <button
                        key={mood}
                        onClick={() => updateForm({ mood })}
                        className={`tag transition-colors ${
                          formData.mood === mood 
                            ? 'bg-ink text-paper' 
                            : 'tag-primary hover:bg-ink hover:text-paper'
                        }`}
                      >
                        {mood}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold uppercase tracking-wider text-ink-60 mb-3">
                    Color scheme preference
                  </label>
                  <div className="flex gap-4">
                    {(['dark', 'light', 'either'] as const).map(pref => (
                      <button
                        key={pref}
                        onClick={() => updateForm({ colorPreference: pref })}
                        className={`px-6 py-3 border-2 font-semibold uppercase tracking-wider text-sm transition-colors ${
                          formData.colorPreference === pref
                            ? 'bg-ink text-paper border-ink'
                            : 'border-ink hover:bg-ink hover:text-paper'
                        }`}
                      >
                        {pref === 'either' ? "Designer's choice" : `${pref} mode`}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold uppercase tracking-wider text-ink-60 mb-4">
                    Typography style
                  </label>
                  <div className="space-y-2">
                    {typographyOptions.map(option => (
                      <button
                        key={option.id}
                        onClick={() => updateForm({ typography: option.id })}
                        className={`w-full text-left p-4 border-2 transition-colors ${
                          formData.typography === option.id
                            ? 'border-vermilion bg-vermilion/5'
                            : 'border-ink hover:bg-paper-warm'
                        }`}
                      >
                        <span className="font-semibold">{option.label}</span>
                        <span className="text-ink-40 ml-3 font-mono text-sm">
                          {option.example}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <button
                    onClick={() => setStep('purpose')}
                    className="btn-ghost"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={() => setStep('constraints')}
                    disabled={!formData.aesthetic}
                    className="btn-hard disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue to Constraints →
                  </button>
                </div>
              </div>
            )}
            
            {step === 'constraints' && (
              <div className="space-y-8 animate-fade-in">
                <div>
                  <label className="block text-sm font-semibold uppercase tracking-wider text-ink-60 mb-4">
                    What should the AI avoid? (Anti-slop checklist)
                  </label>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {avoidOptions.map(option => (
                      <button
                        key={option.id}
                        onClick={() => toggleAvoid(option.id)}
                        className={`flex items-center gap-3 p-4 border-2 text-left transition-colors ${
                          formData.avoidList.includes(option.id)
                            ? 'border-vermilion bg-vermilion/5'
                            : 'border-ink-20 hover:border-ink'
                        }`}
                      >
                        <span className={`w-5 h-5 border-2 flex items-center justify-center text-xs ${
                          formData.avoidList.includes(option.id)
                            ? 'border-vermilion bg-vermilion text-paper'
                            : 'border-ink'
                        }`}>
                          {formData.avoidList.includes(option.id) && '✕'}
                        </span>
                        <span className="text-sm">{option.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold uppercase tracking-wider text-ink-60 mb-3">
                    Tech stack
                  </label>
                  <input
                    type="text"
                    value={formData.techStack}
                    onChange={(e) => updateForm({ techStack: e.target.value })}
                    placeholder="e.g., Next.js + Tailwind, Astro, Vue + UnoCSS"
                    className="w-full px-4 py-3 bg-paper-bright border-2 border-ink focus:outline-none focus:border-vermilion"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold uppercase tracking-wider text-ink-60 mb-3">
                    Optimization priority
                  </label>
                  <div className="flex flex-wrap gap-4">
                    {([
                      { id: 'uniqueness', label: 'Uniqueness', desc: 'Stand out from templates' },
                      { id: 'speed', label: 'Performance', desc: 'Fast load times' },
                      { id: 'accessibility', label: 'Accessibility', desc: 'WCAG compliant' },
                    ] as const).map(pref => (
                      <button
                        key={pref.id}
                        onClick={() => updateForm({ priority: pref.id })}
                        className={`flex-1 min-w-[150px] p-4 border-2 text-left transition-colors ${
                          formData.priority === pref.id
                            ? 'border-teal bg-teal/5'
                            : 'border-ink hover:bg-paper-warm'
                        }`}
                      >
                        <span className="font-semibold block">{pref.label}</span>
                        <span className="text-sm text-ink-60">{pref.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <button
                    onClick={() => setStep('aesthetic')}
                    className="btn-ghost"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={() => setStep('generate')}
                    className="btn-hard"
                  >
                    Generate Prompt →
                  </button>
                </div>
              </div>
            )}
            
            {step === 'generate' && (
              <div className="space-y-8 animate-fade-in">
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-2xl">Your Custom Prompt</h2>
                  <button
                    onClick={copyPrompt}
                    className={`btn-hard ${
                      copied ? 'bg-teal border-teal' : ''
                    }`}
                  >
                    {copied ? '✓ Copied!' : 'Copy Prompt'}
                  </button>
                </div>
                
                <div className="code-block p-6">
                  <pre className="whitespace-pre-wrap text-sm">{generatedPrompt}</pre>
                </div>
                
                <div className="p-6 bg-paper-warm border-l-4 border-vermilion">
                  <h3 className="font-semibold mb-2">How to use this prompt</h3>
                  <ol className="text-sm text-ink-60 space-y-2">
                    <li><span className="font-mono text-vermilion">1.</span> Copy the prompt above</li>
                    <li><span className="font-mono text-vermilion">2.</span> Paste into Claude, ChatGPT, or Cursor</li>
                    <li><span className="font-mono text-vermilion">3.</span> Add any additional context about your specific features</li>
                    <li><span className="font-mono text-vermilion">4.</span> If the AI generates slop anyway, point it back to the ANTI-SLOP section</li>
                  </ol>
                </div>
                
                <button
                  onClick={() => setStep('purpose')}
                  className="btn-ghost"
                >
                  ← Start Over
                </button>
              </div>
            )}
          </div>
          
          {/* Live preview sidebar */}
          <div className="hidden lg:block">
            <div className="sticky top-32">
              <div className="anti-card p-6">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-60 mb-4">
                  Live Preview
                </h3>
                <div className="code-block p-4 text-xs max-h-[500px] overflow-y-auto">
                  <pre className="whitespace-pre-wrap">{generatedPrompt}</pre>
                </div>
              </div>
              
              <div className="mt-6 p-4 border-l-4 border-teal">
                <p className="text-sm text-ink-60">
                  <strong className="text-ink">Pro tip:</strong> The more specific you are about 
                  your audience and purpose, the better the AI will understand how to differentiate 
                  your design.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
