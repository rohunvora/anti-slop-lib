'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Website } from '../data/websites';

interface WebsiteCardProps {
  website: Website;
}

export function WebsiteCard({ website }: WebsiteCardProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setIsHovering(true);
    if (videoRef.current && website.video) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <Link href={`/site/${website.slug}`}>
      <article 
        className="group relative bg-neutral-50 rounded-xl overflow-hidden border border-neutral-200 hover:border-neutral-300 transition-all hover:shadow-lg"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Thumbnail / Video */}
        <div className="relative aspect-[16/10] bg-neutral-100 overflow-hidden">
          {website.thumbnail && (
            <Image
              src={website.thumbnail}
              alt={website.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className={`object-cover transition-opacity duration-300 ${
                isHovering && website.video ? 'opacity-0' : 'opacity-100'
              } ${imageLoaded ? '' : 'blur-sm'}`}
              onLoad={() => setImageLoaded(true)}
              priority={false}
            />
          )}
          {website.video && isHovering && (
            <video
              ref={videoRef}
              src={website.video}
              muted
              loop
              playsInline
              preload="none"
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          {!website.thumbnail && !website.video && (
            <div className="absolute inset-0 flex items-center justify-center text-neutral-400">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
          
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
          
          {/* Visit button on hover */}
          <a
            href={website.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-black/70 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/90"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Visit
          </a>
        </div>
        
        {/* Info */}
        <div className="p-4">
          <h3 className="font-medium text-neutral-900 truncate">{website.name}</h3>
          
          {/* Tags */}
          <div className="mt-2 flex flex-wrap gap-1.5">
            {website.types.slice(0, 2).map((type) => (
              <span 
                key={type} 
                className="px-2 py-0.5 text-xs font-medium text-neutral-600 bg-neutral-100 rounded-full"
              >
                {type}
              </span>
            ))}
            {website.styles.slice(0, 2).map((style) => (
              <span 
                key={style} 
                className="px-2 py-0.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-full"
              >
                {style}
              </span>
            ))}
            {(website.types.length + website.styles.length) > 4 && (
              <span className="px-2 py-0.5 text-xs text-neutral-400">
                +{website.types.length + website.styles.length - 4}
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}

