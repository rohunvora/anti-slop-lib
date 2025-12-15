/**
 * SWISS PRECISION - Layout Patterns
 * 
 * Grid-based, severe typography
 */

export const swissPrecisionLayouts = {
  heroAsymmetric: `
<section class="grid grid-cols-12 gap-4 py-12 md:py-20">
  <div class="col-span-12 md:col-span-6 space-y-6">
    <h1 class="font-sans text-hero text-foreground">
      Headline
    </h1>
    <p class="font-sans text-body text-muted-foreground max-w-lg">
      Description text. Sharp, confident, no decoration.
    </p>
    <button class="font-sans bg-primary text-primary-foreground px-6 py-3 hover:opacity-90 transition-colors">
      Primary Action
    </button>
  </div>
  <div class="col-span-12 md:col-span-6">
    <div class="aspect-[4/3] bg-muted border border-border"></div>
  </div>
</section>
`.trim(),

  heroEditorial: `
<section class="py-12 md:py-20">
  <h1 class="font-sans text-hero text-foreground mb-8 max-w-4xl">
    Headline
  </h1>
  <div class="grid grid-cols-12 gap-4">
    <div class="col-span-12 md:col-span-8">
      <p class="font-sans text-body text-foreground">
        Main text. Grid-based, severe typography.
      </p>
    </div>
    <div class="col-span-12 md:col-span-4 border-t border-border pt-4">
      <nav class="flex flex-col gap-2">
        <a href="#" class="font-sans text-foreground hover:opacity-70">Link 1</a>
        <a href="#" class="font-sans text-foreground hover:opacity-70">Link 2</a>
      </nav>
    </div>
  </div>
</section>
`.trim(),

  grid: `
<div class="grid grid-cols-12 gap-4">
  <div class="col-span-12 md:col-span-4 bg-background border border-border p-6">
    <h3 class="font-sans text-h3 text-foreground mb-2">Card Title</h3>
    <p class="font-sans text-body text-muted-foreground">Card content</p>
  </div>
  <!-- Repeat -->
</div>
`.trim(),
};

