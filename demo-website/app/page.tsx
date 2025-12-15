'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { websites, allTypes, allStyles } from './data/websites';
import { WebsiteCard } from './components/WebsiteCard';
import { FilterSidebar } from './components/FilterSidebar';

type SortOption = 'latest' | 'popular' | 'name';

function HomeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Initialize from URL params
  const initialType = searchParams.get('type');
  const initialStyle = searchParams.get('style');
  const initialSearch = searchParams.get('q') || '';
  
  const [selectedTypes, setSelectedTypes] = useState<string[]>(initialType ? [initialType] : []);
  const [selectedStyles, setSelectedStyles] = useState<string[]>(initialStyle ? [initialStyle] : []);
  const [sort, setSort] = useState<SortOption>('latest');
  const [showFilters, setShowFilters] = useState(true);
  const [searchQuery, setSearchQuery] = useState(initialSearch);

  // Update state when URL params change
  useEffect(() => {
    const type = searchParams.get('type');
    const style = searchParams.get('style');
    const q = searchParams.get('q') || '';
    
    if (type && !selectedTypes.includes(type)) {
      setSelectedTypes([type]);
    }
    if (style && !selectedStyles.includes(style)) {
      setSelectedStyles([style]);
    }
    if (q !== searchQuery) {
      setSearchQuery(q);
    }
  }, [searchParams]);

  const filteredWebsites = useMemo(() => {
    let result = websites;
    
    // Search filter
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
    
    // Sort
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
  };

  const toggleStyle = (style: string) => {
    setSelectedStyles(prev => 
      prev.includes(style) 
        ? prev.filter(s => s !== style)
        : [...prev, style]
    );
  };

  const clearFilters = () => {
    setSelectedTypes([]);
    setSelectedStyles([]);
    setSearchQuery('');
    router.push('/');
  };

  const activeFilterCount = selectedTypes.length + selectedStyles.length;

  return (
    <div className="flex">
      {/* Sidebar */}
      {showFilters && (
        <FilterSidebar
          types={allTypes}
          styles={allStyles}
          selectedTypes={selectedTypes}
          selectedStyles={selectedStyles}
          onToggleType={toggleType}
          onToggleStyle={toggleStyle}
          onClear={clearFilters}
        />
      )}
      
      {/* Main content */}
      <div className="flex-1 min-w-0">
        {/* Toolbar */}
        <div className="sticky top-16 z-40 bg-white/95 backdrop-blur-sm border-b border-neutral-200">
          <div className="px-6 py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-1">
              {/* Filter toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg border transition-colors ${
                  showFilters 
                    ? 'bg-neutral-900 text-white border-neutral-900' 
                    : 'text-neutral-600 border-neutral-200 hover:border-neutral-300'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filter
                {activeFilterCount > 0 && (
                  <span className="bg-white text-neutral-900 text-xs px-1.5 py-0.5 rounded-full">
                    {activeFilterCount}
                  </span>
                )}
              </button>
              
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input 
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search sites, styles, fonts..." 
                  className="w-full pl-10 pr-4 py-1.5 text-sm border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent bg-white"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
              
              {/* Active filters */}
              {activeFilterCount > 0 && (
                <div className="hidden lg:flex items-center gap-2">
                  {selectedTypes.map(type => (
                    <button
                      key={type}
                      onClick={() => toggleType(type)}
                      className="flex items-center gap-1 px-2 py-1 text-xs font-medium bg-neutral-100 rounded-full hover:bg-neutral-200"
                    >
                      {type}
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  ))}
                  {selectedStyles.map(style => (
                    <button
                      key={style}
                      onClick={() => toggleStyle(style)}
                      className="flex items-center gap-1 px-2 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100"
                    >
                      {style}
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  ))}
                  <button
                    onClick={clearFilters}
                    className="text-xs text-neutral-500 hover:text-neutral-700"
                  >
                    Clear all
                  </button>
                </div>
              )}
            </div>
            
            {/* Sort + count */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-neutral-500 whitespace-nowrap">
                {filteredWebsites.length} sites
              </span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className="text-sm border border-neutral-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-neutral-900 bg-white"
              >
                <option value="latest">Latest</option>
                <option value="popular">Most viewed</option>
                <option value="name">Name</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Grid */}
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredWebsites.map((website) => (
              <WebsiteCard key={website.slug} website={website} />
            ))}
          </div>
          
          {filteredWebsites.length === 0 && (
            <div className="text-center py-20">
              <p className="text-neutral-500">No sites match your filters</p>
              <button
                onClick={clearFilters}
                className="mt-2 text-sm text-neutral-900 underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Loading fallback for Suspense
function HomeLoading() {
  return (
    <div className="flex">
      <div className="w-64 border-r border-neutral-200 p-6 hidden lg:block">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-neutral-200 rounded w-24" />
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="h-4 bg-neutral-100 rounded" />
            ))}
          </div>
        </div>
      </div>
      <div className="flex-1 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
            <div key={i} className="animate-pulse">
              <div className="aspect-[16/10] bg-neutral-200 rounded-xl mb-4" />
              <div className="h-4 bg-neutral-200 rounded w-3/4 mb-2" />
              <div className="h-3 bg-neutral-100 rounded w-1/2" />
            </div>
          ))}
        </div>
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
