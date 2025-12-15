/**
 * WARM EDITORIAL - Layout Patterns
 * 
 * NOT centered heroes. Editorial stack + asymmetric split.
 */

export const warmEditorialLayouts = {
  heroAsymmetric: `
<section class="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-8 md:gap-12 items-center py-12 md:py-20">
  <div class="space-y-6">
    <h1 class="font-display text-hero text-foreground">
      Headline here
    </h1>
    <p class="font-body text-body text-muted-foreground max-w-lg">
      Description text that sets the tone. Not centered, not generic.
    </p>
    <div class="flex gap-4">
      <button class="font-body text-primary border-b-2 border-primary hover:border-b-4 pb-1 transition-all">
        Primary Action
      </button>
      <button class="font-body text-foreground border-b-2 border-transparent hover:border-foreground pb-1 transition-all">
        Secondary
      </button>
    </div>
  </div>
  <div class="relative">
    <!-- Image or illustration -->
    <div class="aspect-[4/3] bg-muted border border-border"></div>
  </div>
</section>
`.trim(),

  heroEditorial: `
<section class="py-12 md:py-20">
  <h1 class="font-display text-hero text-foreground mb-8 max-w-4xl">
    Big bold headline that spans the width
  </h1>
  <div class="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8 md:gap-12">
    <div class="space-y-4">
      <p class="font-body text-body text-foreground leading-relaxed">
        Main descriptive text here. This is the editorial approach—large headline, 
        then content flows naturally below. Not everything centered.
      </p>
      <p class="font-body text-body text-muted-foreground">
        Secondary paragraph with muted color for hierarchy.
      </p>
    </div>
    <nav class="flex flex-col gap-4 pt-4 border-t border-border">
      <a href="#" class="font-body text-foreground border-b-2 border-transparent hover:border-foreground pb-1 w-fit transition-all">
        Link 1
      </a>
      <a href="#" class="font-body text-foreground border-b-2 border-transparent hover:border-foreground pb-1 w-fit transition-all">
        Link 2
      </a>
    </nav>
  </div>
</section>
`.trim(),

  grid: `
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <!-- Cards with accent border -->
  <div class="bg-surface border border-border border-l-4 border-l-accent p-6">
    <h3 class="font-display text-h3 text-foreground mb-2">Card Title</h3>
    <p class="font-body text-body text-muted-foreground">Card content</p>
  </div>
  <!-- Repeat -->
</div>
`.trim(),
};

