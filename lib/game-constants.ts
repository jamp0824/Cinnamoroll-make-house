import { ItemType } from './game-types';

export const STORAGE_KEY = 'cinnamoroll-house-builder-save-v1';

export const ITEM_LIBRARY: { type: ItemType; icon: string; color: string }[] = [
  { type: 'bed', icon: '🛏️', color: 'bg-pink-100' },
  { type: 'table', icon: '🪵', color: 'bg-orange-100' },
  { type: 'chair', icon: '🪑', color: 'bg-yellow-100' },
  { type: 'lamp', icon: '💡', color: 'bg-amber-100' },
  { type: 'window', icon: '🪟', color: 'bg-cyan-100' },
  { type: 'plush toy', icon: '🧸', color: 'bg-violet-100' },
  { type: 'cake', icon: '🍰', color: 'bg-rose-100' },
  { type: 'cookies', icon: '🍪', color: 'bg-lime-100' }
];
