import React from 'react';
import { Compass, Layers, BarChart2, User, Code2 } from 'lucide-react';

export type ScreenId = 'home' | 'showcase' | 'analytics' | 'profile' | 'importer';

interface NavigationProps {
  activeScreen: ScreenId;
  onSelectScreen: (screen: ScreenId) => void;
  isDesktop?: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeScreen,
  onSelectScreen,
  isDesktop = false,
}) => {
  const navItems: { id: ScreenId; label: string; icon: React.FC<{ size?: number; className?: string }> }[] = [
    { id: 'home', label: 'Discover', icon: Compass },
    { id: 'showcase', label: 'Showcase', icon: Layers },
    { id: 'analytics', label: 'Insights', icon: BarChart2 },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'importer', label: 'HTML Studio', icon: Code2 },
  ];

  if (isDesktop) {
    return (
      <nav className="flex items-center gap-1 bg-zinc-900/60 p-1.5 rounded-xl border border-zinc-800">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectScreen(item.id)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                isActive
                  ? 'bg-zinc-800 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
              }`}
            >
              <Icon size={14} className={isActive ? 'text-indigo-400' : ''} />
              <span>{item.label}</span>
              {item.id === 'importer' && (
                <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-1.5 py-0.2 rounded-full border border-indigo-500/30">
                  Live
                </span>
              )}
            </button>
          );
        })}
      </nav>
    );
  }

  // Mobile Bottom Navigation Bar
  return (
    <div className="sticky bottom-0 z-30 w-full bg-zinc-950/90 backdrop-blur-lg border-t border-zinc-800/80 px-2 py-2 flex items-center justify-around shrink-0">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeScreen === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onSelectScreen(item.id)}
            className={`flex flex-col items-center justify-center flex-1 py-1 rounded-xl transition-all relative ${
              isActive ? 'text-indigo-400' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <div className="relative">
              <Icon size={18} />
              {item.id === 'importer' && (
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
              )}
            </div>
            <span className={`text-[10px] mt-1 font-medium ${isActive ? 'font-semibold text-white' : ''}`}>
              {item.label}
            </span>
            {isActive && (
              <span className="absolute bottom-0 w-6 h-0.5 bg-indigo-500 rounded-full"></span>
            )}
          </button>
        );
      })}
    </div>
  );
};
