// TODO: Code in this file isn't really testable -- functions depend on in-scope values
import type { Map, MapData } from "../types/map";
import type { Direction } from "../types/sprite";
import { calculateIndices } from "./utils/calculateIndices/calculateIndices";

const rawMap = 
`
BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB
BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB
BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB
BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB
BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB
BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB
BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB
BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB
BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB
BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB
BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB
BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB
BBBBBBBBBBBBGGGGGGGGGGGGGGGGGGGGGBBBBBBBBBBBB
BBBBBBBBBBBBGGGGGGGGGGGGGGGGGGGGGBBBBBBBBBBBB
BBBBBBBBBBBBGGGGGGGGGGGGGGGGGGGGGBBBBBBBBBBBB
BBBBBBBBBBBBGGGGGGGGGGGGGGGGGGGGGBBBBBBBBBBBB
BBBBBBBBBBBBGGGGGGGGGGGGGGGGGGGGGBBBBBBBBBBBB
BBBBBBBBBBBBGGGGGGGGGGGGGGGGGGGGGBBBBBBBBBBBB
BBBBBBBBBBBBGGGGGGGGGGGGGGGGGGGGGBBBBBBBBBBBB
BBBBBBBBBBBBGGGGGGGGGGGGGGGGGGGGGBBBBBBBBBBBB
BBBBBBBBBBBBGGGGGGGGGGGGGGGGGGGGGBBBBBBBBBBBB
BBBBBBBBBBBBGGGGGGGGGGGGGGGGGGGGGBBBBBBBBBBBB
BBBBBBBBBBBBGGGGGGGGGGGGGGGGGGGGGBBBBBBBBBBBB
BBBBBBBBBBBBGGGGGGGGGGGGGGGGGGGGGBBBBBBBBBBBB
BBBBBBBBBBBBGGGGGGGGGGGGGGGGGGGGGBBBBBBBBBBBB
BBBBBBBBBBBBGGGGGGGGGGGGGGGGGGGGGBBBBBBBBBBBB
BBBBBBBBBBBBGGGGGGGGGGGGGGGGGGGGGBBBBBBBBBBBB
BBBBBBBBBBBBGGGGGGGGGGGGGGGGGGGGGBBBBBBBBBBBB
BBBBBBBBBBBBGGGGGGGGGGGGGGGGGGGGGBBBBBBBBBBBB
BBBBBBBBBBBBGGGGGGGGGGGGGGGGGGGGGBBBBBBBBBBBB
BBBBBBBBBBBBGGGGGGGGGGGGGGGGGGGGGBBBBBBBBBBBB
BBBBBBBBBBBBGGGGGGGGGGGGGGGGGGGGGBBBBBBBBBBBB
BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB
BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB
BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB
BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB
BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB
BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB
BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB
BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB
BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB
BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB
BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB
BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB
BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB
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

/**
 * Returns n where map represents an n x n grid
 * (e.g map.length = 9 -> n = 3)
 */
export const getMapSideLength = (map: Map) => Math.sqrt(map.length);

export const getNextTile = (pos: number, mapSideLength: number, dir: Direction) => {
    switch (dir) {
        case "left":
            return pos - mapSideLength;
        case "right":
            return pos + mapSideLength;
        case "up":
            return pos - 1;
        case "down":
            return pos + 1;
    }
}

export const getVisibleTiles = (pos: number, viewAreaSize: number, mapSideLength: number) => {
    const empty = calculateIndices(viewAreaSize, mapSideLength, pos);
    const visibleTiles = empty.map(i => map[i]);

    return visibleTiles;
}

export const verifyMapIntegrity = (map: Map) => {
    const sideLength = Math.sqrt(map.length);
    const isMapSquare = Number.isInteger(sideLength);
    
    if (!isMapSquare) {
        throw new Error(`
            Invalid Map error: length ${map.length} does not represent a square grid. 
            Square root of length must be whole number to represent an n x n grid (calculated ${sideLength})
        `);
    }
};

// TODO: feels off handling this as a side-effect of importing what is becoming a utils file
verifyMapIntegrity(map);