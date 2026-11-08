import React, { useState } from 'react';
import { HotlinkImage } from '../../types';
import { User, Settings, Bookmark, Sparkles, Check, ExternalLink, Shield, HardDrive, Bell } from 'lucide-react';

interface ProfileScreenProps {
  images: HotlinkImage[];
  likedIds: Set<string>;
  onInspectImage: (img: HotlinkImage) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  images,
  likedIds,
  onInspectImage,
}) => {
  const [activeTab, setActiveTab] = useState<'saved' | 'settings'>('saved');
  const [autoWebp, setAutoWebp] = useState(true);
  const [highDpi, setHighDpi] = useState(true);

  const likedImages = images.filter((img) => likedIds.has(img.id));

  return (
    <div className="flex-1 flex flex-col p-4 sm:p-6 space-y-6 overflow-y-auto">
      {/* Profile Header */}
      <div className="flex flex-col items-center text-center space-y-3 pt-2">
        <div className="relative">
          <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-tr from-indigo-500 via-purple-500 to-amber-500 shadow-xl shadow-indigo-500/20">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
              alt="Elena Rostova"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <span className="absolute bottom-0 right-0 p-1 rounded-full bg-emerald-500 border-2 border-zinc-950 text-white">
            <Sparkles size={11} />
          </span>
        </div>

        <div>
          <h2 className="text-lg font-bold text-white tracking-tight">Elena Rostova</h2>
          <p className="text-xs text-zinc-400">Creative Technologist & UI Architect</p>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-[10px] font-medium mt-1.5">
            <span>PRO Hotlink Tier</span>
            <span>•</span>
            <span>Edge Accelerated</span>
          </div>
        </div>

        {/* Profile Stats */}
        <div className="w-full grid grid-cols-3 gap-2 bg-zinc-900/80 p-3 rounded-xl border border-zinc-800">
          <div>
            <span className="text-base font-bold text-white block">{likedIds.size}</span>
            <span className="text-[10px] text-zinc-400 uppercase">Bookmarked</span>
          </div>
          <div className="border-x border-zinc-800">
            <span className="text-base font-bold text-indigo-400 block">{images.length}</span>
            <span className="text-[10px] text-zinc-400 uppercase">CDN Assets</span>
          </div>
          <div>
            <span className="text-base font-bold text-emerald-400 block">3</span>
            <span className="text-[10px] text-zinc-400 uppercase">HTML Templates</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-zinc-800">
        <button
          onClick={() => setActiveTab('saved')}
          className={`flex items-center gap-1.5 pb-2.5 px-4 text-xs font-medium border-b-2 transition-all ${
            activeTab === 'saved'
              ? 'border-indigo-500 text-white font-semibold'
              : 'border-transparent text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Bookmark size={13} />
          <span>Saved Assets ({likedIds.size})</span>
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`flex items-center gap-1.5 pb-2.5 px-4 text-xs font-medium border-b-2 transition-all ${
            activeTab === 'settings'
              ? 'border-indigo-500 text-white font-semibold'
              : 'border-transparent text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Settings size={13} />
          <span>CDN Preferences</span>
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'saved' ? (
        <div className="space-y-3">
          {likedImages.length === 0 ? (
            <div className="text-center py-10 px-4 bg-zinc-900/40 rounded-xl border border-dashed border-zinc-800">
              <Bookmark size={24} className="mx-auto text-zinc-600 mb-2" />
              <h4 className="text-sm font-medium text-zinc-300">No saved assets yet</h4>
              <p className="text-xs text-zinc-500 mt-1 max-w-xs mx-auto">
                Tap the heart icon on any card in Discover or Showcase to bookmark hotlinked assets for quick access.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {likedImages.map((img) => (
                <div
                  key={img.id}
                  onClick={() => onInspectImage(img)}
                  className="group relative rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 cursor-pointer hover:border-zinc-700 transition-all"
                >
                  <img
                    src={img.url}
                    alt={img.title}
                    className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="p-2.5">
                    <h5 className="text-xs font-semibold text-white truncate">{img.title}</h5>
                    <span className="text-[10px] text-zinc-400">{img.author}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-3 bg-zinc-900/80 p-4 rounded-xl border border-zinc-800">
          <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">Hotlink Optimization</h4>
          
          <div className="flex items-center justify-between py-2 border-b border-zinc-800/80">
            <div>
              <span className="text-xs font-medium text-white block">Auto WebP / AVIF Format</span>
              <span className="text-[10px] text-zinc-400">Append &auto=format parameter to reduce image payload by 60%</span>
            </div>
            <button
              onClick={() => setAutoWebp(!autoWebp)}
              className={`w-10 h-5 rounded-full transition-colors relative ${autoWebp ? 'bg-indigo-600' : 'bg-zinc-700'}`}
            >
              <div className={`w-3.5 h-3.5 rounded-full bg-white transition-transform absolute top-0.75 ${autoWebp ? 'right-1' : 'left-1'}`} />
            </button>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-zinc-800/80">
            <div>
              <span className="text-xs font-medium text-white block">Retina High-DPI (@2x)</span>
              <span className="text-[10px] text-zinc-400">Optimize srcset for crisp rendering on high density displays</span>
            </div>
            <button
              onClick={() => setHighDpi(!highDpi)}
              className={`w-10 h-5 rounded-full transition-colors relative ${highDpi ? 'bg-indigo-600' : 'bg-zinc-700'}`}
            >
              <div className={`w-3.5 h-3.5 rounded-full bg-white transition-transform absolute top-0.75 ${highDpi ? 'right-1' : 'left-1'}`} />
            </button>
          </div>

          <div className="pt-2">
            <span className="text-[11px] text-zinc-500">
              Hotlinked media is served via global HTTP/3 edge nodes with sub-20ms TTFB.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
