export interface Annotation {
  id: string;
  x: number; // percentage
  y: number; // percentage
  text: string;
  side: 'bad' | 'good';
}

export interface Example {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  whyItMatters: string[];
  annotations: Annotation[];
  badCode: string;
  goodCode: string;
}

export const examples: Example[] = [
  {
    id: 'hero-section',
    title: 'Hero Section',
    category: 'Layout',
    description: 'The hero section is the first thing users see. Generic AI slop uses purple gradients and centered layouts. Good design uses intentional typography and specific copy.',
    tags: ['hero', 'typography', 'layout', 'copy'],
    whyItMatters: [
      'First impression sets the tone for entire experience',
      'Generic copy makes your product forgettable',
      'Centered layouts feel default, not intentional',
      'Purple gradients scream "AI-generated"'
    ],
    annotations: [
      { id: '1', x: 50, y: 15, side: 'bad', text: 'Purple gradient background - the #1 AI slop marker' },
      { id: '2', x: 50, y: 30, side: 'bad', text: 'Floating blurred blobs - decorative but meaningless' },
      { id: '3', x: 50, y: 45, side: 'bad', text: 'Generic headline - could apply to any SaaS product' },
      { id: '4', x: 50, y: 60, side: 'bad', text: 'Centered layout - default, not intentional' },
      { id: '5', x: 50, y: 75, side: 'bad', text: 'Inter font - overused, forgettable' },
      { id: '6', x: 50, y: 20, side: 'good', text: 'Specific headline - describes actual product value' },
      { id: '7', x: 50, y: 40, side: 'good', text: 'Left-aligned layout - editorial, intentional' },
      { id: '8', x: 50, y: 60, side: 'good', text: 'Serif headline font - distinctive, memorable' },
      { id: '9', x: 50, y: 80, side: 'good', text: 'Concrete copy - tells you exactly what it does' },
      { id: '10', x: 50, y: 50, side: 'good', text: 'Asymmetric grid - visual interest, not centered' }
    ],
    badCode: `<!-- Bad: Generic AI Slop -->
<section class="min-h-screen flex items-center justify-center text-center bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500">
  <div class="relative z-10">
    <h1 class="text-6xl font-bold text-white font-sans">
      Transform Your Workflow with AI-Powered Solutions
    </h1>
    <p class="text-xl text-gray-200 mt-6">
      Supercharge your productivity and revolutionize how you work.
    </p>
    <button class="mt-10 px-8 py-4 bg-white rounded-xl">
      Get Started Free
    </button>
  </div>
</section>`,
    goodCode: `<!-- Good: Intentional Design -->
<section class="min-h-screen flex items-start pt-20 px-6 bg-cream">
  <div class="max-w-6xl mx-auto grid grid-cols-12 gap-8">
    <div class="col-span-7">
      <h1 class="text-7xl font-bold text-black leading-tight font-serif">
        A todo app that respects your attention
      </h1>
      <p class="text-xl text-gray-700 mt-6 leading-relaxed font-sans">
        Most task managers feel like work. This one helps you focus 
        without notifications or gamification.
      </p>
      <button class="mt-8 px-6 py-3 border-2 border-black hover:bg-black hover:text-white">
        Try it free
      </button>
    </div>
  </div>
</section>`
  },
  {
    id: 'card-component',
    title: 'Card Component',
    category: 'Components',
    description: 'Cards are everywhere in modern UIs. Slop uses rounded corners, shadows, and glassmorphism. Good design uses borders, sharp corners, and clear hierarchy.',
    tags: ['cards', 'components', 'shadows', 'borders'],
    whyItMatters: [
      'Rounded-xl cards appear on every AI-generated site',
      'Shadows create depth but also visual noise',
      'Glassmorphism is dated and overused',
      'Borders create clear boundaries without effects'
    ],
    annotations: [
      { id: '1', x: 50, y: 20, side: 'bad', text: 'rounded-xl - overused default' },
      { id: '2', x: 50, y: 30, side: 'bad', text: 'shadow-lg - creates floating effect' },
      { id: '3', x: 50, y: 40, side: 'bad', text: 'backdrop-blur - glassmorphism cliché' },
      { id: '4', x: 50, y: 50, side: 'bad', text: 'Gradient icon background - decorative' },
      { id: '5', x: 50, y: 60, side: 'bad', text: 'hover:scale-105 - generic animation' },
      { id: '6', x: 50, y: 25, side: 'good', text: 'Sharp corners - distinctive, intentional' },
      { id: '7', x: 50, y: 35, side: 'good', text: 'Bold border - clear boundary, no shadow' },
      { id: '8', x: 50, y: 45, side: 'good', text: 'Solid background - no transparency effects' },
      { id: '9', x: 50, y: 55, side: 'good', text: 'Simple icon treatment - no gradients' },
      { id: '10', x: 50, y: 65, side: 'good', text: 'Color transition - subtle, not scale' }
    ],
    badCode: `<!-- Bad: AI Slop Card -->
<div class="p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-xl hover:scale-105 transition-all">
  <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl mb-4">
    <Icon />
  </div>
  <h3 class="text-xl font-semibold text-white">Feature</h3>
  <p class="text-gray-400 text-sm">Description text here.</p>
</div>`,
    goodCode: `<!-- Good: Intentional Card -->
<div class="p-6 border-2 border-black bg-white hover:bg-gray-50 transition-colors">
  <div class="w-12 h-12 border-2 border-black flex items-center justify-center mb-4">
    <Icon />
  </div>
  <h3 class="text-xl font-bold text-black font-serif">Feature</h3>
  <p class="text-gray-700 text-sm font-sans">Description text here.</p>
</div>`
  },
  {
    id: 'typography-system',
    title: 'Typography System',
    category: 'Typography',
    description: 'Typography is the foundation of design. Slop uses Inter everywhere. Good design pairs serif and sans-serif with clear hierarchy and intentional weights.',
    tags: ['typography', 'fonts', 'hierarchy', 'pairing'],
    whyItMatters: [
      'Inter appears on every AI-generated site',
      'Font pairing creates visual interest',
      'Hierarchy guides user attention',
      'Serif fonts add personality and memorability'
    ],
    annotations: [
      { id: '1', x: 50, y: 20, side: 'bad', text: 'Inter font - overused default' },
      { id: '2', x: 50, y: 35, side: 'bad', text: 'Same font everywhere - no contrast' },
      { id: '3', x: 50, y: 50, side: 'bad', text: 'Weak size hierarchy - similar sizes' },
      { id: '4', x: 50, y: 65, side: 'bad', text: 'Generic weight usage - not intentional' },
      { id: '5', x: 50, y: 25, side: 'good', text: 'Serif headline - distinctive, memorable' },
      { id: '6', x: 50, y: 40, side: 'good', text: 'Sans-serif body - readable, clean' },
      { id: '7', x: 50, y: 55, side: 'good', text: 'Strong size contrast - clear hierarchy' },
      { id: '8', x: 50, y: 70, side: 'good', text: 'Intentional weights - bold for emphasis' }
    ],
    badCode: `<!-- Bad: Generic Typography -->
<h1 class="text-5xl font-bold text-white font-sans">Heading</h1>
<p class="text-lg text-gray-300 font-sans">Body text here.</p>
<h2 class="text-3xl font-semibold text-white font-sans">Subheading</h2>
<p class="text-base text-gray-400 font-sans">More body text.</p>`,
    goodCode: `<!-- Good: Intentional Typography -->
<h1 class="text-6xl font-bold text-black font-serif leading-tight">Heading</h1>
<p class="text-lg text-gray-700 font-sans leading-relaxed">Body text here.</p>
<h2 class="text-3xl font-bold text-black font-serif">Subheading</h2>
<p class="text-base text-gray-600 font-sans">More body text.</p>`
  },
  {
    id: 'color-palette',
    title: 'Color Palette',
    category: 'Color',
    description: 'Color choices define your brand. Slop defaults to purple gradients. Good design uses intentional palettes that feel human-chosen and distinctive.',
    tags: ['color', 'palette', 'gradients', 'branding'],
    whyItMatters: [
      'Purple gradients are the #1 AI slop marker',
      'Color palette creates emotional connection',
      'Warm colors feel more human than cool',
      'Monochrome can be powerful when intentional'
    ],
    annotations: [
      { id: '1', x: 50, y: 20, side: 'bad', text: 'Purple gradient - cliché AI default' },
      { id: '2', x: 50, y: 35, side: 'bad', text: 'Pink accent - overused combo' },
      { id: '3', x: 50, y: 50, side: 'bad', text: 'Dark slate background - generic dark mode' },
      { id: '4', x: 50, y: 65, side: 'bad', text: 'Muted grays - no personality' },
      { id: '5', x: 50, y: 25, side: 'good', text: 'Warm gold - distinctive, human' },
      { id: '6', x: 50, y: 40, side: 'good', text: 'Cream background - inviting, editorial' },
      { id: '7', x: 50, y: 55, side: 'good', text: 'Rich brown - earthy, artisanal' },
      { id: '8', x: 50, y: 70, side: 'good', text: 'High contrast - clear hierarchy' }
    ],
    badCode: `<!-- Bad: AI Slop Colors -->
<div class="bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500">
  <div class="bg-slate-950 text-gray-300">
    <button class="bg-purple-600 text-white">Button</button>
  </div>
</div>`,
    goodCode: `<!-- Good: Intentional Palette -->
<div class="bg-cream">
  <div class="bg-white border-2 border-black">
    <button class="bg-gold text-black border-2 border-black">Button</button>
  </div>
</div>`
  },
  {
    id: 'cta-buttons',
    title: 'CTA Buttons',
    category: 'Components',
    description: 'Call-to-action buttons drive conversions. Slop uses gradients and scale animations. Good design uses clear affordances and subtle interactions.',
    tags: ['buttons', 'cta', 'interactions', 'affordance'],
    whyItMatters: [
      'Gradient buttons feel generic and overused',
      'Scale animations are jarring and distracting',
      'Clear borders communicate clickability',
      'Underline links are elegant and functional'
    ],
    annotations: [
      { id: '1', x: 50, y: 30, side: 'bad', text: 'Gradient fill - generic, overused' },
      { id: '2', x: 50, y: 45, side: 'bad', text: 'rounded-full - default pill shape' },
      { id: '3', x: 50, y: 60, side: 'bad', text: 'hover:scale-105 - jarring animation' },
      { id: '4', x: 50, y: 75, side: 'bad', text: 'Glow shadow - decorative effect' },
      { id: '5', x: 50, y: 35, side: 'good', text: 'Border button - clear affordance' },
      { id: '6', x: 50, y: 50, side: 'good', text: 'Sharp corners - distinctive' },
      { id: '7', x: 50, y: 65, side: 'good', text: 'Fill on hover - subtle, elegant' },
      { id: '8', x: 50, y: 80, side: 'good', text: 'No effects - clean, functional' }
    ],
    badCode: `<!-- Bad: AI Slop Button -->
<button class="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full font-semibold text-white hover:scale-105 transition-all shadow-lg shadow-purple-500/25">
  Get Started Free
</button>`,
    goodCode: `<!-- Good: Intentional Button -->
<button class="px-6 py-3 border-2 border-black text-black font-semibold hover:bg-black hover:text-white transition-colors">
  Try it free
</button>`
  }
];

export const categories = ['All', 'Layout', 'Components', 'Typography', 'Color'];

