# Godly Design Cheat Sheet

> Copy-paste these snippets into any AI prompt to improve design quality

---

## 🎯 One-Liner Style Injections

Copy one of these and add to any design prompt:

**Dark + Premium:**
```
Style: Dark theme (#0a0a0a bg), single accent color with glow effects, Inter/Geist typography, subtle borders (rgba(255,255,255,0.1)), glassmorphism cards. Reference: linear.app
```

**Light + Clean:**
```
Style: White/off-white bg, generous whitespace, mix serif headlines with sans body, soft shadows (0 4px 20px rgba(0,0,0,0.08)), single accent color. Reference: notion.so
```

**Playful + Creative:**
```
Style: Bold colors, oversized typography (72px+ headlines), custom cursor effects, magnetic buttons, staggered scroll animations, asymmetric layouts. Reference: roasted.design
```

**Minimal + Elegant:**
```
Style: Limited palette (2-3 colors), geometric sans typography, ample negative space, subtle hover states, clean grid system. Reference: linear.app
```

---

## 🚫 Anti-Slop One-Liner

Add this to EVERY design prompt:

```
IMPORTANT: Avoid generic AI aesthetics. No Inter-only typography, no purple gradients on white, no cookie-cutter layouts. Make distinctive choices.
```

---

## 🎨 Quick Color Palettes

**Tech Dark:**
```
--bg: #0a0a0a; --surface: #141414; --border: rgba(255,255,255,0.1); --text: rgba(255,255,255,0.9); --accent: #00d4ff;
```

**Clean Light:**
```
--bg: #ffffff; --surface: #f5f5f5; --border: #e5e7eb; --text: #1a1a1a; --muted: #6b7280; --accent: #2563eb;
```

**Warm Neutral:**
```
--bg: #faf9f7; --surface: #f5f0eb; --border: #e5e0d9; --text: #2d2a26; --accent: #b45309;
```

---

## 📝 Quick Typography

**Modern Tech:**
```
font-family: 'Inter', system-ui, sans-serif;
Headlines: 600 weight, -0.02em letter-spacing
Body: 400 weight, 1.6 line-height
```

**Editorial:**
```
Headlines: 'Fraunces', serif (or Playfair Display)
Body: 'Inter', sans-serif
Mix weights: 400 body, 500 labels, 700 headlines
```

**Distinctive:**
```
Headlines: 'Space Grotesk' or 'Neue Montreal'
Body: 'Inter' or 'Manrope'
Code: 'JetBrains Mono'
```

---

## ✨ Quick Animations

**Fade Up (Scroll Reveal):**
```
initial: opacity 0, translateY 40px
animate: opacity 1, translateY 0
transition: 0.6s ease-out
```

**Hover Lift:**
```
hover: translateY(-4px), box-shadow enhanced
transition: 150ms ease
```

**Button Press:**
```
hover: scale(1.02)
active: scale(0.98)
transition: 150ms ease
```

---

## 🔗 Reference Sites by Use Case

| Use Case | References |
|----------|-----------|
| SaaS | linear.app, vercel.com, notion.so |
| Portfolio | roasted.design, kons.fyi, lusion.co |
| Agency | unveil.fr, metalab.com, superhi.com |
| Consumer | superpower.com, amie.so, oura.com |
| Developer Tool | vercel.com, linear.app, supabase.com |

---

## 🛠️ Component Quick Fixes

**Better Buttons:**
```
padding: 12px 24px; border-radius: 10px; font-weight: 500;
transition: all 150ms ease;
hover: transform scale(1.02), shadow increase
```

**Better Cards:**
```
padding: 24px; border-radius: 16px;
border: 1px solid var(--border);
hover: translateY(-4px), enhanced shadow
```

**Better Hero:**
```
min-height: 100vh; 
headline: 56-80px bold;
add: gradient background or floating elements
```

---

*Keep this open while prompting AI for designs*


