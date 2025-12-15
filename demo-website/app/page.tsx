'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { websites, allTypes, allStyles } from './data/websites';
import { WebsiteCard } from './components/WebsiteCard';
import Link from 'next/link';

type SortOption = 'latest' | 'popular' | 'name';

function HomeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const initialType = searchParams.get('type');
  const initialStyle = searchParams.get('style');
  const initialSearch = searchParams.get('q') || '';
  
  const [selectedTypes, setSelectedTypes] = useState<string[]>(initialType ? [initialType] : []);
  const [selectedStyles, setSelectedStyles] = useState<string[]>(initialStyle ? [initialStyle] : []);
  const [sort, setSort] = useState<SortOption>('latest');
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [showHero, setShowHero] = useState(true);

  useEffect(() => {
    const type = searchParams.get('type');
    const style = searchParams.get('style');
    const q = searchParams.get('q') || '';
    
    if (type && !selectedTypes.includes(type)) {
      setSelectedTypes([type]);
      setShowHero(false);
    }
    if (style && !selectedStyles.includes(style)) {
      setSelectedStyles([style]);
      setShowHero(false);
    }
    if (q !== searchQuery) {
      setSearchQuery(q);
    }
  }, [searchParams]);

  const filteredWebsites = useMemo(() => {
    let result = websites;
    
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(w => 
        w.name.toLowerCase().includes(q) ||
        w.types.some(t => t.toLowerCase().includes(q)) ||
        w.styles.some(s => s.toLowerCase().includes(q)) ||
        w.fonts.some(f => f.toLowerCase().includes(q)) ||
        w.frameworks.some(f => f.toLowerCase().includes(q))
      );
    }
    
    if (selectedTypes.length > 0) {
      result = result.filter(w => 
        selectedTypes.some(t => w.types.includes(t))
      );
    }
    
    if (selectedStyles.length > 0) {
      result = result.filter(w => 
        selectedStyles.some(s => w.styles.includes(s))
      );
    }
    
    if (sort === 'latest') {
      result = [...result].sort((a, b) => 
        new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
      );
    } else if (sort === 'popular') {
      result = [...result].sort((a, b) => (b.views || 0) - (a.views || 0));
    } else if (sort === 'name') {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    }
    
    return result;
  }, [selectedTypes, selectedStyles, sort, searchQuery]);

  const toggleType = (type: string) => {
    setSelectedTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
    setShowHero(false);
  };

  const toggleStyle = (style: string) => {
    setSelectedStyles(prev => 
      prev.includes(style) 
        ? prev.filter(s => s !== style)
        : [...prev, style]
    );
    setShowHero(false);
  };

  const clearFilters = () => {
    setSelectedTypes([]);
    setSelectedStyles([]);
    setSearchQuery('');
    router.push('/');
  };

  const activeFilterCount = selectedTypes.length + selectedStyles.length;

  // Featured styles for quick access
  const featuredStyles = ['Minimal', 'Dark', 'Animation', 'Editorial', 'Brutalist', '3D'];

  return (
    <>
      {/* Hero Section - Only show when no filters active */}
      {showHero && activeFilterCount === 0 && !searchQuery && (
        <section className="border-b-2 border-ink">
          <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-16 lg:py-24">
            <div className="grid lg:grid-cols-[1.2fr,1fr] gap-12 lg:gap-20 items-start">
              {/* Left: Message */}
              <div className="stagger-children">
                <p className="text-sm font-semibold uppercase tracking-wider text-vermilion mb-4">
                  A manifesto against homogenized design
                </p>
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl mb-6 leading-[1.05]">
                  Your website looks like{' '}
                  <span className="italic">every other</span>{' '}
                  AI-generated template.
                </h1>
                <p className="text-lg lg:text-xl text-ink-60 max-w-xl mb-8 leading-relaxed">
                  Purple gradients. Inter font. Rounded corners on everything. 
                  Generic copy about &ldquo;transforming workflows.&rdquo; 
                  We call it <strong className="text-ink">slop</strong>—and we&apos;re here to help you escape it.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/patterns" className="btn-hard">
                    See the patterns →
                  </Link>
                  <Link href="/prompts" className="btn-ghost">
                    Build with prompts
                  </Link>
                </div>
              </div>
              
              {/* Right: Quick stats + featured */}
              <div className="space-y-8">
                {/* Stats */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="anti-card p-6">
                    <p className="font-display text-4xl lg:text-5xl text-vermilion">{websites.length}</p>
                    <p className="text-sm text-ink-60 mt-1 uppercase tracking-wider">Curated sites</p>
                  </div>
                  <div className="anti-card p-6">
                    <p className="font-display text-4xl lg:text-5xl text-teal">{allStyles.length}</p>
                    <p className="text-sm text-ink-60 mt-1 uppercase tracking-wider">Design styles</p>
                  </div>
                </div>
                
                {/* Featured styles */}
                <div className="anti-card p-6">
                  <p className="text-sm font-semibold uppercase tracking-wider text-ink-60 mb-4">
                    Explore by style
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {featuredStyles.map(style => (
                      <button
                        key={style}
                        onClick={() => toggleStyle(style)}
                        className="tag tag-primary hover:bg-ink hover:text-paper transition-colors"
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Anti-slop tip */}
                <div className="border-l-4 border-vermilion pl-4 py-2">
                  <p className="text-sm text-ink-60 italic">
                    &ldquo;The first step to distinctive design is recognizing 
                    what makes design generic.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      
      {/* Gallery Section */}
      <section className="max-w-[1600px] mx-auto px-6 lg:px-10 py-12">
        {/* Toolbar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
          <div className="flex flex-wrap items-center gap-4">
            {/* Search */}
            <div className="relative flex-1 min-w-[250px] max-w-md">
              <svg 
                className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-40" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="square" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input 
                type="search"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (e.target.value) setShowHero(false);
                }}
                placeholder="Search sites, styles, fonts..." 
                className="w-full pl-11 pr-4 py-3 text-sm bg-paper-bright border-2 border-ink focus:outline-none focus:border-vermilion transition-colors"
                aria-label="Search the gallery"
              />
            </div>
            
            {/* Active filters */}
            {activeFilterCount > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                {selectedTypes.map(type => (
                  <button
                    key={type}
                    onClick={() => toggleType(type)}
                    className="flex items-center gap-2 px-3 py-2 text-sm font-semibold bg-ink text-paper hover:bg-vermilion transition-colors"
                    aria-label={`Remove ${type} filter`}
                  >
                    {type}
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="square" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                ))}
                {selectedStyles.map(style => (
                  <button
                    key={style}
                    onClick={() => toggleStyle(style)}
                    className="flex items-center gap-2 px-3 py-2 text-sm font-semibold bg-teal text-paper hover:bg-teal-dark transition-colors"
                    aria-label={`Remove ${style} filter`}
                  >
                    {style}
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="square" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                ))}
                <button
                  onClick={clearFilters}
                  className="text-sm font-semibold text-ink-60 hover:text-vermilion underline"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>
          
          {/* Sort + count */}
          <div className="flex items-center gap-6">
            <span className="text-sm text-ink-60 font-mono">
              {filteredWebsites.length} sites
            </span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="text-sm bg-paper-bright border-2 border-ink px-4 py-2 focus:outline-none focus:border-vermilion cursor-pointer"
              aria-label="Sort sites"
            >
              <option value="latest">Latest</option>
              <option value="popular">Most viewed</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>
        
        {/* Filter pills row */}
        {(showHero || activeFilterCount === 0) && (
          <div className="mb-10 pb-6 border-b-2 border-border">
            <p className="text-sm font-semibold uppercase tracking-wider text-ink-60 mb-4">
              Filter by style
            </p>
            <div className="flex flex-wrap gap-2">
              {allStyles.slice(0, 15).map(style => (
                <button
                  key={style}
                  onClick={() => toggleStyle(style)}
                  className={`tag transition-colors ${
                    selectedStyles.includes(style)
                      ? 'bg-teal text-paper border-teal'
                      : 'tag-primary hover:bg-ink hover:text-paper'
                  }`}
                >
                  {style}
                </button>
              ))}
              {allStyles.length > 15 && (
                <span className="tag text-ink-40 border-ink-20">
                  +{allStyles.length - 15} more
                </span>
              )}
            </div>
          </div>
        )}
        
        {/* Grid - Intentionally varied column structure */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
          {filteredWebsites.map((website, index) => (
            <WebsiteCard 
              key={website.slug} 
              website={website}
              featured={index < 3 && showHero}
            />
          ))}
        </div>
        
        {filteredWebsites.length === 0 && (
          <div className="text-center py-20 border-2 border-dashed border-ink-20">
            <p className="text-ink-60 mb-4">No sites match your filters</p>
            <button
              onClick={clearFilters}
              className="btn-ghost"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>
      
      {/* CTA Section */}
      <section className="dark-section border-t-2 border-ink">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl lg:text-4xl mb-4">
                Ready to build something{' '}
                <span className="text-vermilion">distinctive</span>?
              </h2>
              <p className="text-paper/70 text-lg mb-8">
                Stop browsing, start creating. Our Prompt Lab generates AI instructions 
                tailored to your project, so you can skip the slop and ship something memorable.
              </p>
              <Link href="/prompts" className="inline-block btn-hard bg-vermilion border-vermilion hover:bg-vermilion-dark hover:border-vermilion-dark">
                Open Prompt Lab →
              </Link>
            </div>
            <div className="hidden lg:block">
              {/* Visual element - code-like display */}
              <div className="code-block p-6 text-sm">
                <pre className="text-teal">// Your next project shouldn&apos;t look like this:</pre>
                <pre className="text-paper/50 mt-2">className=&quot;bg-gradient-to-br from-purple-600</pre>
                <pre className="text-paper/50">  via-indigo-600 to-blue-600 rounded-3xl</pre>
                <pre className="text-paper/50">  shadow-2xl font-inter&quot;</pre>
                <pre className="text-vermilion mt-4">// Make intentional choices instead.</pre>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function HomeLoading() {
  return (
    <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
          <div key={i} className="animate-pulse">
            <div className="aspect-[16/10] bg-ink-20 border-2 border-ink-20 mb-4" />
            <div className="h-4 bg-ink-20 w-3/4 mb-2" />
            <div className="h-3 bg-ink-20 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<HomeLoading />}>
      <HomeContent />
    </Suspense>
  );
}
