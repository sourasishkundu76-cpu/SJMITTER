import { HotlinkImage, SampleTemplate } from '../types';

export const CURATED_HOTLINKS: HotlinkImage[] = [
  {
    id: 'img-1',
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    title: 'Alpine Horizon & Lake Mirror',
    author: 'Bailey Zindel',
    category: 'nature',
    aspectRatio: 'landscape',
    likes: 1420,
    tags: ['Mountains', 'Water', 'Peaceful', 'Wilderness'],
  },
  {
    id: 'img-2',
    url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    title: 'Architectural Minimal Interior',
    author: 'Jean-Philippe Delberghe',
    category: 'minimal',
    aspectRatio: 'square',
    likes: 890,
    tags: ['Architecture', 'Warm Light', 'Minimalism', 'Interior'],
  },
  {
    id: 'img-3',
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    title: 'Glass Facade Geometric Tower',
    author: 'Simone Hutsch',
    category: 'architecture',
    aspectRatio: 'portrait',
    likes: 2150,
    tags: ['Urban', 'Futuristic', 'Geometric', 'Skyscraper'],
  },
  {
    id: 'img-4',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80',
    title: 'Vibrant Studio Portraiture',
    author: 'Aiony Haust',
    category: 'portrait',
    aspectRatio: 'portrait',
    likes: 3105,
    tags: ['Editorial', 'Portrait', 'Color', 'Aesthetic'],
  },
  {
    id: 'img-5',
    url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    title: 'Silicon Circuitry & Quantum Wave',
    author: 'Alexandre Debiève',
    category: 'tech',
    aspectRatio: 'landscape',
    likes: 1740,
    tags: ['Hardware', 'Cyber', 'Electronics', 'Future'],
  },
  {
    id: 'img-6',
    url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80',
    title: 'Misty Woodland Canopy',
    author: 'Luca Bravo',
    category: 'nature',
    aspectRatio: 'landscape',
    likes: 2890,
    tags: ['Fog', 'Forest', 'Sunrise', 'Evergreen'],
  },
  {
    id: 'img-7',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    title: 'Natural Light Portrait',
    author: 'Joseph Gonzalez',
    category: 'portrait',
    aspectRatio: 'portrait',
    likes: 1200,
    tags: ['Lifestyle', 'Expression', 'Portrait'],
  },
  {
    id: 'img-8',
    url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    title: 'Monochrome Workspace Atrium',
    author: 'Nastuh Abootalebi',
    category: 'minimal',
    aspectRatio: 'landscape',
    likes: 1650,
    tags: ['Studio', 'Workspace', 'Simplicity'],
  },
  {
    id: 'img-9',
    url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    title: 'Matrix Matrix Code Cascade',
    author: 'Markus Spiske',
    category: 'tech',
    aspectRatio: 'landscape',
    likes: 3410,
    tags: ['Code', 'Development', 'Cyberpunk'],
  }
];

export const SAMPLE_TEMPLATES: SampleTemplate[] = [
  {
    id: 'tpl-luxury-commerce',
    name: 'Modern E-Commerce Storefront',
    category: 'Commerce',
    description: 'Hero carousel, product card grids, hotlinked lifestyle photography, and price badges.',
    htmlContent: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-stone-900 text-stone-100 font-sans p-6 min-h-screen">
  <!-- Top Bar -->
  <header class="flex justify-between items-center mb-8 pb-4 border-b border-stone-800">
    <div class="flex items-center space-x-2">
      <span class="text-xl font-bold tracking-tight text-amber-400">AURA</span>
      <span class="text-xs uppercase tracking-widest text-stone-400 font-medium">STUDIO</span>
    </div>
    <div class="flex items-center space-x-3 text-xs">
      <span class="bg-amber-400/10 text-amber-400 px-2.5 py-1 rounded-full border border-amber-400/20 font-medium">Autumn '26</span>
    </div>
  </header>

  <!-- Hero Highlight -->
  <div class="relative rounded-2xl overflow-hidden mb-8 shadow-2xl border border-stone-800 group">
    <img src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80" 
         alt="Minimal Living Design" 
         class="w-full h-56 object-cover object-center group-hover:scale-105 transition-transform duration-700" />
    <div class="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent flex flex-col justify-end p-6">
      <span class="text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">Featured Collection</span>
      <h2 class="text-2xl font-bold text-white mb-2">Architectural Ceramics & Objects</h2>
      <p class="text-stone-300 text-xs line-clamp-2 max-w-md">Sculptural vessels crafted from Scandinavian clay, fired with natural ash glazes for mindful living spaces.</p>
    </div>
  </div>

  <!-- Product Grid -->
  <h3 class="text-sm font-semibold uppercase tracking-wider text-stone-400 mb-4">Curated Essentials</h3>
  <div class="grid grid-cols-2 gap-4">
    <div class="bg-stone-800/60 rounded-xl p-3 border border-stone-700/50 hover:border-amber-400/40 transition-all">
      <div class="h-32 rounded-lg overflow-hidden mb-3">
        <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80" 
             alt="Minimalist Desk" 
             class="w-full h-full object-cover" />
      </div>
      <h4 class="font-medium text-sm text-stone-100">Oak Arc Console</h4>
      <p class="text-xs text-stone-400 mb-2">Solid white oak</p>
      <div class="flex justify-between items-center">
        <span class="text-sm font-bold text-amber-400">$640</span>
        <button class="bg-stone-700 hover:bg-amber-500 hover:text-stone-950 text-xs px-2.5 py-1 rounded-md transition-colors">Add</button>
      </div>
    </div>

    <div class="bg-stone-800/60 rounded-xl p-3 border border-stone-700/50 hover:border-amber-400/40 transition-all">
      <div class="h-32 rounded-lg overflow-hidden mb-3">
        <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80" 
             alt="Atmosphere Lamp" 
             class="w-full h-full object-cover" />
      </div>
      <h4 class="font-medium text-sm text-stone-100">Alpine Diffuser</h4>
      <p class="text-xs text-stone-400 mb-2">Ceramic stone finish</p>
      <div class="flex justify-between items-center">
        <span class="text-sm font-bold text-amber-400">$120</span>
        <button class="bg-stone-700 hover:bg-amber-500 hover:text-stone-950 text-xs px-2.5 py-1 rounded-md transition-colors">Add</button>
      </div>
    </div>
  </div>
</body>
</html>`
  },
  {
    id: 'tpl-travel-story',
    name: 'Travel & Expedition Journal',
    category: 'Editorial',
    description: 'Immersive photojournalism layout with landscape imagery, route metrics, and author details.',
    htmlContent: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-950 text-slate-100 font-sans p-6 min-h-screen">
  <!-- Article Header -->
  <div class="mb-6">
    <div class="flex items-center space-x-2 text-xs text-emerald-400 font-mono uppercase mb-2">
      <span class="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
      <span>Field Report #42</span>
      <span>•</span>
      <span>Dolomites, Italy</span>
    </div>
    <h1 class="text-3xl font-extrabold tracking-tight text-white mb-2">Above the Cloudline</h1>
    <p class="text-slate-400 text-sm">Seven dawns trekking through limestone needles and high alpine tarns.</p>
  </div>

  <!-- Primary Landscape Hotlink -->
  <div class="rounded-2xl overflow-hidden shadow-2xl mb-6 border border-slate-800">
    <img src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80" 
         alt="Alpine Valley Mist" 
         class="w-full h-64 object-cover" />
  </div>

  <!-- Expedition Metrics -->
  <div class="grid grid-cols-3 gap-3 mb-6 bg-slate-900/80 p-4 rounded-xl border border-slate-800 text-center">
    <div>
      <div class="text-xs text-slate-400 uppercase">Elevation</div>
      <div class="text-lg font-bold text-emerald-400">2,840 m</div>
    </div>
    <div class="border-x border-slate-800">
      <div class="text-xs text-slate-400 uppercase">Distance</div>
      <div class="text-lg font-bold text-white">48.2 km</div>
    </div>
    <div>
      <div class="text-xs text-slate-400 uppercase">Temp</div>
      <div class="text-lg font-bold text-emerald-400">-2°C</div>
    </div>
  </div>

  <!-- Secondary visual hotlink -->
  <div class="flex gap-4 items-center bg-slate-900/40 p-3 rounded-xl border border-slate-800/60">
    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80" 
         alt="Author Portrait" 
         class="w-12 h-12 rounded-full object-cover border-2 border-emerald-500" />
    <div>
      <div class="font-medium text-sm text-white">Elena Rostova</div>
      <div class="text-xs text-slate-400">High Altitude Photographer & Cartographer</div>
    </div>
  </div>
</body>
</html>`
  },
  {
    id: 'tpl-tech-portfolio',
    name: 'Cyberpunk Tech & AI Hub',
    category: 'Technology',
    description: 'High-tech console layout with neon accents, code cascades, server telemetry, and dark interface.',
    htmlContent: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-black text-cyan-50 font-mono p-6 min-h-screen">
  <div class="flex justify-between items-center mb-6 border-b border-cyan-900/50 pb-3">
    <div class="flex items-center gap-2">
      <div class="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></div>
      <span class="text-cyan-400 font-bold tracking-wider text-sm">NEURAL_TERMINAL v4.1</span>
    </div>
    <span class="text-xs text-cyan-600 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">ONLINE</span>
  </div>

  <!-- Visual banner -->
  <div class="rounded-xl overflow-hidden border border-cyan-500/30 mb-6 relative">
    <img src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=80" 
         alt="Neural Matrix" 
         class="w-full h-44 object-cover opacity-80" />
    <div class="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent flex flex-col justify-end p-4">
      <div class="text-cyan-400 text-xs uppercase tracking-widest mb-1">> QUANTUM_NODE_ACTIVE</div>
      <div class="text-lg font-bold text-white">Neural Cluster Mesh 09</div>
    </div>
  </div>

  <!-- Quick stats -->
  <div class="grid grid-cols-2 gap-3 mb-6">
    <div class="bg-cyan-950/30 border border-cyan-900/60 p-3 rounded-lg">
      <div class="text-xs text-cyan-500">SYNAPSE_THROUGHPUT</div>
      <div class="text-xl font-bold text-cyan-300">4.88 TFLOPS</div>
    </div>
    <div class="bg-cyan-950/30 border border-cyan-900/60 p-3 rounded-lg">
      <div class="text-xs text-cyan-500">HOTLINK_LATENCY</div>
      <div class="text-xl font-bold text-emerald-400">14 ms</div>
    </div>
  </div>
</body>
</html>`
  }
];
