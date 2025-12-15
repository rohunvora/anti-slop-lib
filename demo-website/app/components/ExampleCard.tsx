'use client';

import { Example } from '../data/examples';
import Image from 'next/image';

interface ExampleCardProps {
  example: Example;
  onClick: () => void;
}

export function ExampleCard({ example, onClick }: ExampleCardProps) {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg overflow-hidden hover:border-[#3a3a3a] transition-colors"
    >
      {/* Preview Area */}
      <div className="aspect-video bg-[#0a0a0a] relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-gray-500 text-sm font-medium">{example.title}</div>
        </div>
        {/* Badge */}
        <div className="absolute top-3 left-3 px-2 py-1 bg-red-500/20 border border-red-500/30 rounded text-xs text-red-400 font-medium">
          vs
        </div>
      </div>
      
      {/* Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-white font-semibold text-sm">{example.title}</h3>
          <span className="text-xs text-gray-500 uppercase">{example.category}</span>
        </div>
        <p className="text-gray-400 text-xs line-clamp-2 mb-3">{example.description}</p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {example.tags.slice(0, 3).map(tag => (
            <span
              key={tag}
              className="px-2 py-0.5 bg-[#2a2a2a] text-gray-400 text-xs rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}


