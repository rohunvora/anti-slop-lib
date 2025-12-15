'use client';

import { useState } from 'react';

interface FilterSidebarProps {
  types: string[];
  styles: string[];
  selectedTypes: string[];
  selectedStyles: string[];
  onToggleType: (type: string) => void;
  onToggleStyle: (style: string) => void;
  onClear: () => void;
}

export function FilterSidebar({
  types,
  styles,
  selectedTypes,
  selectedStyles,
  onToggleType,
  onToggleStyle,
  onClear,
}: FilterSidebarProps) {
  const [showAllTypes, setShowAllTypes] = useState(false);
  const [showAllStyles, setShowAllStyles] = useState(false);
  
  const displayedTypes = showAllTypes ? types : types.slice(0, 8);
  const displayedStyles = showAllStyles ? styles : styles.slice(0, 10);

  const hasActiveFilters = selectedTypes.length > 0 || selectedStyles.length > 0;

  return (
    <aside className="w-64 flex-shrink-0 border-r-2 border-ink bg-paper-warm">
      <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
        <div className="p-6 space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-ink-60">
              Filters
            </h2>
            {hasActiveFilters && (
              <button
                onClick={onClear}
                className="text-xs font-semibold text-vermilion hover:underline"
              >
                Clear all
              </button>
            )}
          </div>

          {/* Categories (Types) */}
          <div>
            <h3 className="text-xs font-semibold text-ink-40 uppercase tracking-wider mb-4">
              Categories
            </h3>
            <div className="space-y-1">
              {displayedTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => onToggleType(type)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium transition-colors ${
                    selectedTypes.includes(type)
                      ? 'bg-ink text-paper'
                      : 'text-ink-60 hover:text-ink hover:bg-paper'
                  }`}
                >
                  <span>{type}</span>
                  {selectedTypes.includes(type) && (
                    <span className="text-xs">✓</span>
                  )}
                </button>
              ))}
              {types.length > 8 && (
                <button
                  onClick={() => setShowAllTypes(!showAllTypes)}
                  className="w-full px-3 py-2 text-sm text-ink-40 hover:text-ink text-left font-semibold"
                >
                  {showAllTypes ? '← Show less' : `Show ${types.length - 8} more →`}
                </button>
              )}
            </div>
          </div>
          
          {/* Styles */}
          <div>
            <h3 className="text-xs font-semibold text-ink-40 uppercase tracking-wider mb-4">
              Styles
            </h3>
            <div className="space-y-1">
              {displayedStyles.map((style) => (
                <button
                  key={style}
                  onClick={() => onToggleStyle(style)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium transition-colors ${
                    selectedStyles.includes(style)
                      ? 'bg-teal text-paper'
                      : 'text-ink-60 hover:text-ink hover:bg-paper'
                  }`}
                >
                  <span>{style}</span>
                  {selectedStyles.includes(style) && (
                    <span className="text-xs">✓</span>
                  )}
                </button>
              ))}
              {styles.length > 10 && (
                <button
                  onClick={() => setShowAllStyles(!showAllStyles)}
                  className="w-full px-3 py-2 text-sm text-ink-40 hover:text-ink text-left font-semibold"
                >
                  {showAllStyles ? '← Show less' : `Show ${styles.length - 10} more →`}
                </button>
              )}
            </div>
          </div>
          
          {/* Anti-slop tip */}
          <div className="p-4 bg-paper border-l-4 border-vermilion">
            <h4 className="font-semibold text-sm mb-2">Anti-slop tip</h4>
            <p className="text-xs text-ink-60 leading-relaxed">
              Filter by &ldquo;Minimal,&rdquo; &ldquo;Editorial,&rdquo; or &ldquo;Unusual Layout&rdquo; 
              to find sites that break from template-based design patterns.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
