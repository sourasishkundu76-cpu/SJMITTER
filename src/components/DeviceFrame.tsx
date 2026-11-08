import React from 'react';
import { ViewportMode } from '../types';
import { Smartphone, Tablet, Monitor, Wifi, Battery, Sparkles } from 'lucide-react';

interface DeviceFrameProps {
  mode: ViewportMode;
  onModeChange: (mode: ViewportMode) => void;
  children: React.ReactNode;
  activeScreenTitle: string;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({
  mode,
  onModeChange,
  children,
  activeScreenTitle,
}) => {
  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-zinc-950 text-zinc-100 selection:bg-indigo-500/30">
      {/* Top Studio Control Bar */}
      <header className="w-full bg-zinc-900/90 backdrop-blur-md border-b border-zinc-800/80 px-4 py-2.5 sticky top-0 z-40 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center shadow-md shadow-indigo-500/20">
              <Sparkles size={15} className="text-white" />
            </div>
            <div>
              <span className="font-bold text-sm tracking-tight text-white block leading-tight">ScreenCraft</span>
              <span className="text-[10px] text-zinc-400 block -mt-0.5">Multi-Screen App Engine</span>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 ml-3 pl-3 border-l border-zinc-800 text-xs text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>Screen: <strong className="text-zinc-200">{activeScreenTitle}</strong></span>
          </div>
        </div>

        {/* Device Viewport Selector */}
        <div className="flex items-center gap-1 bg-zinc-950 p-1 rounded-xl border border-zinc-800">
          <button
            onClick={() => onModeChange('mobile')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              mode === 'mobile'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
            }`}
            title="Mobile iPhone View"
          >
            <Smartphone size={14} />
            <span className="hidden sm:inline">Mobile</span>
          </button>
          <button
            onClick={() => onModeChange('tablet')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              mode === 'tablet'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
            }`}
            title="Tablet iPad View"
          >
            <Tablet size={14} />
            <span className="hidden sm:inline">Tablet</span>
          </button>
          <button
            onClick={() => onModeChange('desktop')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              mode === 'desktop'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
            }`}
            title="Desktop Responsive View"
          >
            <Monitor size={14} />
            <span className="hidden sm:inline">Full Width</span>
          </button>
        </div>
      </header>

      {/* Main Viewport Container */}
      <div className="flex-1 w-full flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-x-hidden">
        {mode === 'mobile' && (
          <div className="relative w-full max-w-[390px] h-[830px] rounded-[48px] bg-zinc-900 p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.1)] border-[4px] border-zinc-800 flex flex-col transition-all duration-300">
            {/* Dynamic Island & Status Bar */}
            <div className="h-10 px-6 pt-1 flex items-center justify-between text-zinc-300 text-[11px] font-semibold select-none shrink-0">
              <span>9:41</span>
              {/* Dynamic Island Capsule */}
              <div className="w-24 h-5 bg-black rounded-full flex items-center justify-center gap-1.5 shadow-inner">
                <span className="w-2 h-2 rounded-full bg-indigo-500/80"></span>
                <span className="text-[9px] text-zinc-400 font-mono">Screen</span>
              </div>
              <div className="flex items-center gap-1.5 text-zinc-300">
                <Wifi size={12} />
                <Battery size={13} />
              </div>
            </div>

            {/* Inner App Screen View */}
            <div className="relative flex-1 w-full overflow-y-auto overflow-x-hidden rounded-[36px] bg-zinc-950 flex flex-col no-scrollbar border border-zinc-800/50">
              {children}
            </div>

            {/* Home indicator bar */}
            <div className="h-4 flex items-center justify-center shrink-0">
              <div className="w-32 h-1 bg-zinc-600/70 rounded-full"></div>
            </div>
          </div>
        )}

        {mode === 'tablet' && (
          <div className="relative w-full max-w-[760px] h-[880px] rounded-[36px] bg-zinc-900 p-4 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.95)] border-[3px] border-zinc-800 flex flex-col transition-all duration-300">
            {/* Tablet Status Header */}
            <div className="h-8 px-6 flex items-center justify-between text-zinc-400 text-xs font-semibold select-none shrink-0">
              <span>Tuesday, Nov 8</span>
              <div className="w-2 h-2 rounded-full bg-zinc-700"></div>
              <div className="flex items-center gap-2">
                <Wifi size={13} />
                <span>100%</span>
                <Battery size={14} />
              </div>
            </div>

            {/* Tablet Screen */}
            <div className="relative flex-1 w-full overflow-y-auto overflow-x-hidden rounded-[24px] bg-zinc-950 flex flex-col border border-zinc-800/50">
              {children}
            </div>
            
            {/* Home indicator bar */}
            <div className="h-4 flex items-center justify-center shrink-0">
              <div className="w-36 h-1 bg-zinc-600/60 rounded-full"></div>
            </div>
          </div>
        )}

        {mode === 'desktop' && (
          <div className="w-full max-w-6xl min-h-[780px] bg-zinc-950 rounded-2xl border border-zinc-800/80 shadow-2xl overflow-hidden flex flex-col">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};
