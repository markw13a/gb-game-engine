// TODO: Code in this file isn't really testable -- functions depend on in-scope values
import type { Map, MapData, ScrollDirection } from "../types/types";
import { calculateIndices } from "./utils/calculateIndices/calculateIndices";

const rawMap = 
 `BBBBBBB
  BBBBBBB
  BBGGGBB
  BBGGGBB
  BBGGGBB
  BBBBBBB
  BBBBBBB
`;

export const getDataForSymbol = (symbol: string, mapIndex: number): MapData => {
    switch (symbol) {
        case 'G':
            return { type: 'grassland', color: 'white', mapIndex, isPassable: true }
        case 'B': 
            // Bugs might hide behind this permissive behaviour, consider forcing boundary to be explicitly defined
            return { type: 'boundary', color: 'black', mapIndex, isPassable: false }
        default:
            throw new Error(`Unrecognised symbol: ${symbol}`);
    }
};

export const decodeMap = (map: string): Map => map.split('').map((char, mapIndex) => getDataForSymbol(char, mapIndex));

export const map = decodeMap(rawMap.replace(/\s+/g, ''));
export const TILE_SIZE_IN_PX = 50;
export const MAP_SIDE_LENGTH = Math.sqrt(map.length);

// Visible area of map is a square - will render SIDE_LENGTH * SIDE_LENGTH number of "tiles"
// Must be odd number (so character can be placed in the centre)
export const VIEW_AREA_SIDE_LENGTH = 5;

export const getNextTile = (pos: number, dir: ScrollDirection) => {
    switch (dir) {
        case "left":
            return pos - MAP_SIDE_LENGTH;
        case "right":
            return pos + MAP_SIDE_LENGTH;
        case "up":
            return pos - 1;
        case "down":
            return pos + 1;
    }
}

export const getVisibleTiles = (pos: number) => calculateIndices(VIEW_AREA_SIDE_LENGTH, MAP_SIDE_LENGTH, pos).map(i => map[i]);

const verifyMapIntegrity = (map: Map) => {
    const sideLength = Math.sqrt(map.length);
    const isMapSquare = Number.isInteger(sideLength);
    
    if (!isMapSquare) {
        throw new Error(`
            Invalid Map error: length ${map.length} does not represent a square grid. 
            Square root of length must be whole number to represent an n x n grid (calculated ${sideLength})
        `);
    }
};

verifyMapIntegrity(map);