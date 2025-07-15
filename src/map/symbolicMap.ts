import type { Map, MapData, RawMap } from "../types/types";

// TODO: Need to enforce squareness of the map somehow
const rawMap: RawMap = 
 `BBBBBBB
  BBBBBBB
  BBGGGBB
  BBGGGBB
  BBGGGBB
  BBBBBBB
  BBBBBBB
`;

let decodedMap: Map | null = null;

export const map = rawMap.replace(/\s+/g, '');

export const getDataForSymbol = (symbol: string, mapIndex: number): MapData => {
    switch (symbol) {
        case 'G':
            return { type: 'grassland', color: 'white', mapIndex, isPassable: true }
        default: 
            // Bugs might hide behind this permissive behaviour, consider forcing boundary to be explicitly defined
            return { type: 'boundary', color: 'black', mapIndex, isPassable: false }
    }
};

export const getDataForPosition = (i: number) => getDataForSymbol(map[i], i);

export const getDecodedMap = (): Map => {
    // Basic caching behaviour in case this turns out to be expensive! 
    if (decodedMap !== null) {
        return decodedMap;
    }

    return map.split('').map((char, mapIndex) => getDataForSymbol(char, mapIndex));
}