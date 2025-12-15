/**
 * VIBRANT PLAY - Component Styles
 * 
 * Button: Pill with arrow, animated
 * Card: Rounded with color
 */

import type { ComponentVariants } from '../types.js';

export const vibrantPlayComponents = {
  button: {
    base: 'font-body font-medium rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring inline-flex items-center gap-2 group',
    variants: {
      primary: 'bg-primary text-primary-foreground hover:scale-105',
      secondary: 'bg-secondary text-secondary-foreground hover:scale-105',
      ghost: 'bg-transparent text-foreground border-2 border-foreground hover:bg-foreground hover:text-background',
    },
    sizes: {
      sm: 'text-sm px-4 py-2',
      md: 'text-base px-6 py-3',
      lg: 'text-lg px-8 py-4',
    },
  },
  card: {
    base: 'bg-background border border-border rounded-lg p-6 transition-transform hover:scale-105',
    variants: {
      default: '',
      elevated: 'shadow-lg',
    },
  },
  input: {
    base: 'w-full bg-background border-2 border-border rounded-lg px-4 py-2 font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-0 transition-colors',
    variants: {
      default: 'focus:border-primary',
    },
  },
} as const satisfies {
  button: ComponentVariants;
  card: ComponentVariants;
  input: ComponentVariants;
};

