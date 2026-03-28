'use client';

import { useMemo } from 'react';
import { ITEM_LIBRARY } from '@/lib/game-constants';
import { ItemType, PlacedItem, ThemeMode } from '@/lib/game-types';
import { Character } from './Character';
import { DraggableItem } from './DraggableItem';

type HouseCanvasProps = {
  items: PlacedItem[];
  theme: ThemeMode;
  mascotHappy: boolean;
  mascotBounce: boolean;
  onMascotClick: () => void;
  onDropType: (type: ItemType, x: number, y: number) => void;
  onMoveItem: (id: string, x: number, y: number) => void;
  onResizeItem: (id: string, width: number, height: number) => void;
  onRemoveItem: (id: string) => void;
};

export function HouseCanvas({
  items,
  theme,
  mascotHappy,
  mascotBounce,
  onMascotClick,
  onDropType,
  onMoveItem,
  onResizeItem,
  onRemoveItem
}: HouseCanvasProps) {
  const backgroundClass = useMemo(
    () =>
      theme === 'day'
        ? 'bg-gradient-to-b from-sky-100 via-blue-50 to-pink-100'
        : 'bg-gradient-to-b from-slate-700 via-blue-900 to-slate-800',
    [theme]
  );

  return (
    <section
      className={`relative h-full w-full overflow-hidden rounded-3xl border-4 border-white/70 p-3 shadow-candy ${backgroundClass}`}
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) => {
        event.preventDefault();
        const droppedType = event.dataTransfer.getData('application/item-type') as ItemType;
        const movedItemData = event.dataTransfer.getData('application/move-item');
        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left - 45;
        const y = event.clientY - rect.top - 45;

        if (movedItemData) {
          const parsed = JSON.parse(movedItemData) as { id: string };
          onMoveItem(parsed.id, x, y);
          return;
        }

        if (droppedType) {
          onDropType(droppedType, x, y);
        }
      }}
    >
      <div className="pointer-events-none absolute inset-4 rounded-3xl border-2 border-dashed border-white/70" />
      <div className="absolute left-5 top-4 rounded-full bg-white/70 px-3 py-1 text-xs font-bold text-sky-700 shadow">
        {theme === 'day' ? '☀️ Day House' : '🌙 Night House'}
      </div>
      {items.map((item) => (
        <DraggableItem
          key={item.id}
          item={item}
          onMove={onMoveItem}
          onResize={onResizeItem}
          onRemove={onRemoveItem}
        />
      ))}
      <Character happy={mascotHappy} onClick={onMascotClick} bounce={mascotBounce} />
      <div className="absolute bottom-4 left-4 rounded-2xl bg-white/65 px-3 py-2 text-xs text-sky-700">
        Tip: Drag from the furniture box or tap buttons to add items.
      </div>
      <div className="hidden">
        {ITEM_LIBRARY.map((entry) => (
          <span key={entry.type}>{entry.type}</span>
        ))}
      </div>
    </section>
  );
}
