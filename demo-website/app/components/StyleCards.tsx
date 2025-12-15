'use client';

import { useState } from 'react';
import { stylePrompts, StylePrompt } from '../data/prompts';

// Style-specific card configurations
const cardStyles: Record<string, {
  container: string;
  title: string;
  vibe: string;
  meta: string;
  cta: string;
  titleFont: string;
}> = {
  editorial: {
    container: 'bg-[#FAF7F2] border-2 border-[#8B4513] rounded-none hover:border-[#B8860B]',
    title: 'text-[#2D2A26]',
    vibe: 'text-[#5C5348]',
    meta: 'text-[#8B7355]',
    cta: 'text-[#B8860B] group-hover:text-[#8B4513]',
    titleFont: 'Fraunces, serif',
  },
  brutalist: {
    container: 'bg-white border-[3px] border-black rounded-none hover:bg-[#FF0000] hover:text-white',
    title: 'text-black group-hover:text-white',
    vibe: 'text-black/70 group-hover:text-white/90',
    meta: 'text-black/60 font-mono group-hover:text-white/80',
    cta: 'text-[#FF0000] group-hover:text-white uppercase tracking-wider',
    titleFont: 'Arial, Helvetica, sans-serif',
  },
  minimal: {
    container: 'bg-white border border-[#E5E5E5] rounded hover:border-black',
    title: 'text-black',
    vibe: 'text-[#666666]',
    meta: 'text-[#999999]',
    cta: 'text-black group-hover:underline',
    titleFont: '"IBM Plex Sans", sans-serif',
  },
  playful: {
    container: 'bg-[#FFF9E6] border-2 border-[#4ECDC4] rounded-2xl hover:border-[#FF6B6B] hover:bg-[#FFE6E6]',
    title: 'text-[#2D3436]',
    vibe: 'text-[#636E72]',
    meta: 'text-[#4ECDC4]',
    cta: 'text-[#FF6B6B] group-hover:text-[#4ECDC4]',
    titleFont: 'Poppins, sans-serif',
  },
  luxury: {
    container: 'bg-[#0A0A0A] border border-[#C9A227]/40 rounded hover:border-[#C9A227]',
    title: 'text-[#F5F5DC]',
    vibe: 'text-[#C9A227]',
    meta: 'text-[#888888]',
    cta: 'text-[#C9A227] group-hover:text-[#F5F5DC]',
    titleFont: '"Cormorant Garamond", serif',
  },
};

export function StyleCards() {
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = async (prompt: string, id: string) => {
    await navigator.clipboard.writeText(prompt);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const selectedPrompt = selectedStyle 
    ? stylePrompts.find(p => p.id === selectedStyle)
    : null;

  return (
    <div>
      <h2 className="text-3xl font-bold mb-2 text-center text-[var(--color-ink)]" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>Pick Your Direction</h2>
      <p className="text-[var(--color-ink-light)] text-center mb-8 max-w-2xl mx-auto">
        Choose a style direction. Copy the prompt and paste it into v0, Cursor, or Claude 
        before generating your UI.
      </p>

      {!selectedPrompt ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {stylePrompts.map(style => {
            const cardStyle = cardStyles[style.id] || cardStyles.minimal;
            return (
              <button
                key={style.id}
                onClick={() => setSelectedStyle(style.id)}
                className={`text-left p-6 transition-all duration-200 group ${cardStyle.container}`}
              >
                <h3 
                  className={`text-xl font-bold mb-2 ${cardStyle.title}`}
                  style={{ fontFamily: cardStyle.titleFont }}
                >
                  {style.name}
                </h3>
                <p className={`text-sm mb-4 ${cardStyle.vibe}`}>{style.vibe}</p>
                <div className={`text-xs space-y-1 ${cardStyle.meta}`}>
                  <div>Font: {style.preview.font}</div>
                  <div>Colors: {style.preview.colors.join(', ')}</div>
                  <div>Corners: {style.preview.corners}</div>
                </div>
                <div className={`mt-4 text-xs transition-colors ${cardStyle.cta}`}>
                  Click to view prompt →
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => setSelectedStyle(null)}
            className="mb-6 text-[var(--color-ink-light)] hover:text-[var(--color-ink)] transition-colors flex items-center gap-2"
          >
            ← Back to styles
          </button>

          {/* Prompt Display */}
          <div className="bg-white border-2 border-[var(--color-brown)] rounded-none p-6">
            <div className="mb-4">
              <h3 
                className="text-2xl font-bold text-[var(--color-ink)] mb-2"
                style={{ fontFamily: 'Fraunces, Georgia, serif' }}
              >
                {selectedPrompt.name}
              </h3>
              <p className="text-[var(--color-ink-light)]">{selectedPrompt.description}</p>
            </div>

            {/* Preview Info */}
            <div className="mb-6 p-4 bg-[var(--color-cream-dark)] border border-[var(--color-brown)]/30">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="text-[var(--color-ink-light)] text-xs mb-1 uppercase tracking-wide">Font</div>
                  <div className="text-[var(--color-ink)] font-medium">{selectedPrompt.preview.font}</div>
                </div>
                <div>
                  <div className="text-[var(--color-ink-light)] text-xs mb-1 uppercase tracking-wide">Colors</div>
                  <div className="text-[var(--color-ink)] font-medium">{selectedPrompt.preview.colors.join(', ')}</div>
                </div>
                <div>
                  <div className="text-[var(--color-ink-light)] text-xs mb-1 uppercase tracking-wide">Corners</div>
                  <div className="text-[var(--color-ink)] font-medium">{selectedPrompt.preview.corners}</div>
                </div>
                <div>
                  <div className="text-[var(--color-ink-light)] text-xs mb-1 uppercase tracking-wide">Best For</div>
                  <div className="text-[var(--color-ink)] font-medium">{selectedPrompt.preview.example}</div>
                </div>
              </div>
            </div>

            {/* Prompt Text */}
            <div className="relative">
              <pre className="bg-[#1a1a1a] border-2 border-[var(--color-brown)] p-4 overflow-x-auto text-sm text-gray-300 whitespace-pre-wrap font-mono">
                {selectedPrompt.prompt}
              </pre>
              
              {/* Copy Button */}
              <button
                onClick={() => handleCopy(selectedPrompt.prompt, selectedPrompt.id)}
                className={`
                  absolute top-4 right-4 px-4 py-2 text-sm font-medium transition-colors border-2
                  ${copied === selectedPrompt.id
                    ? 'bg-green-600 text-white border-green-600'
                    : 'bg-[var(--color-gold)] text-white border-[var(--color-gold)] hover:bg-[var(--color-brown)] hover:border-[var(--color-brown)]'
                  }
                `}
              >
                {copied === selectedPrompt.id ? '✓ Copied!' : 'Copy Prompt'}
              </button>
            </div>

            {/* Usage Instructions */}
            <div className="mt-6 p-4 bg-[var(--color-gold)]/10 border-2 border-[var(--color-gold)]/30">
              <div className="text-sm text-[var(--color-brown-dark)]">
                <strong className="text-[var(--color-gold)]">How to use:</strong> Copy this prompt, then paste it into your AI tool 
                (v0, Cursor, Claude) before generating your UI. The AI will follow these 
                instructions and avoid slop patterns.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

