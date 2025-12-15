'use client';

export function HeroBad() {
  return (
    <div className="relative min-h-[400px] flex items-center justify-center text-center overflow-hidden bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500">
      {/* Floating blobs */}
      <div className="absolute top-10 left-10 w-48 h-48 bg-white/20 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/20 rounded-full blur-2xl opacity-50"></div>
      
      <div className="relative z-10 max-w-2xl px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
          Transform Your Workflow with AI-Powered Solutions
        </h1>
        <p className="text-lg text-white/90 mb-8" style={{ fontFamily: 'Inter, sans-serif' }}>
          Supercharge your productivity and revolutionize how you work. 
          Seamlessly integrate our next-generation platform.
        </p>
        <button className="px-8 py-4 bg-white text-purple-600 rounded-xl font-semibold hover:scale-105 transition-transform">
          Get Started Free
        </button>
      </div>
    </div>
  );
}

export function HeroGood() {
  return (
    <div className="min-h-[400px] flex items-start pt-12 px-6 bg-[#FAF7F2]">
      <div className="max-w-5xl mx-auto w-full">
        <div className="grid grid-cols-12 gap-6 items-start">
          <div className="col-span-7">
            <h1 className="text-5xl md:text-6xl font-bold text-[#2D2A26] leading-tight mb-4" style={{ fontFamily: 'Fraunces, serif' }}>
              A todo app that respects your attention
            </h1>
            <p className="text-lg text-[#6B6560] leading-relaxed mb-6" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
              Most task managers feel like work. This one helps you focus on what matters—without 
              the notifications, gamification, or "productivity hacks" that distract you.
            </p>
            <div className="flex gap-4">
              <button className="px-6 py-3 border-2 border-[#2D2A26] text-[#2D2A26] font-semibold hover:bg-[#2D2A26] hover:text-[#FAF7F2] transition-colors" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                Try it free
              </button>
              <button className="px-6 py-3 text-[#2D2A26] underline decoration-2 underline-offset-4 hover:decoration-[#B8860B] transition-colors" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                Read the manifesto
              </button>
            </div>
          </div>
          <div className="col-span-5">
            <div className="border-2 border-[#2D2A26] p-6 bg-white">
              <div className="space-y-3">
                <div className="h-3 bg-[#2D2A26] w-3/4"></div>
                <div className="h-3 bg-[#E8E4DD] w-full"></div>
                <div className="h-3 bg-[#E8E4DD] w-5/6"></div>
                <div className="h-3 bg-[#E8E4DD] w-4/5"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


