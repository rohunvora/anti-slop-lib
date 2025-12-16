'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

export function LabsNav() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-3 py-2 text-xs lg:text-sm font-semibold uppercase tracking-wider text-ink-60 hover:text-ink hover:bg-paper-bright transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        Labs
        <span className="ml-1 text-[10px]">{isOpen ? '▲' : '▼'}</span>
      </button>
      
      {isOpen && (
        <div className="absolute top-full right-0 mt-1 bg-paper border-3 border-ink shadow-lg z-50 min-w-[200px]">
          <Link
            href="/patterns"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-3 text-sm hover:bg-paper-bright border-b-2 border-ink-20"
          >
            Pattern Lab
          </Link>
          <Link
            href="/microinteractions"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-3 text-sm hover:bg-paper-bright"
          >
            Micro-interactions
          </Link>
        </div>
      )}
    </div>
  );
}

