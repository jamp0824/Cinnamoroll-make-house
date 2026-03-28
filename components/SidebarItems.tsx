'use client';

import { ITEM_LIBRARY } from '@/lib/game-constants';
import { ItemType } from '@/lib/game-types';

type SidebarItemsProps = {
  onPickItem: (itemType: ItemType) => void;
};

export function SidebarItems({ onPickItem }: SidebarItemsProps) {
  return (
    <aside className="flex h-full w-full flex-col gap-3 rounded-3xl bg-white/70 p-4 shadow-candy backdrop-blur">
      <h2 className="text-center text-lg font-bold text-sky-500">Furniture Box</h2>
      <p className="text-center text-xs text-sky-700">Tap or drag to add goodies!</p>
      <div className="grid grid-cols-2 gap-2">
        {ITEM_LIBRARY.map((item) => (
          <button
            key={item.type}
            className={`rounded-2xl border border-white p-3 text-sm font-semibold text-sky-700 shadow ${item.color} hover:scale-105`}
            onClick={() => onPickItem(item.type)}
            onDragStart={(event) => {
              event.dataTransfer.setData('application/item-type', item.type);
              event.dataTransfer.effectAllowed = 'copy';
            }}
            draggable
            type="button"
          >
            <div className="text-xl">{item.icon}</div>
            <div className="capitalize">{item.type}</div>
          </button>
        ))}
      </div>
    </aside>
  );
}
