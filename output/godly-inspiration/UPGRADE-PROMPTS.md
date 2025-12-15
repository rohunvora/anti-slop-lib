# Upgrade Your Vibe-Coded Interface to Production Quality

> Transform AI-generated "slop" into award-winning design using real-world references from godly.website

## Quick Start

Copy any of these prompts and paste them into your AI assistant (Claude, ChatGPT, Cursor, etc.) to instantly improve your interface.

---

## 🚨 The "Anti-Slop" Base Prompt

**Always start with this to avoid generic AI aesthetics:**

```
CRITICAL DESIGN REQUIREMENTS - AVOID AI SLOP:

❌ DO NOT USE:
- Inter, Roboto, Arial, or system fonts as the only typography
- Purple/blue gradients on white backgrounds (the "AI startup" look)
- Generic card layouts with uniform spacing
- Predictable hero sections with centered text
- Cookie-cutter component patterns
- Safe, committee-approved color choices

✅ INSTEAD, CREATE:
- Distinctive typography choices (see font suggestions below)
- A cohesive, intentional color palette with personality
- Layouts that create visual tension and interest
- Micro-interactions that delight users
- Design decisions that feel human and opinionated

Reference these award-winning sites for inspiration:
- https://roasted.design - Playful agency with clean animation
- https://superpower.com - Health tech with scroll animations
- https://linear.app - Dark SaaS with precision
- https://vercel.com - Modern dev tool aesthetic
```

---

## 🎨 Style Injection Prompts

Add these to ANY design prompt to achieve specific aesthetics:

### For Dark Mode Excellence

```
DARK MODE STYLE (reference: https://linear.app, https://vercel.com):

Colors:
- Background: #0a0a0a (not pure black)
- Surface: #141414 for cards, #1a1a1a for elevated elements
- Text: rgba(255,255,255,0.9) primary, rgba(255,255,255,0.6) secondary
- Accent: Choose ONE vibrant color (electric blue #00d4ff, lime #84ff00, or violet #8b5cf6)
- Use glow effects: box-shadow: 0 0 20px rgba(accent, 0.3)

Typography:
- Use Inter or Geist for body, but consider Söhne, Space Grotesk, or JetBrains Mono for code/labels
- Headlines: 600-700 weight, tight letter-spacing (-0.02em)
- Add subtle text-shadow for depth on important text

Effects:
- Subtle noise/grain overlay (background-image with noise texture at 3% opacity)
- Gradient mesh backgrounds for hero sections
- Border: 1px solid rgba(255,255,255,0.1) on cards
- backdrop-blur: 12px for glassmorphism elements
```

### For Light & Clean

```
LIGHT CLEAN STYLE (reference: https://notion.so, https://linear.app light mode):

Colors:
- Background: #ffffff or warm #faf9f7
- Surface: #f5f5f5 for subtle cards
- Text: #1a1a1a primary, #6b7280 secondary
- Accent: Single bold color used sparingly
- Borders: #e5e7eb (very subtle)

Typography:
- Mix weights: 400 for body, 500 for labels, 600-700 for headlines
- Consider serif for headlines (Fraunces, Playfair) with sans body
- Generous line-height: 1.6-1.7 for body text

Layout:
- Maximum content width: 1200-1400px
- Section padding: 80-120px vertical
- Card shadows: 0 4px 20px rgba(0,0,0,0.08)
- Generous whitespace - when in doubt, add more
```

### For Playful/Creative

```
PLAYFUL CREATIVE STYLE (reference: https://roasted.design, https://kons.fyi):

Colors:
- Bold, unexpected combinations (coral + navy, lime + black)
- Use color as a feature, not just accent
- Consider gradient text for headlines

Typography:
- Oversized headlines (72px+)
- Mix typefaces intentionally
- Variable fonts for animation
- Playful letter-spacing on labels

Interactions:
- Custom cursor (expands on hover, follows with delay)
- Magnetic buttons (subtle pull toward cursor)
- Staggered reveal animations on scroll
- Hover states that transform, not just color change

Layout:
- Break the grid intentionally
- Overlapping elements
- Asymmetric compositions
- Full-bleed sections alternating with contained content
```

### For Professional SaaS

```
PROFESSIONAL SAAS STYLE (reference: https://linear.app, https://vercel.com):

Colors:
- Clean neutrals as base
- Single brand color + semantic colors (success, warning, error)
- Gradient accents on primary CTAs
- Dark mode support built-in

Typography:
- System-like but distinctive (Geist, Inter, Plus Jakarta Sans)
- Monospace for code, metrics, technical info
- Clear hierarchy: 4-5 type sizes max

Components:
- Glassmorphism cards with backdrop-blur
- Subtle hover states with transform + shadow
- Skeleton loading states
- Smooth page transitions

Layout:
- Clear information hierarchy
- Breathing room between sections
- Feature grids (2-3 columns)
- Comparison tables with hover highlights
```

---

## 🔧 Upgrade Specific Components

### Upgrade a Hero Section

```
Redesign this hero section following these principles:

BEFORE: [paste your current hero code]

UPGRADE REQUIREMENTS:
1. Typography Impact:
   - Headline: 56-80px, bold, with subtle gradient or animation
   - Subtext: 18-20px, muted color, max 60 characters per line
   
2. Visual Interest:
   - Add a background element (gradient mesh, geometric pattern, or subtle animation)
   - Include a floating product mockup or 3D element if relevant
   - Add subtle motion (floating badges, animated gradients)

3. CTAs:
   - Primary: Bold, filled button with hover animation (scale 1.02 + shadow)
   - Secondary: Ghost/outline style
   - Consider magnetic button effect on hover

4. Spacing:
   - min-height: 100vh (or 100svh)
   - Center content with flexbox
   - Scroll indicator at bottom

REFERENCE: https://superpower.com, https://amie.so
```

### Upgrade Cards/Grid

```
Redesign these cards to feel more premium:

BEFORE: [paste your current card code]

UPGRADE REQUIREMENTS:
1. Container:
   - Rounded corners: 16-24px (not 8px - too generic)
   - Border: subtle 1px with low opacity
   - Background: slightly elevated from page (#f8f8f8 on white, #141414 on dark)
   - Shadow: layered shadows for depth

2. Hover State:
   - translateY(-4px) lift effect
   - Enhanced shadow
   - Border color transition
   - Optional: image zoom within container (overflow: hidden)

3. Content Spacing:
   - Generous padding: 24-32px
   - Clear visual hierarchy
   - Icon or image at top, title, description, link at bottom

4. Grid Layout:
   - Consider bento-style mixed sizes
   - Gap: 16-24px
   - Responsive: 1 col mobile, 2-3 cols tablet, 3-4 cols desktop

REFERENCE: https://notion.so, https://linear.app
```

### Upgrade Navigation

```
Redesign this navigation to feel more polished:

BEFORE: [paste your current nav code]

UPGRADE REQUIREMENTS:
1. Container:
   - Fixed or sticky positioning
   - Backdrop blur for transparency effect
   - Subtle border-bottom or shadow when scrolled
   - Height: 64-80px

2. Logo:
   - Left-aligned
   - Hover: subtle opacity or scale change

3. Links:
   - Centered or right-aligned
   - Hover: underline animation (scale from 0 to 1)
   - Active state: different color or weight
   - Consider icons for key actions

4. CTA Button:
   - Contrasting style from links
   - Clear visual weight

5. Mobile:
   - Hamburger menu with smooth slide-in
   - Full-screen overlay option
   - Staggered link animations

REFERENCE: https://vercel.com, https://linear.app
```

### Upgrade Buttons

```
Redesign these buttons to feel interactive and premium:

BEFORE: [paste your current button code]

UPGRADE REQUIREMENTS:
1. Primary Button:
   - Solid background, white text
   - Padding: 12px 24px (generous)
   - Border-radius: 8-12px
   - Hover: scale(1.02), enhanced shadow, slight color shift
   - Active: scale(0.98)
   - Transition: all 150ms ease

2. Secondary Button:
   - Ghost/outline style
   - Border: 1px solid with hover fill
   - Same sizing as primary

3. Icon Buttons:
   - Square aspect ratio
   - Icon centered
   - Hover: background color change

4. Advanced (optional):
   - Magnetic effect (button follows cursor slightly)
   - Gradient hover reveal
   - Loading state with spinner

CSS Variables for consistency:
--btn-padding: 12px 24px;
--btn-radius: 10px;
--btn-transition: all 150ms ease;

REFERENCE: https://vercel.com/ship, https://linear.app
```

---

## 🎬 Animation Upgrade Prompts

### Add Scroll Animations

```
Add scroll-triggered animations to this page:

REQUIREMENTS:
1. Use Framer Motion (React) or GSAP ScrollTrigger

2. Animation Pattern for Sections:
   - Initial: opacity 0, translateY 40px
   - Animate: opacity 1, translateY 0
   - Transition: 0.6-0.8s ease-out
   - Stagger children by 0.1s

3. For Images:
   - Scale from 0.95 to 1
   - Optional: clip-path reveal

4. For Text:
   - Word-by-word or line-by-line reveal
   - Slight blur-to-clear effect

5. Performance:
   - Use will-change sparingly
   - Respect prefers-reduced-motion
   - Don't animate too many elements at once

REFERENCE: https://superpower.com, https://lusion.co
```

### Add Page Transitions

```
Add smooth page transitions to this Next.js app:

REQUIREMENTS:
1. Exit Animation:
   - Fade out (opacity 0)
   - Optional: slight scale down (0.98)
   - Duration: 300ms

2. Enter Animation:
   - Fade in (opacity 1)
   - Optional: scale up from 0.98
   - Duration: 400ms
   - Stagger main content areas

3. Implementation:
   - Use Framer Motion's AnimatePresence
   - Wrap page content in motion.div
   - Add loading state between pages

4. Loading State:
   - Minimal loading indicator
   - Or: skeleton screens for content areas

REFERENCE: https://roasted.design transitions
```

---

## 📐 Layout Upgrade Prompts

### Create Bento Grid

```
Convert this feature list into a bento-style grid:

CURRENT FEATURES: [list your features]

REQUIREMENTS:
1. Grid Setup:
   - CSS Grid with 4 columns on desktop
   - Gap: 16-20px
   - Some items span 2 columns or 2 rows

2. Card Variations:
   - 1x1: Icon + title + short description
   - 2x1: Featured with more content or image
   - 1x2: Vertical list or metrics
   - 2x2: Hero feature with visual

3. Visual Hierarchy:
   - Largest card for most important feature
   - Group related features visually

4. Styling:
   - Consistent border-radius (16-24px)
   - Subtle borders or shadows
   - Hover states that lift cards

REFERENCE: https://vercel.com features, Apple product pages
```

### Create Immersive Scroll

```
Convert this into a scroll-driven immersive experience:

CONTENT: [your content sections]

REQUIREMENTS:
1. Full-height Sections:
   - Each section: min-height 100vh
   - Content centered vertically
   - Optional: scroll-snap for precision

2. Scroll-linked Effects:
   - Progress indicator
   - Sticky elements that persist across sections
   - Parallax on background elements

3. Section Transitions:
   - Fade between sections
   - Or: horizontal slide effect
   - Color scheme transitions between sections

4. Navigation:
   - Dot indicators on side
   - Click to scroll to section
   - Highlight current section

REFERENCE: https://superpower.com, Apple product pages
```

---

## 🔗 Visual Reference Prompts

Use actual websites as visual references:

### For SaaS/Product

```
Create a landing page for [YOUR PRODUCT] using these visual references:

PRIMARY REFERENCE: https://linear.app
- Clean, dark aesthetic
- Feature-focused sections
- Subtle animations

SECONDARY REFERENCES:
- https://vercel.com - Developer-focused messaging
- https://notion.so - Clean information hierarchy
- https://amie.so - Friendly SaaS with character

Take the best elements from each while creating something unique for [YOUR PRODUCT].
```

### For Portfolio/Creative

```
Create a portfolio for [YOUR WORK] using these visual references:

PRIMARY REFERENCE: https://roasted.design
- Playful but professional
- Strong project showcases
- Memorable interactions

SECONDARY REFERENCES:
- https://kons.fyi - Minimal personal portfolio
- https://daniel-sun.com - Designer portfolio
- https://lusion.co - 3D and immersive

Balance personality with professionalism.
```

### For Agency/Studio

```
Create an agency website for [YOUR AGENCY] using these visual references:

PRIMARY REFERENCE: https://unveil.fr
- Horizontal scroll gallery
- Strong typography
- Smooth transitions

SECONDARY REFERENCES:
- https://metalab.com - Clean agency showcase
- https://bigpicturecompany.com - Bold visuals
- https://superhi.com - Educational + creative

Showcase work prominently while communicating expertise.
```

---

## 📋 Complete Upgrade Workflow

### Step 1: Assess Current Design

```
Analyze my current interface and identify "AI slop" patterns:

[PASTE YOUR CODE OR DESCRIBE YOUR DESIGN]

Look for:
1. Generic font choices (Inter/Roboto without intention)
2. Predictable purple/blue gradient usage
3. Uniform spacing without rhythm
4. Missing hover states and interactions
5. Cookie-cutter layouts
6. Lack of personality or distinctive choices

Provide specific recommendations for each issue found.
```

### Step 2: Choose Style Direction

```
Based on my product type ([YOUR PRODUCT TYPE]), recommend a style direction:

Options:
A) Dark & Precise (Linear-style) - for dev tools, technical products
B) Light & Clean (Notion-style) - for productivity, general SaaS
C) Playful & Creative (Roasted-style) - for agencies, portfolios
D) Bold & Immersive (Superpower-style) - for consumer products

For each option, provide:
- Color palette
- Typography pairing
- Key interaction patterns
- Reference websites
```

### Step 3: Apply Upgrades

```
Upgrade my [COMPONENT] following the [CHOSEN STYLE] direction:

CURRENT CODE:
[paste code]

Apply these specific improvements:
1. Typography: [specific font + size recommendations]
2. Colors: [specific hex values]
3. Spacing: [specific padding/margin values]
4. Interactions: [specific hover/transition effects]
5. Polish: [shadows, borders, micro-details]

Output production-ready code with CSS variables for maintainability.
```

### Step 4: Final Polish

```
Review this interface for final polish:

[PASTE UPDATED CODE]

Check for:
1. Consistency - Do all similar elements share styling?
2. Responsiveness - Does it work on mobile?
3. Accessibility - Sufficient contrast, focus states, semantic HTML?
4. Performance - Are animations GPU-accelerated?
5. Edge cases - Empty states, loading states, error states?

Provide final refinements needed for production.
```

---

## 💡 Pro Tips

1. **Always provide visual references** - Point AI to real URLs for context
2. **Be specific about what you don't want** - "No purple gradients" is clearer than "make it unique"
3. **Iterate in stages** - Don't try to perfect everything at once
4. **Use CSS variables** - Makes consistent updates easier
5. **Test on real devices** - AI can't see your actual output
6. **Respect the reference, don't copy** - Take inspiration, create something new

---

*Generated from godly.website patterns - Upgrade your vibe-coded interfaces to production quality.*

