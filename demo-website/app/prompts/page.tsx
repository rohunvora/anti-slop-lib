'use client';

import { useState } from 'react';

interface StylePrompt {
  id: string;
  name: string;
  vibe: string;
  description: string;
  prompt: string;
  antiSlop: string[];
  colors: string[];
  fonts: string[];
  examples: string[];
}

const stylePrompts: StylePrompt[] = [
  {
    id: 'godly-dark',
    name: 'Premium Dark',
    vibe: 'Technical, precise, premium',
    description: 'Deep blacks, single accent glow, refined interactions. Think Linear, Vercel, Stripe.',
    prompt: `Create a PREMIUM DARK website with intentional, sophisticated design.

COLORS:
- Background: #0a0a0a (deep black) to #111111
- Surfaces: #141414 with subtle rgba(255,255,255,0.05) borders
- Accent: ONE vibrant color with glow effect (choose: electric blue #00d4ff, lime #84ff00, or violet #8b5cf6)
- Text: #ffffff for headings, #a1a1a1 for body

TYPOGRAPHY:
- Headlines: Geist or Inter, tight tracking (-0.02em), bold weights
- Body: Inter or system-ui, 15-16px, relaxed line-height
- Accents: JetBrains Mono for technical elements

LAYOUT:
- Generous whitespace (py-24 to py-32 for sections)
- Asymmetric hero with product screenshot
- Cards with subtle borders, no heavy shadows
- Sticky navigation with backdrop-blur

EFFECTS:
- Subtle hover lift (translateY -2px)
- Gradient glow behind key elements
- Smooth scroll-triggered animations
- Noise texture overlay (optional)

ANTI-SLOP:
- NO purple gradients
- NO generic "Transform your business" copy
- NO rounded-3xl everything
- NO gradient text on dark backgrounds`,
    antiSlop: [
      'Purple/indigo gradients',
      'Generic marketing copy',
      'Over-rounded corners',
      'Gradient text abuse',
    ],
    colors: ['#0a0a0a', '#00d4ff', '#ffffff'],
    fonts: ['Geist', 'Inter', 'JetBrains Mono'],
    examples: ['linear.app', 'vercel.com', 'stripe.com'],
  },
  {
    id: 'editorial',
    name: 'Editorial / Magazine',
    vibe: 'Refined, intellectual, timeless',
    description: 'Serif headlines, warm neutrals, intentional typography. Think luxury publications.',
    prompt: `Create an EDITORIAL website with magazine-quality typography and layout.

COLORS:
- Background: #FAF7F2 (warm off-white) or #F5F1EB
- Text: #2D2A26 (warm black) for headlines
- Body: #5C5751 (warm gray)
- Accent: #C4A574 (muted gold) or #8B7355 (warm brown)

TYPOGRAPHY:
- Headlines: Serif font (Fraunces, Playfair Display, or Editorial New)
- Tight headlines, large sizes (48-72px)
- Body: 18px, generous line-height (1.7-1.8)
- Pull quotes with oversized quotation marks

LAYOUT:
- Column-based layouts with intentional asymmetry
- Large hero images with editorial crop
- Text wrapping around images
- Generous margins (max-w-3xl for reading)

EFFECTS:
- Subtle parallax on images
- Elegant page transitions
- Hover underline animations on links
- No flashy animations

ANTI-SLOP:
- NO sans-serif everything
- NO centered everything
- NO stock photography vibes
- NO blue CTAs on cream backgrounds`,
    antiSlop: [
      'Sans-serif only typography',
      'Everything centered',
      'Stock photo aesthetic',
      'Bright blue buttons',
    ],
    colors: ['#FAF7F2', '#2D2A26', '#C4A574'],
    fonts: ['Fraunces', 'Editorial New', 'Inter'],
    examples: ['stripe.com/press', 'airbnb.design'],
  },
  {
    id: 'brutalist',
    name: 'Neo-Brutalist',
    vibe: 'Bold, raw, unapologetic',
    description: 'Sharp corners, heavy borders, high contrast. Intentionally rough aesthetics.',
    prompt: `Create a NEO-BRUTALIST website with bold, intentional rawness.

COLORS:
- Background: #FFFFFF or solid saturated colors
- Borders: #000000, 2-4px thick
- Accents: Bold primaries (#FF0000, #0000FF, #FFFF00)
- Use solid fills, no gradients

TYPOGRAPHY:
- Headlines: Heavy weight (800-900), ALL CAPS optional
- Monospace accents (Space Mono, JetBrains Mono)
- Sharp, geometric fonts (Space Grotesk, Archivo Black)
- Large type, 64px+ for heroes

LAYOUT:
- Hard grid with visible structure
- Cards with thick black borders, no shadows
- Overlapping elements intentionally
- Boxes inside boxes

EFFECTS:
- Hard drop shadows (4px 4px 0 #000)
- No hover transitions OR very fast (100ms)
- Click feedback with background color swap
- Cursor changes on interactive elements

ANTI-SLOP:
- NO subtle anything
- NO rounded corners (border-radius: 0)
- NO gradients or glows
- NO glass effects or blur`,
    antiSlop: [
      'Subtle design choices',
      'Rounded corners',
      'Gradients',
      'Blur/glass effects',
    ],
    colors: ['#FFFFFF', '#000000', '#FF0000'],
    fonts: ['Space Grotesk', 'Space Mono', 'Archivo Black'],
    examples: ['gumroad.com', 'hicetnunc.xyz'],
  },
  {
    id: 'playful',
    name: 'Playful / Fun',
    vibe: 'Energetic, delightful, memorable',
    description: 'Bold colors, bouncy animations, unexpected interactions. Joy in every pixel.',
    prompt: `Create a PLAYFUL website that delights and surprises users.

COLORS:
- Bright, saturated palette (not pastel)
- Primary: Bold choice (#FF5722, #00BCD4, #E91E63)
- Background: Light but not white (#FFF8E1, #E8F5E9)
- Mix 3-4 accent colors confidently

TYPOGRAPHY:
- Rounded or friendly fonts (Nunito, Quicksand, DM Sans)
- Variable font weights for expression
- Emoji and icons as design elements
- Playful copywriting tone

LAYOUT:
- Organic shapes (blob backgrounds, wavy dividers)
- Cards that tilt or bounce on hover
- Scattered/rotated elements
- Generous whitespace for breathing room

EFFECTS:
- Bouncy spring animations (framer-motion)
- Confetti or particle effects on actions
- Cursor trails or custom cursors
- Sound effects (optional, toggle-able)
- Micro-interactions everywhere

ANTI-SLOP:
- NO corporate blue/gray
- NO stiff grid layouts
- NO serious/formal tone
- NO generic icons`,
    antiSlop: [
      'Corporate color schemes',
      'Rigid grid layouts',
      'Formal tone',
      'Generic iconography',
    ],
    colors: ['#FF5722', '#00BCD4', '#FFF8E1'],
    fonts: ['Nunito', 'Quicksand', 'DM Sans'],
    examples: ['notion.so', 'figma.com'],
  },
  {
    id: 'minimal',
    name: 'Extreme Minimal',
    vibe: 'Quiet, focused, essential',
    description: 'Maximum whitespace, typography-first, nothing extraneous.',
    prompt: `Create an EXTREME MINIMAL website where every element earns its place.

COLORS:
- Background: #FFFFFF or #FAFAFA
- Text: #111111 for headlines, #666666 for body
- Accent: ONE color, used sparingly (single link color)
- Maximum 3 colors total

TYPOGRAPHY:
- One font family only (exceptional choice matters)
- Suggested: Söhne, Untitled Sans, or high-quality system font
- Limited weights (regular + medium only)
- Size hierarchy through spacing, not scale

LAYOUT:
- Extreme whitespace (50%+ of viewport)
- Single column where possible
- No cards - content flows naturally
- Navigation as simple text links

EFFECTS:
- No animations OR single subtle transition
- Hover states: underline or slight opacity change
- No shadows, no borders (or 1px max)
- Focus on content, not container

ANTI-SLOP:
- NO decorative elements
- NO colorful accents
- NO rounded buttons
- NO card-based layouts
- NO icons if text works`,
    antiSlop: [
      'Decorative elements',
      'Multiple accent colors',
      'Heavy UI chrome',
      'Unnecessary icons',
    ],
    colors: ['#FFFFFF', '#111111', '#666666'],
    fonts: ['Söhne', 'Untitled Sans', 'System UI'],
    examples: ['apple.com', 'berkeleygraphics.com'],
  },
  {
    id: 'immersive',
    name: '3D / Immersive',
    vibe: 'Experiential, cutting-edge, memorable',
    description: 'WebGL, Three.js, scroll-driven experiences. Push browser limits.',
    prompt: `Create an IMMERSIVE website with 3D elements and scroll-driven storytelling.

TECHNICAL:
- Three.js or React Three Fiber for 3D
- GSAP ScrollTrigger for scroll animations
- Canvas or WebGL background
- Lenis for smooth scrolling

VISUAL:
- 3D product visualization or environment
- Parallax depth layers
- Dynamic lighting effects
- Particle systems or volumetric effects

COLORS:
- Dark mode preferred (3D pops better)
- Accent colors as light sources
- Depth through color gradients
- Atmospheric haze effects

INTERACTION:
- Mouse-driven camera or element movement
- Scroll-triggered scene changes
- Progressive reveal of 3D elements
- Loading state as part of experience

PERFORMANCE:
- Lazy load 3D assets
- Fallback for low-end devices
- Preload critical textures
- 60fps target, graceful degradation

ANTI-SLOP:
- NO gratuitous 3D (must serve content)
- NO slow/janky scroll
- NO blocking the page with loading
- NO mobile-unfriendly only`,
    antiSlop: [
      'Gratuitous 3D effects',
      'Janky scroll performance',
      'Blocking loading screens',
      'Desktop-only experiences',
    ],
    colors: ['#0a0a0a', '#00d4ff', '#ff00ff'],
    fonts: ['Geist', 'Inter'],
    examples: ['linear.app', 'apple.com/airpods'],
  },
];

export default function PromptsPage() {
  const [selectedPrompt, setSelectedPrompt] = useState<StylePrompt | null>(null);
  const [copied, setCopied] = useState(false);

  const copyPrompt = async (prompt: string) => {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Style Prompts</h1>
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
          Copy-paste these prompts into Claude, ChatGPT, or Cursor to generate distinctive, anti-slop designs.
        </p>
      </div>

      {/* Grid of style cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {stylePrompts.map((style) => (
          <button
            key={style.id}
            onClick={() => setSelectedPrompt(style)}
            className={`text-left p-6 rounded-2xl border-2 transition-all hover:shadow-lg ${
              selectedPrompt?.id === style.id
                ? 'border-neutral-900 bg-neutral-50'
                : 'border-neutral-200 hover:border-neutral-300'
            }`}
          >
            {/* Color swatches */}
            <div className="flex gap-1.5 mb-4">
              {style.colors.map((color, i) => (
                <div
                  key={i}
                  className="w-6 h-6 rounded-full border border-neutral-200"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            
            <h3 className="font-semibold text-lg mb-1">{style.name}</h3>
            <p className="text-sm text-neutral-500 mb-3">{style.vibe}</p>
            <p className="text-sm text-neutral-600 line-clamp-2">{style.description}</p>
            
            {/* Font tags */}
            <div className="mt-4 flex flex-wrap gap-1.5">
              {style.fonts.slice(0, 2).map((font) => (
                <span 
                  key={font}
                  className="px-2 py-0.5 text-xs bg-neutral-100 rounded-full"
                >
                  {font}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>

      {/* Selected prompt detail */}
      {selectedPrompt && (
        <div className="border border-neutral-200 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 bg-neutral-50 border-b border-neutral-200">
            <div>
              <h2 className="font-semibold text-xl">{selectedPrompt.name}</h2>
              <p className="text-sm text-neutral-500">{selectedPrompt.vibe}</p>
            </div>
            <button
              onClick={() => copyPrompt(selectedPrompt.prompt)}
              className={`flex items-center gap-2 px-4 py-2 font-medium rounded-lg transition-colors ${
                copied
                  ? 'bg-green-500 text-white'
                  : 'bg-neutral-900 text-white hover:bg-neutral-800'
              }`}
            >
              {copied ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy Prompt
                </>
              )}
            </button>
          </div>
          
          <div className="p-6">
            <div className="grid lg:grid-cols-[1fr,300px] gap-8">
              {/* Prompt */}
              <div>
                <h3 className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-3">
                  Full Prompt
                </h3>
                <pre className="text-sm bg-neutral-900 text-neutral-300 p-4 rounded-xl overflow-x-auto whitespace-pre-wrap font-mono">
                  {selectedPrompt.prompt}
                </pre>
              </div>
              
              {/* Sidebar */}
              <div className="space-y-6">
                {/* Anti-slop */}
                <div>
                  <h3 className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-3">
                    Avoid (Anti-Slop)
                  </h3>
                  <ul className="space-y-2">
                    {selectedPrompt.antiSlop.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="text-red-500 mt-0.5">✕</span>
                        <span className="text-neutral-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Colors */}
                <div>
                  <h3 className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-3">
                    Color Palette
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedPrompt.colors.map((color, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div
                          className="w-8 h-8 rounded-lg border border-neutral-200"
                          style={{ backgroundColor: color }}
                        />
                        <span className="text-xs font-mono text-neutral-500">{color}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Fonts */}
                <div>
                  <h3 className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-3">
                    Typography
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedPrompt.fonts.map((font) => (
                      <span
                        key={font}
                        className="px-3 py-1 text-sm bg-neutral-100 rounded-full"
                      >
                        {font}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Examples */}
                <div>
                  <h3 className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-3">
                    Reference Sites
                  </h3>
                  <div className="space-y-1">
                    {selectedPrompt.examples.map((site) => (
                      <a
                        key={site}
                        href={`https://${site}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-sm text-blue-600 hover:underline"
                      >
                        {site} →
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Usage tip */}
      <div className="mt-12 p-6 bg-neutral-50 rounded-2xl">
        <h3 className="font-semibold mb-2">How to use these prompts</h3>
        <ol className="text-sm text-neutral-600 space-y-2">
          <li>1. Select a style that matches your vision</li>
          <li>2. Copy the prompt and paste it into your AI coding assistant (Claude, ChatGPT, Cursor)</li>
          <li>3. Add your specific requirements: "Build a landing page for [your product] using this style"</li>
          <li>4. Browse the <a href="/" className="text-blue-600 hover:underline">Sites gallery</a> for visual references to include</li>
        </ol>
      </div>
    </div>
  );
}

