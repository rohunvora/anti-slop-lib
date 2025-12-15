# Anti-Slop Design Oracle — Final Execution Plan

## Mission

Build a design system that makes actual designers say "damn, this is good."

Not "good for AI-generated." Not "surprisingly decent." **Actually good.**

---

## The Six Design Kits

### Font Registry (The 80% of Taste)

| Kit | Display Font | Body Font | Source | Why |
|-----|--------------|-----------|--------|-----|
| **Warm Editorial** | Fraunces | Satoshi | [Google](https://fonts.google.com/specimen/Fraunces) / [Fontshare](https://www.fontshare.com/fonts/satoshi) | Fraunces has New Yorker swashes; Satoshi is quirky-clean |
| **Swiss Precision** | Mona Sans | Mona Sans | [GitHub](https://github.com/github/mona-sans) | The Söhne killer. Variable weight/stretch. Stark perfection. |
| **Brutalist Raw** | Space Mono | System Stack | [Google](https://fonts.google.com/specimen/Space+Mono) | Hard-edged mono = brutalism hallmark |
| **Forest Organic** | Newsreader | General Sans | [Google](https://fonts.google.com/specimen/Newsreader) / [Fontshare](https://www.fontshare.com/fonts/general-sans) | High-contrast authority meets engineered humanity |
| **Noir Luxury** | Cormorant Garamond | Satoshi | [Google](https://fonts.google.com/specimen/Cormorant+Garamond) | Fashion-week elegance at massive sizes |
| **Vibrant Play** | Cabinet Grotesk | Lexend | [Fontshare](https://www.fontshare.com/fonts/cabinet-grotesk) / [Google](https://fonts.google.com/specimen/Lexend) | Cabinet's ink traps = playful; Lexend = friendly readable |

**Fontshare fonts (Satoshi, General Sans, Cabinet Grotesk):** Free commercial use, higher quality than Google Fonts. Self-host or use their CDN.

---

### Gold Standard Live Targets

**Inspect these. Don't look at Dribbble (it's fake). Study how real sites handle spacing, grid, typography.**

| Kit | Target 1 | Target 2 | What to Study |
|-----|----------|----------|---------------|
| **Warm Editorial** | [The Atlantic](https://www.theatlantic.com/) | [Substack](https://substack.com/) | Borders, cream backgrounds, serif hierarchy, "Reader" view |
| **Swiss Precision** | [Readymag](https://readymag.com/) | [Linear](https://linear.app/) | Grid severity, 1px borders, perfect dark mode |
| **Brutalist Raw** | [Gumroad](https://gumroad.com/) | [The Drunken Canal](https://www.thedrunkencanal.com/) | Hard black borders, flat cards, raw HTML energy |
| **Forest Organic** | [Aesop](https://www.aesop.com/) | [Patagonia](https://www.patagonia.com/) | Calm organic luxury, muted earth tones, negative space |
| **Noir Luxury** | [SSENSE](https://www.ssense.com/) | [Oribe](https://www.oribe.com/) | Brutal-luxury black/white, gold/black ratios |
| **Vibrant Play** | [LottieFiles](https://lottiefiles.com/) | [Duolingo](https://www.duolingo.com/) | Bright motion, button "squish" animations, friendly rounds |

---

### Technical Foundation

**Required libraries:**

| Purpose | Library | Why |
|---------|---------|-----|
| Theme switching | [next-themes](https://github.com/pacocoursey/next-themes) | Prevents flash-of-wrong-theme. Industry standard. |
| Component primitives | [Radix UI](https://www.radix-ui.com/) | Don't build Dialog/Dropdown from scratch. A11y baked in. |
| A11y validation | [axe-core](https://github.com/dequelabs/axe-core) | Programmatic. If contrast fails, kit fails. |
| Performance | Lighthouse CI | Enforce 95+ score |
| CSS sanity | CSS Stats logic | Max 8 unique font sizes. 50 = slop. |

**The Cardinal Rule: Semantic Tokens Only**

```javascript
// ❌ SLOP — hardcoded colors that can't swap
<button class="bg-blue-500 text-white hover:bg-blue-600">

// ✅ ANTI-SLOP — semantic tokens via CSS variables
<button class="bg-primary text-primary-foreground hover:opacity-90">
```

This enables kit-swapping: Swiss → Noir by changing `--primary` from black to gold.

---

## File Structure

```
src/
├── design-kits/
│   ├── index.ts                    # Registry + getKit()
│   ├── types.ts                    # DesignKit, KitTokens interfaces
│   ├── validator.ts                # validateKit() → slopScore: 0
│   │
│   ├── warm-editorial/
│   │   ├── index.ts                # Kit definition + exports
│   │   ├── tokens.ts               # CSS variables
│   │   ├── theme.ts                # Tailwind config extend
│   │   ├── fonts.ts                # Font imports + fallbacks
│   │   ├── components.ts           # Button, Card, Input variants
│   │   ├── layouts.ts              # Hero patterns (NOT centered)
│   │   └── guidance.ts             # Steal this / avoid that
│   │
│   ├── swiss-precision/
│   ├── brutalist-raw/
│   ├── forest-organic/
│   ├── noir-luxury/
│   └── vibrant-play/
│
├── inspiration/
│   ├── index.ts
│   ├── types.ts                    # InspirationSite, DesignProfile
│   ├── scorer.ts                   # slopRisk + qualityScore
│   └── query.ts                    # getInspiration()
│
└── data/
    └── inspiration.index.json      # Built artifact

scripts/
├── build-inspiration-index.ts
└── inspiration-curation.json       # Manual gold/ban overrides
```

---

## Kit Schema

```typescript
interface DesignKit {
  id: KitName;
  name: string;
  description: string;
  vibe: string;  // One-line soul

  // Typography
  fonts: {
    display: FontDefinition;
    body: FontDefinition;
    mono?: FontDefinition;
    cssImports: string[];       // Ready to paste
    fallbackStack: string;
  };

  // Colors (all via CSS variables)
  tokens: {
    colors: {
      background: string;
      foreground: string;
      primary: string;
      primaryForeground: string;
      secondary: string;
      secondaryForeground: string;
      muted: string;
      mutedForeground: string;
      accent: string;
      accentForeground: string;
      border: string;
      ring: string;
    };
    colorsDark: { /* same keys */ };

    // Spacing/sizing
    radius: 'none' | 'sm' | 'md' | 'lg';
    borderWidth: '0' | '1px' | '2px' | '3px';

    // Typography scale (max 8 sizes)
    typography: {
      hero: { size: string; weight: string; tracking: string; leading: string };
      h1: { /* ... */ };
      h2: { /* ... */ };
      h3: { /* ... */ };
      body: { /* ... */ };
      small: { /* ... */ };
      caption: { /* ... */ };
      mono: { /* ... */ };
    };
  };

  // Tailwind config to merge
  tailwindExtend: Record<string, any>;

  // Component recipes
  components: {
    button: {
      base: string;           // Tailwind classes
      variants: {
        primary: string;
        secondary: string;
        ghost: string;
      };
      sizes: {
        sm: string;
        md: string;
        lg: string;
      };
    };
    card: {
      base: string;
      variants: {
        default: string;
        elevated: string;
      };
    };
    input: {
      base: string;
      focus: string;
    };
  };

  // Layout patterns (NOT centered heroes)
  layouts: {
    heroAsymmetric: string;     // JSX/HTML template
    heroEditorial: string;
    grid: string;
  };

  // References
  references: {
    gold: Array<{
      name: string;
      url: string;
      stealThis: string[];    // "scroll animation", "grid rhythm"
      avoidThis: string[];    // "their footer is generic"
    }>;
  };

  // Validation
  validation: {
    slopScore: 0;             // Must be 0
    accessibilityGrade: 'AAA' | 'AA';
    uniqueFontSizes: number;  // Must be ≤ 8
  };
}
```

---

## Execution Order

### Phase 1: One Complete Kit (Warm Editorial)
Build it end-to-end. Validate the schema works.

1. `src/design-kits/types.ts` — Interfaces
2. `src/design-kits/warm-editorial/tokens.ts` — Fraunces + Satoshi + cream palette
3. `src/design-kits/warm-editorial/theme.ts` — Tailwind extend
4. `src/design-kits/warm-editorial/components.ts` — Button (underline style), Card (accent border)
5. `src/design-kits/warm-editorial/layouts.ts` — Editorial stack, asymmetric split
6. `src/design-kits/warm-editorial/guidance.ts` — Atlantic/Substack references
7. `src/design-kits/warm-editorial/index.ts` — Export complete kit
8. `src/design-kits/validator.ts` — validateKit() passes with slopScore: 0

### Phase 2: Remaining Five Kits
Same structure. Copy-paste-modify from warm-editorial.

### Phase 3: Registry + CLI
1. `src/design-kits/index.ts` — getKit(), listKits()
2. Update `src/cli.ts` — `anti-slop kit warm-editorial`
3. Update `src/index.ts` — exports

### Phase 4: Inspiration Index
1. `src/inspiration/types.ts`
2. `src/inspiration/scorer.ts`
3. `src/inspiration/query.ts`
4. `scripts/build-inspiration-index.ts`
5. Build `src/data/inspiration.index.json` from Godly data

### Phase 5: Validation + Polish
1. Run validateKit() on all six kits
2. Add CLI `anti-slop validate` command
3. Write tests

---

## Success Criteria

A designer looks at output from `anti-slop kit warm-editorial` and:

- [ ] Recognizes the Fraunces + Satoshi pairing as intentional
- [ ] Sees the cream/goldenrod palette as "editorial, not corporate"
- [ ] Notices the hero is NOT centered
- [ ] Finds the references (Atlantic, Substack) relevant
- [ ] Would actually use this for a real project

Technical criteria:

- [ ] `validateKit()` returns `slopScore: 0` for all six kits
- [ ] Zero Inter, zero Space Grotesk, zero purple gradients
- [ ] All kits have dark mode tokens
- [ ] All kits pass axe-core contrast checks
- [ ] ≤ 8 unique font sizes per kit

---

## Ready to Build

Start with Phase 1: Warm Editorial kit, complete end-to-end.

