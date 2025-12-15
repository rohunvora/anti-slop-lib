/**
 * NOIR LUXURY - Component Styles
 * 
 * Button: Minimal, gold accent
 * Card: Dark with gold border
 */

import type { ComponentVariants } from '../types.js';

export const noirLuxuryComponents = {
  button: {
    base: 'font-body font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring',
    variants: {
      primary: 'border border-primary/50 text-primary hover:bg-primary/10',
      secondary: 'border border-secondary/50 text-secondary hover:bg-secondary/10',
      ghost: 'border border-border text-foreground hover:border-primary/50',
    },
    sizes: {
      sm: 'text-sm px-4 py-2',
      md: 'text-base px-6 py-3',
      lg: 'text-lg px-8 py-4',
    },
  },
  card: {
    base: 'bg-muted border border-border p-6',
    variants: {
      default: '',
      elevated: 'border-primary/50',
    },
  },
  input: {
    base: 'w-full bg-muted border border-border px-4 py-2 font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-0 transition-colors',
    variants: {
      default: 'focus:border-primary/50',
    },
  },
} as const satisfies {
  button: ComponentVariants;
  card: ComponentVariants;
  input: ComponentVariants;
};

