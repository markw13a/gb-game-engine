// TODO: Update these functions to allow for even-sized grids
// Simply treat character position as being 1 tile left of centre

/**
 * Returns an array of numbers from -max to max
 * Example output:
 * max = 5; out = [-2, -1, 0, 1, 2]
 * Useful in calculating indices for adjacent rows/columns in a max x max size grid
 * @param max Upper and lower bound of range
 */
export const calculateRange = (max: number) => {
	const lowerBound = -max;
	const range: number[] = [];

	if (max <= 0) {
		throw new Error(`calculateRange: unsupported value (${max})`);
	}

	for (let i = 0; i < max; i++) {
		range.push(lowerBound + i);
	}

	range.push(0);

	for (let i = 0; i < max; i++) {
		range.push(i + 1);
	}

	return range;
};

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

	// TODO: Check if position is possible within originalArraySideLength sized grid

	const max = (subSectionSideLength - 1) / 2;
	const range = calculateRange(max);

	// What you get if you trace a straight line through the row containing position
	// For position equal '4', indices for the following elements will be returned
	// * * *
	// I I I
	// * * *
	const columnIndices = range.map(
		(i) => position + i * originalArraySideLength,
	);

	// Have array of indices that represent the middle row of each column
	// Iterate over to produce indices for the whole column
	const initialValue: number[] = [];
	const indices = columnIndices.reduce((out, columnIndex) => {
		// e.g range [-1, 0, 1] columnIndex 7 -> [6, 7, 8]
		const column = range.map((i) => i + columnIndex);
		// Combine to a single column-wise array
		// e.g [6, 7, 8, 11, 12, 13, 16, 17, 18]
		return [...out, ...column];
	}, initialValue);

	return indices;
};
