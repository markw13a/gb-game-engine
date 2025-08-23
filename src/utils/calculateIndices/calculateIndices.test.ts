import { calculateIndices, calculateRange } from "./calculateIndices";

describe("calculateRange", () => {
	it("should calculate short range", () => {
		const range = calculateRange(1);
		expect(range).toEqual([-1, 0, 1]);
	});

	it("should calculate longer range", () => {
		const range = calculateRange(5);
		expect(range).toEqual([-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5]);
	});

	it("should reject negative number", () => {
		expect(() => calculateRange(-1)).toThrowError();
	});

	it("should reject zero", () => {
		expect(() => calculateRange(0)).toThrowError();
	});
});

describe("calculateIndices", () => {
	it("should calculate sub-section indices", () => {
		const indices = calculateIndices(3, 5, 12);

		expect(indices).toEqual([6, 7, 8, 11, 12, 13, 16, 17, 18]);
	});

	it("should throw error if subsection larger than original grid", () => {
		expect(() => calculateIndices(5, 3, 12)).toThrowError();
	});
});
