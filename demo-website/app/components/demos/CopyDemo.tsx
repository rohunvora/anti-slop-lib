'use client';

import { useSlop } from '../SlopContext';

export function CopyDemo() {
  const { isSlop } = useSlop();

  if (isSlop) {
    return (
      <div className="space-y-8">
        <div className="p-8 rounded-2xl bg-gradient-to-br from-slop-purple/20 to-slop-indigo/20 border border-slop-purple/30">
          <h2 className="text-4xl font-bold mb-4 text-white font-slop">
            Transform Your Workflow with AI-Powered Solutions
          </h2>
          <p className="text-lg text-gray-300 font-slop">
            Supercharge your productivity and revolutionize how you work. 
            Seamlessly integrate our next-generation platform.
          </p>
        </div>
        <div className="space-y-4">
          <div className="p-4 bg-slate-900 rounded-lg">
            <p className="text-xs text-gray-500 font-slop mb-2">Generic headlines found:</p>
            <ul className="text-sm text-gray-400 space-y-1 font-slop">
              <li>• "Transform your X"</li>
              <li>• "AI-Powered"</li>
              <li>• "Supercharge"</li>
              <li>• "Revolutionize"</li>
              <li>• "Next-generation"</li>
              <li>• "Seamlessly"</li>
            </ul>
          </div>
          <p className="text-sm text-gray-500 font-slop italic">
            This copy could apply to literally any SaaS product. It says nothing specific.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="p-8 border-2 border-editorial-text bg-editorial-background">
        <h2 className="text-4xl font-bold mb-4 text-editorial-text font-serif leading-tight">
          A todo app that respects your attention
        </h2>
        <p className="text-lg text-editorial-muted font-sans leading-relaxed">
          Most task managers feel like work. This one helps you focus on what matters—without 
          the notifications, gamification, or "productivity hacks" that distract you.
        </p>
      </div>
      <div className="space-y-4">
        <div className="p-4 border-2 border-editorial-border bg-editorial-background">
          <p className="text-xs text-editorial-muted font-sans uppercase tracking-wider mb-2">Why this works:</p>
          <ul className="text-sm text-editorial-text space-y-1 font-sans">
            <li>• Specific to this exact product</li>
            <li>• Describes the problem, not just the solution</li>
            <li>• Uses concrete language</li>
            <li>• Has personality and voice</li>
            <li>• Couldn't apply to any other product</li>
          </ul>
        </div>
        <p className="text-sm text-editorial-muted font-sans italic">
          This copy is specific, honest, and memorable. It tells you exactly what this product is.
        </p>
      </div>
    </div>
  );
}

