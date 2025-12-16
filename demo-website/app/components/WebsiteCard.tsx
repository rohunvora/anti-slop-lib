'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Website } from '../data/websites';
import { getSiteTokens, hasInteractiveStyles } from '../lib/siteTokens';
import { Tag } from './Tag';

interface WebsiteCardProps {
  website: Website;
  featured?: boolean;
}

export function WebsiteCard({ website, featured = false }: WebsiteCardProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const tokens = getSiteTokens(website);
  const isInteractive = hasInteractiveStyles(website);
  
  // Map fontCategory to Tailwind classes
  const fontClass =
    tokens.fontCategory === 'serif'
      ? 'font-display'
      : tokens.fontCategory === 'monospace'
        ? 'font-mono'
        : 'font-body';
  
  // Radius class
  const radiusClass = tokens.radiusStyle === 'rounded' ? 'rounded-lg' : '';

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
    <Link 
      href={`/site/${website.slug}`}
      className={featured ? 'lg:col-span-1' : ''}
    >
      <article 
        className={`group overflow-hidden h-full flex flex-col border-3 bg-paper-bright transition-all duration-150 ${
          isInteractive
            ? 'hover:scale-[1.02] hover:-translate-y-1 motion-reduce:hover:scale-100 motion-reduce:hover:translate-y-0'
            : 'hover:bg-paper'
        } ${radiusClass}`}
        style={{
          borderColor: tokens.primaryColor,
          borderLeftWidth: '6px',
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Thumbnail / Video */}
        <div
          className="relative aspect-[16/10] bg-ink-20 overflow-hidden border-b-2"
          style={{ borderColor: tokens.primaryColor }}
        >
          {website.thumbnail && (
            <Image
              src={website.thumbnail}
              alt={`Screenshot of ${website.name}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className={`object-cover transition-all duration-300 ${
                isHovering && website.video ? 'opacity-0' : 'opacity-100'
              } ${imageLoaded ? '' : 'blur-sm scale-105'} ${
                isHovering ? 'scale-105' : 'scale-100'
              }`}
              onLoad={() => setImageLoaded(true)}
              priority={featured}
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
              aria-hidden="true"
            />
          )}
          {!website.thumbnail && !website.video && (
            <div className="absolute inset-0 flex items-center justify-center text-ink-40 bg-paper">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="square" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
          
          {/* Visit button on hover */}
          <a
            href={website.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="absolute top-3 right-3 flex items-center gap-2 px-3 py-2 text-xs font-semibold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all duration-150"
            style={{
              backgroundColor: tokens.primaryColor,
              color: '#ffffff',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = tokens.secondaryColor;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = tokens.primaryColor;
            }}
            aria-label={`Visit ${website.name} website`}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="square" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Visit
          </a>
          
          {/* Featured badge */}
          {featured && (
            <div
              className="absolute top-3 left-3 px-2 py-1 text-xs font-bold uppercase tracking-wider text-paper"
              style={{
                backgroundColor: tokens.primaryColor,
              }}
            >
              Featured
            </div>
          )}
        </div>
        
        {/* Info */}
        <div className="p-4 flex-1 flex flex-col">
          <h3
            className={`${fontClass} font-semibold truncate transition-colors`}
            style={{ color: tokens.primaryColor }}
          >
            {website.name}
          </h3>

          {/* URL */}
          <p className="text-xs text-ink-40 font-mono truncate mt-1">
            {website.url.replace('https://', '').replace('www.', '')}
          </p>

          {/* Tags */}
          <div className="mt-auto pt-4 flex flex-wrap gap-1.5">
            {website.types.slice(0, 1).map((type) => (
              <Tag key={type} color={tokens.primaryColor} className="text-[10px]">
                {type}
              </Tag>
            ))}
            {website.styles.slice(0, 2).map((style) => (
              <Tag key={style} color={tokens.secondaryColor} className="text-[10px]">
                {style}
              </Tag>
            ))}
            {(website.types.length + website.styles.length) > 3 && (
              <span className="text-[10px] text-ink-40 uppercase font-semibold tracking-wider px-1">
                +{website.types.length + website.styles.length - 3}
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
