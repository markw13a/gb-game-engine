import type { Direction } from "../types/direction";
import type { Map } from "../types/map";
import { calculateIndices } from "./grid";

export const getNextTile = (
	pos: number,
	mapSideLength: number,
	dir: Direction,
	tilesToMove = 1,
) => {
	switch (dir) {
		case "left":
			return pos - mapSideLength * tilesToMove;
		case "right":
			return pos + mapSideLength * tilesToMove;
		case "up":
			return pos - tilesToMove;
		case "down":
			return pos + tilesToMove;
	}
};

export const getTilesAroundPos = (
	pos: number,
	viewAreaSize: number,
	mapSideLength: number,
	map: Map,
) => {
	const empty = calculateIndices(viewAreaSize, mapSideLength, pos);
	const visibleTiles = empty.map((i) => map[i]);

	return visibleTiles;
};
