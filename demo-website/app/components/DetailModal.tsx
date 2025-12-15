'use client';

import { useState } from 'react';
import { Example } from '../data/examples';
import { HeroBad, HeroGood } from './examples/HeroExample';
import { CardBad, CardGood } from './examples/CardExample';
import { TypographyBad, TypographyGood } from './examples/TypographyExample';
import { ColorBad, ColorGood } from './examples/ColorExample';
import { ButtonBad, ButtonGood } from './examples/ButtonExample';

interface DetailModalProps {
  example: Example;
  onClose: () => void;
}

const componentMap: Record<string, { bad: () => JSX.Element; good: () => JSX.Element }> = {
  'hero-section': { bad: HeroBad, good: HeroGood },
  'card-component': { bad: CardBad, good: CardGood },
  'typography-system': { bad: TypographyBad, good: TypographyGood },
  'color-palette': { bad: ColorBad, good: ColorGood },
  'cta-buttons': { bad: ButtonBad, good: ButtonGood },
};

export function DetailModal({ example, onClose }: DetailModalProps) {
  const [showAnnotations, setShowAnnotations] = useState(true);
  const [showCode, setShowCode] = useState(false);
  
  const components = componentMap[example.id];
  const BadComponent = components?.bad || (() => <div>Bad version</div>);
  const GoodComponent = components?.good || (() => <div>Good version</div>);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg max-w-7xl w-full max-h-[90vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-[#2a2a2a]">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">{example.title}</h2>
              <p className="text-gray-400 text-sm">{example.description}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4 px-6 py-4 border-b border-[#2a2a2a] bg-[#0a0a0a]">
            <button
              onClick={() => setShowAnnotations(!showAnnotations)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                showAnnotations
                  ? 'bg-white text-black'
                  : 'bg-[#2a2a2a] text-gray-400 hover:text-white'
              }`}
            >
              {showAnnotations ? 'Hide' : 'Show'} Annotations
            </button>
            <button
              onClick={() => setShowCode(!showCode)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                showCode
                  ? 'bg-white text-black'
                  : 'bg-[#2a2a2a] text-gray-400 hover:text-white'
              }`}
            >
              {showCode ? 'Hide' : 'Show'} Code
            </button>
            <div className="ml-auto flex gap-2">
              {example.tags.map(tag => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-[#2a2a2a] text-gray-400 text-xs rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {showCode ? (
              <div className="grid grid-cols-2 gap-6 p-6">
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <span className="px-2 py-1 bg-red-500/20 border border-red-500/30 rounded text-xs text-red-400 font-medium">
                      Bad
                    </span>
                  </div>
                  <pre className="bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg p-4 overflow-x-auto text-xs text-gray-300">
                    <code>{example.badCode}</code>
                  </pre>
                </div>
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <span className="px-2 py-1 bg-green-500/20 border border-green-500/30 rounded text-xs text-green-400 font-medium">
                      Good
                    </span>
                  </div>
                  <pre className="bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg p-4 overflow-x-auto text-xs text-gray-300">
                    <code>{example.goodCode}</code>
                  </pre>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-0">
                {/* Bad Version */}
                <div className="relative border-r border-[#2a2a2a]">
                  <div className="sticky top-0 bg-red-500/10 border-b border-red-500/20 px-4 py-2">
                    <span className="px-2 py-1 bg-red-500/20 border border-red-500/30 rounded text-xs text-red-400 font-medium">
                      AI Slop
                    </span>
                  </div>
                  <div className="relative">
                    <BadComponent />
                    {showAnnotations && (
                      <div className="absolute inset-0 pointer-events-none">
                        {example.annotations
                          .filter(a => a.side === 'bad')
                          .map(annotation => (
                            <div
                              key={annotation.id}
                              className="absolute"
                              style={{
                                left: `${annotation.x}%`,
                                top: `${annotation.y}%`,
                                transform: 'translate(-50%, -50%)',
                              }}
                            >
                              <div className="relative">
                                <div className="w-6 h-6 bg-red-500 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                                  {annotation.id}
                                </div>
                                <div className="absolute top-8 left-1/2 -translate-x-1/2 w-48 bg-[#1a1a1a] border border-red-500/30 rounded-lg p-2 text-xs text-white shadow-xl z-10">
                                  {annotation.text}
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Good Version */}
                <div className="relative">
                  <div className="sticky top-0 bg-green-500/10 border-b border-green-500/20 px-4 py-2">
                    <span className="px-2 py-1 bg-green-500/20 border border-green-500/30 rounded text-xs text-green-400 font-medium">
                      Good Design
                    </span>
                  </div>
                  <div className="relative">
                    <GoodComponent />
                    {showAnnotations && (
                      <div className="absolute inset-0 pointer-events-none">
                        {example.annotations
                          .filter(a => a.side === 'good')
                          .map(annotation => (
                            <div
                              key={annotation.id}
                              className="absolute"
                              style={{
                                left: `${annotation.x}%`,
                                top: `${annotation.y}%`,
                                transform: 'translate(-50%, -50%)',
                              }}
                            >
                              <div className="relative">
                                <div className="w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                                  {annotation.id}
                                </div>
                                <div className="absolute top-8 left-1/2 -translate-x-1/2 w-48 bg-[#1a1a1a] border border-green-500/30 rounded-lg p-2 text-xs text-white shadow-xl z-10">
                                  {annotation.text}
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-[#2a2a2a] bg-[#0a0a0a]">
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-white mb-2">Why it matters:</h3>
              <ul className="space-y-1">
                {example.whyItMatters.map((point, i) => (
                  <li key={i} className="text-sm text-gray-400 flex items-start gap-2">
                    <span className="text-gray-600 mt-1">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


