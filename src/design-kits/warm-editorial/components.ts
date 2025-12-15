/**
 * WARM EDITORIAL - Component Styles
 * 
 * Button: Underline animation (editorial style)
 * Card: Accent border left
 * Input: Minimal with border focus
 */

import type { ComponentVariants } from '../types.js';

export const warmEditorialComponents = {
  button: {
    base: 'font-body font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring',
    variants: {
      primary: 'text-primary border-b-2 border-primary hover:border-b-4 pb-1',
      secondary: 'text-secondary border-b-2 border-secondary hover:border-b-4 pb-1',
      ghost: 'text-foreground border-b-2 border-transparent hover:border-foreground pb-1',
    },
    sizes: {
      sm: 'text-sm px-3 py-1.5',
      md: 'text-base px-4 py-2',
      lg: 'text-lg px-6 py-3',
    },
  },
  card: {
    base: 'bg-surface border border-border p-6',
    variants: {
      default: 'border-l-4 border-l-accent pl-5',
      elevated: 'border-l-4 border-l-primary shadow-sm',
    },
  },
  input: {
    base: 'w-full bg-background border border-border px-4 py-2 font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-0 transition-colors',
    variants: {
      default: 'focus:border-primary',
    },
  },
} as const satisfies {
  button: ComponentVariants;
  card: ComponentVariants;
  input: ComponentVariants;
};

