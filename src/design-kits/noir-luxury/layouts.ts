/**
 * NOIR LUXURY - Layout Patterns
 */

export const noirLuxuryLayouts = {
  heroAsymmetric: `
<section class="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-8 md:gap-12 items-center py-12 md:py-20">
  <div class="space-y-6">
    <h1 class="font-display text-hero text-foreground">
      Headline
    </h1>
    <p class="font-body text-body text-muted-foreground max-w-lg">
      Dark, exclusive, whispered elegance. Gold accents on near-black.
    </p>
    <button class="font-body border border-primary/50 text-primary px-6 py-3 hover:bg-primary/10 transition-colors">
      Primary Action
    </button>
  </div>
  <div class="relative">
    <div class="aspect-[4/3] bg-muted border border-border"></div>
  </div>
</section>
`.trim(),

  heroEditorial: `
<section class="py-12 md:py-20">
  <h1 class="font-display text-hero text-foreground mb-8 max-w-4xl">
    Headline
  </h1>
  <div class="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8 md:gap-12">
    <div class="space-y-4">
      <p class="font-body text-body text-foreground leading-relaxed">
        Main text. Dark, exclusive, whispered elegance.
      </p>
    </div>
    <nav class="flex flex-col gap-4 pt-4 border-t border-border">
      <a href="#" class="font-body text-foreground hover:text-primary transition-colors">Link 1</a>
      <a href="#" class="font-body text-foreground hover:text-primary transition-colors">Link 2</a>
    </nav>
  </div>
</section>
`.trim(),

  grid: `
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div class="bg-muted border border-border p-6">
    <h3 class="font-display text-h3 text-foreground mb-2">Card Title</h3>
    <p class="font-body text-body text-muted-foreground">Card content</p>
  </div>
  <!-- Repeat -->
</div>
`.trim(),
};

