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

  return (
    <aside className="w-64 flex-shrink-0 border-r border-neutral-200 bg-white">
      <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
        <div className="p-6 space-y-8">
          {/* Categories (Types) */}
          <div>
            <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">
              Categories
            </h3>
            <div className="space-y-1">
              {displayedTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => onToggleType(type)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors ${
                    selectedTypes.includes(type)
                      ? 'bg-neutral-900 text-white'
                      : 'text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  <span>{type}</span>
                  {selectedTypes.includes(type) && (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              ))}
              {types.length > 8 && (
                <button
                  onClick={() => setShowAllTypes(!showAllTypes)}
                  className="w-full px-3 py-2 text-sm text-neutral-500 hover:text-neutral-700 text-left"
                >
                  {showAllTypes ? 'Show less' : `Show ${types.length - 8} more`}
                </button>
              )}
            </div>
          </div>
          
          {/* Styles */}
          <div>
            <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">
              Styles
            </h3>
            <div className="space-y-1">
              {displayedStyles.map((style) => (
                <button
                  key={style}
                  onClick={() => onToggleStyle(style)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors ${
                    selectedStyles.includes(style)
                      ? 'bg-blue-600 text-white'
                      : 'text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  <span>{style}</span>
                  {selectedStyles.includes(style) && (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              ))}
              {styles.length > 10 && (
                <button
                  onClick={() => setShowAllStyles(!showAllStyles)}
                  className="w-full px-3 py-2 text-sm text-neutral-500 hover:text-neutral-700 text-left"
                >
                  {showAllStyles ? 'Show less' : `Show ${styles.length - 10} more`}
                </button>
              )}
            </div>
          </div>
          
          {/* Quick anti-slop tip */}
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
            <h4 className="font-medium text-amber-900 text-sm mb-1">💡 Pro tip</h4>
            <p className="text-xs text-amber-700 leading-relaxed">
              Look for sites with "Minimal", "Clean", or "Editorial" styles to avoid generic AI aesthetics.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}

