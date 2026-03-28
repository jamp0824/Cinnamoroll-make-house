'use client';

import { useRef } from 'react';
import { PlacedItem } from '@/lib/game-types';

type DraggableItemProps = {
  item: PlacedItem;
  onMove: (id: string, x: number, y: number) => void;
  onResize: (id: string, width: number, height: number) => void;
  onRemove: (id: string) => void;
};

export function DraggableItem({ item, onMove, onResize, onRemove }: DraggableItemProps) {
  const dragOffset = useRef({ x: 0, y: 0 });

  return (
    <div
      className="group absolute select-none rounded-2xl border border-white/80 bg-white/80 p-2 shadow-md transition-transform hover:scale-[1.02]"
      style={{ left: item.x, top: item.y, width: item.width, height: item.height }}
      draggable
      onDragStart={(event) => {
        dragOffset.current = {
          x: event.clientX - item.x,
          y: event.clientY - item.y
        };
        event.dataTransfer.setData('application/move-item', JSON.stringify({ id: item.id }));
      }}
    >
      <button
        type="button"
        className="absolute -right-2 -top-2 hidden h-6 w-6 rounded-full bg-pink-400 text-xs text-white shadow group-hover:block"
        onClick={() => onRemove(item.id)}
      >
        🗑️
      </button>
      <div className="flex h-full flex-col items-center justify-center rounded-xl bg-white/70 text-center">
        <span className="text-2xl">{item.icon}</span>
        <span className="text-xs font-semibold capitalize text-sky-700">{item.type}</span>
      </div>
      <button
        type="button"
        className="absolute bottom-0 right-0 h-5 w-5 cursor-se-resize rounded-tl-xl bg-sky-300"
        onMouseDown={(event) => {
          event.preventDefault();
          const startX = event.clientX;
          const startY = event.clientY;
          const initialWidth = item.width;
          const initialHeight = item.height;

          const onMouseMove = (moveEvent: MouseEvent) => {
            const nextWidth = Math.max(64, initialWidth + (moveEvent.clientX - startX));
            const nextHeight = Math.max(64, initialHeight + (moveEvent.clientY - startY));
            onResize(item.id, nextWidth, nextHeight);
          };

          const onMouseUp = () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
          };

          window.addEventListener('mousemove', onMouseMove);
          window.addEventListener('mouseup', onMouseUp);
        }}
      />
    </div>
  );
}
