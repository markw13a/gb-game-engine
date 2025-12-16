import { chunkArray } from "./array";

export const appendColumn = (arr: unknown[], colLength: number) => {
	const col = new Array(colLength).fill(null);
	const out = arr.concat(col);

	return out;
};

export const appendColumns = (
	arr: unknown[],
	colLength: number,
	columnsToAdd: number,
) => {
	let out = arr;

	for (let i = 0; i < columnsToAdd; i++) {
		out = appendColumn(out, colLength);
	}

	return out;
};

export const appendRow = (arr: unknown[], colLength: number) => {
	const rows = chunkArray(arr, colLength);
	const nextRows = rows.flatMap((row) => [...row, null]);

	return nextRows;
};

export const appendRows = (
	arr: unknown[],
	colLength: number,
	rowsToAdd: number,
) => {
	let out = arr;

	for (let i = 0; i < rowsToAdd; i++) {
		out = appendRow(out, colLength + i);
	}

	return out;
};
