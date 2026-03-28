'use client';

import { useEffect, useMemo, useState } from 'react';
import { HouseCanvas } from './HouseCanvas';
import { SidebarItems } from './SidebarItems';
import { ITEM_LIBRARY, STORAGE_KEY } from '@/lib/game-constants';
import { HouseSave, ItemType, PlacedItem, ThemeMode } from '@/lib/game-types';

const defaultSave: HouseSave = {
  items: [],
  theme: 'day',
  soundOn: true
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const makeItem = (type: ItemType, x: number, y: number): PlacedItem => {
  const found = ITEM_LIBRARY.find((item) => item.type === type);
  return {
    id: crypto.randomUUID(),
    type,
    icon: found?.icon ?? '✨',
    x,
    y,
    width: 92,
    height: 92
  };
};

export function GameLayout() {
  const [items, setItems] = useState<PlacedItem[]>(defaultSave.items);
  const [theme, setTheme] = useState<ThemeMode>(defaultSave.theme);
  const [soundOn, setSoundOn] = useState(defaultSave.soundOn);
  const [mascotHappy, setMascotHappy] = useState(false);
  const [mascotBounce, setMascotBounce] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as HouseSave;
      if (parsed.items) setItems(parsed.items);
      if (parsed.theme) setTheme(parsed.theme);
      if (typeof parsed.soundOn === 'boolean') setSoundOn(parsed.soundOn);
    } catch {
      // ignore broken local storage state
    }
  }, []);

  useEffect(() => {
    const payload: HouseSave = { items, theme, soundOn };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [items, theme, soundOn]);

  const playBloop = () => {
    if (!soundOn) return;
    const context = new AudioContext();
    const osc = context.createOscillator();
    const gain = context.createGain();
    osc.type = 'sine';
    osc.frequency.value = 620;
    gain.gain.value = 0.03;
    osc.connect(gain);
    gain.connect(context.destination);
    osc.start();
    osc.stop(context.currentTime + 0.09);
  };

  const makeMascotHappy = () => {
    setMascotHappy(true);
    setTimeout(() => setMascotHappy(false), 900);
  };

  const addItem = (type: ItemType, x: number, y: number) => {
    setItems((prev) => [...prev, makeItem(type, clamp(x, 0, 560), clamp(y, 0, 360))]);
    makeMascotHappy();
    playBloop();
  };

  const headerPill = useMemo(
    () =>
      theme === 'day'
        ? 'bg-sky-100 text-sky-600 border-sky-200'
        : 'bg-indigo-200 text-indigo-700 border-indigo-300',
    [theme]
  );

  return (
    <main className="flex min-h-screen flex-col bg-transparent p-3 text-slate-700 md:p-5">
      <header className="mb-3 flex flex-wrap items-center justify-between gap-3 rounded-3xl bg-white/75 p-3 shadow-candy backdrop-blur">
        <div>
          <h1 className="text-2xl font-black text-sky-500 md:text-3xl">Cinnamoroll House Builder</h1>
          <p className="text-sm text-sky-700">Build a dreamy tiny home for your floppy-eared puppy friend!</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className={`rounded-full border px-3 py-1 text-xs font-bold ${headerPill}`}>
            {theme === 'day' ? 'Day Theme' : 'Night Theme'}
          </span>
          <button
            type="button"
            className="rounded-full bg-blue-200 px-4 py-2 text-sm font-bold text-blue-800 shadow"
            onClick={() => setTheme((prev) => (prev === 'day' ? 'night' : 'day'))}
          >
            Toggle Theme
          </button>
          <button
            type="button"
            className="rounded-full bg-pink-200 px-4 py-2 text-sm font-bold text-pink-700 shadow"
            onClick={() => setSoundOn((prev) => !prev)}
          >
            Sound: {soundOn ? 'On 🔊' : 'Off 🔈'}
          </button>
          <button
            type="button"
            className="rounded-full bg-rose-300 px-4 py-2 text-sm font-bold text-rose-900 shadow"
            onClick={() => {
              setItems([]);
              makeMascotHappy();
            }}
          >
            Reset Room
          </button>
        </div>
      </header>

      <div className="grid flex-1 grid-cols-1 gap-3 md:grid-cols-[260px_1fr]">
        <SidebarItems
          onPickItem={(type) => {
            addItem(type, 110 + Math.random() * 250, 75 + Math.random() * 190);
          }}
        />
        <HouseCanvas
          items={items}
          theme={theme}
          mascotHappy={mascotHappy}
          mascotBounce={mascotBounce}
          onMascotClick={() => {
            setMascotBounce(true);
            setTimeout(() => setMascotBounce(false), 300);
            playBloop();
          }}
          onDropType={addItem}
          onMoveItem={(id, x, y) => {
            setItems((prev) =>
              prev.map((item) => (item.id === id ? { ...item, x: clamp(x, 0, 640), y: clamp(y, 0, 430) } : item))
            );
          }}
          onResizeItem={(id, width, height) => {
            setItems((prev) =>
              prev.map((item) =>
                item.id === id
                  ? {
                      ...item,
                      width: clamp(width, 64, 180),
                      height: clamp(height, 64, 180)
                    }
                  : item
              )
            );
          }}
          onRemoveItem={(id) => {
            setItems((prev) => prev.filter((item) => item.id !== id));
            playBloop();
          }}
        />
      </div>

      <footer className="mt-3 rounded-3xl bg-white/70 p-3 text-center text-sm font-semibold text-sky-700 shadow-candy">
        Drag • Drop • Resize • Decorate — your house is auto-saved on this device!
      </footer>
    </main>
  );
}
