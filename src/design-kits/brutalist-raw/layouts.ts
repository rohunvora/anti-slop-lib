/**
 * BRUTALIST RAW - Layout Patterns
 */

export const brutalistRawLayouts = {
  heroAsymmetric: `
<section class="grid grid-cols-1 md:grid-cols-2 gap-8 py-12 md:py-20">
  <div class="space-y-6">
    <h1 class="font-mono text-hero text-foreground uppercase">
      HEADLINE
    </h1>
    <p class="font-sans text-body text-foreground">
      Description text. Raw, honest, zero pretense.
    </p>
    <button class="font-mono bg-primary text-primary-foreground border-3 border-foreground shadow-brutal px-6 py-3 uppercase hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-transform">
      PRIMARY ACTION
    </button>
  </div>
  <div class="border-3 border-foreground bg-muted p-8 shadow-brutal">
    <!-- Content -->
  </div>
</section>
`.trim(),

  heroEditorial: `
<section class="py-12 md:py-20">
  <h1 class="font-mono text-hero text-foreground uppercase mb-8">
    HEADLINE
  </h1>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
    <div class="border-3 border-foreground p-6 shadow-brutal">
      <p class="font-sans text-body text-foreground">
        Main text. Brutalist raw energy.
      </p>
    </div>
    <div class="border-3 border-foreground p-6 shadow-brutal">
      <nav class="flex flex-col gap-2">
        <a href="#" class="font-mono text-foreground uppercase">LINK 1</a>
        <a href="#" class="font-mono text-foreground uppercase">LINK 2</a>
      </nav>
    </div>
  </div>
</section>
`.trim(),

  grid: `
<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
  <div class="bg-background border-3 border-foreground p-6 shadow-brutal">
    <h3 class="font-mono text-h3 text-foreground uppercase mb-2">CARD TITLE</h3>
    <p class="font-sans text-body text-foreground">Card content</p>
  </div>
  <!-- Repeat -->
</div>
`.trim(),
};

