import type { GameObject } from "@/lib/types/object";

export const getObjectAtTile = (
	tile: number,
	objects: GameObject[],
): GameObject | null =>
	objects.find((object) => object.position === tile) ?? null;

export const getObjectWithinTiles = (
	tile: number,
	objects: GameObject[],
): GameObject | null =>
	objects.find((obj) => obj.occupiedTiles.includes(tile)) ?? null;

export const getIsObjectVisible = (
	visibleTiles: number[],
	object: GameObject,
): boolean => object.occupiedTiles.every((tile) => visibleTiles.includes(tile));
