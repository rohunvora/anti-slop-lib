/**
 * TEMPLATE SIGNAL DEFINITIONS
 * 
 * These are signals correlated with template/AI-looking sites — not proof of AI usage.
 * Each signal describes a perception trigger, not a design crime.
 */

export type Salience = 'high' | 'medium' | 'low';
export type Effort = 'low' | 'medium' | 'high';

export type SignalCategory = 
  | 'typography'
  | 'color'
  | 'layout'
  | 'components'
  | 'imagery'
  | 'copy'
  | 'effects';

export interface QuickFix {
  effort: Effort;
  change: string;
  patch?: string;        // Actual code diff/snippet
  tradeoffs?: string;
}

export interface TemplateSignal {
  id: string;
  label: string;
  category: SignalCategory;
  salience: Salience;
  
  // Perception-focused messaging
  whyItReadsGeneric: string;
  perception: string;  // What users/viewers think when they see this
  
  // Detection
  detect: {
    tailwindClasses?: string[];
    cssProperties?: Record<string, string[]>;
    colorPatterns?: string[];
    fontPatterns?: string[];
    textPatterns?: string[];
    htmlPatterns?: string[];
  };
  
  // Actionable fixes
  quickFixes: QuickFix[];
  
  // Evidence-based references (not Twitter roasts)
  prevalence?: string;  // e.g., "Present in 73% of Tailwind starter templates"
  references?: Array<{
    title: string;
    url: string;
    note: string;
  }>;
}

// ============================================================================
// TEMPLATE FONTS (commonly defaulted to)
// ============================================================================

export const TEMPLATE_FONTS = [
  'Inter',
  'inter',
  'Space Grotesk',
  'space-grotesk',
  'Plus Jakarta Sans',
  'plus-jakarta-sans',
  'Manrope',
  'manrope',
  'DM Sans',
  'dm-sans',
  'Outfit',
  'outfit',
  'Poppins',
  'poppins',
  'font-sans', // Tailwind default
  'system-ui',
  '-apple-system',
];

// ============================================================================
// TEMPLATE COLORS
// ============================================================================

export const TEMPLATE_COLORS = {
  // Purple gradients (extremely common in templates)
  purples: [
    '#8B5CF6', '#7C3AED', '#6366F1', '#818CF8', '#A78BFA',
    '#6D28D9', '#5B21B6', '#4C1D95', '#7E22CE', '#9333EA',
    'violet-', 'purple-', 'indigo-',
  ],
  // Standard dark backgrounds
  darkBackgrounds: [
    '#0f0f0f', '#111111', '#0a0a0a', '#09090b', '#0c0c0c',
    '#111827', '#1f2937', '#030712',
    'slate-900', 'slate-950', 'gray-900', 'gray-950', 'zinc-900', 'zinc-950',
  ],
};

// ============================================================================
// TEMPLATE COPY PATTERNS
// ============================================================================

export const TEMPLATE_COPY_PATTERNS = [
  /AI[- ]?Powered/i,
  /Supercharge your/i,
  /Unlock the power/i,
  /Transform your/i,
  /Revolutionize/i,
  /Next[- ]?generation/i,
  /Seamless(ly)?/i,
  /Effortless(ly)?/i,
  /Streamline/i,
  /10x your/i,
  /Ship faster/i,
  /Build better/i,
  /Scale your/i,
  /Empower your/i,
  /Level up/i,
  /Game[- ]?changing/i,
  /Cutting[- ]?edge/i,
  /State[- ]?of[- ]?the[- ]?art/i,
  /World[- ]?class/i,
  /Enterprise[- ]?grade/i,
  /Blazing[- ]?fast/i,
  /Lightning[- ]?fast/i,
  /Get Started( Free)?/i,
  /Start Free Trial/i,
  /Try (it )?for Free/i,
  /Join [0-9,]+\+? (users|teams|companies)/i,
  /Trusted by/i,
  /Used by teams at/i,
];

// ============================================================================
// SIGNAL DEFINITIONS
// ============================================================================

export const SIGNALS: TemplateSignal[] = [
  // ==================== HIGH SALIENCE ====================
  {
    id: 'purple-gradient',
    label: 'Purple/Violet Gradient',
    category: 'color',
    salience: 'high',
    whyItReadsGeneric: 'Purple-to-pink gradients are the default output of most AI design tools and appear in the majority of template landing pages.',
    perception: 'Viewers immediately pattern-match to "AI-generated" or "template site"',
    prevalence: 'Present in ~60% of v0/Vercel template outputs',
    detect: {
      tailwindClasses: [
        'from-purple', 'from-violet', 'from-indigo',
        'to-pink', 'to-fuchsia', 'to-purple',
        'via-purple', 'via-violet',
        'bg-purple', 'bg-violet', 'bg-indigo',
        'text-purple', 'text-violet', 'text-indigo',
      ],
      colorPatterns: TEMPLATE_COLORS.purples,
    },
    quickFixes: [
      {
        effort: 'low',
        change: 'Replace gradient with solid brand color',
        patch: '// Before: bg-gradient-to-r from-purple-500 to-pink-500\n// After:  bg-[#your-brand-color]',
        tradeoffs: 'Less "modern" feel, but more distinctive',
      },
      {
        effort: 'medium',
        change: 'Use warm tones instead (terracotta, gold, forest green)',
        patch: '// Try: bg-amber-600, bg-emerald-700, bg-rose-600',
        tradeoffs: 'Requires rethinking accent colors across site',
      },
      {
        effort: 'low',
        change: 'Go monochrome (black/white/gray only)',
        patch: '// Before: bg-gradient-to-r from-purple-500 to-pink-500\n// After:  bg-foreground text-background',
      },
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
    detect: {
      tailwindClasses: ['blur-3xl', 'blur-2xl'],
      htmlPatterns: ['blob', 'orb', 'sphere', 'gradient-blob'],
    },
    quickFixes: [
      {
        effort: 'low',
        change: 'Remove entirely — empty space is fine',
        patch: '// Delete the blob div entirely\n// Hero sections don\'t need decorative elements',
      },
      {
        effort: 'medium',
        change: 'Replace with actual product screenshot or illustration',
        tradeoffs: 'Requires having real visual assets',
      },
      {
        effort: 'low',
        change: 'Use subtle grid/dot pattern instead',
        patch: '// Replace blur-3xl blob with:\n<div className="absolute inset-0 bg-[url(\'/grid.svg\')] opacity-[0.02]" />',
      },
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
    detect: {
      htmlPatterns: [
        '<section.*class=".*text-center.*"',
        '<div.*class=".*text-center.*mx-auto',
      ],
      tailwindClasses: ['text-center', 'mx-auto', 'items-center', 'justify-center'],
      textPatterns: ['Get Started', 'Start Free', 'Try Free', 'Learn More'],
    },
    quickFixes: [
      {
        effort: 'medium',
        change: 'Switch to asymmetric split layout',
        patch: '// Before: <section className="text-center mx-auto">\n// After:  <section className="grid md:grid-cols-[1fr_1.2fr] gap-12 items-center">',
        tradeoffs: 'Requires restructuring hero content',
      },
      {
        effort: 'low',
        change: 'Left-align text, keep centered container',
        patch: '// Change: text-center → text-left\n// Keep: mx-auto max-w-4xl',
      },
      {
        effort: 'low',
        change: 'Make CTA specific to your product',
        patch: '// Before: "Get Started Free"\n// After:  "Create your first [thing]" or "See it in action"',
      },
    ],
    references: [
      { title: 'Vercel', url: 'https://vercel.com', note: 'Left-aligned hero with product demo' },
      { title: 'Raycast', url: 'https://raycast.com', note: 'Asymmetric layout with video' },
    ],
  },

  // ==================== MEDIUM SALIENCE ====================
  {
    id: 'inter-only-typography',
    label: 'Inter-Only Typography',
    category: 'typography',
    salience: 'medium',
    whyItReadsGeneric: 'Inter is the default font in Tailwind, Next.js, and most UI frameworks. Using it alone signals "I didn\'t make a typography choice."',
    perception: 'Reads as "default stack" rather than "designed"',
    prevalence: 'Default in Tailwind CSS, Next.js, shadcn/ui',
    detect: {
      fontPatterns: ['Inter', 'inter', 'font-sans'],
      cssProperties: {
        'font-family': ['Inter', 'inter'],
      },
    },
    quickFixes: [
      {
        effort: 'low',
        change: 'Pair with a serif for headlines',
        patch: '// Add to globals.css:\n@import url("https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;700&display=swap");\n\n// Use: font-serif for h1-h3, keep Inter for body',
        tradeoffs: 'Adds ~20kb font load',
      },
      {
        effort: 'low',
        change: 'Switch to less common grotesque (IBM Plex Sans, Geist)',
        patch: '// Replace Inter import with:\n@import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&display=swap");',
      },
      {
        effort: 'medium',
        change: 'Use system font stack intentionally',
        patch: 'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;\n// This reads as "intentionally native" vs "forgot to set font"',
      },
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
    detect: {
      tailwindClasses: ['rounded-lg', 'rounded-xl', 'rounded-2xl', 'rounded-3xl'],
    },
    quickFixes: [
      {
        effort: 'low',
        change: 'Go sharp (rounded-none or rounded-sm)',
        patch: '// Before: rounded-xl\n// After:  rounded-sm (or rounded-none for editorial feel)',
        tradeoffs: 'Less "friendly" appearance',
      },
      {
        effort: 'low',
        change: 'Pick ONE radius and use consistently',
        patch: '// Define in tailwind.config:\nborderRadius: { DEFAULT: "4px" }\n// Then use: rounded (not rounded-xl, rounded-2xl, etc)',
      },
      {
        effort: 'medium',
        change: 'Mix sharp containers with rounded interactive elements',
        patch: '// Cards: rounded-none border\n// Buttons: rounded-full\n// Creates intentional contrast',
      },
    ],
  },
  {
    id: 'shadow-cards',
    label: 'Shadow-Elevated Cards',
    category: 'components',
    salience: 'medium',
    whyItReadsGeneric: 'shadow-sm/md/lg on cards is the default "depth" approach in every UI kit.',
    perception: 'Reads as "Material Design era" or "generic dashboard"',
    detect: {
      tailwindClasses: ['shadow-sm', 'shadow-md', 'shadow-lg', 'shadow-xl'],
    },
    quickFixes: [
      {
        effort: 'low',
        change: 'Replace shadows with borders',
        patch: '// Before: shadow-md rounded-xl\n// After:  border border-border rounded-sm',
      },
      {
        effort: 'low',
        change: 'Use background color differentiation instead',
        patch: '// Before: bg-white shadow-md\n// After:  bg-muted (slightly darker than page bg)',
      },
      {
        effort: 'medium',
        change: 'Use hard/offset shadows for character',
        patch: '// Before: shadow-lg\n// After:  shadow-[4px_4px_0_0_#000] (hard shadow)',
      },
    ],
  },
  {
    id: 'glassmorphism',
    label: 'Glassmorphism Effects',
    category: 'effects',
    salience: 'medium',
    whyItReadsGeneric: 'backdrop-blur + transparency was peak 2021 and is now a dated template marker.',
    perception: 'Reads as "2021 Dribbble shot" or "iOS clone attempt"',
    detect: {
      tailwindClasses: [
        'backdrop-blur', 'backdrop-blur-sm', 'backdrop-blur-md', 'backdrop-blur-lg',
        'bg-white/10', 'bg-black/10', 'bg-white/20', 'bg-black/20',
      ],
    },
    quickFixes: [
      {
        effort: 'low',
        change: 'Use solid backgrounds',
        patch: '// Before: backdrop-blur-md bg-white/10\n// After:  bg-background border border-border',
      },
      {
        effort: 'low',
        change: 'If you need transparency, skip the blur',
        patch: '// Before: backdrop-blur-md bg-black/50\n// After:  bg-black/80 (higher opacity, no blur)',
      },
    ],
  },
  {
    id: 'generic-headline-copy',
    label: 'Generic Headline Copy',
    category: 'copy',
    salience: 'medium',
    whyItReadsGeneric: 'Phrases like "Transform your X" or "AI-Powered Y" are the default outputs of every AI writing tool.',
    perception: 'Reads as "placeholder copy" or "ChatGPT wrote this"',
    detect: {
      textPatterns: TEMPLATE_COPY_PATTERNS.map(p => p.source),
    },
    quickFixes: [
      {
        effort: 'medium',
        change: 'Be specific about what your product does',
        patch: '// Before: "Transform your workflow"\n// After:  "Ship features 3x faster" or "Track sprint velocity in real-time"',
      },
      {
        effort: 'low',
        change: 'Lead with the outcome, not the mechanism',
        patch: '// Before: "AI-Powered Analytics"\n// After:  "Know which features your users actually want"',
      },
      {
        effort: 'medium',
        change: 'Use your brand voice, even if it\'s weird',
        patch: '// Before: "Get Started Free"\n// After:  "Let\'s build something" or "Jump in" or "Start breaking things"',
      },
    ],
  },

  // ==================== LOW SALIENCE ====================
  {
    id: 'dark-slate-background',
    label: 'Standard Dark Slate Background',
    category: 'color',
    salience: 'low',
    whyItReadsGeneric: 'The #0f0f0f / slate-950 dark mode is fine but extremely common. Not bad alone, but compounds with other signals.',
    perception: 'Neutral — only problematic when combined with other template signals',
    detect: {
      tailwindClasses: ['bg-slate-950', 'bg-slate-900', 'bg-gray-950', 'bg-gray-900', 'bg-zinc-950', 'bg-zinc-900'],
      colorPatterns: TEMPLATE_COLORS.darkBackgrounds,
    },
    quickFixes: [
      {
        effort: 'low',
        change: 'Go true black for more contrast',
        patch: '// Before: bg-slate-950\n// After:  bg-black',
      },
      {
        effort: 'low',
        change: 'Add subtle warmth or coolness',
        patch: '// Before: bg-[#0f0f0f]\n// After:  bg-[#0f0f12] (slight blue) or bg-[#12100f] (slight warm)',
      },
      {
        effort: 'medium',
        change: 'Consider light mode as default instead',
        tradeoffs: 'Dark mode is expected in dev tools / technical products',
      },
    ],
  },
  {
    id: 'glow-effects',
    label: 'Colored Glow Effects',
    category: 'effects',
    salience: 'low',
    whyItReadsGeneric: 'Purple/blue glows were a 2022-2023 trend that\'s now associated with template sites.',
    perception: 'Reads as "trying too hard to look modern"',
    detect: {
      tailwindClasses: ['shadow-purple', 'shadow-indigo', 'shadow-violet', 'shadow-blue'],
      cssProperties: {
        'box-shadow': ['purple', 'violet', 'indigo', '#8B5CF6', '#6366F1'],
      },
    },
    quickFixes: [
      {
        effort: 'low',
        change: 'Remove glows entirely',
        patch: '// Before: shadow-[0_0_30px_rgba(139,92,246,0.3)]\n// After:  (remove)',
      },
      {
        effort: 'low',
        change: 'Use neutral/white glow if glow is needed',
        patch: '// Before: shadow-purple-500/30\n// After:  shadow-white/10',
      },
    ],
  },
  {
    id: 'space-grotesk',
    label: 'Space Grotesk Typography',
    category: 'typography',
    salience: 'low',
    whyItReadsGeneric: 'Space Grotesk became the "I\'m not using Inter" choice, making it equally clichéd.',
    perception: 'Reads as "trying to be different but not really"',
    detect: {
      fontPatterns: ['Space Grotesk', 'space-grotesk'],
    },
    quickFixes: [
      {
        effort: 'low',
        change: 'Try a less common grotesque',
        patch: '// Alternatives: General Sans, Switzer, Satoshi (from Fontshare)\n// Or: IBM Plex Sans, Geist (from Google/Vercel)',
      },
      {
        effort: 'medium',
        change: 'Pair with a contrasting serif',
        patch: '// Headlines: Fraunces, Newsreader, or Libre Baskerville\n// Body: Keep a clean sans',
      },
    ],
  },
];

// ============================================================================
// HELPERS
// ============================================================================

export function getSignalsByCategory(category: SignalCategory): TemplateSignal[] {
  return SIGNALS.filter(s => s.category === category);
}

export function getSignalsBySalience(salience: Salience): TemplateSignal[] {
  return SIGNALS.filter(s => s.salience === salience);
}

export function getHighSalienceSignals(): TemplateSignal[] {
  return SIGNALS.filter(s => s.salience === 'high');
}

// Map old pattern IDs to new signal IDs for backwards compatibility
export const LEGACY_ID_MAP: Record<string, string> = {
  'slop-purple-gradient': 'purple-gradient',
  'slop-blob-backgrounds': 'blob-backgrounds',
  'slop-centered-hero': 'centered-hero-generic-cta',
  'slop-font-inter': 'inter-only-typography',
  'slop-font-space-grotesk': 'space-grotesk',
  'slop-rounded-cards': 'rounded-xl-everything',
  'slop-shadow-cards': 'shadow-cards',
  'slop-glassmorphism': 'glassmorphism',
  'slop-dark-background': 'dark-slate-background',
  'slop-glow-effects': 'glow-effects',
  'slop-generic-headline': 'generic-headline-copy',
  'slop-generic-cta': 'centered-hero-generic-cta',
};

