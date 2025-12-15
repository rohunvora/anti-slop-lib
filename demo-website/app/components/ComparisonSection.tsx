'use client';

import { ReactNode } from 'react';
import { useSlop } from './SlopContext';

interface ComparisonSectionProps {
  title: string;
  description: string;
  slopLabel?: string;
  goodLabel?: string;
  children: ReactNode;
  className?: string;
}

export function ComparisonSection({
  title,
  description,
  slopLabel = "AI Slop",
  goodLabel = "Good Design",
  children,
  className = "",
}: ComparisonSectionProps) {
  const { isSlop } = useSlop();

  return (
    <section className={`py-16 px-6 ${className}`}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">{title}</h2>
          <p className="text-gray-600 dark:text-gray-400">{description}</p>
        </div>
        
        <div className="mb-4 flex items-center gap-4">
          <div className={`px-3 py-1 rounded text-xs font-semibold ${
            isSlop 
              ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' 
              : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
          }`}>
            {isSlop ? slopLabel : goodLabel}
          </div>
        </div>

        <div className="transition-all duration-300">
          {children}
        </div>
      </div>
    </section>
  );
}

