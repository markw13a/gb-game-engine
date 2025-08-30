import type { GameObject } from "../types/object";
import {
	dispatchObjectInteractionEvent,
	getObjectAtTile,
	getObjectWithinTiles,
} from "./object";

const gameObjects: GameObject[] = [
	{
		width: 1,
		height: 1,
		position: 1,
		occupiedTiles: [1],
		sprite: "",
		event: "item-1",
	},
	{
		width: 2,
		height: 1,
		position: 2,
		occupiedTiles: [2, 5],
		sprite: "",
		event: "item-2",
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

describe("dispatchObjectInteractionEvent", () => {
	afterEach(() => {
		vi.clearAllMocks();
	});

	it("should dispatch event", () => {
		const dispatchEventMock = vi.spyOn(document, "dispatchEvent");

		dispatchObjectInteractionEvent(gameObjects[0]);

		expect(dispatchEventMock).toHaveBeenCalled();
		expect(dispatchEventMock.mock.calls[0][0].type).toEqual("item-1");
	});
});
