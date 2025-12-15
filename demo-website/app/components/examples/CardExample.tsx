'use client';

export function CardBad() {
  return (
    <div className="p-6 space-y-4 bg-[#0f0f0f]">
      <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-xl hover:scale-105 transition-all">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
          <span className="text-2xl">⚡</span>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
          Feature Title
        </h3>
        <p className="text-gray-400 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
          Lightning-fast performance that scales effortlessly with your needs.
        </p>
      </div>
    </div>
  );
}

export function CardGood() {
  return (
    <div className="p-6 space-y-4 bg-[#FAF7F2]">
      <div className="p-6 border-2 border-[#2D2A26] bg-white hover:bg-[#FAF7F2] transition-colors">
        <div className="w-12 h-12 border-2 border-[#2D2A26] flex items-center justify-center mb-4">
          <span className="text-xl font-bold text-[#2D2A26]" style={{ fontFamily: 'Fraunces, serif' }}>1</span>
        </div>
        <h3 className="text-xl font-bold text-[#2D2A26] mb-2" style={{ fontFamily: 'Fraunces, serif' }}>
          Feature Title
        </h3>
        <p className="text-[#6B6560] text-sm leading-relaxed" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
          Lightning-fast performance that scales effortlessly with your needs.
        </p>
      </div>
    </div>
  );
}

