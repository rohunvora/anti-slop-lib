'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState, useMemo } from 'react';
import { getWebsiteBySlug, websites } from '../../data/websites';

// Design analysis and style instructions
const STYLE_ANALYSIS: Record<string, { insight: string; principle: string }> = {
  "Animation": {
    insight: "Animation creates perceived performance—sites with smooth transitions feel faster even if they aren't. This site uses animation purposefully: to guide attention, provide feedback, and create continuity between states.",
    principle: "Use animation to communicate state changes, not for decoration. Every animation should answer: what just happened?"
  },
  "Fun": {
    insight: "Playful design requires confidence. Generic sites avoid playfulness because it's risky—what if users don't get the joke? This site commits to a personality, which creates memorability.",
    principle: "Playfulness comes from unexpected details, not from using bright colors. Find moments of delight in interactions, copy, or visual surprises."
  },
  "Minimal": {
    insight: "True minimalism is harder than maximalism. Every element must justify its existence. This site achieves density through restraint—the whitespace IS the design element.",
    principle: "If removing an element doesn't hurt the experience, remove it. Minimalism is about saying no, not using less color."
  },
  "Dark": {
    insight: "Dark themes done well feel premium, not gloomy. This site uses a truly dark background (#0a0a0a or similar), not dark gray. The single accent color gains power from surrounding darkness.",
    principle: "Go fully dark (not gray) and choose ONE vibrant accent. Let the darkness create contrast; don't fill it with gradients."
  },
  "Clean": {
    insight: "Clean design is about clear hierarchy, not emptiness. This site establishes a clear visual priority: you know exactly where to look first, second, and third.",
    principle: "Clean = clear. Establish hierarchy through size, weight, and spacing—not by removing content."
  },
  "Interactive": {
    insight: "Interactivity creates investment. When users can manipulate the interface, they feel ownership. This site uses interaction as a design language, not a gimmick.",
    principle: "Interactive elements should reveal information or provide control. Mouse-follow effects are slop unless they serve a purpose."
  },
  "Light": {
    insight: "Light themes require more nuance than dark themes. This site uses off-white (#FAF7F2 or similar), not pure white, creating warmth without sacrificing clarity.",
    principle: "Avoid pure white (#FFFFFF). Off-white backgrounds reduce eye strain and add character. Save pure white for elevated surfaces."
  },
  "3D": {
    insight: "3D on the web only works when it serves the content. This site uses dimensional elements to demonstrate a product, explain a concept, or create spatial storytelling.",
    principle: "3D must load fast and serve the narrative. If the 3D element doesn't help users understand your product, it's decoration."
  },
  "Scrolling Animation": {
    insight: "Scroll-triggered animation creates narrative. As users scroll, content reveals in sequence, creating a story. This site treats the page as a timeline, not a static document.",
    principle: "Scroll animations should feel like turning pages, not like watching a slideshow. Content should reveal as the user seeks it."
  },
  "Unusual Layout": {
    insight: "Breaking the grid creates visual tension. This site deliberately uses asymmetry, overlapping elements, or unconventional proportions to stand out from template-based design.",
    principle: "Break the grid with intention. Every unconventional choice should create meaning, not just difference."
  },
  "Editorial": {
    insight: "Editorial design treats typography as the primary visual element. This site uses font choice, size, and spacing to create hierarchy, not boxes and backgrounds.",
    principle: "Let typography lead. Choose a distinctive headline font and give it room to breathe."
  },
};

const STYLE_INSTRUCTIONS: Record<string, string> = {
  "Animation": "Implement smooth, purposeful animations. Use CSS transitions, Framer Motion, or GSAP.",
  "Fun": "Create playful interactions, bold colors, and delightful micro-animations.",
  "Minimal": "Strip to essentials. Limited palette (2-3 colors), geometric shapes, ample negative space.",
  "Single Page": "Immersive single-page experience with smooth scrolling and section navigation.",
  "Interactive": "Cursor effects, hover animations, micro-interactions. Elements respond to input.",
  "Light": "Light color scheme with off-white backgrounds, subtle shadows, muted accents.",
  "Dark": "Dark theme (#0a0a0a to #1a1a1a backgrounds), high-contrast text, glowing accents.",
  "Clean": "Generous whitespace, clear hierarchy, minimal decoration. Typography-focused.",
  "Scrolling Animation": "Scroll-triggered animations with GSAP ScrollTrigger or Framer Motion.",
  "Big Background Image": "Full-viewport hero with atmospheric background image and overlays.",
  "Long Scrolling": "Narrative flow with distinct sections, sticky elements, parallax effects.",
  "Horizontal Layout": "Horizontal scroll sections for galleries or unique navigation.",
  "Unusual Layout": "Break the grid intentionally. Asymmetric compositions, visual tension.",
  "Transitions": "Smooth page transitions, content reveals, state changes.",
  "Infinite Scroll": "Continuous content loading for galleries or feeds.",
  "3D": "Three.js, WebGL, or CSS 3D transforms for depth and perspective.",
};

export default function SiteDetail() {
  const params = useParams();
  const slug = params.slug as string;
  const website = getWebsiteBySlug(slug);
  const [copied, setCopied] = useState(false);
  const [showFullAnalysis, setShowFullAnalysis] = useState(false);
  
  if (!website) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h1 className="font-display text-3xl mb-4">Site not found</h1>
        <p className="text-ink-60 mb-6">The site you're looking for doesn't exist in our gallery.</p>
        <Link href="/" className="btn-hard inline-block">
          ← Back to gallery
        </Link>
      </div>
    );
  }

  // Generate prompt
  const generatePrompt = () => {
    const parts: string[] = [];
    
    parts.push(`Create a ${website.types.join('/')} website inspired by ${website.name}.`);
    parts.push('');
    parts.push('VISUAL REFERENCE: ' + website.url);
    parts.push('Study this site for layout, typography, and interaction patterns.');
    parts.push('');
    
    if (website.styles.length > 0) {
      parts.push('KEY DESIGN CHARACTERISTICS:');
      for (const style of website.styles) {
        const instruction = STYLE_INSTRUCTIONS[style];
        if (instruction) {
          parts.push(`• ${style}: ${instruction}`);
        } else {
          parts.push(`• ${style}`);
        }
      }
      parts.push('');
    }
    
    if (website.fonts.length > 0) {
      parts.push(`TYPOGRAPHY: ${website.fonts.join(', ')} (or similar)`);
      parts.push('');
    }
    
    if (website.frameworks.length > 0) {
      parts.push(`TECH STACK: ${website.frameworks.join(', ')}`);
      parts.push('');
    }
    
    parts.push('ANTI-SLOP REQUIREMENTS:');
    parts.push('• NO generic purple gradients');
    parts.push('• NO cookie-cutter centered layouts');
    parts.push('• NO "Transform your business" copy');
    parts.push('• Make distinctive typography and color choices');
    parts.push('• Add meaningful interactions, not just hover color changes');
    parts.push('');
    parts.push('ACCESSIBILITY:');
    parts.push('• Ensure 4.5:1 color contrast for text');
    parts.push('• Add visible focus states for keyboard navigation');
    parts.push('• Use semantic HTML structure');
    
    return parts.join('\n');
  };

  const prompt = generatePrompt();

  const copyPrompt = async () => {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Get analyses for this site's styles
  const analyses = useMemo(() => {
    return website.styles
      .map(style => ({ style, ...STYLE_ANALYSIS[style] }))
      .filter(a => a.insight);
  }, [website.styles]);

  // Get related sites (same style or type)
  const relatedSites = websites
    .filter(w => 
      w.slug !== website.slug && 
      (w.styles.some(s => website.styles.includes(s)) || 
       w.types.some(t => website.types.includes(t)))
    )
    .slice(0, 4);

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b-2 border-border">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-4">
          <Link 
            href="/" 
            className="text-sm font-semibold uppercase tracking-wider text-ink-60 hover:text-ink transition-colors"
          >
            ← Back to gallery
          </Link>
        </div>
      </div>
      
      <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-10">
        <div className="grid lg:grid-cols-[1fr,380px] gap-10 lg:gap-16">
          {/* Main content */}
          <div>
            {/* Hero media */}
            <div className="relative aspect-video bg-ink-20 border-2 border-ink overflow-hidden mb-8">
              {website.video ? (
                <video
                  src={website.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : website.thumbnail ? (
                <img
                  src={website.thumbnail}
                  alt={`Screenshot of ${website.name}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-ink-40">
                  No preview available
                </div>
              )}
            </div>
            
            {/* Title + actions */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-10">
              <div>
                <h1 className="font-display text-3xl lg:text-4xl mb-2">{website.name}</h1>
                <a 
                  href={website.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink-60 hover:text-vermilion font-mono text-sm transition-colors"
                >
                  {website.url.replace('https://', '')}
                </a>
              </div>
              <a
                href={website.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-hard flex items-center gap-2 whitespace-nowrap"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="square" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Visit Site
              </a>
            </div>
            
            {/* Metadata grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 p-6 bg-paper-warm border-2 border-ink">
              <div>
                <h3 className="text-xs font-semibold text-ink-40 uppercase tracking-wider mb-3">Type</h3>
                <div className="flex flex-wrap gap-2">
                  {website.types.map(t => (
                    <Link 
                      key={t} 
                      href={`/?type=${encodeURIComponent(t)}`}
                      className="tag tag-primary hover:bg-ink hover:text-paper transition-colors"
                    >
                      {t}
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-ink-40 uppercase tracking-wider mb-3">Style</h3>
                <div className="flex flex-wrap gap-2">
                  {website.styles.slice(0, 4).map(s => (
                    <Link 
                      key={s} 
                      href={`/?style=${encodeURIComponent(s)}`}
                      className="tag tag-teal hover:bg-teal hover:text-paper transition-colors"
                    >
                      {s}
                    </Link>
                  ))}
                  {website.styles.length > 4 && (
                    <span className="tag text-ink-40 border-ink-20">
                      +{website.styles.length - 4}
                    </span>
                  )}
                </div>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-ink-40 uppercase tracking-wider mb-3">Fonts</h3>
                <div className="flex flex-wrap gap-2">
                  {website.fonts.length > 0 ? website.fonts.map(f => (
                    <span key={f} className="tag tag-primary">{f}</span>
                  )) : (
                    <span className="text-sm text-ink-40">Unknown</span>
                  )}
                </div>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-ink-40 uppercase tracking-wider mb-3">Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {website.frameworks.length > 0 ? website.frameworks.slice(0, 3).map(f => (
                    <span key={f} className="tag tag-primary">{f}</span>
                  )) : (
                    <span className="text-sm text-ink-40">Unknown</span>
                  )}
                </div>
              </div>
            </div>
            
            {/* Design Analysis Section */}
            {analyses.length > 0 && (
              <div className="mb-10">
                <h2 className="font-display text-2xl mb-6">Design Analysis</h2>
                <p className="text-ink-60 mb-6">
                  What makes this site distinctive? Here's our analysis of its key design characteristics.
                </p>
                
                <div className="space-y-6">
                  {analyses.slice(0, showFullAnalysis ? undefined : 2).map(analysis => (
                    <div key={analysis.style} className="anti-card p-6">
                      <h3 className="font-semibold text-lg mb-3 flex items-center gap-3">
                        <span className="tag tag-teal text-xs">{analysis.style}</span>
                      </h3>
                      <p className="text-ink-60 mb-4 leading-relaxed">
                        {analysis.insight}
                      </p>
                      <div className="p-4 bg-paper-warm border-l-4 border-vermilion">
                        <p className="text-sm font-semibold text-ink-60">
                          <span className="text-vermilion">Principle:</span> {analysis.principle}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {analyses.length > 2 && (
                  <button
                    onClick={() => setShowFullAnalysis(!showFullAnalysis)}
                    className="mt-4 text-sm font-semibold text-ink-60 hover:text-ink underline"
                  >
                    {showFullAnalysis ? 'Show less' : `Show ${analyses.length - 2} more analyses`}
                  </button>
                )}
              </div>
            )}
            
            {/* Related sites */}
            {relatedSites.length > 0 && (
              <div>
                <h2 className="font-display text-2xl mb-6">Similar Sites</h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {relatedSites.map(site => (
                    <Link
                      key={site.slug}
                      href={`/site/${site.slug}`}
                      className="group anti-card overflow-hidden"
                    >
                      <div className="aspect-video bg-ink-20 overflow-hidden border-b-2 border-ink">
                        {site.thumbnail && (
                          <img
                            src={site.thumbnail}
                            alt={`Screenshot of ${site.name}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        )}
                      </div>
                      <div className="p-3">
                        <h3 className="font-semibold text-sm truncate group-hover:text-vermilion transition-colors">
                          {site.name}
                        </h3>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Sidebar - Prompt */}
          <div className="lg:sticky lg:top-24 lg:self-start space-y-6">
            <div className="anti-card dark-section p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-lg">AI Prompt</h2>
                <button
                  onClick={copyPrompt}
                  className={`flex items-center gap-2 px-3 py-2 text-sm font-semibold transition-colors ${
                    copied 
                      ? 'bg-teal text-paper' 
                      : 'bg-paper/10 hover:bg-paper/20 text-paper'
                  }`}
                >
                  {copied ? (
                    <>✓ Copied!</>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="square" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Copy
                    </>
                  )}
                </button>
              </div>
              <p className="text-sm text-paper/60 mb-4">
                Use this prompt with Claude, ChatGPT, or Cursor to recreate this style.
              </p>
              <pre className="text-sm text-paper/80 whitespace-pre-wrap font-mono bg-ink-90 p-4 max-h-[350px] overflow-y-auto">
                {prompt}
              </pre>
            </div>
            
            {/* Style breakdown */}
            <div className="anti-card p-6">
              <h2 className="font-semibold text-lg mb-4">Style Instructions</h2>
              <div className="space-y-4">
                {website.styles.map(style => {
                  const instruction = STYLE_INSTRUCTIONS[style];
                  return (
                    <div key={style}>
                      <span className="tag tag-teal text-xs mb-2 inline-block">{style}</span>
                      {instruction && (
                        <p className="text-sm text-ink-60">{instruction}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Quick link to prompt lab */}
            <Link 
              href="/prompts" 
              className="block anti-card p-6 hover:border-vermilion transition-colors group"
            >
              <h3 className="font-semibold mb-2 group-hover:text-vermilion transition-colors">
                Need a custom prompt?
              </h3>
              <p className="text-sm text-ink-60">
                Use our Prompt Lab to generate AI instructions tailored to your specific project.
              </p>
              <span className="text-sm font-semibold text-vermilion mt-3 inline-block">
                Open Prompt Lab →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
