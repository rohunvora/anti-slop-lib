# Godly Design Prompts - LLM Instructions for Award-Winning Web Design

> Based on patterns from [godly.website](https://godly.website/) - Astronomically good web design inspiration
> 
> **How to use:** Copy the relevant prompt or combine sections to create your desired design style.

---

## Table of Contents

1. [Quick Prompts by Style](#quick-prompts-by-style)
2. [Typography Systems](#typography-systems)
3. [Color Approaches](#color-approaches)
4. [Animation Patterns](#animation-patterns)
5. [Layout Techniques](#layout-techniques)
6. [Hero Section Patterns](#hero-section-patterns)
7. [Framework-Specific Tips](#framework-specific-tips)
8. [Complete Example Prompts](#complete-example-prompts)

---

## Quick Prompts by Style

### 🌑 Dark & Moody

```
Design a dark-themed website with these characteristics:

COLORS:
- Background: Deep black (#0a0a0a) to charcoal (#1a1a1a) gradient
- Primary text: Off-white (#fafafa) with 90% opacity
- Accents: Electric blue (#00d4ff), hot pink (#ff006e), or lime (#84ff00)
- Use glowing effects on CTAs and interactive elements

TYPOGRAPHY:
- Headlines: Large, bold sans-serif (144px+), consider Neue Montreal or Space Grotesk
- Body: High contrast, generous line-height (1.6-1.8)
- Use letter-spacing on uppercase labels

EFFECTS:
- Subtle noise/grain overlay (3-5% opacity)
- Gradient meshes for depth
- Glow effects on hover states
- Smooth page transitions with opacity fades

LAYOUT:
- Full-viewport sections
- Generous padding (80-120px)
- Content centered with max-width (1200-1400px)
```

---

### ☀️ Light & Clean

```
Design a light, minimal website with these characteristics:

COLORS:
- Background: Pure white (#ffffff) or warm off-white (#faf9f7)
- Text: Near-black (#1a1a1a) or warm gray (#374151)
- Accents: Single accent color, used sparingly
- Subtle gray for borders and dividers (#e5e7eb)

TYPOGRAPHY:
- Headlines: Mix of serif and sans-serif for contrast
- Consider: Inter + Fraunces, or Manrope + Editorial New
- Body: 16-18px, line-height 1.7
- Use font weight variations for hierarchy

EFFECTS:
- Soft box shadows (0 4px 20px rgba(0,0,0,0.08))
- Subtle hover transitions (transform, opacity)
- Clean micro-animations on scroll

LAYOUT:
- Clear grid structure (12-column)
- Generous whitespace between sections
- Asymmetric compositions for visual interest
- Cards with subtle borders or shadows
```

---

### 🎨 Bold & Experimental

```
Design an experimental, boundary-pushing website with these characteristics:

COLORS:
- High contrast, unexpected combinations
- Consider: Black + Acid Yellow, Navy + Coral, Cream + Electric Blue
- Use color blocking for section differentiation

TYPOGRAPHY:
- Oversized display text (200px+ headlines)
- Mix typefaces intentionally (serif + mono, for example)
- Broken or overlapping text layouts
- Variable font animations

EFFECTS:
- Custom cursor with trailing effects
- Magnetic button interactions
- Scroll-jacking or horizontal scroll sections
- 3D transforms and perspective shifts
- Text reveal animations on scroll

LAYOUT:
- Break the grid intentionally
- Overlapping elements
- Full-bleed images with text overlay
- Asymmetric, tension-creating compositions
```

---

### 💼 Professional SaaS

```
Design a modern SaaS marketing website with these characteristics:

COLORS:
- Light mode default with dark mode support
- Primary: Trustworthy blue (#2563eb) or purple (#7c3aed)
- Background: White with subtle blue/purple tints
- Gradients: Soft, multi-stop gradients for hero sections

TYPOGRAPHY:
- Headlines: Bold sans-serif, 48-72px (Inter, Plus Jakarta Sans, Manrope)
- Body: 16-18px, highly readable
- Feature labels: Uppercase, small, muted color

EFFECTS:
- Glassmorphism cards (backdrop-blur: 20px)
- Floating 3D product mockups
- Subtle animations that demonstrate product features
- Smooth scroll-linked animations

LAYOUT:
- Clear section hierarchy: Hero → Features → Social Proof → Pricing → CTA
- Feature grids (2-3 columns)
- Comparison tables
- Testimonial carousels
- Sticky navigation with scroll progress
```

---

### 🎭 Creative Portfolio

```
Design a creative portfolio website with these characteristics:

COLORS:
- High contrast black and white base
- Single accent color for personality
- Or: Limited palette of 2-3 intentional colors

TYPOGRAPHY:
- Statement typography as design element
- Mix of display and functional fonts
- Consider: GT Sectra, Neue Haas, or custom/variable fonts
- Oversized project titles

EFFECTS:
- Image reveal animations (clip-path, scale)
- Smooth page transitions between projects
- Custom cursor that interacts with content
- Hover effects that reveal project details

LAYOUT:
- Project-focused grid or list
- Full-screen project showcases
- Horizontal scroll galleries
- Minimal navigation (hidden or minimal)
- Contact section with personality
```

---

## Typography Systems

### System 1: Modern Swiss

```
FONTS:
- Headlines: Neue Haas Grotesk or Helvetica Neue (Bold)
- Body: Same family, Regular weight
- Accents: Monospace for technical labels

SCALE:
- H1: 72px / 80px line-height
- H2: 48px / 56px
- H3: 32px / 40px
- Body: 18px / 28px
- Caption: 14px / 20px

CHARACTERISTICS:
- Tight letter-spacing on headlines (-0.02em)
- Generous body line-height
- Clear hierarchy through size, not decoration
```

### System 2: Elegant Editorial

```
FONTS:
- Headlines: Serif (Editorial New, Fraunces, Playfair Display)
- Body: Sans-serif (Inter, Source Sans)
- Pull quotes: Italic serif

SCALE:
- H1: 64px / 72px
- H2: 40px / 48px
- H3: 28px / 36px
- Body: 17px / 28px

CHARACTERISTICS:
- Mix serif headlines with sans body
- Generous margins around headlines
- Use italics for emphasis, not bold
```

### System 3: Tech-Forward

```
FONTS:
- Headlines: Geometric sans (Space Grotesk, Archivo, Outfit)
- Body: Same family or Inter
- Code/Labels: JetBrains Mono or similar

SCALE:
- H1: 56px / 64px
- H2: 36px / 44px
- H3: 24px / 32px
- Body: 16px / 26px
- Code: 14px / 24px

CHARACTERISTICS:
- Consistent spacing rhythm
- Uppercase labels with letter-spacing
- Tabular numbers for data
```

---

## Color Approaches

### Approach 1: Monochrome + Accent

```css
:root {
  /* Base */
  --bg: #ffffff;
  --text: #1a1a1a;
  --text-muted: #6b7280;
  --border: #e5e7eb;
  
  /* Single Accent */
  --accent: #2563eb; /* Choose your brand color */
  --accent-light: #dbeafe;
}
```

### Approach 2: Dark Mode Native

```css
:root {
  /* Dark Foundation */
  --bg-primary: #0a0a0a;
  --bg-secondary: #141414;
  --bg-tertiary: #1f1f1f;
  
  /* Text */
  --text-primary: rgba(255, 255, 255, 0.95);
  --text-secondary: rgba(255, 255, 255, 0.7);
  --text-muted: rgba(255, 255, 255, 0.4);
  
  /* Accents with Glow */
  --accent: #00d4ff;
  --accent-glow: 0 0 20px rgba(0, 212, 255, 0.4);
}
```

### Approach 3: Warm Neutrals

```css
:root {
  /* Warm Foundation */
  --bg: #faf9f7;
  --bg-warm: #f5f0eb;
  --text: #2d2a26;
  --text-muted: #78716c;
  
  /* Earthy Accent */
  --accent: #b45309;
  --accent-light: #fef3c7;
}
```

---

## Animation Patterns

### Pattern 1: Scroll Reveal

```
Implement scroll-triggered animations:

1. Elements start with: opacity: 0, transform: translateY(40px)
2. On scroll into view: opacity: 1, transform: translateY(0)
3. Transition: 0.8s ease-out
4. Stagger children by 0.1s each
5. Use IntersectionObserver or Framer Motion's whileInView
```

### Pattern 2: Smooth Page Transitions

```
Create cinematic page transitions:

1. Exit animation: fade out + slight scale down (0.98)
2. Enter animation: fade in + scale up from 0.98 to 1
3. Duration: 0.4-0.6s
4. Use Next.js App Router + Framer Motion AnimatePresence
5. Add loading state with skeleton or spinner
```

### Pattern 3: Interactive Hover States

```
Design engaging hover interactions:

BUTTONS:
- Scale to 1.02 on hover
- Subtle background color shift
- Optional: magnetic effect following cursor

CARDS:
- Lift with shadow (translateY(-4px), enhanced shadow)
- Border color transition
- Image zoom within container

LINKS:
- Underline animation (scale from 0 to 1)
- Color transition
- Optional: arrow icon slide
```

### Pattern 4: Custom Cursor

```
Implement a custom cursor:

1. Replace default cursor with styled div
2. Follow mouse with slight lerp/delay (0.1-0.15)
3. States:
   - Default: small dot or ring
   - Hover link: expand + change color
   - Hover image: "View" text or expand significantly
4. Blend mode: difference for automatic contrast
5. Hide on touch devices
```

---

## Layout Techniques

### Full-Viewport Sections

```
Create immersive full-screen sections:

STRUCTURE:
- Each section: min-height: 100vh (or 100svh for mobile)
- Content centered vertically with flexbox
- Optional: snap scrolling (scroll-snap-type: y mandatory)

SPACING:
- Internal padding: 5-10vh top/bottom
- Content max-width: 1200-1400px
- Side padding: 5vw minimum
```

### Bento Grid

```
Create a modern bento-style grid:

GRID SETUP:
- display: grid
- grid-template-columns: repeat(4, 1fr)
- gap: 16-24px

CARD VARIATIONS:
- Single cell: basic feature
- 2x1 horizontal: featured content
- 1x2 vertical: list or metrics
- 2x2: hero feature or image

STYLING:
- Rounded corners (16-24px)
- Subtle border or shadow
- Hover state with scale/shadow
```

### Asymmetric Two-Column

```
Create visual interest with asymmetry:

LAYOUT:
- Two columns: 60/40 or 55/45 split
- Alternate which side has more content
- Use sticky positioning for shorter column

TECHNIQUE:
- One column: large image or feature
- Other column: text content with more padding
- Offset vertical alignment for tension
```

---

## Hero Section Patterns

### Pattern 1: Statement Typography

```
Hero with impactful text:

LAYOUT:
- Full viewport height
- Centered massive headline (100-200px)
- Subtle subtext below
- Scroll indicator at bottom

ELEMENTS:
- Headline with split or animated text
- Gradient or image behind text
- Floating badges or metrics
- Simple nav at top

ANIMATION:
- Letters animate in sequentially
- Subtle background movement
```

### Pattern 2: Product Showcase

```
Hero featuring product:

LAYOUT:
- Split: text left, product right
- Or: text overlay on product image
- CTA buttons prominent

ELEMENTS:
- Product screenshot/mockup floating with shadow
- Feature callouts around product
- Gradient background supporting product

ANIMATION:
- Product floats subtly
- Mouse parallax on product layers
- CTA has attention-grabbing state
```

### Pattern 3: Video Background

```
Immersive video hero:

LAYOUT:
- Full viewport video
- Dark overlay for text contrast
- Centered content

ELEMENTS:
- Muted, looping video
- Clear headline over video
- Strong CTA contrast
- Scroll prompt

TECHNICAL:
- Video compressed (< 5MB)
- Poster image fallback
- Reduced motion alternative
```

---

## Framework-Specific Tips

### Next.js + Tailwind

```
Create a modern Next.js site:

SETUP:
- App Router for layouts and loading states
- Tailwind with custom theme extension
- next/font for optimized typography
- next/image for all images

ANIMATION LIBRARIES:
- Framer Motion for complex animations
- tailwindcss-animate for simple utilities

PERFORMANCE:
- Use Server Components where possible
- Implement loading.tsx for transitions
- Optimize images with sharp
```

### React + Framer Motion

```
Animation-rich React site:

PATTERNS:
- AnimatePresence for enter/exit
- whileInView for scroll triggers
- useScroll + useTransform for parallax
- motion.div for all animated elements

VARIANTS:
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
}

STAGGER:
- staggerChildren: 0.1 in parent
- Children use variants
```

---

## Complete Example Prompts

### Example 1: AI SaaS Landing Page

```
Create a landing page for an AI-powered writing tool with these specifications:

AESTHETIC:
- Dark theme with purple/blue gradient accents
- Glassmorphism cards for features
- Floating 3D elements suggesting AI/tech

SECTIONS:
1. Hero: Bold headline "Write Better, Faster" with animated gradient text
   - Subtext explaining the AI assistance
   - Two CTAs: "Start Free" (primary) and "Watch Demo" (secondary)
   - Floating UI mockup showing the product

2. Logo bar: "Trusted by teams at" with grayscale company logos

3. Features: Bento grid with 6 features
   - Large card: Main feature with animation
   - Medium cards: Secondary features with icons
   - Each card has glassmorphism styling

4. How it works: 3-step process with numbered cards
   - Connecting lines between steps
   - Icons or small animations for each

5. Testimonials: Carousel of customer quotes
   - Avatar, name, role, company
   - Star rating
   - Quote with highlight

6. Pricing: 3-tier pricing table
   - Free, Pro, Enterprise
   - Feature comparison
   - Highlighted "Popular" tier

7. CTA: Final conversion section
   - Gradient background
   - Strong headline
   - Email capture or direct signup

TECHNICAL:
- Next.js 14 with App Router
- Tailwind CSS
- Framer Motion for animations
- Responsive design (mobile-first)
```

### Example 2: Creative Agency Portfolio

```
Create a portfolio website for a design agency with these specifications:

AESTHETIC:
- Black and white base with single accent color (coral #ff6b6b)
- Bold, oversized typography
- Editorial, magazine-inspired layout
- Custom cursor that reacts to content

SECTIONS:
1. Hero: Full-screen with agency name in massive text
   - Animated text reveal on load
   - Subtle background movement
   - Scroll indicator

2. Work showcase: Project grid
   - Mix of sizes (featured projects larger)
   - Hover reveals project name and category
   - Click opens project detail
   - Smooth page transitions

3. About: Split layout
   - Team philosophy text on left
   - Grid of team photos on right
   - Stats/metrics inline with text

4. Services: Horizontal scroll section
   - Large service titles
   - Brief descriptions
   - Related project thumbnails

5. Contact: Minimal form
   - Large input fields
   - Personality in microcopy
   - Social links

INTERACTIONS:
- Custom cursor (dot that expands on interactive elements)
- Magnetic buttons
- Text reveal animations on scroll
- Smooth project transitions
- Subtle parallax on images

TECHNICAL:
- Next.js or Astro
- GSAP for advanced animations
- CSS Grid for layouts
- View Transitions API for page changes
```

### Example 3: E-commerce Product Page

```
Create a premium product page for a tech gadget with these specifications:

AESTHETIC:
- Clean, Apple-inspired design
- Light theme with subtle gradients
- Focus on product photography
- Smooth scroll-linked animations

SECTIONS:
1. Hero: Large product image
   - 3D rotation on scroll or interaction
   - Price and key spec badges
   - "Buy Now" sticky CTA

2. Features showcase: Scroll-linked reveals
   - Each feature triggers product angle change
   - Large feature text with supporting detail
   - Use clip-path reveals for drama

3. Specifications: Expandable sections
   - Technical specs in organized groups
   - Comparison with previous model
   - Downloadable spec sheet

4. Gallery: Full-width image section
   - High-res lifestyle photography
   - Lightbox on click
   - Touch-friendly carousel on mobile

5. Reviews: Customer reviews section
   - Rating summary with distribution
   - Individual reviews with helpful/not helpful
   - Filter by rating or keyword

6. Related products: Carousel
   - Other items in the collection
   - Quick-add functionality

ANIMATIONS:
- Product 3D rotation following scroll
- Specs reveal as you scroll
- Image zoom on hover
- Smooth add-to-cart confirmation

TECHNICAL:
- React with Three.js for 3D
- Intersection Observer for scroll triggers
- Optimized images with multiple resolutions
- Fast, accessible checkout flow
```

---

## Usage Tips

1. **Combine sections:** Mix and match typography systems, color approaches, and patterns to create unique designs.

2. **Reference real sites:** Always include "Reference: [godly.website link]" to give the AI visual context.

3. **Be specific:** The more detail you provide about animations, colors, and layout, the better the result.

4. **Iterate:** Start with the aesthetic section, generate, then refine with specific component prompts.

5. **Include constraints:** Mention "mobile-first", "accessible", "performant" for production-quality code.

---

*Generated to help achieve godly-tier web design with AI assistance.*


