'use client';

import { useSlop } from '../SlopContext';

export function CardDemo() {
  const { isSlop } = useSlop();

  if (isSlop) {
    return (
      <div className="grid grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-xl hover:scale-105 transition-all">
            <div className="w-12 h-12 bg-gradient-to-br from-slop-purple to-slop-pink rounded-xl flex items-center justify-center mb-4">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white font-slop">Feature {i}</h3>
            <p className="text-gray-400 text-sm font-slop">
              Lightning-fast performance that scales effortlessly with your needs.
            </p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="p-6 border-2 border-editorial-text bg-editorial-background hover:bg-editorial-surface transition-colors">
          <div className="w-12 h-12 border-2 border-editorial-text flex items-center justify-center mb-4">
            <span className="text-xl font-bold text-editorial-text font-serif">{i}</span>
          </div>
          <h3 className="text-xl font-bold mb-2 text-editorial-text font-serif">Feature {i}</h3>
          <p className="text-editorial-muted text-sm font-sans leading-relaxed">
            Lightning-fast performance that scales effortlessly with your needs.
          </p>
        </div>
      ))}
    </div>
  );
}


