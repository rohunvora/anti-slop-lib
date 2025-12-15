'use client';

import { useState } from 'react';

interface Pattern {
  id: string;
  name: string;
  category: 'colors' | 'typography' | 'layout' | 'components' | 'effects';
  slop: {
    description: string;
    code: string;
    visual?: string;
  };
  antiSlop: {
    description: string;
    code: string;
    visual?: string;
    reference?: string;
  };
}

const patterns: Pattern[] = [
  {
    id: 'purple-gradient',
    name: 'Hero Gradient',
    category: 'colors',
    slop: {
      description: 'Generic purple/indigo gradient that screams "AI generated"',
      code: `<div className="bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600">
  <h1 className="text-white text-center">
    Transform Your Workflow
  </h1>
</div>`,
    },
    antiSlop: {
      description: 'Solid color with intentional accent, or warm editorial palette',
      code: `<div className="bg-[#0a0a0a]">
  <h1 className="text-white">
    <span className="text-[#00d4ff]">Ship faster.</span> Build better.
  </h1>
</div>

/* Or editorial style */
<div className="bg-[#FAF7F2]">
  <h1 className="font-serif text-[#2D2A26]">
    The future of design systems
  </h1>
</div>`,
      reference: 'https://linear.app',
    },
  },
  {
    id: 'inter-only',
    name: 'Typography',
    category: 'typography',
    slop: {
      description: 'Inter font everywhere, no character',
      code: `font-family: 'Inter', sans-serif;
/* Everything is Inter, 
   no hierarchy through font choice */`,
    },
    antiSlop: {
      description: 'Intentional font pairing with personality',
      code: `/* Serif headlines + Sans body */
h1 { font-family: 'Fraunces', serif; }
body { font-family: 'Inter', sans-serif; }

/* Or distinctive sans */
h1 { font-family: 'Space Grotesk', sans-serif; }
code { font-family: 'JetBrains Mono', monospace; }`,
      reference: 'https://roasted.design',
    },
  },
  {
    id: 'rounded-cards',
    name: 'Card Design',
    category: 'components',
    slop: {
      description: 'rounded-xl + shadow-lg on everything',
      code: `<div className="rounded-xl shadow-lg bg-white p-6">
  <h3>Feature</h3>
  <p className="text-gray-600">Description</p>
</div>`,
    },
    antiSlop: {
      description: 'Sharp corners with borders, or subtle elevation',
      code: `/* Sharp + borders */
<div className="border border-neutral-200 bg-white p-6">
  <h3>Feature</h3>
  <p className="text-neutral-600">Description</p>
</div>

/* Or subtle dark mode */
<div className="bg-[#141414] border border-white/10 rounded-lg p-6">
  <h3 className="text-white">Feature</h3>
</div>`,
      reference: 'https://vercel.com',
    },
  },
  {
    id: 'centered-hero',
    name: 'Hero Layout',
    category: 'layout',
    slop: {
      description: 'Everything centered with generic copy',
      code: `<section className="text-center py-20">
  <h1>Transform Your Business</h1>
  <p>AI-powered solutions for modern teams</p>
  <button>Get Started Free</button>
</section>`,
    },
    antiSlop: {
      description: 'Asymmetric layout with specific copy',
      code: `<section className="grid lg:grid-cols-2 gap-12 py-20">
  <div className="text-left">
    <h1 className="text-5xl font-bold">
      Issue tracking<br/>
      <span className="text-neutral-400">for modern teams</span>
    </h1>
    <p>Streamline your workflow with keyboard-first design.</p>
  </div>
  <div className="relative">
    <img src="/product-screenshot.png" />
  </div>
</section>`,
      reference: 'https://linear.app',
    },
  },
  {
    id: 'glassmorphism',
    name: 'Glass Effect',
    category: 'effects',
    slop: {
      description: 'Backdrop blur on everything',
      code: `<div className="backdrop-blur-xl bg-white/10 rounded-2xl">
  <!-- Generic glass card -->
</div>`,
    },
    antiSlop: {
      description: 'Use sparingly for specific UI (nav, modals), solid otherwise',
      code: `/* Glass only for nav */
<nav className="fixed backdrop-blur-md bg-white/80 border-b">
  ...
</nav>

/* Solid for content */
<div className="bg-white border shadow-sm rounded-lg">
  ...
</div>`,
      reference: 'https://vercel.com',
    },
  },
  {
    id: 'hover-states',
    name: 'Hover Effects',
    category: 'effects',
    slop: {
      description: 'Just color change on hover',
      code: `<button className="bg-blue-600 hover:bg-blue-700">
  Click me
</button>`,
    },
    antiSlop: {
      description: 'Multi-property transitions, lift effects, scale',
      code: `<button className="
  bg-neutral-900 text-white 
  hover:scale-[1.02] hover:shadow-lg
  active:scale-[0.98]
  transition-all duration-150
">
  Click me
</button>

/* Card hover */
<div className="
  hover:-translate-y-1 
  hover:shadow-xl 
  hover:border-neutral-300
  transition-all
">`,
      reference: 'https://notion.so',
    },
  },
  {
    id: 'generic-copy',
    name: 'Copy & Messaging',
    category: 'typography',
    slop: {
      description: 'Generic AI marketing speak',
      code: `"Transform your workflow"
"AI-powered solutions"
"Supercharge your productivity"
"Trusted by 10,000+ users"
"Get Started Free"`,
    },
    antiSlop: {
      description: 'Specific, concrete value propositions',
      code: `"Issue tracking for modern teams"
"Collaborative docs that don't suck"
"Design tools that feel like magic"
"See your codebase in 3D"
"Try free for 14 days"`,
      reference: 'https://linear.app',
    },
  },
];

const categories = [
  { id: 'all', name: 'All' },
  { id: 'colors', name: 'Colors' },
  { id: 'typography', name: 'Typography' },
  { id: 'layout', name: 'Layout' },
  { id: 'components', name: 'Components' },
  { id: 'effects', name: 'Effects' },
];

export default function PatternsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showSlop, setShowSlop] = useState<Record<string, boolean>>({});

  const filteredPatterns = selectedCategory === 'all' 
    ? patterns 
    : patterns.filter(p => p.category === selectedCategory);

  const togglePattern = (id: string) => {
    setShowSlop(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Slop vs. Anti-Slop Patterns</h1>
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
          Side-by-side comparisons of generic AI aesthetics vs. intentional, distinctive design choices.
        </p>
      </div>
      
      {/* Category filter */}
      <div className="flex justify-center gap-2 mb-12">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              selectedCategory === cat.id
                ? 'bg-neutral-900 text-white'
                : 'text-neutral-600 hover:bg-neutral-100'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>
      
      {/* Patterns grid */}
      <div className="space-y-8">
        {filteredPatterns.map(pattern => (
          <div key={pattern.id} className="border border-neutral-200 rounded-2xl overflow-hidden">
            {/* Pattern header */}
            <div className="flex items-center justify-between px-6 py-4 bg-neutral-50 border-b border-neutral-200">
              <div>
                <h2 className="font-semibold text-lg">{pattern.name}</h2>
                <span className="text-sm text-neutral-500 capitalize">{pattern.category}</span>
              </div>
              <button
                onClick={() => togglePattern(pattern.id)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  showSlop[pattern.id]
                    ? 'bg-red-100 text-red-700'
                    : 'bg-green-100 text-green-700'
                }`}
              >
                {showSlop[pattern.id] ? '🚫 Showing Slop' : '✓ Showing Anti-Slop'}
              </button>
            </div>
            
            {/* Pattern content */}
            <div className="grid md:grid-cols-2 divide-x divide-neutral-200">
              {/* Slop side */}
              <div className={`p-6 ${showSlop[pattern.id] ? 'bg-red-50/50' : 'bg-white opacity-50'}`}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-red-500 text-lg">🚫</span>
                  <h3 className="font-medium text-red-700">Slop</h3>
                </div>
                <p className="text-sm text-neutral-600 mb-4">{pattern.slop.description}</p>
                <pre className="text-xs bg-neutral-900 text-neutral-300 p-4 rounded-lg overflow-x-auto">
                  <code>{pattern.slop.code}</code>
                </pre>
              </div>
              
              {/* Anti-slop side */}
              <div className={`p-6 ${!showSlop[pattern.id] ? 'bg-green-50/50' : 'bg-white opacity-50'}`}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-green-500 text-lg">✓</span>
                  <h3 className="font-medium text-green-700">Anti-Slop</h3>
                </div>
                <p className="text-sm text-neutral-600 mb-4">{pattern.antiSlop.description}</p>
                <pre className="text-xs bg-neutral-900 text-neutral-300 p-4 rounded-lg overflow-x-auto">
                  <code>{pattern.antiSlop.code}</code>
                </pre>
                {pattern.antiSlop.reference && (
                  <a
                    href={pattern.antiSlop.reference}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-3 text-xs text-blue-600 hover:underline"
                  >
                    See example →
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

