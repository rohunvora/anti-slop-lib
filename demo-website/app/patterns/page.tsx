'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

// Preset theme kits
const THEME_PRESETS = {
  'neo-brutalist': {
    name: 'Neo-Brutalist',
    description: 'Sharp edges, thick borders, no subtlety',
    radius: 0,
    borderWidth: 4,
    shadow: false,
    colors: { bg: '#ffffff', text: '#000000', accent: '#ff0000' },
    fonts: { heading: 'mono', body: 'sans' },
  },
  'editorial': {
    name: 'Editorial',
    description: 'Serif headlines, warm tones, generous space',
    radius: 0,
    borderWidth: 1,
    shadow: false,
    colors: { bg: '#f5f2eb', text: '#2d2a26', accent: '#8b4513' },
    fonts: { heading: 'serif', body: 'sans' },
  },
  'premium-dark': {
    name: 'Premium Dark',
    description: 'Deep blacks, single accent glow',
    radius: 4,
    borderWidth: 1,
    shadow: false,
    colors: { bg: '#0a0a0a', text: '#ffffff', accent: '#00d4ff' },
    fonts: { heading: 'sans', body: 'sans' },
  },
  'slop-default': {
    name: '⚠ Slop Default',
    description: 'What AI generates without guidance',
    radius: 16,
    borderWidth: 0,
    shadow: true,
    colors: { bg: '#ffffff', text: '#374151', accent: '#6366f1' },
    fonts: { heading: 'inter', body: 'inter' },
  },
};

// Contextual guidance messages
function getRadiusGuidance(radius: number): { message: string; type: 'good' | 'warn' | 'bad' } {
  if (radius === 0) return { message: 'Sharp corners signal intentionality. Common in editorial and brutalist design.', type: 'good' };
  if (radius <= 4) return { message: 'Subtle rounding. Feels modern without being generic.', type: 'good' };
  if (radius <= 8) return { message: 'Moderate rounding. Still distinctive if used consistently.', type: 'good' };
  if (radius <= 12) return { message: 'Approaching generic territory. Most Tailwind templates use this range.', type: 'warn' };
  return { message: 'High border-radius is a slop pattern. Associated with generic SaaS templates.', type: 'bad' };
}

function getBorderGuidance(width: number): { message: string; type: 'good' | 'warn' | 'bad' } {
  if (width === 0) return { message: 'No border relies on shadows/background for definition. Risk of blending.', type: 'warn' };
  if (width <= 1) return { message: 'Hairline borders. Subtle, requires good contrast to be visible.', type: 'good' };
  if (width <= 2) return { message: 'Standard weight. Clear definition without visual heaviness.', type: 'good' };
  if (width <= 3) return { message: 'Bold borders. Makes a statement. Works well with sharp corners.', type: 'good' };
  return { message: 'Very thick borders draw attention away from content. Use sparingly.', type: 'warn' };
}

// Radius playground with presets and guidance
function RadiusPlayground() {
  const [radius, setRadius] = useState(0);
  const [borderWidth, setBorderWidth] = useState(3);
  const [useShadow, setUseShadow] = useState(false);
  const [history, setHistory] = useState<Array<{radius: number; borderWidth: number; shadow: boolean}>>([]);
  
  const radiusGuidance = getRadiusGuidance(radius);
  const borderGuidance = getBorderGuidance(borderWidth);
  
  const applyPreset = (key: keyof typeof THEME_PRESETS) => {
    // Save current state to history
    setHistory(h => [...h.slice(-9), { radius, borderWidth, shadow: useShadow }]);
    
    const preset = THEME_PRESETS[key];
    setRadius(preset.radius);
    setBorderWidth(preset.borderWidth);
    setUseShadow(preset.shadow);
  };
  
  const undo = () => {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    setHistory(h => h.slice(0, -1));
    setRadius(prev.radius);
    setBorderWidth(prev.borderWidth);
    setUseShadow(prev.shadow);
  };
  
  const reset = () => {
    setHistory(h => [...h.slice(-9), { radius, borderWidth, shadow: useShadow }]);
    setRadius(0);
    setBorderWidth(3);
    setUseShadow(false);
  };
  
  return (
    <div className="space-y-6">
      {/* Preset buttons */}
      <div>
        <p className="text-sm font-semibold mb-3">Quick presets</p>
        <div className="flex flex-wrap gap-2">
          {Object.entries(THEME_PRESETS).map(([key, preset]) => (
            <button
              key={key}
              onClick={() => applyPreset(key as keyof typeof THEME_PRESETS)}
              className={`btn btn-small btn-outline ${key === 'slop-default' ? 'border-vermilion text-vermilion' : ''}`}
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-6">
          {/* Radius slider with guidance */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold">
                Border Radius: <span className="font-mono">{radius}px</span>
              </label>
              <span className={`text-xs px-2 py-0.5 border-2 ${
                radiusGuidance.type === 'good' ? 'border-teal text-teal' :
                radiusGuidance.type === 'warn' ? 'border-ink-40 text-ink-40' :
                'border-vermilion text-vermilion'
              }`}>
                {radiusGuidance.type === 'good' ? '✓' : radiusGuidance.type === 'warn' ? '○' : '✗'}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="24"
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
              className="w-full"
            />
            <p className={`text-xs mt-2 ${
              radiusGuidance.type === 'bad' ? 'text-vermilion' : 'text-ink-60'
            }`}>
              {radiusGuidance.message}
            </p>
          </div>
          
          {/* Border width slider with guidance */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold">
                Border Width: <span className="font-mono">{borderWidth}px</span>
              </label>
              <span className={`text-xs px-2 py-0.5 border-2 ${
                borderGuidance.type === 'good' ? 'border-teal text-teal' :
                'border-ink-40 text-ink-40'
              }`}>
                {borderGuidance.type === 'good' ? '✓' : '○'}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="6"
              value={borderWidth}
              onChange={(e) => setBorderWidth(Number(e.target.value))}
              className="w-full"
            />
            <p className="text-xs mt-2 text-ink-60">
              {borderGuidance.message}
            </p>
          </div>
          
          {/* Shadow toggle */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="useShadow"
              checked={useShadow}
              onChange={(e) => setUseShadow(e.target.checked)}
              className="w-5 h-5"
            />
            <label htmlFor="useShadow" className="text-sm">
              Add shadow-lg <span className="text-vermilion">(not recommended)</span>
            </label>
          </div>
          
          {/* Undo/Reset */}
          <div className="flex gap-2">
            <button onClick={undo} disabled={history.length === 0} className="btn btn-small btn-outline disabled:opacity-30">
              ← Undo
            </button>
            <button onClick={reset} className="btn btn-small btn-outline">
              Reset to defaults
            </button>
          </div>
          
          {/* Generated CSS */}
          <div className="code-block p-4 text-sm">
            <pre>{`.card {
  border-radius: ${radius}px;${borderWidth > 0 ? `
  border: ${borderWidth}px solid currentColor;` : ''}${useShadow ? `
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);` : ''}
}`}</pre>
          </div>
        </div>
        
        {/* Live preview */}
        <div>
          <p className="text-sm font-semibold mb-3">Live preview</p>
          <div className="playground-preview p-8">
            <div 
              className="w-full max-w-sm p-6 bg-paper-bright transition-all duration-150"
              style={{ 
                borderRadius: `${radius}px`,
                border: borderWidth > 0 ? `${borderWidth}px solid #0d0c0b` : 'none',
                boxShadow: useShadow ? '0 10px 15px -3px rgb(0 0 0 / 0.1)' : 'none'
              }}
            >
              <h4 className="font-display text-lg mb-2">Card Title</h4>
              <p className="text-sm text-ink-60">
                This preview updates as you adjust the controls.
              </p>
              <button className="btn btn-small mt-4" style={{ borderRadius: `${Math.min(radius, 4)}px` }}>
                Action
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Color playground with contrast checking and suggestions
function ColorPlayground() {
  const [bg, setBg] = useState('#f5f2eb');
  const [text, setText] = useState('#0d0c0b');
  const [accent, setAccent] = useState('#c42a0e');
  
  const getLuminance = (hex: string) => {
    const rgb = hex.match(/[A-Za-z0-9]{2}/g)?.map(v => parseInt(v, 16) / 255) || [0, 0, 0];
    const [r, g, b] = rgb.map(v => v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  
  const getContrast = (c1: string, c2: string) => {
    const l1 = getLuminance(c1);
    const l2 = getLuminance(c2);
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  };
  
  const textContrast = getContrast(text, bg);
  const accentContrast = getContrast(accent, bg);
  
  const isPurpleSlop = accent.toLowerCase().match(/^#[89a-f][0-5][56][0-5cf][ef][0-9a-f]$/i) ||
                       accent.toLowerCase() === '#6366f1' ||
                       accent.toLowerCase() === '#8b5cf6';
  
  const applyPreset = (key: keyof typeof THEME_PRESETS) => {
    const preset = THEME_PRESETS[key];
    setBg(preset.colors.bg);
    setText(preset.colors.text);
    setAccent(preset.colors.accent);
  };
  
  // Suggest accessible alternatives
  const suggestAlternative = () => {
    if (textContrast < 4.5) {
      const bgLum = getLuminance(bg);
      // Suggest black or white based on background
      return bgLum > 0.5 ? '#0d0c0b' : '#ffffff';
    }
    return null;
  };
  
  const suggestion = suggestAlternative();
  
  return (
    <div className="space-y-6">
      {/* Preset buttons */}
      <div>
        <p className="text-sm font-semibold mb-3">Quick presets</p>
        <div className="flex flex-wrap gap-2">
          {Object.entries(THEME_PRESETS).map(([key, preset]) => (
            <button
              key={key}
              onClick={() => applyPreset(key as keyof typeof THEME_PRESETS)}
              className="btn btn-small btn-outline flex items-center gap-2"
            >
              <span className="w-3 h-3 border border-ink" style={{ backgroundColor: preset.colors.accent }} />
              {preset.name}
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-ink-60 mb-2">
                Background
              </label>
              <input type="color" value={bg} onChange={e => setBg(e.target.value)} />
              <input type="text" value={bg} onChange={e => setBg(e.target.value)}
                className="w-full mt-2 text-sm font-mono px-2 py-1" />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-ink-60 mb-2">
                Text
              </label>
              <input type="color" value={text} onChange={e => setText(e.target.value)} />
              <input type="text" value={text} onChange={e => setText(e.target.value)}
                className="w-full mt-2 text-sm font-mono px-2 py-1" />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-ink-60 mb-2">
                Accent
              </label>
              <input type="color" value={accent} onChange={e => setAccent(e.target.value)} />
              <input type="text" value={accent} onChange={e => setAccent(e.target.value)}
                className="w-full mt-2 text-sm font-mono px-2 py-1" />
            </div>
          </div>
          
          {/* Contrast results */}
          <div className="space-y-3">
            <div className={`p-3 border-3 ${textContrast >= 4.5 ? 'border-teal' : 'border-vermilion'}`}>
              <div className="flex items-center justify-between">
                <span className="text-sm">Text/Background contrast</span>
                <span className={`font-mono font-bold ${textContrast >= 4.5 ? 'text-teal' : 'text-vermilion'}`}>
                  {textContrast.toFixed(2)}:1 {textContrast >= 4.5 ? '✓' : '✗'}
                </span>
              </div>
              {textContrast < 4.5 && suggestion && (
                <p className="text-xs text-vermilion mt-2">
                  Try <button onClick={() => setText(suggestion)} className="underline font-mono">{suggestion}</button> for accessible contrast.
                </p>
              )}
            </div>
            
            <div className={`p-3 border-3 ${accentContrast >= 3 ? 'border-teal' : 'border-vermilion'}`}>
              <div className="flex items-center justify-between">
                <span className="text-sm">Accent/Background contrast</span>
                <span className={`font-mono font-bold ${accentContrast >= 3 ? 'text-teal' : 'text-vermilion'}`}>
                  {accentContrast.toFixed(2)}:1 {accentContrast >= 3 ? '✓' : '○'}
                </span>
              </div>
            </div>
            
            {isPurpleSlop && (
              <div className="p-3 border-3 border-vermilion bg-vermilion/5">
                <p className="text-sm text-vermilion">
                  ⚠ Purple/indigo accents are strongly associated with AI-generated designs. 
                  Consider alternatives like vermilion, teal, or amber.
                </p>
              </div>
            )}
          </div>
        </div>
        
        {/* Preview */}
        <div>
          <p className="text-sm font-semibold mb-3">Live preview</p>
          <div className="playground-preview p-8" style={{ backgroundColor: bg }}>
            <div className="w-full max-w-sm p-6 border-3" style={{ borderColor: text, color: text }}>
              <h4 className="font-display text-lg mb-2">Heading Text</h4>
              <p className="text-sm opacity-70 mb-4">Body text at this contrast level.</p>
              <button className="px-4 py-2 text-sm font-semibold" style={{ backgroundColor: accent, color: bg }}>
                Accent Button
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Typography playground
function TypographyPlayground() {
  const [headingFont, setHeadingFont] = useState('serif');
  const [bodyFont, setBodyFont] = useState('sans');
  const [headingSize, setHeadingSize] = useState(36);
  const [bodySize, setBodySize] = useState(16);
  
  const fontOptions: Record<string, string> = {
    serif: '"Instrument Serif", Georgia, serif',
    sans: '"Anybody", system-ui, sans-serif',
    mono: '"JetBrains Mono", monospace',
    inter: '"Inter", -apple-system, sans-serif',
  };
  
  const isSloppy = headingFont === 'inter' && bodyFont === 'inter';
  
  const getHeadingGuidance = () => {
    if (headingFont === 'serif') return { msg: 'Serif headlines create editorial weight and stand out from template sites.', type: 'good' };
    if (headingFont === 'inter') return { msg: 'Inter for headlines is extremely common. Consider a distinctive alternative.', type: 'bad' };
    return { msg: 'Sans-serif headlines work well when body uses a contrasting style.', type: 'good' };
  };
  
  const headingGuidance = getHeadingGuidance();
  
  return (
    <div className="space-y-6">
      {/* Presets */}
      <div>
        <p className="text-sm font-semibold mb-3">Quick presets</p>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => { setHeadingFont('serif'); setBodyFont('sans'); }} className="btn btn-small btn-outline">
            Editorial (Serif + Sans)
          </button>
          <button onClick={() => { setHeadingFont('sans'); setBodyFont('sans'); }} className="btn btn-small btn-outline">
            Modern (Geometric Sans)
          </button>
          <button onClick={() => { setHeadingFont('mono'); setBodyFont('sans'); }} className="btn btn-small btn-outline">
            Technical (Mono + Sans)
          </button>
          <button onClick={() => { setHeadingFont('inter'); setBodyFont('inter'); }} className="btn btn-small btn-outline border-vermilion text-vermilion">
            ⚠ Slop (Inter only)
          </button>
        </div>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-ink-60 mb-2">
                Heading Font
              </label>
              <select value={headingFont} onChange={e => setHeadingFont(e.target.value)} className="w-full">
                <option value="serif">Serif (Recommended)</option>
                <option value="sans">Geometric Sans</option>
                <option value="mono">Monospace</option>
                <option value="inter">Inter (Common)</option>
              </select>
              <p className={`text-xs mt-2 ${headingGuidance.type === 'bad' ? 'text-vermilion' : 'text-ink-60'}`}>
                {headingGuidance.msg}
              </p>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-ink-60 mb-2">
                Body Font
              </label>
              <select value={bodyFont} onChange={e => setBodyFont(e.target.value)} className="w-full">
                <option value="sans">Sans-serif</option>
                <option value="serif">Serif</option>
                <option value="mono">Monospace</option>
                <option value="inter">Inter</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-semibold mb-2">
              Heading Size: <span className="font-mono">{headingSize}px</span>
            </label>
            <input type="range" min="24" max="64" value={headingSize} onChange={e => setHeadingSize(Number(e.target.value))} className="w-full" />
          </div>
          
          <div>
            <label className="block text-sm font-semibold mb-2">
              Body Size: <span className="font-mono">{bodySize}px</span>
              {bodySize < 16 && <span className="text-vermilion ml-2">⚠ Too small</span>}
            </label>
            <input type="range" min="14" max="20" value={bodySize} onChange={e => setBodySize(Number(e.target.value))} className="w-full" />
            {bodySize < 16 && (
              <p className="text-xs text-vermilion mt-1">Body text below 16px is hard to read on most devices.</p>
            )}
          </div>
          
          {isSloppy && (
            <div className="p-3 border-3 border-vermilion bg-vermilion/5">
              <p className="text-sm text-vermilion">
                ⚠ Using Inter for everything is the typography equivalent of muzak. 
                Add contrast through font pairing.
              </p>
            </div>
          )}
        </div>
        
        {/* Preview */}
        <div>
          <p className="text-sm font-semibold mb-3">Live preview</p>
          <div className="playground-preview p-8">
            <div className="w-full max-w-sm">
              <h4 style={{ fontFamily: fontOptions[headingFont], fontSize: `${headingSize}px`, lineHeight: 1.2 }} className="mb-4">
                Heading
              </h4>
              <p style={{ fontFamily: fontOptions[bodyFont], fontSize: `${bodySize}px`, lineHeight: 1.6 }} className="text-ink-60">
                Body text should be readable at this size. Good typography creates hierarchy 
                through font choice, not just weight.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Contrast checker
function ContrastChecker() {
  const [foreground, setForeground] = useState('#000000');
  const [background, setBackground] = useState('#ffffff');
  const [textSize, setTextSize] = useState<'normal' | 'large'>('normal');
  
  // Convert hex to RGB
  function hexToRgb(hex: string): [number, number, number] {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16)
    ] : [0, 0, 0];
  }
  
  // Calculate relative luminance
  function getLuminance(rgb: [number, number, number]): number {
    const [r, g, b] = rgb.map(val => {
      val = val / 255;
      return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }
  
  // Calculate contrast ratio
  function getContrastRatio(fg: string, bg: string): number {
    const fgRgb = hexToRgb(fg);
    const bgRgb = hexToRgb(bg);
    const fgLum = getLuminance(fgRgb);
    const bgLum = getLuminance(bgRgb);
    const lighter = Math.max(fgLum, bgLum);
    const darker = Math.min(fgLum, bgLum);
    return (lighter + 0.05) / (darker + 0.05);
  }
  
  const contrastRatio = getContrastRatio(foreground, background);
  const requiredRatio = textSize === 'normal' ? 4.5 : 3;
  const passes = contrastRatio >= requiredRatio;
  
  return (
    <div className="space-y-6">
      <div className="max-w-2xl">
        <p className="text-ink-60 mb-6">
          WCAG 2.1 requires a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text (18pt+ or 14pt+ bold).
          This tool helps ensure your color choices remain accessible.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Foreground */}
          <div>
            <label className="block text-sm font-semibold mb-2">Foreground Color</label>
            <div className="flex gap-3 items-center">
              <input
                type="color"
                value={foreground}
                onChange={(e) => setForeground(e.target.value)}
                className="w-16 h-16 border-3 border-ink cursor-pointer"
              />
              <input
                type="text"
                value={foreground}
                onChange={(e) => setForeground(e.target.value)}
                className="flex-1 font-mono text-sm p-2 border-3 border-ink"
                placeholder="#000000"
              />
            </div>
          </div>
          
          {/* Background */}
          <div>
            <label className="block text-sm font-semibold mb-2">Background Color</label>
            <div className="flex gap-3 items-center">
              <input
                type="color"
                value={background}
                onChange={(e) => setBackground(e.target.value)}
                className="w-16 h-16 border-3 border-ink cursor-pointer"
              />
              <input
                type="text"
                value={background}
                onChange={(e) => setBackground(e.target.value)}
                className="flex-1 font-mono text-sm p-2 border-3 border-ink"
                placeholder="#ffffff"
              />
            </div>
          </div>
        </div>
        
        {/* Text size selector */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">Text Size</label>
          <div className="flex gap-2">
            <button
              onClick={() => setTextSize('normal')}
              className={`px-4 py-2 text-sm border-3 transition-colors ${
                textSize === 'normal'
                  ? 'bg-ink text-paper border-ink'
                  : 'border-ink-40 text-ink-60 hover:border-ink'
              }`}
            >
              Normal (4.5:1 required)
            </button>
            <button
              onClick={() => setTextSize('large')}
              className={`px-4 py-2 text-sm border-3 transition-colors ${
                textSize === 'large'
                  ? 'bg-ink text-paper border-ink'
                  : 'border-ink-40 text-ink-60 hover:border-ink'
              }`}
            >
              Large (3:1 required)
            </button>
          </div>
        </div>
        
        {/* Preview */}
        <div 
          className="p-8 border-3 border-ink mb-6"
          style={{ backgroundColor: background, color: foreground }}
        >
          <p className={`${textSize === 'large' ? 'text-2xl font-bold' : 'text-base'}`}>
            Sample text preview. Does this look readable?
          </p>
        </div>
        
        {/* Results */}
        <div className={`p-6 border-3 ${passes ? 'border-teal bg-teal/10' : 'border-vermilion bg-vermilion/10'}`}>
          <div className="flex items-center justify-between mb-2">
            <p className={`font-semibold ${passes ? 'text-teal' : 'text-vermilion'}`}>
              {passes ? '✓ Passes WCAG 2.1' : '✗ Fails WCAG 2.1'}
            </p>
            <span className="text-2xl font-bold font-mono">
              {contrastRatio.toFixed(2)}:1
            </span>
          </div>
          <p className="text-sm text-ink-60">
            Contrast ratio: <strong>{contrastRatio.toFixed(2)}:1</strong> | 
            Required: <strong>{requiredRatio}:1</strong> for {textSize === 'normal' ? 'normal' : 'large'} text
          </p>
          {!passes && (
            <p className="text-sm text-ink-60 mt-2">
              Increase the difference between foreground and background colors to meet accessibility standards.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// Usability checklist
function UsabilityChecklist() {
  const [checks, setChecks] = useState<Record<string, boolean>>({});
  
  const items = [
    { id: 'contrast', text: 'All text meets 4.5:1 contrast ratio' },
    { id: 'focus', text: 'Focus states visible on all interactive elements' },
    { id: 'labels', text: 'Form inputs have associated labels' },
    { id: 'errors', text: 'Error states are clear and provide guidance' },
    { id: 'tap', text: 'Touch targets are at least 44x44px' },
    { id: 'motion', text: 'Animations can be reduced (prefers-reduced-motion)' },
    { id: 'test', text: 'Tested with real users, not just looked at' },
  ];
  
  const toggle = (id: string) => setChecks(c => ({ ...c, [id]: !c[id] }));
  const checkedCount = Object.values(checks).filter(Boolean).length;
  
  return (
    <div className="space-y-6">
      <div className="max-w-xl">
        <p className="text-ink-60 mb-6">
          Attractive designs feel more usable—even when they're not. This is the 
          aesthetic-usability effect. Don't let good looks mask real problems.
        </p>
        
        <div className="space-y-3">
          {items.map(item => (
            <button
              key={item.id}
              onClick={() => toggle(item.id)}
              className={`w-full text-left p-3 border-3 flex items-center gap-3 transition-colors ${
                checks[item.id] ? 'border-teal bg-teal/5' : 'border-ink hover:bg-paper-bright'
              }`}
            >
              <span className={`w-5 h-5 border-2 flex items-center justify-center text-xs ${
                checks[item.id] ? 'border-teal bg-teal text-paper' : 'border-ink'
              }`}>
                {checks[item.id] && '✓'}
              </span>
              <span className="text-sm">{item.text}</span>
            </button>
          ))}
        </div>
        
        <div className="mt-6 p-4 border-3 border-ink">
          <p className="font-mono text-sm">
            {checkedCount}/{items.length} checks passed
          </p>
          {checkedCount < items.length && (
            <p className="text-sm text-ink-60 mt-1">
              Complete all checks before shipping. Looking good ≠ working well.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function PatternsContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(initialTab || 'radius');
  
  useEffect(() => {
    if (initialTab) setActiveTab(initialTab);
  }, [initialTab]);
  
  return (
    <>
      {/* Header */}
      <section className="border-b-3 border-ink">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-10">
          <h1 className="font-display text-3xl lg:text-4xl mb-4">Interactive Pattern Lab</h1>
          <p className="text-ink-60 max-w-2xl">
            Adjust values, see results live, understand why certain choices look generic. 
            Includes preset themes, contextual guidance, and undo support.
          </p>
        </div>
      </section>
      
      {/* Tabs */}
      <section className="border-b-3 border-ink bg-paper-bright sticky top-14 z-30">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="flex overflow-x-auto">
            {[
              { id: 'radius', label: 'Borders & Radius' },
              { id: 'colors', label: 'Colors' },
              { id: 'type', label: 'Typography' },
              { id: 'contrast', label: 'Contrast Checker' },
              { id: 'usability', label: 'Usability Check' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 text-sm font-semibold uppercase tracking-wider whitespace-nowrap border-b-3 -mb-[3px] transition-colors ${
                  activeTab === tab.id ? 'border-vermilion text-ink' : 'border-transparent text-ink-40 hover:text-ink'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>
      
      {/* Content */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-8 py-10">
        {activeTab === 'radius' && <RadiusPlayground />}
        {activeTab === 'colors' && <ColorPlayground />}
        {activeTab === 'type' && <TypographyPlayground />}
        {activeTab === 'contrast' && <ContrastChecker />}
        {activeTab === 'usability' && <UsabilityChecklist />}
      </section>
    </>
  );
}

export default function PatternsPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center">Loading...</div>}>
      <PatternsContent />
    </Suspense>
  );
}
