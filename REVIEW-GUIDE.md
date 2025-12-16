# Tokenized Gallery Cards - Review Guide

## 🎯 What Changed

This implementation adds **per-site style tokens** to make each gallery entry and detail page visually echo its referenced site's design language, while maintaining performance and accessibility.

---

## 📋 Review Checklist

### 1. **Gallery Page** (`/gallery`)
**Location:** `demo-website/app/gallery/page.tsx`

**What to check:**
- [ ] Each gallery row has a **thick colored left border** (8px) using the site's primary color
- [ ] Site names use **per-site typography** (serif/sans/mono) based on the site's font category
- [ ] Site names are **colored** with the site's primary color
- [ ] Tags use **per-site colors** (styles = secondary color, fonts = primary color)
- [ ] Sites with "Interactive"/"Animation" styles have **subtle hover animations** (scale + translate)
- [ ] Hover animations respect **reduced-motion** preferences
- [ ] "View analysis →" text appears on hover with site's primary color

**Test sites to review:**
- Sites with serif fonts (should show serif typography)
- Sites with monospace fonts (should show monospace typography)
- Sites with "Fun"/"Pastel" styles (should have rounded corners)
- Sites with "Interactive" styles (should have hover animations)

---

### 2. **Site Detail Pages** (`/site/[slug]`)
**Location:** `demo-website/app/site/[slug]/page.tsx`

**What to check:**

#### Hero Section
- [ ] Hero image/video frame has **thick colored left border** (8px) using primary color
- [ ] Site title uses **per-site typography** (serif/sans/mono) and **primary color**
- [ ] "Visit →" button uses **primary color** background with contrast-safe text
- [ ] Button hover shifts to **secondary color**

#### Tags Section
- [ ] Type tags use **primary color** borders
- [ ] Style tags use **secondary color** borders
- [ ] Font tags use **primary color** borders
- [ ] All tag text is **readable** (meets WCAG 4.5:1 contrast)

#### Analysis Cards
- [ ] Analysis card borders use **primary color**
- [ ] Analysis headings use **per-site typography**

#### Sidebar
- [ ] Sidebar has **colored left border** (4px) using primary color
- [ ] "AI Prompt" heading uses **per-site typography** and **primary color**
- [ ] Copy button uses **primary color** (shifts to secondary when copied)
- [ ] "Build a custom prompt" link border uses **primary color** (shifts to secondary on hover)

#### Similar Sites Cards
- [ ] Each card has **colored left border** (6px) using that site's primary color
- [ ] Site names use **per-site typography** and **primary color**
- [ ] Cards with interactive styles have **hover animations**
- [ ] Cards respect **reduced-motion** preferences

**Test sites to review:**
- `/site/roasted-1018` - Should show colorful, rounded, interactive styling
- `/site/notion-1013` - Should show clean, sans-serif styling
- `/site/duties-1009` - Should show minimal, monospace styling

---

### 3. **Fallback Behavior**
**What to check:**
- [ ] Sites **without tokens** (most sites initially) fall back to:
  - Primary: Vermilion (`#c42a0e`)
  - Secondary: Teal (`#0a6e66`)
  - Font: Inferred from `fonts[]` array
  - Radius: Inferred from `styles[]` array
- [ ] Fallback colors are **consistent** across Gallery and Detail pages
- [ ] No visual breaks or missing styles

---

### 4. **Accessibility**
**What to check:**
- [ ] Tag text colors meet **WCAG 4.5:1 contrast** ratio
- [ ] CTA button text is **readable** against primary color background
- [ ] Hover animations **respect** `prefers-reduced-motion`
- [ ] All interactive elements have **visible focus states**

---

### 5. **Performance**
**What to check:**
- [ ] No runtime network requests for colors/fonts
- [ ] All tokens are **static** (from JSON)
- [ ] Page load times are **unchanged**
- [ ] No console errors

---

## 🧪 Testing Scenarios

### Scenario 1: Gallery Browse
1. Navigate to `/gallery`
2. Scroll through entries
3. **Verify:** Each row has distinct colored accent (left border)
4. **Verify:** Site names use appropriate typography
5. **Verify:** Tags are color-coded per site

### Scenario 2: Interactive Site
1. Navigate to `/gallery`
2. Find a site with "Interactive" or "Animation" style
3. Hover over the row
4. **Verify:** Subtle scale + translate animation (150ms)
5. **Verify:** Animation respects reduced-motion

### Scenario 3: Site Detail Theming
1. Navigate to `/site/roasted-1018` (or any site)
2. **Verify:** Hero frame has colored accent border
3. **Verify:** Title uses site's typography + color
4. **Verify:** Visit button uses site's primary color
5. **Verify:** All tags are tokenized
6. **Verify:** Sidebar has accent border
7. **Verify:** Similar sites cards are tokenized

### Scenario 4: Fallback Behavior
1. Navigate to `/gallery`
2. Find sites without tokens (most initially)
3. **Verify:** They use default vermilion/teal colors
4. **Verify:** Typography is inferred from fonts array
5. **Verify:** No visual breaks

---

## 📁 Files Changed

### New Files
- `demo-website/app/lib/color.ts` - Color contrast utilities
- `demo-website/app/lib/siteTokens.ts` - Token fallback logic
- `demo-website/app/components/Tag.tsx` - Contrast-safe tag component
- `scripts/extractSiteStyles.ts` - Build-time token extraction script

### Modified Files
- `demo-website/app/data/websites.ts` - Extended Website interface
- `demo-website/app/gallery/page.tsx` - Applied tokens to gallery rows
- `demo-website/app/site/[slug]/page.tsx` - Applied tokens to detail page
- `demo-website/app/components/WebsiteCard.tsx` - Aligned with token system
- `package.json` - Added `extract:site-styles` script

---

## 🚀 Next Steps (After Review)

### To Populate Tokens:
1. Install `node-vibrant` for better color extraction:
   ```bash
   npm install --save-dev node-vibrant
   ```
2. Run extraction script:
   ```bash
   npm run extract:site-styles
   ```
3. This will download thumbnails, extract colors, and write tokens to `websites.json`

### To Deploy:
1. Commit changes
2. Push to your repository
3. Vercel will auto-deploy (or trigger manual deploy)
4. Review on production URL

---

## 🐛 Known Limitations

1. **Initial State:** Most sites won't have tokens until extraction script is run
2. **Color Extraction:** Requires `node-vibrant` for optimal results (falls back to defaults)
3. **Font Loading:** We use system fonts (serif/sans/mono) - don't load external fonts per site
4. **Radius Style:** Currently binary (sharp/rounded) - could be extended to numeric values

---

## 💡 Design Decisions

1. **Left Border Accent:** Chosen over full border to maintain "anti-slop" aesthetic while adding differentiation
2. **System Fonts:** Using Tailwind font classes (serif/sans/mono) instead of loading external fonts for performance
3. **Contrast Safety:** All tag/button colors are checked against WCAG 4.5:1 minimum
4. **Reduced Motion:** All animations respect `prefers-reduced-motion` media query
5. **Fallback Strategy:** Graceful degradation - sites without tokens still work perfectly

---

## 📊 Expected Visual Impact

**Before:** Uniform beige boxes with vermilion/teal accents
**After:** Each gallery entry and detail page visually echoes its reference site's color palette and typography choices, while maintaining consistent layout and scanability.

