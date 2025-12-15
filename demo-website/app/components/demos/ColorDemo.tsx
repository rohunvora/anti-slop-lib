'use client';

import { useSlop } from '../SlopContext';

export function ColorDemo() {
  const { isSlop } = useSlop();

  if (isSlop) {
    return (
      <div className="space-y-6">
        <div className="p-8 rounded-2xl bg-gradient-to-br from-slop-purple via-slop-pink to-slop-indigo shadow-xl">
          <h3 className="text-2xl font-bold text-white mb-2 font-slop">Purple Gradient Background</h3>
          <p className="text-purple-100 font-slop">The #1 marker of AI slop. Every v0 site has this.</p>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <div className="h-24 rounded-xl bg-slop-purple"></div>
          <div className="h-24 rounded-xl bg-slop-indigo"></div>
          <div className="h-24 rounded-xl bg-slop-pink"></div>
          <div className="h-24 rounded-xl bg-slate-950"></div>
        </div>
        <p className="text-sm text-gray-500 font-slop">
          Purple (#8B5CF6) • Indigo (#6366F1) • Pink (#EC4899) • Dark (#0f0f0f)
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="p-8 border-2 border-editorial-text bg-editorial-background">
        <h3 className="text-2xl font-bold text-editorial-text mb-2 font-serif">Warm Editorial Palette</h3>
        <p className="text-editorial-muted font-sans">Distinctive, intentional colors that feel human-chosen.</p>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <div className="h-24 border-2 border-editorial-text bg-editorial-primary"></div>
        <div className="h-24 border-2 border-editorial-text bg-editorial-secondary"></div>
        <div className="h-24 border-2 border-editorial-text bg-editorial-accent"></div>
        <div className="h-24 border-2 border-editorial-text bg-editorial-background"></div>
      </div>
      <p className="text-sm text-editorial-muted font-sans">
        Gold (#B8860B) • Brown (#8B4513) • Terracotta (#CD853F) • Cream (#FAF7F2)
      </p>
    </div>
  );
}

