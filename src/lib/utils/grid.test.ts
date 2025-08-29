import { calculateIndices, calculateRow, calculateTiles } from "./grid";

describe("calculateIndices", () => {
	it("should calculate sub-section indices", () => {
		const indices = calculateIndices(3, 5, 12);
		expect(indices).toEqual([6, 7, 8, 11, 12, 13, 16, 17, 18]);
	});

	it("should throw error if subsection larger than original grid", () => {
		expect(() => calculateIndices(5, 3, 12)).toThrowError();
	});
});

describe("calculateRow", () => {
	it("should calculate row indices", () => {
		const indices = calculateRow(3, 5, 6);
		expect(indices).toEqual([6, 11, 16]);
	});
});

describe("calculateTiles", () => {
	it("should calculate tiles occupied by object", () => {
		const indices = calculateTiles(3, 2, 5, 6);
		expect(indices).toEqual([6, 7, 8, 11, 12, 13]);
	});
});
