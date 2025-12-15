'use client';

import { useSlop } from '../SlopContext';

export function HeroDemo() {
  const { isSlop } = useSlop();

  if (isSlop) {
    return (
      <div className="relative min-h-screen flex items-center justify-center text-center overflow-hidden bg-slop-dark">
        {/* Floating blobs */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-slop-purple rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-slop-indigo rounded-full blur-2xl opacity-40 animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-slop-purple via-slop-pink to-slop-indigo bg-clip-text text-transparent font-slop mb-6">
            Transform Your Workflow with AI-Powered Solutions
          </h1>
          <p className="text-xl text-gray-400 mt-6 max-w-2xl mx-auto font-slop">
            Supercharge your productivity and revolutionize how you work. 
            Seamlessly integrate our next-generation platform into your workflow.
          </p>
          <div className="flex gap-4 justify-center mt-10">
            <button className="px-8 py-4 bg-gradient-to-r from-slop-purple to-slop-indigo rounded-xl font-semibold hover:scale-105 transition-all shadow-lg shadow-slop-purple/25 font-slop">
              Get Started Free
            </button>
            <button className="px-8 py-4 border border-gray-700 rounded-xl font-semibold backdrop-blur-md bg-white/5 hover:bg-white/10 transition-all font-slop">
              Learn More
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-start pt-20 px-6 bg-editorial-background">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-12 gap-8 items-start">
          <div className="col-span-7">
            <h1 className="text-7xl font-bold text-editorial-text leading-tight font-serif mb-6">
              A todo app that respects your attention
            </h1>
            <p className="text-xl text-editorial-muted leading-relaxed mb-8 font-sans">
              Most task managers feel like work. This one helps you focus on what matters—without the notifications, 
              gamification, or "productivity hacks" that distract you from actually getting things done.
            </p>
            <div className="flex gap-4">
              <button className="px-6 py-3 border-2 border-editorial-text text-editorial-text font-semibold hover:bg-editorial-text hover:text-editorial-background transition-colors font-sans">
                Try it free
              </button>
              <button className="px-6 py-3 text-editorial-text underline decoration-2 underline-offset-4 hover:decoration-editorial-primary transition-colors font-sans">
                Read the manifesto
              </button>
            </div>
          </div>
          <div className="col-span-5">
            <div className="border-2 border-editorial-text p-8 bg-editorial-surface">
              <div className="space-y-4">
                <div className="h-4 bg-editorial-text w-3/4"></div>
                <div className="h-4 bg-editorial-border w-full"></div>
                <div className="h-4 bg-editorial-border w-5/6"></div>
                <div className="h-4 bg-editorial-border w-4/5"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


