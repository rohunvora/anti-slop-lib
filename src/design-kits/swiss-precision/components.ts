/**
 * SWISS PRECISION - Component Styles
 * 
 * Button: Solid, sharp, confident (no radius)
 * Card: Border only, no shadow
 * Input: 1px border, sharp corners
 */

import type { ComponentVariants } from '../types.js';

export const swissPrecisionComponents = {
  button: {
    base: 'font-sans font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring',
    variants: {
      primary: 'bg-primary text-primary-foreground hover:opacity-90',
      secondary: 'bg-secondary text-secondary-foreground hover:opacity-90',
      ghost: 'bg-transparent text-foreground hover:bg-muted',
    },
    sizes: {
      sm: 'text-sm px-4 py-2',
      md: 'text-base px-6 py-3',
      lg: 'text-lg px-8 py-4',
    },
  },
  card: {
    base: 'bg-background border border-border p-6',
    variants: {
      default: '',
      elevated: 'border-2',
    },
  },
  input: {
    base: 'w-full bg-background border border-border px-4 py-2 font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-0 transition-colors',
    variants: {
      default: 'focus:border-foreground',
    },
  },
} as const satisfies {
  button: ComponentVariants;
  card: ComponentVariants;
  input: ComponentVariants;
};

