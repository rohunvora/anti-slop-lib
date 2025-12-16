'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { websites, allStyles } from '../data/websites';
import Link from 'next/link';
import Image from 'next/image';
import { getSiteTokens, hasInteractiveStyles } from '../lib/siteTokens';
import { Tag } from '../components/Tag';

// Analysis summaries for each style
const STYLE_ANALYSIS: Record<string, string> = {
  'Minimal': 'Uses restraint as a design tool. Every element earns its place.',
  'Dark': 'True blacks, not dark grays. Single accent creates focus.',
  'Animation': 'Motion serves communication, not decoration.',
  'Editorial': 'Typography-first. Serif headlines create editorial weight.',
  'Unusual Layout': 'Breaks the grid intentionally. Asymmetry creates tension.',
  '3D': 'Dimensional elements serve content, with graceful fallbacks.',
  'Clean': 'Clear hierarchy through spacing, not decoration.',
  'Interactive': 'Elements respond meaningfully to user input.',
  'Fun': 'Playful choices that commit to a personality.',
  'Light': 'Off-white backgrounds, not pure white. Warm and readable.',
};

function GalleryContent() {
  const searchParams = useSearchParams();
  const initialStyle = searchParams.get('style');
  
  const [selectedStyles, setSelectedStyles] = useState<string[]>(
    initialStyle ? [initialStyle] : []
  );
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredWebsites = useMemo(() => {
    let result = websites;
    
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(w => 
        w.name.toLowerCase().includes(q) ||
        w.styles.some(s => s.toLowerCase().includes(q)) ||
        w.fonts.some(f => f.toLowerCase().includes(q))
      );
    }
    
    if (selectedStyles.length > 0) {
      result = result.filter(w => 
        selectedStyles.some(s => w.styles.includes(s))
      );
    }
    
    return result;
  }, [selectedStyles, searchQuery]);
  
  const toggleStyle = (style: string) => {
    setSelectedStyles(prev => 
      prev.includes(style) 
        ? prev.filter(s => s !== style)
        : [...prev, style]
    );
  };

  // Get the most common styles for filtering
  const topStyles = ['Minimal', 'Dark', 'Animation', 'Clean', 'Editorial', 'Interactive', 'Light', 'Fun'];

  return (
    <>
      {/* Header */}
      <section className="border-b-3 border-ink">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-10">
          <h1 className="font-display text-3xl lg:text-4xl mb-4">
            Site Gallery
          </h1>
          <p className="text-ink-60 max-w-2xl">
            {websites.length} curated examples of distinctive web design. Each entry includes 
            analysis of why it works and prompts to recreate its approach.
          </p>
        </div>
      </section>
      
      {/* Filters */}
      <section className="border-b-3 border-ink bg-paper-bright sticky top-14 z-30">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 max-w-md">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search sites, styles, fonts..."
                className="w-full"
                aria-label="Search gallery"
              />
            </div>
            
            {/* Style filters */}
            <div className="flex flex-wrap gap-2">
              {topStyles.map(style => (
                <button
                  key={style}
                  onClick={() => toggleStyle(style)}
                  className={`tag ${selectedStyles.includes(style) ? 'tag-filled' : ''}`}
                >
                  {style}
                </button>
              ))}
              {selectedStyles.length > 0 && (
                <button
                  onClick={() => setSelectedStyles([])}
                  className="tag tag-vermilion"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Results */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-8 py-8">
        <p className="text-sm text-ink-60 mb-6">
          Showing {filteredWebsites.length} sites
        </p>
        
        {/* Grid - NOT uniform cards */}
        <div className="space-y-4">
          {filteredWebsites.map((site) => {
            const tokens = getSiteTokens(site);
            const isInteractive = hasInteractiveStyles(site);
            
            // Map fontCategory to Tailwind classes
            const fontClass =
              tokens.fontCategory === 'serif'
                ? 'font-display'
                : tokens.fontCategory === 'monospace'
                  ? 'font-mono'
                  : 'font-body';
            
            // Radius class
            const radiusClass = tokens.radiusStyle === 'rounded' ? 'rounded-lg' : '';
            
            return (
              <Link
                key={site.slug}
                href={`/site/${site.slug}`}
                className={`group block border-3 border-ink bg-paper-bright hover:bg-paper transition-all duration-150 ${
                  isInteractive
                    ? 'hover:scale-[1.01] hover:-translate-y-1 motion-reduce:hover:scale-100 motion-reduce:hover:translate-y-0'
                    : ''
                }`}
                style={{
                  borderLeftColor: tokens.primaryColor,
                  borderLeftWidth: '8px',
                }}
              >
                <div className={`grid lg:grid-cols-[280px,1fr] items-stretch ${radiusClass}`}>
                  {/* Thumbnail */}
                  <div className="relative aspect-video lg:aspect-auto border-b-3 lg:border-b-0 lg:border-r-3 border-ink overflow-hidden">
                    {site.thumbnail ? (
                      <Image
                        src={site.thumbnail}
                        alt={`Screenshot of ${site.name}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 280px"
                      />
                    ) : (
                      <div className="w-full h-full min-h-[160px] bg-ink-40 flex items-center justify-center text-paper">
                        No preview
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div>
                          <p className="font-mono text-xs text-ink-40 mb-1">
                            {site.url.replace('https://', '').replace('www.', '')}
                          </p>
                          <h2
                            className={`${fontClass} text-xl lg:text-2xl transition-colors`}
                            style={{
                              color: tokens.primaryColor,
                            }}
                          >
                            {site.name}
                          </h2>
                        </div>
                        <span
                          className="font-mono text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{ color: tokens.primaryColor }}
                        >
                          View analysis →
                        </span>
                      </div>

                      {/* Analysis summary */}
                      <p className="text-ink-60 text-sm mb-4">
                        {site.styles.map((s) => STYLE_ANALYSIS[s]).filter(Boolean)[0] ||
                          'Distinctive design choices that set it apart from template-based sites.'}
                      </p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {site.styles.slice(0, 4).map((style) => (
                        <Tag key={style} color={tokens.secondaryColor} className="text-[10px]">
                          {style}
                        </Tag>
                      ))}
                      {site.fonts.length > 0 && (
                        <Tag color={tokens.primaryColor} className="text-[10px]">
                          {site.fonts[0]}
                        </Tag>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        
        {filteredWebsites.length === 0 && (
          <div className="border-3 border-dashed border-ink-40 p-12 text-center">
            <p className="text-ink-60 mb-4">No sites match your filters</p>
            <button
              onClick={() => {
                setSelectedStyles([]);
                setSearchQuery('');
              }}
              className="btn btn-outline btn-small"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>
    </>
  );
}

export default function GalleryPage() {
  return (
    <Suspense fallback={
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-12">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-40 bg-ink/10" />
          ))}
        </div>
      </div>
    }>
      <GalleryContent />
    </Suspense>
  );
}

