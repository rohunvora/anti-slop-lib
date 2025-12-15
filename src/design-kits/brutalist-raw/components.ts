/**
 * BRUTALIST RAW - Component Styles
 * 
 * Button: Chunky border, offset shadow
 * Card: Hard border, offset shadow
 */

import type { ComponentVariants } from '../types.js';

export const brutalistRawComponents = {
  button: {
    base: 'font-mono font-bold uppercase transition-transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring',
    variants: {
      primary: 'bg-primary text-primary-foreground border-3 border-foreground shadow-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-none',
      secondary: 'bg-secondary text-secondary-foreground border-3 border-foreground shadow-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-none',
      ghost: 'bg-transparent text-foreground border-3 border-foreground shadow-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-none',
    },
    sizes: {
      sm: 'text-sm px-4 py-2',
      md: 'text-base px-6 py-3',
      lg: 'text-lg px-8 py-4',
    },
  },
  card: {
    base: 'bg-background border-3 border-foreground p-6 shadow-brutal',
    variants: {
      default: '',
      elevated: 'shadow-brutal-lg',
    },
  },
  input: {
    base: 'w-full bg-background border-3 border-foreground px-4 py-2 font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-0',
    variants: {
      default: 'focus:shadow-brutal',
    },
  },
} as const satisfies {
  button: ComponentVariants;
  card: ComponentVariants;
  input: ComponentVariants;
};

