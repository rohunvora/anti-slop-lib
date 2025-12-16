'use client';

import { ensureMinContrast } from '../lib/color';

interface TagProps {
  children: React.ReactNode;
  color?: string;
  variant?: 'primary' | 'secondary' | 'neutral';
  className?: string;
  href?: string;
  onClick?: () => void;
}

export function Tag({
  children,
  color,
  variant = 'neutral',
  className = '',
  href,
  onClick,
}: TagProps) {
  // Default colors based on variant if no color provided
  const defaultColors = {
    primary: '#c42a0e', // vermilion
    secondary: '#0a6e66', // teal
    neutral: 'var(--ink)', // ink
  };

  const borderColor = color || defaultColors[variant];
  // For tags, we use border color and transparent background
  // Text color should contrast with paper-bright background
  const textColor = color
    ? ensureMinContrast('#fdfcfa', borderColor, 4.5) // paper-bright background
    : 'var(--ink)';

  // Base classes match existing .tag styles
  const baseClasses = `tag ${className}`;

  const style = color
    ? {
        borderColor: borderColor,
        color: textColor,
      }
    : {};

  const content = (
    <span className={baseClasses} style={style}>
      {children}
    </span>
  );

  if (href) {
    return (
      <a href={href} className="hover:opacity-80 transition-opacity">
        {content}
      </a>
    );
  }

  if (onClick) {
    return (
      <button onClick={onClick} type="button" className="cursor-pointer">
        {content}
      </button>
    );
  }

  return content;
}

