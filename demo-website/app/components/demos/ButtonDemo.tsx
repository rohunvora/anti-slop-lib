'use client';

import { useSlop } from '../SlopContext';

export function ButtonDemo() {
  const { isSlop } = useSlop();

  if (isSlop) {
    return (
      <div className="space-y-6">
        <div className="flex flex-wrap gap-4">
          <button className="px-6 py-3 bg-gradient-to-r from-slop-purple to-slop-indigo rounded-xl font-semibold text-white hover:scale-105 transition-all shadow-lg shadow-slop-purple/25 font-slop">
            Primary Button
          </button>
          <button className="px-6 py-3 border border-gray-700 rounded-xl font-semibold backdrop-blur-md bg-white/5 hover:bg-white/10 transition-all text-white font-slop">
            Secondary Button
          </button>
          <button className="px-6 py-3 rounded-xl font-semibold text-gray-400 hover:text-white transition-all font-slop">
            Tertiary Button
          </button>
        </div>
        <div className="p-4 bg-slate-900 rounded-lg">
          <p className="text-xs text-gray-500 font-slop mb-2">Why this is slop:</p>
          <ul className="text-sm text-gray-400 space-y-1 font-slop">
            <li>• rounded-xl (overused)</li>
            <li>• Purple gradient (cliché)</li>
            <li>• Glassmorphism (backdrop-blur)</li>
            <li>• hover:scale-105 (generic animation)</li>
            <li>• Shadow glow effects</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4">
        <button className="px-6 py-3 border-2 border-editorial-text text-editorial-text font-semibold hover:bg-editorial-text hover:text-editorial-background transition-colors font-sans">
          Primary Button
        </button>
        <button className="px-6 py-3 text-editorial-text underline decoration-2 underline-offset-4 hover:decoration-editorial-primary transition-colors font-sans">
          Secondary Button
        </button>
        <button className="px-6 py-3 border-2 border-editorial-border text-editorial-muted hover:border-editorial-text hover:text-editorial-text transition-colors font-sans">
          Tertiary Button
        </button>
      </div>
      <div className="p-4 border-2 border-editorial-border bg-editorial-background">
        <p className="text-xs text-editorial-muted font-sans uppercase tracking-wider mb-2">Why this is better:</p>
        <ul className="text-sm text-editorial-text space-y-1 font-sans">
          <li>• Sharp corners (distinctive)</li>
          <li>• Bold borders instead of shadows</li>
          <li>• Underline animation (subtle, intentional)</li>
          <li>• Color transitions (not scale transforms)</li>
          <li>• No gradients or effects</li>
        </ul>
      </div>
    </div>
  );
}


