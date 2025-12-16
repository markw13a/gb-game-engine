import { appendColumn, appendColumns, appendRow, appendRows } from "./map";

describe("map", () => {
	it("should appendRow", () => {
		const arr = [1, 2, 3, 4];
		expect(appendRow(arr, 2)).toEqual([1, 2, null, 3, 4, null]);
	});

	it("should appendRows", () => {
		const arr = [1, 2, 3, 4];
		expect(appendRows(arr, 2, 2)).toEqual([1, 2, null, null, 3, 4, null, null]);
	});

	it("should appendColumn", () => {
		const arr = [1, 2, 3, 4];
		expect(appendColumn(arr, 2)).toEqual([1, 2, 3, 4, null, null]);
	});

	it("should appendColumns", () => {
		const arr = [1, 2, 3, 4];
		expect(appendColumns(arr, 2, 2)).toEqual([
			1,
			2,
			3,
			4,
			null,
			null,
			null,
			null,
		]);
	});
});
