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
