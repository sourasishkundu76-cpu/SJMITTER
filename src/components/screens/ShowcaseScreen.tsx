import React, { useState } from 'react';
import { HotlinkImage } from '../../types';
import { Copy, Check, Eye, Heart, Filter, Grid, LayoutGrid, Smartphone, Maximize2 } from 'lucide-react';

interface ShowcaseScreenProps {
  images: HotlinkImage[];
  likedIds: Set<string>;
  onToggleLike: (id: string) => void;
  onInspectImage: (img: HotlinkImage) => void;
}

export const ShowcaseScreen: React.FC<ShowcaseScreenProps> = ({
  images,
  likedIds,
  onToggleLike,
  onInspectImage,
}) => {
  const [selectedRatio, setSelectedRatio] = useState<'all' | 'portrait' | 'landscape' | 'square'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (img: HotlinkImage, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(img.url);
    setCopiedId(img.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredImages = images.filter((img) => {
    if (selectedRatio === 'all') return true;
    return img.aspectRatio === selectedRatio;
  });

  return (
    <div className="flex-1 flex flex-col p-4 sm:p-6 space-y-6 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[11px] font-semibold tracking-wider text-indigo-400 uppercase">Screen 02 • Showcase</span>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">Visual Assets & Frames</h1>
          <p className="text-xs text-zinc-400 mt-1">High resolution, zero-latency hotlinkable media for responsive screens</p>
        </div>
      </div>

      {/* Aspect Ratio Filter Bar */}
      <div className="flex items-center justify-between bg-zinc-900/80 p-2 rounded-xl border border-zinc-800">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {(['all', 'portrait', 'landscape', 'square'] as const).map((ratio) => (
            <button
              key={ratio}
              onClick={() => setSelectedRatio(ratio)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                selectedRatio === ratio
                  ? 'bg-zinc-800 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {ratio}
            </button>
          ))}
        </div>
        <span className="text-xs text-zinc-500 font-mono hidden sm:inline">
          {filteredImages.length} available
        </span>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredImages.map((img) => {
          const isLiked = likedIds.has(img.id);
          const isCopied = copiedId === img.id;
          return (
            <div
              key={img.id}
              className="group bg-zinc-900 rounded-xl border border-zinc-800/80 overflow-hidden hover:border-zinc-700 transition-all flex flex-col shadow-lg"
            >
              {/* Media viewport with simulated mobile preview overlay */}
              <div
                className="relative aspect-[3/4] overflow-hidden bg-zinc-950 cursor-pointer"
                onClick={() => onInspectImage(img)}
              >
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />

                {/* Simulated Screen UI overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-black/30 opacity-90 p-3 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-black/60 text-zinc-300 backdrop-blur-md border border-white/10">
                      {img.aspectRatio}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleLike(img.id);
                      }}
                      className={`p-1.5 rounded-full backdrop-blur-md border transition-all ${
                        isLiked
                          ? 'bg-rose-500 text-white border-rose-400'
                          : 'bg-black/50 text-white/80 border-white/10 hover:bg-black/80'
                      }`}
                    >
                      <Heart size={13} fill={isLiked ? 'currentColor' : 'none'} />
                    </button>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-white drop-shadow-md line-clamp-1">{img.title}</h4>
                    <p className="text-[11px] text-zinc-300 drop-shadow">Photo by {img.author}</p>
                  </div>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="p-3 bg-zinc-900 flex items-center justify-between border-t border-zinc-800 text-xs">
                <button
                  onClick={(e) => handleCopy(img, e)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                    isCopied
                      ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700'
                      : 'bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 border-zinc-700/60'
                  }`}
                  title="Copy direct hotlink URL"
                >
                  {isCopied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                  <span>{isCopied ? 'Copied' : 'Copy URL'}</span>
                </button>

                <button
                  onClick={() => onInspectImage(img)}
                  className="flex items-center gap-1 text-zinc-400 hover:text-zinc-200 transition-colors"
                >
                  <Eye size={13} />
                  <span>Inspect</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
