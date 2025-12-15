'use client';

export function TypographyBad() {
  return (
    <div className="p-8 space-y-6 bg-[#0f0f0f]">
      <div>
        <h1 className="text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
          Inter: The Default Choice
        </h1>
        <p className="text-lg text-gray-300 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
          This is Inter, the font that appears on every AI-generated website. 
          It's clean, readable, and completely forgettable.
        </p>
      </div>
      <div className="pt-6 border-t border-gray-800">
        <h2 className="text-3xl font-semibold text-white mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
          Subheading
        </h2>
        <p className="text-base text-gray-400 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
          Body text continues with the same font. No contrast, no hierarchy, 
          no personality. Just default.
        </p>
      </div>
    </div>
  );
}

export function TypographyGood() {
  return (
    <div className="p-8 space-y-6 bg-[#FAF7F2] border-2 border-[#2D2A26]">
      <div>
        <h1 className="text-6xl font-bold text-[#2D2A26] mb-4 leading-tight" style={{ fontFamily: 'Fraunces, serif' }}>
          Fraunces + IBM Plex Sans
        </h1>
        <p className="text-lg text-[#6B6560] leading-relaxed" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
          Fraunces is a serif with personality—quirky, wonky, memorable. Paired with 
          IBM Plex Sans for body text, this combination feels intentional and distinctive.
        </p>
      </div>
      <div className="pt-6 border-t-2 border-[#E8E4DD]">
        <h2 className="text-3xl font-bold text-[#2D2A26] mb-3" style={{ fontFamily: 'Fraunces, serif' }}>
          Subheading
        </h2>
        <p className="text-base text-[#2D2A26] leading-relaxed" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
          Body text uses a different font, creating clear hierarchy and visual interest. 
          The pairing feels intentional, not default.
        </p>
      </div>
    </div>
  );
}

