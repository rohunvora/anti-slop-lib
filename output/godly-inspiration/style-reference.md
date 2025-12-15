# Design Style Reference Guide

## How to Use This Guide

Copy the relevant sections into your AI assistant prompt to achieve specific design styles.

---

## Style Definitions

### Animation

Implement smooth, purposeful animations throughout the site. Use CSS transitions, keyframes, or libraries like Framer Motion/GSAP.

**Examples:**
- [Roasted](https://roasted.design)
- [Notion](https://notion.so)
- [SuperHi](https://superhi.com)

### Fun

Create a playful, engaging experience with unexpected interactions, bold colors, and delightful micro-animations.

**Examples:**
- [Roasted](https://roasted.design)
- [Kons](https://kons.fyi)
- [UNVEIL®](https://unveil.fr)

### Minimal

Strip design to essential elements. Use a limited color palette (2-3 colors), simple geometric shapes, and ample negative space.

**Examples:**
- [Roasted](https://roasted.design)
- [Kons](https://kons.fyi)
- [UNVEIL®](https://unveil.fr)

### Single Page

Build an immersive single-page experience with smooth scrolling and section-based navigation.

**Examples:**
- [Roasted](https://roasted.design)
- [Kons](https://kons.fyi)
- [Shuttle](https://shuttle.zip)

### Interactive

Implement cursor-following effects, hover state animations, and micro-interactions throughout. Elements should respond to user input.

**Examples:**
- [Roasted](https://roasted.design)
- [Kons](https://kons.fyi)
- [UNVEIL®](https://unveil.fr)

### Light

Use a predominantly light color scheme with white/off-white backgrounds. Add depth through subtle shadows and muted accent colors.

**Examples:**
- [Roasted](https://roasted.design)
- [Kons](https://kons.fyi)
- [UNVEIL®](https://unveil.fr)

### Dark

Implement a dark theme with deep backgrounds (#0a0a0a to #1a1a1a). Use high-contrast text and glowing accent colors.

**Examples:**
- [SavoirFaire](https://savoirfaire.nyc)
- [Shuttle](https://shuttle.zip)
- [Max Yinger](https://yinger.dev)

### Big Background Image

Use a full-viewport hero section with a high-quality, atmospheric background image. Apply subtle overlays for text readability.

**Examples:**
- [Superpower](https://superpower.com)
- [Augen](https://augen.pro)
- [Amie](https://amie.so)

### Scrolling Animation

Use scroll-triggered animations with libraries like GSAP ScrollTrigger, Framer Motion, or CSS scroll-driven animations.

**Examples:**
- [Superpower](https://superpower.com)
- [Augen](https://augen.pro)
- [Limitless](https://limitless.ai)

### Long Scrolling

Design an immersive single-page experience with distinct sections that flow narratively. Use sticky elements and parallax effects.

**Examples:**
- [Superpower](https://superpower.com)
- [Bigpicture Company](https://www.bpco.kr)
- [Tatem](https://tatem.com)

### Clean

Maintain generous whitespace, clear visual hierarchy, and minimal decorative elements. Focus on typography and content clarity.

**Examples:**
- [UNVEIL®](https://unveil.fr)
- [Superpower](https://superpower.com)
- [Augen](https://augen.pro)

### Bold Typography

Feature oversized display text, mix font weights dramatically, and use typography as a primary design element.

### Gradient

Apply smooth color gradients for backgrounds, text, or UI elements. Use mesh gradients or multi-stop linear gradients.

**Examples:**
- [Limitless](https://limitless.ai)
- [AuthKit](https://authkit.com)
- [Atlas](https://atlascard.com)

### 3D

Incorporate 3D elements using Three.js, WebGL, or CSS 3D transforms. Add depth through perspective and spatial animations.

**Examples:**
- [SavoirFaire](https://savoirfaire.nyc)
- [KidSuper World](https://kidsuper.world)
- [Bigpicture Company](https://www.bpco.kr)

### Brutalist

Embrace raw, unpolished aesthetics with exposed structural elements, harsh contrasts, and unconventional layouts.

**Examples:**
- [Raw Materials](https://therawmaterials.com)
- [SuperHi Plus](https://superhi.plus)

### Glassmorphism

Use frosted glass effects with backdrop-blur, subtle borders, and layered transparent surfaces.

### Grid Layout

Structure content in a clear grid system. Use CSS Grid for complex layouts with clear visual rhythm.

### Asymmetric

Break from conventional layouts with intentionally unbalanced compositions. Create visual tension and interest.

### Video Background

Use looping video backgrounds for immersive hero sections. Ensure videos are optimized and have fallbacks.

### Noise/Grain

Add subtle noise textures to backgrounds or images for a tactile, film-like quality.

### Retro

Incorporate nostalgic design elements like serif fonts, muted color palettes, and classic layout patterns.

**Examples:**
- [Linear: Change](https://linear.app/change)

### Experimental

Push boundaries with unconventional navigation, abstract visuals, and innovative interaction patterns.

---

## Typography Guide

### Inter

Highly legible sans-serif for UI. Modern and versatile. Pairs with: Fraunces, Playfair Display, or Space Grotesk.

**Used by:**
- [Roasted](https://roasted.design)
- [Kons](https://kons.fyi)
- [Notion](https://notion.so)

### NB International

Modern geometric sans-serif. Pairs well with: GT America, Inter, or a serif like Editorial New.

**Used by:**
- [UNVEIL®](https://unveil.fr)
- [Superpower](https://superpower.com)

### Space Grotesk

Tech-forward sans-serif with distinctive character shapes.

### Manrope

Modern geometric sans-serif, open-source alternative to paid fonts.

**Used by:**
- [Shuttle](https://shuttle.zip)
- [10x Designers](https://10xdesigners.co)

### SF Pro

Apple's system font. Clean and professional.

### Söhne

Contemporary Swiss-style sans-serif. Elegant and versatile.

**Used by:**
- [Stripe Sessions](https://stripe.com/sessions)

### GT Walsheim

Friendly geometric sans-serif with personality.

### Neue Montreal

Modern grotesk with character. Works well at large sizes.

**Used by:**
- [Pam](https://thisispam.com)
- [JP](https://www.jp.works)
- [Field Day Sound](https://www.fielddaysound.tv)

---

## Framework Tips

### React

Use React with hooks for state management. Consider Framer Motion for animations.

### Next.js

Leverage App Router, Server Components, and next/image for optimization.

### Tailwind CSS

Use utility-first classes. Consider tailwind-animate or @tailwindcss/typography plugins.

### Radix UI

Use unstyled, accessible components as a foundation for custom UI.

### Framer

Use Framer's visual builder for rapid prototyping with code-level customization.

### GSAP

Industry-standard animation library. Use ScrollTrigger for scroll-based animations.

### Three.js

WebGL library for 3D graphics. Consider React Three Fiber for React integration.

### Vercel

Deploy with Vercel for optimal Next.js performance, edge functions, and analytics.
