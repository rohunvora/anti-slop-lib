'use client';

export function ButtonBad() {
  return (
    <div className="p-6 space-y-6 bg-[#0f0f0f]">
      <div className="flex flex-wrap gap-4">
        <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full font-semibold text-white hover:scale-105 transition-all shadow-lg shadow-purple-500/25" style={{ fontFamily: 'Inter, sans-serif' }}>
          Primary Button
        </button>
        <button className="px-6 py-3 border border-gray-700 rounded-xl font-semibold backdrop-blur-md bg-white/5 hover:bg-white/10 transition-all text-white" style={{ fontFamily: 'Inter, sans-serif' }}>
          Secondary Button
        </button>
        <button className="px-6 py-3 rounded-xl font-semibold text-gray-400 hover:text-white transition-all" style={{ fontFamily: 'Inter, sans-serif' }}>
          Tertiary Button
        </button>
      </div>
    </div>
  );
}

export function ButtonGood() {
  return (
    <div className="p-6 space-y-6 bg-[#FAF7F2]">
      <div className="flex flex-wrap gap-4">
        <button className="px-6 py-3 border-2 border-[#2D2A26] text-[#2D2A26] font-semibold hover:bg-[#2D2A26] hover:text-[#FAF7F2] transition-colors" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
          Primary Button
        </button>
        <button className="px-6 py-3 text-[#2D2A26] underline decoration-2 underline-offset-4 hover:decoration-[#B8860B] transition-colors" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
          Secondary Button
        </button>
        <button className="px-6 py-3 border-2 border-[#E8E4DD] text-[#6B6560] hover:border-[#2D2A26] hover:text-[#2D2A26] transition-colors" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
          Tertiary Button
        </button>
      </div>
    </div>
  );
}


