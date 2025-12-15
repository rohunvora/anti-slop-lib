'use client';

import { useState } from 'react';

// Interactive playground for border radius
function RadiusPlayground() {
  const [radius, setRadius] = useState(0);
  const [borderWidth, setBorderWidth] = useState(3);
  const [useShadow, setUseShadow] = useState(false);
  
  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Controls */}
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold mb-2">
            Border Radius: <span className="font-mono">{radius}px</span>
          </label>
          <input
            type="range"
            min="0"
            max="24"
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-ink-40 mt-1">
            <span>Sharp (0)</span>
            <span>rounded-lg (8)</span>
            <span>rounded-xl (12)</span>
            <span>rounded-2xl (16)</span>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-semibold mb-2">
            Border Width: <span className="font-mono">{borderWidth}px</span>
          </label>
          <input
            type="range"
            min="1"
            max="6"
            value={borderWidth}
            onChange={(e) => setBorderWidth(Number(e.target.value))}
            className="w-full"
          />
        </div>
        
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="useShadow"
            checked={useShadow}
            onChange={(e) => setUseShadow(e.target.checked)}
            className="w-5 h-5"
          />
          <label htmlFor="useShadow" className="text-sm">
            Add shadow-lg (not recommended)
          </label>
        </div>
        
        {/* Generated CSS */}
        <div className="code-block p-4 text-sm">
          <pre>{`.card {
  border-radius: ${radius}px;
  border: ${borderWidth}px solid #0d0c0b;${useShadow ? `
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);` : ''}
}`}</pre>
        </div>
        
        {/* Assessment */}
        <div className={`p-4 border-3 ${radius > 12 || useShadow ? 'contrast-fail' : 'contrast-pass'}`}>
          <p className="font-semibold text-sm">
            {radius > 12 && '⚠ High border-radius is a slop pattern'}
            {useShadow && radius > 12 && ' · '}
            {useShadow && '⚠ Shadow-lg creates generic look'}
            {radius <= 12 && !useShadow && '✓ Sharp design that avoids template look'}
          </p>
        </div>
      </div>
      
      {/* Preview */}
      <div className="playground-preview p-8">
        <div 
          className="w-full max-w-sm p-6 bg-paper-bright"
          style={{ 
            borderRadius: `${radius}px`,
            border: `${borderWidth}px solid #0d0c0b`,
            boxShadow: useShadow ? '0 10px 15px -3px rgb(0 0 0 / 0.1)' : 'none'
          }}
        >
          <h4 className="font-display text-lg mb-2">Card Title</h4>
          <p className="text-sm text-ink-60">
            This is how your card will look with the current settings.
          </p>
        </div>
      </div>
    </div>
  );
}

// Interactive playground for colors
function ColorPlayground() {
  const [bg, setBg] = useState('#f5f2eb');
  const [text, setText] = useState('#0d0c0b');
  const [accent, setAccent] = useState('#c42a0e');
  
  // Calculate contrast
  const getLuminance = (hex: string) => {
    const rgb = hex.match(/[A-Za-z0-9]{2}/g)?.map(v => parseInt(v, 16) / 255) || [0, 0, 0];
    const [r, g, b] = rgb.map(v => v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  
  const l1 = getLuminance(text);
  const l2 = getLuminance(bg);
  const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  const passesAA = ratio >= 4.5;
  
  // Check if it's a "slop" gradient
  const isPurpleGradient = accent.toLowerCase().includes('6366f1') || 
                           accent.toLowerCase().includes('8b5cf6') ||
                           accent.toLowerCase().includes('a855f7');
  
  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Controls */}
      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-ink-60 mb-2">
              Background
            </label>
            <input
              type="color"
              value={bg}
              onChange={(e) => setBg(e.target.value)}
            />
            <input
              type="text"
              value={bg}
              onChange={(e) => setBg(e.target.value)}
              className="w-full mt-2 text-sm font-mono px-2 py-1"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-ink-60 mb-2">
              Text
            </label>
            <input
              type="color"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full mt-2 text-sm font-mono px-2 py-1"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-ink-60 mb-2">
              Accent
            </label>
            <input
              type="color"
              value={accent}
              onChange={(e) => setAccent(e.target.value)}
            />
            <input
              type="text"
              value={accent}
              onChange={(e) => setAccent(e.target.value)}
              className="w-full mt-2 text-sm font-mono px-2 py-1"
            />
          </div>
        </div>
        
        {/* Contrast check */}
        <div className={`p-4 border-3 ${passesAA ? 'contrast-pass' : 'contrast-fail'}`}>
          <div className="flex items-center justify-between">
            <span className="font-mono text-xl font-bold">{ratio.toFixed(2)}:1</span>
            <span className={`font-semibold ${passesAA ? 'text-teal' : 'text-vermilion'}`}>
              {passesAA ? '✓ WCAG AA' : '✕ Fails WCAG AA'}
            </span>
          </div>
          {!passesAA && (
            <p className="text-sm text-ink-60 mt-2">
              Text must have at least 4.5:1 contrast with background.
            </p>
          )}
        </div>
        
        {/* CSS output */}
        <div className="code-block p-4 text-sm">
          <pre>{`:root {
  --bg: ${bg};
  --text: ${text};
  --accent: ${accent};
}`}</pre>
        </div>
      </div>
      
      {/* Preview */}
      <div className="playground-preview p-8">
        <div 
          className="w-full max-w-sm p-6 border-3 border-current"
          style={{ backgroundColor: bg, color: text }}
        >
          <h4 className="font-display text-lg mb-2">Heading Text</h4>
          <p className="text-sm opacity-70 mb-4">
            Body text should be readable at this contrast level.
          </p>
          <button 
            className="px-4 py-2 text-sm font-semibold"
            style={{ backgroundColor: accent, color: bg }}
          >
            Accent Button
          </button>
        </div>
      </div>
    </div>
  );
}

// Interactive playground for typography
function TypographyPlayground() {
  const [headingFont, setHeadingFont] = useState('serif');
  const [bodyFont, setBodyFont] = useState('sans');
  const [headingSize, setHeadingSize] = useState(32);
  const [bodySize, setBodySize] = useState(16);
  const [lineHeight, setLineHeight] = useState(1.6);
  
  const fontOptions = {
    serif: '"Instrument Serif", Georgia, serif',
    sans: '"Anybody", system-ui, sans-serif',
    mono: '"JetBrains Mono", monospace',
    inter: '"Inter", sans-serif',
  };
  
  const isSloppy = headingFont === 'inter' && bodyFont === 'inter';
  
  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Controls */}
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-ink-60 mb-2">
              Heading Font
            </label>
            <select
              value={headingFont}
              onChange={(e) => setHeadingFont(e.target.value)}
              className="w-full"
            >
              <option value="serif">Serif (Recommended)</option>
              <option value="sans">Sans-serif</option>
              <option value="mono">Monospace</option>
              <option value="inter">Inter (Slop)</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-ink-60 mb-2">
              Body Font
            </label>
            <select
              value={bodyFont}
              onChange={(e) => setBodyFont(e.target.value)}
              className="w-full"
            >
              <option value="sans">Sans-serif</option>
              <option value="serif">Serif</option>
              <option value="mono">Monospace</option>
              <option value="inter">Inter (Common)</option>
            </select>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-semibold mb-2">
            Heading Size: <span className="font-mono">{headingSize}px</span>
          </label>
          <input
            type="range"
            min="24"
            max="64"
            value={headingSize}
            onChange={(e) => setHeadingSize(Number(e.target.value))}
            className="w-full"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold mb-2">
            Body Size: <span className="font-mono">{bodySize}px</span>
          </label>
          <input
            type="range"
            min="14"
            max="20"
            value={bodySize}
            onChange={(e) => setBodySize(Number(e.target.value))}
            className="w-full"
          />
          {bodySize < 16 && (
            <p className="text-sm text-vermilion mt-1">
              ⚠ Body text below 16px is hard to read
            </p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-semibold mb-2">
            Line Height: <span className="font-mono">{lineHeight}</span>
          </label>
          <input
            type="range"
            min="1.2"
            max="2"
            step="0.1"
            value={lineHeight}
            onChange={(e) => setLineHeight(Number(e.target.value))}
            className="w-full"
          />
        </div>
        
        {/* Assessment */}
        <div className={`p-4 border-3 ${isSloppy ? 'contrast-fail' : 'contrast-pass'}`}>
          <p className="font-semibold text-sm">
            {isSloppy 
              ? '⚠ Inter for everything is a slop pattern. Add variety.' 
              : '✓ Font pairing creates visual hierarchy'}
          </p>
        </div>
      </div>
      
      {/* Preview */}
      <div className="playground-preview p-8">
        <div className="w-full max-w-sm">
          <h4 
            style={{ 
              fontFamily: fontOptions[headingFont as keyof typeof fontOptions],
              fontSize: `${headingSize}px`,
              lineHeight: 1.2
            }}
            className="mb-4"
          >
            Heading Example
          </h4>
          <p 
            style={{ 
              fontFamily: fontOptions[bodyFont as keyof typeof fontOptions],
              fontSize: `${bodySize}px`,
              lineHeight
            }}
            className="text-ink-60"
          >
            Body text example. Good typography creates hierarchy through font 
            choice, not just size and weight. Pairing a serif heading with 
            sans-serif body creates visual interest.
          </p>
        </div>
      </div>
    </div>
  );
}

// Interactive playground for hover states
function HoverPlayground() {
  const [translateY, setTranslateY] = useState(-4);
  const [useShadow, setUseShadow] = useState(false);
  const [useOffset, setUseOffset] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  
  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Controls */}
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold mb-2">
            Translate Y: <span className="font-mono">{translateY}px</span>
          </label>
          <input
            type="range"
            min="-8"
            max="0"
            value={translateY}
            onChange={(e) => setTranslateY(Number(e.target.value))}
            className="w-full"
          />
        </div>
        
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={useShadow}
              onChange={(e) => setUseShadow(e.target.checked)}
              className="w-5 h-5"
            />
            <span className="text-sm">Drop shadow</span>
          </label>
          
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={useOffset}
              onChange={(e) => setUseOffset(e.target.checked)}
              className="w-5 h-5"
            />
            <span className="text-sm">Offset shadow (recommended)</span>
          </label>
        </div>
        
        {/* CSS output */}
        <div className="code-block p-4 text-sm">
          <pre>{`.card:hover {
  transform: translateY(${translateY}px);${useShadow ? `
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);` : ''}${useOffset ? `
  /* Offset shadow via pseudo-element */` : ''}
}`}</pre>
        </div>
        
        <div className={`p-4 border-3 ${useShadow && !useOffset ? 'contrast-fail' : 'contrast-pass'}`}>
          <p className="font-semibold text-sm">
            {useShadow && !useOffset 
              ? '⚠ box-shadow alone is generic. Consider offset shadows.' 
              : '✓ Multi-property transitions feel intentional'}
          </p>
        </div>
      </div>
      
      {/* Preview */}
      <div className="playground-preview p-8">
        <div 
          className="w-full max-w-sm p-6 bg-paper-bright border-3 border-ink cursor-pointer relative transition-transform duration-150"
          style={{ 
            transform: isHovering ? `translateY(${translateY}px) translateX(${useOffset ? translateY : 0}px)` : 'none',
            boxShadow: isHovering && useShadow ? '0 10px 15px -3px rgb(0 0 0 / 0.1)' : 'none',
          }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {useOffset && (
            <div 
              className="absolute bg-ink transition-opacity duration-150"
              style={{
                top: '4px',
                left: '4px',
                right: '-4px',
                bottom: '-4px',
                zIndex: -1,
                opacity: isHovering ? 1 : 0
              }}
            />
          )}
          <h4 className="font-display text-lg mb-2">Hover me</h4>
          <p className="text-sm text-ink-60">
            Watch how the card responds to hover.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function PatternsPage() {
  const [activeTab, setActiveTab] = useState<'radius' | 'colors' | 'type' | 'hover'>('radius');
  
  return (
    <>
      {/* Header */}
      <section className="border-b-3 border-ink">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-10">
          <h1 className="font-display text-3xl lg:text-4xl mb-4">
            Interactive Pattern Lab
          </h1>
          <p className="text-ink-60 max-w-2xl">
            Don't just read about slop patterns—experiment with them. Adjust values, 
            see the results live, and understand why certain choices look generic.
          </p>
        </div>
      </section>
      
      {/* Tab navigation */}
      <section className="border-b-3 border-ink bg-paper-bright sticky top-14 z-30">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="flex">
            {[
              { id: 'radius', label: 'Border Radius' },
              { id: 'colors', label: 'Colors & Contrast' },
              { id: 'type', label: 'Typography' },
              { id: 'hover', label: 'Hover Effects' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-6 py-4 text-sm font-semibold uppercase tracking-wider border-b-3 -mb-[3px] transition-colors ${
                  activeTab === tab.id 
                    ? 'border-vermilion text-ink' 
                    : 'border-transparent text-ink-40 hover:text-ink'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>
      
      {/* Playground content */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-8 py-10">
        {activeTab === 'radius' && (
          <div>
            <div className="mb-8">
              <h2 className="font-display text-2xl mb-3">Border Radius & Shadows</h2>
              <p className="text-ink-60">
                <code className="font-mono bg-ink/10 px-1">rounded-xl shadow-lg</code> on every 
                card is a slop pattern. Sharp corners with thick borders feel more intentional.
              </p>
            </div>
            <RadiusPlayground />
          </div>
        )}
        
        {activeTab === 'colors' && (
          <div>
            <div className="mb-8">
              <h2 className="font-display text-2xl mb-3">Color Palette & Contrast</h2>
              <p className="text-ink-60">
                Purple-to-blue gradients are statistically overrepresented in AI output. 
                Choose colors with intention, and always verify contrast meets WCAG 4.5:1.
              </p>
            </div>
            <ColorPlayground />
          </div>
        )}
        
        {activeTab === 'type' && (
          <div>
            <div className="mb-8">
              <h2 className="font-display text-2xl mb-3">Typography Pairing</h2>
              <p className="text-ink-60">
                Inter everywhere is the new Comic Sans. Pairing contrasting font 
                categories (serif + sans) creates visual interest and hierarchy.
              </p>
            </div>
            <TypographyPlayground />
          </div>
        )}
        
        {activeTab === 'hover' && (
          <div>
            <div className="mb-8">
              <h2 className="font-display text-2xl mb-3">Hover & Interaction</h2>
              <p className="text-ink-60">
                Just changing background color on hover is minimal viable interaction. 
                Multi-property transitions (translate + shadow) feel more physical.
              </p>
            </div>
            <HoverPlayground />
          </div>
        )}
      </section>
      
      {/* Principles summary */}
      <section className="border-t-3 border-ink dark-section">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-10">
          <h2 className="font-display text-2xl mb-6">Core Principles</h2>
          <div className="grid lg:grid-cols-4 gap-6">
            <div className="border-3 border-paper/30 p-5">
              <p className="font-mono text-xs text-paper/50 mb-2">01</p>
              <h3 className="font-semibold mb-2">Question defaults</h3>
              <p className="text-sm text-paper/70">
                Tailwind's default values are starting points, not final answers.
              </p>
            </div>
            <div className="border-3 border-paper/30 p-5">
              <p className="font-mono text-xs text-paper/50 mb-2">02</p>
              <h3 className="font-semibold mb-2">Verify contrast</h3>
              <p className="text-sm text-paper/70">
                4.5:1 minimum for body text. Test, don't assume.
              </p>
            </div>
            <div className="border-3 border-paper/30 p-5">
              <p className="font-mono text-xs text-paper/50 mb-2">03</p>
              <h3 className="font-semibold mb-2">Pair fonts</h3>
              <p className="text-sm text-paper/70">
                Contrasting categories (serif/sans) create hierarchy.
              </p>
            </div>
            <div className="border-3 border-paper/30 p-5">
              <p className="font-mono text-xs text-paper/50 mb-2">04</p>
              <h3 className="font-semibold mb-2">Intentional motion</h3>
              <p className="text-sm text-paper/70">
                Every animation should communicate something.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
