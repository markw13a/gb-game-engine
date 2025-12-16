import { chunkArray } from "./array";

describe("array", () => {
	it("should break array in to chunks", () => {
		const testArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
		const chunkedArr = chunkArray(testArr, 3);

		expect(chunkedArr).toHaveLength(4);
		expect(chunkedArr[0]).toEqual([1, 2, 3]);
		expect(chunkedArr[1]).toEqual([4, 5, 6]);
		expect(chunkedArr[2]).toEqual([7, 8, 9]);
		expect(chunkedArr[3]).toEqual([10]);
	});
});
