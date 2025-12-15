'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { getWebsiteBySlug, websites } from '../../data/websites';

// Style instructions for prompts
const STYLE_INSTRUCTIONS: Record<string, string> = {
  "Animation": "Implement smooth, purposeful animations. Use CSS transitions, Framer Motion, or GSAP.",
  "Fun": "Create playful interactions, bold colors, and delightful micro-animations.",
  "Minimal": "Strip to essentials. Limited palette (2-3 colors), geometric shapes, ample negative space.",
  "Single Page": "Immersive single-page experience with smooth scrolling and section navigation.",
  "Interactive": "Cursor effects, hover animations, micro-interactions. Elements respond to input.",
  "Light": "Light color scheme with white/off-white backgrounds, subtle shadows, muted accents.",
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
  
  if (!website) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Site not found</h1>
        <Link href="/" className="text-blue-600 hover:underline">
          Back to gallery
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
    parts.push('• Make distinctive typography and color choices');
    parts.push('• Add meaningful interactions, not just hover color changes');
    
    return parts.join('\n');
  };

  const prompt = generatePrompt();

  const copyPrompt = async () => {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Get related sites (same style or type)
  const relatedSites = websites
    .filter(w => 
      w.slug !== website.slug && 
      (w.styles.some(s => website.styles.includes(s)) || 
       w.types.some(t => website.types.includes(t)))
    )
    .slice(0, 4);

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <Link href="/" className="text-sm text-neutral-500 hover:text-neutral-700">
          ← Back to gallery
        </Link>
      </nav>
      
      <div className="grid lg:grid-cols-[1fr,400px] gap-8">
        {/* Main content */}
        <div>
          {/* Hero media */}
          <div className="relative aspect-video bg-neutral-100 rounded-2xl overflow-hidden mb-6">
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
                alt={website.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-neutral-400">
                No preview available
              </div>
            )}
          </div>
          
          {/* Title + actions */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-neutral-900">{website.name}</h1>
              <a 
                href={website.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-500 hover:text-neutral-700 text-sm"
              >
                {website.url.replace('https://', '')}
              </a>
            </div>
            <a
              href={website.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white rounded-lg font-medium hover:bg-neutral-800 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Visit Site
            </a>
          </div>
          
          {/* Metadata grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 p-6 bg-neutral-50 rounded-xl">
            <div>
              <h3 className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-2">Type</h3>
              <div className="flex flex-wrap gap-1.5">
                {website.types.map(t => (
                  <Link 
                    key={t} 
                    href={`/?type=${encodeURIComponent(t)}`}
                    className="px-2.5 py-1 text-sm bg-white border border-neutral-200 rounded-full hover:border-neutral-300"
                  >
                    {t}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-2">Style</h3>
              <div className="flex flex-wrap gap-1.5">
                {website.styles.slice(0, 4).map(s => (
                  <Link 
                    key={s} 
                    href={`/?style=${encodeURIComponent(s)}`}
                    className="px-2.5 py-1 text-sm bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100"
                  >
                    {s}
                  </Link>
                ))}
                {website.styles.length > 4 && (
                  <span className="px-2.5 py-1 text-sm text-neutral-400">
                    +{website.styles.length - 4} more
                  </span>
                )}
              </div>
            </div>
            <div>
              <h3 className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-2">Fonts</h3>
              <div className="flex flex-wrap gap-1.5">
                {website.fonts.length > 0 ? website.fonts.map(f => (
                  <span key={f} className="px-2.5 py-1 text-sm bg-white border border-neutral-200 rounded-full">
                    {f}
                  </span>
                )) : (
                  <span className="text-sm text-neutral-400">Unknown</span>
                )}
              </div>
            </div>
            <div>
              <h3 className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-2">Stack</h3>
              <div className="flex flex-wrap gap-1.5">
                {website.frameworks.length > 0 ? website.frameworks.slice(0, 3).map(f => (
                  <span key={f} className="px-2.5 py-1 text-sm bg-white border border-neutral-200 rounded-full">
                    {f}
                  </span>
                )) : (
                  <span className="text-sm text-neutral-400">Unknown</span>
                )}
              </div>
            </div>
          </div>
          
          {/* Related sites */}
          {relatedSites.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Similar Sites</h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {relatedSites.map(site => (
                  <Link
                    key={site.slug}
                    href={`/site/${site.slug}`}
                    className="group"
                  >
                    <div className="aspect-video bg-neutral-100 rounded-lg overflow-hidden mb-2">
                      {site.thumbnail && (
                        <img
                          src={site.thumbnail}
                          alt={site.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      )}
                    </div>
                    <h3 className="text-sm font-medium truncate">{site.name}</h3>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Sidebar - Prompt */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="bg-neutral-900 text-white rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">AI Prompt</h2>
              <button
                onClick={copyPrompt}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                  copied 
                    ? 'bg-green-500 text-white' 
                    : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                {copied ? (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy
                  </>
                )}
              </button>
            </div>
            <p className="text-sm text-neutral-400 mb-4">
              Use this prompt with Claude, ChatGPT, or Cursor to recreate this style.
            </p>
            <pre className="text-sm text-neutral-300 whitespace-pre-wrap font-mono bg-black/30 rounded-lg p-4 max-h-[400px] overflow-y-auto">
              {prompt}
            </pre>
          </div>
          
          {/* Style breakdown */}
          <div className="mt-6 p-6 bg-neutral-50 rounded-2xl">
            <h2 className="text-lg font-semibold mb-4">Style Breakdown</h2>
            <div className="space-y-3">
              {website.styles.map(style => {
                const instruction = STYLE_INSTRUCTIONS[style];
                return (
                  <div key={style} className="text-sm">
                    <span className="font-medium text-neutral-900">{style}</span>
                    {instruction && (
                      <p className="text-neutral-500 mt-0.5">{instruction}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

