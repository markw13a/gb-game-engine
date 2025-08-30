import type { Direction } from "../types/direction";

/**
 * @param position leftmost tile in row
 */
export const calculateRow = (
	columns: number,
	mapSideLength: number,
	position: number,
) => new Array(columns).fill(null).map((_, i) => position + mapSideLength * i);

/**
 * @param position top tile in row
 */
export const calculateColumn = (rows: number, position: number) =>
	new Array(rows).fill(null).map((_, i) => position + i);

/**
 * @param position top-left tile in grid
 */
export const calculateTiles = (
	rows: number,
	columns: number,
	mapSideLength: number,
	position: number,
) =>
	calculateRow(columns, mapSideLength, position)
		.map((index) => calculateColumn(rows, index))
		.flat();

/**
 * Used to generate subsection of an n x n array
 * Returns array of indices which form a sideLength x sideLength sized grid
 * with position at the centre
 * @param subSectionSideLength size of grid produced (e.g 3 will give an array of 9 indices)
 * @param originalArraySideLength size of grid we're taking a subsection of
 * @param position centre of grid
 */
export const calculateIndices = (
	subSectionSideLength: number,
	originalArraySideLength: number,
	position: number,
) => {
	if (subSectionSideLength > originalArraySideLength) {
		throw new Error(
			`Cannot take subsection of size ${subSectionSideLength} x ${subSectionSideLength} from ${originalArraySideLength} x ${originalArraySideLength} grid`,
		);
	}

	const max = (subSectionSideLength - 1) / 2;
	const leftCentre = position - originalArraySideLength * max;
	const leftTop = leftCentre - max;

	return calculateTiles(
		subSectionSideLength,
		subSectionSideLength,
		originalArraySideLength,
		leftTop,
	);
};

/**
 * Returns n where map represents an n x n grid
 * (e.g map.length = 9 -> n = 3)
 */
export const getSideLength = (grid: Array<unknown>) => {
	if (!grid || !grid.length) {
		throw new Error("Provided grid empty!");
	}

	const sideLength = Math.sqrt(grid.length);

	if (!Number.isInteger(sideLength)) {
		throw new Error(
			`Provided grid does not form a square. length: ${grid.length} side length: ${sideLength}`,
		);
	}

	return sideLength;
};

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
