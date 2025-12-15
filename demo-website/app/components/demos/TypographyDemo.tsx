'use client';

import { useSlop } from '../SlopContext';

export function TypographyDemo() {
  const { isSlop } = useSlop();

  if (isSlop) {
    return (
      <div className="space-y-8 p-8 bg-slate-950 rounded-2xl">
        <div>
          <p className="text-xs text-gray-500 mb-2 font-slop">SLOP FONT</p>
          <h1 className="text-5xl font-bold text-white font-slop mb-4">
            Inter: The Default Choice
          </h1>
          <p className="text-lg text-gray-400 font-slop">
            This is Inter, the font that appears on every AI-generated website. 
            It's clean, readable, and completely forgettable. When you see Inter, 
            you know someone typed "modern landing page" into v0.
          </p>
        </div>
        <div className="pt-8 border-t border-gray-800">
          <p className="text-sm text-gray-500 font-slop">Body text</p>
          <p className="text-base text-gray-300 font-slop leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-8 bg-editorial-background border-2 border-editorial-text">
      <div>
        <p className="text-xs text-editorial-muted mb-2 font-sans uppercase tracking-wider">GOOD FONTS</p>
        <h1 className="text-5xl font-bold text-editorial-text mb-4 font-serif leading-tight">
          Fraunces + IBM Plex Sans
        </h1>
        <p className="text-lg text-editorial-muted font-sans leading-relaxed">
          Fraunces is a serif with personality—quirky, wonky, memorable. Paired with 
          IBM Plex Sans for body text, this combination feels intentional and distinctive. 
          You won't see this on every AI site.
        </p>
      </div>
      <div className="pt-8 border-t-2 border-editorial-border">
        <p className="text-sm text-editorial-muted font-sans uppercase tracking-wider mb-2">Body text</p>
        <p className="text-base text-editorial-text font-sans leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
        </p>
      </div>
    </div>
  );
}


