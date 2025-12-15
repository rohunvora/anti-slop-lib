'use client';

import { useState } from 'react';

interface SlopPattern {
  id: string;
  rank: number;
  label: string;
  problem: string;
  fix: string;
}

const slopPatterns: SlopPattern[] = [
  {
    id: 'gradient',
    rank: 1,
    label: 'Purple/Pink Gradient Background',
    problem: 'The #1 marker of AI slop. Every v0 site has purple gradients.',
    fix: 'Use solid colors or warm palettes (gold, terracotta, forest green)'
  },
  {
    id: 'copy',
    rank: 2,
    label: '"Transform Your X with AI-Powered Y"',
    problem: 'Could apply to any product. Says nothing specific.',
    fix: 'Write headlines that describe what YOUR product actually does'
  },
  {
    id: 'font',
    rank: 3,
    label: 'Inter Font Everywhere',
    problem: 'Appears on every AI-generated site. Completely forgettable.',
    fix: 'Use serif headlines (Fraunces, Playfair) or distinctive sans-serif'
  },
  {
    id: 'blob',
    rank: 4,
    label: 'Floating Blurry Orbs',
    problem: 'Decorative but meaningless. Screams "AI-generated".',
    fix: 'Use real imagery relevant to your product, or nothing at all'
  },
  {
    id: 'glass',
    rank: 5,
    label: 'Glassmorphism Card',
    problem: 'backdrop-blur + white/10 border = instant AI look',
    fix: 'Use solid backgrounds with bold borders instead'
  },
  {
    id: 'cta',
    rank: 6,
    label: '"Get Started Free" Button',
    problem: 'Generic CTA that appears on every AI site',
    fix: 'Be specific: "Create your first invoice" or match your brand voice'
  }
];

export function SlopDiagram() {
  const [hoveredPattern, setHoveredPattern] = useState<string | null>(null);

  return (
    <div className="relative">
      <h2 className="text-3xl font-bold mb-4 text-center text-white" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>
        The AI Slop Starter Pack
      </h2>
      <p className="text-gray-400 text-center mb-10 max-w-2xl mx-auto">
        This is what AI generates by default. Every element below is a cliché. 
        Click any numbered marker to see what's wrong.
      </p>

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* The Mockup - Left side */}
        <div className="relative flex-1 bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 rounded-sm p-8 min-h-[480px]">
          {/* Marker 1: Gradient background */}
          <button
            className={`absolute top-3 right-3 w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all cursor-pointer z-20
              ${hoveredPattern === 'gradient' ? 'bg-white text-red-500 border-white scale-110' : 'bg-red-500 border-white text-white hover:scale-110'}`}
            onClick={() => setHoveredPattern(hoveredPattern === 'gradient' ? null : 'gradient')}
          >
            1
          </button>

          {/* Floating Blobs */}
          <div className="absolute top-8 left-8 w-32 h-32 bg-white/20 rounded-full blur-3xl opacity-60"></div>
          <div className="absolute bottom-16 right-16 w-24 h-24 bg-white/20 rounded-full blur-2xl opacity-60"></div>
          
          {/* Marker 4: Blobs */}
          <button
            className={`absolute top-16 left-20 w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all cursor-pointer z-20
              ${hoveredPattern === 'blob' ? 'bg-white text-red-500 border-white scale-110' : 'bg-red-500 border-white text-white hover:scale-110'}`}
            onClick={() => setHoveredPattern(hoveredPattern === 'blob' ? null : 'blob')}
          >
            4
          </button>

          {/* Content */}
          <div className="relative z-10 text-center mt-10">
            {/* Marker 2: Generic copy */}
            <div className="relative inline-block">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                Transform Your Workflow with AI-Powered Solutions
              </h1>
              <button
                className={`absolute -top-2 -right-2 w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all cursor-pointer z-20
                  ${hoveredPattern === 'copy' ? 'bg-white text-red-500 border-white scale-110' : 'bg-red-500 border-white text-white hover:scale-110'}`}
                onClick={() => setHoveredPattern(hoveredPattern === 'copy' ? null : 'copy')}
              >
                2
              </button>
            </div>
            
            {/* Marker 3: Inter font */}
            <div className="relative inline-block">
              <p className="text-lg text-white/90 mb-8" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                Supercharge your productivity and revolutionize how you work.
              </p>
              <button
                className={`absolute -top-1 -right-4 w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all cursor-pointer z-20
                  ${hoveredPattern === 'font' ? 'bg-white text-red-500 border-white scale-110' : 'bg-red-500 border-white text-white hover:scale-110'}`}
                onClick={() => setHoveredPattern(hoveredPattern === 'font' ? null : 'font')}
              >
                3
              </button>
            </div>

            {/* Glassmorphism Card */}
            <div className="relative max-w-sm mx-auto mb-8">
              <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                  Feature Title
                </h3>
                <p className="text-gray-300 text-sm" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                  Lightning-fast performance
                </p>
              </div>
              {/* Marker 5: Glassmorphism */}
              <button
                className={`absolute -top-2 -right-2 w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all cursor-pointer z-20
                  ${hoveredPattern === 'glass' ? 'bg-white text-red-500 border-white scale-110' : 'bg-red-500 border-white text-white hover:scale-110'}`}
                onClick={() => setHoveredPattern(hoveredPattern === 'glass' ? null : 'glass')}
              >
                5
              </button>
            </div>

            {/* CTA Button */}
            <div className="relative inline-block">
              <button className="px-8 py-4 bg-white text-purple-600 rounded-xl font-semibold" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                Get Started Free
              </button>
              {/* Marker 6: Generic CTA */}
              <button
                className={`absolute -top-2 -right-2 w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all cursor-pointer z-20
                  ${hoveredPattern === 'cta' ? 'bg-white text-red-500 border-white scale-110' : 'bg-red-500 border-white text-white hover:scale-110'}`}
                onClick={() => setHoveredPattern(hoveredPattern === 'cta' ? null : 'cta')}
              >
                6
              </button>
            </div>
          </div>
        </div>

        {/* Pattern List - Right side */}
        <div className="lg:w-80 space-y-2">
          {slopPatterns.map(pattern => (
            <button
              key={pattern.id}
              onClick={() => setHoveredPattern(hoveredPattern === pattern.id ? null : pattern.id)}
              className={`w-full text-left p-3 rounded transition-all border ${
                hoveredPattern === pattern.id
                  ? 'bg-red-500/20 border-red-500/50'
                  : 'bg-[#1a1a1a] border-[#2a2a2a] hover:border-[#3a3a3a]'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                  hoveredPattern === pattern.id ? 'bg-red-500 text-white' : 'bg-[#2a2a2a] text-gray-400'
                }`}>
                  {pattern.rank}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-white truncate">{pattern.label}</div>
                  {hoveredPattern === pattern.id && (
                    <div className="mt-2 space-y-2 text-xs">
                      <p className="text-red-400">
                        <span className="font-semibold">Problem:</span> {pattern.problem}
                      </p>
                      <p className="text-green-400">
                        <span className="font-semibold">Fix:</span> {pattern.fix}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

