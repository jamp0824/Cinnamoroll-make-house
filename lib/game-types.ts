export type ItemType =
  | 'bed'
  | 'table'
  | 'chair'
  | 'lamp'
  | 'window'
  | 'plush toy'
  | 'cake'
  | 'cookies';

export type ThemeMode = 'day' | 'night';

export type PlacedItem = {
  id: string;
  type: ItemType;
  icon: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

export type HouseSave = {
  items: PlacedItem[];
  theme: ThemeMode;
  soundOn: boolean;
};
