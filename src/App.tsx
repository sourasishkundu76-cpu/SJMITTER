/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CURATED_HOTLINKS } from './data/mockData';
import { HotlinkImage, ViewportMode } from './types';
import { DeviceFrame } from './components/DeviceFrame';
import { Navigation, ScreenId } from './components/Navigation';
import { HomeScreen } from './components/screens/HomeScreen';
import { ShowcaseScreen } from './components/screens/ShowcaseScreen';
import { AnalyticsScreen } from './components/screens/AnalyticsScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';
import { HtmlImporterScreen } from './components/screens/HtmlImporterScreen';
import { DetailModal } from './components/DetailModal';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ScreenId>('home');
  const [viewportMode, setViewportMode] = useState<ViewportMode>('mobile');
  const [images, setImages] = useState<HotlinkImage[]>(CURATED_HOTLINKS);
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set(['img-1', 'img-3']));
  const [inspectedImage, setInspectedImage] = useState<HotlinkImage | null>(null);

  const handleToggleLike = (id: string) => {
    setLikedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const getScreenTitle = (screen: ScreenId) => {
    switch (screen) {
      case 'home':
        return 'Discover Feed';
      case 'showcase':
        return 'Visual Showcase';
      case 'analytics':
        return 'Insights & Telemetry';
      case 'profile':
        return 'Elena’s Profile';
      case 'importer':
        return 'Live HTML Studio';
      default:
        return 'App Screen';
    }
  };

  return (
    <DeviceFrame
      mode={viewportMode}
      onModeChange={setViewportMode}
      activeScreenTitle={getScreenTitle(activeScreen)}
    >
      {/* Desktop/Tablet Top Screen Nav Header if in wide modes */}
      {(viewportMode === 'desktop' || viewportMode === 'tablet') && (
        <div className="px-6 py-3 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-zinc-300">
            <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
            <span>Current Screen: <strong className="text-white">{getScreenTitle(activeScreen)}</strong></span>
          </div>
          <Navigation
            activeScreen={activeScreen}
            onSelectScreen={setActiveScreen}
            isDesktop={true}
          />
        </div>
      )}

      {/* Screen View Container */}
      <div className="flex-1 flex flex-col min-h-0 relative">
        {activeScreen === 'home' && (
          <HomeScreen
            images={images}
            likedIds={likedIds}
            onToggleLike={handleToggleLike}
            onInspectImage={setInspectedImage}
            onNavigateToImporter={() => setActiveScreen('importer')}
          />
        )}

        {activeScreen === 'showcase' && (
          <ShowcaseScreen
            images={images}
            likedIds={likedIds}
            onToggleLike={handleToggleLike}
            onInspectImage={setInspectedImage}
          />
        )}

        {activeScreen === 'analytics' && <AnalyticsScreen />}

        {activeScreen === 'profile' && (
          <ProfileScreen
            images={images}
            likedIds={likedIds}
            onInspectImage={setInspectedImage}
          />
        )}

        {activeScreen === 'importer' && <HtmlImporterScreen />}
      </div>

      {/* Mobile Bottom Navigation Bar */}
      {viewportMode === 'mobile' && (
        <Navigation
          activeScreen={activeScreen}
          onSelectScreen={setActiveScreen}
          isDesktop={false}
        />
      )}

      {/* Image Inspection & Hotlink Modal */}
      <DetailModal
        image={inspectedImage}
        onClose={() => setInspectedImage(null)}
        onToggleLike={handleToggleLike}
        isLiked={inspectedImage ? likedIds.has(inspectedImage.id) : false}
      />
    </DeviceFrame>
  );
}
