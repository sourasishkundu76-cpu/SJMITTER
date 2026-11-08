import React, { useState } from 'react';
import { Search, Heart, Sparkles, ArrowRight, Share2, Eye, SlidersHorizontal } from 'lucide-react';
import { HotlinkImage } from '../../types';

interface HomeScreenProps {
  images: HotlinkImage[];
  likedIds: Set<string>;
  onToggleLike: (id: string) => void;
  onInspectImage: (img: HotlinkImage) => void;
  onNavigateToImporter: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  images,
  likedIds,
  onToggleLike,
  onInspectImage,
  onNavigateToImporter,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = ['all', 'architecture', 'nature', 'minimal', 'tech', 'portrait'];

  const filteredImages = images.filter((img) => {
    const matchesCategory = activeCategory === 'all' || img.category === activeCategory;
    const matchesSearch =
      img.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      img.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      img.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const heroImage = images[0];

  return (
    <div className="flex-1 flex flex-col p-4 sm:p-6 space-y-6 overflow-y-auto">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[11px] font-semibold tracking-wider text-indigo-400 uppercase">Screen 01 • Discover</span>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">Visual Feed</h1>
        </div>
        <button
          onClick={onNavigateToImporter}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-medium transition-all"
        >
          <Sparkles size={13} className="text-indigo-400" />
          <span>Import HTML</span>
        </button>
      </div>

      {/* Creator Stories Hotlink Avatars */}
      <div className="flex items-center gap-3 overflow-x-auto pb-1 no-scrollbar">
        {images.slice(0, 6).map((img, idx) => (
          <button
            key={`story-${img.id}`}
            onClick={() => onInspectImage(img)}
            className="flex flex-col items-center gap-1.5 shrink-0 group focus:outline-none"
          >
            <div className={`p-0.5 rounded-full transition-all ${
              idx === 0 
                ? 'bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-500 shadow-md shadow-indigo-500/20 scale-105' 
                : 'bg-zinc-800 group-hover:bg-zinc-700'
            }`}>
              <div className="p-0.5 bg-zinc-950 rounded-full">
                <img
                  src={img.url}
                  alt={img.author}
                  className="w-12 h-12 rounded-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
            </div>
            <span className="text-[10px] text-zinc-400 group-hover:text-zinc-200 truncate max-w-[60px]">
              {img.author.split(' ')[0]}
            </span>
          </button>
        ))}
      </div>

      {/* Search & Filter Bar */}
      <div className="space-y-3">
        <div className="relative">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search hotlinked assets, tags, creators..."
            className="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl pl-9 pr-10 py-2.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/30 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium capitalize shrink-0 transition-all ${
                activeCategory === cat
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Hero Banner */}
      {heroImage && activeCategory === 'all' && !searchQuery && (
        <div className="relative rounded-2xl overflow-hidden border border-zinc-800 shadow-xl group">
          <img
            src={heroImage.url}
            alt={heroImage.title}
            className="w-full h-52 sm:h-64 object-cover object-center group-hover:scale-102 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent flex flex-col justify-end p-5">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-indigo-500/30 text-indigo-300 px-2 py-0.5 rounded-full backdrop-blur-md border border-indigo-500/40">
                Featured Screen
              </span>
              <span className="text-xs text-zinc-300">by {heroImage.author}</span>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">{heroImage.title}</h2>
            <div className="flex items-center justify-between">
              <div className="flex gap-1.5">
                {heroImage.tags.slice(0, 2).map((t) => (
                  <span key={t} className="text-[11px] text-zinc-300 bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm border border-white/10">
                    #{t}
                  </span>
                ))}
              </div>
              <button
                onClick={() => onInspectImage(heroImage)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-zinc-950 hover:bg-zinc-200 text-xs font-semibold transition-all shadow-md"
              >
                <Eye size={13} />
                <span>Inspect Screen</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cards Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold tracking-wide text-zinc-300 uppercase">Hotlinked Curations</h3>
          <span className="text-xs text-zinc-500">{filteredImages.length} assets ready</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredImages.map((img) => {
            const isLiked = likedIds.has(img.id);
            return (
              <div
                key={img.id}
                className="group relative bg-zinc-900/60 rounded-xl border border-zinc-800/80 overflow-hidden hover:border-zinc-700 transition-all flex flex-col"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-zinc-950 cursor-pointer" onClick={() => onInspectImage(img)}>
                  <img
                    src={img.url}
                    alt={img.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleLike(img.id);
                      }}
                      className={`p-2 rounded-full backdrop-blur-md border transition-all ${
                        isLiked
                          ? 'bg-rose-500 text-white border-rose-400'
                          : 'bg-black/50 text-white/80 border-white/10 hover:bg-black/80'
                      }`}
                    >
                      <Heart size={14} fill={isLiked ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                  <div className="absolute bottom-2.5 left-2.5">
                    <span className="text-[10px] font-medium bg-black/60 text-zinc-200 px-2 py-0.5 rounded-md backdrop-blur-md border border-white/10 uppercase tracking-wider">
                      {img.category}
                    </span>
                  </div>
                </div>

                <div className="p-3.5 flex flex-col justify-between flex-1 gap-2">
                  <div>
                    <h4 className="font-semibold text-sm text-zinc-100 group-hover:text-indigo-300 transition-colors line-clamp-1">
                      {img.title}
                    </h4>
                    <p className="text-xs text-zinc-400 mt-0.5">Photo by {img.author}</p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-zinc-800/60 text-xs">
                    <span className="text-zinc-500 flex items-center gap-1">
                      <Heart size={12} className={isLiked ? 'text-rose-500' : 'text-zinc-500'} />
                      <span>{img.likes + (isLiked ? 1 : 0)}</span>
                    </span>
                    <button
                      onClick={() => onInspectImage(img)}
                      className="text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1 transition-colors"
                    >
                      <span>Hotlink Info</span>
                      <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* HTML Importer Callout Banner */}
      <div className="bg-gradient-to-r from-indigo-950/60 via-zinc-900 to-violet-950/40 p-4 rounded-xl border border-indigo-500/30 flex items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Sparkles size={14} className="text-amber-400" />
            Have custom screens or HTML?
          </h4>
          <p className="text-xs text-zinc-300 mt-0.5">
            Paste any HTML code or URL in the studio to hotlink images & preview in device frames instantly.
          </p>
        </div>
        <button
          onClick={onNavigateToImporter}
          className="shrink-0 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold transition-all shadow-md"
        >
          Open Studio
        </button>
      </div>
    </div>
  );
};
