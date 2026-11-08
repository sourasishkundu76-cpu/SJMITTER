export interface HotlinkImage {
  id: string;
  url: string;
  title: string;
  author: string;
  category: 'architecture' | 'nature' | 'minimal' | 'tech' | 'portrait';
  aspectRatio: 'square' | 'portrait' | 'landscape';
  likes: number;
  tags: string[];
}

export interface ScreenItem {
  id: string;
  name: string;
  icon: string;
  badge?: string;
  description: string;
}

export type ViewportMode = 'mobile' | 'tablet' | 'desktop';

export interface SampleTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  htmlContent: string;
}
