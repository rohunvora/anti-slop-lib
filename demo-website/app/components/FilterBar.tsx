'use client';

import { categories } from '../data/examples';

interface FilterBarProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function FilterBar({ activeCategory, onCategoryChange }: FilterBarProps) {
  return (
    <div className="flex gap-2 px-6 py-4 border-b border-[#2a2a2a]">
      {categories.map(category => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`
            px-4 py-2 rounded-lg text-sm font-medium transition-colors
            ${
              activeCategory === category
                ? 'bg-white text-black'
                : 'bg-[#1a1a1a] text-gray-400 hover:text-white border border-[#2a2a2a]'
            }
          `}
        >
          {category}
        </button>
      ))}
    </div>
  );
}


