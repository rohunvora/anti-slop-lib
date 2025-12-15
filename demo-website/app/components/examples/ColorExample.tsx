'use client';

export function ColorBad() {
  return (
    <div className="p-6 space-y-6 bg-[#0f0f0f]">
      <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 shadow-xl">
        <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
          Purple Gradient Background
        </h3>
        <p className="text-purple-100" style={{ fontFamily: 'Inter, sans-serif' }}>
          The #1 marker of AI slop. Every v0 site has this.
        </p>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <div className="h-20 rounded-xl bg-[#8B5CF6]"></div>
        <div className="h-20 rounded-xl bg-[#6366F1]"></div>
        <div className="h-20 rounded-xl bg-[#EC4899]"></div>
        <div className="h-20 rounded-xl bg-[#0f0f0f] border border-gray-800"></div>
      </div>
      <p className="text-sm text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>
        Purple (#8B5CF6) • Indigo (#6366F1) • Pink (#EC4899) • Dark (#0f0f0f)
      </p>
    </div>
  );
}

export function ColorGood() {
  return (
    <div className="p-6 space-y-6 bg-[#FAF7F2]">
      <div className="p-8 border-2 border-[#2D2A26] bg-white">
        <h3 className="text-2xl font-bold text-[#2D2A26] mb-2" style={{ fontFamily: 'Fraunces, serif' }}>
          Warm Editorial Palette
        </h3>
        <p className="text-[#6B6560]" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
          Distinctive, intentional colors that feel human-chosen.
        </p>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <div className="h-20 border-2 border-[#2D2A26] bg-[#B8860B]"></div>
        <div className="h-20 border-2 border-[#2D2A26] bg-[#8B4513]"></div>
        <div className="h-20 border-2 border-[#2D2A26] bg-[#CD853F]"></div>
        <div className="h-20 border-2 border-[#2D2A26] bg-[#FAF7F2]"></div>
      </div>
      <p className="text-sm text-[#6B6560]" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
        Gold (#B8860B) • Brown (#8B4513) • Terracotta (#CD853F) • Cream (#FAF7F2)
      </p>
    </div>
  );
}

