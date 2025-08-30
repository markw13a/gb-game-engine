import {
	calculateIndices,
	calculateRow,
	calculateTiles,
	getNextTile,
	getSideLength,
} from "./grid";

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

describe("getSideLength", () => {
	it("should calculate side length", () => {
		const grid = [1, 2, 3, 4];
		const sideLength = getSideLength(grid);

		expect(sideLength).toEqual(2);
	});

	it("should throw error if grid is not square", () => {
		const grid = [1, 2, 3, 4, 5];
		expect(() => getSideLength(grid)).toThrowError();
	});
});

describe("getNextTile", () => {
	it("should return next position", () => {
		const mapSideLength = 3;
		const startingPos = 4;

		const leftPos = getNextTile(startingPos, mapSideLength, "left");
		const rightPos = getNextTile(startingPos, mapSideLength, "right");
		const upPos = getNextTile(startingPos, mapSideLength, "up");
		const downPos = getNextTile(startingPos, mapSideLength, "down");

		expect(leftPos).toEqual(1);
		expect(rightPos).toEqual(7);
		expect(upPos).toEqual(3);
		expect(downPos).toEqual(5);
	});

	it("should return position two tiles away", () => {
		const mapSideLength = 3;

		const leftPos = getNextTile(7, mapSideLength, "left", 2);
		const rightPos = getNextTile(1, mapSideLength, "right", 2);
		const upPos = getNextTile(2, mapSideLength, "up", 2);
		const downPos = getNextTile(0, mapSideLength, "down", 2);

		expect(leftPos).toEqual(1);
		expect(rightPos).toEqual(7);
		expect(upPos).toEqual(0);
		expect(downPos).toEqual(2);
	});
});
