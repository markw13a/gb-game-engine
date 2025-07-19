export type MapData = {
    type: 'boundary' | 'grassland';
    isPassable: boolean;
    color: string;
    mapIndex: number; // Reference to tile position within rawMap
}

export type Map = MapData[];

export type Direction = 'left' | 'right' | 'up' | 'down';
