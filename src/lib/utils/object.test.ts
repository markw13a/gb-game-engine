import type { GameObject } from "../types/object";
import { getIsObjectVisible, getObjectAtTile, getObjectWithinTiles } from "./object";

const gameObjects: GameObject[] = [
	{
		id: "1",
		width: 1,
		height: 1,
		position: 1,
		occupiedTiles: [1],
		sprite: "",
	},
	{
		id: "2",
		width: 2,
		height: 1,
		position: 2,
		occupiedTiles: [2, 5],
		sprite: "",
	},
];

describe("getObjectAtTile", () => {
	it("should return object at tile", () => {
		const result = getObjectAtTile(1, gameObjects);
		expect(result).toEqual(gameObjects[0]);
	});

	it("should return null if no object at tile", () => {
		const result = getObjectAtTile(12, gameObjects);
		expect(result).toEqual(null);
	});
});

describe("getObjectWithinTiles", () => {
	it("should return object if it touches tile", () => {
		const result = getObjectWithinTiles(5, gameObjects);
		expect(result).toEqual(gameObjects[1]);
	});

	it("should return null if no object touches tile", () => {
		const result = getObjectWithinTiles(0, gameObjects);
		expect(result).toEqual(null);
	});
});

describe("getIsObjectVisible", () => {
	it("should return true if object contained within tiles", () => {
		const result = getIsObjectVisible([2, 5], gameObjects[1]);
		expect(result).toEqual(true);
	});

	it('should return false if object not contained within tiles', () => {
		const result = getIsObjectVisible([2], gameObjects[1]);
		expect(result).toEqual(false);
	})
})