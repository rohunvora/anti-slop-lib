/**
 * FOREST ORGANIC - Component Styles
 * 
 * Button: Soft, rounded-sm, earthy
 * Card: Soft border, natural feel
 */

import type { ComponentVariants } from '../types.js';

export const forestOrganicComponents = {
  button: {
    base: 'font-body font-medium rounded-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring',
    variants: {
      primary: 'bg-primary text-primary-foreground hover:opacity-90',
      secondary: 'bg-secondary text-secondary-foreground hover:opacity-90',
      ghost: 'bg-transparent text-foreground hover:bg-muted',
    },
    sizes: {
      sm: 'text-sm px-4 py-2',
      md: 'text-base px-5 py-2.5',
      lg: 'text-lg px-6 py-3',
    },
  },
  card: {
    base: 'bg-surface border border-border rounded-sm p-6',
    variants: {
      default: '',
      elevated: 'shadow-sm',
    },
  },
  input: {
    base: 'w-full bg-background border border-border rounded-sm px-4 py-2 font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-0 transition-colors',
    variants: {
      default: 'focus:border-primary',
    },
  },
} as const satisfies {
  button: ComponentVariants;
  card: ComponentVariants;
  input: ComponentVariants;
};

