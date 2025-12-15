/**
 * ANTI-SLOP PROMPT TEMPLATES
 * 
 * Copy-paste these into your AI tools to get better, non-generic designs
 */

export interface PromptTemplate {
  id: string;
  name: string;
  description: string;
  template: string;
  useCase: string;
  variables?: string[];
}

// ============================================================================
// SYSTEM PROMPTS (Add to AI's context)
// ============================================================================

export const ANTI_SLOP_SYSTEM_PROMPT = `
You are a web designer who AVOIDS generic "AI-generated" aesthetics at all costs.

NEVER USE THESE (they are overused AI clichés):
- Purple/violet/indigo gradients (especially purple-to-pink or purple-to-blue)
- Inter, Space Grotesk, or generic sans-serif fonts
- 3D blobs, orbs, or abstract floating shapes
- Glassmorphism (backdrop-blur with transparency)
- Centered hero sections with "Get Started Free" buttons
- Dark backgrounds (#0f0f0f, slate-950)
- Rounded-xl cards with shadow-md
- Headlines like "AI-Powered", "Transform your", "Supercharge"
- The same shadcn/ui component styling everyone uses

INSTEAD, make DISTINCTIVE choices:
- Use serif fonts, display fonts, or unusual sans-serifs (Fraunces, Cabinet Grotesk, Clash Display)
- Use warm colors (terracotta, gold, forest green) or bold monochrome
- Use sharp corners or subtle border-radius (2-4px)
- Use borders instead of shadows
- Use left-aligned or asymmetric layouts
- Use actual imagery, photography, or custom illustrations
- Write specific, concrete copy that couldn't apply to any other product
- Choose a strong aesthetic direction (brutalist, editorial, retro, minimal, etc.)

Every design choice should feel INTENTIONAL and SPECIFIC to the brand, not like a default.
`.trim();

export const DESIGN_DIRECTION_PROMPTS: Record<string, string> = {
  editorial: `
Design in an EDITORIAL style:
- Serif fonts for headlines (Playfair Display, Fraunces, or similar)
- Strong typographic hierarchy with varied sizes
- Black and white with one accent color
- Generous whitespace but asymmetric layouts
- Sharp corners, no rounded cards
- Thin borders, no shadows
- Magazine/newspaper inspired grid
- Actual photography, no illustrations
`,
  brutalist: `
Design in a BRUTALIST style:
- System fonts or monospace (Courier, Monaco)
- Raw, unpolished aesthetic
- No border-radius, everything sharp
- High contrast (black/white, or bold primary colors)
- Visible borders and structure
- No shadows, no gradients
- Dense information layout
- Intentionally "ugly" but functional
`,
  retro: `
Design in a RETRO style:
- Vintage or display fonts
- Warm color palette (cream, brown, orange, mustard)
- Subtle textures or paper backgrounds
- Rounded but chunky elements (not sleek)
- Bold, thick borders
- Playful but not childish
- 70s/80s inspired palette and shapes
- Actual personality in copy
`,
  minimal: `
Design in a TRUE MINIMAL style:
- Maximum 2 colors (black + one accent, or monochrome)
- One font family only
- Lots of whitespace
- No decorative elements
- Information-focused
- Sharp, precise alignment
- No shadows, no gradients, no effects
- Typography does all the work
`,
  luxury: `
Design in a LUXURY style:
- Serif fonts (Cormorant, EB Garamond)
- Dark backgrounds with gold/cream accents
- Generous letter-spacing
- Understated elegance
- High-quality photography
- Subtle animations, nothing flashy
- Thin, refined borders
- Whisper, don't shout
`,
  playful: `
Design in a PLAYFUL style:
- Fun display fonts (not Inter)
- Bright, saturated colors (not purple)
- Chunky, rounded shapes
- Hand-drawn or illustrated elements
- Irregular layouts
- Animations and interactions
- Personality in copy and microcopy
- Feels human-made
`,
};

// ============================================================================
// TASK-SPECIFIC PROMPTS
// ============================================================================

export const PROMPTS: PromptTemplate[] = [
  {
    id: 'landing-page',
    name: 'Landing Page',
    description: 'Generate a landing page that doesn\'t look AI-generated',
    useCase: 'Creating a new landing page from scratch',
    variables: ['PRODUCT_NAME', 'PRODUCT_DESCRIPTION', 'TARGET_AUDIENCE', 'STYLE_DIRECTION'],
    template: `
Create a landing page for {{PRODUCT_NAME}}.

Product: {{PRODUCT_DESCRIPTION}}
Target audience: {{TARGET_AUDIENCE}}
Style direction: {{STYLE_DIRECTION}}

CRITICAL REQUIREMENTS - Your design must NOT include:
❌ Purple, violet, or indigo as primary colors
❌ Gradients (especially purple-to-blue or purple-to-pink)
❌ Inter, Space Grotesk, or generic sans-serif fonts
❌ 3D blobs, orbs, or abstract floating decorations
❌ Centered hero with "Get Started Free" button
❌ Dark slate/gray backgrounds (#0f0f0f style)
❌ rounded-xl cards with shadow-md
❌ Glassmorphism effects
❌ Generic headlines ("Transform your X", "AI-Powered Y")

REQUIRED - Your design MUST include:
✅ A distinctive font choice (suggest 3 specific options)
✅ A color palette that isn't purple-based (suggest specific hex codes)
✅ An interesting layout that isn't just centered sections
✅ Copy that is specific to this exact product
✅ A strong visual direction (specify which: editorial, brutalist, minimal, etc.)
✅ Actual design rationale for each choice

Show me you've thought about this specific brand, not just generated a template.
`.trim(),
  },
  {
    id: 'component-refresh',
    name: 'Component Refresh',
    description: 'Restyle an existing component to not look generic',
    useCase: 'Making shadcn/ui or Tailwind components more distinctive',
    variables: ['COMPONENT_CODE', 'BRAND_DIRECTION'],
    template: `
I have this component that looks too generic/AI-generated:

\`\`\`
{{COMPONENT_CODE}}
\`\`\`

Restyle it to be more distinctive. Brand direction: {{BRAND_DIRECTION}}

Changes to make:
1. Replace any purple/violet/indigo colors with something more distinctive
2. Change rounded-lg/xl to either sharp corners OR very subtle rounding (2px)
3. Replace shadow-md with borders or background colors
4. If it uses backdrop-blur, remove it
5. Make it feel like a human designer made specific choices

Keep the functionality identical. Just make it not look like every other AI site.

Explain each styling decision you make.
`.trim(),
  },
  {
    id: 'color-palette',
    name: 'Color Palette Generator',
    description: 'Generate a non-slop color palette',
    useCase: 'Creating brand colors that aren\'t purple gradients',
    variables: ['BRAND_PERSONALITY', 'INDUSTRY'],
    template: `
Generate a color palette for a {{INDUSTRY}} brand with this personality: {{BRAND_PERSONALITY}}

BANNED COLORS (do not use):
- Any purple (#8B5CF6, #7C3AED, #6366F1, violet-*, purple-*, indigo-*)
- The typical dark mode (#0f0f0f, #111827, slate-950)
- Neon cyan/pink accent combos

Generate:
1. Primary color (with hex code)
2. Secondary color (with hex code)
3. Background color (with hex code)
4. Text color (with hex code)
5. Accent color (with hex code)

For EACH color, explain WHY it fits this specific brand (not generic reasons).

Also suggest:
- A light mode version
- A dark mode version (that isn't just slate-950)
- CSS custom properties format
- Tailwind config extension
`.trim(),
  },
  {
    id: 'typography-system',
    name: 'Typography System',
    description: 'Choose fonts that aren\'t Inter',
    useCase: 'Setting up typography for a project',
    variables: ['BRAND_PERSONALITY', 'USE_CASE'],
    template: `
Suggest a typography system for: {{USE_CASE}}
Brand personality: {{BRAND_PERSONALITY}}

BANNED FONTS (overused in AI-generated sites):
- Inter
- Space Grotesk  
- Plus Jakarta Sans
- Manrope
- DM Sans
- Poppins (borderline)

Suggest:
1. **Headline font**: Name + why it fits + Google Fonts/Fontshare link
2. **Body font**: Name + why it fits + Google Fonts/Fontshare link
3. **Mono font** (if needed): Name + why it fits

For each, provide:
- Specific weights to use
- Recommended sizes for h1/h2/h3/body/small
- Letter-spacing recommendations
- CSS implementation
- Tailwind config

The fonts should have PERSONALITY, not just be "clean and readable."
`.trim(),
  },
  {
    id: 'hero-section',
    name: 'Hero Section',
    description: 'Create a hero that breaks the mold',
    useCase: 'Designing a distinctive hero section',
    variables: ['PRODUCT_NAME', 'VALUE_PROP', 'STYLE'],
    template: `
Design a hero section for {{PRODUCT_NAME}}.
Value proposition: {{VALUE_PROP}}
Style: {{STYLE}}

THE HERO MUST NOT:
- Be centered with text stacked vertically
- Have a purple/blue gradient background
- Have floating 3D blobs or orbs
- Say "Get Started Free" or "Start Free Trial"
- Use backdrop-blur glassmorphism
- Look like every other SaaS landing page

THE HERO SHOULD:
- Have an interesting, asymmetric layout
- Use distinctive typography
- Have specific, concrete copy (not "Transform your X")
- Either use real imagery OR be purely typographic
- Make a strong visual statement
- Feel like a human designer made deliberate choices

Provide:
1. Layout description (where things are positioned)
2. Typography choices with rationale
3. Color usage with hex codes
4. Full code implementation
5. Explanation of what makes this distinctive
`.trim(),
  },
  {
    id: 'card-component',
    name: 'Card Component',
    description: 'Style cards that aren\'t shadcn defaults',
    useCase: 'Creating distinctive card designs',
    variables: ['CONTENT_TYPE', 'BRAND_STYLE'],
    template: `
Design a card component for displaying {{CONTENT_TYPE}}.
Brand style: {{BRAND_STYLE}}

AVOID (shadcn/AI defaults):
- rounded-lg or rounded-xl
- shadow-sm/md/lg
- bg-white with gray borders
- backdrop-blur transparency
- hover:scale-105

EXPLORE ALTERNATIVES:
- Sharp corners (no border-radius)
- Bold colored borders (2-4px)
- Background color differentiation (no shadows)
- Interesting hover states (color shifts, not scale)
- Unique shapes or cutouts
- Border variations (dashed, double, colored)

Provide 3 distinctly different card designs with:
1. Visual description
2. Full code
3. Explanation of design choices
`.trim(),
  },
  {
    id: 'full-design-system',
    name: 'Full Design System',
    description: 'Create a complete non-slop design system',
    useCase: 'Starting a new project with distinctive aesthetics',
    variables: ['PROJECT_NAME', 'PROJECT_TYPE', 'PERSONALITY'],
    template: `
Create a design system for {{PROJECT_NAME}} ({{PROJECT_TYPE}}).
Personality: {{PERSONALITY}}

This design system must be DISTINCTIVE and NOT look AI-generated.

BANNED ELEMENTS:
- Purple/indigo/violet color schemes
- Inter, Space Grotesk fonts
- rounded-xl + shadow-md cards
- Glassmorphism
- Dark slate backgrounds
- Purple glow effects
- 3D blob decorations
- Generic "Get Started" copy

REQUIRED DELIVERABLES:

1. **COLOR PALETTE**
   - Primary, secondary, background, text, accent (with hex codes)
   - Light and dark mode versions
   - Rationale for each choice

2. **TYPOGRAPHY**
   - Headline font (not Inter/Space Grotesk)
   - Body font
   - Size scale (h1-h6, body, small)
   - Letter-spacing and line-height

3. **SPACING SYSTEM**
   - Base unit and scale

4. **COMPONENT STYLES**
   - Buttons (3 variants)
   - Cards (2 variants)
   - Inputs
   - Navigation

5. **EFFECTS & BORDERS**
   - Border styles (not just rounded-xl)
   - Shadow approach (or lack thereof)
   - Hover/focus states

6. **TAILWIND CONFIG**
   - Complete theme extension

Each choice must feel INTENTIONAL and SPECIFIC to this brand.
`.trim(),
  },
];

// ============================================================================
// QUICK INJECTION PROMPTS
// ============================================================================

export const QUICK_INJECTIONS = {
  noSlop: `
IMPORTANT: Do NOT use these AI-cliché elements:
- Purple/indigo gradients
- Inter or Space Grotesk fonts
- 3D blobs or orbs
- rounded-xl shadow-md cards
- Centered heroes with "Get Started" CTAs
- Glassmorphism
Make distinctive, human-feeling design choices instead.
`,
  
  noPurple: `
Do NOT use purple, violet, or indigo colors. Use warm tones, bold primaries, or monochrome instead.
`,

  noInter: `
Do NOT use Inter, Space Grotesk, or generic sans-serif fonts. Choose a distinctive font with personality.
`,

  noDefaultCards: `
Do NOT use rounded-xl cards with shadow-md. Use sharp corners with borders, or background color differentiation instead.
`,

  noGlassmorphism: `
Do NOT use backdrop-blur or glassmorphism effects. Use solid colors and clear boundaries.
`,

  noBlobArt: `
Do NOT use 3D blobs, orbs, or abstract floating shapes as decoration. Use actual imagery, typography, or nothing.
`,

  noGenericCopy: `
Do NOT use generic headlines like "Transform your X" or "AI-Powered Y". Write specific copy about what the product actually does.
`,

  beSpecific: `
Every design choice should be SPECIFIC to this brand. Explain WHY you chose each color, font, and layout - not just that it "looks good."
`,
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function getPrompt(id: string, variables?: Record<string, string>): string {
  const prompt = PROMPTS.find(p => p.id === id);
  if (!prompt) {
    throw new Error(`Prompt not found: ${id}`);
  }

  let template = prompt.template;
  
  if (variables) {
    for (const [key, value] of Object.entries(variables)) {
      template = template.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), value);
    }
  }

  return template;
}

export function getDesignDirection(direction: keyof typeof DESIGN_DIRECTION_PROMPTS): string {
  return DESIGN_DIRECTION_PROMPTS[direction] || '';
}

export function combinePrompts(...parts: string[]): string {
  return parts.filter(Boolean).join('\n\n---\n\n');
}

export function withAntiSlop(prompt: string): string {
  return combinePrompts(ANTI_SLOP_SYSTEM_PROMPT, prompt);
}

// Export all prompts as a single string for easy copying
export function getAllPromptsAsText(): string {
  return `
# ANTI-SLOP PROMPT LIBRARY

## System Prompt (Add to your AI's context)

${ANTI_SLOP_SYSTEM_PROMPT}

---

## Design Direction Prompts

${Object.entries(DESIGN_DIRECTION_PROMPTS)
  .map(([name, prompt]) => `### ${name.toUpperCase()}\n${prompt}`)
  .join('\n\n')}

---

## Task-Specific Prompts

${PROMPTS.map(p => `### ${p.name}\n\n${p.description}\n\n\`\`\`\n${p.template}\n\`\`\``).join('\n\n---\n\n')}

---

## Quick Injection Snippets

Add these to any prompt:

${Object.entries(QUICK_INJECTIONS)
  .map(([name, text]) => `### ${name}\n\n\`\`\`\n${text.trim()}\n\`\`\``)
  .join('\n\n')}
`.trim();
}

