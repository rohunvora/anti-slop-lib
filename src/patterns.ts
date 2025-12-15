/**
 * ANTI-SLOP PATTERN DEFINITIONS
 * 
 * These patterns define what makes a website look "AI-generated" or "vibecoded"
 * Each pattern has a severity, description, and detection logic
 */

export type Severity = 'critical' | 'warning' | 'info';

export interface SlopPattern {
  id: string;
  name: string;
  category: SlopCategory;
  severity: Severity;
  description: string;
  whyItsBad: string;
  alternatives: string[];
  quickFix?: {
    remove?: string;      // Classes/patterns to remove
    replace?: string;     // Code snippet to replace with
    example?: string;     // Example of fixed code
  };
  detect: {
    tailwindClasses?: string[];
    cssProperties?: Record<string, string[]>;
    colorPatterns?: string[];
    fontPatterns?: string[];
    textPatterns?: string[];
    htmlPatterns?: string[];
  };
}

export type SlopCategory = 
  | 'typography'
  | 'color'
  | 'layout'
  | 'components'
  | 'imagery'
  | 'copy'
  | 'effects';

// ============================================================================
// TYPOGRAPHY PATTERNS
// ============================================================================

export const SLOP_FONTS = [
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
  'Poppins', // borderline
  'poppins',
  'font-sans', // Tailwind default
  'system-ui',
  '-apple-system',
];

export const ALTERNATIVE_FONTS = {
  headers: [
    'Fraunces',
    'Playfair Display',
    'Libre Baskerville',
    'Spectral',
    'Vollkorn',
    'Source Serif Pro',
    'Merriweather',
    'Lora',
    'Cormorant Garamond',
    'EB Garamond',
    'Crimson Pro',
    'Newsreader',
    'Bitter',
    'Literata',
    'IBM Plex Serif',
    // Display/quirky
    'Cabinet Grotesk',
    'Clash Display',
    'Satoshi',
    'General Sans',
    'Switzer',
    'Chillax',
    'Zodiak',
    'Gambetta',
    'Erode',
    'Synonym',
  ],
  body: [
    'Charter',
    'Georgia',
    'Palatino',
    'Bookman',
    'IBM Plex Sans',
    'Source Sans 3',
    'Nunito Sans',
    'Work Sans',
    'Karla',
    'Rubik',
    'Atkinson Hyperlegible',
    'Lexend',
  ],
  monospace: [
    'JetBrains Mono',
    'Fira Code',
    'Berkeley Mono',
    'Monaspace',
    'Iosevka',
    'Recursive',
    'Victor Mono',
  ],
};

// ============================================================================
// COLOR PATTERNS
// ============================================================================

// The infamous AI color palette
export const SLOP_COLORS = {
  // Purple gradients (the #1 offender)
  purples: [
    '#8B5CF6', '#7C3AED', '#6366F1', '#818CF8', '#A78BFA',
    '#6D28D9', '#5B21B6', '#4C1D95', '#7E22CE', '#9333EA',
    'violet-', 'purple-', 'indigo-',
  ],
  // The typical gradient combos
  gradientCombos: [
    ['purple', 'pink'],
    ['purple', 'blue'],
    ['indigo', 'purple'],
    ['violet', 'fuchsia'],
    ['blue', 'purple'],
    ['indigo', 'cyan'],
  ],
  // The "dark mode" that's actually just dark gray with blue tint
  darkBackgrounds: [
    '#0f0f0f', '#111111', '#0a0a0a', '#09090b', '#0c0c0c',
    '#111827', '#1f2937', '#030712',
    'slate-900', 'slate-950', 'gray-900', 'gray-950', 'zinc-900', 'zinc-950',
  ],
  // Muted text colors that all look the same
  mutedText: [
    'text-gray-400', 'text-gray-500', 'text-slate-400', 'text-slate-500',
    'text-zinc-400', 'text-zinc-500', 'text-muted-foreground',
  ],
};

export const ALTERNATIVE_PALETTES = [
  {
    name: 'Warm Editorial',
    primary: '#B8860B',
    secondary: '#8B4513',
    background: '#FAF7F2',
    text: '#2D2A26',
    accent: '#CD853F',
  },
  {
    name: 'Forest',
    primary: '#2D5A27',
    secondary: '#1B4D3E',
    background: '#F5F5DC',
    text: '#1C1C1C',
    accent: '#8FBC8F',
  },
  {
    name: 'Brutalist',
    primary: '#FF0000',
    secondary: '#0000FF',
    background: '#FFFFFF',
    text: '#000000',
    accent: '#FFFF00',
  },
  {
    name: 'Monochrome',
    primary: '#000000',
    secondary: '#333333',
    background: '#FAFAFA',
    text: '#1A1A1A',
    accent: '#666666',
  },
  {
    name: 'Ocean',
    primary: '#0077B6',
    secondary: '#023E8A',
    background: '#CAF0F8',
    text: '#03045E',
    accent: '#00B4D8',
  },
  {
    name: 'Terracotta',
    primary: '#C2703D',
    secondary: '#8B4513',
    background: '#FDF5E6',
    text: '#3D2914',
    accent: '#E07B39',
  },
  {
    name: 'Midnight',
    primary: '#1A1A2E',
    secondary: '#16213E',
    background: '#0F0F1A',
    text: '#EAEAEA',
    accent: '#E94560',
  },
  {
    name: 'Pastel Punk',
    primary: '#FF6B6B',
    secondary: '#4ECDC4',
    background: '#F7FFF7',
    text: '#1A535C',
    accent: '#FFE66D',
  },
];

// ============================================================================
// LAYOUT PATTERNS
// ============================================================================

export const SLOP_LAYOUT_CLASSES = [
  // The centered everything approach
  'text-center',
  'mx-auto',
  'items-center',
  'justify-center',
  // Excessive padding/margins (the "lots of whitespace" approach)
  'py-24', 'py-32', 'py-20',
  'px-24', 'px-32',
  'my-24', 'my-32',
  'gap-8', 'gap-12', 'gap-16',
  // The card grid
  'grid-cols-3',
  'grid-cols-4',
];

export const SLOP_COMPONENT_PATTERNS = [
  // shadcn defaults
  'rounded-lg',
  'rounded-xl',
  'rounded-2xl',
  'rounded-full',
  'shadow-sm',
  'shadow-md',
  'shadow-lg',
  // Glassmorphism
  'backdrop-blur',
  'bg-opacity-',
  'bg-white/10',
  'bg-black/10',
  // The hover state
  'hover:bg-opacity',
  'hover:scale-105',
  'transition-all',
];

// ============================================================================
// IMAGERY PATTERNS
// ============================================================================

export const SLOP_IMAGERY_PATTERNS = {
  // 3D blob keywords in alt text or class names
  blobKeywords: [
    'blob', 'orb', 'sphere', '3d-shape', 'abstract-shape',
    'gradient-blob', 'floating', 'glow',
  ],
  // Stock-ish image patterns
  stockPatterns: [
    'unsplash', 'stock', 'placeholder',
    'hero-image', 'hero-bg',
  ],
};

// ============================================================================
// COPY PATTERNS
// ============================================================================

export const SLOP_COPY_PATTERNS = [
  // Generic headlines
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
  // Generic CTAs
  /Get Started( Free)?/i,
  /Start Free Trial/i,
  /Try (it )?for Free/i,
  /Join [0-9,]+\+? (users|teams|companies)/i,
  /Trusted by/i,
  /Used by teams at/i,
];

export const ALTERNATIVE_COPY_APPROACHES = [
  'Be specific about what your product actually does',
  'Use concrete numbers and outcomes',
  'Describe the problem, not just the solution',
  'Use your own voice, not corporate speak',
  'Tell a story instead of listing features',
  'Be honest about limitations',
  'Use humor if appropriate for your brand',
  'Reference your specific audience',
];

// ============================================================================
// EFFECT PATTERNS
// ============================================================================

export const SLOP_EFFECT_PATTERNS = [
  // Gradient backgrounds
  'bg-gradient-to-r',
  'bg-gradient-to-br',
  'bg-gradient-to-b',
  'from-purple',
  'from-indigo',
  'from-violet',
  'to-pink',
  'to-blue',
  'to-cyan',
  'via-purple',
  'via-indigo',
  // Glow effects
  'shadow-purple',
  'shadow-indigo',
  'shadow-violet',
  'shadow-glow',
  'drop-shadow',
  // Blur
  'blur-3xl',
  'blur-2xl',
  // Animation
  'animate-pulse',
  'animate-bounce',
];

// ============================================================================
// COMPILED PATTERNS
// ============================================================================

export const PATTERNS: SlopPattern[] = [
  // Typography
  {
    id: 'slop-font-inter',
    name: 'Inter Font Usage',
    category: 'typography',
    severity: 'warning',
    description: 'Using Inter or similar generic grotesque fonts',
    whyItsBad: 'Inter is the #1 most common AI-generated font choice. It\'s neutral to the point of being invisible and makes your site look like every other AI site.',
    alternatives: ALTERNATIVE_FONTS.headers.slice(0, 5),
    quickFix: {
      remove: 'font-sans, Inter',
      replace: 'font-body',
      example: '// Replace: className="font-sans"\n// With: className="font-body"\n// Or use: font-display for headlines',
    },
    detect: {
      fontPatterns: ['Inter', 'inter', 'font-sans'],
      cssProperties: {
        'font-family': ['Inter', 'inter'],
      },
    },
  },
  {
    id: 'slop-font-space-grotesk',
    name: 'Space Grotesk Usage',
    category: 'typography',
    severity: 'warning',
    description: 'Using Space Grotesk (the "I\'m different but not really" choice)',
    whyItsBad: 'Space Grotesk has become the go-to "alternative" to Inter, making it equally clichéd.',
    alternatives: ALTERNATIVE_FONTS.headers.slice(5, 10),
    quickFix: {
      remove: 'Space Grotesk, space-grotesk',
      replace: 'font-body',
      example: '// Replace: className="font-sans" (if using Space Grotesk)\n// With: className="font-body"\n// Try: Satoshi, General Sans, or IBM Plex Sans',
    },
    detect: {
      fontPatterns: ['Space Grotesk', 'space-grotesk'],
    },
  },

  // Colors
  {
    id: 'slop-purple-gradient',
    name: 'Purple/Violet Gradient',
    category: 'color',
    severity: 'critical',
    description: 'Using purple-to-pink or purple-to-blue gradients',
    whyItsBad: 'The purple gradient is THE defining visual marker of AI slop. It screams "I typed \'modern landing page\' into v0".',
    alternatives: [
      'Use a single bold color instead of gradients',
      'Try warm tones (orange, terracotta, gold)',
      'Go monochrome with strong contrast',
      'Use your actual brand colors',
    ],
    quickFix: {
      remove: 'bg-gradient-to-r from-purple-500 to-pink-500',
      replace: 'bg-primary',
      example: '// Replace: className="bg-gradient-to-r from-purple-500 to-pink-500"\n// With: className="bg-primary"\n// Or: className="bg-[#B8860B]" for warm editorial',
    },
    detect: {
      tailwindClasses: [
        'from-purple', 'from-violet', 'from-indigo',
        'to-pink', 'to-fuchsia', 'to-purple',
        'via-purple', 'via-violet',
        'bg-purple', 'bg-violet', 'bg-indigo',
        'text-purple', 'text-violet', 'text-indigo',
      ],
      colorPatterns: SLOP_COLORS.purples,
    },
  },
  {
    id: 'slop-dark-background',
    name: 'Generic Dark Background',
    category: 'color',
    severity: 'info',
    description: 'Using the standard dark gray/slate background',
    whyItsBad: 'The #0f0f0f / slate-950 dark mode is overused. It\'s not bad per se, but combined with other slop markers, it completes the look.',
    alternatives: [
      'Try an off-white or cream background instead',
      'Use a dark color with personality (dark blue, dark green)',
      'Add subtle texture or noise to the background',
      'Go fully black (#000) for brutalist effect',
    ],
    quickFix: {
      remove: 'bg-slate-950, bg-zinc-950, bg-gray-950',
      replace: 'bg-background',
      example: '// Replace: className="bg-slate-950"\n// With: className="bg-background"\n// Or try: bg-[#FAF7F2] for warm editorial, bg-[#000] for noir',
    },
    detect: {
      tailwindClasses: ['bg-slate-950', 'bg-slate-900', 'bg-gray-950', 'bg-gray-900', 'bg-zinc-950', 'bg-zinc-900'],
      colorPatterns: SLOP_COLORS.darkBackgrounds,
    },
  },

  // Components
  {
    id: 'slop-rounded-cards',
    name: 'Rounded Everything',
    category: 'components',
    severity: 'info',
    description: 'Excessive use of rounded-lg, rounded-xl on cards and buttons',
    whyItsBad: 'The rounded-xl card has become the universal shadcn/ui calling card. It\'s pleasant but forgettable.',
    alternatives: [
      'Try sharp corners for a more editorial feel',
      'Use subtle border-radius (rounded-sm or 2px)',
      'Mix sharp and rounded strategically',
      'Add unique border treatments instead',
    ],
    quickFix: {
      remove: 'rounded-xl, rounded-2xl, rounded-3xl',
      replace: 'rounded-sm or rounded-none',
      example: '// Replace: className="rounded-xl"\n// With: className="rounded-sm"\n// Or: className="rounded-none border-2 border-foreground"',
    },
    detect: {
      tailwindClasses: ['rounded-lg', 'rounded-xl', 'rounded-2xl', 'rounded-3xl'],
    },
  },
  {
    id: 'slop-shadow-cards',
    name: 'Shadow Card Pattern',
    category: 'components',
    severity: 'info',
    description: 'Cards with shadow-sm/md/lg',
    whyItsBad: 'The shadowy card floating above the page is extremely common in AI-generated UIs.',
    alternatives: [
      'Use borders instead of shadows',
      'Try colored/bold borders',
      'Use background color differentiation',
      'Embrace flat design',
    ],
    quickFix: {
      remove: 'shadow-sm, shadow-md, shadow-lg, shadow-xl',
      replace: 'border border-border',
      example: '// Replace: className="shadow-md"\n// With: className="border border-border"\n// Or: className="border-2 border-foreground" for bold',
    },
    detect: {
      tailwindClasses: ['shadow-sm', 'shadow-md', 'shadow-lg', 'shadow-xl'],
    },
  },
  {
    id: 'slop-glassmorphism',
    name: 'Glassmorphism',
    category: 'effects',
    severity: 'warning',
    description: 'backdrop-blur with semi-transparent backgrounds',
    whyItsBad: 'Glassmorphism was trendy in 2021 and is now a dated marker of AI-generated sites.',
    alternatives: [
      'Use solid backgrounds',
      'Try subtle gradients without blur',
      'Use color blocking instead',
    ],
    quickFix: {
      remove: 'backdrop-blur, bg-white/10, bg-black/10',
      replace: 'bg-background border border-border',
      example: '// Replace: className="backdrop-blur-md bg-white/10"\n// With: className="bg-background border border-border"',
    },
    detect: {
      tailwindClasses: ['backdrop-blur', 'backdrop-blur-sm', 'backdrop-blur-md', 'backdrop-blur-lg', 'bg-white/10', 'bg-black/10', 'bg-white/20', 'bg-black/20'],
    },
  },

  // Layout
  {
    id: 'slop-centered-hero',
    name: 'Centered Hero Section',
    category: 'layout',
    severity: 'info',
    description: 'Hero with centered headline, subtext, and CTA buttons',
    whyItsBad: 'The centered hero is the default AI layout. It works but shows zero creative thought.',
    alternatives: [
      'Try left-aligned hero text',
      'Use asymmetric layouts',
      'Put the CTA in an unexpected place',
      'Use a split layout with image',
      'Try a more editorial approach',
    ],
    quickFix: {
      remove: 'text-center, mx-auto, items-center, justify-center',
      replace: 'text-left grid grid-cols-1 md:grid-cols-[1fr_1.5fr]',
      example: '// Replace: <section className="text-center mx-auto">\n// With: <section className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-8">\n// Move text to left column, image to right',
    },
    detect: {
      htmlPatterns: ['<section.*class=".*text-center.*"', '<div.*class=".*text-center.*mx-auto'],
      tailwindClasses: ['text-center', 'mx-auto', 'items-center', 'justify-center'],
    },
  },

  // Effects
  {
    id: 'slop-glow-effects',
    name: 'Purple/Blue Glow Effects',
    category: 'effects',
    severity: 'warning',
    description: 'Glowing shadows, especially in purple/indigo',
    whyItsBad: 'The colored glow effect (especially purple) is a dead giveaway of AI generation.',
    alternatives: [
      'Skip the glow entirely',
      'Use subtle, neutral shadows if needed',
      'Try hard shadows for a retro feel',
    ],
    quickFix: {
      remove: 'shadow-purple, shadow-indigo, shadow-violet',
      replace: 'shadow-none or border border-border',
      example: '// Replace: className="shadow-purple-500"\n// With: className="border border-border"\n// Or: className="shadow-none"',
    },
    detect: {
      tailwindClasses: ['shadow-purple', 'shadow-indigo', 'shadow-violet', 'shadow-blue'],
      cssProperties: {
        'box-shadow': ['purple', 'violet', 'indigo', '#8B5CF6', '#6366F1'],
      },
    },
  },
  {
    id: 'slop-blob-backgrounds',
    name: '3D Blob/Orb Backgrounds',
    category: 'imagery',
    severity: 'critical',
    description: 'Abstract 3D blobs, orbs, or gradient shapes as decoration',
    whyItsBad: 'Floating 3D blobs are THE most recognizable AI slop element. They look "cool" but are semantically meaningless.',
    alternatives: [
      'Use actual imagery relevant to your product',
      'Try geometric patterns',
      'Use photography',
      'Go minimal with solid colors',
      'Create custom illustrations',
    ],
    quickFix: {
      remove: 'blur-3xl, blur-2xl, blob, orb, sphere',
      replace: '<div className="absolute inset-0 bg-[url(\'/grid.svg\')] opacity-5" />',
      example: '// Replace: <div className="blur-3xl bg-gradient-to-r from-purple-500">\n// With: <div className="absolute inset-0 bg-[url(\'/grid.svg\')] opacity-5" />\n// Or: Use actual product image',
    },
    detect: {
      tailwindClasses: ['blur-3xl', 'blur-2xl'],
      htmlPatterns: ['blob', 'orb', 'sphere'],
    },
  },

  // Copy
  {
    id: 'slop-generic-headline',
    name: 'Generic AI Headline',
    category: 'copy',
    severity: 'warning',
    description: 'Headlines like "AI-Powered X" or "Transform your Y"',
    whyItsBad: 'These headlines could apply to literally any product. They say nothing specific.',
    alternatives: ALTERNATIVE_COPY_APPROACHES,
    quickFix: {
      remove: 'AI-Powered, Transform your, Supercharge your, Unlock the power',
      replace: 'Be specific about what your product actually does',
      example: '// Replace: "AI-Powered Analytics"\n// With: "Track your team\'s sprint velocity"\n// Replace: "Transform your workflow"\n// With: "Ship features 3x faster with automated testing"',
    },
    detect: {
      textPatterns: SLOP_COPY_PATTERNS.map(p => p.source),
    },
  },
  {
    id: 'slop-generic-cta',
    name: 'Generic CTA Buttons',
    category: 'copy',
    severity: 'info',
    description: '"Get Started Free" or "Start Free Trial" CTAs',
    whyItsBad: 'Every AI-generated landing page has the same CTAs.',
    alternatives: [
      'Be specific: "Create your first X"',
      'Be playful: "Let\'s go" or custom language',
      'Be direct: "Buy now" or "Sign up"',
      'Match your brand voice',
    ],
    quickFix: {
      remove: 'Get Started Free, Start Free Trial, Try Free',
      replace: 'Be specific or match your brand voice',
      example: '// Replace: "Get Started Free"\n// With: "Create your first dashboard"\n// Or: "Let\'s build something"\n// Or: "Start building"',
    },
    detect: {
      textPatterns: [
        'Get Started',
        'Start Free',
        'Try Free',
        'Learn More',
      ],
    },
  },
];

// ============================================================================
// DETECTION HELPERS
// ============================================================================

export function getPatternsByCategory(category: SlopCategory): SlopPattern[] {
  return PATTERNS.filter(p => p.category === category);
}

export function getPatternsBySeverity(severity: Severity): SlopPattern[] {
  return PATTERNS.filter(p => p.severity === severity);
}

export function getCriticalPatterns(): SlopPattern[] {
  return PATTERNS.filter(p => p.severity === 'critical');
}


