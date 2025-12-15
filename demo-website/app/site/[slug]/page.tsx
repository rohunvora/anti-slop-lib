'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState, useMemo } from 'react';
import { getWebsiteBySlug, websites } from '../../data/websites';

// Detailed analysis for each style
const STYLE_ANALYSIS: Record<string, { 
  insight: string; 
  technique: string;
  avoid: string;
}> = {
  "Minimal": {
    insight: "True minimalism removes elements until the design breaks, then adds one back. Every remaining element must justify its existence.",
    technique: "Use generous whitespace (40-50% of viewport), limit colors to 2-3, remove decorative borders and shadows.",
    avoid: "Don't confuse 'minimal' with 'empty.' The constraint should force intentional choices, not just deletion.",
  },
  "Dark": {
    insight: "Effective dark themes use true black (#0a0a0a), not dark gray. A single accent color gains power from surrounding darkness.",
    technique: "Background: #0a0a0a to #111. Text: #fff for headings, #a1a1a1 for body. ONE vibrant accent with subtle glow.",
    avoid: "Don't use dark gray (#1f2937) as your darkest color—it looks muddy. Don't use multiple accent colors.",
  },
  "Animation": {
    insight: "Animation should communicate state changes, not decorate. Every motion answers: 'what just happened?'",
    technique: "Use 150-300ms for UI transitions. Scroll-triggered animations should reveal content, not block it.",
    avoid: "Don't animate everything. Don't use animation-delay patterns that make users wait for content.",
  },
  "Editorial": {
    insight: "Editorial design treats typography as the primary visual element. Font choice, size, and spacing create hierarchy—not boxes.",
    technique: "Serif headlines (48-72px), generous line-height (1.6-1.8), max-width for readable lines (~65 characters).",
    avoid: "Don't center-align body text. Don't use decorative elements that compete with typography.",
  },
  "Clean": {
    insight: "Clean means clear hierarchy, not emptiness. Users should know exactly where to look first, second, and third.",
    technique: "Establish visual priority through size contrast, weight, and spacing. Use consistent alignment.",
    avoid: "Don't remove so much that hierarchy is lost. Don't rely on subtle differences—make them obvious.",
  },
  "Interactive": {
    insight: "Meaningful interactivity creates user investment. Elements should respond to input in ways that reveal information or provide control.",
    technique: "Hover states that preview actions, click feedback with transforms, cursor changes that indicate interactivity.",
    avoid: "Don't add mouse-follow effects without purpose. Don't make interactions so subtle they're missed.",
  },
  "Fun": {
    insight: "Playful design requires commitment. You can't be 'a little bit fun'—it reads as indecisive.",
    technique: "Bold color choices, bouncy animations (spring physics), unexpected micro-interactions, confident copywriting.",
    avoid: "Don't mix playful elements with corporate aesthetic. Don't use 'fun' icons on a serious layout.",
  },
  "Unusual Layout": {
    insight: "Breaking the grid creates visual tension and memorability. But unconventional choices must still serve content.",
    technique: "Asymmetric proportions (1.2:1, 1.4:1 ratios), overlapping elements with purpose, varied section structures.",
    avoid: "Don't break conventions without reason. Unusual should mean 'intentionally different,' not 'randomly placed.'",
  },
  "Light": {
    insight: "Light themes require more nuance than dark. Pure white (#fff) is harsh—use warm off-whites for comfortable reading.",
    technique: "Background: #f5f2eb to #faf8f4. Reserve pure white for elevated surfaces (cards, modals).",
    avoid: "Don't use pure white backgrounds. Don't pair with light gray text—maintain strong contrast.",
  },
  "3D": {
    insight: "3D on the web only works when it serves content—demonstrating a product, explaining a concept, creating spatial narrative.",
    technique: "Lazy load 3D assets, provide graceful fallbacks, target 60fps, use loading states as part of experience.",
    avoid: "Don't add 3D for spectacle alone. Don't block page load for 3D assets.",
  },
};

export default function SiteDetail() {
  const params = useParams();
  const slug = params.slug as string;
  const website = getWebsiteBySlug(slug);
  const [copied, setCopied] = useState(false);
  
  if (!website) {
    return (
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-20 text-center">
        <h1 className="font-display text-3xl mb-4">Site not found</h1>
        <p className="text-ink-60 mb-6">The requested site doesn't exist in our gallery.</p>
        <Link href="/gallery" className="btn">
          ← Back to gallery
        </Link>
      </div>
    );
  }

  // Get analyses for this site's styles
  const analyses = useMemo(() => {
    return website.styles
      .map(style => ({ style, ...STYLE_ANALYSIS[style] }))
      .filter(a => a.insight);
  }, [website.styles]);

  // Generate prompt
  const generatePrompt = () => {
    const parts = [
      `Create a ${website.types.join('/')} website inspired by ${website.name}.`,
      '',
      `## Reference: ${website.url}`,
      'Study this site for layout, typography, and interaction patterns.',
      '',
      '## Design Requirements',
    ];
    
    analyses.forEach(a => {
      parts.push(`### ${a.style}`);
      parts.push(a.technique);
      parts.push('');
    });
    
    if (website.fonts.length > 0) {
      parts.push(`## Typography`);
      parts.push(`Use fonts similar to: ${website.fonts.join(', ')}`);
      parts.push('');
    }
    
    parts.push('## Anti-Slop Requirements');
    parts.push('- NO purple/indigo gradients');
    parts.push('- NO rounded-xl shadow-lg on cards');
    parts.push('- NO center-aligned hero with generic copy');
    parts.push('- NO Inter as the only typeface');
    parts.push('');
    parts.push('## Accessibility');
    parts.push('- 4.5:1 minimum contrast ratio');
    parts.push('- Visible focus states on all interactive elements');
    parts.push('- Semantic HTML structure');
    
    return parts.join('\n');
  };

  const prompt = generatePrompt();

  const copyPrompt = async () => {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Related sites
  const relatedSites = websites
    .filter(w => 
      w.slug !== website.slug && 
      w.styles.some(s => website.styles.includes(s))
    )
    .slice(0, 4);

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b-3 border-ink">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-4">
          <Link 
            href="/gallery" 
            className="text-sm font-semibold uppercase tracking-wider text-ink-60 hover:text-ink"
          >
            ← Back to gallery
          </Link>
        </div>
      </div>
      
      <div className="max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-[1fr,400px]">
          {/* Main content */}
          <div className="p-6 lg:p-8 border-r-3 border-ink">
            {/* Hero */}
            <div className="mb-8">
              {website.thumbnail && (
                <div className="relative aspect-video border-3 border-ink overflow-hidden mb-6">
                  {website.video ? (
                    <video
                      src={website.video}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={website.thumbnail}
                      alt={`Screenshot of ${website.name}`}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              )}
              
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-sm text-ink-40 mb-1">
                    {website.url.replace('https://', '').replace('www.', '')}
                  </p>
                  <h1 className="font-display text-3xl lg:text-4xl">{website.name}</h1>
                </div>
                <a
                  href={website.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-small flex-shrink-0"
                >
                  Visit →
                </a>
              </div>
            </div>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8 pb-8 border-b-3 border-ink">
              {website.types.map(t => (
                <Link 
                  key={t} 
                  href={`/gallery?type=${encodeURIComponent(t)}`}
                  className="tag hover:tag-filled transition-colors"
                >
                  {t}
                </Link>
              ))}
              {website.styles.map(s => (
                <Link 
                  key={s} 
                  href={`/gallery?style=${encodeURIComponent(s)}`}
                  className="tag tag-teal"
                >
                  {s}
                </Link>
              ))}
              {website.fonts.map(f => (
                <span key={f} className="tag tag-vermilion">
                  {f}
                </span>
              ))}
            </div>
            
            {/* Analysis */}
            {analyses.length > 0 && (
              <div className="mb-8">
                <h2 className="font-display text-2xl mb-6">Design Analysis</h2>
                <p className="text-ink-60 mb-6">
                  What makes this site distinctive, and how to apply its principles.
                </p>
                
                <div className="space-y-6">
                  {analyses.map(analysis => (
                    <div key={analysis.style} className="border-3 border-ink p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="tag tag-teal text-xs">{analysis.style}</span>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <p className="font-mono text-xs text-ink-40 uppercase mb-1">Insight</p>
                          <p className="text-ink-60">{analysis.insight}</p>
                        </div>
                        
                        <div>
                          <p className="font-mono text-xs text-teal uppercase mb-1">Technique</p>
                          <p>{analysis.technique}</p>
                        </div>
                        
                        <div>
                          <p className="font-mono text-xs text-vermilion uppercase mb-1">Avoid</p>
                          <p className="text-ink-60">{analysis.avoid}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Related */}
            {relatedSites.length > 0 && (
              <div>
                <h2 className="font-display text-2xl mb-6">Similar Sites</h2>
                <div className="grid grid-cols-2 gap-4">
                  {relatedSites.map(site => (
                    <Link
                      key={site.slug}
                      href={`/site/${site.slug}`}
                      className="group border-3 border-ink overflow-hidden hover:border-vermilion transition-colors"
                    >
                      {site.thumbnail && (
                        <div className="aspect-video border-b-3 border-ink overflow-hidden">
                          <img
                            src={site.thumbnail}
                            alt={`Screenshot of ${site.name}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="p-3">
                        <p className="font-semibold text-sm truncate group-hover:text-vermilion transition-colors">
                          {site.name}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Sidebar - Prompt */}
          <div className="p-6 lg:p-8 bg-paper-bright lg:sticky lg:top-14 lg:h-[calc(100vh-3.5rem)] lg:overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl">AI Prompt</h2>
              <button
                onClick={copyPrompt}
                className={`btn btn-small ${copied ? 'bg-teal border-teal' : ''}`}
              >
                {copied ? '✓ Copied' : 'Copy'}
              </button>
            </div>
            
            <p className="text-sm text-ink-60 mb-4">
              Use this prompt to recreate this site's approach in your own project.
            </p>
            
            <div className="code-block p-4 text-sm">
              <pre className="whitespace-pre-wrap">{prompt}</pre>
            </div>
            
            {/* Stack info */}
            {website.frameworks.length > 0 && (
              <div className="mt-6 border-3 border-ink p-4">
                <p className="font-mono text-xs text-ink-40 uppercase mb-2">Tech Stack</p>
                <div className="flex flex-wrap gap-2">
                  {website.frameworks.map(f => (
                    <span key={f} className="tag text-xs">{f}</span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Link to prompt builder */}
            <Link 
              href="/prompts" 
              className="block mt-6 border-3 border-ink p-4 hover:border-vermilion transition-colors"
            >
              <p className="font-semibold text-sm mb-1">Build a custom prompt</p>
              <p className="text-xs text-ink-60">
                Select specific patterns to include or avoid in your project.
              </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
