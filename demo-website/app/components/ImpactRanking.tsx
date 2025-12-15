'use client';

import { impactRankings } from '../data/prompts';

export function ImpactRanking() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-2 text-center" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>What to Fix First</h2>
      <p className="text-gray-400 text-center mb-8 max-w-2xl mx-auto">
        Not all slop patterns are created equal. Fix these in order of impact.
      </p>

      <div className="max-w-3xl mx-auto space-y-4">
        {impactRankings.map((item, index) => (
          <div key={item.rank} className="relative">
            {/* Label */}
            {index === 0 && (
              <div className="absolute -top-5 left-0 text-xs text-gray-500 uppercase tracking-wider">
                Highest Impact
              </div>
            )}
            
            {/* Row container */}
            <div className="flex items-center gap-4">
              {/* Rank number */}
              <span className={`text-2xl font-bold tabular-nums w-8 ${
                item.critical ? 'text-red-400' : 'text-yellow-400'
              }`}>
                {item.rank}
              </span>
              
              {/* Bar + Text container */}
              <div className="flex-1 relative">
                {/* Background bar (visual only) */}
                <div className="absolute inset-0 bg-[#1a1a1a] border border-[#2a2a2a] rounded" />
                <div
                  className={`absolute inset-y-0 left-0 rounded-l transition-all duration-500 ${
                    item.critical ? 'bg-red-500/20' : 'bg-yellow-500/20'
                  }`}
                  style={{ width: `${item.impact}%` }}
                />
                
                {/* Text content (always full width) */}
                <div className="relative flex items-center justify-between px-4 py-3">
                  <div>
                    <div className="text-sm font-semibold text-white">
                      {item.issue}
                    </div>
                    <div className="text-xs text-gray-400">
                      → {item.fix}
                    </div>
                  </div>
                  <span className={`text-sm font-bold ml-4 ${
                    item.critical ? 'text-red-400' : 'text-yellow-400'
                  }`}>
                    {item.impact}%
                  </span>
                </div>
              </div>
            </div>

            {/* Label */}
            {index === impactRankings.length - 1 && (
              <div className="absolute -bottom-5 left-0 text-xs text-gray-500 uppercase tracking-wider">
                Lower Impact
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

