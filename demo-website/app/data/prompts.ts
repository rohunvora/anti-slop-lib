export interface StylePrompt {
  id: string;
  name: string;
  vibe: string;
  description: string;
  prompt: string;
  preview: {
    font: string;
    colors: string[];
    corners: string;
    example: string;
  };
}

export const stylePrompts: StylePrompt[] = [
  {
    id: 'editorial',
    name: 'Editorial',
    vibe: 'Sophisticated, literary, print-inspired',
    description: 'Serif headlines, cream backgrounds, sharp corners, asymmetric layouts',
    prompt: `You are designing a website with an EDITORIAL aesthetic—think high-end magazines, literary journals, and thoughtful publications.

CRITICAL: Avoid these AI slop patterns:
- NO purple/violet/indigo gradients (use solid colors instead)
- NO Inter or Space Grotesk fonts (use serif headlines)
- NO floating 3D blobs or orbs
- NO glassmorphism (backdrop-blur)
- NO rounded-xl cards with shadows
- NO generic copy like "Transform your X" or "AI-Powered Y"

INSTEAD, use:
- Headline font: Fraunces or Playfair Display (serif, distinctive)
- Body font: IBM Plex Sans or Source Sans 3
- Colors: Warm editorial palette (cream #FAF7F2, gold #B8860B, brown #8B4513, black #2D2A26)
- Layout: Left-aligned or asymmetric, NOT centered
- Cards: Sharp corners (no border-radius or 2px max), bold borders instead of shadows
- Copy: Specific, concrete, describes what the product actually does
- Background: Solid cream or off-white, not dark slate

The aesthetic should feel intentional, sophisticated, and human-designed—like a well-edited publication, not a generic SaaS landing page.`,
    preview: {
      font: 'Fraunces + IBM Plex Sans',
      colors: ['Cream', 'Gold', 'Brown', 'Black'],
      corners: 'Sharp (0-2px)',
      example: 'High-end blog, newsletter, publishing platform'
    }
  },
  {
    id: 'brutalist',
    name: 'Brutalist',
    vibe: 'Raw, bold, unapologetic',
    description: 'System fonts, high contrast, no styling, dense layouts',
    prompt: `You are designing a website with a BRUTALIST aesthetic—raw, honest, uncompromising.

CRITICAL: Avoid these AI slop patterns:
- NO purple/violet/indigo gradients
- NO Inter or custom fonts (use system fonts: Arial, Helvetica, or Courier)
- NO floating 3D blobs
- NO glassmorphism
- NO rounded corners (everything sharp)
- NO shadows or effects
- NO generic copy

INSTEAD, use:
- Font: System fonts only (Arial, Helvetica, Courier for monospace)
- Colors: High contrast (black #000000, white #FFFFFF, one bold accent like red #FF0000 or yellow #FFFF00)
- Layout: Dense, information-heavy, grid-based
- Cards: Sharp corners, bold borders (3-4px), no shadows
- Background: Pure white or pure black, no gradients
- Copy: Direct, honest, no marketing speak
- Effects: None. Raw HTML/CSS aesthetic.

The aesthetic should feel intentionally "ugly" but functional—like early web design, but deliberate.`,
    preview: {
      font: 'System fonts (Arial, Courier)',
      colors: ['Black', 'White', 'Red/Yellow accent'],
      corners: 'Sharp (0px)',
      example: 'Portfolio, art site, experimental project'
    }
  },
  {
    id: 'minimal',
    name: 'Minimal',
    vibe: 'Clean, focused, restrained',
    description: 'Monochrome, one accent, lots of whitespace, one font',
    prompt: `You are designing a website with a TRUE MINIMAL aesthetic—maximum clarity, minimum decoration.

CRITICAL: Avoid these AI slop patterns:
- NO purple/violet/indigo gradients
- NO Inter (use a distinctive sans-serif or serif)
- NO floating 3D blobs
- NO glassmorphism
- NO rounded-xl cards
- NO generic copy

INSTEAD, use:
- Font: ONE font family only (e.g., IBM Plex Sans, or a serif like Charter)
- Colors: Maximum 2 colors (black + one accent, or monochrome)
- Layout: Generous whitespace, clear hierarchy
- Cards: Sharp corners (2-4px), thin borders (1px), no shadows
- Background: Pure white or off-white
- Copy: Concise, essential information only
- Effects: None. Typography does all the work.

The aesthetic should feel calm, focused, and intentional—every element has a purpose.`,
    preview: {
      font: 'Single font (IBM Plex Sans or Charter)',
      colors: ['Black', 'One accent color'],
      corners: 'Subtle (2-4px)',
      example: 'Portfolio, landing page, focused product'
    }
  },
  {
    id: 'playful',
    name: 'Playful',
    vibe: 'Fun, energetic, human',
    description: 'Bright colors, chunky shapes, personality, hand-drawn feel',
    prompt: `You are designing a website with a PLAYFUL aesthetic—fun, energetic, human-feeling.

CRITICAL: Avoid these AI slop patterns:
- NO purple/violet/indigo gradients (use bright, saturated colors instead)
- NO Inter (use a fun display font)
- NO floating 3D blobs (use hand-drawn or illustrated elements)
- NO glassmorphism
- NO generic copy

INSTEAD, use:
- Font: Playful display fonts (e.g., Poppins, Nunito, or a custom handwritten style)
- Colors: Bright, saturated (not purple)—think red #FF6B6B, cyan #4ECDC4, yellow #FFE66D
- Layout: Irregular, asymmetric, not perfectly aligned
- Cards: Chunky rounded corners (12-16px), bold colors, no shadows
- Background: Light, colorful (cream or pastel)
- Copy: Conversational, has personality, uses humor if appropriate
- Effects: Subtle animations, hand-drawn elements, illustrations

The aesthetic should feel human-made, joyful, and memorable—not corporate or generic.`,
    preview: {
      font: 'Playful display (Poppins, Nunito)',
      colors: ['Bright red', 'Cyan', 'Yellow', 'Pastels'],
      corners: 'Chunky (12-16px)',
      example: 'Creative tools, kids apps, social products'
    }
  },
  {
    id: 'luxury',
    name: 'Luxury',
    vibe: 'Refined, exclusive, elegant',
    description: 'Dark + gold, thin serifs, subtle animations, high-end feel',
    prompt: `You are designing a website with a LUXURY aesthetic—refined, exclusive, elegant.

CRITICAL: Avoid these AI slop patterns:
- NO purple/violet/indigo gradients (use dark backgrounds with gold accents)
- NO Inter (use elegant serifs)
- NO floating 3D blobs
- NO glassmorphism
- NO rounded-xl cards
- NO generic copy

INSTEAD, use:
- Font: Elegant serif for headlines (Cormorant Garamond, Playfair Display) + refined sans for body
- Colors: Dark backgrounds (#0A0A0A or #1A1A1A) with gold #C9A227 or cream #F5F5DC accents
- Layout: Generous spacing, refined typography hierarchy
- Cards: Sharp corners or subtle rounding (4px), thin borders, no shadows
- Background: Deep black or dark charcoal
- Copy: Understated, sophisticated, whispers rather than shouts
- Effects: Subtle, refined animations only

The aesthetic should feel exclusive, timeless, and sophisticated—like a luxury brand, not a startup.`,
    preview: {
      font: 'Elegant serif (Cormorant, Playfair)',
      colors: ['Dark black', 'Gold', 'Cream'],
      corners: 'Subtle (4px)',
      example: 'Luxury brand, high-end service, exclusive product'
    }
  },
  {
    id: 'godly-dark',
    name: 'Godly Dark',
    vibe: 'Premium, technical, precise',
    description: 'Dark backgrounds, accent glows, refined interactions, scroll animations',
    prompt: `You are designing a website with a PREMIUM DARK aesthetic—inspired by Linear, Vercel, and award-winning dark-mode sites.

CRITICAL: Avoid these AI slop patterns:
- NO purple gradients (use single accent colors with glow)
- NO Inter as the only font (add distinctive accents)
- NO cookie-cutter layouts
- NO generic shadows

INSTEAD, use:
- Font: Geist, Inter, or SF Pro for body + JetBrains Mono for code/technical
- Colors: Deep black #0a0a0a background, #141414 for surfaces, rgba(255,255,255,0.1) borders
- Accent: ONE vibrant color with glow (electric blue #00d4ff, lime #84ff00, or violet #8b5cf6)
- Cards: backdrop-blur with subtle borders, hover lifts with glow
- Effects: Subtle noise texture (3% opacity), gradient mesh backgrounds
- Animations: Smooth scroll reveals, magnetic buttons, cursor interactions
- Copy: Technical precision, confident but not boastful

VISUAL REFERENCES (study these for inspiration):
- https://linear.app - precision and polish
- https://vercel.com - developer-focused elegance
- https://raycast.com - attention to micro-details

The aesthetic should feel premium, intentional, and distinctly NOT generic AI output.`,
    preview: {
      font: 'Geist + JetBrains Mono',
      colors: ['#0a0a0a', '#141414', 'Accent with glow'],
      corners: 'Medium (8-12px)',
      example: 'Dev tools, SaaS, technical products'
    }
  },
  {
    id: 'godly-playful',
    name: 'Godly Playful',
    vibe: 'Fun, interactive, memorable',
    description: 'Bold interactions, custom cursors, staggered animations, personality',
    prompt: `You are designing a website with a PLAYFUL PREMIUM aesthetic—fun but polished, inspired by top creative agencies.

CRITICAL: Avoid these AI slop patterns:
- NO generic purple/blue gradients
- NO predictable hover states (just color change)
- NO uniform grid layouts
- NO safe color choices

INSTEAD, use:
- Font: Mix display fonts with functional sans (Space Grotesk + Inter, or custom choices)
- Colors: Bold, unexpected combinations (coral + navy, lime + black, cream + electric blue)
- Layout: Break the grid intentionally, overlapping elements, asymmetric compositions
- Interactions: Custom cursor that expands on hover, magnetic buttons, staggered scroll reveals
- Effects: Playful micro-animations, text reveals, image zoom on hover
- Copy: Has personality, conversational, memorable

VISUAL REFERENCES (study these for inspiration):
- https://roasted.design - playful agency
- https://kons.fyi - minimal but fun portfolio
- https://superhi.com - educational + creative

The aesthetic should surprise and delight while remaining professional.`,
    preview: {
      font: 'Space Grotesk + Display fonts',
      colors: ['Bold combos', 'Coral', 'Navy', 'Lime'],
      corners: 'Varied (mix sharp + round)',
      example: 'Agencies, portfolios, creative products'
    }
  },
  {
    id: 'godly-immersive',
    name: 'Godly Immersive',
    vibe: 'Storytelling, scroll-driven, cinematic',
    description: 'Full-height sections, scroll animations, sticky elements, narrative flow',
    prompt: `You are designing a website with an IMMERSIVE SCROLL aesthetic—cinematic, narrative-driven, scroll-linked.

CRITICAL: Avoid these AI slop patterns:
- NO standard layouts (header, cards, footer)
- NO abrupt section transitions
- NO static content blocks
- NO generic animations

INSTEAD, use:
- Layout: Full-viewport sections (100vh), content centered, scroll-snap optional
- Typography: Large headlines (56-80px), reveal on scroll
- Scroll effects: Parallax backgrounds, sticky elements, progress indicators
- Transitions: Sections fade/slide into each other, color scheme morphs
- Images: Full-bleed, zoom on scroll, clip-path reveals
- Navigation: Minimal or hidden, dot indicators on side

VISUAL REFERENCES (study these for inspiration):
- https://superpower.com - health tech with scroll storytelling
- https://lusion.co - 3D immersive experiences
- Apple product pages - cinematic scroll reveals

The aesthetic should feel like an experience, not just a website.`,
    preview: {
      font: 'Large display headlines',
      colors: ['Dynamic', 'Changes per section'],
      corners: 'Full-bleed (0px)',
      example: 'Product launches, storytelling, brand sites'
    }
  }
];

export const impactRankings = [
  {
    rank: 1,
    issue: 'Purple/violet/indigo gradients',
    fix: 'Use solid colors or warm palettes',
    impact: 100,
    critical: true
  },
  {
    rank: 2,
    issue: 'Generic copy ("Transform your X", "AI-Powered Y")',
    fix: 'Write specific headlines for YOUR product',
    impact: 85,
    critical: true
  },
  {
    rank: 3,
    issue: 'Inter or Space Grotesk fonts',
    fix: 'Use serif headlines (Fraunces, Playfair) or distinctive sans',
    impact: 75,
    critical: true
  },
  {
    rank: 4,
    issue: 'Floating 3D blobs/orbs',
    fix: 'Use real imagery or nothing',
    impact: 60,
    critical: true
  },
  {
    rank: 5,
    issue: 'Glassmorphism (backdrop-blur)',
    fix: 'Use solid backgrounds and borders',
    impact: 45,
    critical: false
  },
  {
    rank: 6,
    issue: 'Rounded-xl cards with shadow-lg',
    fix: 'Try sharp corners (0-4px) + borders instead',
    impact: 35,
    critical: false
  },
  {
    rank: 7,
    issue: 'Centered layouts everywhere',
    fix: 'Try left-aligned or asymmetric layouts',
    impact: 25,
    critical: false
  }
];

