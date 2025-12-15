'use client';

import { useSlop } from './SlopContext';

export function SlopToggle() {
  const { isSlop, toggleSlop } = useSlop();

  return (
    <div className="flex items-center gap-3">
      <span className={`text-sm font-medium transition-colors ${isSlop ? 'text-gray-400' : 'text-editorial-text'}`}>
        Good Design
      </span>
      <button
        onClick={toggleSlop}
        className={`
          relative inline-flex h-7 w-14 items-center rounded-full transition-colors
          ${isSlop ? 'bg-slop-purple' : 'bg-editorial-primary'}
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-editorial-primary
        `}
        aria-label="Toggle between slop and good design"
      >
        <span
          className={`
            inline-block h-5 w-5 transform rounded-full bg-white transition-transform
            ${isSlop ? 'translate-x-8' : 'translate-x-1'}
          `}
        />
      </button>
      <span className={`text-sm font-medium transition-colors ${isSlop ? 'text-slop-purple' : 'text-gray-400'}`}>
        AI Slop
      </span>
    </div>
  );
}

