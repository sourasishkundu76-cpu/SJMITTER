import React, { useState } from 'react';
import { X, Copy, Check, ExternalLink, Heart, Tag, User, Sparkles } from 'lucide-react';
import { HotlinkImage } from '../types';

interface DetailModalProps {
  image: HotlinkImage | null;
  onClose: () => void;
  onToggleLike?: (id: string) => void;
  isLiked?: boolean;
}

export const DetailModal: React.FC<DetailModalProps> = ({
  image,
  onClose,
  onToggleLike,
  isLiked = false,
}) => {
  const [copied, setCopied] = useState(false);

  if (!image) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(image.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-zinc-800 bg-zinc-900/90 sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Hotlink Asset Inspector</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal body */}
        <div className="overflow-y-auto p-5 space-y-5">
          {/* Main preview */}
          <div className="relative rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800/80 group">
            <img
              src={image.url}
              alt={image.title}
              className="w-full max-h-[380px] object-cover object-center transition-transform duration-500 group-hover:scale-102"
            />
            <div className="absolute top-3 right-3 flex gap-2">
              <button
                onClick={() => onToggleLike && onToggleLike(image.id)}
                className={`p-2 rounded-full backdrop-blur-md border transition-all ${
                  isLiked
                    ? 'bg-rose-500 text-white border-rose-400'
                    : 'bg-black/60 text-white/90 border-white/10 hover:bg-black/80'
                }`}
              >
                <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
              </button>
              <a
                href={image.url}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-full bg-black/60 text-white/90 border border-white/10 hover:bg-black/80 transition-all backdrop-blur-md"
                title="Open raw image"
              >
                <ExternalLink size={16} />
              </a>
            </div>
          </div>

          {/* Metadata Section */}
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">{image.title}</h3>
                <div className="flex items-center gap-2 text-xs text-zinc-400 mt-1">
                  <User size={13} className="text-indigo-400" />
                  <span>Photographer: <strong className="text-zinc-200">{image.author}</strong></span>
                  <span>•</span>
                  <span className="capitalize px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-300 font-medium">
                    {image.category}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-zinc-500 block">Aspect Ratio</span>
                <span className="text-xs font-mono font-medium text-emerald-400 uppercase">{image.aspectRatio}</span>
              </div>
            </div>

            {/* Hotlink URL box */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-3">
              <div className="flex items-center justify-between text-xs text-zinc-400 mb-1.5">
                <span className="font-mono flex items-center gap-1.5 text-zinc-300 font-semibold">
                  <Sparkles size={13} className="text-amber-400" />
                  Direct Hotlink CDN URL
                </span>
                <span className="text-[10px] text-zinc-500">Fast Unsplash CDN</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={image.url}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-300 font-mono focus:outline-none select-all"
                />
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition-colors shrink-0 shadow-sm"
                >
                  {copied ? <Check size={14} className="text-emerald-300" /> : <Copy size={14} />}
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {image.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-zinc-800/80 text-zinc-400 border border-zinc-700/50"
                >
                  <Tag size={10} className="text-zinc-500" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-zinc-800 bg-zinc-900/60 flex items-center justify-between text-xs text-zinc-500">
          <span>Ready to hotlink directly into any HTML or CSS</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-medium transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
